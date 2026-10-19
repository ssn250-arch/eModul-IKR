# eModul-IKR — Penempatan Interactive Motherboard Explorer 2.0

## Perubahan khusus

Dalam kad **IKR3013 > Papan Induk > Nota Asas**, bahagian **ANATOMI & PENYAMBUNG > Direktori Port & Slot Utama** kini disusun begini:

1. Lencana **ANATOMI & PENYAMBUNG**;
2. Tajuk **Direktori Port & Slot Utama**;
3. Penerangan ringkas yang bermula dengan "Kenali fungsi dan peranan...";
4. **Interactive Motherboard Explorer**;
5. Kad nota direktori port & slot asal;
6. Model 3D Papan Induk dan bahagian pembelajaran seterusnya.

Perubahan hanya pada kedudukan komponen `<MotherboardExplorer />` di `src/IKR3013.jsx`. Pada skrin kecil, padding bekas tajuk dikurangkan untuk memberikan ruang kepada Explorer. Data, hotspot, asset, ujian visual dan paparan lain dikekalkan dari pakej Explorer sebelumnya.

## Pakej

- **01_OFFLINE**: Projek Offline Learning + Mobile Premium + Explorer yang disusun semula.
- **02_ADMIN_V3**: Projek Admin Studio v3 + Mobile Premium + Explorer yang disusun semula.

Pilih **satu** pakej yang sepadan dengan versi yang sedang diterbitkan; jangan campur kod kedua-duanya.

## Penerbitan GitHub Pages

1. Ekstrak ZIP pilihan, dan buka folder yang mengandungi `package.json` di VS Code.
2. Di terminal folder itu, jalankan `npm ci` dan `npm run build`.
3. Semak halaman IKR3013 > Papan Induk dan kedudukan Explorer.
4. Selepas yakin, jalankan `npm run deploy` jika konfigurasi GitHub Pages bro masih sama.
5. Jika versi lama masih kelihatan, lakukan muat semula PWA dan semak kemas kini Service Worker.

## Semakan dilakukan

- Ujian penempatan: Explorer muncul tepat sekali selepas tajuk direktori dan sebelum senarai nota direktori.
- Ujian struktur, 480 set kuiz, Smart Knowledge Tutor, dwibahasa, nota, offline dan ujian Explorer lulus untuk kedua-dua versi.
- Ujian Admin v3 juga lulus.
- **Build penuh Vite dan ujian pada iPhone belum dijalankan dalam sesi ini** kerana pakej `node_modules` projek tidak tersedia.

Sistem yang telah diterbitkan di GitHub Pages tidak akan berubah sehingga bro melakukan build/deploy.
