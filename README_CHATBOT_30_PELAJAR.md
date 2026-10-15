# eModul-IKR — Chatbot IKR3013 & IKR3023, 30 Pelajar

## Perubahan
- Pembantu pembelajaran terapung di dalam setiap modul. Kandungan, reka bentuk nota, video/3D, kuiz unlock, PC Nexus dan CableLabX dikekalkan.
- Boleh buka/tutup panel, tanya soalan, tekan cadangan soalan, dan kosongkan chat.
- Semua pilihan nombor pelajar kini 1–30, termasuk enjin kuiz, penukaran nombor pelajar, dan ujian set unik.
- Kuiz 5 soalan masih perlu lulus untuk membuka topik seterusnya; chatbot **tidak** membuka topik atau mengubah markah.

## Dua mod chatbot — penting
1. **Mod Nota (terus boleh digunakan)**: Jawapan daripada ringkasan dan topik dalam fail JSX yang tersedia; tiada AI model generatif dan **tidak menjamin berita atau piawaian terkini**. Pelajar boleh bertanya kata kunci topik. Label “Mod Nota” dipaparkan supaya jelas.
2. **Mod AI Dalam Talian (opsyen)**: Jawapan bebas/lebih mendalam menerusi OpenAI Responses API, dengan carian web untuk pertanyaan bertanda terkini/versi semasa. Ia memerlukan **backend Netlify function** dan **API key persendirian** di Netlify. Sumber web dipaparkan apabila tersedia. Tanpa backend, ia akan kekal di Mod Nota.

## Cara guna terus di VS Code

```
npm ci
npm run test:quiz
npm run check:structure
npm run dev
npm run build
npm run deploy
```

Node.js yang menyokong Vite 8 diperlukan (semak versi Node berbanding `package.json`).

## Aktifkan AI Dalam Talian (untuk benar-benar jawapan bebas dan semakan web)

1. Buat projek backend di Netlify menggunakan kod projek ini (folder `netlify/functions/chat.mjs`). Tetapkan *Environment Variables* **di Netlify**: `OPENAI_API_KEY` (secret); opsyen `OPENAI_MODEL=gpt-4.1-mini` dan `ALLOWED_CHAT_ORIGINS=https://ssn250-arch.github.io,http://localhost:5173`.
2. Deploy backend. Sahkan alamat fungsi seperti `https://NAMA-APP.netlify.app/.netlify/functions/chat` (akses `GET` akan pulangkan 405; itu normal, kerana fungsi menerima POST).
3. Untuk binaan laman utama di GitHub Pages, set **Vite build environment variable** `VITE_AI_CHAT_ENDPOINT=https://NAMA-APP.netlify.app/.netlify/functions/chat` **sebelum** `npm run build` (boleh gunakan `.env.production`, jangan letak kunci API di situ).
4. Jalankan `npm run build && npm run deploy`; buka portal GitHub Pages dan cuba chatbot. Label akan jadi “AI Dalam Talian”.
5. Jika frontend turut berada di domain lain, masukkan origin tersebut dalam `ALLOWED_CHAT_ORIGINS` di Netlify. Jika API tidak tersedia, chatbot memaklumkan masalah dan menggunakan nota sebagai fallback.

### Keselamatan dan kos
- **JANGAN** simpan `OPENAI_API_KEY` dalam `src`, `.env.production` atau mana-mana `VITE_...`. Ia mestilah rahsia pelayan Netlify.
- AI API dan carian web mungkin mengenakan caj mengikut penggunaan. Tetapkan had perbelanjaan, kuota pengguna dan perlindungan tambahan (contoh Netlify rate limiting/Turnstile/log masuk) sebelum membuka penggunaan awam; kawalan sementara di dalam fungsi sahaja tidak mencukupi untuk melawan penyalahgunaan.
- Soalan pelajar dihantar kepada perkhidmatan AI **hanya apabila sambungan AI diaktifkan**. Elakkan menghantar nama penuh, nombor IC, password atau data peribadi.
- Mode online memerlukan internet; PWA offline hanya menyediakan jawapan nota tempatan yang sudah dimuatkan.
- AI boleh tersilap: semak jawapan berisiko dan rujuk dokumen KP JTM yang sah.

## Semakan yang dicadangkan
- Uji semua nombor pelajar 1–30, soal jawab kedua-dua modul dan pertukaran pelajar.
- Uji responsif pada telefon 360px, tablet 768px dan desktop.
- Uji selepas buka semula browser dan ketika offline.
