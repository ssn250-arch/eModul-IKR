import React, { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Languages } from 'lucide-react';
import { translateVisibleText } from './translations.js';

const LANGUAGE_STORAGE_KEY = 'emodul_ikr_language_v1';
const LanguageContext = createContext({language:'ms', setLanguage:()=>{}, t:(ms,en)=>ms});

function storedLanguage() {
  try { return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) === 'en' ? 'en' : 'ms'; }
  catch { return 'ms'; }
}
export function useLanguage() { return useContext(LanguageContext); }

// Translate visible UI/note text without changing the original learning data or React state.
// Each DOM text node retains its original Malay source, so switching BM <-> EN is reversible.
function LiveTextTranslation({ language }) {
  const nodeRecords = useRef(new WeakMap());
  const attrRecords = useRef(new WeakMap());
  useLayoutEffect(() => {
    const host = document.getElementById('root');
    if (!host) return undefined;
    let timer = 0;
    let processing = false;
    const applyText = (node) => {
      if (!node?.parentElement || node.parentElement.closest('[data-no-translate], style, script, code, pre, textarea, input, select')) return;
      const raw = node.nodeValue;
      if (!raw?.trim()) return;
      const prior = nodeRecords.current.get(node);
      const source = prior && raw === prior.last ? prior.source : raw;
      const result = language === 'en' ? translateVisibleText(source) : source;
      nodeRecords.current.set(node,{source,last:result});
      if (raw !== result) node.nodeValue = result;
    };
    const applyAttrs = (element) => {
      if (element.closest('[data-no-translate]')) return;
      const attrs = ['placeholder','aria-label','title','alt'];
      let map = attrRecords.current.get(element);
      if (!map) { map = {}; attrRecords.current.set(element, map); }
      for (const attr of attrs) {
        const raw = element.getAttribute(attr);
        if (!raw) continue;
        const entry = map[attr];
        const source = entry && entry.last === raw ? entry.source : raw;
        const value = language === 'en' ? translateVisibleText(source) : source;
        map[attr] = {source,last:value};
        if (raw !== value) element.setAttribute(attr,value);
      }
    };
    const translateTree = (root) => {
      if (root.nodeType === Node.TEXT_NODE) { applyText(root); return; }
      if (root.nodeType !== Node.ELEMENT_NODE) return;
      if (root.closest('[data-no-translate], style, script')) return;
      applyAttrs(root);
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (node.nodeType === Node.TEXT_NODE) applyText(node);
        else applyAttrs(node);
      }
    };
    const scan = () => {
      if (processing) return;
      processing = true;
      try { translateTree(host); }
      finally { processing = false; }
    };
    scan();
    const obs = new MutationObserver(() => {
      if (timer) return;
      // Coalesce React updates and our own text changes into a single pass.
      timer = window.setTimeout(() => { timer = 0; scan(); }, 0);
    });
    obs.observe(host,{childList:true,characterData:true,subtree:true,attributes:true,attributeFilter:['title','placeholder','aria-label']});
    return () => { obs.disconnect(); if (timer) window.clearTimeout(timer); };
  }, [language]);
  return null;
}

export function LanguageProvider({children}) {
  const [language,setLang] = useState(storedLanguage);
  const setLanguage = (next) => setLang(next === 'en' ? 'en' : 'ms');
  useEffect(() => {
    document.documentElement.lang = language === 'en' ? 'en' : 'ms-MY';
    try { window.localStorage.setItem(LANGUAGE_STORAGE_KEY,language); } catch { /* Browser storage can be disabled. */ }
  }, [language]);
  return <LanguageContext.Provider value={{language,setLanguage,t:(ms,en)=>language==='en'?en:ms}}>
    {children}
    <LiveTextTranslation language={language}/>
  </LanguageContext.Provider>;
}

export function LanguageSwitcher({floating = false}) {
  const {language,setLanguage} = useLanguage();
  return <div data-no-translate className={`${floating ? 'hidden sm:inline-flex sm:fixed sm:bottom-6 sm:left-6 sm:z-[140] sm:shadow-xl' : 'relative z-10'} inline-flex shrink-0 items-center gap-1 rounded-full border border-indigo-100 bg-white/95 p-1 text-xs font-black text-indigo-800 shadow-sm backdrop-blur-md`} role="group" aria-label="Choose language / Pilih bahasa">
    <Languages size={16} className="ml-1.5 text-indigo-500" aria-hidden="true" />
    {[['ms','BM'],['en','EN']].map(([code,label]) => <button key={code} type="button" lang={code === 'ms' ? 'ms-MY' : 'en'} onClick={()=>setLanguage(code)} aria-pressed={language===code} title={code==='ms'?'Bahasa Melayu Malaysia':'Simple English'} className={`min-w-9 rounded-full px-2.5 py-1.5 transition focus-visible:outline-2 focus-visible:outline-indigo-600 ${language===code ? 'bg-indigo-700 text-white shadow' : 'text-slate-600 hover:bg-indigo-50'}`}>{label}</button>)}
  </div>;
}
