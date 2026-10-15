// Bank soalan terasing daripada kandungan asal modul.
const CORE_3013 = {cpu: [
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
const CORE_3023 = {topologi: [
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
  prosedur: [
    { question: 'Penamatan kabel merujuk kepada…', options: ['Proses menyambungkan hujung kabel kepada penyambung atau terminal', 'Menamatkan penggunaan internet di bangunan', 'Mencabut semua kabel lama', 'Menyusun peranti atas meja'], correct: 0 },
    { question: 'Kesilapan susunan warna semasa penamatan boleh menyebabkan…', options: ['Kegagalan pada cable tester', 'RAM menjadi perlahan', 'Switch bertukar jenama', 'CPU overclock sendiri'], correct: 0 },
    { question: 'Mengapa pintalan pasangan wayar perlu dikekalkan sedekat mungkin ke titik penamatan?', options: ['Untuk membantu prestasi dan mengurangkan gangguan', 'Untuk memanjangkan warna kabel', 'Untuk menambah port pada switch', 'Untuk menjadikan patch panel lebih berat'], correct: 0 },
    { question: 'Straight‑through tradisional biasanya menggunakan…', options: ['Susunan yang sama pada kedua-dua hujung', 'T568A satu hujung dan T568B satu hujung', 'Fiber di satu hujung sahaja', 'Empat wayar sahaja'], correct: 0 },
    { question: 'Crossover tradisional menggunakan…', options: ['Susunan berbeza antara dua hujung', 'RJ11 pada satu hujung', 'Satu hujung tanpa penyambung', 'Patch cord fiber'], correct: 0 },
    { question: 'Selepas selesai penamatan, langkah terakhir yang wajib ialah…', options: ['Menguji kabel', 'Mengecat kabel', 'Menukar topologi', 'Mematikan semua switch'], correct: 0 }
  ]
};
const EXTRA_QUESTIONS = {
  "IKR3013": {
    "cpu": [
      {
        "question": "Unit manakah yang menjalankan operasi aritmetik dan logik dalam CPU?",
        "options": [
          "ALU",
          "PSU",
          "NIC",
          "SSD"
        ],
        "correct": 0
      },
      {
        "question": "Apakah fungsi Control Unit?",
        "options": [
          "Mengawal pelaksanaan arahan dalam CPU",
          "Menambah kapasiti cakera keras",
          "Menguji kabel LAN",
          "Membekalkan tenaga elektrik"
        ],
        "correct": 0
      }
    ],
    "motherboard": [
      {
        "question": "Soket CPU berfungsi untuk...",
        "options": [
          "Menempatkan CPU yang serasi",
          "Menggantikan SSD",
          "Menyambung pencetak",
          "Menyejukkan casing"
        ],
        "correct": 0
      },
      {
        "question": "Apakah fungsi slot M.2 pada banyak motherboard moden?",
        "options": [
          "Memasang SSD tertentu",
          "Menyambungkan cable tester",
          "Memasang kipas bilik",
          "Menyalurkan voltan AC ke monitor"
        ],
        "correct": 0
      }
    ],
    "ram": [
      {
        "question": "Apabila kuasa elektrik diputuskan, kandungan RAM biasa akan...",
        "options": [
          "Kekal selamanya",
          "Hilang kerana bersifat meruap",
          "Berpindah ke modem",
          "Menjadi lebih laju"
        ],
        "correct": 1
      },
      {
        "question": "Apakah kepanjangan SO-DIMM?",
        "options": [
          "Small Outline Dual In-line Memory Module",
          "Solid Output Data Internal Memory",
          "Serial Online Device Interface Module",
          "Standard Optical Disk Interface"
        ],
        "correct": 0
      }
    ],
    "storage": [
      {
        "question": "Antara berikut, peranti storan manakah mempunyai komponen mekanikal bergerak?",
        "options": [
          "HDD",
          "SSD NVMe",
          "RAM DDR5",
          "Cache CPU"
        ],
        "correct": 0
      },
      {
        "question": "Apakah protokol storan yang digunakan oleh banyak SSD melalui PCIe?",
        "options": [
          "NVMe",
          "T568B",
          "DHCP",
          "HDMI"
        ],
        "correct": 0
      }
    ],
    "psu": [
      {
        "question": "Apakah ukuran utama kapasiti output PSU?",
        "options": [
          "Watt (W)",
          "Bit per saat",
          "Hertz audio",
          "Lumen"
        ],
        "correct": 0
      },
      {
        "question": "Sebelum membuka casing PC untuk servis, tindakan selamat ialah...",
        "options": [
          "Matikan komputer dan cabut sumber kuasa",
          "Naikkan voltan PSU",
          "Sentuh papan induk dengan tangan basah",
          "Biarkan kipas terus berpusing"
        ],
        "correct": 0
      }
    ],
    "cooling": [
      {
        "question": "Apa yang boleh berlaku jika kipas CPU gagal berfungsi?",
        "options": [
          "CPU terlalu panas dan sistem tidak stabil",
          "Kelajuan LAN bertambah",
          "Storan berganda",
          "RAM berubah DDR5"
        ],
        "correct": 0
      },
      {
        "question": "Apakah maksud thermal throttling?",
        "options": [
          "Prestasi dikurangkan untuk mengehadkan suhu",
          "Kipas ditutup bagi menjimatkan elektrik",
          "Kelajuan printer bertambah",
          "CPU dinaik taraf secara automatik"
        ],
        "correct": 0
      }
    ],
    "os": [
      {
        "question": "Apakah maksud CLI?",
        "options": [
          "Command-Line Interface",
          "Computer Local Internet",
          "Cable Link Identifier",
          "Core Logic Input"
        ],
        "correct": 0
      },
      {
        "question": "Apakah peranan driver peranti?",
        "options": [
          "Membolehkan OS berkomunikasi dengan perkakasan",
          "Menggantikan bekalan kuasa",
          "Menambah soket CPU",
          "Memotong kabel Ethernet"
        ],
        "correct": 0
      }
    ],
    "io": [
      {
        "question": "Peranti manakah boleh menghasilkan output audio?",
        "options": [
          "Pembesar suara",
          "Papan kekunci",
          "Mouse",
          "Pengimbas kod bar"
        ],
        "correct": 0
      },
      {
        "question": "Mengapakah pencetak dikategorikan sebagai output?",
        "options": [
          "Menghasilkan dokumen fizikal daripada data",
          "Memasukkan data ke CPU",
          "Menambah kapasiti RAM",
          "Mengesan gangguan EMI"
        ],
        "correct": 0
      }
    ]
  },
  "IKR3023": {
    "topologi": [
      {
        "question": "Topologi bas (bus) bergantung kepada...",
        "options": [
          "Satu kabel backbone berkongsi",
          "Satu switch bagi setiap PC",
          "Fiber kepada semua peranti",
          "Sambungan tanpa wayar sahaja"
        ],
        "correct": 0
      },
      {
        "question": "Apakah kelemahan utama topologi star jika peranti pusat gagal?",
        "options": [
          "Banyak sambungan pengguna terganggu",
          "Semua kabel berubah kategori",
          "RAM komputer menjadi rosak",
          "Semua sistem operasi dipadam"
        ],
        "correct": 0
      }
    ],
    "struktur": [
      {
        "question": "Apakah maksud permanent link dalam pengkabelan berstruktur?",
        "options": [
          "Pautan tetap daripada patch panel ke outlet",
          "Kabel kuasa utama",
          "Sambungan monitor ke CPU",
          "Kabel sementara untuk mouse"
        ],
        "correct": 0
      },
      {
        "question": "Mengapa label port penting dalam pelan rangkaian?",
        "options": [
          "Memudahkan penyelenggaraan dan jejak kabel",
          "Menambahkan lebar jalur tanpa alat",
          "Menggantikan cable tester",
          "Menukar IP secara automatik"
        ],
        "correct": 0
      }
    ],
    "kabel": [
      {
        "question": "Medium manakah lebih kebal terhadap gangguan EMI?",
        "options": [
          "Gentian optik",
          "UTP tanpa pelindung",
          "Coaxial TV analog",
          "Wayar kuasa"
        ],
        "correct": 0
      },
      {
        "question": "Apakah satu kelebihan fiber optik single-mode?",
        "options": [
          "Menyokong jarak jauh",
          "Mempunyai 8 pin tembaga",
          "Memerlukan crimping tool RJ45",
          "Hanya sesuai 10 Mbps"
        ],
        "correct": 0
      }
    ],
    "kelajuan": [
      {
        "question": "Kelajuan 100Base-TX ialah...",
        "options": [
          "10 Mbps",
          "100 Mbps",
          "1 Gbps",
          "10 Gbps"
        ],
        "correct": 1
      },
      {
        "question": "Bagi 10GBASE-T sehingga 100 m, apakah kategori yang lazim disyorkan?",
        "options": [
          "Cat6A",
          "Cat3",
          "Kabel telefon RJ11",
          "HDMI"
        ],
        "correct": 0
      }
    ],
    "alatan": [
      {
        "question": "Alat manakah digunakan untuk memotong kabel kepada panjang dikehendaki?",
        "options": [
          "Wire cutter",
          "Punch down tool",
          "Cable tester",
          "Label printer"
        ],
        "correct": 0
      },
      {
        "question": "Apakah tujuan cable stripper?",
        "options": [
          "Mengupas jaket kabel tanpa merosakkan pengalir",
          "Menambah kelajuan internet",
          "Memotong patch panel",
          "Menyambung router ke Wi-Fi"
        ],
        "correct": 0
      }
    ],
    "peralatan": [
      {
        "question": "Alat apakah yang sesuai untuk mengenal pasti wayar terputus dalam sambungan RJ45?",
        "options": [
          "Cable tester",
          "Monitor",
          "Scanner",
          "Kipas CPU"
        ],
        "correct": 0
      },
      {
        "question": "Apakah maksud 1U dalam server rack?",
        "options": [
          "Unit ketinggian peralatan rak",
          "Satu pengguna berdaftar",
          "Satu kabel UTP",
          "Satu penghala tanpa wayar"
        ],
        "correct": 0
      }
    ],
    "bahan": [
      {
        "question": "Apakah kegunaan modular jack?",
        "options": [
          "Membentuk outlet data dengan sambungan IDC",
          "Menghasilkan kuasa 12V",
          "Menguji virus komputer",
          "Menyimpan sistem operasi"
        ],
        "correct": 0
      },
      {
        "question": "Mengapa kabel tidak patut diikat terlalu ketat?",
        "options": [
          "Boleh merosakkan struktur atau prestasi kabel",
          "Akan mengubah panjang ke 100 m",
          "Memadam maklumat port",
          "Menggandakan kelajuan"
        ],
        "correct": 0
      }
    ],
    "prosedur": [
      {
        "question": "Selepas penamatan RJ45, langkah pengesahan utama ialah...",
        "options": [
          "Uji wiremap dengan alat yang sesuai",
          "Hidupkan PSU komputer",
          "Tukar OS kepada Linux",
          "Buka semua pintalan kabel"
        ],
        "correct": 0
      },
      {
        "question": "Mengapa pasangan kabel perlu dikekalkan berpintal sedekat mungkin dengan titik penamatan?",
        "options": [
          "Mengurangkan gangguan dan mengekalkan ciri penghantaran",
          "Menambah warna kabel",
          "Memanjangkan wayar secara automatik",
          "Mengubah voltan bekalan kuasa"
        ],
        "correct": 0
      }
    ]
  }
};
export const TOPIC_UNLOCK_BANKS = {
  IKR3013: Object.fromEntries(Object.entries(CORE_3013).map(([id, questions]) => [id, [...questions, ...(EXTRA_QUESTIONS.IKR3013[id] || [])]])),
  IKR3023: Object.fromEntries(Object.entries(CORE_3023).map(([id, questions]) => [id, [...questions, ...(EXTRA_QUESTIONS.IKR3023[id] || [])]]))
};
