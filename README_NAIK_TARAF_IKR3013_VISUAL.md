# eModul-IKR v3.0 Premium — Naik Taraf IKR3013 (SKM Tahap 3)
Tarikh: 20 Oktober 2026

## Apa yang berubah
Dua kad berikut dalam IKR3013 diubah kepada panduan amali visual interaktif:

### 1. Prosedur Pemeriksaan
- Langkah 1: Keselamatan dan ESD — rajah setempat serta SOP yang lebih selamat.
- Langkah 2: Pemeriksaan visual — rajah kapasitor normal/kembung/bocor; pelajar boleh memilih keadaan untuk membaca diagnosis awal.
- Langkah 3: Kipas, haba dan penyelenggaraan — perbandingan sebelum/selepas habuk, petunjuk servis yang sesuai.
- Langkah 4: Aliran kerja — asingkan kuasa, pemeriksaan, ujian selamat, tindakan, rekod.

### 2. Panduan Pemilihan
- Langkah 1: CPU dan motherboard — **foto motherboard asal projek** beserta butang zoom dan semakan senarai CPU/BIOS.
- Langkah 2: DDR4 / DDR5 — rajah perbandingan takuk dan pengesahan sokongan slot.
- Langkah 3: PSU — contoh pengiraan 420 × 1.25 = 525 W dan semakan kualiti/kabel.
- Langkah 4: Casing — perbandingan ATX, Micro-ATX dan Mini-ITX.

Tiap-tiap langkah ada objektif, langkah kerja ringkas, amaran, satu soalan situasi, sebab jawapan serta pilihan cuba semula. Ada rumusan kendiri.

## Visual dan akses offline
- 7 rajah SVG berbentuk komponen React; tajam pada semua resolusi, tidak perlu sambungan internet.
- 1 foto motherboard tempatan: `public/motherboard-explorer/motherboard-board.webp` yang sudah ada dalam projek.
- **Rajah ialah ilustrasi pengajaran**, bukan foto atau lukisan berskala tepat.
- Tiada gambar hotlink atau API tambahan. Tidak ubah cache service worker secara manual; penghasilan semula selepas build seperti skrip projek asal.

## Fail diubah/ditambah
- DIUBAH `src/IKR3013.jsx` — gantikan kandungan kad sahaja melalui import komponen baharu.
- BARU `src/IKR3013WorkshopGuides.jsx` — 8 visual, penerangan, interaksi dan soalan.
- BARU `scripts/test-workshop-guides.mjs` — ujian regresi khusus.
- DIUBAH `package.json` — tambah arahan `npm run test:workshop`.
- BARU dokumen ini.

Tidak mengubah `IKR3023.jsx`, Mod Juri, markah kuiz utama, tahap kemajuan atau sistem Admin Studio. Pembetulan ikon Eye daripada pakej FIXED asal dikekalkan.

## Cara guna
1. Buat salinan sandaran projek yang sedang digunakan.
2. Pilih **satu varian** sahaja: `OFFLINE_LEARNING` ATAU `ADMIN_STUDIO_V3`.
3. Ekstrak ZIP varian itu sebagai folder projek — jangan gabungkan kedua-duanya.
4. Jika hanya mahu pindahkan pembetulan kepada projek sedia ada, salin `src/IKR3013.jsx` dan `src/IKR3013WorkshopGuides.jsx` daripada varian yang sama. Jangan salin IKR3013.jsx merentas versi berbeza.
5. Dalam VS Code, jalankan:

   npm ci
   npm run test:workshop
   npm run test:v3
   npm run build
   npm run deploy

6. Uji `IKR3013 > Prosedur Pemeriksaan` (4 langkah, hotspot dan soalan) dan `IKR3013 > Panduan Pemilihan` (4 langkah, zoom foto dan soalan), sekali sebagai pelajar dan sekali dalam Mod Juri.
7. Jika masih keluar aplikasi lama selepas deploy PWA, cuba hard refresh dan kemas kini service worker dalam browser DevTools.

## Status pengujian dalam persekitaran penyediaan
- LULUS: `npm run test:workshop` bagi kedua-dua varian.
- LULUS: `npm run test:v3` bagi kedua-dua varian (termasuk validasi JSX menggunakan TypeScript).
- LULUS: `npm run check:structure` bagi kedua-dua varian.
- LULUS: `npm run test:cards` dan `npm run test:offline` bagi Admin Studio.
- **BELUM DAPAT DIPASTIKAN**: build Vite penuh dan ujian klik di browser sebenar kerana dependency npm tidak tersedia di persekitaran ini. Sila uji sebelum deploy.
