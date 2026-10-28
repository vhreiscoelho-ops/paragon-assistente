/* Assistente do Aquarista Paragon · interface, direção B "Vidro e ouro" (escolha do CEO, 21/10/2026; ata reuniao/ux-app U1–U8, V1–V10).
   Regras de dados em nucleo.js; compatibilidade pelo motor do Checador (regras.js) com o especies.json da Ana.
   Microtextos: reuniao/ux-app/microtextos-b.md (Ana). Nada sai do aparelho: sem fetch para fora, sem cookies, sem analytics.
   Dados no localStorage deste navegador, com as MESMAS chaves e o mesmo formato da v1 (a medição só ganhou o campo opcional "topo"). */
(function () {
  'use strict';
  /* LINK DO EBOOK (Kiwify/Hotmart): o CEO informa. Enquanto vazio, o link não aparece em lugar nenhum. */
  var LINK_EBOOK = '';
  var N = window.Nucleo, R = window.Regras, P = window.PARAGON_PARAMETROS, D = window.PARAGON_ESPECIES;
  var IMGS = window.PARAGON_IMAGENS || {};   // ilustração aprovada > foto com licença livre (montar.ps1 → comum/dados/imagens.js)
  N.configurarAgua(window.PARAGON_AGUA);    // parametros-agua.json da Ana (A3) → comum/dados/agua.js
  var CHAVE = 'paragon-assistente-v1', CHAVE_UI = 'paragon-assistente-ui';
  var INSTAGRAM = 'https://www.instagram.com/paragonfish/';
  var POR_ID = {};
  var E;                       // estado (aquários, medições, meta)
  var ui = { aba: 'aquarios', aqId: null, form: null, hist: false, grafP: null, periodo: 'tudo', med: null, novo: null, cicAq: null,
    busca: '', combo: { fauna: [], litros: '', plantado: false, camaroes: false }, ultSel: null, instDispensado: false, anima: false };
  var $ = function (id) { return document.getElementById(id); };
  var tela = $('tela'), barra = $('barra'), cheia = $('cheia');
  var SELO = ($('seloSrc') || {}).src || '';

  var ROT_NIVEL = { ok: 'Combinam, pelas regras do Checador', atencao: 'Dá, com ajustes', ruim: 'Não combina' };
  var IC_NIVEL = { ok: 'ok', atencao: 'al', ruim: 'x' };
  var FILTROS = ['', 'Filtro externo de cascata (hang-on)', 'Canister', 'Filtro interno', 'Filtro de esponja', 'Sump', 'Outro', 'Sem filtro'];
  var DIAS = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  var CURTO = { temp: 'Temp.', ph: 'pH', amonia: 'Amônia', nitrito: 'Nitrito', nitrato: 'Nitrato', kh: 'KH', gh: 'GH' };
  var CARTELA = { amonia: 1, nitrito: 1, nitrato: 1 };   // parâmetros de teste por cor: chave "a cor foi a última da cartela"
  /* Régua por parâmetro (microtextos-b.md, seção 5). Atalhos são números redondos para agilizar, NÃO "os valores da cartela".
     min/max da régua = faixa dos kits mais comuns; digitando, vale o limite do núcleo (N.PARAMS). */
  var REGUA = {
    temp:    { min: 10, max: 35, passo: 0.5, rot: 4, casas: 1, padrao: 25, atalhos: [] },
    ph:      { min: 4, max: 9.5, passo: 0.1, rot: 5, casas: 1, padrao: 7, atalhos: [] },
    amonia:  { min: 0, max: 8, passo: 0.25, rot: 4, padrao: 0, atalhos: [0, 0.25, 0.5, 1, 2, 4] },
    nitrito: { min: 0, max: 5, passo: 0.25, rot: 4, padrao: 0, atalhos: [0, 0.25, 0.5, 1, 2] },
    nitrato: { min: 0, max: 160, passo: 5, rot: 4, padrao: 0, atalhos: [0, 5, 10, 20, 40, 80] },
    kh:      { min: 0, max: 20, passo: 1, rot: 5, padrao: 4, atalhos: [] },
    gh:      { min: 0, max: 30, passo: 1, rot: 5, padrao: 6, atalhos: [] }
  };
  var PX = 14;   // px por passo da régua

  function ic(n, st) { return '<svg class="ic"' + (st ? ' style="' + st + '"' : '') + '><use href="#i-' + n + '"/></svg>'; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function agoraLocal() { var d = new Date(); return N.hojeISO(d) + 'T' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2); }
  function plural(n, um, varios) { return n + ' ' + (n === 1 ? um : varios); }
  function fmt(id, v) { var c = REGUA[id] && REGUA[id].casas; return c ? Number(v).toFixed(c).replace('.', ',') : N.num(v); }
  function unid(p) { return p.un ? ' ' + p.un : ''; }
  function toast(t) {
    var d = document.createElement('div'); d.className = 'toast'; d.setAttribute('role', 'status'); d.textContent = t;
    document.body.appendChild(d); setTimeout(function () { d.remove(); }, 3200);
  }
  function quando(iso) { return iso && iso.slice(0, 10) === N.hojeISO() ? 'hoje' : N.dataCurta(iso); }
  function litrosTxt(aq) { var L = N.litrosDoAquario(aq); return L ? (aq.forma === 'globo' ? 'cerca de ' + N.num(L) + ' L' : N.num(L) + ' L') : '— L'; }
  function seloDemo(aq) { return aq && aq.demo ? '<span class="selo-demo">exemplo</span>' : ''; }
  function reais(lista) { return lista.filter(function (x) { return !x.demo; }); }
  function listaErros(lista) { return '<ul class="erros">' + lista.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>'; }
  // Imagem da espécie: ilustração aprovada quando existe; senão, foto com licença livre e crédito. Legenda sempre "ilustração" ou "foto: crédito".
  function imgEsp(e, grande) {
    var im = e && IMGS[e.id]; if (!im) return '';
    if (!grande) return '<img class="mini" src="' + esc(im.src) + '" alt="" loading="lazy" decoding="async">';
    var leg = im.tipo === 'ilustracao' ? 'ilustração' : 'foto: ' + esc(im.autor) + ' · ' + (im.url_licenca ? '<a href="' + esc(im.url_licenca) + '" target="_blank" rel="noopener">' + esc(im.licenca) + '</a>' : esc(im.licenca)) +
      (im.url_origem ? ' · <a href="' + esc(im.url_origem) + '" target="_blank" rel="noopener">' + esc(im.fonte || 'origem') + '</a>' : '');
    return '<figure class="fig-esp vd"><img src="' + esc(im.src) + '" alt="' + esc(e.nome_popular) + (im.tipo === 'ilustracao' ? ' (ilustração)' : ' (foto)') + '" loading="lazy" decoding="async"><figcaption>' + leg + '</figcaption></figure>';
  }

  /* ---------- armazenamento ---------- */
  function carregar() {
    var bruto = null;
    try { bruto = JSON.parse(localStorage.getItem(CHAVE) || 'null'); } catch (e) { bruto = null; }
    E = N.migrar(bruto);
    try {
      var u = JSON.parse(localStorage.getItem(CHAVE_UI) || '{}');
      if (u.aba) ui.aba = { mais: 'ajustes', medir: 'aquarios' }[u.aba] || u.aba;   // nomes de aba da v1
      if (['aquarios', 'ciclagem', 'especies', 'ajustes'].indexOf(ui.aba) < 0) ui.aba = 'aquarios';
      if (u.aqId) ui.aqId = u.aqId;
      if (Array.isArray(u.ultSel)) ui.ultSel = u.ultSel;
      ui.instDispensado = !!u.instDispensado;
    } catch (e) {}
  }
  function salvar() {
    try { localStorage.setItem(CHAVE, JSON.stringify(E)); return true; }
    catch (e) { toast('Não deu para salvar neste aparelho (memória cheia?). Salve uma cópia agora.'); return false; }
  }
  function salvarUi() { try { localStorage.setItem(CHAVE_UI, JSON.stringify({ aba: ui.aba, aqId: ui.aqId, ultSel: ui.ultSel, instDispensado: ui.instDispensado })); } catch (e) {} }
  function aquario(id) { return E.aquarios.find(function (a) { return a.id === id; }) || null; }
  function aqPadrao(id) { return aquario(id) || aquario(ui.aqId) || E.aquarios[0] || null; }

  var persist = { suportado: !!(navigator.storage && navigator.storage.persist), concedido: null };
  function pedirPersistente() {
    if (!persist.suportado) return Promise.resolve(false);
    return navigator.storage.persisted().then(function (ja) { return ja || navigator.storage.persist(); })
      .then(function (ok) { persist.concedido = !!ok; return ok; }).catch(function () { persist.concedido = false; return false; });
  }
  function instalado() { return (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true; }
  function ehIphone() { return /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); }

  /* ---------- navegação ---------- */
  function ir(aba, extra) {
    ui.aba = aba; ui.hist = false; if (extra) for (var k in extra) ui[k] = extra[k];
    salvarUi(); desenhar(); window.scrollTo(0, 0);
  }
  function setBarra(o) {
    barra.innerHTML = (o.esq || (o.marca ? '<span class="marca"><img src="' + SELO + '" alt="">PARAGON<span class="beta-m">Beta</span></span>' : '<span class="vazio44"></span>')) +
      '<span class="tit' + (o.sempre ? ' sempre' : '') + '">' + esc(o.tit || '') + '</span>' + (o.dir || '<span class="vazio44"></span>');
    rolou();
  }
  function bc(acao, icone, rot, extra) { return '<button type="button" class="bc vd" data-acao="' + acao + '" aria-label="' + esc(rot) + '"' + (extra || '') + '>' + ic(icone) + '</button>'; }
  function rolou() { barra.classList.toggle('rolou', window.scrollY > 36); }
  function desenhar() {
    document.querySelectorAll('#abas [data-aba]').forEach(function (b) { b.setAttribute('aria-current', b.dataset.aba === ui.aba ? 'page' : 'false'); });
    if (ui.med || ui.novo) {
      document.body.classList.add('em-cheia'); cheia.hidden = false;
      return ui.med ? telaMedicao() : telaNovo();
    }
    document.body.classList.remove('em-cheia'); cheia.hidden = true; cheia.innerHTML = '';
    document.body.classList.toggle('sem-abas', !E.aquarios.length && ui.aba === 'aquarios' && !ui.form);
    if (ui.form) return telaFormAquario();
    if (ui.aba === 'ciclagem') return telaCiclagem();
    if (ui.aba === 'especies') return telaEspecies();
    if (ui.aba === 'ajustes') return telaAjustes();
    var aq = aquario(ui.aqId);
    if (aq && ui.hist) return telaHistorico(aq);
    return aq ? telaPainel(aq) : telaLista();
  }
  function avisoBackup() {
    var p = N.precisaBackup(E); if (!p) return '';
    return '<div class="aviso vd"><p>' + (p === 'medicoes' ? 'Você já registrou ' + E.meta.medicoesDesdeBackup + ' medições desde a última cópia.' : 'Faz 2 semanas sem uma cópia dos seus dados.') +
      ' Salve uma cópia para não perder nada.</p><button type="button" class="bt" data-acao="backup">Salvar</button></div>';
  }

  /* ---------- folha (bottom sheet) ---------- */
  var folha = $('folha');
  function abrirFolha(html) {
    $('folhaConteudo').innerHTML = '<div class="alca"></div>' + html;
    if (typeof folha.showModal === 'function') { if (!folha.open) folha.showModal(); } else folha.setAttribute('open', '');
  }
  function fecharFolha() { if (folha.open) { if (folha.close) folha.close(); else folha.removeAttribute('open'); } }
  folha.addEventListener('click', function (ev) { if (ev.target === folha) fecharFolha(); });
  function folhaPortas(nota) {
    abrirFolha('<h2>Adicionar aquário</h2>' + (nota ? '<p class="nota">' + esc(nota) + '</p>' : '') +
      '<div class="pilha"><button type="button" class="bo" data-acao="aq-novo">' + ic('mais') + 'Vou montar um aquário novo</button>' +
      '<button type="button" class="bv vd" data-acao="aq-existente">Já tenho um aquário</button></div>');
  }

  /* ---------- B1 · Aquários ---------- */
  function tanqueSVG() {
    return '<div class="tanque" aria-hidden="true"><svg viewBox="0 0 350 210">' +
      '<defs><linearGradient id="b1g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F0CE86" stop-opacity=".5"/><stop offset="1" stop-color="#D9A84E" stop-opacity=".04"/></linearGradient>' +
      '<linearGradient id="b1v" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset=".5" stop-color="#fff" stop-opacity=".03"/><stop offset="1" stop-color="#fff" stop-opacity=".08"/></linearGradient>' +
      '<clipPath id="b1c"><rect x="30" y="20" width="290" height="168" rx="16"/></clipPath></defs>' +
      '<rect x="30" y="20" width="290" height="168" rx="16" fill="url(#b1v)" stroke="rgba(255,240,215,.28)" stroke-width="1.4"/>' +
      '<g clip-path="url(#b1c)"><g class="onda"><path d="M0 62q30-10 60 0t60 0 60 0 60 0 60 0 60 0 60 0V200H0z" fill="url(#b1g)"/><path d="M0 62q30-10 60 0t60 0 60 0 60 0 60 0 60 0 60 0" stroke="#F6DA98" stroke-width="1.6" fill="none"/></g>' +
      '<path d="M30 172q70-14 150-4t140-6V200H30z" fill="#2E2416"/></g>' +
      '<path d="M44 34h70" stroke="#fff" stroke-opacity=".35" stroke-width="3" stroke-linecap="round"/>' +
      '<text x="175" y="128" text-anchor="middle" font-family="DM Serif Display, Georgia, serif" font-size="44" fill="#F2EBDD" fill-opacity=".9">— L</text></svg></div>';
  }
  function telaLista() {
    if (!E.aquarios.length) {
      setBarra({ marca: true, dir: bc('ir-ajustes', 'aj', 'Ajustes') });
      tela.innerHTML = '<h1 class="let">Seu primeiro<br><i>aquário</i></h1>' +
        '<p class="sub">Comece pelo que você vai montar ou cadastre um que já está rodando.</p>' + tanqueSVG() +
        '<button type="button" class="bo" data-acao="aq-novo">' + ic('mais') + 'Vou montar um aquário novo</button>' +
        '<button type="button" class="bv vd" style="margin-top:10px" data-acao="aq-existente">Já tenho um aquário</button>' +
        '<p class="centro" style="margin-top:14px"><button type="button" class="lk mudo" data-acao="importar">Trocou de celular?&nbsp;<span style="color:var(--ouro2)">Restaurar uma cópia</span></button></p>';
      return;
    }
    setBarra({ marca: true, tit: 'Aquários', dir: bc('aq-portas', 'mais', 'Adicionar aquário') });
    tela.innerHTML = avisoBackup() + '<h1 class="let">Aquários</h1>' +
      '<div class="pilha">' + E.aquarios.map(cartaoAq).join('') +
      '<button type="button" class="novo-aq" data-acao="aq-portas">' + ic('mais') + 'Adicionar aquário</button></div>';
  }
  function cartaoAq(aq) {
    var ms = N.medicoesDe(E, aq.id), al = N.alertasFortes(E, aq, POR_ID);
    var peixes = (aq.fauna || []).reduce(function (s, f) { return s + (f.qtd || 1); }, 0);
    var lc = aq.ciclagem ? N.lerCiclagem(E, aq) : null;
    var est = lc ? '<span class="estado cic"><i></i>Ciclagem · dia ' + diasCic(aq) + ' · ' + esc(lc.titulo) + '</span>' :
      !ms.length ? '<span class="estado"><i></i>Sem medição ainda</span>' :
      al.length ? '<span class="estado fora"><i></i>' + plural(al.length, 'alerta', 'alertas') + ' · ' + N.dataCurta(ms[ms.length - 1].data) + '</span>' :
      '<span class="estado ok"><i></i>Última medição ' + N.dataCurta(ms[ms.length - 1].data) + '</span>';
    return '<button type="button" class="cartao vd" data-abrir="' + esc(aq.id) + '"><span class="t"><b>' + esc(aq.nome) + seloDemo(aq) + '</b><span>' + litrosTxt(aq) + '</span></span>' +
      '<p>' + (peixes ? plural(peixes, 'peixe', 'peixes') + ' · ' + plural((aq.fauna || []).length, 'espécie', 'espécies') : 'Sem peixes cadastrados') + '</p>' + est + '</button>';
  }

  /* ---------- aquário globo (01-conteudo/ferramenta/aquario-globo.md, Ana, 28/10) ---------- */
  var MSG_GLOBO = { altura: 'A altura da água não pode passar da largura do globo. Confira as medidas.', cascalho: 'O cascalho está mais alto que a água. Confira as medidas.', vazio: 'Falta esta medida.' };
  var FG = {
    GL1: { titulo: 'RSPCA Reino Unido · Choosing an aquarium', url: 'https://www.rspca.org.uk/adviceandwelfare/pets/fish/environment' },
    GL2: { titulo: 'RSPCA Austrália · How should I keep and care for my goldfish?', url: 'https://kb.rspca.org.au/knowledge-base/how-should-i-keep-and-care-for-my-goldfish/' },
    GL3: { titulo: 'Animal Welfare (2024) · Life beyond a jar (betta)', url: 'https://doi.org/10.1017/awf.2024.67' },
    GL4: { titulo: 'Itatiaia (imprensa, Brasil) · Aquário redondo é adequado para peixes?', url: 'https://www.itatiaia.com.br/pets-e-animais/aquario-redondo-e-adequado-para-peixes-mitos-e-verdades-sobre-o-formato/' },
    B10: { titulo: 'Seriously Fish · Betta splendens', url: 'https://www.seriouslyfish.com/species/betta-splendens/' },
    B11: { titulo: 'FishBase · Betta splendens', url: 'https://www.fishbase.se/summary/Betta-splendens.html' },
    B12: { titulo: 'Aquarismo Paulista (Brasil, prática brasileira) · Betta', url: 'https://www.aquarismopaulista.com/betta-splendens/' },
    B13: { titulo: 'Petz (Brasil, prática brasileira) · Betta: mitos e verdades', url: 'https://www.petz.com.br/blog/bem-estar/como-cuidar-do-peixe-betta-conheca-sete-mitos-e-verdades/' },
    F4: { titulo: 'Ministério da Saúde · Portaria GM/MS 888/2021 (cloro na água da rede)', url: 'https://bvsms.saude.gov.br/bvs/saudelegis/gm/2021/prt0888_07_05_2021.html' },
    F6: { titulo: 'US EPA · Chloramine: fatos gerais', url: 'https://www.mawc.org/sites/default/files/chloramine_general_facts.pdf' },
    CG2: { titulo: 'RSPCA Austrália · Water quality when setting up a fish aquarium', url: 'https://kb.rspca.org.au/knowledge-base/why-is-water-quality-important-when-setting-up-a-fish-aquarium/' },
    B1: { titulo: 'Seriously Fish · Astronotus ocellatus (Oscar)', url: 'https://www.seriouslyfish.com/species/astronotus-ocellatus/' },
    F1: { titulo: 'UF/IFAS · Ammonia in Aquatic Systems', url: 'https://ask.ifas.ufl.edu/publication/FA031' }
  };
  function fg(ids) { return ids.map(function (k) { return FG[k]; }); }
  function seletorForma(forma, attr) {
    return '<span class="rot" style="margin-top:6px">Qual o formato do aquário?</span><div class="seg forma" role="group" aria-label="Formato do aquário">' +
      '<button type="button" data-' + attr + '="ret" aria-pressed="' + (forma !== 'globo') + '">Retangular</button>' +
      '<button type="button" data-' + attr + '="globo" aria-pressed="' + (forma === 'globo') + '">Redondo (globo)</button></div>' +
      (forma === 'globo' ? '<p class="nota" style="margin-top:6px">Aquário bola, globo ou aquário redondo.</p>' : '');
  }
  function campoAj(id, rot, val, un, ajuda) {
    return '<label class="campo un" data-un="' + un + '"><span class="rot">' + rot + '</span><input id="' + id + '" value="' + esc(val == null ? '' : String(val).replace('.', ',')) + '" inputmode="decimal" autocomplete="off"></label><p class="ajuda-c">' + ajuda + '</p>';
  }
  function camposGlobo(p, g) {
    g = g || {};
    return campoAj(p + 'Gd', 'Largura do globo (cm)', g.d, 'cm', 'Na parte mais larga, por dentro do vidro.') +
      campoAj(p + 'Gh', 'Altura da água (cm)', g.h, 'cm', 'Do fundo do vidro até a linha da água.') +
      campoAj(p + 'Gs', 'Cascalho no fundo (cm) · opcional', g.s, 'cm', 'Se não tiver, deixe 0.');
  }
  function rodapeGlobo() {
    return '<p class="nota">Estimativa: globos têm o fundo achatado e enfeites ocupam espaço. </p><details class="extra como"><summary>Como calculamos</summary><p class="nota" style="margin-top:2px">Tratamos o globo como uma esfera e calculamos só a parte com água. O número real costuma ser um pouco menor. Use para comparar com a ficha dos peixes.</p></details>';
  }
  function globoSVG(g) {
    g = g || {};
    var d = +g.d || 30, h = Math.min(+g.h || 22, d), s = Math.min(+g.s || 0, h), r = 88, cx = 175, cy = 104, base = cy + r;
    var yA = base - h / d * 2 * r, yS = base - s / d * 2 * r, boca = Math.max(cy - r + 6, Math.min(yA - 4, cy - r * 0.72));
    var meiaBoca = Math.sqrt(Math.max(0, r * r - (boca - cy) * (boca - cy)));
    return '<svg viewBox="0 0 350 212" aria-hidden="true"><defs><clipPath id="gC"><circle cx="' + cx + '" cy="' + cy + '" r="' + r + '"/></clipPath>' +
      '<linearGradient id="gW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F0CE86" stop-opacity=".42"/><stop offset="1" stop-color="#D9A84E" stop-opacity=".06"/></linearGradient>' +
      '<radialGradient id="gV" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".14"/><stop offset="1" stop-color="#fff" stop-opacity=".02"/></radialGradient></defs>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="url(#gV)"/>' +
      '<g clip-path="url(#gC)"><rect x="0" y="' + yA.toFixed(1) + '" width="350" height="' + (base - yA + 2).toFixed(1) + '" fill="url(#gW)"/>' +
        '<line x1="0" x2="350" y1="' + yA.toFixed(1) + '" y2="' + yA.toFixed(1) + '" stroke="#F6DA98" stroke-width="1.4"/>' +
        (s > 0 ? '<rect x="0" y="' + yS.toFixed(1) + '" width="350" height="' + (base - yS + 2).toFixed(1) + '" fill="#3A2D1A" opacity=".9"/>' : '') + '</g>' +
      '<path d="M' + (cx - meiaBoca).toFixed(1) + ' ' + boca.toFixed(1) + ' A' + r + ' ' + r + ' 0 1 0 ' + (cx + meiaBoca).toFixed(1) + ' ' + boca.toFixed(1) + '" fill="none" stroke="rgba(255,240,215,.45)" stroke-width="1.4"/>' +
      '<ellipse cx="' + cx + '" cy="' + boca.toFixed(1) + '" rx="' + meiaBoca.toFixed(1) + '" ry="5" fill="none" stroke="rgba(255,240,215,.35)" stroke-width="1.2"/>' +
      '<path d="M' + (cx - r * 0.55) + ' ' + (cy - r * 0.45) + ' q 10 -18 32 -26" stroke="#fff" stroke-opacity=".35" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<g font-family="DM Mono, monospace" font-size="13" fill="#F0CE86"><line x1="' + (cx - r) + '" x2="' + (cx + r) + '" y1="' + cy + '" y2="' + cy + '" stroke="rgba(240,206,134,.35)" stroke-dasharray="3 4"/>' +
        '<text x="' + (cx + r + 8) + '" y="' + (cy + 4) + '">' + N.num(d) + ' cm</text>' +
        '<line x1="' + (cx - r - 12) + '" x2="' + (cx - r - 12) + '" y1="' + yA.toFixed(1) + '" y2="' + base + '" stroke="rgba(240,206,134,.6)"/>' +
        '<text x="' + (cx - r - 18) + '" y="' + ((yA + base) / 2 + 4).toFixed(1) + '" text-anchor="end">' + N.num(h) + '</text><text x="' + (cx - r - 18) + '" y="' + ((yA + base) / 2 + 19).toFixed(1) + '" text-anchor="end" font-size="11" fill="#8C846F">cm</text></g></svg>';
  }
  function cartaoGlobo(aq) {
    return '<div class="alerta vd info" role="group" aria-label="Aquário redondo"><div class="kk">' + ic('info') + 'Aquário redondo · informação</div>' +
      '<p class="ttl">Globo pede mais atenção</p><p class="exp" style="margin-top:6px;position:relative">Com pouca água e boca estreita, a água esquenta, esfria e suja mais rápido, e entra menos oxigênio. Dá para cuidar bem: filtro, medições mais frequentes e trocas regulares ajudam.</p>' +
      '<div class="lado"><button type="button" class="lk" data-acao="globo-porque">Por que e fonte</button><button type="button" class="bt" data-globo-ok="' + esc(aq.id) + '">Entendi</button></div></div>';
  }
  function folhaGlobo() {
    var li = function (t, ids) { return '<li>' + t + ' <span class="fz">(' + ids.map(function (k) { return '<a href="' + FG[k].url + '" target="_blank" rel="noopener">' + esc(FG[k].titulo.split(' · ')[0]) + '</a>'; }).join('; ') + ')</span></li>'; };
    var px = function (se, fonte, ids) { return '<div class="px vd"><p class="pop">O que se diz: ' + se + '</p><p>O que a fonte diz: ' + fonte + '</p>' + fontesHTML(fg(ids)) + '</div>'; };
    abrirFolha('<div class="ficha"><h2>Por que o globo é diferente</h2><ul class="nt">' +
      li('<b>Menos superfície para o oxigênio entrar.</b> O oxigênio entra na água pela superfície. No globo, a boca é mais estreita que o meio, então há pouca superfície para tanta água.', ['GL1']) +
      li('<b>Pouco espaço para um filtro eficiente.</b> Sem filtro, a sujeira dos peixes se acumula.', ['GL1', 'GL2']) +
      li('<b>A temperatura muda rápido.</b> Em aquário pequeno, a temperatura pode variar depressa, o que estressa o peixe.', ['GL1']) +
      li('<b>A circulação da água é mais difícil</b> no formato curvo.', ['GL4']) + '</ul>' +
      '<h2 class="sec" style="font-size:19px">O que ajuda (se você já tem um globo)</h2><ul class="nt">' +
      li('Filtro com vazão suave e algo que mexa a superfície da água.', ['GL2']) +
      li('Existem globos modernos que já vêm com filtro e luz: eles podem ser uma alternativa melhor que o globo simples.', ['GL2']) +
      '<li>Medir a água com mais frequência e fazer trocas parciais regulares (veja Manutenção).</li></ul>' +
      '<h2 class="sec" style="font-size:19px">O que se diz × o que a fonte diz</h2>' +
      px('"Betta vive bem em aquário bola."', 'Um site brasileiro de aquarismo indica pelo menos 36 L (40×30×30 cm) para o betta e pede evitar "bolinhas"; na mesma página, o autor diz que "a partir de 20 L é suficiente". A Seriously Fish pede base de 45×30 cm (cerca de 41 L) com filtro suave. Um estudo de 2024 viu bettas mais ativos em aquários maiores e com plantas.', ['B12', 'B10', 'GL3']) +
      px('"O betta respira ar, então não precisa de filtro nem de oxigênio na água."', 'O betta tem um órgão (labirinto) que respira ar, mas o FishBase alerta contra manter machos em recipientes muito pequenos, e guias brasileiros dizem que ele precisa de filtro e aquecedor.', ['B11', 'B13']) +
      px('"Peixinho dourado (kinguio) é peixe de aquário bola."', 'A RSPCA diz que os aquários bola tradicionais são pequenos demais para o kinguio e devem ser evitados; ela pede pelo menos 50 L (Austrália) a 60 L por peixe (Reino Unido).', ['GL2', 'GL1']) +
      px('"Globo não precisa de filtro, é só trocar a água."', 'Segundo a RSPCA, nenhum peixe deve ficar sem filtro bem montado, e o globo tem pouco espaço para um filtro eficiente.', ['GL1']) +
      '<p class="nota">A prática brasileira vem primeiro; não achamos fonte científica brasileira sobre aquário bola, por isso a parte técnica se apoia na RSPCA.</p></div>');
  }

  /* ---------- cadastro / edição de aquário ("Já tenho um aquário") ---------- */
  function novoForm(aq) {
    var b = aq ? JSON.parse(JSON.stringify(aq)) : { id: null, nome: '', forma: 'ret', dim: {}, globo: {}, litrosManual: null, filtro: '', aquecedor: null, montagem: '', fauna: [], plantado: false, camaroes: false };
    b.dim = b.dim || {}; b.fauna = b.fauna || []; b.forma = b.forma === 'globo' ? 'globo' : 'ret'; b.globo = b.globo || {};
    ui.form = b;
  }
  function campo(id, rot, val, un, extra) {
    return '<label class="campo' + (un ? ' un' : '') + '"' + (un ? ' data-un="' + un + '"' : '') + '><span class="rot">' + rot + '</span><input id="' + id + '" value="' + esc(val == null ? '' : String(val).replace('.', ',')) + '" inputmode="decimal" autocomplete="off"' + (extra || '') + '></label>';
  }
  function telaFormAquario() {
    var f = ui.form, d = f.dim;
    setBarra({ esq: bc('cancelar-aq', 'esq', 'Voltar'), tit: f.id ? 'Editar aquário' : 'Novo aquário', sempre: true,
      dir: '<button type="button" class="bc txt vd" data-acao="salvar-aq">Salvar</button>' });
    tela.innerHTML = '<h1 class="let m">' + (f.id ? esc(f.nome) : 'Seu <i>aquário</i>') + '</h1>' +
      '<label class="campo"><span class="rot">Nome</span><input id="fNome" value="' + esc(f.nome) + '" placeholder="ex.: Aquário da sala" maxlength="40" autocomplete="off"></label>' +
      '<h2 class="sec">Medidas <small>em cm, por dentro</small></h2>' + seletorForma(f.forma, 'fforma') +
      (f.forma === 'globo' ? camposGlobo('f', f.globo) : '<div class="grade3">' +
        campo('fC', 'Compr.', d.c, 'cm') + campo('fL', 'Largura', d.l, 'cm') + campo('fA', 'Altura', d.a, 'cm') + '</div>' +
        '<details class="extra"' + (d.substrato || d.folga ? ' open' : '') + '><summary>Descontar substrato e espaço sem água</summary><div class="grade2" style="margin-top:4px">' +
          campo('fSub', 'Substrato', d.substrato, 'cm') + campo('fFolga', 'Sem água no topo', d.folga, 'cm') + '</div></details>') +
        '<div id="fLitros"></div>' +
        '<details class="extra"' + (f.litrosManual && !N.litrosDoAquario(Object.assign({}, f, { litrosManual: null })) ? ' open' : '') + '><summary>Não sei as medidas: digitar os litros</summary>' + campo('fManual', 'Litros', f.litrosManual, 'L', ' inputmode="numeric"') + '</details>' +
      '<h2 class="sec" id="secPeixes">Peixes <small>pelo Checador</small></h2>' +
        '<div class="busca">' + ic('busca') + '<input id="fBusca" type="search" placeholder="Digite um peixe (ex.: neon, betta)" autocomplete="off" enterkeyhint="search" aria-label="Buscar peixe"></div>' +
        '<ul class="sugestoes vd" id="fSug" hidden></ul><ul class="fauna" id="fFauna"></ul><div id="fVeredito"></div>' +
        '<div class="chaves" style="margin-top:14px"><button type="button" class="chave" data-tog="plantado" aria-pressed="' + !!f.plantado + '">Tem plantas naturais</button><button type="button" class="chave" data-tog="camaroes" aria-pressed="' + !!f.camaroes + '">Tem camarões</button></div>' +
      '<h2 class="sec">Equipamentos</h2>' +
        '<label class="campo" style="margin-top:0"><span class="rot">Filtro</span><select id="fFiltro">' + FILTROS.map(function (x) { return '<option value="' + esc(x) + '"' + (x === f.filtro ? ' selected' : '') + '>' + (x || 'Escolha') + '</option>'; }).join('') + '</select></label>' +
        '<span class="rot" style="margin-top:14px">Aquecedor</span><div class="chaves"><button type="button" class="chave" data-aquec="sim" aria-pressed="' + (f.aquecedor === true) + '">Tem</button><button type="button" class="chave" data-aquec="nao" aria-pressed="' + (f.aquecedor === false) + '">Não tem</button></div>' +
        '<label class="campo"><span class="rot">Montado em <span>(opcional)</span></span><input id="fMontagem" type="date" value="' + esc(f.montagem || '') + '"></label>' +
      '<div id="fErros"></div>' +
      '<div class="pilha" style="margin-top:22px"><button type="button" class="bo" data-acao="salvar-aq">Salvar aquário</button>' +
      (f.id ? '<button type="button" class="bv vd perigo" data-acao="excluir-aq">Excluir este aquário</button>' : '') + '</div>';
    atualizarLitros(); desenharFauna();
  }
  function lerDims() {
    var f = ui.form, v = function (id) { var x = N.lerNumero($(id) && $(id).value); return x === null || isNaN(x) ? null : x; };
    if (f.forma === 'globo') f.globo = { d: v('fGd'), h: v('fGh'), s: v('fGs') || 0 };
    else f.dim = { c: v('fC'), l: v('fL'), a: v('fA'), substrato: v('fSub'), folga: v('fFolga') };
    f.litrosManual = v('fManual');
  }
  function atualizarLitros() {
    lerDims();
    var el = $('fLitros');
    if (ui.form.forma === 'globo') {
      var G = N.litragemGlobo(ui.form.globo);
      el.innerHTML = G && !G.erro ? '<div class="litros-box"><div class="vd destaque"><b>Cerca de</b><strong>' + N.num(G.estimada) + '<small>L</small></strong></div></div>' + rodapeGlobo()
        : G && G.erro ? listaErros([MSG_GLOBO[G.erro]]) : ui.form.litrosManual ? '<div class="litros-box"><div class="vd destaque"><b>Litros informados</b><strong>' + N.num(ui.form.litrosManual) + '<small>L</small></strong></div></div>' : '<p class="nota">Preencha a largura do globo e a altura da água.</p>';
      return;
    }
    var L = N.litragem(ui.form.dim);
    if (!L) { el.innerHTML = ui.form.litrosManual ? '<div class="litros-box"><div class="vd destaque"><b>Litros informados</b><strong>' + N.num(ui.form.litrosManual) + '<small>L</small></strong></div></div>' : '<p class="nota">Preencha as três medidas para calcular os litros.</p>'; return; }
    el.innerHTML = '<div class="litros-box"><div class="vd"><b>Bruta</b><strong>' + L.bruta + '<small>L</small></strong></div><div class="vd destaque"><b>Estimada com água</b><strong>' + L.estimada + '<small>L</small></strong></div></div>' +
      '<p class="nota">Bruta = comprimento × largura × altura ÷ 1000. ' + (L.descontou ? 'A estimada desconta o substrato e o espaço sem água que você informou.' : 'Para a estimada ficar mais real, desconte o substrato e o espaço sem água no topo.') + ' Decoração e pedras também ocupam espaço.</p>';
  }
  function selecao(fauna) { return fauna.filter(function (x) { return x.id && POR_ID[x.id]; }).map(function (x) { return { especie: POR_ID[x.id], qtd: x.qtd || 1 }; }); }
  function pedido(nome) { return E.meta.pedidos.indexOf(String(nome || '').trim().toLowerCase()) >= 0; }
  function faunaHTML(fauna, attrQtd, attrPedir) {
    return fauna.map(function (x, i) {
      var e = x.id && POR_ID[x.id];
      return '<li class="vd' + (e ? '' : ' sem') + '">' + (e ? imgEsp(e) : '') + '<span class="nm"><b>' + esc(e ? e.nome_popular : x.nome) + '</b>' +
        (e ? '<i>' + esc(e.nome_cientifico) + (e.grupo_minimo > 1 ? ' · cardume ' + e.grupo_minimo + '+' : '') + '</i>'
           : '<span class="sem-ficha">Ainda não temos fonte para esta espécie: ela fica fora do painel.</span><button type="button" class="pedir" ' + attrPedir + '="' + i + '">' + (pedido(x.nome) ? 'Pedido anotado' : 'Pedir espécie') + '</button>') +
        '</span><span class="qtd"><button type="button" ' + attrQtd + '="' + i + '" data-d="-1" aria-label="Menos">' + ic('menos') + '</button><output>' + (x.qtd || 1) + '</output><button type="button" ' + attrQtd + '="' + i + '" data-d="1" aria-label="Mais">' + ic('mais') + '</button></span></li>';
    }).join('');
  }
  function vereditoHTML(sel, opc) {
    if (!sel.length) return '';
    var r = R.analisar(sel, opc, P);
    var cs = r.conflitos.filter(function (c) { return c.nivel !== 'ok'; });
    var li = function (x) { return '<li><a href="' + esc(x.url) + '" target="_blank" rel="noopener">' + esc(x.titulo) + '</a></li>'; };
    return '<div class="veredito vd ' + r.geral + '"><div class="topo-v"><span class="sinal">' + ic(IC_NIVEL[r.geral]) + '</span><b>' + ROT_NIVEL[r.geral] + '</b></div>' +
      (cs.length ? '<ul class="conflitos">' + cs.map(function (c) {
        var fs = (c.fontes_regra || []).concat(c.fontes || []);
        return '<li class="' + c.nivel + '"><b>' + esc(c.titulo) + '</b>' + esc(c.frase) + (fs.length ? '<details class="ver"><summary>Ver fonte</summary><ul class="fontes">' + fs.map(li).join('') + '</ul></details>' : '') + '</li>';
      }).join('') + '</ul>' : '<p class="nota">Nenhum conflito nas regras do Checador (temperatura, pH, tamanho, temperamento, cardume e litragem).</p>') + '</div>';
  }
  function desenharFauna() {
    $('fFauna').innerHTML = faunaHTML(ui.form.fauna, 'data-qtd', 'data-pedir');
    desenharVeredito();
  }
  function litrosForm() { return N.litrosDoAquario(ui.form); }
  function desenharVeredito() { $('fVeredito').innerHTML = vereditoHTML(selecao(ui.form.fauna), { litros: litrosForm(), plantado: !!ui.form.plantado, camaroes: !!ui.form.camaroes }); }
  function sugestoesHTML(t, attrAdd, attrSem) {
    var res = R.buscar(D.especies, t, 6);
    return res.map(function (e) {
      return '<li><button type="button" ' + attrAdd + '="' + esc(e.id) + '">' + imgEsp(e) + '<span class="nm"><b>' + esc(e.nome_popular) + '</b><i>' + esc(e.nome_cientifico) + '</i></span><span class="mais">' + ic('mais') + '</span></button></li>';
    }).join('') + '<li><button type="button" ' + attrSem + '="1"><span class="nm"><b>Não achei: adicionar “' + esc(t.trim().slice(0, 40)) + '”</b><i>Fica sem ficha (sem faixa no painel)</i></span><span class="mais">' + ic('mais') + '</span></button></li>';
  }
  function mostrarSug() {
    var t = $('fBusca').value, ul = $('fSug');
    if (!t.trim()) { ul.hidden = true; return; }
    ul.innerHTML = sugestoesHTML(t, 'data-add', 'data-addsem'); ul.hidden = false;
  }
  function addFauna(lista, id, nomeLivre) {
    if (id) {
      var ja = lista.find(function (x) { return x.id === id; });
      if (ja) ja.qtd = (ja.qtd || 1) + 1; else lista.push({ id: id, qtd: POR_ID[id].grupo_minimo > 1 ? POR_ID[id].grupo_minimo : 1 });
    } else {
      var n = String(nomeLivre || '').trim().slice(0, 40); if (!n) return;
      lista.push({ id: null, nome: n, semFicha: true, qtd: 1 });
    }
  }
  function salvarAq() {
    lerDims();
    var f = ui.form, erros = [];
    f.nome = $('fNome').value.trim().slice(0, 40);
    f.filtro = $('fFiltro').value; f.montagem = $('fMontagem').value || '';
    if (!f.nome) erros.push('Dê um nome ao aquário (ex.: "Aquário da sala").');
    if (f.forma === 'globo') {
      var g = f.globo, G = N.litragemGlobo(g);
      if (G && G.erro) erros.push(MSG_GLOBO[G.erro]);
      else if ((g.d || g.h) && !G) erros.push(MSG_GLOBO.vazio + ' (largura do globo e altura da água)');
      else if (!G && !(f.litrosManual > 0)) erros.push('Informe as medidas ou os litros.');
    } else {
      var d = f.dim, algum = d.c || d.l || d.a;
      if (algum && !N.litragem(d)) erros.push('Preencha as três medidas (comprimento, largura e altura) ou apague as que faltam.');
      if (N.litragem(d) && N.litragem(d).estimada <= 0) erros.push('O substrato e o espaço sem água passam da altura do aquário.');
      if (!N.litragem(d) && !(f.litrosManual > 0)) erros.push('Informe as medidas ou os litros.');
    }
    if ((f.fauna || []).length) f.semPeixes = false;
    if (erros.length) { $('fErros').innerHTML = '<ul class="erros">' + erros.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>'; $('fErros').scrollIntoView({ block: 'center' }); return; }
    var novo = !f.id;
    f.id = f.id || N.novoId('a'); f.atualizado = new Date().toISOString(); if (novo) f.criado = f.atualizado;
    var i = E.aquarios.findIndex(function (a) { return a.id === f.id; });
    if (i >= 0) E.aquarios[i] = f; else E.aquarios.push(f);
    salvar(); pedirPersistente();
    ui.form = null; ir('aquarios', { aqId: f.id });
    toast(novo ? 'Aquário salvo. Agora registre a primeira medição.' : 'Aquário atualizado.');
  }

  /* ---------- B2 · painel do aquário ---------- */
  function telaPainel(aq) {
    var litros = N.litrosDoAquario(aq), ms = N.medicoesDe(E, aq.id), al = N.alertas(E, aq, POR_ID);
    var peixes = (aq.fauna || []).reduce(function (s, f) { return s + (f.qtd || 1); }, 0);
    setBarra({ esq: bc('lista', 'esq', 'Aquários'), tit: aq.nome, dir: bc('menu-aq', 'mais3', 'Mais ações') });
    var chips = [litros ? litrosTxt(aq) : null, aq.forma === 'globo' ? 'globo' : null, aq.demo ? 'exemplo' : null, peixes ? plural(peixes, 'peixe', 'peixes') : 'sem peixes', aq.filtro && aq.filtro !== 'Sem filtro' ? aq.filtro.replace('Filtro externo de cascata (hang-on)', 'hang-on').toLowerCase() : null,
      aq.aquecedor === true ? 'aquecedor' : null, aq.ciclagem ? 'ciclagem · dia ' + diasCic(aq) : null].filter(Boolean);
    var h = avisoBackup() + '<h1 class="let m">' + esc(aq.nome) + '</h1>' +
      '<div class="meta">' + chips.map(function (c) { return '<span class="vd">' + esc(c) + '</span>'; }).join('') + '</div>' +
      '<div class="acoes"><button type="button" class="vd" data-acao="medir">' + ic('gota') + 'Medir</button><button type="button" class="vd" data-acao="peixes-aq">' + ic('peixe') + 'Peixes</button><button type="button" class="vd" data-acao="editar-aq">' + ic('lapis') + 'Editar</button></div>';
    if (N.avisoGlobo(aq) && !aq.avisoGloboVisto) h += cartaoGlobo(aq);
    if (!ms.length) {
      tela.innerHTML = h + '<div class="vazio-m vd"><h2 class="sec" style="margin:0">Nenhuma medição ainda</h2><p>Registre a primeira e o painel monta os gráficos com a faixa das suas espécies.</p>' +
        '<button type="button" class="bo" data-acao="medir">' + ic('gota') + 'Registrar medição de hoje</button></div>' + cartaoTPA(aq) + rodapeAgua(aq);
      return;
    }
    h += manchete(aq, al) + cartaoTPA(aq);
    var comDado = N.PARAMS.filter(function (p) { return N.serie(E, aq.id, p.id).length; });
    var fortes = al.filter(function (a) { return a.cor !== 'info'; });
    if (!ui.grafP || comDado.every(function (p) { return p.id !== ui.grafP; })) ui.grafP = fortes.length ? fortes[0].param.id : comDado[0].id;
    h += '<div class="carr" role="group" aria-label="Últimos valores">' + comDado.map(function (p) { return cartaoMetrica(aq, p); }).join('') + '</div>';
    h += grafico(aq, N.PORID[ui.grafP]);
    h += semFichaNota(aq);
    h += '<button type="button" class="bv vd" style="margin-top:14px" data-acao="hist">' + ic('hist') + 'Histórico · ' + plural(ms.length, 'medição', 'medições') + '</button>' + rodapeAgua(aq);
    tela.innerHTML = h; ui.anima = false;
  }
  function rodapeAgua(aq) {
    return (aq.forma === 'globo' && (aq.avisoGloboVisto || !N.avisoGlobo(aq)) ? '<p class="nota centro"><button type="button" class="lk" data-acao="globo-porque">Aquário redondo · Por que e fonte</button></p>' : '') +
      '<p class="nota rodape">' + esc((window.PARAGON_AGUA && window.PARAGON_AGUA.rodape) || N.CIC.rodape) + '</p>';
  }
  /* ---------- troca parcial (TPA) e manutenção (manutencao.md, Ana) ---------- */
  function cartaoTPA(aq) {
    var s = N.statusTPA(E, aq), u = s.ultima;
    var ult = u ? 'Última: ' + N.dataCurta(u.data) + (u.pct ? ' · ' + u.pct + '% da água' : '') : '';
    var t = s.estado === 'off' ? ['Sem lembrete', 'Sem lembrete. Você ainda pode registrar as trocas.']
      : s.estado === 'sem' ? ['Troca de água', 'Registre a primeira troca para o app lembrar você.']
      : s.estado === 'em-dia' ? ['Próxima troca em <b>' + plural(s.dias, 'dia', 'dias') + '</b>', ult]
      : s.estado === 'amanha' ? ['Próxima troca <b>amanhã</b>', ult]
      : s.estado === 'hoje' ? ['Troca de água <b>hoje</b>', ult]
      : ['Troca atrasada há <b>' + plural(s.dias, 'dia', 'dias') + '</b>', 'Quando der, troque uma parte da água.' + (u ? ' Última: ' + N.dataCurta(u.data) : '')];
    return '<div class="tpa vd ' + s.estado + '"><div class="t">' + ic('gota') + '<p><span class="tt">' + t[0] + '</span><small>' + esc(t[1]).replace(/&lt;\/?b&gt;/g, '') + '</small></p></div>' +
      '<button type="button" class="bo" data-acao="tpa-registrar">' + ic('ok') + 'Registrei a troca</button>' +
      '<div class="lado"><button type="button" class="lk" data-acao="tpa-intervalo">Mudar intervalo</button><button type="button" class="lk" data-acao="manut">Registrar manutenção</button>' +
      (s.estado !== 'off' ? '<button type="button" class="lk" data-acao="tpa-agenda">Pôr na agenda</button>' : '') + '</div>' +
      '<p class="nota">Sugestão: 10 a 25% da água por semana. <button type="button" class="lk inline" data-acao="tpa-porque">Por que e fonte</button></p></div>';
  }
  function folhaTroca() {
    ui.tpa = { data: N.hojeISO(), pct: null, outro: false };
    desenharFolhaTroca();
  }
  function desenharFolhaTroca() {
    var t = ui.tpa;
    abrirFolha('<h2>Troca de água</h2><label class="campo"><span class="rot">Quando?</span><input id="tData" type="date" value="' + esc(t.data) + '" max="' + N.hojeISO() + '"></label>' +
      '<span class="rot" style="margin-top:14px">Quanto da água você trocou?</span><div class="chaves">' + [10, 20, 25, 30, 50].map(function (p) {
        return '<button type="button" class="chave" data-tpct="' + p + '" aria-pressed="' + (t.pct === p && !t.outro) + '">' + p + '%</button>'; }).join('') +
        '<button type="button" class="chave" data-tpct="outro" aria-pressed="' + t.outro + '">Outro</button></div>' +
      (t.outro ? campo('tPct', 'Porcentagem', t.pct, '%') : '') +
      '<p class="nota">Água nova com condicionador e na mesma temperatura.</p><div id="tErros"></div>' +
      '<div class="pilha"><button type="button" class="bo" data-acao="tpa-salvar">Salvar troca</button></div>');
  }
  function salvarTroca() {
    var aq = aquario(ui.aqId), t = ui.tpa; if (!aq || !t) return;
    t.data = ($('tData') && $('tData').value) || t.data; if ($('tPct')) t.pct = N.lerNumero($('tPct').value);
    var r = N.validarManutencao({ aquario: aq.id, tipo: 'tpa', data: t.data, pct: t.pct });
    if (!r.ok) { $('tErros').innerHTML = listaErros(r.erros); return; }
    gravarManut(r.manutencao, aq); fecharFolha(); ui.tpa = null; desenhar();
    var n = N.intervaloTPA(aq); toast(n ? 'Troca registrada. Próxima em ' + plural(n, 'dia', 'dias') + '.' : 'Troca registrada.');
  }
  function gravarManut(m, aq) {
    m.atualizado = new Date().toISOString(); if (aq.demo) m.demo = true;
    E.manutencoes.push(m); if (!aq.demo) E.meta.medicoesDesdeBackup = (E.meta.medicoesDesdeBackup || 0) + 1;
    salvar(); pedirPersistente();
  }
  function folhaIntervalo() {
    var aq = aquario(ui.aqId), n = N.intervaloTPA(aq), padrao = [7, 5, 10, 14];
    abrirFolha('<h2>De quanto em quanto tempo?</h2><div class="grupo" style="border-radius:20px;margin-top:14px">' + padrao.map(function (d) {
        return '<button type="button" class="li" data-tint="' + d + '"><b>A cada ' + d + ' dias' + (d === 7 ? ' (sugerido)' : '') + '</b>' + (n === d ? ic('ok') : '') + '</button>'; }).join('') +
        '<button type="button" class="li" data-tint="0"><b>Sem lembrete</b>' + (n === 0 ? ic('ok') : '') + '</button></div>' +
      '<div class="grade2" style="margin-top:8px">' + campo('tInt', 'Outro (3 a 30)', padrao.indexOf(n) < 0 && n ? n : '', 'dias', ' inputmode="numeric"') + '<button type="button" class="bv vd" style="margin-top:18px" data-acao="tpa-int-outro">Usar</button></div>' +
      '<p class="nota">A RSPCA Austrália sugere trocar de 10 a 25% da água toda semana. Peixe grande e aquário cheio pedem mais. Você decide.</p>');
  }
  function mudarIntervalo(n) {
    var aq = aquario(ui.aqId); if (!aq) return;
    aq.tpa = { intervalo: n }; aq.atualizado = new Date().toISOString(); salvar(); fecharFolha(); desenhar();
    toast(n ? 'Lembrete a cada ' + n + ' dias.' : 'Sem lembrete. Você ainda pode registrar as trocas.');
  }
  function folhaTPAporque() {
    abrirFolha('<div class="ficha"><h2>Troca parcial de água</h2><ul class="nt"><li>Sugestão inicial: trocar de 10 a 25% da água a cada 7 dias (RSPCA Austrália). A pessoa escolhe o intervalo; o app não muda sozinho.</li>' +
      '<li>Ciclídeo grande (ex.: Oscar): 30 a 50% por semana (Seriously Fish).</li><li>Amônia ou nitrito apareceram: 25 a 50% e conferir o filtro (UF/IFAS).</li>' +
      '<li>Água nova sempre com condicionador: a água da rede no Brasil sai com cloro por norma (Portaria GM/MS 888/2021), e a cloramina não sai deixando a água parada (EPA).</li></ul>' +
      '<h2 class="sec" style="font-size:19px">Fontes</h2>' + fontesHTML(fg(['CG2', 'B1', 'F1', 'F4', 'F6'])) + '</div>');
  }
  function folhaManut() {
    ui.mt = ui.mt || { tipo: 'filtro', data: N.hojeISO(), midia: null, nota: '' };
    var m = ui.mt, ajuda = { filtro: 'Enxágue de leve na água tirada do aquário, quando entupir ou uma vez por mês.', sifonagem: 'Puxe a sujeira do fundo com a mangueira. Se tirou água, marque também a troca.' };
    abrirFolha('<h2>O que você fez?</h2><div class="chaves" style="margin-top:12px">' + ['tpa', 'filtro', 'sifonagem', 'midia', 'outro'].map(function (k) {
        return '<button type="button" class="chave" data-mtipo="' + k + '" aria-pressed="' + (m.tipo === k) + '">' + N.TIPOS_MANUT[k] + '</button>'; }).join('') + '</div>' +
      (ajuda[m.tipo] ? '<p class="nota">' + ajuda[m.tipo] + '</p>' : '') +
      ((m.tipo === 'filtro' || m.tipo === 'midia') ? avisoFiltro(m) : '') +
      (m.tipo === 'midia' ? '<span class="rot" style="margin-top:12px">Qual mídia?</span><div class="chaves">' + Object.keys(N.MIDIAS).map(function (k) {
        return '<button type="button" class="chave" data-mmidia="' + k + '" aria-pressed="' + (m.midia === k) + '">' + N.MIDIAS[k] + '</button>'; }).join('') + '</div>' +
        (m.midia === 'biologica' ? '<div class="px vd" style="margin-top:12px"><p><b>Troque aos poucos</b></p><p>As bactérias que limpam a água moram na mídia biológica. Trocar tudo de uma vez pode fazer a amônia voltar. Se precisar trocar, troque só uma parte.</p>' + fontesHTML(fg(['CG2'])) + '</div>' : '') : '') +
      '<label class="campo"><span class="rot">Quando?</span><input id="mtData" type="date" value="' + esc(m.data) + '" max="' + N.hojeISO() + '"></label>' +
      '<label class="campo"><span class="rot">' + (m.tipo === 'outro' ? 'O que foi?' : 'Nota <span>(opcional)</span>') + '</span><input id="mtNota" value="' + esc(m.nota) + '" maxlength="300" placeholder="' + (m.tipo === 'outro' ? 'ex.: podei as plantas' : '') + '" autocomplete="off"></label>' +
      '<div id="mtErros"></div><div class="pilha"><button type="button" class="bo" data-acao="manut-salvar">Salvar</button></div>');
  }
  function avisoFiltro(m) {
    var visto = E.meta.vistoAvisoFiltro;
    var corpo = '<p>Enxágue a mídia de leve num balde com a água que você tirou do aquário. A água da torneira tem cloro, que mata as bactérias boas do filtro.</p>';
    var porque = '<p class="nota" style="margin-top:6px">No Brasil, a água da rede sai com cloro por norma; a cloramina não sai deixando a água parada. A RSPCA (Reino Unido e Austrália) orienta enxaguar a mídia na água retirada do aquário e nunca na torneira.</p>' + fontesHTML(fg(['F4', 'F6', 'GL1', 'GL2']));
    return visto ? '<details class="extra"><summary>Lave o filtro na água do aquário · Por que e fonte</summary>' + corpo + porque + '</details>'
      : '<div class="px vd" style="margin-top:12px"><p><b>Lave o filtro na água do aquário</b></p>' + corpo + '<details class="extra"><summary>Por que e fonte</summary>' + porque + '</details></div>';
  }
  function salvarManutForm() {
    var aq = aquario(ui.aqId), m = ui.mt; if (!aq || !m) return;
    m.data = ($('mtData') && $('mtData').value) || m.data; m.nota = ($('mtNota') && $('mtNota').value) || '';
    if (m.tipo === 'tpa') { fecharFolha(); ui.mt = null; return folhaTroca(); }
    var r = N.validarManutencao({ aquario: aq.id, tipo: m.tipo, data: m.data, midia: m.midia, nota: m.nota });
    if (!r.ok) { $('mtErros').innerHTML = listaErros(r.erros); return; }
    if (m.tipo === 'filtro' || m.tipo === 'midia') E.meta.vistoAvisoFiltro = true;
    gravarManut(r.manutencao, aq); fecharFolha(); ui.mt = null; desenhar(); toast(N.TIPOS_MANUT[r.manutencao.tipo] + ' registrada.');
  }
  function agendaTPA(aq) {
    var s = N.statusTPA(E, aq), n = s.intervalo || N.TPA_PADRAO_DIAS;
    var inicio = s.proxima && s.proxima >= N.hojeISO() ? s.proxima : N.hojeISO();
    return baixar('lembrete-troca-agua.ics', 'text/calendar', N.ics({ titulo: 'Troca de água · ' + aq.nome, descricao: 'Hoje é dia de trocar uma parte da água.', inicio: inicio, intervaloDias: n, hora: '10:00', agora: new Date(N.paraData(inicio).getTime() - 1) }))
      .then(function (ok) { if (ok) toast('Abra o arquivo para pôr o lembrete na agenda.'); });
  }
  function fontesHTML(fs) { return fs && fs.length ? '<ul class="fontes">' + fs.map(function (x) { return '<li><a href="' + esc(x.url) + '" target="_blank" rel="noopener">' + esc(x.titulo) + '</a></li>'; }).join('') + '</ul>' : ''; }
  // Detalhe "Por que e fonte" de um alerta: o que fazer, complementos (NH3, topo da cartela), a frase da fonte e os links.
  function detalheAlerta(a) {
    if (a.tipo === 'especie') return '<p class="exp">' + esc(a.texto) + '</p>' + fontesHTML(a.fontes);
    return (a.acao ? '<p class="exp"><b>O que fazer:</b> ' + esc(a.acao) + '</p>' : '') +
      (a.complementos || []).map(function (c) { return '<p class="exp">' + esc(c) + '</p>'; }).join('') +
      (a.fonteCurta ? '<p class="exp fz">' + esc(a.fonteCurta) + '</p>' : '') + (a.porque && a.porque !== a.fonteCurta ? '<p class="exp fz">' + esc(a.porque) + '</p>' : '') + fontesHTML(a.fontes);
  }
  function manchete(aq, al) {
    var fortes = al.filter(function (a) { return a.cor !== 'info'; }), infos = al.filter(function (a) { return a.cor === 'info'; });
    var h;
    if (!fortes.length) {
      var temFicha = N.especiesDaFauna(aq, POR_ID).length > 0, cicSP = N.contexto(aq, POR_ID).cicSemPeixes;
      h = '<div class="alerta vd ok"><div class="kk">' + ic('ok') + 'Última medição · ' + quando(N.medicoesDe(E, aq.id).slice(-1)[0].data) + '</div>' +
        '<p class="ttl">' + (cicSP ? 'Em ciclagem' : 'Tudo na faixa') + '</p><p class="nota" style="position:relative">' +
        (cicSP ? 'A leitura de amônia, nitrito e nitrato fica na aba Ciclagem.' : temFicha ? 'Nada fora da faixa das suas espécies nem da referência geral.' : 'Nada fora da referência geral. Cadastre os peixes para comparar também com a faixa deles.') + '</p></div>';
    } else {
      var a = fortes[0], p = a.param, m = E.medicoes.find(function (x) { return x.aquario === aq.id && x.data === a.data && typeof x[p.id] === 'number'; }) || {};
      var unG = p.id === 'temp' ? '<small>°</small>' : '';
      var txt = a.tipo === 'especie' ? (a.estado === 'fora' ? (a.acima ? 'Acima' : 'Abaixo') + ' da faixa comum das suas espécies: <b>' + esc(N.faixaTxt(a.faixa.min, a.faixa.max, p.un)) + '</b>' : esc(a.texto))
        : '<b>' + esc(a.titulo) + '.</b> ' + esc(a.texto);
      h = '<div class="alerta vd ' + a.cor + '" role="group" aria-label="' + esc(a.titulo || p.nome) + '">' +
        '<div class="kk">' + ic('al') + esc(p.nome) + ' · ' + quando(a.data) + (a.cor === 'vermelho' ? ' · agir hoje' : '') + '</div>' +
        '<div class="g"><b>' + valorTxt(m, p, a.valor) + unG + '</b><p>' + txt + '</p></div>' +
        '<details' + (a.cor === 'vermelho' ? ' open' : '') + '><summary>Por que e fonte' + ic('dir') + '</summary>' + detalheAlerta(a) + '</details></div>';
    }
    h += fortes.slice(1).concat(infos).map(function (b) {
      return '<div class="alerta vd mini ' + b.cor + '"><div class="kk">' + ic(b.cor === 'info' ? 'info' : 'al') + esc(b.param.nome) + ' · ' + quando(b.data) + '</div>' +
        '<p class="exp" style="margin-top:6px;position:relative"><b>' + esc(b.titulo) + '.</b> ' + esc(b.tipo === 'especie' ? b.texto : b.texto) + '</p>' +
        '<details><summary>Por que e fonte' + ic('dir') + '</summary>' + detalheAlerta(b) + '</details></div>';
    }).join('');
    return h;
  }
  function valorTxt(m, p, v) { return (m.topo && m.topo[p.id] ? '≥ ' : '') + fmt(p.id, v !== undefined ? v : m[p.id]); }
  function cartaoMetrica(aq, p) {
    var s = N.serie(E, aq.id, p.id), u = s[s.length - 1], m = E.medicoes.find(function (x) { return x.id === u.id; }) || {};
    var r = N.avaliar(aq, p.id, u.v, POR_ID), ref = r.geral ? 'referência' : 'faixa';
    var st = r.estado === 'ok' ? ['', 'Na ' + ref] : r.estado === 'fora' ? ['fora', (r.acima ? 'Acima da ' : 'Abaixo da ') + ref] :
      r.estado === 'sem-comum' ? ['fora', 'Sem faixa comum'] : r.estado === 'ciclagem' ? ['cinza', 'Ciclagem'] : ['cinza', 'Sem faixa'];
    return '<button type="button" class="pm vd" data-grafp="' + p.id + '" aria-pressed="' + (ui.grafP === p.id) + '"><div class="n">' + esc(p.nome) + '</div>' +
      '<div class="v' + (ui.anima ? ' anima' : '') + '">' + valorTxt(m, p) + (p.un ? '<small>' + esc(p.un) + '</small>' : '') + '</div><div class="s ' + st[0] + '"><i></i>' + st[1] + '</div></button>';
  }
  function semFichaNota(aq) {
    var s = N.semFicha(aq); if (!s.length) return '';
    return '<p class="nota">Sem fonte ainda (fora da faixa do painel): ' + esc(s.map(function (x) { return x.nome; }).join(', ')) + '.</p>';
  }
  /* gráfico de linha, 1 série, faixa comum como banda, área em degradê (dataviz: 1 eixo, linha 2,4 px, pontos ≥ 8 px, toque mostra o valor; o histórico é a tabela acessível) */
  function grafico(aq, p) {
    var tudo = N.serie(E, aq.id, p.id), u = tudo[tudo.length - 1];
    var dias = { '30': 30, '90': 90 }[ui.periodo], lim = dias ? N.paraData(u.data).getTime() - dias * 864e5 : -Infinity;
    var s = tudo.filter(function (x) { return N.paraData(x.data).getTime() >= lim; });
    var aval = N.avaliar(aq, p.id, u.v, POR_ID), fc = N.faixaComum(aq, p.id, POR_ID);
    var f = aval.faixa && aval.faixa.existe ? { min: aval.faixa.min, max: aval.faixa.max, existe: true } : null;
    if (f && f.max == null) f.max = Infinity;
    var faixaT = aval.estado === 'ciclagem' ? 'Ciclagem sem peixes: a leitura fica na aba Ciclagem' :
      fc && !fc.existe ? 'As espécies não têm faixa em comum' : fc ? 'Faixa comum das suas espécies: ' + N.faixaTxt(fc.min, fc.max, p.un) :
      aval.geral ? 'Referência geral: ' + aval.faixa.texto + (p.campo ? ' (cadastre os peixes para ver a faixa deles)' : '') : 'Sem faixa';
    var tend = N.tendencia(E, aq.id, p.id);
    var tendT = !tend ? '' : tend.dir === 'igual' ? tend.texto : (tend.dir === 'subiu' ? 'Subiu ' : 'Caiu ') + N.num(Math.round(tend.delta * 100) / 100) + unid(p) + ' desde a medição anterior.';
    var W = 320, H = 150, ml = 34, mr = 10, mt = 12, mb = 22;
    var vs = s.map(function (x) { return x.v; });
    var lo = Math.min.apply(null, vs), hi = Math.max.apply(null, vs);
    if (f) { lo = Math.min(lo, f.min); if (isFinite(f.max)) hi = Math.max(hi, f.max); }
    var pad = (hi - lo) * 0.15 || Math.max(Math.abs(hi) * 0.1, p.passo * 5);
    lo = Math.max(p.min, lo - pad); hi = hi + pad;
    var t0 = N.paraData(s[0].data).getTime(), t1 = N.paraData(u.data).getTime(), span = t1 - t0;
    var X = function (d) { return span ? ml + (N.paraData(d).getTime() - t0) / span * (W - ml - mr) : (ml + W - mr) / 2; };
    var Y = function (v) { return mt + (hi - v) / (hi - lo) * (H - mt - mb); };
    var g = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(p.nome + ': ' + s.length + ' medições, última ' + N.num(u.v) + unid(p)) + '">' +
      '<defs><linearGradient id="gArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F0CE86" stop-opacity=".42"/><stop offset="1" stop-color="#F0CE86" stop-opacity="0"/></linearGradient></defs>';
    var casas = hi - lo < 1 ? 2 : hi - lo < 10 ? 1 : 0;
    [lo, (lo + hi) / 2, hi].forEach(function (v) { g += '<line class="grade-l" x1="' + ml + '" x2="' + (W - mr) + '" y1="' + Y(v) + '" y2="' + Y(v) + '"/><text class="eixo-t" x="' + (ml - 6) + '" y="' + (Y(v) + 3) + '" text-anchor="end">' + N.num(+v.toFixed(casas)) + '</text>'; });
    if (f) {
      var y1 = Y(Math.min(f.max, hi)), y2 = Y(f.min);
      g += '<rect class="banda" x="' + ml + '" y="' + y1 + '" width="' + (W - ml - mr) + '" height="' + Math.max(1.5, y2 - y1) + '"/>' +
        '<line class="banda-borda" x1="' + ml + '" x2="' + (W - mr) + '" y1="' + y1 + '" y2="' + y1 + '"/><line class="banda-borda" x1="' + ml + '" x2="' + (W - mr) + '" y1="' + y2 + '" y2="' + y2 + '"/>';
    }
    if (s.length > 1) {
      var pts = s.map(function (x) { return X(x.data).toFixed(1) + ',' + Y(x.v).toFixed(1); });
      g += '<path class="area" fill="url(#gArea)" d="M' + pts.join(' L') + ' L' + X(u.data).toFixed(1) + ',' + (H - mb) + ' L' + X(s[0].data).toFixed(1) + ',' + (H - mb) + 'Z"/>' +
        '<polyline class="linha-s" points="' + pts.join(' ') + '"/>';
    }
    s.forEach(function (x) {
      var fora = N.avaliar(aq, p.id, x.v, POR_ID).estado === 'fora';
      g += '<circle class="pt' + (fora ? ' fora' : '') + '" cx="' + X(x.data).toFixed(1) + '" cy="' + Y(x.v).toFixed(1) + '" r="' + (x === u ? 6 : 4.5) + '"/>' +
        '<circle class="alvo" data-dica="' + esc(N.dataCurta(x.data) + ' · ' + N.num(x.v) + unid(p)) + '" cx="' + X(x.data).toFixed(1) + '" cy="' + Y(x.v).toFixed(1) + '" r="16"/>';
    });
    g += '<text class="eixo-t" x="' + ml + '" y="' + (H - 4) + '">' + N.dataCurta(s[0].data) + '</text>' + (s.length > 1 ? '<text class="eixo-t" x="' + (W - mr) + '" y="' + (H - 4) + '" text-anchor="end">' + N.dataCurta(u.data) + '</text>' : '') + '<g class="dica-g"></g></svg>';
    var seg = tudo.length > 2 ? '<div class="seg" role="group" aria-label="Período">' + [['30', '30 dias'], ['90', '90 dias'], ['tudo', 'Tudo']].map(function (o) {
      return '<button type="button" data-periodo="' + o[0] + '" aria-pressed="' + (ui.periodo === o[0]) + '">' + o[1] + '</button>'; }).join('') + '</div>' : '';
    return '<div class="graf vd"><div class="t"><b>' + esc(p.nome) + '</b><span class="ult' + (aval.estado === 'fora' ? ' fora' : '') + '">' + N.num(u.v) + unid(p) + '</span></div>' +
      '<p class="faixa-t">' + esc(faixaT) + '</p>' + seg + g + (s.length === 1 ? '<p class="so-um">Com a próxima medição aparece a linha do tempo.</p>' : '') +
      (tendT ? '<p class="so-um">' + esc(tendT) + '</p>' : '') + '</div>';
  }
  function mostrarDica(alvo) {
    var svg = alvo.ownerSVGElement, gd = svg.querySelector('.dica-g'), t = alvo.getAttribute('data-dica');
    var cx = +alvo.getAttribute('cx'), cy = +alvo.getAttribute('cy'), w = t.length * 7.2 + 14, x = Math.min(Math.max(cx - w / 2, 0), 320 - w), y = cy - 32 < 0 ? cy + 12 : cy - 32;
    gd.innerHTML = '<rect class="dica-bg" x="' + x + '" y="' + y + '" width="' + w + '" height="22" rx="6"/><text class="dica" x="' + (x + w / 2) + '" y="' + (y + 15) + '" text-anchor="middle">' + esc(t) + '</text>';
  }
  function telaHistorico(aq) {
    var ms = N.medicoesDe(E, aq.id).reverse();
    setBarra({ esq: bc('hist-fechar', 'esq', 'Voltar ao painel'), tit: 'Histórico' });
    tela.innerHTML = '<h1 class="let m">Histórico</h1><p class="sub">' + esc(aq.nome) + ' · ' + plural(ms.length, 'medição', 'medições') + '</p>' +
      (ms.length ? '<div class="hist vd">' + ms.map(function (m) {
        var vals = N.PARAMS.filter(function (p) { return typeof m[p.id] === 'number'; }).map(function (p) {
          var fora = N.avaliar(aq, p.id, m[p.id], POR_ID).estado === 'fora';
          return '<span' + (fora ? ' class="fora"' : '') + '>' + esc(p.nome) + ' ' + valorTxt(m, p) + unid(p) + (fora ? ' ⚠' : '') + '</span>';
        }).join('<br>');
        var extra = (m.troca === true ? '<br><span class="tx">Troca parcial feita</span>' : '') + (m.nota ? '<br><span class="tx">' + esc(m.nota) + '</span>' : '');
        return '<div class="it"><span class="dt">' + N.dataCurta(m.data) + '<small>' + esc((m.data || '').slice(11, 16)) + '</small></span><span class="vs">' + (vals || '<span class="tx">Só anotação</span>') + extra + '</span>' +
          '<button type="button" data-apagar-m="' + esc(m.id) + '">Apagar</button></div>';
      }).join('') + '</div>' : '<p class="nota">Nenhuma medição.</p>') +
      '<h2 class="sec">Manutenções</h2>' + (function () {
        var mt = N.manutencoesDe(E, aq.id);
        if (!mt.length) return '<p class="nota" style="margin-top:0">Nada registrado ainda.</p>';
        return '<div class="hist vd">' + mt.map(function (m) {
          var det = m.tipo === 'tpa' ? (m.pct ? m.pct + '% da água' : 'marcada na medição') : m.tipo === 'midia' && m.midia ? 'mídia ' + N.MIDIAS[m.midia] : '';
          return '<div class="it"><span class="dt">' + N.dataCurta(m.data) + '</span><span class="vs"><span>' + esc(N.TIPOS_MANUT[m.tipo]) + (det ? ' · ' + esc(det) : '') + '</span>' +
            (m.nota ? '<br><span class="tx">' + esc(m.nota) + '</span>' : '') + '</span>' + (m.deMedicao ? '<span></span>' : '<button type="button" data-apagar-t="' + esc(m.id) + '">Apagar</button>') + '</div>';
        }).join('') + '</div>';
      })() + '<button type="button" class="bv vd" style="margin-top:12px" data-acao="manut">' + ic('mais') + 'Registrar manutenção</button>';
  }

  /* ---------- B3 · registrar medição (tela cheia, um parâmetro por vez) ---------- */
  function abrirMedicao(aqId, volta) {
    if (!E.aquarios.length) return folhaPortas('Cadastre um aquário para registrar medições.');
    var aq = aqPadrao(aqId);
    var sel = aq.ciclagem ? ['amonia', 'nitrito', 'nitrato'] : (ui.ultSel && ui.ultSel.length ? ui.ultSel.slice() : ['temp', 'ph']);
    ui.med = { aqId: aq.id, data: agoraLocal(), etapa: -1, sel: sel, vals: {}, brutos: {}, topo: {}, troca: null, dose: null, nota: '', digitando: false, ajuda: false, volta: volta || null };
    desenhar(); cheia.scrollTop = 0;
  }
  function ordemSel(sel) { return N.PARAMS.map(function (p) { return p.id; }).filter(function (id) { return sel.indexOf(id) >= 0; }); }
  function cabMedicao(md) {
    var aq = aquario(md.aqId);
    return '<div class="cab">' + bc('med-fechar', 'x', 'Cancelar') + '<b>' + esc(aq.nome) + ' · ' + quando(md.data) + '</b>' +
      (md.etapa >= 0 ? '<button type="button" class="bc txt vd" data-acao="med-salvar">Salvar</button>' : '<span class="vazio44"></span>') + '</div>';
  }
  function telaMedicao() {
    var md = ui.med;
    if (md.etapa < 0) return telaEscolha(md);
    var id = md.sel[md.etapa], p = N.PORID[id], cfg = REGUA[id];
    if (typeof md.vals[id] !== 'number') { var u = N.ultimoValor(E, md.aqId, id); md.vals[id] = (id === 'ph' || id === 'temp' || id === 'kh' || id === 'gh') && u ? u.v : cfg.padrao; }
    var uk = unidadeKit(id); if (uk) md.digitando = true;
    var aqM = aquario(md.aqId), cicSP = N.contexto(aqM, POR_ID).cicSemPeixes;
    var v = md.vals[id], ultimo = md.etapa === md.sel.length - 1;
    var outros = md.sel.filter(function (x) { return x !== id && typeof md.vals[x] === 'number'; });
    var h = cabMedicao(md) + '<div class="corpo">' +
      '<div class="pills">' + md.sel.map(function (x, i) {
        var feito = i !== md.etapa && typeof md.vals[x] === 'number';
        return '<button type="button" class="' + (i === md.etapa ? 'on' : 'vd' + (feito ? ' feito' : '')) + '" data-mir="' + i + '">' + (feito ? ic('ok') : '') + CURTO[x] + '</button>';
      }).join('') + '</div>' +
      '<div class="visor"><div class="n">' + esc(p.nome) + '<button type="button" data-acao="med-ajuda" aria-label="Ajuda">' + ic('info') + '</button></div>' +
      (md.digitando ? '<input class="num-b" id="mVal" inputmode="decimal" autocomplete="off" enterkeyhint="done" aria-label="' + esc(p.nome) + '" value="' + esc(uk ? (typeof md.brutos[id] === 'number' ? N.num(md.brutos[id]) : '') : fmt(id, v)) + '">'
        : '<button type="button" class="num-b" data-acao="med-digitar" aria-label="' + esc(p.nome + ': ' + fmt(id, v) + unid(p) + '. Toque para digitar') + '"><span id="mVisor">' + fmt(id, v) + '</span></button>') +
      '<small>' + (uk ? esc(uk.rotulo) + ' · o app converte para ' + esc(p.un) : CARTELA[id] ? 'mg/L (= ppm)' : esc(p.un || '')) + '</small>' +
      (md.topo[id] ? '<p class="topo-txt">pelo menos ' + fmt(id, v) + ' ' + esc(p.un) + '</p>' : '') + '</div>' +
      (md.ajuda ? '<p class="ajuda vd">Escolha a cor mais parecida com a cartela do seu teste. Se não tiver o número aqui, digite. ' + esc((window.PARAGON_AGUA && window.PARAGON_AGUA.precisao_kits.texto_ajuda) || '') + '</p>' : '') +
      (uk ? '' : '<div class="regua"><div class="rolo" id="rolo" aria-hidden="true"><div class="fita" id="fita"></div></div><i class="ag"></i></div>') +
      (cfg.atalhos.length && !uk ?'<div class="rap" role="group" aria-label="Atalhos">' + cfg.atalhos.map(function (a) { return '<button type="button" class="vd" data-atalho="' + a + '" aria-pressed="' + (a === v) + '">' + fmt(id, a) + '</button>'; }).join('') + '</div>' : '') +
      '<div class="digitar"><button type="button" class="lk" data-acao="med-digitar">Digitar valor</button><button type="button" class="lk mudo" data-acao="med-pular">Pular</button></div>' +
      (CARTELA[id] ? '<div class="grupo vd" style="margin-top:10px"><button type="button" class="sw" role="switch" aria-checked="' + !!md.topo[id] + '" data-acao="med-topo"><b>A cor foi a última da cartela</b><i></i></button></div>' : '') +
      '<div class="resumo vd">' + outros.map(function (x) { var q = N.PORID[x]; return '<div class="r"><span>' + esc(q.nome) + '</span><b>' + (md.topo[x] ? '≥ ' : '') + fmt(x, md.vals[x]) + unid(q) + '</b></div>'; }).join('') +
        (cicSP ? '<div class="r dose"><span>Você pôs amônia/ração cerca de 24 h antes desta medição?</span><div class="seg"><button type="button" data-mdose="sim" aria-pressed="' + (md.dose === 'sim') + '">Sim</button><button type="button" data-mdose="nao" aria-pressed="' + (md.dose === 'nao') + '">Não</button></div></div>' : '') +
        '<div class="r"><span>Troca parcial hoje</span><div class="seg"><button type="button" data-mtroca="sim" aria-pressed="' + (md.troca === 'sim') + '">Sim</button><button type="button" data-mtroca="nao" aria-pressed="' + (md.troca === 'nao') + '">Não</button></div></div>' +
        '<div class="r" style="display:block;padding:8px 0">' + (md.nota || md.verNota ? '<label class="campo" style="margin:0"><span class="rot">Nota <span>(opcional)</span></span><textarea id="mNota" maxlength="1000" placeholder="ex.: limpei o filtro, peixe novo, água turva">' + esc(md.nota) + '</textarea></label>'
          : '<button type="button" class="lk" data-acao="med-nota">' + ic('mais') + 'Nota</button>') + '</div></div>' +
      '<div id="mErros"></div></div>' +
      '<div class="baixo"><button type="button" class="bo" data-acao="' + (ultimo ? 'med-salvar' : 'med-prox') + '">' + (ultimo ? 'Salvar medição' : 'Próximo: ' + esc(N.PORID[md.sel[md.etapa + 1]].nome) + ic('seta')) + '</button></div>';
    cheia.innerHTML = h;
    montarRegua(id, v);
    if (md.digitando) { var inp = $('mVal'); inp.focus(); inp.select(); }
  }
  function telaEscolha(md) {
    var aq = aquario(md.aqId), sel = ordemSel(md.sel);
    cheia.innerHTML = cabMedicao(md) + '<div class="corpo escolha">' +
      '<h1 class="let m" style="margin-top:12px">O que você <i>mediu?</i></h1><p class="sub">Marque só o que você testou hoje.</p>' +
      '<div class="chaves">' + N.PARAMS.map(function (p) { var on = md.sel.indexOf(p.id) >= 0; return '<button type="button" class="chave" data-msel="' + p.id + '" aria-pressed="' + on + '">' + (on ? ic('ok') : '') + CURTO[p.id] + '</button>'; }).join('') + '</div>' +
      (E.aquarios.length > 1 ? '<h2 class="sec">Aquário</h2><div class="chaves">' + E.aquarios.map(function (a) { return '<button type="button" class="chave" data-maq="' + esc(a.id) + '" aria-pressed="' + (a.id === aq.id) + '">' + esc(a.nome) + '</button>'; }).join('') + '</div>' : '') +
      '<details class="extra"><summary>Data e hora: ' + quando(md.data) + ', ' + esc(md.data.slice(11, 16)) + '</summary><label class="campo" style="margin-top:4px"><span class="rot">Data e hora</span><input id="mData" type="datetime-local" value="' + esc(md.data) + '" max="' + agoraLocal() + '"></label></details>' +
      '</div><div class="baixo"><button type="button" class="bo" data-acao="med-comecar"' + (sel.length ? '' : ' disabled') + '>' + (sel.length ? 'Próximo: ' + esc(N.PORID[sel[0]].nome) + ic('seta') : 'Próximo') + '</button></div>';
  }
  var regua = { id: null, ignorar: false, raf: 0 };
  function montarRegua(id, v) {
    var cfg = REGUA[id], rolo = $('rolo'), fita = $('fita'); if (!rolo) return;
    var passos = Math.round((cfg.max - cfg.min) / cfg.passo), W = rolo.clientWidth || 390, meio = W / 2, larg = passos * PX;
    fita.style.width = (W + larg) + 'px';
    var h = '<div class="tk" style="left:' + (meio - 1) + 'px;width:' + (larg + 2) + 'px"></div>' +
      '<div class="tk2" style="left:' + (meio - 1) + 'px;width:' + (larg + 2) + 'px;background:repeating-linear-gradient(90deg,rgba(242,235,221,.85) 0 2px,transparent 2px ' + (cfg.rot * PX) + 'px)"></div>';
    for (var k = 0; k <= passos; k += cfg.rot) h += '<span class="rotr" style="left:' + (meio + k * PX) + 'px">' + fmt(id, +(cfg.min + k * cfg.passo).toFixed(4)) + '</span>';
    fita.innerHTML = h;
    regua.id = id; posRegua(v);
    rolo.addEventListener('scroll', aoRolarRegua, { passive: true });
  }
  function posRegua(v) {
    var cfg = REGUA[regua.id], rolo = $('rolo'); if (!rolo) return;
    var alvo = Math.round((Math.min(Math.max(v, cfg.min), cfg.max) - cfg.min) / cfg.passo) * PX;
    if (Math.abs(rolo.scrollLeft - alvo) < 1) return;
    regua.ignorar = true; rolo.scrollLeft = alvo;
  }
  function aoRolarRegua() {
    if (regua.ignorar) { regua.ignorar = false; return; }
    if (regua.raf) return;
    regua.raf = requestAnimationFrame(function () {
      regua.raf = 0;
      var md = ui.med, rolo = $('rolo'); if (!md || !rolo) return;
      var cfg = REGUA[regua.id], v = +(cfg.min + Math.round(rolo.scrollLeft / PX) * cfg.passo).toFixed(4);
      v = Math.min(Math.max(v, cfg.min), cfg.max);
      if (v === md.vals[regua.id]) return;
      md.vals[regua.id] = v; atualizarVisor();
    });
  }
  function atualizarVisor() {
    var md = ui.med, id = regua.id, v = md.vals[id], el = $('mVisor');
    if (el) el.textContent = fmt(id, v);
    var t = cheia.querySelector('.topo-txt'); if (t) t.textContent = 'pelo menos ' + fmt(id, v) + ' ' + N.PORID[id].un;
    cheia.querySelectorAll('[data-atalho]').forEach(function (b) { b.setAttribute('aria-pressed', +b.dataset.atalho === v); });
  }
  function lerDigitado() {
    var md = ui.med, inp = $('mVal'); if (!md || !inp) return true;
    var id = md.sel[md.etapa], p = N.PORID[id], v = N.lerNumero(inp.value), uk = unidadeKit(id);
    if (v === null) { if (uk) { delete md.vals[id]; delete md.brutos[id]; } return true; }
    var conv = uk && !isNaN(v) ? N.paraPadrao(id, v, uk.id) : v;
    if (isNaN(v) || conv < p.min || conv > p.max) { $('mErros').innerHTML = '<ul class="erros"><li>' + esc(p.nome) + ': valor fora do possível (' + p.min + ' a ' + p.max + (p.un ? ' ' + p.un : '') + ').</li></ul>'; return false; }
    if (uk) md.brutos[id] = v;
    md.vals[id] = conv; return true;
  }
  // Unidade escolhida em Ajustes para o kit (V9). null = a padrão do app (régua normal).
  function unidadeKit(id) {
    var u = (E.meta.unidades || {})[id], U = N.unidadesDe(id); if (!u) return null;
    if (id === 'temp') return u === 'F' ? { id: 'F', rotulo: '°F' } : null;
    if (!U || u === U.padrao) return null;
    return U.opcoes.find(function (o) { return o.id === u; }) || null;
  }
  function guardarNota() { var t = $('mNota'); if (t && ui.med) ui.med.nota = t.value; }
  function irEtapa(i) {
    var md = ui.med; guardarNota(); if (md.digitando && !lerDigitado()) return;
    md.digitando = false; md.ajuda = false; md.etapa = i; desenhar(); cheia.scrollTop = 0;
  }
  function salvarMedicao() {
    var md = ui.med; guardarNota();
    if (md.digitando && !lerDigitado()) return;
    var form = { aquario: md.aqId, data: md.data.slice(0, 16), nota: md.nota, troca: md.troca, topo: md.topo, aposDose: md.dose };
    N.PARAMS.forEach(function (p) { if (md.sel.indexOf(p.id) >= 0 && typeof md.vals[p.id] === 'number') form[p.id] = String(md.vals[p.id]); });
    var r = N.validarMedicao(form);
    if (!r.ok) { $('mErros').innerHTML = '<ul class="erros">' + r.erros.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>'; return; }
    r.medicao.atualizado = new Date().toISOString();
    var aq = aquario(md.aqId), volta = md.volta;
    if (aq.demo) r.medicao.demo = true;
    E.medicoes.push(r.medicao); if (!aq.demo) E.meta.medicoesDesdeBackup = (E.meta.medicoesDesdeBackup || 0) + 1;
    salvar(); pedirPersistente();
    if (!aq.ciclagem) { ui.ultSel = md.sel.slice(); }
    ui.med = null; ui.anima = true; ui.grafP = null;
    if (volta === 'ciclagem') ir('ciclagem', { cicAq: aq.id }); else ir('aquarios', { aqId: aq.id });
    var al = N.alertasFortes(E, aq, POR_ID);
    toast(al.length ? 'Medição salva. Veja ' + (al.length > 1 ? 'os alertas' : 'o alerta') + ' no painel.' : 'Medição salva.');
  }

  /* ---------- B4 · aquário novo em 3 passos → iniciar ciclagem (U1) ---------- */
  function abrirNovo() {
    fecharFolha();
    ui.novo = { passo: 1, nome: '', forma: 'ret', c: '', l: '', a: '', gd: '', gh: '', gs: '', substrato: 5, folga: 4, manual: '', inicio: N.hojeISO(), lembrete: true, mudar: false };
    desenhar(); cheia.scrollTop = 0; setTimeout(function () { var i = $('nNome'); if (i) i.focus(); }, 60);
  }
  function dimNovo(nv) { var n = function (x) { var v = N.lerNumero(x); return v === null || isNaN(v) ? null : v; }; return { c: n(nv.c), l: n(nv.l), a: n(nv.a), substrato: n(nv.substrato) || 0, folga: n(nv.folga) || 0 }; }
  function globoNovo(nv) { var n = function (x) { var v = N.lerNumero(x); return v === null || isNaN(v) ? null : v; }; return { d: n(nv.gd), h: n(nv.gh), s: n(nv.gs) || 0 }; }
  function litrosNovo(nv) {
    if (nv.forma === 'globo') { var G = N.litragemGlobo(globoNovo(nv)); if (G && !G.erro) return { estimada: G.estimada, globo: true }; }
    else { var L = N.litragem(dimNovo(nv)); if (L && L.estimada > 0) return L; }
    var m = N.lerNumero(nv.manual); return m > 0 ? { estimada: Math.round(m), bruta: null, manual: true } : null;
  }
  function isoSVG(d) {
    // aquário em perspectiva que cresce com as medidas (proporção real, limitada à caixa do desenho)
    var c = d.c || 80, l = d.l || 35, a = d.a || 40, k = Math.min(290 / (c + l * 0.55), 172 / (a + l * 0.32));
    var w = c * k, h = a * k, dx = l * 0.55 * k, dy = l * 0.32 * k, x0 = (350 - w - dx) / 2, y0 = 18 + dy, base = y0 + h;
    var sub = Math.min(d.substrato || 0, a) * k, agua = Math.max(0, a - (d.folga || 0)) * k;
    var yA = base - agua, yS = base - sub;
    var P = function (pts) { return pts.map(function (q) { return q[0].toFixed(1) + ' ' + q[1].toFixed(1); }).join(' L'); };
    return '<svg viewBox="0 0 350 212" aria-hidden="true"><defs><linearGradient id="b4w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F0CE86" stop-opacity=".42"/><stop offset="1" stop-color="#D9A84E" stop-opacity=".06"/></linearGradient></defs>' +
      (agua > sub ? '<path d="M' + P([[x0, yA], [x0 + w, yA], [x0 + w + dx, yA - dy], [x0 + dx, yA - dy]]) + 'Z" fill="rgba(240,206,134,.22)" stroke="#F6DA98" stroke-width="1.4"/>' +
        '<path d="M' + P([[x0, yA], [x0, yS], [x0 + w, yS], [x0 + w, yA]]) + 'Z" fill="url(#b4w)"/><path d="M' + P([[x0 + w, yA], [x0 + w, yS], [x0 + w + dx, yS - dy], [x0 + w + dx, yA - dy]]) + 'Z" fill="url(#b4w)" opacity=".7"/>' : '') +
      (sub > 0 ? '<path d="M' + P([[x0, yS], [x0, base], [x0 + w, base], [x0 + w + dx, base - dy], [x0 + w + dx, yS - dy], [x0 + w, yS]]) + 'Z" fill="#3A2D1A" opacity=".9"/>' : '') +
      '<path d="M' + P([[x0, y0], [x0 + w, y0], [x0 + w + dx, y0 - dy], [x0 + dx, y0 - dy]]) + 'Z M' + P([[x0, y0], [x0, base], [x0 + w, base], [x0 + w, y0]]) + ' M' + P([[x0 + w, base], [x0 + w + dx, base - dy], [x0 + w + dx, y0 - dy]]) +
        '" fill="none" stroke="rgba(255,240,215,.42)" stroke-width="1.4" stroke-linejoin="round"/>' +
      '<g font-family="DM Mono, monospace" font-size="13" fill="#F0CE86"><text x="' + (x0 + w / 2) + '" y="' + (base + 20) + '" text-anchor="middle">' + N.num(c) + ' cm</text>' +
      '<text x="' + (x0 + w + dx / 2 + 8) + '" y="' + (base - dy / 2 + 14) + '">' + N.num(l) + ' cm</text><text x="' + (x0 - 8) + '" y="' + (y0 + h / 2) + '" text-anchor="end">' + N.num(a) + '</text>' +
      '<text x="' + (x0 - 8) + '" y="' + (y0 + h / 2 + 15) + '" text-anchor="end" font-size="11" fill="#8C846F">cm</text></g></svg>';
  }
  function cabNovo(t) { return '<div class="cab">' + bc('novo-voltar', 'esq', 'Voltar') + '<b>' + esc(t) + '</b><span class="vazio44"></span></div>'; }
  function progNovo(n, rot) { return '<div class="prog">' + [1, 2, 3].map(function (i) { return '<i' + (i <= n ? ' class="on"' : '') + '></i>'; }).join('') + '</div><p class="passo">Passo ' + n + ' de 3 · ' + rot + '</p>'; }
  function telaNovo() {
    var nv = ui.novo, h;
    if (nv.passo === 1) {
      h = cabNovo('Aquário novo') + '<div class="corpo">' + progNovo(1, 'Nome') +
        '<h1 class="let m" style="margin-top:18px">Nome do <i>aquário</i></h1>' +
        '<label class="grande"><span class="rot" style="position:absolute;left:-9999px">Nome</span><input id="nNome" value="' + esc(nv.nome) + '" placeholder="ex.: Aquário da sala" maxlength="40" autocomplete="off" enterkeyhint="next"></label>' +
        '<div class="trilha vd"><div class="tri"><i class="on"><span>' + ic('regua') + '</span>Medidas<br>hoje</i><i><span>' + ic('cic') + '</span>Ciclagem<br>semanas</i><i><span>' + ic('peixe') + '</span>Peixes<br>depois</i></div></div>' +
        '<div id="nErros"></div></div><div class="baixo"><button type="button" class="bo" data-acao="novo-prox">Continuar' + ic('seta') + '</button></div>';
    } else if (nv.passo === 2) {
      var L = litrosNovo(nv), d = dimNovo(nv), gl = nv.forma === 'globo';
      h = cabNovo(nv.nome) + '<div class="corpo">' + progNovo(2, 'Medidas') + seletorForma(nv.forma, 'nforma') +
        '<div class="iso" id="nIso">' + (gl ? globoSVG(globoNovo(nv)) : isoSVG(d)) + '</div>' +
        '<div class="res" id="nRes">' + resNovo(L) + '</div>' +
        (gl ? '<div class="tres-m">' + [['nGd', 'Largura do globo', nv.gd], ['nGh', 'Altura da água', nv.gh], ['nGs', 'Cascalho · opcional', nv.gs]].map(function (x) {
            return '<label class="vd"><small>' + x[1] + '</small><span><input id="' + x[0] + '" inputmode="decimal" autocomplete="off" value="' + esc(x[2]) + '" placeholder="0"><em>cm</em></span></label>'; }).join('') + '</div>' +
          '<p class="nota centro">Largura: na parte mais larga, por dentro do vidro. Água: do fundo do vidro até a linha da água. Sem cascalho, deixe 0.</p><div id="nGloboErr"></div>' + rodapeGlobo()
        : '<div class="tres-m">' + [['nC', 'Compr.', nv.c], ['nL', 'Largura', nv.l], ['nA', 'Altura', nv.a]].map(function (x) {
          return '<label class="vd"><small>' + x[1] + '</small><span><input id="' + x[0] + '" inputmode="decimal" autocomplete="off" value="' + esc(x[2]) + '" placeholder="0"><em>cm</em></span></label>'; }).join('') + '</div>' +
        '<p class="nota centro" id="nDesc">' + descNovo(nv) + '</p>' +
        (nv.mudar ? '<div class="grade2" style="margin-top:8px">' + campo('nSub', 'Substrato', nv.substrato, 'cm') + campo('nFolga', 'Sem água no topo', nv.folga, 'cm') + '</div>' : '')) +
        '<details class="extra"' + (nv.manual ? ' open' : '') + '><summary>Não sei as medidas: digitar os litros</summary>' + campo('nManual', 'Litros', nv.manual, 'L', ' inputmode="numeric"') + '</details>' +
        '<div id="nErros"></div></div><div class="baixo"><button type="button" class="bo" data-acao="novo-prox" id="nProx"' + (L ? '' : ' disabled') + '>Continuar' + ic('seta') + '</button>' +
        '<p>Próximo: data de início e lembrete · <b style="color:var(--marfim)">Iniciar ciclagem hoje</b></p></div>';
    } else {
      var hoje = nv.inicio === N.hojeISO();
      h = cabNovo(nv.nome) + '<div class="corpo">' + progNovo(3, 'Início') +
        '<h1 class="let m" style="margin-top:18px">' + (hoje ? 'Começa <i>hoje</i>' : 'Começa em <i>' + N.dataCurta(nv.inicio) + '</i>') + '</h1>' +
        '<p class="sub">' + esc(nv.nome) + ' · ' + (nv.forma === 'globo' ? 'cerca de ' : '') + N.num(litrosNovo(nv).estimada) + ' L</p>' +
        '<div class="grupo vd" style="margin-top:18px"><label class="li" style="cursor:pointer">' + ic('cal') + '<b>Começa em</b><input id="nInicio" type="date" value="' + esc(nv.inicio) + '" max="' + N.hojeISO() + '" style="background:none;border:0;font:500 15px var(--mo);color:var(--ouro2);color-scheme:dark"></label>' +
          '<button type="button" class="li sw" role="switch" aria-checked="' + nv.lembrete + '" data-acao="novo-lembrete">' + ic('sino') + '<b>Lembrete semanal<small>Cria um evento que se repete toda semana na agenda do seu celular.</small></b><i></i></button></div>' +
        '<p class="nota">Filtro, aquecedor e peixes você cadastra depois. Para começar no app, bastam as medidas.</p>' +
        '</div><div class="baixo"><button type="button" class="bo" data-acao="novo-iniciar">' + ic('cic') + (hoje ? 'Iniciar ciclagem hoje' : 'Iniciar ciclagem em ' + N.dataCurta(nv.inicio)) + '</button></div>';
    }
    cheia.innerHTML = h;
  }
  function resNovo(L) { return L ? '<b><i>≈</i> ' + N.num(L.estimada) + ' L</b><span>' + (L.manual ? 'informados' : L.globo ? 'de água<br>(estimativa)' : 'de água<br>' + L.bruta + ' L brutos') + '</span>' : '<b style="color:var(--mudo2)">— L</b><span>preencha as<br>medidas</span>'; }
  function descNovo(nv) {
    var s = N.lerNumero(nv.substrato) || 0, f = N.lerNumero(nv.folga) || 0;
    var t = s || f ? 'Já desconta ' + [s ? N.num(s) + ' cm de substrato' : null, f ? N.num(f) + ' cm sem água' : null].filter(Boolean).join(' e ') : 'Sem desconto de substrato e espaço sem água';
    return t + ' · <button type="button" class="lk" style="min-height:0;display:inline" data-acao="novo-mudar">mudar</button>';
  }
  function atualizarNovo() {
    var nv = ui.novo; if (!nv || nv.passo !== 2) return;
    ['c', 'l', 'a'].forEach(function (k) { var el = $('n' + k.toUpperCase()); if (el) nv[k] = el.value; });
    [['gd', 'nGd'], ['gh', 'nGh'], ['gs', 'nGs']].forEach(function (k) { var el = $(k[1]); if (el) nv[k[0]] = el.value; });
    if ($('nSub')) nv.substrato = $('nSub').value; if ($('nFolga')) nv.folga = $('nFolga').value; if ($('nManual')) nv.manual = $('nManual').value;
    var L = litrosNovo(nv);
    if (nv.forma === 'globo') {
      $('nIso').innerHTML = globoSVG(globoNovo(nv));
      var G = N.litragemGlobo(globoNovo(nv)); $('nGloboErr').innerHTML = G && G.erro ? listaErros([MSG_GLOBO[G.erro]]) : '';
    } else { $('nIso').innerHTML = isoSVG(dimNovo(nv)); $('nDesc').innerHTML = descNovo(nv); }
    $('nRes').innerHTML = resNovo(L);
    $('nProx').disabled = !L;
  }
  function novoProx() {
    var nv = ui.novo;
    if (nv.passo === 1) {
      nv.nome = ($('nNome').value || '').trim().slice(0, 40);
      if (!nv.nome) { $('nErros').innerHTML = '<ul class="erros"><li>Dê um nome ao aquário (ex.: "Aquário da sala").</li></ul>'; return; }
      nv.passo = 2; desenhar(); setTimeout(function () { var i = $('nC'); if (i && !nv.c) i.focus(); }, 60); return;
    }
    if (nv.passo === 2) {
      atualizarNovo();
      var d = dimNovo(nv), algum = d.c || d.l || d.a;
      if (nv.forma === 'globo') { var G = N.litragemGlobo(globoNovo(nv)); if (G && G.erro) { $('nErros').innerHTML = listaErros([MSG_GLOBO[G.erro]]); return; } }
      else if (algum && !N.litragem(d)) { $('nErros').innerHTML = '<ul class="erros"><li>Preencha as três medidas (comprimento, largura e altura) ou apague as que faltam.</li></ul>'; return; }
      else if (N.litragem(d) && N.litragem(d).estimada <= 0) { $('nErros').innerHTML = '<ul class="erros"><li>O substrato e o espaço sem água passam da altura do aquário.</li></ul>'; return; }
      if (!litrosNovo(nv)) return;
      nv.passo = 3; desenhar(); cheia.scrollTop = 0;
    }
  }
  function iniciarNovo() {
    var nv = ui.novo, d = dimNovo(nv), gl = nv.forma === 'globo', G = gl ? N.litragemGlobo(globoNovo(nv)) : null;
    var temDim = gl ? !!(G && !G.erro) : !!N.litragem(d), agora = new Date().toISOString();
    var ini = nv.inicio > N.hojeISO() ? N.hojeISO() : nv.inicio;
    var aq = { id: N.novoId('a'), nome: nv.nome, forma: gl ? 'globo' : 'ret', dim: !gl && temDim ? d : {}, globo: gl && temDim ? globoNovo(nv) : undefined,
      litrosManual: temDim ? null : N.lerNumero(nv.manual), filtro: '', aquecedor: null, montagem: ini,
      fauna: [], plantado: false, camaroes: false, semPeixes: true, ciclagem: { inicio: ini, comPeixes: false }, tpa: { intervalo: N.TPA_PADRAO_DIAS }, criado: agora, atualizado: agora };
    E.aquarios.push(aq); salvar(); pedirPersistente();
    var lembrar = nv.lembrete;
    ui.novo = null; ir('ciclagem', { cicAq: aq.id, aqId: aq.id });
    if (lembrar) baixar('lembrete-medir-aquario.ics', 'text/calendar', N.ics({ titulo: 'Medir a água: ' + aq.nome, diaSemana: N.paraData(ini).getDay(), hora: '10:00' }))
      .then(function (ok) { toast(ok ? 'Ciclagem iniciada. Abra o arquivo para pôr o lembrete na agenda.' : 'Ciclagem iniciada.'); });
    else toast('Ciclagem iniciada.');
  }

  /* ---------- B4 · ciclagem ---------- */
  function diasCic(aq) { return Math.max(0, N.diasEntre(N.paraData(aq.ciclagem.inicio), new Date())); }
  function telaCiclagem() {
    var cics = E.aquarios.filter(function (a) { return a.ciclagem && a.ciclagem.inicio; });
    if (!cics.length) {
      setBarra({ tit: 'Ciclagem', dir: bc('cic-info', 'info', 'Como funciona') });
      var outros = E.aquarios;
      tela.innerHTML = '<h1 class="let">Aquário<br><i>novo?</i></h1>' +
        '<p class="sub">Informe as medidas e comece a contar a ciclagem hoje. Os peixes você escolhe depois.</p>' +
        '<div class="trilha vd"><div class="tri"><i class="on"><span>' + ic('regua') + '</span>Medidas<br>hoje</i><i><span>' + ic('cic') + '</span>Ciclagem<br>semanas</i><i><span>' + ic('peixe') + '</span>Peixes<br>depois</i></div>' +
        '<button type="button" class="bo" style="margin-top:22px" data-acao="aq-novo">' + ic('mais') + 'Começar aquário novo</button></div>' +
        (outros.length ? '<div class="grupo vd" style="margin-top:12px">' + outros.map(function (a) {
          var L = N.litrosDoAquario(a); return '<button type="button" class="li" data-cic-ini="' + esc(a.id) + '"><b>' + esc(a.nome) + '</b><span>' + (L ? litrosTxt(a) : '') + '</span>' + ic('dir', '') .replace('class="ic"', 'class="ic seta"') + '</button>'; }).join('') + '</div>' : '');
      return;
    }
    var aq = cics.find(function (a) { return a.id === ui.cicAq; }) || cics[0]; ui.cicAq = aq.id;
    var L = N.lerCiclagem(E, aq), dias = L.dias, noSem = dias % 7;
    setBarra({ tit: 'Ciclagem', sempre: true, dir: bc('menu-cic', 'mais3', 'Mais ações') });
    var arco = 553, off = arco * (1 - (noSem + 1) / 7);
    var porque = function (fs, rot) { return fs && fs.length ? '<details class="ver"><summary>' + (rot || 'Por quê? Fonte') + ic('dir') + '</summary>' + fontesHTML(fs) + '</details>' : ''; };
    var aviso = function (a) { return '<div class="fase vd av-' + a.cor + '">' + ic(a.cor === 'info' ? 'info' : 'al') + '<div><p>' + esc(a.texto) + '</p>' + porque(a.fontes) + '</div></div>'; };
    var em = L.emergencia;
    var h = (cics.length > 1 ? '<div class="troca">' + cics.map(function (a) { return '<button type="button" class="chave" data-cic-ver="' + esc(a.id) + '" aria-pressed="' + (a.id === aq.id) + '">' + esc(a.nome) + '</button>'; }).join('') + '</div>' : '') +
      '<p class="centro" style="font-size:15px;color:var(--mudo);margin-top:4px">' + esc(aq.nome) + seloDemo(aq) + ' · desde ' + N.dataCurta(aq.ciclagem.inicio) + (L.comPeixes ? ' · com peixes' : ' · sem peixes') + '</p>' +
      '<div class="anel" role="img" aria-label="Ciclagem: dia ' + dias + ', semana ' + L.semana + '"><svg viewBox="0 0 200 200"><defs><linearGradient id="b5g"><stop offset="0" stop-color="#F6DA98"/><stop offset="1" stop-color="#D9A84E"/></linearGradient></defs>' +
        '<circle cx="100" cy="100" r="88" fill="none" stroke="rgba(242,235,221,.1)" stroke-width="10"/><circle cx="100" cy="100" r="88" fill="none" stroke="url(#b5g)" stroke-width="10" stroke-linecap="round" stroke-dasharray="' + arco + '" stroke-dashoffset="' + off.toFixed(1) + '"/></svg>' +
        '<div><small>Semana ' + L.semana + '</small><b>' + dias + '</b><span>' + (dias === 1 ? 'dia' : 'dias') + '</span></div></div>';
    // ordem (ciclagem-regras.md 6): cabeçalho do modo emergência → 🔴 → 🟡 → fase → ℹ️ → o que medir na próxima → rodapé
    if (em) h += '<div class="fase vd av-emerg">' + ic('al') + '<div><p>' + esc(em.cabecalho) + '</p><p style="margin-top:6px"><b>' + esc(em.sempre) + '</b></p>' + porque(em.fontes) + '</div></div>';
    if (em && em.vermelho) h += '<div class="alerta vd vermelho" style="margin-top:12px"><div class="kk">' + ic('al') + 'Agir hoje</div><p class="exp" style="margin-top:6px;position:relative">' + esc(em.vermelho.texto) + '</p>' +
      em.nh3.map(function (t) { return '<p class="exp" style="margin-top:6px;position:relative">' + esc(t) + '</p>'; }).join('') + '<details><summary>Por que e fonte' + ic('dir') + '</summary>' + fontesHTML(em.vermelho.fontes.concat(em.nh3valor != null ? [{ titulo: 'Embrapa · Comunicado Técnico 47 (amônia tóxica por pH e temperatura)', url: 'https://www.infoteca.cnptia.embrapa.br/infoteca/bitstream/doc/31730/1/comunicado47.pdf' }] : [])) + '</details></div>';
    h += L.avisos.filter(function (a) { return a.cor !== 'info'; }).map(aviso).join('');
    h += '<div class="leitura vd' + (L.fase === 'f4_criterio' ? ' criterio' : '') + '"><div class="kk">' + ic('cic') + 'Fase provável · ' + (L.ultima ? 'medição de ' + quando(L.ultima.data) : 'sem medição ainda') + '</div>' +
      '<p class="ttl">' + esc(L.titulo) + '</p>' +
      (L.regressao ? '<p class="exp reg"><b>' + esc(N.CIC.regressao.titulo) + '.</b> ' + esc(N.CIC.regressao.texto) + '</p>' : '') +
      (L.final ? '<p class="exp">' + esc(L.final) + '</p>' : '<p class="exp">' + esc(L.exp) + '</p>') +
      (L.fazer && !L.final ? '<p class="exp"><b>O que fazer agora:</b> ' + esc(L.fazer) + '</p>' : '') +
      L.tendencias.map(function (t) { return '<p class="exp tend">' + ic('seta') + esc(t.texto) + '</p>'; }).join('') +
      (L.faltamDados ? '<p class="exp mudo">' + esc(N.CIC.faltam_dados) + '</p>' : '') +
      porque(L.fontes, 'Por quê? Fonte') + '</div>';
    if (em) h += '<p class="nota">' + esc(em.dica) + '</p>';
    h += L.avisos.filter(function (a) { return a.cor === 'info'; }).map(aviso).join('');
    var pr = L.proxima, prData = pr.data && pr.data < N.hojeISO() ? N.hojeISO() : pr.data;
    h += '<div class="prox vd"><div class="kk">' + ic('cal') + 'O que medir na próxima' + (prData ? ' · ' + (prData === N.hojeISO() ? 'hoje' : 'até ' + N.dataCurta(prData)) : '') + '</div>' +
      '<p class="exp"><b>' + esc(pr.itens) + '</b></p><p class="exp">' + esc(pr.sempre) + '</p><p class="nota">' + esc(pr.dica) + '</p>' +
      '<div class="lado"><button type="button" class="lk" data-acao="cic-agenda" data-data="' + esc(prData || '') + '">' + ic('cal') + 'Pôr na minha agenda</button></div></div>' +
      '<button type="button" class="bo" style="margin-top:16px" data-acao="medir-cic">' + ic('gota') + 'Registrar medição de hoje</button>' +
      graficoCic(L) +
      '<h2 class="sec">Semanas</h2><div class="grupo vd sem-l">' + L.semanas.slice().reverse().map(function (s) {
        return '<div class="li' + (s.atual ? ' atual' : '') + '"><b>Semana ' + s.semana + (s.atual ? ' · agora' : '') + (s.fase ? ' · ' + esc(N.tituloFase(s.fase)) : '') +
          '<small>' + (s.medicoes.length ? s.medicoes.map(function (m) {
            var v = ['amonia', 'nitrito', 'nitrato', 'ph', 'temp'].filter(function (k) { return typeof m[k] === 'number'; }).map(function (k) { return N.PORID[k].nome + ' ' + valorTxt(m, N.PORID[k]) + unid(N.PORID[k]); });
            return N.dataCurta(m.data) + ' · ' + esc(v.join(' · ') || 'só nota');
          }).join('<br>') : 'sem medição') + '</small></b></div>';
      }).join('') + '</div>' +
      '<p class="nota">' + esc(L.prazo) + '</p>' +
      (LINK_EBOOK ? '<a class="bv vd" style="margin-top:14px" href="' + esc(LINK_EBOOK) + '" target="_blank" rel="noopener">' + ic('dir') + 'Ciclagem passo a passo no ebook</a>' : '') +
      '<p class="nota rodape">' + esc(L.rodape) + '</p>' +
      '<p class="centro" style="margin-top:14px"><button type="button" class="lk" data-acao="aq-novo">' + ic('mais') + 'Começar aquário novo</button></p>';
    tela.innerHTML = h;
  }
  // 3 linhas pequenas (amônia, nitrito, nitrato) no tempo, cada uma com o próprio eixo (SRAC: traçar dia a dia para ver o filtro se formar).
  function graficoCic(L) {
    var ms = L.medicoes, linhas = [['amonia', 'Amônia', '#E4BB6A'], ['nitrito', 'Nitrito', '#E59A7E'], ['nitrato', 'Nitrato', '#9CC7A4']];
    var com = linhas.filter(function (l) { return ms.some(function (m) { return typeof m[l[0]] === 'number'; }); });
    if (!com.length) return '<div class="graf vd" style="margin-top:16px"><div class="t"><b>Amônia, nitrito e nitrato</b></div><p class="nota">Registre amônia e nitrito para ver a curva da ciclagem.</p></div>';
    var t0 = N.paraData(ms[0].data).getTime(), t1 = N.paraData(ms[ms.length - 1].data).getTime(), span = Math.max(1, t1 - t0), W = 320, H = 44, ml = 4, mr = 46;
    return '<div class="graf vd cicg" style="margin-top:16px"><div class="t"><b>Amônia, nitrito e nitrato</b><span class="ult" style="font-size:12.5px;color:var(--mudo)">' + plural(ms.length, 'medição', 'medições') + '</span></div>' +
      com.map(function (l) {
        var s = ms.filter(function (m) { return typeof m[l[0]] === 'number'; }), mx = Math.max.apply(null, [0.01].concat(s.map(function (m) { return m[l[0]]; })));
        var X = function (m) { return ml + (N.paraData(m.data).getTime() - t0) / span * (W - ml - mr); }, Y = function (v) { return 6 + (1 - v / mx) * (H - 12); };
        var pts = s.map(function (m) { return X(m).toFixed(1) + ',' + Y(m[l[0]]).toFixed(1); }), u = s[s.length - 1];
        return '<div class="linha-c"><span class="nm"><i style="background:' + l[2] + '"></i>' + l[1] + '</span><svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(l[1] + ': última ' + N.num(u[l[0]]) + ' mg/L, pico ' + N.num(mx) + ' mg/L') + '">' +
          '<line class="grade-l" x1="' + ml + '" x2="' + (W - mr) + '" y1="' + (H - 6) + '" y2="' + (H - 6) + '"/>' +
          (s.length > 1 ? '<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + l[2] + '" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>' : '') +
          s.map(function (m) { return '<circle cx="' + X(m).toFixed(1) + '" cy="' + Y(m[l[0]]).toFixed(1) + '" r="' + (m === u ? 4.5 : 3) + '" fill="' + l[2] + '"/>'; }).join('') +
          '<text class="eixo-t" x="' + (W - 2) + '" y="' + (Y(u[l[0]]) + 4).toFixed(1) + '" text-anchor="end">' + N.num(u[l[0]]) + '</text></svg></div>';
      }).join('') +
      '<div class="barras-d"><span>' + N.dataCurta(ms[0].data) + '</span><span>' + N.dataCurta(ms[ms.length - 1].data) + '</span></div><p class="so-um">Cada linha usa a própria escala (até o pico dela), para mostrar a forma da curva. Os números são mg/L.</p></div>';
  }
  function folhaIniciarCic(id, ajustar) {
    var aq = aquario(id), c = aq.ciclagem || {};
    ui.cicForm = { id: id, ajustar: !!ajustar, comPeixes: c.comPeixes !== undefined ? !!c.comPeixes : (aq.fauna || []).length > 0, fonteAmonia: c.fonteAmonia || null, semeadura: c.semeadura || null };
    desenharFolhaCic();
  }
  function desenharFolhaCic() {
    var f = ui.cicForm, aq = aquario(f.id);
    var chaves = function (attr, opc, val) { return '<div class="chaves">' + opc.map(function (o) { return '<button type="button" class="chave" data-' + attr + '="' + o[0] + '" aria-pressed="' + (val === o[0]) + '">' + o[1] + '</button>'; }).join('') + '</div>'; };
    abrirFolha('<h2>' + esc(aq.nome) + '</h2><p class="nota">' + (f.ajustar ? 'Ajuste o que mudou na ciclagem deste aquário.' : 'Começa a contar as semanas da ciclagem deste aquário.') + '</p>' +
      (f.ajustar ? '' : '<label class="campo"><span class="rot">Data de início</span><input id="cInicio" type="date" value="' + N.hojeISO() + '" max="' + N.hojeISO() + '"></label>') +
      '<span class="rot" style="margin-top:14px">Já tem peixes neste aquário?</span>' + chaves('ccp', [['nao', 'Não'], ['sim', 'Sim']], f.comPeixes ? 'sim' : 'nao') +
      (f.comPeixes ? '' : '<span class="rot" style="margin-top:14px">Como você está alimentando a ciclagem? <span>(opcional)</span></span>' + chaves('cfa', [['amonia', 'Amônia pura sem perfume'], ['racao', 'Ração'], ['nao_sei', 'Ainda não sei']], f.fonteAmonia)) +
      '<span class="rot" style="margin-top:14px">Usou algo para acelerar? <span>(opcional)</span></span>' + chaves('csm', [['midia_madura', 'Mídia de filtro maduro'], ['produto_bacterias', 'Produto de bactérias'], ['nenhuma', 'Nada']], f.semeadura) +
      '<div class="pilha"><button type="button" class="bo" data-acao="iniciar-cic" data-id="' + esc(f.id) + '">' + ic('cic') + (f.ajustar ? 'Salvar' : 'Iniciar ciclagem') + '</button></div>');
  }

  /* ---------- Espécies (o Checador dentro do app) ---------- */
  function telaEspecies() {
    var cb = ui.combo;
    setBarra({ tit: 'Espécies' });
    tela.innerHTML = '<h1 class="let">Espécies</h1><p class="sub">Busque um peixe para ver a ficha com fonte ou junte vários para checar se combinam.</p>' +
      '<div class="busca">' + ic('busca') + '<input id="eBusca" type="search" value="' + esc(ui.busca) + '" placeholder="Digite um peixe (ex.: neon, betta)" autocomplete="off" enterkeyhint="search" aria-label="Buscar espécie"></div>' +
      '<ul class="sugestoes vd" id="eSug"' + (ui.busca.trim() ? '' : ' hidden') + '></ul>' +
      '<h2 class="sec">Checar combinação</h2>' +
      (E.aquarios.length ? '<div class="chaves" style="margin-bottom:6px">' + E.aquarios.map(function (a) { return '<button type="button" class="chave" data-ecarregar="' + esc(a.id) + '">' + ic('aq') + esc(a.nome) + '</button>'; }).join('') + '</div>' : '') +
      '<ul class="fauna" id="eFauna"></ul>' +
      '<div id="eCombo"></div>';
    desenharSugE(); desenharCombo();
  }
  function desenharSugE() {
    var ul = $('eSug'), t = ui.busca; if (!ul) return;
    if (!t.trim()) { ul.hidden = true; ul.innerHTML = ''; return; }
    var res = R.buscar(D.especies, t, 8);
    ul.innerHTML = res.map(function (e) {
      return '<li style="display:flex;align-items:center"><button type="button" data-ficha="' + esc(e.id) + '" style="flex:1">' + imgEsp(e) + '<span class="nm"><b>' + esc(e.nome_popular) + '</b><i>' + esc(e.nome_cientifico) + '</i></span></button>' +
        '<button type="button" data-eadd="' + esc(e.id) + '" aria-label="Juntar ' + esc(e.nome_popular) + ' à combinação" style="width:auto;padding-right:16px"><span class="mais">' + ic('mais') + '</span></button></li>';
    }).join('') + '<li><button type="button" data-epedir="1"><span class="nm"><b>Não achei “' + esc(t.trim().slice(0, 40)) + '”</b><i>' + (pedido(t) ? 'Pedido anotado' : 'Pedir espécie: fica anotado no aparelho') + '</i></span></button></li>';
    ul.hidden = false;
  }
  function desenharCombo() {
    var cb = ui.combo, el = $('eCombo'); if (!el) return;
    $('eFauna').innerHTML = faunaHTML(cb.fauna, 'data-eqtd', 'data-epedirf');
    var sel = selecao(cb.fauna);
    el.innerHTML = (cb.fauna.length ? '' : '<p class="nota">Toque no + de cada peixe para juntar na combinação.</p>') +
      '<div class="grade2" style="margin-top:16px">' + campo('eLitros', 'Litros do aquário', cb.litros, 'L', ' inputmode="numeric"') + '<div></div></div>' +
      '<div class="chaves" style="margin-top:12px"><button type="button" class="chave" data-etog="plantado" aria-pressed="' + !!cb.plantado + '">Tem plantas naturais</button><button type="button" class="chave" data-etog="camaroes" aria-pressed="' + !!cb.camaroes + '">Tem camarões</button></div>' +
      '<div id="eVeredito">' + vereditoHTML(sel, { litros: N.lerNumero(cb.litros) || 0, plantado: !!cb.plantado, camaroes: !!cb.camaroes }) + '</div>' +
      (cb.fauna.length ? '<p class="centro"><button type="button" class="lk mudo" data-acao="combo-limpar">Limpar combinação</button></p>' : '');
  }
  function folhaFicha(id) {
    var e = POR_ID[id]; if (!e) return;
    var f = function (r, un) { return Array.isArray(r) && r.length === 2 ? N.faixaTxt(r[0], r[1], un) : '—'; };
    var lit = e.litragem_min_l || {}, tam = e.tamanho_adulto_cm || {};
    var temper = { pacifico: 'Pacífico', semi_agressivo: 'Semiagressivo', agressivo: 'Agressivo' }[e.temperamento] || e.temperamento || '—';
    abrirFolha('<div class="ficha"><h2>' + esc(e.nome_popular) + '</h2><p class="cien">' + esc(e.nome_cientifico) + '</p>' + imgEsp(e, true) +
      '<div class="tres"><div class="vd"><small>Temperatura</small><b>' + f(e.temperatura_c, '°C') + '</b></div><div class="vd"><small>pH</small><b>' + f(e.ph, '') + '</b></div><div class="vd"><small>Tamanho</small><b>' + (tam.max ? N.num(tam.max) + ' cm' : '—') + '</b></div>' +
      '<div class="vd"><small>Cardume</small><b>' + (e.grupo_minimo > 1 ? e.grupo_minimo + '+' : 'não') + '</b></div><div class="vd"><small>Litragem mín.</small><b>' + (lit.conservador ? lit.conservador + ' L' : '—') + '</b></div><div class="vd"><small>Temperamento</small><b style="font:600 14px/1.3 var(--tx)">' + esc(temper) + '</b></div></div>' +
      (lit.observacao ? '<p class="nota">' + esc(lit.observacao) + '</p>' : '') +
      (e.popular_x_fonte && e.popular_x_fonte.length ? e.popular_x_fonte.map(function (x) { return '<div class="px vd"><p class="pop">O que se diz: ' + esc(x.popular) + '</p><p>O que a fonte diz: ' + esc(x.fonte_diz) + '</p></div>'; }).join('') : '') +
      (e.notas && e.notas.length ? '<ul class="nt">' + e.notas.map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') + '</ul>' : '') +
      '<h2 class="sec" style="font-size:19px">Fontes</h2>' + fontesHTML(e.fontes) +
      '<div class="pilha"><button type="button" class="bo" data-eadd="' + esc(e.id) + '" data-fechar="1">' + ic('mais') + 'Juntar à combinação</button></div></div>');
  }

  /* ---------- Ajustes (U7) ---------- */
  function telaAjustes() {
    var ult = E.meta.ultimoBackup ? new Date(E.meta.ultimoBackup) : null;
    var st = persist.concedido === true ? ['ok', 'O navegador marcou os dados deste app como protegidos.'] :
      persist.concedido === false ? ['at', 'O navegador ainda não protegeu os dados. Instalar na tela de início e salvar cópias resolve.'] :
      !persist.suportado ? ['at', 'Este navegador não informa a proteção dos dados. Salve cópias com frequência.'] : ['', 'Verificando…'];
    setBarra({ esq: E.aquarios.length ? null : bc('lista', 'esq', 'Voltar'), tit: 'Ajustes' });
    tela.innerHTML = '<h1 class="let">Ajustes<span class="chip-beta">Beta</span></h1>' +
      '<h2 class="sec">Cópia dos seus dados</h2><p class="nota" style="margin-top:0">Os dados ficam só neste aparelho, sem conta. Trocou de celular ou limpou o navegador? Eles só voltam com a cópia.</p>' +
      '<div class="grupo vd"><div class="status ' + (ult ? 'ok' : 'at') + '"><i></i><span>' + (ult ? 'Última cópia: ' + N.dataCurta(N.hojeISO(ult)) + '/' + ult.getFullYear() : 'Nenhuma cópia salva ainda.') + ' · ' + plural(reais(E.aquarios).length, 'aquário', 'aquários') + ', ' + plural(reais(E.medicoes).length, 'medição', 'medições') + (N.temDemo(E) ? ' (o exemplo não entra na cópia)' : '') + '.</span></div>' +
        '<button type="button" class="li" data-acao="backup">' + ic('baixar') + '<b>Salvar cópia<small>Guarde no Google Drive, no iCloud ou mande para você mesmo.</small></b>' + ic('dir').replace('class="ic"', 'class="ic seta"') + '</button>' +
        '<button type="button" class="li" data-acao="importar">' + ic('subir') + '<b>Restaurar uma cópia<small>Junta a cópia com o que já está aqui, sem apagar nada.</small></b>' + ic('dir').replace('class="ic"', 'class="ic seta"') + '</button></div>' +
      '<h2 class="sec">Proteção dos dados</h2><div class="grupo vd"><div class="status ' + st[0] + '"><i></i><span>' + st[1] + '</span></div>' +
        '<div class="status ' + (instalado() ? 'ok' : 'at') + '"><i></i><span>' + (instalado() ? 'App instalado na tela de início.' : 'App ainda não instalado.') + '</span></div></div>' +
      (!instalado() && !ui.instDispensado ? '<div class="cartao-inst vd"><button type="button" class="bc fechar" data-acao="inst-dispensar" aria-label="Dispensar">' + ic('x') + '</button><b style="font:400 20px/1.2 var(--st)">Instale na tela de início</b>' +
        '<p class="nota" style="margin-top:4px">Instalado, o app fica protegido contra a limpeza automática do navegador e funciona sem internet.</p>' + passosInstalar() + '</div>' : '') +
      '<h2 class="sec">Lembrete na agenda</h2><p class="nota" style="margin-top:0">Cria um evento que se repete na agenda do seu celular. O app não manda notificação.</p>' +
        '<div class="seg" role="group" aria-label="Tipo de lembrete"><button type="button" data-ltipo="medir" aria-pressed="' + (ui.lTipo !== 'troca') + '">Medir a água</button><button type="button" data-ltipo="troca" aria-pressed="' + (ui.lTipo === 'troca') + '">Troca de água</button></div>' +
        (ui.lTipo === 'troca' ? (reais(E.aquarios).length || E.aquarios.length ? '<label class="campo"><span class="rot">Aquário</span><select id="lAq">' + E.aquarios.map(function (a) { return '<option value="' + esc(a.id) + '">' + esc(a.nome) + (a.demo ? ' (exemplo)' : '') + ' · a cada ' + (N.intervaloTPA(a) || N.TPA_PADRAO_DIAS) + ' dias</option>'; }).join('') + '</select></label>' +
            '<p class="nota">Repete no intervalo de troca do aquário, a partir da próxima troca. Texto: "Hoje é dia de trocar uma parte da água."</p>' : '<p class="nota">Cadastre um aquário primeiro.</p>')
          : '<div class="grade2" style="margin-top:4px"><label class="campo"><span class="rot">Dia</span><select id="lDia">' + DIAS.map(function (d, i) { return '<option value="' + i + '"' + (i === 6 ? ' selected' : '') + '>' + d + '</option>'; }).join('') + '</select></label>' +
            '<label class="campo"><span class="rot">Hora</span><input id="lHora" type="time" value="10:00"></label></div>') +
        '<button type="button" class="bv vd" style="margin-top:12px" data-acao="lembrete">' + ic('cal') + 'Pôr na minha agenda</button>' +
      '<h2 class="sec">Unidades do seu kit</h2><p class="nota" style="margin-top:0">Se o seu kit ou laudo mostra outra unidade, escolha aqui: você digita como o kit mostra e o app converte.</p>' +
        '<div class="grupo vd">' + ['amonia', 'nitrito', 'nitrato', 'kh', 'gh', 'temp'].map(function (id) {
          var U = N.unidadesDe(id); if (!U) return '';
          var atual = (E.meta.unidades || {})[id] || U.padrao;
          return '<label class="li"><b>' + esc(N.PORID[id].nome) + '</b><select data-unid="' + id + '" style="max-width:60%;background:none;border:0;color:var(--ouro2);font:500 14px var(--tx);text-align:right">' +
            U.opcoes.map(function (o) { return '<option value="' + esc(o.id) + '"' + (o.id === atual ? ' selected' : '') + '>' + esc(o.rotulo) + '</option>'; }).join('') + '</select></label>';
        }).join('') + '</div>' +
      '<h2 class="sec">Modo demonstração</h2><p class="nota" style="margin-top:0">Cria 2 aquários de exemplo (um em ciclagem e um montado, com 8 semanas de medições) para mostrar o app. Eles ficam marcados como exemplo, não entram na cópia e saem com 1 toque, sem mexer nos seus dados.</p>' +
        '<div class="grupo vd">' + (N.temDemo(E) ? '<button type="button" class="li" data-acao="demo-remover">' + ic('lixo') + '<b>Remover exemplo<small>Apaga só os aquários de exemplo.</small></b></button>'
          : '<button type="button" class="li" data-acao="demo-carregar">' + ic('aq') + '<b>Carregar exemplo para demonstração</b>' + ic('dir').replace('class="ic"', 'class="ic seta"') + '</button>') + '</div>' +
      '<h2 class="sec">Sobre o beta</h2><p class="nota" style="margin-top:0">Versão de teste, grátis. Sem cadastro e sem login: aquários e medições ficam só neste aparelho.</p>' +
        (E.meta.pedidos.length ? '<p class="nota">Espécies que você pediu: ' + esc(E.meta.pedidos.join(', ')) + '. Para mandar agora, fale com o <a href="' + INSTAGRAM + '" target="_blank" rel="noopener">@paragonfish</a>.</p>' : '') +
        '<div class="grupo vd" style="margin-top:12px"><button type="button" class="li perigo" data-acao="apagar-tudo">' + ic('lixo') + '<b>Apagar tudo deste aparelho</b></button></div>';
    if (persist.suportado && persist.concedido === null) pedirPersistente().then(function () { if (ui.aba === 'ajustes' && !ui.med && !ui.novo) telaAjustes(); });
  }
  function passosInstalar() {
    return ehIphone()
      ? '<ol class="passos"><li>Abra este endereço no <b>Safari</b>.</li><li>Toque em <b>Compartilhar</b> (o quadrado com a seta).</li><li>Escolha <b>Adicionar à Tela de Início</b>.</li></ol>'
      : '<ol class="passos"><li>Abra este endereço no <b>Chrome</b>.</li><li>Toque nos <b>três pontinhos</b> no canto.</li><li>Escolha <b>Instalar app</b> ou <b>Adicionar à tela inicial</b>.</li></ol>';
  }
  function baixar(nome, tipo, texto) {
    var blob = new Blob([texto], { type: tipo });
    var arq = typeof File === 'function' ? new File([blob], nome, { type: tipo }) : null;
    if (arq && navigator.canShare && navigator.canShare({ files: [arq] }) && /android|iphone|ipad/i.test(navigator.userAgent)) {
      return navigator.share({ files: [arq], title: nome }).then(function () { return true; }).catch(function (e) { return e && e.name === 'AbortError' ? false : baixarLink(blob, nome); });
    }
    return Promise.resolve(baixarLink(blob, nome));
  }
  function baixarLink(blob, nome) {
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = nome;
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500); return true;
  }
  function fazerBackup() {
    if (!reais(E.aquarios).length && !reais(E.medicoes).length) { toast(N.temDemo(E) ? 'O exemplo não entra na cópia. Cadastre um aquário seu para copiar.' : 'Ainda não há dados para copiar.'); return; }
    baixar(N.nomeBackup(), 'application/json', N.exportar(E)).then(function (ok) {
      if (!ok) return;
      E.meta.ultimoBackup = new Date().toISOString(); E.meta.medicoesDesdeBackup = 0; salvar(); desenhar(); toast('Cópia salva.');
    });
  }
  function importar(arquivo) {
    var fr = new FileReader();
    fr.onload = function () {
      var r = N.lerBackup(String(fr.result));
      if (!r.ok) { toast(r.erro); return; }
      if (!confirm('Restaurar a cópia com ' + r.resumo.aquarios + ' aquário(s) e ' + r.resumo.medicoes + ' medição(ões)? O que já está aqui continua.')) return;
      var m = N.mesclar(E, r.estado); E = m.estado; salvar(); ir('aquarios', { aqId: null });
      toast('Restaurado: ' + m.novos.aquarios + ' aquário(s), ' + m.novos.medicoes + ' medição(ões) e ' + m.novos.manutencoes + ' manutenção(ões) novos.');
    };
    fr.readAsText(arquivo);
  }

  /* ---------- menus ••• ---------- */
  function menuAq() {
    var aq = aquario(ui.aqId);
    abrirFolha('<h2>' + esc(aq.nome) + '</h2><div class="grupo" style="border-radius:20px;margin-top:14px">' +
      '<button type="button" class="li" data-acao="editar-aq">' + ic('lapis') + '<b>Editar aquário</b></button>' +
      '<button type="button" class="li" data-acao="hist">' + ic('hist') + '<b>Histórico</b></button>' +
      (aq.ciclagem ? '<button type="button" class="li" data-acao="ver-cic">' + ic('cic') + '<b>Ver a ciclagem</b></button>' : '<button type="button" class="li" data-cic-ini="' + esc(aq.id) + '">' + ic('cic') + '<b>Acompanhar a ciclagem</b></button>') +
      '<button type="button" class="li" data-acao="manut">' + ic('gota') + '<b>Registrar manutenção</b></button>' +
      '<button type="button" class="li" data-acao="backup">' + ic('baixar') + '<b>Salvar cópia</b></button>' +
      '<button type="button" class="li perigo" data-acao="excluir-aq-menu">' + ic('lixo') + '<b>Excluir este aquário</b></button></div>');
  }
  function excluirAq(id) {
    var aq = aquario(id); if (!aq) return;
    if (!confirm('Excluir "' + aq.nome + '" e todas as medições dele? Isso não tem volta (a não ser por uma cópia salva).')) return;
    E.aquarios = E.aquarios.filter(function (x) { return x.id !== id; }); E.medicoes = E.medicoes.filter(function (m) { return m.aquario !== id; });
    E.manutencoes = E.manutencoes.filter(function (m) { return m.aquario !== id; });
    salvar(); ui.form = null; fecharFolha(); ir('aquarios', { aqId: null });
  }

  /* ---------- eventos ---------- */
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest('button, circle.alvo'); if (!b) return;
    var d = b.dataset || {}, a = d.acao;
    if (b.matches && b.matches('circle.alvo')) return mostrarDica(b);
    var ficaAberta = a === 'iniciar-cic' || a === 'tpa-salvar' || a === 'manut-salvar' || a === 'tpa-int-outro' || d.eadd || d.ccp || d.cfa || d.csm || d.tpct || d.mtipo || d.mmidia;
    if (b.closest('#folha') && !ficaAberta) fecharFolha();
    if (d.aba) { ui.form = null; ui.med = null; ui.novo = null; return ir(d.aba, d.aba === 'aquarios' && ui.aba === 'aquarios' ? { aqId: null } : null); }
    if (d.abrir) return ir('aquarios', { aqId: d.abrir });
    if (d.grafp) { ui.grafP = d.grafp; return desenhar(); }
    if (d.periodo) { ui.periodo = d.periodo; return desenhar(); }
    if (d.add) { addFauna(ui.form.fauna, d.add); $('fBusca').value = ''; $('fSug').hidden = true; return desenharFauna(); }
    if (d.addsem) { addFauna(ui.form.fauna, null, $('fBusca').value); $('fBusca').value = ''; $('fSug').hidden = true; return desenharFauna(); }
    if (d.qtd !== undefined) { var it = ui.form.fauna[+d.qtd]; it.qtd = (it.qtd || 1) + (+d.d); if (it.qtd < 1) ui.form.fauna.splice(+d.qtd, 1); return desenharFauna(); }
    if (d.pedir !== undefined || d.epedirf !== undefined) {
      var lst = d.pedir !== undefined ? ui.form.fauna : ui.combo.fauna, nm = String(lst[+(d.pedir !== undefined ? d.pedir : d.epedirf)].nome || '').trim().toLowerCase();
      if (nm && E.meta.pedidos.indexOf(nm) < 0) { E.meta.pedidos.push(nm); salvar(); }
      if (d.pedir !== undefined) desenharFauna(); else desenharCombo();
      return toast('Pedido anotado. Para mandar agora, fale com o @paragonfish.');
    }
    if (d.epedir) { var nm2 = ui.busca.trim().toLowerCase().slice(0, 40); if (nm2 && E.meta.pedidos.indexOf(nm2) < 0) { E.meta.pedidos.push(nm2); salvar(); } desenharSugE(); return toast('Pedido anotado. Para mandar agora, fale com o @paragonfish.'); }
    if (d.tog) { ui.form[d.tog] = !ui.form[d.tog]; b.setAttribute('aria-pressed', ui.form[d.tog]); return desenharVeredito(); }
    if (d.aquec) { ui.form.aquecedor = ui.form.aquecedor === (d.aquec === 'sim') ? null : d.aquec === 'sim'; document.querySelectorAll('[data-aquec]').forEach(function (x) { x.setAttribute('aria-pressed', ui.form.aquecedor === (x.dataset.aquec === 'sim')); }); return; }
    if (d.apagarM) {
      if (!confirm('Apagar esta medição?')) return;
      E.medicoes = E.medicoes.filter(function (m) { return m.id !== d.apagarM; }); salvar(); return desenhar();
    }
    // espécies
    if (d.ficha) return folhaFicha(d.ficha);
    if (d.eadd) { if (d.fechar) fecharFolha(); addFauna(ui.combo.fauna, d.eadd); toast(POR_ID[d.eadd].nome_popular + ' na combinação.'); return desenharCombo(); }
    if (d.eqtd !== undefined) { var ie = ui.combo.fauna[+d.eqtd]; ie.qtd = (ie.qtd || 1) + (+d.d); if (ie.qtd < 1) ui.combo.fauna.splice(+d.eqtd, 1); return desenharCombo(); }
    if (d.etog) { ui.combo[d.etog] = !ui.combo[d.etog]; return desenharCombo(); }
    if (d.ecarregar) { var ac = aquario(d.ecarregar); ui.combo = { fauna: JSON.parse(JSON.stringify(ac.fauna || [])), litros: String(N.litrosDoAquario(ac) || ''), plantado: !!ac.plantado, camaroes: !!ac.camaroes }; return desenharCombo(); }
    // medição
    if (d.msel) { var md = ui.med, k = md.sel.indexOf(d.msel); if (k >= 0) md.sel.splice(k, 1); else md.sel.push(d.msel); md.sel = ordemSel(md.sel); return telaEscolha(md); }
    if (d.maq) { ui.med.aqId = d.maq; return telaEscolha(ui.med); }
    if (d.mir !== undefined) return irEtapa(+d.mir);
    if (d.atalho !== undefined) { var m2 = ui.med, id2 = m2.sel[m2.etapa]; m2.vals[id2] = +d.atalho; if (m2.digitando) { m2.digitando = false; return desenhar(); } posRegua(+d.atalho); return atualizarVisor(); }
    if (d.mtroca) { ui.med.troca = ui.med.troca === d.mtroca ? null : d.mtroca; b.parentNode.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', ui.med.troca === x.dataset.mtroca); }); return; }
    // ciclagem
    if (d.cicIni) return folhaIniciarCic(d.cicIni);
    if (d.cicAj) return folhaIniciarCic(d.cicAj, true);
    if (d.ccp) { ui.cicForm.comPeixes = d.ccp === 'sim'; return desenharFolhaCic(); }
    if (d.cfa) { ui.cicForm.fonteAmonia = ui.cicForm.fonteAmonia === d.cfa ? null : d.cfa; return desenharFolhaCic(); }
    if (d.csm) { ui.cicForm.semeadura = ui.cicForm.semeadura === d.csm ? null : d.csm; return desenharFolhaCic(); }
    if (d.mdose) { ui.med.dose = ui.med.dose === d.mdose ? null : d.mdose; b.parentNode.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', ui.med.dose === x.dataset.mdose); }); return; }
    // formato do aquário (Retangular | Globo)
    if (d.fforma) { lerDims(); ui.form.nome = $('fNome').value; ui.form.filtro = $('fFiltro').value; ui.form.montagem = $('fMontagem').value || ''; ui.form.forma = d.fforma; desenhar(); return; }
    if (d.nforma) { atualizarNovo(); ui.novo.forma = d.nforma; desenhar(); return; }
    if (d.globoOk) { var ag = aquario(d.globoOk); if (ag) { ag.avisoGloboVisto = true; salvar(); desenhar(); } return; }
    // troca parcial / manutenção
    if (d.tpct) { var tt = ui.tpa; tt.data = ($('tData') && $('tData').value) || tt.data; if (d.tpct === 'outro') { tt.outro = true; } else { tt.outro = false; tt.pct = +d.tpct; } desenharFolhaTroca(); return; }
    if (d.tint !== undefined) return mudarIntervalo(+d.tint);
    if (d.mtipo) { var mm = ui.mt; mm.data = ($('mtData') && $('mtData').value) || mm.data; mm.nota = ($('mtNota') && $('mtNota').value) || mm.nota; mm.tipo = d.mtipo; return folhaManut(); }
    if (d.mmidia) { var m3 = ui.mt; m3.data = ($('mtData') && $('mtData').value) || m3.data; m3.nota = ($('mtNota') && $('mtNota').value) || m3.nota; m3.midia = d.mmidia; return folhaManut(); }
    if (d.apagarT) { if (!confirm('Apagar este registro de manutenção?')) return; E.manutencoes = E.manutencoes.filter(function (m) { return m.id !== d.apagarT; }); salvar(); return desenhar(); }
    if (d.ltipo) { ui.lTipo = d.ltipo; return telaAjustes(); }
    if (d.cicVer) { ui.cicAq = d.cicVer; return desenhar(); }
    switch (a) {
      case 'aq-novo': ui.form = null; abrirNovo(); break;
      case 'aq-existente': novoForm(null); ui.aba = 'aquarios'; desenhar(); window.scrollTo(0, 0); setTimeout(function () { $('fNome') && $('fNome').focus(); }, 50); break;
      case 'aq-portas': folhaPortas(); break;
      case 'ir-ajustes': ir('ajustes'); break;
      case 'editar-aq': novoForm(aquario(ui.aqId)); desenhar(); window.scrollTo(0, 0); break;
      case 'peixes-aq': novoForm(aquario(ui.aqId)); desenhar(); setTimeout(function () { var s = $('secPeixes'); if (s) s.scrollIntoView(); var i = $('fBusca'); if (i) i.focus({ preventScroll: true }); }, 50); break;
      case 'cancelar-aq': ui.form = null; desenhar(); break;
      case 'salvar-aq': salvarAq(); break;
      case 'excluir-aq': excluirAq(ui.form.id); break;
      case 'excluir-aq-menu': excluirAq(ui.aqId); break;
      case 'menu-aq': menuAq(); break;
      case 'lista': ir('aquarios', { aqId: null }); break;
      case 'hist': ui.aba = 'aquarios'; ui.hist = true; desenhar(); window.scrollTo(0, 0); break;
      case 'hist-fechar': ui.hist = false; desenhar(); window.scrollTo(0, 0); break;
      case 'ver-cic': ir('ciclagem', { cicAq: ui.aqId }); break;
      case 'medir': abrirMedicao(ui.aba === 'ciclagem' ? ui.cicAq : ui.aqId, ui.aba === 'ciclagem' ? 'ciclagem' : null); break;
      case 'medir-cic': abrirMedicao(ui.cicAq, 'ciclagem'); break;
      case 'med-fechar': ui.med = null; desenhar(); break;
      case 'med-comecar': var dt = $('mData'); if (dt && dt.value) ui.med.data = dt.value.slice(0, 16) > agoraLocal() ? agoraLocal() : dt.value.slice(0, 16); ui.med.sel = ordemSel(ui.med.sel); irEtapa(0); break;
      case 'med-prox': irEtapa(ui.med.etapa + 1); break;
      case 'med-pular': var mp = ui.med, ip = mp.sel[mp.etapa]; delete mp.vals[ip]; delete mp.topo[ip];
        if (mp.etapa < mp.sel.length - 1) { irEtapa(mp.etapa + 1); } else { mp.digitando = false; salvarMedicao(); } break;
      case 'med-digitar': ui.med.digitando = true; desenhar(); break;
      case 'med-ajuda': ui.med.ajuda = !ui.med.ajuda; guardarNota(); desenhar(); break;
      case 'med-topo': var mt = ui.med, it2 = mt.sel[mt.etapa]; if (mt.digitando && !lerDigitado()) return; mt.digitando = false; mt.topo[it2] = !mt.topo[it2]; guardarNota(); desenhar(); break;
      case 'med-nota': ui.med.verNota = true; desenhar(); setTimeout(function () { var t = $('mNota'); if (t) t.focus(); }, 30); break;
      case 'med-salvar': salvarMedicao(); break;
      case 'novo-voltar': if (ui.novo.passo > 1) { if (ui.novo.passo === 2) atualizarNovo(); ui.novo.passo--; } else ui.novo = null; desenhar(); break;
      case 'novo-prox': novoProx(); break;
      case 'novo-mudar': atualizarNovo(); ui.novo.mudar = true; desenhar(); setTimeout(function () { var s = $('nSub'); if (s) s.focus(); }, 30); break;
      case 'novo-lembrete': ui.novo.lembrete = !ui.novo.lembrete; b.setAttribute('aria-checked', ui.novo.lembrete); break;
      case 'novo-iniciar': iniciarNovo(); break;
      case 'cic-info': abrirFolha('<h2>Ciclagem</h2><p class="nota">É o tempo em que as bactérias do filtro crescem e passam a dar conta da amônia e do nitrito. O filtro precisa ficar ligado dia e noite. A cada medição de amônia e nitrito, o app mostra a fase provável, o que fazer e o que medir na próxima, com fonte. ' + esc(N.CIC.prazo) + '</p>'); break;
      case 'menu-cic': abrirFolha('<h2>' + esc((aquario(ui.cicAq) || {}).nome || 'Ciclagem') + '</h2><div class="grupo" style="border-radius:20px;margin-top:14px">' +
        '<button type="button" class="li" data-abrir="' + esc(ui.cicAq) + '">' + ic('aq') + '<b>Abrir o painel do aquário</b></button>' +
        '<button type="button" class="li" data-cic-aj="' + esc(ui.cicAq) + '">' + ic('lapis') + '<b>Ajustar a ciclagem<small>Com ou sem peixes, fonte de amônia, aceleradores.</small></b></button>' +
        '<button type="button" class="li" data-acao="aq-novo">' + ic('mais') + '<b>Começar aquário novo</b></button>' +
        '<button type="button" class="li perigo" data-acao="parar-cic">' + ic('x') + '<b>Parar o acompanhamento</b></button></div>'); break;
      case 'iniciar-cic':
        var cf = ui.cicForm, aq = aquario(b.dataset.id), ini = ($('cInicio') && $('cInicio').value) || (aq.ciclagem && aq.ciclagem.inicio) || N.hojeISO();
        aq.ciclagem = { inicio: ini > N.hojeISO() ? N.hojeISO() : ini, comPeixes: !!(cf && cf.comPeixes) };
        if (cf && cf.fonteAmonia && !cf.comPeixes) aq.ciclagem.fonteAmonia = cf.fonteAmonia;
        if (cf && cf.semeadura) aq.ciclagem.semeadura = cf.semeadura;
        aq.atualizado = new Date().toISOString(); salvar(); fecharFolha(); ui.cicForm = null; ir('ciclagem', { cicAq: aq.id }); break;
      case 'cic-agenda':
        var aqc = aquario(ui.cicAq), lc = aqc && N.lerCiclagem(E, aqc), dc = b.dataset.data || N.hojeISO();
        if (!lc) break;
        baixar('lembrete-ciclagem.ics', 'text/calendar', N.ics({ titulo: 'Medir a ciclagem: ' + aqc.nome, descricao: lc.proxima.itens + ' ' + lc.proxima.sempre, inicio: dc, unico: true, hora: '10:00' }))
          .then(function (ok) { if (ok) toast('Abra o arquivo para pôr o lembrete na agenda.'); });
        break;
      // troca parcial e manutenção
      case 'tpa-registrar': folhaTroca(); break;
      case 'tpa-salvar': salvarTroca(); break;
      case 'tpa-intervalo': folhaIntervalo(); break;
      case 'tpa-int-outro':
        var ni = N.lerNumero($('tInt') && $('tInt').value);
        if (!(ni >= N.TPA_MIN_DIAS && ni <= N.TPA_MAX_DIAS)) { toast('Escolha de 3 a 30 dias.'); break; }
        mudarIntervalo(Math.round(ni)); break;
      case 'tpa-porque': folhaTPAporque(); break;
      case 'tpa-agenda': agendaTPA(aquario(ui.aqId)); break;
      case 'manut': ui.mt = null; folhaManut(); break;
      case 'manut-salvar': salvarManutForm(); break;
      case 'globo-porque': folhaGlobo(); break;
      // demonstração
      case 'demo-carregar':
        E = N.carregarDemo(E); salvar(); ir('aquarios', { aqId: null }); toast('Exemplo carregado: 2 aquários marcados como "exemplo".'); break;
      case 'demo-remover':
        if (!confirm('Remover os aquários de exemplo? Os seus dados continuam como estão.')) return;
        E = N.removerDemo(E); salvar(); if (!aquario(ui.aqId)) ui.aqId = null; if (!aquario(ui.cicAq)) ui.cicAq = null; desenhar(); toast('Exemplo removido.'); break;
      case 'parar-cic':
        if (!confirm('Parar o acompanhamento da ciclagem? As medições continuam no diário.')) return;
        var aq2 = aquario(ui.cicAq); delete aq2.ciclagem; aq2.atualizado = new Date().toISOString(); salvar(); desenhar(); break;
      case 'combo-limpar': ui.combo = { fauna: [], litros: '', plantado: false, camaroes: false }; desenharCombo(); break;
      case 'inst-dispensar': ui.instDispensado = true; salvarUi(); telaAjustes(); break;
      case 'backup': fazerBackup(); break;
      case 'importar': $('arquivoBackup').click(); break;
      case 'lembrete':
        if (ui.lTipo === 'troca') { var al2 = $('lAq') && aquario($('lAq').value); if (al2) agendaTPA(al2); break; }
        var hora = $('lHora').value || '10:00';
        baixar('lembrete-medir-aquario.ics', 'text/calendar', N.ics({ titulo: 'Medir a água do aquário', diaSemana: +$('lDia').value, hora: hora }))
          .then(function (ok) { if (ok) toast('Abra o arquivo para pôr o lembrete na agenda.'); });
        break;
      case 'apagar-tudo':
        if (!confirm('Apagar todos os aquários e medições deste aparelho? Salve uma cópia antes, se quiser guardar.')) return;
        E = N.estadoVazio(); salvar(); ir('aquarios', { aqId: null }); toast('Dados apagados deste aparelho.'); break;
    }
  });
  document.addEventListener('input', function (ev) {
    var id = ev.target.id;
    if (/^f(C|L|A|Sub|Folga|Manual)$/.test(id)) { atualizarLitros(); desenharVeredito(); }
    if (id === 'fBusca') mostrarSug();
    if (/^n(C|L|A|Sub|Folga|Manual)$/.test(id)) atualizarNovo();
    if (id === 'nNome' && ui.novo) ui.novo.nome = ev.target.value;
    if (id === 'eBusca') { ui.busca = ev.target.value; desenharSugE(); }
    if (id === 'eLitros') { ui.combo.litros = ev.target.value; $('eVeredito').innerHTML = vereditoHTML(selecao(ui.combo.fauna), { litros: N.lerNumero(ui.combo.litros) || 0, plantado: !!ui.combo.plantado, camaroes: !!ui.combo.camaroes }); }
    if (id === 'mVal' && ui.med) { var md = ui.med, k = md.sel[md.etapa], v = N.lerNumero(ev.target.value), p = N.PORID[k]; if (!unidadeKit(k) && v !== null && !isNaN(v) && v >= p.min && v <= p.max) { md.vals[k] = v; posRegua(v); } }
    if (/^fG(d|h|s)$/.test(id)) { atualizarLitros(); desenharVeredito(); }
    if (/^nG(d|h|s)$/.test(id)) atualizarNovo();
    if (id === 'mNota' && ui.med) ui.med.nota = ev.target.value;
  });
  document.addEventListener('keydown', function (ev) {
    if (ev.target.id === 'fBusca' && ev.key === 'Enter') { ev.preventDefault(); var r = R.buscar(D.especies, ev.target.value, 1); if (r.length) { addFauna(ui.form.fauna, r[0].id); ev.target.value = ''; $('fSug').hidden = true; desenharFauna(); } }
    if (ev.target.id === 'nNome' && ev.key === 'Enter') { ev.preventDefault(); novoProx(); }
    if (ev.target.id === 'mVal' && ev.key === 'Enter') { ev.preventDefault(); if (lerDigitado()) { ui.med.digitando = false; desenhar(); } }
  });
  document.addEventListener('change', function (ev) {
    if (ev.target.dataset && ev.target.dataset.unid) { E.meta.unidades = E.meta.unidades || {}; E.meta.unidades[ev.target.dataset.unid] = ev.target.value; salvar(); toast('Unidade salva.'); }
    if (ev.target.id === 'nInicio' && ui.novo) { var v = ev.target.value || N.hojeISO(); ui.novo.inicio = v > N.hojeISO() ? N.hojeISO() : v; telaNovo(); }
    if (ev.target.id === 'arquivoBackup' && ev.target.files[0]) { importar(ev.target.files[0]); ev.target.value = ''; }
  });
  window.addEventListener('scroll', rolou, { passive: true });

  /* ---------- início ---------- */
  if (!D || !D.especies) { tela.innerHTML = '<h1 class="let m">Dados não encontrados</h1><p class="sub">Rode montar.ps1.</p>'; return; }
  D.especies.forEach(function (e) { POR_ID[e.id] = e; });
  if (R.aplicarIdsAntigos) R.aplicarIdsAntigos(D.especies, P);
  carregar();
  if (!aquario(ui.aqId)) ui.aqId = null;
  desenhar();
  if (persist.suportado) navigator.storage.persisted().then(function (ja) { if (ja) persist.concedido = true; else if (E.aquarios.length) pedirPersistente(); }).catch(function () {});
  if (!window.PARAGON_PREVIEW && 'serviceWorker' in navigator && location.protocol.indexOf('http') === 0) navigator.serviceWorker.register('sw.js').catch(function () {});
})();
