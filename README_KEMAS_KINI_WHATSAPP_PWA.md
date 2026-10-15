# eModul-IKR — Preview WhatsApp, Logo & PWA (2026)

## Apa yang telah dikemas kini
- **Favicon:** `public/logo.png` = fail logo **300×300** yang diberikan.
- **Ikon PWA:** `public/icons/icon-192.png` dan `icon-512.png` = fail logo asal bro 192×192 & 512×512.
- **Ikon maskable:** imej dengan alas cerah disediakan untuk Android tanpa memotong teks/logo.
- **Ikon iOS:** `public/apple-touch-icon.png`.
- **WhatsApp/Open Graph:** `index.html` (tag `<meta property="og:*">`) dan `public/og-preview.png` (1200×630); penerangan menyebut IKR3013, IKR3023 dan **Created by Ts. Syed Mohd Yusri**.
- **PWA GitHub Pages:** laluan `/eModul-IKR/`, manifest dan service worker menggunakan base URL Vite yang sepadan.
- **Responsif:** guard CSS untuk telefon/tablet serta penjajaran header kecil; reka bentuk dan kandungan utama tidak diubah.
- **Footer:** frasa `Rujukan JTM J619-003-3:2023` dibuang seperti diminta sebelum ini.

## Cara deploy
1. Simpan sandaran projek lama.
2. Gantikan fail projek dengan pakej ini di repo GitHub `ssn250-arch/eModul-IKR`.
3. Pada terminal dalam folder projek:
   - `npm ci`
   - `npm run check:structure`
   - `npm run test:quiz`
   - `npm run build`
   - `npm run deploy` (jika guna pakej gh-pages) atau kaedah deploy GitHub Pages yang sedia ada.
4. Lawat `https://ssn250-arch.github.io/eModul-IKR/` dan sahkan ia boleh dibuka dalam telefon.
5. Semak fail berikut selepas diterbitkan:
   - `https://ssn250-arch.github.io/eModul-IKR/logo.png`
   - `https://ssn250-arch.github.io/eModul-IKR/og-preview.png`
   - `https://ssn250-arch.github.io/eModul-IKR/manifest.webmanifest`
   - `https://ssn250-arch.github.io/eModul-IKR/sw.js`
6. Kongsi URL utama melalui WhatsApp. Preview WhatsApp dihasilkan oleh WhatsApp selepas ia mengambil meta tag daripada laman yang **sudah live**; ia tidak boleh dipaksa daripada kod browser sahaja.

## Had penting
- Binaan npm perlu berjaya pada komputer bro sebelum deploy.
- WhatsApp/Telegram mungkin menyimpan cache pratinjau pautan lama. Sekiranya tidak berubah, cuba semak `og-preview.png` sudah live, gunakan Facebook Sharing Debugger untuk menyemak scrapes, dan tunggu sehingga cache dikemas kini.
- Fitur PWA offline hanya menjamin fail dalaman yang sudah dicache selepas pemasangan/penggunaan online. Embed Sketchfab, pautan Google Drive, PC Nexus, CableLabX dan imej luar masih memerlukan internet.
- Responsif penuh tetap perlu diuji pada pelbagai saiz telefon dan tablet, termasuk paparan modul lama.
- Sistem tidak menghantar atau menyimpan markah pelajar pada server pusat; kuiz progres kekal seperti versi asal.
