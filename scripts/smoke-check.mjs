// Semakan struktur awal tanpa npm install; bukan pengganti `npm run build`.
import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const files = [
  'index.html', 'package.json','package-lock.json','vite.config.js',
  'src/main.jsx','src/App.jsx','src/PortalIKR.jsx', 'src/IKR3013.jsx',
  'src/IKR3023.jsx','src/CableDiagnostic.jsx','src/index.css','src/logo.png',
  'public/manifest.webmanifest','public/icons/icon-192.png','public/icons/icon-512.png',
  'scripts/generate-sw.mjs'
];
let error = false;
for (const f of files) { if (!fs.existsSync(path.join(root,f))) {console.error('TIADA:', f); error=true;} }
if (error) process.exit(1);
const pkg = JSON.parse(fs.readFileSync('package.json'));
const manifest = JSON.parse(fs.readFileSync('public/manifest.webmanifest'));
const html = fs.readFileSync('index.html','utf8');
const vite = fs.readFileSync('vite.config.js','utf8');
const portal = fs.readFileSync('src/PortalIKR.jsx','utf8');
const checks = [
 ['package build/postbuild', pkg.scripts.build && pkg.scripts.postbuild],
 ['Vite GitHub Pages base', vite.includes("base: '/eModul-IKR/'")],
 ['Manifest in HTML', html.includes('manifest.webmanifest')],
 ['Manifest URL', manifest.start_url === '/eModul-IKR/'],
 ['Canonical URL', html.includes('https://ssn250-arch.github.io/eModul-IKR/')],
 ['Correct JSX import', fs.readFileSync('src/main.jsx','utf8').includes("'./App.jsx'")],
 ['SW relative base', fs.readFileSync('src/main.jsx','utf8').includes('import.meta.env.BASE_URL')],
 ['Peta KP', portal.includes('KP(5/5)') && portal.includes('KP(4/4)')],
 ['Simulasi', portal.includes('CableDiagnostic')],
];
for (const [label,ok] of checks) { console.log(ok?'PASS':'FAIL',label); if(!ok)error=true; }
if (error) process.exit(1);
console.log('Struktur sah — langkah seterusnya: npm ci && npm run build');
