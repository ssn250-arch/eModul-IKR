import React, { useState } from 'react';
import { CheckCircle, ArrowRightLeft, Info, RefreshCw } from 'lucide-react';

// Susunan pin 1..8: pandangan dengan kontak 8P8C menghadap ke atas dan klip di bawah.
export const PINOUTS = Object.freeze({
  T568A: [
    ['Putih/Hijau', '#16a34a', true], ['Hijau', '#16a34a', false],
    ['Putih/Oren', '#f97316', true], ['Biru', '#2563eb', false],
    ['Putih/Biru', '#2563eb', true], ['Oren', '#f97316', false],
    ['Putih/Coklat', '#92400e', true], ['Coklat', '#92400e', false]
  ],
  T568B: [
    ['Putih/Oren', '#f97316', true], ['Oren', '#f97316', false],
    ['Putih/Hijau', '#16a34a', true], ['Biru', '#2563eb', false],
    ['Putih/Biru', '#2563eb', true], ['Hijau', '#16a34a', false],
    ['Putih/Coklat', '#92400e', true], ['Coklat', '#92400e', false]
  ]
});

const pairs = [
  { shade: '#f97316', y: 37 }, { shade: '#16a34a', y: 59 },
  { shade: '#2563eb', y: 81 }, { shade: '#92400e', y: 103 }
];

export function TwistedPairCableDiagram({ shielded = false }) {
  return (
    <svg viewBox="0 0 310 140" className="w-full h-auto" role="img" aria-label={shielded ? 'Rajah skematik kabel berpelindung dengan empat pasang atau lapan konduktor' : 'Rajah skematik UTP empat pasang atau lapan konduktor'}>
      <rect x="4" y="11" width="122" height="119" rx="26" fill="#273449" stroke="#94a3b8" strokeWidth="2" />
      <rect x="30" y="18" width="96" height="105" rx="20" fill={shielded ? '#9ca3af' : '#0f172a'} stroke={shielded ? '#e2e8f0' : '#64748b'} strokeWidth="1.5" />
      {shielded && <><path d="M114 19 L130 13 L143 22 L143 120 L130 128 L114 121" fill="#94a3b8" stroke="#f1f5f9" strokeWidth="2"/><path d="M127 23 L130 119" stroke="#f1f5f9" strokeWidth="2" strokeDasharray="3 4"/></>}
      {pairs.map(({ shade, y }, idx) => (
        <g key={shade}>
          <path d={`M73 ${y - 5} C110 ${y - 16}, 142 ${y + 7}, 177 ${y - 5} S246 ${y + 7}, 304 ${y - 5}`} stroke="#f8fafc" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d={`M73 ${y - 5} C110 ${y - 16}, 142 ${y + 7}, 177 ${y - 5} S246 ${y + 7}, 304 ${y - 5}`} stroke={shade} strokeWidth="1.9" fill="none" strokeDasharray="4 6" />
          <path d={`M73 ${y + 5} C110 ${y + 16}, 142 ${y - 7}, 177 ${y + 5} S246 ${y - 7}, 304 ${y + 5}`} stroke={shade} strokeWidth="5" fill="none" strokeLinecap="round" />
          <title>{`Pasangan ${idx + 1}: 2 konduktor`}</title>
        </g>
      ))}
      <text x="14" y="137" fontSize="9" fill="#cbd5e1">{shielded ? 'Contoh pelindung foil (skematik)' : 'Tanpa foil pelindung (skematik)'}</text>
    </svg>
  );
}

