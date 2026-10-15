import React, { useState } from 'react';
import { ArrowLeft, Cable, CheckCircle2, XCircle, RotateCcw, Activity, ShieldCheck, Lightbulb } from 'lucide-react';

// Simulasi pembelajaran, bukan laporan daripada alat penguji kabel fizikal.
// Senario disusun berasaskan topik pemasangan & pengujian IKR3023/KP(4/4).
const cases = [
  {
    title: 'Pin 4 tidak bersambung',
    indicator: ['1 ✓','2 ✓','3 ✓','4 ✕','5 ✓','6 ✓','7 ✓','8 ✓'],
    context: 'Cable tester asas memaparkan tiada sambungan bagi pin 4 pada kabel straight-through yang sepatutnya mempunyai 8 pin bersambung.',
    choices: ['Litar terbuka (open circuit) pada konduktor pin 4','Litar pintas antara pin 4 dengan pin 5','Panjang kabel pasti melebihi 100 m','Semua pasangan wayar mengalami split pair'],
    correct: 0,
    explanation: 'Pin yang tidak menunjukkan kesinambungan mencadangkan konduktor terbuka atau penamatan tidak sempurna. Periksa hujung kabel dan buat penamatan semula jika perlu.'
  },
  {
    title: 'Dua konduktor bersentuhan',
    indicator: ['1 ✓','2 SHORT 3','3 SHORT 2','4 ✓','5 ✓','6 ✓','7 ✓','8 ✓'],
    context: 'Penguji memaklumkan pin 2 dan pin 3 mempunyai sambungan antara satu sama lain yang tidak sepatutnya berlaku.',
    choices: ['Litar terbuka pada pin 7','Litar pintas (short circuit) pin 2 dengan pin 3','Crossover yang sah pada kedua-dua hujung','Isu tetapan IP pada komputer'],
    correct: 1,
    explanation: 'Short circuit berlaku apabila dua konduktor bersentuhan tanpa sepatutnya. Periksa susunan pin dan potongan konduktor pada penyambung.'
  },
  {
    title: 'Susunan pin berubah di hujung kedua',
    indicator: ['1 → 3','2 → 6','3 → 1','4 → 4','5 → 5','6 → 2','7 → 7','8 → 8'],
    context: 'Rekod wiremap menunjukkan sambungan pin 1→3, 2→6, 3→1 dan 6→2 antara kedua-dua hujung.',
    choices: ['Kabel straight-through T568B–T568B','Kabel crossover klasik T568A–T568B','Semua konduktor putus','Kabel mempunyai sambungan gentian optik'],
    correct: 1,
    explanation: 'Ini ialah wiremap crossover klasik (pertukaran pasangan 1–2 dengan 3–6). Ia bukan semestinya rosak. Peranti moden yang menyokong Auto-MDI/MDIX biasanya boleh menggunakan sambungan ini.'
  },
  {
    title: 'Continuity lulus tetapi pensijilan gagal',
    indicator: ['Wiremap: PASS','NEXT: FAIL','Return loss: PASS'],
    context: 'Penguji pensijilan mendapati bacaan NEXT melebihi had walaupun setiap konduktor mempunyai kesinambungan.',
    choices: ['Tiada masalah kerana continuity lulus','Masalah prestasi pasangan seperti pintalan dibuka terlalu jauh / penamatan tidak kemas','Masalah semestinya akibat virus komputer','Masalah semestinya disebabkan alamat IP salah'],
    correct: 1,
    explanation: 'Ujian continuity sahaja tidak mengukur prestasi kabel. NEXT yang gagal memerlukan pemeriksaan pasangan terpilin, panjang untwist, jenis komponen dan teknik penamatan dengan alat pensijilan yang sesuai.'
  },
  {
    title: 'Pautan terlalu panjang',
    indicator: ['Channel length: 118 m','Kategori: Cat6A','Sasaran 10GBASE-T: 100 m'],
    context: 'Pelan menggunakan saluran tembaga berkategori Cat6A sepanjang 118 meter untuk 10GBASE-T.',
    choices: ['Panjang ini pasti mematuhi reka bentuk 10GBASE-T 100 m','Pendekkan laluan / tambah titik pengagihan aktif yang sesuai atau guna gentian optik','Gunakan penyambung RJ45 baharu sahaja tanpa ubah jarak','Tukar warna jaket kabel kepada biru'],
    correct: 1,
    explanation: 'Saluran 10GBASE-T Cat6A standard lazimnya direka untuk panjang maksimum 100 m. Reka semula laluan atau gunakan medium yang sesuai untuk jarak tersebut.'
  },
  {
    title: 'Pelabelan kabel gagal',
    indicator: ['Patch panel: PP-01 port 12','Faceplate: Tiada label','As-built plan: Tidak dikemas kini'],
    context: 'Kabel berfungsi tetapi juruteknik tidak dapat menentukan lokasi outlet kerana rekod port dan label tidak lengkap.',
    choices: ['Tidak perlu pembetulan kerana internet berfungsi','Label kedua-dua hujung dan kemas kini pelan as-built serta rekod ujian','Buang semua label lama','Gunakan kabel crossover untuk semua outlet'],
    correct: 1,
    explanation: 'Pengurusan pengkabelan berstruktur memerlukan pelabelan dan dokumentasi supaya penyelenggaraan serta troubleshooting boleh dijalankan dengan cekap.'
  }
];

