import React, { useState } from 'react';
import {
  ArrowLeft, ArrowRight, ShieldCheck, Search, Wrench, ClipboardCheck,
  Cpu, MemoryStick, BatteryCharging, Monitor, Check, CheckCircle2,
  XCircle, Lightbulb, ZoomIn, X, RefreshCcw, Eye, AlertTriangle,
  ClipboardList, Target, BookOpenCheck, Info
} from 'lucide-react';

/*
 * IKR3013 • Panduan amali visual SKM Tahap 3.
 * Semua ilustrasi vektor dilukis setempat; tiada permintaan rangkaian, tiada markah ditulis
 * ke localStorage/Firebase, dan tiada logik kuiz utama/Mode Juri diubah.
 * Rajah ialah ilustrasi pengajaran, bukan gambaran komponen mengikut skala sebenar.
 */

function VectorSurface({ children, title, desc }) {
  return <svg viewBox="0 0 640 340" role="img" aria-label={`${title}. ${desc}`} className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="guide-board" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#111f38"/><stop offset="1" stopColor="#1a3455"/></linearGradient>
      <linearGradient id="guide-metal" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#d9e5f2"/><stop offset="1" stopColor="#7d93ab"/></linearGradient>
      <pattern id="guide-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M 24 0 L 0 0 0 24" fill="none" stroke="#6b8bad" strokeOpacity="0.13" strokeWidth="1"/></pattern>
    </defs>
    <rect width="640" height="340" rx="18" fill="url(#guide-board)" />
    <rect width="640" height="340" rx="18" fill="url(#guide-grid)" />
    {children}
  </svg>;
}

function SvgText({ x, y, children, color='#e6eef9', size=16, weight=700, anchor='middle' }) {
  return <text x={x} y={y} textAnchor={anchor} fill={color} fontFamily="Arial, sans-serif" fontSize={size} fontWeight={weight}>{children}</text>;
}

function EsdVisual() {
  return <VectorSurface title="Amalan ESD" desc="PC dicabut kuasanya, tikar anti-statik dan gelang ESD mengikut prosedur pembumian bengkel">
    <rect x="70" y="188" width="322" height="90" rx="14" fill="#21515c" stroke="#4bcebb" strokeWidth="3" />
    <SvgText x={230} y={258} size={17}>TIKAR ESD</SvgText>
    <rect x="110" y="72" width="185" height="150" rx="15" fill="#273f57" stroke="#8da8c3" strokeWidth="4"/>
    <rect x="129" y="93" width="146" height="104" rx="8" fill="#162a42" stroke="#6386a3" strokeWidth="2"/>
    <circle cx="196" cy="145" r="35" fill="none" stroke="#37c9aa" strokeWidth="5" />
    <circle cx="196" cy="145" r="11" fill="#37c9aa" />
    {[0,90,180,270].map(angle=><path key={angle} d="M196 134 Q233 111 206 145 Z" transform={`rotate(${angle} 196 145)`} fill="#7aa3b6" />)}
    <path d="M295 180 C330 197 350 170 373 158 S423 188 464 163" stroke="#ffc868" strokeWidth="6" fill="none" strokeDasharray="5 7" strokeLinecap="round"/>
    <ellipse cx="480" cy="150" rx="29" ry="37" fill="#e5b58b" />
    <rect x="456" y="139" width="38" height="16" rx="7" fill="#52d5b5" stroke="#d7fff4" strokeWidth="2" />
    <path d="M480 188 L480 242" stroke="#e5b58b" strokeWidth="15" strokeLinecap="round" />
    <SvgText x={479} y={102} size={16}>GELANG ESD</SvgText>
    <path d="M300 213 L390 213" stroke="#b7e4ff" strokeWidth="3" strokeDasharray="5 5"/>
    <SvgText x={345} y={237} size={12}>Sambungan ikut SOP</SvgText>
    <path d="M489 258 L539 258 M506 247 L506 269 M519 247 L519 269" stroke="#ffc868" strokeWidth="5" strokeLinecap="round" />
    <path d="M514 258 L556 258" stroke="#ff7b86" strokeWidth="5"/>
    <SvgText x={521} y={297} color="#ffd08c" size={14}>Palam dicabut</SvgText>
    <SvgText x={225} y={312} size={13} color="#bed5ea">Matikan PC · Putuskan bekalan kuasa · ESD</SvgText>
  </VectorSurface>;
}

