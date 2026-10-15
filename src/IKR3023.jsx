import React, { useState, useEffect, useRef } from 'react';
import { 
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
  Check, 
  RotateCcw, 
  Search, 
  Sparkles, 
  ArrowUpRight, 
  ShieldCheck, 
  Home,
  Box,
  Maximize,
  Minimize,
  ArrowRightLeft,
  Users,
  GitBranch,
  Gauge,
  Star,
  Crown,
  Layers,
  Wrench,
  Lock,
  Share2,
  Plug,
  Printer,
  Globe,
  Server,
  Link,
  Wind,
  Mouse,
  Keyboard,
  Activity,
  Cable,
  Router,
  Wifi,
  Radio,
  Network,
  ShieldAlert,
  Settings,
  Briefcase,
  Info,
  ThumbsUp,
  ThumbsDown,
  Monitor,
  Building,
  TrendingUp,
  Clock,
  PenTool,
  Scissors,
  ListOrdered,
  PlayCircle,
  CheckSquare
} from 'lucide-react';

// ==========================================
// DATA UTAMA: NOTA IKR3023 (RANGKAIAN)
// ==========================================
const topics = [
  {
    id: 'topologi',
    title: 'Topologi Rangkaian',
    icon: <GitBranch size={40} />,
    color: 'bg-blue-600',
    description: 'Bentuk dan susunan fizikal atau logikal peranti dalam rangkaian.',
    content: {
      basics: [
        {
          title: "Pengenalan Topologi",
          points: [
            "Topologi Rangkaian merujuk kepada cara peranti (komputer, server, pencetak) disusun dan dihubungkan.",
            "Terdapat dua jenis: Topologi Fizikal (susunan fizikal kabel) dan Topologi Logikal (bagaimana data bergerak).",
            "Pemilihan topologi mempengaruhi kebolehpercayaan, kelajuan dan kos pengurusan rangkaian."
          ]
        }
      ],
      advanced: [
        { title: "Topologi Bintang (Star)", desc: "Setiap peranti disambungkan ke peranti pusat seperti switch. Mudah diurus dan lazim digunakan, tetapi kegagalan switch pusat boleh menjejaskan sambungan." },
        { title: "Topologi Mesh", desc: "Topologi full mesh menghubungkan setiap nod kepada nod lain; partial mesh menyediakan sebahagian laluan redundan. Ketahanan rangkaian bergantung pada reka bentuk dan konfigurasi." },
        { title: "Topologi Pokok (Tree)", desc: "Susunan hierarki bercabang yang lazimnya menggabungkan beberapa rangkaian bintang pada peringkat access, distribution dan core." }
      ]
    }
  },
  {
    id: 'struktur',
    title: 'Struktur Pengkabelan',
    icon: <Layers size={40} />,
    color: 'bg-emerald-600',
    description: 'Perancangan dan pengurusan susun atur kabel dalam bangunan.',
    content: {
      basics: [
        {
          title: "Perancangan Asas",
          points: [
            "Pelan Susun Atur (Plan Layout): Reka bentuk penempatan peranti dan laluan kabel untuk memudahkan pengurusan.",
            "Jarak/Panjang Kabel: Bagi saluran Ethernet tembaga berstruktur biasa, had reka bentuk lazim ialah 100 m (90 m permanent link dan jumlah 10 m patch cord); had bergantung pada kategori, aplikasi dan keadaan pemasangan.",
            "Cable Trunking: Struktur paip/saluran (PVC atau Logam) untuk melindungi dan menyusun kabel supaya teratur."
          ]
        }
      ], 
      advanced: [
        { title: "Horizontal Cabling", desc: "Menghubungkan terminal pengguna di tempat kerja (workstation) ke bilik telekomunikasi." },
        { title: "Backbone Cabling", desc: "Tulang belakang rangkaian yang menyambungkan bilik server utama dengan bilik telekomunikasi tingkat lain." },
        { title: "Campus Wide Cabling", desc: "Struktur kabel fiber optik yang menghubungkan rangkaian di antara bangunan-bangunan yang berbeza (skala kampus)." }
      ]
    }
  },
  {
    id: 'kabel',
    title: 'Jenis Kabel Data',
    icon: <Plug size={40} />,
    color: 'bg-purple-600',
    description: 'Media fizikal yang membawa isyarat data digital.',
    content: {
      basics: [
        {
          title: "Kabel Tembaga (Copper)",
          points: [
            "UTP (Unshielded Twisted Pair): Wayar tembaga terpintal tanpa pelindung. Murah dan paling banyak digunakan (Cat5e, Cat6).",
            "STP (Shielded Twisted Pair): Sama seperti UTP tetapi mempunyai kerajang (foil) pelindung dari gangguan elektromagnetik (EMI).",
            "Coaxial: Konduktor pusat dilindungi penebat tebal. Biasa digunakan untuk CCTV dan TV Kabel."
          ]
        }
      ], 
      advanced: [
        { title: "Fiber Optik - Single Mode", desc: "Teras kecil, menggunakan cahaya laser. Direka untuk penghantaran data berkelajuan tinggi jarak jauh (merentas bandar)." },
        { title: "Fiber Optik - Multimode", desc: "Teras lebih besar; Ethernet multimode moden lazimnya menggunakan pemancar laser VCSEL pada 850 nm. Sesuai untuk pautan jarak dekat hingga sederhana, bergantung pada standard optik." },
        { title: "Penyambung Fiber", desc: "Terdapat pelbagai kepala penyambung untuk fiber optik, antaranya LC, SC, FC, dan ST." }
      ]
    }
  },
  {
    id: 'kelajuan',
    title: 'Kelajuan Ethernet',
    icon: <Gauge size={40} />,
    color: 'bg-orange-500',
    description: 'Piawaian kelajuan penghantaran data dalam rangkaian.',
    content: {
      basics: [
        {
          title: "Ethernet Asas",
          points: [
            "10Base-T: Kelajuan maksimum 10 Mbps menggunakan kabel UTP Cat3 (Standard lama).",
            "100Base-TX (Fast Ethernet): Kelajuan 100 Mbps, menggunakan Cat5.",
            "1000Base-T (Gigabit Ethernet): Kelajuan 1 Gbps (1000 Mbps), menggunakan Cat5e atau Cat6. Standard utama hari ini."
          ]
        }
      ], 
      advanced: [
        { title: "10GBase-T (10 Gigabit)", desc: "10GBASE-T menyediakan 10 Gbps sehingga 100 m menggunakan Cat6A yang mematuhi standard; Cat6 mungkin sesuai pada jarak lebih pendek selepas pengujian." },
        { title: "40GBase-T (40 Gigabit)", desc: "40GBASE-T ialah Ethernet 40 Gbps melalui kabel tembaga Cat8 pada saluran sehingga kira-kira 30 m. Untuk jarak lain, pelbagai jenis transceiver gentian optik mempunyai had tersendiri." },
        { title: "Had Jarak (Distance Limit)", desc: "Had jarak Ethernet berbeza mengikut standard dan medium. Banyak saluran twisted-pair ialah 100 m, manakala 25/40GBASE-T pada Cat8 direka untuk jarak sehingga 30 m." }
      ]
    }
  },
  {
    id: 'alatan',
    title: 'Alatan Tangan (Tools)',
    icon: <Wrench size={40} />,
    color: 'bg-amber-500',
    description: 'Peralatan tangan yang wajib ada untuk juruteknik pemasangan.',
    content: {
      basics: [
        {
          title: "Alat Pemotong & Pengupas",
          points: [
            "Cable Stripper: Menanggalkan lapisan luar penebat kabel tanpa memotong wayar halus di dalamnya.",
            "Wire Cutter (Pemotong Wayar): Memotong wayar atau kabel ke saiz yang diinginkan dengan rata dan tepat.",
            "Playar (Pliers): Untuk memegang atau membengkokkan wayar di kawasan sempit."
          ]
        }
      ], 
      advanced: [
        { title: "Crimping Tool", desc: "Alat wajib untuk menyepit dan mengunci penyambung RJ45 dengan kuat pada hujung kabel UTP." },
        { title: "Punch Down Tool", desc: "Alat untuk menekan/menanam wayar ke dalam blok terminal pada Patch Panel atau Modular Jack." },
        { title: "Pita Pengukur & Gerudi", desc: "Untuk mengukur jarak susun atur kabel dan menebuk dinding/siling bagi pemasangan Trunking atau Face Plate." }
      ]
    }
  },
  {
    id: 'peralatan',
    title: 'Peralatan & Pengujian',
    icon: <Server size={40} />,
    color: 'bg-cyan-500',
    description: 'Peralatan infrastruktur besar dan peranti penguji.',
    content: {
      basics: [
        {
          title: "Pengurusan & Keselamatan",
          points: [
            "Tangga (Ladder): Diperlukan untuk pemasangan kabel di atas siling dan kawasan tinggi. Perlu stabil (Lipat/Telescopic).",
            "Peralatan Pelabelan (Label Printer): Untuk mencetak nama/kod port supaya kabel mudah dikesan ketika penyelenggaraan.",
            "Cable tester asas memeriksa kesinambungan, susunan pin (wiremap), litar pintas dan sambungan terbuka; ujian prestasi seperti NEXT/return loss memerlukan alat pensijilan kabel."
          ]
        }
      ], 
      advanced: [
        { title: "Rak Server (Server Rack)", desc: "Kabinet besi bersaiz standard (19 inci, diukur dalam 'U') untuk menyusun Switch, Router, dan Patch Panel dengan teratur." },
        { title: "Patch Panel", desc: "Papan soket berpusat yang menempatkan puluhan pautan kabel dari dinding pengguna sebelum dihubungkan ke Switch." },
        { title: "Patch Cord", desc: "Kabel UTP yang pendek dan sangat fleksibel. Digunakan untuk melompatkan sambungan dari Patch Panel ke Switch." }
      ]
    }
  },
  {
    id: 'bahan',
    title: 'Bahan & Aksesori',
    icon: <Settings size={40} />,
    color: 'bg-rose-500',
    description: 'Bahan-bahan fizikal dan tata cara penyambungan kabel UTP.',
    content: {
      basics: [
        {
          title: "Komponen Dinding & Aksesori",
          points: [
            "Face Plate & Modular Jack: Bingkai penutup plastik di dinding bilik pengguna, di mana PC akan dipalamkan masuk.",
            "Penyambung RJ45: Kepala plastik lutsinar 8-pin yang diketipkan pada hujung kabel UTP.",
            "Trunking & Conduit: Saluran paip (PVC/Besi) untuk menyembunyikan kabel. Cable Tie/Tag pula digunakan untuk mengikat kabel dengan kemas."
          ]
        }
      ], 
      advanced: [
        { title: "Kabel Straight-Through", desc: "Susunan pin sama pada kedua-dua hujung (T568A-A atau T568B-B). Digunakan secara tradisional untuk PC-ke-switch; port Auto-MDI/MDIX moden biasanya menerima kedua-dua jenis." },
        { title: "Kabel Crossover", desc: "Hujung T568A dan T568B menghasilkan susunan crossover klasik, berguna pada peranti lama tanpa Auto-MDI/MDIX; peranti moden sering mengesan jenis sambungan secara automatik." },
        { title: "Standard T568B", desc: "Susunan warna industri: Putih/Oren, Oren, Putih/Hijau, Biru, Putih/Biru, Hijau, Putih/Coklat, Coklat." }
      ]
    }
  },
  {
    id: 'prosedur',
    title: 'Prosedur Penamatan',
    icon: <ListOrdered size={40} />,
    color: 'bg-teal-600',
    description: 'Langkah demi langkah menamatkan kabel UTP ke RJ45, Patch Panel & Modular Jack.',
    content: {
      basics: [
        {
          title: "Asas Penamatan (Termination)",
          points: [
            "Penamatan merujuk kepada proses menyambungkan hujung kabel tembaga kepada penyambung fizikal (connector).",
            "Pematuhan kepada Kod Warna Standard (T568B) adalah sangat kritikal pada fasa ini.",
            "Kesilapan susunan urutan warna akan menyebabkan kegagalan rangkaian (Fail pada Cable Tester)."
          ]
        }
      ], 
      advanced: [
        { title: "Standard Ujian Fluke", desc: "Penamatan yang tidak kemas (jaket terlalu jauh, wayar terdedah) boleh menyebabkan masalah 'Near-End Crosstalk' (NEXT)." },
        { title: "Prosedur 'Untwist' Minimum", desc: "Kekalkan pintalan pasangan wayar sedekat mungkin dengan titik penamatan; bagi latihan Cat5e/Cat6 lazimnya digunakan sasaran kira-kira 13 mm atau kurang, serta ikut keperluan penyambung/piawaian berkaitan." }
      ]
    }
  }
];