export default function CableDiagnostic({ onBack }) {
  const [index, setIndex] = useState(0);
  const [selection, setSelection] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [results, setResults] = useState([]);
  const completed = index >= cases.length;
  const current = cases[index];
  const score = results.filter(x => x.correct).length;
  const submit = () => {
    if (selection === null) return;
    if (!confirmed) { setConfirmed(true); return; }
    const next = [...results, { title: current.title, correct: selection === current.correct, selected:selection }];
    setResults(next);
    setSelection(null);
    setConfirmed(false);
    setIndex(i => i+1);
  };
  const restart = () => {setResults([]);setIndex(0);setSelection(null);setConfirmed(false);};
  return <main className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-10">
    <div className="max-w-4xl mx-auto">
      <button onClick={onBack} type="button" className="mb-6 rounded-xl bg-white border border-slate-200 px-4 py-2 flex items-center gap-2 hover:bg-slate-100 focus-visible:outline focus-visible:outline-indigo-600"><ArrowLeft size={18}/> Kembali ke Portal</button>
      <header className="bg-gradient-to-r from-indigo-950 to-blue-800 rounded-3xl text-white p-6 md:p-9 shadow-xl">
        <div className="flex gap-3 items-center text-yellow-300 text-sm font-bold uppercase tracking-widest"><Cable size={22}/> Latihan interaktif | IKR3023 KP(4/4)</div>
        <h1 className="mt-3 text-2xl md:text-4xl font-extrabold">Simulasi Diagnostik Kabel</h1>
        <p className="mt-3 text-indigo-100 max-w-2xl">Kenal pasti kerosakan dan pilihan tindakan daripada petunjuk ujian. Kes ini ialah senario latihan, bukannya sambungan langsung kepada cable tester sebenar.</p>
      </header>
      <div className="mt-6 bg-white rounded-2xl shadow p-5 md:p-7 border border-slate-200">
        {completed ? <>
          <div className="flex items-center gap-3 text-emerald-700"><ShieldCheck size={38}/><h2 className="text-2xl font-bold">Sesi selesai!</h2></div>
          <p className="text-slate-600 mt-2">Markah latihan: <strong className="text-2xl text-indigo-700">{score} / {cases.length}</strong> ({Math.round(score / cases.length * 100)}%).</p>
          <p className="text-sm text-slate-500 mt-2">Keputusan ini hanyalah latihan kendiri; tidak menggantikan penilaian amali atau pensijilan kabel sebenar.</p>
          <div className="mt-5 space-y-3">{results.map((r,i)=><div key={i} className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100">{r.correct ? <CheckCircle2 className="text-emerald-600 shrink-0"/> : <XCircle className="text-rose-600 shrink-0"/>}<span className="font-medium">{r.title}</span></div>)}</div>
          <button onClick={restart} type="button" className="mt-7 bg-indigo-700 text-white rounded-xl px-6 py-3 font-bold hover:bg-indigo-800 flex gap-2 items-center"><RotateCcw size={18}/> Cuba semula</button>
        </> : <>
          <div className="flex justify-between text-sm font-semibold text-indigo-700 mb-3"><span>Senario {index+1} / {cases.length}</span><span>{Math.round(index/cases.length*100)}% selesai</span></div>
          <div className="h-2 bg-slate-100 rounded-full mb-6"><div className="h-2 bg-indigo-600 rounded-full transition-all" style={{width:`${index/cases.length*100}%`}}/></div>
          <h2 className="text-xl md:text-2xl font-extrabold mb-3">{current.title}</h2>
          <p className="text-slate-700 mb-6 leading-relaxed">{current.context}</p>
          <section aria-label="Simulasi bacaan penguji kabel" className="bg-slate-950 text-emerald-300 rounded-2xl p-5 mb-7 shadow-inner">
            <div className="flex items-center gap-2 text-emerald-200 font-mono text-sm mb-4"><Activity size={18}/> LAPORAN UJIAN (SIMULASI)</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">{current.indicator.map((v,i)=><div key={i} className="rounded-lg border border-slate-700 bg-slate-900 p-3 font-mono text-sm text-center">{v}</div>)}</div>
          </section>
          <fieldset><legend className="font-bold mb-3">Apakah diagnosis atau tindakan paling tepat?</legend>
            <div className="space-y-3">{current.choices.map((choice,i)=><label key={i} className={`flex gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${selection===i?'border-indigo-600 bg-indigo-50':'border-slate-200 hover:border-indigo-300'}`}><input type="radio" name={`scenario-${index}`} value={i} checked={selection===i} disabled={confirmed} onChange={()=>setSelection(i)} className="mt-1 accent-indigo-600"/><span className="text-sm md:text-base">{choice}</span></label>)}</div>
          </fieldset>
          {confirmed && <div className="mt-6 bg-blue-50 rounded-xl border border-blue-200 p-4 text-sm"><div className="flex gap-2 items-center font-bold text-blue-900 mb-2"><Lightbulb size={18}/> Maklum balas segera: {selection===current.correct?'Tepat!':'Perlu semak semula'}</div><p className="text-slate-700">{current.explanation}</p></div>}
          <button type="button" onClick={submit} disabled={selection===null} className="mt-6 bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold disabled:opacity-40 hover:bg-indigo-800 focus-visible:outline focus-visible:outline-indigo-500">{!confirmed ? 'Semak Jawapan' : index===cases.length-1 ? 'Lihat Keputusan' : 'Teruskan'}</button>
        </>}
      </div>
      <p className="text-center text-xs text-slate-500 mt-6">Sumber asas: Kertas Penerangan JTM IKR3023, khususnya KP(4/4), ditambah contoh amalan pengujian moden untuk pembelajaran. Tiada data pelajar dihantar ke pelayan.</p>
    </div>
  </main>;
}
