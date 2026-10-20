import IKR3023SafetyVisual from './IKR3023SafetyVisual';
import OfflineEmbed from './OfflineEmbed';
import { EnglishStudyGuide } from './EnglishGuides';
import { useLanguage } from './LanguageContext';
import { translateVisibleText } from './translations.js';
import StudyChatbot from './StudyChatbot';
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
  CheckSquare,
  Eye,
  MonitorSpeaker,
} from 'lucide-react';
import TopicUnlockQuiz, { UNLOCK_PASS_MARK, getStudentNumber } from './TopicUnlockQuiz';

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
const rawQuizQuestions = [
  { question: "Apakah jenis topologi rangkaian yang menggunakan satu kabel pusat (backbone) untuk menghubungkan semua peranti?", options: ["Topologi Mesh", "Topologi Bas (Bus)", "Topologi Cincin (Ring)", "Topologi Bintang (Star)"], correct: 1 },
  { question: "Berapakah had jarak maksimum bagi kabel Ethernet Cat5e mengikut standard sebelum memerlukan penguat isyarat?", options: ["50m (meter)", "90m (meter)", "100m (meter)", "150m (meter)"], correct: 2 },
  { question: "Sebuah organisasi memerlukan rangkaian yang tidak terjejas oleh gangguan elektromagnetik (EMI) untuk komunikasi jarak jauh antara dua bangunan. Manakah medium penghantaran yang paling tepat untuk digunakan?", options: ["Kabel Coaxial RG-6", "Kabel Fiber Optik (Single Mode)", "Kabel Shielded Twisted Pair (STP)", "Kabel Unshielded Twisted Pair (UTP)"], correct: 1 },
  { question: "Sebuah institusi perbankan antarabangsa memerlukan reka bentuk infrastruktur rangkaian yang mampu menjamin keselamatan perkhidmatan secara berterusan tanpa sebarang gangguan ( zero downtime ). Sebagai juruteknik yang profesional, apakah pertimbangan profesional yang paling tepat bagi memastikan kelangsungan operasi bank tersebut terpelihara walaupun berlaku kerosakan fizikal pada salah satu laluan kabel utama?", options: ["Menggunakan topologi Bas kerana kerosakan pada satu segmen kabel tidak akan melumpuhkan rangkaian secara keseluruhan.", "Memilih topologi Bintang supaya keselamatan infrastruktur rangkaian hanya tertumpu kepada kawalan hab pusat yang lebih mudah dipantau.", "Mengamalkan topologi Cincin untuk memastikan setiap peranti mempunyai peluang yang sama dalam menghantar data secara berurutan dan teratur.", "Mengimplementasikan topologi Mesh bagi mewujudkan laluan redundan (redundancy) yang menjamin keselamatan operasi daripada kegagalan titik tunggal (single point of failure)."], correct: 3 },
  { question: "Apakah alat yang digunakan untuk menanggalkan lapisan luar penebat kabel tanpa merosakkan konduktor dalaman?", options: ["Wire Cutter", "Crimping Tool", "Cable Stripper", "Punch Down Tool"], correct: 2 },
  { question: "Apakah alat yang digunakan untuk mengunci penyambung RJ45 pada hujung kabel Unshielded Twisted Pair (UTP) supaya sambungan menjadi stabil?", options: ["Cable Tester", "Crimping Tool", "Punch Down Tool", "Playar muncung tirus"], correct: 1 },
  { question: "Apakah fungsi utama Punch Down Tool dalam kerja-kerja penamatan ( termination )?", options: ["Melabel kabel secara automatik.", "Mengukur panjang kabel rangkaian.", "Menekan wayar ke dalam blok sambungan patch panel.", "Memotong kabel Unshielded Twisted Pair (UTP) mengikut saiz."], correct: 2 },
  { question: "Apakah peralatan yang paling selamat digunakan untuk melakukan pemasangan kabel di kawasan siling yang tinggi?", options: ["Kerusi makmal", "Meja komputer", "Tangga Telescopic", "Rak pelayan (Server Rack)"], correct: 2 },
  { question: "Apakah alat yang digunakan untuk menguji kefungsian dan memastikan tiada masalah litar pintas pada kabel yang telah ditamatkan ( termination cable )?", options: ["Multimeter", "Cable Tester", "Tone Generator", "Network Analyzer"], correct: 1 },
  { question: "Antara yang berikut, manakah yang benar mengenai komponen pengkabelan dan fungsinya?\n\nI. Face Plate: Melindungi soket data daripada debu dan memberikan penampilan yang kemas pada dinding.\nII. Modular Jack: Struktur simpanan pusat yang digunakan untuk mengatur peralatan rangkaian aktif seperti suis.\nIII. Cable Tie: Jalur nilon yang digunakan untuk mengikat dan menyusun sekumpulan kabel supaya tidak berselerak.\nIV. Patch Panel: Bertindak sebagai titik tengah yang memudahkan sambungan kabel dari pelbagai sumber kepada peralatan rangkaian.", options: ["I, II, dan III", "I, II, dan IV", "I, III, dan IV", "II, III, dan IV"], correct: 2 },
  { question: "Apakah perbezaan utama penggunaan antara kabel straight-through dan crossover dalam sistem rangkaian tradisional?", options: ["Kabel crossover digunakan untuk menyambungkan peranti yang berlainan jenis seperti komputer ke switch.", "Kabel straight-through digunakan untuk menyambungkan peranti berbeza jenis seperti switch ke router, manakala kabel crossover menyambungkan peranti sama jenis seperti komputer ke komputer.", "Kabel straight-through mempunyai susunan warna yang berbeza pada kedua-dua hujung kabel mengikut standard T568A dan T568B.", "Kabel crossover berfungsi menghantar isyarat data dalam bentuk cahaya bagi sambungan jarak jauh manakala kabel straight-through menggunakan isyarat elektrik."], correct: 1 },
  { question: "Mengapakah pelabelan menggunakan Unique Identifier sangat ditekankan dalam pengurusan kabel?", options: ["Untuk memberikan pemberat tambahan kepada kabel agar kedudukannya tidak mudah berubah atau beralih.", "Bagi menggantikan peranan cable tie dalam menyusun kumpulan kabel agar kelihatan lebih kemas dan teratur.", "Untuk mengurangkan rintangan elektrik di dalam konduktor tembaga bagi memastikan isyarat data bergerak lebih pantas.", "Memudahkan juruteknik mengenal pasti setiap kabel dengan cepat serta memendekkan masa penyelesaian masalah semasa aktiviti penyelenggaraan."], correct: 3 },
  { question: "Semasa melakukan pengujian kabel menggunakan Cable Tester , didapati lampu LED pada pin 1 dan 2 tidak menyala pada hujung penerima. Apakah kemungkinan masalah tersebut?", options: ["Panjang kabel telah melebihi had jarak maksimum 100 meter sehingga isyarat gagal dikesan.", "Kabel tersebut telah ditamatkan mengikut standard crossover yang menyebabkan pin tidak sejajar.", "Kabel yang digunakan adalah kategori lama yang hanya mempunyai empat pengalir dalaman sahaja.", "Sambungan wayar putih-oren dan oren terputus atau tidak ditekan dengan sempurna pada blok terminal."], correct: 3 },
  { question: "Bagi menjamin keselamatan peranti daripada kerosakan haba di dalam rak pelayan ( server rack ) 19 inci, apakah tindakan paling tepat berkaitan pengurusan persekitaran yang perlu diambil oleh juruteknik komputer rangkaian?", options: ["Menggunakan standard penamatan T568A bagi setiap kabel untuk mempercepatkan aliran data.", "Melekatkan label unik pada setiap port suis untuk memudahkan pemutusan bekalan kuasa utama.", "Menetapkan skala pelan lantai pada 1:20 supaya kedudukan rak tidak menghalang pintu kecemasan.", "Merancang susunan peralatan mengikut unit ketinggian (1U, 2U, atau 3U) bagi memastikan ruang pengudaraan yang mencukupi."], correct: 3 },
  { question: "Apakah yang dimaksudkan dengan Horizontal Cabling dalam infrastruktur rangkaian bangunan?", options: ["Sambungan kabel yang menyambungkan rangkaian antara beberapa bangunan yang berbeza di dalam satu kawasan kampus.", "Sambungan kabel yang menghubungkan outlet pengguna (Information Outlet) ke bilik telekomunikasi pada tingkat yang sama.", "Sambungan kabel yang menghubungkan bilik komunikasi (IDF) antara tingkat-tingkat yang berbeza di dalam sebuah bangunan.", "Laluan kabel utama yang bertindak sebagai tulang belakang bagi menghubungkan kemudahan pintu masuk bangunan dengan bilik pelayan utama."], correct: 1 },
  { question: "Apakah nama teknik menarik kabel rangkaian melalui ruang yang sukar dijangkau atau kawasan tertutup seperti di dalam dinding dan siling dengan menggunakan peralatan bantuan seperti Fish Tape atau Cable Rod?", options: ["Cable Fixing", "Cable Sorting", "Cable Fishing", "Cable Termination"], correct: 2 },
  { question: "Apakah fungsi utama Backbone Cabling dalam infrastruktur pengkabelan berstruktur?", options: ["Menyambungkan komputer stesen kerja pengguna ke outlet data di dinding.", "Menentukan susunan kod warna wayar mengikut standard T568A bagi penyambung RJ45.", "Melindungi kabel rangkaian daripada kerosakan mekanikal secara langsung melalui saluran paip.", "Menyambungkan bilik telekomunikasi atau pusat pengagihan utama antara tingkat dan bangunan yang berbeza."], correct: 3 },
  { question: "Apakah susunan warna wayar yang betul bagi standard T568B bermula dari pin 1 hingga pin 8?\n\nI. Putih-Hijau dan Biru\nII. Putih-Biru dan Hijau\nIII. Putih-Oren dan Oren\nIV. Putih-Coklat dan Coklat", options: ["I, II, III, IV", "I, III, II, IV", "III, II, I, IV", "III, I, II, IV"], correct: 3 },
  { question: "Semasa melakukan proses mengikat dan menyusun sekumpulan kabel (cable fastening) menggunakan pengikat kabel (cable tie), apakah amalan terbaik yang perlu dipatuhi oleh seorang juruteknik komputer rangkaian bagi menjamin integriti fizikal kabel tersebut?", options: ["Memasang hanya satu pengikat bagi setiap jarak 5m (meter) laluan kabel untuk menjimatkan kos bahan.", "Mengikat cable tie dengan tekanan yang paling maksimum supaya kedudukan kabel tidak boleh bergerak langsung.", "Menggunakan cable tie jenis logam secara eksklusif untuk semua jenis pemasangan di dalam persekitaran pejabat.", "Meletakkan pengikat pada jarak yang sekata dengan tekanan sederhana bagi mengelakkan kerosakan pada penebat atau wayar dalaman kabel."], correct: 3 },
  { question: "Susun urutan prosedur yang betul untuk melakukan penamatan pada Modular Jack (Keystone Jack):\n\nI. Masukkan dust cover untuk melindungi sambungan.\nII. Susun wayar mengikut standard T568A atau T568B.\nIII. Tanggalkan jaket kabel UTP menggunakan cable stripper.\nIV. Gunakan punch down tool untuk menekan wayar ke slot warna yang betul.", options: ["I, II, III, IV", "I, III, IV, II", "III, II, IV, I", "III, IV, I, II"], correct: 2 },
  { question: "Antara berikut, yang manakah merupakan ciri utama Topologi Bintang (Star)?", options: ["Semua peranti dihubungkan ke kabel pusat tunggal.", "Data mengalir dalam satu arah membentuk bulatan.", "Setiap peranti mempunyai sambungan terus ke semua peranti lain.", "Setiap peranti dihubungkan terus ke titik pusat seperti switch atau hub."], correct: 3 },
  { question: "Mengapakah pelan susun atur (plan layout) perlu disediakan sebelum memulakan kerja pendawaian?", options: ["Untuk menentukan kelajuan internet yang akan digunakan.", "Bagi memudahkan proses pemilihan pembekal perkakasan.", "Untuk memastikan jenis komputer yang dibeli adalah seragam.", "Bagi memastikan kebolehgunaan titik sambungan yang strategik dan kos yang efisien."], correct: 3 },
  { question: "Antara yang berikut, manakah yang tidak benar mengenai kombinasi standard Ethernet dan had jarak bagi kabel Unshielded Twisted Pair (UTP)?", options: ["10Base-T: 100m (meter)", "40GBase-T: 100m (meter)", "100Base-TX: 100m (meter)", "1000Base-T: 100m (meter)"], correct: 1 },
  { question: "Apakah tindakan yang paling tepat dilakukan terhadap sisa kabel selepas selesai kerja pemasangan bagi mematuhi amalan kelestarian persekitaran?", options: ["Membakar sisa kabel di kawasan terbuka.", "Menyimpan semua sisa kabel di dalam bilik server.", "Membuang sisa kabel ke dalam tong sampah domestik.", "Melupuskan sisa kabel mengikut konsep 3R (Reduce, Reuse, Recycle)."], correct: 3 },
  { question: "Apakah fungsi utama Modular Jack (Keystone Jack) dalam sistem pendawaian berstruktur?", options: ["Melabel kabel mengikut kod warna antarabangsa.", "Mengukur kestabilan isyarat data dalam rangkaian.", "Menyediakan titik tamatan di face plate untuk sambungan kabel Ethernet.", "Menghubungkan dua kabel Unshielded Twisted Pair (UTP) secara terus (coupler)."], correct: 2 },
  { question: "Apakah piawaian susunan kod warna bagi penamatan kabel Unshielded Twisted Pair (UTP) yang bermula dengan urutan Putih-Hijau, Hijau, Putih-Oren, dan Biru?", options: ["T568A", "T568B", "Crossover", "Straight-through"], correct: 0 },
  { question: "Pilih penyataan yang benar mengenai perbezaan fizikal dan ciri antara kabel Shielded Twisted Pair (STP) dan Unshielded Twisted Pair (UTP).\n\nI. Kabel UTP mempunyai ketahanan yang lebih tinggi terhadap gangguan frekuensi radio (RFI) berbanding kabel STP.\nII. Kedua-dua jenis kabel ini biasanya terdiri daripada lapan konduktor atau empat pasang wayar tembaga yang dipintal bersama.\nIII. Kabel UTP lebih ringan dan fleksibel kerana ketiadaan lapisan pelindung logam, menjadikannya lebih mudah untuk dipasang.\nIV. Kabel STP mempunyai lapisan pelindung logam (shielding) di sekeliling pasangan wayar untuk mengurangkan gangguan elektromagnetik (EMI).", options: ["I, II, dan III", "I, II, dan IV", "I, III, dan IV", "II, III, dan IV"], correct: 3 },
  { question: "Apakah perkara paling penting yang perlu dipastikan untuk menjaga integriti kabel semasa menggunakan cable stripper?", options: ["Jaket kabel ditarik dengan sekuat mungkin.", "Penebat luar dipotong sekurang-kurangnya 10 cm.", "Semua wayar di dalam kabel dipotong secara seragam.", "Bilah pemotong tidak menyentuh atau merosakkan konduktor dalaman (wayar kuprum)."], correct: 3 },
  { question: "Apakah sambungan kabel yang perlu diguna bagi menyambungkan dua (2) buah switch lama yang tidak menyokong fungsi Auto-MDIX?", options: ["Sambungan Rollover.", "Sambungan Fiber Optic.", "Sambungan Straight-through (T568B pada kedua-dua hujung).", "Sambungan Crossover (T568A pada satu hujung, T568B pada hujung satu lagi)."], correct: 3 },
  { question: "Mengapakah Personal Protective Equipment (PPE) seperti kasut keselamatan perlu dipakai semasa bekerja di tapak binaan rangkaian?", options: ["Supaya mudah dikenal pasti oleh penyelia tapak.", "Bagi mematuhi peraturan pengurusan bangunan sahaja.", "Untuk memastikan penampilan juruteknik kelihatan profesional.", "Untuk melindungi diri daripada kecederaan fizikal seperti tertusuk objek tajam."], correct: 3 },
  { question: "Antara peralatan berikut, yang manakah digunakan untuk menempatkan Patch Panel dan Switch secara teratur di dalam bilik komunikasi?", options: ["Trunking", "Ducting", "Face Plate", "Server Rack"], correct: 3 },
  { question: "Apakah kegunaan utama Fish Tape dalam kerja-kerja menarik kabel?", options: ["Mengikat kumpulan kabel pada rak server.", "Menentukan jarak point-to-point antara dua bangunan.", "Untuk memotong kabel Unshielded Twisted Pair (UTP) yang tebal.", "Menarik kabel melalui conduit atau laluan tersembunyi seperti di dalam dinding."], correct: 3 },
  { question: "Semasa melakukan penamatan pada patch panel, apakah amalan sikap yang menunjukkan kerja yang sistematik?", options: ["Menggunakan sebarang jenis kabel tanpa mengikut kategori.", "Melakukan penamatan secara rawak mengikut port yang kosong.", "Mengatur dan melabel kabel dengan jelas mengikut pelan yang ditetapkan.", "Membiarkan lebihan wayar di belakang patch panel untuk kegunaan masa depan."], correct: 2 },
  { question: "Apakah kelebihan utama menggunakan kabel Fiber Optik Mod Tunggal (Single Mode) berbanding Mod Berbilang (Multimode)?", options: ["Kos pemasangan yang jauh lebih murah.", "Menggunakan cahaya LED yang lebih selamat daripada laser.", "Mempunyai teras (core) yang lebih besar dan mudah ditamatkan.", "Boleh menghantar data pada jarak yang lebih jauh dengan kadar penurunan isyarat yang minima."], correct: 3 },
  { question: "Apakah yang dimaksudkan dengan Backbone Cabling?", options: ["Kabel yang menghubungkan PC pengguna ke suis di tingkat yang sama.", "Pendawaian elektrik yang membekalkan kuasa kepada peralatan rangkaian.", "Kabel utama yang menyambungkan bilik telekomunikasi antara tingkat atau antara bangunan.", "Kabel yang digunakan untuk menyambungkan router ke modem pembekal perkhidmatan."], correct: 2 },
  { question: "Apakah langkah yang perlu diambil jika kabel yang ditarik melalui conduit terasa sangat ketat dan sukar digerakkan?", options: ["Membiarkan kabel tersebut tersekat dan menggunakan laluan lain.", "Menarik kabel dengan sekuat hati menggunakan bantuan ramai orang.", "Memotong kabel tersebut dan menyambungnya semula di tengah-tengah conduit.", "Menggunakan pelincir kabel (cable lubricant) yang sesuai untuk mengurangkan geseran."], correct: 3 },
  { question: "Apakah tindakan terbaik untuk mengelakkan gangguan elektromagnetik (EMI) semasa memasang kabel rangkaian berhampiran dengan kabel kuasa elektrik?", options: ["Membalut kabel rangkaian dengan pita pelekat plastik.", "Menggunakan kabel UTP kategori rendah seperti Cat3.", "Menghidupkan peralatan elektrik hanya apabila rangkaian digunakan.", "Memastikan terdapat jarak pengasingan yang cukup atau menggunakan trunking yang berasingan."], correct: 3 },
  { question: "Apakah langkah pengesahan terakhir yang wajib dilakukan selepas selesai melakukan penamatan pada patch panel?", options: ["Membersihkan habuk pada patch panel.", "Mengambil gambar hasil kerja untuk dokumentasi.", "Melakukan ujian sambungan menggunakan Cable Tester.", "Memasang penutup habuk pada setiap port yang tidak digunakan."], correct: 2 },
  { question: "Antara yang berikut, manakah merupakan fungsi utama penggunaan pengikat kabel ( cable tie ) dalam pengurusan sistem pendawaian di dalam rak pelayan ( server rack )?", options: ["Memastikan kabel sentiasa berada dalam keadaan tegang dan ditarik dengan tekanan paling kuat.", "Mengikat dan menyusun sekumpulan kabel supaya tersusun kemas bagi menjamin aliran pengudaraan yang efisien.", "Berfungsi sebagai penyambung kekal bagi menghubungkan dua kabel Unshielded Twisted Pair (UTP) yang telah terputus.", "Digunakan sebagai pengenalan unik (unique identifier) bagi setiap kabel yang disambungkan pada panel tampalan (patch panel)."], correct: 1 },
  { question: "Antara yang berikut, manakah merupakan kaedah yang paling berkesan untuk membengkokkan konduit Polyvinyl Chloride (PVC) bagi mendapatkan sudut 90 darjah yang sempurna tanpa menyebabkan kerosakan fizikal pada konduit?", options: ["Mengaplikasikan haba secara langsung menggunakan api sehingga struktur plastik konduit menjadi cair sepenuhnya.", "Memotong konduit kepada dua bahagian berasingan dan menyambungkannya semula menggunakan simen pelarut PVC.", "Menggunakan tekanan impak dengan mengetuk konduit menggunakan tukul besi sehingga ia mencapai sudut yang diinginkan.", "Menggunakan bantuan spring pembengkok (bending spring) yang dimasukkan ke dalam konduit sebelum proses membengkok dilakukan."], correct: 3 }
];