function CapacitorVisual() {
  const body=(x,damage)=> <g key={x}>
    <path d={`M${x-32} 94 L${x-32} 232 Q${x} 245 ${x+32} 232 L${x+32} 94`} fill="url(#guide-metal)" stroke="#bed1e2" strokeWidth="3"/>
    {damage==='swollen' ? <path d={`M${x-32} 94 Q${x} 53 ${x+32} 94 Q${x} 112 ${x-32} 94`} fill="#b1c0d6" stroke="#ffb960" strokeWidth="5" /> :
     <ellipse cx={x} cy="94" rx="32" ry="12" fill="#91abc2" stroke={damage==='leak'?'#fb7185':'#8be1b7'} strokeWidth="4"/>}
    <path d={`M${x-14} 91 L${x+14} 91 M${x} 83 L${x} 99`} stroke="#45627e" strokeWidth="3"/>
    <path d={`M${x-17} 240 L${x-17} 265 M${x+17} 240 L${x+17} 265`} stroke="#b5c8db" strokeWidth="3" />
    {damage==='leak' && <><path d={`M${x-12} 99 Q${x-35} 124 ${x-19} 157 Q${x-4} 150 ${x-12} 99`} fill="#e6a35a"/><path d={`M${x+15} 104 Q${x+35} 141 ${x+22} 156 Q${x+3} 137 ${x+15} 104`} fill="#e6a35a"/></>}
  </g>;
  return <VectorSurface title="Pemeriksaan kapasitor" desc="Ilustrasi kapasitor normal, kembung dan bocor sebagai tanda yang memerlukan pemeriksaan lanjut">
    <SvgText x={320} y={37} size={17}>BANDINGKAN KEADAAN FIZIKAL</SvgText>
    {body(116,'normal')}{body(320,'swollen')}{body(522,'leak')}
    <rect x="48" y="278" width="136" height="37" rx="10" fill="#13493d" stroke="#2dd4a0"/>
    <rect x="251" y="278" width="138" height="37" rx="10" fill="#5f401f" stroke="#ffc77c"/>
    <rect x="453" y="278" width="138" height="37" rx="10" fill="#672c3a" stroke="#fb8b9e"/>
    <SvgText x={116} y={302} size={15}>Normal</SvgText>
    <SvgText x={320} y={302} size={15}>Kembung</SvgText>
    <SvgText x={522} y={302} size={15}>Bocor</SvgText>
  </VectorSurface>;
}

function FanVisual() {
  const fan=(x,y,dusty)=> <g key={x}>
    <rect x={x-99} y={y-102} width="198" height="204" rx="17" fill="#142437" stroke={dusty?'#d0a27b':'#60d3bb'} strokeWidth="5"/>
    <circle cx={x} cy={y} r="84" fill="#293c52" stroke="#7892ab" strokeWidth="4" />
    {[0,60,120,180,240,300].map(a=><path key={a} d={`M${x+4} ${y-8} Q${x+73} ${y-66} ${x+51} ${y-8} Q${x+35} ${y+16} ${x+4} ${y-8}`} transform={`rotate(${a} ${x} ${y})`} fill={dusty?'#83858a':'#678faf'}/>) }
    <circle cx={x} cy={y} r="17" fill="#c9d8e7" />
    {dusty && Array.from({length:26},(_,i)=>{const a=(i*137.5)*Math.PI/180;const r=56+(i%4)*10;return <circle key={i} cx={x+Math.cos(a)*r} cy={y+Math.sin(a)*r} r={(i%3)+3} fill="#dbad80" opacity="0.85"/>;})}
  </g>;
  return <VectorSurface title="Sistem penyejukan PC" desc="Kipas berhabuk dibandingkan dengan kipas selepas dibersihkan secara selamat">
    <SvgText x={163} y={36} color="#ffd08c">SEBELUM</SvgText><SvgText x={477} y={36} color="#a8ffdd">SELEPAS</SvgText>
    {fan(165,164,true)}{fan(476,164,false)}
    <path d="M283 157 L358 157 M344 142 L358 157 L344 172" stroke="#ccdef4" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <SvgText x={165} y={305} size={14} color="#f8cf9b">Habuk tebal / aliran terhalang</SvgText>
    <SvgText x={477} y={305} size={14} color="#b7f5dc">Bilah dan ventilasi bersih</SvgText>
  </VectorSurface>;
}

function WorkflowVisual() {
  const stages=[['01','ASINGKAN','Kuasa'],['02','PERIKSA','Visual'],['03','UJI','Ikut SOP'],['04','TINDAKAN','Selamat'],['05','REKOD','Dapatan']];
  return <VectorSurface title="Aliran kerja pemeriksaan" desc="Matikan kuasa, periksa, uji dengan selamat, ambil tindakan dan rekod hasil">
    <SvgText x={320} y={47} size={19}>ALIRAN KERJA JURUTEKNIK</SvgText>
    <path d="M80 143 L558 143" stroke="#45637f" strokeWidth="9" strokeLinecap="round" />
    {stages.map(([n,l1,l2],i)=>{const x=75+i*122;return <g key={n}>
      <circle cx={x} cy="143" r="41" fill={i===4?'#166b59':'#284869'} stroke={i===4?'#72f1c9':'#b0d2ea'} strokeWidth="3"/>
      <SvgText x={x} y={151} size={22}>{n}</SvgText>
      <SvgText x={x} y={222} size={13}>{l1}</SvgText>
      <SvgText x={x} y={245} size={14} color="#bcd2e9">{l2}</SvgText>
    </g>})}
    <SvgText x={320} y={298} size={14} color="#afc5df">Jangan terus hidupkan komponen yang menunjukkan tanda kerosakan.</SvgText>
  </VectorSurface>;
}

