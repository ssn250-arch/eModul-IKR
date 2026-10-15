import assert from 'node:assert/strict';
import { answerFromModuleNotes, getSuggestedQuestions, smartTutorInfo } from '../src/SmartKnowledgeEngine.js';

const hw = [
  { id:'cpu', title:'Unit Pemprosesan Pusat (CPU)', description:'CPU memproses arahan komputer dan bekerjasama dengan RAM.', content:{ basics:[{title:'Asas', points:['CPU ialah otak komputer dan memproses data.']}], advanced:[{title:'P-core',desc:'P-core ialah teras prestasi, E-core menumpukan kecekapan tenaga.'}]}},
  { id:'ram', title:'Memori (RAM)', description:'RAM menyediakan storan sementara', content:{ basics:[{title:'Asas',points:['RAM menyimpan data sementara untuk CPU.']}], advanced:[{title:'DDR5',desc:'DDR5 ialah generasi RAM terkini dengan MT/s lebih tinggi; keserasian motherboard penting.'}]}},
  { id:'storage', title:'Storan HDD dan SSD', description:'Menyimpan data tidak meruap', content:{ basics:[{title:'Jenis storan', points:['HDD menggunakan cakera magnetik; SSD menggunakan NAND flash.']}],advanced:[]}}
];
const cabling = [
  { id:'topologi', title:'Topologi Rangkaian', description:'Topologi star dan mesh', content:{basics:[{title:'Topologi',points:['Topologi star bersambung ke switch pusat.']}],advanced:[{title:'Mesh',desc:'Mesh menyediakan laluan redundan.'}]}},
  { id:'kelajuan', title:'Kelajuan Ethernet', description:'Piawaian 10GBASE-T dan 40GBASE-T', content:{basics:[{title:'Kelajuan',points:['Ethernet menggunakan pelbagai kategori kabel.']}], advanced:[{title:'Cat6A',desc:'Cat6A menyokong 10GBASE-T sehingga 100 meter. Cat8 menyokong 40GBASE-T sehingga sekitar 30 meter.'}]}},
  { id:'peralatan', title:'Peralatan & Pengujian', description:'Cable tester, patch panel dan rak server', content:{basics:[{title:'Pengujian',points:['Cable tester menguji wiremap. Patch panel mengurus penamatan kabel.']}],advanced:[]}},
  { id:'prosedur', title:'Prosedur Penamatan', description:'T568A dan T568B serta kabel crossover', content:{basics:[{title:'Penamatan',points:['Susunan pin perlu mematuhi T568A atau T568B.']}],advanced:[]}}
];
let ran=0;
const answer=(moduleCode, topics,question,activeTopicId=null)=>answerFromModuleNotes({moduleCode, topics,question,activeTopicId});
const cpu=answer('IKR3013',hw,'Apakah fungsi CPU?');
assert.match(cpu.text,/CPU|pemproses/i); assert.equal(cpu.sources[0].topicId,'cpu'); ran++;
const ddr=answer('IKR3013',hw,'Bezakan DDR4 dan DDR5');
assert.match(ddr.text,/DDR4.*DDR5/i); assert.equal(ddr.sources[0].topicId,'ram'); ran++;
const hdd=answer('IKR3013',hw,'Apa beza HDD dan SSD?');
assert.match(hdd.text,/HDD.*SSD/i); ran++;
const cat=answer('IKR3023',cabling,'Cat6A dan Cat8 sesuai untuk apa?');
assert.match(cat.text,/Cat6A.*Cat8/); assert.equal(cat.sources[0].topicId,'kelajuan'); ran++;
const top=answer('IKR3023',cabling,'Bezakan star dan mesh');
assert.match(top.text,/bintang|star/i); assert.equal(top.sources[0].topicId,'topologi'); ran++;
const cable=answer('IKR3023',cabling,'Apa fungsi patch panel?');
assert.equal(cable.sources[0].topicId,'peralatan'); ran++;
const mystery=answer('IKR3013',hw,'Bagaimana cara menanam sayur kangkung?');
assert.equal(mystery.sources.length,0); ran++;
const latest=answer('IKR3023',cabling,'Apakah Cat6A terkini 2026?');
assert.match(latest.text,/tidak menyemak internet secara langsung/); ran++;
const revision=answer('IKR3013',hw,'Beri soalan ulang kaji tentang RAM');
assert.match(revision.text,/soalan ulang kaji/); ran++;
assert.equal(getSuggestedQuestions('IKR3013','cpu').length,3); ran++;
assert.equal(smartTutorInfo.requiresApiKey,false); assert.equal(smartTutorInfo.usesNetwork,false); ran++;
console.log(`LULUS: ${ran} ujian enjin Smart Knowledge Tutor tanpa API (padanan, had fakta, rujukan, cadangan).`);
