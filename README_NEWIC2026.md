# eModul-IKR — Pakej Ujian NEWIC 2026

**Tarikh semakan: 15 Oktober 2026**

Pakej ini ialah projek React/Vite lengkap dari segi struktur sumber, disatukan daripada fail yang dibekalkan dan semakan kod pada perbualan ini. Ia **bukan** bukti bahawa semua interaksi peranti atau laman hidup telah lulus ujian QA. Sebelum menggantikan projek awam, buat sandaran dan uji pada salinan/staging.

## Rujukan kurikulum JTM

- **IKR3013**: KP(1/5) Pengenalan Komponen Komputer; KP(2/5) Pengenalan kepada Perkakasan Komputer; KP(3/5) Pengenalan kepada Sistem Komputer; KP(4/5) Pengenalan kepada Aplikasi Komputer; KP(5/5) Pengenalan kepada Rekod Pemasangan Perkakasan dan Sistem Komputer.
- **IKR3023**: KP(1/4) Pengenalan kepada Rangkaian; KP(2/4) Pengenalan kepada Perkakasan Rangkaian; KP(3/4) Pengenalan kepada Pelan Rangkaian; KP(4/4) Pengenalan kepada Pemasangan Kabel.
- Rujukan: Kertas Penerangan Jabatan Tenaga Manusia, J619-003-3:2023, Sijil Teknologi Rangkaian Tahap 3 (lampiran pengguna). Ini **peta tajuk KP**, bukan pengesahan liputan lengkap semua hasil pembelajaran.

## Pembaikan utama

1. `index.html` kini menggunakan laluan Vite `%BASE_URL%`, URL perkongsian betul dan pautan manifest yang aktif.
2. `vite.config.js` menetapkan `base: '/eModul-IKR/'` (khusus untuk projek GitHub Pages yang diminta).
3. `public/manifest.webmanifest` dan ikon PNG persegi 192/512 ditambah.
4. `scripts/generate-sw.mjs` dijalankan selepas `vite build` dan menjana `dist/sw.js` yang menyimpan fail build tempatan untuk mod luar talian selepas **pemasangan dan satu kali akses dalam talian berjaya**.
5. SW didaftarkan daripada `src/main.jsx` melalui `import.meta.env.BASE_URL`, bukannya laluan `/sw.js` salah pada root domain.
6. Dua modul menggunakan pembetulan fakta teknologi 2026 dan pepijat pilihan bajet (lihat fail audit perbualan sebelumnya).
7. Portal ada **peta KP rasmi** dan **simulasi diagnostik kabel** untuk pembelajaran IKR3023/KP(4/4). Senario ialah latihan, bukannya bukti pembacaan instrumen sebenar.
8. Logo asal ADTEC dikekalkan nisbahnya; dua ikon aplikasi baharu dihasilkan daripada logo tersebut.

## Jalankan

Pastikan Node.js serasi dengan Vite 8 (Node 20.19+ atau 22.12+; rujuk dokumentasi Vite jika versi berubah).

```bash
npm ci
npm run dev
npm run build
npm run preview
```

- **Deploy**: `npm run deploy` pada projek/repository yang betul. Pastikan remote Git, akses gh-pages, dan URL GitHub Pages telah dikonfigurasi. Boleh juga deploy folder `dist/` sahaja menggunakan workflow sedia ada.
- **Peringatan**: `npm ci` mungkin memerlukan sambungan ke npm registry. Jangan salin fail `node_modules` antara sistem operasi.
- **PWA selepas deploy**: refresh apabila build baharu siap; lawati portal secara dalam talian, biarkan cache selesai, kemudian uji dengan Wi-Fi ditutup dan buka aplikasi sekali lagi. Model Sketchfab, video dan kandungan Google Drive kekal memerlukan internet.
- **Install**: gunakan pilihan "Install app" / "Add to Home Screen" apabila muncul pada peranti yang menyokong.
- **Kemas kini SW**: setiap binaan menghasilkan cache nama versi baharu; jangan letakkan `sw.js` daripada projek lama dalam `public/`.

## Ujian sebelum hakim hadir

- [ ] `npm ci` dan `npm run build` lulus tanpa ralat.
- [ ] Portal, IKR3013 dan IKR3023 dibuka di desktop serta telefon.
- [ ] Peta KP memaparkan 5 + 4 tajuk dengan betul.
- [ ] Simulasi 6 senario berfungsi: pilihan, maklum balas, markah dan mula semula.
- [ ] Kuiz IKR3013 dan IKR3023: kunci topik, jawab semua soalan, kiraan skor dan reset.
- [ ] Pencadang: uji semua kombinasi bajet yang berlainan; pastikan pemadanan tidak mengguna state lama.
- [ ] Semak semua iframe 3D / pautan video luar talian vs dalam talian.
- [ ] Manifest, ikon, SW boleh dimuat; PWA pulih selepas refresh dan beberapa saat tanpa internet.
- [ ] Paparan tiada teks keluar bingkai pada skrin 360px/768px/desktop.
- [ ] Tiada klaim palsu tentang AI generatif, data pelajar pusat, atau harga model masa nyata.

## Perkara belum disediakan / had

- Tiada sambungan API AI generatif, tiada pangkalan data pengguna/pensyarah, dan belum ada dashboard pengukuran impak pelajar sebenar. Jangan dakwa fungsi tersebut tersedia.
- Kemajuan nota dalam modul lama direkodkan pada pelayar tempatan dan masih berkaitan **topik dibuka**, bukan bukti penguasaan kemahiran.
- Tiada penilaian automatik terhadap semua soalan kuiz oleh panel pakar atau ujian amali sebenar; penyemakan silibus di sini ialah pada peringkat peta tajuk/kandungan terpilih.
- Jika menggunakan bahan media pihak ketiga, semak lesen dan kredit sumber.
- Untuk berjaya dalam penjurian NEWIC, kumpul data kajian pra/pasca **sebenar**; elakkan menggunakan angka rekaan.
