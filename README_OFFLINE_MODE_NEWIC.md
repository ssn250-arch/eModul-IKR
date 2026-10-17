# eModul-IKR — Offline Learning Mode (NeWIC 2026)

## Tujuan

Versi ini dibangunkan daripada projek lengkap dwibahasa BM/EN eModul-IKR. Ia **mengekalkan** antaramuka portal, peta KP, dua modul IKR3013 + IKR3023, 16 topik, 30 nombor pelajar, 480 set kuiz, kemajuan topik, Smart Knowledge Tutor tanpa API key, visual/video yang wujud, pautan PC Nexus/CableLabX, logo, favicon, serta preview WhatsApp.

**Yang ditambah, bukan menggantikan fungsi sedia ada:**

1. `scripts/generate-sw.mjs` — cache versi-bina untuk `index.html`, semua fail JS/CSS keluaran Vite termasuk **kedua-dua modul lazy-load**, serta aset yang disimpan dalam `public`. Service worker menyimpan aset laman ini sahaja, bukan data dari domain luar. Cache versi lama dibersihkan selepas versi baharu diaktifkan.
2. `src/OfflineLearning.jsx` — lencana kecil bawah-kiri dengan status *Simpan Offline / Sedia Offline / Mod Offline*, butang **Sediakan Kandungan Offline** dan kiraan fail yang sudah disimpan.
3. `src/OfflineEmbed.jsx` — paparan alternatif yang kemas apabila YouTube atau Sketchfab tidak boleh dimuatkan tanpa sambungan internet. Semasa online, iframe asal kekal digunakan.
4. `src/offlineSupport.js` — komunikasi dengan service worker; buka pautan latihan luar hanya ketika online; export/import kemajuan pembelajaran sebagai fail JSON pada peranti.
5. Skrip ujian `scripts/test-offline.mjs`.

## Keperluan penerbitan

- **Laman kini ditetapkan untuk GitHub Pages `https://ssn250-arch.github.io/eModul-IKR/`.** Pastikan repo dan kapitalisasi `eModul-IKR` tepat. Jika guna Netlify pada laluan akar `/`, perlu tukar `base` Vite, laluan `base` service worker dan manifest secara konsisten dahulu.
- PWA memerlukan HTTPS (GitHub Pages menyediakan HTTPS).
- Jangan hanya upload fail sumber `.jsx` ke GitHub Pages tanpa build; GitHub Pages menghidangkan fail `dist`.
- Jangan buang atau rename `public/logo.png` dan `public/manifest.webmanifest`.

## Cara deploy (Windows / VS Code)

1. Extract ZIP projek ini.
2. Buka folder projek dalam VS Code Terminal. Pastikan Node.js dipasang.
3. Jalankan:
   ```bash
   npm ci
   npm run check:structure
   npm run test:offline
   npm run test:quiz
   npm run test:chat
   npm run test:i18n
   npm run test:cards
   npm run build
   ```
4. Selepas `npm run build`, pastikan wujud **`dist/sw.js`**. Ini automatik dijana oleh `postbuild`.
5. Untuk menerbitkan ke GitHub Pages mengikut konfigurasi asal:
   ```bash
   npm run deploy
   ```
   Pastikan PC bro ada kebenaran push ke repository yang sama. Jika deployment disediakan melalui GitHub Actions, gunakan workflow repo dan pastikan folder `dist` diterbitkan.
6. Refresh halaman dengan internet aktif dan buka panel kecil *Simpan Offline* > **Sediakan Kandungan Offline**. Tunggu status **Sedia Offline**.
7. Untuk ujian, matikan Wi-Fi/data, tutup semua tab eModul-IKR kemudian buka semula laman PWA. Semak portal > IKR3013 > nota > kuiz > Smart Tutor > portal > IKR3023. Gunakan akaun/nombor pelajar ujian sahaja.
8. Gunakan **Sandar Kemajuan** untuk menyimpan JSON dan **Pulihkan Kemajuan** jika perlu pindah peranti. Sandaran tidak dihantar ke server.

## Jadual sokongan offline

| Kandungan | Offline |
|---|---|
| Portal, peta KP, modul 3013/3023, nota HTML | Ya, selepas cache siap |
| Kuiz 5 soalan/topik, sistem unlock & kemajuan | Ya, secara setempat |
| Smart Knowledge Tutor berasaskan nota dalam kod | Ya (bukan carian AI internet) |
| Paparan BM/EN | Ya |
| Aset logo dan imej setempat | Ya |
| Model 3D Sketchfab dan YouTube | **Tidak**, paparan gantian dijelaskan |
| PDF Google Drive dan imej dari Unsplash | **Tidak**, kecuali pelayar atau pengguna menyimpannya secara berasingan |
| PC Nexus/CableLabX / carian Google | **Tidak dijamin**, aplikasi luar bergantung pada internet / PWA mereka |

## Batasan penting

- Data kemajuan disimpan dalam **localStorage** pada setiap pelayar/peranti. Cache PWA berbeza daripada localStorage; memadam data laman akan memadam kedua-duanya. Pemindahan peranti perlukan sandaran JSON; **tiada dashboard pemantauan berpusat**.
- Browser menganggap `navigator.onLine` sebagai petunjuk, bukan pengesahan capaian internet yang mutlak (Wi-Fi tanpa internet masih boleh ditunjukkan sebagai online).
- `Sedia Offline` bermaksud fail aplikasi sendiri telah dicache. Ia **bukan** jaminan semua sumber luaran berfungsi offline.
- Pengguna perlu memuatkan projek dengan internet sekurang-kurangnya sekali dan menunggu semua fail cache selesai.
- Kandungan daripada sumber Google Drive/Sketchfab/YouTube sengaja **tidak disalin** tanpa lesen/kebenaran.

## Pengesahan di persekitaran penyedia

Dijalankan dan LULUS: `npm run check:structure`, `npm run test:offline` (termasuk ujian *service worker* dummy build), `npm run test:quiz` (480 set), `npm run test:chat`, `npm run test:i18n`, `npm run test:cards`, dan semakan sintaks JSX menggunakan TypeScript tanpa emit.

**Belum disahkan dalam persekitaran penyedia**: `npm run build` sebenar kerana npm dependency install tidak lengkap (`npm ci --offline` mengembalikan ENOTCACHED untuk pakej zod-validation-error). Jalan `npm ci && npm run build` pada PC yang ada capaian npm, kemudian uji offline dalam Chrome selepas publish. Jangan dakwa telah diuji live GitHub Pages sebelum ujian di peranti sebenar.