// ==========================================
// DATA INFOGRAFIK DATA STRUCTURES
// ==========================================
const topologyEnhancedData = [
  {
    name: 'Topologi Bintang (Star)', icon: <Star size={28} className="text-blue-400"/>, bgIcon: <Star size={140} className="text-blue-500"/>, borderColor: 'hover:border-blue-500',
    diagram: (
      <svg viewBox="0 0 200 200" className="w-full h-full text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]">
        <line x1="100" y1="100" x2="100" y2="25" stroke="currentColor" strokeWidth="4"/><line x1="100" y1="100" x2="100" y2="175" stroke="currentColor" strokeWidth="4"/><line x1="100" y1="100" x2="25" y2="100" stroke="currentColor" strokeWidth="4"/><line x1="100" y1="100" x2="175" y2="100" stroke="currentColor" strokeWidth="4"/><line x1="100" y1="100" x2="47" y2="47" stroke="currentColor" strokeWidth="4"/><line x1="100" y1="100" x2="153" y2="153" stroke="currentColor" strokeWidth="4"/>
        <rect x="76" y="76" width="48" height="48" rx="8" fill="#1e293b" stroke="currentColor" strokeWidth="4"/><circle cx="100" cy="100" r="8" fill="currentColor"/>
        <circle cx="100" cy="25" r="16" fill="#0f172a" stroke="currentColor" strokeWidth="3"/><circle cx="100" cy="175" r="16" fill="#0f172a" stroke="currentColor" strokeWidth="3"/><circle cx="25" cy="100" r="16" fill="#0f172a" stroke="currentColor" strokeWidth="3"/><circle cx="175" cy="100" r="16" fill="#0f172a" stroke="currentColor" strokeWidth="3"/><circle cx="47" cy="47" r="16" fill="#0f172a" stroke="currentColor" strokeWidth="3"/><circle cx="153" cy="153" r="16" fill="#0f172a" stroke="currentColor" strokeWidth="3"/>
      </svg>
    ),
    ciri: ['Semua nod bersambung ke peranti pusat (Suis/Hab).', 'Kabel berasingan ditarik untuk setiap peranti pengguna.'], pros: ['Sangat stabil & mudah diurus.', 'Satu kabel rosak tidak menjejaskan komputer lain.'], cons: ['Kos pendawaian lebih tinggi.', 'Lumpuh sepenuhnya jika Suis (Switch) pusat rosak.'], aplikasi: 'Rangkaian LAN di pejabat moden, makmal komputer kampus, dan rangkaian Wi-Fi di rumah.'
  },
  {
    name: 'Topologi Mesh', icon: <Network size={28} className="text-emerald-400"/>, bgIcon: <Network size={140} className="text-emerald-500"/>, borderColor: 'hover:border-emerald-500',
    diagram: (
      <svg viewBox="0 0 200 200" className="w-full h-full text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">
        <path d="M100 25 L171 77 L144 163 L56 163 L29 77 Z" fill="none" stroke="currentColor" strokeWidth="3"/><path d="M100 25 L144 163 L29 77 L171 77 L56 163 Z" fill="none" stroke="currentColor" strokeWidth="3"/>
        <circle cx="100" cy="25" r="16" fill="#0f172a" stroke="currentColor" strokeWidth="4"/><circle cx="171" cy="77" r="16" fill="#0f172a" stroke="currentColor" strokeWidth="4"/><circle cx="144" cy="163" r="16" fill="#0f172a" stroke="currentColor" strokeWidth="4"/><circle cx="56" cy="163" r="16" fill="#0f172a" stroke="currentColor" strokeWidth="4"/><circle cx="29" cy="77" r="16" fill="#0f172a" stroke="currentColor" strokeWidth="4"/>
      </svg>
    ),
    ciri: ['Setiap peranti bersambung terus kepada semua peranti lain.', 'Laluan data mempunyai banyak alternatif.'], pros: ['Tiada titik kegagalan tunggal (Sangat Kebal).', 'Pemindahan data serentak tanpa "bottleneck".'], cons: ['Kos kabel dan penyelenggaraan yang melampau tinggi.', 'Pemasangan pendawaian sangat rumit.'], aplikasi: 'Infrastruktur Pelayan Kritikal (Pusat Data / Cloud), sistem komunikasi tentera, infrastruktur WAN.'
  },
  {
    name: 'Topologi Bas (Bus)', icon: <Activity size={28} className="text-orange-400"/>, bgIcon: <Activity size={140} className="text-orange-500"/>, borderColor: 'hover:border-orange-500',
    diagram: (
      <svg viewBox="0 0 200 200" className="w-full h-full text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]">
        <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="10" strokeLinecap="round"/><rect x="5" y="85" width="15" height="30" rx="3" fill="currentColor"/><rect x="180" y="85" width="15" height="30" rx="3" fill="currentColor"/>
        <line x1="50" y1="100" x2="50" y2="40" stroke="currentColor" strokeWidth="4"/><line x1="100" y1="100" x2="100" y2="160" stroke="currentColor" strokeWidth="4"/><line x1="150" y1="100" x2="150" y2="40" stroke="currentColor" strokeWidth="4"/>
        <rect x="30" y="10" width="40" height="30" rx="6" fill="#0f172a" stroke="currentColor" strokeWidth="3"/><rect x="80" y="160" width="40" height="30" rx="6" fill="#0f172a" stroke="currentColor" strokeWidth="3"/><rect x="130" y="10" width="40" height="30" rx="6" fill="#0f172a" stroke="currentColor" strokeWidth="3"/>
      </svg>
    ),
    ciri: ['Berkongsi satu kabel utama (Backbone).', 'Memerlukan alat penamat (Terminator) di hujung.'], pros: ['Kos paling rendah.', 'Mudah dipasang.'], cons: ['Jika kabel utama putus, seluruh rangkaian tergendala.', 'Sukar cari punca kerosakan.'], aplikasi: 'Sistem amalan lama, sambungan peranti IoT.'
  },
  {
    name: 'Topologi Cincin (Ring)', icon: <RotateCcw size={28} className="text-purple-400"/>, bgIcon: <RotateCcw size={140} className="text-purple-500"/>, borderColor: 'hover:border-purple-500',
    diagram: (
      <svg viewBox="0 0 200 200" className="w-full h-full text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.5)]">
        <circle cx="100" cy="100" r="65" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="15 10"/>
        <path d="M 165 100 L 175 115 L 155 115 Z" fill="currentColor" transform="rotate(-30 165 100)"/><path d="M 35 100 L 45 85 L 25 85 Z" fill="currentColor" transform="rotate(-30 35 100)"/>
        <circle cx="100" cy="35" r="18" fill="#0f172a" stroke="currentColor" strokeWidth="4"/><circle cx="165" cy="100" r="18" fill="#0f172a" stroke="currentColor" strokeWidth="4"/><circle cx="100" cy="165" r="18" fill="#0f172a" stroke="currentColor" strokeWidth="4"/><circle cx="35" cy="100" r="18" fill="#0f172a" stroke="currentColor" strokeWidth="4"/>
      </svg>
    ),
    ciri: ['Disusun membentuk bulatan tertutup.', 'Data mengalir dalam satu arah sahaja (secara bergilir).'], pros: ['Tiada pertembungan data (collision-free).', 'Kelajuan kekal stabil walaupun beban trafik data tinggi.'], cons: ['Satu peranti rosak, keseluruhan gelung cincin akan terputus.', 'Sukar untuk menambah komputer.'], aplikasi: 'Rangkaian FDDI (Fiber Distributed Data Interface) berkelajuan tinggi.'
  }
];

const cablingStructureData = [
  {
    name: 'Horizontal Cabling', icon: <Monitor size={28} className="text-blue-400"/>, bgIcon: <Monitor size={140} className="text-blue-500"/>, borderColor: 'hover:border-blue-500',
    diagram: (
      <svg viewBox="0 0 200 200" className="w-full h-full text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]">
        <rect x="20" y="110" width="40" height="25" rx="3" fill="#0f172a" stroke="currentColor" strokeWidth="2"/><rect x="35" y="135" width="10" height="15" fill="#0f172a" stroke="currentColor" strokeWidth="2"/><line x1="25" y1="150" x2="55" y2="150" stroke="currentColor" strokeWidth="2"/>
        <rect x="80" y="125" width="10" height="20" rx="1" fill="#1e293b" stroke="currentColor" strokeWidth="2"/>
        <rect x="150" y="70" width="30" height="80" rx="3" fill="#0f172a" stroke="currentColor" strokeWidth="2"/><line x1="155" y1="85" x2="175" y2="85" stroke="currentColor" strokeWidth="2"/><line x1="155" y1="95" x2="175" y2="95" stroke="currentColor" strokeWidth="2"/>
        <path d="M 60 135 L 80 135" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2"/> <path d="M 90 135 L 110 135 L 110 60 L 140 60 L 140 100 L 150 100" fill="none" stroke="currentColor" strokeWidth="3"/>
        <line x1="10" y1="155" x2="90" y2="155" stroke="#475569" strokeWidth="2"/><line x1="90" y1="155" x2="90" y2="30" stroke="#475569" strokeWidth="2"/>
      </svg>
    ),
    desc: 'Sambungan mendatar dari terminal pengguna (Face Plate) sehingga ke Bilik Telekomunikasi (TR).', spesifikasi: 'Maksimum 100 meter (UTP Cat5e/Cat6).', aplikasi: 'Penyambungan PC pekerja ke suis rangkaian.'
  },
  {
    name: 'Backbone Cabling', icon: <Server size={28} className="text-purple-400"/>, bgIcon: <Server size={140} className="text-purple-500"/>, borderColor: 'hover:border-purple-500',
    diagram: (
      <svg viewBox="0 0 200 200" className="w-full h-full text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.5)]">
        <rect x="40" y="20" width="120" height="160" rx="4" fill="none" stroke="#475569" strokeWidth="3"/>
        <line x1="40" y1="70" x2="160" y2="70" stroke="#475569" strokeWidth="2"/><line x1="40" y1="120" x2="160" y2="120" stroke="#475569" strokeWidth="2"/>
        <rect x="110" y="40" width="25" height="20" rx="2" fill="#0f172a" stroke="currentColor" strokeWidth="2"/><rect x="110" y="90" width="25" height="20" rx="2" fill="#0f172a" stroke="currentColor" strokeWidth="2"/>
        <rect x="100" y="140" width="35" height="30" rx="2" fill="#1e293b" stroke="currentColor" strokeWidth="3"/>
        <line x1="60" y1="50" x2="110" y2="50" stroke="#475569" strokeWidth="2" strokeDasharray="3 3"/><line x1="60" y1="100" x2="110" y2="100" stroke="#475569" strokeWidth="2" strokeDasharray="3 3"/>
        <path d="M 122.5 60 L 122.5 90 M 122.5 110 L 122.5 140" fill="none" stroke="currentColor" strokeWidth="5"/>
      </svg>
    ),
    desc: 'Rangkaian "Tulang Belakang" menegak menghubungkan TR di setiap tingkat ke Bilik Server Utama.', spesifikasi: 'Biasanya Fiber Optik untuk kelajuan ekstrem.', aplikasi: 'Laluan utama internet bangunan bertingkat.'
  },
  {
    name: 'Campus Wide Cabling', icon: <Building size={28} className="text-emerald-400"/>, bgIcon: <Building size={140} className="text-emerald-500"/>, borderColor: 'hover:border-emerald-500',
    diagram: (
      <svg viewBox="0 0 200 200" className="w-full h-full text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">
        <path d="M 10 160 Q 100 175 190 160" fill="none" stroke="#475569" strokeWidth="3"/>
        <path d="M 30 165 L 30 90 L 70 90 L 70 168" fill="#0f172a" stroke="currentColor" strokeWidth="2"/><rect x="40" y="105" width="8" height="10" fill="currentColor"/><rect x="52" y="105" width="8" height="10" fill="currentColor"/>
        <path d="M 80 170 L 80 60 L 120 60 L 120 170" fill="#1e293b" stroke="currentColor" strokeWidth="3"/><rect x="90" y="75" width="20" height="10" fill="currentColor"/><rect x="90" y="95" width="20" height="10" fill="currentColor"/>
        <path d="M 130 168 L 130 110 L 170 110 L 170 165" fill="#0f172a" stroke="currentColor" strokeWidth="2"/><rect x="140" y="125" width="20" height="10" fill="currentColor"/>
        <path d="M 50 166 C 50 195, 100 195, 100 170 C 100 195, 150 195, 150 166" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="5 3"/>
      </svg>
    ),
    desc: 'Infrastruktur skala besar yang menghubungkan beberapa bangunan berbeza dalam satu kawasan geografi tertutup atau tapak yang luas.', spesifikasi: 'Melibatkan pendawaian luar. Wajib menggunakan Fiber Optik.', aplikasi: 'Rangkaian Universiti awam, Pangkalan Tentera.'
  }
];

const copperCablesData = [
  {
    name: 'UTP (Unshielded)', icon: <Cable size={24} className="text-blue-400"/>,
    diagram: (
      <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-md">
        <path d="M10,25 L80,25 C85,25 85,75 80,75 L10,75 Z" fill="#334155" />
        <path d="M75,35 Q 110,15 140,35 T 190,25" fill="none" stroke="#3b82f6" strokeWidth="4" />
        <path d="M75,45 Q 110,25 140,45 T 190,35" fill="none" stroke="#f97316" strokeWidth="4" />
        <path d="M75,55 Q 110,35 140,55 T 190,45" fill="none" stroke="#22c55e" strokeWidth="4" />
        <path d="M75,65 Q 110,45 140,65 T 190,55" fill="none" stroke="#a16207" strokeWidth="4" />
      </svg>
    ),
    ciri: ['4 pasang wayar terpilin.', 'Tiada lapisan perisai.', 'Murah & fleksibel.'], kegunaan: 'Rangkaian LAN pejabat & rumah.'
  },
  {
    name: 'STP (Shielded)', icon: <ShieldCheck size={24} className="text-emerald-400"/>,
    diagram: (
      <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-md">
        <path d="M10,20 L60,20 C65,20 65,80 60,80 L10,80 Z" fill="#1e293b" />
        <path d="M55,23 L90,23 C95,23 95,77 90,77 L55,77 Z" fill="#94a3b8" />
        <path d="M60,25 L85,45 M60,35 L85,55 M60,45 L85,65 M60,55 L85,75" stroke="#cbd5e1" strokeWidth="2" />
        <path d="M85,35 Q 120,15 150,35 T 190,30" fill="none" stroke="#3b82f6" strokeWidth="4" />
      </svg>
    ),
    ciri: ['Pembalut foil/jaring.', 'Kurang gangguan EMI.'], kegunaan: 'Kawasan kilang industri.'
  },
  {
    name: 'Kabel Coaxial', icon: <Radio size={24} className="text-orange-400"/>,
    diagram: (
      <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-md">
        <path d="M10,25 L60,25 C62,25 62,75 60,75 L10,75 Z" fill="#0f172a" />
        <path d="M58,30 L100,30 C102,30 102,70 100,70 L58,70 Z" fill="#64748b" />
        <path d="M98,35 L140,35 C142,35 142,65 140,65 L98,65 Z" fill="#f8fafc" />
        <path d="M138,47 L190,47 C192,47 192,53 190,53 L138,53 Z" fill="#fb923c" />
      </svg>
    ),
    ciri: ['Teras tembaga tunggal di tengah (Solid Copper).', 'Dikelilingi penebat tebal dan jaring perisai.', 'Tahan lasak.'], kegunaan: 'Sistem TV Antena, CCTV analog.'
  }
];

const ethernetEvolutionData = [
  { category: 'Cat5e', speed: '1 Gbps', freq: '100 MHz', icon: <Activity size={24} className="text-orange-400"/>, bgColor: 'bg-orange-900/20', borderColor: 'border-orange-500/30', headerColor: 'text-orange-400', pros: ['Murah & fleksibel.'], cons: ['Crosstalk tinggi.'], aplikasi: 'Rumah & SOHO.' },
  { category: 'Cat6', speed: '1 Gbps - 10 Gbps*', freq: '250 MHz', icon: <Gauge size={24} className="text-amber-400"/>, bgColor: 'bg-amber-900/20', borderColor: 'border-amber-500/30', headerColor: 'text-amber-400', pros: ['Ada pemisah silang (Spline).'], cons: ['Kabel keras.'], aplikasi: 'Bangunan komersial.' },
  { category: 'Cat6A', speed: '10 Gbps', freq: '500 MHz', icon: <TrendingUp size={24} className="text-rose-400"/>, bgColor: 'bg-rose-900/20', borderColor: 'border-rose-500/30', headerColor: 'text-rose-400', pros: ['Kelajuan maksimum stabil.'], cons: ['Sangat mahal & rumit.'], aplikasi: 'Pusat Data (Data Center).' }
];

