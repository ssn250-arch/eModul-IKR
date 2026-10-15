/**
 * Smart Knowledge Tutor — tanpa API atau panggilan rangkaian.
 * Jawapan diambil daripada data topik asal di IKR3013.jsx / IKR3023.jsx.
 * Tidak mengakses jawapan kuiz, tidak membuat dakwaan semakan internet langsung.
 */

const LABELS = {
  IKR3013: {
    cpu: ['cpu', 'processor', 'pemproses', 'p-core', 'e-core', 'npu', 'core ultra', 'ryzen'],
    motherboard: ['motherboard', 'mobo', 'papan induk', 'mainboard', 'socket', 'soket', 'pcie', 'pci express', 'uefi'],
    ram: ['ram', 'memory', 'memori', 'ddr4', 'ddr5', 'camm2', 'ecc', 'sodimm'],
    storage: ['ssd', 'hdd', 'storan', 'storage', 'nvme', 'nand', 'hard disk', 'hard drive', 'sata', 'directstorage'],
    psu: ['psu', 'power supply', 'bekalan kuasa', 'watt', 'wattage', '80 plus', 'atx 3', '12vhpwr'],
    cooling: ['cooling', 'penyejukan', 'sejuk', 'haba', 'heatsink', 'thermal paste', 'suhu', 'kipas', 'vapor chamber'],
    os: ['operating system', 'sistem operasi', 'windows', 'linux', 'macos', 'kernel', 'virtualization', 'mesin maya', 'ntfs', 'apfs'],
    io: ['input output', 'peranti input', 'peranti output', 'mouse', 'tetikus', 'keyboard', 'papan kekunci', 'skrin sentuh', 'monitor', 'pencetak', 'printer', 'oled', 'microled', 'scanner']
  },
  IKR3023: {
    topologi: ['topologi', 'topology', 'star', 'bintang', 'mesh', 'ring', 'cincin', 'bus', 'tree', 'pokok', 'point to point'],
    struktur: ['struktur pengkabelan', 'structured cabling', 'horizontal cabling', 'backbone', 'trunking', 'conduit', 'susun atur', 'layout', '100 meter', '90 meter'],
    kabel: ['fiber', 'fibre', 'gentian', 'optik', 'utp', 'stp', 'coaxial', 'tembaga', 'single mode', 'multimode', 'cat5e', 'kabel data'],
    kelajuan: ['ethernet', 'kelajuan', 'speed', 'gigabit', 'mbps', 'gbps', '10gbase', '40gbase', 'cat6a', 'cat8', '1000base'],
    alatan: ['crimping', 'stripper', 'playar', 'pliers', 'punch down', 'pita pengukur', 'gerudi', 'wire cutter', 'alatan tangan'],
    peralatan: ['cable tester', 'pengujian', 'ujian kabel', 'patch panel', 'server rack', 'rack', 'label printer', 'patch cord', 'tangga'],
    bahan: ['face plate', 'modular jack', 'cable tie', 'aksesori', 'bahan kabel', 'rj45', 'keystone'],
    prosedur: ['penamatan', 'termination', 'terminasi', 't568a', 't568b', 'straight', 'crossover', 'susunan warna', 'crimp', 'untwist', 'pinout', 'rj45']
  }
};

