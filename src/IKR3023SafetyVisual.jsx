import { useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, Info, Maximize2, X, ShieldAlert } from 'lucide-react';
import faceplatePhoto from './assets/safety-photos/faceplate.webp';
import keystonePhoto from './assets/safety-photos/keystone-jack.webp';
import floorCoverPhoto from './assets/safety-photos/floor-cable-cover.webp';

// Foto asal pengajar — disimpan setempat supaya turut boleh diakses dalam PWA offline.
// Foto floor-cover ialah pelindung kabel berprofil rendah, bukan contoh trunking dinding biasa.
const photoCards = [
  {
    id: 'faceplate', image: faceplatePhoto,
    title: ['Faceplate / Plat Dinding', 'Faceplate / Wall Plate'],
    caption: ['Foto plat hadapan; modular jack tidak kelihatan terpasang dalam foto ini.', 'Front wall plate shown; no installed modular jack is visible in this photo.'],
    safety: ['Pastikan plat dipasang kukuh, tiada tepi tajam dan label port jelas selepas pemasangan.', 'Check secure mounting, no sharp edges and clear port labels after installation.'],
  },
  {
    id: 'keystone', image: keystonePhoto,
    title: ['Modular Jack (Keystone RJ45)', 'RJ45 Keystone Jack'],
    caption: ['Foto bahagian hadapan port RJ45 dan terminal IDC di belakang.', 'Photo of the RJ45 front socket and rear IDC terminals.'],
    safety: ['Sokong jack di atas blok penahan semasa punch-down. Jangan pegang pada tapak tangan.', 'Support the jack on a suitable puck while punching down. Never hold it in your palm.'],
  },
  {
    id: 'cover', image: floorCoverPhoto,
    title: ['Pelindung Kabel Permukaan', 'Surface Cable Protector'],
    caption: ['Contoh penutup kabel berprofil melengkung; bukan contoh trunking dinding segi empat.', 'Example of a curved low-profile cable cover, not a rectangular wall trunking.'],
    safety: ['Pilih jenis yang sesuai dengan lokasi, kemaskan hujung dan elakkan bahaya tersandung.', 'Use the correct type for the location, secure its ends and prevent trip hazards.'],
  },
];

const workflow = [
  { stage: ['01 · Sebelum kerja', '01 · Before work'], text: ['Kenal pasti laluan kabel, semak alat dan asingkan punca kuasa/PoE jika kerja memerlukannya.', 'Review the cable route, inspect tools and isolate power/PoE when the work requires it.'] },
  { stage: ['02 · Semasa kerja', '02 · During work'], text: ['Sokong komponen dengan betul, gunakan alat yang sesuai dan jauhkan tangan daripada bilah.', 'Support components correctly, use suitable tools and keep hands away from blades.'] },
  { stage: ['03 · Selepas kerja', '03 · After work'], text: ['Buang lebihan konduktor, pasang penutup dengan kemas, label port dan uji sambungan.', 'Remove wire offcuts, secure covers, label ports and test connectivity.'] },
];

