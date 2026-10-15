import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUp, BookOpenCheck, Bot, ChevronDown, ExternalLink, GraduationCap, LoaderCircle, MessageCircleMore, RotateCcw, ShieldCheck, Sparkles, Wifi, WifiOff, X } from 'lucide-react';

const MODULE_META = {
  IKR3013: {
    heading: 'Pembantu Perkakasan & Perisian',
    intro: 'Hai! Saya Pembantu eModul-IKR. Tanya saya tentang CPU, motherboard, RAM, storan, sistem operasi dan perkakasan lain.',
    examplePrompts: ['Apakah fungsi CPU?', 'Jelaskan beza HDD dengan SSD', 'Mengapa RAM perlu serasi dengan motherboard?', 'Apakah UEFI?']
  },
  IKR3023: {
    heading: 'Pembantu Pengkabelan Rangkaian',
    intro: 'Hai! Saya Pembantu eModul-IKR. Saya boleh bantu menerangkan topologi, kabel rangkaian, alatan, standard dan kerja penamatan kabel.',
    examplePrompts: ['Bezakan topologi star dan mesh', 'Mengapa kabel Cat6A digunakan?', 'Apakah fungsi patch panel?', 'Terangkan langkah penamatan RJ45']
  }
};

const STOPWORDS = new Set(['yang','apakah','adakah','dan','atau','untuk','seperti','dalam','dengan','ini','itu','saya','satu','dua','tiga','secara','daripada','pada','kepada','macam','mana','bagaimana','boleh','juga','apa','kenapa','mengapa','tolong','jelaskan','terangkan','fungsi','contoh','beza','antara','tentang','berikan','buat','bagi','ada','adalah','the','why','how','what','its','and','are','dari','ialah','ialah','ke','di','yg','nk']);

const words = (text) => String(text || '').toLowerCase().normalize('NFKC').match(/[\p{L}\p{N}]+/gu)?.filter((w) => w.length >= 3 && !STOPWORDS.has(w)) || [];

const shorten = (text, limit = 390) => String(text || '').slice(0, limit);

// Context is derived solely from the notes already shown on the site, not external invented material.
const getLearningNotes = (topics, question = '', currentTopicId = '') => {
  const queryWords = words(question);
  const mapped = topics.map((topic) => {
    const cards = [...(topic.content?.basics || []).map((b) => ({ title: b.title, text: (b.points || []).join(' ') })),
      ...(topic.content?.advanced || []).map((a) => ({ title: a.title, text: a.desc }))];
    const header = `${topic.title} ${topic.description} ${cards.map((x) => x.title).join(' ')}`.toLowerCase();
    const whole = `${header} ${cards.map((x) => x.text).join(' ')}`.toLowerCase();
    const score = queryWords.reduce((sum, w) => sum + (header.includes(w) ? 5 : whole.includes(w) ? 2 : 0), 0) + (topic.id === currentTopicId ? 2 : 0);
    return { topic, cards, score };
  }).sort((a, b) => b.score - a.score);
  return mapped.slice(0, 3);
};

const buildContext = (topics, question, currentTopicId) => getLearningNotes(topics, question, currentTopicId)
  .map(({ topic, cards }) => `TOPIK: ${topic.title}\nRINGKASAN: ${topic.description}\n${cards.slice(0, 8).map((c) => `${c.title}: ${c.text}`).join('\n')}`)
  .join('\n\n').slice(0, 8500);

const offlineAnswer = (topics, question, currentTopicId) => {
  const matches = getLearningNotes(topics, question, currentTopicId);
  const best = matches[0];
  if (!best || (!best.score && words(question).length > 1)) {
    return { text: 'Saya belum menemui penerangan yang tepat dalam nota modul ini. Cuba nyatakan nama topik (contohnya CPU, RAM, Cat6A atau Patch Panel) atau buka kad berkaitan. Untuk penjelasan mendalam dan semakan standard terkini, aktifkan sambungan AI dalam talian.', sources: [] };
  }
  const terms = words(question);
  const snippets = best.cards.map((card) => {
    const text = `${card.title} ${card.text}`.toLowerCase();
    return { card, value: terms.reduce((sum, term) => sum + (text.includes(term) ? 1 : 0), 0) };
  }).sort((a, b) => b.value - a.value).slice(0, 2).map(({ card }) => `• ${card.title}: ${shorten(card.text, 360)}`);
  return { text: `Berdasarkan nota ${best.topic.title}:\n\n${[best.topic.description, ...snippets].join('\n\n')}\n\nRujuk kad “${best.topic.title}” untuk maklumat lanjut. Ini jawapan berdasarkan kandungan modul yang tersedia pada peranti; ia bukan semakan berita atau standard secara langsung.`, sources: [] };
};

const safeUrl = (url) => {
  try { return new URL(url).protocol === 'https:' ? url : null; } catch { return null; }
};

const initialAssistant = (moduleCode) => [{ role: 'assistant', text: MODULE_META[moduleCode]?.intro || 'Hai! Tanya saya tentang modul anda.', sources: [], mode: 'welcome' }];
const AI_ENDPOINT = (import.meta.env.VITE_AI_CHAT_ENDPOINT || '').trim();

