/**
 * eModul-IKR Offline Learning - build-time service worker.
 * Same-origin code, styles, locally shipped images and both lazy module chunks
 * are precached. External YouTube, Sketchfab, Google Drive and linked apps
 * remain online-only (no attempt to cache third-party material).
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const dist = path.resolve('dist');
if (!fs.existsSync(path.join(dist, 'index.html'))) {
  throw new Error('dist/index.html tiada — jalankan npm run build dahulu.');
}
const base = '/eModul-IKR/'; // Match vite.config.js and GitHub Pages repository scope.
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}
const files = walk(dist)
  .filter(file => !file.endsWith('.map') && !file.endsWith('/sw.js') && !file.endsWith('\\sw.js'))
  .map(file => base + path.relative(dist, file).split(path.sep).join('/'))
  .sort();
const hash = crypto.createHash('sha256');
for (const url of files) {
  hash.update(url);
  hash.update(crypto.createHash('sha256').update(fs.readFileSync(path.join(dist, url.slice(base.length)))).digest('hex'));
}
const version = hash.digest('hex').slice(0, 12);

const serviceWorker = `/* eModul-IKR: Offline Learning Mode (generated; do not edit dist/sw.js). */
const CACHE_PREFIX = 'emodul-ikr-offline-v2-';
const CACHE_NAME = CACHE_PREFIX + ${JSON.stringify(version)};
const LEGACY_PREFIX = 'emodul-ikr-newic-';
const BASE = ${JSON.stringify(base)};
const SHELL = BASE + 'index.html';
const FILES = ${JSON.stringify(files)};

function isLocalGet(req) {
  const url = new URL(req.url);
  return req.method === 'GET' && url.origin === self.location.origin && url.pathname.startsWith(BASE);
}

async function cacheFiles() {
  const cache = await caches.open(CACHE_NAME);
  // Install all static chunks, including lazy IKR3013/IKR3023, before reporting ready.
  // addAll rejects on failed / non-2xx responses, so incomplete caching isn't marked ready.
  await cache.addAll(FILES);
  return { ready: true, cached: FILES.length, total: FILES.length, version: ${JSON.stringify(version)} };
}

async function cacheInfo() {
  const cache = await caches.open(CACHE_NAME);
  const keys = new Set((await cache.keys()).map(req => new URL(req.url).pathname));
  const cached = FILES.filter(url => keys.has(url)).length;
  return { ready: cached === FILES.length, cached, total: FILES.length, version: ${JSON.stringify(version)} };
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
`;
fs.writeFileSync(path.join(dist, 'sw.js'), serviceWorker, 'utf8');
console.log(`Offline SW generated: ${files.length} assets; cache ${version}; includes all production JS chunks.`);
