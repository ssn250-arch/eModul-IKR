# eModul-IKR v3.0 — Premium UI/UX + Mode Juri

## Projek dan versi
Ini ialah kod penuh eModul-IKR v3.0 berdasarkan **v2.3 Kuiz Visual Responsif**. Varian ini: **Offline Learning**.
Jangan gabungkan kandungan kedua-dua varian. Pilih yang sama seperti tapak GitHub Pages sedia ada.

## Ciri baharu
- Portal utama: latar grid sangat halus dan ambient gradient, kad premium, ruang desktop lebih luas, butang Mode Juri yang jelas.
- Dalam modul: hero padat, grid topik responsif, kawalan visual konsisten; Papan Induk Explorer masih tepat selepas tajuk Direktori Port & Slot Utama.
- Explorer: direktori titik ikut kategori, label komponen dipilih di bawah imej, petunjuk zon foto (atas/tengah/bawah kiri/kanan) dalam Kuiz Visual, cincin kosong yang tidak menutup komponen, zoom dan pautan ke model 3D lama.
- Alat Belajar: satu menu boleh buka BM/EN, Offline dan Smart Tutor pada mobile **dan desktop**; hilangkan dua butang terapung yang lama. Portal desktop masih menyediakan switcher bahasa dalam header.
- Mode Juri (public demo, bukan sistem keselamatan): akses semua kad pembelajaran dalam pratonton; navigasi pantas ke Portal, IKR3013, Explorer Papan Induk, IKR3023; hentikan demo untuk kembali ke menu dan akses sebenar.
- Kuiz demo menggunakan pelajar contoh sementara, **tanpa mengubah unlock, markah atau localStorage kemajuan pelajar**. Explorer juga tidak menyimpan progress demo. Penilaian luar PC Nexus / CableLabX tidak dipintas.

## Cara guna Mode Juri
1. Buka portal utama, klik **Mode Juri**.
2. Bar kuning `MODE JURI · PRATONTON` akan muncul sebagai penanda jelas.
3. Pilih `IKR3013`, `Explorer`, `IKR3023` di bar tersebut, atau buka kad modul dan teroka mana-mana topik.
4. Cuba Kuiz Visual atau kuiz topik sebagai demonstrasi; skor demo **tidak disimpan**.
5. Klik **Tamat Demo**. Modul dikosongkan daripada memori sesi demo dan kemajuan pelajar sebenar dikekalkan.

**Perhatian:** Laman GitHub Pages ialah laman statik. Butang Mode Juri ini boleh ditekan pengunjung laman, bukan akses pensyarah yang dikawal identiti. Jika Mode Juri mesti pensyarah sahaja, perlukan backend pengesahan atau pakej demo berasingan; jangan menganggap mod ini selamat dengan menyembunyikan butang di frontend.

## Deploy (Windows / VS Code)
1. Salin keseluruhan folder varian yang betul ke repositori projek eModul-IKR; sandarkan sumber asal terlebih dahulu.
2. Di terminal dalam folder yang mempunyai `package.json`, jalankan:

```sh
npm ci
npm run check:structure
npm run test:quiz
npm run test:chat
npm run test:i18n
npm run test:cards
npm run test:offline
npm run test:motherboard
npm run test:quiz-marker
npm run test:v3
npm run build
npm run deploy
```

3. GitHub Pages asal dikonfigurasi untuk `https://ssn250-arch.github.io/eModul-IKR/`. Pastikan branch penerbitan gh-pages dan repository betul.
4. Selepas deploy, muat semula PWA (jika cache lama muncul, tutup/buka semula dan pastikan service worker versi baharu selesai dipasang).

## Semakan skrin sebenar sebelum ditunjukkan kepada pelajar
- iPhone 390 × 844, Android 360 × 780; tablet 768 × 1024; laptop 1366 × 768; desktop 1920 × 1080.
- Tiada scroll melintang pada page; menu Alat Belajar tidak menutup kuiz ketika scroll; pilihan bahasa kekal; tooltip dan hotspot tepat.
- Mode Juri: buka Papan Induk tanpa kuiz, cuba kuiz topik, tamat demo, semak progress pelajar asal **tidak berubah**.
- Mod Offline: muat cache ketika ada internet lalu cuba buka kandungan teks semasa tiada internet. Sketchfab, YouTube, Drive dan latihan luar tetap perlukan internet.

## Keputusan ujian dalam persekitaran penyediaan
Lulus: semakan struktur, 480 set kuiz, Smart Tutor, BM/EN, kad nota English, mod offline, 17 hotspot/6 I/O/6 visual questions, ujian marker dan semakan kod v3 untuk kedua-dua varian.
**Build penuh Vite tidak berjaya dijalankan di persekitaran penyediaan ini kerana pemasangan dependency npm gagal** (registry/cache). Ia WAJIB dijalankan pada komputer pengguna sebelum deploy. Ujian browser sebenar juga belum dilakukan.

### Nota teknikal
- `src/PortalIKR.jsx`: Mode Juri dan penavigasian.
- `src/IKR3013.jsx`, `src/IKR3023.jsx`, `src/TopicUnlockQuiz.jsx`: guard supaya demo tidak menulis progress.
- `src/MobileStudyDock.jsx`, `src/OfflineLearning.jsx`, `src/StudyChatbot.jsx`: menu utiliti seragam.
- `src/MotherboardExplorer.jsx`, `.css`: label terpilih dan petunjuk zon kuiz.
- `src/index.css`: gaya dan breakpoint responsif.
- `scripts/test-v3-premium.mjs`: ujian tambahan.

**Tiada akaun GitHub atau Netlify diubah secara langsung.**