// ==========================================
// SOALAN KUIZ (40 ITEM) - DARIPADA FAIL
// ==========================================

const TOPIC_QUIZ_POOLS = {
  topologi: [
    { question: 'Topologi rangkaian merujuk kepada…', options: ['Jenis sistem operasi', 'Susunan fizikal dan logikal peranti dalam rangkaian', 'Tahap kuasa elektrik pada switch', 'Format fail pelayan'], correct: 1 },
    { question: 'Dalam topologi bintang (star), semua peranti biasanya disambungkan kepada…', options: ['Satu switch atau hub pusat', 'Satu kabel backbone tanpa switch', 'Satu printer rangkaian', 'Satu monitor pusat'], correct: 0 },
    { question: 'Antara berikut, topologi manakah paling tahan terhadap kegagalan satu laluan?', options: ['Bus', 'Mesh', 'Ring lama', 'Point-to-point sahaja'], correct: 1 },
    { question: 'Topologi fizikal menerangkan…', options: ['Aliran logik data sahaja', 'Susunan sebenar kabel dan peranti', 'Tahap keselamatan pengguna', 'Saiz bilik server'], correct: 1 },
    { question: 'Topologi pokok (tree) sesuai untuk…', options: ['Susunan hierarki yang besar', 'Sambungan satu PC ke satu printer sahaja', 'Semua kabel tanpa switch', 'Rangkaian tanpa sebarang struktur'], correct: 0 },
    { question: 'Pemilihan topologi yang sesuai mempengaruhi…', options: ['Kelajuan, kebolehpercayaan dan kos', 'Warna kabel', 'Jenis font pada label', 'Saiz monitor pengguna'], correct: 0 }
  ],
  struktur: [
    { question: 'Had lazim saluran Ethernet tembaga berstruktur ialah…', options: ['30 meter', '50 meter', '100 meter', '150 meter'], correct: 2 },
    { question: 'Horizontal cabling biasanya menghubungkan…', options: ['Bangunan ke bangunan lain sahaja', 'Workstation ke bilik telekomunikasi', 'CPU ke monitor', 'Patch panel ke PSU'], correct: 1 },
    { question: 'Backbone cabling berfungsi sebagai…', options: ['Kabel tetikus', 'Tulang belakang yang menghubungkan bilik telekomunikasi atau tingkat', 'Penyambung speaker', 'Kabel telefon rumah'], correct: 1 },
    { question: 'Campus wide cabling lazimnya menggunakan…', options: ['Fiber optik antara bangunan', 'Kabel VGA', 'USB Type‑C', 'Kabel kuasa AC'], correct: 0 },
    { question: 'Apakah tujuan trunking atau conduit?', options: ['Meningkatkan kelajuan internet secara ajaib', 'Melindungi dan mengurus kabel', 'Menggantikan switch', 'Menambah bilangan port'], correct: 1 },
    { question: 'Pelan susun atur penting untuk…', options: ['Memudahkan laluan kabel dan penempatan peranti', 'Mengubah jenis RAM', 'Menukar OS pengguna', 'Mencantikkan wallpaper desktop'], correct: 0 }
  ],
  kabel: [
    { question: 'UTP ialah singkatan bagi…', options: ['Unshielded Twisted Pair', 'Universal Terminal Port', 'Ultra Transfer Protocol', 'Unified Twisted Plug'], correct: 0 },
    { question: 'STP berbeza daripada UTP kerana…', options: ['Mempunyai perlindungan tambahan terhadap EMI', 'Menggunakan cahaya laser', 'Tiada wayar tembaga', 'Hanya untuk audio'], correct: 0 },
    { question: 'Kabel coaxial biasa digunakan untuk…', options: ['CCTV dan TV kabel', 'RAM komputer', 'Kipas casing', 'Pengecas laptop'], correct: 0 },
    { question: 'Single mode fiber sesuai untuk…', options: ['Jarak jauh berkelajuan tinggi', 'Sambungan keyboard', 'Pemasangan dalam motherboard', 'Audio speaker'], correct: 0 },
    { question: 'Multimode fiber lazimnya sesuai untuk…', options: ['Jarak dekat hingga sederhana dalam bangunan', 'Semua sambungan kuasa', 'Sistem penyejukan air', 'Port USB'], correct: 0 },
    { question: 'Antara berikut, manakah contoh penyambung fiber?', options: ['LC dan SC', 'RJ45 dan RJ11 sahaja', 'ATX dan PCIe', 'HDMI dan DisplayPort'], correct: 0 }
  ],
  kelajuan: [
    { question: '1000Base‑T merujuk kepada kelajuan…', options: ['100 Mbps', '1 Gbps', '10 Gbps', '40 Gbps'], correct: 1 },
    { question: '10GBase‑T pada jarak penuh 100 m biasanya memerlukan…', options: ['Cat3', 'Cat5', 'Cat6A', 'Kabel telefon'], correct: 2 },
    { question: '40GBase‑T pada kabel tembaga berkait dengan…', options: ['Cat8 sehingga sekitar 30 m', 'Cat3 sehingga 100 m', 'Coaxial tanpa had', 'Patch cord 2 m sahaja'], correct: 0 },
    { question: '10Base‑T ialah standard Ethernet…', options: ['10 Mbps', '100 Mbps', '1 Gbps', '10 Gbps'], correct: 0 },
    { question: 'Had jarak banyak saluran twisted‑pair berstruktur ialah…', options: ['10 m', '25 m', '100 m', '500 m'], correct: 2 },
    { question: 'Pemilihan kategori kabel dan standard Ethernet penting kerana…', options: ['Menentukan prestasi dan jarak operasi', 'Menukar bentuk topologi secara automatik', 'Menambahkan kuasa PSU', 'Menukar keyboard kepada wireless'], correct: 0 }
  ],
  alatan: [
    { question: 'Crimping tool digunakan untuk…', options: ['Mengunci penyambung RJ45 pada kabel', 'Mengukur panjang bilik', 'Menguji voltan PSU', 'Mencuci kabel'], correct: 0 },
    { question: 'Cable stripper berfungsi untuk…', options: ['Menanggalkan penebat luar kabel', 'Memotong trunking besi besar', 'Menyusun patch panel', 'Menghidupkan switch'], correct: 0 },
    { question: 'Punch down tool digunakan pada…', options: ['Patch panel atau modular jack', 'Monitor LED', 'Power supply unit', 'Printer inkjet'], correct: 0 },
    { question: 'Playar (pliers) membantu…', options: ['Memegang atau membengkok wayar', 'Menjana alamat IP', 'Mencetak label automatik', 'Menambah kelajuan Ethernet'], correct: 0 },
    { question: 'Pita pengukur penting untuk…', options: ['Mengukur jarak pemasangan dan laluan kabel', 'Menguji bandwidth internet', 'Menyejukkan switch', 'Menukar standard T568B'], correct: 0 },
    { question: 'Gerudi diperlukan apabila…', options: ['Perlu menebuk laluan pemasangan trunking/face plate', 'Perlu menguji cable tester', 'Perlu menyusun IP address', 'Perlu menukar wallpaper server'], correct: 0 }
  ],
  peralatan: [
    { question: 'Cable tester asas boleh membantu menyemak…', options: ['Wiremap dan kesinambungan sambungan', 'Kelajuan pemproses CPU', 'Suhu monitor', 'Versi Windows'], correct: 0 },
    { question: 'Server rack digunakan untuk…', options: ['Menyusun peralatan aktif seperti switch dan patch panel', 'Menyimpan nota pelajar', 'Mengecas telefon', 'Menggantikan trunking'], correct: 0 },
    { question: 'Patch panel bertindak sebagai…', options: ['Titik pengurusan dan penamatan kabel berpusat', 'Bekalan kuasa utama', 'Jenis topologi baharu', 'Pengesan virus'], correct: 0 },
    { question: 'Patch cord biasanya…', options: ['Pendek dan fleksibel untuk sambungan antara peralatan', 'Kabel fiber bawah laut', 'Kabel kuasa server', 'Wayar bumi'], correct: 0 },
    { question: 'Label printer membantu…', options: ['Melabel kabel dan port secara jelas', 'Menaik taraf switch ke 10G', 'Menukar OS router', 'Memotong kabel'], correct: 0 },
    { question: 'Tangga yang stabil diperlukan apabila…', options: ['Bekerja di kawasan siling atau tempat tinggi', 'Menukar alamat IP', 'Menguji RAM', 'Mencetak dokumen'], correct: 0 }
  ],
  bahan: [
    { question: 'Standard kod warna yang biasa digunakan dalam latihan penamatan UTP ialah…', options: ['T568B', 'NTFS', 'ATX', 'PCIe'], correct: 0 },
    { question: 'Face plate berfungsi untuk…', options: ['Menempatkan outlet data pada dinding secara kemas', 'Membekalkan kuasa kepada switch', 'Menggantikan patch panel', 'Mengawal haba server'], correct: 0 },
    { question: 'Modular jack biasanya dipasang pada…', options: ['Face plate atau patch panel', 'Heatsink CPU', 'Monitor stand', 'PSU casing'], correct: 0 },
    { question: 'Cable tie digunakan untuk…', options: ['Mengikat dan menyusun kabel', 'Menambah bandwidth internet', 'Menghasilkan alamat MAC', 'Menggantikan label'], correct: 0 },
    { question: 'RJ45 ialah…', options: ['Penyambung untuk kabel rangkaian tembaga', 'Jenis kipas server', 'Sistem fail Linux', 'Monitor rangkaian'], correct: 0 },
    { question: 'Pemilihan bahan dan aksesori yang betul membantu…', options: ['Menghasilkan pemasangan lebih kemas dan selamat', 'Menukar topologi secara automatik', 'Meningkatkan saiz storan SSD', 'Menggantikan switch rosak'], correct: 0 }
  ],
  termination: [
    { question: 'Penamatan kabel merujuk kepada…', options: ['Proses menyambungkan hujung kabel kepada penyambung atau terminal', 'Menamatkan penggunaan internet di bangunan', 'Mencabut semua kabel lama', 'Menyusun peranti atas meja'], correct: 0 },
    { question: 'Kesilapan susunan warna semasa penamatan boleh menyebabkan…', options: ['Kegagalan pada cable tester', 'RAM menjadi perlahan', 'Switch bertukar jenama', 'CPU overclock sendiri'], correct: 0 },
    { question: 'Mengapa pintalan pasangan wayar perlu dikekalkan sedekat mungkin ke titik penamatan?', options: ['Untuk membantu prestasi dan mengurangkan gangguan', 'Untuk memanjangkan warna kabel', 'Untuk menambah port pada switch', 'Untuk menjadikan patch panel lebih berat'], correct: 0 },
    { question: 'Straight‑through tradisional biasanya menggunakan…', options: ['Susunan yang sama pada kedua-dua hujung', 'T568A satu hujung dan T568B satu hujung', 'Fiber di satu hujung sahaja', 'Empat wayar sahaja'], correct: 0 },
    { question: 'Crossover tradisional menggunakan…', options: ['Susunan berbeza antara dua hujung', 'RJ11 pada satu hujung', 'Satu hujung tanpa penyambung', 'Patch cord fiber'], correct: 0 },
    { question: 'Selepas selesai penamatan, langkah terakhir yang wajib ialah…', options: ['Menguji kabel', 'Mengecat kabel', 'Menukar topologi', 'Mematikan semua switch'], correct: 0 }
  ]
};

