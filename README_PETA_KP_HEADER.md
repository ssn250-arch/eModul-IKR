# Peta KP — Dipindahkan Ke Header Portal

## Apa diubah

- Buang **kad Peta Kertas Penerangan JTM** daripada kawasan bawah dua kad modul.
- Tambah butang kecil **Peta KP (9)** di kanan header.
- Papar panel moden bergaya glassmorphism di bawah header apabila butang ditekan.
- Panel memaparkan semula 5 KP IKR3013 dan 4 KP IKR3023, pautan masuk modul, serta makluman rujukan JTM.
- Klik di luar panel, tekan Escape, atau klik Tutup untuk menutupnya.
- Paparan responsif dan boleh skrol pada skrin telefon.

## Kaedah paling mudah

Jika bro telah memasang projek **eModul-IKR_KEKAL_DESAIN_QUIZ_UNLOCK_2026**, bro hanya perlu **gantikan `src/PortalIKR.jsx`** dengan fail `PortalIKR_PETA_KP_HEADER_2026.jsx` yang dilampirkan (namakan semula sebagai `PortalIKR.jsx`).

Jika belum ada projek terdahulu, ekstrak ZIP projek lengkap yang disertakan.

Untuk menguji selepas menggantikan fail:

```bash
npm ci
npm run check:structure
npm run test:quiz
npm run dev
```

**Status:** Semakan sintaks JSX dan struktur projek lulus; ujian 464 set kuiz lulus. Binaan `npm run build` dan pengujian pelayar sebenar belum dilaksanakan dalam persekitaran ini. Jangan terus replace laman live sebelum diuji secara lokal.
