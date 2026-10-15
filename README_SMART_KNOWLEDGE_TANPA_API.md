# eModul-IKR — Smart Knowledge Chatbot Tanpa API Key

## Apa yang berubah
- Kedua-dua modul IKR3013 dan IKR3023 menggunakan **Smart Knowledge Tutor** yang mencari dan merumuskan fakta daripada `topics` dalam fail JSX asal, termasuk kandungan Nota Asas dan Teknologi Terkini.
- Tidak lagi menggunakan Netlify Functions atau panggilan OpenAI API. Tiada kunci API atau pembayarannya.
- Chatbot kekal sebagai panel terapung yang responsif, dengan cadangan soalan kontekstual, sejarah perbualan dalam sesi semasa dan label rujukan topik.
- Menjawab dalam Bahasa Melayu Malaysia menggunakan kata kunci, pemadanan topik, nota modul, dan beberapa penerangan khusus. Bukan AI generatif dan tidak dapat menjawab semua soalan bebas.
- Soalan tentang fakta 2026 atau berita **tidak disemak secara langsung**. Chatbot akan menyatakan batasan ini dan mengesyorkan semakan sumber rasmi.
- Semua kandungan paparan dan mekanisme **kuiz unlock 30 pelajar** asal dikekalkan tanpa perubahan.
- Footer, ikon, favicon, paparan WhatsApp, PWA dan pautan PC Nexus/CableLabX dikekalkan.

## Cara pemasangan
1. Buat sandaran projek yang sedang diterbitkan.
2. Ekstrak ZIP, jalankan `npm ci` dan `npm run dev` (atau terus `npm run build`).
3. Semak kedua-dua modul, chatbot, kuiz unlock, serta fungsi lain. Jika semuanya baik jalankan `npm run deploy` ke GitHub Pages.

## Fail terlibat
- `src/StudyChatbot.jsx` — panel chatbot yang kini tidak membuat permintaan API.
- `src/SmartKnowledgeEngine.js` — enjin pencarian jawapan nota dalam pelayar.
- `src/IKR3013.jsx` dan `src/IKR3023.jsx` — kekal seperti versi terakhir, cuma penggunaan panel chatbot sedia ada.

## Contoh soalan
- IKR3013: `Bezakan HDD dengan SSD`; `Apa fungsi CPU?`; `Mengapa DDR5 perlu papan induk serasi?`
- IKR3023: `Apakah fungsi patch panel?`; `Bezakan topologi star dan mesh`; `Apa itu T568B?`

## Batasan penggunaan
- Jawapan berpandukan nota yang sedia ada, bukannya carian internet masa nyata atau model AI generatif.
- Tiada pengumpulan jawapan pelajar atau akaun pentadbir; sejarah chat hanya dalam memori sesi halaman. Kuiz unlock terus menyimpan kemajuan dalam storan peranti seperti sebelumnya.
- Jika nota topik kurang lengkap, chatbot juga tidak mampu memberikan jawapan mendalam; tambahkan nota yang disahkan sebelum digunakan dalam kelas.
