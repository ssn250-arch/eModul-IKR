/* eModul-IKR: Offline Learning Mode (generated; do not edit dist/sw.js). */
const CACHE_PREFIX = 'emodul-ikr-offline-v2-';
const CACHE_NAME = CACHE_PREFIX + "2beeb4f46180";
const LEGACY_PREFIX = 'emodul-ikr-newic-';
const BASE = "/eModul-IKR/";
const SHELL = BASE + 'index.html';
const FILES = ["/eModul-IKR/apple-touch-icon.png","/eModul-IKR/assets/IKR3013-D6Cwjyva.css","/eModul-IKR/assets/IKR3013-OcPy91h_.js","/eModul-IKR/assets/IKR3023-CF9OudEa.js","/eModul-IKR/assets/TopicUnlockQuiz-AAEvbkLK.js","/eModul-IKR/assets/index-0pRyKCUJ.css","/eModul-IKR/assets/index-B_Lex3_Z.js","/eModul-IKR/assets/logo-emodul-mark-D-nq9BFg.png","/eModul-IKR/assets/offlineSupport-DQtaLyOT.js","/eModul-IKR/favicon.svg","/eModul-IKR/icons.svg","/eModul-IKR/icons/icon-192.png","/eModul-IKR/icons/icon-512.png","/eModul-IKR/icons/maskable-192.png","/eModul-IKR/icons/maskable-512.png","/eModul-IKR/index.html","/eModul-IKR/logo-1.png","/eModul-IKR/logo.png","/eModul-IKR/manifest.json","/eModul-IKR/manifest.webmanifest","/eModul-IKR/motherboard-explorer/infografik-motherboard-asal.webp","/eModul-IKR/motherboard-explorer/motherboard-board.webp","/eModul-IKR/motherboard-explorer/motherboard-rear-io.webp","/eModul-IKR/og-preview.png"];

function isLocalGet(req) {
  const url = new URL(req.url);
  return req.method === 'GET' && url.origin === self.location.origin && url.pathname.startsWith(BASE);
}

async function cacheFiles() {
  const cache = await caches.open(CACHE_NAME);
  // Install all static chunks, including lazy IKR3013/IKR3023, before reporting ready.
  // addAll rejects on failed / non-2xx responses, so incomplete caching isn't marked ready.
  await cache.addAll(FILES);
  return { ready: true, cached: FILES.length, total: FILES.length, version: "2beeb4f46180" };
}

async function cacheInfo() {
  const cache = await caches.open(CACHE_NAME);
  const keys = new Set((await cache.keys()).map(req => new URL(req.url).pathname));
  const cached = FILES.filter(url => keys.has(url)).length;
  return { ready: cached === FILES.length, cached, total: FILES.length, version: "2beeb4f46180" };
}

self.addEventListener('install', event => {
  event.waitUntil(cacheFiles().then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const all = await caches.keys();
    await Promise.all(all.filter(name =>
      (name.startsWith(CACHE_PREFIX) || name.startsWith(LEGACY_PREFIX)) && name !== CACHE_NAME
    ).map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  const type = event.data?.type;
  if (type !== 'OFFLINE_STATUS' && type !== 'OFFLINE_PREPARE') return;
  const task = (async () => {
    try {
      return type === 'OFFLINE_PREPARE' ? await cacheFiles() : await cacheInfo();
    } catch (err) {
      const info = await cacheInfo().catch(() => ({ ready: false, cached: 0, total: FILES.length }));
      return { ...info, error: String(err?.message || err) };
    }
  })();
  event.waitUntil(task);
  if (event.ports?.[0]) task.then(result => event.ports[0].postMessage(result));
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (!isLocalGet(request)) return; // External content MUST remain online-only.
  const url = new URL(request.url);
  const isNavigation = request.mode === 'navigate';
  if (isNavigation) {
    event.respondWith((async () => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 4500);
        try {
          const response = await fetch(request, { signal: controller.signal });
          if (response.ok) return response;
          // Avoid caching 404 / GitHub Pages error HTML over our offline shell.
          if (response.status !== 404 && response.status !== 503) return response;
        } finally { clearTimeout(timeout); }
      } catch { /* offline, unstable network, or timeout */ }
      return (await caches.match(SHELL)) || Response.error();
    })());
    return;
  }
  // Versioned Vite JS/CSS chunks and local assets: cache-first, network fallback.
  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response.ok && response.type === 'basic' && url.pathname.startsWith(BASE)) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      }
      return response;
    } catch {
      return Response.error();
    }
  })());
});
