import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUp, BookOpenCheck, Bot, GraduationCap, MessageCircleMore, RotateCcw, Sparkles, WifiOff, X } from 'lucide-react';
import { answerFromModuleNotes, getSuggestedQuestions } from './SmartKnowledgeEngine';

const MODULE_META = {
  IKR3013: {
    heading: 'Pembantu Perkakasan & Perisian',
    intro: 'Hai! Saya Smart Knowledge Tutor IKR3013. Saya boleh bantu menerangkan CPU, motherboard, RAM, storan, sistem operasi dan perkakasan berdasarkan nota eModul-IKR, tanpa API key.',
    examplePrompts: ['Apakah fungsi CPU?', 'Jelaskan beza HDD dengan SSD', 'Mengapa RAM perlu serasi dengan motherboard?', 'Apakah UEFI?']
  },
  IKR3023: {
    heading: 'Pembantu Pengkabelan Rangkaian',
    intro: 'Hai! Saya Smart Knowledge Tutor IKR3023. Saya boleh bantu menerangkan topologi, kabel, alatan, standard dan penamatan berdasarkan nota eModul-IKR, tanpa API key.',
    examplePrompts: ['Bezakan topologi star dan mesh', 'Mengapa kabel Cat6A digunakan?', 'Apakah fungsi patch panel?', 'Terangkan langkah penamatan RJ45']
  }
};

const initialAssistant = (moduleCode) => [{ role: 'assistant', text: MODULE_META[moduleCode]?.intro || 'Hai! Tanya saya tentang modul anda.', sources: [], mode: 'welcome' }];

