import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, 
  CircuitBoard, 
  HardDrive, 
  MemoryStick, 
  CheckCircle, 
  ChevronRight, 
  ArrowLeft, 
  Zap, 
  BookOpen, 
  AlertTriangle,
  Award,
  ShoppingCart,
  ExternalLink,
  Download,
  Laptop, 
  Monitor, 
  MonitorPlay, 
  Briefcase, 
  GraduationCap, 
  PenTool, 
  Check, 
  RotateCcw, 
  Search, 
  Sparkles, 
  ArrowUpRight, 
  ShieldCheck, 
  Home,
  Box,
  QrCode,
  Maximize,
  Minimize,
  Calculator,
  ArrowRightLeft,
  Database,
  Users,
  GitBranch,
  Gauge,
  Star,
  Crown,
  Layers,
  Wrench,
  Unlock,
  Lock,
  ArrowDown,
  Share2,
  Settings,
  Plug,
  Battery,
  Usb,
  Printer,
  Globe,
  Volume2,
  Smartphone,
  Server,
  Clock,
  TrendingUp,
  Save,
  Link,
  BatteryCharging,
  Fan,
  Thermometer,
  ThermometerSnowflake,
  Wind,
  Droplets,
  ShieldAlert,
  AppWindow,
  Terminal,
  Mouse,
  Keyboard,
  Headphones
} from 'lucide-react';

