import React, { useEffect, useRef, useState } from 'react';
import { Check, ChevronUp, CloudDownload, Download, RefreshCcw, Upload, Wifi, WifiOff, X } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { askOfflineWorker, exportProgressBackup, importProgressBackup } from './offlineSupport';

/** Small non-disruptive global control. Cache content & backup progress are optional actions. */
export default function OfflineLearning() {
  const { language } = useLanguage();
  const en = language === 'en';
  const [online, setOnline] = useState(() => typeof navigator === 'undefined' || navigator.onLine !== false);
  const [cacheInfo, setCacheInfo] = useState({ ready: false, cached: 0, total: 0 });
  const [expanded, setExpanded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const fileInput = useRef(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const refresh = () => {
      askOfflineWorker().then((info) => mounted.current && setCacheInfo(info));
    };
    const connect = () => { setOnline(navigator.onLine !== false); refresh(); };
    const onVisibility = () => { if (!document.hidden) refresh(); };
    refresh();
    window.addEventListener('online', connect);
    window.addEventListener('offline', connect);
    document.addEventListener('visibilitychange', onVisibility);
    navigator.serviceWorker?.addEventListener?.('controllerchange', refresh);
    navigator.serviceWorker?.ready?.then(refresh).catch(() => {});
    return () => {
      mounted.current = false;
      window.removeEventListener('online', connect);
      window.removeEventListener('offline', connect);
      document.removeEventListener('visibilitychange', onVisibility);
      navigator.serviceWorker?.removeEventListener?.('controllerchange', refresh);
    };
  }, []);

  useEffect(() => {
    const openFromDock = () => setExpanded(true);
    window.addEventListener('emodul:offline-open', openFromDock);
    return () => window.removeEventListener('emodul:offline-open', openFromDock);
  }, []);

  useEffect(() => {
    if (!expanded) return undefined;
    const onKey = event => { if (event.key === 'Escape') setExpanded(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [expanded]);

  useEffect(() => {
    // External resources are online-only. Prevent confusing blank tabs when offline.
    const guard = (event) => {
      if (navigator.onLine !== false) return;
      const anchor = event.target.closest?.('a[href]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#')) return;
      try {
        const link = new URL(href, window.location.href);
        if (link.origin === window.location.origin) return;
        event.preventDefault();
        setMessage(en ? 'External websites and PDFs need an internet connection.' : 'Laman luar dan PDF Google Drive memerlukan sambungan internet.');
        setExpanded(true);
      } catch { /* malformed href; leave existing behavior */ }
    };
    document.addEventListener('click', guard, true);
    return () => document.removeEventListener('click', guard, true);
  }, [en]);

  const prepare = async () => {
    if (!online) {
      setMessage(en ? 'Reconnect to the internet before downloading offline content.' : 'Sambungkan internet dahulu untuk menyimpan bahan offline.');
      return;
    }
    setSaving(true); setMessage(en ? 'Saving both modules…' : 'Menyimpan kedua-dua modul…');
    try {
      const result = await askOfflineWorker('OFFLINE_PREPARE', 60000);
      setCacheInfo(result);
      setMessage(result.ready
        ? (en ? 'Ready! Both modules can now open offline on this device.' : 'Siap! Kedua-dua modul boleh dibuka offline pada peranti ini.')
        : (en ? 'Could not save all files. Try again while connected.' : 'Tidak semua fail berjaya disimpan. Cuba lagi apabila internet stabil.'));
    } catch {
      setMessage(en ? 'Could not prepare offline files.' : 'Tidak dapat menyediakan fail offline.');
    } finally { setSaving(false); }
  };

  const backup = () => {
    try {
      const count = exportProgressBackup();
      setMessage(en ? `Progress backup downloaded (${count} records).` : `Sandaran kemajuan dimuat turun (${count} rekod).`);
    } catch {
      setMessage(en ? 'Unable to export progress on this device.' : 'Kemajuan tidak dapat dieksport pada peranti ini.');
    }
  };

  const restore = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const count = await importProgressBackup(file);
      if (count) {
        window.alert(en ? `Restored ${count} records. The app will reload.` : `${count} rekod dipulihkan. Aplikasi akan dimuatkan semula.`);
        window.location.reload();
      }
    } catch (error) {
      setMessage(en ? `Cannot restore: ${error.message}` : `Tidak dapat pulihkan: ${error.message}`);
    }
  };

  const status = !online
    ? (en ? 'Offline Mode' : 'Mod Offline')
    : cacheInfo.ready ? (en ? 'Offline ready' : 'Sedia Offline')
      : (en ? 'Save offline' : 'Simpan Offline');

  return (
    <>
    {expanded && <button type="button" aria-label={en ? 'Close offline settings' : 'Tutup tetapan offline'} onClick={() => setExpanded(false)} className="fixed inset-0 z-[134] bg-slate-950/40 backdrop-blur-[2px] sm:hidden" />}
    <div data-no-translate className="pointer-events-none fixed bottom-[calc(env(safe-area-inset-bottom)+14px)] right-3 z-[135] max-w-[min(92vw,335px)] sm:bottom-24 sm:right-6" aria-label="Offline Learning Mode">
      {expanded && (
        <section className="pointer-events-auto mb-2 max-h-[min(78dvh,620px)] w-[min(92vw,335px)] overflow-y-auto rounded-[25px] border border-indigo-100 bg-white/95 p-4 text-slate-800 shadow-[0_20px_65px_rgba(15,23,42,.27)] backdrop-blur-xl" aria-label={en ? 'Offline learning settings' : 'Tetapan pembelajaran offline'}>
          <div className="flex items-center justify-between gap-2">
            <h2 className="flex items-center gap-2 text-sm font-extrabold text-indigo-900"><CloudDownload size={17}/>{en ? 'Offline Learning' : 'Pembelajaran Offline'}</h2>
            <button onClick={() => setExpanded(false)} aria-label={en ? 'Close' : 'Tutup'} className="rounded-lg p-1.5 hover:bg-slate-100"><X size={17}/></button>
          </div>
          <div className="mt-3 rounded-xl bg-indigo-50 p-3 text-xs leading-relaxed text-slate-700">
            {cacheInfo.ready
              ? <span className="flex items-center gap-1.5 font-bold text-emerald-700"><Check size={15}/>{en ? 'Both modules are saved for offline use.' : 'Kedua-dua modul sudah disimpan untuk offline.'}</span>
              : <span>{en ? 'Connect once and prepare the modules before going offline.' : 'Sambung internet sekali dan sediakan modul sebelum guna offline.'}</span>}
            <div className="mt-1 text-[11px] text-slate-500">{en ? 'Cached files' : 'Fail disimpan'}: {cacheInfo.cached || 0}{cacheInfo.total ? ` / ${cacheInfo.total}` : ''}</div>
          </div>
          <button type="button" onClick={prepare} disabled={saving || !online} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-700 px-3 py-2.5 text-xs font-bold text-white hover:bg-indigo-800 disabled:opacity-50"><CloudDownload size={16}/>{saving ? (en ? 'Saving…' : 'Menyimpan…') : (en ? 'Prepare offline content' : 'Sediakan Kandungan Offline')}</button>
          <p className="mt-2 text-[11px] leading-relaxed text-slate-500">{en ? 'Offline: notes, quizzes, local progress and Smart Tutor. Internet required: YouTube, Sketchfab, external PDFs and PC Nexus / CableLabX.' : 'Offline: nota, kuiz, kemajuan setempat dan Smart Tutor. Perlukan internet: YouTube, Sketchfab, PDF luar, PC Nexus dan CableLabX.'}</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button type="button" onClick={backup} className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-2 py-2 text-[11px] font-bold text-indigo-800 hover:bg-indigo-100"><Download size={14}/>{en ? 'Back up progress' : 'Sandar Kemajuan'}</button>
            <button type="button" onClick={() => fileInput.current?.click()} className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-2 py-2 text-[11px] font-bold text-indigo-800 hover:bg-indigo-100"><Upload size={14}/>{en ? 'Restore progress' : 'Pulihkan Kemajuan'}</button>
          </div>
          <input ref={fileInput} type="file" accept=".json,application/json" onChange={restore} className="hidden" />
          {message && <p role="status" className="mt-2 rounded-lg bg-slate-100 p-2 text-[11px] text-slate-700">{message}</p>}
        </section>
      )}
      <button type="button" onClick={() => setExpanded(v => !v)} aria-expanded={expanded} aria-label={en ? 'Offline status and settings' : 'Status dan tetapan offline'} className={`pointer-events-auto hidden max-w-full items-center gap-2 rounded-full border bg-white/95 px-3 py-2 text-xs font-bold shadow-lg backdrop-blur-sm transition hover:shadow-xl ${online ? 'border-indigo-200 text-indigo-700' : 'border-amber-200 text-amber-700'}`}>
        {online ? <Wifi size={15}/> : <WifiOff size={15}/>}
        <span>{status}</span>
        <ChevronUp size={13} className={`transition-transform ${expanded ? '' : 'rotate-180'}`}/>
      </button>
    </div>
    </>
  );
}
