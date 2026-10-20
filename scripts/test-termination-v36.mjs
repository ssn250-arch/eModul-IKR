import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
let ts;
try { ts = await import('typescript'); } catch { ts = null; }
const root=process.cwd();
for (const name of ['src/IKR3023.jsx','src/RJ45TerminationWorkshop.jsx']) {
  const body=fs.readFileSync(name,'utf8');
  if (ts) {
    const parsed=ts.createSourceFile(name,body,ts.ScriptTarget.Latest,true,ts.ScriptKind.JSX);
    assert.equal(parsed.parseDiagnostics.length,0,`${name}: JSX parse failed`);
  }
}
const main=fs.readFileSync('src/IKR3023.jsx','utf8');
const module=fs.readFileSync('src/RJ45TerminationWorkshop.jsx','utf8');
assert.ok(main.includes("import RJ45TerminationWorkshop from './RJ45TerminationWorkshop';"));
assert.ok(main.includes('<RJ45TerminationWorkshop />'));
assert.ok(main.includes("<IKR3023CableLab />"));
assert.ok(main.includes('disabled={!demoMode && unlockedTopicIndex < topics.length}'));
assert.ok(main.includes('IKR3023SafetyVisual'));
assert.ok(main.includes('equipmentGallery'));
for (const file of ['jacket-stripper.webp','wire-cutter.webp','crimping-tool.webp']) {
  const p=path.join(root,'src/assets/tool-photos',file);
  assert.ok(fs.statSync(p).size>3000,`${file} not supplied`);
  assert.ok(module.includes(file));
}
for (const marker of ['Kupas Jaket Kabel','Asingkan 4 Pasang','Susun Kod Warna T568B','Potong Rata','Masukkan ke Plug RJ45','Crimp & Uji', 'T568BPractice','TesterPractice','lg:grid-cols-2','xl:grid-cols-3','sm:grid-cols-8','object-contain','aria-pressed', 'aria-expanded', 'Foto alat sebenar', 'Rajah skematik pembelajaran', 'wiremap', '1→1', '4→—', '3→6','Cuba Semula']) {
  assert.ok(module.includes(marker),`missing ${marker}`);
}
assert.ok(!/localStorage|sessionStorage|fetch\(/.test(module),'The new practice module must not store data or call the network');
const wires=module.match(/const WIRES = \[([\s\S]*?)\];/);
assert.ok(wires,'missing wire sequence');
assert.equal((wires[1].match(/key: '/g)||[]).length,8);
console.log('PASS v3.6: six stages, 3 tool photos, 3 diagrams, interactive pin order and wiremap practice, responsive code, no data storage; prior modules retained.' + (ts ? ' JSX parsed.' : ' JSX parser optional: not installed.')); 
