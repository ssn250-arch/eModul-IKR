# AUDIT eModul-IKR | Persediaan NEWIC 2026

Tarikh: 15 Oktober 2026 | Status: **Semakan kod dan peta KP, bukan audit amali menyeluruh**.

## 1. Dokumen asas yang dibandingkan

- `1. IKR3013 COMPUTER HARDWARE AND SOFTWARE.pdf` — Kertas Penerangan JTM, J619-003-3:2023, Tahap 3; KP(1/5) hingga KP(5/5).
- `2. IKR3023 NETWORK STRUCTURED CABLING.pdf` — Kertas Penerangan JTM, J619-003-3:2023, Tahap 3; KP(1/4) hingga KP(4/4).
- Fail sumber JSX, HTML, package dan manifest yang dibekalkan oleh pengguna.

### Perkara yang sudah ada dalam eModul asal

- Portal dua modul, IKR3013 dan IKR3023, dengan nota berstruktur dan grafik.
- Kuiz objektif dan rekod kemajuan bacaan dalam storan pelayar.
- Pencadang spesifikasi PC/rangkaian berasaskan peraturan (bukan model AI generatif).
- Integrasi model 3D melalui penyedia luar dan video/pautan pembelajaran.

## 2. Peta KP dan jurang kandungan

| Modul | Rujukan KP | Status yang boleh disimpulkan daripada fail kod | Cadangan PdP |
|---|---|---|---|
| IKR3013 | KP(1/5) komponen komputer | Komponen utama dijelaskan dalam nota | Tambah semakan keserasian soket, RAM, PSU dan ESD berasaskan senario |
| IKR3013 | KP(2/5) perkakasan komputer | Kandungan perkakasan ada, sebahagiannya berorientasikan teori | Tambah checklist pemasangan dan ujian POST |
| IKR3013 | KP(3/5) sistem komputer | Pengenalan OS, Windows dan pemacu ada | Tambah simulasi keputusan pemasangan OS, firmware, boot dan pembaikan |
| IKR3013 | KP(4/5) aplikasi komputer | Beberapa topik aplikasi/perisian wujud | Bina latihan instalasi aplikasi dan verifikasi lesen/keserasian |
| IKR3013 | KP(5/5) rekod pemasangan | Bukan komponen penilaian utama kuiz semasa | Tambah borang rekod pemasangan dengan eksport PDF/CSV |
| IKR3023 | KP(1/4) rangkaian | Topologi, media dan Ethernet disediakan | Tambah aktiviti memilih media mengikut jarak/kos |
| IKR3023 | KP(2/4) perkakasan rangkaian | Switch, router, rack dan alat pengujian dijelaskan | Tambah padanan fungsi alat dan TEM |
| IKR3023 | KP(3/4) pelan rangkaian | Plan layout disentuh pada tahap pengenalan | Tambah latihan lakaran pelan, ukuran laluan, label outlet dan BOM |
| IKR3023 | KP(4/4) pemasangan kabel | Teori termination/pemasangan ada | **Simulasi diagnostik kabel baharu** (6 senario). Lengkapkan kemudian dengan rubrik amali fizikal |

**Penting:** Peta ini menyatakan padanan secara tema, bukan pensijilan bahawa silibus rasmi dipenuhi 100%. Penilaian hasil kerja perlu disahkan pensyarah mengikut kriteria penilaian yang diluluskan.

## 3. Pembetulan teknikal 2026 yang perlu dikekalkan

- DDR5 mempunyai on-die ECC; ini tidak setara dengan ECC RAM perlindungan end-to-end bagi sistem pelayan.
- PCIe 7.0 ialah spesifikasi yang telah diterbitkan; jangan gambarkan ia telah menjadi standard pengguna umum. Catat beza spesifikasi dan produk pasaran.
- 10GBASE-T sehingga 100 m: lazimnya Cat6A. Jarak Cat6 bergantung spesifikasi dan ujian.
- 40GBASE-T menggunakan kabel tembaga Cat8 sehingga kira-kira 30 m, bukan 'fiber tanpa had jarak'.
- Untuk saluran twisted-pair biasa, 100 m melibatkan 90 m permanent link + baki patch cord mengikut keperluan reka bentuk; bukan semua standard Ethernet menggunakan 100 m.
- Kabel crossover klasik masih berkaitan asas teori, tetapi port moden lazimnya Auto-MDI/MDIX.
- Jenis fiber multimode moden tidak wajar diterangkan semata-mata 'LED' kerana banyak sambungan Ethernet moden menggunakan VCSEL.
- Jangan dakwa pencadang rule-based sebagai model AI generatif atau harga yang diperoleh masa nyata.
- Jangan jadikan 'topik dibuka' sebagai bukti automatik bahawa pelajar menguasai kemahiran.

## 4. Had semakan dan risiko demo

1. **Pemasangan dependensi dan build belum dapat dilaksanakan dalam persekitaran audit kerana registry npm tidak dapat dicapai.** Script serta struktur projek telah disediakan, tetapi `npm run build` wajib dijalankan di komputer yang mempunyai internet sebelum deploy.
2. Offline PWA meliputi fail build setempat setelah cache dipasang. **Model Sketchfab, video dan kandungan Drive masih memerlukan internet**; jangan berjanji semuanya offline.
3. Kuiz sedia ada belum diaudit item demi item terhadap semua KP dan penilaian autentik belum dilaksanakan.
4. Untuk NEWIC: kumpul bukti pra/pasca, masa pelaksanaan dan maklum balas sebenar; ini lebih kuat daripada angka yang dijana secara rawak.
5. Semak lesen visual/3D pihak ketiga dan kredit kepada penghasilan asal.

## 5. Cadangan fasa selepas binaan stabil

**Fasa 1 (sebelum pertandingan)**: Uji semua fungsi, dapatkan bukti pelajar, cetak poster A1 mengikut template dan sediakan demo sandaran. **Fasa 2**: Tambah borang rekod KP(5/5), pelan rangkaian KP(3/4), dashboard anonim serta penilaian pra/pasca. **Fasa 3**: Jika benar-benar perlu, bina pembantu pembelajaran AI berasaskan dokumen rujukan yang disahkan, dengan semakan keselamatan dan privasi.
