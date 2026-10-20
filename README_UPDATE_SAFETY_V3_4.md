# eModul-IKR v3.4 — Prosedur Keselamatan Responsif (IKR3023)

## Kandungan kemas kini

Kemas kini dibuat di kedua-dua versi: `admin` dan `offline`.

- Modul IKR3023 → kad **Prosedur Keselamatan** kini menggunakan 3 foto pengajar secara setempat:
  1. `faceplate.webp` — plat hadapan; gambar tidak menunjukkan modular jack yang telah dipasang.
  2. `keystone-jack.webp` — modular jack RJ45 bersama terminal IDC.
  3. `floor-cable-cover.webp` — pelindung kabel berprofil melengkung. **Bukan trunking dinding segi empat**.
- Tiga kad foto responsif: telefon (1 kolum), tablet (2 kolum), desktop (3 kolum).
- Tekan foto untuk besarkan. Butang Tutup disediakan.
- Aliran kerja ringkas Sebelum → Semasa → Selepas.
- Latihan kendiri satu soalan situasi keselamatan punch-down (tidak mengubah markah atau rekod pelajar).
- Kandungan keselamatan RJ45, keystone, patch panel, laluan kabel dan elektrik diteliti semula.
- Penerangan foto tersedia dalam Bahasa Melayu dan Inggeris.
- Semua gambar disimpan di `src/assets/safety-photos/` dan akan diikutsertakan semasa build PWA. Tiada gambar luaran diperlukan.

## Pembetulan keselamatan penting

1. **Jangan tutup switch aktif dengan kain** kerana ia boleh menyekat pengudaraan. Urus serpihan konduktor tanpa membahayakan peranti dan asingkan kuasa mengikut SOP jika diperlukan.
2. **Gelang ESD bukan perlindungan renjatan elektrik**. Tidak disyorkan untuk digunakan ketika bekerja dengan sistem elektrik yang hidup.
3. Penamatan keystone menggunakan blok sokongan yang sesuai, bukan tapak tangan.
4. Foto ketiga menunjukkan *floor cable protector* berprofil rendah; jangan mengelirukannya sebagai semua jenis trunking.

## Fail kod yang berubah

- `src/IKR3023.jsx` — kandungan Prosedur Keselamatan dan panggilan komponen visual.
- `src/IKR3023SafetyVisual.jsx` — komponen visual responsif dan latihan kendiri.
- `src/assets/safety-photos/{faceplate,keystone-jack,floor-cable-cover}.webp` — gambar asal pengajar yang dioptimumkan.
- `scripts/test-safety-v34.mjs` — semakan statik regresi.

## Sebelum deploy

Dari **salah satu folder projek** (`admin` atau `offline`):

```bash
npm ci
node scripts/test-safety-v34.mjs
npm run test:skm3
npm run test:v3
npm run build
```

Semak juga UI secara manual pada lebar 375px, 768px dan 1280px dalam Chrome DevTools. Kemudian buka Mod Juri → IKR3023 → Prosedur Keselamatan, buka setiap foto dan cuba latihan. Selepas deploy, lakukan hard refresh dan pastikan service worker versi baharu aktif.

**Had semakan di sini:** JSX telah diperiksa secara sintaks, ujian struktur/kuiz/regresi lulus, tetapi `vite build` dan ujian interaksi di pelayar sebenar belum dapat dijalankan dalam persekitaran ini kerana dependency npm untuk Vite tidak dipasang.
