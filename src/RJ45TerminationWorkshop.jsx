import React, { useState } from 'react';
import { AlertTriangle, BookOpen, CheckCircle, ChevronDown, ChevronUp, Eye, RotateCcw, ShieldCheck, Wrench } from 'lucide-react';
import photoStripper from './assets/tool-photos/jacket-stripper.webp';
import photoCutter from './assets/tool-photos/wire-cutter.webp';
import photoCrimper from './assets/tool-photos/crimping-tool.webp';

// Susunan pin T568B, pada pandangan penyambung yang dilabel dengan orientasi yang konsisten.
const WIRES = [
  { key: 'wo', label: 'Putih/Oren', short: 'P-Oren', hue: '#f97316', stripe: true },
  { key: 'o', label: 'Oren', short: 'Oren', hue: '#f97316' },
  { key: 'wg', label: 'Putih/Hijau', short: 'P-Hijau', hue: '#22c55e', stripe: true },
  { key: 'b', label: 'Biru', short: 'Biru', hue: '#3b82f6' },
  { key: 'wb', label: 'Putih/Biru', short: 'P-Biru', hue: '#3b82f6', stripe: true },
  { key: 'g', label: 'Hijau', short: 'Hijau', hue: '#22c55e' },
  { key: 'wbr', label: 'Putih/Coklat', short: 'P-Coklat', hue: '#a16207', stripe: true },
  { key: 'br', label: 'Coklat', short: 'Coklat', hue: '#a16207' },
];

const STEPS = [
  { title: 'Kupas Jaket Kabel', brief: 'Tanggalkan jaket luar secukupnya dengan cable stripper tanpa mencederakan penebat konduktor.',
    photo: photoStripper, photoLabel: 'Foto alat sebenar: Cable Stripper',
    check: 'Semak tiada penebat konduktor yang terluka; jenis plug mesti sepadan dengan kabel.',
    mistake: 'Bilah terlalu dalam menyebabkan wayar dalaman terhiris.' },
  { title: 'Asingkan 4 Pasang', brief: 'Kenal pasti 4 pasangan / 8 konduktor. Buka pintalan hanya sepanjang yang perlu untuk masuk ke plug.',
    check: 'Kekalkan pintalan pasangan sehampir mungkin dengan titik penamatan.',
    mistake: 'Membuka pintalan terlalu jauh boleh menjejaskan prestasi pautan.' },
  { title: 'Susun Kod Warna T568B', brief: 'Susun kesemua lapan konduktor menurut pin 1–8. Semak arah plug dahulu.',
    check: '1 P-Oren · 2 Oren · 3 P-Hijau · 4 Biru · 5 P-Biru · 6 Hijau · 7 P-Coklat · 8 Coklat.',
    mistake: 'Susunan terbalik akibat membalikkan plug ketika melihat pin.' },
  { title: 'Potong Rata (Trim)', brief: 'Rapatkan lapan wayar lalu potong sama panjang. Sesuaikan panjang dengan jenis plug yang digunakan.',
    photo: photoCutter, photoLabel: 'Foto alat sebenar: Wire Cutter',
    check: 'Lapan hujung rata; masih cukup panjang untuk mencapai hujung plug dan jaket dikapit.',
    mistake: 'Menggunakan ukuran tetap 1.5 cm bagi semua jenis plug tidak semestinya tepat.' },
  { title: 'Masukkan ke Plug RJ45', brief: 'Gelongsorkan lapan konduktor ke lorong masing-masing hingga ke hujung plug.',
    check: 'Sahkan setiap warna, pastikan jaket berada di dalam kawasan pengapit (strain relief).',
    mistake: 'Jaket terkeluar daripada pengapit atau satu konduktor tidak sampai ke depan.' },
  { title: 'Crimp & Uji', brief: 'Gunakan slot dan alat crimping yang sesuai. Uji wiremap/continuity selepas kedua-dua hujung siap.',
    photo: photoCrimper, photoLabel: 'Foto alat sebenar: Crimping Tool',
    check: 'Periksa semua pin, susunan wiremap, dan buat semula terminasi jika ujian gagal.',
    mistake: 'Lampu tester asas menyala tidak bermakna kabel sudah lulus pensijilan prestasi Cat6.' },
];

function WireSwatch({ item, className = '' }) {
  return (
    <span className={`relative inline-block overflow-hidden rounded-md border border-slate-300 ${className}`} style={{ backgroundColor: item.stripe ? '#fff' : item.hue }} aria-hidden="true">
      {item.stripe && <span className="absolute inset-x-[37%] inset-y-0" style={{ backgroundColor: item.hue }}/>} 
    </span>
  );
}

