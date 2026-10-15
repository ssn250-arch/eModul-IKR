import { ENGLISH_GUIDES } from './EnglishGuides';

const SUGGESTIONS = {
 IKR3013: {
  cpu:['What does the CPU do?','What is an ALU?','Why must the CPU socket match the motherboard?'],
  motherboard:['What does a motherboard do?','What is a PCIe slot?','What is BIOS or UEFI?'],
  ram:['What does RAM do?','What is the difference between DDR4 and DDR5?','Does RAM keep data without power?'],
  storage:['What is the difference between HDD and SSD?','What is NVMe?','Why is an SSD usually faster?'],
  psu:['What does a PSU do?','How much PSU power do I need?','How can I work safely with a PSU?'],
  cooling:['Why does a computer need cooling?','What is thermal paste?','What happens if a CPU overheats?'],
  os:['What does an operating system do?','What is GUI and CLI?','What is virtualisation?'],
  io:['What are input devices?','What are output devices?','Is a touchscreen both input and output?']
 },
 IKR3023: {
  topologi:['What is a star topology?','What is the difference between star and mesh?','What is a physical topology?'],
  struktur:['What is horizontal cabling?','What is a permanent link?','Why label network cables?'],
  kabel:['What is the difference between UTP and STP?','What is single-mode fibre?','When should I use fibre?'],
  kelajuan:['What speed is 1000BASE-T?','What cable supports 10GBASE-T?','How long can Cat8 run?'],
  alatan:['What does a crimping tool do?','What is a cable stripper?','What is a punch-down tool?'],
  peralatan:['What does a cable tester check?','What is a patch panel?','What does 1U mean?'],
  bahan:['What is a face plate?','What is a modular jack?','Why should I not pull cable ties too tight?'],
  prosedur:['How do I terminate a cable?','What is T568A and T568B?','What is a straight-through cable?']
 }
};

const ALIASES = {
 IKR3013: {cpu:['cpu','processor','processing','alu','p-core','e-core','npu'],motherboard:['motherboard','mainboard','socket','pcie','uefi','bios'],ram:['ram','memory','ddr4','ddr5','camm2','so-dimm'],storage:['storage','hdd','ssd','nvme','nand'],psu:['psu','power supply','watt','12vhpwr'],cooling:['cooling','heat','fan','thermal','heatsink'],os:['operating system','windows','linux','kernel','gui','cli','virtualisation','virtualization'],io:['input','output','keyboard','mouse','printer','scanner','oled','touchscreen']},
 IKR3023: {topologi:['topology','topologies','star','mesh','bus network','physical network'],struktur:['structured cabling','horizontal','backbone','permanent link','layout','trunking','conduit'],kabel:['cable types','fibre','fiber','utp','stp','single-mode','multimode','coaxial'],kelajuan:['ethernet speed','speed','gigabit','10gbase','cat8','cat6a','100base','1000base'],alatan:['tool','crimp','stripper','pliers','punch-down','wire cutter','drill'],peralatan:['tester','rack','patch panel','patch cord','label printer'],bahan:['materials','accessories','face plate','modular jack','rj45','cable tie'],prosedur:['termination','terminate','t568','straight-through','crossover','pinout']}
};

const PRECISE = [
 [/ddr4.*ddr5|ddr5.*ddr4/i,'DDR4 and DDR5 are different RAM generations. DDR5 can offer higher transfer rates and improved power management. They use different modules and slots, so check your motherboard and CPU before buying RAM.'],
 [/hdd.*ssd|ssd.*hdd/i,'An HDD stores data on spinning magnetic disks. An SSD uses flash memory and has no spinning parts. SSDs are normally faster, while both can keep data when power is off.'],
 [/(star.*mesh|mesh.*star)/i,'Star topology connects each device to a central switch. It is easy to manage, but the central switch is a single point of failure. Mesh topology can have several paths and better redundancy, but it costs more.'],
 [/t568a.*t568b|t568b.*t568a/i,'T568A and T568B are colour-code arrangements used when terminating twisted-pair copper cables. For a traditional straight-through cable, use the same arrangement at both ends. Always check the result with a cable tester.'],
 [/utp.*stp|stp.*utp/i,'UTP has twisted copper pairs without extra shielding. Shielded twisted-pair cable adds shielding to reduce electromagnetic interference (EMI). Choose the cable based on the installation area.']
];

export function getEnglishSuggestions(moduleCode, topicId) {
 const all = SUGGESTIONS[moduleCode] || {};
 return all[topicId] || (moduleCode === 'IKR3013' ? ['What does a CPU do?','How is an SSD different from an HDD?','What does RAM do?'] : ['What is a star topology?','What is T568B?','What does a cable tester do?']);
}

export function answerEnglishNotes({moduleCode,question='',activeTopicId=null}) {
 const guides = ENGLISH_GUIDES[moduleCode] || {};
 const raw = String(question).trim();
 const lower = raw.toLowerCase();
 if (!raw) return {text:'Please type a question about your module.',sources:[],mode:'notes'};
 if (/^(hello|hi|hey|good morning|good afternoon|salam|hai)[.! ]*$/.test(lower)) return {text:'Hello! I can explain topics using the saved eModul-IKR learning notes. Ask me a technical question.',sources:[],mode:'notes'};
 if (/^(thank you|thanks|ok|okay)[.! ]*$/.test(lower)) return {text:'You are welcome! What would you like to learn next?',sources:[],mode:'notes'};
 let match = null, max = 0;
 for (const [topicId, aliases] of Object.entries(ALIASES[moduleCode] || {})) {
  let score = aliases.reduce((sum,a)=>sum+(lower.includes(a)?a.length>6?3:2:0),0);
  if (score > max) {max=score;match=topicId;}
 }
 if (!match && activeTopicId && /^(explain|tell me more|why|how|give examples|summary|steps|what is this)/i.test(lower)) match = activeTopicId;
 if (!match || !guides[match]) return {text:'Sorry, I could not find a reliable match in this module. Please mention a topic such as CPU, SSD, RAM, operating system, network topology, RJ45 or cable tester. For the latest standards, ask your instructor or check official documentation.',sources:[],mode:'notes'};
 const guide = guides[match];
 const precise = PRECISE.find(([regex])=>regex.test(raw));
 const wantsPractice = /\b(quiz|practice|revision|test me|questions)\b/i.test(raw);
 const prefix = /\b(latest|newest|current|2026|2027|today|up-to-date)\b/i.test(raw) ? 'Note: I cannot search the live internet. This answer comes from the learning notes saved in the app.\n\n' : '';
 const text = wantsPractice ? `Try these three practice questions about ${guide.title}:\n\n${getEnglishSuggestions(moduleCode,match).map((q,i)=>`${i+1}. ${q}`).join('\n')}\n\nUse the module notes to check your answers. These are revision prompts, not unlock-quiz answers.`
 : prefix+(precise ? precise[1] : `From the ${guide.title} learning card:\n\n${guide.overview}\n\n${guide.points.map((p)=>`• ${p}`).join('\n')}`)+ '\n\nOpen this learning card to read the notes and examples.';
 return {text,sources:[{topicId:match,title:`${moduleCode} • ${guide.title}`,sections:['Easy English learning guide']}],mode:'notes'};
}
