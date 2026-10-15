# eModul-IKR — Kekalkan Reka Bentuk Asal + Kuiz Unlock 5 Soalan

## Apa yang dikekalkan
- **Reka bentuk asal** kad IKR3013 dan IKR3023, warna tema, header, animasi, kad menu.
- **Semua kandungan nota asal** dalam kedua-dua modul, termasuk bahagian Nota Asas / Teknologi Terkini, gambar, infografik, visualisasi 3D, panduan/pemeriksaan dan pencadang spesifikasi.
- Peta Kertas Penerangan JTM pada halaman Portal.
- Struktur React + Vite untuk GitHub Pages dan fail PWA daripada pakej terdahulu.

## Perubahan
1. **Baca → kuiz → unlock kad**. Setiap topik (8 IKR3013, 8 IKR3023) mempunyai checkpoint 5 soalan. Pelajar wajib memperoleh minimum **3/5 (60%)** untuk membuka kad seterusnya. Skor yang rendah tidak membuka kad; boleh cuba lagi dengan set baharu.
2. **Variasi soalan bagi 29 pelajar**. Setiap topik ada **8 soalan berlainan**, dan sistem memilih 5 dengan kombinasi berbeza bagi nombor pelajar 1–29. Turutan soalan dan jawapan juga dipelbagaikan. **29 pelajar perlu diberikan nombor unik yang berbeza** oleh pensyarah. Nama atau login tidak diperlukan.
3. **Kemajuan berasingan setiap pelajar** berdasarkan nombor pelajar dan modul pada satu peranti, menggunakan localStorage (contohnya pelajar 3 berbeza daripada pelajar 4). Data tidak terselaras antara peranti dan tidak disahkan dengan akaun pelajar; ini alat PdP, bukan pengesahan identiti rasmi.
4. **Penilaian akhir modul** menggantikan kuiz penilaian lama: **IKR3013 → https://pcnexus.netlify.app/** dan **IKR3023 → https://cablelabx.netlify.app/**. Kad akhir aktif selepas semua checkpoint modul lulus.
5. **Simulasi Diagnostik Kabel** di portal dibuang berdasarkan permintaan terdahulu; Peta KP dikekalkan.
6. **Kunci versi baharu**: kemajuan lama yang dibuka hanya melalui bacaan tidak dipindahkan secara automatik ke kemajuan kuiz.

## Fail baharu/diubah
- `src/IKR3013.jsx` — **semua nota asal dikekalkan**, tambah checkpoint di penghujung nota, kunci bersyarat, pautan PC Nexus.
- `src/IKR3023.jsx` — **semua nota asal dikekalkan**, tambah checkpoint di penghujung nota, kunci bersyarat, pautan CableLabX.
- `src/TopicUnlockQuiz.jsx` — antara muka kuiz beranimasi, nombor pelajar, paparan soalan dan keputusan, ulang cuba.
- `src/TopicUnlockBanks.js` — bank 8 soalan untuk setiap 16 topik.
- `src/TopicQuizEngine.js` — penghasil kombinasi 5 soalan mengikut nombor pelajar.
- `src/PortalIKR.jsx` — buang sahaja kad Simulasi Diagnostik Kabel; gaya dan peta KP kekal.
- `scripts/smoke-check.mjs`, `scripts/test-quiz-sets.mjs` — semakan struktur dan keunikan set kuiz.

## Cara guna dalam VS Code
1. Ekstrak ZIP, dan **buat sandaran projek asal dahulu**.
2. Pastikan komputer ada Node.js yang menyokong versi Vite dalam `package.json`.
3. Buka Terminal dalam folder projek, jalankan:

   ```bash
   npm ci
   npm run check:structure
   npm run test:quiz
   npm run dev
   ```

4. Cuba aliran lengkap dalam pelayar: buka IKR3013 → CPU → jawab 5 soalan → lulus 3/5 → Motherboard terbuka. Uji juga fail 3023, ID pelajar lain, reset, dan penilaian akhir.
5. Jika semua stabil, jalankan `npm run build` kemudian deploy melalui kaedah GitHub Pages yang bro sedia gunakan.
6. Jika fail statik masih ter-cache, lakukan hard refresh dan semak service worker selepas deploy.

## Status ujian 15 Oktober 2026
- LULUS semakan sintaks JSX/JS untuk semua fail kod yang diubah (parser TypeScript).
- LULUS `npm run check:structure`.
- LULUS `npm run test:quiz`: **464 set kuiz** (16 topik × 29 nombor), 5 soalan/set, tiada set awal yang berganda dalam topik yang sama.
- **Belum dapat menjalankan `npm run build` atau ujian pelayar sebenar** di persekitaran ini kerana pakej npm yang diperlukan tidak tersedia dalam cache luar talian.

## Had reka bentuk
- Pelajar masih boleh memilih nombor orang lain jika nombor tidak dipantau; sistem ini **bukan kawalan akaun/identiti yang kukuh**.
- Data kemajuan dalam localStorage boleh dipadam dengan reset/clear browser dan tidak diikuti automatik pada peranti lain.
- Soalan 5/8 rawak tidak membuktikan pelajar membaca semua ayat nota. Jika perlukan bukti audit rasmi, pertimbangkan login atau backend berpusat dan rekod masa/penilaian.
- Link luar PC Nexus dan CableLabX memerlukan internet dan tertakluk kepada ketersediaan laman luar.
