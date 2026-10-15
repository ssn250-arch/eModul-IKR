import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const dist = path.resolve('dist');
const base = '/eModul-IKR/';
if (!fs.existsSync(path.join(dist,'index.html'))) throw new Error('dist/index.html tiada — jalankan Vite build dahulu.');
function gather(dir) {
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(ent => {
    const fp = path.join(dir,ent.name);
    if (ent.isDirectory()) return gather(fp);
    return [fp];
  });
}
const assets = gather(dist)
 .filter(fp => !fp.endsWith('.map') && !fp.endsWith('sw.js'))
 .map(fp => base + path.relative(dist, fp).split(path.sep).join('/'));
const version = crypto.createHash('sha256').update(assets.map(p=>p+':'+fs.statSync(path.join(dist,p.slice(base.length))).size).join('|')).digest('hex').slice(0,10);
const serviceWorker = `// eModul-IKR GitHub Pages PWA (same-origin assets only)
const CACHE = 'emodul-ikr-newic-${version}';
const SCOPE = ${JSON.stringify(base)};
const APP = ${JSON.stringify(base)};
const FILES = ${JSON.stringify(assets)};
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
`;
fs.writeFileSync(path.join(dist,'sw.js'),serviceWorker);
console.log(`SW generated: ${assets.length} cached project files; version ${version}`);