function PairDiagram() {
  const pairs = [
    [WIRES[0], WIRES[1]], [WIRES[2], WIRES[5]], [WIRES[4], WIRES[3]], [WIRES[6], WIRES[7]],
  ];
  return <div className="grid grid-cols-4 gap-1.5 h-full p-4 items-center" role="img" aria-label="Empat pasangan kabel Ethernet: oren, hijau, biru dan coklat — lapan konduktor">
    {pairs.map(([a,b],i) => <div key={a.key} className="flex flex-col gap-1.5 items-center min-w-0">
      <div className="flex gap-0.5 justify-center h-20 items-stretch">
        <WireSwatch item={a} className="w-3 h-full rotate-[6deg]"/>
        <WireSwatch item={b} className="w-3 h-full -rotate-[6deg]"/>
      </div>
      <span className="text-[11px] font-bold text-slate-600">Pasang {i+1}</span>
    </div>)}
  </div>;
}

function PinoutDiagram({ showJacket = false }) {
  return <div className="flex flex-col items-center justify-center gap-2 p-3 h-full" role="img" aria-label="Rajah pin 1 hingga 8 susunan warna T568B, kontak emas di atas dan klip di bawah">
    <div className="text-[10px] sm:text-xs text-slate-600 font-bold tracking-wide text-center">KONTAK EMAS ↑ · KLIP ↓</div>
    <div className="flex items-stretch justify-center gap-1 rounded-xl bg-slate-200 border-2 border-slate-400 p-2 shadow-inner max-w-full">
      {WIRES.map((w, i) => <div className="flex flex-col items-center gap-1" key={w.key}>
        <span className="text-[10px] font-bold text-slate-800 tabular-nums">{i+1}</span>
        <div className="h-3 w-5 bg-amber-400 rounded-sm border border-amber-600"/>
        <WireSwatch item={w} className="h-16 w-5" />
      </div>)}
    </div>
    {showJacket && <div className="w-28 h-3 bg-sky-600 rounded-t-lg border border-sky-800" aria-hidden="true"/>}
    <span className="text-[10px] sm:text-xs text-slate-500 text-center">{showJacket ? 'Jaket kabel perlu masuk ke bawah pengapit plug.' : 'T568B • 8 konduktor • pin 1–8'}</span>
  </div>;
}

function StepVisual({ step, index }) {
  if (step.photo) return <>
    <img src={step.photo} alt={step.photoLabel} className="h-full w-full object-contain p-3 sm:p-4" loading="lazy" decoding="async" />
    <a href={step.photo} target="_blank" rel="noopener noreferrer" className="absolute bottom-2 right-2 inline-flex min-h-9 items-center gap-1 rounded-lg bg-slate-900/90 px-2.5 py-1.5 text-xs font-semibold text-white focus-visible:outline-2 focus-visible:outline-cyan-500" aria-label={`Besarkan foto ${step.title}`}><Eye size={14}/> Zoom</a>
  </>;
  if (index === 1) return <PairDiagram />;
  return <PinoutDiagram showJacket={index === 4} />;
}