// Foto alatan sebenar pilihan pengajar. Tambah fail ke src/assets/tool-photos/,
// kemudian build semula. Jika belum dibekalkan, ilustrasi SVG asal kekal.
const toolPhotoFiles = import.meta.glob('./assets/tool-photos/*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' });
const equipmentPhotoFiles = import.meta.glob('./assets/equipment-photos/*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' });
const equipmentGallery = [
  { key: 'patch-panel', title: 'Patch Panel 24-Port', role: 'Titik pusat penamatan kabel dari bilik pengguna sebelum dihubungkan ke switch.', tip: 'Pelajar perlu cam nombor port dan fungsi pelabelan untuk troubleshooting yang cepat.' },
  { key: 'network-switch', title: 'Network Switch', role: 'Peranti aktif yang mengagihkan sambungan rangkaian ke banyak port pengguna.', tip: 'Bandingkan port switch dengan port patch panel. Patch panel ialah pasif, switch ialah aktif.' },
  { key: 'ups', title: 'UPS (Uninterruptible Power Supply)', role: 'Bekalan kuasa sokongan yang menstabilkan kuasa dan memberi masa untuk penutupan selamat semasa blackout.', tip: 'Terangkan kepada pelajar kenapa UPS diletakkan di bahagian bawah rak: berat dan perlu pusat graviti rendah.' },
];
const toolPhotoNames = ['crimping-tool', 'punch-down-tool', 'jacket-stripper', 'wire-cutter', 'long-nose-pliers', 'screwdriver'];
const practicalToolNotes = [
  { use: 'Masukkan konduktor mengikut susunan T568A/B, semak kedudukan, kemudian crimp.', safety: 'Pastikan jenis plug 8P8C serasi dengan kabel dan alat.' },
  { use: 'Susun wayar pada terminal IDC, letak mata alat pada slot, kemudian tekan tegak.', safety: 'Pastikan sisi pemotong menghadap ke arah lebihan wayar.' },
  { use: 'Laraskan bilah, putar perlahan pada jaket kabel, kemudian tarik jaket.', safety: 'Jangan calarkan penebat setiap konduktor.' },
  { use: 'Ukur panjang yang diperlukan, kemudian potong tegak dan kemas.', safety: 'Jauhkan jari daripada mata pemotong.' },
  { use: 'Pegang wayar/objek kecil dengan lembut dalam ruang sempit.', safety: 'Jangan gunakan sebagai pengganti punch-down untuk terminal IDC.' },
  { use: 'Pilih hujung dan saiz yang tepat sebelum mengetatkan skru.', safety: 'Putuskan kuasa pada peralatan elektrik sebelum kerja yang berkaitan.' },
];
const toolsData = [
  {
    name: "Crimping Tool", icon: <Wrench size={32} className="text-blue-500"/>, color: "blue",
    diagram: (
      <svg viewBox="0 0 200 200" className="w-full h-full text-blue-500 drop-shadow-md">
        <path d="M 60 170 C 60 130 90 100 100 90 C 110 100 140 130 140 170" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round"/>
        <path d="M 60 170 C 60 140 80 115 85 105" fill="none" stroke="#1e293b" strokeWidth="18" strokeLinecap="round"/><path d="M 140 170 C 140 140 120 115 115 105" fill="none" stroke="#1e293b" strokeWidth="18" strokeLinecap="round"/>
        <rect x="85" y="40" width="30" height="50" fill="currentColor" rx="4"/><rect x="92" y="50" width="16" height="20" fill="#0f172a" rx="2"/>
        <circle cx="100" cy="90" r="6" fill="#0f172a"/>
      </svg>
    ),
    fungsi: "Menyepit dan mengunci pin besi pada penyambung (connector) RJ45 ke teras kabel UTP.", ciri: ["Terdapat slot khas 8P8C (RJ45).", "Dilengkapi bilah pemotong kabel dan ratchet."]
  },
  {
    name: "Punch Down Tool", icon: <PenTool size={32} className="text-emerald-500"/>, color: "emerald",
    diagram: (
      <svg viewBox="0 0 200 200" className="w-full h-full text-emerald-500 drop-shadow-md">
        <rect x="85" y="60" width="30" height="100" rx="10" fill="currentColor"/><rect x="85" y="60" width="30" height="30" fill="#1e293b"/>
        <rect x="97" y="20" width="6" height="40" fill="#94a3b8"/><path d="M 97 20 L 100 10 L 103 20 Z" fill="#64748b"/>
        <line x1="85" y1="120" x2="115" y2="120" stroke="#1e293b" strokeWidth="4"/><line x1="85" y1="130" x2="115" y2="130" stroke="#1e293b" strokeWidth="4"/>
      </svg>
    ),
    fungsi: "Menekan dan menanam wayar tembaga ke dalam slot terminal Patch Panel atau Keystone Jack.", ciri: ["Berfungsi dengan mekanisme spring (spring-loaded).", "Mata bilah menekan dan memotong baki wayar serentak."]
  },
  {
    name: "Jacket Stripper", icon: <RotateCcw size={32} className="text-yellow-500"/>, color: "yellow",
    diagram: (
      <svg viewBox="0 0 200 200" className="w-full h-full text-yellow-500 drop-shadow-md">
        <path d="M 120 70 A 30 30 0 1 0 120 130 L 160 130 A 30 30 0 0 0 160 70 Z" fill="currentColor"/><circle cx="100" cy="100" r="15" fill="#0f172a"/>
        <rect x="130" y="90" width="20" height="20" fill="#0f172a" rx="2"/><line x1="140" y1="90" x2="140" y2="110" stroke="#cbd5e1" strokeWidth="3"/>
      </svg>
    ),
    fungsi: "Alat pemutar (rotary) untuk mengupas jaket pelindung PVC luaran kabel UTP/STP.", ciri: ["Terdapat gelung jari untuk memutar alat pada kabel.", "Mata pisau laras supaya tidak terpotong wayar dalam."]
  },
  {
    name: "Wire Cutter", icon: <Scissors size={32} className="text-red-500"/>, color: "red",
    diagram: (
      <svg viewBox="0 0 200 200" className="w-full h-full text-red-500 drop-shadow-md">
        <path d="M 50 160 C 70 130 90 110 100 100" fill="none" stroke="#1e293b" strokeWidth="20" strokeLinecap="round"/><path d="M 150 160 C 130 130 110 110 100 100" fill="none" stroke="#1e293b" strokeWidth="20" strokeLinecap="round"/>
        <path d="M 100 100 L 75 40 L 100 30 Z" fill="currentColor"/><path d="M 100 100 L 125 40 L 100 30 Z" fill="currentColor"/><circle cx="100" cy="95" r="5" fill="#0f172a"/>
      </svg>
    ),
    fungsi: "Memotong kabel dan memotong rata wayar 8-teras sebelum dimasukkan ke dalam RJ45.", ciri: ["Mata pisau bersudut (Side-cutting).", "Bilah keluli tajam untuk potongan lurus dan kemas."]
  },
  {
    name: "Playar Muncung Tirus", icon: <Wrench size={32} className="text-purple-500"/>, color: "purple",
    diagram: (
      <svg viewBox="0 0 200 200" className="w-full h-full text-purple-500 drop-shadow-md">
        <path d="M 60 170 C 75 130 90 110 100 100" fill="none" stroke="#1e293b" strokeWidth="18" strokeLinecap="round"/><path d="M 140 170 C 125 130 110 110 100 100" fill="none" stroke="#1e293b" strokeWidth="18" strokeLinecap="round"/>
        <path d="M 100 100 L 85 20 L 100 20 Z" fill="currentColor"/><path d="M 100 100 L 115 20 L 100 20 Z" fill="currentColor"/><circle cx="100" cy="95" r="5" fill="#0f172a"/>
      </svg>
    ),
    fungsi: "Mencapai, menarik, atau memegang wayar halus di ruang yang sempit.", ciri: ["Muncung yang sangat panjang dan tirus.", "Permukaan cengkaman bergerigi."]
  },
  {
    name: "Pemutar Skru", icon: <Wrench size={32} className="text-cyan-500"/>, color: "cyan",
    diagram: (
      <svg viewBox="0 0 200 200" className="w-full h-full text-cyan-500 drop-shadow-md">
        <rect x="85" y="100" width="30" height="80" rx="10" fill="currentColor"/><rect x="90" y="100" width="20" height="80" fill="#0f172a" opacity="0.3"/>
        <rect x="96" y="30" width="8" height="70" fill="#94a3b8"/><path d="M 96 30 L 100 10 L 104 30 Z" fill="#64748b"/>
      </svg>
    ),
    fungsi: "Memasang Faceplate pada dinding dan mengikat Suis / Patch Panel pada Rak Server.", ciri: ["Kepala berbentuk silang (Phillips) atau leper (Flathead).", "Batang keluli magnetik."]
  }
];

const componentsData = [
  {
    name: "Faceplate (Plat Dinding)", 
    icon: <Monitor size={32} className="text-rose-500"/>, 
    color: "rose",
    diagram: (
      <svg viewBox="0 0 200 200" className="w-full h-full text-rose-500 drop-shadow-md">
        <rect x="50" y="30" width="100" height="140" rx="8" fill="#f8fafc" stroke="currentColor" strokeWidth="4"/>
        <rect x="70" y="60" width="60" height="35" rx="4" fill="#1e293b"/>
        <rect x="70" y="105" width="60" height="35" rx="4" fill="#1e293b"/>
        <circle cx="100" cy="45" r="4" fill="#cbd5e1"/>
        <circle cx="100" cy="155" r="4" fill="#cbd5e1"/>
      </svg>
    ),
    fungsi: "Bingkai penutup pada dinding (Wall Box) yang menyediakan titik sambungan kemas untuk terminal pengguna.", 
    ciri: [
      <span key="1">Diperbuat daripada plastik tahan lasak ABS.</span>, 
      <span key="2">Boleh memuatkan 1, 2, atau lebih soket (Port).</span>
    ]
  },
  {
    name: "Modular Jack RJ45", 
    icon: <Plug size={32} className="text-blue-500"/>, 
    color: "blue",
    diagram: (
      <svg viewBox="0 0 200 200" className="w-full h-full text-blue-500 drop-shadow-md">
        <rect x="65" y="50" width="70" height="100" rx="4" fill="currentColor"/>
        <rect x="60" y="60" width="80" height="80" fill="#1e293b" rx="2"/>
        <rect x="75" y="70" width="50" height="40" fill="#0f172a" rx="2"/>
        <path d="M 80 75 L 80 90 M 86 75 L 86 90 M 92 75 L 92 90 M 98 75 L 98 90 M 104 75 L 104 90 M 110 75 L 110 90 M 116 75 L 116 90 M 122 75 L 122 90" stroke="#fbbf24" strokeWidth="2"/>
        <rect x="70" y="125" width="60" height="15" fill="#334155" rx="2"/>
      </svg>
    ),
    fungsi: "Soket 'betina' (Keystone Jack) yang menerima sambungan Patch Cord RJ45 dari komputer pekerja.", 
    ciri: [
      <span key="1">Kabel utama (Backbone) ditanam di bahagian belakangnya menggunakan alat Punch Down.</span>, 
      <span key="2">Mudah diklik masuk (Snap-in) ke dalam Faceplate.</span>
    ]
  },
  {
    name: "Trunking & Conduit (Saluran)", 
    icon: <Layers size={32} className="text-emerald-500"/>, 
    color: "emerald",
    diagram: (
      <svg viewBox="0 0 200 200" className="w-full h-full text-emerald-500 drop-shadow-md">
        <path d="M 20 130 L 160 130 L 180 90 L 40 90 Z" fill="#cbd5e1" stroke="currentColor" strokeWidth="3"/>
        <path d="M 30 120 L 150 120 L 165 95 L 45 95" fill="none" stroke="#3b82f6" strokeWidth="4"/>
        <path d="M 35 115 L 155 115 L 170 90 L 50 90" fill="none" stroke="#f97316" strokeWidth="4"/>
        <path d="M 20 160 L 120 160 L 140 120 L 40 120 Z" fill="#f8fafc" stroke="currentColor" strokeWidth="3" opacity="0.95"/>
        <line x1="80" y1="120" x2="80" y2="160" stroke="#94a3b8" strokeWidth="2" opacity="0.5"/>
      </svg>
    ),
    fungsi: "Laluan paip dan saluran untuk menyembunyikan, menyusun, serta melindungi kabel dari kerosakan fizikal, haba, atau haiwan.", 
    ciri: [
      <span key="1"><strong className="text-slate-200">PVC:</strong> Ringan dan kos lebih rendah; pilih jenis dengan penarafan keselamatan kebakaran sesuai untuk lokasi pemasangan.</span>,
      <span key="2"><strong className="text-slate-200">Steel (Keluli):</strong> Tahan impak mekanikal tinggi (Sesuai untuk kilang industri).</span>,
      <span key="3"><strong className="text-slate-200">Glass Reinforced Polyester (GRP):</strong> Kalis karat & tahan bahan kimia (Cuaca ekstrem).</span>,
      <span key="4"><strong className="text-slate-200">Galvanized Rigid Conduit (GRC):</strong> Paip besi bergalvani tebal (Bawah tanah & luaran).</span>
    ]
  }
];

const terminationSteps = {
  rj45: [
    { step: 1, title: "Kupas Jaket Kabel", desc: "Kupas jaket luaran secukupnya mengikut jenis penyambung dan alat (contohnya sekitar 2–3 cm), tanpa merosakkan konduktor. Kekalkan pintalan pasangan sehampir mungkin dengan titik penamatan." },
    { step: 2, title: "Asing & Luruskan", desc: "Buka pintalan 4 pasang wayar. Luruskan setiap helaian menggunakan jari atau batang pen." },
    { step: 3, title: "Susun Kod Warna", desc: "Susun rapat rapat mengikut standard T568B dari kiri ke kanan (P-Oren, Oren, P-Hijau, Biru, P-Biru, Hijau, P-Coklat, Coklat)." },
    { step: 4, title: "Potong Rata (Trim)", desc: "Gunakan Wire Cutter untuk memotong hujung wayar supaya lurus sekata. Tinggalkan panjang lebih kurang 1.5 cm." },
    { step: 5, title: "Masukkan ke RJ45", desc: "Ikut rajah orientasi pin 1–8 pada penyambung yang digunakan; pastikan kedudukan klip/kontak konsisten. Semua konduktor mesti sampai ke hujung dan jaket kabel berada di bawah pengapit." },
    { step: 6, title: "Ketip (Crimp) & Uji", desc: "Masukkan kepala RJ45 ke dalam Crimping Tool dan ketip dengan kuat. Uji kabel menggunakan Cable Tester." }
  ],
  patchPanel: [
    { step: 1, title: "Susun Kabel di Belakang Panel", desc: "Kupas jaket kabel. Bawa kabel dari arah belakang Patch Panel dan sandarkan pada slot lurah (IDC) yang ditetapkan." },
    { step: 2, title: "Tolak Masuk Ikut Warna", desc: "Letakkan setiap wayar warna ke atas lurah besi (IDC) mengikut kod pelekat T568B yang dicetak pada papan Patch Panel." },
    { step: 3, title: "Tekan (Punch Down)", desc: "Gunakan Punch Down Tool. Halakan mata pemotong (Gunting) menghadap ke arah LUAR blok. Tekan kuat sehingga bunyi 'klak'." },
    { step: 4, title: "Ikat Kemas", desc: "Setelah semua 8 kabel ditanam dan dipotong baki wayarnya, ikat kabel utama pada palang pengurusan menggunakan Cable Tie." }
  ],
  modularJack: [
    { step: 1, title: "Sisip Kabel pada Keystone", desc: "Kupas jaket kabel. Masukkan wayar ke tengah-tengah laluan di belakang Modular Jack (Keystone)." },
    { step: 2, title: "Selit pada Lurah Sisi", desc: "Tarik wayar ke sisi kiri dan kanan mengikut pelekat panduan warna T568B pada tepi Modular Jack." },
    { step: 3, title: "Tanam & Potong", desc: "Sama seperti Patch Panel, gunakan Punch Down Tool untuk menekan wayar masuk ke celah pin dan memutuskan lebihannya." },
    { step: 4, title: "Snap ke Faceplate", desc: "Pasangkan penutup plastik keselamatan (Dust Cap) di bahagian belakang. Tolak (Snap) jack dari arah belakang ke hadapan Faceplate." }
  ]
};