const FOCUS_QUESTIONS = {
  IKR3013: {
    cpu: ['Terangkan fungsi utama CPU.', 'Apakah peranan P-core dan E-core?', 'Mengapa CPU perlu soket yang serasi?'],
    motherboard: ['Apakah fungsi motherboard?', 'Mengapa soket CPU dan slot RAM mesti serasi?', 'Apakah fungsi PCIe?'],
    ram: ['Apakah fungsi RAM?', 'Terangkan perbezaan DDR4 dengan DDR5.', 'Apakah maksud on-die ECC?'],
    storage: ['Apakah beza HDD dan SSD?', 'Apakah maksud NVMe?', 'Mengapa SSD sesuai sebagai pemacu sistem?'],
    psu: ['Apakah fungsi PSU?', 'Mengapa perlu ada headroom kuasa?', 'Apakah maksud ATX 3.1?'],
    cooling: ['Mengapa komputer perlukan sistem penyejukan?', 'Apa kegunaan thermal paste?', 'Bagaimana habuk memberi kesan pada heatsink?'],
    os: ['Apakah peranan sistem operasi?', 'Apakah beza GUI dan CLI?', 'Apa itu virtualization?'],
    io: ['Bezakan peranti input dengan output.', 'Mengapa skrin sentuh dikatakan dwifungsi?', 'Apakah maksud polling rate?']
  },
  IKR3023: {
    topologi: ['Bezakan topologi star dengan mesh.', 'Apakah topologi fizikal dan logikal?', 'Apakah kelebihan topologi bintang?'],
    struktur: ['Apakah maksud horizontal cabling?', 'Mengapa pelan susun atur penting?', 'Apakah fungsi trunking?'],
    kabel: ['Apakah perbezaan UTP dengan STP?', 'Bezakan single mode dan multimode.', 'Apakah fungsi fiber optik?'],
    kelajuan: ['Cat6A sesuai untuk kelajuan berapa?', 'Apakah 40GBASE-T?', 'Mengapa had jarak bergantung pada standard?'],
    alatan: ['Apa fungsi crimping tool?', 'Bezakan cable stripper dan wire cutter.', 'Apakah fungsi punch down tool?'],
    peralatan: ['Apakah fungsi cable tester?', 'Apakah kegunaan patch panel?', 'Mengapa pelabelan kabel penting?'],
    bahan: ['Apakah kegunaan face plate?', 'Apa fungsi modular jack?', 'Untuk apa cable tie digunakan?'],
    prosedur: ['Apakah standard T568A dan T568B?', 'Bagaimana penamatan kabel dilakukan?', 'Apakah perbezaan straight-through dengan crossover?']
  }
};

// Jawapan khusus hanya untuk fakta yang telah diterangkan dalam kandungan asal.
const PRECISE_EXPLANATIONS = {
  IKR3013: [
    { test: ['ddr4', 'ddr5'], id: 'ram', text: 'DDR4 dan DDR5 ialah generasi RAM berbeza. Nota modul menerangkan DDR5 sebagai RAM dengan kadar pemindahan data lebih tinggi serta pengurusan kuasa yang ditambah baik. Slot dan modul DDR4/DDR5 tidak boleh saling ditukar; pilih berdasarkan sokongan papan induk dan CPU.' },
    { test: ['hdd', 'ssd'], id: 'storage', text: 'HDD menyimpan data pada piring magnetik berputar. SSD menyimpan data menggunakan memori flash dan tidak mempunyai bahagian mekanikal berputar. SSD lazimnya memberikan akses lebih pantas; kedua-duanya ialah storan bukan meruap.' },
    { test: ['input', 'output'], id: 'io', text: 'Peranti input menghantar data atau arahan kepada komputer (contoh papan kekunci dan tetikus). Peranti output memaparkan hasil pemprosesan (contoh monitor dan pencetak). Skrin sentuh boleh menjalankan kedua-dua fungsi.' },
    { test: ['on die', 'ecc'], id: 'ram', text: 'On-die ECC pada cip DDR5 membetulkan ralat dalaman cip memori. Ia tidak sama dengan ECC RAM sistem yang memberikan perlindungan tambahan kepada penghantaran data antara modul memori dan pengawal.' },
    { test: ['gui', 'cli'], id: 'os', text: 'GUI ialah antara muka grafik yang digunakan melalui ikon, tetingkap dan menu. CLI ialah antara muka arahan teks. Kedua-duanya membolehkan pengguna mengendalikan sistem operasi melalui kaedah yang berbeza.' }
  ],
  IKR3023: [
    { test: ['star', 'mesh'], id: 'topologi', text: 'Topologi bintang (star) menghubungkan peranti kepada satu titik pusat seperti switch. Ia mudah diselenggara, tetapi kegagalan switch pusat menjejaskan sambungan. Topologi mesh menyediakan beberapa laluan antara peranti untuk redundansi, namun biasanya memerlukan kos dan pengurusan lebih tinggi.' },
    { test: ['utp', 'stp'], id: 'kabel', text: 'UTP ialah pasangan wayar tembaga terpintal tanpa pelindung tambahan. STP menggunakan pelindung seperti foil atau braid bagi membantu mengurangkan gangguan elektromagnet (EMI). Jenis kabel dipilih berdasarkan persekitaran pemasangan dan keperluan rangkaian.' },
    { test: ['single mode', 'multimode'], id: 'kabel', text: 'Single-mode fiber menggunakan teras kecil untuk penghantaran pada jarak lebih jauh. Multimode fiber mempunyai teras lebih besar dan lazim untuk pautan jarak lebih dekat. Jarak sebenar bergantung pada jenis gentian, transceiver dan standard Ethernet.' },
    { test: ['straight', 'crossover'], id: 'prosedur', text: 'Kabel straight-through menggunakan susunan pin yang sama pada kedua-dua hujung (contohnya T568B/T568B). Crossover tradisional menggunakan susunan yang berbeza (T568A/T568B). Banyak peranti Ethernet moden menyokong Auto-MDI/MDIX, jadi keperluan crossover bergantung pada peranti.' },
    { test: ['t568a', 't568b'], id: 'prosedur', text: 'T568A dan T568B ialah dua susunan kod warna penamatan kabel pasangan terpintal. Gunakan susunan sama pada kedua-dua hujung untuk kabel straight-through; penamatan yang salah boleh menghasilkan wiremap yang gagal dalam ujian kabel.' },
    { test: ['cat6a', 'cat8'], id: 'kelajuan', text: 'Cat6A lazim digunakan untuk 10GBASE-T sehingga 100 m apabila seluruh saluran memenuhi standard. Cat8 menyokong 25/40GBASE-T dalam pautan tembaga jarak pendek sehingga kira-kira 30 m. Semak juga standard Ethernet, panjang dan kualiti pemasangan.' }
  ]
};