export default function IKR3023SafetyVisual({ language = 'ms' }) {
  const en = language === 'en';
  const txt = (pair) => pair[en ? 1 : 0];
  const [openPhoto, setOpenPhoto] = useState(null);
  const [answer, setAnswer] = useState(null);
  return (
    <section className="space-y-5" data-skm3-safety="visual-v34">
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
          <div className="min-w-0">
            <h3 className="font-extrabold text-amber-950 text-base sm:text-lg">{txt(['Kenal Komponen Sebelum Mengendalikan Alat', 'Identify Components Before Using Tools'])}</h3>
            <p className="mt-1 text-sm leading-relaxed text-amber-900">{txt(['Foto sebenar membantu anda mengenal perkakasan. Ikuti langkah keselamatan, bukan bentuk foto semata-mata. Tekan gambar untuk melihat dengan lebih jelas.', 'Real photos help you identify hardware. Follow the safety procedure, not just the appearance of a photo. Tap an image to enlarge it.'])}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photoCards.map((item) => (
          <article key={item.id} className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <button type="button" className="group relative flex h-44 w-full items-center justify-center overflow-hidden bg-slate-50 p-3 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-amber-600 sm:h-48" aria-label={`${txt(['Besarkan foto', 'Enlarge photo'])}: ${txt(item.title)}`} onClick={() => setOpenPhoto(item)}>
              <img src={item.image} alt={txt(item.title)} loading="lazy" decoding="async" className="max-h-full max-w-full object-contain transition-transform duration-200 group-hover:scale-105" />
              <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-lg bg-slate-900/85 px-2 py-1 text-[11px] font-semibold text-white"><Maximize2 size={13} /> {txt(['Zum', 'Zoom'])}</span>
            </button>
            <div className="space-y-2 p-4">
              <h4 className="text-base font-bold text-slate-900">{txt(item.title)}</h4>
              <p className="text-sm leading-relaxed text-slate-600">{txt(item.caption)}</p>
              <div className="flex items-start gap-2 rounded-xl border border-emerald-100 bg-emerald-50 p-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-emerald-950"><strong>{txt(['Amalan selamat:', 'Safe practice:'])}</strong> {txt(item.safety)}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-900 p-4 sm:p-6">
        <h3 className="mb-4 text-lg font-extrabold text-white">{txt(['Aliran Kerja Selamat: Sebelum → Semasa → Selepas', 'Safe Workflow: Before → During → After'])}</h3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {workflow.map((item, i) => (
            <div key={i} className="rounded-xl border border-slate-700 bg-slate-800 p-4">
              <div className="mb-2 text-sm font-bold text-amber-300">{txt(item.stage)}</div>
              <p className="text-sm leading-relaxed text-slate-100">{txt(item.text)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-4 sm:p-5" data-skm3-safety-check="true">
        <h3 className="mb-2 flex items-center gap-2 text-base font-bold text-indigo-950"><Info size={18} /> {txt(['Semak Kefahaman (Latihan Ringkas)', 'Check Your Understanding'])}</h3>
        <p className="text-sm leading-relaxed text-indigo-950">{txt(['Anda hendak menamatkan wayar pada keystone jack menggunakan punch-down tool. Apakah tindakan paling selamat?', 'You are terminating wires on a keystone jack using a punch-down tool. Which action is safest?'])}</p>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button type="button" onClick={() => setAnswer('wrong')} aria-pressed={answer === 'wrong'} className={`rounded-xl border p-3 text-left text-sm font-semibold transition-colors ${answer === 'wrong' ? 'border-rose-500 bg-rose-100 text-rose-950' : 'border-indigo-200 bg-white text-indigo-900 hover:border-indigo-400'}`}>{txt(['Pegang jack pada tapak tangan supaya tidak bergerak.', 'Hold the jack in your palm to keep it steady.'])}</button>
          <button type="button" onClick={() => setAnswer('right')} aria-pressed={answer === 'right'} className={`rounded-xl border p-3 text-left text-sm font-semibold transition-colors ${answer === 'right' ? 'border-emerald-600 bg-emerald-100 text-emerald-950' : 'border-indigo-200 bg-white text-indigo-900 hover:border-indigo-400'}`}>{txt(['Letakkan jack pada blok penahan yang sesuai dan jauhkan jari daripada bilah.', 'Place the jack on a suitable support puck and keep fingers clear of the blade.'])}</button>
        </div>
        {answer && <p role="status" className={`mt-3 rounded-lg p-3 text-sm leading-relaxed ${answer === 'right' ? 'bg-emerald-100 text-emerald-950' : 'bg-rose-100 text-rose-950'}`}>
          {answer === 'right' ? txt(['Betul! Sokongan stabil mengurangkan risiko bilah tergelincir ke tangan.', 'Correct! Stable support reduces the risk of the blade slipping into your hand.']) : txt(['Belum tepat. Jangan tahan keystone jack menggunakan tapak tangan ketika menggunakan punch-down tool.', 'Not quite. Never hold a keystone jack in your palm while using a punch-down tool.'])}
        </p>}
        <p className="mt-2 text-xs text-indigo-700">{txt(['Latihan kendiri sahaja — tidak menambah atau mengubah markah kuiz.', 'Self-practice only — no quiz scores are saved or changed.'])}</p>
      </div>

      {openPhoto && createPortal(
        <div role="dialog" aria-modal="true" aria-label={`${txt(['Foto penuh', 'Full image'])}: ${txt(openPhoto.title)}`} className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-3 sm:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpenPhoto(null); }} onKeyDown={(event) => { if (event.key === 'Escape') setOpenPhoto(null); }}>
          <div className="relative flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white p-3 shadow-2xl sm:p-5">
            <div className="mb-2 flex items-center justify-between gap-3">
              <h3 className="min-w-0 text-sm font-bold text-slate-900 sm:text-base">{txt(openPhoto.title)}</h3>
              <button type="button" autoFocus onClick={() => setOpenPhoto(null)} aria-label={txt(['Tutup foto', 'Close photo'])} className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white hover:bg-slate-700"><X size={21} /></button>
            </div>
            <img src={openPhoto.image} alt={txt(openPhoto.title)} className="min-h-0 w-full flex-1 object-contain" />
            <p className="pt-2 text-xs leading-relaxed text-slate-600">{txt(openPhoto.caption)}</p>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
