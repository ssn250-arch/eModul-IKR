import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const jsx = fs.readFileSync(path.join(root, 'src/IKR3023.jsx'), 'utf8');
const cable = fs.readFileSync(path.join(root, 'src/IKR3023CableLab.jsx'), 'utf8');
for (const basename of ['faceplate.webp', 'keystone-jack.webp', 'floor-cable-cover.webp']) {
  assert.ok(fs.existsSync(path.join(root, 'src/assets/safety-photos', basename)), `Foto tidak dijumpai: ${basename}`);
  assert.ok(jsx.includes(`./assets/safety-photos/${basename}`), `Import foto hilang: ${basename}`);
}
for (const text of [
  '<IKR3023CableLab />',
  '<TwistedPairCableDiagram shielded />',
  '<TwistedPairCableDiagram />',
  'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
  'object-contain',
  'Besarkan Foto',
  'Kabel horizontal ditamatkan',
  'bukan conduit',
]) {
  assert.ok(jsx.toLowerCase().includes(text.toLowerCase()), `Bukti kemas kini hilang: ${text}`);
}
for (const text of ['T568A', 'T568B', 'PINOUTS', 'overflow-x-auto', 'isStraight = endA === endB', 'Auto-MDI/MDIX', 'aria-pressed']) {
  assert.ok(cable.includes(text), `Mini lab tiada: ${text}`);
}
assert.ok(!/localStorage|sessionStorage|fetch\(/.test(cable), 'Mini lab tidak sepatutnya mengubah storan atau membuat panggilan rangkaian');
const m = cable.match(/export const PINOUTS = Object.freeze\((\{[\s\S]*?\})\);/);
assert.ok(m, 'Data susunan pin tidak dapat ditemui');
const pins = Function(`return (${m[1]});`)();
assert.deepEqual(pins.T568A.map(x=>x[0]), ['Putih/Hijau','Hijau','Putih/Oren','Biru','Putih/Biru','Oren','Putih/Coklat','Coklat']);
assert.deepEqual(pins.T568B.map(x=>x[0]), ['Putih/Oren','Oren','Putih/Hijau','Biru','Putih/Biru','Hijau','Putih/Coklat','Coklat']);
assert.equal(pins.T568A.length, 8);
assert.equal(pins.T568B.length, 8);
console.log('PASS IKR3023 v3.5: 3 foto asal, galeri responsif, rajah lapan konduktor, T568A/B, mini lab tanpa storan.');