function RamVisual() {
  const ram=(x,y,label,notch)=> <g key={label}>
    <rect x={x} y={y} width="258" height="78" rx="8" fill="#186454" stroke="#69d0b8" strokeWidth="4" />
    {Array.from({length:8},(_,i)=><rect key={i} x={x+12+i*30} y={y+10} width="24" height="34" rx="3" fill="#16293a" stroke="#3d5963"/>) }
    <rect x={x+5} y={y+65} width="248" height="11" fill="#e2bf70" />
    {Array.from({length:36},(_,i)=><path key={i} d={`M${x+7+i*6.8} ${y+65} v10`} stroke="#8f7243" strokeWidth="2"/>)}
    <rect x={x+notch} y={y+60} width="13" height="23" fill="#172b43" />
    <SvgText x={x+129} y={y-13} size={17}>{label}</SvgText>
  </g>;
  return <VectorSurface title="Jenis RAM DDR4 dan DDR5" desc="Ilustrasi takuk pada DIMM DDR4 dan DDR5 berlainan kedudukan serta tidak boleh saling mengganti">
    {ram(28,84,'DDR4',111)}{ram(352,84,'DDR5',128)}
    <path d="M148 181 L148 231 M480 181 L480 231" stroke="#ffce77" strokeWidth="3" strokeDasharray="6 5" />
    <circle cx="148" cy="242" r="11" fill="#ffce77" /><circle cx="480" cy="242" r="11" fill="#ffce77" />
    <SvgText x={320} y={286} size={15} color="#f8daa4">Takuk &amp; soket tidak sama</SvgText>
    <SvgText x={320} y={312} size={12} color="#b9cde3">Ilustrasi konsep, bukan ukuran fizikal tepat</SvgText>
  </VectorSurface>;
}

function PsuVisual() {
  return <VectorSurface title="Panduan PSU" desc="Kiraan contoh beban sistem dan ruang kapasiti PSU, serta semakan kabel dan kualiti">
    <rect x="51" y="66" width="223" height="209" rx="19" fill="#263e55" stroke="#97b6d0" strokeWidth="4"/>
    <circle cx="160" cy="159" r="78" fill="#15263b" stroke="#a5b5c8" strokeWidth="3"/>
    {[0,30,60,90,120,150].map(a=><path key={a} d="M92 159 H228" stroke="#72879e" strokeWidth="5" transform={`rotate(${a} 160 159)`}/>)}
    <circle cx="160" cy="159" r="17" fill="#a9bbca" />
    <SvgText x={160} y={302} size={15}>Bekalan kuasa (PSU)</SvgText>
    <rect x="317" y="62" width="280" height="50" rx="10" fill="#244d61" stroke="#4fcfb9" strokeWidth="2" />
    <SvgText x={457} y={93} size={18}>CPU + GPU + lain-lain</SvgText>
    <rect x="317" y="134" width="280" height="50" rx="10" fill="#33516d" stroke="#9cc5e7" strokeWidth="2" />
    <SvgText x={457} y={165} size={19}>Contoh 420 W</SvgText>
    <rect x="317" y="205" width="280" height="62" rx="10" fill="#175b4c" stroke="#5ae5bc" strokeWidth="2" />
    <SvgText x={457} y={234} size={18}>420 W × 1.25</SvgText>
    <SvgText x={457} y={255} color="#a6ffdd" size={15}>= 525 W (contoh)</SvgText>
    <path d="M275 158 L312 158" stroke="#ffc76f" strokeWidth="5" strokeLinecap="round"/>
    <SvgText x={453} y={301} size={13} color="#b8d2eb">Semak penyambung, kualiti &amp; GPU transient</SvgText>
  </VectorSurface>;
}