function T568BPractice() {
  const [chosen, setChosen] = useState([]);
  const [checked, setChecked] = useState(false);
  const available = WIRES.filter(w => !chosen.includes(w.key));
  const correct = chosen.length === 8 && chosen.every((key,i)=>key===WIRES[i].key);
  const add = key => { if (chosen.length < 8 && !checked) setChosen(prev=>[...prev, key]); };
  const undo = () => {setChosen(prev=>prev.slice(0,-1)); setChecked(false);};
  const reset = () => {setChosen([]); setChecked(false);};
  return <section className="rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-white p-4 sm:p-6" aria-label="Simulasi susun warna T568B">
    <div className="flex flex-wrap items-center justify-between gap-3 mb-3"><div>
      <span className="text-xs font-bold tracking-widest text-cyan-700 uppercase">Mini Lab • Interaktif</span>
      <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">Susun 8 Wayar T568B</h4>
      <p className="text-sm text-slate-600 mt-1">Tekan pilihan warna satu persatu mengikut turutan pin 1 hingga 8.</p>
    </div><span className="rounded-full bg-cyan-100 text-cyan-900 font-bold text-sm px-3 py-1.5" aria-live="polite">{chosen.length}/8 pin</span></div>
    <p className="text-xs font-semibold text-slate-600 mb-3">Rujukan orientasi: kontak emas di atas, klip di bawah. Semak arah pandangan sebelum menyusun wayar.</p>
    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-4" aria-label="Susunan pin yang telah dipilih">
      {Array.from({length:8},(_,i)=>{
        const w=WIRES.find(x=>x.key===chosen[i]);
        return <div key={i} className={`rounded-xl border p-2 flex flex-col items-center gap-2 min-w-0 ${w?'bg-white border-cyan-300':'bg-slate-100 border-dashed border-slate-300'}`}>
          <span className="font-bold text-xs text-slate-600">PIN {i+1}</span>
          {w?<><WireSwatch item={w} className="w-6 h-12"/><span className="text-[10px] sm:text-[11px] text-center leading-tight font-semibold text-slate-700 break-words">{w.short}</span></>:<span className="h-[68px] flex items-center text-xs text-slate-400">—</span>}
        </div>;
      })}
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {available.map(w=><button type="button" key={w.key} onClick={()=>add(w.key)} disabled={checked} className="min-h-12 rounded-xl border border-slate-200 bg-white hover:bg-cyan-50 focus-visible:outline-2 focus-visible:outline-cyan-500 px-3 py-2 flex items-center gap-2 text-left shadow-sm disabled:opacity-60">
        <WireSwatch item={w} className="shrink-0 w-4 h-7"/><span className="text-xs sm:text-sm font-semibold text-slate-800">{w.label}</span>
      </button>)}
    </div>
    <div className="flex flex-wrap gap-2 mt-4">
      <button type="button" onClick={()=>setChecked(true)} disabled={chosen.length!==8||checked} className="min-h-11 px-4 py-2 rounded-xl bg-blue-700 text-white font-bold text-sm hover:bg-blue-800 disabled:bg-slate-300 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-blue-500">Semak Susunan</button>
      <button type="button" onClick={undo} disabled={!chosen.length || checked} className="min-h-11 px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 font-bold text-sm disabled:opacity-50">Undur Satu</button>
      <button type="button" onClick={reset} className="min-h-11 px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 font-bold text-sm flex items-center gap-1"><RotateCcw size={15}/> Cuba Semula</button>
    </div>
    {checked && <div role="status" aria-live="polite" className={`rounded-xl p-3 text-sm mt-4 border ${correct?'bg-emerald-50 border-emerald-300 text-emerald-950':'bg-amber-50 border-amber-300 text-amber-950'}`}>
      <strong>{correct?'Tahniah! Semua 8 pin tepat.':'Belum tepat. Cuba semula dan semak turutan pin.'}</strong>
      <p className="mt-1">Rujukan: {WIRES.map((w,i)=>`${i+1} ${w.short}`).join(' • ')}</p>
    </div>}
    <p className="text-xs text-slate-500 mt-4">Latihan kendiri sahaja — tidak mengubah markah penilaian atau menyimpan maklumat pelajar.</p>
  </section>;
}

const TEST_CASES = [
  { name: 'Ujian A', line: '1→1  2→2  3→3  4→4  5→5  6→6  7→7  8→8', answer:'pass', explanation:'Wiremap menunjukkan sambungan 1-ke-1 yang betul untuk kabel straight-through.' },
  { name: 'Ujian B', line: '1→1  2→2  3→3  4→—  5→5  6→6  7→7  8→8', answer:'open', explanation:'Pin 4 tidak bersambung pada hujung penerima: berkemungkinan litar terbuka atau penamatan tidak sempurna.' },
  { name: 'Ujian C', line: '1→1  2→2  3→6  4→4  5→5  6→3  7→7  8→8', answer:'miswire', explanation:'Pin 3 dan 6 tertukar. Ini ialah ralat pemetaan wayar, bukan susunan straight-through 1-ke-1.' },
];

function TesterPractice() {
  const [scenario, setScenario] = useState(0);
  const [selected, setSelected] = useState('');
  const current = TEST_CASES[scenario];
  return <section className="rounded-2xl border border-slate-700 bg-slate-900 p-4 sm:p-6 text-white" aria-label="Latihan membaca keputusan Cable Tester">
    <span className="text-xs font-bold uppercase tracking-widest text-teal-300">Troubleshooting • Cable Tester</span>
    <h4 className="text-lg sm:text-xl font-extrabold mt-1">Baca Keputusan Ujian</h4>
    <p className="text-sm text-slate-300 mt-1 mb-4">Pilih jenis keputusan berdasarkan paparan wiremap simulasi. Ini contoh latihan, bukan bacaan tester sebenar.</p>
    <div className="flex flex-wrap gap-2 mb-3">{TEST_CASES.map((item,i)=><button key={item.name} type="button" onClick={()=>{setScenario(i); setSelected('');}} className={`rounded-lg border min-h-10 px-3 text-sm font-bold ${scenario===i?'bg-cyan-500 border-cyan-400 text-slate-950':'bg-slate-800 border-slate-600 text-white'}`} aria-pressed={scenario===i}>{item.name}</button>)}</div>
    <div className="overflow-x-auto rounded-xl bg-black/50 border border-slate-600 p-3 sm:p-4 font-mono text-sm text-emerald-300 mb-4 whitespace-nowrap" aria-label={`Keputusan wiremap: ${current.line}`}>{current.line}</div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">{[
      {key:'pass',label:'PASS — 1 ke 1'}, {key:'open',label:'OPEN — Putus'}, {key:'miswire',label:'MISWIRE — Salah pin'},
    ].map(option=><button key={option.key} type="button" onClick={()=>setSelected(option.key)} aria-pressed={selected===option.key} className={`min-h-11 rounded-xl p-3 text-sm font-bold border text-left ${selected===option.key?'bg-cyan-700 border-cyan-300 text-white':'bg-slate-800 border-slate-600 text-slate-100 hover:bg-slate-700'}`}>{option.label}</button>)}</div>
    {selected && <div role="status" aria-live="polite" className={`mt-4 rounded-xl p-3 text-sm border ${selected===current.answer?'border-emerald-500/50 bg-emerald-900/30 text-emerald-100':'border-amber-500/50 bg-amber-900/30 text-amber-100'}`}><strong>{selected===current.answer?'Tepat!':'Belum tepat.'}</strong> {current.explanation}</div>}
    <p className="text-xs text-slate-400 mt-4"><AlertTriangle size={14} className="inline mr-1"/> Cable tester asas membantu mengesan sesetengah ralat sambungan. Ia tidak menggantikan alat pensijilan prestasi kategori kabel.</p>
  </section>;
}