const LEARNING_MAP = [
  {
    kp: 'KP(1/4)',
    title: 'Pengenalan Kepada Rangkaian',
    desc: 'Fokus kepada topologi, jenis kabel dan kelajuan Ethernet.',
    outcomes: ['Bezakan topologi fizikal dan logikal.', 'Kenal pasti kabel tembaga dan fiber.', 'Padankan standard Ethernet dengan jarak dan kategori kabel.'],
    linkedTopics: ['topologi', 'struktur', 'kabel', 'kelajuan']
  },
  {
    kp: 'KP(2/4)',
    title: 'Set Up Network Cabling TEM',
    desc: 'Penyediaan alatan, peralatan, bahan dan keselamatan kerja.',
    outcomes: ['Pilih alatan tangan yang betul.', 'Kenal pasti peralatan pemasangan dan pengujian.', 'Sediakan bahan dan aksesori secara sistematik.'],
    linkedTopics: ['alatan', 'peralatan', 'bahan']
  },
  {
    kp: 'KP(3/4)',
    title: 'Carry Out Network Cabling Installation Works',
    desc: 'Pelaksanaan pemasangan dan penamatan kabel secara amali.',
    outcomes: ['Laksanakan penamatan mengikut standard.', 'Gunakan alatan dengan teknik yang betul.', 'Pastikan kerja pemasangan kemas dan selamat.'],
    linkedTopics: ['termination', 'alatan', 'bahan']
  },
  {
    kp: 'KP(4/4)',
    title: 'Pengesahan, Dokumentasi & Penambahbaikan',
    desc: 'Penutup aliran kerja melalui pengujian, pelabelan dan semakan pemasangan.',
    outcomes: ['Uji sambungan menggunakan peralatan yang sesuai.', 'Label dan dokumentasikan laluan serta port.', 'Buat semakan akhir untuk penyelenggaraan masa hadapan.'],
    linkedTopics: ['peralatan', 'termination', 'struktur']
  }
];