function CaseVisual() {
  const boards=[{x:75,y:60,w:190,h:224,label:'ATX',detail:'305 × 244 mm',c:'#65a7da'},{x:288,y:110,w:150,h:174,label:'Micro-ATX',detail:'maks. 244 × 244 mm',c:'#80d2c9'},{x:468,y:155,w:110,h:129,label:'Mini-ITX',detail:'170 × 170 mm',c:'#eab977'}];
  return <VectorSurface title="Saiz papan induk" desc="ATX, Micro-ATX dan Mini-ITX mempunyai saiz berbeza; semak sokongan casing">
    {boards.map(b=><g key={b.label}>
      <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="8" fill="#21434e" stroke={b.c} strokeWidth="4" />
      <rect x={b.x+13} y={b.y+15} width={b.w*.36} height={b.h*.28} rx="4" fill="#516c7c" stroke={b.c} strokeWidth="2" />
      <rect x={b.x+b.w*.62} y={b.y+14} width="11" height={b.h*.43} rx="3" fill="#8f9caa" />
      <rect x={b.x+12} y={b.y+b.h*.62} width={b.w*.63} height="10" rx="3" fill="#8f9caa" />
      <SvgText x={b.x+b.w/2} y={b.y+b.h-19} size={14}>{b.label}</SvgText>
      <SvgText x={b.x+b.w/2} y={314} size={11} color="#b9d5ed">{b.detail}</SvgText>
    </g>)}
  </VectorSurface>;
}

function CpuVisual() {
  const [expanded,setExpanded]=useState(false);
  const src=`${import.meta.env.BASE_URL}motherboard-explorer/motherboard-board.webp`;
  return <>
    <div className="relative mx-auto flex max-w-sm items-center justify-center overflow-hidden rounded-2xl bg-slate-950 px-6 py-3" >
      <img src={src} className="max-h-80 w-full object-contain" alt="Foto papan induk sebenar dengan soket CPU dan empat slot RAM" loading="lazy" />
      <div className="pointer-events-none absolute left-[50%] top-[34%] rounded-full border-4 border-amber-300 bg-amber-300/15 w-20 h-20" aria-hidden="true"/>
      <button type="button" onClick={()=>setExpanded(true)} className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-lg bg-slate-950/90 px-3 py-2 text-xs font-bold text-white shadow-xl hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-amber-500"><ZoomIn size={16}/> Lihat foto besar</button>
    </div>
    <p className="mt-2 text-center text-xs text-slate-500">Foto motherboard sedia ada dalam eModul-IKR. Bulatan menandakan kawasan soket CPU secara anggaran.</p>
    {expanded && <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/95 p-3 sm:p-8" role="dialog" aria-modal="true" aria-label="Foto motherboard saiz besar">
      <button type="button" autoFocus onClick={()=>setExpanded(false)} className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-lg bg-white px-4 py-3 font-bold text-slate-900"><X size={19}/> Tutup</button>
      <img src={src} className="max-h-[85vh] max-w-full object-contain" alt="Paparan besar motherboard untuk pemeriksaan soket CPU dan slot RAM" />
    </div>}
  </>;
}

