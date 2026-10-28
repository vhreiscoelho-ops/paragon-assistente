/* Checador Paragon — motor de regras (funções puras, sem DOM, sem rede).
   Implementa 01-conteudo/ferramenta/regras.md (Ana, 19/10/2026), com as frases de microtextos.md.
   Nenhum número técnico fica aqui: as espécies vêm de especies.json e as constantes de dados/parametros.json
   (cada constante com o rótulo FONTE ou REGRA PRÁTICA). Roda no navegador (window.Regras) e no Node (testes). */
(function (raiz, fabrica) {
  if (typeof module === 'object' && module.exports) module.exports = fabrica();
  else raiz.Regras = fabrica();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var NIVEL = { ok: 0, atencao: 1, ruim: 2 };
  // Ordem da tela (regras.md, seção 11): dentro de cada cor, nesta sequência.
  // 'legal' (status legal no Brasil) vai sempre no topo, de qualquer cor (ESQUEMA.md, 20/10/2026).
  var ORDEM = ['legal', 'lista', 'sozinho', 'companhia', 'predacao', 'temperatura', 'ph', 'temperamento', 'cascudos', 'litragem', 'cardume', 'mesma', 'gh', 'plantas', 'camaroes', 'madeira'];
  var ESP = {};   // parametros.especiais da análise atual

  /* ---------- parâmetros ---------- */
  function k(p, nome) { var c = p.constantes && p.constantes[nome]; if (!c) throw new Error('constante ausente em parametros.json: ' + nome); return c.valor; }
  function lista(nome, id) { return (ESP[nome] || []).indexOf(id) >= 0; }

  /* ---------- texto ---------- */
  function normalizar(s) {
    return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  }
  // Código L (ESQUEMA.md): "L 046", "l-46", "L0046" → "l46". Devolve null se o texto não for um código L.
  function codigoL(s) {
    // aceita letra final do índice de L-numbers (L027b, L010a)
    var m = /^l0*(\d+)([a-z]?)$/.exec(String(s || '').toLowerCase().replace(/[\s\-_.]+/g, ''));
    return m ? 'l' + m[1] + m[2] : null;
  }
  function fem(e) { return e.artigo === 'a'; }
  // Nome no meio da frase: inicial minúscula, exceto nomes próprios/científicos (parametros.especiais.nome_proprio).
  function nome(e) { var n = e.nome_popular; return lista('nome_proprio', e.id) ? n : n.charAt(0).toLowerCase() + n.slice(1); }
  function comArtigo(e, maiuscula) {
    var a = e.artigo || 'o';
    if (maiuscula) a = a.toUpperCase();
    return a + ' ' + nome(e);
  }
  function de(e) { return (fem(e) ? 'da ' : 'do ') + nome(e); }
  function um(e) { return fem(e) ? 'uma' : 'um'; }
  function num(n) { return String(n).replace('.', ','); }
  function faixaTxt(f, un) { return f[0] === f[1] ? num(f[0]) + (un || '') : num(f[0]) + '–' + num(f[1]) + (un || ''); }

  /* ---------- busca ---------- */
  function buscar(especies, termo, limite) {
    var t = normalizar(termo), cod = codigoL(termo);
    if (!t) return [];
    var saida = [];
    especies.forEach(function (e, ordem) {
      // _apelidos: nomes antigos de espécies divididas (ex.: "Cascudo-comum"), postos pelo app a partir de parametros.especiais.ids_antigos; não aparecem na tela
      var nomes = [e.nome_popular].concat(e.outros_nomes || [], [e.nome_cientifico], e._apelidos || []).map(normalizar);
      var melhor = 99;
      // código L exato vem antes de tudo ("L1" acha o L001, não o L134)
      if (cod && (e.codigo_l || []).concat(e.outros_nomes || []).some(function (x) { return codigoL(x) === cod; })) melhor = -1;
      nomes.forEach(function (n, i) {
        var p = n.indexOf(t);
        if (p === 0) melhor = Math.min(melhor, i === 0 ? 0 : 1);
        else if (p > 0) melhor = Math.min(melhor, n.charAt(p - 1) === ' ' ? 2 : 3);
      });
      if (melhor < 99) saida.push({ e: e, r: melhor, o: ordem });
    });
    // empate: vale a ordem do especies.json (as mais buscadas primeiro)
    saida.sort(function (a, b) { return a.r - b.r || a.o - b.o; });
    return saida.slice(0, limite || 8).map(function (x) { return x.e; });
  }

  /* ---------- busca com o índice de L-numbers (cascudos-l-indice.json, ESQUEMA.md, 20/10/2026) ----------
     Devolve [{ especie }] ou [{ indice: item }] (item do índice SEM ficha completa: só cartão, nunca entra na checagem).
     1. Código L exato: item com id_especie → a ficha completa; sem ficha → o cartão do índice. Vêm primeiro.
     2. Depois, o resultado normal de buscar() (sem repetir espécie).
     3. Por fim, itens do índice sem ficha cujo nome científico ou comum bate (ex.: "Pseudacanthicus"), a partir de 3 letras. */
  function buscarComIndice(especies, indice, termo, limite) {
    limite = limite || 8;
    var itens = (indice && indice.itens) || [], t = normalizar(termo), cod = codigoL(termo);
    if (!t) return [];
    var porId = {}; especies.forEach(function (e) { porId[e.id] = e; });
    var saida = [], vistos = {}, codVistos = {};
    function poeE(e) { if (e && !vistos[e.id]) { vistos[e.id] = 1; saida.push({ especie: e }); } }
    function poeI(it) { if (!codVistos[it.codigo]) { codVistos[it.codigo] = 1; saida.push({ indice: it }); } }
    if (cod) itens.forEach(function (it) {
      if (codigoL(it.codigo) !== cod) return;
      if (it.id_especie && porId[it.id_especie]) poeE(porId[it.id_especie]); else poeI(it);
    });
    buscar(especies, termo, limite).forEach(poeE);
    if (!cod && t.length >= 3) itens.forEach(function (it) {
      if (it.id_especie && porId[it.id_especie]) return;
      var nomes = [it.nome_cientifico, it.nome_comum].map(normalizar);
      if (nomes.some(function (n) { return n.indexOf(t) === 0 || n.indexOf(' ' + t) >= 0; })) poeI(it);
    });
    return saida.slice(0, limite);
  }

  /* ---------- faixas ---------- */
  // Interseção de faixas [min, max]. Ignora espécies sem o dado (null) e marca "parcial".
  function intersecao(faixas) {
    var v = faixas.filter(function (f) { return Array.isArray(f) && f.length === 2; });
    if (!v.length) return null;
    var lo = Math.max.apply(null, v.map(function (f) { return f[0]; }));
    var hi = Math.min.apply(null, v.map(function (f) { return f[1]; }));
    return { min: lo, max: hi, existe: lo <= hi, largura: Math.round((hi - lo) * 100) / 100, parcial: v.length < faixas.length, n: v.length };
  }

  /* ---------- análise ---------- */
  // selecao: [{ especie, qtd }]; opcoes: { litros, plantado, camaroes }; p: parametros.json
  function analisar(selecao, opcoes, p) {
    opcoes = opcoes || {};
    ESP = p.especiais || {};
    var conflitos = [];
    var esp = selecao.map(function (s) { return s.especie; });
    var qtd = {}; selecao.forEach(function (s) { qtd[s.especie.id] = s.qtd; });
    function porId(id) { return esp.find(function (e) { return e.id === id; }); }
    function add(c) {
      var b = (p.base_por_tipo || {})[c.tipo] || {};
      c.base = { rotulo: b.base || '', explicacao: b.explicacao || '' };
      c.fontes_regra = (b.fontes || []).map(function (id) { return (p.fontes_regras || {})[id]; }).filter(Boolean);
      c.fontes = fontesDe(c.especies.map(porId));
      conflitos.push(c);
    }
    var pares = {};
    function chave(a, b) { return [a, b].sort().join('|'); }
    function grupo(x) { return x.length > 1; }

    // 1. Temperatura
    var temp = intersecao(esp.map(function (e) { return e.temperatura_c; }));
    var frias = esp.filter(function (e) { return lista('agua_fria', e.id); });
    var notaFria = frias.length && frias.length < esp.length ? ' ' + frias.map(function (e) { return e.nome_popular; }).join(' e ') + ' é peixe de água fria.' : '';
    // regras.md, seção 1 (20/10/2026): kinguio (água fria) + tropical que pede aquecedor (mín. ≥ KINGUIO_TROPICAL_MIN_C) = atenção, mesmo com faixa comum
    var tropicais = frias.length ? esp.filter(function (e) { return !lista('agua_fria', e.id) && e.temperatura_c && e.temperatura_c[0] >= k(p, 'KINGUIO_TROPICAL_MIN_C'); }) : [];
    if (grupo(esp) && temp && temp.n > 1) {
      if (!temp.existe) add({ nivel: 'ruim', tipo: 'temperatura', titulo: 'A temperatura não bate', frase: 'Nenhuma temperatura serve para todos. Cada um pede: ' + listaFaixas(esp, 'temperatura_c', ' °C') + '.' + notaFria, especies: ids(esp) });
      else if (tropicais.length) {
        var f0 = frias[0];
        add({ nivel: 'atencao', tipo: 'temperatura', titulo: frias.map(function (e) { return e.nome_popular; }).join(' e ') + ' com peixe tropical',
          frase: comArtigo(f0, true) + ' vive sem aquecedor e pede até ' + num(f0.temperatura_c[1]) + ' °C; ' + tropicais.map(function (e) { return comArtigo(e) + ' pede ' + faixaTxt(e.temperatura_c, ' °C'); }).join('; ') +
            '. Dá para achar uma temperatura comum (' + faixaTxt([temp.min, temp.max], ' °C') + '), mas fica no limite dos dois, e ' + comArtigo(f0) + ' suja mais a água.', especies: ids(frias.concat(tropicais)) });
      }
      else if (temp.largura < k(p, 'MARGEM_TEMPERATURA_C')) add({ nivel: 'atencao', tipo: 'temperatura', titulo: 'Temperatura no limite', frase: 'Só ' + faixaTxt([temp.min, temp.max], ' °C') + ' serve para todos. Pouca folga: qualquer variação tira alguém da faixa.' + notaFria, especies: ids(esp) });
    }
    // 2. pH e GH
    var ph = intersecao(esp.map(function (e) { return e.ph; }));
    if (grupo(esp) && ph && ph.n > 1) {
      if (!ph.existe) add({ nivel: 'ruim', tipo: 'ph', titulo: 'O pH não bate', frase: 'Nenhum pH serve para todos. Cada um pede: ' + listaFaixas(esp, 'ph', '') + '.', especies: ids(esp) });
      else if (ph.largura < k(p, 'MARGEM_PH')) add({ nivel: 'atencao', tipo: 'ph', titulo: 'pH no limite', frase: 'Só pH ' + faixaTxt([ph.min, ph.max]) + ' serve para todos. Qualquer oscilação tira alguém da faixa.', especies: ids(esp) });
    }
    var gh = intersecao(esp.map(function (e) { return e.gh_dgh; }));   // pula quem tem gh_dgh null
    if (grupo(esp) && gh && gh.n > 1 && !gh.existe) add({ nivel: 'atencao', tipo: 'gh', titulo: 'A dureza da água não bate', frase: 'Uns pedem água mais mole, outros mais dura: ' + listaFaixas(esp.filter(function (e) { return e.gh_dgh; }), 'gh_dgh', ' dGH') + '.', especies: ids(esp) });

    // 8. Lista explícita (vale nos dois sentidos) — vem antes: se o par está aqui, não repete o temperamento
    var i, j, a, b, c;
    for (i = 0; i < esp.length; i++) for (j = i + 1; j < esp.length; j++) {
      a = esp[i]; b = esp[j];
      if ((a.nao_misturar_com || []).indexOf(b.id) >= 0 || (b.nao_misturar_com || []).indexOf(a.id) >= 0) {
        pares[chave(a.id, b.id)] = 'lista';
        add({ nivel: 'ruim', tipo: 'lista', titulo: 'A fonte desaconselha essa dupla', frase: comArtigo(a, true) + ' e ' + comArtigo(b) + ' não devem dividir o aquário. O motivo está em "Ver fonte" e na ficha de cada um.', especies: [a.id, b.id] });
      }
    }

    // 8b. Companhia restrita (regras.md, 20/10/2026): A com `companhia` + B fora de `aceita` = cor de A; dois sentidos, pior cor;
    // par já na lista explícita = só a regra 8. O título leva os dois nomes (as sugestões comparam conflitos pelo título).
    function restrito(x, y) { return x.companhia && (x.companhia.aceita || []).indexOf(y.id) < 0 ? x : null; }
    var soPar = {};   // pares já cobertos pela 8c (não usa `pares`: o temperamento continua valendo)
    // 8c. Melhor sozinho (regras.md, 20/10/2026): espécie de especiais.sozinho_preferivel + qualquer outra espécie = atenção, sem exceção verde.
    // Um aviso só por par: substitui a 8b do par (se a outra espécie também tem companhia restrita, a frase dela entra e vale a pior cor).
    for (i = 0; i < esp.length; i++) for (j = i + 1; j < esp.length; j++) {
      a = esp[i]; b = esp[j];
      var sos = [a, b].filter(function (x) { return lista('sozinho_preferivel', x.id); });
      if (!sos.length || pares[chave(a.id, b.id)] === 'lista') continue;
      soPar[chave(a.id, b.id)] = 1;
      var outros = [a, b].filter(function (x) { return sos.indexOf(x) < 0; }).map(function (x) { return restrito(x, x === a ? b : a); }).filter(Boolean);
      var s0 = sos[0];
      var frases = sos.map(function (x) { return (x.companhia && x.companhia.texto) || (comArtigo(x, true) + ' fica melhor sozinho.'); })
        .concat(outros.map(function (d) { return d.companhia.texto; }));
      add({ nivel: outros.some(function (d) { return d.companhia.cor === 'vermelho'; }) ? 'ruim' : 'atencao', tipo: 'sozinho',
        titulo: a.nome_popular + ' e ' + nome(b) + ': ' + comArtigo(s0) + ' fica melhor sozinho',
        frase: frases.join(' '), especies: [a.id, b.id] });
    }
    for (i = 0; i < esp.length; i++) for (j = i + 1; j < esp.length; j++) {
      a = esp[i]; b = esp[j];
      if (pares[chave(a.id, b.id)] === 'lista' || soPar[chave(a.id, b.id)]) continue;
      var donos = [restrito(a, b), restrito(b, a)].filter(Boolean);
      if (!donos.length) continue;
      var ruim = donos.some(function (d) { return d.companhia.cor === 'vermelho'; });
      add({ nivel: ruim ? 'ruim' : 'atencao', tipo: 'companhia', titulo: a.nome_popular + ' e ' + nome(b) + ': companhia que a fonte não indica',
        frase: donos.map(function (d) { return d.companhia.texto; }).join(' '), especies: [a.id, b.id] });
    }

    // 3. Predação: presa.max comparada ao predador.tipico
    var vermelho = k(p, 'FRACAO_PREDACAO_VERMELHO'), amarelo = k(p, 'FRACAO_PREDACAO_AMARELO');
    for (i = 0; i < esp.length; i++) for (j = 0; j < esp.length; j++) {
      a = esp[i]; b = esp[j];
      if (i === j || !a.come_peixes_pequenos || !a.tamanho_adulto_cm || !b.tamanho_adulto_cm) continue;
      var presa = b.tamanho_adulto_cm.max, boca = a.tamanho_adulto_cm.tipico;
      if (presa <= vermelho * boca) {
        pares[chave(a.id, b.id)] = pares[chave(a.id, b.id)] || 'predacao';
        add({ nivel: 'ruim', tipo: 'predacao', titulo: comArtigo(a, true) + ' pode comer ' + comArtigo(b),
          frase: comArtigo(a, true) + ' chega a ' + num(a.tamanho_adulto_cm.max) + ' cm e engole o que cabe na boca. ' + comArtigo(b, true) + ' cabe.', especies: [a.id, b.id] });
      } else if (presa <= amarelo * boca) {
        add({ nivel: 'atencao', tipo: 'predacao', titulo: comArtigo(a, true) + ' pode comer ' + comArtigo(b) + ' jovem',
          frase: 'Risco: ' + comArtigo(b) + ' jovem ou recém-chegad' + (fem(b) ? 'a' : 'o') + ' pode virar comida ' + de(a) + '.', especies: [a.id, b.id] });
      }
    }

    // 4. Temperamento (pula pares já cobertos pela lista explícita ou por predação vermelha)
    var frac = k(p, 'FRACAO_TAMANHO_INTIMIDACAO'), grande = k(p, 'PORTE_TERRITORIAL_GRANDE_CM');
    var T = function (e) { return e.temperamento; };
    var tip = function (e) { return (e.tamanho_adulto_cm || {}).tipico || 0; };
    var max = function (e) { return (e.tamanho_adulto_cm || {}).max || 0; };
    var defende = function (e) { return T(e) === 'territorial' || T(e) === 'semi-agressivo'; };
    for (i = 0; i < esp.length; i++) for (j = i + 1; j < esp.length; j++) {
      a = esp[i]; b = esp[j];
      if (pares[chave(a.id, b.id)]) continue;
      c = null;
      var ag = T(a) === 'agressivo' ? a : T(b) === 'agressivo' ? b : null, outro = ag === a ? b : a;
      if (ag && T(outro) === 'pacifico') {
        c = { nivel: 'ruim', titulo: comArtigo(ag, true) + ' pode perseguir ' + comArtigo(outro), frase: comArtigo(ag, true) + ' é agressiv' + (fem(ag) ? 'a' : 'o') + ' e tende a perseguir ' + comArtigo(outro) + '.', especies: [ag.id, outro.id] };
      } else if (ag && T(outro) === 'semi-agressivo') {
        // regras.md, seção 4 (20/10/2026): agressivo + semi-agressivo = atenção (ex.: mbuna zebra + mbuna yellow)
        c = { nivel: 'atencao', titulo: comArtigo(ag, true) + ' pode perseguir ' + comArtigo(outro), frase: comArtigo(ag, true) + ' é agressiv' + (fem(ag) ? 'a' : 'o') + ' e pode perseguir ' + comArtigo(outro) + ': dê espaço, pedras e esconderijos.', especies: [ag.id, outro.id] };
      } else if (ag) {
        // agressivo + agressivo ou territorial
        c = { nivel: 'ruim', titulo: 'Risco de briga', frase: comArtigo(a, true) + ' e ' + comArtigo(b) + ' tendem a brigar.', especies: [a.id, b.id] };
      } else if (T(a) === 'territorial' && T(b) === 'territorial' && tip(a) >= grande && tip(b) >= grande) {
        c = { nivel: 'ruim', titulo: 'Briga por território', frase: comArtigo(a, true) + ' e ' + comArtigo(b) + ' são grandes e defendem território. Juntos, tendem a brigar por espaço.', especies: [a.id, b.id] };
      } else if ((T(a) === 'territorial' && defende(b)) || (T(b) === 'territorial' && defende(a))) {
        c = { nivel: 'atencao', titulo: 'Os dois defendem território', frase: comArtigo(a, true) + ' e ' + comArtigo(b) + ' defendem território: dê esconderijos e espaço.', especies: [a.id, b.id] };
      } else {
        [[a, b], [b, a]].forEach(function (par) {
          var x = par[0], y = par[1];
          if (!c && defende(x) && T(y) === 'pacifico' && max(y) < frac * tip(x)) {
            c = { nivel: 'atencao', titulo: comArtigo(x, true) + ' pode perseguir ' + comArtigo(y),
              frase: comArtigo(x, true) + ' é ' + (T(x) === 'territorial' ? 'territorial' : 'semiagressiv' + (fem(x) ? 'a' : 'o')) + ' e bem maior que ' + comArtigo(y) + '. Pode persegui-' + (fem(y) ? 'la' : 'lo') + ' o tempo todo.', especies: [x.id, y.id] };
          }
        });
      }
      if (c) { c.tipo = 'temperamento'; add(c); }
    }

    // 5 e 6. Por espécie: mesma espécie, cardume, plantas e camarões
    esp.forEach(function (e) {
      var q = qtd[e.id] || 1;
      if (e.agressivo_com_mesma_especie && q > 1) {
        if (lista('mesma_especie_vermelho', e.id)) add({ nivel: 'ruim', tipo: 'mesma', titulo: 'Mais de ' + um(e) + ' ' + nome(e), frase: 'Dois ' + nome(e) + 's machos juntos brigam. Um macho por aquário.', especies: [e.id] });
        else add({ nivel: 'atencao', tipo: 'mesma', titulo: 'Mais de ' + um(e) + ' ' + nome(e), frase: comArtigo(e, true) + ' costuma brigar com outros da mesma espécie. Com ' + q + ', o aquário precisa ser bem maior e ter esconderijos.', nota: (ESP.mesma_especie_nota || {})[e.id] || (e.notas || [])[0] || ''   /* Oscar: nota da seção 5 (a 1ª nota dele fala de predação) */, especies: [e.id] });
      }
      if (e.grupo_minimo > 1 && q < e.grupo_minimo) {
        if (lista('grupo_casal', e.id)) add({ nivel: 'atencao', tipo: 'cardume', titulo: e.nome_popular + ': melhor em casal', frase: comArtigo(e, true) + ' vive melhor em casal. Você colocou ' + q + '.', especies: [e.id] });
        else add({ nivel: 'atencao', tipo: 'cardume', titulo: e.nome_popular + ': o ideal é a partir de ' + e.grupo_minimo, frase: comArtigo(e, true) + ' vive em grupo. O ideal é a partir de ' + e.grupo_minimo + '; você colocou ' + q + '.', especies: [e.id] });
      }
      if (opcoes.plantado && e.plantas === 'come') add({ nivel: 'atencao', tipo: 'plantas', titulo: e.nome_popular + ' e plantas', frase: comArtigo(e, true) + ' come plantas. Num plantado, prefira plantas resistentes ou conte com repor algumas.', especies: [e.id] });
      if (opcoes.plantado && e.plantas === 'arranca') add({ nivel: 'atencao', tipo: 'plantas', titulo: e.nome_popular + ' e plantas', frase: comArtigo(e, true) + ' cava e arranca plantas. Prenda bem as raízes ou use plantas presas em pedras e troncos.', especies: [e.id] });
      if (opcoes.camaroes && e.camaroes === 'come') add({ nivel: 'ruim', tipo: 'camaroes', titulo: e.nome_popular + ' e camarões', frase: comArtigo(e, true) + ' come camarões: eles viram comida.', especies: [e.id] });
      if (opcoes.camaroes && e.camaroes === 'risco') add({ nivel: 'atencao', tipo: 'camaroes', titulo: e.nome_popular + ' e camarões', frase: comArtigo(e, true) + ' pode comer filhotes de camarão.', especies: [e.id] });
    });

    // 12. Cascudos com código L (regras.md, seção 12, 20/10/2026)
    esp.forEach(function (e) {
      var s = e.status_legal_br || {};
      if (s.situacao === 'proibido' || s.situacao === 'restrito') add({ nivel: s.situacao === 'proibido' ? 'ruim' : 'atencao', tipo: 'legal',
        titulo: e.nome_popular + ': ' + (s.situacao === 'proibido' ? 'captura proibida no Brasil' : 'venda com restrição no Brasil'), frase: s.texto || '', especies: [e.id] });
      if (e.territorial_com_cascudos) {
        var outros = esp.filter(function (o) { return o.id !== e.id && o.cascudo; });
        if (outros.length) add({ nivel: 'atencao', tipo: 'cascudos', titulo: e.nome_popular + ' e outros cascudos',
          frase: comArtigo(e, true) + ' defende toca contra outros cascudos: uma toca por peixe e espaço no fundo.', especies: [e.id].concat(ids(outros)) });
      }
      if (e.precisa_madeira) add({ nivel: 'ok', tipo: 'madeira', titulo: e.nome_popular + ' precisa de madeira',
        frase: comArtigo(e, true) + ' precisa de madeira (troncos) no aquário.', nota: e.dieta_detalhe || '', especies: [e.id] });
    });

    // 7. Litragem
    var lit = litragem(selecao, p);
    if (opcoes.litros > 0 && lit) {
      var x = lit.exigente;
      if (opcoes.litros < lit.pratica_comum) add({ nivel: 'ruim', tipo: 'litragem', titulo: 'Aquário pequeno para esse grupo',
        frase: 'Seu aquário tem ' + opcoes.litros + ' L. ' + (lit.manda_carga ? 'Pela quantidade de peixes, o grupo pede a partir de ' + lit.pratica_comum + ' L (' + lit.conservador + ' L no conservador).' : comArtigo(x, true) + ' pede a partir de ' + lit.pratica_comum + ' L na prática comum e ' + lit.conservador + ' L no conservador.'), especies: [x.id] });
      else if (opcoes.litros < lit.conservador) add({ nivel: 'atencao', tipo: 'litragem', titulo: 'Aquário no limite', frase: 'Seu aquário tem ' + opcoes.litros + ' L: passa na prática comum, mas fica abaixo do conservador (' + lit.conservador + ' L). Sobra pouca margem para erro.', especies: [x.id] });
    }

    var pior = conflitos.reduce(function (m, c) { return Math.max(m, NIVEL[c.nivel]); }, 0);
    conflitos.forEach(function (c, n) { c._n = n; });
    conflitos.sort(function (x, y) { return (y.tipo === 'legal') - (x.tipo === 'legal') || NIVEL[y.nivel] - NIVEL[x.nivel] || ORDEM.indexOf(x.tipo) - ORDEM.indexOf(y.tipo) || x._n - y._n; });
    conflitos.forEach(function (c) { delete c._n; });
    return {
      geral: ['ok', 'atencao', 'ruim'][pior],
      conflitos: conflitos,
      temperatura: temp, ph: ph, gh: gh,
      litragem: lit,
      cardumes: esp.filter(function (e) { return e.grupo_minimo > 1; }).map(function (e) { return { especie: e, minimo: e.grupo_minimo, qtd: qtd[e.id] || 1 }; })
    };
  }

  // regras.md, seção 7: mínimo da maior espécie x carga do grupo; fica o maior.
  function litragem(selecao, p) {
    if (!selecao.length) return null;
    ESP = p.especiais || ESP;
    var ex = null, cons = 0, prat = 0, carga = 0;
    selecao.forEach(function (s) {
      var e = s.especie, l = e.litragem_min_l || {}, q = s.qtd || 1, fria = lista('agua_fria', e.id);
      var c = (l.conservador || 0) + (fria ? k(p, 'LITROS_EXTRA_POR_KINGUIO') * (q - 1) : 0);
      if (c > cons) { cons = c; ex = e; }
      prat = Math.max(prat, l.pratica_comum || 0);
      carga += ((e.tamanho_adulto_cm || {}).tipico || 0) * q * k(p, fria ? 'LITROS_POR_CM_KINGUIO' : 'LITROS_POR_CM_TROPICAL');
    });
    carga = Math.round(carga);
    return { conservador: Math.max(cons, carga), pratica_comum: Math.max(prat, carga), carga_l: carga,
      especie_conservador: cons, especie_pratica: prat, manda_carga: carga > prat, exigente: ex || selecao[0].especie };
  }

  /* ---------- sugestões de companhia (pedido do CEO, 20/10/2026) ----------
     Para cada espécie ainda não escolhida, roda analisar(selecao + candidata com grupo_minimo ou 1).
     Conta só os conflitos NOVOS que envolvem a candidata (um problema que o aquário já tinha, ex.: guppy sozinho,
     não apaga todas as sugestões). A litragem é avaliada à parte (sem os litros na análise), para virar a marca
     "pede aquário maior" em vez de reprovar. Devolve [{ especie, qtd, nivel: 'ok'|'atencao', motivo, pratica_comum,
     conservador, cabe }], ordenado: cabe no aquário > verde > amarelo > menor litragem > ordem do especies.json. */
  function sugerir(selecao, especies, opcoes, p) {
    opcoes = opcoes || {};
    if (!selecao || !selecao.length) return [];
    var sem = { plantado: !!opcoes.plantado, camaroes: !!opcoes.camaroes };   // sem litros: a litragem vira marca, não veto
    var chaveC = function (c) { return c.tipo + '|' + c.titulo; };
    var antes = {}; analisar(selecao, sem, p).conflitos.forEach(function (c) { antes[chaveC(c)] = 1; });
    var ja = {}; selecao.forEach(function (s) { ja[s.especie.id] = 1; });
    var out = [];
    especies.forEach(function (e, ordem) {
      if (ja[e.id]) return;
      var q = e.grupo_minimo > 1 ? e.grupo_minimo : 1;
      var r = analisar(selecao.concat([{ especie: e, qtd: q }]), sem, p);
      var meus = r.conflitos.filter(function (c) { return c.nivel !== 'ok' && (c.especies || []).indexOf(e.id) >= 0 && !antes[chaveC(c)]; });
      var pior = meus.reduce(function (m, c) { return Math.max(m, NIVEL[c.nivel]); }, 0);
      if (pior === NIVEL.ruim) return;
      var L = r.litragem;
      out.push({ especie: e, qtd: q, nivel: pior ? 'atencao' : 'ok', motivo: pior ? meus[0].titulo : '',
        pratica_comum: L.pratica_comum, conservador: L.conservador,
        cabe: !(opcoes.litros > 0 && opcoes.litros < L.pratica_comum), _o: ordem });
    });
    out.sort(function (a, b) { return (b.cabe - a.cabe) || NIVEL[a.nivel] - NIVEL[b.nivel] || a.pratica_comum - b.pratica_comum || a.conservador - b.conservador || a._o - b._o; });
    out.forEach(function (x) { delete x._o; });
    return out;
  }

  // Espécies divididas (ex.: cascudo-comum → 4 cascudos): o nome antigo vira apelido de busca das novas.
  // Devolve { idAntigo: { nome, agora: [espécies] } } para o app traduzir links antigos.
  function aplicarIdsAntigos(especies, p) {
    var mapa = ((p && p.especiais) || {}).ids_antigos || {}, porId = {}, saida = {};
    especies.forEach(function (e) { porId[e.id] = e; });
    Object.keys(mapa).forEach(function (antigo) {
      if (porId[antigo]) return;   // o id ainda existe: nada a fazer
      var m = mapa[antigo], novas = (m.agora || []).map(function (id) { return porId[id]; }).filter(Boolean);
      novas.forEach(function (e) { e._apelidos = e._apelidos || []; if (e._apelidos.indexOf(m.nome) < 0) e._apelidos.push(m.nome); });
      saida[antigo] = { nome: m.nome, agora: novas };
    });
    return saida;
  }

  function ids(esp) { return esp.map(function (e) { return e.id; }); }
  function listaFaixas(esp, campo, un) { return esp.map(function (e) { return nome(e) + ' ' + faixaTxt(e[campo], un); }).join('; '); }
  function fontesDe(esp) {
    var vistos = {}, out = [];
    esp.forEach(function (e) { (e && e.fontes || []).forEach(function (f) { if (!vistos[f.url]) { vistos[f.url] = 1; out.push(f); } }); });
    return out;
  }

  return { aplicarIdsAntigos: aplicarIdsAntigos, normalizar: normalizar, codigoL: codigoL, buscar: buscar, buscarComIndice: buscarComIndice, intersecao: intersecao, analisar: analisar, sugerir: sugerir, litragem: litragem, faixaTxt: faixaTxt, num: num, comArtigo: comArtigo };
});