// ==========================================
// DATA UTAMA: NOTA IKR3013
// ==========================================
const topics = [
  {
    id: 'cpu',
    title: 'Unit Pemprosesan Pusat (CPU)',
    icon: <Cpu size={40} />,
    color: 'bg-blue-600',
    description: 'Otak komputer yang melakukan pengiraan dan mengawal sistem.',
    content: {
      basics: [
        {
          title: "Definisi & Fungsi",
          points: [
            "Berfungsi sebagai 'otak' komputer.",
            "Merupakan cip IC yang mengawal keseluruhan sistem, melakukan pengiraan, dan menjalankan tugas.",
            "Memerlukan papan induk, bekalan kuasa dan memori kerja untuk melaksanakan tugas; HDD atau SSD digunakan untuk menyimpan data dan perisian secara kekal."
          ]
        }
      ],
      advanced: [
        { title: "Hybrid Architecture CPU", desc: "Sesetengah CPU moden menggunakan seni bina hibrid yang menggabungkan P-core (prestasi) dan E-core (kecekapan); reka bentuk berbeza mengikut model dan pengeluar." },
        { title: "NPU AI Processor", desc: "Processor terkini (seperti Intel Core Ultra & Ryzen AI) mempunyai cip khas untuk AI secara terbina." },
        { title: "Nanometer Technology", desc: "Nama nod pembuatan seperti 3 nm dan 5 nm ialah penamaan generasi proses; bukan ukuran literal panjang setiap transistor. Kecekapan bergantung pada seni bina dan reka bentuk cip." }
      ]
    }
  },
  {
    id: 'motherboard',
    title: 'Papan Induk (Motherboard)',
    icon: <CircuitBoard size={40} />,
    color: 'bg-emerald-600',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    description: 'Tulang belakang yang menghubungkan semua komponen.',
    content: {
      basics: [], 
      advanced: [
        { title: "PCIe 5.0", desc: "PCIe 5.0 digunakan pada banyak PC berprestasi tinggi dan menawarkan dua kali kadar pemindahan per lorong berbanding PCIe 4.0. Spesifikasi PCIe 6.0 dan 7.0 juga telah diterbitkan, tetapi penggunaan pada PC pengguna berbeza mengikut peranti." },
        { title: "Wi-Fi 7 Technology", desc: "Sesetengah papan induk moden menyediakan Wi-Fi 7 terbina; prestasi sebenar bergantung pada penghala, jalur frekuensi, gangguan dan keserasian peranti." },
        { title: "DDR5 Motherboard Support", desc: "Papan induk terkini menyokong slot memori DDR5 yang jauh lebih pantas." }
      ]
    }
  },
  {
    id: 'ram',
    title: 'Memori (RAM)',
    icon: <MemoryStick size={40} />,
    color: 'bg-purple-600',
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=800&q=80',
    description: 'Menyimpan data sementara untuk akses pantas oleh CPU.',
    content: {
      basics: [], 
      advanced: [
        { title: "DDR5 RAM", desc: "DDR5 ialah generasi RAM arus perdana moden; kadar pemindahan data dinyatakan dalam MT/s (contohnya DDR5-4800 = 4,800 MT/s), bukan semestinya frekuensi jam 4,800 MHz. Banyak modul DDR5 mempunyai PMIC." },
        { title: "CAMM2 Memory", desc: "CAMM2 ialah bentuk modul memori alternatif bagi sesetengah komputer riba dan peranti; ia belum menggantikan SO-DIMM pada semua model." },
        { title: "ECC On-Die DDR5", desc: "DDR5 biasanya mempunyai on-die ECC untuk mengesan dan membetulkan ralat dalaman cip DRAM. Ini tidak sama dengan ECC RAM sistem yang melindungi laluan data antara modul dan pengawal memori." }
      ]
    }
  },
  {
    id: 'storage',
    title: 'Storan (HDD & SSD)',
    icon: <HardDrive size={40} />,
    color: 'bg-orange-500',
    image: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&w=800&q=80',
    description: 'Menyimpan data kekal (OS, Fail, Gambar).',
    content: {
      basics: [], 
      advanced: [
        { title: "NVMe Gen 5 SSD", desc: "SSD PCIe 5.0 NVMe berprestasi tinggi boleh mencapai bacaan berurutan melebihi 12,000 MB/s pada model tertentu; prestasi sebenar bergantung pada model, suhu dan sistem." },
        { title: "3D NAND QLC PLC", desc: "3D NAND menyusun lapisan sel memori secara menegak; QLC dan PLC pula merujuk bilangan bit setiap sel. Kapasiti, ketahanan dan prestasi berbeza mengikut reka bentuk SSD." },
        { title: "DirectStorage Technology", desc: "Microsoft DirectStorage mengoptimumkan laluan input/output dan pemprosesan data permainan untuk mengurangkan overhead CPU; hasilnya bergantung pada permainan, GPU, storan dan sokongan sistem." }
      ]
    }
  },
  {
    id: 'psu',
    title: 'Bekalan Kuasa (PSU)',
    icon: <BatteryCharging size={40} />,
    color: 'bg-amber-500',
    description: 'Nadi utama yang menyalurkan elektrik secara stabil.',
    content: {
      basics: [], 
      advanced: [
        { title: "ATX 3.0 Standard", desc: "ATX 3.0 memperkenalkan keperluan untuk lonjakan kuasa GPU; ATX 3.1 mengemas kini spesifikasi berkaitan, termasuk sokongan penyambung 12V-2x6 pada PSU yang berkenaan." },
        { title: "12VHPWR Cable", desc: "12VHPWR digunakan pada sebahagian GPU moden; penyambung 12V-2x6 ialah reka bentuk yang dikemas kini. Gunakan kabel mengikut spesifikasi PSU dan GPU, serta pastikan penyambung terpasang sepenuhnya." },
        { title: "Titanium Efficiency", desc: "Tahap kecekapan premium yang membazirkan sangat sedikit haba berbanding PSU biasa." }
      ]
    }
  },
  {
    id: 'cooling',
    title: 'Sistem Penyejukan',
    icon: <Fan size={40} />,
    color: 'bg-cyan-500',
    description: 'Mengawal haba agar komponen tidak terlalu panas.',
    content: {
      basics: [], 
      advanced: [
        { title: "Custom Loop Water Cooling", desc: "Sistem penyejukan air tegar yang direka khas dan disambung sendiri oleh pengguna secara manual. Harga premium dan estetik." },
        { title: "Liquid Metal Thermal Paste", desc: "Logam cecair boleh menawarkan kekonduksian haba tinggi tetapi biasanya mengalirkan elektrik dan berisiko merosakkan komponen jika terkena litar. Tidak sesuai untuk amali pemula tanpa pengawasan." },
        { title: "Vapor Chamber Technology", desc: "Ruang wap nipis di dalam heatsink laptop berprestasi tinggi yang sangat cekap menyebarkan haba berbanding paip haba tembaga konvensional." }
      ]
    }
  },
  {
    id: 'os',
    title: 'Sistem Operasi (OS)',
    icon: <AppWindow size={40} />,
    color: 'bg-indigo-600',
    description: 'Perisian utama yang menjadi nyawa & pengurus sistem komputer.',
    content: {
      basics: [
        {
          title: "Definisi & Peranan",
          points: [
            "Perisian sistem yang menguruskan perkakasan komputer dan sumber perisian.",
            "Menyediakan antara muka (GUI atau CLI) antara pengguna dan perkakasan fizikal.",
            "Contoh popular: Windows (PC), macOS (Apple), Linux (Server), Android/iOS (Telefon)."
          ]
        }
      ], 
      advanced: [
        { title: "Seni Bina Kernel", desc: "Teras sistem operasi yang mengawal akses penuh kepada CPU, memori, dan peranti I/O secara langsung." },
        { title: "Sistem Fail (File System)", desc: "Format logikal untuk menyusun data. Cth: NTFS (Windows), APFS (macOS), ext4 (Linux)." },
        { title: "Virtualization (Mesin Maya)", desc: "Teknologi yang membenarkan satu komputer fizikal menjalankan beberapa OS berbeza secara serentak (Hypervisor)." }
      ]
    }
  },
  {
    id: 'io',
    title: 'Perkakasan Input & Output',
    icon: <Mouse size={40} />,
    color: 'bg-pink-600',
    description: 'Peralatan luaran untuk berinteraksi dan memaparkan data.',
    content: {
      basics: [
        {
          title: "Kategori Perkakasan I/O",
          points: [
            "Input: Memasukkan arahan/data ke dalam PC (Cth: Papan kekunci, Tetikus, Pengimbas, Mikrofon).",
            "Output: Memaparkan dan mengeluarkan hasil pemprosesan (Cth: Monitor, Pencetak, Pembesar suara).",
            "Input & Output (Dwifungsi): Skrin Sentuh, Cermin mata VR."
          ]
        }
      ], 
      advanced: [
        { title: "Teknologi Paparan OLED & MicroLED", desc: "Monitor moden dengan piksel yang menyala sendiri, memberikan warna hitam mutlak dan kontras tinggi." },
        { title: "Kadar Polling (Polling Rate)", desc: "Kelajuan peranti input melapor kedudukan kepada PC (contoh tetikus gaming: 1000Hz hingga 8000Hz)." },
        { title: "Suis Papan Kekunci Mekanikal", desc: "Suis fizikal individu di bawah setiap kekunci (Linear, Tactile, Clicky) untuk ketepatan dan respons yang laju." }
      ]
    }
  }
];


