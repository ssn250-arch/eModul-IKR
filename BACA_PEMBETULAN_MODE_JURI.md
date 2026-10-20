# PEMBETULAN MODE JURI — 20 Oktober 2026

## Ralat dikenal pasti
Pada kedua-dua modul `src/IKR3013.jsx` dan `src/IKR3023.jsx`, paparan khusus Mode Juri menggunakan `<Eye size={17}/>` tetapi `Eye` tidak diimport daripada `lucide-react`.

Apabila modul dipilih dengan `demoMode=true`, React cuba merender kod tersebut dan mencetuskan `ReferenceError: Eye is not defined`. Kesan: skrin modul menjadi kosong/gagal dipaparkan. Kesilapan sama ditemui dalam kedua-dua varian di pakej asal.

## Pembetulan
Tambahkan `Eye` pada senarai import `lucide-react` dalam kedua-dua fail berkenaan. Logik kuiz, markah, progress, kandungan modul dan ciri lain TIDAK diubah. Ujian statik untuk import ikon Mod Juri ditambah dalam `scripts/test-v3-premium.mjs`.

## PENTING
Gunakan SATU varian sahaja, mengikut aplikasi yang telah diterbitkan: **OFFLINE_LEARNING** ATAU **ADMIN_STUDIO_V3**. Jangan campur kandungan kedua-duanya.

## Cara pasang semula (VS Code)
1. Sandarkan folder projek sedia ada.
2. Gantikan dua fail `src/IKR3013.jsx` dan `src/IKR3023.jsx` daripada varian yang sama (atau gunakan seluruh ZIP varian berkenaan).
3. Dalam folder projek jalankan `npm ci`, `npm run test:v3`, `npm run build`, kemudian `npm run deploy` untuk GitHub Pages.
4. Pastikan bahagian pertama Console tidak lagi menunjukkan `Eye is not defined`. Buka Mod Juri → IKR3013, Explorer, IKR3023; kemudian cuba kembali ke Portal.
5. Jika masih memaparkan versi lama, buat hard refresh Ctrl+Shift+R dan semak update service worker di DevTools → Application.

**Pengesahan:** Punca kekurangan import disahkan melalui semakan kod. Build Vite dan ujian browser sebenar tidak dapat dijalankan dalam persekitaran pemeriksaan ini (pakej npm belum tersedia sepenuhnya); sila jalankan pada persekitaran pembangunan sebelum deploy.
