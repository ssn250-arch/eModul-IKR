import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ChevronLeft, ChevronRight, CircleHelp, Cpu, Expand, Eye, Lightbulb, Maximize2, Minimize2, RotateCcw, Search, ShieldCheck, Sparkles, X, Zap } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import './MotherboardExplorer.css';

// X/Y coordinates refer to the *actual user-supplied infographic photo* cropped to public/motherboard-explorer/.
// Keep images and point data together so the hotspots continue to match even when viewed offline.
export const MOTHERBOARD_PARTS = [
  {id:1, code:'MB-01', name:'Soket CPU', en:'CPU socket', x:54, y:33, role:'Tempat memasang pemproses. CPU dan jenis soket mesti serasi (contohnya LGA1700).', roleEn:'Holds the processor. The CPU and socket type must be compatible, such as LGA1700.', tip:'Jangan sentuh pin soket; semak tanda penjajaran sebelum memasang CPU.', tipEn:'Avoid touching socket pins; check the alignment mark before installing a CPU.'},
  {id:2, code:'MB-02', name:'Slot RAM / DIMM', en:'RAM / DIMM slots', x:76, y:27, role:'Slot untuk modul RAM sebagai memori kerja sementara komputer.', roleEn:'Holds RAM modules used as temporary working memory.', tip:'Periksa jenis DDR dan susunan slot yang disyorkan dalam manual.', tipEn:'Check the supported DDR type and recommended slot arrangement.'},
  {id:3, code:'MB-03', name:'Slot PCIe x16', en:'PCIe x16 slot', x:43, y:61, role:'Slot pengembangan berlebar penuh yang lazimnya digunakan untuk kad grafik.', roleEn:'Full-length expansion slot commonly used for a graphics card.', tip:'Panjang fizikal slot tidak semestinya bermaksud semua 16 lorong elektrik aktif.', tipEn:'A full-length slot does not always provide all 16 electrical lanes.'},
  {id:4, code:'MB-04', name:'Slot PCIe x1', en:'PCIe x1 slot', x:31, y:72, role:'Slot pengembangan kecil untuk kad tambahan seperti Wi-Fi, bunyi atau USB.', roleEn:'Small expansion slot for add-in cards such as Wi-Fi, sound, or USB.', tip:'Matikan bekalan kuasa dan tanggalkan kabel sebelum memasang kad.', tipEn:'Power off and unplug the system before fitting a card.'},
  {id:5, code:'MB-05', name:'Chipset', en:'Chipset', x:76, y:73, role:'Mengurus sebahagian sambungan dan ciri input/output antara CPU, storan dan peranti.', roleEn:'Manages some input/output connections and features between the CPU, storage, and devices.', tip:'Fungsi yang tersedia bergantung pada model cipset dan papan induk.', tipEn:'Available features depend on the chipset and board model.'},
  {id:6, code:'MB-06', name:'Penyambung Kuasa ATX 24-pin', en:'24-pin ATX power', x:92, y:33, role:'Penyambung utama bekalan kuasa daripada PSU ke papan induk.', roleEn:'Main power connector from the PSU to the motherboard.', tip:'Pastikan klip pengunci terpasang rapat.', tipEn:'Ensure the latch clicks fully into place.'},
  {id:7, code:'MB-07', name:'Kuasa CPU 8-pin / EPS', en:'8-pin CPU / EPS power', x:30, y:5, role:'Membekalkan kuasa khusus kepada litar pengawal voltan CPU.', roleEn:'Provides power to the CPU voltage-regulation circuitry.', tip:'Jangan kelirukan penyambung EPS CPU dengan kabel PCIe GPU.', tipEn:'Do not confuse the CPU EPS connector with a PCIe GPU power cable.'},
  {id:8, code:'MB-08', name:'Port SATA', en:'SATA ports', x:91, y:87, role:'Port data bagi HDD, SSD SATA dan pemacu optik yang serasi.', roleEn:'Data connectors for compatible HDDs, SATA SSDs, and optical drives.', tip:'Pemacu SATA memerlukan kabel data SATA serta bekalan kuasa yang sesuai.', tipEn:'SATA drives need both a SATA data cable and suitable power.'},
  {id:9, code:'MB-09', name:'Slot M.2', en:'M.2 slot', x:49, y:53, role:'Soket untuk SSD berbentuk M.2; sokongan NVMe/PCIe atau SATA bergantung pada papan induk.', roleEn:'Socket for M.2 SSDs; NVMe/PCIe or SATA support depends on the motherboard.', tip:'Periksa panjang SSD (contohnya 2280) dan jenis antaramuka.', tipEn:'Check SSD length (e.g., 2280) and interface compatibility.'},
  {id:10, code:'MB-10', name:'Bateri CMOS / RTC', en:'CMOS / RTC battery', x:56, y:91, role:'Membantu mengekalkan jam masa nyata dan sesetengah tetapan apabila kuasa utama terputus.', roleEn:'Helps maintain the real-time clock and some settings when primary power is absent.', tip:'Firmware BIOS/UEFI disimpan dalam cip memori flash, bukan di dalam bateri.', tipEn:'BIOS/UEFI firmware lives in flash memory, not in the battery.'},
  {id:11, code:'MB-11', name:'Cip BIOS / UEFI', en:'BIOS / UEFI chip', x:39, y:94, role:'Cip memori flash yang menyimpan firmware permulaan dan konfigurasi perkakasan.', roleEn:'Flash chip containing firmware used for boot and hardware setup.', tip:'Kemas kini BIOS/UEFI hanya mengikut arahan pengeluar.', tipEn:'Update BIOS/UEFI only according to the manufacturer’s instructions.'},
  {id:12, code:'MB-12', name:'Heatsink VRM', en:'VRM heatsink', x:27, y:21, role:'Membuang haba daripada komponen litar pengawalan voltan (VRM) berhampiran CPU.', roleEn:'Dissipates heat from voltage-regulator components near the CPU.', tip:'VRM mengawal bekalan voltan; heatsink membantu menyejukkannya.', tipEn:'The VRM regulates voltage; its heatsink dissipates heat.'},
  {id:13, code:'MB-13', name:'Header CPU_FAN', en:'CPU_FAN header', x:57, y:6, role:'Penyambung kuasa dan kawalan kelajuan kipas penyejuk CPU.', roleEn:'Power and speed-control connector for the CPU cooling fan.', tip:'Sambungkan kipas CPU pada header berlabel CPU_FAN.', tipEn:'Connect the CPU cooling fan to the CPU_FAN header.'},
  {id:14, code:'MB-14', name:'Header SYS_FAN', en:'SYS_FAN header', x:95, y:96, role:'Penyambung kipas sistem/casing untuk pengudaraan.', roleEn:'Connector for system/case fans to provide airflow.', tip:'Kedudukan sebenar header berbeza mengikut model papan induk.', tipEn:'Actual header location varies by motherboard model.'},
  {id:15, code:'MB-15', name:'Header Panel Hadapan', en:'Front-panel header', x:81, y:96, role:'Pin untuk butang kuasa, reset dan lampu indikator casing.', roleEn:'Pins for case power and reset buttons, and indicator LEDs.', tip:'Semak polariti pin LED menggunakan rajah manual.', tipEn:'Check LED polarity against the manual diagram.'},
  {id:16, code:'MB-16', name:'Header USB Dalaman', en:'Internal USB header', x:69, y:95, role:'Sambungan untuk port USB pada bahagian hadapan casing.', roleEn:'Connects USB ports located on the front of the case.', tip:'Jangan paksa penyambung jika orientasi pin tidak sepadan.', tipEn:'Do not force a connector if the keying does not match.'},
  {id:17, code:'MB-17', name:'Header Audio Hadapan', en:'Front-audio header', x:14, y:96, role:'Sambungan audio hadapan casing untuk fon kepala dan mikrofon.', roleEn:'Connects front-case headphone and microphone jacks.', tip:'Lazimnya dilabel AAFP atau HD_AUDIO; rujuk manual.', tipEn:'Often labelled AAFP or HD_AUDIO; check the manual.'}
];

