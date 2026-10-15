# eModul-IKR — Kandungan Kad Dwibahasa (BM / EN)

Versi ini berasaskan eModul-IKR `BM_EN_PROGRESS_FIX_2026`, dengan tambahan kamus English mudah untuk teks pembelajaran di dalam kad IKR3013 dan IKR3023. Sumber Bahasa Melayu Malaysia **tidak dipadam**. Tekan **EN** untuk membaca penerangan, tajuk, label, amaran keselamatan, langkah amali dan teks simulasi dalam English; tekan **BM** untuk kembali kepada BM. Bahasa pilihan disimpan pada pelayar.

## Perkara yang dikekalkan

- Semua 8 kad IKR3013 dan 8 kad IKR3023, tab asas/lanjutan, ilustrasi, model 3D, kalkulator, simulator dan pencadang spesifikasi asal
- Kuiz unlock 5 soalan untuk nombor pelajar **1–30**, dengan peraturan markah dan rekod kemajuan asal
- Smart Knowledge Chatbot BM/EN (tanpa API key)
- Peta KP dalam header (tanpa dua butang Buka Modul), favicon/logo baharu, PWA, preview WhatsApp, pautan PC Nexus dan CableLabX

## Apa yang diterjemahkan

Terjemahan bagi lebih 1,000 padanan UI/kad disemak secara kod; tambahan `src/cardTranslations.js` mengandungi terjemahan English mudah untuk nota, prosedur, keselamatan, pemilihan komponen dan banyak bahagian infografik. Nama piawaian dan istilah seperti CPU, RAM, DDR5, RJ45, T568B dan VLAN dikekalkan.

**Batasan:** Teks yang sudah tercetak *di dalam imej*, video YouTube, fail PDF asal JTM dan kandungan web luar tidak diterjemahkan secara automatik. Pembinaan dan pengujian visual dalam browser sebenar masih perlu dijalankan pada komputer anda. Jika menemui satu ayat yang belum bertukar, catat nama modul/kad dan tangkapan skrin untuk pembetulan yang tepat.

## Fail penting

- `src/cardTranslations.js` — padanan English bagi kandungan kad terperinci
- `src/translations.js` — penggabung terjemahan UI, nota asal dan kandungan kad
- `src/LanguageContext.jsx` — penukaran BM/EN untuk teks serta label aksesibiliti
- `src/EnglishGuides.jsx` — panduan Easy English bagi 16 topik
- `scripts/test-card-english.mjs` — ujian terjemahan contoh nota kad

## Langkah pemasangan / GitHub Pages

Buka folder projek yang mengandungi `package.json`, kemudian jalankan:

```bash
npm ci
npm run check:structure
npm run test:i18n
npm run test:cards
npm run test:chat
npm run test:quiz
npm run build
npm run deploy
```

Selepas terbit, buka laman dan pilih BM/EN di header. Jika masih ada kandungan lama, muat semula halaman dengan `Ctrl + Shift + R` atau buka tab Incognito. **Jangan padam data laman** jika mahu mengekalkan rekod kemajuan kuiz yang disimpan secara tempatan.

## Status pengujian

Ujian automatik struktur fail, parse JSX/JS, terjemahan contoh, 480 set kuiz dan 11 ujian chatbot lulus dalam persekitaran penyediaan. *Vite build* penuh tidak disahkan kerana kebergantungan npm yang diperlukan tidak terdapat dalam cache luar talian persekitaran ini; sila jalankan `npm ci && npm run build` di komputer anda sebelum terbit.
