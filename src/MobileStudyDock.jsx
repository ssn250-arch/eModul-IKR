import React, { useEffect, useRef, useState } from 'react';
import { Bot, CloudDownload, Languages, Sparkles, SlidersHorizontal, X, WifiOff } from 'lucide-react';
import { useLanguage } from './LanguageContext';

/** Mobile-only, compact learning tools. The reader can scroll without floating chips. */
export default function MobileStudyDock({ moduleCode = null }) {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [online, setOnline] = useState(() => typeof navigator === 'undefined' || navigator.onLine !== false);
  const lastY = useRef(0);
  const label = language === 'en' ? 'Study tools' : 'Alat Pembelajaran';

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const next = window.scrollY;
      const delta = next - lastY.current;
      if (Math.abs(delta) >= 3 && !open) setVisible(next < 155 || delta < 0);
      lastY.current = next;
    };
    const onlineUpdate = () => setOnline(navigator.onLine !== false);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('online', onlineUpdate);
    window.addEventListener('offline', onlineUpdate);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('online', onlineUpdate);
      window.removeEventListener('offline', onlineUpdate);
    };
  }, [open]);

  useEffect(() => {
    const escape = event => { if (event.key === 'Escape') setOpen(false); };
    const close = () => setOpen(false);
    window.addEventListener('keydown', escape);
    window.addEventListener('emodul:tools-close', close);
    return () => {
      window.removeEventListener('keydown', escape);
      window.removeEventListener('emodul:tools-close', close);
    };
  }, []);

  const trigger = type => {
    setOpen(false);
    setVisible(true);
    window.dispatchEvent(new Event(type));
  };
  const switchTo = code => {
    setLanguage(code);
    setOpen(false);
    setVisible(true);
  };

  return (
    <div data-no-translate className="fixed bottom-[calc(env(safe-area-inset-bottom)+16px)] right-3 z-[125] sm:hidden" aria-label={label}>
      {open && <button type="button" tabIndex={-1} aria-label={language === 'en' ? 'Close tools' : 'Tutup alat'} onClick={() => setOpen(false)} className="fixed inset-0 z-0 bg-slate-950/20 backdrop-blur-[2px]" />}
      <div className={`relative z-10 origin-bottom-right transition-all duration-200 motion-reduce:transition-none ${visible || open ? 'translate-y-0 opacity-100' : 'translate-y-[calc(100%+38px)] opacity-0 pointer-events-none'}`}>
        {open && <section role="dialog" aria-label={label} className="mb-3 w-[min(310px,calc(100vw-24px))] overflow-hidden rounded-[26px] border border-white/80 bg-white/95 text-slate-800 shadow-[0_22px_65px_rgba(15,23,42,.23)] backdrop-blur-2xl">
          <header className="flex items-start justify-between gap-2 bg-gradient-to-r from-[#0b1c40] via-[#172e70] to-[#3533a4] px-4 py-3.5 text-white">
            <div className="flex items-center gap-2.5">
              <span className="rounded-xl border border-white/20 bg-white/15 p-2"><Sparkles size={18}/></span>
              <div><h2 className="text-sm font-extrabold">{label}</h2><p className="text-[10px] text-blue-100">eModul-IKR · {moduleCode || 'Portal'}</p></div>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Tutup" className="rounded-lg p-2 hover:bg-white/15"><X size={17}/></button>
          </header>
          <div className="space-y-2 p-3">
            <button type="button" onClick={() => trigger('emodul:offline-open')} className="flex min-h-14 w-full items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3 text-left transition-colors hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-indigo-600">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">{online ? <CloudDownload size={19}/> : <WifiOff size={19}/>}</span>
              <span className="min-w-0 flex-1"><span className="block text-xs font-extrabold">{language === 'en' ? 'Offline Learning' : 'Simpan Offline'}</span><span className="block text-[10px] text-slate-500">{online ? (language === 'en' ? 'Save notes & learning progress' : 'Simpan nota & kemajuan') : (language === 'en' ? 'Offline mode' : 'Mod offline')}</span></span>
            </button>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2.5">
              <div className="mb-2 flex items-center gap-2 text-xs font-extrabold"><Languages size={17} className="text-indigo-600" />{language === 'en' ? 'Language' : 'Pilihan Bahasa'}</div>
              <div className="grid grid-cols-2 gap-2" role="group" aria-label="Pilih bahasa">
                {[['ms','BM'],['en','EN']].map(([code,text]) => <button key={code} type="button" lang={code === 'ms' ? 'ms-MY' : 'en'} aria-pressed={language === code} onClick={() => switchTo(code)} className={`min-h-11 rounded-xl px-3 py-2 text-xs font-extrabold transition-colors focus-visible:outline-2 focus-visible:outline-indigo-600 ${language === code ? 'bg-indigo-700 text-white shadow-md' : 'border border-slate-200 bg-white text-slate-700'}`}>{text} {language === code ? '✓' : ''}</button>)}
              </div>
            </div>
            {moduleCode && <button type="button" onClick={() => trigger('emodul:chat-open')} className="flex min-h-14 w-full items-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-700 p-3 text-left text-white shadow-[0_8px_18px_rgba(79,70,229,.2)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-indigo-600">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15"><Bot size={21}/></span>
              <span className="min-w-0 flex-1"><span className="block text-xs font-extrabold">{language === 'en' ? 'Smart Study Tutor' : 'Tanya AI Tutor'}</span><span className="block text-[10px] text-indigo-100">{language === 'en' ? 'Help from module notes' : 'Bantuan berdasarkan nota modul'}</span></span>
            </button>}
          </div>
        </section>}
        <button type="button" aria-expanded={open} aria-label={open ? (language === 'en' ? 'Close study tools' : 'Tutup alat pembelajaran') : label} onClick={() => {setOpen(v => !v); setVisible(true);}} className="ml-auto flex min-h-12 items-center gap-2 rounded-2xl border border-white/25 bg-gradient-to-br from-[#132453] via-[#2b39b8] to-[#5344e4] px-3.5 py-2.5 text-xs font-extrabold text-white shadow-[0_10px_28px_rgba(39,56,142,.36)] ring-1 ring-indigo-200/50 backdrop-blur-xl transition-transform active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          {open ? <X size={18}/> : <SlidersHorizontal size={18}/>}<span>{language === 'en' ? 'Tools' : 'Alat'}</span>
        </button>
      </div>
    </div>
  );
}
