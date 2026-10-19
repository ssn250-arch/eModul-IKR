# eModul-IKR | Interactive Motherboard Explorer (IKR3013)
Tarikh kemas kini: 19 Oktober 2026

## Apa yang berubah

- **Hanya kad `Papan Induk (Motherboard)` dalam modul IKR3013** mendapat komponen baharu di bawah tab **Nota Asas**. Diletak di permulaan seksyen kandungan motherboard, **sebelum infografik fungsi, direktori komponen sedia ada dan model 3D**.
- Explorer menggunakan **foto papan induk dan imej panel I/O daripada infografik yang dibekalkan sendiri**. Imej asal penuh juga boleh dibuka melalui `Infografik Asal`.
- **17 titik hotspot papan induk** + **6 item port I/O** dengan fungsi dan tip amali, pilihan Bahasa Melayu / English, zoom, carian nama komponen, dan kawalan sebelum/seterusnya.
- **Kuiz visual 6 soalan** berasaskan titik yang ditandakan pada gambar. Soalan ini latihan tambahan: tidak menggantikan / mengubah logik kuiz lulus 3/5 asal ataupun markah/kemajuan sedia ada.
- Rekaan navy biru, responsif; imej pada telefon boleh dileret mendatar di dalam Explorer, tanpa mengunci scroll menegak halaman. Imej disimpan dalam `public/motherboard-explorer` untuk disertakan dalam cache PWA selepas build.
- Gambar generik Unsplash sebelum nota motherboard disembunyikan **untuk kad Papan Induk sahaja** supaya tiada visual berulang yang tidak sepadan dengan foto berlabel.
- Semua fungsi Mobile Premium (`Alat`, BM/EN, Smart Tutor, offline), 16 topik, 30 varian kuiz asal dikekalkan.

## Pilih projek yang sepadan

1. `01_eModulIKR_OFFLINE_MOBILE_PREMIUM_MOTHERBOARD.zip` — Jika laman semasa bro ialah versi **Offline Learning NeWIC 2026** / tanpa Admin Studio.
2. `02_eModulIKR_ADMIN_V3_MOBILE_PREMIUM_MOTHERBOARD.zip` — Jika bro menggunakan versi **Admin Content Studio v3** (memerlukan tetapan Firebase untuk fungsi admin berkenaan).

**Jangan campur dua versi.** Dua ZIP ini ialah **kod sumber projek penuh** (React + Vite), bukan hanya satu fail `index.html` dan bukan pakej untuk terus drag-drop ke GitHub Pages.

## Pasang/terbitkan ke GitHub Pages (Windows, VS Code)

1. Buat **backup** repositori eModul-IKR yang kini live.
2. Ekstrak **satu** ZIP yang sepadan. Buka folder projek yang ada `package.json` di VS Code.
3. Jalankan arahan di terminal (pastikan Node.js dan npm dipasang):

```bash
npm ci
npm run test:motherboard
npm run test:quiz
npm run test:chat
npm run test:i18n
npm run test:cards
npm run test:offline
npm run check:structure
npm run build
```

4. Semak `dist/sw.js` wujud selepas `npm run build`; `postbuild` akan menjana cache PWA dan mengambil aset baharu.
5. Buka `npm run dev` untuk pratonton, navigasi **IKR3013 → Papan Induk → Nota Asas**. Uji hotspot, I/O, zoom, kuiz, pertukaran BM/EN, dan scroll iPhone.
6. Jika semuanya baik dan repo GitHub Pages diset betul, jalankan `npm run deploy` dari komputer yang mempunyai kebenaran untuk push ke repo `ssn250-arch/eModul-IKR`.
7. Selepas deploy, pada iPhone **reload laman**; PWA yang telah dipasang mungkin menggunakan versi cache lama sehingga service worker baharu aktif. Jika perlu tutup dan buka semula PWA.

**Penting:** Perintah di atas tidak dijalankan sebagai build Vite penuh dalam persekitaran penyediaan pakej kerana npm tidak dapat memuat turun dependency yang tiada dalam cache (ralat rangkaian `EAI_AGAIN`). Struktur JSX, ujian skrip asal dan ujian Explorer telah diperiksa. Oleh itu, bro perlu jalankan `npm ci` dan `npm run build` serta uji paparan pada peranti sebenar sebelum menerbitkan kepada pelajar.

## Fail berkaitan untuk semakan perubahan

- `src/MotherboardExplorer.jsx` — semua komponen, koordinat titik, logik penerangan, pencarian dan kuiz visual.
- `src/MotherboardExplorer.css` — reka bentuk premium, responsif dan interaksi imej tanpa gangguan scroll.
- `src/IKR3013.jsx` — tambah import dan komponen dalam kad papan induk.
- `public/motherboard-explorer/` — tiga imej WebP tempatan yang diperoleh daripada infografik bro (asal, crop papan induk dan crop Rear I/O).
- `scripts/test-motherboard.mjs` — mengesahkan 17 + 6 titik, 6 soalan, sintaks JSX dan fail imej.

### Nota ketepatan teknikal

- Ciri motherboard yang dipaparkan ialah **contoh satu model papan induk**; sokongan slot, kedudukan header dan output grafik berbeza mengikut model.
- Bateri CMOS/RTC membekalkan kuasa sandaran untuk jam/setting tertentu; firmware BIOS/UEFI disimpan dalam cip flash, bukan di dalam bateri.
- Heatsink VRM mengeluarkan haba, manakala litar VRM mengawal voltan.
- Sokongan SSD M.2 NVMe atau SATA bergantung pada papan induk.

## Status penyediaan

- Dilaksana pada dua varian projek sumber ✅
- Semakan sintaks JSX dua varian ✅
- Ujian 480 set kuiz asal ✅
- Ujian Smart Tutor, dwibahasa, offline dan struktur ✅
- Ujian Explorer khas ✅
- `npm ci` + binaan Vite penuh **belum lulus di persekitaran penyediaan**, kerana registry npm tidak tersedia ⚠️
- Belum dimuat naik secara automatik ke GitHub / belum live ⚠️


## Versi 2.1 — Pembetulan visual (20 Oktober 2026)

- Gambar papan induk interaktif kini **ilustrasi pembelajaran bersih tanpa anotasi**, bukannya foto OEM yang disahkan; fungsi umum diilustrasikan dan kedudukan komponen mungkin berlainan daripada model sebenar.
- Infografik pengguna yang beranotasi tetap tersedia melalui pautan **Infografik Asal** untuk pemeriksaan komponen foto sebenar.
- Hanya titik komponen dalam kategori dipilih yang ditunjukkan.
- Tiada pemotongan `object-fit: cover`, dan peta biasa tidak mengunci scroll menegak pada iPhone.
- Zoom melalui paparan penuh; posisi titik berdasarkan koordinat ilustrasi yang dikemas kini.
- Penyelarasan akhir pada peranti mudah alih perlu diuji sebelum gunakan dalam penilaian sebenar.
