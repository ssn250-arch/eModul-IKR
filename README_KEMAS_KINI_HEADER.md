# eModul-IKR — Kemaskini Header dan Peta KP (16 Oktober 2026)

Perubahan sahaja:
1. Kedua-dua butang `Buka Modul IKR3013` dan `Buka Modul IKR3023` **di dalam panel Peta KP** dibuang. Senarai KP kekal.
2. Header menggunakan logo eModul-IKR terkini (PNG telus) yang disediakan sebagai `src/logo-emodul-mark.png`. Simbol logo asal digunakan bersama tulisan eModul-IKR yang jelas pada telefon dan desktop, serta warna sepadan dengan logo.
3. Kad utama IKR3013 dan IKR3023 serta butang Buka Modul di kad utama **dikekalkan**.
4. Nota, kuiz unlock, link PC Nexus & CableLabX, logo favicon, PWA dan preview WhatsApp tidak diubah.

## Jika mahu gantikan fail sahaja
- Salin `PortalIKR_LOGO_BARU_TANPA_BUTANG_KP.jsx` ke `src/PortalIKR.jsx`.
- Salin `logo-emodul-header.png` ke `src/logo-emodul-mark.png`.
- Kedua-dua fail **mesti** digantikan/ditambah agar import logo baharu berfungsi.

## Projek lengkap
Buka folder projek dan jalankan `npm ci`, `npm run check:structure`, `npm run test:quiz`, `npm run build`. Uji di browser sebelum deploy `npm run deploy`.

Nota: binaan Vite penuh tidak boleh disahkan tanpa dependensi npm yang terpasang.
