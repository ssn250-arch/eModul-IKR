# eModul-IKR — Mobile UI v2.2 + Motherboard Explorer (20 Oktober 2026)

## Apa yang dibetulkan (IKR3013 DAN IKR3023)

- **BM/EN tidak lagi terapung di bahagian atas modul pada skrin kecil**. Punca sebenar ialah gabungan kelas CSS `hidden` dengan `inline-flex` yang bercanggah dalam `LanguageSwitcher`. Sekarang switcher desktop benar-benar disembunyikan di bawah lebar 640px (`sm`), tetapi masih boleh digunakan pada desktop.
- Butang terapung mobile dinamakan **Alat Belajar** (English: **Study Tools**), dengan indikator bahasa aktif kecil `BM` atau `EN`. Menu mengandungi Simpan Offline, Pilihan Bahasa, dan Smart Tutor (untuk modul).
- Saiz butang, warna navy-biru dan bayang diseragamkan, `safe-area-inset-bottom` dan logik sembunyi sewaktu scroll dikekalkan.
- Pilihan bahasa masih disimpan menggunakan kekunci asal `emodul_ikr_language_v1`. Pemilihan bahasa di portal dan kedua-dua modul kekal disegerakkan.

## Motherboard Explorer dalam kad Papan Induk IKR3013

- Kekal **tepat selepas tajuk/penerangan Direktori Port & Slot Utama**; nota direktori asal tidak dibuang.
- Butang **Lihat Model 3D** membawa pelajar ke dua model Sketchfab AMD/Intel sedia ada di bawah dalam kad itu; model tambahan tidak dipasang. Model 3D memerlukan internet.
- Hotspot menggunakan kawasan sentuhan lebih besar (visual titik kekal ringkas), kategori sedia ada dikekalkan.
- 17 komponen, 6 Rear I/O, 6 soalan kuiz visual dan infografik asal dikekalkan.
- Kemajuan Explorer disimpan di peranti menerusi `localStorage` mengikut **nombor pelajar 1–30**, dan disertakan dalam fail sandaran/pulih kemajuan offline. Ini **bukan rekod Google Sheets** dan tidak disegerakkan antara peranti.
- Fungsi Reset Progress bagi IKR3013 turut memadam kemajuan Explorer untuk nombor pelajar semasa.

## Cara memasang pada laman GitHub Pages sedia ada

1. Simpan sandaran kod eModul-IKR semasa terlebih dahulu.
2. Pilih **satu** pakej sumber yang benar-benar sepadan dengan laman semasa:
   - `eModulIKR_v2_2_OFFLINE_MOBILE.zip`: versi Offline Learning standard.
   - `eModulIKR_v2_2_ADMIN_V3_MOBILE.zip`: versi Admin Content Studio v3 (jika laman mempunyai sistem admin).
3. Ekstrak pakej, buka direktori yang ada `package.json` dalam VS Code.
4. Pasang dan uji:
   ```bash
   npm ci
   npm run check:structure
   npm run test:offline
   npm run test:quiz
   npm run test:chat
   npm run test:i18n
   npm run test:cards
   npm run test:motherboard
   npm run build
   ```
5. Untuk repo GitHub Pages asal `ssn250-arch/eModul-IKR`, guna `npm run deploy` (memerlukan akses ke GitHub dan konfigurasi `gh-pages` yang sedia ada).
6. Di iPhone Safari, reload laman selepas deploy; jika servis PWA mengekalkan versi lama, tutup tab dan buka semula atau clear website data **selepas menyandarkan kemajuan setempat**.

**Jangan upload ZIP sumber terus sebagai laman GitHub Pages**: sumber JSX perlu dibina menggunakan Vite dahulu. Jangan mencampurkan kedua-dua versi ZIP.

## Semakan penerbitan

- IKR3013 > buka modul > **tiada BM/EN di penjuru atas** pada lebar iPhone; ketik `Alat Belajar` > pilih BM dan EN > teks berubah.
- IKR3023 > ulang pemeriksaan sama.
- Semasa scroll ke bawah, butang `Alat Belajar` bersembunyi; scroll ke atas akan menunjukkan semula.
- IKR3013 > Papan Induk > Direktori Port & Slot Utama > Explorer > pilih hotspot > refresh > kemajuan tidak hilang pada peranti yang sama.
- Pilih **Lihat Model 3D** > skrol ke panel model AMD & Intel sedia ada.
- Jalankan Kuiz Visual dan kuiz penguasaan asal; semak tetap berjalan.

## Status pengujian sebenar

LULUS dalam persekitaran pembangunan: semakan struktur, 480 set kuiz, enjin tutor, penterjemahan BM/EN, offline service worker, integriti JSX, 17+6 titik dan pautan model 3D. **Ujian binaan penuh Vite dan interaksi pada Safari iPhone sebenar belum dapat disahkan di sini** kerana pakej npm tidak tersedia secara lokal. Uji di komputer bro sebelum deploy kepada pelajar.