const STORAGE_KEY = 'ikr3023_unlock_flow_v3';
const PASS_MARK = 3;
const FINAL_ASSESSMENT_URL = 'https://cablelabx.netlify.app/';
const PDF_URL = 'https://drive.google.com/drive/folders/190H5Gnsui3COMH6NUOMYFcUEH0eFY5x1?usp=drive_link';

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

export default function ModuleIKR3023({ onBackToPortal }) {
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

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [view, activeTopicIndex, activeTab, quizSession?.current]);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }, [progress]);

  const isUnlocked = (index) => index <= progress.unlockedTopicIndex || Boolean(progress.passed[topics[index].id]);

  const openTopic = (index) => {
    if (!isUnlocked(index)) return;
    setActiveTopicIndex(index);
    setActiveTab('basic');
    setView('topic');
  };

  const startTopicQuiz = () => {
    const topic = topics[activeTopicIndex];
    setQuizSession({ topicIndex: activeTopicIndex, topicId: topic.id, questions: createQuizSet(topic.id), current: 0, answers: {}, completed: false, score: 0, passed: false });
    setView('topicQuiz');
  };

  const chooseAnswer = (optionIndex) => {
    if (!quizSession || quizSession.completed) return;
    if (quizSession.answers[quizSession.current] !== undefined) return;
    setQuizSession((prev) => ({ ...prev, answers: { ...prev.answers, [prev.current]: optionIndex } }));
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
    if (!window.confirm('Reset semua kemajuan modul IKR3023?')) return;
    const fresh = { unlockedTopicIndex: 0, passed: {} };
    setProgress(fresh);
    setQuizSession(null);
    localStorage.removeItem(STORAGE_KEY);
    setView('menu');
  };

  const BackToMenu = () => (
    <button onClick={() => setView('menu')} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-md transition hover:-translate-y-0.5 hover:text-blue-700">
      <ArrowLeft size={16} /> Kembali ke Menu Modul
    </button>
  );

  const renderMenu = () => (
    <div className="space-y-6 animate-fade-in pb-10">
      <header className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-950 via-indigo-900 to-sky-700 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-4 top-6"><Cable size={120} /></div>
          <div className="absolute left-6 bottom-4"><Network size={90} /></div>
        </div>
        <div className="relative z-10">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <button onClick={onBackToPortal} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur hover:bg-white/20"><Home size={16} /> Portal Utama</button>
            <a href={PDF_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-indigo-900 transition hover:scale-105 hover:bg-blue-50"><Download size={16} /> Nota PDF</a>
          </div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em]"><Sparkles size={14} /> Guided Unlock Learning</p>
          <h1 className="mt-4 text-3xl font-black md:text-4xl">IKR3023 • Network Structured Cabling</h1>
          <p className="mt-3 max-w-3xl text-sm text-blue-50 md:text-base">Selepas selesai membaca setiap kad, pelajar perlu menjawab kuiz interaktif 5 soalan untuk membuka topik rangkaian yang seterusnya.</p>
        </div>
      </header>

      <section className="overflow-hidden rounded-[24px] border border-blue-100 bg-white shadow-lg">
        <div className="flex flex-col gap-4 p-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Prestasi Pembelajaran</p>
            <h2 className="mt-1 text-2xl font-black text-slate-900">{progressPercentage}% selesai</h2>
            <p className="mt-2 text-sm text-slate-500">{allTopicsPassed ? 'Semua kad telah dilengkapkan. Penilaian modul kini menggunakan CableLabX.' : `Topik seterusnya untuk dibuka: ${topics[Math.min(progress.unlockedTopicIndex, topics.length - 1)].title}`}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-5 py-4 text-sm shadow-inner">
            <div className="font-bold text-slate-700">Status Kuiz Topik</div>
            <div className="mt-1 text-3xl font-black text-blue-600">{passedCount} / {topics.length}</div>
            <div className="text-slate-500">topik lulus</div>
          </div>
        </div>
        <div className="px-6 pb-6">
          <div className="h-4 overflow-hidden rounded-full bg-slate-100 shadow-inner"><div className="relative h-4 rounded-full bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-400 transition-all duration-700" style={{ width: `${progressPercentage}%` }}>{progressPercentage < 100 && <div className="absolute inset-0 animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />}</div></div>
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
            <button key={topic.id} onClick={() => openTopic(index)} disabled={locked} className={`group relative overflow-hidden rounded-[24px] border bg-white p-5 text-left shadow-md transition duration-300 ${locked ? 'cursor-not-allowed opacity-60' : 'hover:-translate-y-1.5 hover:shadow-xl'}`}>
              <div className={`absolute right-4 top-4 rounded-full border px-3 py-1 text-[11px] font-bold ${statusBadgeMap[state]}`}>{passed ? 'Lulus Kuiz' : locked ? 'Terkunci' : 'Sedia Dibaca'}</div>
              <div className={`mb-4 inline-flex rounded-2xl p-4 text-white shadow-lg ${locked ? 'bg-slate-300' : topic.color}`}>{locked ? <Lock size={34} /> : topic.icon}</div>
              <h3 className="pr-10 text-lg font-black text-slate-800">{topic.title}</h3>
              <p className="mt-2 min-h-[48px] text-sm text-slate-500">{locked ? 'Lulus kuiz topik sebelumnya untuk membuka kad ini.' : topic.description}</p>
              <div className="mt-4 flex items-center justify-between text-xs font-semibold text-slate-400"><span>Kad {index + 1}</span>{!locked && <ChevronRight size={16} className="transition group-hover:translate-x-1" />}</div>
            </button>
          );
        })}
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <button onClick={() => setView('map')} className="group rounded-[24px] border border-slate-200 bg-white p-6 text-left shadow-md transition hover:-translate-y-1 hover:shadow-xl">
          <div className="mb-3 inline-flex rounded-2xl bg-violet-100 p-3 text-violet-600"><GitBranch size={26} /></div>
          <h3 className="text-lg font-black text-slate-800">Peta Kertas Penerangan</h3>
          <p className="mt-2 text-sm text-slate-500">Peta interaktif moden bagi 4 KP rasmi IKR3023 dengan outcome dan kaitan setiap kad.</p>
          <div className="mt-4 text-xs font-bold text-violet-600 group-hover:translate-x-1 transition">Buka peta interaktif →</div>
        </button>

        <a href={FINAL_ASSESSMENT_URL} target="_blank" rel="noopener noreferrer" className="group rounded-[24px] border border-slate-200 bg-white p-6 text-left shadow-md transition hover:-translate-y-1 hover:shadow-xl">
          <div className="mb-3 inline-flex rounded-2xl bg-emerald-100 p-3 text-emerald-600"><ExternalLink size={26} /></div>
          <h3 className="text-lg font-black text-slate-800">Penilaian Modul (CableLabX)</h3>
          <p className="mt-2 text-sm text-slate-500">Kuiz penilaian modul IKR3023 telah digantikan dengan pautan luar CableLabX.</p>
          <div className="mt-4 text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition">Buka penilaian luar →</div>
        </a>

        <div className="rounded-[24px] border border-slate-200 bg-white p-6 text-left shadow-md">
          <div className="mb-3 inline-flex rounded-2xl bg-amber-100 p-3 text-amber-600"><ShieldCheck size={26} /></div>
          <h3 className="text-lg font-black text-slate-800">Info Unlock</h3>
          <ul className="mt-2 space-y-2 text-sm text-slate-500">
            <li>• Simulasi Diagnostik Kabel telah dibuang daripada modul.</li>
            <li>• 5 soalan rawak digunakan pada setiap topik.</li>
            <li>• Minimum <strong>3/5</strong> untuk membuka kad seterusnya.</li>
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
            <div className="mb-4 flex flex-wrap items-center gap-3"><BackToMenu /><span className="rounded-full border border-white/25 bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em]">Kad {activeTopicIndex + 1}</span></div>
            <div className="absolute right-8 top-8 hidden opacity-20 md:block">{activeTopic.icon}</div>
            <h2 className="text-3xl font-black">{activeTopic.title}</h2>
            <p className="mt-2 max-w-3xl text-white/90">{activeTopic.description}</p>
          </div>
          <div className="border-b border-slate-100 px-4 pt-4"><div className="flex flex-wrap gap-2">{[['basic','Asas'],['advanced','Pengayaan']].map(([key,label]) => (<button key={key} onClick={() => setActiveTab(key)} className={`rounded-t-2xl px-5 py-3 text-sm font-bold transition ${activeTab === key ? 'bg-blue-50 text-blue-700 shadow-inner' : 'text-slate-500 hover:text-slate-800'}`}>{label}</button>))}</div></div>
          <div className="space-y-4 p-6 md:p-8">
            {activeTab === 'basic' && (activeTopic.content.basics?.length ? activeTopic.content.basics : [{ title: 'Ringkasan Asas', points: [activeTopic.description] }]).map((section, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-100 bg-slate-50 p-5 shadow-sm">
                <h3 className="text-lg font-black text-slate-800">{section.title}</h3>
                <ul className="mt-3 space-y-3">{section.points.map((point, pointIndex) => (<li key={pointIndex} className="flex items-start gap-3 text-sm leading-relaxed text-slate-600"><CheckCircle size={18} className="mt-0.5 shrink-0 text-emerald-500" /><span>{point}</span></li>))}</ul>
              </div>
            ))}
            {activeTab === 'advanced' && activeTopic.content.advanced.map((item, idx) => (<div key={idx} className="rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><h3 className="text-lg font-black text-slate-800">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p></div>))}
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-lg">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Checkpoint Unlock</p>
              <h3 className="mt-1 text-2xl font-black text-slate-900">Kuiz Interaktif 5 Soalan</h3>
              <p className="mt-2 text-sm text-slate-500">Lengkapkan kuiz topik ini untuk membuka kad seterusnya. Soalan dijana secara rawak daripada bank soalan topik.</p>
            </div>
            <div className="rounded-2xl bg-slate-50 px-5 py-4 text-sm shadow-inner"><div className="font-bold text-slate-700">Syarat Unlock</div><div className="mt-1 text-3xl font-black text-blue-600">{PASS_MARK}/5</div><div className="text-slate-500">markah minimum</div></div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {alreadyPassed ? (<><div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700"><CheckCircle size={18} /> Kuiz topik ini telah lulus.</div>{hasNext && <button onClick={() => openTopic(activeTopicIndex + 1)} className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-700">Buka Kad Seterusnya <ChevronRight size={16} /></button>}</>) : (<button onClick={startTopicQuiz} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-cyan-200"><PlayCircle size={18} /> Jawab Kuiz & Unlock</button>)}
            <button onClick={() => setView('map')} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-violet-200 hover:text-violet-700"><GitBranch size={18} /> Rujuk Peta KP</button>
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
            <div className={`mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full ${quizSession.passed ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>{quizSession.passed ? <Award size={36} /> : <RotateCcw size={36} />}</div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Keputusan Kuiz Topik</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900">{topic.title}</h2>
            <div className="mt-5 text-6xl font-black text-slate-900">{quizSession.score}<span className="text-2xl text-slate-400">/5</span></div>
            <p className={`mt-3 text-base font-bold ${quizSession.passed ? 'text-emerald-600' : 'text-rose-600'}`}>{quizSession.passed ? 'Tahniah! Topik seterusnya telah dibuka.' : 'Belum melepasi syarat unlock. Cuba lagi untuk buka kad seterusnya.'}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button onClick={startTopicQuiz} className="rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800">Ulang Kuiz Topik</button>
              <button onClick={() => setView('topic')} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-700">Kembali ke Nota</button>
              {quizSession.passed && quizSession.topicIndex < topics.length - 1 && (<button onClick={() => openTopic(quizSession.topicIndex + 1)} className="rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700">Buka Kad Seterusnya</button>)}
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
          <div className="flex flex-wrap items-center justify-between gap-3"><button onClick={() => setView('topic')} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur hover:bg-white/20"><ArrowLeft size={16} /> Kembali ke Nota</button><span className="rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em]">Kuiz Unlock</span></div>
          <h2 className="mt-5 text-3xl font-black">{topic.title}</h2>
          <p className="mt-2 text-sm text-blue-50">5 soalan dipilih secara rawak. Pelajar lain boleh menerima set soalan yang berbeza.</p>
          <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/15"><div className="h-3 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300 transition-all" style={{ width: `${((quizSession.current + 1) / quizSession.questions.length) * 100}%` }} /></div>
          <div className="mt-2 flex items-center justify-between text-xs font-semibold text-white/75"><span>Soalan {quizSession.current + 1} / {quizSession.questions.length}</span><span>Syarat lulus: {PASS_MARK}/5</span></div>
        </div>
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl md:p-8">
          <div className="rounded-2xl bg-slate-50 p-5 shadow-inner"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Soalan Semasa</p><h3 className="mt-2 text-2xl font-black leading-snug text-slate-900">{currentQuestion.question}</h3></div>
          <div className="mt-6 grid gap-4">{currentQuestion.options.map((option, optionIndex) => { const selected = selectedAnswer === optionIndex; return (<button key={optionIndex} onClick={() => chooseAnswer(optionIndex)} className={`group rounded-2xl border-2 px-5 py-4 text-left text-sm font-semibold transition duration-200 ${selected ? 'border-blue-500 bg-blue-50 text-blue-900 shadow-md' : 'border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-slate-50 hover:-translate-y-0.5'}`}><div className="flex items-start gap-4"><div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black ${selected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-700'}`}>{String.fromCharCode(65 + optionIndex)}</div><span className="leading-relaxed">{option}</span></div></button>); })}</div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-6"><div className="text-sm text-slate-500">Pilih satu jawapan untuk meneruskan ke soalan seterusnya.</div><button disabled={selectedAnswer === undefined} onClick={goNextQuestion} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-lg transition ${selectedAnswer === undefined ? 'cursor-not-allowed bg-slate-200 text-slate-400' : 'bg-blue-600 text-white hover:-translate-y-0.5 hover:bg-blue-700'}`}>{quizSession.current === quizSession.questions.length - 1 ? 'Hantar Kuiz' : 'Soalan Seterusnya'} <ChevronRight size={16} /></button></div>
        </div>
      </div>
    );
  };

  const renderMap = () => (
    <div className="space-y-5 animate-fade-in">
      <div className="overflow-hidden rounded-[28px] bg-gradient-to-r from-violet-700 via-fuchsia-700 to-indigo-800 p-8 text-white shadow-2xl">
        <BackToMenu />
        <h2 className="mt-5 text-3xl font-black">Peta Kertas Penerangan • IKR3023</h2>
        <p className="mt-2 max-w-3xl text-sm text-violet-50">Peta interaktif moden yang memetakan 4 KP rasmi kepada outcome pembelajaran dan kad topik. Klik setiap laluan untuk melihat fokus kandungan modul.</p>
      </div>
      <div className="grid gap-4">{LEARNING_MAP.map((item, index) => { const open = mapOpenIndex === index; return (<div key={item.kp} className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-lg"><button onClick={() => setMapOpenIndex(open ? -1 : index)} className="flex w-full items-start justify-between gap-4 p-6 text-left transition hover:bg-slate-50"><div><div className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">{item.kp}</div><h3 className="mt-1 text-2xl font-black text-slate-900">{item.title}</h3><p className="mt-2 text-sm text-slate-500">{item.desc}</p></div><div className={`mt-2 rounded-full p-2 transition ${open ? 'rotate-90 bg-violet-100 text-violet-700' : 'bg-slate-100 text-slate-500'}`}><ChevronRight size={18} /></div></button>{open && (<div className="border-t border-slate-100 px-6 pb-6 pt-5"><div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]"><div><h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Outcome Pembelajaran</h4><ul className="mt-3 space-y-3">{item.outcomes.map((outcome, idx) => (<li key={idx} className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600"><CheckCircle size={18} className="mt-0.5 shrink-0 text-emerald-500" /><span>{outcome}</span></li>))}</ul></div><div><h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Topik Berkaitan</h4><div className="mt-3 flex flex-wrap gap-3">{item.linkedTopics.map((topicId) => { const topicIndex = topics.findIndex((topic) => topic.id === topicId); const topic = topics[topicIndex]; const canOpen = isUnlocked(topicIndex); const passed = Boolean(progress.passed[topic.id]); return (<button key={topicId} onClick={() => canOpen && openTopic(topicIndex)} className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${canOpen ? 'border-violet-200 bg-violet-50 text-violet-800 hover:-translate-y-0.5 hover:shadow-sm' : 'cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400'} `}><div>{topic.title}</div><div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.15em]">{passed ? 'Kuiz Lulus' : canOpen ? 'Boleh Dibuka' : 'Terkunci'}</div></button>); })}</div></div></div></div>)}</div>); })}</div>
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
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(10px);} to { opacity: 1; transform: translateY(0);} } @keyframes shimmer { 0% { transform: translateX(-100%);} 100% { transform: translateX(100%);} } .animate-fade-in { animation: fadeIn .45s ease-out; }`}</style>
    </div>
  );
}