const TOPIC_QUIZ_POOLS = {
  cpu: [
    { question: 'Apakah fungsi utama CPU?', options: ['Menyimpan data kekal', 'Memproses arahan dan mengawal operasi sistem', 'Mencetak dokumen', 'Menghubungkan kabel rangkaian'], correct: 1 },
    { question: 'Apakah maksud CPU sering dipanggil sebagai “otak komputer”?', options: ['Kerana CPU membekalkan kuasa elektrik', 'Kerana CPU menyimpan semua fail pengguna', 'Kerana CPU mengawal pemprosesan data dan arahan', 'Kerana CPU menukar data kepada bunyi'], correct: 2 },
    { question: 'Antara berikut, yang manakah komponen yang bekerjasama rapat dengan CPU semasa pemprosesan?', options: ['RAM', 'Casing', 'Mouse pad', 'Trunking'], correct: 0 },
    { question: 'Apakah kelebihan umum seni bina P-core dan E-core pada sesetengah CPU moden?', options: ['Menggantikan monitor', 'Mengimbas virus secara automatik', 'Mengimbangi prestasi dan kecekapan tenaga', 'Menambah kapasiti storan HDD'], correct: 2 },
    { question: 'Apakah yang dimaksudkan dengan NPU pada pemproses moden?', options: ['Network Power Unit', 'Neural Processing Unit', 'New Peripheral Utility', 'Normal Processing Utility'], correct: 1 },
    { question: 'Apakah yang paling penting sebelum memasang CPU pada papan induk?', options: ['Pastikan soket CPU serasi', 'Pastikan SSD sudah diformat', 'Pastikan speaker aktif', 'Pastikan kabel RJ45 diuji'], correct: 0 }
  ],
  motherboard: [
    { question: 'Apakah fungsi utama papan induk?', options: ['Menggantikan RAM', 'Menghubungkan semua komponen utama komputer', 'Menyimpan sistem operasi secara kekal', 'Menstabilkan sambungan Wi‑Fi'], correct: 1 },
    { question: 'Antara berikut, yang manakah slot pengembangan pada motherboard?', options: ['RJ45', 'PCIe', 'VGA', 'Power button'], correct: 1 },
    { question: 'Apakah maksud ATX dan Micro‑ATX?', options: ['Jenis kabel kuasa', 'Format saiz papan induk', 'Jenis sistem operasi', 'Format fail'], correct: 1 },
    { question: 'Papan induk DDR5 hanya menerima RAM jenis…', options: ['DDR3', 'DDR4', 'DDR5', 'SDRAM lama'], correct: 2 },
    { question: 'Apakah firmware asas pada motherboard?', options: ['Photoshop', 'BIOS/UEFI', 'Driver Printer', 'VLAN'], correct: 1 },
    { question: 'Wi‑Fi 7 terbina pada sesetengah motherboard merujuk kepada…', options: ['Perisian antivirus', 'Sambungan rangkaian tanpa wayar', 'Jenis heatsink', 'Port audio'], correct: 1 }
  ],
  ram: [
    { question: 'Apakah fungsi RAM?', options: ['Storan kekal untuk gambar', 'Menyimpan data sementara yang sedang digunakan', 'Membekalkan kuasa kepada CPU', 'Mengawal suhu casing'], correct: 1 },
    { question: 'Apakah kesan utama jika komputer mempunyai RAM terlalu sedikit?', options: ['Paparan menjadi 8K', 'Prestasi multitugas menjadi perlahan', 'CPU bertukar kepada AMD', 'Port USB tidak berfungsi'], correct: 1 },
    { question: 'DDR5 lazimnya dirujuk menggunakan kadar…', options: ['MT/s', 'dBm', 'RPM', 'Lumen'], correct: 0 },
    { question: 'On‑die ECC pada DDR5 bermaksud…', options: ['RAM itu sama seperti ECC server sepenuhnya', 'Membetulkan ralat dalaman cip DRAM', 'Meningkatkan kelajuan internet', 'Menukar HDD kepada SSD'], correct: 1 },
    { question: 'Apakah syarat penting ketika memilih RAM?', options: ['Warna RGB mesti sama', 'Serasi dengan motherboard dan CPU', 'Saiz casing besar', 'Mesti ada sambungan Bluetooth'], correct: 1 },
    { question: 'CAMM2 lebih kerap dikaitkan dengan…', options: ['Rak server', 'Komputer riba/peranti kompak', 'Pencetak laser', 'Monitor OLED'], correct: 1 }
  ],
  storage: [
    { question: 'Antara HDD dan SSD, yang manakah biasanya lebih laju?', options: ['HDD', 'SSD', 'Kedua-duanya sama', 'Bergantung pada casing'], correct: 1 },
    { question: 'Apakah maksud storan “kekal”?', options: ['Data kekal walaupun komputer dimatikan', 'Data hanya wujud ketika komputer hidup', 'Data hanya untuk CPU', 'Data khusus untuk RAM'], correct: 0 },
    { question: 'NVMe Gen 5 SSD dipasang melalui antara muka…', options: ['PS/2', 'PCIe', 'IDE sahaja', 'Audio jack'], correct: 1 },
    { question: 'Teknologi 3D NAND berkaitan dengan…', options: ['Susunan sel memori secara berlapis', 'Sistem penyejukan air', 'Pengecasan bateri', 'Paparan 3D monitor'], correct: 0 },
    { question: 'DirectStorage membantu terutamanya dalam…', options: ['Penyuntingan teks', 'Permainan yang memindahkan data dengan cekap', 'Menukar papan induk', 'Ujian kabel rangkaian'], correct: 1 },
    { question: 'Apakah kelebihan SSD berbanding HDD?', options: ['Mempunyai piring magnetik', 'Tiada komponen bergerak dan lebih tahan hentakan', 'Memerlukan kabel lebih besar', 'Tidak memerlukan OS'], correct: 1 }
  ],
  psu: [
    { question: 'Apakah fungsi PSU?', options: ['Menyimpan arahan sistem', 'Menukar dan membekalkan kuasa kepada komponen', 'Mengawal mouse', 'Menguji kabel'], correct: 1 },
    { question: 'Mengapakah rating kecekapan seperti 80 Plus penting?', options: ['Menentukan warna casing', 'Menunjukkan kecekapan penggunaan tenaga', 'Menunjukkan saiz motherboard', 'Menentukan kelajuan internet'], correct: 1 },
    { question: 'Apakah yang dimaksudkan dengan headroom semasa memilih PSU?', options: ['Menambah lebihan kapasiti kuasa untuk keselamatan', 'Membeli PSU tanpa kipas sahaja', 'Mengurangkan jumlah RAM', 'Memasang dua sistem operasi'], correct: 0 },
    { question: 'ATX 3.0/3.1 banyak dibincangkan kerana…', options: ['Sokongan kepada keperluan kuasa GPU moden', 'Ia menggantikan CPU', 'Ia menyambung kabel fiber', 'Ia sistem fail baharu'], correct: 0 },
    { question: 'Penyambung 12VHPWR/12V‑2x6 sering dikaitkan dengan…', options: ['Kad grafik moden tertentu', 'Pencetak 3D', 'Monitor lama', 'Kabel crossover'], correct: 0 },
    { question: 'Apakah risiko jika watt PSU terlalu rendah untuk sistem?', options: ['Sistem boleh tidak stabil atau gagal dihidupkan', 'Monitor bertukar menjadi hitam putih', 'RAM berubah generasi', 'Topologi rangkaian rosak'], correct: 0 }
  ],
  cooling: [
    { question: 'Apakah tujuan sistem penyejukan komputer?', options: ['Meningkatkan bunyi speaker', 'Mengawal suhu komponen supaya stabil', 'Menambah kapasiti internet', 'Menyusun fail pengguna'], correct: 1 },
    { question: 'Antara berikut, yang manakah contoh penyejukan aktif?', options: ['Heatsink sahaja', 'Kipas dan AIO liquid cooler', 'Sticker haba', 'Cable tie'], correct: 1 },
    { question: 'Mengapakah thermal paste digunakan?', options: ['Untuk menghias CPU', 'Membantu pemindahan haba antara CPU dan heatsink', 'Untuk menebuk casing', 'Untuk mengunci RAM'], correct: 1 },
    { question: 'Liquid metal tidak disyorkan untuk pemula kerana…', options: ['Tidak sejuk langsung', 'Boleh mengalirkan elektrik dan berisiko', 'Tidak sesuai dengan monitor', 'Tidak boleh dibeli di Malaysia'], correct: 1 },
    { question: 'Habuk tebal pada kipas dan sirip heatsink boleh menyebabkan…', options: ['Prestasi penyejukan menurun', 'Kelajuan internet meningkat', 'Port USB bertambah', 'OS menjadi Linux'], correct: 0 },
    { question: 'Vapor chamber biasa ditemui pada…', options: ['Laptop berprestasi tinggi', 'Printer dot matrix', 'Switch rangkaian', 'Patch panel'], correct: 0 }
  ],
  os: [
    { question: 'Apakah peranan sistem operasi?', options: ['Mencetak gambar', 'Mengurus perkakasan dan perisian komputer', 'Menghasilkan elektrik', 'Menguji kabel RJ45'], correct: 1 },
    { question: 'Antara berikut, yang manakah contoh sistem operasi?', options: ['Windows', 'DDR5', 'PCIe', 'NVMe'], correct: 0 },
    { question: 'Apakah maksud GUI?', options: ['Graphical User Interface', 'General Utility Input', 'Gigabit Unified Internet', 'Graphic USB Integration'], correct: 0 },
    { question: 'Sistem fail NTFS biasanya dikaitkan dengan…', options: ['Windows', 'Patch Panel', 'AMD sahaja', 'Topologi Mesh'], correct: 0 },
    { question: 'Virtualization membolehkan…', options: ['Menjalankan beberapa OS pada satu komputer', 'Menghapuskan RAM', 'Menukar CPU kepada GPU', 'Menggandakan port RJ45'], correct: 0 },
    { question: 'Kernel ialah…', options: ['Teras sistem operasi', 'Nama kipas CPU', 'Jenis keyboard', 'Kabel internet'], correct: 0 }
  ],
  io: [
    { question: 'Keyboard dan mouse ialah peranti…', options: ['Output', 'Input', 'Storan', 'Rangkaian'], correct: 1 },
    { question: 'Monitor dan printer ialah peranti…', options: ['Input', 'Output', 'Pemprosesan', 'Penyejukan'], correct: 1 },
    { question: 'Skrin sentuh dikategorikan sebagai…', options: ['Input sahaja', 'Output sahaja', 'Input dan Output', 'Bukan peranti I/O'], correct: 2 },
    { question: 'Apakah maksud polling rate pada mouse?', options: ['Kadar laporan pergerakan ke PC', 'Saiz storan dalaman mouse', 'Jenis bateri mouse', 'Kecerahan monitor'], correct: 0 },
    { question: 'OLED terkenal dengan…', options: ['Hitam pekat dan kontras tinggi', 'Memerlukan piring magnet', 'Tidak boleh memaparkan video', 'Hanya untuk pencetak'], correct: 0 },
    { question: 'Pengimbas (scanner) ialah peranti…', options: ['Output', 'Input', 'Penyejukan', 'Bekalan kuasa'], correct: 1 }
  ]
};

