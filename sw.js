/* Cache offline do Assistente do Aquarista. Só guarda os próprios arquivos; não envia nada a lugar nenhum.
   Os dados do usuário NÃO ficam aqui (ficam no localStorage). A VERSAO é trocada por montar.ps1. */
const VERSAO = 'assistente-202610281905';
const ARQUIVOS = ['./', 'index.html', 'assistente.css', 'app.js', 'nucleo.js', 'manifest.json',
  'comum/regras.js', 'comum/dados/especies.js', 'comum/dados/parametros.js', 'comum/dados/agua.js', 'comum/dados/imagens.js',
  'comum/fontes/fonts.css', 'comum/fontes/dmserif.woff2', 'comum/fontes/dmmono400.woff2', 'comum/fontes/dmmono500.woff2', 'comum/fontes/source.woff2',
  'comum/img/selo-paragon.webp', 'comum/img/icone-192.png', 'comum/img/icone-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSAO).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.indexOf('assistente-') === 0 && k !== VERSAO).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  // Imagens das espécies: carregamento preguiçoso, guardadas no cache na 1ª vez que aparecem (offline depois disso).
  const img = e.request.url.indexOf('/comum/img/especies/') > 0;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request).then(resp => {
    if (img && resp.ok) { const c = resp.clone(); caches.open(VERSAO).then(k => k.put(e.request, c)); }
    return resp;
  })));
});
