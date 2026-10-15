import assert from 'node:assert/strict';
import { getQuizQuestions, MAX_STUDENTS } from '../src/TopicQuizEngine.js';
import { EN_QUIZ_BANKS } from '../src/QuizEnglish.js';
import { TOPIC_UNLOCK_BANKS } from '../src/TopicUnlockBanks.js';
import { translateVisibleText, getCoverageKeys } from '../src/translations.js';
let sets = 0, items = 0;
assert.equal(MAX_STUDENTS,30);
for (const [moduleCode,topics] of Object.entries(TOPIC_UNLOCK_BANKS)) {
 for (const [topicId,bank] of Object.entries(topics)) {
  const en = EN_QUIZ_BANKS[moduleCode]?.[topicId];
  assert.equal(en.length, bank.length,`${moduleCode}/${topicId}`);
  for (const [i,q] of bank.entries()) { assert.equal(en[i].options.length,q.options.length); assert.ok(en[i].question.length>10); }
  for (let student=1;student<=30;student++) {
    const malay=getQuizQuestions(moduleCode,topicId,student,0,'ms');
    const english=getQuizQuestions(moduleCode,topicId,student,0,'en');
    assert.equal(malay.length,5);
    assert.deepEqual(malay.map(q=>q.correct),english.map(q=>q.correct));
    const allEnglishStems = new Set(en.map(q=>q.question));
    assert.ok(english.every(q=>allEnglishStems.has(q.question)));
    sets++;items+=english.length;
  }
 }
}
assert.equal(translateVisibleText('Pelajar 30'),'Student 30');
assert.equal(translateVisibleText('Pilih nombor pelajar'),'Select student number');
assert.equal(translateVisibleText('CPU'),'CPU');
assert.equal(translateVisibleText('Kemajuan Penguasaan Anda'),'Your Learning Progress');
assert.equal(translateVisibleText('Status Bacaan Modul'),'Module Learning Progress');
assert.equal(translateVisibleText('Sila pelajari topik ini:'),'Please study this topic:');
assert.equal(translateVisibleText('Sila teliti nota:'),'Please read the notes:');
assert.equal(translateVisibleText('0 daripada 8 Topik Lulus Kuiz'),'0 of 8 Topics Passed');
assert.equal(translateVisibleText('0 / 8 Topik Lulus Kuiz'),'0 of 8 Topics Passed');
assert.equal(translateVisibleText('Pelajar: Belum dipilih • Tukar'),'Student: Not selected • Change');
assert.equal(translateVisibleText('Pelajar: 30 • Tukar'),'Student: 30 • Change');
for (const code of ['3013','3023']) {
  const module = (await import('node:fs')).readFileSync(new URL(`../src/IKR${code}.jsx`, import.meta.url),'utf8');
  assert.ok(module.includes('const { language, t } = useLanguage()'),`${code}: module must subscribe to language setting`);
  assert.ok(module.includes("t('Topik Lulus Kuiz', 'Topics Passed')"),`${code}: progress count must be reactive`);
  assert.ok(module.includes("t('Belum dipilih', 'Not selected')"),`${code}: student label must be reactive`);
}

console.log(`PASS: ${sets} student-topic sets, ${items} quiz appearances, ${getCoverageKeys().length} translated interface/note strings.`);