const LEARNING_MAP = [
  {
    kp: 'KP(1/5)',
    title: 'Pengenalan Komponen Komputer',
    desc: 'Mengenal pasti komponen utama sistem komputer dan fungsinya.',
    outcomes: ['Kenal pasti CPU, motherboard, RAM, storan dan PSU.', 'Bezakan fungsi komponen input/output.', 'Fahami aspek keserasian asas sebelum pemasangan.'],
    linkedTopics: ['cpu', 'motherboard', 'ram', 'storage', 'psu', 'cooling', 'io']
  },
  {
    kp: 'KP(2/5)',
    title: 'Pemasangan Perkakasan Komputer',
    desc: 'Langkah pemasangan dan pemeriksaan perkakasan secara selamat.',
    outcomes: ['Susun urutan pemasangan secara sistematik.', 'Gunakan amalan ESD dan keselamatan asas.', 'Sahkan sambungan perkakasan sebelum dihidupkan.'],
    linkedTopics: ['cpu', 'motherboard', 'ram', 'storage', 'psu', 'cooling']
  },
  {
    kp: 'KP(3/5)',
    title: 'Pemasangan Sistem Operasi',
    desc: 'Penyediaan dan konfigurasi OS mengikut keperluan pengguna.',
    outcomes: ['Fahami peranan OS.', 'Kenal pasti contoh sistem fail dan antara muka.', 'Terangkan fungsi virtualization asas.'],
    linkedTopics: ['os', 'storage']
  },
  {
    kp: 'KP(4/5)',
    title: 'Pemasangan Aplikasi & Driver',
    desc: 'Pemasangan perisian sokongan untuk melengkapkan sistem.',
    outcomes: ['Fahami kepentingan driver.', 'Hubungkan perkakasan I/O dengan perisian yang sesuai.', 'Pastikan sistem bersedia untuk digunakan.'],
    linkedTopics: ['os', 'io']
  },
  {
    kp: 'KP(5/5)',
    title: 'Rekod Pemasangan Sistem',
    desc: 'Pendokumentasian konfigurasi dan semakan selepas pemasangan.',
    outcomes: ['Rekod spesifikasi utama sistem.', 'Sediakan status komponen yang dipasang.', 'Gunakan data sebagai bukti pembelajaran/amali.'],
    linkedTopics: ['cpu', 'motherboard', 'ram', 'storage', 'psu', 'os', 'io']
  }
];