const STOP_WORDS = new Set(('apa apakah adakah yang ini itu dalam daripada untuk dengan bagi kepada kepada ialah adalah dan atau macam mana bagaimana kenapa mengapa sila tolong saya aku aq bro boleh bolehkah tolong terangkan jelaskan huraikan buatkan berikan bagi tahu beritahu apa sebab beza perbezaan banding bandingkan daripada definisi maksud fungsi ke di pada secara ada oleh jenis kegunaan contoh aplikasi lebih tentang perlu untuk suatu satu yang the of is do can tell explain please did how which what from answer ni tu nak nk yg tak juga kalau guna'.split(' ')));
const INTENT_WORDS = new Set(['perbandingan', 'banding', 'beza', 'difference', 'antara', 'versus', 'vs', 'contoh', 'contohnya', 'amali', 'langkah', 'prosedur', 'cara', 'fungsi', 'maksud', 'definisi', 'apakah', 'apa', 'bagaimana', 'kenapa', 'mengapa', 'kegunaan', 'terangkan', 'jelaskan', 'huraikan', 'ringkaskan', 'soalan', 'ulang', 'kaji', 'latihan']);

export const normalize = (s) => String(s || '').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^\p{L}\p{N}]+/gu, ' ').replace(/\s+/g, ' ').trim();
const tokens = (s) => normalize(s).split(' ').filter((t) => t.length > 1 && !STOP_WORDS.has(t));
const includesPhrase = (where, phrase) => ` ${where} `.includes(` ${normalize(phrase)} `);
const unique = (a) => [...new Set(a)];

export function getSuggestedQuestions(moduleCode, activeTopicId = null) {
  if (activeTopicId && FOCUS_QUESTIONS[moduleCode]?.[activeTopicId]) return FOCUS_QUESTIONS[moduleCode][activeTopicId];
  return moduleCode === 'IKR3013'
    ? ['Apakah fungsi CPU?', 'Bezakan HDD dengan SSD', 'Mengapa DDR5 perlu papan induk serasi?', 'Terangkan sistem operasi']
    : ['Bezakan topologi star dan mesh', 'Apakah fungsi cable tester?', 'Terangkan T568A dan T568B', 'Cat6A sesuai untuk kelajuan berapa?'];
}

