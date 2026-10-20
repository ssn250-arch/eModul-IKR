import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
let ts = null;
try { ts = await import('typescript'); } catch {
  try { ts = await import('/opt/nvm/versions/node/v22.16.0/lib/node_modules/typescript/lib/typescript.js'); } catch { /* npm run build will validate JSX after dependencies are installed */ }
}
const base=path.resolve(process.cwd());
const app=fs.readFileSync(path.join(base,'src','IKR3013.jsx'),'utf8');
const component=fs.readFileSync(path.join(base,'src','MotherboardExplorer.jsx'),'utf8');
const css=fs.readFileSync(path.join(base,'src','MotherboardExplorer.css'),'utf8');
assert.match(app,/import MotherboardExplorer from '\.\/MotherboardExplorer';/);
assert.match(app,/activeTopic\.id === 'motherboard' && \(/);
const directoryHeading = app.indexOf('Direktori Port & Slot Utama');
const explorerPlacement = app.search(/<MotherboardExplorer\b[^>]*\/>/);
const directoryList = app.indexOf('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5',directoryHeading);
assert.ok(directoryHeading > 0 && explorerPlacement > directoryHeading && directoryList > explorerPlacement,'Explorer should appear after directory heading/description, before existing directory cards');
assert.equal((app.match(/<MotherboardExplorer\b[^>]*\/>/g)||[]).length,1,'Explorer must appear exactly once in the motherboard card');
for(const file of ['IKR3013.jsx','MotherboardExplorer.jsx']){
  const source=fs.readFileSync(path.join(base,'src',file),'utf8');
  if(ts){const parsed=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.JSX);assert.equal(parsed.parseDiagnostics.length,0,`JSX syntax invalid in ${file}`);}
}
const board=component.split('export const MOTHERBOARD_PARTS = [')[1]?.split('export const REAR_IO_PORTS = [')[0]||'';
const io=component.split('export const REAR_IO_PORTS = [')[1]?.split('const QUESTIONS = [')[0]||'';
const quiz=component.split('const QUESTIONS = [')[1]?.split('function normalizeStatus')[0]||'';
assert.equal((board.match(/\{id:/g)||[]).length,17);
assert.equal((io.match(/\{id:/g)||[]).length,6);
assert.equal((quiz.match(/\{tab:/g)||[]).length,6);
for(const [label,section,n] of [['Motherboard',board,17],['Rear I/O',io,6]]){
 const ids=[...section.matchAll(/\{id:(\d+),/g)].map(m=>+m[1]);
 assert.deepEqual(ids,Array.from({length:n},(_,i)=>i+1),`${label} hotspot IDs`);
 const coords=[...section.matchAll(/x:([\d.]+),\s*y:([\d.]+),/g)].map(m=>[+m[1],+m[2]]);
 assert.equal(coords.length,n);
 assert.ok(coords.every(([x,y])=>x>=0&&x<=100&&y>=0&&y<=100),`${label} invalid hotspot positions`);
}
assert.match(css,/@media \(max-width:640px\)/);
assert.match(component,/useLanguage/);
assert.match(component,/infografik-motherboard-asal.webp/);
assert.match(component,/motherboard-rear-io.webp/);
assert.match(component,/data-no-translate/);
for(const file of ['motherboard-board.webp','motherboard-rear-io.webp','infografik-motherboard-asal.webp']) {
 const p=path.join(base,'public','motherboard-explorer',file);
 assert.ok(fs.existsSync(p)&&fs.statSync(p).size>10000,`${file} missing`);
}
console.log('PASS: Motherboard Explorer in IKR3013 — 17 hotspots, 6 I/O ports, 6 visual questions, JSX valid, offline images and mobile CSS.');

assert.match(component, /readProgress\(studentNumber\)/, 'Per-student offline explorer progress');
assert.match(component, /motherboard-3d-models/, 'Bridge to existing 3D models');
assert.match(app, /id="motherboard-3d-models"/, '3D model section target');
assert.match(app, /studentNumber=\{studentNumber\}/, 'Explorer student number prop');
const portal=fs.readFileSync(path.join(base,'src','PortalIKR.jsx'),'utf8');
const dock=fs.readFileSync(path.join(base,'src','MobileStudyDock.jsx'),'utf8');
const lang=fs.readFileSync(path.join(base,'src','LanguageContext.jsx'),'utf8');
assert.equal((portal.match(/className="hidden sm:block"><LanguageSwitcher floating \/>/g)||[]).length,0,'Duplicate floating language controls must be removed from both modules');
assert.match(dock, /Alat Belajar/, 'Compact learning tools label');
assert.match(portal,/MODE JURI · PRATONTON/);
assert.match(portal,/demoNavigate/);
assert.match(app,/demoMode=\{demoMode\}/);
assert.match(component,/if \(demoMode\) return;/);
assert.match(lang, /relative z-10 inline-flex/, 'Do not show desktop floating controls at mobile size');
for(const file of ['PortalIKR.jsx','MobileStudyDock.jsx','LanguageContext.jsx']) {
  if(ts){const parsed=ts.createSourceFile(file,fs.readFileSync(path.join(base,'src',file),'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.JSX);assert.equal(parsed.parseDiagnostics.length,0, `JSX syntax invalid in ${file}`);}
}
console.log('PASS v3.0: unified responsive tool dock, safe demo mode, existing 3D link and progress handling.');