const STORAGE_KEY = 'ikr3013_unlock_flow_v3';
const PASS_MARK = 3;
const FINAL_ASSESSMENT_URL = 'https://pcnexus.netlify.app/';
const PDF_URL = 'https://drive.google.com/drive/folders/1R0fi3x5-TLLOHDClZDU-Mnh89UKeZfeS?usp=sharing';

const shuffleArray = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const createQuizSet = (topicId) => shuffleArray(TOPIC_QUIZ_POOLS[topicId] || []).slice(0, 5);

const loadProgress = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { unlockedTopicIndex: 0, passed: {} };
    const parsed = JSON.parse(raw);
    return {
      unlockedTopicIndex: Number.isFinite(parsed.unlockedTopicIndex) ? parsed.unlockedTopicIndex : 0,
      passed: parsed.passed || {}
    };
  } catch {
    return { unlockedTopicIndex: 0, passed: {} };
  }
};

const statusBadgeMap = {
  passed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  current: 'bg-blue-50 text-blue-700 border-blue-200',
  locked: 'bg-slate-100 text-slate-500 border-slate-200'
};

export default function ModuleIKR3013({ onBackToPortal }) {
  const [view, setView] = useState('menu');
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('basic');
  const [progress, setProgress] = useState(loadProgress);
  const [quizSession, setQuizSession] = useState(null);
  const [mapOpenIndex, setMapOpenIndex] = useState(0);

  const activeTopic = topics[activeTopicIndex];
  const passedCount = Object.keys(progress.passed).length;
  const progressPercentage = Math.round((passedCount / topics.length) * 100);
  const allTopicsPassed = passedCount === topics.length;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view, activeTopicIndex, activeTab, quizSession?.current]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const isUnlocked = (index) => index <= progress.unlockedTopicIndex || Boolean(progress.passed[topics[index].id]);

  const openTopic = (index) => {
    if (!isUnlocked(index)) return;
    setActiveTopicIndex(index);
    setActiveTab('basic');
    setView('topic');
  };

  const startTopicQuiz = () => {
    const topic = topics[activeTopicIndex];
    setQuizSession({
      topicIndex: activeTopicIndex,
      topicId: topic.id,
      questions: createQuizSet(topic.id),
      current: 0,
      answers: {},
      completed: false,
      score: 0,
      passed: false
    });
    setView('topicQuiz');
  };

  const chooseAnswer = (optionIndex) => {
    if (!quizSession || quizSession.completed) return;
    if (quizSession.answers[quizSession.current] !== undefined) return;
    setQuizSession((prev) => ({
      ...prev,
      answers: { ...prev.answers, [prev.current]: optionIndex }
    }));
  };

  const goNextQuestion = () => {
    if (!quizSession) return;
    if (quizSession.current < quizSession.questions.length - 1) {
      setQuizSession((prev) => ({ ...prev, current: prev.current + 1 }));
      return;
    }

    const score = quizSession.questions.reduce((sum, q, index) => sum + (quizSession.answers[index] === q.correct ? 1 : 0), 0);
    const passed = score >= PASS_MARK;

    if (passed) {
      setProgress((prev) => ({
        unlockedTopicIndex: Math.min(topics.length - 1, Math.max(prev.unlockedTopicIndex, quizSession.topicIndex + 1)),
        passed: { ...prev.passed, [quizSession.topicId]: { score, total: 5, passedAt: new Date().toISOString() } }
      }));
    }

    setQuizSession((prev) => ({ ...prev, completed: true, score, passed }));
  };

  const resetProgress = () => {
    if (!window.confirm('Reset semua kemajuan modul IKR3013?')) return;
    const fresh = { unlockedTopicIndex: 0, passed: {} };
    setProgress(fresh);
    setQuizSession(null);
    localStorage.removeItem(STORAGE_KEY);
    setView('menu');
  };

  const BackToMenu = () => (
    <button
      onClick={() => setView('menu')}
      className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-md transition hover:-translate-y-0.5 hover:text-blue-700"
    >
      <ArrowLeft size={16} /> Kembali ke Menu Modul
    </button>
  );

  const renderMenu = () => (
    <div className="space-y-6 animate-fade-in pb-10">
      <header className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-950 via-blue-900 to-cyan-700 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-6 top-4"><Cpu size={120} /></div>
          <div className="absolute left-6 bottom-3"><CircuitBoard size={92} /></div>
        </div>
        <div className="relative z-10">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <button onClick={onBackToPortal} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur hover:bg-white/20">
              <Home size={16} /> Portal Utama
            </button>
            <a href={PDF_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-blue-900 transition hover:scale-105 hover:bg-cyan-50">
              <Download size={16} /> Nota PDF
            </a>
          </div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
            <Sparkles size={14} /> Unlock Learning Flow
          </p>
          <h1 className="mt-4 text-3xl font-black md:text-4xl">IKR3013 • Computer Hardware &amp; Software</h1>
          <p className="mt-3 max-w-3xl text-sm text-blue-50 md:text-base">
            Setiap topik akan dibuka secara berturutan. Pelajar perlu membaca kandungan dan lulus kuiz 5 soalan rawak untuk membuka kad seterusnya.
          </p>
        </div>
      </header>

      <section className="overflow-hidden rounded-[24px] border border-blue-100 bg-white shadow-lg">
        <div className="flex flex-col gap-4 p-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Prestasi Pembelajaran</p>
            <h2 className="mt-1 text-2xl font-black text-slate-900">{progressPercentage}% selesai</h2>
            <p className="mt-2 text-sm text-slate-500">
              {allTopicsPassed
                ? 'Semua topik telah dilengkapkan. Penilaian modul telah digantikan dengan akses ke PC Nexus.'
                : `Topik seterusnya untuk dibuka: ${topics[Math.min(progress.unlockedTopicIndex, topics.length - 1)].title}`}
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-5 py-4 text-sm shadow-inner">
            <div className="font-bold text-slate-700">Status Kuiz Topik</div>
            <div className="mt-1 text-3xl font-black text-blue-600">{passedCount} / {topics.length}</div>
            <div className="text-slate-500">topik lulus</div>
          </div>
        </div>
        <div className="px-6 pb-6">
          <div className="h-4 overflow-hidden rounded-full bg-slate-100 shadow-inner">
            <div className="relative h-4 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400 transition-all duration-700" style={{ width: `${progressPercentage}%` }}>
              {progressPercentage < 100 && <div className="absolute inset-0 animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-slate-500">
            <span>Flow: Baca ➜ Kuiz ➜ Unlock Seterusnya</span>
            <button onClick={resetProgress} className="rounded-full border border-slate-200 px-4 py-1.5 hover:border-red-200 hover:text-red-600">Reset Kemajuan</button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {topics.map((topic, index) => {
          const locked = !isUnlocked(index);
          const passed = Boolean(progress.passed[topic.id]);
          const current = !passed && index === Math.min(progress.unlockedTopicIndex, topics.length - 1);
          const state = passed ? 'passed' : current ? 'current' : locked ? 'locked' : 'current';
          return (
            <button
              key={topic.id}
              onClick={() => openTopic(index)}
              disabled={locked}
              className={`group relative overflow-hidden rounded-[24px] border bg-white p-5 text-left shadow-md transition duration-300 ${locked ? 'cursor-not-allowed opacity-60' : 'hover:-translate-y-1.5 hover:shadow-xl'}`}
            >
              <div className={`absolute right-4 top-4 rounded-full border px-3 py-1 text-[11px] font-bold ${statusBadgeMap[state]}`}>
                {passed ? 'Lulus Kuiz' : locked ? 'Terkunci' : 'Sedia Dibaca'}
              </div>
              <div className={`mb-4 inline-flex rounded-2xl p-4 text-white shadow-lg ${locked ? 'bg-slate-300' : topic.color}`}>
                {locked ? <Lock size={34} /> : topic.icon}
              </div>
              <h3 className="pr-10 text-lg font-black text-slate-800">{topic.title}</h3>
              <p className="mt-2 min-h-[48px] text-sm text-slate-500">{locked ? 'Lulus kuiz topik sebelumnya untuk membuka kad ini.' : topic.description}</p>
              <div className="mt-4 flex items-center justify-between text-xs font-semibold text-slate-400">
                <span>Kad {index + 1}</span>
                {!locked && <ChevronRight size={16} className="transition group-hover:translate-x-1" />}
              </div>
            </button>
          );
        })}
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <button onClick={() => setView('map')} className="group rounded-[24px] border border-slate-200 bg-white p-6 text-left shadow-md transition hover:-translate-y-1 hover:shadow-xl">
          <div className="mb-3 inline-flex rounded-2xl bg-violet-100 p-3 text-violet-600"><GitBranch size={26} /></div>
          <h3 className="text-lg font-black text-slate-800">Peta Kertas Penerangan</h3>
          <p className="mt-2 text-sm text-slate-500">Peta interaktif 5 KP rasmi JTM dengan outcome dan kaitan setiap topik.</p>
          <div className="mt-4 text-xs font-bold text-violet-600 group-hover:translate-x-1 transition">Buka peta interaktif →</div>
        </button>

        <a href={FINAL_ASSESSMENT_URL} target="_blank" rel="noopener noreferrer" className="group rounded-[24px] border border-slate-200 bg-white p-6 text-left shadow-md transition hover:-translate-y-1 hover:shadow-xl">
          <div className="mb-3 inline-flex rounded-2xl bg-emerald-100 p-3 text-emerald-600"><ExternalLink size={26} /></div>
          <h3 className="text-lg font-black text-slate-800">Penilaian Modul (PC Nexus)</h3>
          <p className="mt-2 text-sm text-slate-500">Kuiz penilaian modul IKR3013 telah digantikan dengan pautan luar PC Nexus.</p>
          <div className="mt-4 text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition">Buka penilaian luar →</div>
        </a>

        <div className="rounded-[24px] border border-slate-200 bg-white p-6 text-left shadow-md">
          <div className="mb-3 inline-flex rounded-2xl bg-amber-100 p-3 text-amber-600"><ShieldCheck size={26} /></div>
          <h3 className="text-lg font-black text-slate-800">Info Unlock</h3>
          <ul className="mt-2 space-y-2 text-sm text-slate-500">
            <li>• 5 soalan dipilih secara rawak untuk setiap topik.</li>
            <li>• Minimum <strong>3/5</strong> untuk unlock topik seterusnya.</li>
            <li>• Pelajar berbeza berpotensi menerima kombinasi soalan yang berbeza.</li>
          </ul>
        </div>
      </section>
    </div>
  );

  const renderTopic = () => {
    const topicId = activeTopic.id;
    const alreadyPassed = Boolean(progress.passed[topicId]);
    const hasNext = activeTopicIndex < topics.length - 1;
    return (
      <div className="space-y-5 animate-fade-in">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl">
          <div className={`relative p-8 text-white ${activeTopic.color}`}>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <BackToMenu />
              <span className="rounded-full border border-white/25 bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em]">Kad {activeTopicIndex + 1}</span>
            </div>
            <div className="absolute right-8 top-8 opacity-20 hidden md:block">{activeTopic.icon}</div>
            <h2 className="text-3xl font-black">{activeTopic.title}</h2>
            <p className="mt-2 max-w-3xl text-white/90">{activeTopic.description}</p>
          </div>

          <div className="border-b border-slate-100 px-4 pt-4">
            <div className="flex flex-wrap gap-2">
              {[
                ['basic', 'Asas'],
                ['advanced', 'Pengayaan']
              ].map(([key, label]) => (
                <button key={key} onClick={() => setActiveTab(key)} className={`rounded-t-2xl px-5 py-3 text-sm font-bold transition ${activeTab === key ? 'bg-blue-50 text-blue-700 shadow-inner' : 'text-slate-500 hover:text-slate-800'}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 p-6 md:p-8">
            {activeTab === 'basic' && (activeTopic.content.basics?.length ? activeTopic.content.basics : [{ title: 'Ringkasan Asas', points: [activeTopic.description] }]).map((section, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-100 bg-slate-50 p-5 shadow-sm">
                <h3 className="text-lg font-black text-slate-800">{section.title}</h3>
                <ul className="mt-3 space-y-3">
                  {section.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-3 text-sm leading-relaxed text-slate-600">
                      <CheckCircle size={18} className="mt-0.5 shrink-0 text-emerald-500" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {activeTab === 'advanced' && activeTopic.content.advanced.map((item, idx) => (
              <div key={idx} className="rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <h3 className="text-lg font-black text-slate-800">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-lg">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Checkpoint Unlock</p>
              <h3 className="mt-1 text-2xl font-black text-slate-900">Kuiz Interaktif 5 Soalan</h3>
              <p className="mt-2 text-sm text-slate-500">Lengkapkan kuiz topik ini untuk membuka kad seterusnya. Soalan dijana secara rawak daripada bank soalan topik.</p>
            </div>
            <div className="rounded-2xl bg-slate-50 px-5 py-4 text-sm shadow-inner">
              <div className="font-bold text-slate-700">Syarat Unlock</div>
              <div className="mt-1 text-3xl font-black text-blue-600">{PASS_MARK}/5</div>
              <div className="text-slate-500">markah minimum</div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {alreadyPassed ? (
              <>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700"><CheckCircle size={18} /> Kuiz topik ini telah lulus.</div>
                {hasNext && <button onClick={() => openTopic(activeTopicIndex + 1)} className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-700">Buka Kad Seterusnya <ChevronRight size={16} /></button>}
              </>
            ) : (
              <button onClick={startTopicQuiz} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-cyan-200">
                <PlayCircle size={18} /> Jawab Kuiz & Unlock
              </button>
            )}
            <button onClick={() => setView('map')} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-violet-200 hover:text-violet-700">
              <GitBranch size={18} /> Rujuk Peta KP
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderTopicQuiz = () => {
    if (!quizSession) return null;
    const topic = topics[quizSession.topicIndex];

    if (quizSession.completed) {
      return (
        <div className="space-y-6 animate-fade-in">
          <div className="rounded-[30px] border border-slate-200 bg-white p-8 text-center shadow-2xl">
            <div className={`mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full ${quizSession.passed ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
              {quizSession.passed ? <Award size={36} /> : <RotateCcw size={36} />}
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Keputusan Kuiz Topik</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900">{topic.title}</h2>
            <div className="mt-5 text-6xl font-black text-slate-900">{quizSession.score}<span className="text-2xl text-slate-400">/5</span></div>
            <p className={`mt-3 text-base font-bold ${quizSession.passed ? 'text-emerald-600' : 'text-rose-600'}`}>
              {quizSession.passed ? 'Tahniah! Topik seterusnya telah dibuka.' : 'Belum melepasi syarat unlock. Cuba lagi untuk buka kad seterusnya.'}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button onClick={startTopicQuiz} className="rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800">Ulang Kuiz Topik</button>
              <button onClick={() => setView('topic')} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-700">Kembali ke Nota</button>
              {quizSession.passed && quizSession.topicIndex < topics.length - 1 && (
                <button onClick={() => openTopic(quizSession.topicIndex + 1)} className="rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700">Buka Kad Seterusnya</button>
              )}
            </div>
          </div>
        </div>
      );
    }

    const currentQuestion = quizSession.questions[quizSession.current];
    const selectedAnswer = quizSession.answers[quizSession.current];

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="rounded-[28px] bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-700 p-8 text-white shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button onClick={() => setView('topic')} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur hover:bg-white/20">
              <ArrowLeft size={16} /> Kembali ke Nota
            </button>
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em]">Kuiz Unlock</span>
          </div>
          <h2 className="mt-5 text-3xl font-black">{topic.title}</h2>
          <p className="mt-2 text-sm text-blue-50">5 soalan dipilih secara rawak. Pelajar lain boleh menerima set soalan yang berbeza.</p>
          <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/15">
            <div className="h-3 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300 transition-all" style={{ width: `${((quizSession.current + 1) / quizSession.questions.length) * 100}%` }} />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs font-semibold text-white/75">
            <span>Soalan {quizSession.current + 1} / {quizSession.questions.length}</span>
            <span>Syarat lulus: {PASS_MARK}/5</span>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl md:p-8">
          <div className="rounded-2xl bg-slate-50 p-5 shadow-inner">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Soalan Semasa</p>
            <h3 className="mt-2 text-2xl font-black leading-snug text-slate-900">{currentQuestion.question}</h3>
          </div>

          <div className="mt-6 grid gap-4">
            {currentQuestion.options.map((option, optionIndex) => {
              const selected = selectedAnswer === optionIndex;
              return (
                <button
                  key={optionIndex}
                  onClick={() => chooseAnswer(optionIndex)}
                  className={`group rounded-2xl border-2 px-5 py-4 text-left text-sm font-semibold transition duration-200 ${selected ? 'border-blue-500 bg-blue-50 text-blue-900 shadow-md' : 'border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-slate-50 hover:-translate-y-0.5'}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black ${selected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-700'}`}>{String.fromCharCode(65 + optionIndex)}</div>
                    <span className="leading-relaxed">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-6">
            <div className="text-sm text-slate-500">Pilih satu jawapan untuk meneruskan ke soalan seterusnya.</div>
            <button
              disabled={selectedAnswer === undefined}
              onClick={goNextQuestion}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-lg transition ${selectedAnswer === undefined ? 'cursor-not-allowed bg-slate-200 text-slate-400' : 'bg-blue-600 text-white hover:-translate-y-0.5 hover:bg-blue-700'}`}
            >
              {quizSession.current === quizSession.questions.length - 1 ? 'Hantar Kuiz' : 'Soalan Seterusnya'} <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderMap = () => (
    <div className="space-y-5 animate-fade-in">
      <div className="overflow-hidden rounded-[28px] bg-gradient-to-r from-violet-700 via-fuchsia-700 to-indigo-800 p-8 text-white shadow-2xl">
        <BackToMenu />
        <h2 className="mt-5 text-3xl font-black">Peta Kertas Penerangan • IKR3013</h2>
        <p className="mt-2 max-w-3xl text-sm text-violet-50">Paparan moden yang memetakan 5 KP rasmi kepada outcome pembelajaran dan kad topik dalam modul. Klik setiap laluan untuk melihat fokus kandungan.</p>
      </div>

      <div className="grid gap-4">
        {LEARNING_MAP.map((item, index) => {
          const open = mapOpenIndex === index;
          return (
            <div key={item.kp} className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-lg">
              <button onClick={() => setMapOpenIndex(open ? -1 : index)} className="flex w-full items-start justify-between gap-4 p-6 text-left transition hover:bg-slate-50">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">{item.kp}</div>
                  <h3 className="mt-1 text-2xl font-black text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{item.desc}</p>
                </div>
                <div className={`mt-2 rounded-full p-2 transition ${open ? 'rotate-90 bg-violet-100 text-violet-700' : 'bg-slate-100 text-slate-500'}`}><ChevronRight size={18} /></div>
              </button>
              {open && (
                <div className="border-t border-slate-100 px-6 pb-6 pt-5">
                  <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Outcome Pembelajaran</h4>
                      <ul className="mt-3 space-y-3">
                        {item.outcomes.map((outcome, idx) => (
                          <li key={idx} className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                            <CheckCircle size={18} className="mt-0.5 shrink-0 text-emerald-500" />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Topik Berkaitan</h4>
                      <div className="mt-3 flex flex-wrap gap-3">
                        {item.linkedTopics.map((topicId) => {
                          const topicIndex = topics.findIndex((topic) => topic.id === topicId);
                          const topic = topics[topicIndex];
                          const canOpen = isUnlocked(topicIndex);
                          const passed = Boolean(progress.passed[topic.id]);
                          return (
                            <button
                              key={topicId}
                              onClick={() => canOpen && openTopic(topicIndex)}
                              className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${canOpen ? 'border-violet-200 bg-violet-50 text-violet-800 hover:-translate-y-0.5 hover:shadow-sm' : 'cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400'} `}
                            >
                              <div>{topic.title}</div>
                              <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.15em]">{passed ? 'Kuiz Lulus' : canOpen ? 'Boleh Dibuka' : 'Terkunci'}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
        {view === 'menu' && renderMenu()}
        {view === 'topic' && renderTopic()}
        {view === 'topicQuiz' && renderTopicQuiz()}
        {view === 'map' && renderMap()}
      </div>
      <footer className="border-t border-slate-200 bg-white py-5 text-center text-sm font-semibold text-slate-500">Copyright © TKR ADTEC SANDAKAN 2026</footer>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px);} to { opacity: 1; transform: translateY(0);} }
        @keyframes shimmer { 0% { transform: translateX(-100%);} 100% { transform: translateX(100%);} }
        .animate-fade-in { animation: fadeIn .45s ease-out; }
      `}</style>
    </div>
  );
}