export default function StudyChatbot({ moduleCode, topics = [], activeTopicId = null }) {
  const meta = MODULE_META[moduleCode];
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(() => initialAssistant(moduleCode));
  const [draft, setDraft] = useState('');
  const bottom = useRef(null);
  const inputRef = useRef(null);

  const currentTopic = useMemo(() => topics.find((t) => t.id === activeTopicId), [topics, activeTopicId]);
  const suggestions = useMemo(() => getSuggestedQuestions(moduleCode, currentTopic?.id || null), [moduleCode, currentTopic]);

  useEffect(() => {
    if (open) bottom.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [open, messages]);
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const sendMessage = (message) => {
    const question = String(message || '').trim();
    if (!question || question.length > 1200) return;

    // Follow-up ringkas gunakan topik terakhir yang dirujuk, jika tiada kad aktif.
    const lastTopicId = [...messages].reverse().find((item) => item.role === 'assistant' && item.sources?.[0]?.topicId)?.sources?.[0]?.topicId;
    const reply = answerFromModuleNotes({ moduleCode, topics, question, activeTopicId: activeTopicId || lastTopicId || null });
    setMessages((prev) => [...prev, { role: 'user', text: question, sources: [] }, { role: 'assistant', ...reply }]);
    setDraft('');
  };

  const clearChat = () => { setMessages(initialAssistant(moduleCode)); setDraft(''); };

  return (
    <div className="fixed bottom-4 right-4 z-[120] sm:bottom-6 sm:right-6" aria-label={`Pembantu Pembelajaran ${moduleCode}`}>
      <style>{`
        @keyframes emodulChatEnter { from { opacity:0; transform: translateY(14px) scale(.97) } to { opacity:1; transform: translateY(0) scale(1) } }
        @keyframes emodulChatPulse { 0%,100% {box-shadow:0 0 0 0 rgba(79,70,229,.25)} 50% {box-shadow:0 0 0 8px rgba(79,70,229,0)} }
        .emodul-chat-enter { animation: emodulChatEnter .25s ease-out both; }
        .emodul-chat-pulse { animation: emodulChatPulse 2.8s ease-in-out infinite; }
        @media(prefers-reduced-motion:reduce){.emodul-chat-enter,.emodul-chat-pulse{animation:none}}
      `}</style>
      {!open ? (
        <button type="button" onClick={() => setOpen(true)} className="emodul-chat-pulse group flex items-center gap-3 rounded-full bg-gradient-to-r from-indigo-700 via-blue-700 to-violet-700 px-4 py-3 text-white shadow-2xl transition hover:-translate-y-1 hover:shadow-indigo-500/30" aria-label={`Buka chatbot ${moduleCode}`}>
          <span className="relative rounded-full bg-white/15 p-2"><Bot size={24}/><span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-indigo-700 bg-emerald-400" /></span>
          <span className="hidden text-left sm:block"><span className="block text-sm font-black">Tanya Pembantu</span><span className="block text-[11px] text-indigo-100">{moduleCode} • Bahasa Melayu</span></span>
          <MessageCircleMore size={17} className="hidden text-indigo-100 sm:block"/>
        </button>
      ) : (
        <section role="dialog" aria-label={`Chatbot pembelajaran ${moduleCode}`} className="emodul-chat-enter flex h-[min(680px,calc(100dvh-28px))] w-[min(410px,calc(100vw-28px))] flex-col overflow-hidden rounded-[26px] border border-indigo-100 bg-white text-slate-900 shadow-[0_24px_80px_rgba(15,23,42,.22)]">
          <header className="relative shrink-0 overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-900 to-violet-700 p-4 text-white">
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
            <div className="relative flex items-start justify-between gap-2">
              <div className="flex items-start gap-3">
                <span className="rounded-2xl border border-white/20 bg-white/15 p-2.5"><Bot size={25}/></span>
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-indigo-200"><Sparkles size={12}/> eModul-IKR Assistant</div>
                  <h2 className="text-base font-black leading-snug">{meta?.heading}</h2>
                  <div className="mt-1 flex flex-wrap gap-1.5 text-[10px] font-semibold">
                    <span className="rounded-full bg-white/15 px-2 py-1">{moduleCode}</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-1"><><WifiOff size={11}/> Tanpa API • Nota Tempatan</></span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button title="Kosongkan chat" aria-label="Kosongkan perbualan" onClick={clearChat} type="button" className="rounded-xl p-2 transition hover:bg-white/15"><RotateCcw size={17}/></button>
                <button title="Tutup chat" aria-label="Tutup perbualan" onClick={() => setOpen(false)} type="button" className="rounded-xl p-2 transition hover:bg-white/15"><X size={19}/></button>
              </div>
            </div>
          </header>
          <div className="flex-1 space-y-4 overflow-y-auto bg-gradient-to-b from-slate-50 via-white to-indigo-50/40 px-4 py-5" aria-live="polite">
            <div className="mx-auto flex w-fit items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-semibold text-slate-500"><GraduationCap size={13}/> Pembelajaran Teknikal TVET</div>
            {messages.map((m, i) => (
              <div key={`${i}-${m.role}`} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${m.role === 'user' ? 'rounded-br-md bg-gradient-to-br from-indigo-600 to-blue-700 text-white' : 'rounded-bl-md border border-slate-100 bg-white text-slate-700'}`}>
                  {m.role === 'assistant' && <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-indigo-600"><BookOpenCheck size={13}/>Pembantu Nota Modul</div>}
                  <div className="whitespace-pre-wrap break-words">{m.text}</div>
                  {m.sources?.length > 0 && <div className="mt-3 space-y-1.5 border-t border-slate-100 pt-2"><div className="text-xs font-bold text-slate-500">Rujukan dalam eModul:</div>{m.sources.map((source, idx) => <div key={`${source.topicId}-${idx}`} className="rounded-lg bg-indigo-50 px-2 py-1.5 text-xs font-semibold text-indigo-700"><BookOpenCheck size={12} className="mr-1 inline"/>{source.title}</div>)}</div>}
                </div>
              </div>
            ))}
            {messages.length <= 2 && <div className="flex flex-wrap gap-2">{suggestions.map((tip) => <button key={tip} type="button" onClick={() => sendMessage(tip)} className="rounded-full border border-indigo-200 bg-white px-3 py-2 text-left text-xs font-semibold text-indigo-700 transition hover:border-indigo-400 hover:bg-indigo-50">{tip}</button>)}</div>}
            
            
            <div ref={bottom}/>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(draft); }} className="shrink-0 border-t border-slate-100 bg-white p-3">
            {currentTopic && <p className="mb-2 truncate rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">Topik aktif: {currentTopic.title}</p>}
            <div className="flex items-end gap-2 rounded-2xl border border-indigo-100 bg-slate-50 p-2 focus-within:border-indigo-400">
              <textarea ref={inputRef} value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(draft); } }} maxLength={1200} rows={2} placeholder="Tanya tentang modul ini..." aria-label="Soalan kepada pembantu modul" className="max-h-28 min-h-10 flex-1 resize-none bg-transparent px-2 py-1 text-sm text-slate-800 outline-none placeholder:text-slate-400" />
              <button type="submit" aria-label="Hantar soalan" disabled={!draft.trim()} className="mb-0.5 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 p-3 text-white shadow transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"><ArrowUp size={19}/></button>
            </div>
            <p className="mt-2 text-center text-[10px] leading-relaxed text-slate-500">Tanpa API key dan tanpa caj API • Jawapan daripada nota modul, bukan carian web masa nyata. Semak fakta kritikal bersama pensyarah. Jangan masukkan data peribadi.</p>
          </form>
        </section>
      )}
    </div>
  );
}
