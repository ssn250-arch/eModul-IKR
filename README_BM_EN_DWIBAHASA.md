# eModul-IKR — Pilihan Bahasa BM / EN (16 Oktober 2026)

## Ringkasan

Projek ini ialah sambungan kepada eModul-IKR Smart Knowledge Tutor (tanpa API key) yang telah disediakan sebelumnya. Fungsi sedia ada seperti visualisasi, nota dan kandungan asal, kuiz unlock, 30 pelajar, chatbot nota, Peta KP, ikon/logo, pautan PC Nexus/CableLabX, PWA dan preview WhatsApp dikekalkan.

- **BM (lalai):** Bahasa Melayu Malaysia; kandungan nota asal tidak diubah.
- **EN:** Easy English untuk paparan portal, menu dan kawalan utama; 128 item bank kuiz (soalan dan semua empat pilihan jawapan); pembantu Smart Knowledge dalam English; 16 panduan English untuk topik utama; serta terjemahan terpilih pada kad nota.
- **Tetapan bahasa:** Butang `BM | EN` pada header portal. Dalam halaman modul, butang terapung di penjuru kiri bawah. Pilihan disimpan pada peranti melalui localStorage dan kekal selepas pelajar bertukar modul.
- **Ketelusan liputan:** Nota terperinci, demonstrasi, kalkulator, infografik dan arahan amali tertentu yang sudah lama berada dalam komponen JSX mungkin masih dipaparkan dalam bahasa asal apabila EN dipilih. Panduan Easy English diberikan untuk setiap topik agar bahan masih boleh dipelajari. Jangan menganggap versi ini terjemahan 100% semua ayat dalam setiap panel lanjutan.
- **Chatbot:** Masih berasaskan nota tempatan. Tidak menjana jawapan dengan AI berbayar atau menyemak web masa nyata. Versi EN memberi respons berdasarkan panduan topik yang telah dikurasi, bukan terjemahan automatik nota penuh.

## Cara Jalankan

1. Ekstrak ZIP dan buka folder yang mengandungi `package.json` menggunakan VS Code.
2. Jalankan:

```bash
npm ci
npm run test:i18n
npm run test:quiz
npm run test:chat
npm run check:structure
npm run build
npm run deploy
```

3. Dalam aplikasi, tekan **BM** atau **EN**. Tetapan sama digunakan semasa masuk IKR3013, IKR3023 dan menjawab kuiz.

## Pemeriksaan

- 480 set (16 topik × 30 pelajar) diuji untuk keserasian BM/EN.
- 2,400 kemunculan soalan kuiz dalam sampel ujian; indeks jawapan betul tidak berubah selepas diterjemahkan.
- 128 item dalam bank kuiz telah dipadankan satu-per-satu dengan versi English.
- JSX lulus semakan sintaks TypeScript dan ujian asal kuiz/chatbot serta struktur.
- Binaan penuh Vite belum dijalankan dalam persekitaran pembinaan ini kerana dependency npm yang tersedia tidak lengkap. Lakukan `npm ci` dan `npm run build` pada komputer bro sebelum deploy.

## Fail Baharu

- `src/LanguageContext.jsx` — bahasa dan butang BM/EN, dengan penukaran teks UI selamat.
- `src/translations.js` dan `src/noteTranslations.js` — kamus terjemahan paparan serta petikan nota.
- `src/EnglishGuides.jsx` — penerangan English asas bagi setiap 16 topik.
- `src/QuizEnglish.js` — 128 item kuiz terjemahan English, pilihan asal dan indeks jawapan dikekalkan.
- `src/EnglishSmartKnowledge.js` — mod chatbot berbantukan nota dalam English.
- `scripts/test-bilingual.mjs` — pemeriksaan silang bahasa.

## Nota Penting

Terjemahan disediakan untuk memudahkan kefahaman, bukan menggantikan Kertas Penerangan rasmi JTM. Istilah teknikal, kod piawaian, dan penilaian amali perlu dirujuk kepada dokumen asal. Jika menjalankan aplikasi ini untuk pentaksiran formal, semak dahulu semua frasa English berkaitan keselamatan dan pemarkahan bersama tenaga pengajar.
