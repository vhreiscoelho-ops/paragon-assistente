/* Assistente do Aquarista Paragon — núcleo (funções puras, sem DOM, sem rede).
   Roda no navegador (window.Nucleo) e no Node (testes/testes.js).
   Regra MILION: nenhuma faixa técnica nasce aqui.
   - Faixas por espécie: especies.json (Checador, com fonte).
   - Alertas gerais (amônia, nitrito, nitrato, KH, pH/temp/GH sem espécie): parametros-agua.json da Ana (A3), carregado por configurarAgua().
   - Ciclagem guiada: 01-conteudo/ferramenta/ciclagem-regras.md (A2), textos e constantes copiados abaixo SEM mudar uma palavra.
   - Globo e manutenção: 01-conteudo/ferramenta/aquario-globo.md e manutencao.md (Ana, 28/10). */
(function (raiz, fabrica) {
  if (typeof module === 'object' && module.exports) module.exports = fabrica();
  else raiz.Nucleo = fabrica();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // 2 = 28/10/2026: aquário globo, manutenções, ciclagem com/sem peixes, modo demonstração. Dados da versão 1 abrem sem mudança.
  var VERSAO_DADOS = 2;
  var ASSINATURA = 'paragon-assistente-do-aquarista';

  // Parâmetros do diário. 'campo' = campo da espécie no especies.json com a faixa [min, max]; 'agua' = id no parametros-agua.json.
  var PARAMS = [
    { id: 'temp', nome: 'Temperatura', un: '°C', campo: 'temperatura_c', agua: 'temperatura', min: 0, max: 45, passo: 0.1 },
    { id: 'ph', nome: 'pH', un: '', campo: 'ph', agua: 'ph', min: 0, max: 14, passo: 0.1 },
    { id: 'amonia', nome: 'Amônia', un: 'mg/L', campo: null, agua: 'amonia', min: 0, max: 50, passo: 0.05 },
    { id: 'nitrito', nome: 'Nitrito', un: 'mg/L', campo: null, agua: 'nitrito', min: 0, max: 50, passo: 0.05 },
    { id: 'nitrato', nome: 'Nitrato', un: 'mg/L', campo: null, agua: 'nitrato', min: 0, max: 500, passo: 1 },
    { id: 'kh', nome: 'KH', un: '°dKH', campo: null, agua: 'kh', min: 0, max: 50, passo: 0.5 },
    { id: 'gh', nome: 'GH', un: '°dGH', campo: 'gh_dgh', agua: 'gh', min: 0, max: 60, passo: 0.5 }
  ];
  var PORID = {}; PARAMS.forEach(function (p) { PORID[p.id] = p; });
  var DA_AGUA = {}; PARAMS.forEach(function (p) { DA_AGUA[p.agua] = p.id; });

  // Lembrete de backup (reuniao/assistente-do-aquarista.md, 4.2 item 4): a cada 2 semanas no beta e depois de 5 medições.
  var BACKUP_DIAS = 14, BACKUP_MEDICOES = 5;

  /* ---------- utilidades ---------- */
  function num(n, casas) {
    if (n === null || n === undefined || isNaN(n)) return '—';
    var f = casas === undefined ? Math.round(n * 100) / 100 : Number(n).toFixed(casas);
    return String(f).replace('.', ',');
  }
  function lerNumero(s) {
    if (s === null || s === undefined) return null;
    var t = String(s).trim().replace(',', '.');
    if (!t) return null;
    var v = Number(t);
    return isFinite(v) ? v : NaN;
  }
  function novoId(prefixo) { return (prefixo || 'x') + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function hojeISO(d) { d = d || new Date(); return d.getFullYear() + '-' + dois(d.getMonth() + 1) + '-' + dois(d.getDate()); }
  function dois(n) { return (n < 10 ? '0' : '') + n; }
  function paraData(iso) {   // 'AAAA-MM-DD' ou 'AAAA-MM-DDTHH:mm' → Date local
    var m = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/.exec(iso || '');
    return m ? new Date(+m[1], +m[2] - 1, +m[3], +(m[4] || 0), +(m[5] || 0)) : null;
  }
  function dataCurta(iso) { var d = paraData(iso); return d ? dois(d.getDate()) + '/' + dois(d.getMonth() + 1) : ''; }
  function diasEntre(a, b) { return Math.floor((Date.UTC(b.getFullYear(), b.getMonth(), b.getDate()) - Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())) / 864e5); }
  function somarDias(iso, n) { var d = paraData(iso); d.setDate(d.getDate() + n); return hojeISO(d); }
  function ehNum(v) { return typeof v === 'number' && !isNaN(v); }

  /* ---------- estado ---------- */
  function estadoVazio() {
    return { app: ASSINATURA, versao: VERSAO_DADOS, aquarios: [], medicoes: [], manutencoes: [],
      meta: { criado: new Date().toISOString(), ultimoBackup: null, medicoesDesdeBackup: 0, pedidos: [], unidades: {} } };
  }
  // Aceita estado salvo (ou nada) e devolve um estado válido, sem perder campo conhecido. Aquário sem 'forma' = retangular.
  function migrar(e) {
    var base = estadoVazio();
    if (!e || typeof e !== 'object') return base;
    base.aquarios = Array.isArray(e.aquarios) ? e.aquarios.filter(function (a) { return a && a.id; }) : [];
    base.medicoes = Array.isArray(e.medicoes) ? e.medicoes.filter(function (m) { return m && m.id && m.aquario; }) : [];
    base.manutencoes = Array.isArray(e.manutencoes) ? e.manutencoes.filter(function (m) { return m && m.id && m.aquario && m.tipo; }) : [];
    var meta = e.meta || {};
    base.meta.criado = meta.criado || base.meta.criado;
    base.meta.ultimoBackup = meta.ultimoBackup || null;
    base.meta.medicoesDesdeBackup = meta.medicoesDesdeBackup || 0;
    base.meta.pedidos = Array.isArray(meta.pedidos) ? meta.pedidos : [];
    base.meta.unidades = meta.unidades && typeof meta.unidades === 'object' ? meta.unidades : {};
    base.aquarios.forEach(function (a) {
      a.fauna = Array.isArray(a.fauna) ? a.fauna : []; a.dim = a.dim || {};
      if (a.forma !== 'globo') a.forma = 'ret';
      if (a.forma === 'globo') a.globo = a.globo || {};
    });
    return base;
  }

  /* ---------- litragem ----------
     Retangular: bruta = comprimento × largura × altura (cm) ÷ 1000; estimada desconta só o que a pessoa informa (substrato, espaço sem água).
     Globo (aquario-globo.md, Ana): esfera de raio R = diâmetro ÷ 2; água = calota de altura h: V = π·h²·(3R − h) ÷ 3; cascalho s: V(h) − V(s). */
  function litragem(dim) {
    dim = dim || {};
    var c = +dim.c, l = +dim.l, a = +dim.a;
    if (!(c > 0 && l > 0 && a > 0)) return null;
    var sub = Math.max(0, +dim.substrato || 0), folga = Math.max(0, +dim.folga || 0);
    var aAgua = Math.max(0, a - sub - folga);
    return { bruta: Math.round(c * l * a / 1000), estimada: Math.round(c * l * aAgua / 1000), descontou: sub + folga > 0 };
  }
  function calota(R, h) { return Math.PI * h * h * (3 * R - h) / 3; }
  function litragemGlobo(g) {
    g = g || {};
    var d = +g.d, h = +g.h, s = Math.max(0, +g.s || 0);
    if (!(d > 0 && h > 0)) return null;
    if (h > d) return { erro: 'altura' };
    if (s >= h) return { erro: 'cascalho' };
    var R = d / 2, v = calota(R, h) - calota(R, s);
    return { estimada: Math.round(v / 100) / 10, cheia: Math.round(4 / 3 * Math.PI * R * R * R / 100) / 10, descontou: s > 0 };
  }
  function litrosDoAquario(aq) {
    if (!aq) return 0;
    if (aq.forma === 'globo') { var g = litragemGlobo(aq.globo); if (g && !g.erro) return g.estimada; }
    else { var l = litragem(aq.dim); if (l) return l.estimada; }
    return +aq.litrosManual > 0 ? +aq.litrosManual : 0;
  }
  var GLOBO_AVISO_L = 20;   // aquario-globo.md 1: "abaixo de 20 L" mostra o cartão (leitura nossa, G2 para o CEO validar)
  function avisoGlobo(aq) { return !!aq && aq.forma === 'globo' && litrosDoAquario(aq) > 0 && litrosDoAquario(aq) < GLOBO_AVISO_L; }

  /* ---------- fauna ---------- */
  function especiesDaFauna(aq, porId) {
    return (aq.fauna || []).filter(function (f) { return f.id && porId[f.id]; }).map(function (f) { return { especie: porId[f.id], qtd: f.qtd || 1 }; });
  }
  function semFicha(aq) { return (aq.fauna || []).filter(function (f) { return !f.id || f.semFicha; }); }

  /* ---------- contexto do aquário (parametros-agua.json, regras_gerais) ---------- */
  function cicConfig(aq) {
    var c = aq && aq.ciclagem; if (!c || !c.inicio) return null;
    return { inicio: c.inicio, comPeixes: c.comPeixes !== undefined ? !!c.comPeixes : (aq.fauna || []).length > 0,
      fonteAmonia: c.fonteAmonia || null, semeadura: c.semeadura || null };
  }
  function contexto(aq, porId) {
    var cic = cicConfig(aq), temFauna = (aq.fauna || []).length > 0;
    // "Sem essa informação, considere com_peixes = true (mais cauteloso)": só é "sem peixes" o aquário marcado assim (aquário novo) ou a ciclagem sem peixes.
    var comPeixes = cic ? cic.comPeixes : (temFauna || aq.semPeixes !== true);
    return { cic: cic, comPeixes: comPeixes, cicSemPeixes: !!cic && !cic.comPeixes, cicComPeixes: !!cic && cic.comPeixes,
      temEspecie: especiesDaFauna(aq, porId || {}).length > 0 };
  }

  /* ---------- faixa comum por espécie ---------- */
  function faixaComum(aq, param, porId) {
    var p = PORID[param]; if (!p || !p.campo) return null;
    var esp = especiesDaFauna(aq, porId).map(function (s) { return s.especie; });
    var com = esp.filter(function (e) { return Array.isArray(e[p.campo]) && e[p.campo].length === 2; });
    if (!com.length) return null;
    var lo = Math.max.apply(null, com.map(function (e) { return e[p.campo][0]; }));
    var hi = Math.min.apply(null, com.map(function (e) { return e[p.campo][1]; }));
    return { min: lo, max: hi, existe: lo <= hi, especies: com, semDado: esp.filter(function (e) { return com.indexOf(e) < 0; }) };
  }
  function fontesDe(esp) {
    var vistos = {}, out = [];
    esp.forEach(function (e) { (e.fontes || []).forEach(function (f) { if (f.url && !vistos[f.url]) { vistos[f.url] = 1; out.push(f); } }); });
    return out;
  }
  function faixaTxt(min, max, un) { return (min === max ? num(min) : num(min) + ' a ' + num(max)) + (un ? ' ' + un : ''); }

  /* ---------- base técnica dos parâmetros (parametros-agua.json da Ana) ---------- */
  var AGUA = null;
  function configurarAgua(j) { AGUA = j && Array.isArray(j.parametros) ? j : null; return !!AGUA; }
  function paramAgua(id) { if (!AGUA) return null; var a = PORID[id] ? PORID[id].agua : id; return AGUA.parametros.find(function (x) { return x.id === a; }) || null; }
  function fontesAgua(ids) {
    if (!AGUA) return [];
    var vistos = {}, out = [];
    (ids || []).forEach(function (k) { var f = AGUA.fontes[k]; if (f && /^https?:/.test(f.url) && !vistos[f.url]) { vistos[f.url] = 1; out.push({ titulo: f.nome_curto + ' · ' + f.titulo, url: f.url }); } });
    return out;
  }
  // Faixa de referência geral do parâmetro (banda do gráfico). null = sem base.
  function faixaGeral(id) {
    var p = paramAgua(id); if (!p || !p.faixa_referencia) return null;
    var f = p.faixa_referencia; return { min: f.min, max: f.max, texto: f.texto, geral: true };
  }
  function deltaMinimo(id) {
    var d = AGUA && AGUA.precisao_kits && AGUA.precisao_kits.delta_minimo_tendencia; var a = PORID[id] ? PORID[id].agua : id;
    var padrao = { amonia: 0.25, nitrito: 0.25, nitrato: 5, ph: 0.2, kh: 1, gh: 1, temperatura: 0.5 };
    return d && ehNum(d[a]) ? d[a] : padrao[a];
  }
  // Unidades (V9): converte o que o kit mostra para a unidade padrão do app. Temperatura em °F → °C.
  function unidadesDe(id) { var u = AGUA && AGUA.unidades && AGUA.unidades[PORID[id] ? PORID[id].agua : id]; return u && u.opcoes ? u : null; }
  function paraPadrao(id, valor, unidade) {
    if (!ehNum(valor) || !unidade) return valor;
    if (id === 'temp' && unidade === 'F') return Math.round((valor - 32) / 1.8 * 10) / 10;
    var u = unidadesDe(id); if (!u) return valor;
    var o = u.opcoes.find(function (x) { return x.id === unidade; });
    return o && ehNum(o.fator_para_padrao) ? Math.round(valor * o.fator_para_padrao * 1000) / 1000 : valor;
  }

  /* Avalia um valor contra a faixa do aquário.
     estado: 'ok' | 'fora' | 'sem-comum' (espécies sem faixa em comum) | 'sem-faixa' | 'ciclagem' (amônia/nitrito/nitrato na ciclagem sem peixes) | 'vazio'
     Com faixa da espécie, vale a da espécie; sem ela, a referência geral do parametros-agua.json (geral: true). */
  function avaliar(aq, param, valor, porId) {
    var p = PORID[param];
    if (valor === null || valor === undefined || isNaN(valor)) return { estado: 'vazio' };
    var f = faixaComum(aq, param, porId);
    if (f && !f.existe) return { estado: 'sem-comum', param: p, faixa: f,
      texto: 'As espécies deste aquário não têm uma faixa de ' + p.nome + ' em comum. Veja o resultado do Checador.' };
    if (f) {
      if (valor >= f.min && valor <= f.max) return { estado: 'ok', param: p, faixa: f };
      var acima = valor > f.max;
      var fora = f.especies.filter(function (e) { var r = e[p.campo]; return valor < r[0] || valor > r[1]; });
      var nomes = fora.map(function (e) { return e.nome_popular + ' (' + faixaTxt(e[p.campo][0], e[p.campo][1], p.un) + ')'; });
      return { estado: 'fora', param: p, faixa: f, acima: acima, especiesFora: fora, fontes: fontesDe(fora),
        texto: p.nome + ' ' + num(valor) + (p.un ? ' ' + p.un : '') + ' está ' + (acima ? 'acima' : 'abaixo') +
          ' da faixa comum das espécies deste aquário (' + faixaTxt(f.min, f.max, p.un) + '). Fora da faixa da ficha: ' + nomes.join('; ') + '.' };
    }
    var ctx = contexto(aq, porId || {});
    if (ctx.cicSemPeixes && (param === 'amonia' || param === 'nitrito' || param === 'nitrato')) return { estado: 'ciclagem', param: p };
    var g = faixaGeral(param);
    if (!g) return { estado: 'sem-faixa', param: p };
    var baixo = ehNum(g.min) && valor < g.min, alto = ehNum(g.max) && valor > g.max;
    return { estado: baixo || alto ? 'fora' : 'ok', geral: true, param: p, faixa: { min: g.min, max: g.max, existe: true, texto: g.texto }, acima: alto };
  }

  /* ---------- medições ---------- */
  function medicoesDe(estado, aqId) {
    return estado.medicoes.filter(function (m) { return m.aquario === aqId; }).sort(function (a, b) { return a.data < b.data ? -1 : a.data > b.data ? 1 : 0; });
  }
  function serie(estado, aqId, param) {
    return medicoesDe(estado, aqId).filter(function (m) { return ehNum(m[param]); }).map(function (m) { return { data: m.data, v: m[param], id: m.id }; });
  }
  function ultimoValor(estado, aqId, param) { var s = serie(estado, aqId, param); return s.length ? s[s.length - 1] : null; }

  /* NH3 (ciclagem-regras.md 2; Embrapa CT 47): pKa = 0,09018 + 2729,92/(T + 273,15); f = 1/(10^(pKa − pH) + 1). */
  function fracaoNH3(ph, temp) { var pKa = 0.09018 + 2729.92 / (temp + 273.15); return 1 / (Math.pow(10, pKa - ph) + 1); }
  function nh3(amonia, ph, temp) { return ehNum(amonia) && ehNum(ph) && ehNum(temp) ? amonia * fracaoNH3(ph, temp) : null; }
  function nh3Txt(v) { return v < 0.01 ? num(v, 3) : num(Math.round(v * 100) / 100); }

  var COR_ORDEM = { vermelho: 0, amarelo: 1, info: 2 };
  function cumpre(cond, v, prev, dias) {
    if (cond.tipo === 'variacao') {
      if (!prev || dias > cond.janela_dias) return false;
      var d = v - prev.v;
      return cond.direcao === 'queda' ? -d >= cond.delta_abs_min : Math.abs(d) >= cond.delta_abs_min;
    }
    switch (cond.op) {
      case '>': return v > cond.valor;
      case '>=': return v >= cond.valor;
      case '<': return v < cond.valor;
      case 'entre': return v >= cond.min && v < cond.max_exclusivo;
      case 'fora': return v < cond.min || v > cond.max;
    }
    return false;
  }
  function contextoOk(c, ctx, cicAtiva) {
    switch (c) {
      case 'qualquer': return true;
      case 'com_peixes': return ctx.comPeixes && !ctx.cicComPeixes;
      case 'sem_peixes_fora_da_ciclagem': return !ctx.comPeixes && !cicAtiva;
      case 'qualquer_fora_da_ciclagem': return !ctx.cicSemPeixes;
      case 'sem_especie_cadastrada': return ctx.comPeixes && !ctx.temEspecie;
    }
    return false;
  }
  // Alertas gerais do parametros-agua.json para a última medição de cada parâmetro (A3, V1–V12 validados pelo CEO em 28/10).
  function alertasGerais(estado, aq, porId) {
    if (!AGUA) return [];
    var ctx = contexto(aq, porId || {}), out = [], ms = medicoesDe(estado, aq.id);
    AGUA.parametros.forEach(function (pa) {
      var id = DA_AGUA[pa.id]; if (!id) return;
      if (ctx.cicSemPeixes && (id === 'amonia' || id === 'nitrito' || id === 'nitrato')) return;   // quem fala é a ciclagem
      var s = serie(estado, aq.id, id); if (!s.length) return;
      var u = s[s.length - 1], prev = s.length > 1 ? s[s.length - 2] : null, m = ms.find(function (x) { return x.id === u.id; }) || {};
      var dias = prev ? diasEntre(paraData(prev.data), paraData(u.data)) : Infinity;
      var achou = [];
      (pa.alertas || []).forEach(function (al) {
        if (al.some_com_especie && ctx.temEspecie) return;
        if (!contextoOk(al.condicao.contexto, ctx, !!ctx.cic)) return;
        if (!cumpre(al.condicao, u.v, prev, dias)) return;
        var delta = prev ? Math.abs(u.v - prev.v) : 0;
        achou.push({ tipo: 'geral', variacao: al.condicao.tipo === 'variacao', id: al.id, param: PORID[id], cor: al.cor, titulo: al.titulo,
          texto: al.texto.replace('{delta}', num(Math.round(delta * 10) / 10)), acao: al.acao, fonteCurta: al.fonte_curta, fontes: fontesAgua(al.fontes),
          porque: pa.por_que, valor: u.v, data: u.data, topo: !!(m.topo && m.topo[id]), complementos: [] });
      });
      // um alerta de faixa por parâmetro (o de pior cor); variações podem vir junto
      var faixa = achou.filter(function (a) { return !a.variacao; }).sort(function (a, b) { return COR_ORDEM[a.cor] - COR_ORDEM[b.cor]; }).slice(0, 1);
      faixa.concat(achou.filter(function (a) { return a.variacao; })).forEach(function (a) {
        if (a.topo && AGUA.precisao_kits && AGUA.precisao_kits.topo_da_cartela) a.complementos.push(AGUA.precisao_kits.topo_da_cartela.texto);
        if (id === 'amonia' && u.v > 0) a.complementos = a.complementos.concat(complementosNH3(u.v, m));
        out.push(a);
      });
    });
    // ciclagem com peixes: o vermelho de amônia/nitrito é o do modo emergência (mesmo texto), um só
    if (ctx.cicComPeixes) {
      var ua = ultimoValor(estado, aq.id, 'amonia'), un = ultimoValor(estado, aq.id, 'nitrito');
      if ((ua && ua.v > 0) || (un && un.v > 0)) {
        var ref = ua && (!un || ua.data >= un.data) ? ua : un, mm = ms.find(function (x) { return x.id === ref.id; }) || {};
        out.unshift({ tipo: 'geral', id: 'cic_emergencia', param: PORID[ref === ua ? 'amonia' : 'nitrito'], cor: 'vermelho', titulo: 'Amônia ou nitrito acima de zero',
          texto: CIC.emergencia_vermelho, acao: '', fonteCurta: 'UF/IFAS: troca de 25 a 50% e menos ração por 1 a 3 dias. Manual Veterinário Merck: amônia e nitrito de referência = 0.',
          fontes: fontesAgua(['F1', 'F3']), valor: ref.v, data: ref.data, complementos: ua && ua.v > 0 ? complementosNH3(ua.v, mm) : [] });
      }
    }
    return out;
  }
  function complementosNH3(amonia, m) {
    var c = [], x = nh3(amonia, m.ph, m.temp);
    if (x === null) { c.push('Informe o pH e a temperatura para ver quanto dessa amônia está na forma tóxica.'); return c; }
    c.push('Com o seu pH e a sua temperatura, cerca de ' + nh3Txt(x) + ' mg/L dessa amônia está na forma tóxica (NH3).');
    if (x >= CIC_K.NH3_CRONICO) c.push('Esse nível de amônia tóxica é o que a piscicultura associa a dano crônico aos peixes. Faça a troca parcial hoje.');
    return c;
  }

  // Alertas do painel: faixa das espécies (última medição de cada parâmetro) + alertas gerais. Ordem: vermelho → amarelo → info.
  function alertas(estado, aq, porId) {
    var out = [];
    PARAMS.forEach(function (p) {
      if (!p.campo) return;
      var u = ultimoValor(estado, aq.id, p.id); if (!u) return;
      var r = avaliar(aq, p.id, u.v, porId);
      if (!r.geral && (r.estado === 'fora' || r.estado === 'sem-comum')) {
        r.tipo = 'especie'; r.cor = r.estado === 'fora' ? 'amarelo' : 'info'; r.data = u.data; r.valor = u.v;
        r.titulo = r.estado === 'fora' ? p.nome + (r.acima ? ' acima' : ' abaixo') + ' da faixa das suas espécies' : 'Sem faixa comum de ' + p.nome;
        out.push(r);
      }
    });
    out = out.concat(alertasGerais(estado, aq, porId));
    return out.map(function (a, i) { a._i = i; return a; }).sort(function (a, b) { return COR_ORDEM[a.cor] - COR_ORDEM[b.cor] || a._i - b._i; });
  }
  function alertasFortes(estado, aq, porId) { return alertas(estado, aq, porId).filter(function (a) { return a.cor !== 'info'; }); }
  // Tendência (V10): compara com a medição anterior; abaixo do degrau mínimo do kit = "igual".
  function tendencia(estado, aqId, param) {
    var s = serie(estado, aqId, param); if (s.length < 2) return null;
    var d = s[s.length - 1].v - s[s.length - 2].v;
    if (Math.abs(d) < deltaMinimo(param)) return { dir: 'igual', texto: (AGUA && AGUA.precisao_kits && AGUA.precisao_kits.delta_minimo_texto) || 'Igual à medição anterior, dentro da precisão do teste.' };
    return { dir: d > 0 ? 'subiu' : 'caiu', delta: Math.abs(d) };
  }

  // Valida e normaliza uma medição vinda do formulário (strings). Devolve { ok, medicao, erros[] }.
  function validarMedicao(form) {
    var m = { id: form.id || novoId('m'), aquario: form.aquario, data: form.data || hojeISO() + 'T12:00' }, erros = [], algum = false;
    if (!m.aquario) erros.push('Escolha o aquário.');
    PARAMS.forEach(function (p) {
      var v = lerNumero(form[p.id]);
      if (v === null) return;
      if (isNaN(v) || v < p.min || v > p.max) { erros.push(p.nome + ': valor fora do possível (' + p.min + ' a ' + p.max + ').'); return; }
      m[p.id] = v; algum = true;
    });
    if (form.topo && typeof form.topo === 'object') {
      var topo = {}; Object.keys(form.topo).forEach(function (k) { if (form.topo[k] && typeof m[k] === 'number') topo[k] = true; });
      if (Object.keys(topo).length) m.topo = topo;
    }
    m.troca = form.troca === true || form.troca === 'sim' ? true : form.troca === false || form.troca === 'nao' ? false : null;
    if (form.aposDose === true || form.aposDose === 'sim') m.aposDose = true; else if (form.aposDose === false || form.aposDose === 'nao') m.aposDose = false;
    m.nota = String(form.nota || '').trim().slice(0, 1000);
    if (!algum && !m.nota && m.troca === null) erros.push('Preencha pelo menos um parâmetro, a troca de água ou uma nota.');
    return { ok: !erros.length, medicao: m, erros: erros };
  }

  /* ---------- ciclagem guiada (ciclagem-regras.md, A2; C1–C11 validados pelo CEO em 28/10) ---------- */
  var CIC_K = { AMONIA_DOSE_MIN: 1, AMONIA_DOSE_MAX: 5, INTERVALO_MEDICAO_SEM_PEIXES_DIAS: 3, INTERVALO_MEDICAO_COM_PEIXES_DIAS: 1,
    MEDICOES_CONFIRMACAO: 2, INTERVALO_CONFIRMACAO_DIAS: 2, DIAS_DEMORA: 42, DIAS_DEMORA_FORTE: 56, DIAS_ACOMPANHAMENTO_POS_CICLAGEM: 42,
    PH_MIN_NITRIFICACAO: 6.8, KH_MIN_NITRIFICACAO_DKH: 1.1, NITRATO_REFERENCIA: 20, NH3_ATENCAO: 0.02, NH3_REFERENCIA: 0.05, NH3_CRONICO: 0.20,
    ESPERA_NOVOS_PEIXES_EMERGENCIA_DIAS: 14 };
  var FC = {
    'Manual Veterinário Merck': 'https://www.merckvetmanual.com/exotic-and-laboratory-animals/aquarium-fish/management-of-aquarium-fish',
    'SRAC': 'https://www.srac.msstate.edu/pdfs/Fact%20Sheets/4502%20How%20to%20Start%20a%20Biofilter.pdf',
    'RSPCA Austrália': 'https://kb.rspca.org.au/knowledge-base/why-is-water-quality-important-when-setting-up-a-fish-aquarium/',
    'UF/IFAS': 'https://ask.ifas.ufl.edu/publication/FA031',
    'Aquarium Co-Op': 'https://www.aquariumcoop.com/blogs/aquarium/nitrogen-cycle',
    'Embrapa': 'https://www.infoteca.cnptia.embrapa.br/infoteca/bitstream/doc/31730/1/comunicado47.pdf',
    'Instituto de Pesca (SP)': 'https://institutodepesca.org/index.php/bip/article/download/Pereira_31_1/Pereira_31_1/1838'
  };
  function fc(nomes) { return nomes.map(function (n) { return { titulo: n, url: FC[n] }; }); }
  var M = 'Manual Veterinário Merck', S = 'SRAC', RA = 'RSPCA Austrália', UF = 'UF/IFAS', AC = 'Aquarium Co-Op';
  var CIC = {
    rodape: 'Conteúdo educativo, com fonte. Os números orientam; quem decide é o teste da sua água. Se os peixes mostrarem sinais de sofrimento, procure um veterinário de peixes ou uma loja especializada de confiança.',
    fases: {
      inicio: { titulo: 'Começando', exp: 'As bactérias que limpam a água ainda não existem neste aquário. Elas crescem no filtro quando há amônia para consumir.',
        fazer: 'Deixe o filtro ligado dia e noite, use condicionador na água da torneira e ponha uma fonte de amônia até 1 a 5 mg/L. Depois, meça.', fontes: [M, S, RA] },
      sem_sinal: { titulo: 'Ainda sem sinal', exp: 'Amônia e nitrito em zero logo no começo quase sempre querem dizer que ainda não entrou amônia. Sem amônia, as bactérias não crescem.',
        fazer: 'Confira se a fonte de amônia foi colocada e meça de novo em 1 a 2 dias.', fontes: [S] },
      f1_amonia: { titulo: 'Fase 1: amônia', exp: 'A amônia apareceu e as primeiras bactérias começam a crescer. É normal ela subir antes de cair.',
        fazer: 'Meça a cada 2 a 3 dias. Se a amônia cair abaixo de 1 mg/L antes de o nitrito aparecer, reponha até a faixa de 1 a 5 mg/L. Não passe de 5.', fontes: [S, M, RA] },
      f2_amonia_nitrito: { titulo: 'Fase 2: amônia e nitrito', exp: 'Parte das bactérias já transforma a amônia em nitrito. Agora falta crescer a parte que transforma o nitrito em nitrato.',
        fazer: 'Continue pondo a fonte de amônia: o nitrito que alimenta a segunda etapa vem dela. Comece a medir também o nitrato.', fontes: [S] },
      f3_nitrito: { titulo: 'Fase 3: nitrito', exp: 'A amônia já some sozinha. O nitrito está no pico ou começando a cair. Costuma ser a fase mais demorada.',
        fazer: 'Paciência e a mesma rotina. Se demorar, confira pH, KH, temperatura e se o filtro fica ligado o tempo todo.', fontes: [S, UF] },
      f4_falta_nitrato: { titulo: 'Falta um número', exp: 'Amônia e nitrito estão em zero. Para saber se isso já é o filtro trabalhando ou se a ciclagem ainda nem começou, falta o nitrato: o critério das fontes inclui o nitrato aparecendo.',
        fazer: 'Meça o nitrato na próxima vez.', fontes: [RA] },
      zero_sem_dose: { titulo: 'Zero, mas sem prova', exp: 'Amônia e nitrito em zero só contam se a amônia continua entrando. Sem isso, o zero pode ser só falta de comida para as bactérias.',
        fazer: "Ponha a fonte de amônia e meça de novo cerca de 24 h depois. Marque 'pus amônia 24 h antes'.", fontes: [AC] },
      f4_confirmar: { titulo: 'Quase lá', exp: 'Uma medição já bate com o que as fontes descrevem como ciclado. Uma leitura só pode enganar.',
        fazer: 'Repita a medição em 2 a 3 dias, do mesmo jeito (no modo sem peixes, 24 h depois de pôr a amônia).', fontes: [M, RA, S] },
      f4_criterio: { titulo: 'Os números batem com "ciclado"', exp: '', fazer: '', fontes: [M, RA, AC] }
    },
    final: 'Seus dois últimos testes batem com o que o Manual Veterinário Merck e a RSPCA Austrália descrevem como aquário ciclado: amônia e nitrito em zero, com nitrato aparecendo. Introduza poucos peixes de cada vez e continue medindo amônia e nitrito a cada 2 a 3 dias nas próximas semanas. Se algum dos dois voltar, o app te avisa.',
    final_trecho: 'Introduza poucos peixes de cada vez',
    final_trecho_emergencia: 'Espere pelo menos 2 semanas antes de pôr peixes novos, e ponha poucos de cada vez',
    final_nitrato: 'Antes dos primeiros peixes, faça uma troca parcial para trazer o nitrato para menos de 20 mg/L, a faixa de referência veterinária.',
    faltam_dados: 'Para saber a fase, preciso de amônia e nitrito na mesma medição.',
    regressao: { titulo: 'Voltou a aparecer', texto: 'A amônia ou o nitrito voltaram. Acontece quando a carga aumenta (peixes novos, mais ração) e as bactérias ainda não acompanharam. Siga as orientações da fase atual.', fontes: [AC] },
    tend: {
      tend_amonia_caindo: { texto: 'A amônia começou a cair: as bactérias estão trabalhando. O nitrito deve aparecer ou subir em seguida.', fontes: [S] },
      tend_nitrito_caindo: { texto: 'O nitrito começou a cair: a segunda etapa está alcançando a primeira.', fontes: [S] },
      tend_nitrato_subindo: { texto: 'O nitrato está subindo: é o sinal de que o ciclo está se completando.', fontes: [S, RA] }
    },
    emergencia_cabecalho: 'Este aquário está ciclando com peixes dentro. As fontes recomendam ciclar sem peixes, porque a amônia e o nitrito sobem e os animais sofrem. Aqui o objetivo é proteger os peixes que já estão aí até o filtro se formar.',
    emergencia_sempre: 'Não ponha mais peixes até o fim da ciclagem. Dê pouca ração.',
    emergencia_vermelho: 'Amônia ou nitrito acima de zero com peixes no aquário. Faça uma troca parcial de 25 a 50% da água (com condicionador e na mesma temperatura) e reduza ou suspenda a ração por 1 a 3 dias. Meça de novo amanhã.',
    emergencia_nh3_cronico: 'Esse nível de amônia tóxica é o que a piscicultura associa a dano crônico aos peixes. Priorize a troca parcial hoje.',
    emergencia_dica: 'Se você tiver um aquário saudável e já ciclado, um pouco da mídia do filtro dele acelera a formação. Só use mídia de aquário sem doença.',
    nh3_sem_dados: 'Informe pH e temperatura para ver quanto da amônia está na forma tóxica.',
    avisos: {
      A1: { cor: 'amarelo', texto: 'Amônia acima de 5 mg/L, o topo da faixa que as fontes usam para ciclar. Não ponha mais até ela baixar.', fontes: [M, S] },
      A2: { cor: 'info', texto: 'Com pH abaixo de 6,8, as bactérias do filtro costumam trabalhar mais devagar. Não precisa mudar o pH: espere um pouco mais e confira o KH.', fontes: [S, AC] },
      A3: { cor: 'amarelo', texto: 'KH muito baixo: as bactérias do filtro usam o KH para trabalhar e, sem ele, o pH pode cair de repente. Trocas parciais com água tratada da torneira costumam repor o KH.', fontes: [UF, M] },
      A4: { cor: 'info', texto: 'Já são 6 semanas. As fontes falam em 4 a 6 semanas, e até 8 num aquário tropical. Confira: o filtro fica ligado 24 h? A água tem condicionador? pH, KH e temperatura estão na faixa? A amônia continua entrando?', fontes: [RA, M, S] },
      A5: { cor: 'amarelo', texto: 'Já passou de 8 semanas, o prazo mais longo que as fontes citam. Algo pode estar travando a ciclagem (veja a lista acima). Se puder, peça ajuda a um aquarista experiente ou a uma loja especializada, levando o histórico de medições do app.', fontes: [M] },
      A6: { cor: 'info', texto: 'A ciclagem precisa de amônia entrando: amônia pura sem perfume ou um pouco de ração se decompondo. Sem isso, nada acontece.', fontes: [S, AC] }
    },
    dica_medir: 'Meça sempre no mesmo horário e do mesmo jeito. Assim, a mudança no número é da água, não do teste.',
    prazo: 'As fontes falam em 4 a 6 semanas, e até 8 num aquário tropical. Quem decide são os testes.',
    prazo_midia: 'Com mídia de um filtro maduro, a formação costuma ser mais rápida.',
    prazo_produto: 'Produtos de bactérias podem encurtar o tempo, mas não substituem os testes.'
  };

  function medicoesCiclagem(estado, aq) {
    var c = cicConfig(aq); if (!c) return [];
    return medicoesDe(estado, aq.id).filter(function (m) { return (m.data || '').slice(0, 10) >= c.inicio; });
  }
  function valida(m) { return ehNum(m.amonia) && ehNum(m.nitrito); }
  function zeroZero(m) { return m.amonia === 0 && m.nitrito === 0; }
  // Fase provável (seção 3) para uma lista de medições válidas em ordem.
  function faseDe(lista, comPeixes) {
    if (!lista.length) return 'inicio';
    var u = lista[lista.length - 1];
    if (u.amonia > 0 && u.nitrito === 0) return 'f1_amonia';
    if (u.amonia > 0 && u.nitrito > 0) return 'f2_amonia_nitrito';
    if (u.amonia === 0 && u.nitrito > 0) return 'f3_nitrito';
    var dose = function (m) { return comPeixes || m.aposDose === true; };
    var prev = lista.length > 1 ? lista[lista.length - 2] : null;
    var teve = lista.some(function (m) { return m.amonia > 0 || m.nitrito > 0; });
    // P4a → P4c → P4d → P4b → P4e
    if (prev && zeroZero(prev) && diasEntre(paraData(prev.data), paraData(u.data)) >= CIC_K.INTERVALO_CONFIRMACAO_DIAS &&
      ((ehNum(u.nitrato) && u.nitrato > 0) || (ehNum(prev.nitrato) && prev.nitrato > 0)) && dose(u) && dose(prev)) return 'f4_criterio';
    if (!ehNum(u.nitrato)) return 'f4_falta_nitrato';
    if (!dose(u)) return 'zero_sem_dose';
    if (u.nitrato > 0) return 'f4_confirmar';
    if (!teve) return 'sem_sinal';
    return 'f4_falta_nitrato';   // HIPÓTESE (HANDOFF): já houve pico, mas o nitrato está em zero: pedimos o nitrato de novo, nunca "ciclado"
  }
  function ultimoCom(ms, k) { for (var i = ms.length - 1; i >= 0; i--) if (ehNum(ms[i][k])) return ms[i]; return null; }
  function proximaMedicao(fase, comPeixes, base, diasDesdeInicio) {
    var itens, dias;
    if (fase === 'inicio' || fase === 'sem_sinal') { itens = comPeixes ? 'Amônia e nitrito amanhã.' : 'Amônia e nitrito em 1 a 2 dias, depois de pôr a amônia.'; dias = comPeixes ? 1 : 2; }
    else if (/^f[123]_/.test(fase)) {
      itens = (fase === 'f1_amonia' ? 'Amônia e nitrito' : 'Amônia, nitrito e nitrato') + (comPeixes ? ' amanhã.' : ' em 3 dias.');
      dias = comPeixes ? CIC_K.INTERVALO_MEDICAO_COM_PEIXES_DIAS : CIC_K.INTERVALO_MEDICAO_SEM_PEIXES_DIAS;
    } else if (fase === 'f4_criterio') {
      var cedo = diasDesdeInicio < CIC_K.DIAS_ACOMPANHAMENTO_POS_CICLAGEM;
      itens = cedo ? 'Amônia e nitrito a cada 2 a 3 dias, até completar 6 semanas desde o início. Depois, a cada 1 a 2 semanas.' : 'Amônia e nitrito a cada 1 a 2 semanas.';
      dias = cedo ? 3 : 7;
    } else { itens = comPeixes ? 'Amônia, nitrito e nitrato em 2 dias.' : 'Amônia, nitrito e nitrato em 2 a 3 dias, 24 h depois de pôr a amônia.'; dias = 2; }
    return { itens: itens, sempre: 'pH e KH 1 vez por semana; temperatura sempre que medir.', dias: dias, data: base ? somarDias(base, dias) : null };
  }
  /* Leitura completa da ciclagem de um aquário (agora: Date, padrão hoje). */
  function lerCiclagem(estado, aq, agora) {
    var cfg = cicConfig(aq); if (!cfg) return null;
    agora = agora || new Date();
    var ms = medicoesCiclagem(estado, aq), validas = ms.filter(valida), cp = cfg.comPeixes;
    var fase = faseDe(validas, cp), u = validas.length ? validas[validas.length - 1] : null, prev = validas.length > 1 ? validas[validas.length - 2] : null;
    var dias = Math.max(0, diasEntre(paraData(cfg.inicio), agora));
    var info = CIC.fases[fase];
    var r = { fase: fase, titulo: info.titulo, exp: info.exp, fazer: cp && /^(inicio|sem_sinal|f[123]_)/.test(fase) ? CIC.emergencia_sempre : info.fazer,
      fontes: fc(info.fontes), comPeixes: cp, dias: dias, semana: Math.floor(dias / 7) + 1, ultima: u, medicoes: ms,
      faltamDados: !!(ms.length && !valida(ms[ms.length - 1])), regressao: false, tendencias: [], avisos: [], emergencia: null, final: null };
    if (fase === 'f4_criterio') {
      var t = CIC.final; if (cp) t = t.replace(CIC.final_trecho, CIC.final_trecho_emergencia);
      r.final = (ehNum(u.nitrato) && u.nitrato >= CIC_K.NITRATO_REFERENCIA ? CIC.final_nitrato + ' ' : '') + t;
    }
    if (prev && /^f[123]_/.test(fase) && /^f4_/.test(faseDe(validas.slice(0, -1), cp))) r.regressao = true;
    if (prev) {
      if ((fase === 'f1_amonia' || fase === 'f2_amonia_nitrito') && prev.amonia - u.amonia >= deltaMinimo('amonia')) r.tendencias.push('tend_amonia_caindo');
      if (fase === 'f3_nitrito' && prev.nitrito - u.nitrito >= deltaMinimo('nitrito')) r.tendencias.push('tend_nitrito_caindo');
      if ((fase === 'f2_amonia_nitrito' || fase === 'f3_nitrito') && ehNum(u.nitrato) && ehNum(prev.nitrato) && u.nitrato - prev.nitrato >= deltaMinimo('nitrato')) r.tendencias.push('tend_nitrato_subindo');
    }
    r.tendencias = r.tendencias.map(function (k) { return { id: k, texto: CIC.tend[k].texto, fontes: fc(CIC.tend[k].fontes) }; });
    var av = [], mph = ultimoCom(ms, 'ph'), mkh = ultimoCom(ms, 'kh');
    if (!cp && u && u.amonia > CIC_K.AMONIA_DOSE_MAX) av.push('A1');
    if (mph && mph.ph < CIC_K.PH_MIN_NITRIFICACAO) av.push('A2');
    if (mkh && mkh.kh < CIC_K.KH_MIN_NITRIFICACAO_DKH) av.push('A3');
    if (fase !== 'f4_criterio' && dias >= CIC_K.DIAS_DEMORA_FORTE) av.push('A5');
    if (fase !== 'f4_criterio' && dias >= CIC_K.DIAS_DEMORA) av.push('A4');
    if (!cp && cfg.fonteAmonia === 'nao_sei') av.push('A6');
    r.avisos = av.map(function (k) { var a = CIC.avisos[k]; return { id: k, cor: a.cor, texto: a.texto, fontes: fc(a.fontes) }; })
      .sort(function (a, b) { return COR_ORDEM[a.cor] - COR_ORDEM[b.cor]; });
    if (cp) {
      var e = { cabecalho: CIC.emergencia_cabecalho, sempre: CIC.emergencia_sempre, dica: CIC.emergencia_dica, vermelho: null, nh3: [], fontes: fc([S, M]) };
      if (u && (u.amonia > 0 || u.nitrito > 0)) e.vermelho = { texto: CIC.emergencia_vermelho, fontes: fc([UF, M]) };
      if (u && u.amonia > 0) {
        var x = nh3(u.amonia, u.ph, u.temp);
        if (x === null) e.nh3.push(CIC.nh3_sem_dados);
        else {
          if (x >= CIC_K.NH3_ATENCAO) e.nh3.push('Com o seu pH e a sua temperatura, cerca de ' + nh3Txt(x) + ' mg/L dessa amônia está na forma tóxica (NH₃).');
          if (x >= CIC_K.NH3_CRONICO) e.nh3.push(CIC.emergencia_nh3_cronico);
        }
        e.nh3valor = x;
      }
      r.emergencia = e;
    }
    r.proxima = proximaMedicao(fase, cp, u ? u.data.slice(0, 10) : (ms.length ? ms[ms.length - 1].data.slice(0, 10) : hojeISO(agora)), dias);
    r.proxima.dica = CIC.dica_medir;
    r.prazo = CIC.prazo + (cfg.semeadura === 'midia_madura' ? ' ' + CIC.prazo_midia : cfg.semeadura === 'produto_bacterias' ? ' ' + CIC.prazo_produto : '');
    // linha do tempo: fase da última medição válida de cada semana
    var porSem = {}, atual = Math.floor(dias / 7) + 1;
    ms.forEach(function (m) { var s = semanaDe(cfg.inicio, m.data); if (s) (porSem[s] = porSem[s] || []).push(m); });
    var maxS = Math.max.apply(null, [atual].concat(Object.keys(porSem).map(Number)));
    r.semanas = [];
    for (var s = 1; s <= maxS; s++) {
      var doS = porSem[s] || [], vS = doS.filter(valida), ult = vS[vS.length - 1];
      r.semanas.push({ semana: s, atual: s === atual, medicoes: doS, fase: ult ? faseDe(validas.slice(0, validas.indexOf(ult) + 1), cp) : null });
    }
    r.rodape = CIC.rodape;
    return r;
  }
  function tituloFase(f) { return CIC.fases[f] ? CIC.fases[f].titulo : ''; }
  function semanaDe(inicioISO, dataISO) {
    var a = paraData(inicioISO), b = paraData(dataISO); if (!a || !b) return null;
    var d = diasEntre(a, b); return d < 0 ? null : Math.floor(d / 7) + 1;
  }
  function ciclagemSemanas(estado, aq) {
    if (!aq.ciclagem || !aq.ciclagem.inicio) return null;
    var por = {};
    medicoesDe(estado, aq.id).forEach(function (m) {
      var s = semanaDe(aq.ciclagem.inicio, m.data); if (!s) return;
      (por[s] = por[s] || []).push(m);
    });
    var atual = semanaDe(aq.ciclagem.inicio, hojeISO()) || 1;
    var out = [];
    for (var s = 1; s <= Math.max(atual, Object.keys(por).length ? Math.max.apply(null, Object.keys(por).map(Number)) : 1); s++) out.push({ semana: s, medicoes: por[s] || [], atual: s === atual });
    return { inicio: aq.ciclagem.inicio, semanaAtual: atual, semanas: out };
  }

  /* ---------- manutenção e lembrete de troca parcial (manutencao.md, Ana) ---------- */
  var TPA_PADRAO_DIAS = 7, TPA_MIN_DIAS = 3, TPA_MAX_DIAS = 30;
  var TIPOS_MANUT = { tpa: 'Troca de água', filtro: 'Limpeza do filtro', sifonagem: 'Sifonagem', midia: 'Troca de mídia', outro: 'Outro' };
  var MIDIAS = { mecanica: 'mecânica', biologica: 'biológica', quimica: 'química', outra: 'outra' };
  function validarManutencao(form) {
    var m = { id: form.id || novoId('t'), aquario: form.aquario, tipo: form.tipo, data: String(form.data || hojeISO()).slice(0, 10), nota: String(form.nota || '').trim().slice(0, 300) }, erros = [];
    if (!m.aquario) erros.push('Escolha o aquário.');
    if (!TIPOS_MANUT[m.tipo]) erros.push('Escolha o que você fez.');
    if (!paraData(m.data)) erros.push('Data inválida.'); else if (m.data > hojeISO()) erros.push('A data não pode ser no futuro.');
    if (m.tipo === 'tpa') { var p = lerNumero(form.pct); if (p === null || isNaN(p) || p <= 0 || p > 100) erros.push('Quanto da água você trocou? (1 a 100%)'); else m.pct = Math.round(p); }
    if (m.tipo === 'midia') { if (!MIDIAS[form.midia]) erros.push('Qual mídia?'); else m.midia = form.midia; }
    if (m.tipo === 'outro' && !m.nota) erros.push('O que foi? (ex.: podei as plantas)');
    return { ok: !erros.length, manutencao: m, erros: erros };
  }
  // Histórico: manutenções registradas + medições com "troca parcial: sim" (contam como TPA, sem %). Mais recente primeiro.
  function manutencoesDe(estado, aqId) {
    var a = (estado.manutencoes || []).filter(function (m) { return m.aquario === aqId; }).map(function (m) { return m; });
    medicoesDe(estado, aqId).forEach(function (m) { if (m.troca === true) a.push({ id: 'med-' + m.id, aquario: aqId, tipo: 'tpa', data: m.data.slice(0, 10), pct: null, deMedicao: true }); });
    return a.sort(function (x, y) { return x.data < y.data ? 1 : x.data > y.data ? -1 : (x.deMedicao ? 1 : -1); });
  }
  function ultimaTPA(estado, aqId) { return manutencoesDe(estado, aqId).filter(function (m) { return m.tipo === 'tpa'; })[0] || null; }
  function intervaloTPA(aq) { return aq && aq.tpa && ehNum(aq.tpa.intervalo) ? aq.tpa.intervalo : TPA_PADRAO_DIAS; }
  // estado: 'off' | 'sem' | 'em-dia' | 'amanha' | 'hoje' | 'atrasada'
  function statusTPA(estado, aq, agora) {
    var n = intervaloTPA(aq); if (!n) return { estado: 'off', intervalo: 0, ultima: ultimaTPA(estado, aq.id) };
    var u = ultimaTPA(estado, aq.id); if (!u) return { estado: 'sem', intervalo: n, ultima: null };
    var prox = somarDias(u.data, n), d = diasEntre(agora || new Date(), paraData(prox));
    return { estado: d > 1 ? 'em-dia' : d === 1 ? 'amanha' : d === 0 ? 'hoje' : 'atrasada', dias: Math.abs(d), intervalo: n, ultima: u, proxima: prox };
  }

  /* ---------- modo demonstração (para gravar): 2 aquários fictícios marcados demo:true, fora do backup ---------- */
  function criarDemo(agora) {
    agora = agora || new Date();
    var hoje = hojeISO(agora), d = function (n, h) { return somarDias(hoje, -n) + 'T' + (h || '19:30'); }, ts = agora.toISOString();
    var a1 = { id: 'demo-ciclagem', demo: true, nome: 'Aquário novo', forma: 'ret', dim: { c: 60, l: 30, a: 36, substrato: 4, folga: 3 }, litrosManual: null,
      filtro: 'Filtro externo de cascata (hang-on)', aquecedor: true, montagem: somarDias(hoje, -17), fauna: [], plantado: false, camaroes: false, semPeixes: true,
      ciclagem: { inicio: somarDias(hoje, -17), comPeixes: false, fonteAmonia: 'amonia', semeadura: 'nenhuma' }, tpa: { intervalo: 7 }, criado: ts, atualizado: ts };
    var a2 = { id: 'demo-sala', demo: true, nome: 'Aquário da sala', forma: 'ret', dim: { c: 100, l: 40, a: 50, substrato: 5, folga: 4 }, litrosManual: null,
      filtro: 'Canister', aquecedor: true, montagem: somarDias(hoje, -120), fauna: [{ id: 'cardinal', qtd: 10 }, { id: 'coridora-pimenta', qtd: 6 }],
      plantado: true, camaroes: false, tpa: { intervalo: 7 }, criado: ts, atualizado: ts };
    // ciclagem sem peixes, semana 3: amônia sobe e cai, o nitrito aparece e sobe, o nitrato começa (curva da SRAC). Doses entre 1 e 5 mg/L (Merck).
    var cic = [[16, 2, 0, 0], [13, 4, 0.25, 0], [10, 3, 1, 5], [7, 2, 2, 10], [4, 0.5, 4, 20], [1, 0, 5, 40]];
    var meds = cic.map(function (x, i) {
      return { id: 'demo-mc' + i, demo: true, aquario: a1.id, data: d(x[0]), amonia: x[1], nitrito: x[2], nitrato: x[3], ph: i % 2 ? 7.2 : 7.4, temp: 26, kh: i < 3 ? 5 : 4, aposDose: true, troca: null, nota: '', atualizado: ts };
    });
    // aquário montado: 8 semanas, amônia e nitrito em zero, temperatura e pH dentro da faixa comum (cardinal 23–29 °C e pH 3,5–7,5; coridora-pimenta 22–26 °C e pH 6,0–7,0).
    // Alerta ativo de propósito: nitrato 25 mg/L na última medição (acima da referência de 20 mg/L do Merck), medido antes da troca de 2 dias atrás.
    var nit = [10, 10, 15, 10, 15, 15, 20, 25], tmp = [25, 25.5, 25, 24.5, 25, 25.5, 25, 25.5], ph = [6.8, 6.8, 6.6, 6.8, 6.6, 6.8, 6.6, 6.6];
    for (var i = 0; i < 8; i++) meds.push({ id: 'demo-ms' + i, demo: true, aquario: a2.id, data: d(3 + (7 - i) * 7), temp: tmp[i], ph: ph[i], amonia: 0, nitrito: 0, nitrato: nit[i],
      kh: i % 3 ? 4 : 3, gh: 6, troca: null, nota: i === 5 ? 'Podei as plantas.' : '', atualizado: ts });
    var man = [];
    for (var k = 0; k < 8; k++) man.push({ id: 'demo-t' + k, demo: true, aquario: a2.id, tipo: 'tpa', data: somarDias(hoje, -(2 + (7 - k) * 7)), pct: k % 2 ? 25 : 20, nota: '', atualizado: ts });
    man.push({ id: 'demo-tf', demo: true, aquario: a2.id, tipo: 'filtro', data: somarDias(hoje, -23), nota: 'Enxaguei a esponja na água tirada do aquário.', atualizado: ts });
    man.push({ id: 'demo-ts', demo: true, aquario: a2.id, tipo: 'sifonagem', data: somarDias(hoje, -9), nota: '', atualizado: ts });
    return { aquarios: [a1, a2], medicoes: meds, manutencoes: man };
  }
  function temDemo(estado) { return estado.aquarios.some(function (a) { return a.demo; }); }
  function carregarDemo(estado, agora) {
    var r = removerDemo(estado), d = criarDemo(agora);
    r.aquarios = d.aquarios.concat(r.aquarios); r.medicoes = r.medicoes.concat(d.medicoes); r.manutencoes = r.manutencoes.concat(d.manutencoes);
    return r;
  }
  // Apaga só o que é exemplo (marcado demo ou ligado a aquário demo). Dados reais ficam intactos.
  function removerDemo(estado) {
    var ids = {}; estado.aquarios.forEach(function (a) { if (a.demo) ids[a.id] = 1; });
    var fica = function (x) { return !x.demo && !ids[x.aquario]; };
    var r = JSON.parse(JSON.stringify(estado));
    r.aquarios = r.aquarios.filter(function (a) { return !a.demo; }); r.medicoes = r.medicoes.filter(fica); r.manutencoes = (r.manutencoes || []).filter(fica);
    return r;
  }

  /* ---------- backup (o exemplo da demonstração fica de fora) ---------- */
  function exportar(estado, agora) {
    var c = removerDemo(estado);
    c.app = ASSINATURA; c.versao = VERSAO_DADOS; c.exportadoEm = (agora || new Date()).toISOString();
    return JSON.stringify(c, null, 1);
  }
  function nomeBackup(agora) { return 'assistente-aquarista-backup-' + hojeISO(agora) + '.json'; }
  function lerBackup(texto) {
    var o;
    try { o = JSON.parse(texto); } catch (e) { return { ok: false, erro: 'Este arquivo não é um backup do Assistente (não é JSON).' }; }
    if (!o || o.app !== ASSINATURA) return { ok: false, erro: 'Este arquivo não é um backup do Assistente do Aquarista.' };
    if (o.versao > VERSAO_DADOS) return { ok: false, erro: 'O backup é de uma versão mais nova do app. Atualize o app e tente de novo.' };
    var e = removerDemo(migrar(o));
    return { ok: true, estado: e, resumo: { aquarios: e.aquarios.length, medicoes: e.medicoes.length, manutencoes: e.manutencoes.length, exportadoEm: o.exportadoEm || null } };
  }
  function mesclar(atual, backup) {
    var r = migrar(JSON.parse(JSON.stringify(atual))), novos = { aquarios: 0, medicoes: 0, manutencoes: 0 };
    function junta(lista, nova, chave) {
      var idx = {}; lista.forEach(function (x, i) { idx[x.id] = i; });
      nova.forEach(function (x) {
        if (x.demo) return;
        if (idx[x.id] === undefined) { lista.push(x); novos[chave]++; }
        else if ((x.atualizado || '') > (lista[idx[x.id]].atualizado || '')) lista[idx[x.id]] = x;
      });
    }
    junta(r.aquarios, backup.aquarios, 'aquarios');
    junta(r.medicoes, backup.medicoes, 'medicoes');
    junta(r.manutencoes, backup.manutencoes || [], 'manutencoes');
    (backup.meta.pedidos || []).forEach(function (p) { if (r.meta.pedidos.indexOf(p) < 0) r.meta.pedidos.push(p); });
    return { estado: r, novos: novos };
  }
  function precisaBackup(estado, agora) {
    agora = agora || new Date();
    if (!estado.medicoes.some(function (m) { return !m.demo; }) && !estado.aquarios.some(function (a) { return !a.demo; })) return null;
    if (estado.meta.medicoesDesdeBackup >= BACKUP_MEDICOES) return 'medicoes';
    var ref = estado.meta.ultimoBackup ? new Date(estado.meta.ultimoBackup) : new Date(estado.meta.criado);
    return diasEntre(ref, agora) >= BACKUP_DIAS ? 'tempo' : null;
  }

  /* ---------- lembretes por arquivo de agenda (.ics), sem notificação ----------
     opc: { titulo, descricao, hora 'HH:MM', agora: Date,
            diaSemana (0 = domingo)  → repete toda semana nesse dia;  ou
            inicio 'AAAA-MM-DD' + intervaloDias → repete a cada N dias a partir da próxima data ≥ hoje;  ou
            inicio + unico: true → um evento só }  */
  var DIAS_ICS = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
  function ics(opc) {
    var agora = opc.agora || new Date(), hm = (opc.hora || '10:00').split(':'), d, regra = null;
    if (opc.inicio) {
      var i0 = paraData(opc.inicio); d = new Date(i0.getFullYear(), i0.getMonth(), i0.getDate(), +hm[0], +hm[1]);
      if (opc.intervaloDias) { while (d <= agora) d.setDate(d.getDate() + opc.intervaloDias); regra = 'RRULE:FREQ=DAILY;INTERVAL=' + opc.intervaloDias; }
      else if (!opc.unico) regra = null;
    } else {
      d = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate(), +hm[0], +hm[1]);
      while (d.getDay() !== opc.diaSemana || d <= agora) d.setDate(d.getDate() + 1);
      regra = 'RRULE:FREQ=WEEKLY;BYDAY=' + DIAS_ICS[opc.diaSemana];
    }
    function f(x) { return x.getFullYear() + dois(x.getMonth() + 1) + dois(x.getDate()) + 'T' + dois(x.getHours()) + dois(x.getMinutes()) + '00'; }
    var fim = new Date(d.getTime() + 15 * 60000);
    var esc = function (s) { return String(s).replace(/[\\;,]/g, function (c) { return '\\' + c; }).replace(/\n/g, '\\n'); };
    var tit = opc.titulo || 'Medir a água do aquário';
    return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Paragon//Assistente do Aquarista//PT-BR', 'CALSCALE:GREGORIAN', 'BEGIN:VEVENT',
      'UID:' + novoId('lembrete') + '@paragon', 'DTSTAMP:' + f(agora), 'DTSTART:' + f(d), 'DTEND:' + f(fim)]
      .concat(regra ? [regra] : [])
      .concat(['SUMMARY:' + esc(tit), 'DESCRIPTION:' + esc(opc.descricao || 'Abra o Assistente do Aquarista e lance a medição da semana.'),
        'BEGIN:VALARM', 'TRIGGER:-PT0M', 'ACTION:DISPLAY', 'DESCRIPTION:' + esc(tit), 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR']).join('\r\n') + '\r\n';
  }

  return { PARAMS: PARAMS, PORID: PORID, BACKUP_DIAS: BACKUP_DIAS, BACKUP_MEDICOES: BACKUP_MEDICOES, ASSINATURA: ASSINATURA, VERSAO_DADOS: VERSAO_DADOS,
    num: num, lerNumero: lerNumero, novoId: novoId, hojeISO: hojeISO, paraData: paraData, dataCurta: dataCurta, diasEntre: diasEntre, somarDias: somarDias,
    estadoVazio: estadoVazio, migrar: migrar, litragem: litragem, litragemGlobo: litragemGlobo, litrosDoAquario: litrosDoAquario, avisoGlobo: avisoGlobo, GLOBO_AVISO_L: GLOBO_AVISO_L,
    especiesDaFauna: especiesDaFauna, semFicha: semFicha, contexto: contexto, cicConfig: cicConfig,
    faixaComum: faixaComum, avaliar: avaliar, faixaTxt: faixaTxt, fontesDe: fontesDe,
    configurarAgua: configurarAgua, paramAgua: paramAgua, faixaGeral: faixaGeral, fontesAgua: fontesAgua, deltaMinimo: deltaMinimo, unidadesDe: unidadesDe, paraPadrao: paraPadrao,
    medicoesDe: medicoesDe, serie: serie, ultimoValor: ultimoValor, alertas: alertas, alertasFortes: alertasFortes, alertasGerais: alertasGerais, tendencia: tendencia,
    validarMedicao: validarMedicao, fracaoNH3: fracaoNH3, nh3: nh3,
    CIC: CIC, CIC_K: CIC_K, lerCiclagem: lerCiclagem, faseDe: faseDe, tituloFase: tituloFase, semanaDe: semanaDe, ciclagemSemanas: ciclagemSemanas,
    TIPOS_MANUT: TIPOS_MANUT, MIDIAS: MIDIAS, TPA_PADRAO_DIAS: TPA_PADRAO_DIAS, TPA_MIN_DIAS: TPA_MIN_DIAS, TPA_MAX_DIAS: TPA_MAX_DIAS,
    validarManutencao: validarManutencao, manutencoesDe: manutencoesDe, ultimaTPA: ultimaTPA, intervaloTPA: intervaloTPA, statusTPA: statusTPA,
    criarDemo: criarDemo, carregarDemo: carregarDemo, removerDemo: removerDemo, temDemo: temDemo,
    exportar: exportar, nomeBackup: nomeBackup, lerBackup: lerBackup, mesclar: mesclar, precisaBackup: precisaBackup, ics: ics };
});
