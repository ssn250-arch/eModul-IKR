import { TOPIC_UNLOCK_BANKS } from '../src/TopicUnlockBanks.js';
import { getQuizQuestions } from '../src/TopicQuizEngine.js';

let tested = 0;
for (const [moduleCode, topics] of Object.entries(TOPIC_UNLOCK_BANKS)) {
  for (const [topicId, bank] of Object.entries(topics)) {
    if (bank.length < 8) throw new Error(`Bank kurang 8: ${moduleCode}/${topicId}`);
    const sets = new Set();
    for (let studentNo = 1; studentNo <= 29; studentNo += 1) {
      const quiz = getQuizQuestions(moduleCode, topicId, studentNo);
      if (quiz.length !== 5) throw new Error(`Bukan 5 soalan: ${moduleCode}/${topicId}`);
      if (quiz.some(item => !Number.isInteger(item.correct) || item.correct < 0 || item.correct >= item.options.length)) throw new Error(`Jawapan tidak sah: ${moduleCode}/${topicId}`);
      const key = quiz.map(item => item.question).sort().join(' | ');
      if (sets.has(key)) throw new Error(`Pelajar memperoleh set sama: ${moduleCode}/${topicId}/${studentNo}`);
      sets.add(key);
      tested++;
    }
    console.log(`LULUS ${moduleCode}/${topicId}: 29 set berbeza, 5 soalan/set`);
  }
}
console.log(`LULUS SEMUA: ${tested} set kuiz diperiksa.`);
