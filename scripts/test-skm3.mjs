import assert from 'node:assert/strict';
import fs from 'node:fs';

const files = ['src/IKR3013.jsx','src/IKR3013IOWorkshop.jsx','src/IKR3023.jsx'];
for (const path of files) {
  const jsx = fs.readFileSync(path,'utf8');
  assert.ok(jsx.length > 1000, `Unexpectedly short source: ${path}`);
}
const io = fs.readFileSync('src/IKR3013IOWorkshop.jsx','utf8');
assert.match(fs.readFileSync('src/IKR3013.jsx','utf8'),/<IKR3013IOWorkshop language=\{language\}/);
assert.match(io,/data-io-workshop="skm3"/);
assert.match(io,/data-io-quiz="classification"/);
assert.match(io,/data-io-quiz="diagnostic"/);
assert.doesNotMatch(io, /localStorage|sessionStorage|fetch\(/);
const tools = fs.readFileSync('src/IKR3023.jsx','utf8');
assert.match(tools,/import\.meta\.glob\('\.\/assets\/tool-photos/);
assert.match(tools,/toolPhotoNames/);
assert.match(tools,/disabled=\{!demoMode && unlockedTopicIndex < topics\.length\}/);
assert.match(tools,/href="https:\/\/cablelab2026\.netlify\.app\/index\.html"/);
assert.match(tools,/href="https:\/\/cablelabx\.netlify\.app\/"/);
assert.match(tools,/rel="noopener noreferrer"/);
assert.match(tools,/showCableLabLinks/);
assert.doesNotMatch(tools, /window\.open\('https:\/\/cablelabx\.netlify\.app/);
console.log('PASS: I/O self-practice, local photo support, CableLabX jury access and direct links.');