const inspectionSteps=[
  {
    title:'SOP Keselamatan & ESD',tag:'Sebelum kerja',icon:ShieldCheck,
    objective:'Menyiapkan kawasan kerja dan melindungi juruteknik serta komponen.',
    points:['Matikan komputer, cabut palam daripada sumber kuasa, dan ikut arahan nyahcas pengeluar sebelum membuka casing.', 'Gunakan gelang ESD dan tikar ESD yang disambungkan kepada titik pembumian yang diluluskan mengikut SOP bengkel.', 'Elakkan permaidani, cecair dan aksesori konduktif. Jangan buka selongsong PSU; kapasitor dalaman boleh menyimpan cas.'],
    warning:'Jangan jadikan tindakan menyentuh casing sekali sahaja sebagai pengganti perlindungan ESD yang betul.',
    visual:EsdVisual,
    question:'PC telah dimatikan. Apakah tindakan PALING sesuai sebelum membuka casing?',
    choices:['Terus cabut RAM tanpa sebarang langkah tambahan','Putuskan bekalan kuasa dan sediakan kawalan ESD mengikut SOP','Buka selongsong PSU untuk memastikan kapasitor kosong'],answer:1,
    feedback:'Keselamatan elektrik dan kawalan ESD perlu disediakan sebelum menyentuh komponen dalaman.'
  },
  {
    title:'Pemeriksaan Visual Komponen',tag:'Cari tanda kerosakan',icon:Search,
    objective:'Membezakan petunjuk fizikal normal dan tidak normal.',
    points:['Cari kapasitor kembung/bocor, kesan hangus, kakisan, sambungan longgar dan kerosakan pin.', 'Perhatikan keadaan konektor dan kabel; hentikan penggunaan sekiranya terlihat bahagian terbakar atau berbau hangit.', 'Catat komponen, lokasi dan simptom sebelum membuat ujian lanjut.'],
    warning:'Kerosakan bukan semestinya kelihatan. Pemeriksaan visual sahaja tidak mengesahkan sesuatu komponen berfungsi.',
    visual:CapacitorVisual,
    question:'Kapasitor motherboard kelihatan kembung. Apakah tindakan yang selamat?',
    choices:['Terus hidupkan PC untuk melihat sama ada masih boleh digunakan','Cucuk atau tekan bahagian kapasitor yang kembung','Jangan hidupkan; rekodkan penemuan dan rujuk SOP pembaikan'],answer:2,
    feedback:'Kapasitor kembung ialah tanda kemungkinan kegagalan. Jangan menekan atau menguji melalui cubaan menghidupkan PC.'
  },
  {
    title:'Kipas, Haba & Penyelenggaraan',tag:'Cegah overheating',icon:Wrench,
    objective:'Memeriksa aliran udara serta menentukan bila penyelenggaraan diperlukan.',
    points:['Periksa habuk pada kipas, heatsink dan laluan udara. Matikan peralatan dan pastikan kipas tidak berpusing bebas semasa dibersihkan.', 'Bersihkan secara berkala mengikut keadaan habuk, penggunaan dan SOP peralatan; gunakan kaedah yang diluluskan.', 'Semak bacaan suhu dan simptom thermal throttling. Ganti thermal paste hanya apabila diperlukan semasa servis yang sesuai.', 'Kemas kini BIOS hanya jika ada keperluan dan arahan pengeluar; pastikan risiko serta proses pemulihan difahami.'],
    warning:'Jangan sembur cecair ke papan litar dan jangan membuka selongsong PSU untuk membersihkannya.',
    visual:FanVisual,
    question:'PC menjadi panas kerana heatsink berhabuk. Langkah pertama yang betul?',
    choices:['Putuskan kuasa dan bersihkan mengikut SOP','Terus buka casing semasa PC hidup dan sentuh kipas','Terus flash BIOS walaupun tiada isu BIOS'],answer:0,
    feedback:'Mulakan dengan keselamatan dan pemeriksaan punca paling munasabah, bukan menukar BIOS tanpa sebab.'
  },
  {
    title:'Ujian Selamat & Rekod Kerja',tag:'Selepas pemeriksaan',icon:ClipboardCheck,
    objective:'Melaksanakan proses pemeriksaan yang boleh diulang dan dilaporkan.',
    points:['Asingkan sumber kuasa, periksa keadaan fizikal dan pilih ujian yang selamat mengikut manual servis.', 'Kenal pasti komponen dan simptom, tetapkan tindakan pembetulan dan dapatkan pengesahan penyelia jika perlu.', 'Rekod simptom, pemeriksaan, tindakan, ujian selepas servis dan keputusan dalam borang penyelenggaraan.'],
    warning:'Elakkan membuat andaian bahawa setiap masalah boot berpunca daripada motherboard; gunakan langkah diagnostik sistematik.',
    visual:WorkflowVisual,
    question:'Selepas mengganti kipas yang rosak, apakah tindakan profesional terakhir?',
    choices:['Buang komponen asal tanpa dokumentasi','Uji fungsi dan rekod dapatan/hasil kerja','Padamkan semua rekod masalah pelanggan'],answer:1,
    feedback:'SKM menekankan amalan kerja dan bukti tugas: dokumentasikan ujian serta pengesahan hasil.'
  }
];

