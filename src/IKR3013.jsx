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
            "Tidak boleh bekerja sendiri; memerlukan sokongan HDD dan RAM."
          ]
        }
      ],
      advanced: [
        { title: "Hybrid Architecture CPU", desc: "CPU moden (Intel Gen 12+) kini mempunyai P-Cores (Performance) dan E-Cores (Efficiency) untuk jimat tenaga." },
        { title: "NPU AI Processor", desc: "Processor terkini (seperti Intel Core Ultra & Ryzen AI) mempunyai cip khas untuk AI secara terbina." },
        { title: "Nanometer Technology", desc: "Transistor semakin kecil (3nm, 5nm), membolehkan lebih kuasa dalam saiz cip yang sama." }
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
        { title: "PCIe 5.0", desc: "Standard sambungan terpantas masa kini untuk GPU dan SSD, dengan kelajuan data berganda berbanding PCIe 4.0." },
        { title: "Wi-Fi 7 Technology", desc: "Banyak papan induk moden kini dilengkapi sambungan rangkaian tanpa wayar dan berwayar terpantas secara terbina." },
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
        { title: "DDR5 RAM", desc: "Standard terkini dengan kelajuan asas 4800MHz ke atas, pengurusan tenaga lebih baik (PMIC pada stik RAM)." },
        { title: "CAMM2 Memory", desc: "Format baharu untuk laptop yang menggantikan slot SO-DIMM tradisional untuk menjimatkan ruang dan meningkatkan kelajuan." },
        { title: "ECC On-Die DDR5", desc: "DDR5 mempunyai ciri pembetulan ralat (Error Correction) terbina untuk kestabilan sistem yang lebih tinggi." }
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
        { title: "NVMe Gen 5 SSD", desc: "SSD generasi baru yang mencapai kelajuan bacaan sehingga 12,000 MB/s (12GB/s)." },
        { title: "3D NAND QLC PLC", desc: "Teknologi menyusun sel memori secara bertingkat untuk memuatkan kapasiti besar (4TB, 8TB) dalam saiz kecil." },
        { title: "DirectStorage Technology", desc: "Teknologi yang membolehkan GPU mengambil data terus dari SSD tanpa membebankan CPU (penting untuk gaming)." }
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
        { title: "ATX 3.0 Standard", desc: "Standard bekalan kuasa terkini yang mampu menampung lonjakan kuasa tinggi dari kad grafik (GPU) generasi baru." },
        { title: "12VHPWR Cable", desc: "Kabel kuasa khusus 16-pin yang direka untuk siri Nvidia RTX 40 bagi menggantikan palam 8-pin tradisional." },
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
        { title: "Liquid Metal Thermal Paste", desc: "Pes terma berasaskan logam cecair yang mempunyai tahap kekonduksian haba (thermal conductivity) luar biasa berbanding silikon biasa." },
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

const quizQuestions = [
  {
    question: "Apakah fungsi utama Unit Pemprosesan Pusat (CPU)?",
    options: ["Menyimpan data kekal", "Memproses data dan mengawal sistem", "Menyambungkan internet", "Membekalkan kuasa elektrik"],
    correct: 1
  },
  {
    question: "Manakah antara berikut TIDAK benar mengenai SSD berbanding HDD?",
    options: ["SSD lebih laju", "SSD tiada komponen bergerak", "SSD menggunakan piring magnetik", "SSD lebih tahan lasak"],
    correct: 2
  },
  {
    question: "Apakah jenis soket yang biasa digunakan oleh CPU Intel?",
    options: ["AM4", "LGA", "PGA", "TR4"],
    correct: 1
  },
  {
    question: "Mengapa RAM penting dalam prestasi komputer?",
    options: ["Untuk menyimpan gambar", "Untuk menyejukkan CPU", "Menyimpan data sementara untuk akses pantas CPU", "Untuk menyambung ke monitor"],
    correct: 2
  },
  {
    question: "Apakah langkah keselamatan utama sebelum menyentuh komponen dalaman komputer?",
    options: ["Basuh tangan dengan air", "Pastikan komputer disambung ke soket", "Nyahcas elektrostatik (ESD) atau pakai gelang antistatik", "Pakai sarung tangan getah tebal"],
    correct: 2
  },
  {
    question: "Komponen manakah yang dipanggil sebagai 'tulang belakang' komputer yang menghubungkan semua perkakasan?",
    options: ["Memori (RAM)", "Papan Induk (Motherboard)", "Kad Grafik (GPU)", "Bekalan Kuasa (PSU)"],
    correct: 1
  },
  {
    question: "Apakah maksud singkatan RAM?",
    options: ["Random Access Memory", "Read Access Memory", "Run All Memory", "Real Allocation Memory"],
    correct: 0
  },
  {
    question: "Antara berikut, jenis storan manakah yang memberikan kelajuan membaca dan menulis data paling pantas?",
    options: ["Cakera Keras (HDD SATA)", "SSD SATA", "SSD NVMe M.2", "Pemacu Pena (Pendrive)"],
    correct: 2
  },
  {
    question: "Apakah fungsi unit ALU (Arithmetic Logic Unit) di dalam Pemproses (CPU)?",
    options: ["Mengawal lalu lintas data (input/output)", "Melakukan perhitungan aritmetik dan operasi logik", "Menyimpan data secara kekal untuk jangka masa panjang", "Menyejukkan sistem semasa pemprosesan berat"],
    correct: 1
  },
  {
    question: "Yang manakah antara berikut BUKAN jenis faktor bentuk (form factor) bagi papan induk?",
    options: ["ATX", "MicroATX", "Mini-ITX", "Mega-GTX"],
    correct: 3
  },
  {
    question: "Apakah tujuan utama penggunaan perisian Thermal Paste (Pes Terma) pada permukaan komputer?",
    options: ["Melekatkan RAM dengan lebih kuat pada slot motherboard", "Mengalirkan haba dari permukaan CPU ke penyejuk (heatsink) dengan cekap", "Mencegah berlakunya litar pintas pada permukaan motherboard", "Memberikan bekalan kuasa tambahan kepada cip CPU"],
    correct: 1
  },
  {
    question: "Kad grafik (GPU) diskrit lazimnya dipasang pada slot apa di papan induk?",
    options: ["Slot DIMM", "Slot PCIe x16", "Slot M.2 NVMe", "Port SATA"],
    correct: 1
  },
  {
    question: "Apakah jenis ingatan memori yang mempunyai ciri pembetulan ralat (Error Correction) dan sering digunakan pada komputer pelayan (server)?",
    options: ["DDR4 SDRAM", "LPDDR", "ECC RAM", "GDDR6"],
    correct: 2
  },
  {
    question: "Jika sebuah komputer sering mengalami kelengahan ('lag') apabila membuka banyak aplikasi secara serentak (multitasking), komponen manakah yang paling wajar untuk dinaik taraf?",
    options: ["Kotak Komputer (Casing)", "Memori (RAM)", "Bekalan Kuasa (PSU)", "Kipas Penyejuk"],
    correct: 1
  },
  {
    question: "Semasa melakukan pembersihan dalaman komputer, alat manakah yang paling sesuai dan selamat digunakan untuk membuang habuk dari celah-celah komponen?",
    options: ["Kain basah yang dicelup air", "Vakum rumah berkuasa tinggi", "Udara termampat (Compressed air)", "Pengering rambut (Hair dryer) bersuhu panas"],
    correct: 2
  },
  {
    question: "Slot manakah pada papan induk yang biasanya digunakan untuk memasang kad tambahan ringan seperti Kad Rangkaian (Wi-Fi) atau Kad Bunyi?",
    options: ["Slot PCIe x16", "Slot PCIe x1", "Slot RAM DIMM", "Port SATA"],
    correct: 1
  },
  {
    question: "Apakah kelebihan utama menggunakan SSD jenis NVMe M.2 berbanding SSD jenis SATA?",
    options: ["Harga yang jauh lebih murah", "Kapasiti fizikal yang lebih besar", "Kelajuan pemindahan data yang jauh lebih tinggi menggunakan laluan PCIe", "Boleh disambungkan di luar komputer (external) dengan mudah"],
    correct: 2
  },
  {
    question: "Kabel kuasa 8-pin EPS daripada Bekalan Kuasa (PSU) dikhususkan untuk membekalkan kuasa kepada komponen mana?",
    options: ["Kad Grafik (GPU)", "Papan Induk (Motherboard) utama", "Unit Pemprosesan Pusat (CPU)", "Pemacu Storan (HDD/SSD)"],
    correct: 2
  },
  {
    question: "Sekiranya anda mempunyai kotak komputer (casing) bersaiz MicroATX (mATX), saiz papan induk manakah yang TIDAK muat untuk dipasang di dalamnya?",
    options: ["MicroATX (mATX)", "Mini-ITX", "ATX standard", "Pico-ITX"],
    correct: 2
  },
  {
    question: "Apakah yang berkemungkinan besar akan berlaku sekiranya kipas penyejuk CPU (CPU Cooler) rosak atau gagal berfungsi?",
    options: ["Kelajuan internet menjadi perlahan", "Komputer mengalami pemanasan melampau (overheating) dan tertutup dengan sendirinya (thermal shutdown)", "Sistem secara automatik menambah saiz RAM", "Resolusi skrin akan menurun menjadi grafik asas"],
    correct: 1
  },
  
  // --- TAMBAHAN 10 SOALAN: MEMORI (RAM) ---
  {
    question: "Apakah bentuk (form factor) RAM yang direka lebih pendek dan kompak khusus untuk digunakan di dalam komputer riba (laptop)?",
    options: ["SDRAM", "DIMM", "SO-DIMM", "VRAM"],
    correct: 2
  },
  {
    question: "Mengapakah pemasangan RAM secara 'Dual-Channel' (cth: 2 batang 8GB) lebih digalakkan berbanding 'Single-Channel' (1 batang 16GB)?",
    options: ["Menjimatkan penggunaan elektrik", "Memperluaskan lebar jalur (bandwidth) untuk memindahkan lebih banyak data secara serentak", "Mengurangkan haba di dalam casing", "Lebih cantik dan terang dengan lampu RGB"],
    correct: 1
  },
  {
    question: "Apakah ciri utama yang terdapat pada ECC RAM yang menjadikannya sangat sesuai untuk komputer pelayan (Server)?",
    options: ["Saiz fizikal yang lebih besar", "Berharga lebih murah berbanding RAM biasa", "Kelajuan pemindahan yang perlahan", "Keupayaan mengesan dan membetulkan ralat data secara automatik"],
    correct: 3
  },
  {
    question: "[Soalan Label Fizikal] Jika anda melihat lekuk kecil (notch) pada bahagian bawah pin emas memori RAM, apakah fungsi utamanya?",
    options: ["Menghalang pemasangan generasi RAM (contoh DDR4) ke slot (contoh DDR5) yang salah", "Mengalirkan arus elektrik berlebihan", "Menyejukkan cip RAM", "Sebagai hiasan luaran"],
    correct: 0
  },
  {
    question: "Dalam sejarah evolusi generasi DDR RAM, generasi manakah yang mula memperkenalkan sistem pengurusan kuasa (PMIC) terbina secara terus pada cip RAM tersebut?",
    options: ["DDR2", "DDR3", "DDR4", "DDR5"],
    correct: 3
  },
  {
    question: "Apakah peranan utama RAM di dalam sesebuah sistem komputer?",
    options: ["Menyimpan permainan video dan gambar peribadi secara kekal", "Menyediakan ruang simpanan sementara yang sangat pantas untuk data yang sedang diproses oleh CPU", "Menukar arus elektrik", "Memaparkan grafik ke skrin"],
    correct: 1
  },
  {
    question: "Antara berikut, yang manakah contoh paling tepat bagi LPDDR (Low Power DDR)?",
    options: ["Memori yang dipateri di dalam telefon pintar dan peranti mudah alih (Tablet)", "Memori untuk Server berkuasa tinggi", "Memori khas untuk kad grafik komputer", "Storan kekal pendrive"],
    correct: 0
  },
  {
    question: "Apakah maksud unit 'MHz' atau 'MT/s' yang sering terpapar pada spesifikasi sekeping RAM (contoh: 3200MHz)?",
    options: ["Harga kos memori", "Jumlah ruang memori untuk fail", "Kadar kelajuan pemindahan data", "Jangka hayat memori"],
    correct: 2
  },
  {
    question: "Sekiranya komputer anda tiba-tiba menjadi sangat lambat apabila anda membuka 20 tab pelayar Chrome serentak, apakah langkah naik taraf terbaik?",
    options: ["Menukar Bekalan Kuasa (PSU)", "Menambah kapasiti Memori RAM", "Menambah kelajuan internet", "Membeli kotak komputer (casing) baru"],
    correct: 1
  },
  {
    question: "Apakah kelemahan memori SDRAM generasi klasik berbanding DDR SDRAM moden?",
    options: ["Bentuknya bulat", "Ia hanya menghantar data sekali bagi setiap kitaran jam, menjadikannya lebih perlahan", "Menghasilkan haba yang terlalu melampau", "Perlu menggunakan perisian khas untuk membukanya"],
    correct: 1
  },

  // --- TAMBAHAN 10 SOALAN: STORAN (HDD & SSD) ---
  {
    question: "Apakah fungsi utama storan sekunder seperti HDD dan SSD di dalam komputer?",
    options: ["Menyejukkan CPU ketika bermain permainan", "Menyimpan sistem operasi, aplikasi dan fail peribadi secara kekal", "Menyokong kelajuan sambungan Wi-Fi", "Menyimpan arahan logik aritmetik (ALU)"],
    correct: 1
  },
  {
    question: "Mengapakah Pemacu Keadaan Pepejal (SSD) beroperasi dengan 100% senyap tanpa sebarang bunyi getaran?",
    options: ["Kerana ia menggunakan cip flash NAND memori digital tanpa sebarang komponen mekanikal bergerak", "Kerana ia dilindungi dengan getah penebat tebal", "Kerana ia menggunakan kipas senyap di dalamnya", "Ia hanya menyala dan berbunyi pada waktu malam"],
    correct: 0
  },
  {
    question: "Antara faktor berikut, mengapakah cakera keras tradisional (HDD) masih relevan dan dibeli oleh pengguna masa kini?",
    options: ["Ia tahan gegaran melampau", "Lebih pantas dari M.2 NVMe", "Ia sangat nipis dan kecil", "Kos per Gigabyte (GB) sangat murah untuk menyimpan kapasiti arkib bersaiz gergasi"],
    correct: 3
  },
  {
    question: "[Soalan Label Bentuk & Port] Cip storan ini berbentuk segi empat bujur kecil seperti sekeping pembaris, dan dipasang terus secara leper ke atas papan induk. Apakah jenis storan ini?",
    options: ["HDD 3.5 Inci", "SATA SSD 2.5 Inci", "M.2 NVMe SSD", "Pemacu Cakera Padat (CD-ROM)"],
    correct: 2
  },
  {
    question: "Antara berikut, kabel jenis apakah yang lazimnya digunakan untuk menyambungkan storan HDD dan SATA SSD (2.5 inci) kepada papan induk?",
    options: ["Kabel EPS 12V", "Kabel data SATA", "Kabel HDMI", "Kabel Fiber Optik"],
    correct: 1
  },
  {
    question: "Apakah kelebihan ketara SSD berjenis NVMe berbanding SSD berjenis SATA yang biasa?",
    options: ["Boleh disambung di luar kotak PC menggunakan Bluetooth", "Lebih murah harganya", "Mempunyai piring mekanikal yang lebih besar", "NVMe menggunakan laluan PCIe yang membolehkan pemindahan data berlipat ganda lebih pantas"],
    correct: 3
  },
  {
    question: "Komputer yang masih menggunakan HDD mekanikal sebagai pemacu Sistem Operasi (OS) utama akan sering mengalami masalah apa?",
    options: ["Resolusi skrin tidak jelas", "Masa pemuatan (booting) Windows yang sangat lama dan komputer terasa lembap", "Kipas tidak berpusing", "Komputer menjadi ringan dan ringan"],
    correct: 1
  },
  {
    question: "Storan komputer dikelaskan sebagai memori 'Non-Volatile'. Ini bermaksud...",
    options: ["Data di dalamnya sangat mudah dimanipulasi virus", "Ianya memori utama", "Data di dalamnya kekal selamat dan tidak hilang walaupun bekalan elektrik terputus", "Kapasiti storan berubah-ubah setiap hari"],
    correct: 2
  },
  {
    question: "Bagi industri kreatif seperti penyuntingan video beresolusi 4K dan 8K, apakah spesifikasi storan paling kritikal yang perlu dipertimbangkan?",
    options: ["Kelajuan membaca dan menulis yang sangat tinggi seperti NVMe Gen 4/Gen 5", "Mempunyai warna RGB luaran yang cantik", "Berat dan ketebalan logam storan", "Dikeluarkan pada tahun 2010"],
    correct: 0
  },
  {
    question: "Apakah risiko kritikal fizikal sekiranya sesebuah cakera keras (HDD) yang sedang berputar terjatuh secara kasar ke lantai?",
    options: ["Piring mekanikal (platter) di dalamnya berisiko calar dan mengakibatkan kerosakan data kekal", "Kabel SATA akan terputus dua", "Ia akan berubah menjadi SSD secara automatik", "Tiada apa-apa kesan langsung"],
    correct: 0
  },

  // --- TAMBAHAN 10 SOALAN: BEKALAN KUASA (PSU) ---
  {
    question: "Apakah fungsi teras bagi sebuah Unit Bekalan Kuasa (PSU) komputer?",
    options: ["Mencipta haba untuk memanaskan komponen", "Menyimpan tenaga sementara", "Menukar arus ulang-alik (AC) dari soket dinding kepada arus terus (DC) yang stabil untuk komponen", "Membekalkan memori untuk grafikal"],
    correct: 2
  },
  {
    question: "[Soalan Label Penyambung] Anda melihat satu kabel PSU yang mempunyai 24 pin emas terbina dalam satu kepala soket yang lebar. Apakah fungsi utama kabel ini?",
    options: ["Membekalkan kuasa pada HDD", "Membekalkan arus elektrik utama kepada keseluruhan Papan Induk (Motherboard)", "Menyalurkan pautan internet", "Membekalkan kuasa pada kipas penyejuk casing"],
    correct: 1
  },
  {
    question: "Kabel yang dilabel sebagai 'PCIe' atau mempunyai palam gabungan 6+2 Pin dikhususkan untuk dipasang pada perkakasan apa?",
    options: ["Pemacu Storan SSD", "Soket CPU", "Bateri Motherboard", "Kad Grafik diskrit (GPU)"],
    correct: 3
  },
  {
    question: "Apakah kelebihan utama jika anda memilih PSU jenis 'Fully Modular' berbanding 'Non-Modular'?",
    options: ["Anda boleh mencabut dan menyusun semua kabel mengikut keperluan untuk sistem yang lebih kemas", "Harga jauh lebih murah", "Kuasa elektrik dijana sendiri", "Tidak memerlukan sambungan dinding"],
    correct: 0
  },
  {
    question: "Apakah yang diwakili oleh sijil penarafan '80 PLUS' pada kotak sesebuah PSU?",
    options: ["Kapasiti berat PSU", "Tahap kecekapan PSU tersebut menarik arus tanpa menukarnya menjadi pembaziran tenaga (haba panas)", "Tahap kepantasan internet", "Jaminan selama 80 tahun"],
    correct: 1
  },
  {
    question: "Berdasarkan taraf kecekapan sijil 80 PLUS ini, susun dari yang standard (paling asas) kepada yang paling tinggi (cekap).",
    options: ["Gold -> Bronze -> Standard -> Titanium -> Platinum", "Standard -> Bronze -> Gold -> Platinum -> Titanium", "Titanium -> Platinum -> Gold -> Bronze -> Standard", "Bronze -> Gold -> Standard -> Titanium -> Platinum"],
    correct: 1
  },
  {
    question: "Penyambung kuasa 'EPS 12V' (biasanya berbentuk 8-Pin atau 4+4 Pin) daripada PSU wajib dipasang pada papan induk berdekatan dengan bahagian atas untuk menghidupkan komponen apa?",
    options: ["Unit Pemprosesan Pusat (CPU)", "Kad Audio", "RAM", "Sistem Penyejukan Cecair"],
    correct: 0
  },
  {
    question: "Apakah tujuan fitur keselamatan seperti OVP (Over Voltage Protection) dimasukkan ke dalam unit PSU yang berkualiti?",
    options: ["Mempercepatkan kelajuan kelajuan pusingan HDD", "Meningkatkan kualiti grafikal", "Untuk memutuskan litar serta-merta sekiranya terdapat lebihan arus bagi melindungi komponen komputer yang lain", "Memanjangkan kabel secara automatik"],
    correct: 2
  },
  {
    question: "Jika anda memasang PC Gaming berprestasi tinggi yang menggunakan kad siri NVIDIA RTX 40-Series terkini, apakah standard kabel kuasa baharu yang sering disertakan?",
    options: ["Kabel PS/2 Klasik", "Kabel 12VHPWR (16-pin)", "Kabel SATA", "Kabel USB Type-C 100W"],
    correct: 1
  },
  {
    question: "Apakah yang berkemungkinan besar terjadi jika jumlah Watt PSU yang anda beli terlalu kecil berbanding kuasa sebenar yang diperlukan oleh keseluruhan sistem PC anda?",
    options: ["Grafik dalam permainan menjadi lebih jelas", "Ruang storan SSD akan meningkat", "Komputer akan mati dengan sendirinya (shut down) apabila memproses kerja atau permainan grafik yang berat", "Tiada apa-apa terjadi"],
    correct: 3
  },

  // --- TAMBAHAN 10 SOALAN: SISTEM PENYEJUKAN ---
  {
    question: "Apakah masalah utama yang akan terjadi jika cip CPU anda mencapai suhu ekstrem (seperti 100°C) akibat sistem penyejukan yang gagal?",
    options: ["Cip CPU akan berubah warna", "Fail dalam storan akan terpadam", "CPU akan mula menurunkan kelajuan secara paksa (Thermal Throttling) untuk menyejukkan diri", "Kabel kuasa akan memanjang"],
    correct: 2
  },
  {
    question: "Bagaimanakah prinsip asas sebuah sistem Penyejukan Udara (Air Cooler) berfungsi membuang haba?",
    options: ["Haba ditarik ke dalam bongkah sirip besi (heatsink) dan ditiup keluar oleh putaran kipas fizikal", "Menukarkan haba kepada arus elektrik secara digital", "Menyerap haba dan menyimpannya di dalam memori RAM", "Menyejukkan haba dengan semburan air automatik"],
    correct: 0
  },
  {
    question: "Apakah peranan sebenar 'Thermal Paste' (Pes Terma) yang perlu disapu di antara CPU dan bongkah penyejuk (Cooler)?",
    options: ["Melekatkan kedua-dua objek secara kekal bak gam kuat", "Mengisi ruang rongga mikroskopik pada permukaan logam bagi memaksimumkan pengaliran haba (thermal transfer) ke tahap 100%", "Memberikan bau yang wangi", "Melindungi CPU daripada calar"],
    correct: 1
  },
  {
    question: "Antara berikut, manakah komponen yang HANYA wujud dalam sistem Penyejukan Cecair (AIO Liquid Cooler) tetapi tidak ada dalam Penyejukan Udara?",
    options: ["Wayar kuasa 24-Pin", "Bilah Kipas Pusingan Angin", "Pes Terma (Thermal Paste)", "Pam air terbina, hos cecair penyejuk, dan bongkah radiator"],
    correct: 3
  },
  {
    question: "[Soalan Label Konsep Udara] Jika kipas (case fan) anda dipasang di bahagian panel hadapan (front panel) kotak komputer, arah tiupan manakah yang paling logik dan optimum?",
    options: ["Membuang udara ke luar (Exhaust)", "Menyedut udara segar dan sejuk dari luar masuk ke dalam sistem (Intake)", "Meniup udara ke bawah tapak meja", "Meniup secara bersilang"],
    correct: 1
  },
  {
    question: "Fungsi kipas di bahagian belakang (rear) dan atas (top) sesebuah kotak komputer lazimnya direka sebagai 'Exhaust'. Apakah peranannya?",
    options: ["Meniup dan mengepam udara panas keluar dari dalam kotak PC", "Membekukan udara di dalam kotak PC", "Menarik udara kotor dari luar ke dalam CPU", "Memberhentikan pusingan HDD"],
    correct: 0
  },
  {
    question: "Mengapakah sesetengah pembina PC ekstrem menggunakan pes terma berasaskan 'Liquid Metal' (Logam Cecair) berbanding pes silikon biasa?",
    options: ["Sangat mudah dicuci", "Harganya sangat murah", "Ia mempunyai kadar konduktiviti (pemindahan haba) yang paling tinggi dan cekap di pasaran", "Ia boleh menyejukkan bilik secara keseluruhan"],
    correct: 2
  },
  {
    question: "[Soalan Label Papan Induk] Anda baru sahaja meletakkan penyejuk CPU baharu di atas soket. Kabel wayar kuasa kipas penyejuk tersebut wajib dicucuk pada port Papan Induk yang berlabel apa?",
    options: ["CPU_FAN", "SATA_1", "USB_PORT", "AUDIO_FRONT"],
    correct: 0
  },
  {
    question: "Apakah satu kemungkinan isu / kelemahan fizikal jika anda menggunakan penyejuk udara jenis bongkah berkembar gergasi (Dual-Tower Air Cooler)?",
    options: ["Radiatornya terlampau panjang", "Kos air bil bulanan meningkat", "Cairan di dalamnya mudah bocor", "Bongkah besinya yang membonjol sering menyekat atau menghalang ruang pemasangan memori RAM yang tinggi"],
    correct: 3
  },
  {
    question: "Teknologi 'Vapor Chamber' (Ruang Wap) kini banyak digunakan di dalam peranti nipis seperti komputer riba (laptop) prestasi tinggi kerana...",
    options: ["Menjadikan laptop kebal air", "Ia menyebarkan haba secara sekata melalui proses pemeluwapan wap air dalam ruang tembaga nipis", "Ia mengeluarkan wap asap dari belakang laptop", "Ia membuatkan bunyi kipas senyap sepenuhnya"],
    correct: 1
  },
  
  // --- TAMBAHAN 5 SOALAN: SISTEM OPERASI (OS) ---
  {
    question: "Apakah fungsi utama sebuah Sistem Operasi (OS) dalam sesebuah komputer?",
    options: ["Menghasilkan bunyi muzik", "Menguruskan perkakasan komputer, perisian, dan menyediakan antara muka (UI) untuk pengguna", "Melindungi komputer dari habuk fizikal", "Menyejukkan pemproses (CPU)"],
    correct: 1
  },
  {
    question: "Antara berikut, yang manakah merupakan contoh Sistem Operasi sumber terbuka (Open Source) yang paling popular di dunia pelayan (Server)?",
    options: ["Microsoft Windows 11", "Apple macOS", "Linux (Contoh: Ubuntu, Debian)", "Microsoft Office"],
    correct: 2
  },
  {
    question: "Apakah nama perisian teras utama dalam sesebuah sistem operasi yang berhubung terus dengan perkakasan fizikal (CPU & Memori)?",
    options: ["Antivirus", "Kernel", "Browser", "File Explorer"],
    correct: 1
  },
  {
    question: "Format Sistem Fail (File System) manakah yang lazimnya dan secara rasmi digunakan oleh sistem operasi Microsoft Windows moden?",
    options: ["APFS", "ext4", "FAT32", "NTFS"],
    correct: 3
  },
  {
    question: "Teknologi apakah yang membolehkan anda 'menumpang' dan menjalankan OS Windows di dalam komputer yang menggunakan OS Mac tanpa perlu 'restart' komputer?",
    options: ["Virtualization (Mesin Maya / Virtual Machine)", "Overclocking", "AirDrop", "Bluetooth"],
    correct: 0
  },

  // --- TAMBAHAN 5 SOALAN: PERKAKASAN INPUT/OUTPUT ---
  {
    question: "Papan kekunci (Keyboard) dan Tetikus (Mouse) dikategorikan sebagai peranti jenis apa?",
    options: ["Peranti Output", "Peranti Input", "Peranti Storan", "Peranti Penyejukan"],
    correct: 1
  },
  {
    question: "Monitor yang menggunakan teknologi piksel menyala dengan sendirinya (tanpa memerlukan lampu latar/backlight) dikenali sebagai teknologi...",
    options: ["TN Panel", "IPS LCD", "OLED (Organic LED)", "CRT"],
    correct: 2
  },
  {
    question: "Sebuah Skrin Sentuh (Touch Screen) pada komputer riba dikategorikan sebagai peranti...",
    options: ["Input sahaja", "Output sahaja", "Input dan Output (Dwifungsi)", "Peranti Rangkaian"],
    correct: 2
  },
  {
    question: "Bagi peminat e-Sukan, tetikus (mouse) dengan 'Polling Rate' yang sangat tinggi (Contoh: 1000Hz ke atas) dipilih kerana...",
    options: ["Tetikus akan menjadi lebih berat", "Kelajuan kursor di skrin melapor dan bergerak lebih cepat dengan sifar sela masa (zero delay)", "Mengeluarkan warna RGB yang lebih terang", "Bateri lebih tahan lama"],
    correct: 1
  },
  {
    question: "Antara berikut, manakah komponen yang BUKAN sebahagian daripada Peranti Output?",
    options: ["Monitor / Paparan", "Pembesar Suara (Speaker)", "Pengimbas Kod Bar (Barcode Scanner)", "Pencetak (Printer)"],
    correct: 2
  }
];

// ==========================================
// KOMPONEN UTAMA
// ==========================================
export default function ModuleIKR3013({ onBackToPortal }) {
  // State Pembelajaran
  const [view, setView] = useState('menu');
  const [activeTopic, setActiveTopic] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [unlockedTopicIndex, setUnlockedTopicIndex] = useState(() => {
    try {
      const saved = localStorage.getItem('ikr3013_progress');
      return saved !== null ? parseInt(saved, 10) : 0;
    } catch (e) {
      return 0; // Pelindung (Fallback) jika browser sekat storan
    }
  }); // <-- Fungsi jejak progress bacaan pelajar kekal dengan localStorage

  // State Recommender AI
  const [isRecommenderStarted, setIsRecommenderStarted] = useState(false);
  const [recStep, setRecStep] = useState(0);
  const [recLoading, setRecLoading] = useState(false);
  const [recPreferences, setRecPreferences] = useState({ usage: '', type: '', budget: '' });
  const [recResult, setRecResult] = useState(null);

  // Reference for Fullscreen AR Viewer
  const arContainerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // --- KESAN AUTOMATIK SKROL KE ATAS ---
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view, activeTopic]);

  // Simpan ke localStorage setiap kali progress berubah secara selamat
  useEffect(() => {
    try {
      localStorage.setItem('ikr3013_progress', unlockedTopicIndex.toString());
    } catch (e) {
      console.error("Browser tidak menyokong penyimpanan memori tempatan", e);
    }
  }, [unlockedTopicIndex]);

  // --- Fungsi Modul E-Pembelajaran ---
  const handleTopicClick = (topic, index) => {
    setActiveTopic(topic);
    setView('topic');
    setActiveTab('basic');
    // Buka kunci topik seterusnya jika topik ini baru pertama kali dibaca
    if (index === unlockedTopicIndex) {
      setUnlockedTopicIndex(prev => prev + 1);
    }
  };

  const handleQuizSubmit = (qIndex, optionIndex) => {
    setQuizAnswers({ ...quizAnswers, [qIndex]: optionIndex });
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((q, index) => {
      if (quizAnswers[index] === q.correct) score++;
    });
    setQuizScore(score);
    setQuizCompleted(true);
  };

  // KOMPONEN BUTANG KEMBALI ELEGAN (Diletakkan di bahagian bawah)
  const BackButton = () => (
    <div className="mt-12 mb-4 flex justify-center animate-slide-up w-full">
      <button 
        onClick={() => {
          setView('menu');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="group flex items-center gap-3 px-8 py-3.5 bg-white text-slate-700 font-bold rounded-full shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_30px_-10px_rgba(59,130,246,0.25)] hover:text-blue-700 hover:-translate-y-1 transition-all duration-300 border border-slate-200"
      >
        <div className="bg-slate-100 p-2 rounded-full group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        </div>
        Kembali ke Menu Utama
      </button>
    </div>
  );

  // --- Fungsi Recommender AI ---
  const createSearchLink = (query) => `https://www.google.com/search?q=${encodeURIComponent(query + " harga malaysia review")}`;

  const generateRecommendation = () => {
    setRecLoading(true);
    
    setTimeout(() => {
      let recommendation = {
        title: '',
        aiAnalysis: '', 
        specs: { cpu: '', ram: '', gpu: '', storage: '' },
        examples: [],
        warning: null
      };

      const { usage, type, budget } = recPreferences;

      // KATEGORI 1: GAMING
      if (usage === 'gaming') {
        recommendation.title = type === 'laptop' ? 'Laptop Gaming (Disusun: Murah ➝ Mahal)' : 'PC Gaming (Disusun: Murah ➝ Mahal)';
        
        if (budget === 'low') { // < RM 2,500
          recommendation.aiAnalysis = type === 'laptop' 
            ? "Analisis Bajet: RM2,500 sangat ketat. Senarai disusun bermula dari pilihan terpakai/refurbished, jenama bajet, hingga ke model 'entry-level' baharu."
            : "Analisis Bajet: Senarai disusun bermula dengan PC tanpa kad grafik (APU) yang paling murah, diikuti PC refurbished, dan akhirnya PC bajet dengan kad grafik diskrit.";
          
          recommendation.specs = { cpu: 'Ryzen 5 5600H / i5-11400H', ram: '8GB (Wajib tambah ke 16GB)', gpu: 'GTX 1650 / Vega 7 (iGPU)', storage: '512GB NVMe' };
          recommendation.warning = "Amaran: Model termurah mungkin set 'Refurbished' atau 'APU'. Baca deskripsi penjual dengan teliti.";
          
          recommendation.examples = type === 'laptop' ? [
            { name: 'Dell G15 (Used/Refurbished)', link: createSearchLink('Used Dell G15 gaming laptop malaysia') },
            { name: 'Acer Aspire 7 (GTX 1650)', link: createSearchLink('Acer Aspire 7 GTX 1650') },
            { name: 'Colorful X15 (Jenama Bajet)', link: createSearchLink('Colorful X15 gaming laptop malaysia') },
            { name: 'MSI GF63 Thin 11SC', link: createSearchLink('MSI GF63 Thin 11SC-672MY') },
            { name: 'Lenovo IdeaPad Gaming 3', link: createSearchLink('Lenovo IdeaPad Gaming 3 Ryzen 5 GTX 1650') },
            { name: 'Machreator (Jenama Lokal)', link: createSearchLink('Machreator gaming laptop price') },
            { name: 'Acer Nitro 5 (AN515-57)', link: createSearchLink('Acer Nitro 5 AN515-57 GTX 1650') },
            { name: 'HP Victus 15 (Ryzen 5)', link: createSearchLink('HP Victus 15 fb0032AX') },
            { name: 'Asus TUF F15 FX506L', link: createSearchLink('Asus TUF Gaming F15 FX506L') },
            { name: 'Illegear (Clearance Stock)', link: createSearchLink('Illegear laptop clearance sale') }
          ] : [
            { name: 'Set PC Gaming Shopee Bajet', link: createSearchLink('Budget Gaming PC RM1500 Malaysia') },
            { name: 'Custom PC: Ryzen 5 5600G (APU)', link: createSearchLink('Ryzen 5 5600G APU gaming pc build malaysia') },
            { name: 'Refurbished Dell Optiplex + GTX 1650', link: createSearchLink('Dell Optiplex gaming PC Malaysia GTX 1650') },
            { name: 'Custom: Ryzen 5 4500 + RX 580', link: createSearchLink('Budget PC RX 580 Malaysia') },
            { name: 'Intel Arc A380 Budget Build', link: createSearchLink('Intel Arc A380 budget pc build') },
            { name: 'Armaggeddon Nuke PC (Entry)', link: createSearchLink('Armaggeddon gaming pc price list') },
            { name: 'Custom: i3-12100F + GTX 1650', link: createSearchLink('i3-12100F GTX 1650 budget gaming pc') },
            { name: 'Lenovo IdeaCentre Gaming 5 (Used)', link: createSearchLink('Lenovo IdeaCentre Gaming 5 price') },
            { name: 'Acer Nitro 50 (Model Lama)', link: createSearchLink('Acer Nitro 50 i5-11400F') },
            { name: 'HP Victus 15L Desktop', link: createSearchLink('HP Victus 15L Gaming Desktop TG02') }
          ];

        } else if (budget === 'mid') { // RM 2,500 - RM 4,500
          recommendation.aiAnalysis = "Analisis Bajet: Disusun dari model RTX 2050/3050 (Permulaan Mid) hingga ke model RTX 4050/4060 (High Mid).";
          recommendation.specs = { cpu: 'i5-13420H / Ryzen 7 7735HS', ram: '16GB DDR5', gpu: 'RTX 4050 / RTX 4060', storage: '512GB/1TB Gen4 SSD' };
          
          recommendation.examples = type === 'laptop' ? [
            { name: 'MSI Bravo 15 (Ryzen/Radeon)', link: createSearchLink('MSI Bravo 15 Ryzen 7 RX6550M') },
            { name: 'Gigabyte G5 KF (RTX 4060 Bajet)', link: createSearchLink('Gigabyte G5 KF RTX 4060 price') },
            { name: 'Colorful Evolution P15', link: createSearchLink('Colorful Evolution P15 review') },
            { name: 'MSI Cyborg 15', link: createSearchLink('MSI Cyborg 15 A12VE RTX 4050') },
            { name: 'Lenovo LOQ 15', link: createSearchLink('Lenovo LOQ 15IRH8 price malaysia') },
            { name: 'Acer Nitro V 15', link: createSearchLink('Acer Nitro V 15 ANV15-51 RTX 4050') },
            { name: 'HP Victus 16', link: createSearchLink('HP Victus 16-s0039AX') },
            { name: 'Asus TUF Gaming A15', link: createSearchLink('Asus TUF Gaming A15 FA507') },
            { name: 'Dell G15 5530', link: createSearchLink('Dell G15 5530 i5 RTX 3050') },
            { name: 'Illegear Machreator One', link: createSearchLink('Illegear Machreator One specs') }
          ] : [
            { name: 'MSI MAG Infinite S3', link: createSearchLink('MSI MAG Infinite S3 13th gen') },
            { name: 'Acer Nitro 50 (N50-650)', link: createSearchLink('Acer Nitro 50 i5 RTX 3050 desktop') },
            { name: 'Custom: Ryzen 5 7500F + RTX 4060', link: createSearchLink('Ryzen 5 7500F RTX 4060 build malaysia') },
            { name: 'Custom: i5-13400F + RX 7600', link: createSearchLink('i5 13400F RX 7600 PC build price') },
            { name: 'Custom: i5-12600K + Arc A770', link: createSearchLink('Intel Arc A770 PC build') },
            { name: 'HP Omen 25L', link: createSearchLink('HP Omen 25L Malaysia price') },
            { name: 'Lenovo Legion Tower 5i', link: createSearchLink('Lenovo Legion Tower 5i Gen 8') },
            { name: 'Custom: Ryzen 7 5700X3D + RX 6700 XT', link: createSearchLink('Ryzen 7 5700X3D gaming pc') },
            { name: 'Dell XPS Desktop 8950', link: createSearchLink('Dell XPS Desktop 8950 i5') },
            { name: 'Illegear Raider', link: createSearchLink('Illegear Raider desktop price') }
          ];

        } else { // > RM 4,500
          recommendation.aiAnalysis = "Analisis Bajet: Disusun dari model 'Entry High-End' (RTX 4060/4070) hingga ke model 'Flagship' (RTX 4080/4090).";
          recommendation.specs = { cpu: 'i7-14700HX / Ryzen 9', ram: '32GB DDR5', gpu: 'RTX 4070 / 4080 / 4090', storage: '1TB - 2TB NVMe' };
          
          recommendation.examples = type === 'laptop' ? [
            { name: 'Gigabyte Aorus 15', link: createSearchLink('Gigabyte Aorus 15 BSF') },
            { name: 'Acer Predator Helios Neo 16', link: createSearchLink('Acer Predator Helios Neo 16 RTX 4070') },
            { name: 'Lenovo Legion Pro 5i', link: createSearchLink('Lenovo Legion Pro 5i Gen 9 RTX 4070') },
            { name: 'HP Omen 16 Transcend', link: createSearchLink('HP Omen Transcend 16') },
            { name: 'Illegear Selenite X', link: createSearchLink('Illegear Selenite X RTX 4080') },
            { name: 'Asus ROG Zephyrus G16', link: createSearchLink('ROG Zephyrus G16 2024') },
            { name: 'Dell Alienware m16 R2', link: createSearchLink('Alienware m16 R2 malaysia') },
            { name: 'ROG Strix SCAR 16/18', link: createSearchLink('ROG Strix SCAR 16 2024 price') },
            { name: 'Razer Blade 15 (OLED)', link: createSearchLink('Razer Blade 15 OLED malaysia') },
            { name: 'MSI Vector GP68 HX', link: createSearchLink('MSI Vector GP68 HX price') }
          ] : [
            { name: 'NZXT Player: Three', link: createSearchLink('NZXT Player Three PC') },
            { name: 'Custom: Ryzen 7 7800X3D + RTX 4070 Ti', link: createSearchLink('Ryzen 7 7800X3D RTX 4070 Ti Super build') },
            { name: 'HP Omen 45L Desktop', link: createSearchLink('HP Omen 45L desktop price') },
            { name: 'Lenovo Legion Tower 7i', link: createSearchLink('Lenovo Legion Tower 7i Gen 8') },
            { name: 'Custom: i7-14700K + RTX 4080 Super', link: createSearchLink('i7-14700K RTX 4080 Super PC') },
            { name: 'Custom: Hyte Y60 Aesthetic Build', link: createSearchLink('Hyte Y60 aesthetic pc build') },
            { name: 'Custom: All-White Ryzen 9 + 7900 XTX', link: createSearchLink('White PC Build 7900 XTX') },
            { name: 'Dell Alienware Aurora R16', link: createSearchLink('Alienware Aurora R16 malaysia') },
            { name: 'MSI MEG Trident X2', link: createSearchLink('MSI MEG Trident X2 price') },
            { name: 'Corsair One i500', link: createSearchLink('Corsair One i500 malaysia') }
          ];
        }
      } 
      
      // KATEGORI 2: STUDENT / OFFICE
      else if (usage === 'student' || usage === 'office') {
        recommendation.title = type === 'laptop' ? 'Produktiviti & Pelajar (Disusun: Murah ➝ Mahal)' : 'PC Pejabat (Disusun: Murah ➝ Mahal)';
        
        if (budget === 'low') { // < RM 2,500
          recommendation.aiAnalysis = "Analisis Bajet: Disusun dari model asas (Infinix/Chuwi) hingga ke model jenama utama yang lebih tahan lasak (Dell/HP/Lenovo).";
          recommendation.specs = { cpu: 'i5-1235U / Ryzen 5 7520U', ram: '8GB/16GB', gpu: 'Integrated', storage: '512GB SSD' };
          
          recommendation.examples = type === 'laptop' ? [
            { name: 'Chuwi CoreBook X', link: createSearchLink('Chuwi CoreBook X review') },
            { name: 'Infinix INBook X2', link: createSearchLink('Infinix INBook X2 malaysia') },
            { name: 'Lenovo IdeaPad Slim 3', link: createSearchLink('Lenovo IdeaPad Slim 3 15AMN8') },
            { name: 'Acer Aspire 5', link: createSearchLink('Acer Aspire 5 A515-58M i5') },
            { name: 'Asus Vivobook Go 15', link: createSearchLink('Asus Vivobook Go 15 OLED') },
            { name: 'HP 15s (Ryzen 5)', link: createSearchLink('HP 15s Ryzen 5 5500U') },
            { name: 'MSI Modern 14', link: createSearchLink('MSI Modern 14 C12M') },
            { name: 'Honor MagicBook X16', link: createSearchLink('Honor MagicBook X16 malaysia price') },
            { name: 'Huawei MateBook D15', link: createSearchLink('Huawei MateBook D15 i5 11th gen') },
            { name: 'Dell Inspiron 15 3520', link: createSearchLink('Dell Inspiron 15 3520 i5') }
          ] : [
            { name: 'Refurbished HP EliteDesk 800 G4', link: createSearchLink('HP EliteDesk 800 G4 Mini refurbished') },
            { name: 'Dell Optiplex 7070 (Refurbished)', link: createSearchLink('Dell Optiplex 7070 refurbished i5') },
            { name: 'GMKtec NucBox (Mini PC)', link: createSearchLink('GMKtec NucBox malaysia') },
            { name: 'Mini PC: Beelink SEi12', link: createSearchLink('Beelink SEi12 i5-1235U malaysia') },
            { name: 'Intel NUC 11 Essential', link: createSearchLink('Intel NUC 11 Essential Kit') },
            { name: 'MSI Cubi 5 12M', link: createSearchLink('MSI Cubi 5 12M') },
            { name: 'HP Slim Desktop S01', link: createSearchLink('HP Slim Desktop S01 specs') },
            { name: 'Lenovo IdeaCentre 3', link: createSearchLink('Lenovo IdeaCentre 3 desktop') },
            { name: 'Acer Aspire XC', link: createSearchLink('Acer Aspire XC desktop') },
            { name: 'Custom: i3-12100 Office PC', link: createSearchLink('i3-12100 office pc build') }
          ];

        } else if (budget === 'mid') { // RM 2,500 - RM 4,500
          recommendation.aiAnalysis = "Analisis Bajet: Disusun dari ultrabook nilai terbaik (Swift Go/MSI Prestige) hingga ke model premium seperti MacBook dan Dell.";
          recommendation.specs = { cpu: 'Apple M1/M2 / Intel Evo i5/i7', ram: '8GB/16GB', gpu: 'Integrated', storage: '512GB NVMe' };
          
          recommendation.examples = type === 'laptop' ? [
            { name: 'MSI Prestige 13 Evo', link: createSearchLink('MSI Prestige 13 Evo') },
            { name: 'Acer Swift Go 14', link: createSearchLink('Acer Swift Go 14 OLED') },
            { name: 'Lenovo Yoga Slim 6i', link: createSearchLink('Lenovo Yoga Slim 6i Gen 8') },
            { name: 'HP Pavilion Plus 14', link: createSearchLink('HP Pavilion Plus 14 ey0000') },
            { name: 'MacBook Air M1', link: createSearchLink('MacBook Air M1 price malaysia') },
            { name: 'Asus Zenbook 14 OLED', link: createSearchLink('Asus Zenbook 14 OLED UX3402') },
            { name: 'Huawei MateBook 14', link: createSearchLink('Huawei MateBook 14 2024') },
            { name: 'Microsoft Surface Laptop Go 3', link: createSearchLink('Microsoft Surface Laptop Go 3') },
            { name: 'Dell Inspiron 14 Plus', link: createSearchLink('Dell Inspiron 14 Plus 7440') },
            { name: 'LG Gram 14', link: createSearchLink('LG Gram 14 price malaysia') }
          ] : [
            { name: 'Acer Aspire TC-1780', link: createSearchLink('Acer Aspire TC-1780') },
            { name: 'HP Pavilion Desktop TP01', link: createSearchLink('HP Pavilion Desktop TP01') },
            { name: 'Lenovo ThinkCentre M70q', link: createSearchLink('Lenovo ThinkCentre M70q Gen 4') },
            { name: 'Dell Inspiron Desktop 3020', link: createSearchLink('Dell Inspiron Desktop 3020') },
            { name: 'Mac Mini M2', link: createSearchLink('Mac Mini M2 Malaysia price') },
            { name: 'Minisforum UM790 Pro', link: createSearchLink('Minisforum UM790 Pro malaysia') },
            { name: 'Intel NUC 13 Pro', link: createSearchLink('Intel NUC 13 Pro Kit') },
            { name: 'Lenovo IdeaCentre 5i', link: createSearchLink('Lenovo IdeaCentre 5i Gen 8') },
            { name: 'Dell Optiplex 7000 Micro', link: createSearchLink('Dell Optiplex 7000 Micro') },
            { name: 'Custom: i5-13500 SFF', link: createSearchLink('i5-13500 ITX build') }
          ];

        } else { // > RM 4,500
          recommendation.aiAnalysis = "Analisis Bajet: Disusun dari model premium asas hingga ke model 'Flagship' mewah.";
          recommendation.specs = { cpu: 'Apple M3 / Core Ultra 7', ram: '16GB - 32GB', gpu: 'Integrated / Entry Dedicated', storage: '1TB SSD' };
          
          recommendation.examples = type === 'laptop' ? [
            { name: 'Asus Zenbook S 13 OLED', link: createSearchLink('Asus Zenbook S 13 OLED UX5304') },
            { name: 'MacBook Air M2', link: createSearchLink('MacBook Air M2 16GB RAM price') },
            { name: 'Dell XPS 13 (9340)', link: createSearchLink('Dell XPS 13 9340 price') },
            { name: 'MacBook Air M3', link: createSearchLink('MacBook Air M3 16GB price malaysia') },
            { name: 'Samsung Galaxy Book4 Pro', link: createSearchLink('Samsung Galaxy Book4 Pro malaysia') },
            { name: 'HP Spectre x360 14', link: createSearchLink('HP Spectre x360 14 2024') },
            { name: 'Lenovo Yoga 9i', link: createSearchLink('Lenovo Yoga 9i 2-in-1 Gen 9') },
            { name: 'Lenovo ThinkPad X1 Carbon', link: createSearchLink('ThinkPad X1 Carbon Gen 11 malaysia') },
            { name: 'Microsoft Surface Laptop 6', link: createSearchLink('Microsoft Surface Laptop 6') },
            { name: 'Huawei MateBook X Pro', link: createSearchLink('Huawei MateBook X Pro 2024') }
          ] : [
            { name: 'Mac Studio M2 Max', link: createSearchLink('Mac Studio M2 Max') },
            { name: 'MSI PRO DP180', link: createSearchLink('MSI PRO DP180') },
            { name: 'Apple iMac M3', link: createSearchLink('iMac M3 price malaysia') },
            { name: 'Dell XPS Desktop 8960', link: createSearchLink('Dell XPS Desktop 8960') },
            { name: 'HP EliteOne 800 G9 AIO', link: createSearchLink('HP EliteOne 800 G9') },
            { name: 'Lenovo Yoga AIO 9i', link: createSearchLink('Lenovo Yoga AIO 9i') },
            { name: 'Custom: Core Ultra 7 ITX', link: createSearchLink('Intel Core Ultra 7 ITX build') },
            { name: 'Dell Optiplex 7410 AIO', link: createSearchLink('Dell Optiplex 7410 All-in-One') },
            { name: 'HP Envy All-in-One 34', link: createSearchLink('HP Envy All-in-One 34') },
            { name: 'Microsoft Surface Studio 2+', link: createSearchLink('Microsoft Surface Studio 2+ malaysia') }
          ];
        }
      }

      // KATEGORI 3: CREATIVE
      else if (usage === 'creative') {
        recommendation.title = 'Workstation Pereka Kreatif (Disusun: Murah ➝ Mahal)';
        
        if (budget === 'low') {
           recommendation.aiAnalysis = "Analisis Bajet: Disusun dari laptop terpakai/refurbished (nilai terbaik) hingga ke laptop baru dengan skrin IPS asas.";
           recommendation.specs = { cpu: 'Ryzen 5 5500U/5625U', ram: '8GB (Wajib 16GB)', gpu: 'Radeon Graphics', storage: '512GB' };
           recommendation.warning = "Amaran: Rendering berat akan perlahan. Sesuai untuk Photoshop ringan.";
           
           recommendation.examples = type === 'laptop' ? [
            { name: 'Refurbished Dell Precision', link: createSearchLink('Refurbished Dell Precision laptop malaysia') },
            { name: 'MacBook Pro Retina (Used 2018)', link: createSearchLink('Used MacBook Pro 15 2018 malaysia') },
            { name: 'Acer Swift 3 (Old Stock)', link: createSearchLink('Acer Swift 3 SF314') },
            { name: 'Lenovo IdeaPad Slim 5', link: createSearchLink('Lenovo IdeaPad Slim 5 Ryzen 5') },
            { name: 'Acer Aspire 5', link: createSearchLink('Acer Aspire 5 A515-45 Ryzen 5') },
            { name: 'HP 15s (Ryzen 7)', link: createSearchLink('HP 15s Ryzen 7 5700U') },
            { name: 'Huawei MateBook D16', link: createSearchLink('Huawei MateBook D16 i5-12450H') },
            { name: 'Asus Vivobook 16', link: createSearchLink('Asus Vivobook 16 M1605') },
            { name: 'MSI Modern 15 (H-Series)', link: createSearchLink('MSI Modern 15 B12M') },
            { name: 'Honor MagicBook 16', link: createSearchLink('Honor MagicBook 16') }
           ] : [
            { name: 'Used Dell Precision Tower', link: createSearchLink('Used Dell Precision Tower T5810') },
            { name: 'Refurbished HP Z440', link: createSearchLink('HP Z440 Workstation malaysia') },
            { name: 'Used iMac 27" 5K', link: createSearchLink('Used iMac 27 inch 5K malaysia') },
            { name: 'Custom: Ryzen 5 5600 + GTX 1650', link: createSearchLink('Budget video editing PC malaysia') },
            { name: 'Acer Aspire TC (i5)', link: createSearchLink('Acer Aspire TC i5 desktop') },
            { name: 'HP Pavilion Desktop (Ryzen 7)', link: createSearchLink('HP Pavilion Desktop Ryzen 7') },
            { name: 'Custom: i5-12400 (iGPU)', link: createSearchLink('i5-12400 productivity build') },
            { name: 'Custom: Ryzen 7 5700G APU', link: createSearchLink('Ryzen 7 5700G APU build for editing') },
            { name: 'Lenovo ThinkStation P3 Tiny', link: createSearchLink('Lenovo ThinkStation P3 Tiny') },
            { name: 'Mac Mini M1 (Used)', link: createSearchLink('Used Mac Mini M1 malaysia') }
           ];
        } else if (budget === 'mid') {
           recommendation.aiAnalysis = "Analisis Bajet: Disusun dari model 'Creator' permulaan hingga ke model dengan GPU RTX Studio yang lebih berkuasa.";
           recommendation.specs = { cpu: 'i7-13620H / Ryzen 7', ram: '16GB (Disyorkan 32GB)', gpu: 'RTX 3050 / 4050', storage: '1TB SSD' };
           
           recommendation.examples = type === 'laptop' ? [
            { name: 'MSI Creator M16', link: createSearchLink('MSI Creator M16') },
            { name: 'Asus Vivobook Pro 15 OLED', link: createSearchLink('Asus Vivobook Pro 15 OLED RTX') },
            { name: 'Acer Swift X 14', link: createSearchLink('Acer Swift X 14 RTX 3050') },
            { name: 'Gigabyte Aero 14 OLED', link: createSearchLink('Gigabyte Aero 14 OLED') },
            { name: 'MacBook Air M2 (16GB RAM)', link: createSearchLink('MacBook Air M2 16GB RAM price') },
            { name: 'Lenovo Yoga Pro 7i', link: createSearchLink('Lenovo Yoga Pro 7i Gen 8') },
            { name: 'HP Envy 16', link: createSearchLink('HP Envy 16 RTX 4060') },
            { name: 'Dell Inspiron 16 Plus', link: createSearchLink('Dell Inspiron 16 Plus 7630') },
            { name: 'MacBook Pro 13 (M2)', link: createSearchLink('MacBook Pro 13 M2 price') },
            { name: 'Asus Zenbook Pro 14', link: createSearchLink('Asus Zenbook Pro 14 OLED') }
           ] : [
            { name: 'Mac Mini M2 (16GB RAM)', link: createSearchLink('Mac Mini M2 16GB RAM price') },
            { name: 'Custom: Ryzen 7 7700', link: createSearchLink('Ryzen 7 7700 pc build') },
            { name: 'Lenovo IdeaCentre 5i Creator', link: createSearchLink('Lenovo IdeaCentre 5i gen 8 i7') },
            { name: 'HP Envy Desktop', link: createSearchLink('HP Envy Desktop TE02') },
            { name: 'Custom: i5-13500 + RTX 3060', link: createSearchLink('i5-13500 RTX 3060 12GB build') },
            { name: 'Mac Mini M2 Pro (Base)', link: createSearchLink('Mac Mini M2 Pro price malaysia') },
            { name: 'Dell XPS Desktop 8950', link: createSearchLink('Dell XPS Desktop 8950 i5') },
            { name: 'MSI Content Creation P100', link: createSearchLink('MSI Prestige P100') },
            { name: 'NZXT Player: Two', link: createSearchLink('NZXT Player Two PC') },
            { name: 'Custom: i5-14600K + RTX 4060 Ti', link: createSearchLink('i5-14600K RTX 4060 Ti build') }
           ];
        } else {
           recommendation.aiAnalysis = "Analisis Bajet: Disusun dari model profesional asas hingga ke stesen kerja berkuasa tinggi.";
           recommendation.specs = { cpu: 'M3 Pro / i9 / Ryzen 9', ram: '32GB - 64GB', gpu: 'RTX 4070 / M3 Pro', storage: '2TB NVMe' };
           
           recommendation.examples = type === 'laptop' ? [
            { name: 'Gigabyte Aero 16 OLED', link: createSearchLink('Gigabyte Aero 16 OLED RTX 4070') },
            { name: 'MSI Creator Z17 HX Studio', link: createSearchLink('MSI Creator Z17 HX Studio') },
            { name: 'MacBook Pro 14 (M3 Pro)', link: createSearchLink('MacBook Pro 14 M3 Pro price malaysia') },
            { name: 'Lenovo Yoga Pro 9i', link: createSearchLink('Lenovo Yoga Pro 9i Gen 9') },
            { name: 'Dell XPS 16 (OLED)', link: createSearchLink('Dell XPS 16 9640') },
            { name: 'HP ZBook Studio G10', link: createSearchLink('HP ZBook Studio G10') },
            { name: 'Asus ProArt Studiobook 16', link: createSearchLink('Asus ProArt Studiobook 16 OLED H7604') },
            { name: 'Razer Blade 16 (Creator)', link: createSearchLink('Razer Blade 16 2024') },
            { name: 'ConceptD 7 Ezel', link: createSearchLink('Acer ConceptD 7 Ezel') },
            { name: 'Lenovo ThinkPad P1 Gen 6', link: createSearchLink('ThinkPad P1 Gen 6') }
           ] : [
            { name: 'Mac Studio M2 Max', link: createSearchLink('Mac Studio M2 Max price') },
            { name: 'Dell Precision 3660', link: createSearchLink('Dell Precision 3660 Tower') },
            { name: 'HP Z2 Tower G9', link: createSearchLink('HP Z2 Tower G9 Workstation') },
            { name: 'Lenovo ThinkStation P3 Tower', link: createSearchLink('Lenovo ThinkStation P3') },
            { name: 'Custom: i7-14700K + RTX 4070 Ti', link: createSearchLink('Video Editing PC Build 2024') },
            { name: 'Corsair One i500', link: createSearchLink('Corsair One i500 workstation') },
            { name: 'Puget Systems (Import)', link: createSearchLink('Puget Systems workstation') },
            { name: 'Custom: Threadripper 7000', link: createSearchLink('Threadripper 7000 pc build') },
            { name: 'Mac Pro (Apple Silicon)', link: createSearchLink('Mac Pro M2 Ultra price') },
            { name: 'BOXX Apexx S3', link: createSearchLink('BOXX Apexx S3') }
           ];
        }
      }

      setRecResult(recommendation);
      setRecLoading(false);
      setRecStep(4);
    }, 1500);
  };

  const handleRecSelect = (category, value) => {
    setRecPreferences(prev => ({ ...prev, [category]: value }));
    if (category === 'budget' || (category === 'type' && recPreferences.usage === 'creative')) {
       setTimeout(() => {
         if (category === 'budget') generateRecommendation(); 
         else if (category === 'type' && recPreferences.usage === 'creative') {
            setRecPreferences(prev => ({...prev, budget: 'mid'}));
            generateRecommendation();
         }
         else setRecStep(prev => prev + 1);
       }, 300);
    } else {
      setTimeout(() => setRecStep(prev => prev + 1), 300);
    }
  };

  const resetRecommender = () => {
    setRecStep(0);
    setRecPreferences({ usage: '', type: '', budget: '' });
    setRecResult(null);
  };

  const exitRecommender = () => {
    setIsRecommenderStarted(false);
    resetRecommender();
    setView('menu');
  };

  // Komponen Kad Pilihan AI
  const OptionCard = ({ icon: Icon, title, desc, onClick, active }) => (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-300 w-full text-center hover:shadow-lg hover:-translate-y-1
        ${active 
          ? 'border-blue-600 bg-blue-50 text-blue-900' 
          : 'border-slate-200 bg-white hover:border-blue-300 text-slate-700'
        }`}
    >
      <div className={`p-4 rounded-full mb-4 ${active ? 'bg-blue-200' : 'bg-slate-100'}`}>
        <Icon size={32} className={active ? 'text-blue-700' : 'text-slate-500'} />
      </div>
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-sm text-slate-500">{desc}</p>
    </button>
  );

  // KAD INFO UNTUK INFOGRAFIK CPU
  const InfoCard = ({ letter, label, desc, ex, color }) => (
    <div className="flex items-center gap-3 sm:gap-4 bg-white p-3 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className={`w-10 h-10 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center font-black text-lg sm:text-xl rounded-lg ${color}`}>
        {letter === '-' ? <span className="opacity-30">-</span> : letter}
      </div>
      <div>
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 mb-0.5">
          <h5 className="font-bold text-slate-800 text-sm sm:text-base">{label}</h5>
          <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-mono w-fit">Cth: {ex}</span>
        </div>
        <p className="text-xs text-slate-600 leading-snug">{desc}</p>
      </div>
    </div>
  );

  const toggleFullScreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // ==========================================
  // RENDERER: MENU UTAMA
  // ==========================================
  const renderMenu = () => {
    const progressPercentage = Math.min(100, Math.round((unlockedTopicIndex / topics.length) * 100));
    const nextTopic = topics[unlockedTopicIndex];

    return (
      <div className="space-y-6 animate-fade-in pb-10">
        <header className="text-center bg-gradient-to-r from-blue-900 to-blue-700 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-10 right-10 transform rotate-12"><Cpu size={100}/></div>
             <div className="absolute bottom-5 left-10 transform -rotate-12"><CircuitBoard size={80}/></div>
          </div>

          <div className="relative z-10">
                <button onClick={onBackToPortal} className="mb-4 inline-flex items-center gap-2 text-white bg-black/20 hover:bg-black/30 px-4 py-2 rounded-xl transition-all text-sm font-bold backdrop-blur-sm border border-white/20 z-50 relative">
                    <Home size={18} /> Kembali ke Portal Utama
                </button>
              
              <h1 className="text-3xl font-bold mb-2">Modul IKR3013: Computer Hardware & Software</h1>
              
              <div className="mt-4 mb-6 inline-block bg-blue-800/50 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-semibold border border-blue-600">
              E-Learning Interaktif
              </div>
              
              <div className="flex justify-center mt-2">
                  <a 
                      href="https://drive.google.com/drive/folders/1R0fi3x5-TLLOHDClZDU-Mnh89UKeZfeS?usp=sharing"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-white text-blue-800 rounded-xl font-bold hover:bg-blue-50 hover:scale-105 transition-all shadow-md group"
                  >
                      <Download size={20} className="group-hover:animate-bounce" />
                      Muat Turun Nota PDF
                  </a>
              </div>
          </div>
        </header>

        {/* --- PROGRESS BAR PEMBELAJARAN --- */}
        <div className={`px-4 mt-4 transition-all duration-500 ${progressPercentage < 100 ? 'sticky top-4 z-40' : ''}`}>
          <div className="bg-white/90 backdrop-blur-md p-5 sm:p-6 rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] border border-white/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 opacity-50 rounded-full blur-2xl pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
            
            <div className="flex justify-between items-end mb-3 relative z-10">
              <div>
                <h3 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
                  <Award className="text-amber-500" size={24} /> Prestasi Bacaan Anda
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  {unlockedTopicIndex < topics.length 
                    ? <span className="flex items-center gap-1.5"><ChevronRight size={16} className="text-blue-500"/> Sila baca urutan seterusnya: <strong className="text-blue-600">{nextTopic?.title}</strong></span> 
                    : <span className="flex items-center gap-1.5 text-green-600 font-bold"><CheckCircle size={16}/> Selesai! Anda kini boleh menjawab Kuiz Penilaian.</span>}
                </p>
              </div>
              <div className="text-right">
                <span className="font-black text-blue-600 text-3xl">{progressPercentage}%</span>
              </div>
            </div>
            
            <div className="w-full bg-slate-100 rounded-full h-4 mb-2 overflow-hidden shadow-inner relative z-10">
              <div 
                className="bg-gradient-to-r from-blue-500 to-cyan-400 h-4 rounded-full transition-all duration-1000 ease-out relative" 
                style={{ width: `${progressPercentage}%` }}
              >
                 {/* ANIMASI BERHENTI BILA 100% */}
                 {progressPercentage < 100 && (
                   <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full animate-[shimmer_1.5s_infinite]"></div>
                 )}
              </div>
            </div>
            
            <div className="flex justify-between text-xs font-bold text-slate-400 relative z-10">
              <span>Mula</span>
              <span>{Math.min(unlockedTopicIndex, topics.length)} daripada {topics.length} Topik Dibaca</span>
            </div>

            {/* BUTANG RESET PROGRESS UNTUK PENGUJI / PELAJAR */}
            {unlockedTopicIndex > 0 && (
              <div className="mt-4 text-center relative z-10">
                <button 
                  onClick={() => {
                    if(window.confirm('Adakah anda pasti mahu set semula (reset) semua kemajuan bacaan anda dari awal?')) {
                      setUnlockedTopicIndex(0);
                      setQuizCompleted(false);
                      setQuizScore(0);
                      setQuizAnswers({});
                      localStorage.removeItem('ikr3013_progress');
                    }
                  }}
                  className="text-[10px] sm:text-xs text-slate-400 hover:text-red-500 underline transition-colors"
                >
                  Mula Semula (Reset Progress)
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 mt-6">
          {topics.map((topic, index) => {
            const isLocked = index > unlockedTopicIndex;
            const isCompleted = index < unlockedTopicIndex;
            
            return (
              <button
                key={topic.id}
                onClick={() => !isLocked && handleTopicClick(topic, index)}
                className={`flex items-center p-6 bg-white rounded-xl shadow-md transition-all duration-200 border text-left group relative overflow-hidden ${
                  isLocked 
                    ? 'opacity-60 cursor-not-allowed border-gray-200' 
                    : 'hover:shadow-xl hover:scale-[1.02] border-gray-100'
                }`}
              >
                {isCompleted && (
                  <div className="absolute top-3 right-3 text-green-500 bg-green-50 rounded-full p-1 shadow-sm border border-green-100 z-20" title="Selesai Dibaca">
                    <Check size={16} strokeWidth={3} />
                  </div>
                )}
                <div className={`p-4 rounded-lg ${isLocked ? 'bg-gray-300' : topic.color} text-white mr-4 shadow-sm z-10`}>
                  {isLocked ? <Lock size={40} /> : topic.icon}
                </div>
                <div className="z-10 flex-1 pr-6">
                  <h3 className={`text-xl font-bold ${isLocked ? 'text-gray-500' : 'text-gray-800 group-hover:text-blue-600'} transition-colors`}>
                    {topic.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {isLocked ? 'Kunci: Baca topik sebelumnya dahulu' : topic.description}
                  </p>
                </div>
                {!isLocked && <ChevronRight className="ml-auto text-gray-300 group-hover:text-blue-500 z-10" />}
                {isLocked && <Lock className="ml-auto text-gray-400 z-10" />}
                {!isLocked && (
                  <div className="absolute right-0 bottom-0 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none">
                      {topic.icon}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 mt-6">
           <button
              onClick={() => setView('selection')}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200 border-t-4 border-t-purple-500 text-center h-full"
            >
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mb-3">
                <ShoppingCart size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Panduan Pemilihan</h3>
              <p className="text-gray-500 text-xs mt-1">Tips memilih komponen yang serasi.</p>
           </button>

           <button
              onClick={() => setView('inspection')}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200 border-t-4 border-t-yellow-400 text-center h-full"
            >
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mb-3">
                <AlertTriangle size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Prosedur Pemeriksaan</h3>
              <p className="text-gray-500 text-xs mt-1">Keselamatan & penyelenggaraan.</p>
            </button>

            <button
              onClick={() => {
                const isQuizLocked = unlockedTopicIndex < topics.length;
                if (!isQuizLocked) setView('quiz');
              }}
              className={`relative flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md transition-all duration-300 border-t-4 text-center h-full ${
                unlockedTopicIndex < topics.length 
                  ? 'opacity-60 cursor-not-allowed border-t-gray-400' 
                  : !quizCompleted
                    ? 'hover:shadow-xl hover:scale-[1.02] border-t-green-500 ring-2 ring-green-400/50 ring-offset-2'
                    : 'hover:shadow-xl hover:scale-[1.02] border-t-green-400'
              }`}
            >
              {/* NOTIFIKASI LENCANA ANIMASI */}
              {unlockedTopicIndex >= topics.length && !quizCompleted && (
                <div className="absolute -top-3 -right-2 bg-red-500 text-white text-[11px] font-black px-4 py-1.5 rounded-full shadow-lg border-2 border-white animate-bounce z-20">
                  MULA MENJAWAB!
                </div>
              )}
              
              <div className={`p-3 rounded-full mb-3 ${unlockedTopicIndex < topics.length ? 'bg-gray-100 text-gray-500' : 'bg-green-100 text-green-600'}`}>
                {unlockedTopicIndex < topics.length ? <Lock size={28} /> : <CheckCircle size={28} />}
              </div>
              <h3 className="text-lg font-bold text-gray-800">Kuiz Penilaian</h3>
              <p className="text-gray-500 text-xs mt-1">
                {unlockedTopicIndex < topics.length ? 'Kunci: Baca semua topik dahulu' : 'Uji kefahaman anda.'}
              </p>
            </button>

            <button
              onClick={() => setView('ar')}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200 border-t-4 border-t-blue-500 text-center h-full"
            >
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mb-3">
                <Box size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Model AR 3D</h3>
              <p className="text-gray-500 text-xs mt-1">Lihat model interaktif secara nyata.</p>
            </button>
        </div>

        {/* BANNER BARU: PENCADANG AI (DIPINDAHKAN KE BAWAH) */}
        <div className="px-4 mt-8">
          <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-blue-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-blue-800">
            <div className="relative z-10 text-center md:text-left mb-6 md:mb-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/30 rounded-full text-blue-200 text-xs font-bold mb-3 border border-blue-400/30 backdrop-blur-sm">
                <Sparkles size={14} /> Ciri Baharu
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">Pakar Perunding AI PC<span className="text-blue-400">Pintar</span></h2>
              <p className="text-blue-100 max-w-lg text-sm md:text-base opacity-90">Tidak pasti nak beli model apa? Biar AI analisis bajet & kegunaan anda untuk padankan laptop atau PC terbaik dalam masa 60 saat.</p>
            </div>
            <button
              onClick={() => {
                setView('recommender');
                setIsRecommenderStarted(false);
              }}
              className="group relative z-10 bg-white text-blue-900 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 hover:scale-105 transition-all shadow-[0_0_30px_rgba(59,130,246,0.3)] flex items-center gap-3 whitespace-nowrap"
            >
              <Sparkles size={20} className="text-blue-600" /> Mula Analisis Percuma
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500 opacity-20 blur-3xl rounded-full translate-x-1/3 -translate-y-1/4 pointer-events-none"></div>
            <div className="absolute -left-10 bottom-0 w-40 h-40 bg-indigo-500 opacity-30 blur-2xl rounded-full pointer-events-none"></div>
          </div>
        </div>
      </div>
    );
  };

  // ==========================================
  // RENDERER: RECOMMENDER AI (PENCADANG PC)
  // ==========================================
  const renderRecommender = () => {
    // 1. Landing Page Recommender
    if (!isRecommenderStarted) {
      return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-blue-200 flex flex-col w-full relative">
          <nav className="bg-white px-4 md:px-6 py-4 shadow-sm flex justify-between items-center z-10">
            <div className="flex items-center gap-2 md:gap-4">
              <button onClick={() => setView('menu')} className="inline-flex items-center gap-2 text-gray-600 bg-gray-100 hover:bg-blue-100 hover:text-blue-700 px-4 py-2 rounded-xl transition-all text-sm font-bold border border-gray-200">
                <Home size={18} /> <span className="hidden md:inline">Menu Utama</span>
              </button>
              <div className="w-px h-6 bg-slate-200 mx-2 hidden md:block"></div>
              <div className="flex items-center gap-2 text-blue-700 font-extrabold text-xl tracking-tight">
                <Cpu size={28} className="text-blue-600" /> PC<span className="text-slate-800">Pintar</span> AI
              </div>
            </div>
            <a href="#" className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors hidden md:block">Bagaimana Ia Berfungsi?</a>
          </nav>
  
          <main className="flex-1 flex flex-col justify-center items-center text-center px-4 py-16 md:py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950 text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
              <div className="absolute -top-24 -left-24 w-64 md:w-96 h-64 md:h-96 rounded-full bg-blue-500 blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-[20rem] md:w-[30rem] h-[20rem] md:h-[30rem] rounded-full bg-indigo-500 blur-3xl"></div>
            </div>
  
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs md:text-sm font-semibold mb-6 md:mb-8 backdrop-blur-sm">
                <Sparkles size={16} /> Dikemaskini untuk harga pasaran Malaysia
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-4 md:mb-6 leading-tight">
                Pakar Perunding PC & Laptop <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">AI Peribadi Anda</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-8 md:mb-10 max-w-2xl font-light px-4">
                Pening kepala dengan terma teknikal? Tidak pasti nak beli yang mana? Biar sistem AI kami bantu padankan laptop atau PC yang tepat dengan bajet dan kegunaan anda dalam masa 60 saat.
              </p>
  
              <button 
                onClick={() => setIsRecommenderStarted(true)}
                className="group flex items-center gap-3 bg-white text-blue-900 px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-bold hover:bg-blue-50 hover:scale-105 transition-all shadow-[0_0_40px_rgba(59,130,246,0.5)]"
              >
                Mula Analisis Sekarang <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </main>
  
          <section className="bg-white py-16 px-4 flex-1">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Bagaimana Ia Berfungsi?</h2>
                <p className="text-slate-500">Tiga langkah mudah untuk mencari peranti idaman anda.</p>
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-slate-50 p-8 rounded-2xl text-center border border-slate-100 hover:shadow-lg transition-shadow">
                  <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                    <Check size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">1. Beritahu Keperluan</h3>
                  <p className="text-slate-500">Jawab soalan mudah tentang tujuan penggunaan, jenis peranti dan bajet anda.</p>
                </div>
  
                <div className="bg-slate-50 p-8 rounded-2xl text-center border border-slate-100 hover:shadow-lg transition-shadow">
                  <div className="bg-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-600">
                    <Zap size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">2. AI Buat Analisis</h3>
                  <p className="text-slate-500">Sistem menyemak ratusan data model dan harga pasaran Malaysia serta-merta.</p>
                </div>
  
                <div className="bg-slate-50 p-8 rounded-2xl text-center border border-slate-100 hover:shadow-lg transition-shadow">
                  <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-green-600">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">3. Dapat 10 Cadangan</h3>
                <p className="text-slate-500">Terima senarai 10 model terbaik yang disusun dari harga murah ke mahal.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // 2. Wizard & Result Recommender
  return (
    <div className="bg-slate-50 font-sans text-slate-800 flex flex-col items-center selection:bg-blue-200 pt-2">
      <div className="w-full flex justify-between items-center mb-6 px-1">
        <button onClick={exitRecommender} className="inline-flex items-center gap-2 text-gray-600 bg-white hover:bg-blue-100 hover:text-blue-700 px-4 py-2 rounded-xl transition-all text-sm font-bold border border-gray-200 shadow-sm">
          <Home size={18} /> <span className="hidden sm:inline">Menu Utama</span>
        </button>
        <div className="flex items-center gap-2 text-slate-400 font-bold text-lg">
          <Cpu size={20} /> PC<span className="text-slate-600">Pintar</span> AI
        </div>
      </div>

      <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden ring-1 ring-slate-100">
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white text-center">
            <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
              <Sparkles className="text-yellow-300" /> Sesi Konsultasi AI
            </h1>
            <p className="text-blue-100 mt-2 font-light">Jawab soalan di bawah dengan jujur untuk hasil terbaik.</p>
          </div>
  
          <div className="p-6 md:p-10">
            {recStep < 4 && !recLoading && (
              <div className="flex justify-center mb-10 gap-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className={`h-2.5 w-16 rounded-full transition-all duration-500 ${i <= recStep ? 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]' : 'bg-slate-100'}`} />
                ))}
              </div>
            )}
  
            {recStep === 0 && (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-bold text-center mb-8 text-slate-800">Untuk apa anda gunakan komputer ini?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <OptionCard 
                    icon={GraduationCap} 
                    title="Pelajar / Belajar" 
                    desc="Word, PowerPoint, Web, YouTube"
                    onClick={() => handleRecSelect('usage', 'student')}
                  />
                  <OptionCard 
                    icon={Briefcase} 
                    title="Kerja Pejabat / Bisnes" 
                    desc="Excel, Zoom, Akaun, Multitasking"
                    onClick={() => handleRecSelect('usage', 'office')}
                  />
                  <OptionCard 
                    icon={MonitorPlay} 
                    title="Gaming" 
                    desc="Main game AAA, E-Sports, Streaming"
                    onClick={() => handleRecSelect('usage', 'gaming')}
                  />
                  <OptionCard 
                    icon={PenTool} 
                    title="Kreatif & Design" 
                    desc="Video Editing, 3D, Graphic Design"
                    onClick={() => handleRecSelect('usage', 'creative')}
                  />
                </div>
              </div>
            )}
  
            {recStep === 1 && (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-bold text-center mb-8 text-slate-800">Jenis peranti yang anda mahu?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <OptionCard 
                    icon={Laptop} 
                    title="Laptop" 
                    desc="Mudah dibawa ke mana-mana"
                    onClick={() => handleRecSelect('type', 'laptop')}
                  />
                  <OptionCard 
                    icon={Monitor} 
                    title="Desktop PC" 
                    desc="Prestasi maksimum untuk harga yang sama"
                    onClick={() => handleRecSelect('type', 'desktop')}
                  />
                </div>
              </div>
            )}
  
            {recStep === 2 && (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-bold text-center mb-8 text-slate-800">Pilih Bajet Anggaran Anda</h2>
                <div className="grid grid-cols-1 gap-5">
                  <OptionCard 
                    icon={Check} 
                    title="Bajet Rendah (< RM 2,500)" 
                    desc="Pilihan bajet ketat untuk prestasi asas"
                    onClick={() => {
                        setRecPreferences(prev => ({...prev, budget: 'low'}));
                        generateRecommendation();
                    }}
                  />
                  <OptionCard 
                    icon={Check} 
                    title="Bajet Pertengahan (RM 2,500 - RM 4,500)" 
                    desc="Keseimbangan terbaik antara harga dan prestasi"
                    onClick={() => {
                        setRecPreferences(prev => ({...prev, budget: 'mid'}));
                        generateRecommendation();
                    }}
                  />
                  <OptionCard 
                    icon={Check} 
                    title="Bajet Tinggi (> RM 4,500)" 
                    desc="Prestasi tinggi, kualiti premium, dan teknologi terkini"
                    onClick={() => {
                        setRecPreferences(prev => ({...prev, budget: 'high'}));
                        generateRecommendation();
                    }}
                  />
                </div>
              </div>
            )}
  
            {recLoading && (
              <div className="text-center py-16 flex flex-col items-center animate-fade-in">
                <div className="relative w-20 h-20 mb-6">
                  <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                  <Sparkles className="absolute inset-0 m-auto text-blue-600" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">AI sedang menganalisis data...</h3>
                <p className="text-slate-500 mt-2 font-medium">Memadankan spek terbaik dengan bajet RM{recPreferences.budget === 'low' ? '2500 ke bawah' : recPreferences.budget === 'mid' ? '2500-4500' : '4500 ke atas'}...</p>
              </div>
            )}
  
            {recStep === 4 && recResult && (
              <div className="animate-fade-in">
                <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-8 text-center shadow-sm">
                  <h2 className="text-green-800 font-extrabold text-xl mb-1">Cadangan Selesai!</h2>
                  <p className="text-green-700 font-medium">{recResult.title}</p>
                </div>
                
                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 mb-8 relative shadow-sm">
                   <div className="absolute -top-3 left-6 bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 font-bold uppercase tracking-wider">
                      <Sparkles size={14}/> Analisis Pakar AI
                   </div>
                   <p className="text-indigo-900 font-medium leading-relaxed pt-2">"{recResult.aiAnalysis}"</p>
                   
                   {recResult.warning && (
                      <div className="mt-4 flex items-start gap-2.5 text-amber-800 bg-amber-100/80 p-3 rounded-lg text-sm font-semibold border border-amber-200/50">
                         <AlertTriangle size={18} className="shrink-0 mt-0.5 text-amber-600"/> {recResult.warning}
                      </div>
                   )}
                </div>
  
                <div className="bg-white border-2 border-slate-100 rounded-2xl p-6 mb-8 shadow-sm">
                  <h3 className="font-bold text-slate-800 mb-5 border-b-2 border-slate-100 pb-3">Spesifikasi Sasaran Anda</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600 shrink-0"><Cpu size={22} /></div>
                      <div>
                        <span className="font-bold block text-xs text-slate-400 uppercase tracking-wider mb-0.5">CPU / Processor</span>
                        <span className="text-slate-800 font-semibold">{recResult.specs.cpu}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600 shrink-0"><MemoryStick size={22} /></div>
                      <div>
                        <span className="font-bold block text-xs text-slate-400 uppercase tracking-wider mb-0.5">RAM (Memory)</span>
                        <span className="text-slate-800 font-semibold">{recResult.specs.ram}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600 shrink-0"><MonitorPlay size={22} /></div>
                      <div>
                        <span className="font-bold block text-xs text-slate-400 uppercase tracking-wider mb-0.5">GPU (Graphics)</span>
                        <span className="text-slate-800 font-semibold">{recResult.specs.gpu}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600 shrink-0"><HardDrive size={22} /></div>
                      <div>
                        <span className="font-bold block text-xs text-slate-400 uppercase tracking-wider mb-0.5">Storage</span>
                        <span className="text-slate-800 font-semibold">{recResult.specs.storage}</span>
                      </div>
                    </div>
                  </div>
                </div>
  
                <div className="mb-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-5 gap-3">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
                      <Check className="text-green-500 bg-green-100 p-1 rounded-full" size={24}/> 10 Model Disyorkan
                    </h3>
                    <span className="text-xs font-bold bg-slate-100 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full flex items-center w-fit shadow-sm">
                      <ArrowUpRight size={14} className="mr-1.5 text-blue-500"/> Disusun: Harga Rendah ➝ Tinggi
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recResult.examples.map((item, idx) => (
                      <a 
                        key={idx} 
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block p-5 rounded-2xl border-2 border-slate-100 bg-white hover:border-blue-400 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 bg-slate-100 text-slate-400 text-[11px] font-black px-3 py-1.5 rounded-bl-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          #{idx + 1}
                        </div>
  
                        <div className="flex justify-between items-start mb-3">
                          <div className="bg-slate-50 p-2.5 rounded-xl text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                              {recPreferences.type === 'laptop' ? <Laptop size={22}/> : <Monitor size={22}/>}
                          </div>
                          <ExternalLink size={18} className="text-slate-300 group-hover:text-blue-500 mr-6 transition-colors"/>
                        </div>
                        <h4 className="font-bold text-slate-800 text-[15px] mb-3 group-hover:text-blue-700 leading-snug">
                          {item.name}
                        </h4>
                        <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 group-hover:text-blue-600 uppercase tracking-wide">
                          <Search size={14} /> Semak Harga Semasa
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
  
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={resetRecommender}
                    className="flex-1 bg-blue-700 text-white py-4 rounded-xl font-bold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
                  >
                    <RotateCcw size={20} /> Buat Carian Lain
                  </button>
                  <button 
                    onClick={exitRecommender}
                    className="sm:w-auto w-full bg-slate-100 text-slate-600 py-4 px-6 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Home size={20} /> Menu Utama
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ==========================================
  // RENDERER: MODUL LAIN (Sedia ada)
  // ==========================================
  const renderTopic = () => (
    <div className="animate-fade-in w-full">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className={`${activeTopic.color} p-8 text-white relative`}>
          <div className="flex justify-between items-start mb-4">
            <button onClick={() => { setView('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="inline-flex items-center gap-2 text-white bg-black/10 hover:bg-black/20 px-4 py-2 rounded-xl transition-all text-sm font-bold backdrop-blur-sm shadow-sm border border-white/10">
              <Home size={18} /> Menu Utama
            </button>
            <div className="hidden md:block opacity-20 transform scale-150 absolute right-8 top-12 pointer-events-none">
              {activeTopic.icon}
            </div>
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold">{activeTopic.title}</h2>
            <p className="opacity-90 mt-2 text-lg">{activeTopic.description}</p>
          </div>
        </div>

        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-4 text-center font-semibold transition-colors ${activeTab === 'basic' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('basic')}
          >
            <BookOpen size={18} className="inline mr-2" /> Nota Asas
          </button>
          <button
            className={`flex-1 py-4 text-center font-semibold transition-colors ${activeTab === 'advanced' ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('advanced')}
          >
            <Zap size={18} className="inline mr-2" /> Teknologi Terkini
          </button>
        </div>

        <div className="p-8">
          {activeTab === 'basic' ? (
            <div className="space-y-6 animate-slide-up">
              {activeTopic.images ? (
                 <div className={`grid grid-cols-1 ${activeTopic.images.length > 1 ? 'md:grid-cols-2' : ''} gap-4 mb-6`}>
                    {activeTopic.images.map((img, idx) => (
                        <div key={idx} className="rounded-xl overflow-hidden shadow-md border border-gray-100 group bg-white flex flex-col h-full">
                            <div className="h-64 p-4 flex items-center justify-center bg-gray-50">
                                <img 
                                    src={img.url} 
                                    alt={img.caption} 
                                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="bg-gray-100 p-3 text-center font-bold text-sm text-gray-700 border-t border-gray-200 mt-auto">
                                {img.caption}
                            </div>
                        </div>
                    ))}
                 </div>
              ) : activeTopic.image && (
                <div className="mb-6 rounded-xl overflow-hidden shadow-md border border-gray-100 group">
                  <img 
                    src={activeTopic.image} 
                    alt={activeTopic.title} 
                    className="w-full h-48 md:h-80 object-cover object-center hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {activeTopic.content.basics.map((section, idx) => (
                <div key={idx} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 border-l-4 border-blue-500 pl-3">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start text-gray-700 text-base leading-relaxed">
                        <span className="mr-3 mt-2 w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* MOTHERBOARD CUSTOM INFOGRAPHICS */}
              {activeTopic.id === 'motherboard' && (
                <div className="space-y-8 mt-8">
                  {/* INFOGRAFIK FUNGSI PAPAN INDUK */}
                  <div className="p-6 lg:p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <div className="text-center mb-8">
                      <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs mb-2 tracking-widest uppercase">Peranan Utama</span>
                      <h4 className="font-bold text-slate-800 text-2xl flex items-center justify-center gap-2">
                        <CircuitBoard className="text-emerald-500" size={24}/> Definisi & Fungsi Papan Induk
                      </h4>
                      <p className="text-slate-500 text-sm mt-2">Tulang belakang yang menghubungkan dan menyatukan seluruh sistem komputer.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Cards for functions */}
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-emerald-300 transition-colors text-center group">
                        <div className="bg-emerald-100 text-emerald-600 w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Share2 size={28}/></div>
                        <h5 className="font-bold text-slate-800 mb-2">Penghubung Komponen</h5>
                        <p className="text-xs text-slate-600">Menyediakan slot (RAM, PCIe) dan laluan elektronik untuk aliran data.</p>
                      </div>
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-amber-300 transition-colors text-center group">
                        <div className="bg-amber-100 text-amber-600 w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Zap size={28}/></div>
                        <h5 className="font-bold text-slate-800 mb-2">Pengurusan Kuasa</h5>
                        <p className="text-xs text-slate-600">Mengedar voltan elektrik dari PSU ke setiap komponen dengan stabil.</p>
                      </div>
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-blue-300 transition-colors text-center group">
                        <div className="bg-blue-100 text-blue-600 w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><ArrowRightLeft size={28}/></div>
                        <h5 className="font-bold text-slate-800 mb-2">Kawalan I/O</h5>
                        <p className="text-xs text-slate-600">Mengurus aliran maklumat ke peranti luar (USB, Audio, LAN/Wi-Fi).</p>
                      </div>
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-purple-300 transition-colors text-center group">
                        <div className="bg-purple-100 text-purple-600 w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Settings size={28}/></div>
                        <h5 className="font-bold text-slate-800 mb-2">Sistem BIOS / UEFI</h5>
                        <p className="text-xs text-slate-600">Firmware asas yang melakukan 'boot' komputer & membenarkan tetapan sistem.</p>
                      </div>
                    </div>
                  </div>

                  {/* INFOGRAFIK SAIZ BENTUK */}
                  <div className="p-6 lg:p-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 shadow-sm overflow-hidden relative">
                    <div className="text-center mb-10 relative z-10">
                      <span className="inline-block py-1 px-3 rounded-full bg-emerald-200 text-emerald-800 font-bold text-xs mb-2 tracking-widest uppercase">Saiz & Dimensi</span>
                      <h4 className="font-bold text-slate-800 text-2xl flex items-center justify-center gap-2">
                        <Maximize className="text-emerald-600" size={24}/> Faktor Bentuk (Form Factor)
                      </h4>
                      <p className="text-slate-600 text-sm mt-2 max-w-lg mx-auto">Saiz papan induk berbeza mengikut kategori binaan PC anda.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                      {/* E-ATX */}
                      <div className="bg-white p-5 rounded-2xl border-2 border-transparent hover:border-emerald-400 transition-all shadow-sm group flex flex-col h-full">
                        <div className="aspect-square w-full bg-slate-50 rounded-xl mb-4 flex items-end justify-center pb-2 border border-slate-200 h-40">
                          <div className="bg-slate-800 rounded-sm border-2 border-emerald-500 shadow-md group-hover:scale-105 transition-transform" style={{ width: '85%', height: '90%' }}></div>
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h5 className="font-black text-lg text-slate-800 text-center">E-ATX</h5>
                                <div className="text-center mb-2"><span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded inline-block border border-emerald-100">305x330 mm</span></div>
                            </div>
                            <p className="text-xs text-slate-600 text-center leading-relaxed mt-2">Khas untuk server/workstation. Banyak slot RAM dan PCIe.</p>
                        </div>
                      </div>

                      {/* ATX */}
                      <div className="bg-white p-5 rounded-2xl border-2 border-transparent hover:border-emerald-400 transition-all shadow-sm group flex flex-col h-full">
                        <div className="aspect-square w-full bg-slate-50 rounded-xl mb-4 flex items-end justify-center pb-2 border border-slate-200 h-40">
                          <div className="bg-slate-800 rounded-sm border-2 border-emerald-400 shadow-md group-hover:scale-105 transition-transform" style={{ width: '65%', height: '90%' }}></div>
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h5 className="font-black text-lg text-slate-800 text-center">ATX</h5>
                                <div className="text-center mb-2"><span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded inline-block border border-emerald-100">305x244 mm</span></div>
                            </div>
                            <p className="text-xs text-slate-600 text-center leading-relaxed mt-2">Saiz standard desktop. Pilihan terbaik untuk PC Gaming biasa.</p>
                        </div>
                      </div>

                      {/* Micro-ATX */}
                      <div className="bg-white p-5 rounded-2xl border-2 border-transparent hover:border-emerald-400 transition-all shadow-sm group flex flex-col h-full">
                        <div className="aspect-square w-full bg-slate-50 rounded-xl mb-4 flex items-end justify-center pb-2 border border-slate-200 h-40">
                          <div className="bg-slate-800 rounded-sm border-2 border-emerald-300 shadow-md group-hover:scale-105 transition-transform" style={{ width: '65%', height: '65%' }}></div>
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h5 className="font-black text-lg text-slate-800 text-center">Micro-ATX (mATX)</h5>
                                <div className="text-center mb-2"><span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded inline-block border border-emerald-100">244x244 mm</span></div>
                            </div>
                            <p className="text-xs text-slate-600 text-center leading-relaxed mt-2">Berbentuk segi empat sama. Pilihan jimat untuk bajet & pejabat.</p>
                        </div>
                      </div>

                      {/* Mini-ITX */}
                      <div className="bg-white p-5 rounded-2xl border-2 border-transparent hover:border-emerald-400 transition-all shadow-sm group flex flex-col h-full">
                        <div className="aspect-square w-full bg-slate-50 rounded-xl mb-4 flex items-end justify-center pb-2 border border-slate-200 h-40">
                          <div className="bg-slate-800 rounded-sm border-2 border-emerald-200 shadow-md group-hover:scale-105 transition-transform" style={{ width: '45%', height: '45%' }}></div>
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h5 className="font-black text-lg text-slate-800 text-center">Mini-ITX</h5>
                                <div className="text-center mb-2"><span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded inline-block border border-emerald-100">170x170 mm</span></div>
                            </div>
                            <p className="text-xs text-slate-600 text-center leading-relaxed mt-2">Sangat kompak untuk PC Mini. Terhad 1 slot GPU sahaja.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* INFOGRAFIK ANATOMI & PORT MOTHERBOARD */}
                  <div className="p-6 lg:p-8 bg-white rounded-2xl border border-slate-200 shadow-sm mt-8">
                    <div className="text-center mb-10">
                      <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mb-2 tracking-widest uppercase">Anatomi & Penyambung</span>
                      <h4 className="font-bold text-slate-800 text-2xl flex items-center justify-center gap-2">
                        <Plug className="text-indigo-500" size={24}/> Direktori Port & Slot Utama
                      </h4>
                      <p className="text-slate-500 text-sm mt-2 max-w-2xl mx-auto">Kenali fungsi dan peranan setiap komponen port, slot dan penyambung (connector) yang terdapat pada papan induk moden.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {/* Kuasa & Teras */}
                      <div className="bg-emerald-50/50 p-5 rounded-xl border border-emerald-100 hover:shadow-md hover:-translate-y-1 transition-all flex items-start gap-4 group">
                        <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors shrink-0">
                          <Plug size={24} />
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-800 text-[15px] mb-1">ATX 24-Pin</h5>
                          <p className="text-xs text-slate-600 leading-relaxed">Penyambung kuasa utama. Membekalkan arus elektrik dari PSU ke keseluruhan ekosistem papan induk.</p>
                        </div>
                      </div>

                      <div className="bg-amber-50/50 p-5 rounded-xl border border-amber-100 hover:shadow-md hover:-translate-y-1 transition-all flex items-start gap-4 group">
                        <div className="bg-amber-100 p-3 rounded-xl text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors shrink-0">
                          <Zap size={24} />
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-800 text-[15px] mb-1">ATX 12V (EPS)</h5>
                          <p className="text-xs text-slate-600 leading-relaxed">Kabel kuasa tambahan khas untuk menghidupkan cip pemproses (CPU) dengan arus yang stabil.</p>
                        </div>
                      </div>

                      <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 hover:shadow-md hover:-translate-y-1 transition-all flex items-start gap-4 group">
                        <div className="bg-blue-100 p-3 rounded-xl text-blue-600 group-hover:bg-blue-500 group-hover:text-white transition-colors shrink-0">
                          <Cpu size={24} />
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-800 text-[15px] mb-1">Soket CPU</h5>
                          <p className="text-xs text-slate-600 leading-relaxed">Tapak fizikal (seperti soket LGA atau PGA) di mana teras cip pemproses (CPU) utama dipasang.</p>
                        </div>
                      </div>

                      {/* Memori & Storan */}
                      <div className="bg-purple-50/50 p-5 rounded-xl border border-purple-100 hover:shadow-md hover:-translate-y-1 transition-all flex items-start gap-4 group">
                        <div className="bg-purple-100 p-3 rounded-xl text-purple-600 group-hover:bg-purple-500 group-hover:text-white transition-colors shrink-0">
                          <MemoryStick size={24} />
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-800 text-[15px] mb-1">Slot RAM</h5>
                          <p className="text-xs text-slate-600 leading-relaxed">Slot memanjang (DIMM) untuk memasang stik Memori capaian rawak bagi proses data jangka pendek.</p>
                        </div>
                      </div>

                      <div className="bg-orange-50/50 p-5 rounded-xl border border-orange-100 hover:shadow-md hover:-translate-y-1 transition-all flex items-start gap-4 group">
                        <div className="bg-orange-100 p-3 rounded-xl text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors shrink-0">
                          <HardDrive size={24} />
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-800 text-[15px] mb-1">Port Storan (SATA)</h5>
                          <p className="text-xs text-slate-600 leading-relaxed">Menyambungkan pemacu storan berwayar tradisional seperti Cakera Keras (HDD) dan SSD 2.5 inci.</p>
                        </div>
                      </div>

                      <div className="bg-rose-50/50 p-5 rounded-xl border border-rose-100 hover:shadow-md hover:-translate-y-1 transition-all flex items-start gap-4 group">
                        <div className="bg-rose-100 p-3 rounded-xl text-rose-600 group-hover:bg-rose-500 group-hover:text-white transition-colors shrink-0">
                          <Layers size={24} />
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-800 text-[15px] mb-1">Slot PCIe (x1, x8, x16)</h5>
                          <p className="text-xs text-slate-600 leading-relaxed">Laluan pengembangan utama untuk memasukkan Kad Grafik (GPU), kad Wi-Fi, pautan M.2, dan Kad Bunyi.</p>
                        </div>
                      </div>

                      {/* I/O dan Sambungan Luar */}
                      <div className="bg-cyan-50/50 p-5 rounded-xl border border-cyan-100 hover:shadow-md hover:-translate-y-1 transition-all flex items-start gap-4 group">
                        <div className="bg-cyan-100 p-3 rounded-xl text-cyan-600 group-hover:bg-cyan-500 group-hover:text-white transition-colors shrink-0">
                          <Usb size={24} />
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-800 text-[15px] mb-1">Port USB</h5>
                          <p className="text-xs text-slate-600 leading-relaxed">Merangkumi port USB 2.0, USB 3.0 dan Type-C untuk pemindahan data pantas peranti luaran (mouse, pendrive).</p>
                        </div>
                      </div>

                      <div className="bg-indigo-50/50 p-5 rounded-xl border border-indigo-100 hover:shadow-md hover:-translate-y-1 transition-all flex items-start gap-4 group">
                        <div className="bg-indigo-100 p-3 rounded-xl text-indigo-600 group-hover:bg-indigo-500 group-hover:text-white transition-colors shrink-0">
                          <Monitor size={24} />
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-800 text-[15px] mb-1">I/O Port (Paparan)</h5>
                          <p className="text-xs text-slate-600 leading-relaxed">Termasuk output visual seperti HDMI, DisplayPort (DP), Mini DP, DVI, dan VGA untuk ke monitor.</p>
                        </div>
                      </div>

                      <div className="bg-teal-50/50 p-5 rounded-xl border border-teal-100 hover:shadow-md hover:-translate-y-1 transition-all flex items-start gap-4 group">
                        <div className="bg-teal-100 p-3 rounded-xl text-teal-600 group-hover:bg-teal-500 group-hover:text-white transition-colors shrink-0">
                          <Globe size={24} />
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-800 text-[15px] mb-1">Port Rangkaian (LAN)</h5>
                          <p className="text-xs text-slate-600 leading-relaxed">Port RJ-45 untuk sambungan kabel internet berwayar yang memastikan talian internet stabil dan laju.</p>
                        </div>
                      </div>

                      {/* Lain-lain */}
                      <div className="bg-pink-50/50 p-5 rounded-xl border border-pink-100 hover:shadow-md hover:-translate-y-1 transition-all flex items-start gap-4 group">
                        <div className="bg-pink-100 p-3 rounded-xl text-pink-600 group-hover:bg-pink-500 group-hover:text-white transition-colors shrink-0">
                          <Volume2 size={24} />
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-800 text-[15px] mb-1">Port Audio</h5>
                          <p className="text-xs text-slate-600 leading-relaxed">Deretan bicu bulat 3.5mm berbilang warna untuk sambungan ke mikrofon, fon kepala, dan pembesar suara.</p>
                        </div>
                      </div>

                      <div className="bg-stone-50/50 p-5 rounded-xl border border-stone-200 hover:shadow-md hover:-translate-y-1 transition-all flex items-start gap-4 group">
                        <div className="bg-stone-200 p-3 rounded-xl text-stone-600 group-hover:bg-stone-600 group-hover:text-white transition-colors shrink-0">
                          <Printer size={24} />
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-800 text-[15px] mb-1">Port Warisan (Legacy)</h5>
                          <p className="text-xs text-slate-600 leading-relaxed">Termasuk port PS/2 untuk papan kekunci/tetikus klasik dan Parallel Port lebar untuk pencetak lama.</p>
                        </div>
                      </div>

                      <div className="bg-slate-100 p-5 rounded-xl border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all flex items-start gap-4 group">
                        <div className="bg-slate-200 p-3 rounded-xl text-slate-600 group-hover:bg-slate-700 group-hover:text-white transition-colors shrink-0">
                          <Battery size={24} />
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-800 text-[15px] mb-1">Bateri CMOS</h5>
                          <p className="text-xs text-slate-600 leading-relaxed">Bateri bentuk butang untuk membekalkan arus kecil bagi mengekalkan masa dan memori BIOS ketika PC ditutup.</p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* INFOGRAFIK EKSPLORASI MODEL 3D AR MOTHERBOARD */}
                  <div className="p-6 lg:p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 shadow-xl mt-8">
                    <div className="text-center mb-10">
                      <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 font-bold text-xs mb-2 tracking-widest uppercase">Eksplorasi Interaktif</span>
                      <h4 className="font-bold text-white text-2xl flex items-center justify-center gap-2">
                        <Box className="text-blue-400" size={24}/> Model 3D Papan Induk (AMD & Intel)
                      </h4>
                      <p className="text-slate-400 text-sm mt-2 max-w-2xl mx-auto">Gunakan tetikus atau jari anda untuk memutar (drag) dan mengezum (scroll) model 3D di bawah bagi melihat struktur papan induk dengan lebih terperinci.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Model AMD */}
                      <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-600 flex flex-col shadow-lg hover:shadow-red-900/20 transition-shadow">
                        <div className="flex items-center justify-between mb-3 px-2">
                          <div>
                            <h5 className="font-bold text-red-400 text-lg">Sokongan AMD</h5>
                            <p className="text-xs text-slate-400">Model: ARDOR GAMING B550M (Soket AM4)</p>
                          </div>
                          <div className="bg-red-500/20 p-2 rounded-lg text-red-400">
                            <Cpu size={20} />
                          </div>
                        </div>
                        <div className="relative w-full aspect-square md:aspect-video rounded-lg overflow-hidden border border-slate-700 bg-black">
                          <iframe 
                            title="ARDOR GAMING B550M-HDVAR" 
                            frameBorder="0" 
                            allowFullScreen 
                            allow="autoplay; fullscreen; xr-spatial-tracking" 
                            src="https://sketchfab.com/models/4c0a2a3008d9402ab9bfd05b2f0cd093/embed"
                            className="w-full h-full outline-none"
                          ></iframe>
                        </div>
                      </div>

                      {/* Model Intel */}
                      <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-600 flex flex-col shadow-lg hover:shadow-blue-900/20 transition-shadow">
                        <div className="flex items-center justify-between mb-3 px-2">
                          <div>
                            <h5 className="font-bold text-blue-400 text-lg">Sokongan Intel</h5>
                            <p className="text-xs text-slate-400">Model: Asus Z690 ProArt (Soket LGA 1700)</p>
                          </div>
                          <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400">
                            <CircuitBoard size={20} />
                          </div>
                        </div>
                        <div className="relative w-full aspect-square md:aspect-video rounded-lg overflow-hidden border border-slate-700 bg-black">
                          <iframe 
                            title="Asus Z690 ProArt" 
                            frameBorder="0" 
                            allowFullScreen 
                            allow="autoplay; fullscreen; xr-spatial-tracking" 
                            src="https://sketchfab.com/models/d5293652cd3e44ae829bb4fa0360fc05/embed"
                            className="w-full h-full outline-none"
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* RAM CUSTOM INFOGRAPHICS */}
              {activeTopic.id === 'ram' && (
                <div className="space-y-8 mt-8">
                  {/* INFOGRAFIK DEFINISI & KEPENTINGAN */}
                  <div className="p-6 lg:p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <div className="text-center mb-8">
                      <span className="inline-block py-1 px-3 rounded-full bg-purple-100 text-purple-700 font-bold text-xs mb-2 tracking-widest uppercase">Peranan Utama</span>
                      <h4 className="font-bold text-slate-800 text-2xl flex items-center justify-center gap-2">
                        <MemoryStick className="text-purple-500" size={24}/> Definisi & Kepentingan RAM
                      </h4>
                      <p className="text-slate-500 text-sm mt-2">Ketahui mengapa memori capaian rawak ini sangat kritikal untuk kelancaran sistem PC anda.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-purple-300 transition-colors text-center group">
                        <div className="bg-purple-100 text-purple-600 w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Database size={28}/></div>
                        <h5 className="font-bold text-slate-800 mb-2">Storan Sementara</h5>
                        <p className="text-xs text-slate-600">Menyimpan data dan arahan yang sedang aktif digunakan oleh CPU secara sementara.</p>
                      </div>
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-amber-300 transition-colors text-center group">
                        <div className="bg-amber-100 text-amber-600 w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Zap size={28}/></div>
                        <h5 className="font-bold text-slate-800 mb-2">Akses Pantas</h5>
                        <p className="text-xs text-slate-600">Membolehkan data dicapai pada kelajuan jauh lebih tinggi berbanding storan kekal (HDD/SSD).</p>
                      </div>
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-blue-300 transition-colors text-center group">
                        <div className="bg-blue-100 text-blue-600 w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Layers size={28}/></div>
                        <h5 className="font-bold text-slate-800 mb-2">Multitasking Lancar</h5>
                        <p className="text-xs text-slate-600">Memberi ruang yang cukup untuk anda membuka banyak tab pelayar dan aplikasi serentak.</p>
                      </div>
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-emerald-300 transition-colors text-center group">
                        <div className="bg-emerald-100 text-emerald-600 w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Gauge size={28}/></div>
                        <h5 className="font-bold text-slate-800 mb-2">Prestasi Optimum</h5>
                        <p className="text-xs text-slate-600">Mengelakkan isu 'lag' dan masalah kelewatan semasa menjalankan perisian atau permainan berat.</p>
                      </div>
                    </div>
                  </div>

                  {/* INFOGRAFIK JENIS-JENIS RAM */}
                  <div className="p-6 lg:p-8 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-100 shadow-sm relative overflow-hidden">
                    <div className="text-center mb-10 relative z-10">
                      <span className="inline-block py-1 px-3 rounded-full bg-purple-200 text-purple-800 font-bold text-xs mb-2 tracking-widest uppercase">Evolusi & Kegunaan</span>
                      <h4 className="font-bold text-slate-800 text-2xl flex items-center justify-center gap-2">
                        <MemoryStick className="text-purple-600" size={24}/> Jenis-Jenis Memori (RAM)
                      </h4>
                      <p className="text-slate-600 text-sm mt-2 max-w-lg mx-auto">Terdapat pelbagai variasi RAM di pasaran bergantung kepada jenis peranti dan tahap prestasi yang diperlukan.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                      {/* SDRAM */}
                      <div className="bg-white p-5 rounded-2xl border-2 border-transparent hover:border-purple-400 transition-all shadow-sm group">
                        <div className="text-purple-500 mb-3 bg-purple-50 w-12 h-12 flex items-center justify-center rounded-lg group-hover:bg-purple-500 group-hover:text-white transition-colors"><Database size={24}/></div>
                        <h5 className="font-black text-lg text-slate-800 mb-1">SDRAM</h5>
                        <p className="text-xs text-slate-600 leading-relaxed">Versi klasik lama di mana kelajuannya diselaraskan terus dengan jam sistem komputer.</p>
                      </div>
                      
                      {/* DDR */}
                      <div className="bg-white p-5 rounded-2xl border-2 border-transparent hover:border-blue-400 transition-all shadow-sm group">
                        <div className="text-blue-500 mb-3 bg-blue-50 w-12 h-12 flex items-center justify-center rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors"><Zap size={24}/></div>
                        <h5 className="font-black text-lg text-slate-800 mb-1">DDR SDRAM</h5>
                        <p className="text-xs text-slate-600 leading-relaxed">Generasi popular (DDR1 hingga DDR5). Menghantar data dua kali setiap kitaran jam. Paling laju!</p>
                      </div>

                      {/* LPDDR */}
                      <div className="bg-white p-5 rounded-2xl border-2 border-transparent hover:border-teal-400 transition-all shadow-sm group">
                        <div className="text-teal-500 mb-3 bg-teal-50 w-12 h-12 flex items-center justify-center rounded-lg group-hover:bg-teal-500 group-hover:text-white transition-colors"><Smartphone size={24}/></div>
                        <h5 className="font-black text-lg text-slate-800 mb-1">LPDDR</h5>
                        <p className="text-xs text-slate-600 leading-relaxed">Versi "Low Power" (kuasa rendah). Direka khusus untuk bateri telefon pintar dan tablet.</p>
                      </div>

                      {/* ECC RAM */}
                      <div className="bg-white p-5 rounded-2xl border-2 border-transparent hover:border-rose-400 transition-all shadow-sm group">
                        <div className="text-rose-500 mb-3 bg-rose-50 w-12 h-12 flex items-center justify-center rounded-lg group-hover:bg-rose-500 group-hover:text-white transition-colors"><Server size={24}/></div>
                        <h5 className="font-black text-lg text-slate-800 mb-1">ECC RAM</h5>
                        <p className="text-xs text-slate-600 leading-relaxed">Khas untuk komputer pelayan (Server). Mempunyai teknologi unik untuk membetulkan ralat sistem automatik.</p>
                      </div>
                    </div>
                  </div>

                  {/* INFOGRAFIK EVOLUSI DDR RAM */}
                  <div className="p-6 lg:p-8 bg-slate-900 rounded-2xl shadow-xl relative overflow-hidden mt-8 border border-slate-800">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 opacity-10 blur-3xl rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500 opacity-10 blur-2xl rounded-full pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

                    <div className="text-center mb-10 relative z-10">
                      <span className="inline-block py-1 px-3 rounded-full bg-slate-800 text-blue-300 font-bold text-xs mb-2 tracking-widest uppercase border border-slate-700">Garis Masa</span>
                      <h4 className="font-bold text-white text-2xl flex items-center justify-center gap-2">
                        <Clock className="text-blue-400" size={24}/> Sejarah Evolusi RAM DDR
                      </h4>
                      <p className="text-slate-400 text-sm mt-2 max-w-2xl mx-auto">Perkembangan teknologi Double Data Rate (DDR) dari generasi pertama hingga yang terkini. Setiap generasi membawa lonjakan kelajuan dan kecekapan tenaga (voltan).</p>
                    </div>

                    {/* GAMBAR PERBANDINGAN FIZIKAL RAM */}
                    <div className="relative z-10 mb-10 bg-slate-800 p-5 rounded-2xl border border-slate-700 flex flex-col items-center shadow-inner w-full">
                      <h5 className="text-blue-300 font-bold mb-8 text-center flex items-center gap-2">
                        <Search size={18} /> Perbezaan Kedudukan Alur (Notch) Fizikal
                      </h5>
                      
                      <div className="w-full max-w-2xl space-y-5">
                        {[
                          { label: 'DDR1', notch: '55%', color: 'bg-emerald-600', chips: 8 },
                          { label: 'DDR2', notch: '52%', color: 'bg-green-700', chips: 8 },
                          { label: 'DDR3', notch: '38%', color: 'bg-teal-700', chips: 8 },
                          { label: 'DDR4', notch: '45%', color: 'bg-green-600', chips: 8 },
                          { label: 'DDR5', notch: '50%', color: 'bg-slate-900', chips: 4 } 
                        ].map((ram, i) => (
                          <div key={i} className="flex items-center gap-2 sm:gap-6 group">
                            <div className="w-12 sm:w-16 text-right font-black text-lg sm:text-2xl text-slate-400 group-hover:text-blue-400 transition-colors">
                              {ram.label}
                            </div>
                            <div className={`flex-1 h-14 sm:h-16 ${ram.color} rounded-sm relative border-t-2 border-l border-r border-white/20 shadow-[0_5px_15px_rgba(0,0,0,0.5)] flex items-center px-4 overflow-hidden hover:scale-[1.02] transition-transform`}>
                              
                              <div className="flex gap-1.5 sm:gap-3 w-full px-2 sm:px-6 justify-between opacity-90 z-0">
                                {[...Array(ram.chips)].map((_, j) => (
                                  <div key={j} className="w-4 h-6 sm:w-8 sm:h-10 bg-slate-800 rounded-sm border-t border-l border-slate-600 shadow-sm flex items-center justify-center">
                                     <div className="w-1/2 h-1/2 rounded-full bg-slate-900/50"></div>
                                  </div>
                                ))}
                              </div>
                              
                              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 sm:w-32 h-5 sm:h-7 bg-white/95 rounded shadow-sm flex items-center justify-center border border-slate-300 z-10">
                                <span className="text-[6px] sm:text-[9px] text-slate-800 font-mono font-bold tracking-tighter">
                                  {ram.label}-8GB MODULE
                                </span>
                              </div>

                              <div className="absolute bottom-0 left-0 w-full h-2 sm:h-2.5 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 border-t border-yellow-700/50 flex" style={{
                                  backgroundImage: 'repeating-linear-gradient(to right, transparent, transparent 1px, rgba(0,0,0,0.5) 1px, rgba(0,0,0,0.5) 2px)'
                              }}>
                              </div>

                              <div className="absolute bottom-0 w-1.5 sm:w-2.5 h-3 sm:h-4 bg-slate-800 rounded-t-full shadow-inner z-20" style={{ left: ram.notch, transform: 'translateX(-50%)' }}></div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <p className="text-slate-400 text-sm mt-10 text-center max-w-2xl bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                        <strong className="text-white flex items-center justify-center gap-2 mb-2"><CheckCircle size={16} className="text-green-500"/> Tips Pemasangan & Keselamatan</strong> 
                        Sila perhatikan kedudukan <strong className="text-blue-300">alur (lekuk kecil)</strong> di bahagian pin emas. Kedudukan yang sentiasa berubah-ubah bagi setiap generasi ini direka secara fizikal untuk menghalang pengguna daripada tersalah memasang jenis RAM yang tidak disokong ke dalam slot papan induk!
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 relative z-10">
                      {/* DDR1 */}
                      <div className="bg-slate-800 p-5 rounded-xl border-t-4 border-t-slate-500 shadow-md hover:-translate-y-2 hover:shadow-slate-500/20 transition-all duration-300 group">
                        <div className="text-slate-500 font-black text-2xl mb-1 group-hover:text-slate-300 transition-colors">DDR1</div>
                        <div className="text-xs text-slate-400 font-bold mb-3 bg-slate-900 px-2 py-1 rounded inline-block">Tahun 2000</div>
                        <p className="text-sm text-slate-300 mb-4 leading-relaxed h-auto xl:h-24">Permulaan era <i>Double Data Rate</i>. Menghantar data dua kali ganda lebih laju berbanding SDRAM lama.</p>
                        <div className="bg-slate-900 p-3 rounded-lg text-xs font-mono text-slate-400 border border-slate-700/50">
                          <div className="flex items-center justify-between mb-1"><span>Kelajuan:</span> <span className="text-white">~400 MT/s</span></div>
                          <div className="flex items-center justify-between"><span>Voltan:</span> <span className="text-red-400">2.5V</span></div>
                        </div>
                      </div>

                      {/* DDR2 */}
                      <div className="bg-slate-800 p-5 rounded-xl border-t-4 border-t-blue-500 shadow-md hover:-translate-y-2 hover:shadow-blue-500/20 transition-all duration-300 group">
                        <div className="text-blue-500 font-black text-2xl mb-1 group-hover:text-blue-400 transition-colors">DDR2</div>
                        <div className="text-xs text-blue-300 font-bold mb-3 bg-blue-900/30 px-2 py-1 rounded inline-block">Tahun 2003</div>
                        <p className="text-sm text-slate-300 mb-4 leading-relaxed h-auto xl:h-24">Kelajuan digandakan dengan peningkatan lebar jalur (bandwidth). Digunakan meluas pada era Windows XP.</p>
                        <div className="bg-slate-900 p-3 rounded-lg text-xs font-mono text-slate-400 border border-slate-700/50">
                          <div className="flex items-center justify-between mb-1"><span>Kelajuan:</span> <span className="text-white">~1066 MT/s</span></div>
                          <div className="flex items-center justify-between"><span>Voltan:</span> <span className="text-orange-400">1.8V</span></div>
                        </div>
                      </div>

                      {/* DDR3 */}
                      <div className="bg-slate-800 p-5 rounded-xl border-t-4 border-t-emerald-500 shadow-md hover:-translate-y-2 hover:shadow-emerald-500/20 transition-all duration-300 group">
                        <div className="text-emerald-500 font-black text-2xl mb-1 group-hover:text-emerald-400 transition-colors">DDR3</div>
                        <div className="text-xs text-emerald-300 font-bold mb-3 bg-emerald-900/30 px-2 py-1 rounded inline-block">Tahun 2007</div>
                        <p className="text-sm text-slate-300 mb-4 leading-relaxed h-auto xl:h-24">Pengurangan voltan yang signifikan. Standard jangka hayat paling panjang, masih banyak dijumpai pada PC lama.</p>
                        <div className="bg-slate-900 p-3 rounded-lg text-xs font-mono text-slate-400 border border-slate-700/50">
                          <div className="flex items-center justify-between mb-1"><span>Kelajuan:</span> <span className="text-white">~2133 MT/s</span></div>
                          <div className="flex items-center justify-between"><span>Voltan:</span> <span className="text-yellow-400">1.5V</span></div>
                        </div>
                      </div>

                      {/* DDR4 */}
                      <div className="bg-slate-800 p-5 rounded-xl border-t-4 border-t-purple-500 shadow-md hover:-translate-y-2 hover:shadow-purple-500/20 transition-all duration-300 group relative">
                        <div className="flex justify-between items-start">
                          <div className="text-purple-500 font-black text-2xl mb-1 group-hover:text-purple-400 transition-colors">DDR4</div>
                          <span className="text-[9px] bg-purple-500 text-white px-2 py-0.5 rounded font-bold uppercase">Popular</span>
                        </div>
                        <div className="text-xs text-purple-300 font-bold mb-3 bg-purple-900/30 px-2 py-1 rounded inline-block">Tahun 2014</div>
                        <p className="text-sm text-slate-300 mb-4 leading-relaxed h-auto xl:h-24">Standard paling meluas masa kini. Kapasiti satu stik yang besar dan jauh lebih pantas dan efisien.</p>
                        <div className="bg-slate-900 p-3 rounded-lg text-xs font-mono text-slate-400 border border-slate-700/50">
                          <div className="flex items-center justify-between mb-1"><span>Kelajuan:</span> <span className="text-white">~3200+ MT/s</span></div>
                          <div className="flex items-center justify-between"><span>Voltan:</span> <span className="text-green-400">1.2V</span></div>
                        </div>
                      </div>

                      {/* DDR5 */}
                      <div className="bg-slate-800 p-5 rounded-xl border-t-4 border-t-rose-500 shadow-md hover:-translate-y-2 hover:shadow-rose-500/20 transition-all duration-300 group relative">
                        <div className="flex justify-between items-start">
                          <div className="text-rose-500 font-black text-2xl mb-1 group-hover:text-rose-400 transition-colors">DDR5</div>
                          <span className="text-[9px] bg-rose-500 text-white px-2 py-0.5 rounded font-bold uppercase animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.5)]">Terkini</span>
                        </div>
                        <div className="text-xs text-rose-300 font-bold mb-3 bg-rose-900/30 px-2 py-1 rounded inline-block">Tahun 2020+</div>
                        <p className="text-sm text-slate-300 mb-4 leading-relaxed h-auto xl:h-24">Generasi ultra-pantas masa depan. Mempunyai pengurusan kuasa terbina (PMIC) terus pada cip memori.</p>
                        <div className="bg-slate-900 p-3 rounded-lg text-xs font-mono text-slate-400 border border-slate-700/50">
                          <div className="flex items-center justify-between mb-1"><span>Kelajuan:</span> <span className="text-white font-bold text-rose-200">~8400+ MT/s</span></div>
                          <div className="flex items-center justify-between"><span>Voltan:</span> <span className="text-emerald-400 font-bold">1.1V</span></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* INFOGRAFIK KATEGORI MEMORI (PRIMARY VS SECONDARY) */}
                  <div className="p-6 lg:p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <div className="text-center mb-8">
                      <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 font-bold text-xs mb-2 tracking-widest uppercase">Klasifikasi</span>
                      <h4 className="font-bold text-slate-800 text-2xl flex items-center justify-center gap-2">
                        <Database className="text-blue-500" size={24}/> Kategori Memori (Primary vs Secondary)
                      </h4>
                      <p className="text-slate-500 text-sm mt-2">Memori komputer terbahagi kepada dua kategori utama berdasarkan fungsinya.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {/* KAD PRIMARY */}
                       <div className="bg-slate-50 rounded-2xl p-6 border-2 border-purple-100 relative overflow-hidden group hover:border-purple-300 transition-all shadow-sm">
                          <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">Meruap (Volatile)</div>
                          <div className="flex items-center gap-4 mb-4">
                            <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
                              <MemoryStick size={32} />
                            </div>
                            <div>
                              <h5 className="font-black text-xl text-slate-800">Primary Memory</h5>
                              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Memori Utama</p>
                            </div>
                          </div>
                          <ul className="space-y-3 mt-4">
                            <li className="flex items-start gap-2 text-sm text-slate-700">
                              <CheckCircle size={16} className="text-purple-500 shrink-0 mt-0.5" />
                              <span>Diakses <strong>secara terus</strong> oleh Unit Pemprosesan Pusat (CPU). Sangat pantas.</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-slate-700">
                              <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                              <span>Data akan <strong>hilang</strong> apabila bekalan elektrik diputuskan (komputer ditutup).</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-slate-700">
                              <CheckCircle size={16} className="text-purple-500 shrink-0 mt-0.5" />
                              <span><strong>Contoh:</strong> RAM (DDR4, DDR5), Cache Memory, ROM.</span>
                            </li>
                          </ul>
                       </div>

                       {/* KAD SECONDARY */}
                       <div className="bg-slate-50 rounded-2xl p-6 border-2 border-orange-100 relative overflow-hidden group hover:border-orange-300 transition-all shadow-sm">
                          <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">Kekal (Non-Volatile)</div>
                          <div className="flex items-center gap-4 mb-4">
                            <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
                              <HardDrive size={32} />
                            </div>
                            <div>
                              <h5 className="font-black text-xl text-slate-800">Secondary Memory</h5>
                              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Memori Sekunder / Storan</p>
                            </div>
                          </div>
                          <ul className="space-y-3 mt-4">
                            <li className="flex items-start gap-2 text-sm text-slate-700">
                              <CheckCircle size={16} className="text-orange-500 shrink-0 mt-0.5" />
                              <span>Penyimpanan data <strong>jangka panjang</strong>. Kelajuan lebih perlahan berbanding RAM.</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-slate-700">
                              <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                              <span>Data <strong>kekal selamat</strong> walaupun komputer ditutup atau tiada elektrik.</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-slate-700">
                              <CheckCircle size={16} className="text-orange-500 shrink-0 mt-0.5" />
                              <span><strong>Contoh:</strong> Pemacu Cakera Keras (HDD), Pemacu Keadaan Pepejal (SSD), Pemacu Pena (Pendrive).</span>
                            </li>
                          </ul>
                       </div>
                    </div>
                  </div>

                  {/* INFOGRAFIK TIPS BELI RAM */}
                  <div className="p-6 lg:p-8 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-20 blur-3xl rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
                    
                    <div className="text-center mb-10 relative z-10">
                      <span className="inline-block py-1 px-3 rounded-full bg-indigo-200 text-indigo-800 font-bold text-xs mb-3 tracking-widest uppercase border border-slate-700">Panduan Pembelian</span>
                      <h4 className="font-bold text-slate-800 text-2xl flex items-center justify-center gap-2">
                        <ShoppingCart className="text-indigo-600" size={26}/> Tips Memilih & Membeli RAM
                      </h4>
                      <p className="text-slate-600 text-sm mt-2 max-w-2xl mx-auto">Perhatikan 4 perkara ini sebelum anda membeli RAM baharu supaya ia serasi dan memberikan prestasi yang optimum.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
                      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all group">
                        <div className="text-blue-500 mb-3 bg-blue-50 w-12 h-12 flex items-center justify-center rounded-xl group-hover:bg-blue-500 group-hover:text-white transition-colors">
                          <Maximize size={24} />
                        </div>
                        <h5 className="font-bold text-slate-800 text-[15px] mb-2">1. Bentuk (Form Factor)</h5>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Beli saiz yang betul. <br/>
                          • <strong>DIMM:</strong> Untuk PC Desktop (Panjang).<br/>
                          • <strong>SO-DIMM:</strong> Untuk Laptop (Pendek/Kompak).
                        </p>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all group">
                        <div className="text-purple-500 mb-3 bg-purple-50 w-12 h-12 flex items-center justify-center rounded-xl group-hover:bg-purple-500 group-hover:text-white transition-colors">
                          <Layers size={24} />
                        </div>
                        <h5 className="font-bold text-slate-800 text-[15px] mb-2">2. Generasi (DDR)</h5>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Motherboard DDR4 <strong>TIDAK BOLEH</strong> menyokong RAM DDR5. Semak manual spesifikasi Motherboard anda sebelum beli.
                        </p>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all group">
                        <div className="text-emerald-500 mb-3 bg-emerald-50 w-12 h-12 flex items-center justify-center rounded-xl group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                          <Database size={24} />
                        </div>
                        <h5 className="font-bold text-slate-800 text-[15px] mb-2">3. Kapasiti Memori</h5>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          • <strong>8GB:</strong> Asas (Office / Kelas).<br/>
                          • <strong>16GB:</strong> Standard (Gaming / Multitasking).<br/>
                          • <strong>32GB+:</strong> Profesional (Editing Berat).
                        </p>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all group">
                        <div className="text-amber-500 mb-3 bg-amber-50 w-12 h-12 flex items-center justify-center rounded-xl group-hover:bg-amber-500 group-hover:text-white transition-colors">
                          <ArrowRightLeft size={24} />
                        </div>
                        <h5 className="font-bold text-slate-800 text-[15px] mb-2">4. Dual-Channel</h5>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Sangat disyorkan beli sepasang! <br/>
                          Beli <strong>2 batang 8GB (2x8GB)</strong> lebih laju dan efisien berbanding beli 1 batang 16GB (1x16GB).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STORAGE CUSTOM INFOGRAPHICS */}
              {activeTopic.id === 'storage' && (
                <div className="space-y-8 mt-8">
                  {/* INFOGRAFIK FUNGSI STORAN (BERDASARKAN TEKS PENGGUNA) */}
                  <div className="p-6 lg:p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <div className="text-center mb-8">
                      <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-700 font-bold text-xs mb-2 tracking-widest uppercase">Peranan & Kegunaan</span>
                      <h4 className="font-bold text-slate-800 text-2xl flex items-center justify-center gap-2">
                        <Database className="text-orange-500" size={24}/> Fungsi Utama Storan (HDD/SSD)
                      </h4>
                      <p className="text-slate-500 text-sm mt-2 max-w-2xl mx-auto">Storan berfungsi menyimpan data, sistem operasi, dan aplikasi secara kekal di dalam komputer moden anda.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Fungsi 1 */}
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm flex gap-4 group hover:border-orange-300 transition-colors">
                        <div className="bg-orange-100 text-orange-600 p-3.5 rounded-xl shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors h-fit">
                          <Save size={26}/>
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-800 text-lg mb-2">1. Penyimpanan Data Kekal</h5>
                          <p className="text-sm text-slate-600 leading-relaxed">Menyimpan dokumen, gambar, video, muzik, aplikasi, dan fail OS secara kekal. Data <strong className="text-slate-800">tidak akan hilang</strong> apabila komputer dimatikan (berbeza dengan RAM).</p>
                        </div>
                      </div>
                      
                      {/* Fungsi 2 */}
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm flex gap-4 group hover:border-blue-300 transition-colors">
                        <div className="bg-blue-100 text-blue-600 p-3.5 rounded-xl shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-colors h-fit">
                          <Zap size={26}/>
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-800 text-lg mb-2">2. Memuatkan Sistem & Aplikasi</h5>
                          <p className="text-sm text-slate-600 leading-relaxed">OS dan aplikasi disimpan di storan dan dimuatkan ke RAM jika perlu. <strong className="text-slate-800">Kelajuan storan</strong> menentukan masa pemuatan OS ('booting') dan kelancaran sistem.</p>
                        </div>
                      </div>

                      {/* Fungsi 3 */}
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm flex gap-4 group hover:border-emerald-300 transition-colors">
                        <div className="bg-emerald-100 text-emerald-600 p-3.5 rounded-xl shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors h-fit">
                          <ShieldCheck size={26}/>
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-800 text-lg mb-2">3. Ruang Backup & Pemulihan</h5>
                          <p className="text-sm text-slate-600 leading-relaxed">Berfungsi sebagai tempat membuat <strong className="text-slate-800">sandaran (backup)</strong>. Ia membolehkan pengguna memulihkan fail penting sekiranya berlaku kerosakan pada sistem.</p>
                        </div>
                      </div>

                      {/* Fungsi 4 */}
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm flex gap-4 group hover:border-purple-300 transition-colors">
                        <div className="bg-purple-100 text-purple-600 p-3.5 rounded-xl shrink-0 group-hover:bg-purple-500 group-hover:text-white transition-colors h-fit">
                          <Layers size={26}/>
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-800 text-lg mb-2">4. Sokongan Data Bersaiz Besar</h5>
                          <p className="text-sm text-slate-600 leading-relaxed">Menyediakan kapasiti tinggi dan capaian pantas untuk penggunaan data berat seperti <strong className="text-slate-800">suntingan video, pangkalan data, dan gaming</strong>.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* INFOGRAFIK JENIS-JENIS STORAN & CIRI-CIRINYA */}
                  <div className="p-6 lg:p-8 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl mt-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 opacity-10 blur-3xl rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500 opacity-10 blur-3xl rounded-full pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

                    <div className="text-center mb-10 relative z-10">
                      <span className="inline-block py-1 px-3 rounded-full bg-slate-800 text-blue-300 font-bold text-xs mb-3 tracking-widest uppercase border border-slate-700">Kategori Perkakasan</span>
                      <h4 className="font-bold text-white text-2xl flex items-center justify-center gap-2">
                        <Layers className="text-blue-400" size={24}/> Jenis-Jenis Storan & Ciri-Cirinya
                      </h4>
                      <p className="text-slate-400 text-sm mt-2 max-w-2xl mx-auto">Evolusi dan variasi media penyimpanan data komputer dari era piring mekanikal hingga ke cip digital ultra-pantas masa kini.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                      {/* Jenis 1: HDD */}
                      <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-700 shadow-lg hover:-translate-y-2 transition-transform duration-300 group">
                        <div className="bg-slate-700 w-14 h-14 rounded-lg flex items-center justify-center mb-5 group-hover:bg-slate-600 transition-colors border border-slate-600 shadow-inner">
                          <HardDrive className="text-slate-300" size={28}/>
                        </div>
                        <h5 className="font-bold text-slate-100 text-lg mb-1">Hard Disk Drive (HDD)</h5>
                        <p className="text-xs font-mono text-slate-400 mb-4 pb-4 border-b border-slate-700">Era Tradisional (Mekanikal)</p>
                        <ul className="space-y-3 text-sm text-slate-300">
                          <li className="flex gap-2 items-start"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5"/> <span className="leading-snug">Kapasiti terlampau besar (hingga 22TB+).</span></li>
                          <li className="flex gap-2 items-start"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5"/> <span className="leading-snug">Kos paling murah untuk simpanan fail arkib.</span></li>
                          <li className="flex gap-2 items-start"><AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5"/> <span className="leading-snug">Kelajuan perlahan (Baca/Tulis: ~100MB/s).</span></li>
                          <li className="flex gap-2 items-start"><AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5"/> <span className="leading-snug">Mempunyai komponen berpusing; mudah rosak akibat gegaran.</span></li>
                        </ul>
                      </div>

                      {/* Jenis 2: SATA SSD */}
                      <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-700 shadow-lg hover:-translate-y-2 transition-transform duration-300 group">
                        <div className="bg-blue-900/40 w-14 h-14 rounded-lg flex items-center justify-center mb-5 group-hover:bg-blue-800/60 transition-colors border border-blue-800/50 shadow-inner">
                          <Database className="text-blue-400" size={28}/>
                        </div>
                        <h5 className="font-bold text-slate-100 text-lg mb-1">SATA SSD (2.5 Inci)</h5>
                        <p className="text-xs font-mono text-blue-400 mb-4 pb-4 border-b border-slate-700">Revolusi Digital (Cip Flash)</p>
                        <ul className="space-y-3 text-sm text-slate-300">
                          <li className="flex gap-2 items-start"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5"/> <span className="leading-snug">5x ganda lebih pantas dari HDD (~500MB/s).</span></li>
                          <li className="flex gap-2 items-start"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5"/> <span className="leading-snug">Tiada bahagian mekanikal, sangat tahan lasak.</span></li>
                          <li className="flex gap-2 items-start"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5"/> <span className="leading-snug">Beroperasi senyap dan menjimatkan kuasa.</span></li>
                          <li className="flex gap-2 items-start"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5"/> <span className="leading-snug">Alternatif bernilai untuk naik taraf laptop lama.</span></li>
                        </ul>
                      </div>

                      {/* Jenis 3: NVMe M.2 SSD */}
                      <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-700 shadow-lg hover:-translate-y-2 transition-transform duration-300 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-bl-lg shadow-md z-10">Paling Laju</div>
                        <div className="bg-indigo-900/40 w-14 h-14 rounded-lg flex items-center justify-center mb-5 group-hover:bg-indigo-800/60 transition-colors border border-indigo-800/50 shadow-inner relative z-10">
                          <Zap className="text-indigo-400" size={28}/>
                        </div>
                        <h5 className="font-bold text-slate-100 text-lg mb-1 relative z-10">M.2 NVMe SSD</h5>
                        <p className="text-xs font-mono text-indigo-400 mb-4 pb-4 border-b border-slate-700 relative z-10">Generasi Terkini (PCIe)</p>
                        <ul className="space-y-3 text-sm text-slate-300 relative z-10">
                          <li className="flex gap-2 items-start"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5"/> <span className="leading-snug">Ultra-Pantas! Mencapai lebih 7,000MB/s hingga 12,000MB/s.</span></li>
                          <li className="flex gap-2 items-start"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5"/> <span className="leading-snug">Bersaiz sangat kecil (kelihatan seperti pembaris/RAM).</span></li>
                          <li className="flex gap-2 items-start"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5"/> <span className="leading-snug">Dipasang terus pada papan induk (tiada kabel dileret).</span></li>
                          <li className="flex gap-2 items-start"><AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5"/> <span className="leading-snug">Memerlukan sokongan slot khas (M.2 PCIe) pada Motherboard.</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* INFOGRAFIK EKSPLORASI MODEL 3D AR STORAN */}
                  <div className="p-6 lg:p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 shadow-xl mt-8">
                    <div className="text-center mb-10">
                      <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 font-bold text-xs mb-2 tracking-widest uppercase">Eksplorasi Interaktif</span>
                      <h4 className="font-bold text-white text-2xl flex items-center justify-center gap-2">
                        <Box className="text-blue-400" size={24}/> Model 3D Storan Komputer
                      </h4>
                      <p className="text-slate-400 text-sm mt-2 max-w-2xl mx-auto">Sentuh dan putar (drag) atau zum (scroll) model 3D di bawah untuk melihat rupa bentuk fizikal setiap jenis storan dari pelbagai sudut.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Model HDD */}
                      <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-600 flex flex-col shadow-lg hover:shadow-orange-900/30 transition-shadow group">
                        <div className="flex items-center justify-between mb-3 px-2">
                          <div>
                            <h5 className="font-bold text-orange-400 text-lg">Cakera Keras (HDD)</h5>
                            <p className="text-xs text-slate-400">WD Green 1TB (Mekanikal)</p>
                          </div>
                          <div className="bg-orange-500/20 p-2 rounded-lg text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                            <HardDrive size={20} />
                          </div>
                        </div>
                        <div className="relative w-full aspect-square md:aspect-[4/3] rounded-lg overflow-hidden border border-slate-700 bg-black">
                          <iframe 
                            title="WD Green 1TB Hard Disk HDD" 
                            frameBorder="0" 
                            allowFullScreen 
                            allow="autoplay; fullscreen; xr-spatial-tracking" 
                            src="https://sketchfab.com/models/e9244f56e0724dd097570e29bae4b7c6/embed"
                            className="w-full h-full outline-none"
                          ></iframe>
                        </div>
                      </div>

                      {/* Model SATA SSD */}
                      <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-600 flex flex-col shadow-lg hover:shadow-blue-900/30 transition-shadow group">
                        <div className="flex items-center justify-between mb-3 px-2">
                          <div>
                            <h5 className="font-bold text-blue-400 text-lg">SATA SSD (2.5")</h5>
                            <p className="text-xs text-slate-400">Storan Cip Flash Standard</p>
                          </div>
                          <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                            <Database size={20} />
                          </div>
                        </div>
                        <div className="relative w-full aspect-square md:aspect-[4/3] rounded-lg overflow-hidden border border-slate-700 bg-black">
                          <iframe 
                            title="SSD SATA 2 5 7mm" 
                            frameBorder="0" 
                            allowFullScreen 
                            allow="autoplay; fullscreen; xr-spatial-tracking" 
                            src="https://sketchfab.com/models/1e35cdc38fe34089813551a08767b104/embed"
                            className="w-full h-full outline-none"
                          ></iframe>
                        </div>
                      </div>

                      {/* Model NVMe SSD */}
                      <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-600 flex flex-col shadow-lg hover:shadow-indigo-900/30 transition-shadow group">
                        <div className="flex items-center justify-between mb-3 px-2">
                          <div>
                            <h5 className="font-bold text-indigo-400 text-lg">M.2 NVMe SSD</h5>
                            <p className="text-xs text-slate-400">Samsung 990 Pro (PCIe Ultra Laju)</p>
                          </div>
                          <div className="bg-indigo-500/20 p-2 rounded-lg text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                            <Zap size={20} />
                          </div>
                        </div>
                        <div className="relative w-full aspect-square md:aspect-[4/3] rounded-lg overflow-hidden border border-slate-700 bg-black">
                          <iframe 
                            title="M.2 NVME SSD Samsung 990 Pro 1TB 3D model" 
                            frameBorder="0" 
                            allowFullScreen 
                            allow="autoplay; fullscreen; xr-spatial-tracking" 
                            src="https://sketchfab.com/models/41b7bfda7eab40f8b13330913fd66fc2/embed"
                            className="w-full h-full outline-none"
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* INFOGRAFIK PERBANDINGAN HDD VS SSD & JENIS SAMBUNGAN */}
                  <div className="p-6 lg:p-8 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm mt-8">
                    <div className="text-center mb-8">
                      <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 font-bold text-xs mb-2 tracking-widest uppercase">Perbandingan Teknologi</span>
                      <h4 className="font-bold text-slate-800 text-2xl flex items-center justify-center gap-2">
                        <ArrowRightLeft className="text-blue-500" size={24}/> HDD vs SSD & Jenis Sambungan
                      </h4>
                      <p className="text-slate-500 text-sm mt-2 max-w-2xl mx-auto">Perbezaan ketara antara dua jenis teknologi penyimpanan data masa kini serta cara ia disambungkan pada papan induk.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                      {/* Kad HDD */}
                      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 bg-slate-200 text-slate-600 text-xs font-bold px-3 py-1 rounded-bl-lg">Generasi Lama</div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-slate-100 p-2.5 rounded-lg text-slate-600"><HardDrive size={24}/></div>
                          <h5 className="font-black text-lg text-slate-800">Hard Disk Drive (HDD)</h5>
                        </div>
                        <ul className="space-y-3 text-sm text-slate-600">
                          <li className="flex gap-2 items-start"><CheckCircle size={16} className="text-slate-400 shrink-0 mt-0.5"/> Menggunakan piring magnetik berpusing (mekanikal).</li>
                          <li className="flex gap-2 items-start"><AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5"/> Kelajuan perlahan (50-150 MB/s).</li>
                          <li className="flex gap-2 items-start"><AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5"/> Sensitif gegaran fizikal dan menghasilkan bunyi bising.</li>
                          <li className="flex gap-2 items-start"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5"/> Harga murah untuk kapasiti yang sangat besar.</li>
                        </ul>
                      </div>

                      {/* Kad SSD */}
                      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">Generasi Baru</div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-orange-100 p-2.5 rounded-lg text-orange-600"><CircuitBoard size={24}/></div>
                          <h5 className="font-black text-lg text-slate-800">Solid State Drive (SSD)</h5>
                        </div>
                        <ul className="space-y-3 text-sm text-slate-600">
                          <li className="flex gap-2 items-start"><CheckCircle size={16} className="text-orange-400 shrink-0 mt-0.5"/> Menggunakan cip flash NAND digital. Tiada bahagian berputar.</li>
                          <li className="flex gap-2 items-start"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5"/> Sangat pantas! (500 - 12,000+ MB/s).</li>
                          <li className="flex gap-2 items-start"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5"/> Tahan lasak (gegong/jatuh) dan 100% senyap.</li>
                          <li className="flex gap-2 items-start"><AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5"/> Kos lebih mahal berbanding HDD bagi kapasiti yang sama.</li>
                        </ul>
                      </div>
                    </div>

                    <div className="border-t border-slate-200 pt-8">
                      <h5 className="font-bold text-slate-800 text-lg mb-5 text-center flex items-center justify-center gap-2">
                        <Link className="text-slate-400" size={20}/> Antaramuka Sambungan (Interface)
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-xl border border-slate-200 flex gap-4 items-center">
                          <div className="bg-slate-100 p-2 rounded-lg text-slate-500 shrink-0"><Plug size={24}/></div>
                          <div>
                            <h6 className="font-bold text-slate-800 mb-0.5">SATA (Kabel)</h6>
                            <p className="text-xs text-slate-600">Sambungan berwayar standard. Digunakan secara meluas oleh HDD besar dan SSD jenis SATA 2.5 inci.</p>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 flex gap-4 items-center">
                          <div className="bg-orange-100 p-2 rounded-lg text-orange-600 shrink-0"><Zap size={24}/></div>
                          <div>
                            <h6 className="font-bold text-slate-800 mb-0.5">NVMe (M.2)</h6>
                            <p className="text-xs text-slate-600">Cip SSD kecil (seperti pembaris) yang dipasang terus ke papan induk. Menggunakan laluan PCIe super pantas.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* INFOGRAFIK VISUALISASI KELAJUAN */}
                  <div className="p-6 bg-white rounded-xl border-2 border-orange-100 shadow-sm mt-8">
                    <h4 className="font-bold text-gray-800 mb-6 text-center text-lg">Ujian Visualisasi Kelajuan Pemuatan: HDD vs SSD</h4>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1 bg-gray-50 p-4 rounded-lg text-center opacity-80 border border-slate-200">
                        <div className="font-bold text-gray-600 mb-2">HDD (Mekanikal)</div>
                        <HardDrive className="mx-auto mb-2 text-gray-400" size={32} />
                        <div className="text-xs font-mono bg-gray-200 py-1 rounded">Speed: ~100 MB/s</div>
                        <div className="w-full bg-gray-200 rounded-full h-3 mt-3 overflow-hidden shadow-inner">
                          <div className="bg-gray-500 h-3 rounded-full" style={{ width: '5%' }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Lambat, mengambil masa untuk 'boot' Windows</p>
                      </div>
                      
                      <div className="flex-1 bg-orange-50 p-4 rounded-lg text-center border border-orange-200 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-20 blur-xl rounded-full"></div>
                        <div className="font-bold text-orange-600 mb-2">SSD NVMe (Digital)</div>
                        <CircuitBoard className="mx-auto mb-2 text-orange-500" size={32} />
                        <div className="text-xs font-mono bg-orange-100 py-1 rounded text-orange-800">Speed: ~3500+ MB/s</div>
                        <div className="w-full bg-gray-200 rounded-full h-3 mt-3 overflow-hidden shadow-inner relative">
                          <div className="bg-orange-500 h-3 rounded-full animate-pulse relative" style={{ width: '95%' }}>
                            <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full animate-[shimmer_1.5s_infinite]"></div>
                          </div>
                        </div>
                        <p className="text-xs text-orange-600 mt-2 font-medium">Sangat pantas, perisian dimuatkan sekelip mata</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PSU CUSTOM INFOGRAPHICS */}
              {activeTopic.id === 'psu' && (
                <div className="space-y-8 mt-8">
                  {/* INFOGRAFIK FUNGSI PSU */}
                  <div className="p-6 lg:p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <div className="text-center mb-8">
                      <span className="inline-block py-1 px-3 rounded-full bg-amber-100 text-amber-700 font-bold text-xs mb-2 tracking-widest uppercase">Peranan Utama</span>
                      <h4 className="font-bold text-slate-800 text-2xl flex items-center justify-center gap-2">
                        <BatteryCharging className="text-amber-500" size={24}/> Bekalan Kuasa (PSU)
                      </h4>
                      <p className="text-slate-500 text-sm mt-2 max-w-2xl mx-auto">Nadi utama yang berfungsi mengubah bentuk arus dan menyalurkan kuasa elektrik dengan selamat ke setiap komponen komputer.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-amber-300 transition-colors flex flex-col items-center text-center group">
                        <div className="bg-amber-100 text-amber-600 p-4 rounded-xl mb-4 group-hover:scale-110 transition-transform"><ArrowRightLeft size={32}/></div>
                        <h5 className="font-bold text-slate-800 text-lg mb-2">Penukar AC ke DC</h5>
                        <p className="text-sm text-slate-600 leading-relaxed">Soket di dinding menyalurkan kuasa <strong>AC (Alternating Current)</strong>. PSU akan menukarkannya kepada <strong>DC (Direct Current)</strong> yang boleh digunakan oleh komputer.</p>
                      </div>

                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-300 transition-colors flex flex-col items-center text-center group">
                        <div className="bg-blue-100 text-blue-600 p-4 rounded-xl mb-4 group-hover:scale-110 transition-transform"><ShieldCheck size={32}/></div>
                        <h5 className="font-bold text-slate-800 text-lg mb-2">Penyebar Arus Stabil</h5>
                        <p className="text-sm text-slate-600 leading-relaxed">Memecahkan dan mengedarkan voltan dengan tepat (seperti 12V, 5V, 3.3V) ke papan induk, CPU, GPU, dan pemacu storan dengan stabil.</p>
                      </div>

                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-rose-300 transition-colors flex flex-col items-center text-center group">
                        <div className="bg-rose-100 text-rose-600 p-4 rounded-xl mb-4 group-hover:scale-110 transition-transform"><ShieldAlert size={32}/></div>
                        <h5 className="font-bold text-slate-800 text-lg mb-2">Perisai Keselamatan</h5>
                        <p className="text-sm text-slate-600 leading-relaxed">Mempunyai litar pengesan seperti <strong>OVP</strong> (Perlindungan Lebih Voltan) atau <strong>SCP</strong> bagi menghalang litar pintas dari merosakkan komponen lain.</p>
                      </div>
                    </div>
                  </div>

                  {/* INFOGRAFIK KECEKAPAN 80 PLUS */}
                  <div className="p-6 lg:p-8 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 opacity-10 blur-3xl rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
                    
                    <div className="text-center mb-10 relative z-10">
                      <span className="inline-block py-1 px-3 rounded-full bg-slate-800 text-amber-400 font-bold text-xs mb-3 tracking-widest uppercase border border-slate-700">Taraf Kecekapan Tenaga</span>
                      <h4 className="font-bold text-white text-2xl flex items-center justify-center gap-2">
                        <Award className="text-amber-400" size={24}/> Memahami Sijil "80 PLUS"
                      </h4>
                      <p className="text-slate-400 text-sm mt-2 max-w-2xl mx-auto">Sijil ini menentukan <strong className="text-amber-300">seberapa cekap</strong> PSU menarik kuasa dari soket dinding tanpa membazirkan tenaga elektrik kepada bentuk haba panas.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10">
                      <div className="bg-slate-800/80 p-4 rounded-xl border-t-4 border-t-white shadow-lg text-center flex flex-col items-center justify-between">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-black text-slate-800 mb-3 shadow-[0_0_10px_rgba(255,255,255,0.3)]">80+</div>
                        <h6 className="text-white font-bold mb-1">Standard / White</h6>
                        <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded w-full">Cekap ~80%</span>
                      </div>
                      <div className="bg-slate-800/80 p-4 rounded-xl border-t-4 border-t-orange-700 shadow-lg text-center flex flex-col items-center justify-between">
                        <div className="w-12 h-12 bg-orange-700 rounded-full flex items-center justify-center font-black text-white mb-3 shadow-[0_0_10px_rgba(194,65,12,0.3)]">80+</div>
                        <h6 className="text-orange-200 font-bold mb-1">Bronze</h6>
                        <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded w-full">Cekap ~85%</span>
                      </div>
                      <div className="bg-slate-800/80 p-4 rounded-xl border-t-4 border-t-yellow-400 shadow-lg text-center flex flex-col items-center justify-between">
                        <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center font-black text-slate-900 mb-3 shadow-[0_0_15px_rgba(250,204,21,0.4)]">80+</div>
                        <h6 className="text-yellow-400 font-bold mb-1">Gold</h6>
                        <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded w-full">Cekap ~90%</span>
                      </div>
                      <div className="bg-slate-800/80 p-4 rounded-xl border-t-4 border-t-slate-300 shadow-lg text-center flex flex-col items-center justify-between">
                        <div className="w-12 h-12 bg-slate-300 rounded-full flex items-center justify-center font-black text-slate-900 mb-3 shadow-[0_0_10px_rgba(203,213,225,0.3)]">80+</div>
                        <h6 className="text-slate-300 font-bold mb-1">Platinum</h6>
                        <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded w-full">Cekap ~92%</span>
                      </div>
                      <div className="bg-slate-800/80 p-4 rounded-xl border-t-4 border-t-zinc-400 shadow-lg text-center flex flex-col items-center justify-between col-span-2 md:col-span-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-zinc-300 to-zinc-500 rounded-full flex items-center justify-center font-black text-slate-900 mb-3 shadow-[0_0_20px_rgba(161,161,170,0.5)]">80+</div>
                        <h6 className="text-zinc-300 font-bold mb-1">Titanium</h6>
                        <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded w-full">Cekap ~94%</span>
                      </div>
                    </div>
                  </div>

                  {/* INFOGRAFIK JENIS KABEL (MODULARITI) */}
                  <div className="p-6 lg:p-8 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="text-center mb-8">
                      <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs mb-2 tracking-widest uppercase">Estetik & Kekemasan</span>
                      <h4 className="font-bold text-slate-800 text-2xl flex items-center justify-center gap-2">
                        <Layers className="text-emerald-500" size={24}/> Jenis-Jenis Pengurusan Kabel (Modular)
                      </h4>
                      <p className="text-slate-500 text-sm mt-2 max-w-2xl mx-auto">Terdapat tiga jenis PSU berdasarkan keupayaan kabelnya dicabut. Ia sangat penting untuk kekemasan dalam kotak (cable management).</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative group">
                        <div className="flex justify-between items-start mb-3">
                          <h5 className="font-black text-lg text-slate-800">Non-Modular</h5>
                          <CheckCircle size={20} className="text-slate-300 group-hover:text-red-500 transition-colors"/>
                        </div>
                        <p className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded w-fit mb-3">Kabel Melekat Penuh</p>
                        <ul className="text-sm text-slate-600 space-y-2 pb-3">
                          <li>• Semua kabel <strong>melekat kekal</strong> di dalam kotak PSU.</li>
                          <li>• Susah diurus. Kabel berlebihan akan bersepah dan menyekat laluan angin.</li>
                          <li>• Pilihan paling murah.</li>
                        </ul>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative group">
                        <div className="flex justify-between items-start mb-3">
                          <h5 className="font-black text-lg text-slate-800">Semi-Modular</h5>
                          <CheckCircle size={20} className="text-slate-300 group-hover:text-blue-500 transition-colors"/>
                        </div>
                        <p className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded w-fit mb-3">Separuh Boleh Dicabut</p>
                        <ul className="text-sm text-slate-600 space-y-2 pb-3">
                          <li>• Kabel utama (Motherboard 24-Pin & CPU) melekat secara kekal.</li>
                          <li>• Kabel lebihan (SATA, PCIe untuk GPU) <strong>boleh dicabut</strong> jika tidak diguna.</li>
                          <li>• Kompromi terbaik antara harga & estetik.</li>
                        </ul>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative group">
                        <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">Paling Kemas</div>
                        <div className="flex justify-between items-start mb-3 mt-1">
                          <h5 className="font-black text-lg text-slate-800">Fully Modular</h5>
                          <CheckCircle size={20} className="text-slate-300 group-hover:text-emerald-500 transition-colors"/>
                        </div>
                        <p className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded w-fit mb-3">Bebas & Teratur</p>
                        <ul className="text-sm text-slate-600 space-y-2 pb-3">
                          <li>• <strong>Semua kabel boleh dicabut!</strong></li>
                          <li>• Pengurusan kabel sangat kemas; hanya pasang kabel yang diperlukan sahaja.</li>
                          <li>• Harga lebih mahal; biasa didapati pada PSU berkelas tinggi (Gold ke atas).</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* COOLING CUSTOM INFOGRAPHICS */}
              {activeTopic.id === 'cooling' && (
                <div className="space-y-8 mt-8">
                  {/* INFOGRAFIK DEFINISI COOLING */}
                  <div className="p-6 lg:p-8 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl border border-cyan-100 shadow-sm overflow-hidden relative">
                    <div className="absolute -top-10 -right-10 text-cyan-200/50 transform rotate-45 pointer-events-none">
                      <ThermometerSnowflake size={250} />
                    </div>
                    
                    <div className="text-center mb-8 relative z-10">
                      <span className="inline-block py-1 px-3 rounded-full bg-cyan-200 text-cyan-800 font-bold text-xs mb-3 tracking-widest uppercase">Peranan Utama</span>
                      <h4 className="font-bold text-slate-800 text-2xl flex items-center justify-center gap-2">
                        <Fan className="text-cyan-600" size={26}/> Sistem Penyejukan & Haba
                      </h4>
                      <p className="text-slate-600 text-sm mt-2 max-w-2xl mx-auto">Komponen dalaman terutamanya CPU dan GPU menghasilkan haba yang sangat tinggi. Sistem penyejukan bertanggungjawab menyebarkan dan membuang haba tersebut untuk mengelakkan komponen mencair atau terpadam (Thermal Throttling).</p>
                    </div>
                  </div>

                  {/* INFOGRAFIK AIR VS LIQUID COOLER */}
                  <div className="p-6 lg:p-8 bg-white rounded-2xl border border-slate-200 shadow-sm mt-8">
                    <div className="text-center mb-8">
                      <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mb-2 tracking-widest uppercase">Jenis Penyejukan CPU</span>
                      <h4 className="font-bold text-slate-800 text-2xl flex items-center justify-center gap-2">
                        <ArrowRightLeft className="text-indigo-500" size={24}/> Air Cooler vs Liquid (AIO) Cooler
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Air Cooler */}
                      <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 shadow-sm relative overflow-hidden group hover:border-cyan-300 transition-colors">
                        <div className="flex items-center gap-4 mb-5 pb-4 border-b border-slate-200">
                          <div className="bg-cyan-100 p-3.5 rounded-xl text-cyan-600 shrink-0">
                            <Wind size={32} />
                          </div>
                          <div>
                            <h5 className="font-black text-xl text-slate-800">Penyejuk Udara (Air Cooler)</h5>
                            <p className="text-xs text-slate-500 font-medium">Bongkah Besi (Heatsink) + Kipas</p>
                          </div>
                        </div>
                        <ul className="space-y-3 text-sm text-slate-600">
                          <li className="flex gap-2 items-start"><CheckCircle size={16} className="text-cyan-500 shrink-0 mt-0.5"/> <span className="leading-relaxed">Haba ditarik ke bongkah besi dan ditiup keluar oleh kipas fizikal.</span></li>
                          <li className="flex gap-2 items-start"><CheckCircle size={16} className="text-cyan-500 shrink-0 mt-0.5"/> <span className="leading-relaxed">Harga lebih murah, sangat tahan lama, dan penyelenggaraan rendah.</span></li>
                          <li className="flex gap-2 items-start"><AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5"/> <span className="leading-relaxed">Saiz agak besar (bulky) dan berpotensi menghalang slot RAM.</span></li>
                        </ul>
                      </div>

                      {/* Liquid Cooler */}
                      <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 shadow-sm relative overflow-hidden group hover:border-blue-400 transition-colors">
                        <div className="flex items-center gap-4 mb-5 pb-4 border-b border-slate-200">
                          <div className="bg-blue-100 p-3.5 rounded-xl text-blue-600 shrink-0">
                            <Droplets size={32} />
                          </div>
                          <div>
                            <h5 className="font-black text-xl text-slate-800">Penyejuk Cecair (AIO Liquid)</h5>
                            <p className="text-xs text-slate-500 font-medium">Pam Air + Paip Tiub + Radiator</p>
                          </div>
                        </div>
                        <ul className="space-y-3 text-sm text-slate-600">
                          <li className="flex gap-2 items-start"><CheckCircle size={16} className="text-blue-500 shrink-0 mt-0.5"/> <span className="leading-relaxed">Menggunakan peredaran cecair untuk memindahkan haba ke arah radiator dengan sangat efisien.</span></li>
                          <li className="flex gap-2 items-start"><CheckCircle size={16} className="text-blue-500 shrink-0 mt-0.5"/> <span className="leading-relaxed">Estetik menarik (nampak kemas) dan lebih senyap.</span></li>
                          <li className="flex gap-2 items-start"><AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5"/> <span className="leading-relaxed">Harga lebih mahal dan ada risiko kebocoran (walaupun jarang berlaku).</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* INFOGRAFIK THERMAL PASTE & AIRFLOW */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    {/* Thermal Paste */}
                    <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl text-slate-200 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-rose-500/20 p-2.5 rounded-lg text-rose-400">
                            <Thermometer size={24} />
                          </div>
                          <h5 className="font-bold text-white text-xl">Thermal Paste (Pes Terma)</h5>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed mb-4">Secalit cecair/pes kelabu yang wajib disapu di antara cip pemproses (CPU) dan tapak besi penyejuk (Cooler). Kenapa ia penting?</p>
                        
                        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-3 text-sm">
                          <div className="flex gap-3 items-center">
                            <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs">1</span>
                            <span className="flex-1">Mengisi rongga atau ruang udara mikroskopik pada permukaan logam.</span>
                          </div>
                          <div className="flex gap-3 items-center">
                            <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs">2</span>
                            <span className="flex-1">Memaksimumkan pengaliran haba (thermal transfer) ke tahap 100%.</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 text-xs font-bold text-rose-400 bg-rose-500/10 px-3 py-2 rounded border border-rose-500/20">
                        Awas: Jika pes terma tidak disapu, CPU boleh 'mati' kepanasan dalam beberapa saat!
                      </div>
                    </div>

                    {/* Konsep Airflow */}
                    <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-teal-100 p-2.5 rounded-lg text-teal-600">
                            <Wind size={24} />
                          </div>
                          <h5 className="font-bold text-slate-800 text-xl">Konsep Aliran Udara (Airflow)</h5>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed mb-4">Kipas pada casing (Case Fan) bukanlah sekadar hiasan RGB. Ia berfungsi mencipta laluan angin yang baik di dalam komputer.</p>
                        
                        <div className="space-y-4 text-sm mt-2">
                          <div className="flex gap-4 items-start">
                            <div className="bg-blue-100 text-blue-600 font-bold px-3 py-1 rounded text-xs shrink-0 w-20 text-center">INTAKE</div>
                            <span className="text-slate-700">Kipas diletakkan di bahagian <strong>depan atau bawah</strong> casing. Berfungsi <strong>menarik udara sejuk</strong> dari luar masuk ke dalam PC.</span>
                          </div>
                          <div className="flex gap-4 items-start">
                            <div className="bg-red-100 text-red-600 font-bold px-3 py-1 rounded text-xs shrink-0 w-20 text-center">EXHAUST</div>
                            <span className="text-slate-700">Kipas diletakkan di bahagian <strong>belakang atau atas</strong>. Berfungsi <strong>membuang/meniup udara panas</strong> keluar dari PC.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTopic.id === 'cpu' && (
                <div className="space-y-8 mt-8">
                  {/* INFOGRAFIK ELEMEN UTAMA PROCESSOR */}
                  <div className="p-6 lg:p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <div className="text-center mb-8">
                      <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 font-bold text-xs mb-2 tracking-widest uppercase">Anatomi Dalaman</span>
                      <h4 className="font-bold text-slate-800 text-2xl flex items-center justify-center gap-2">
                        <Layers className="text-blue-500" size={24}/> Elemen Utama Processor
                      </h4>
                      <p className="text-slate-500 text-sm mt-2">Tiga komponen teras yang sentiasa bekerjasama di dalam sekeping cip pemprosesan.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-center">
                        <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center text-blue-600 mb-4">
                          <Calculator size={28} />
                        </div>
                        <h5 className="font-bold text-slate-800 text-lg mb-1">ALU</h5>
                        <p className="text-xs text-slate-400 font-bold mb-3 uppercase tracking-wide">Arithmetic Logic Unit</p>
                        <p className="text-sm text-slate-600 leading-relaxed">Pusat logik komputer. Bertanggungjawab melaksanakan semua pengiraan matematik dan operasi logikal yang kompleks.</p>
                      </div>
                      
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-center">
                        <div className="bg-emerald-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center text-emerald-600 mb-4">
                          <ArrowRightLeft size={28} />
                        </div>
                        <h5 className="font-bold text-slate-800 text-lg mb-1">CU</h5>
                        <p className="text-xs text-slate-400 font-bold mb-3 uppercase tracking-wide">Control Unit</p>
                        <p className="text-sm text-slate-600 leading-relaxed">Ketua trafik data. Mengatur dan mengawal lalu lintas pertukaran maklumat dari peranti input/output ke komponen lain.</p>
                      </div>

                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-center">
                        <div className="bg-purple-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center text-purple-600 mb-4">
                          <Database size={28} />
                        </div>
                        <h5 className="font-bold text-slate-800 text-lg mb-1">MU</h5>
                        <p className="text-xs text-slate-400 font-bold mb-3 uppercase tracking-wide">Memory Unit / Cache</p>
                        <p className="text-sm text-slate-600 leading-relaxed">Bilik kebal pantas. Menyimpan memori serta arahan (Cache/Register) sementara di dalam cip CPU untuk akses super laju.</p>
                      </div>
                    </div>
                  </div>

                  {/* INFOGRAFIK CORES, THREADS & KELAJUAN */}
                  <div className="p-6 lg:p-8 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-20 blur-3xl rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
                    
                    <div className="text-center mb-8 relative z-10">
                      <span className="inline-block py-1 px-3 rounded-full bg-indigo-200 text-indigo-800 font-bold text-xs mb-3 tracking-widest uppercase">Spesifikasi Kuasa</span>
                      <h4 className="font-bold text-slate-800 text-2xl flex items-center justify-center gap-2">
                        <Zap className="text-amber-500" size={26}/> Fahami Kuasa Sebenar CPU
                      </h4>
                      <p className="text-slate-600 text-sm mt-2 max-w-lg mx-auto">Istilah teknikal yang menentukan sama ada PC anda pantas ataupun 'lag' semasa melakukan kerja berat.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative hover:-translate-y-1 hover:shadow-md transition-all">
                        <div className="text-indigo-500 mb-4 bg-indigo-50 w-14 h-14 flex items-center justify-center rounded-xl">
                          <Users size={28} />
                        </div>
                        <h5 className="font-bold text-slate-800 text-lg mb-2">Teras (Cores)</h5>
                        <p className="text-sm text-slate-600 leading-relaxed mb-3">
                          Bagaikan 'pekerja' fizikal di dalam cip. Lebih banyak teras (contoh: 8-Core, 16-Core), lebih banyak aplikasi boleh dibuka serentak.
                        </p>
                        <span className="text-[11px] font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded">Bagus untuk: Multitasking & Rendering</span>
                      </div>

                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative hover:-translate-y-1 hover:shadow-md transition-all">
                        <div className="text-emerald-500 mb-4 bg-emerald-50 w-14 h-14 flex items-center justify-center rounded-xl">
                          <GitBranch size={28} />
                        </div>
                        <h5 className="font-bold text-slate-800 text-lg mb-2">Bebenang (Threads)</h5>
                        <p className="text-sm text-slate-600 leading-relaxed mb-3">
                          'Tangan maya' bagi pekerja. Ia menipu sistem supaya 1 teras fizikal dapat membuat 2 kerja serentak (Hyper-threading).
                        </p>
                        <span className="text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded">Bagus untuk: Perisian Berat & Kreatif</span>
                      </div>

                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative hover:-translate-y-1 hover:shadow-md transition-all">
                        <div className="text-orange-500 mb-4 bg-orange-50 w-14 h-14 flex items-center justify-center rounded-xl">
                          <Gauge size={28} />
                        </div>
                        <h5 className="font-bold text-slate-800 text-lg mb-2">Kelajuan Jam</h5>
                        <p className="text-sm text-slate-600 leading-relaxed mb-3">
                          Diukur dalam GHz (contoh: 4.5 GHz). Ia menandakan kelajuan seorang 'pekerja' menyiapkan 1 fail tugas. Lebih tinggi, lebih pantas!
                        </p>
                        <span className="text-[11px] font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded">Bagus untuk: E-Sports & Gaming</span>
                      </div>
                    </div>
                  </div>

                  {/* INFOGRAFIK HIERARKI KELAS PROCESSOR */}
                  <div className="p-6 lg:p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <div className="text-center mb-8">
                      <span className="inline-block py-1 px-3 rounded-full bg-rose-100 text-rose-700 font-bold text-xs mb-2 tracking-widest uppercase">Peringkat Prestasi</span>
                      <h4 className="font-bold text-slate-800 text-2xl flex items-center justify-center gap-2">
                        <Award className="text-rose-500" size={24}/> Hierarki & Kelas Processor
                      </h4>
                      <p className="text-slate-500 text-sm mt-2">Bandingkan siri Intel Core dan AMD Ryzen untuk mencari tahap yang paling sepadan dengan poket anda.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                      {/* Entry Level */}
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-emerald-300 transition-colors group">
                        <div className="flex justify-between items-start mb-4">
                          <div className="bg-emerald-100 p-2.5 rounded-lg text-emerald-600"><Star size={20} /></div>
                          <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">Bajet Rendah</span>
                        </div>
                        <h5 className="font-bold text-slate-800 text-lg mb-1">Kelas Asas</h5>
                        <p className="font-mono text-xs font-bold text-slate-500 mb-3 group-hover:text-emerald-600 transition-colors">Core i3 / Ryzen 3</p>
                        <ul className="text-sm text-slate-600 space-y-2 mb-4">
                          <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500"/> Kerja pejabat (Word/Excel)</li>
                          <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500"/> Tugasan kelas pelajar</li>
                          <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500"/> Tonton Netflix & Web</li>
                        </ul>
                      </div>

                      {/* Mid Range */}
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-blue-300 transition-colors group">
                        <div className="flex justify-between items-start mb-4">
                          <div className="bg-blue-100 p-2.5 rounded-lg text-blue-600 flex"><Star size={20}/><Star size={20} className="-ml-2"/></div>
                          <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Paling Popular</span>
                        </div>
                        <h5 className="font-bold text-slate-800 text-lg mb-1">Kelas Pertengahan</h5>
                        <p className="font-mono text-xs font-bold text-slate-500 mb-3 group-hover:text-blue-600 transition-colors">Core i5 / Ryzen 5</p>
                        <ul className="text-sm text-slate-600 space-y-2 mb-4">
                          <li className="flex items-center gap-2"><CheckCircle size={14} className="text-blue-500"/> Gaming tahap sederhana</li>
                          <li className="flex items-center gap-2"><CheckCircle size={14} className="text-blue-500"/> Edit gambar & video ringan</li>
                          <li className="flex items-center gap-2"><CheckCircle size={14} className="text-blue-500"/> Keseimbangan harga/prestasi</li>
                        </ul>
                      </div>

                      {/* High End */}
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-purple-300 transition-colors group">
                        <div className="flex justify-between items-start mb-4">
                          <div className="bg-purple-100 p-2.5 rounded-lg text-purple-600 flex"><Star size={20}/><Star size={20} className="-ml-2"/><Star size={20} className="-ml-2"/></div>
                          <span className="text-[10px] font-black uppercase text-purple-600 bg-purple-100 px-2 py-1 rounded-full">Berkuasa</span>
                        </div>
                        <h5 className="font-bold text-slate-800 text-lg mb-1">Kelas Atasan</h5>
                        <p className="font-mono text-xs font-bold text-slate-500 mb-3 group-hover:text-purple-600 transition-colors">Core i7 / Ryzen 7</p>
                        <ul className="text-sm text-slate-600 space-y-2 mb-4">
                          <li className="flex items-center gap-2"><CheckCircle size={14} className="text-purple-500"/> Main game grafik Ultra</li>
                          <li className="flex items-center gap-2"><CheckCircle size={14} className="text-purple-500"/> Suntingan Video (4K)</li>
                          <li className="flex items-center gap-2"><CheckCircle size={14} className="text-purple-500"/> Perisian berat/3D asas</li>
                        </ul>
                      </div>

                      {/* Enthusiast */}
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-rose-300 transition-colors group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-rose-100 rounded-bl-full -z-0"></div>
                        <div className="flex justify-between items-start mb-4 relative z-10">
                          <div className="bg-rose-100 p-2.5 rounded-lg text-rose-600"><Crown size={20} /></div>
                          <span className="text-[10px] font-black uppercase text-rose-600 bg-rose-100 px-2 py-1 rounded-full">Kelas Kayangan</span>
                        </div>
                        <h5 className="font-bold text-slate-800 text-lg mb-1 relative z-10">Pakar / Enthusiast</h5>
                        <p className="font-mono text-xs font-bold text-slate-500 mb-3 group-hover:text-rose-600 transition-colors relative z-10">Core i9 / Ryzen 9</p>
                        <ul className="text-sm text-slate-600 space-y-2 mb-4 relative z-10">
                          <li className="flex items-center gap-2"><CheckCircle size={14} className="text-rose-500"/> Prestasi tanpa kompromi</li>
                          <li className="flex items-center gap-2"><CheckCircle size={14} className="text-rose-500"/> Rendering 3D skala besar</li>
                          <li className="flex items-center gap-2"><CheckCircle size={14} className="text-rose-500"/> Stesen kerja profesional</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* INFOGRAFIK CARA MEMILIH CPU */}
                  <div className="p-6 lg:p-8 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-20 blur-3xl rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
                    
                    <div className="text-center mb-10 relative z-10">
                      <span className="inline-block py-1 px-3 rounded-full bg-indigo-200 text-indigo-800 font-bold text-xs mb-3 tracking-widest uppercase">Langkah Demi Langkah</span>
                      <h4 className="font-bold text-slate-800 text-2xl flex items-center justify-center gap-2">
                        <CheckCircle className="text-indigo-600" size={26}/> Panduan Memilih CPU
                      </h4>
                      <p className="text-slate-600 text-sm mt-2 max-w-lg mx-auto">Ikuti 3 langkah mudah ini sebelum anda membeli pemproses (CPU) baharu untuk mengelakkan pembaziran dan masalah keserasian.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                      {/* Step 1 */}
                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative hover:-translate-y-1 hover:shadow-md transition-all">
                        <div className="absolute -top-4 -left-2 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-black text-lg border-4 border-indigo-50">1</div>
                        <div className="text-indigo-500 mb-4 mt-2 bg-indigo-50 w-14 h-14 flex items-center justify-center rounded-xl">
                          <Briefcase size={28} />
                        </div>
                        <h5 className="font-bold text-slate-800 text-lg mb-2">Tentukan Kegunaan</h5>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Beli mengikut bajet dan tujuan. <br/><br/>
                          <span className="flex items-center gap-2 mb-1"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span> <strong>Kerja Asas:</strong> i3 / Ryzen 3</span>
                          <span className="flex items-center gap-2 mb-1"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span> <strong>Gaming/Kerja:</strong> i5 / Ryzen 5</span>
                          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span> <strong>Pro/Berat:</strong> i7, i9 / Ryzen 7, 9</span>
                        </p>
                      </div>
                      
                      {/* Step 2 */}
                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative hover:-translate-y-1 hover:shadow-md transition-all">
                        <div className="absolute -top-4 -left-2 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-black text-lg border-4 border-blue-50">2</div>
                        <div className="text-blue-500 mb-4 mt-2 bg-blue-50 w-14 h-14 flex items-center justify-center rounded-xl">
                          <CircuitBoard size={28} />
                        </div>
                        <h5 className="font-bold text-slate-800 text-lg mb-2">Semak Keserasian</h5>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          CPU dan Papan Induk ibarat kunci dan mangga. Pastikan <strong>Jenis Soket</strong> (Cth: Intel LGA 1700 atau AMD AM5) adalah sepadan sebelum membeli!
                        </p>
                      </div>

                      {/* Step 3 */}
                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative hover:-translate-y-1 hover:shadow-md transition-all">
                        <div className="absolute -top-4 -left-2 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-black text-lg border-4 border-purple-50">3</div>
                        <div className="text-purple-500 mb-4 mt-2 bg-purple-50 w-14 h-14 flex items-center justify-center rounded-xl">
                          <Search size={28} />
                        </div>
                        <h5 className="font-bold text-slate-800 text-lg mb-2">Fahami Kod Huruf</h5>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Jangan semberono beli! Perhatikan <strong>huruf akhir</strong> pada model CPU (Seperti F, K, G, X) kerana ia menentukan ciri tambahan. Rujuk jadual di bawah.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* INFOGRAFIK LGA VS PGA */}
                  <div className="p-6 lg:p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <div className="text-center mb-8">
                      <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 font-bold text-xs mb-2 tracking-widest uppercase">Perbandingan Fizikal</span>
                      <h4 className="font-bold text-slate-800 text-2xl flex items-center justify-center gap-2">
                        <Cpu className="text-blue-500" size={24}/> Jenis Soket CPU: LGA vs PGA
                      </h4>
                      <p className="text-slate-500 text-sm mt-2">Ketahui perbezaan fizikal antara pemproses LGA dan PGA untuk mengelakkan kerosakan pin semasa pemasangan.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {/* KAD LGA */}
                       <div className="bg-slate-50 rounded-2xl p-6 border-2 border-blue-100 relative overflow-hidden group hover:border-blue-300 transition-all shadow-sm">
                          <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">Moden</div>
                          <div className="flex items-center gap-4 mb-4">
                            <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                              <CircuitBoard size={32} />
                            </div>
                            <div>
                              <h5 className="font-black text-xl text-slate-800">LGA</h5>
                              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Land Grid Array</p>
                            </div>
                          </div>
                          <ul className="space-y-3 mt-4">
                            <li className="flex items-start gap-2 text-sm text-slate-700">
                              <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                              <span><strong>Pin (Jarum)</strong> terletak pada papan induk (Motherboard).</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-slate-700">
                              <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                              <span>CPU hanya mempunyai <strong>pad sesentuh emas</strong> yang rata di bahagian bawah. Lebih selamat dipegang.</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-slate-700">
                              <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                              <span><strong>Contoh:</strong> Hampir semua CPU Intel moden & AMD siri Ryzen AM5.</span>
                            </li>
                          </ul>
                       </div>

                       {/* KAD PGA */}
                       <div className="bg-slate-50 rounded-2xl p-6 border-2 border-orange-100 relative overflow-hidden group hover:border-orange-300 transition-all shadow-sm">
                          <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">Klasik / Lama</div>
                          <div className="flex items-center gap-4 mb-4">
                            <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
                              <Cpu size={32} />
                            </div>
                            <div>
                              <h5 className="font-black text-xl text-slate-800">PGA</h5>
                              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Pin Grid Array</p>
                            </div>
                          </div>
                          <ul className="space-y-3 mt-4">
                            <li className="flex items-start gap-2 text-sm text-slate-700">
                              <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                              <span><strong>Pin (Jarum)</strong> berada di bahagian bawah CPU itu sendiri. Ia sangat rapuh dan mudah bengkok!</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-slate-700">
                              <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                              <span>Papan induk hanya mempunyai <strong>lubang berongga</strong> untuk memasukkan pin dari CPU.</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-slate-700">
                              <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                              <span><strong>Contoh:</strong> CPU AMD siri Ryzen AM4.</span>
                            </li>
                          </ul>
                       </div>
                    </div>
                  </div>

                  {/* INFOGRAFIK CARA PEMASANGAN CPU - DENGAN YOUTUBE EMBED */}
                  <div className="p-6 lg:p-8 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden mt-8">
                    <div className="text-center mb-10 relative z-10">
                      <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs mb-3 tracking-widest uppercase">Tutorial Praktikal</span>
                      <h4 className="font-bold text-slate-800 text-2xl flex items-center justify-center gap-2">
                        <Wrench className="text-emerald-500" size={26}/> Cara Memasang CPU
                      </h4>
                      <p className="text-slate-600 text-sm mt-2 max-w-lg mx-auto">Ikuti langkah-langkah keselamatan ini dengan teliti untuk mengelakkan sebarang kerosakan pin pada soket atau CPU anda.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                      {/* Step 1 */}
                      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center relative pt-8 mt-4 hover:shadow-md hover:border-emerald-300 transition-all group">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center font-black text-lg border-4 border-slate-50 shadow-sm group-hover:bg-emerald-500 transition-colors">1</div>
                        <Unlock className="mx-auto text-slate-400 mb-3 group-hover:text-emerald-500 transition-colors" size={32} />
                        <h5 className="font-bold text-slate-800 mb-2">Buka Kunci Tuil</h5>
                        <p className="text-xs text-slate-600 leading-relaxed">Tarik tuil besi penyemat (lever) di sebelah soket ke luar sedikit dan angkat ke atas.</p>
                      </div>
                      
                      {/* Step 2 */}
                      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center relative pt-8 mt-4 hover:shadow-md hover:border-amber-300 transition-all group">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center font-black text-lg border-4 border-slate-50 shadow-sm group-hover:bg-amber-500 transition-colors">2</div>
                        <AlertTriangle className="mx-auto text-amber-500 mb-3 group-hover:scale-110 transition-transform" size={32} />
                        <h5 className="font-bold text-slate-800 mb-2">Cari Penanda Segitiga</h5>
                        <p className="text-xs text-slate-600 leading-relaxed">Jajarkan (align) <strong>bucu segitiga emas</strong> pada CPU dengan penanda segitiga pada soket papan induk.</p>
                      </div>
                      
                      {/* Step 3 */}
                      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center relative pt-8 mt-4 hover:shadow-md hover:border-blue-300 transition-all group">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center font-black text-lg border-4 border-slate-50 shadow-sm group-hover:bg-blue-500 transition-colors">3</div>
                        <ArrowDown className="mx-auto text-blue-500 mb-3 group-hover:translate-y-1 transition-transform" size={32} />
                        <h5 className="font-bold text-slate-800 mb-2">Letak Perlahan</h5>
                        <p className="text-xs text-slate-600 leading-relaxed">Pegang di bahagian tepi CPU dan lepaskan ia perlahan-lahan ke dalam soket. <strong>Jangan ditekan secara paksa!</strong></p>
                      </div>
                      
                      {/* Step 4 */}
                      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center relative pt-8 mt-4 hover:shadow-md hover:border-emerald-400 transition-all group">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-black text-lg border-4 border-slate-50 shadow-sm">4</div>
                        <Lock className="mx-auto text-emerald-500 mb-3 group-hover:text-emerald-600 transition-colors" size={32} />
                        <h5 className="font-bold text-slate-800 mb-2">Kunci Semula Tuil</h5>
                        <p className="text-xs text-slate-600 leading-relaxed">Tolak semula tuil besi ke bawah dan sangkutkan di bawah cangkuk untuk mengunci kedudukan CPU.</p>
                      </div>
                    </div>

                    {/* YouTube Video Embed Block */}
                    <div className="mt-10 bg-slate-900 p-5 sm:p-6 rounded-2xl shadow-lg border border-slate-800">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="bg-red-600/20 p-2 rounded-lg">
                          <MonitorPlay className="text-red-500" size={28} />
                        </div>
                        <div>
                          <h5 className="font-bold text-white text-lg leading-tight">Video Rujukan Praktikal</h5>
                          <p className="text-slate-400 text-xs">Cara selamat memasang CPU ke Papan Induk (Motherboard).</p>
                        </div>
                      </div>
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-700 bg-black shadow-inner">
                        <iframe 
                          className="absolute top-0 left-0 w-full h-full"
                          src="https://www.youtube.com/embed/CZ_dKpVsl6A?si=JP7PMe1Tc16n3Hhc" 
                          title="YouTube video player" 
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  </div>

                  {/* INFOGRAFIK KOD HURUF CPU */}
                  <div className="p-6 lg:p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <div className="text-center mb-8">
                      <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mb-2 tracking-widest uppercase">Panduan Tambahan</span>
                      <h4 className="font-bold text-slate-800 text-2xl flex items-center justify-center gap-2">
                        <Sparkles className="text-yellow-500" size={24}/> Rahsia Kod Huruf CPU
                      </h4>
                      <p className="text-slate-500 text-sm mt-2">Ketahui makna huruf (suffix) di belakang nama model Intel dan AMD supaya tidak tersilap beli.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* INTEL SECTION */}
                      <div className="relative p-5 sm:p-6 rounded-2xl border-2 border-blue-200 bg-gradient-to-b from-blue-50/50 to-white pt-10">
                        <div className="absolute -top-4 left-6 bg-blue-600 text-white font-black px-4 py-1.5 rounded-full shadow-md text-sm">INTEL CORE</div>
                        <div className="space-y-4">
                          <InfoCard letter="-" label="Standard" desc="Pilihan asas, ada cip grafik terbina (iGPU)." ex="i5-13400" color="bg-slate-200 text-slate-700"/>
                          <InfoCard letter="F" label="Perlu GPU Asing" desc="Tiada grafik terbina. WAJIB beli kad grafik asing." ex="i5-13400F" color="bg-blue-100 text-blue-700"/>
                          <InfoCard letter="K" label="Unlocked" desc="Boleh di-overclock untuk kelajuan maksimum." ex="i5-13600K" color="bg-indigo-100 text-indigo-700"/>
                          <InfoCard letter="KF" label="Unlocked + Tiada GPU" desc="Laju macam siri K, tapi tiada grafik terbina." ex="i5-13600KF" color="bg-violet-100 text-violet-700"/>
                          <div className="pt-3 mt-3 border-t border-blue-100">
                            <p className="text-xs font-bold text-slate-400 uppercase mb-2">Siri Laptop:</p>
                            <div className="flex flex-wrap gap-2">
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium"><strong>HX/H:</strong> Prestasi Tinggi</span>
                              <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded font-medium"><strong>P:</strong> Seimbang</span>
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium"><strong>U:</strong> Jimat Bateri</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* AMD SECTION */}
                      <div className="relative p-5 sm:p-6 rounded-2xl border-2 border-red-200 bg-gradient-to-b from-red-50/50 to-white pt-10">
                        <div className="absolute -top-4 left-6 bg-red-600 text-white font-black px-4 py-1.5 rounded-full shadow-md text-sm">AMD RYZEN</div>
                        <div className="space-y-4">
                          <InfoCard letter="-" label="Standard" desc="Versi asas yang jimat kuasa dan seimbang." ex="Ryzen 5 7600" color="bg-slate-200 text-slate-700"/>
                          <InfoCard letter="X" label="Xtreme" desc="Kelajuan jam (Clock Speed) lebih pantas." ex="Ryzen 5 7600X" color="bg-red-100 text-red-700"/>
                          <InfoCard letter="G" label="Graphics" desc="Ada grafik Radeon terbina yang sangat kuat (APU)." ex="Ryzen 5 5600G" color="bg-orange-100 text-orange-700"/>
                          <InfoCard letter="X3D" label="3D V-Cache" desc="Cache L3 ekstra besar. Sangat berkuasa untuk Gaming!" ex="Ryzen 7 7800X3D" color="bg-rose-100 text-rose-700"/>
                          <div className="pt-3 mt-3 border-t border-red-100">
                            <p className="text-xs font-bold text-slate-400 uppercase mb-2">Siri Laptop:</p>
                            <div className="flex flex-wrap gap-2">
                              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded font-medium"><strong>HX:</strong> Prestasi Maksimum</span>
                              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded font-medium"><strong>HS:</strong> Nipis & Laju</span>
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium"><strong>U:</strong> Jimat Bateri</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* OS CUSTOM INFOGRAPHICS */}
              {activeTopic.id === 'os' && (
                <div className="space-y-8 mt-8">
                  <div className="p-6 lg:p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <div className="text-center mb-8">
                      <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mb-2 tracking-widest uppercase">Perisian Utama</span>
                      <h4 className="font-bold text-slate-800 text-2xl flex items-center justify-center gap-2">
                        <AppWindow className="text-indigo-500" size={24}/> Kategori Sistem Operasi
                      </h4>
                      <p className="text-slate-500 text-sm mt-2 max-w-2xl mx-auto">Kenali 'nyawa' di sebalik komponen fizikal. Tanpa Sistem Operasi, komputer hanyalah sekeping logam yang tidak berfungsi.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-400 transition-all text-center group">
                        <div className="bg-blue-100 text-blue-600 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <AppWindow size={32}/>
                        </div>
                        <h5 className="font-bold text-slate-800 text-lg mb-2">Microsoft Windows</h5>
                        <p className="text-sm text-slate-600 leading-relaxed mb-4">Sistem operasi paling popular di dunia untuk PC Desktop. Sangat mendominasi industri kerja pejabat dan e-Sukan (Gaming) dengan sokongan perisian terbanyak.</p>
                        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold">Cth: Windows 11</span>
                      </div>

                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-slate-800 transition-all text-center group">
                        <div className="bg-slate-200 text-slate-800 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Monitor size={32}/>
                        </div>
                        <h5 className="font-bold text-slate-800 text-lg mb-2">Apple macOS</h5>
                        <p className="text-sm text-slate-600 leading-relaxed mb-4">Sistem operasi eksklusif untuk komputer keluaran Apple (MacBook / iMac). Terkenal dengan kestabilan, keselamatan tinggi, dan pilihan utama industri kreatif & pereka.</p>
                        <span className="text-xs bg-slate-200 text-slate-800 px-3 py-1 rounded-full font-bold">Cth: macOS Sonoma</span>
                      </div>

                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-orange-400 transition-all text-center group">
                        <div className="bg-orange-100 text-orange-600 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Terminal size={32}/>
                        </div>
                        <h5 className="font-bold text-slate-800 text-lg mb-2">Linux (Open Source)</h5>
                        <p className="text-sm text-slate-600 leading-relaxed mb-4">Sistem berasaskan sumber terbuka yang percuma. Sangat kebal dari virus. Pilihan nombor 1 untuk komputer Pelayan (Server) dan pakar teknologi IT (Programmer).</p>
                        <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-bold">Cth: Ubuntu, Kali Linux</span>
                      </div>
                    </div>
                  </div>

                  {/* INFOGRAFIK FRESH INSTALL WINDOWS */}
                  <div className="p-6 lg:p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-40 blur-3xl rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
                    
                    <div className="text-center mb-10 relative z-10">
                      <span className="inline-block py-1 px-3 rounded-full bg-blue-200 text-blue-800 font-bold text-xs mb-3 tracking-widest uppercase">Panduan Praktikal</span>
                      <h4 className="font-bold text-slate-800 text-2xl flex items-center justify-center gap-2">
                        <Download className="text-blue-600" size={26}/> Langkah "Fresh Install" Windows 10 / 11
                      </h4>
                      <p className="text-slate-600 text-sm mt-2 max-w-2xl mx-auto">Cara rasmi dan paling bersih untuk memasang semula sistem operasi Windows pada PC atau Laptop anda menggunakan pemacu USB (Pendrive).</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
                      {/* Step 1 */}
                      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative hover:-translate-y-1 hover:shadow-md transition-all text-center">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-black text-sm border-2 border-white shadow-sm">1</div>
                        <div className="text-blue-500 mb-3 mt-2 bg-blue-50 w-12 h-12 mx-auto flex items-center justify-center rounded-xl">
                          <Globe size={24} />
                        </div>
                        <h5 className="font-bold text-slate-800 text-sm mb-2">Muat Turun</h5>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Laman rasmi Microsoft muat turun <strong>Media Creation Tool</strong>.
                        </p>
                      </div>
                      
                      {/* Step 2 */}
                      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative hover:-translate-y-1 hover:shadow-md transition-all text-center">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-black text-sm border-2 border-white shadow-sm">2</div>
                        <div className="text-blue-500 mb-3 mt-2 bg-blue-50 w-12 h-12 mx-auto flex items-center justify-center rounded-xl">
                          <Usb size={24} />
                        </div>
                        <h5 className="font-bold text-slate-800 text-sm mb-2">Bina Bootable USB</h5>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Pilih "Create media" pada <strong>Pendrive (min 8GB)</strong>.
                        </p>
                      </div>

                      {/* Step 3 */}
                      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative hover:-translate-y-1 hover:shadow-md transition-all text-center">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-black text-sm border-2 border-white shadow-sm">3</div>
                        <div className="text-blue-500 mb-3 mt-2 bg-blue-50 w-12 h-12 mx-auto flex items-center justify-center rounded-xl">
                          <Settings size={24} />
                        </div>
                        <h5 className="font-bold text-slate-800 text-sm mb-2">Tetapan BIOS</h5>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Cucuk USB & hidupkan PC. Tekan <strong>F2/DEL</strong> masuk BIOS. Tukar Boot ke USB.
                        </p>
                      </div>

                      {/* Step 4 */}
                      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative hover:-translate-y-1 hover:shadow-md transition-all text-center">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-black text-sm border-2 border-white shadow-sm">4</div>
                        <div className="text-blue-500 mb-3 mt-2 bg-blue-50 w-12 h-12 mx-auto flex items-center justify-center rounded-xl">
                          <HardDrive size={24} />
                        </div>
                        <h5 className="font-bold text-slate-800 text-sm mb-2">Format & Custom</h5>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Pilih <strong>Custom Install</strong>. "Delete" partition OS lama hingga Unallocated.
                        </p>
                      </div>

                      {/* Step 5 */}
                      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative hover:-translate-y-1 hover:shadow-md transition-all text-center">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-black text-sm border-2 border-white shadow-sm">5</div>
                        <div className="text-emerald-500 mb-3 mt-2 bg-emerald-50 w-12 h-12 mx-auto flex items-center justify-center rounded-xl">
                          <CheckCircle size={24} />
                        </div>
                        <h5 className="font-bold text-slate-800 text-sm mb-2">Tunggu & Siap</h5>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Klik Next. PC akan <strong>Restart</strong>. Siap untuk digunakan!
                        </p>
                      </div>
                    </div>
                    
                    {/* YouTube Video Embed Block untuk Pemasangan Windows */}
                    <div className="mt-10 mb-4 bg-slate-900 p-5 sm:p-6 rounded-2xl shadow-lg border border-slate-800 relative z-10">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="bg-red-600/20 p-2 rounded-lg">
                          <MonitorPlay className="text-red-500" size={28} />
                        </div>
                        <div>
                          <h5 className="font-bold text-white text-lg leading-tight">Video Rujukan Praktikal</h5>
                          <p className="text-slate-400 text-xs">Tutorial langkah demi langkah "Fresh Install" Windows.</p>
                        </div>
                      </div>
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-700 bg-black shadow-inner">
                        <iframe 
                          className="absolute top-0 left-0 w-full h-full"
                          src="https://www.youtube.com/embed/v4hHQrivf-k?si=A6q9GB-NtmsDuQAu" 
                          title="Tutorial Format PC & Install Windows" 
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>

                    <div className="mt-8 bg-blue-600/10 border border-blue-200 rounded-xl p-4 flex gap-4 items-start z-10 relative">
                       <AlertTriangle size={24} className="text-blue-600 shrink-0 mt-0.5" />
                       <p className="text-sm text-blue-900 font-medium leading-relaxed"><strong>Amaran Penting:</strong> Proses 'Fresh Install' (Format) akan memadam <strong>KESEMUA data</strong> (gambar, dokumen, perisian) di dalam Pemacu C (Local Disk C:). Pastikan anda telah membuat salinan sandaran (Backup) fail-fail penting ke dalam Pendrive atau Hard Disk Luaran lain sebelum memulakan langkah di atas!</p>
                    </div>
                  </div>
                </div>
              )}

              {/* INPUT/OUTPUT CUSTOM INFOGRAPHICS */}
              {activeTopic.id === 'io' && (
                <div className="space-y-8 mt-8">
                  <div className="p-6 lg:p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <div className="text-center mb-8">
                      <span className="inline-block py-1 px-3 rounded-full bg-pink-100 text-pink-700 font-bold text-xs mb-2 tracking-widest uppercase">Luar & Dalam</span>
                      <h4 className="font-bold text-slate-800 text-2xl flex items-center justify-center gap-2">
                        <ArrowRightLeft className="text-pink-500" size={24}/> Klasifikasi Input & Output
                      </h4>
                      <p className="text-slate-500 text-sm mt-2 max-w-2xl mx-auto">Komputer perlu berkomunikasi dengan dunia luar. Terdapat 3 kategori utama untuk membolehkan komunikasi ini berlaku.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 relative shadow-sm hover:border-pink-300 transition-colors">
                        <div className="absolute top-0 right-0 bg-pink-500 text-white font-bold text-xs px-3 py-1 rounded-bl-lg">Memasukkan Data</div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-pink-100 p-2.5 rounded-lg text-pink-600"><Keyboard size={24}/></div>
                          <h5 className="font-black text-lg text-slate-800">Peranti Input</h5>
                        </div>
                        <p className="text-sm text-slate-600 mb-4">Alat untuk pengguna memberi arahan atau memasukkan data ke dalam sistem pengiraan komputer.</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs font-medium border border-slate-200 bg-white px-2 py-1 rounded flex items-center gap-1"><Keyboard size={12}/> Papan Kekunci</span>
                          <span className="text-xs font-medium border border-slate-200 bg-white px-2 py-1 rounded flex items-center gap-1"><Mouse size={12}/> Tetikus</span>
                          <span className="text-xs font-medium border border-slate-200 bg-white px-2 py-1 rounded flex items-center gap-1"><Volume2 size={12}/> Mikrofon</span>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 relative shadow-sm hover:border-teal-300 transition-colors">
                        <div className="absolute top-0 right-0 bg-teal-500 text-white font-bold text-xs px-3 py-1 rounded-bl-lg">Memaparkan Maklumat</div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-teal-100 p-2.5 rounded-lg text-teal-600"><Monitor size={24}/></div>
                          <h5 className="font-black text-lg text-slate-800">Peranti Output</h5>
                        </div>
                        <p className="text-sm text-slate-600 mb-4">Menterjemahkan kod logikal dan data komputer menjadi sesuatu yang boleh difahami oleh pancaindera manusia (visual, audio).</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs font-medium border border-slate-200 bg-white px-2 py-1 rounded flex items-center gap-1"><Monitor size={12}/> Skrin/Monitor</span>
                          <span className="text-xs font-medium border border-slate-200 bg-white px-2 py-1 rounded flex items-center gap-1"><Headphones size={12}/> Headphone</span>
                          <span className="text-xs font-medium border border-slate-200 bg-white px-2 py-1 rounded flex items-center gap-1"><Printer size={12}/> Pencetak</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
              {activeTopic.content.advanced.map((item, idx) => (
                <a 
                  key={idx} 
                  href={`https://www.google.com/search?q=${encodeURIComponent(item.title)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-100 shadow-sm hover:shadow-md hover:border-purple-300 transition-all group block cursor-pointer"
                  title="Klik untuk cari di Google"
                >
                  <div className="flex items-center justify-between mb-3 text-purple-700">
                    <div className="flex items-center">
                      <Zap size={20} className="mr-2" />
                      <h4 className="font-bold text-lg group-hover:underline decoration-2 underline-offset-2">{item.title}</h4>
                    </div>
                    <ExternalLink size={16} className="text-purple-400 group-hover:text-purple-600" />
                  </div>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-800">{item.desc}</p>
                  <p className="text-xs font-bold text-purple-500 mt-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"><Search size={14}/> Carian Lanjut</p>
                </a>
              ))}
            </div>
          )}
        </div>
        <BackButton />
      </div>
    </div>
  );

  const renderQuiz = () => (
    <div className="animate-fade-in">
      {!quizCompleted ? (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 border-b border-gray-100 pb-6 gap-4">
            <div>
              <button onClick={() => { setView('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="mb-4 inline-flex items-center gap-2 text-gray-600 bg-gray-100 hover:bg-blue-100 hover:text-blue-700 px-4 py-2 rounded-xl transition-all text-sm font-bold border border-gray-200">
                <Home size={18} /> Menu Utama
              </button>
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <CheckCircle className="text-green-500" size={32}/> Kuiz Penilaian
              </h2>
            </div>
            <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full font-bold text-sm h-fit">
              {Object.keys(quizAnswers).length} / {quizQuestions.length} Menjawab
            </span>
          </div>
          
          <div className="space-y-8">
            {quizQuestions.map((q, qIndex) => (
              <div key={qIndex} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <p className="font-bold text-lg mb-4 text-gray-800">{qIndex + 1}. {q.question}</p>
                <div className="space-y-3">
                  {q.options.map((opt, oIndex) => (
                    <label key={oIndex} className={`flex items-center p-4 rounded-lg cursor-pointer border-2 transition-all ${quizAnswers[qIndex] === oIndex ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-blue-300'}`}>
                      <input 
                        type="radio" 
                        name={`q-${qIndex}`} 
                        value={oIndex}
                        checked={quizAnswers[qIndex] === oIndex}
                        onChange={() => handleQuizSubmit(qIndex, oIndex)}
                        className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-3 text-gray-700 font-medium">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button 
              onClick={calculateScore}
              disabled={Object.keys(quizAnswers).length < quizQuestions.length}
              className={`px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${Object.keys(quizAnswers).length < quizQuestions.length ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white hover:-translate-y-1'}`}
            >
              Hantar Jawapan
            </button>
            {Object.keys(quizAnswers).length < quizQuestions.length && (
              <p className="text-red-500 text-sm mt-3 font-medium">Sila jawab semua soalan sebelum menghantar.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center border border-gray-100">
          <div className="w-32 h-32 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
            <Award className="text-green-500" size={64} />
          </div>
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Keputusan Kuiz</h2>
          <div className="text-6xl font-black text-blue-600 mb-6">
            {quizScore} <span className="text-2xl text-gray-400">/ {quizQuestions.length}</span>
          </div>
          
          <div className="max-w-lg mx-auto bg-gray-50 p-6 rounded-xl mb-8 border border-gray-200">
            <p className="text-lg text-gray-700 font-medium">
              {quizScore === quizQuestions.length ? 'Luar biasa! Anda menguasai topik ini dengan sempurna.' : 
               quizScore >= quizQuestions.length * 0.7 ? 'Tahniah! Pencapaian yang sangat membanggakan.' :
               quizScore >= quizQuestions.length * 0.5 ? 'Bagus, tetapi masih ada ruang untuk penambahbaikan.' :
               'Sila ulang kaji semula nota-nota yang disediakan.'}
            </p>
          </div>

          <button 
            onClick={() => {
              setQuizAnswers({});
              setQuizCompleted(false);
              setQuizScore(0);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-8 py-3 bg-blue-100 text-blue-700 font-bold rounded-xl hover:bg-blue-200 transition-colors inline-flex items-center gap-2"
          >
            <RotateCcw size={20}/> Cuba Lagi
          </button>
        </div>
      )}
      <BackButton />
    </div>
  );

  const renderInspection = () => (
    <div className="animate-fade-in w-full">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-yellow-500 p-8 text-white relative">
          <button onClick={() => { setView('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="mb-4 inline-flex items-center gap-2 text-white bg-black/10 hover:bg-black/20 px-4 py-2 rounded-xl transition-all text-sm font-bold backdrop-blur-sm border border-white/20">
            <Home size={18} /> Menu Utama
          </button>
          <h2 className="text-3xl font-bold flex items-center gap-3"><AlertTriangle size={36}/> Prosedur Pemeriksaan & Penyelenggaraan</h2>
          <p className="opacity-90 mt-2 text-lg">Langkah keselamatan dan amalan terbaik sebelum, semasa, dan selepas mengendalikan perkakasan.</p>
        </div>
        
        <div className="p-8 space-y-8">
          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
            <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center gap-2"><ShieldCheck size={24}/> Keselamatan Diri (Anti-Statik)</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3"><Check className="text-yellow-600 shrink-0 mt-1"/> <span className="text-gray-700">Sentiasa matikan bekalan kuasa (PSU) dan cabut palam dari soket dinding.</span></li>
              <li className="flex items-start gap-3"><Check className="text-yellow-600 shrink-0 mt-1"/> <span className="text-gray-700">Gunakan gelang tangan anti-statik (ESD Wrist Strap) atau sentuh bahagian besi casing untuk membuang cas statik badan.</span></li>
              <li className="flex items-start gap-3"><Check className="text-yellow-600 shrink-0 mt-1"/> <span className="text-gray-700">Elakkan bekerja di atas permaidani.</span></li>
            </ul>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2"><Search size={24}/> Pemeriksaan Visual (Visual Inspection)</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3"><Check className="text-blue-600 shrink-0 mt-1"/> <span className="text-gray-700">Periksa kapasitor pada motherboard (pastikan tiada yang kembung atau bocor).</span></li>
              <li className="flex items-start gap-3"><Check className="text-blue-600 shrink-0 mt-1"/> <span className="text-gray-700">Periksa kesan terbakar (burn marks) atau bau hangit pada komponen.</span></li>
              <li className="flex items-start gap-3"><Check className="text-blue-600 shrink-0 mt-1"/> <span className="text-gray-700">Pastikan kipas (CPU, GPU, Casing) tidak tersangkut habuk tebal.</span></li>
            </ul>
          </div>

          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2"><Wrench size={24}/> Penyelenggaraan Berkala</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3"><Check className="text-green-600 shrink-0 mt-1"/> <span className="text-gray-700">Bersihkan habuk menggunakan 'Compressed Air' setiap 3-6 bulan.</span></li>
              <li className="flex items-start gap-3"><Check className="text-green-600 shrink-0 mt-1"/> <span className="text-gray-700">Ganti 'Thermal Paste' CPU setiap 1-2 tahun untuk pengaliran haba optimum.</span></li>
              <li className="flex items-start gap-3"><Check className="text-green-600 shrink-0 mt-1"/> <span className="text-gray-700">Kemas kini BIOS dan pemacu peranti (drivers) untuk kestabilan sistem.</span></li>
            </ul>
          </div>
        </div>
      </div>
      <BackButton />
    </div>
  );

  const renderSelectionGuide = () => (
    <div className="animate-fade-in w-full">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-purple-600 p-8 text-white relative">
          <button onClick={() => { setView('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="mb-4 inline-flex items-center gap-2 text-white bg-black/10 hover:bg-black/20 px-4 py-2 rounded-xl transition-all text-sm font-bold backdrop-blur-sm border border-white/20">
            <Home size={18} /> Menu Utama
          </button>
          <h2 className="text-3xl font-bold flex items-center gap-3"><ShoppingCart size={36}/> Panduan Pemilihan & Keserasian</h2>
          <p className="opacity-90 mt-2 text-lg">Bagaimana untuk memilih komponen yang serasi antara satu sama lain.</p>
        </div>
        
        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-gray-100 rounded-xl p-6 hover:border-purple-300 transition-colors">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4"><Cpu size={24}/></div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">CPU & Motherboard</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Ini adalah pasangan paling kritikal. CPU Intel perlukan Motherboard Intel (soket LGA1700 dsb). CPU AMD perlukan Motherboard AMD (soket AM4/AM5). Anda tidak boleh mencampur-adukkannya. Periksa generasi soket sebelum membeli.
              </p>
            </div>

            <div className="border-2 border-gray-100 rounded-xl p-6 hover:border-purple-300 transition-colors">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4"><MemoryStick size={24}/></div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">RAM & Motherboard</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Pastikan sama ada Motherboard anda menyokong DDR4 atau DDR5. Ia tidak "backwards compatible". Kelajuan (MHz) yang dibeli juga tertakluk kepada had maksimum kelajuan yang disokong oleh Motherboard.
              </p>
            </div>

            <div className="border-2 border-gray-100 rounded-xl p-6 hover:border-purple-300 transition-colors">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4"><BatteryCharging size={24}/></div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">PSU & Komponen (Wattage)</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Kira jumlah penggunaan kuasa (TDP) CPU dan Kad Grafik anda. Sentiasa tambah sekurang-kurangnya 20% - 30% kuasa lebihan pada kapasiti PSU (Headroom). Contoh: Jika sistem guna 400W, beli PSU 550W atau 600W.
              </p>
            </div>

            <div className="border-2 border-gray-100 rounded-xl p-6 hover:border-purple-300 transition-colors">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4"><Monitor size={24}/></div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Casing (Form Factor)</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Pastikan casing cukup besar untuk memuatkan saiz Motherboard (ATX, Micro-ATX, Mini-ITX). Juga, ukur panjang maksimum Kad Grafik (GPU Clearance) dan ketinggian Kipas CPU (Cooler Clearance).
              </p>
            </div>
          </div>
        </div>
      </div>
      <BackButton />
    </div>
  );

  const renderAR = () => (
    <div className={`w-full ${isFullscreen ? '' : 'animate-fade-in'}`}>
      <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 ${isFullscreen ? '' : 'overflow-hidden'}`}>
        <div className="bg-blue-500 p-8 text-white flex justify-between items-start">
          <div>
            <button onClick={() => { setView('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="mb-4 inline-flex items-center gap-2 text-white bg-black/10 hover:bg-black/20 px-4 py-2 rounded-xl transition-all text-sm font-bold backdrop-blur-sm border border-white/20">
              <Home size={18} /> Menu Utama
            </button>
            <h2 className="text-3xl font-bold flex items-center gap-3"><Box size={36}/> Model AR & 3D Interaktif</h2>
            <p className="opacity-90 mt-2 text-lg">Teroka komponen dari pelbagai sudut secara maya.</p>
          </div>
          <button 
            onClick={toggleFullScreen}
            className="bg-white/20 hover:bg-white/30 p-3 rounded-xl transition-colors backdrop-blur-sm mt-12 sm:mt-0"
            title={isFullscreen ? "Keluar Skrin Penuh" : "Skrin Penuh"}
          >
            {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
          </button>
        </div>
        
        <div 
          ref={arContainerRef}
          className={`bg-gray-900 transition-all duration-300 ${isFullscreen ? 'fixed inset-0 z-[9999] flex flex-col p-0 sm:p-4' : 'relative h-[600px] p-4'}`}
        >
          {isFullscreen && (
            <div className="absolute top-4 right-4 z-50 flex gap-2">
              <button onClick={toggleFullScreen} className="bg-red-500 text-white px-5 py-3 rounded-full hover:bg-red-600 shadow-lg flex items-center gap-2 font-bold text-sm transition-transform hover:scale-105">
                <Minimize size={20} /> Tutup Paparan
              </button>
            </div>
          )}
          
          <div className={`flex-1 w-full h-full bg-black relative ${isFullscreen ? 'rounded-none sm:rounded-xl' : 'rounded-xl overflow-hidden border border-gray-700'}`}>
            {/* Embed 3D Model from Sketchfab */}
            <iframe 
              title="Asus Z170-P Motherboard" 
              style={{ border: 0 }}
              allowFullScreen={true}
              allow="autoplay; fullscreen; xr-spatial-tracking" 
              src="https://sketchfab.com/models/b998596cfc4945a0bc7b016005c39321/embed?autostart=1&ui_controls=1&ui_infos=1&ui_inspector=1&ui_stop=0&ui_watermark=1&ui_watermark_link=1"
              className="w-full h-full outline-none"
            ></iframe>
            
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-md border border-gray-700/50 flex items-center gap-3 pointer-events-none">
              <div className="flex gap-2">
                <div className="w-auto px-2 h-8 rounded border border-gray-500 flex items-center justify-center text-xs font-bold">Klik & Tarik</div>
                <div className="w-auto px-2 h-8 rounded border border-gray-500 flex items-center justify-center text-xs font-bold">Zum</div>
              </div>
              <div className="text-sm">
                <p className="font-bold">Kawalan Interaktif</p>
                <p className="text-gray-300 text-xs">Pusing dan Zum untuk melihat susun atur komponen.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!isFullscreen && <BackButton />}
    </div>
  );

  // ==========================================
  // RENDERER: MAIN APP (STRUKTUR UTAMA & FOOTER)
  // ==========================================
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
      <div className="max-w-4xl mx-auto py-4 sm:py-8 px-4 sm:px-0 flex-1 w-full">
        {view === 'menu' && renderMenu()}
        {view === 'topic' && renderTopic()}
        {view === 'quiz' && renderQuiz()}
        {view === 'inspection' && renderInspection()}
        {view === 'selection' && renderSelectionGuide()}
        {view === 'recommender' && renderRecommender()}
        {view === 'ar' && renderAR()}
      </div>
      
      {/* --- BAHAGIAN FOOTER HAK CIPTA --- */}
      <footer className="w-full py-6 mt-auto border-t border-gray-200 bg-white text-center shadow-[0_-5px_15px_-10px_rgba(0,0,0,0.1)] z-10">
        <p className="text-gray-500 text-sm font-semibold tracking-wide">
          Copyright &copy; TKR ADTEC SANDAKAN 2026
        </p>
      </footer>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-fade-in { animation: fadeIn 0.5s ease-out; }
        .animate-slide-up { animation: slideUp 0.4s ease-out; }
      `}</style>
    </div>
  );
};