export const REAR_IO_PORTS = [
  {id:1,code:'IO-01',name:'Port USB',en:'USB ports',x:62,y:60,role:'Sambungan data dan kuasa kepada peranti luaran seperti papan kekunci, tetikus dan pemacu USB.',roleEn:'Carries data and power for devices like keyboards, mice and USB drives.',tip:'Warna penyambung sahaja tidak menjamin versi atau kelajuan USB.',tipEn:'Connector colour alone does not guarantee USB speed or version.'},
  {id:2,code:'IO-02',name:'HDMI / DisplayPort',en:'HDMI / DisplayPort',x:39,y:56,role:'Output paparan digital ke monitor yang serasi.',roleEn:'Digital display outputs to compatible monitors.',tip:'Output papan induk memerlukan sokongan grafik daripada CPU/sistem.',tipEn:'Motherboard video outputs require supported CPU/system graphics.'},
  {id:3,code:'IO-03',name:'Port RJ45 LAN',en:'RJ45 LAN port',x:78,y:49,role:'Menyambungkan komputer ke rangkaian Ethernet menggunakan kabel rangkaian.',roleEn:'Connects a computer to an Ethernet network using a network cable.',tip:'Periksa lampu pautan LAN apabila mendiagnosis sambungan.',tipEn:'Check the LAN link light when troubleshooting connections.'},
  {id:4,code:'IO-04',name:'Jack Audio 3.5 mm',en:'3.5 mm audio jacks',x:96,y:63,role:'Sambungan analog untuk speaker, fon kepala dan mikrofon.',roleEn:'Analogue connectors for speakers, headphones and microphones.',tip:'Rujuk label warna serta manual untuk fungsi setiap jack.',tipEn:'Refer to jack colour labels and the manual.'},
  {id:5,code:'IO-05',name:'Port PS/2',en:'PS/2 port',x:10,y:43,role:'Penyambung untuk papan kekunci atau tetikus jenis lama.',roleEn:'Legacy connector for a keyboard or mouse.',tip:'Tidak semua papan induk baharu menyediakan port PS/2.',tipEn:'Not all modern boards include PS/2.'},
  {id:6,code:'IO-06',name:'Penyambung Antena Wi-Fi',en:'Wi-Fi antenna connectors',x:25,y:44,role:'Penyambung antena bagi papan induk yang menyokong Wi-Fi terbina.',roleEn:'Antenna connectors on motherboards with built-in Wi-Fi.',tip:'Pasang antena dengan kemas tanpa mengetatkan secara berlebihan.',tipEn:'Attach antennas securely without overtightening.'}
];

