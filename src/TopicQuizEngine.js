import { EN_QUIZ_BANKS } from './QuizEnglish.js';
import { TOPIC_UNLOCK_BANKS } from './TopicUnlockBanks.js';
export const MAX_STUDENTS = 30;

const nthCombination = (count, choose, nth) => {
  const result = [];
  let left = choose;
  let index = 0;
  let k = nth;
  while (left > 0) {
    const combosAfter = (n, r) => {
      if (r === 0) return 1;
      if (n < r) return 0;
      let x = 1;
      for (let i = 1; i <= r; i += 1) x = (x * (n - r + i)) / i;
      return Math.round(x);
    };
    for (let j = index; j <= count - left; j += 1) {
      const possibilities = combosAfter(count - j - 1, left - 1);
      if (k < possibilities) {
        result.push(j);
        index = j + 1;
        break;
      }
      k -= possibilities;
    }
    left -= 1;
  }
  return result;
};

const seededNumber = (input) => {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash = Math.imul(hash ^ input.charCodeAt(i), 16777619);
  }
  return hash >>> 0;
};

const seededShuffle = (items, seed) => {
  const output = [...items];
  let state = seed || 1;
  const nextRandom = () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 4294967296;
  };
  for (let i = output.length - 1; i > 0; i -= 1) {
    const j = Math.floor(nextRandom() * (i + 1));
    [output[i], output[j]] = [output[j], output[i]];
  }
  return output;
};

export const getQuizQuestions = (moduleCode, topicId, studentNumber, attempt = 0, language = 'ms') => {
  const pool = TOPIC_UNLOCK_BANKS[moduleCode]?.[topicId];
  if (!pool || pool.length < 8) throw new Error(`Bank topik belum lengkap: ${moduleCode}/${topicId}`);
  const totalCombinations = (() => {
    let count = 1;
    for (let i = 1; i <= 5; i += 1) count = (count * (pool.length - 5 + i)) / i;
    return Math.round(count);
  })();
  const topicShift = seededNumber(`${moduleCode}:${topicId}:questions`) % totalCombinations;
  const uniqueStudentSet = (topicShift + studentNumber - 1 + attempt * MAX_STUDENTS) % totalCombinations;
  const english = EN_QUIZ_BANKS[moduleCode]?.[topicId];
  const selected = nthCombination(pool.length, 5, uniqueStudentSet).map((idx) => language === 'en' && english?.[idx]
    ? { ...pool[idx], question: english[idx].question, options: english[idx].options } : pool[idx]);
  const questionSeed = seededNumber(`${moduleCode}:${topicId}:${studentNumber}:${attempt}`);
  return seededShuffle(selected, questionSeed).map((q, index) => {
    const choices = seededShuffle(q.options.map((text, originalIndex) => ({ text, originalIndex })), questionSeed + 151 * (index + 1));
    return {
      question: q.question,
      options: choices.map((choice) => choice.text),
      correct: choices.findIndex((choice) => choice.originalIndex === q.correct)
    };
  });
};

