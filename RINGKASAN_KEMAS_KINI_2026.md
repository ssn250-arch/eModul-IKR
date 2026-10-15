# Ringkasan Kemas Kini eModul-IKR (Unlock Quiz Flow)

## Perubahan utama
1. **Flow pembelajaran baharu** untuk IKR3013 dan IKR3023:
   - Pelajar baca topik.
   - Pelajar jawab **kuiz interaktif 5 soalan**.
   - Jika capai **minimum 3/5**, topik seterusnya akan **unlock**.
   - Soalan diambil secara **rawak** daripada bank soalan topik.

2. **Kuiz penilaian modul digantikan kepada pautan luar**:
   - IKR3013 → `https://pcnexus.netlify.app/`
   - IKR3023 → `https://cablelabx.netlify.app/`

3. **Simulasi Diagnostik Kabel dibuang** daripada modul IKR3023.

4. **Peta Kertas Penerangan** ditambah baik:
   - Paparan interaktif dan moden.
   - Memaparkan laluan KP rasmi, outcome pembelajaran, dan topik berkaitan.

## Fail utama yang dikemas kini
- `src/IKR3013.jsx`
- `src/IKR3023.jsx`

## Nota
- Progress disimpan dalam `localStorage` browser.
- Boleh reset progress melalui butang **Reset Kemajuan** dalam modul.