const selectionSteps=[
  {
    title:'CPU ↔ Motherboard',tag:'Soket & BIOS',icon:Cpu,
    objective:'Menentukan keserasian CPU dengan papan induk sebelum pembelian.',
    points:['Bandingkan model soket CPU dan motherboard; jenama yang sama sahaja TIDAK menjamin keserasian.', 'Semak senarai CPU yang disokong pengeluar, chipset dan versi BIOS minimum yang diperlukan.', 'Pastikan keserasian penyejuk CPU, prestasi VRM dan jenis RAM pada motherboard tersebut.'],
    warning:'CPU berlainan generasi boleh berkongsi jenama tetapi tidak semestinya menyokong motherboard yang sama.',
    visual:CpuVisual,
    question:'CPU dan motherboard mempunyai nama jenama yang sepadan. Apakah semakan seterusnya?',
    choices:['Semak soket, senarai CPU disokong dan versi BIOS','Pasang sahaja kerana jenama sama','Pilih berdasarkan warna motherboard'],answer:0,
    feedback:'Rujukan rasmi pengeluar motherboard ialah semakan paling selamat untuk soket, CPU dan versi BIOS.'
  },
  {
    title:'RAM DDR4 ↔ DDR5',tag:'Jenis & konfigurasi',icon:MemoryStick,
    objective:'Membezakan jenis memori dan konfigurasi yang sesuai.',
    points:['Kenal pasti soket memori pada motherboard: DDR4 dan DDR5 tidak boleh ditukar ganti.', 'Semak kapasiti maksimum, bilangan slot, jenis DIMM atau SO-DIMM dan kadar MT/s yang disokong.', 'Rujuk manual untuk susunan dual-channel dan keperluan modul memori tertentu.'],
    warning:'Takuk RAM dan slot berbeza; jangan paksa modul masuk jika tidak sepadan.',
    visual:RamVisual,
    question:'Motherboard menyokong slot DDR4 DIMM desktop sahaja. RAM manakah sesuai?',
    choices:['DDR5 DIMM 16GB','DDR4 DIMM 16GB yang sesuai dengan spesifikasi papan induk','DDR4 SO-DIMM laptop untuk semua papan induk desktop'],answer:1,
    feedback:'Jenis, form factor, kapasiti dan kelajuan memori semuanya perlu disemak.'
  },
  {
    title:'Pemilihan PSU',tag:'Beban & sambungan',icon:BatteryCharging,
    objective:'Menganggarkan kapasiti kuasa dan memastikan sambungan yang selamat.',
    points:['Anggarkan penggunaan CPU, GPU dan komponen lain berdasarkan spesifikasi serta beban sebenar; TDP bukan semestinya penggunaan maksimum.', 'Sediakan ruang kuasa tambahan yang munasabah untuk lonjakan sementara, efisiensi, penyelenggaraan dan naik taraf.', 'Semak penyambung CPU/GPU, standard PSU, perlindungan keselamatan dan kualiti pengeluar. Gunakan kabel yang sepadan dengan model PSU.'],
    warning:'Watt besar sahaja tidak menjamin PSU berkualiti. Kabel modular daripada model PSU berbeza tidak semestinya boleh ditukar ganti.',
    visual:PsuVisual,
    question:'Beban sistem DIANGGARKAN 420 W. Jika latihan menggunakan ruang tambahan 25%, berapakah nilai minimum pengiraan?',
    choices:['420 W','525 W','325 W'],answer:1,
    feedback:'420 × 1.25 = 525 W. Pilihan PSU sebenar mesti turut mempertimbangkan lonjakan beban, spesifikasi GPU, penyambung dan kualiti.'
  },
  {
    title:'Motherboard ↔ Casing',tag:'Saiz fizikal',icon:Monitor,
    objective:'Memastikan semua komponen boleh dipasang dengan ruang yang mencukupi.',
    points:['Semak spesifikasi casing: menyokong ATX, Micro-ATX atau Mini-ITX yang dipilih.', 'Semak panjang GPU, ketinggian penyejuk CPU, ruang radiator dan bilangan slot storan.', 'Rancang laluan udara dan kemudahan servis sebelum membuat pembelian.'],
    warning:'Casing yang besar tidak semestinya menyokong semua radiator, penyejuk atau panjang GPU.',
    visual:CaseVisual,
    question:'Sebuah casing hanya menyokong Mini-ITX. Pilihan manakah paling tepat?',
    choices:['Motherboard ATX penuh','Motherboard Micro-ATX tanpa semakan','Motherboard Mini-ITX yang memenuhi spesifikasi casing'],answer:2,
    feedback:'Baca senarai saiz papan induk yang disokong pada spesifikasi casing, bukan meneka berdasarkan gambar.'
  }
];

const diagnosticInfo={
  normal:'Permukaan biasanya rata tanpa tanda kebocoran yang jelas. Masih perlu ujian jika terdapat simptom kerosakan.',
  swollen:'Bahagian atas kelihatan membonjol. Ini petunjuk komponen bermasalah; jangan hidupkan sistem sehingga disemak.',
  leak:'Kesan cecair atau residu di bahagian kapasitor memerlukan pemeriksaan lanjut dan tindakan mengikut SOP.'
};

function KeyFinding({ step }) {
  return <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-950" role="note">
    <div className="mb-1 flex items-center gap-2 text-sm font-extrabold"><AlertTriangle size={17} /> Perhatian keselamatan / keserasian</div>
    <p className="text-sm leading-relaxed">{step.warning}</p>
  </div>;
}

