import React, { useEffect, useState } from 'react';
import { WifiOff, Video, Box, RefreshCw } from 'lucide-react';
import { useLanguage } from './LanguageContext';

/** Retains the exact original iframe while connected. Avoids a blank video/3D player offline. */
export default function OfflineEmbed({ src, title, className = '', style, ...props }) {
  const [connected, setConnected] = useState(() => typeof navigator === 'undefined' || navigator.onLine !== false);
  const { language } = useLanguage();
  useEffect(() => {
    const update = () => setConnected(navigator.onLine !== false);
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => { window.removeEventListener('online', update); window.removeEventListener('offline', update); };
  }, []);
  if (connected || !src?.startsWith('https://')) {
    return <iframe src={src} title={title || 'eModul-IKR Media'} className={className} style={style} loading="lazy" {...props} />;
  }
  const video = /youtu|vimeo/i.test(src);
  return (
    <div role="status" className={`flex min-h-[200px] w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-indigo-200 bg-indigo-50/80 p-5 text-center text-slate-600 ${className}`} style={style}>
      <span className="rounded-2xl bg-white p-3 text-indigo-600 shadow-sm">{video ? <Video size={28} /> : <Box size={28} />}</span>
      <div className="flex items-center gap-1.5 text-sm font-extrabold text-slate-800"><WifiOff size={16}/>{language === 'en' ? 'Internet connection required' : 'Memerlukan sambungan internet'}</div>
      <p className="max-w-sm text-xs leading-relaxed">{language === 'en' ? 'Videos and external 3D models are online-only. Notes, quizzes and Smart Tutor remain available offline.' : 'Video dan model 3D daripada platform luar hanya boleh dimuatkan secara online. Nota, kuiz dan Smart Tutor masih boleh digunakan offline.'}</p>
      <button type="button" onClick={() => setConnected(navigator.onLine !== false)} className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-bold text-indigo-700 shadow-sm hover:bg-indigo-100"><RefreshCw size={14}/>{language === 'en' ? 'Try again' : 'Cuba semula'}</button>
    </div>
  );
}