export default function RJ45TerminationWorkshop() {
  const [expanded, setExpanded] = useState(null);
  return <div className="p-4 sm:p-6 lg:p-8 space-y-6" data-rj45-workshop="v3.6">
    <div className="flex gap-2 items-start rounded-xl bg-blue-50 border border-blue-200 p-3 sm:p-4 text-sm text-blue-950">
      <ShieldCheck size={21} className="shrink-0 mt-0.5 text-blue-700"/>
      <p><strong>Amali selamat:</strong> Sediakan kabel, plug 8P8C yang serasi, stripper, cutter, crimping tool dan tester. Semak kabel tidak disambungkan kepada sumber kuasa/PoE semasa penamatan. Gunakan alat dengan cermat.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 items-stretch">
      {STEPS.map((step, idx) => <article key={step.title} className="min-w-0 overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-shadow flex flex-col">
        <div className="relative h-48 sm:h-52 bg-slate-50 border-b border-slate-200 overflow-hidden">
          <StepVisual step={step} index={idx}/>
          <span className="absolute left-3 top-3 flex items-center justify-center h-10 w-10 rounded-xl bg-blue-700 text-white font-black text-lg shadow-lg" aria-label={`Langkah ${idx+1}`}>{idx+1}</span>
        </div>
        <div className="p-4 sm:p-5 flex flex-col flex-1 gap-3">
          <h5 className="font-extrabold text-slate-900 text-lg leading-snug">{step.title}</h5>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed flex-1">{step.brief}</p>
          <div className="flex items-center gap-1.5 text-xs text-slate-500"><BookOpen size={14}/>{step.photo?step.photoLabel:'Rajah skematik pembelajaran'}</div>
          <button type="button" className="w-full min-h-11 inline-flex items-center justify-between gap-2 rounded-xl bg-blue-50 text-blue-800 hover:bg-blue-100 px-4 py-2 text-sm font-bold focus-visible:outline-2 focus-visible:outline-blue-500" aria-expanded={expanded===idx} onClick={()=>setExpanded(expanded===idx?null:idx)}>
            Semak langkah & kesilapan {expanded===idx?<ChevronUp size={18}/>:<ChevronDown size={18}/>}
          </button>
          {expanded===idx && <div className="space-y-3 text-sm leading-relaxed" aria-live="polite">
            <p className="flex gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-emerald-950"><CheckCircle className="shrink-0 mt-0.5" size={17}/><span><strong>Periksa:</strong> {step.check}</span></p>
            <p className="flex gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-amber-950"><AlertTriangle className="shrink-0 mt-0.5" size={17}/><span><strong>Elakkan:</strong> {step.mistake}</span></p>
          </div>}
        </div>
      </article>)}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-start">
      <T568BPractice />
      <TesterPractice />
    </div>
    <div className="border border-slate-200 bg-slate-50 rounded-xl p-4 flex gap-3 items-start text-sm text-slate-700">
      <Wrench size={20} className="shrink-0 text-slate-600 mt-0.5"/>
      <p><strong>Rujukan amali:</strong> Foto alatan diambil daripada bahan sebenar yang dibekalkan pengajar. Rajah pin dan urutan kerja ialah ilustrasi pendidikan. Pastikan jenis dan orientasi penyambung sebenar disemak sebelum crimp. Latihan ini pelengkap kepada demonstrasi di bengkel.</p>
    </div>
  </div>;
}
