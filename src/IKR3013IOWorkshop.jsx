import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Keyboard, Mouse, Mic, Monitor, Printer, Volume2, ScanLine, Smartphone, AlertTriangle, Wrench, Cable, Lightbulb } from 'lucide-react';

const DEVICE_DATA = [
  { id: 'keyboard', name: 'Papan kekunci', en: 'Keyboard', type: 'input', icon: Keyboard, job: 'Menaip arahan dan data', jobEn: 'Enter commands and text', tip: 'Jika gagal, semak port USB/Bluetooth dan uji pada PC lain.', tipEn: 'Check USB/Bluetooth and test on another PC.' },
  { id: 'mouse', name: 'Tetikus', en: 'Mouse', type: 'input', icon: Mouse, job: 'Mengawal penuding pada skrin', jobEn: 'Control the on-screen pointer', tip: 'Semak sambungan, sensor dan bateri model tanpa wayar.', tipEn: 'Check connection, sensor and wireless battery.' },
  { id: 'mic', name: 'Mikrofon', en: 'Microphone', type: 'input', icon: Mic, job: 'Menukar suara kepada isyarat input', jobEn: 'Capture sound as input data', tip: 'Pilih input yang betul dalam tetapan bunyi dan semak izin aplikasi.', tipEn: 'Select the correct input and app permissions.' },
  { id: 'scanner', name: 'Pengimbas', en: 'Scanner', type: 'input', icon: ScanLine, job: 'Mendigitalkan dokumen atau imej', jobEn: 'Digitize physical documents', tip: 'Semak pemandu peranti, sambungan dan aplikasi imbasan.', tipEn: 'Check driver, connection and scan app.' },
  { id: 'monitor', name: 'Monitor', en: 'Monitor', type: 'output', icon: Monitor, job: 'Memaparkan imej dan teks', jobEn: 'Display text and images', tip: 'Semak input HDMI/DisplayPort, kabel dan bekalan kuasa.', tipEn: 'Check HDMI/DisplayPort input, cable and power.' },
  { id: 'printer', name: 'Pencetak biasa', en: 'Standard printer', type: 'output', icon: Printer, job: 'Menghasilkan cetakan', jobEn: 'Produce printed output', tip: 'Semak kertas/dakwat, sambungan dan barisan cetakan.', tipEn: 'Check paper/ink, connection and print queue.' },
  { id: 'speaker', name: 'Pembesar suara', en: 'Speakers', type: 'output', icon: Volume2, job: 'Mengeluarkan bunyi', jobEn: 'Output audio', tip: 'Semak peranti output yang dipilih, tahap suara dan kabel.', tipEn: 'Check selected audio output, volume and cable.' },
  { id: 'touchscreen', name: 'Skrin sentuh', en: 'Touchscreen', type: 'both', icon: Smartphone, job: 'Memaparkan maklumat dan menerima sentuhan', jobEn: 'Display content and accept touch', tip: 'Uji paparan dan respons sentuhan secara berasingan.', tipEn: 'Test display and touch response separately.' },
];
const TYPE_LABEL = {
  input: ['Input', 'Input'], output: ['Output', 'Output'], both: ['Input + Output', 'Input + Output']
};
const CASES = [
  {
    name: 'Monitor menyala tetapi memaparkan “No Signal”.',
    en: 'The monitor is powered on but displays “No Signal”.',
    answers: [
      ['Semak kabel paparan dan pilih sumber input yang betul.', 'Check the display cable and correct input source.'],
      ['Terus tukar CPU tanpa memeriksa sambungan.', 'Replace the CPU without checking connections.'],
      ['Format Windows untuk membaiki monitor.', 'Reinstall Windows to fix the monitor.'],
    ], correct: 0,
    why: 'Pemeriksaan sambungan dan sumber input ialah langkah awal yang selamat. Jika masih gagal, uji kabel/monitor/port lain.',
    whyEn: 'Check connection and input source first. If unresolved, isolate the cable, monitor and output port.'
  },
  {
    name: 'Pencetak dikesan tetapi tugasan tidak mencetak.',
    en: 'The printer is detected but does not print.',
    answers: [
      ['Terus gantikan motherboard.', 'Immediately replace the motherboard.'],
      ['Semak barisan cetakan, status offline, kertas dan dakwat/toner.', 'Check the print queue, offline status, paper and ink/toner.'],
      ['Tanggalkan RAM secara rawak.', 'Remove the RAM at random.'],
    ], correct: 1,
    why: 'Kenal pasti punca biasa terlebih dahulu sebelum menukar komponen atau memasang semula pemacu.',
    whyEn: 'Check common causes before replacing hardware or reinstalling drivers.'
  }
];

