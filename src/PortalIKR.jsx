import React, { useState, useEffect, Suspense, lazy } from 'react';
import { 
  Box, Cpu, CircuitBoard, Network, Cable, ChevronRight, 
  Loader2, Code2, Server, Database, GraduationCap, Sparkles, ArrowRight 
} from 'lucide-react';

import logoADTEC from './logo.png';

// Import modul menggunakan lazy loading
const ModuleIKR3013 = lazy(() => import('./IKR3013')); 
const ModuleIKR3023 = lazy(() => import('./IKR3023'));

// Komponen Skrin Loading (Tema Gelap)
const LoadingScreen = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white relative overflow-hidden px-4 text-center">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950"></div>
    <div className="relative z-10 flex flex-col items-center">
      <div className="w-16 h-16 border-4 border-slate-800 border-t-cyan-400 rounded-full animate-spin mb-6 shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>
      <h2 className="text-xl md:text-2xl font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Memuatkan Enjin</h2>
      <p className="text-slate-500 text-xs md:text-sm mt-2 font-mono">Sila tunggu sebentar...</p>
    </div>
  </div>
);

export default function PortalIKR() {
  const [activeModule, setActiveModule] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeModule]);

  if (activeModule === 'IKR3013') {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <ModuleIKR3013 onBackToPortal={() => setActiveModule(null)} />
      </Suspense>
    );
  }
  
  if (activeModule === 'IKR3023') {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <ModuleIKR3023 onBackToPortal={() => setActiveModule(null)} />
      </Suspense>
    );
  }

  // Paparan Landing Page Super Moden (Premium Dark Theme)
  return (
    <div className="min-h-screen font-sans flex flex-col selection:bg-cyan-500 selection:text-slate-900 bg-slate-950 relative overflow-hidden text-slate-200">
      
      {/* KOD CSS ANIMASI (Aurora & Grid) */}
      <style>{`
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        @keyframes aurora {
          0% { transform: translate(0%, 0%) rotate(0deg); }
          50% { transform: translate(10%, 20%) rotate(180deg); }
          100% { transform: translate(0%, 0%) rotate(360deg); }
        }
        .animate-aurora {
          animation: aurora 20s infinite linear;
        }
      `}</style>

      {/* 1. LATAR BELAKANG (Cyberpunk / Aurora Style) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Grid Lines */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 mask-image-gradient"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/80 to-slate-950"></div>
        
        {/* Glowing Orbs (Aurora Effect) */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/30 rounded-full blur-[120px] animate-aurora mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-cyan-600/20 rounded-full blur-[120px] animate-aurora mix-blend-screen" style={{ animationDirection: 'reverse', animationDuration: '25s' }}></div>
        <div className="absolute top-[30%] left-[30%] w-[30%] h-[30%] bg-indigo-600/20 rounded-full blur-[100px] animate-pulse"></div>
      </div>

      {/* 2. FLOATING NAVBAR (Gaya Vercel / Apple) */}
      <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50">
        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] px-4 py-3 md:px-6 md:py-4 rounded-2xl md:rounded-full flex justify-between items-center transition-all">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="bg-white/10 p-1.5 rounded-lg border border-white/5 backdrop-blur-md">
              <img src={logoADTEC} alt="Logo ADTEC" className="h-6 md:h-8 w-auto object-contain" />
            </div>
            <div className="h-6 w-px bg-white/20 hidden sm:block"></div>
            <h1 className="text-lg md:text-xl font-black tracking-tight flex items-center gap-1.5">
              <span className="text-white">Portal</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">IKR</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden md:flex gap-4 text-slate-400 mr-2">
                <Code2 size={18} className="hover:text-cyan-400 transition-colors cursor-pointer"/>
                <Server size={18} className="hover:text-cyan-400 transition-colors cursor-pointer"/>
                <Database size={18} className="hover:text-cyan-400 transition-colors cursor-pointer"/>
             </div>
             <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-cyan-300 bg-cyan-900/30 border border-cyan-500/30 px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-[0_0_15px_rgba(8,145,178,0.2)]">
               <GraduationCap size={16} className="text-cyan-400 w-4 h-4 md:w-5 md:h-5" />
               <span className="whitespace-nowrap">Pusat E-Pembelajaran</span>
             </div>
          </div>
        </div>
      </nav>

      {/* 3. KANDUNGAN UTAMA */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 pt-32 pb-12 relative z-10 flex flex-col justify-center">
        
        {/* HERO SECTION */}
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20 px-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 mb-8 backdrop-blur-md shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Sistem Generasi Baharu
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white leading-[1.1] drop-shadow-lg">
            Masa Depan <br className="hidden sm:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 filter drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              Teknologi Rangkaian
            </span>
          </h2>
          
          <p className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
            Teroka nota teori interaktif, model AR 3D, perunding infrastruktur AI, dan simulasi perkakasan berprestasi tinggi. Pilih modul untuk memulakan.
          </p>
        </div>

        {/* 4. GRID KAD MODUL (Neo-Glassmorphism) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pb-12">
          
          {/* KAD IKR3013 */}
          <button 
            onClick={() => setActiveModule('IKR3013')}
            className="group text-left bg-slate-900/40 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white/10 shadow-2xl hover:bg-slate-800/60 hover:border-blue-500/50 transition-all duration-500 relative overflow-hidden flex flex-col h-full"
          >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-500/20 blur-[50px] rounded-full group-hover:bg-blue-500/40 transition-colors duration-500"></div>
            
            <div className="relative z-10 flex-1">
              <div className="bg-slate-800/80 border border-white/10 text-blue-400 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-inner group-hover:scale-110 group-hover:text-blue-300 group-hover:border-blue-400/50 transition-all duration-300">
                <Cpu className="w-7 h-7 md:w-8 md:h-8" />
              </div>
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[10px] font-black rounded-md mb-3 md:mb-4 tracking-widest uppercase">
                <CircuitBoard size={12}/> Modul IKR 3013
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-3 md:mb-4 group-hover:text-blue-400 transition-colors tracking-tight">Computer Hardware</h3>
              
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-6 md:mb-8 font-medium group-hover:text-slate-300 transition-colors">
                Pelajari anatomi dalaman komputer, evolusi komponen fizikal, sistem operasi, dan gunakan Perunding AI untuk rekaan spesifikasi PC.
              </p>
            </div>

            <div className="relative z-10 mt-auto border-t border-white/10 pt-5 flex items-center justify-between">
              <span className="text-xs md:text-sm font-bold text-slate-300 group-hover:text-white transition-colors uppercase tracking-widest">Akses Modul</span>
              <div className="bg-blue-500/20 border border-blue-500/30 p-2 md:p-2.5 rounded-full text-blue-400 group-hover:bg-blue-500 group-hover:text-white group-hover:translate-x-2 transition-all">
                <ArrowRight size={18} className="md:w-5 md:h-5" />
              </div>
            </div>
          </button>

          {/* KAD IKR3023 */}
          <button 
            onClick={() => setActiveModule('IKR3023')}
            className="group text-left bg-slate-900/40 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white/10 shadow-2xl hover:bg-slate-800/60 hover:border-cyan-500/50 transition-all duration-500 relative overflow-hidden flex flex-col h-full"
          >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-cyan-500/20 blur-[50px] rounded-full group-hover:bg-cyan-500/40 transition-colors duration-500"></div>
            
            <div className="relative z-10 flex-1">
              <div className="bg-slate-800/80 border border-white/10 text-cyan-400 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-inner group-hover:scale-110 group-hover:text-cyan-300 group-hover:border-cyan-400/50 transition-all duration-300">
                <Network className="w-7 h-7 md:w-8 md:h-8" />
              </div>
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[10px] font-black rounded-md mb-3 md:mb-4 tracking-widest uppercase">
                <Cable size={12}/> Modul IKR 3023
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-3 md:mb-4 group-hover:text-cyan-400 transition-colors tracking-tight">Structured Cabling</h3>
              
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-6 md:mb-8 font-medium group-hover:text-slate-300 transition-colors">
                Kuasai topologi rangkaian, standard pengkabelan, media fiber optik, fungsi Patch Panel, dan simulasi Rak Server maya.
              </p>
            </div>

            <div className="relative z-10 mt-auto border-t border-white/10 pt-5 flex items-center justify-between">
              <span className="text-xs md:text-sm font-bold text-slate-300 group-hover:text-white transition-colors uppercase tracking-widest">Akses Modul</span>
              <div className="bg-cyan-500/20 border border-cyan-500/30 p-2 md:p-2.5 rounded-full text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white group-hover:translate-x-2 transition-all">
                <ArrowRight size={18} className="md:w-5 md:h-5" />
              </div>
            </div>
          </button>

        </div>
      </main>

      {/* 5. FOOTER */}
      <footer className="w-full py-6 md:py-8 bg-transparent text-center relative z-10 border-t border-white/10">
        <p className="text-slate-500 font-bold text-[10px] md:text-xs tracking-widest uppercase px-4 flex items-center justify-center gap-2">
          <span>Copyright &copy; TKR ADTEC Sandakan 2026</span>
          <span className="hidden sm:inline text-slate-700">|</span>
          <span className="hidden sm:inline text-slate-600">Sistem E-Pembelajaran Vokasional</span>
        </p>
      </footer>
    </div>
  );
}