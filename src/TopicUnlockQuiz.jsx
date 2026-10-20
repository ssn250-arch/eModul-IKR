import React, { useMemo, useState } from 'react';
import { ArrowLeft, Award, CheckCircle, ChevronRight, LockKeyhole, RefreshCw, Sparkles, XCircle } from 'lucide-react';
import { getQuizQuestions, MAX_STUDENTS } from './TopicQuizEngine.js';
import { useLanguage } from './LanguageContext';

export const UNLOCK_PASS_MARK = 3;
const STUDENT_KEY = 'emodul_ikr_student_number_v1';

export const getStudentNumber = () => {
  try {
    const value = Number(localStorage.getItem(STUDENT_KEY));
    return Number.isInteger(value) && value >= 1 && value <= MAX_STUDENTS ? value : null;
  } catch { return null; }
};

// Enumerate 5-question combinations in increasing order. The first 30
// permutations are guaranteed distinct when the bank has >= 8 questions.
export default function TopicUnlockQuiz({ moduleCode, topic, onBack, onPassed, onNextTopic, onStudentSelected, isLastTopic = false, demoMode = false }) {
  const { language } = useLanguage();
  const [studentNumber, setStudentNumber] = useState(() => demoMode ? 1 : getStudentNumber());
  const [pendingStudent, setPendingStudent] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [showChangeStudent, setShowChangeStudent] = useState(false);

  const questions = useMemo(() => studentNumber ? getQuizQuestions(moduleCode, topic.id, studentNumber, attempt, language) : [], [moduleCode, topic.id, studentNumber, attempt, language]);
  const result = useMemo(() => questions.reduce((sum, question, i) => sum + (answers[i] === question.correct ? 1 : 0), 0), [questions, answers]);
  const passed = isFinished && result >= UNLOCK_PASS_MARK;

  const confirmStudent = () => {
    const parsed = Number(pendingStudent);
    if (!Number.isInteger(parsed) || parsed < 1 || parsed > MAX_STUDENTS) return;
    if (demoMode) return;
    try { localStorage.setItem(STUDENT_KEY, String(parsed)); } catch { /* Storan pelayar mungkin disekat. */ }
    onStudentSelected?.(parsed);
    setStudentNumber(parsed);
    setShowChangeStudent(false);
    setAttempt(0);
    setCurrent(0);
    setAnswers({});
    setIsFinished(false);
  };

  const chooseAnswer = (option) => {
    if (isFinished) return;
    setAnswers((previous) => ({ ...previous, [current]: option }));
  };

  const nextQuestion = () => {
    if (answers[current] === undefined || isFinished) return;
    if (current < 4) setCurrent((previous) => previous + 1);
    else {
      setIsFinished(true);
      const score = questions.reduce((sum, q, i) => sum + (answers[i] === q.correct ? 1 : 0), 0);
      if (!demoMode && score >= UNLOCK_PASS_MARK) onPassed(score);
    }
  };

  const retry = () => {
    setAttempt((previous) => previous + 1);
    setCurrent(0);
    setAnswers({});
    setIsFinished(false);
  };

  const enterStudent = !studentNumber || showChangeStudent;
  return (
    <div className="animate-fade-in w-full space-y-5">
      {demoMode && <p className="em3-inline-demo" role="status">MODE JURI — kuiz contoh. Skor ini tidak membuka atau menyimpan kemajuan pelajar.</p>}
      <style>{`
        @keyframes unlockEnter { from { opacity: 0; transform: translateY(14px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes unlockGlow { 0%,100% { box-shadow: 0 0 0 0 rgba(14,165,233,.14); } 50% { box-shadow: 0 0 0 12px rgba(14,165,233,0); } }
        .unlock-enter { animation: unlockEnter .4s ease-out; }
        .unlock-glow { animation: unlockGlow 2.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .unlock-enter, .unlock-glow { animation: none; } }
      `}</style>
      <section className="rounded-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-800 px-5 py-7 text-white shadow-xl sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button onClick={onBack} className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold transition hover:bg-white/20"><ArrowLeft size={16}/> Kembali ke Nota</button>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold"><LockKeyhole size={15}/> {demoMode ? 'Kuiz Demo' : 'Kuiz Unlock'} • {moduleCode}</span>
        </div>
        <div className="mt-6 flex items-center gap-3"><Sparkles size={30} className="text-amber-300"/><h2 className="text-2xl font-black sm:text-3xl">{topic.title}</h2></div>
        <p className="mt-2 text-sm leading-relaxed text-blue-100">Baca nota dahulu, kemudian jawab 5 soalan untuk membuka kad berikutnya. Markah lulus: <strong>{UNLOCK_PASS_MARK}/5</strong>.</p>
        {!enterStudent && <div className="mt-5 flex flex-wrap items-center gap-3 text-xs"><span className="rounded-full bg-white/15 px-3 py-1.5 font-bold">Pelajar #{studentNumber}</span><button disabled={demoMode} onClick={() => { setPendingStudent(String(studentNumber)); setShowChangeStudent(true); }} className="underline decoration-blue-200 underline-offset-2">Tukar nombor pelajar</button></div>}
      </section>
      {enterStudent ? (
        <section className="unlock-enter rounded-2xl border border-blue-100 bg-white p-7 shadow-lg">
          <h3 className="text-xl font-black text-slate-800">Tetapkan nombor pelajar</h3>
          <p className="mt-2 text-sm text-slate-600">Setiap pelajar mesti menggunakan nombor unik daripada <strong>1 hingga {MAX_STUDENTS}</strong> yang ditetapkan oleh pensyarah. Nombor ini memastikan set 5 soalan bagi setiap topik berbeza untuk semua 30 pelajar.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <select aria-label="Nombor pelajar" value={pendingStudent} onChange={(event) => setPendingStudent(event.target.value)} className="min-w-[190px] flex-1 rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 focus:border-blue-500 focus:outline-none">
              <option value="">Pilih nombor pelajar</option>
              {Array.from({length:MAX_STUDENTS}, (_, i) => <option key={i + 1} value={i + 1}>Pelajar {i + 1}</option>)}
            </select>
            <button disabled={!pendingStudent} onClick={confirmStudent} className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-md transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">Mulakan Kuiz</button>
          </div>
          <p className="mt-3 text-xs text-slate-500">Nombor pelajar dan kemajuan disimpan pada peranti/pelayar ini sahaja, bukan pelayan berpusat.</p>
        </section>
      ) : isFinished ? (
        <section className="unlock-enter rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-xl sm:p-10" aria-live="polite">
          <div className={`unlock-glow mx-auto flex h-20 w-20 items-center justify-center rounded-full ${passed ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>{passed ? <Award size={42}/> : <RefreshCw size={40}/>}</div>
          <h3 className="mt-5 text-3xl font-black text-slate-800">{demoMode ? 'Latihan Demo Selesai' : (passed ? 'Tahniah! Kad Berjaya Dibuka' : 'Teruskan Usaha!')}</h3>
          <p className="mt-3 text-5xl font-black text-blue-700">{result}<span className="text-2xl text-slate-400">/5</span></p>
          <p className="mt-3 text-sm text-slate-600">{demoMode ? 'Sesi pratonton sahaja: markah ini tidak direkodkan dan tidak mengubah status topik sebenar.' : passed ? (isLastTopic ? 'Anda telah melengkapkan semua checkpoint modul.' : 'Topik seterusnya kini boleh diakses.') : 'Anda belum mencapai 3/5. Ulang kaji dan cuba set soalan baharu.'}</p>
          <div className="mx-auto mt-6 max-w-xl space-y-2 text-left">
            {questions.map((question, index) => <div key={index} className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm">
              <div className="flex items-start gap-2">{answers[index] === question.correct ? <CheckCircle size={17} className="mt-0.5 shrink-0 text-emerald-600"/> : <XCircle size={17} className="mt-0.5 shrink-0 text-rose-500"/>}<span className="font-semibold text-slate-800">{index + 1}. {question.question}</span></div>
              {answers[index] !== question.correct && <p className="mt-1 pl-6 text-xs text-slate-600">Jawapan tepat: {question.options[question.correct]}</p>}
            </div>)}
          </div>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {!passed && <button onClick={retry} className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700">Cuba Lagi (Soalan Baharu)</button>}
            <button onClick={onBack} className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">Kembali ke Nota</button>
            {passed && !isLastTopic && <button onClick={onNextTopic} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-700">Buka Kad Seterusnya <ChevronRight size={18}/></button>}
          </div>
        </section>
      ) : (
        <section className="unlock-enter rounded-2xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-black uppercase tracking-widest text-blue-600">Soalan {current + 1} daripada 5</p>
            <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">Pelajar {studentNumber}</span>
          </div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-500" style={{width:`${((current + 1) / 5) * 100}%`}}/></div>
          <div key={`${attempt}-${current}`} className="unlock-enter mt-6">
            <h3 className="text-xl font-black leading-relaxed text-slate-800 sm:text-2xl">{questions[current].question}</h3>
            <div className="mt-6 grid gap-3">
              {questions[current].options.map((option, index) => <button key={index} onClick={() => chooseAnswer(index)} aria-pressed={answers[current] === index} className={`flex items-start gap-4 rounded-2xl border-2 p-4 text-left text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 sm:text-base ${answers[current] === index ? 'border-blue-600 bg-blue-50 text-blue-950 shadow-md' : 'border-gray-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50/40'}`}>
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black ${answers[current] === index ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>{String.fromCharCode(65 + index)}</span>
                <span>{option}</span>
              </button>)}
            </div>
          </div>
          <div className="mt-7 flex justify-end border-t border-slate-100 pt-5">
            <button onClick={nextQuestion} disabled={answers[current] === undefined} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-black text-white shadow-md transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300">{current === 4 ? 'Hantar Kuiz' : 'Soalan Seterusnya'} <ChevronRight size={18}/></button>
          </div>
        </section>
      )}
    </div>
  );
}
