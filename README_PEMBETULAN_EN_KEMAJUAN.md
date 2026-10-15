# PEMBETULAN DWIBAHASA BM/EN — Kemajuan Modul

## Isu
Bahagian kemajuan penguasaan, bilangan topik lulus dan status nombor pelajar dahulu masih kekal Bahasa Melayu apabila EN dipilih. Puncanya: teks berkenaan tidak mempunyai padanan lengkap dalam kamus bahasa dan beberapa teks dinamik tidak diterjemahkan.

## Pembetulan
- IKR3013: tajuk "Kemajuan Penguasaan Anda", arahan topik seterusnya, jumlah topik lulus, nombor pelajar, butang reset dan mesej siap kini menggunakan `useLanguage()` dan `t()` terus.
- IKR3023: tajuk "Status Bacaan Modul", arahan nota, jumlah topik lulus, nombor pelajar, butang reset dan mesej siap turut menggunakan `useLanguage()` dan `t()` terus.
- Tajuk topik aktif menggunakan padanan istilah teknikal daripada `translations.js`, tanpa mengubah tajuk asal dan kandungan pembelajaran.
- Menu kad topik kini terjemah tajuk/hint secara reaktif; komponen kemajuan membenarkan teks membungkus pada skrin sempit.
- Kamus BM/EN dan ujian regresi dikemas kini untuk contoh yang pengguna laporkan.

## Cara guna
1. Ekstrak ZIP baharu ke folder sendiri.
2. Daripada direktori projek: `npm ci`, `npm run test:i18n`, `npm run build`, `npm run deploy`.
3. Refresh laman GitHub Pages atau buka tab private jika melihat versi lama kerana cache PWA.
4. Pilih EN dan masuk IKR3013. Sepatutnya papar **Your Learning Progress**, **Please study this topic**, **0 of 8 Topics Passed**, **Student: Not selected • Change**.
5. Masuk IKR3023: papar **Module Learning Progress**, **Please read the notes**, dan maklumat kemajuan dalam English.

**Nota:** Penerangan teknikal lanjutan dalam sebahagian panel modul masih menggunakan Bahasa Melayu seperti dinyatakan dalam README dwibahasa asal. Pembetulan ini menyelesaikan masalah progress dan menu utama, bukan dakwaan semua teks lanjutan telah diterjemah 100%.
