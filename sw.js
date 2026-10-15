// eModul-IKR GitHub Pages PWA (same-origin assets only)
const CACHE = 'emodul-ikr-newic-7aa21b9995';
const SCOPE = "/eModul-IKR/";
const APP = "/eModul-IKR/";
const FILES = ["/eModul-IKR/assets/IKR3013-CByQ_bz0.js","/eModul-IKR/assets/IKR3023-D2GDZ5KH.js","/eModul-IKR/assets/index-BPUXZTVf.css","/eModul-IKR/assets/index-Ot9Wy5bP.js","/eModul-IKR/assets/jsx-runtime-CgA9nl7Z.js","/eModul-IKR/assets/logo-IWiIGmkl.png","/eModul-IKR/assets/TopicUnlockQuiz-CBQ0IOat.js","/eModul-IKR/favicon.svg","/eModul-IKR/icons/icon-192.png","/eModul-IKR/icons/icon-512.png","/eModul-IKR/icons.svg","/eModul-IKR/index.html","/eModul-IKR/logo-1.png","/eModul-IKR/logo.png","/eModul-IKR/manifest.json","/eModul-IKR/manifest.webmanifest"];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(names => Promise.all(names.filter(name => name.startsWith('emodul-ikr-newic-') && name !== CACHE).map(name => caches.delete(name)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(SCOPE)) return;
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).catch(() => caches.match(APP + 'index.html')));
    return;
  }
  event.respondWith(caches.match(req).then(cached => cached || fetch(req)));
});