export default function IKR3013IOWorkshop({ language = 'ms' }) {
  const en = language === 'en';
  const [filter, setFilter] = useState('all');
  const [question, setQuestion] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [caseNo, setCaseNo] = useState(0);
  const [caseAnswer, setCaseAnswer] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const exercise = DEVICE_DATA[question];
  const sc = CASES[caseNo];
  const shown = filter === 'all' ? DEVICE_DATA : DEVICE_DATA.filter(item => item.type === filter);
  const choose = (type) => {
    if (answer !== null) return;
    setAnswer(type);
    if (type === exercise.type) setCorrectCount(value => value + 1);
  };
  const nextQuestion = () => {
    setQuestion(index => (index + 1) % DEVICE_DATA.length);
    setAnswer(null);
    if (question === DEVICE_DATA.length - 1) setCorrectCount(0);
  };
  return (
    <section className="space-y-6 mt-8" data-io-workshop="skm3">
      <div className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl">
        <header className="bg-gradient-to-r from-fuchsia-900 via-purple-800 to-indigo-900 p-6 sm:p-8 text-white">
          <p className="text-xs tracking-[0.22em] font-black text-pink-200 uppercase">SKM Tahap 3 • IKR3013</p>
          <h3 className="text-2xl sm:text-3xl font-black mt-2">{en ? 'Input / Output Practical Workshop' : 'Bengkel Praktikal Input / Output'}</h3>
          <p className="text-purple-100 text-sm mt-2 max-w-2xl">{en ? 'Identify a real device, trace the data flow, then diagnose a common fault.' : 'Kenal peranti, fahami aliran data, kemudian pilih langkah pemeriksaan apabila berlaku kerosakan.'}</p>
        </header>
        <div className="p-5 sm:p-7 space-y-6">
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 sm:p-6">
            <h4 className="font-extrabold text-slate-800 mb-4">01 · {en ? 'How does information flow?' : 'Bagaimana maklumat bergerak?'}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center text-center">
              <div className="bg-pink-100 rounded-xl p-3 border border-pink-200"><Keyboard className="mx-auto text-pink-700 mb-1"/><strong className="block text-pink-950 text-sm">{en ? 'Input' : 'Peranti Input'}</strong><small className="text-pink-800">{en ? 'Enter data' : 'Masuk data'}</small></div>
              <ArrowRight className="rotate-90 sm:rotate-0 mx-auto text-slate-400"/>
              <div className="bg-indigo-100 rounded-xl p-3 border border-indigo-200"><Wrench className="mx-auto text-indigo-700 mb-1"/><strong className="block text-indigo-950 text-sm">CPU + RAM</strong><small className="text-indigo-800">{en ? 'Process data' : 'Proses data'}</small></div>
              <ArrowRight className="rotate-90 sm:rotate-0 mx-auto text-slate-400"/>
              <div className="bg-teal-100 rounded-xl p-3 border border-teal-200"><Monitor className="mx-auto text-teal-700 mb-1"/><strong className="block text-teal-950 text-sm">{en ? 'Output' : 'Peranti Output'}</strong><small className="text-teal-800">{en ? 'Show results' : 'Papar hasil'}</small></div>
            </div>
            <p className="text-xs text-slate-600 mt-3">{en ? 'A touchscreen combines display (output) and touch sensor (input).' : 'Skrin sentuh menggabungkan paparan (output) dan sensor sentuhan (input).'}</p>
          </div>
          <div>
            <div className="flex flex-wrap justify-between items-center gap-3 mb-4"><h4 className="font-extrabold text-slate-800">02 · {en ? 'Recognize devices and their role' : 'Kenali peranti dan fungsinya'}</h4><div className="flex flex-wrap gap-2">{['all','input','output','both'].map((value) => <button key={value} type="button" onClick={() => setFilter(value)} aria-pressed={filter === value} className={`rounded-full px-3 py-1.5 text-xs font-bold border ${filter === value ? 'bg-purple-800 text-white border-purple-800' : 'bg-white text-slate-700 border-slate-300'}`}>{value === 'all' ? (en ? 'All' : 'Semua') : TYPE_LABEL[value][en ? 1 : 0]}</button>)}</div></div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">{shown.map(item => { const Icon = item.icon; return <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4 hover:shadow-md transition-shadow"><div className="flex items-center justify-between"><span className={`rounded-full text-[10px] px-2 py-1 font-extrabold ${item.type === 'input' ? 'bg-pink-100 text-pink-800' : item.type === 'output' ? 'bg-teal-100 text-teal-800' : 'bg-indigo-100 text-indigo-800'}`}>{TYPE_LABEL[item.type][en ? 1 : 0]}</span><Icon className="text-slate-600" size={28}/></div><h5 className="font-extrabold text-slate-900 mt-3">{en ? item.en : item.name}</h5><p className="text-sm text-slate-700 mt-1">{en ? item.jobEn : item.job}</p><div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600"><Lightbulb size={13} className="inline mr-1 text-amber-500"/>{en ? item.tipEn : item.tip}</div></article>; })}</div>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="rounded-3xl p-5 sm:p-7 bg-white border border-slate-200 shadow-lg" data-io-quiz="classification">
          <div className="flex justify-between items-center gap-2"><h4 className="text-lg font-extrabold text-slate-800">03 · {en ? 'Sort the device' : 'Kelaskan peranti'}</h4><span className="text-xs font-bold text-slate-500">{question + 1}/{DEVICE_DATA.length} · {correctCount} {en ? "correct" : "betul"}</span></div>
          <p className="text-sm text-slate-600 mt-2">{en ? 'Which category is correct?' : 'Peranti ini tergolong dalam kategori mana?'}</p>
          <div className="rounded-xl bg-purple-50 border border-purple-100 flex items-center gap-3 p-4 my-4"><exercise.icon className="text-purple-700" size={36}/><strong className="text-purple-950">{en ? exercise.en : exercise.name}</strong></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">{['input','output','both'].map(type => <button type="button" key={type} disabled={answer !== null} onClick={() => choose(type)} className={`rounded-xl border-2 py-3 px-2 text-xs font-bold ${answer !== null && type === exercise.type ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : answer === type ? 'bg-red-50 border-red-400 text-red-800' : 'bg-white border-slate-200 text-slate-700 hover:border-purple-400'} disabled:cursor-default`}>{TYPE_LABEL[type][en ? 1 : 0]}</button>)}</div>
          {answer !== null && <div role="status" className={`mt-3 p-3 rounded-xl text-sm ${answer === exercise.type ? 'bg-emerald-50 text-emerald-900' : 'bg-amber-50 text-amber-950'}`}><CheckCircle className="inline mr-1" size={16}/>{answer === exercise.type ? (en ? 'Correct.' : 'Tepat.') : (en ? 'Try to remember:' : 'Ingat semula:')} {en ? exercise.jobEn : exercise.job}.<button type="button" className="ml-3 font-extrabold underline" onClick={nextQuestion}>{en ? 'Next →' : 'Seterusnya →'}</button></div>}
          <p className="mt-3 text-xs text-slate-500">{en ? 'Self-practice only; no official marks are stored.' : 'Latihan kendiri sahaja; tiada markah rasmi disimpan.'}</p>
        </div>
        <div className="rounded-3xl p-5 sm:p-7 bg-white border border-slate-200 shadow-lg" data-io-quiz="diagnostic">
          <h4 className="text-lg font-extrabold text-slate-800">04 · {en ? 'Technician diagnostic scenario' : 'Situasi diagnostik juruteknik'}</h4>
          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 text-amber-950 rounded-xl p-4 text-sm font-medium my-4"><AlertTriangle className="shrink-0" size={20}/><span>{en ? sc.en : sc.name}</span></div>
          <p className="text-sm text-slate-600 mb-3">{en ? 'What should you check first?' : 'Apakah tindakan pemeriksaan pertama?'}</p>
          <div className="space-y-2">{sc.answers.map((item, index) => <button type="button" disabled={caseAnswer !== null} key={index} onClick={() => setCaseAnswer(index)} className={`text-left w-full rounded-lg border p-3 text-sm ${caseAnswer !== null && index === sc.correct ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : caseAnswer === index ? 'border-red-400 bg-red-50 text-red-800' : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-indigo-400'} disabled:cursor-default`}>{String.fromCharCode(65 + index)}. {item[en ? 1 : 0]}</button>)}</div>
          {caseAnswer !== null && <div role="status" className="mt-3 bg-indigo-50 border border-indigo-100 rounded-xl p-3 text-sm text-indigo-950"><CheckCircle className="inline mr-1" size={16}/>{en ? sc.whyEn : sc.why}<button type="button" onClick={() => { setCaseNo(value => (value + 1) % CASES.length); setCaseAnswer(null); }} className="font-extrabold underline ml-2">{en ? 'Next case →' : 'Kes berikutnya →'}</button></div>}
          <p className="mt-3 text-xs text-slate-500"><Cable size={13} className="inline mr-1"/>{en ? 'Apply a logical fault isolation sequence before replacing parts.' : 'Amalkan urutan semakan yang logik sebelum menggantikan komponen.'}</p>
        </div>
      </div>
    </section>
  );
}