function Pinout({ standard, label }) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-700 bg-slate-900/80 p-3 sm:p-4">
      <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
        <h6 className="font-bold text-white text-sm sm:text-base">{label}</h6>
        <span className="rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-2.5 py-1 text-xs font-bold text-cyan-200">{standard}</span>
      </div>
      <div className="w-full overflow-x-auto pb-2" role="group" aria-label={`Susunan pin ${standard}`}>
        <div className="grid grid-cols-8 gap-1.5 min-w-[336px] max-w-[520px] mx-auto">
          {PINOUTS[standard].map(([name, color, stripe], index) => (
            <div key={`${standard}-${index}`} className="flex min-w-0 flex-col items-center gap-1">
              <span className="text-white font-bold text-xs">{index + 1}</span>
              <span className="h-16 w-full rounded-md border-2 border-slate-300 shadow-inner" title={`Pin ${index + 1}: ${name}`} style={{ background: stripe ? `repeating-linear-gradient(145deg,#fff 0px,#fff 8px,${color} 8px,${color} 11px,#fff 11px,#fff 18px)` : color }} />
              <span className="text-[10px] leading-tight text-center text-slate-200 min-h-[30px]" style={{ overflowWrap: 'anywhere' }}>{name}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-2 text-[11px] text-slate-400">Nombor pin 1–8. Kabel berjalur putih ditunjukkan putih dengan jalur warna.</p>
    </div>
  );
}

export default function IKR3023CableLab() {
  const [endA, setEndA] = useState('T568B');
  const [endB, setEndB] = useState('T568B');
  const [answer, setAnswer] = useState('');
  const isStraight = endA === endB;
  const correctAnswer = isStraight ? 'straight' : 'crossover';
  const changeEnd = (setEnd, value) => { setEnd(value); setAnswer(''); };
  return (
    <section className="bg-slate-950 rounded-2xl border border-slate-700 p-4 sm:p-6 lg:p-8 text-white space-y-5" aria-labelledby="ikr3023-lab-title">
      <div>
        <span className="inline-block rounded-full bg-emerald-500/15 text-emerald-300 px-3 py-1 text-xs font-extrabold tracking-wide">LATIHAN MINI • SKM TAHAP 3</span>
        <h4 id="ikr3023-lab-title" className="text-xl sm:text-2xl font-extrabold mt-3 flex items-center gap-2"><ArrowRightLeft size={23} className="text-emerald-400"/> Lab Susunan Pin RJ45</h4>
        <p className="text-sm text-slate-300 mt-2 max-w-3xl">Pilih piawaian pada setiap hujung kabel, perhatikan lapan warna, kemudian tentukan jenis kabel. Latihan ini tidak mengubah markah penilaian utama.</p>
      </div>
      <div className="bg-slate-800/80 rounded-xl border border-slate-700 px-4 py-3 text-sm text-slate-200 flex gap-2 items-start">
        <Info size={19} className="shrink-0 text-cyan-300 mt-0.5"/>
        <p><strong>Orientasi rajah:</strong> kabel disusun kiri ke kanan bagi pin 1–8 dengan kontak emas penyambung menghadap ke atas dan klip menghadap ke bawah. Semak orientasi sebenar sebelum melakukan crimp.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[[endA, setEndA, 'Hujung A'], [endB, setEndB, 'Hujung B']].map(([value, setter, label]) => (
          <div key={label} className="min-w-0 space-y-3">
            <fieldset className="flex flex-wrap gap-2 items-center">
              <legend className="text-sm font-bold text-slate-100 mb-2">Pilih standard {label}</legend>
              {['T568A', 'T568B'].map((option) => (
                <button key={option} type="button" onClick={() => changeEnd(setter, option)} aria-pressed={value === option} className={`min-h-11 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${value === option ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-800 text-slate-200 border-slate-600 hover:border-cyan-400'}`}>{option}</button>
              ))}
            </fieldset>
            <Pinout standard={value} label={label}/>
          </div>
        ))}
      </div>
      <div className="bg-slate-900 rounded-xl border border-slate-700 p-4 sm:p-5 space-y-3">
        <h5 className="font-bold text-white">Apakah jenis kabel yang dihasilkan?</h5>
        <div className="flex flex-wrap gap-2">
          {[
            ['straight', 'Straight-through'],
            ['crossover', 'Crossover']
          ].map(([value, label]) => (
            <button key={value} type="button" onClick={() => setAnswer(value)} aria-pressed={answer === value} className={`min-h-11 px-4 py-2 rounded-lg border text-sm font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${answer === value ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200' : 'border-slate-600 text-white hover:bg-slate-800'}`}>{label}</button>
          ))}
          <button type="button" onClick={() => { setEndA('T568B'); setEndB('T568B'); setAnswer(''); }} className="min-h-11 px-3 py-2 text-sm rounded-lg text-slate-300 hover:bg-slate-800 flex items-center gap-1.5"><RefreshCw size={15}/> Semula</button>
        </div>
        {answer && (
          <div role="status" className={`rounded-lg border p-3.5 text-sm ${answer === correctAnswer ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-100' : 'bg-amber-500/10 border-amber-500/30 text-amber-100'}`}>
            <p className="font-bold flex items-center gap-2"><CheckCircle size={17}/>{answer === correctAnswer ? 'Tepat!' : 'Cuba lagi: perhatikan piawaian kedua-dua hujung.'}</p>
            <p className="mt-1">{isStraight ? 'Kedua-dua hujung menggunakan piawaian yang sama, jadi susunan pin lurus (A–A atau B–B).' : 'Satu hujung T568A dan satu lagi T568B menghasilkan crossover klasik (pasangan oren dan hijau bersilang).'}</p>
            <p className="mt-2 text-xs text-slate-300">Nota: Kebanyakan port Ethernet moden mempunyai Auto-MDI/MDIX. Crossover masih perlu difahami untuk asas pendawaian dan peralatan lama.</p>
          </div>
        )}
      </div>
    </section>
  );
}