const QUESTIONS = [
  {tab:'board',point:1,options:[1,2,5,9]},
  {tab:'board',point:2,options:[2,3,6,10]},
  {tab:'board',point:7,options:[7,8,13,15]},
  {tab:'board',point:9,options:[9,3,11,17]},
  {tab:'board',point:10,options:[10,11,12,16]},
  {tab:'io',point:3,options:[3,1,2,6]}
];

function normalizeStatus(count,total) { return `${count} / ${total}`; }

export default function MotherboardExplorer() {
  const {language} = useLanguage();
  const en = language === 'en';
  const [tab,setTab] = useState('board');
  const [active,setActive] = useState(1);
  const [query,setQuery] = useState('');
  const [zoom,setZoom] = useState(false);
  const [viewed,setViewed] = useState(() => new Set());
  const [quiz,setQuiz] = useState(false);
  const [quizIndex,setQuizIndex] = useState(0);
  const [selected,setSelected] = useState(null);
  const [score,setScore] = useState(0);
  const [fullscreen,setFullscreen] = useState(false);
  const scrollRef = useRef(null);
  const parts = tab === 'board' ? MOTHERBOARD_PARTS : REAR_IO_PORTS;
  const current = parts.find(p=>p.id===active) || parts[0];
  const screenName = (p)=> en ? p.en : p.name;
  const screenRole = (p)=> en ? p.roleEn : p.role;
  const screenTip = (p)=> en ? p.tipEn : p.tip;
  const assetRoot = `${import.meta.env.BASE_URL}motherboard-explorer/`;
  const pick = (p) => { setActive(p.id); setViewed(old=>new Set([...old,`${tab}:${p.id}`])); };
  const chooseTab = (next) => { setTab(next); setActive(1); setQuery('');setZoom(false); if (scrollRef.current) scrollRef.current.scrollLeft=0; };
  const filtered = useMemo(()=>parts.filter(p=>`${p.id} ${p.name} ${p.en} ${p.role}`.toLowerCase().includes(query.toLowerCase())),[parts,query]);
  const question = QUESTIONS[quizIndex];
  const questionParts = question ? (question.tab === 'board' ? MOTHERBOARD_PARTS : REAR_IO_PORTS) : [];
  const target = questionParts.find(p=>p.id===question?.point);
  const finished = quiz && quizIndex >= QUESTIONS.length;
  const imagePart = quiz && !finished ? questionParts : parts;
  const shownTab = quiz && !finished ? question.tab : tab;
  const imageSrc = `${assetRoot}${shownTab === 'board' ? 'motherboard-board.webp' : 'motherboard-rear-io.webp'}`;
  const progressCount = viewed.size;
  const resetQuiz = ()=>{setQuiz(true);setQuizIndex(0);setSelected(null);setScore(0);setFullscreen(false);};
  const answer = (id)=>{ if(selected !== null) return; setSelected(id); if(id===question.point)setScore(x=>x+1);};
  const next = ()=>{setSelected(null);setQuizIndex(i=>i+1);};
  useEffect(()=>{ const esc=(e)=>{if(e.key==='Escape')setFullscreen(false);};window.addEventListener('keydown',esc);return ()=>window.removeEventListener('keydown',esc);},[]);
  return <section className="mbx" data-no-translate aria-label="Interactive Motherboard Explorer">
    <div className="mbx-hero">
      <div className="mbx-brand"><Sparkles size={15}/> IKR3013 <span>•</span> {en?'VISUAL LEARNING':'PEMBELAJARAN VISUAL'} <span className="mbx-version">EXPLORER</span></div>
      <div className="mbx-hero-row"><div><h3>{en?'Interactive Motherboard Explorer':'Interactive Motherboard Explorer'}</h3><p>{en?'Touch the numbered components on a real motherboard photo, discover their functions and try a visual quiz.':'Sentuh nombor pada foto papan induk sebenar, terokai fungsinya dan cuba kuiz visual.'}</p></div><span className="mbx-hero-icon"><Cpu size={30}/></span></div>
      <div className="mbx-hero-stats"><span><Eye size={15}/> {en?'17 board components':'17 komponen papan induk'}</span><span><Zap size={15}/> {en?'6 I/O ports':'6 port I/O'}</span><span><ShieldCheck size={15}/> {en?'Works offline':'Boleh guna offline'}</span></div>
    </div>

    <div className="mbx-shell">
      <div className="mbx-toolbar">
        <div className="mbx-tabs" role="tablist" aria-label={en?'Choose board or I/O':'Pilih papan induk atau I/O'}>
          <button type="button" className={tab==='board'&&!quiz?'is-current':''} onClick={()=>{setQuiz(false);chooseTab('board')}} role="tab" aria-selected={tab==='board'&&!quiz}><Cpu size={17}/>{en?'Motherboard':'Papan Induk'} <small>17</small></button>
          <button type="button" className={tab==='io'&&!quiz?'is-current':''} onClick={()=>{setQuiz(false);chooseTab('io')}} role="tab" aria-selected={tab==='io'&&!quiz}><Zap size={17}/> Rear I/O <small>6</small></button>
          <button type="button" className={quiz?'is-current':''} onClick={resetQuiz} role="tab" aria-selected={quiz}><CircleHelp size={17}/>{en?'Visual quiz':'Kuiz Visual'}</button>
        </div>
        <a className="mbx-reference" href={`${assetRoot}infografik-motherboard-asal.webp`} target="_blank" rel="noopener noreferrer" title={en?'Open original infographic':'Buka infografik asal'}><BookOpen size={17}/><span>{en?'Original infographic':'Infografik Asal'}</span></a>
      </div>

      {quiz && finished ? <div className="mbx-end" role="status"><div className="mbx-end-icon"><CheckCircle2 size={34}/></div><span className="mbx-small-label">{en?'VISUAL QUIZ COMPLETE':'KUIZ VISUAL SELESAI'}</span><strong>{score} / {QUESTIONS.length}</strong><p>{en?'This is a practice activity and does not replace the existing topic mastery quiz.':'Ini latihan pengukuhan dan tidak menggantikan kuiz penguasaan topik sedia ada.'}</p><div className="mbx-end-buttons"><button type="button" onClick={resetQuiz}><RotateCcw size={16}/>{en?'Try again':'Cuba Lagi'}</button><button type="button" className="mbx-light" onClick={()=>{setQuiz(false);chooseTab('board')}}><ArrowLeft size={16}/>{en?'Back to explorer':'Kembali ke Explorer'}</button></div></div> : <>
        <div className="mbx-main">
          <div className="mbx-image-column">
            <div className="mbx-image-head"><span className="mbx-caption"><span className="mbx-pulse"/>{quiz?(en?'IDENTIFY THE MARKED POINT':'KENAL PASTI TITIK BERTANDA'):(shownTab==='board'?(en?'MOTHERBOARD COMPONENT MAP':'PETA KOMPONEN PAPAN INDUK'):'REAR PANEL I/O')}</span><button type="button" className="mbx-zoom" onClick={()=>setZoom(z=>!z)}>{zoom?<Minimize2 size={15}/>:<Maximize2 size={15}/>} {zoom?(en?'Normal':'Normal'):(en?'Zoom':'Zum')}</button></div>
            <div className="mbx-scroll" ref={scrollRef} tabIndex={0} aria-label={en?'Scrollable image with numbered component markers':'Imej dengan titik komponen bernombor, boleh ditatal ke kiri dan kanan'}>
              <div className={`mbx-map ${shownTab==='io'?'mbx-map-io':'mbx-map-board'} ${zoom?'mbx-map-zoom':''}`}>
                <img src={imageSrc} alt={shownTab==='board'?'Foto motherboard sebenar dengan titik komponen bernombor':'Gambar panel port I/O belakang motherboard'} loading="lazy" draggable="false" />
                {imagePart.map(p=><button key={`${shownTab}-${p.id}`} type="button" className={`mbx-pin ${(quiz&&!finished&&question.point===p.id)?'is-quiz-target':''} ${!quiz&&active===p.id?'is-active':''} ${quiz&&question.point!==p.id?'is-muted':''}`} style={{left:`${p.x}%`,top:`${p.y}%`}} onClick={()=>{if(!quiz)pick(p)}} aria-label={quiz ? (en?'Marked quiz point':'Titik kuiz bertanda') : `${p.id}. ${screenName(p)}`} aria-pressed={!quiz&&active===p.id} disabled={quiz}>{quiz?(question.point===p.id?'?':'') :p.id}</button>)}
              </div>
            </div>
            <div className="mbx-mobile-tip"><Lightbulb size={15}/>{en?'Swipe sideways to explore; tap a numbered point.':'Leret imej ke kiri/kanan, kemudian sentuh titik bernombor.'}</div>
            <div className="mbx-map-footer"><span><CheckCircle2 size={15}/>{en?'Components explored:':'Komponen diterokai:'} <b>{normalizeStatus(progressCount,23)}</b></span><button type="button" onClick={()=>setFullscreen(true)}><Expand size={15}/>{en?'View photo':'Lihat Foto'}</button></div>
          </div>

          {quiz ? <div className="mbx-detail mbx-quiz" aria-live="polite"><div className="mbx-step-label">{en?'VISUAL QUIZ':'KUIZ VISUAL'} · {quizIndex+1}/{QUESTIONS.length}</div><div className="mbx-progress"><span style={{width:`${((quizIndex+(selected===null?0:1))/QUESTIONS.length)*100}%`}}/></div><h4>{en?`Which component is marked by “?”?`:'Apakah nama komponen yang ditandakan “?”?'}</h4><p className="mbx-muted">{en?'Look at the highlighted point in the image, then choose one answer.':'Lihat titik yang diserlahkan pada gambar dan pilih satu jawapan.'}</p><div className="mbx-choices">{question.options.map((id,idx)=>{const option=questionParts.find(p=>p.id===id);const answered=selected!==null;return <button key={id} type="button" onClick={()=>answer(id)} disabled={answered} className={answered&&id===question.point?'correct':answered&&id===selected?'wrong':''}><span>{String.fromCharCode(65+idx)}</span>{screenName(option)}{answered&&id===question.point?<CheckCircle2 size={19}/>:null}</button>;})}</div>{selected!==null&&<div className={`mbx-feedback ${selected===question.point?'is-correct':'is-incorrect'}`}><strong>{selected===question.point?(en?'Correct!':'Betul!'):(en?'Not quite.':'Belum tepat.')}</strong><p>{screenRole(target)}</p><button type="button" onClick={next}>{quizIndex===QUESTIONS.length-1?(en?'View score':'Lihat markah'):(en?'Next question':'Soalan seterusnya')}<ArrowRight size={15}/></button></div>}</div> :
          <div className="mbx-detail" aria-live="polite"><div className="mbx-detail-top"><span className="mbx-small-label">{en?'SELECTED COMPONENT':'KOMPONEN DIPILIH'}</span><span className="mbx-id">{current.code}</span></div><div className="mbx-detail-title"><span className="mbx-detail-index">{current.id}</span><h4>{screenName(current)}</h4></div><div className="mbx-section-label"><BookOpen size={15}/>{en?'Function':'Fungsi'}</div><p>{screenRole(current)}</p><div className="mbx-tip"><Lightbulb size={17}/><div><strong>{en?'Workshop tip':'Tip Amali'}</strong><span>{screenTip(current)}</span></div></div><div className="mbx-navigation"><button type="button" onClick={()=>pick(parts[(parts.indexOf(current)+parts.length-1)%parts.length])}><ChevronLeft size={16}/>{en?'Previous':'Sebelum'}</button><button type="button" onClick={()=>pick(parts[(parts.indexOf(current)+1)%parts.length])}>{en?'Next':'Seterusnya'}<ChevronRight size={16}/></button></div></div>}
        </div>
        {!quiz&&<div className="mbx-directory"><div className="mbx-directory-title"><div><h4>{en?'Component Directory':'Direktori Komponen'}</h4><p>{en?'Choose a component from the list or tap its hotspot.':'Pilih daripada senarai atau sentuh titik pada gambar.'}</p></div><label className="mbx-search"><Search size={15}/><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder={en?'Search parts...':'Cari komponen...'} aria-label={en?'Search parts':'Cari komponen'}/></label></div><div className="mbx-chip-list">{filtered.map(p=><button key={p.code} type="button" className={active===p.id?'is-active':''} onClick={()=>pick(p)}><span>{p.id}</span>{screenName(p)}</button>)}{filtered.length===0&&<p className="mbx-muted">{en?'No matching parts.':'Tiada komponen dijumpai.'}</p>}</div></div>}
      </>}
      <p className="mbx-footnote">{en?'Learning note: Exact connector layouts and supported features vary by motherboard model. Refer to your board manual.':'Nota pembelajaran: Kedudukan penyambung dan sokongan ciri berbeza mengikut model papan induk. Rujuk manual pengeluar.'}</p>
    </div>

    {fullscreen&&<div className="mbx-modal" role="dialog" aria-modal="true" aria-label={en?'Motherboard image enlargement':'Pembesaran gambar papan induk'} onClick={()=>setFullscreen(false)}><div className="mbx-modal-card" onClick={e=>e.stopPropagation()}><div className="mbx-modal-bar"><strong>{shownTab==='board'?'Motherboard / Papan Induk':'Rear Panel I/O'}</strong><button type="button" autoFocus aria-label={en?'Close image':'Tutup gambar'} onClick={()=>setFullscreen(false)}><X size={20}/></button></div><div className="mbx-modal-scroll"><img src={imageSrc} alt={en?'Detailed motherboard image':'Imej rujukan papan induk diperbesar'}/></div><p>{en?'Swipe across the image to see details.':'Leret ke kiri/kanan untuk melihat butiran imej.'}</p></div></div>}
  </section>;
}
