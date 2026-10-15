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
console.log(`PASS: ${sets} student-topic sets, ${items} quiz appearances, ${getCoverageKeys().length} translated interface/note strings.`);