export default function StudyChatbot({ moduleCode, topics = [], activeTopicId = null }) {
  const meta = MODULE_META[moduleCode];
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(() => initialAssistant(moduleCode));
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottom = useRef(null);
  const inputRef = useRef(null);
  const controller = useRef(null);

  const currentTopic = useMemo(() => topics.find((t) => t.id === activeTopicId), [topics, activeTopicId]);
  const suggestions = useMemo(() => currentTopic
    ? [`Terangkan ${currentTopic.title}`, `Apakah aplikasi ${currentTopic.title} dalam kerja sebenar?`, 'Beri contoh soalan untuk ulang kaji']
    : (meta?.examplePrompts || []), [currentTopic, meta]);

  useEffect(() => {
    if (open) bottom.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [open, messages, loading]);
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);
  useEffect(() => () => controller.current?.abort(), []);

  const sendMessage = async (message) => {
    const question = String(message || '').trim();
    if (!question || loading || question.length > 1200) return;
    const prior = messages;
    setMessages((prev) => [...prev, { role: 'user', text: question, sources: [] }]);
    setDraft('');
    setError('');
    setLoading(true);
    try {
      if (!AI_ENDPOINT) {
        const reply = offlineAnswer(topics, question, activeTopicId);
        setMessages((prev) => [...prev, { role: 'assistant', ...reply, mode: 'notes' }]);
      } else {
        const timeout = new AbortController();
        controller.current = timeout;
        const response = await fetch(AI_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            moduleCode,
            question,
            context: buildContext(topics, question, activeTopicId),
            history: prior.filter((m) => m.mode !== 'welcome').slice(-8).map(({ role, text }) => ({ role, text: text.slice(0, 1200) }))
          }),
          signal: timeout.signal
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok || !data.answer) throw new Error(data.error || 'Sambungan AI tidak berjaya.');
        const sources = (Array.isArray(data.sources) ? data.sources : []).filter((s) => safeUrl(s.url)).slice(0, 5);
        setMessages((prev) => [...prev, { role: 'assistant', text: data.answer, sources, mode: data.webChecked ? 'web' : 'ai' }]);
      }
    } catch (e) {
      if (e.name !== 'AbortError') {
        setError('AI dalam talian tidak dapat dihubungi. Saya telah tunjukkan jawapan daripada nota yang tersedia.');
        const reply = offlineAnswer(topics, question, activeTopicId);
        setMessages((prev) => [...prev, { role: 'assistant', ...reply, mode: 'notes' }]);
      }
    } finally {
      setLoading(false);
      controller.current = null;
    }
  };

  const clearChat = () => { controller.current?.abort(); setLoading(false); setMessages(initialAssistant(moduleCode)); setError(''); };

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
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-1">{AI_ENDPOINT ? <><Wifi size={11}/> AI Dalam Talian</> : <><WifiOff size={11}/> Mod Nota</>}</span>
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
                  {m.role === 'assistant' && <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-indigo-600"><BookOpenCheck size={13}/>{m.mode === 'web' ? 'Jawapan AI • Semakan Web' : m.mode === 'ai' ? 'Jawapan AI' : 'Pembantu Nota Modul'}</div>}
                  <div className="whitespace-pre-wrap break-words">{m.text}</div>
                  {m.sources?.length > 0 && <div className="mt-3 space-y-1.5 border-t border-slate-100 pt-2"><div className="text-xs font-bold text-slate-500">Sumber web:</div>{m.sources.map((s, idx) => <a className="flex items-center gap-1.5 break-all text-xs font-semibold text-indigo-700 hover:underline" href={s.url} key={s.url + idx} rel="noopener noreferrer" target="_blank"><ExternalLink size={12}/> {s.title || s.url}</a>)}</div>}
                </div>
              </div>
            ))}
            {messages.length <= 2 && <div className="flex flex-wrap gap-2">{suggestions.map((tip) => <button key={tip} type="button" onClick={() => sendMessage(tip)} className="rounded-full border border-indigo-200 bg-white px-3 py-2 text-left text-xs font-semibold text-indigo-700 transition hover:border-indigo-400 hover:bg-indigo-50">{tip}</button>)}</div>}
            {loading && <div className="flex items-center gap-2 rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm"><LoaderCircle size={18} className="animate-spin text-indigo-600"/> Sedang menyediakan jawapan...</div>}
            {error && <p role="status" className="rounded-xl bg-amber-50 p-3 text-xs text-amber-700">{error}</p>}
            <div ref={bottom}/>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(draft); }} className="shrink-0 border-t border-slate-100 bg-white p-3">
            {currentTopic && <p className="mb-2 truncate rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">Topik aktif: {currentTopic.title}</p>}
            <div className="flex items-end gap-2 rounded-2xl border border-indigo-100 bg-slate-50 p-2 focus-within:border-indigo-400">
              <textarea ref={inputRef} value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(draft); } }} maxLength={1200} rows={2} placeholder="Tanya tentang modul ini..." aria-label="Soalan kepada pembantu modul" className="max-h-28 min-h-10 flex-1 resize-none bg-transparent px-2 py-1 text-sm text-slate-800 outline-none placeholder:text-slate-400" />
              <button type="submit" aria-label="Hantar soalan" disabled={!draft.trim() || loading} className="mb-0.5 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 p-3 text-white shadow transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"><ArrowUp size={19}/></button>
            </div>
            <p className="mt-2 text-center text-[10px] leading-relaxed text-slate-500">{AI_ENDPOINT ? 'Semak fakta penting dengan pensyarah dan sumber rasmi.' : 'Jawapan berdasarkan nota modul sahaja • Untuk AI terkini, sambungkan backend.'} Jangan masukkan data peribadi.</p>
          </form>
        </section>
      )}
    </div>
  );
}
