import assert from 'node:assert/strict';
import { translateVisibleText, getCoverageKeys } from '../src/translations.js';
// This test checks the authored translations of representative content in each card.
// The full UI/browser behaviour must still be inspected after Vite deployment.
const pairs = [
  ['Berfungsi sebagai \'otak\' komputer.', 'Acts as the computer\'s brain.'],
  ['Tulang belakang yang menghubungkan dan menyatukan seluruh sistem komputer.','The motherboard connects the computer\'s components into one working system.'],
  ['Membolehkan data dicapai pada kelajuan jauh lebih tinggi berbanding storan kekal (HDD/SSD).','Offers much faster data access than permanent storage such as an HDD or SSD.'],
  ['Storan berfungsi menyimpan data, sistem operasi, dan aplikasi secara kekal di dalam komputer moden anda.','Storage keeps data, the operating system and applications even when the computer is switched off.'],
  ['Sistem Penyejukan & Haba','Cooling and Heat'],
  ['Sistem Operasi (OS)','Operating System (OS)'],
  ['Klasifikasi Input & Output','Input and Output Classification'],
  ['Pemilihan topologi mempengaruhi kebolehpercayaan, kelajuan dan kos pengurusan rangkaian.','Topology affects network reliability, speed and maintenance cost.'],
  ['Pelan Susun Atur (Plan Layout): Reka bentuk penempatan peranti dan laluan kabel untuk memudahkan pengurusan.','Layout plan: shows where devices and cable routes will be placed for easier management.'],
  ['Penyambung Fiber','Optical Fibre Connectors'],
  ['Kelajuan Ethernet','Ethernet Speeds'],
  ['Kupas Jaket Kabel','Strip the Cable Jacket'],
  ['Soket \'betina\' (Keystone Jack) yang menerima sambungan Patch Cord RJ45 dari komputer pekerja.','A female network socket (keystone jack) that accepts an RJ45 patch cord from a computer.'],
  ['Bawah: UPS & Bateri','Bottom: UPS and Batteries'],
  ['Tanam & Potong','Punch Down and Trim'],
  ['Susun Kod Warna','Arrange Wires by Colour Code'],
  ['Amaran Penting:','Important Warning:'],
  ['Kebersihan:','Cleanliness:'],
  ['Pilihan Bahasa','Choose Language'],
];
for(const [ms,en] of pairs) assert.equal(translateVisibleText(ms),en,`Translation mismatch: ${ms}`);
assert.equal(translateVisibleText('CPU'),'CPU');
assert.equal(translateVisibleText('T568B'),'T568B');
assert.ok(getCoverageKeys().length > 1000,'Expected a broad card and UI translation dictionary');
console.log(`PASS: ${pairs.length} detailed lesson translations; ${getCoverageKeys().length} dictionary entries; original technical identifiers unchanged.`);