// ==========================================
// KOMPONEN UTAMA
// ==========================================
export default function ModuleIKR3023({ onBackToPortal, demoMode = false, demoTarget = null }) {
  // BM/EN menggunakan React Context: semua label utama terus dikemas kini apabila bahasa bertukar.
  const { language, t } = useLanguage();
  const localiseTopic = (title) => language === 'en' ? translateVisibleText(title || '') : title;
  const [view, setView] = useState('menu');
  const [activeTopic, setActiveTopic] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [studentNumber, setStudentNumber] = useState(getStudentNumber);
  const loadStudentProgress = (number) => {
    if (!number) return 0;
    try {
      const value = Number(localStorage.getItem(`ikr3023_quiz_unlock_v4_${number}`));
      return Number.isFinite(value) ? Math.max(0, Math.min(topics.length, value)) : 0;
    } catch { return 0; }
  };
  const [unlockedTopicIndex, setUnlockedTopicIndex] = useState(() => loadStudentProgress(getStudentNumber())); 

  // STATE UNTUK KUIZ SHUFFLE
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState([]);

  const [isRecommenderStarted, setIsRecommenderStarted] = useState(false);
  const [recStep, setRecStep] = useState(0);
  const [recLoading, setRecLoading] = useState(false);
  const [recPreferences, setRecPreferences] = useState({ env: '', type: '', budget: '' });
  const [recResult, setRecResult] = useState(null);
  const arContainerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCableLabLinks, setShowCableLabLinks] = useState(false);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [view, activeTopic]);
  useEffect(() => { try { if (!demoMode && studentNumber) localStorage.setItem(`ikr3023_quiz_unlock_v4_${studentNumber}`, unlockedTopicIndex.toString()); } catch (e) {} }, [unlockedTopicIndex, studentNumber, demoMode]);

  const handleTopicClick = (topic, index) => {
    // Akses kad dikawal oleh hasil kuiz, bukan sekadar klik nota.
    if (!demoMode && index > unlockedTopicIndex) return;
    setActiveTopic(topic);
    setView('topic');
    setActiveTab('basic');
  };


  const handleStudentSelected = (number) => {
    if (demoMode || !Number.isInteger(number) || number < 1 || number > 30) return;
    setStudentNumber(number);
    try { localStorage.setItem('emodul_ikr_student_number_v1', String(number)); } catch { /* optional */ }
    const nextProgress = loadStudentProgress(number);
    setUnlockedTopicIndex(nextProgress);
    if (activeTopic && topics.findIndex(item => item.id === activeTopic.id) > nextProgress) {
      setActiveTopic(null);
      setView('menu');
    }
  };

  const changeStudent = () => {
    if (demoMode) return;
    const input = window.prompt(t('Nombor pelajar (1 hingga 30):', 'Student number (1 to 30):'), String(studentNumber || ''));
    if (input === null) return;
    const number = Number(input);
    if (!Number.isInteger(number) || number < 1 || number > 30) {
      window.alert(t('Sila pilih nombor 1 hingga 30.', 'Please choose a number from 1 to 30.'));
      return;
    }
    handleStudentSelected(number);
  };

  const handleTopicQuizPassed = (score) => {
    if (demoMode || score < UNLOCK_PASS_MARK || !activeTopic) return;
    const topicIndex = topics.findIndex(item => item.id === activeTopic.id);
    if (topicIndex === -1 || topicIndex > unlockedTopicIndex) return;
    setUnlockedTopicIndex(prev => Math.max(prev, topicIndex + 1));
  };

  useEffect(() => {
    if (!demoMode || demoTarget?.index == null) return;
    const chosen = topics[demoTarget.index];
    if (!chosen) return;
    setActiveTopic(chosen);
    setActiveTab('basic');
    setView('topic');
  }, [demoMode, demoTarget]);

  const startTopicQuiz = () => { if (activeTopic) setView('topicQuiz'); };

  const openNextTopic = () => {
    if (!activeTopic) return;
    const index = topics.findIndex(item => item.id === activeTopic.id);
    if (index === -1 || index + 1 >= topics.length || (!demoMode && index + 1 > unlockedTopicIndex)) return;
    handleTopicClick(topics[index + 1], index + 1);
  };

  // --- FUNGSI AUTO-SHUFFLE KUIZ ---
  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  const initializeQuiz = () => {
    // Rombak 40 soalan (Pilih secara rawak)
    const shuffledQ = shuffleArray([...rawQuizQuestions]).map(q => {
      // Petakan pilihan jawapan supaya kita tahu mana satu jawapan betul sebelum dirombak
      let optionsObj = q.options.map((opt, idx) => ({
        text: opt,
        isCorrect: idx === q.correct
      }));

      // Rombak pilihan jawapan A,B,C,D
      optionsObj = shuffleArray(optionsObj);

      // Cari indeks baru untuk jawapan yang betul
      const newCorrectIndex = optionsObj.findIndex(opt => opt.isCorrect);

      return {
        question: q.question,
        options: optionsObj.map(opt => opt.text),
        correct: newCorrectIndex
      };
    });

    setCurrentQuizQuestions(shuffledQ);
    setQuizAnswers({});
    setQuizCompleted(false);
    setQuizScore(0);
    setView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizSubmit = (qIndex, optionIndex) => { setQuizAnswers({ ...quizAnswers, [qIndex]: optionIndex }); };
  const calculateScore = () => {
    let score = 0;
    currentQuizQuestions.forEach((q, index) => { if (quizAnswers[index] === q.correct) score++; });
    setQuizScore(score); setQuizCompleted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const BackButton = () => (
    <div className="mt-12 mb-4 flex justify-center animate-slide-up w-full">
      <button onClick={() => { setView('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="group flex items-center gap-3 px-8 py-3.5 bg-white text-slate-700 font-bold rounded-full shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_30px_-10px_rgba(59,130,246,0.25)] hover:text-blue-700 hover:-translate-y-1 transition-all duration-300 border border-slate-200">
        <div className="bg-slate-100 p-2 rounded-full group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors"><ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /></div>
        Kembali ke Menu Utama
      </button>
    </div>
  );

  const createSearchLink = (query) => `https://www.google.com/search?q=${encodeURIComponent(query + " malaysia shopee lazada")}`;
  const generateRecommendation = (preferences = recPreferences) => {
    setRecLoading(true);
    setTimeout(() => {
      let recommendation = { title: '', aiAnalysis: '', specs: { router: '', switch: '', cable: '', ap: '' }, examples: [], warning: null };
      const { env, budget } = preferences;

      if (env === 'home') {
        recommendation.title = 'Infrastruktur Rangkaian Rumah Pintar';
        recommendation.aiAnalysis = "Analisis: Rangkaian rumah memerlukan liputan Wi-Fi yang luas dan stabil, serta sambungan LAN untuk TV pintar atau PC Gaming.";
        if (budget === 'low') { 
          recommendation.specs = { router: 'Wi-Fi 5 / Asas Wi-Fi 6', switch: '5-Port Unmanaged Switch', cable: 'Cat5e UTP', ap: 'Wi-Fi Extender' };
          recommendation.examples = [{ name: 'TP-Link Archer AX1500', link: createSearchLink('TP-Link Archer AX1500') }];
        } else { 
          recommendation.specs = { router: 'Wi-Fi 6 Mesh System', switch: '8-Port Gigabit Switch', cable: 'Cat6 Pure Copper', ap: 'Deco Mesh Nodes' };
          recommendation.examples = [{ name: 'TP-Link Deco X50 Mesh', link: createSearchLink('TP-Link Deco X50 Mesh') }];
        }
      } else {
        recommendation.title = 'Sistem Rangkaian Pejabat & SME';
        recommendation.aiAnalysis = "Analisis: Organisasi memerlukan pengurusan VLAN, kabel tahan lama, dan Access Point PoE.";
        if (budget === 'low') {
          recommendation.specs = { router: 'VPN Router', switch: '16-Port Smart Switch', cable: 'Cat6 UTP', ap: 'Standalone Ceiling AP' };
          recommendation.examples = [{ name: 'TP-Link Omada ER605', link: createSearchLink('TP-Link ER605') }];
        } else {
          recommendation.specs = { router: 'Enterprise Firewall', switch: '24-Port PoE+ Managed', cable: 'Cat6A', ap: 'Wi-Fi 6 Cloud AP' };
          recommendation.examples = [{ name: 'Ubiquiti UniFi UDM Pro', link: createSearchLink('Ubiquiti UDM Pro') }];
        }
      }

      setRecResult(recommendation); setRecLoading(false); setRecStep(4);
    }, 1500);
  };

  const handleRecSelect = (category, value) => {
    // Bina snapshot state terkini supaya cadangan bajet tidak tersasar.
    const next = { ...recPreferences, [category]: value };
    setRecPreferences(next);
    setTimeout(() => {
      if (category === 'budget') generateRecommendation(next);
      else setRecStep(prev => prev + 1);
    }, 300);
  };
  const resetRecommender = () => { setRecStep(0); setRecPreferences({ env: '', type: '', budget: '' }); setRecResult(null); };
  const exitRecommender = () => { setIsRecommenderStarted(false); resetRecommender(); setView('menu'); };
  const OptionCard = ({ icon: Icon, title, desc, onClick, active }) => (
    <button onClick={onClick} className={`flex flex-col items-center p-6 rounded-xl border-2 transition-all w-full text-center hover:shadow-lg hover:-translate-y-1 ${active ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-slate-200 bg-white text-slate-700'}`}>
      <div className={`p-4 rounded-full mb-4 ${active ? 'bg-blue-200' : 'bg-slate-100'}`}><Icon size={32} className={active ? 'text-blue-700' : 'text-slate-500'} /></div>
      <h3 className="font-bold text-lg mb-1">{title}</h3><p className="text-sm text-slate-500">{desc}</p>
    </button>
  );
  const toggleFullScreen = () => { setIsFullscreen(!isFullscreen); };

  // ==========================================
  // RENDERER: MENU UTAMA
  // ==========================================
  const renderMenu = () => {
    const progressPercentage = Math.min(100, Math.round((unlockedTopicIndex / topics.length) * 100));
    const nextTopic = topics[unlockedTopicIndex];

    return (
      <div className="space-y-6 animate-fade-in pb-10">
        <header className="em3-module-hero text-center bg-gradient-to-r from-slate-900 to-blue-900 text-white p-6 md:p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-10 right-10 transform rotate-12"><Globe size={100}/></div>
             <div className="absolute bottom-5 left-10 transform -rotate-12"><Cable size={80}/></div>
          </div>

          <div className="relative z-10">
                <button onClick={onBackToPortal} className="mb-4 inline-flex items-center gap-2 text-white bg-black/20 hover:bg-black/30 px-4 py-2 rounded-xl transition-all text-sm font-bold backdrop-blur-sm border border-white/20 z-50 relative">
                    <Home size={18} /> {t('Kembali ke Portal Utama', 'Back to Main Portal')}
                </button>
              <h1 className="text-3xl font-bold mb-2">{t('Modul IKR3023: Network Structured Cabling', 'Module IKR3023: Network Structured Cabling')}</h1>
              <div className="mt-4 mb-6 inline-block bg-blue-800/50 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-semibold border border-blue-400 text-blue-100">
              {t('E-Learning Interaktif', 'Interactive E-Learning')}
              </div>
              <div className="flex justify-center mt-2">
                  <a href="https://drive.google.com/drive/folders/190H5Gnsui3COMH6NUOMYFcUEH0eFY5x1?usp=drive_link" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white text-blue-900 rounded-xl font-bold hover:bg-blue-50 hover:scale-105 transition-all shadow-md group">
                      <Download size={20} className="group-hover:animate-bounce" /> {t('Muat Turun Nota', 'Download Notes')}
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
                <h3 className="font-bold text-slate-800 flex items-center gap-2 text-lg"><Activity className="text-blue-500" size={24} /> {t('Status Bacaan Modul', 'Module Learning Progress')}</h3>
                <p className="text-sm text-slate-500 mt-1">
                  {!demoMode && unlockedTopicIndex < topics.length 
                    ? <span className="flex items-center gap-1.5"><ChevronRight size={16} className="text-blue-500"/> {t('Sila teliti nota:', 'Please read the notes:')} <strong className="text-blue-600">{localiseTopic(nextTopic?.title)}</strong></span> 
                    : <span className="flex items-center gap-1.5 text-green-600 font-bold"><CheckCircle size={16}/> {t('Selesai! Anda kini layak menduduki Ujian.', 'Completed! You can now take the final assessment.')}</span>}
                </p>
              </div>
              <div className="text-right">
                <span className="font-black text-blue-600 text-3xl">{progressPercentage}%</span>
              </div>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-4 mb-2 overflow-hidden shadow-inner relative z-10">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-4 rounded-full transition-all duration-1000 ease-out relative" style={{ width: `${progressPercentage}%` }}>
                 {progressPercentage < 100 && (<div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full animate-[shimmer_1.5s_infinite]"></div>)}
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 text-xs font-bold text-slate-400 relative z-10">
              <span>{t('Mula', 'Start')}</span>
              <span>{Math.min(unlockedTopicIndex, topics.length)} {t('daripada', 'of')} {topics.length} {t('Topik Lulus Kuiz', 'Topics Passed')}</span>
              <button type="button" onClick={changeStudent} className="font-bold text-blue-600 hover:underline">{t('Pelajar:', 'Student:')} {studentNumber || t('Belum dipilih', 'Not selected')} • {t('Tukar', 'Change')}</button>
            </div>
            {!demoMode && unlockedTopicIndex > 0 && (
              <div className="mt-4 text-center relative z-10">
                <button onClick={() => { if(window.confirm(t('Adakah anda pasti mahu set semula (reset) semua kemajuan bacaan anda dari awal?', 'Are you sure you want to reset all your learning progress?'))) { setUnlockedTopicIndex(0); setQuizCompleted(false); setQuizScore(0); setQuizAnswers({}); if (studentNumber) localStorage.removeItem(`ikr3023_quiz_unlock_v4_${studentNumber}`); } }} className="text-[10px] sm:text-xs text-slate-400 hover:text-red-500 underline transition-colors">
                  {t('Mula Semula (Reset Progress)', 'Start Again (Reset Progress)')}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="em3-topic-grid grid grid-cols-1 md:grid-cols-2 gap-4 px-2 sm:px-4 mt-6">
          {topics.map((topic, index) => {
            const isLocked = !demoMode && index > unlockedTopicIndex;
            const isCompleted = index < unlockedTopicIndex;
            return (
              <button key={topic.id} onClick={() => !isLocked && handleTopicClick(topic, index)} className={`flex items-center p-6 bg-white rounded-xl shadow-md transition-all duration-200 border text-left group relative overflow-hidden ${isLocked ? 'opacity-60 cursor-not-allowed border-gray-200' : 'hover:shadow-xl hover:scale-[1.02] border-gray-100'}`}>
                {isCompleted && (<div className="absolute top-3 right-3 text-green-500 bg-green-50 rounded-full p-1 shadow-sm border border-green-100 z-20" title={t('Selesai Dibaca', 'Completed')}><Check size={16} strokeWidth={3} /></div>)}
                <div className={`p-4 rounded-lg ${isLocked ? 'bg-gray-300' : topic.color} text-white mr-4 shadow-sm z-10`}>
                  {isLocked ? <Lock size={40} /> : topic.icon}
                </div>
                <div className="z-10 flex-1 pr-6">
                  <h3 className={`text-xl font-bold ${isLocked ? 'text-gray-500' : 'text-gray-800 group-hover:text-blue-600'} transition-colors`}>{localiseTopic(topic.title)}</h3>
                  <p className="text-gray-500 text-sm mt-1">{isLocked ? t('Kunci: Lulus kuiz topik sebelumnya dahulu', 'Locked: Pass the previous topic quiz first') : localiseTopic(topic.description)}</p>
                </div>
                {!isLocked && <ChevronRight className="ml-auto text-gray-300 group-hover:text-blue-500 z-10" />}
                {isLocked && <Lock className="ml-auto text-gray-400 z-10" />}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 mt-6">
           <button onClick={() => setView('inspection')} className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200 border-t-4 border-t-yellow-400 text-center h-full">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mb-3"><ShieldAlert size={28} /></div>
              <h3 className="text-lg font-bold text-gray-800">Prosedur Keselamatan</h3>
              <p className="text-gray-500 text-xs mt-1">{t('Foto sebenar, panduan kerja selamat & pemeriksaan.', 'Real photos, safety procedures and inspections.')}</p>
            </button>

            <button
              type="button"
              disabled={!demoMode && unlockedTopicIndex < topics.length}
              onClick={() => setShowCableLabLinks(current => !current)}
              aria-expanded={showCableLabLinks}
              aria-controls="cablelabx-final-links"
              className={`relative flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md transition-all duration-300 border-t-4 text-center h-full ${!demoMode && unlockedTopicIndex < topics.length ? 'opacity-60 cursor-not-allowed border-t-gray-400' : 'hover:shadow-xl hover:scale-[1.02] border-t-green-500 ring-2 ring-green-400/50 ring-offset-2'}`}
            >
              <div className={`p-3 rounded-full mb-3 ${!demoMode && unlockedTopicIndex < topics.length ? 'bg-gray-100 text-gray-500' : 'bg-green-100 text-green-600'}`}>
                {!demoMode && unlockedTopicIndex < topics.length ? <Lock size={28} /> : <CheckCircle size={28} />}
              </div>
              <h3 className="text-lg font-bold text-gray-800">Penilaian Akhir • CableLabX</h3>
              <p className="text-gray-500 text-xs mt-1">{!demoMode && unlockedTopicIndex < topics.length ? 'Lulus semua kuiz topik dahulu' : 'Klik untuk pilih pautan penilaian luar.'}</p>
              {(demoMode || unlockedTopicIndex >= topics.length) && <ExternalLink size={16} className="mt-2 text-green-600"/>}
            </button>

            <button onClick={() => setView('ar')} className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200 border-t-4 border-t-indigo-500 text-center h-full">
              <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mb-3"><Box size={28} /></div>
              <h3 className="text-lg font-bold text-gray-800">Bilik Server Maya</h3>
              <p className="text-gray-500 text-xs mt-1">Lihat model 3D perkakasan rak server.</p>
            </button>
        </div>

        {(demoMode || unlockedTopicIndex >= topics.length) && showCableLabLinks && (
          <section id="cablelabx-final-links" className="mx-4 mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm" aria-label="Pautan CableLabX">
            <h3 className="text-lg font-extrabold text-emerald-950">Buka Penilaian Akhir CableLabX</h3>
            <p className="text-sm text-emerald-900 mt-1">Pautan di bawah dibuka terus melalui pelayar (elak sekatan pop-up). Internet diperlukan. Masuk ke bahagian Penilaian Akhir dalam sistem CableLabX selepas halaman dibuka.</p>
            <div className="flex flex-wrap gap-3 mt-4">
              <a href="https://cablelab2026.netlify.app/index.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-extrabold text-white hover:bg-emerald-800"><ExternalLink size={17}/>Buka CableLabX (alamat asal)</a>
              <a href="https://cablelabx.netlify.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-white border border-emerald-400 px-5 py-3 font-bold text-emerald-900 hover:bg-emerald-100"><ExternalLink size={17}/>Pautan alternatif</a>
            </div>
            <p className="text-xs text-emerald-800 mt-3">Jika kedua-dua laman tidak boleh dibuka, semak URL deployment Netlify terkini. Fungsi Penilaian Akhir berada dalam aplikasi CableLabX yang berasingan, bukan kod eModul-IKR.</p>
            {demoMode && <p className="text-xs font-bold text-amber-800 mt-2">Mod Juri: pautan dibuka untuk pratonton sahaja. Kemajuan pelajar eModul-IKR tidak berubah.</p>}
          </section>
        )}

        <div className="px-4 mt-8">
          <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-800 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-indigo-800">
            <div className="relative z-10 text-center md:text-left mb-6 md:mb-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/30 rounded-full text-indigo-200 text-xs font-bold mb-3 border border-indigo-400/30 backdrop-blur-sm"><Network size={14} /> Bot Perunding Percuma</div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">Pencadang Rangkaian <span className="text-indigo-400">Pintar</span></h2>
              <p className="text-indigo-100 max-w-lg text-sm md:text-base opacity-90">Sistem memadankan keperluan asas kepada spesifikasi Switch, Router, kabel dan AP berpandukan kategori penggunaan dan bajet.</p>
            </div>
            <button onClick={() => { setView('recommender'); setIsRecommenderStarted(false); }} className="group relative z-10 bg-white text-indigo-900 px-8 py-4 rounded-xl font-bold hover:bg-indigo-50 hover:scale-105 transition-all shadow-[0_0_30px_rgba(99,102,241,0.3)] flex items-center gap-3 whitespace-nowrap">
              <Sparkles size={20} className="text-indigo-600" /> Dapatkan Spesifikasi<ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500 opacity-20 blur-3xl rounded-full translate-x-1/3 -translate-y-1/4 pointer-events-none"></div>
          </div>
        </div>
      </div>
    );
  };

  // ==========================================
  // RENDERER: RECOMMENDER AI
  // ==========================================
  const renderRecommender = () => {
    if (!isRecommenderStarted) {
      return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-indigo-200 flex flex-col w-full relative">
          <nav className="bg-white px-4 md:px-6 py-4 shadow-sm flex justify-between items-center z-10">
            <div className="flex items-center gap-2 md:gap-4"><button onClick={() => setView('menu')} className="inline-flex items-center gap-2 text-gray-600 bg-gray-100 hover:bg-indigo-100 hover:text-indigo-700 px-4 py-2 rounded-xl transition-all text-sm font-bold border border-gray-200"><Home size={18} /> <span className="hidden md:inline">Menu Utama</span></button><div className="w-px h-6 bg-slate-200 mx-2 hidden md:block"></div><div className="flex items-center gap-2 text-indigo-700 font-extrabold text-xl tracking-tight"><Network size={28} className="text-indigo-600" /> Cabling<span className="text-slate-800">Pintar</span></div></div>
          </nav>
          <main className="flex-1 flex flex-col justify-center items-center text-center px-4 py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none"><div className="absolute -top-24 -left-24 w-64 md:w-96 h-64 md:h-96 rounded-full bg-indigo-500 blur-3xl"></div></div>
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-4 md:mb-6 leading-tight">Pakar Arkitek Rangkaian <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">Berpandukan Keperluan</span></h1>
              <p className="text-base sm:text-lg md:text-xl text-indigo-100 mb-8 md:mb-10 max-w-2xl font-light px-4">Bina topologi rumah atau pejabat anda! Masukkan skala dan bajet, sistem akan memilih cadangan peralatan (Router, Switch, Kabel) yang bersesuaian.</p>
              <button onClick={() => setIsRecommenderStarted(true)} className="group flex items-center gap-3 bg-white text-indigo-900 px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-bold hover:bg-indigo-50 hover:scale-105 transition-all shadow-[0_0_40px_rgba(99,102,241,0.5)]">Jana Infrastruktur Sekarang <ChevronRight className="group-hover:translate-x-1 transition-transform" /></button>
            </div>
          </main>
        </div>
      );
    }
  
    return (
      <div className="bg-slate-50 font-sans text-slate-800 flex flex-col items-center selection:bg-indigo-200 pt-2">
        <div className="w-full flex justify-between items-center mb-6 px-1">
          <button onClick={exitRecommender} className="inline-flex items-center gap-2 text-gray-600 bg-white hover:bg-indigo-100 hover:text-indigo-700 px-4 py-2 rounded-xl transition-all text-sm font-bold border border-gray-200 shadow-sm"><Home size={18} /> <span className="hidden sm:inline">Menu Utama</span></button>
          <div className="flex items-center gap-2 text-slate-400 font-bold text-lg"><Network size={20} /> Cabling<span className="text-slate-600">Pintar</span></div>
        </div>
        <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden ring-1 ring-slate-100">
          <div className="bg-gradient-to-r from-indigo-700 to-slate-800 p-6 text-white text-center">
              <h1 className="text-2xl font-bold flex items-center justify-center gap-2"><Sparkles className="text-yellow-300" /> Parameter Rangkaian</h1>
              <p className="text-indigo-100 mt-2 font-light">Lengkapkan borang keperluan infrastruktur.</p>
            </div>
            <div className="p-6 md:p-10">
              {recStep < 2 && !recLoading && (<div className="flex justify-center mb-10 gap-2">{[0, 1].map((i) => (<div key={i} className={`h-2.5 w-16 rounded-full transition-all duration-500 ${i <= recStep ? 'bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.4)]' : 'bg-slate-100'}`} />))}</div>)}
              {recStep === 0 && (
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-bold text-center mb-8 text-slate-800">Skala & Persekitaran Pemasangan?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5"><OptionCard icon={Home} title="Rumah / Kediaman" desc="Rangkaian untuk PC Gaming, TV Pintar & Wi-Fi Keluarga." onClick={() => handleRecSelect('env', 'home')}/><OptionCard icon={Briefcase} title="Pejabat / SME" desc="Rangkaian berpusat (Patch Panel, AP, Server, Firewall)." onClick={() => handleRecSelect('env', 'office')}/></div>
                </div>
              )}
              {recStep === 1 && (
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-bold text-center mb-8 text-slate-800">Anggaran Bajet Infrastruktur?</h2>
                  <div className="grid grid-cols-1 gap-5"><OptionCard icon={Activity} title="Ekonomi (Asas)" desc="Fokus kepada komponen 'Entry-Level' yang berfungsi stabil." onClick={() => handleRecSelect('budget', 'low')}/><OptionCard icon={Crown} title="Premium (Prestasi Tinggi)" desc="Sokongan Gigabit, VLAN, Wi-Fi 6, dan kabel pure copper." onClick={() => handleRecSelect('budget', 'high')}/></div>
                </div>
              )}
              {recLoading && (
                <div className="text-center py-16 flex flex-col items-center animate-fade-in">
                  <div className="relative w-20 h-20 mb-6"><div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div><div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div><Network className="absolute inset-0 m-auto text-indigo-600" size={24} /></div>
                  <h3 className="text-2xl font-bold text-slate-800">Sistem Menyediakan Cadangan...</h3><p className="text-slate-500 mt-2 font-medium">Memilih spesifikasi Suis, Router, dan Kabel yang serasi...</p>
                </div>
              )}
              {recStep === 4 && recResult && (
                <div className="animate-fade-in">
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-8 text-center shadow-sm"><h2 className="text-green-800 font-extrabold text-xl mb-1">Reka Bentuk Selesai!</h2><p className="text-green-700 font-medium">{recResult.title}</p></div>
                  <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 mb-8 relative shadow-sm"><div className="absolute -top-3 left-6 bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 font-bold uppercase tracking-wider"><Sparkles size={14}/> Rumusan Cadangan Rangkaian</div><p className="text-indigo-900 font-medium leading-relaxed pt-2">"{recResult.aiAnalysis}"</p></div>
                  <div className="bg-white border-2 border-slate-100 rounded-2xl p-6 mb-8 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-5 border-b-2 border-slate-100 pb-3">Perkakasan Disyorkan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-start gap-4"><div className="bg-indigo-50 p-2.5 rounded-xl text-indigo-600 shrink-0"><Router size={22} /></div><div><span className="font-bold block text-xs text-slate-400 uppercase tracking-wider mb-0.5">Penghala Utama (Router)</span><span className="text-slate-800 font-semibold">{recResult.specs.router}</span></div></div>
                      <div className="flex items-start gap-4"><div className="bg-indigo-50 p-2.5 rounded-xl text-indigo-600 shrink-0"><Server size={22} /></div><div><span className="font-bold block text-xs text-slate-400 uppercase tracking-wider mb-0.5">Suis Rangkaian (Switch)</span><span className="text-slate-800 font-semibold">{recResult.specs.switch}</span></div></div>
                      <div className="flex items-start gap-4"><div className="bg-indigo-50 p-2.5 rounded-xl text-indigo-600 shrink-0"><Cable size={22} /></div><div><span className="font-bold block text-xs text-slate-400 uppercase tracking-wider mb-0.5">Media Kabel (Cabling)</span><span className="text-slate-800 font-semibold">{recResult.specs.cable}</span></div></div>
                      <div className="flex items-start gap-4"><div className="bg-indigo-50 p-2.5 rounded-xl text-indigo-600 shrink-0"><Wifi size={22} /></div><div><span className="font-bold block text-xs text-slate-400 uppercase tracking-wider mb-0.5">Wayarles (Access Point)</span><span className="text-slate-800 font-semibold">{recResult.specs.ap}</span></div></div>
                    </div>
                  </div>
                  <div className="mb-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-5 gap-3"><h3 className="font-bold text-slate-800 flex items-center gap-2 text-lg"><Check className="text-green-500 bg-green-100 p-1 rounded-full" size={24}/> Contoh Jenama Model</h3></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {recResult.examples.map((item, idx) => (
                        <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className="group block p-5 rounded-2xl border-2 border-slate-100 bg-white hover:border-indigo-400 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                          <div className="flex justify-between items-start mb-3"><div className="bg-slate-50 p-2.5 rounded-xl text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors"><Box size={22}/></div><ExternalLink size={18} className="text-slate-300 group-hover:text-indigo-500 transition-colors"/></div>
                          <h4 className="font-bold text-slate-800 text-[15px] mb-3 group-hover:text-indigo-700 leading-snug">{item.name}</h4>
                          <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 group-hover:text-indigo-600 uppercase tracking-wide"><Search size={14} /> Carian Pasaran</span>
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button onClick={resetRecommender} className="flex-1 bg-indigo-700 text-white py-4 rounded-xl font-bold hover:bg-indigo-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"><RotateCcw size={20} /> Bina Rangkaian Lain</button>
                    <button onClick={exitRecommender} className="sm:w-auto w-full bg-slate-100 text-slate-600 py-4 px-6 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"><Home size={20} /> Menu Utama</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    };

  // ==========================================
  // RENDERER: MODUL NOTA
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

        <EnglishStudyGuide moduleCode="IKR3023" topicId={activeTopic?.id} />
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-4 text-center font-semibold transition-colors ${activeTab === 'basic' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('basic')}
          >
            <BookOpen size={18} className="inline mr-2" /> Teori Asas
          </button>
          <button
            className={`flex-1 py-4 text-center font-semibold transition-colors ${activeTab === 'advanced' ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('advanced')}
          >
            <Zap size={18} className="inline mr-2" /> Fakta Lanjutan
          </button>
        </div>

        <div className="p-8">
          {activeTab === 'basic' ? (
            <div className="space-y-6 animate-slide-up">
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

              {/* TOPIK 1: TOPOLOGI */}
              {activeTopic.id === 'topologi' && (
                <div className="space-y-8 mt-8">
                  <div className="p-4 sm:p-6 lg:p-8 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
                    <div className="text-center mb-8 relative z-10">
                      <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 font-bold text-xs mb-2 tracking-widest uppercase">Visualisasi Rangkaian</span>
                      <h4 className="font-bold text-white text-xl sm:text-2xl flex items-center justify-center gap-2">
                        <GitBranch className="text-blue-400" size={24}/> Bentuk Topologi Fizikal Terperinci
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
                      {topologyEnhancedData.map((topo, idx) => (
                        <div key={idx} className={`bg-slate-800 p-5 sm:p-6 rounded-2xl border border-slate-700 transition-all flex flex-col h-full relative overflow-hidden group hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] ${topo.borderColor}`}>
                          <div className="absolute -right-8 -top-8 opacity-5 transform group-hover:scale-110 group-hover:opacity-10 transition-all duration-500 pointer-events-none">{topo.bgIcon}</div>
                          <div className="flex items-center gap-4 mb-4 relative z-10">
                            <div className="p-3 bg-slate-900 rounded-xl shadow-inner border border-slate-700 shrink-0">{topo.icon}</div>
                            <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">{topo.name}</h3>
                          </div>
                          <div className="bg-slate-950/50 border border-slate-700/50 rounded-xl p-4 mb-5 flex justify-center items-center relative z-10 h-48 sm:h-56 group-hover:bg-slate-900 transition-colors">
                            <div className="w-40 h-40 sm:w-48 sm:h-48 transform group-hover:scale-105 transition-transform duration-300">{topo.diagram}</div>
                          </div>
                          <div className="mb-4 relative z-10 bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                            <h4 className="text-xs text-blue-300 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5"><Info size={14}/> Ciri-Ciri Utama</h4>
                            <ul className="text-sm text-slate-300 space-y-1.5">{topo.ciri.map((item, i) => (<li key={i} className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">•</span> {item}</li>))}</ul>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5 relative z-10 flex-grow">
                            <div className="bg-emerald-900/20 border border-emerald-800/40 p-3 sm:p-4 rounded-xl flex flex-col">
                                <h4 className="text-xs text-emerald-400 font-bold mb-3 flex items-center gap-1.5"><ThumbsUp size={14}/> Kelebihan</h4>
                                <ul className="text-xs text-emerald-100/80 space-y-2 flex-grow">{topo.pros.map((item, i) => (<li key={i} className="flex items-start gap-1.5"><Check size={12} className="text-emerald-500 shrink-0 mt-0.5"/> <span>{item}</span></li>))}</ul>
                            </div>
                            <div className="bg-red-900/20 border border-red-800/40 p-3 sm:p-4 rounded-xl flex flex-col">
                                <h4 className="text-xs text-red-400 font-bold mb-3 flex items-center gap-1.5"><ThumbsDown size={14}/> Kekurangan</h4>
                                <ul className="text-xs text-red-100/80 space-y-2 flex-grow">{topo.cons.map((item, i) => (<li key={i} className="flex items-start gap-1.5"><AlertTriangle size={12} className="text-red-500 shrink-0 mt-0.5"/> <span>{item}</span></li>))}</ul>
                            </div>
                          </div>
                          <div className="mt-auto bg-indigo-900/40 p-4 rounded-xl border border-indigo-800/50 relative z-10">
                            <h4 className="text-xs text-indigo-300 font-bold mb-2 flex items-center gap-1.5 uppercase tracking-wider"><Briefcase size={14}/> Contoh Aplikasi Semasa</h4>
                            <p className="text-sm text-indigo-100 leading-relaxed font-medium">{topo.aplikasi}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TOPIK 2: STRUKTUR PENGKABELAN */}
              {activeTopic.id === 'struktur' && (
                <div className="space-y-8 mt-8">
                  <div className="p-4 sm:p-6 lg:p-8 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
                    <div className="text-center mb-8 relative z-10">
                      <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs mb-2 tracking-widest uppercase">Susun Atur Standard</span>
                      <h4 className="font-bold text-white text-xl sm:text-2xl flex items-center justify-center gap-2">
                        <Layers className="text-emerald-400" size={24}/> Hirarki Pengkabelan Bangunan
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
                      {cablingStructureData.map((item, idx) => (
                        <div key={idx} className={`bg-slate-800 p-5 sm:p-6 rounded-2xl border border-slate-700 transition-all flex flex-col h-full relative overflow-hidden group hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] ${item.borderColor}`}>
                          <div className="absolute -right-8 -top-8 opacity-5 transform group-hover:scale-110 group-hover:opacity-10 transition-all duration-500 pointer-events-none">{item.bgIcon}</div>
                          <div className="flex items-center gap-4 mb-4 relative z-10">
                            <div className="p-3 bg-slate-900 rounded-xl shadow-inner border border-slate-700 shrink-0">{item.icon}</div>
                            <h3 className="text-lg font-bold text-white tracking-wide">{item.name}</h3>
                          </div>
                          <div className="bg-slate-950/50 border border-slate-700/50 rounded-xl p-4 mb-5 flex justify-center items-center relative z-10 h-48 sm:h-56 group-hover:bg-slate-900 transition-colors">
                            <div className="w-40 h-40 sm:w-48 sm:h-48 transform group-hover:scale-105 transition-transform duration-300">{item.diagram}</div>
                          </div>
                          <div className="mb-4 relative z-10 bg-slate-900/60 p-4 rounded-xl border border-slate-700/50 flex-grow"><p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p></div>
                          <div className="mb-5 relative z-10">
                            <h4 className="text-xs text-slate-400 font-bold mb-2 flex items-center gap-1.5 uppercase tracking-wider"><Settings size={14}/> Spesifikasi Teknikal</h4>
                            <div className="bg-slate-950 border border-slate-700/60 p-3 rounded-lg text-sm text-slate-300 font-medium border-l-4 border-l-slate-500 group-hover:border-l-current transition-colors">{item.spesifikasi}</div>
                          </div>
                          <div className="mt-auto bg-slate-700/30 p-4 rounded-xl border border-slate-600/50 relative z-10">
                            <h4 className="text-xs text-slate-400 font-bold mb-1.5 flex items-center gap-1.5 uppercase tracking-wider"><Briefcase size={14}/> Kegunaan / Aplikasi</h4>
                            <p className="text-sm text-slate-200 leading-relaxed">{item.aplikasi}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TOPIK 3: KABEL */}
              {activeTopic.id === 'kabel' && (
                <div className="space-y-8 mt-8">
                  {/* SEKSYEN 1: KABEL TEMBAGA */}
                  <div className="p-4 sm:p-6 lg:p-8 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
                    <div className="text-center mb-8 relative z-10">
                      <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 font-bold text-xs mb-2 tracking-widest uppercase">Media Tembaga (Copper)</span>
                      <h4 className="font-bold text-white text-2xl flex items-center justify-center gap-2">
                        <Plug className="text-blue-400" size={24}/> Jenis Kabel Data Tembaga
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                      {copperCablesData.map((kabel, idx) => (
                        <div key={idx} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-blue-500 transition-colors flex flex-col">
                          <div className="bg-slate-950 p-4 h-32 flex items-center justify-center border-b border-slate-700/50"><div className="w-full max-w-[160px]">{kabel.diagram}</div></div>
                          <div className="p-5 flex flex-col flex-grow">
                            <h5 className="font-bold text-white text-lg mb-3 flex items-center gap-2">{kabel.icon} {kabel.name}</h5>
                            <h6 className="text-xs text-blue-300 font-bold uppercase tracking-wider mb-2">Ciri-Ciri Utama:</h6>
                            <ul className="text-sm text-slate-300 space-y-1.5 mb-4 flex-grow">{kabel.ciri.map((item, i) => (<li key={i} className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span> {item}</li>))}</ul>
                            <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 mt-auto"><span className="block text-[10px] text-slate-500 uppercase font-bold mb-1">Aplikasi/Kegunaan</span><span className="text-xs text-slate-300">{kabel.kegunaan}</span></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SEKSYEN 2: KONFIGURASI WARNA & JENIS UTP */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
                    <div className="bg-slate-100 border-b border-slate-200 p-6 text-center">
                       <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-700 font-bold text-xs mb-2 tracking-widest uppercase">Konfigurasi RJ45</span>
                       <h4 className="font-bold text-slate-800 text-2xl flex items-center justify-center gap-2">
                         <ArrowRightLeft className="text-orange-500" size={24}/> Standard Susunan Kabel UTP
                       </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-200">
                        <h5 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                          <Settings size={20} className="text-slate-500"/> Kod Warna Standard
                        </h5>
                        <p className="text-sm text-slate-600 mb-5">Dua piawaian utama untuk menamatkan kabel UTP. <strong>T568B</strong> paling meluas digunakan secara komersial.</p>
                        
                        <div className="space-y-6">
                          {/* Visual T568A */}
                          <div>
                            <span className="text-xs font-bold text-slate-500 mb-2 block bg-slate-100 px-2 py-1 rounded w-fit">Standard T568A</span>
                            <div className="flex justify-center gap-1 sm:gap-2 mb-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                              <div className="w-6 h-12 sm:w-8 sm:h-16 bg-white border border-slate-300 flex flex-col rounded-sm shadow-sm"><div className="h-1/2 bg-green-500 rounded-t-sm"></div></div>
                              <div className="w-6 h-12 sm:w-8 sm:h-16 bg-green-500 border border-slate-300 rounded-sm shadow-sm"></div>
                              <div className="w-6 h-12 sm:w-8 sm:h-16 bg-white border border-slate-300 flex flex-col rounded-sm shadow-sm"><div className="h-1/2 bg-orange-500 rounded-t-sm"></div></div>
                              <div className="w-6 h-12 sm:w-8 sm:h-16 bg-blue-600 border border-slate-300 rounded-sm shadow-sm"></div>
                              <div className="w-6 h-12 sm:w-8 sm:h-16 bg-white border border-slate-300 flex flex-col rounded-sm shadow-sm"><div className="h-1/2 bg-blue-600 rounded-t-sm"></div></div>
                              <div className="w-6 h-12 sm:w-8 sm:h-16 bg-orange-500 border border-slate-300 rounded-sm shadow-sm"></div>
                              <div className="w-6 h-12 sm:w-8 sm:h-16 bg-white border border-slate-300 flex flex-col rounded-sm shadow-sm"><div className="h-1/2 bg-amber-800 rounded-t-sm"></div></div>
                              <div className="w-6 h-12 sm:w-8 sm:h-16 bg-amber-800 border border-slate-300 rounded-sm shadow-sm"></div>
                            </div>
                            <p className="text-[9px] sm:text-[10px] text-slate-500 text-center uppercase tracking-widest font-mono font-bold">
                              P-Hj | Hj | P-Or | Biru | P-Biru | Or | P-Ck | Ck
                            </p>
                          </div>

                          {/* Visual T568B */}
                          <div>
                            <span className="text-xs font-bold text-blue-600 mb-2 block bg-blue-50 px-2 py-1 rounded w-fit border border-blue-100">Standard T568B (Popular)</span>
                            <div className="flex justify-center gap-1 sm:gap-2 mb-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                              <div className="w-6 h-12 sm:w-8 sm:h-16 bg-white border border-slate-300 flex flex-col rounded-sm shadow-sm"><div className="h-1/2 bg-orange-500 rounded-t-sm"></div></div>
                              <div className="w-6 h-12 sm:w-8 sm:h-16 bg-orange-500 border border-slate-300 rounded-sm shadow-sm"></div>
                              <div className="w-6 h-12 sm:w-8 sm:h-16 bg-white border border-slate-300 flex flex-col rounded-sm shadow-sm"><div className="h-1/2 bg-green-500 rounded-t-sm"></div></div>
                              <div className="w-6 h-12 sm:w-8 sm:h-16 bg-blue-600 border border-slate-300 rounded-sm shadow-sm"></div>
                              <div className="w-6 h-12 sm:w-8 sm:h-16 bg-white border border-slate-300 flex flex-col rounded-sm shadow-sm"><div className="h-1/2 bg-blue-600 rounded-t-sm"></div></div>
                              <div className="w-6 h-12 sm:w-8 sm:h-16 bg-green-500 border border-slate-300 rounded-sm shadow-sm"></div>
                              <div className="w-6 h-12 sm:w-8 sm:h-16 bg-white border border-slate-300 flex flex-col rounded-sm shadow-sm"><div className="h-1/2 bg-amber-800 rounded-t-sm"></div></div>
                              <div className="w-6 h-12 sm:w-8 sm:h-16 bg-amber-800 border border-slate-300 rounded-sm shadow-sm"></div>
                            </div>
                            <p className="text-[9px] sm:text-[10px] text-slate-500 text-center uppercase tracking-widest font-mono font-bold">
                              P-Or | Or | P-Hj | Biru | P-Biru | Hj | P-Ck | Ck
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Straight vs Cross */}
                      <div className="p-6 md:p-8 flex flex-col justify-center">
                        <div className="space-y-5">
                          {/* Straight */}
                          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-100 rounded-bl-full -z-0"></div>
                            <h6 className="font-bold text-blue-800 text-lg mb-1 relative z-10">Straight-Through Cable</h6>
                            <p className="text-xs text-blue-600/80 font-bold mb-2 relative z-10">Hujung A (T568B) ━━━━ Hujung B (T568B)</p>
                            <p className="text-sm text-slate-700 relative z-10">Menyambungkan <strong>peranti yang berbeza jenis</strong>.</p>
                            <div className="mt-2 text-xs text-slate-600 font-medium flex items-center gap-2 relative z-10">
                              <span className="bg-white px-2 py-1 rounded border border-blue-100 shadow-sm">Komputer</span> 
                              <ArrowRightLeft size={12} className="text-blue-400"/>
                              <span className="bg-white px-2 py-1 rounded border border-blue-100 shadow-sm">Switch / Router</span>
                            </div>
                          </div>

                          {/* Crossover */}
                          <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-rose-100 rounded-bl-full -z-0"></div>
                            <h6 className="font-bold text-rose-800 text-lg mb-1 relative z-10">Crossover Cable</h6>
                            <p className="text-xs text-rose-600/80 font-bold mb-2 relative z-10">Hujung A (T568A) ━━━━ Hujung B (T568B)</p>
                            <p className="text-sm text-slate-700 relative z-10">Menyambungkan <strong>peranti yang sama jenis</strong> secara terus.</p>
                            <div className="mt-2 text-xs text-slate-600 font-medium flex items-center gap-2 relative z-10">
                              <span className="bg-white px-2 py-1 rounded border border-rose-100 shadow-sm">Switch</span> 
                              <ArrowRightLeft size={12} className="text-rose-400"/>
                              <span className="bg-white px-2 py-1 rounded border border-rose-100 shadow-sm">Switch</span>
                              <span className="text-slate-400 ml-1">(Atau PC ke PC)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SEKSYEN 3: INFOGRAFIK FIBER OPTIK */}
                  <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden text-white relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500 opacity-10 blur-[100px] pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 opacity-10 blur-[100px] pointer-events-none"></div>
                    
                    <div className="p-6 md:p-10 relative z-10">
                      <div className="text-center mb-10">
                        <span className="inline-block py-1 px-3 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-xs mb-2 tracking-widest uppercase">Media Kaca (Glass)</span>
                        <h4 className="font-bold text-white text-3xl flex items-center justify-center gap-3">
                          <Zap className="text-cyan-400" size={32}/> Infografik Fiber Optik
                        </h4>
                        <p className="text-slate-400 text-sm mt-3 max-w-2xl mx-auto">Fiber Optik menghantar data bukan melalui elektrik, tetapi melalui <strong>kelipan isyarat cahaya</strong> (Poton) yang melantun di dalam gentian kaca (Core) bersaiz rambut.</p>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Single Mode */}
                        <div className="bg-slate-900/80 border border-slate-700 p-6 rounded-2xl relative">
                          <div className="absolute top-0 right-0 bg-cyan-600 text-white text-[10px] font-black px-3 py-1 rounded-bl-lg rounded-tr-xl uppercase">Single Mode (SMF)</div>
                          <h5 className="text-xl font-bold text-cyan-300 mb-4">Fiber Mod Tunggal</h5>
                          
                          <div className="bg-black/50 rounded-xl p-4 mb-5 border border-slate-800">
                            <svg viewBox="0 0 300 60" className="w-full h-auto">
                              <rect x="0" y="10" width="300" height="40" fill="#334155" />
                              <text x="5" y="25" fill="#94a3b8" fontSize="10">Cladding</text>
                              <rect x="0" y="25" width="300" height="10" fill="#cbd5e1" />
                              <line x1="0" y1="30" x2="300" y2="30" stroke="#22d3ee" strokeWidth="2" strokeDasharray="10 5" className="animate-[dash_2s_linear_infinite]" />
                            </svg>
                          </div>

                          <ul className="space-y-3">
                            <li className="flex items-start gap-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                              <span className="text-cyan-400 font-bold shrink-0 w-24">Teras (Core):</span>
                              <span className="text-slate-300 text-sm">Sangat kecil (9 mikron).</span>
                            </li>
                            <li className="flex items-start gap-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                              <span className="text-cyan-400 font-bold shrink-0 w-24">Sumber Cahaya:</span>
                              <span className="text-slate-300 text-sm">Pancaran Laser tertumpu (Straight).</span>
                            </li>
                            <li className="flex items-start gap-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                              <span className="text-cyan-400 font-bold shrink-0 w-24">Jarak & Aplikasi:</span>
                              <span className="text-slate-300 text-sm">Jarak melampau jauh (rentas bandar/lautan). Digunakan oleh ISP (TM Unifi).</span>
                            </li>
                          </ul>
                        </div>

                        {/* Multimode */}
                        <div className="bg-slate-900/80 border border-slate-700 p-6 rounded-2xl relative">
                          <div className="absolute top-0 right-0 bg-purple-600 text-white text-[10px] font-black px-3 py-1 rounded-bl-lg rounded-tr-xl uppercase">Multi Mode (MMF)</div>
                          <h5 className="text-xl font-bold text-purple-300 mb-4">Fiber Pelbagai Mod</h5>
                          
                          <div className="bg-black/50 rounded-xl p-4 mb-5 border border-slate-800">
                            <svg viewBox="0 0 300 60" className="w-full h-auto">
                              <rect x="0" y="10" width="300" height="40" fill="#334155" />
                              <text x="5" y="25" fill="#94a3b8" fontSize="10">Cladding</text>
                              <rect x="0" y="15" width="300" height="30" fill="#cbd5e1" />
                              <polyline points="0,30 50,15 100,45 150,15 200,45 250,15 300,30" fill="none" stroke="#c084fc" strokeWidth="2" strokeDasharray="8 4" className="animate-[dash_3s_linear_infinite]" />
                              <polyline points="0,30 75,45 150,15 225,45 300,30" fill="none" stroke="#e879f9" strokeWidth="2" opacity="0.6" />
                            </svg>
                          </div>

                          <ul className="space-y-3">
                            <li className="flex items-start gap-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                              <span className="text-purple-400 font-bold shrink-0 w-24">Teras (Core):</span>
                              <span className="text-slate-300 text-sm">Lebih besar (50 / 62.5 mikron).</span>
                            </li>
                            <li className="flex items-start gap-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                              <span className="text-purple-400 font-bold shrink-0 w-24">Sumber Cahaya:</span>
                              <span className="text-slate-300 text-sm">Cahaya LED yang memantul (Zig-Zag).</span>
                            </li>
                            <li className="flex items-start gap-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                              <span className="text-purple-400 font-bold shrink-0 w-24">Jarak & Aplikasi:</span>
                              <span className="text-slate-300 text-sm">Jarak dekat (kurang dari 2km). Sesuai untuk Backbone LAN dalam kawasan kilang/kampus.</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="mt-8 bg-emerald-900/30 border border-emerald-800/50 p-5 rounded-xl text-center">
                        <h6 className="text-emerald-400 font-bold flex items-center justify-center gap-2 mb-2"><CheckCircle size={18}/> Mengapa Pilih Fiber Optik?</h6>
                        <p className="text-sm text-emerald-100">100% Kebal terhadap gangguan elektromagnetik (EMI), kapasiti jalur lebar (Bandwidth) yang tiada tandingan, dan tidak berisiko kilat kerana tiada pengalir arus elektrik.</p>
                      </div>

                    </div>
                  </div>
                </div>
              )}

              {/* TOPIK 4: KELAJUAN */}
              {activeTopic.id === 'kelajuan' && (
                <div className="space-y-8 mt-8">
                  {/* SEKSYEN 1: PIAWAIAN ASAS */}
                  <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl text-white">
                    <div className="text-center mb-6">
                      <span className="inline-block py-1 px-3 rounded-full bg-orange-500/20 text-orange-300 font-bold text-xs mb-2 tracking-widest uppercase">Evolusi Kelajuan</span>
                      <h4 className="font-bold text-orange-400 text-xl flex items-center justify-center gap-2"><Clock size={20}/> Piawaian Kelajuan Ethernet</h4>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                        <span className="font-bold text-slate-300 flex items-center gap-2"><Activity size={16} className="text-slate-500"/> 10Base-T (Legasi)</span>
                        <span className="bg-slate-800 px-3 py-1 rounded text-xs font-bold shadow-inner">10 Mbps (Cat3)</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                        <span className="font-bold text-slate-300 flex items-center gap-2"><Activity size={16} className="text-slate-400"/> 100Base-TX (Fast Ethernet)</span>
                        <span className="bg-slate-700 px-3 py-1 rounded text-xs font-bold shadow-inner">100 Mbps (Cat5)</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                        <span className="font-bold text-orange-300 flex items-center gap-2"><Gauge size={16}/> 1000Base-T (Gigabit)</span>
                        <span className="bg-orange-900/50 text-orange-300 border border-orange-500/30 px-3 py-1 rounded text-xs font-bold shadow-[0_0_10px_rgba(249,115,22,0.2)]">1 Gbps (Cat5e / Cat6)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-rose-300 flex items-center gap-2"><TrendingUp size={16}/> 10GBase-T (10 Gigabit)</span>
                        <span className="bg-rose-900/50 text-rose-300 border border-rose-500/30 px-3 py-1 rounded text-xs font-bold shadow-[0_0_10px_rgba(244,63,94,0.2)]">10 Gbps (Cat6A)</span>
                      </div>
                    </div>
                  </div>

                  {/* SEKSYEN 2: EVOLUSI KABEL UTP (INFOGRAFIK) */}
                  <div className="p-4 sm:p-6 lg:p-8 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
                    <div className="text-center mb-8 relative z-10">
                      <span className="inline-block py-1 px-3 rounded-full bg-slate-800 text-slate-300 font-bold text-xs mb-2 tracking-widest uppercase border border-slate-700">Perbandingan Generasi UTP</span>
                      <h4 className="font-bold text-white text-2xl flex items-center justify-center gap-2">
                        <TrendingUp className="text-orange-400" size={24}/> Evolusi Kabel UTP
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
                      {ethernetEvolutionData.map((item, idx) => (
                        <div key={idx} className={`bg-slate-800 p-5 rounded-2xl border border-slate-700 transition-all flex flex-col h-full relative group hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]`}>
                          
                          <div className={`p-4 rounded-xl mb-4 text-center border shadow-inner ${item.bgColor} ${item.borderColor}`}>
                             <div className="flex justify-center mb-2">{item.icon}</div>
                             <h3 className={`text-xl font-bold tracking-wide ${item.headerColor}`}>{item.category}</h3>
                             <div className="mt-2 inline-block bg-slate-950 px-3 py-1 rounded-md border border-slate-700">
                               <span className="text-white font-bold">{item.speed}</span> <span className="text-slate-400 text-xs">({item.freq})</span>
                             </div>
                          </div>
                          
                          {/* Kelebihan & Kekurangan */}
                          <div className="grid grid-cols-1 gap-3 mb-4 flex-grow">
                            <div className="bg-emerald-900/10 border border-emerald-800/30 p-3 rounded-xl flex flex-col">
                                <h4 className="text-[11px] text-emerald-400 font-bold mb-2 flex items-center gap-1.5 uppercase tracking-wider"><ThumbsUp size={12}/> Kelebihan</h4>
                                <ul className="text-sm text-emerald-100/80 space-y-1.5 flex-grow">
                                  {item.pros.map((pro, i) => (
                                    <li key={i} className="flex items-start gap-1.5">
                                      <Check size={14} className="text-emerald-500 shrink-0 mt-0.5"/> <span>{pro}</span>
                                    </li>
                                  ))}
                                </ul>
                            </div>
                            <div className="bg-red-900/10 border border-red-800/30 p-3 rounded-xl flex flex-col">
                                <h4 className="text-[11px] text-red-400 font-bold mb-2 flex items-center gap-1.5 uppercase tracking-wider"><ThumbsDown size={12}/> Kekurangan</h4>
                                <ul className="text-sm text-red-100/80 space-y-1.5 flex-grow">
                                  {item.cons.map((con, i) => (
                                    <li key={i} className="flex items-start gap-1.5">
                                      <AlertTriangle size={14} className="text-red-500 shrink-0 mt-0.5"/> <span>{con}</span>
                                    </li>
                                  ))}
                                </ul>
                            </div>
                          </div>

                          {/* Contoh Aplikasi */}
                          <div className="mt-auto bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                            <h4 className="text-[11px] text-slate-400 font-bold mb-1.5 flex items-center gap-1.5 uppercase tracking-wider"><Briefcase size={12}/> Aplikasi Penggunaan</h4>
                            <p className="text-sm text-slate-200 leading-relaxed font-medium">{item.aplikasi}</p>
                          </div>

                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TOPIK 5: ALATAN */}
              {activeTopic.id === 'alatan' && (
                <div className="space-y-8 mt-8">
                  <div className="p-4 sm:p-6 lg:p-8 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
                    <div className="text-center mb-10 relative z-10">
                      <span className="inline-block py-1 px-3 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs mb-2 tracking-widest uppercase">Peralatan Juruteknik</span>
                      <h4 className="font-bold text-white text-2xl sm:text-3xl flex items-center justify-center gap-2">
                        <Wrench className="text-amber-400" size={32}/> Alatan Pemasangan Rangkaian
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
                      {toolsData.map((tool, idx) => (
                        <div key={idx} className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden flex flex-col hover:border-slate-500 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all group">
                          
                          {/* Foto sebenar digunakan apabila pengajar menambah fail. Jika tiada, papar rajah asal. */}
                          <div className="bg-slate-950 h-48 sm:h-56 flex items-center justify-center relative overflow-hidden border-b border-slate-700/50">
                            {(() => {
                              const photoEntry = Object.entries(toolPhotoFiles).find(([path]) => new RegExp(`/` + toolPhotoNames[idx] + `[.](jpg|jpeg|png|webp)$`, 'i').test(path));
                              return photoEntry ? (
                                <figure className="w-full h-full relative bg-white">
                                  <img src={photoEntry[1]} alt={`Foto sebenar ${tool.name}`} loading="lazy" className="w-full h-full object-contain"/>
                                  <figcaption className="absolute bottom-2 left-2 bg-slate-950/80 text-white text-[10px] font-bold rounded-md px-2 py-1">Foto alatan sebenar</figcaption>
                                </figure>
                              ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center p-5">
                                  <div className="w-28 h-28 sm:w-36 sm:h-36 group-hover:scale-110 transition-transform duration-300">{tool.diagram}</div>
                                  <span className="text-slate-400 text-[10px] mt-2">Rajah alat • foto sebenar boleh ditambah</span>
                                </div>
                              );
                            })()}
                          </div>
                          
                          {/* Tool Details Body */}
                          <div className="p-5 sm:p-6 flex flex-col flex-grow bg-gradient-to-b from-slate-800 to-slate-900">
                            <div className="flex items-center gap-3 mb-4">
                              <div className={`p-2 rounded-lg bg-${tool.color}-900/30 border border-${tool.color}-500/30 shrink-0`}>
                                {tool.icon}
                              </div>
                              <h3 className="text-xl font-bold text-white leading-tight">{tool.name}</h3>
                            </div>
                            
                            <div className={`bg-${tool.color}-900/10 border-l-4 border-${tool.color}-500 p-3 rounded-r-lg mb-4`}>
                              <h4 className={`text-[10px] font-bold uppercase tracking-wider text-${tool.color}-400 mb-1`}>Fungsi Utama</h4>
                              <p className="text-sm text-slate-300 font-medium leading-relaxed">{tool.fungsi}</p>
                            </div>
                            
                            <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3 mb-4 text-xs text-amber-100 leading-relaxed">
                              <strong className="block text-amber-300 mb-1">Cara Guna (Ringkas)</strong>
                              {practicalToolNotes[idx].use}
                              <strong className="block text-amber-300 mt-2 mb-1">Amalan Selamat</strong>
                              {practicalToolNotes[idx].safety}
                            </div>
                            <div className="mt-auto">
                              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 border-b border-slate-700 pb-1"><Info size={12} className="inline mr-1"/>Ciri-ciri Fizikal</h4>
                              <ul className="space-y-2">
                                {tool.ciri.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                                    <CheckCircle size={14} className={`text-${tool.color}-500 shrink-0 mt-0.5 opacity-70`}/>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TOPIK 6: PERALATAN & PENGUJIAN (INFOGRAFIK RAK SERVER) */}
              {activeTopic.id === 'peralatan' && (
                <div className="space-y-8 mt-8">
                  <div className="p-4 sm:p-6 lg:p-8 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
                    {/* Header */}
                    <div className="text-center mb-10 relative z-10">
                      <span className="inline-block py-1 px-3 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-xs mb-2 tracking-widest uppercase">Pusat Kawalan Rangkaian</span>
                      <h4 className="font-bold text-white text-2xl sm:text-3xl flex items-center justify-center gap-2">
                        <Server className="text-cyan-400" size={32}/> Infrastruktur Rak Server
                      </h4>
                      <p className="text-slate-400 text-sm mt-3 max-w-2xl mx-auto">Rak pelayan (Server Rack) bersaiz standard 19-inci adalah nadi kepada mana-mana infrastruktur IT. Susunan yang sistematik memudahkan pengurusan, penyejukan, dan keselamatan perkakasan.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                      {/* SVG Rack Diagram */}
                      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center shadow-inner relative group overflow-hidden">
                         <div className="absolute inset-0 bg-cyan-500/5 blur-[100px] pointer-events-none"></div>
                         <h5 className="text-cyan-300 font-bold mb-6 flex items-center gap-2 relative z-10"><Layers size={20}/> Susunan Standard Industri (Top to Bottom)</h5>
                         
                         <div className="w-full max-w-[250px] relative z-10 transform group-hover:scale-105 transition-transform duration-500">
                           <svg viewBox="0 0 200 280" className="w-full h-auto drop-shadow-2xl">
                              {/* Rack Frame */}
                              <rect x="30" y="10" width="140" height="260" fill="#1e293b" stroke="#475569" strokeWidth="4" rx="4"/>
                              <rect x="40" y="20" width="120" height="240" fill="#0f172a"/>
                              
                              {/* Top: Patch Panel (Blue) */}
                              <rect x="45" y="30" width="110" height="15" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1" rx="1"/>
                              <circle cx="55" cy="37.5" r="2" fill="#93c5fd"/><circle cx="65" cy="37.5" r="2" fill="#93c5fd"/><circle cx="75" cy="37.5" r="2" fill="#93c5fd"/><circle cx="85" cy="37.5" r="2" fill="#93c5fd"/>
                              <circle cx="115" cy="37.5" r="2" fill="#93c5fd"/><circle cx="125" cy="37.5" r="2" fill="#93c5fd"/><circle cx="135" cy="37.5" r="2" fill="#93c5fd"/><circle cx="145" cy="37.5" r="2" fill="#93c5fd"/>
                              <text x="25" y="40" fill="#3b82f6" fontSize="10" fontWeight="bold" textAnchor="end">1</text>
                              
                              {/* Cable Manager (Dark Slate) */}
                              <rect x="45" y="50" width="110" height="10" fill="#334155" rx="1"/>
                              <line x1="50" y1="55" x2="150" y2="55" stroke="#0f172a" strokeWidth="2" strokeDasharray="4 2"/>
                              
                              {/* Top Mid: Network Switch (Green) */}
                              <rect x="45" y="65" width="110" height="20" fill="#064e3b" stroke="#10b981" strokeWidth="1" rx="1"/>
                              <rect x="52" y="70" width="8" height="10" fill="#022c22"/><rect x="64" y="70" width="8" height="10" fill="#022c22"/><rect x="76" y="70" width="8" height="10" fill="#022c22"/><rect x="88" y="70" width="8" height="10" fill="#022c22"/>
                              <rect x="114" y="70" width="8" height="10" fill="#022c22"/><rect x="126" y="70" width="8" height="10" fill="#022c22"/><rect x="138" y="70" width="8" height="10" fill="#022c22"/>
                              <circle cx="145" cy="72" r="1.5" fill="#34d399"/><circle cx="145" cy="78" r="1.5" fill="#34d399"/>
                              <text x="25" y="80" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="end">2</text>

                              {/* Empty space / Future expansion */}
                              <rect x="45" y="90" width="110" height="40" fill="#1e293b" opacity="0.5"/>
                              
                              {/* Bottom Mid: Server / Router (Purple) */}
                              <rect x="45" y="135" width="110" height="30" fill="#4a044e" stroke="#8b5cf6" strokeWidth="1" rx="1"/>
                              <rect x="50" y="145" width="40" height="10" fill="#2e1065" rx="1"/><rect x="135" y="145" width="15" height="10" fill="#2e1065" rx="1"/>
                              <circle cx="120" cy="150" r="3" fill="#a78bfa"/>
                              <text x="25" y="155" fill="#8b5cf6" fontSize="10" fontWeight="bold" textAnchor="end">3</text>

                              {/* Empty space */}
                              <rect x="45" y="170" width="110" height="30" fill="#1e293b" opacity="0.5"/>

                              {/* Bottom: UPS Battery (Orange/Yellow) */}
                              <rect x="45" y="205" width="110" height="45" fill="#78350f" stroke="#f59e0b" strokeWidth="1" rx="1"/>
                              <rect x="55" y="215" width="60" height="25" fill="#451a03" rx="1"/>
                              <circle cx="130" cy="227" r="6" fill="#f59e0b" opacity="0.8"/><circle cx="130" cy="227" r="2" fill="#fff"/>
                              <text x="25" y="233" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="end">4</text>
                              
                              {/* Vertical Mount rails */}
                              <line x1="42" y1="25" x2="42" y2="255" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 3" opacity="0.5"/>
                              <line x1="158" y1="25" x2="158" y2="255" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 3" opacity="0.5"/>
                           </svg>
                         </div>
                      </div>

                      {/* Explanation of the layout */}
                      <div className="flex flex-col justify-center space-y-4">
                        <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 hover:border-cyan-500/50 hover:-translate-x-1 transition-all group shadow-sm">
                          <h6 className="font-bold text-cyan-400 flex items-center gap-3 mb-2">
                            <span className="bg-cyan-900/80 text-cyan-300 w-7 h-7 rounded-md flex items-center justify-center text-sm font-black shadow-inner border border-cyan-500/30 group-hover:bg-cyan-500 group-hover:text-white transition-colors">1</span> 
                            Atas: Patch Panel & Pengurusan Kabel
                          </h6>
                          <p className="text-sm text-slate-300 leading-relaxed pl-10">Ditempatkan di posisi paling atas kerana ratusan kabel utama dari siling (Horizontal Cabling) akan diturunkan dan ditamatkan di sini terlebih dahulu sebelum dihubungkan ke Suis.</p>
                        </div>

                        <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 hover:border-emerald-500/50 hover:-translate-x-1 transition-all group shadow-sm">
                          <h6 className="font-bold text-emerald-400 flex items-center gap-3 mb-2">
                            <span className="bg-emerald-900/80 text-emerald-300 w-7 h-7 rounded-md flex items-center justify-center text-sm font-black shadow-inner border border-emerald-500/30 group-hover:bg-emerald-500 group-hover:text-white transition-colors">2</span> 
                            Tengah Atas: Suis Rangkaian (Switch)
                          </h6>
                          <p className="text-sm text-slate-300 leading-relaxed pl-10">Suis diletakkan rapat di bawah Patch Panel supaya wayar fleksibel (Patch Cord) yang pendek (0.5m - 1m) dapat disambungkan dengan kemas tanpa berselirat.</p>
                        </div>

                        <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 hover:border-purple-500/50 hover:-translate-x-1 transition-all group shadow-sm">
                          <h6 className="font-bold text-purple-400 flex items-center gap-3 mb-2">
                            <span className="bg-purple-900/80 text-purple-300 w-7 h-7 rounded-md flex items-center justify-center text-sm font-black shadow-inner border border-purple-500/30 group-hover:bg-purple-500 group-hover:text-white transition-colors">3</span> 
                            Tengah Bawah: Pelayan (Server) & Router
                          </h6>
                          <p className="text-sm text-slate-300 leading-relaxed pl-10">Menempatkan penghala (Router) utama, Firewall, dan komputer Pelayan. Ruang ini berada pada jarak yang selamat dari haba terkumpul di bahagian paling atas rak.</p>
                        </div>

                        <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 hover:border-amber-500/50 hover:-translate-x-1 transition-all group shadow-sm">
                          <h6 className="font-bold text-amber-400 flex items-center gap-3 mb-2">
                            <span className="bg-amber-900/80 text-amber-300 w-7 h-7 rounded-md flex items-center justify-center text-sm font-black shadow-inner border border-amber-500/30 group-hover:bg-amber-500 group-hover:text-white transition-colors">4</span> 
                            Bawah: UPS & Bateri
                          </h6>
                          <p className="text-sm text-slate-300 leading-relaxed pl-10">Unit Bekalan Kuasa Tanpa Gangguan (UPS). Wajib diletakkan paling bawah kerana <strong>berat baterinya melampau</strong>. Ini memberikan kestabilan fizikal (pusat graviti rendah) agar rak tidak tumbang.</p>
                        </div>
                      </div>
                    </div>

                    {/* Foto sebenar peralatan utama */}
                    <div className="mt-10 bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500 opacity-5 blur-[100px] pointer-events-none"></div>
                      <div className="text-center mb-8 relative z-10">
                        <span className="inline-block py-1 px-3 rounded-full bg-cyan-900/40 text-cyan-300 font-bold text-[10px] mb-2 tracking-widest uppercase border border-cyan-500/30">Lihat Peralatan Sebenar</span>
                        <h4 className="font-bold text-white text-xl sm:text-2xl flex items-center justify-center gap-2"><MonitorSpeaker className="text-cyan-400"/> Foto Peralatan Utama Rak Server</h4>
                        <p className="text-slate-400 text-sm mt-2 max-w-3xl mx-auto">Bahagian ini membantu pelajar mengenal rupa sebenar peralatan rangkaian. Gunakan foto bersama penerangan fungsi supaya pelajar dapat mengaitkan teori dengan amali di bengkel.</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
                        {equipmentGallery.map((item) => {
                          const photoKey = `./assets/equipment-photos/${item.key}.webp`;
                          const photoSrc = equipmentPhotoFiles[photoKey];
                          return (
                            <div key={item.key} className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-lg hover:border-cyan-500/40 transition-all">
                              <div className="bg-white/95 p-4 h-48 flex items-center justify-center border-b border-slate-700/50">
                                {photoSrc ? (
                                  <img src={photoSrc} alt={item.title} className="max-h-full max-w-full object-contain" loading="lazy" />
                                ) : (
                                  <div className="text-center text-slate-500 text-sm px-4">Foto belum dimasukkan</div>
                                )}
                              </div>
                              <div className="p-5 space-y-3 bg-gradient-to-b from-slate-800 to-slate-900">
                                <h5 className="font-bold text-white text-lg">{item.title}</h5>
                                <p className="text-sm text-slate-300 leading-relaxed"><strong>Fungsi:</strong> {item.role}</p>
                                <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-3">
                                  <p className="text-sm text-cyan-100 leading-relaxed"><strong>Fokus pelajar:</strong> {item.tip}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Patch Panel Deep Dive */}
                    <div className="mt-10 bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 opacity-5 blur-[100px] pointer-events-none"></div>
                       
                       <div className="text-center mb-8 relative z-10">
                          <span className="inline-block py-1 px-3 rounded-full bg-emerald-900/40 text-emerald-400 font-bold text-[10px] mb-2 tracking-widest uppercase border border-emerald-500/30">Kenapa Ia Penting?</span>
                          <h4 className="font-bold text-white text-xl sm:text-2xl flex items-center justify-center gap-2"><ArrowRightLeft className="text-emerald-400"/> Memahami Fungsi Patch Panel</h4>
                          <p className="text-slate-400 text-sm mt-2">Mengapa kita tidak menyambungkan kabel lurus (direct) terus dari dinding pejabat ke dalam Suis?</p>
                       </div>
                       
                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
                          {/* Visual Patch Panel -> Cord -> Switch */}
                          <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-700 shadow-inner flex flex-col items-center">
                            <svg viewBox="0 0 300 200" className="w-full max-w-[280px] h-auto drop-shadow-lg">
                               {/* Heavy cables coming from top */}
                               <path d="M 50 10 C 50 40 80 50 80 70" fill="none" stroke="#64748b" strokeWidth="6" strokeLinecap="round"/>
                               <path d="M 100 10 C 100 40 100 50 100 70" fill="none" stroke="#64748b" strokeWidth="6" strokeLinecap="round"/>
                               <path d="M 150 10 C 150 40 120 50 120 70" fill="none" stroke="#64748b" strokeWidth="6" strokeLinecap="round"/>
                               <text x="200" y="25" fill="#94a3b8" fontSize="12" fontWeight="bold">Kabel Keras dari Dinding</text>

                               {/* Patch Panel */}
                               <rect x="40" y="70" width="220" height="30" rx="3" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2"/>
                               <text x="265" y="88" fill="#60a5fa" fontSize="10" fontWeight="bold">Patch Panel</text>
                               <circle cx="80" cy="85" r="4" fill="#1e293b"/><circle cx="100" cy="85" r="4" fill="#1e293b"/><circle cx="120" cy="85" r="4" fill="#1e293b"/>
                               
                               {/* Flexible Patch Cords */}
                               <path d="M 80 100 C 80 120 120 120 120 140" fill="none" stroke="#34d399" strokeWidth="4" strokeLinecap="round" strokeDasharray="6 2" className="animate-[dash_1s_linear_infinite]"/>
                               <path d="M 100 100 C 100 120 100 120 100 140" fill="none" stroke="#34d399" strokeWidth="4" strokeLinecap="round" strokeDasharray="6 2" className="animate-[dash_1s_linear_infinite]"/>
                               <path d="M 120 100 C 120 120 80 120 80 140" fill="none" stroke="#34d399" strokeWidth="4" strokeLinecap="round" strokeDasharray="6 2" className="animate-[dash_1s_linear_infinite]"/>
                               <text x="200" y="125" fill="#34d399" fontSize="12" fontWeight="bold">Patch Cord Fleksibel</text>

                               {/* Switch */}
                               <rect x="40" y="140" width="220" height="40" rx="3" fill="#064e3b" stroke="#10b981" strokeWidth="2"/>
                               <text x="265" y="165" fill="#34d399" fontSize="10" fontWeight="bold">Network Switch</text>
                               <rect x="75" y="150" width="10" height="15" fill="#022c22" rx="1"/><rect x="95" y="150" width="10" height="15" fill="#022c22" rx="1"/><rect x="115" y="150" width="10" height="15" fill="#022c22" rx="1"/>
                            </svg>
                          </div>

                          <div className="space-y-4">
                            <div className="bg-slate-800/80 border-l-4 border-emerald-500 p-4 rounded-r-xl hover:bg-slate-800 transition-colors shadow-sm">
                              <h6 className="font-bold text-emerald-400 text-sm mb-1.5 flex items-center gap-2"><ShieldCheck size={16}/> Mencegah Kerosakan Port Suis</h6>
                              <p className="text-sm text-slate-300 leading-relaxed">Kabel panjang dari dalam dinding adalah jenis 'Solid Copper' (keras). Jika ditarik terus ke Switch, berat dan pergerakan kabel boleh merosakkan (mematahkan) port Switch yang sangat mahal harganya.</p>
                            </div>
                            <div className="bg-slate-800/80 border-l-4 border-blue-500 p-4 rounded-r-xl hover:bg-slate-800 transition-colors shadow-sm">
                              <h6 className="font-bold text-blue-400 text-sm mb-1.5 flex items-center gap-2"><ArrowRightLeft size={16}/> Fleksibiliti Penyelenggaraan</h6>
                              <p className="text-sm text-slate-300 leading-relaxed">Kabel dinding ditamatkan kekal di belakang Panel. Sebarang pertukaran pautan (tukar bilik/pekerja) hanya perlu mencabut kabel pendek 'Patch Cord' di hadapan Panel tanpa menyentuh pendawaian asal.</p>
                            </div>
                            <div className="bg-slate-800/80 border-l-4 border-purple-500 p-4 rounded-r-xl hover:bg-slate-800 transition-colors shadow-sm">
                              <h6 className="font-bold text-purple-400 text-sm mb-1.5 flex items-center gap-2"><Settings size={16}/> Sistem Pelabelan (Labelling) Teratur</h6>
                              <p className="text-sm text-slate-300 leading-relaxed">Setiap lubang (port) pada Patch Panel dilabelkan nombornya (Cth: Port 24) supaya sepadan (match) dengan nombor soket dinding di meja pekerja. Ini amat pantas untuk mengesan masalah (Troubleshooting).</p>
                            </div>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TOPIK 7: BAHAN (DIKEMASKINI DENGAN INFOGRAFIK) */}
              {activeTopic.id === 'bahan' && (
                 <div className="space-y-8 mt-8">
                   <div className="p-4 sm:p-6 lg:p-8 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
                     <div className="text-center mb-10 relative z-10">
                       <span className="inline-block py-1 px-3 rounded-full bg-rose-500/20 text-rose-300 font-bold text-xs mb-2 tracking-widest uppercase">Pemasangan Akhir</span>
                       <h4 className="font-bold text-white text-2xl sm:text-3xl flex items-center justify-center gap-2">
                         <Settings className="text-rose-400" size={32}/> Komponen & Pengurusan Kabel
                       </h4>
                       <p className="text-slate-400 text-sm mt-3 max-w-2xl mx-auto">Kenali aksesori fizikal yang melengkapkan pemasangan rangkaian di kawasan ruang kerja pengguna untuk memastikan kekemasan dan keselamatan kabel.</p>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                       {componentsData.map((item, idx) => (
                         <div key={idx} className={`bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden flex flex-col hover:border-${item.color}-500 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all group`}>
                           
                           {/* Graphic Header */}
                           <div className="bg-slate-950 p-6 h-48 flex items-center justify-center relative overflow-hidden border-b border-slate-700/50">
                             <div className={`absolute inset-0 opacity-10 bg-${item.color}-500 blur-3xl rounded-full transform group-hover:scale-110 transition-transform duration-500`}></div>
                             <div className="w-32 h-32 relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                               {item.diagram}
                             </div>
                           </div>
                           
                           {/* Details Body */}
                           <div className="p-5 sm:p-6 flex flex-col flex-grow bg-gradient-to-b from-slate-800 to-slate-900">
                             <div className="flex items-center gap-3 mb-4">
                               <div className={`p-2 rounded-lg bg-${item.color}-900/30 border border-${item.color}-500/30 shrink-0`}>
                                 {item.icon}
                               </div>
                               <h3 className="text-xl font-bold text-white leading-tight">{item.name}</h3>
                             </div>
                             
                             <div className={`bg-${item.color}-900/10 border-l-4 border-${item.color}-500 p-3 rounded-r-lg mb-4`}>
                               <h4 className={`text-[10px] font-bold uppercase tracking-wider text-${item.color}-400 mb-1`}>Fungsi Utama</h4>
                               <p className="text-sm text-slate-300 font-medium leading-relaxed">{item.fungsi}</p>
                             </div>
                             
                             <div className="mt-auto">
                               <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 border-b border-slate-700 pb-1"><Info size={12} className="inline mr-1"/>Ciri-ciri & Aplikasi</h4>
                               <ul className="space-y-2">
                                 {item.ciri.map((c, i) => (
                                   <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                                     <CheckCircle size={14} className={`text-${item.color}-500 shrink-0 mt-0.5 opacity-70`}/>
                                     <span>{c}</span>
                                   </li>
                                 ))}
                               </ul>
                             </div>
                           </div>

                         </div>
                       ))}
                     </div>
                   </div>
                 </div>
              )}

              {/* TOPIK 8: PROSEDUR PENAMATAN (MODUL BAHARU) */}
              {activeTopic.id === 'prosedur' && (
                <div className="space-y-8 mt-8">
                  {/* HEADER PROSEDUR */}
                  <div className="p-6 sm:p-8 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden text-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 opacity-10 blur-[100px] pointer-events-none"></div>
                    <div className="relative z-10">
                      <span className="inline-block py-1 px-3 rounded-full bg-teal-500/20 text-teal-300 font-bold text-xs mb-3 tracking-widest uppercase">Tatacara (SOP) Industri</span>
                      <h4 className="font-bold text-white text-3xl sm:text-4xl flex items-center justify-center gap-3">
                        <ListOrdered className="text-teal-400" size={36}/> Infografik Prosedur Penamatan
                      </h4>
                      <p className="text-slate-400 text-sm sm:text-base mt-4 max-w-2xl mx-auto">Ikuti langkah-langkah standard bagi mengelakkan kerosakan isyarat. Pemasangan yang kemas adalah kunci kepada kelajuan rangkaian gigabit.</p>
                    </div>
                  </div>

                  {/* 1. PROSEDUR RJ45 */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden relative">
                    <div className="bg-slate-100 border-b border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                       <div className="flex items-center gap-4">
                         <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><Plug size={28}/></div>
                         <div>
                           <h4 className="font-bold text-slate-800 text-xl">1. Penamatan Kepala RJ45</h4>
                           <p className="text-sm text-slate-500 font-medium">Langkah membuat kabel penyambung (Patch Cord).</p>
                         </div>
                       </div>
                       <a href="https://www.youtube.com/results?search_query=cara+crimping+kabel+lan+rj45" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-red-100 text-red-600 px-4 py-2.5 rounded-xl hover:bg-red-200 transition-colors font-bold text-sm shadow-sm border border-red-200">
                         <PlayCircle size={18}/> Tonton Tutorial
                       </a>
                    </div>
                    
                    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {terminationSteps.rj45.map((step, idx) => (
                         <div key={idx} className="bg-white border-2 border-slate-100 rounded-xl p-5 hover:border-blue-300 transition-colors relative group shadow-sm hover:shadow-md flex flex-col">
                           <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue-600 text-white font-black rounded-full flex items-center justify-center shadow-lg border-4 border-white group-hover:scale-110 transition-transform z-10">
                             {step.step}
                           </div>

                           <h5 className="font-bold text-slate-800 text-lg mb-2 mt-4 group-hover:text-blue-600 transition-colors">{step.title}</h5>
                           <p className="text-sm text-slate-600 leading-relaxed flex-grow">{step.desc}</p>
                           
                           {/* Garis hiasan untuk skrin besar */}
                           {idx < terminationSteps.rj45.length - 1 && (
                             <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-slate-200"></div>
                           )}
                         </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* 2. PROSEDUR PATCH PANEL */}
                    <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden relative flex flex-col">
                      <div className="bg-slate-950 border-b border-slate-800 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                         <div className="flex items-center gap-4">
                           <div className="p-3 bg-emerald-900/50 text-emerald-400 rounded-xl border border-emerald-500/30"><Layers size={28}/></div>
                           <div>
                             <h4 className="font-bold text-white text-xl">2. Penamatan Patch Panel</h4>
                             <p className="text-sm text-slate-400 font-medium">Bilik Pelayan (Server Room)</p>
                           </div>
                         </div>
                         <a href="https://www.youtube.com/results?search_query=cara+punch+down+patch+panel" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-red-900/40 text-red-400 px-4 py-2 rounded-xl hover:bg-red-800/60 transition-colors font-bold text-sm shadow-sm border border-red-500/30">
                           <PlayCircle size={18}/> Tutorial
                         </a>
                      </div>

                      <div className="p-6 flex-grow flex flex-col">
                        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 mb-6 flex justify-center shadow-inner">
                          {/* SVG Patch Panel Punch Down action */}
                          <svg viewBox="0 0 200 120" className="w-full max-w-[200px] text-emerald-500">
                             <rect x="20" y="80" width="160" height="30" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="2"/>
                             <rect x="90" y="70" width="20" height="15" fill="#334155"/> {/* IDC Block */}
                             <path d="M 60 50 C 70 50 85 60 90 75" fill="none" stroke="#fbbf24" strokeWidth="4"/> {/* Wire */}
                             <rect x="95" y="10" width="10" height="60" fill="#cbd5e1"/> {/* Punch tool blade */}
                             <path d="M 105 70 L 115 75" stroke="#ef4444" strokeWidth="2"/> {/* Cut wire piece falling */}
                             <rect x="90" y="0" width="20" height="20" fill="currentColor" rx="2"/> {/* Punch tool handle bottom */}
                          </svg>
                        </div>
                        
                        <div className="space-y-6 flex-grow">
                          {terminationSteps.patchPanel.map((step, idx) => (
                            <div key={idx} className="flex gap-4 items-start bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 hover:border-emerald-500/30 transition-colors">
                              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-sm shrink-0">
                                {step.step}
                              </div>
                              <div className="flex-grow">
                                <h5 className="font-bold text-emerald-300 text-sm mb-1">{step.title}</h5>
                                <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-6 bg-red-900/20 border border-red-800/50 p-4 rounded-xl flex gap-3 items-start">
                          <AlertTriangle className="text-red-400 shrink-0" size={20}/>
                          <p className="text-[11px] text-red-200"><strong>Amaran:</strong> Pastikan sisi 'Gunting' pada bilah Punch Down menghala ke arah luar panel supaya wayar lebihan terpotong dan tidak mengakibatkan litar pintas (short circuit).</p>
                        </div>
                      </div>
                    </div>

                    {/* 3. PROSEDUR MODULAR JACK */}
                    <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden relative flex flex-col">
                      <div className="bg-slate-950 border-b border-slate-800 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                         <div className="flex items-center gap-4">
                           <div className="p-3 bg-purple-900/50 text-purple-400 rounded-xl border border-purple-500/30"><Monitor size={28}/></div>
                           <div>
                             <h4 className="font-bold text-white text-xl">3. Penamatan Modular Jack</h4>
                             <p className="text-sm text-slate-400 font-medium">Faceplate Dinding</p>
                           </div>
                         </div>
                         <a href="https://www.youtube.com/results?search_query=cara+pasang+modular+jack+rj45+wallplate" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-red-900/40 text-red-400 px-4 py-2 rounded-xl hover:bg-red-800/60 transition-colors font-bold text-sm shadow-sm border border-red-500/30">
                           <PlayCircle size={18}/> Tutorial
                         </a>
                      </div>

                      <div className="p-6 flex-grow flex flex-col">
                        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 mb-6 flex justify-center shadow-inner">
                          {/* SVG Modular Jack action */}
                          <svg viewBox="0 0 200 120" className="w-full max-w-[200px] text-purple-500">
                             <rect x="70" y="60" width="60" height="40" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="2"/> {/* Jack body */}
                             <rect x="65" y="70" width="10" height="20" fill="#334155"/> {/* Side IDC slots */}
                             <path d="M 40 40 C 40 70 50 80 65 80" fill="none" stroke="#60a5fa" strokeWidth="4"/> {/* Wire entering side */}
                             <path d="M 100 10 L 100 50 L 70 65" fill="none" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round"/> {/* Punch Tool */}
                             <circle cx="100" cy="10" r="10" fill="currentColor"/> {/* Punch handle */}
                          </svg>
                        </div>
                        
                        <div className="space-y-6 flex-grow">
                          {terminationSteps.modularJack.map((step, idx) => (
                            <div key={idx} className="flex gap-4 items-start bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 hover:border-purple-500/30 transition-colors">
                              <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold text-sm shrink-0">
                                {step.step}
                              </div>
                              <div className="flex-grow">
                                <h5 className="font-bold text-purple-300 text-sm mb-1">{step.title}</h5>
                                <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 bg-blue-900/20 border border-blue-800/50 p-4 rounded-xl flex gap-3 items-start">
                          <Info className="text-blue-400 shrink-0" size={20}/>
                          <p className="text-[11px] text-blue-200"><strong>Tips Industri:</strong> Biarkan penutup habuk (Dust Cap) di belakang keystone sentiasa dipasang untuk mengelakkan wayar yang telah di 'Punch' dari longgar semasa ditolak masuk ke dinding.</p>
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
                  href={`https://www.google.com/search?q=${encodeURIComponent(item.title + " networking")}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`bg-gradient-to-br from-slate-50 to-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-all group block cursor-pointer border-gray-200`}
                  title="Klik untuk cari di Google"
                >
                  <div className={`flex items-center justify-between mb-3 text-blue-700`}>
                    <div className="flex items-center">
                      <Search size={20} className="mr-2" />
                      <h4 className="font-bold text-lg group-hover:underline decoration-2 underline-offset-2 text-slate-800">{item.title}</h4>
                    </div>
                    <ExternalLink size={16} className="text-gray-400 group-hover:text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-800">{item.desc}</p>
                </a>
              ))}
            </div>
          )}
        </div>
        <section className="mx-4 mb-5 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-indigo-50 p-6 shadow-lg sm:mx-8 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-black uppercase tracking-wider text-blue-700"><Lock size={14}/> Kuiz Penguasaan Topik</div>
              <h3 className="text-xl font-black text-slate-800 sm:text-2xl">Sedia untuk membuka kad seterusnya?</h3>
              <p className="mt-2 max-w-xl text-sm text-slate-600">Selepas membaca nota, jawab 5 soalan interaktif tentang <strong>{activeTopic.title}</strong>. Syarat lulus: {UNLOCK_PASS_MARK}/5. Set soalan dipelbagaikan mengikut nombor pelajar.</p>
            </div>
            <div className="shrink-0">
              {topics.findIndex(item => item.id === activeTopic.id) < unlockedTopicIndex ?
                <div className="flex flex-col gap-2">
                  <span className="inline-flex items-center gap-2 rounded-xl bg-emerald-100 px-4 py-3 text-sm font-black text-emerald-700"><CheckCircle size={18}/> Topik telah lulus</span>
                  {topics.findIndex(item => item.id === activeTopic.id) < topics.length - 1 && <button onClick={openNextTopic} className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800">Ke Kad Seterusnya →</button>}
                </div> :
                <button onClick={startTopicQuiz} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-1 hover:shadow-blue-200"><Sparkles size={20}/> Jawab 5 Soalan &amp; Unlock <ChevronRight size={18}/></button>
              }
            </div>
          </div>
        </section>
        <BackButton />
      </div>
    </div>
  );

  const renderInspection = () => (
    <div className="animate-fade-in w-full">
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
        <div className="relative bg-gradient-to-r from-amber-600 to-orange-500 p-5 text-white sm:p-7 lg:p-8">
          <button type="button" onClick={() => { setView('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="mb-5 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-black/15 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-black/25">
            <Home size={18} /> {t('Menu Utama', 'Main Menu')}
          </button>
          <h2 className="flex flex-wrap items-center gap-3 text-2xl font-extrabold sm:text-3xl"><ShieldAlert size={30} className="shrink-0"/> {t('Prosedur Keselamatan', 'Safety Procedures')}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/95 sm:text-base">{t('Kenal komponen sebenar dan ikuti amalan selamat semasa penamatan RJ45, keystone jack, patch panel dan pemasangan pelindung kabel.', 'Recognize real hardware and follow safe practices for RJ45, keystone jacks, patch panels and cable cover installation.')}</p>
        </div>

        <div className="space-y-5 p-4 sm:space-y-6 sm:p-6 lg:p-8">
          <IKR3023SafetyVisual language={language} />

          <section className="rounded-2xl border border-blue-200 bg-blue-50 p-4 sm:p-6" aria-labelledby="safety-rj45">
            <h3 id="safety-rj45" className="mb-4 flex items-center gap-2 text-lg font-bold text-blue-900 sm:text-xl"><Plug size={22} className="shrink-0"/> {t('Penamatan Kepala RJ45', 'RJ45 Plug Termination')}</h3>
            <ul className="space-y-3 text-sm leading-relaxed text-slate-800 sm:text-base">
              <li className="flex items-start gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-blue-700"/><span><strong>{t('Sisa wayar tajam:', 'Sharp wire offcuts:')}</strong> {t('Potong kabel pada permukaan kerja yang stabil, jauhkan jari daripada mata pemotong dan kumpul sisa konduktor selepas kerja.', 'Cut cables on a stable work surface, keep fingers away from blades, and collect conductor offcuts after work.')}</span></li>
              <li className="flex items-start gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-blue-700"/><span><strong>{t('Alat yang sesuai:', 'Correct tools:')}</strong> {t('Gunakan cable stripper dan crimping tool yang serasi dengan kabel serta plug. Jangan gunakan alat yang rosak.', 'Use a cable stripper and crimping tool suitable for the cable and plug. Never use damaged tools.')}</span></li>
              <li className="flex items-start gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-blue-700"/><span><strong>{t('Semakan akhir:', 'Final check:')}</strong> {t('Semak susunan wayar T568A/B, sambungan mekanikal dan keputusan cable tester sebelum digunakan.', 'Check T568A/B wire order, mechanical termination and cable tester results before use.')}</span></li>
            </ul>
          </section>

          <section className="rounded-2xl border border-purple-200 bg-purple-50 p-4 sm:p-6" aria-labelledby="safety-jack">
            <h3 id="safety-jack" className="mb-4 flex items-center gap-2 text-lg font-bold text-purple-900 sm:text-xl"><Monitor size={22} className="shrink-0"/> {t('Penamatan Modular Jack (Keystone)', 'Keystone Jack Termination')}</h3>
            <ul className="space-y-3 text-sm leading-relaxed text-slate-800 sm:text-base">
              <li className="flex items-start gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-purple-700"/><span><strong>{t('Jangan letak di tapak tangan:', 'Never hold in your palm:')}</strong> {t('Gunakan blok penahan (punch-down puck) yang sesuai pada meja stabil supaya mata alat tidak mencederakan tangan.', 'Use a suitable punch-down puck on a stable table to prevent the blade from injuring your hand.')}</span></li>
              <li className="flex items-start gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-purple-700"/><span><strong>{t('Tekanan terkawal:', 'Controlled force:')}</strong> {t('Sejajarkan mata alat dengan terminal IDC dan tekan mengikut arahan pengeluar; elakkan tekanan senget atau berlebihan.', 'Align the tool blade with the IDC terminal and follow the manufacturer’s instructions; avoid angled or excessive force.')}</span></li>
              <li className="flex items-start gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-purple-700"/><span><strong>{t('Jaga kedudukan bilah:', 'Check blade direction:')}</strong> {t('Pastikan sisi pemotong menghadap ke bahagian lebihan wayar, bukan ke arah kabel yang hendak dikekalkan.', 'Face the cutting edge toward the excess wire, not toward the cable you intend to retain.')}</span></li>
            </ul>
          </section>

          <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 sm:p-6" aria-labelledby="safety-patch">
            <h3 id="safety-patch" className="mb-4 flex items-center gap-2 text-lg font-bold text-emerald-900 sm:text-xl"><Layers size={22} className="shrink-0"/> {t('Patch Panel dan Rak Rangkaian', 'Patch Panel and Network Rack')}</h3>
            <ul className="space-y-3 text-sm leading-relaxed text-slate-800 sm:text-base">
              <li className="flex items-start gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700"/><span><strong>{t('Elakkan serpihan konduktor:', 'Prevent conductive debris:')}</strong> {t('Kutip sisa potongan dan elakkan ia jatuh ke lubang pengudaraan switch. Matikan/asingkan peralatan apabila perlu; jangan tutup switch yang hidup dengan kain kerana boleh menghalang pengudaraan.', 'Collect offcuts and prevent them entering switch ventilation. Power down/isolate equipment where required; never cover a powered switch with cloth because airflow may be blocked.')}</span></li>
              <li className="flex items-start gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700"/><span><strong>{t('Elektrik dan ESD:', 'Electrical safety and ESD:')}</strong> {t('Ikut SOP pengasingan bekalan elektrik. Gelang ESD digunakan hanya mengikut prosedur untuk komponen sensitif statik pada stesen kerja selamat, bukan sebagai perlindungan daripada renjatan elektrik atau untuk kerja pada peralatan hidup.', 'Follow electrical isolation procedures. Use an ESD wrist strap only as directed for static-sensitive components at a safe workstation; it does not protect from electric shock and is not for live electrical work.')}</span></li>
              <li className="flex items-start gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700"/><span><strong>{t('Susunan kabel dan ergonomik:', 'Cable management and ergonomics:')}</strong> {t('Label port, sokong kabel agar tidak menarik terminal, gunakan pencahayaan cukup serta tangga kerja yang sesuai jika bekerja pada tempat tinggi.', 'Label ports, provide strain relief, ensure adequate lighting and use suitable access equipment for elevated work.')}</span></li>
            </ul>
          </section>

          <section className="rounded-2xl border border-orange-200 bg-orange-50 p-4 sm:p-6" aria-labelledby="safety-route">
            <h3 id="safety-route" className="mb-3 flex items-center gap-2 text-lg font-bold text-orange-900 sm:text-xl"><Cable size={22} className="shrink-0"/> {t('Faceplate dan Laluan Kabel', 'Faceplates and Cable Routing')}</h3>
            <p className="text-sm leading-relaxed text-slate-800 sm:text-base">{t('Pastikan faceplate kemas dan tidak longgar. Pilih pelindung/trunking sesuai dengan lokasi, elakkan tepi tajam dan bahaya tersandung, jangan himpit kabel, serta asingkan kabel data daripada kabel kuasa mengikut spesifikasi dan peraturan pemasangan yang terpakai.', 'Secure faceplates properly. Choose cable covers/trunking suitable for the location, avoid sharp edges and trip hazards, do not crush cables, and segregate data from power cables according to applicable specifications and installation requirements.')}</p>
          </section>
        </div>
        <BackButton />
      </div>
    </div>
  );

  const renderAR = () => (
    <div className={`w-full ${isFullscreen ? '' : 'animate-fade-in'}`}>
      <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 ${isFullscreen ? '' : 'overflow-hidden'}`}>
        <div className="bg-indigo-600 p-8 text-white flex justify-between items-start">
          <div>
            <button onClick={() => { setView('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="mb-4 inline-flex items-center gap-2 text-white bg-black/10 hover:bg-black/20 px-4 py-2 rounded-xl transition-all text-sm font-bold backdrop-blur-sm border border-white/20">
              <Home size={18} /> Menu Utama
            </button>
            <h2 className="text-3xl font-bold flex items-center gap-3"><Box size={36}/> Server Rack (Maya 3D)</h2>
            <p className="opacity-90 mt-2 text-lg">Eksplorasi infrastruktur pelayan dan suis rangkaian.</p>
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
          className={`bg-slate-900 transition-all duration-300 ${isFullscreen ? 'fixed inset-0 z-[9999] flex flex-col p-0 sm:p-4' : 'relative h-[600px] p-4'}`}
        >
          {isFullscreen && (
            <div className="absolute top-4 right-4 z-50 flex gap-2">
              <button onClick={toggleFullScreen} className="bg-red-500 text-white px-5 py-3 rounded-full hover:bg-red-600 shadow-lg flex items-center gap-2 font-bold text-sm transition-transform hover:scale-105">
                <Minimize size={20} /> Tutup Paparan
              </button>
            </div>
          )}
          
          <div className={`flex-1 w-full h-full bg-black relative ${isFullscreen ? 'rounded-none sm:rounded-xl' : 'rounded-xl overflow-hidden border border-slate-700'}`}>
            <OfflineEmbed 
              title="Server Rack 3D" 
              style={{ border: 0 }}
              allowFullScreen={true}
              allow="autoplay; fullscreen; xr-spatial-tracking" 
              src="https://sketchfab.com/models/f24594ece9634cec9c1210c041838371/embed?autostart=1&ui_controls=1&ui_infos=1&ui_inspector=1&ui_stop=0&ui_watermark=1&ui_watermark_link=1"
              className="w-full h-full outline-none"
            ></OfflineEmbed>
            
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-3 rounded-xl backdrop-blur-md border border-slate-700/50 flex items-center gap-4 pointer-events-none">
              <div className="flex gap-2">
                <div className="w-auto px-3 h-8 rounded border border-slate-500 flex items-center justify-center text-[10px] font-bold uppercase tracking-wider">Drag (Putar)</div>
                <div className="w-auto px-3 h-8 rounded border border-slate-500 flex items-center justify-center text-[10px] font-bold uppercase tracking-wider">Scroll (Zum)</div>
              </div>
              <div className="text-sm">
                <p className="font-bold">Rak Server 19"</p>
                <p className="text-slate-400 text-xs">Simulasi rak penempatan Patch Panel & Switch.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!isFullscreen && <BackButton />}
    </div>
  );

  return (
    <div className="em3-module min-h-screen bg-slate-50 font-sans text-gray-900 flex flex-col">
      <div className="em3-module-content max-w-6xl mx-auto py-4 sm:py-8 px-4 flex-1 w-full">
        {demoMode && <div className="em3-inline-demo" role="status"><Eye size={17}/><strong>MODE JURI • Pratonton</strong><span>Topik terbuka untuk demonstrasi sahaja. Tiada keputusan kuiz atau kemajuan pelajar disimpan.</span></div>}
        {view === 'menu' && renderMenu()}
        {view === 'topic' && renderTopic()}
        {view === 'topicQuiz' && activeTopic && (
          <TopicUnlockQuiz
            key={`${activeTopic.id}-${view}`}
            moduleCode="IKR3023"
            topic={activeTopic}
            onBack={() => setView('topic')}
            onPassed={handleTopicQuizPassed}
            demoMode={demoMode}
            onStudentSelected={demoMode ? undefined : handleStudentSelected}
            onNextTopic={openNextTopic}
            isLastTopic={topics[topics.length - 1].id === activeTopic.id}
          />
        )}
        {view === 'inspection' && renderInspection()}
        {view === 'recommender' && renderRecommender()}
        {view === 'ar' && renderAR()}
      </div>
      <StudyChatbot moduleCode="IKR3023" topics={topics} activeTopicId={activeTopic?.id || null} />
      <footer className="w-full py-6 mt-auto border-t bg-white text-center shadow-inner text-slate-500 font-semibold text-sm">
        Copyright &copy; TKR ADTEC Sandakan 2026
      </footer>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes dash { to { stroke-dashoffset: -40; } }
        .animate-fade-in { animation: fadeIn 0.5s ease-out; }
        .animate-slide-up { animation: slideUp 0.4s ease-out; }
      `}</style>
    </div>
  );
}