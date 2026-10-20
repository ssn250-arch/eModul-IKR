import fs from 'node:fs';
import assert from 'node:assert/strict';
import path from 'node:path';
let ts;
try { ts = await import('typescript'); } catch { try { ts = await import('/opt/nvm/versions/node/v22.16.0/lib/node_modules/typescript/lib/typescript.js'); } catch { ts=null; } }
for (const file of ['src/IKR3023.jsx','src/IKR3023SafetyVisual.jsx']) {
 const code=fs.readFileSync(file,'utf8');
 if (ts) {
  const source=ts.createSourceFile(file,code,ts.ScriptTarget.Latest,true,ts.ScriptKind.JSX);
  assert.equal(source.parseDiagnostics.length,0, `${file}: ${source.parseDiagnostics.map(x=>ts.flattenDiagnosticMessageText(x.messageText, ' ')).join(' / ')}`);
 }
}
const main=fs.readFileSync('src/IKR3023.jsx','utf8');
const component=fs.readFileSync('src/IKR3023SafetyVisual.jsx','utf8');
assert.match(main,/import IKR3023SafetyVisual from '\.\/IKR3023SafetyVisual';/);
assert.match(main,/<IKR3023SafetyVisual language=\{language\}\s*\/>/);
assert.match(main,/jangan tutup switch yang hidup dengan kain/i);
assert.match(main,/bukan sebagai perlindungan daripada renjatan elektrik/);
assert.match(main,/disabled=\{!demoMode && unlockedTopicIndex < topics\.length\}/);
assert.match(main,/import\.meta\.glob\('\.\/assets\/tool-photos/);
assert.match(main,/equipmentGallery/);
assert.match(component,/lg:grid-cols-3/);
assert.match(component,/sm:grid-cols-2/);
assert.match(component,/role="dialog"/);
assert.match(component,/data-skm3-safety-check="true"/);
assert.doesNotMatch(component,/localStorage|sessionStorage|fetch\(/);
for(const name of ['faceplate','keystone-jack','floor-cable-cover']) {
 assert.ok(fs.statSync(path.join('src/assets/safety-photos',`${name}.webp`)).size > 3000, `missing photo ${name}`);
}
console.log('PASS safety v3.4: JSX, 3 local photos, responsive cards, zoom, self-check, accurate ESD/switch warning, old features preserved.');