const questionTopicScores = (moduleCode, topics, text) => {
  const normalized = normalize(text);
  const terms = unique(tokens(text));
  return topics.map((topic, index) => {
    const aliases = LABELS[moduleCode]?.[topic.id] || [];
    const matchedAliases = aliases.filter((x) => includesPhrase(normalized, x));
    let score = matchedAliases.reduce((total, alias) => total + (alias.split(' ').length > 1 ? 12 : 9), 0);
    if (includesPhrase(normalized, topic.title)) score += 16;
    const header = normalize(`${topic.title} ${topic.description}`);
    const body = normalize(`${(topic.content?.basics || []).map((s) => `${s.title} ${(s.points || []).join(' ')}`).join(' ')} ${(topic.content?.advanced || []).map((s) => `${s.title} ${s.desc}`).join(' ')}`);
    score += terms.reduce((total, term) => total + (includesPhrase(header, term) ? 3 : includesPhrase(body, term) ? 1 : 0), 0);
    return { topic, index, score, matchedAliases };
  }).sort((a, b) => b.score - a.score);
};

function notesForTopic(topic, question, intent) {
  const terms = unique(tokens(question));
  const cards = [
    ...(topic.content?.basics || []).map((b) => ({ section: `Nota Asas — ${b.title}`, text: (b.points || []).join(' ') })),
    ...(topic.content?.advanced || []).map((a) => ({ section: `Teknologi Terkini — ${a.title}`, text: a.desc }))
  ];
  const enriched = cards.map((card) => ({
    ...card,
    score: terms.reduce((sum, term) => sum + (includesPhrase(normalize(card.section), term) ? 5 : includesPhrase(normalize(card.text), term) ? 2 : 0), 0)
  })).sort((a, b) => b.score - a.score);
  const preferred = intent === 'langkah' ? enriched.slice(0, 3) : enriched.slice(0, 2);
  const desc = topic.description || '';
  const details = preferred.map((c) => `• ${c.section.replace(/^Teknologi Terkini — /, '')}: ${c.text}`).filter(Boolean);
  return {
    text: [desc, ...details].filter(Boolean).join('\n\n'),
    sections: preferred.map((x) => x.section)
  };
}

function nonTechnicalText(question) {
  const t = normalize(question);
  if (/^(hai|hello|helo|assalamualaikum|salam|hi|selamat pagi|selamat petang)( bro)?[ !.?]*$/.test(t)) return 'Hai! Saya Smart Knowledge Tutor eModul-IKR. Saya boleh menerangkan kandungan berdasarkan nota modul yang tersedia. Cuba tanya nama topik atau pilih cadangan soalan.';
  if (/^(terima kasih|thank you|thanks|tq|baik|ok|okay)$/.test(t)) return 'Sama-sama! Ada topik lain yang anda ingin fahami?';
  return null;
}

const genericFocus = (question) => {
  const t = normalize(question);
  const ts = tokens(question);
  return ts.length === 0 || (ts.length <= 2 && ts.every((x) => INTENT_WORDS.has(x)));
};