function WorkshopGuide({ mode, onBack, demoMode=false }) {
  const isInspect=mode==='inspection';
  const steps=isInspect?inspectionSteps:selectionSteps;
  const [index,setIndex]=useState(0);
  const [answers,setAnswers]=useState({});
  const [diagnostic,setDiagnostic]=useState(null);
  const [showRecap,setShowRecap]=useState(false);
  const step=steps[index];
  const StepIcon=step.icon;
  const Visual=step.visual;
  const count=steps.reduce((sum,s,i)=>sum+(answers[i]===s.answer?1:0),0);
  const answered=Object.keys(answers).length;
  const selected=answers[index];
  const goStep=(n)=>{setIndex(n);setDiagnostic(null);setShowRecap(false);};
  const restart=()=>{setAnswers({});setIndex(0);setDiagnostic(null);setShowRecap(false);};
  return <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
    <div className={`relative overflow-hidden bg-gradient-to-br ${isInspect?'from-slate-950 via-amber-900 to-amber-700':'from-slate-950 via-violet-900 to-indigo-700'} p-5 text-white sm:p-8`}>
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border-[45px] border-white/5" />
      <button type="button" onClick={onBack} className="relative mb-6 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white"><ArrowLeft size={17}/> Menu IKR3013</button>
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest"><Target size={13}/> SKM Tahap 3 · Visual Learning</div>
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">{isInspect?'Prosedur Pemeriksaan':'Panduan Pemilihan'}</h2>
          <p className="mt-2 text-sm leading-relaxed text-white/85 sm:text-base">{isInspect?'Belajar pemeriksaan perkakasan yang selamat: lihat, kenal pasti, lakukan dan rekod.':'Pilih komponen PC yang serasi berdasarkan spesifikasi, bukan jenama atau gambar semata-mata.'}</p>
        </div>
        <div className="w-fit rounded-2xl border border-white/25 bg-white/10 px-5 py-3 text-center backdrop-blur-sm">
          <div className="text-3xl font-black">{count}<span className="text-lg text-white/60">/4</span></div>
          <div className="text-[11px] font-bold uppercase tracking-wider">Jawapan tepat</div>
        </div>
      </div>
      <p className="relative mt-5 flex items-center gap-2 text-xs font-medium text-white/80"><Info size={15}/>{demoMode?'Pratonton Mod Juri: latihan tidak direkod.':'Latihan kendiri: tidak mempengaruhi markah kuiz utama atau kemajuan pelajar.'}</p>
    </div>
    <div className="p-4 sm:p-7">
      <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4" role="group" aria-label="Pilih langkah pembelajaran">
        {steps.map((s,i)=>{const chosen=answers[i];const done=chosen===s.answer;const active=i===index;const Ico=s.icon;return <button type="button" key={s.title} onClick={()=>goStep(i)} aria-current={active?'step':undefined} className={`rounded-xl border p-3 text-left transition focus-visible:outline-2 focus-visible:outline-blue-600 ${active?isInspect?'border-amber-400 bg-amber-50 ring-2 ring-amber-200':'border-violet-400 bg-violet-50 ring-2 ring-violet-200':'border-slate-200 bg-white hover:border-slate-400'}`}>
          <div className="mb-2 flex items-center justify-between"><span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-xs font-black text-white">{i+1}</span>{chosen!==undefined?(done?<CheckCircle2 className="text-emerald-600" size={18}/>:<XCircle className="text-rose-500" size={18}/>):<Ico size={18} className="text-slate-500"/>}</div>
          <p className="text-sm font-extrabold leading-tight text-slate-800">{s.title}</p>
          <p className="mt-1 text-[11px] text-slate-500">{s.tag}</p>
        </button>})}
      </div>
      <div className="mb-5 flex items-center gap-3 rounded-xl bg-slate-100 p-3 text-sm text-slate-800"><div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isInspect?'bg-amber-100 text-amber-700':'bg-violet-100 text-violet-700'}`}><StepIcon size={22}/></div><div><span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">Objektif langkah {index+1}</span><span className="font-semibold">{step.objective}</span></div></div>
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.12fr_1fr]">
        <section aria-label="Rajah pembelajaran" className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3"><span className="inline-flex items-center gap-2 text-sm font-extrabold text-slate-800"><Eye size={17}/> Rajah / contoh visual</span><span className="text-[11px] font-semibold text-slate-500">{index+1} / 4</span></div>
          <div className="px-2 pb-2 sm:px-3"><Visual /></div>
          {isInspect&&index===1 && <div className="border-t border-slate-200 bg-white p-4">
            <p className="mb-2 text-xs font-bold text-slate-700">Kenali tanda kerosakan — pilih keadaan kapasitor:</p>
            <div className="grid grid-cols-3 gap-2">{[['normal','Normal'],['swollen','Kembung'],['leak','Bocor']].map(([id,label])=><button key={id} type="button" onClick={()=>setDiagnostic(id)} aria-pressed={diagnostic===id} className={`rounded-lg border px-2 py-2 text-xs font-bold ${diagnostic===id?'border-amber-500 bg-amber-100 text-amber-900':'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'}`}>{label}</button>)}</div>
            {diagnostic&&<p className="mt-3 rounded-lg bg-slate-100 p-3 text-xs leading-relaxed text-slate-700" role="status">{diagnosticInfo[diagnostic]}</p>}
          </div>}
          <div className="bg-slate-100 px-4 py-3 text-xs leading-relaxed text-slate-600"><Info size={14} className="mr-1 inline"/> Ilustrasi untuk pembelajaran; rujuk manual peralatan sebenar semasa amali.</div>
        </section>
        <section aria-label="Langkah kerja dan fakta penting" className="space-y-4">
          <div className="rounded-2xl border border-slate-200 p-4 sm:p-5">
            <div className="mb-3 flex items-center gap-2 text-base font-black text-slate-900"><ClipboardList size={19} className={isInspect?'text-amber-600':'text-violet-600'}/> Apa yang perlu dibuat?</div>
            <ol className="space-y-3">{step.points.map((p,i)=><li className="flex gap-3 text-sm leading-relaxed text-slate-700" key={p}><span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-black ${isInspect?'bg-amber-100 text-amber-800':'bg-violet-100 text-violet-800'}`}>{i+1}</span><span>{p}</span></li>)}</ol>
          </div>
          <KeyFinding step={step}/>
        </section>
      </div>
      <div className="mt-6 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-4 sm:p-6" aria-label="Latihan kefahaman">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-black text-blue-800"><BookOpenCheck size={15}/> UJI KEFAHAMAN · SOALAN {index+1}/4</div>
        <h3 className="mb-4 text-base font-extrabold leading-snug text-slate-900 sm:text-lg">{step.question}</h3>
        <div className="grid gap-2">{step.choices.map((choice,i)=>{const checked=selected===i;const correct=step.answer===i;return <button key={choice} type="button" disabled={selected!==undefined} onClick={()=>setAnswers(a=>({...a,[index]:i}))} className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left text-sm font-medium leading-relaxed transition ${selected!==undefined&&correct?'border-emerald-500 bg-emerald-50 text-emerald-950':checked?'border-rose-400 bg-rose-50 text-rose-900':'border-slate-200 bg-white text-slate-700 hover:border-blue-400 disabled:opacity-80'}`}><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-current text-xs font-black">{String.fromCharCode(65+i)}</span><span className="flex-1">{choice}</span>{selected!==undefined&&correct&&<Check size={18} className="shrink-0 text-emerald-600"/>}{selected!==undefined&&checked&&!correct&&<XCircle size={18} className="shrink-0 text-rose-500"/>}</button>})}</div>
        {selected!==undefined&&<div role="status" className={`mt-4 rounded-xl border p-4 text-sm ${selected===step.answer?'border-emerald-200 bg-emerald-100 text-emerald-900':'border-amber-200 bg-amber-100 text-amber-950'}`}><div className="mb-1 flex items-center gap-2 font-extrabold">{selected===step.answer?<CheckCircle2 size={19}/>:<Lightbulb size={19}/>} {selected===step.answer?'Betul! Syabas.':'Belum tepat. Lihat jawapan dan sebabnya.'}</div>{step.feedback}{selected!==step.answer&&<button type="button" onClick={()=>setAnswers(a=>{const next={...a};delete next[index];return next;})} className="mt-3 block rounded-lg bg-white px-3 py-2 text-xs font-bold text-slate-800 shadow-sm hover:bg-slate-50"><RefreshCcw size={13} className="mr-1 inline"/> Cuba semula soalan ini</button>}</div>}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <button type="button" disabled={index===0} onClick={()=>goStep(index-1)} className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"><ArrowLeft size={17}/> Sebelumnya</button>
        {index<3?<button type="button" onClick={()=>goStep(index+1)} className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black text-white shadow-md ${isInspect?'bg-amber-600 hover:bg-amber-700':'bg-violet-700 hover:bg-violet-800'}`}>Langkah seterusnya <ArrowRight size={17}/></button>:<button type="button" onClick={()=>setShowRecap(true)} className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-black text-white hover:bg-emerald-800"><ClipboardCheck size={17}/> Rumusan latihan</button>}
      </div>
      {showRecap&&<div role="status" className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
        <h3 className="flex items-center gap-2 text-lg font-extrabold text-emerald-900"><ClipboardCheck size={23}/> Rumusan kendiri</h3>
        <p className="mt-2 text-sm text-slate-700">{answered} daripada 4 soalan dijawab. <strong>{count} jawapan tepat.</strong> {answered<4?'Buka semua langkah untuk melengkapkan latihan.':'Baca semula nota bagi soalan yang kurang tepat sebelum amali sebenar.'}</p>
        <div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={restart} className="inline-flex items-center gap-2 rounded-lg bg-emerald-800 px-4 py-2 text-xs font-bold text-white"><RefreshCcw size={14}/> Cuba semula</button><button type="button" onClick={onBack} className="rounded-lg border border-emerald-500 px-4 py-2 text-xs font-bold text-emerald-900">Kembali ke menu</button></div>
      </div>}
    </div>
  </div>;
}

export function InspectionWorkshopGuide(props){return <WorkshopGuide mode="inspection" {...props}/>;}
export function SelectionWorkshopGuide(props){return <WorkshopGuide mode="selection" {...props}/>;}