export function answerFromModuleNotes({ moduleCode, topics = [], question = '', activeTopicId = null }) {
  const raw = String(question || '').trim();
  const simple = nonTechnicalText(raw);
  if (simple) return { text: simple, sources: [], mode: 'notes' };
  if (!raw) return { text: 'Sila masukkan soalan tentang modul.', sources: [], mode: 'notes' };
  const normalized = normalize(raw);
  const searchTerm = tokens(raw);
  const topicScores = questionTopicScores(moduleCode, topics, raw);
  const active = topics.find((topic) => topic.id === activeTopicId);
  const best = topicScores[0];
  const topIsGood = best && best.score >= 5;
  const useActive = !topIsGood && active && genericFocus(raw);
  const chosen = topIsGood ? best.topic : useActive ? active : null;

  // Prevent false claims about live facts or AI capabilities.
  const livePrompt = ['terkini', 'hari ini', 'terbaru', 'update', 'paling baharu', '2026', '2027', 'harga semasa', 'latest', 'real time'].some((x) => includesPhrase(normalized, x));
  const prefix = livePrompt ? 'Nota: Saya tidak menyemak internet secara langsung. Maklumat di bawah ialah daripada kandungan eModul-IKR yang dimuatkan.\n\n' : '';

  if (!chosen) return {
    text: 'Maaf, saya tidak menemui padanan yang meyakinkan dalam nota modul ini. Cuba sebut istilah teknikal yang lebih khusus seperti CPU, DDR5, SSD, sistem operasi, T568B atau cable tester (mengikut modul). Jika soalan ini memerlukan fakta atau standard terkini, rujuk pensyarah dan dokumentasi rasmi.',
    sources: [], mode: 'notes'
  };

  if (/\b(soalan|latihan|ulang kaji|latih tubi|quiz|kuiz)\b/i.test(normalized) && !/\b(jawapan|bocor|betul)\b/i.test(normalized)) {
    const qs = FOCUS_QUESTIONS[moduleCode]?.[chosen.id] || [`Apakah fungsi ${chosen.title}?`];
    return {
      text: `Cuba jawab tiga soalan ulang kaji untuk topik “${chosen.title}”:\n\n${qs.map((x, i) => `${i + 1}. ${x}`).join('\n')}\n\nSemak semula nota jika belum yakin. Soalan ini untuk latihan kendiri, bukan jawapan kuiz unlock.`,
      sources: [{ title: `${moduleCode} • ${chosen.title}`, topicId: chosen.id, sections: ['Nota Asas', 'Teknologi Terkini'] }], mode: 'notes'
    };
  }

  const precise = (PRECISE_EXPLANATIONS[moduleCode] || []).find((item) => item.test.every((part) => includesPhrase(normalized, part)));
  if (precise) {
    const related = topics.find((t) => t.id === precise.id);
    return {
      text: prefix + precise.text + `\n\nRujuk kad “${related?.title || chosen.title}” untuk penerangan lanjut.`,
      sources: [{ title: `${moduleCode} • ${related?.title || chosen.title}`, topicId: precise.id, sections: ['Nota Modul'] }],
      mode: 'notes'
    };
  }

  const intent = /\b(langkah|cara|prosedur|pasang|buat|memasang)\b/.test(normalized) ? 'langkah' : 'umum';
  const section = notesForTopic(chosen, raw, intent);
  const source = [{ title: `${moduleCode} • ${chosen.title}`, topicId: chosen.id, sections: section.sections }];
  const second = topicScores[1];
  const compare = /\b(beza|perbezaan|banding|bandingkan|vs|versus)\b/.test(normalized);
  if (compare && second && second.score >= 7 && second.topic.id !== chosen.id) {
    const s2 = notesForTopic(second.topic, raw, 'umum');
    source.push({ title: `${moduleCode} • ${second.topic.title}`, topicId: second.topic.id, sections: s2.sections });
    return {
      text: prefix + `Perbandingan berdasarkan nota modul:\n\n1. ${chosen.title}\n${section.text}\n\n2. ${second.topic.title}\n${s2.text}\n\nBandingkan fungsi, kesesuaian dan had penggunaan setiap komponen/konsep mengikut nota asal.`,
      sources: source, mode: 'notes'
    };
  }
  return {
    text: prefix + `Berdasarkan kad “${chosen.title}”:\n\n${section.text}\n\nUntuk maklumat lanjut, buka kad tersebut dan semak bahagian Nota Asas serta Teknologi Terkini.`,
    sources: source, mode: 'notes'
  };
}

export const smartTutorInfo = Object.freeze({ isGenerativeAI: false, requiresApiKey: false, usesNetwork: false, corpus: 'Nota setempat IKR3013/IKR3023' });
