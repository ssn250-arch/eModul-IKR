import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Box, Cpu, CircuitBoard, Network, Cable, ChevronRight, Loader2, Code2, Server, Database, GraduationCap } from 'lucide-react';

import logoADTEC from './logo.png';

// Import modul menggunakan lazy loading untuk penjimatan data internet
const ModuleIKR3013 = lazy(() => import('./IKR3013')); 
const ModuleIKR3023 = lazy(() => import('./IKR3023'));

// Komponen Skrin Loading (Responsif)
const LoadingScreen = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white relative overflow-hidden px-4 text-center">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900 to-slate-900"></div>
    <Loader2 size={48} className="text-blue-500 animate-spin mb-4 relative z-10" />
    <h2 className="text-xl md:text-2xl font-bold relative z-10 tracking-wide">Memuatkan Sistem...</h2>
    <p className="text-slate-400 text-xs md:text-sm mt-2 relative z-10">Menyediakan persekitaran pembelajaran.</p>
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

  return (
    <div className="min-h-screen font-sans flex flex-col selection:bg-blue-300 selection:text-blue-900 bg-slate-50 relative overflow-hidden">
      
      {/* KOD CSS ANIMASI */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>

      {/* LATAR BELAKANG TEMA IT */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.04]" 
          style={{ 
            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
            backgroundSize: '32px 32px' 
          }}>
        </div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] max-w-2xl max-h-2xl bg-blue-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] max-w-2xl max-h-2xl bg-indigo-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] max-w-2xl max-h-2xl bg-purple-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* HEADER GLASSMORPHISM (Responsif) */}
      <header className="bg-white/60 backdrop-blur-xl border-b border-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-4">
            <img 
              src={logoADTEC} 
              alt="Logo ADTEC" 
              className="h-8 sm:h-10 md:h-12 w-auto object-contain drop-shadow-sm hover:scale-105 transition-transform"
            />
            <div className="h-6 md:h-8 w-px bg-slate-300 hidden sm:block"></div>
            <h1 className="text-lg md:text-2xl font-black tracking-tight hidden sm:flex items-center gap-1.5 md:gap-2">
              <Box className="text-indigo-600 w-5 h-5 md:w-6 md:h-6"/>
              <span className="text-slate-800">eModul</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">IKR</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex gap-3 text-slate-400 mr-2">
                <Code2 size={20} className="hover:text-blue-500 transition-colors cursor-pointer"/>
                <Server size={20} className="hover:text-blue-500 transition-colors cursor-pointer"/>
                <Database size={20} className="hover:text-blue-500 transition-colors cursor-pointer"/>
             </div>
             
             <div className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs font-bold text-blue-700 bg-blue-100/80 border border-blue-200 px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-inner">
               <GraduationCap size={16} className="text-blue-600 w-4 h-4 md:w-5 md:h-5" />
               <span className="whitespace-nowrap">Pusat E-Pembelajaran</span>
             </div>
          </div>
        </div>
      </header>

      {/* KANDUNGAN UTAMA (Responsif) */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 md:py-12 relative z-10 flex flex-col justify-center">
        
        {/* HERO SECTION IT */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 mt-4 md:mt-12 px-2">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 md:mb-6 tracking-tight text-slate-900 leading-[1.15] md:leading-[1.1]">
            Langkah ke Masa Depan <br className="hidden sm:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Teknologi Rangkaian
            </span>
          </h2>
          
          <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed mb-8 md:mb-10 max-w-2xl mx-auto font-medium">
            Teroka nota teori interaktif, model AR 3D, perunding infrastruktur AI, dan simulasi perkakasan sebenar. Pilih modul di bawah untuk memulakan sesi.
          </p>
        </div>

        {/* GRID KAD MODUL (Responsif) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pb-12">
          
          {/* KAD IKR3013 */}
          <button 
            onClick={() => setActiveModule('IKR3013')}
            className="group text-left bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(37,99,235,0.12)] hover:-translate-y-2 hover:border-blue-200 transition-all duration-500 relative overflow-hidden flex flex-col h-full"
          >
            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-bl from-blue-100 to-transparent rounded-bl-full -z-10 transition-transform group-hover:scale-125 duration-700"></div>
            
            <div className="relative z-10 flex-1">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow">
                <Cpu className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              
              <div className="inline-block px-3 py-1 bg-blue-50/80 border border-blue-100 text-blue-700 text-[10px] font-black rounded-lg mb-3 md:mb-4 tracking-widest uppercase shadow-sm">
                Modul IKR 3013
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-3 md:mb-4 group-hover:text-blue-700 transition-colors">Computer Hardware & Software</h3>
              
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6 md:mb-8 font-medium">
                Pelajari anatomi dalaman komputer, evolusi komponen fizikal, sistem operasi, dan gunakan Perunding AI untuk mereka spesifikasi PC.
              </p>
            </div>

            <div className="relative z-10 mt-auto flex items-center gap-3 md:gap-4">
              <div className="bg-slate-900 text-white p-2.5 md:p-3 rounded-xl group-hover:bg-blue-600 transition-colors shadow-md">
                <ChevronRight size={18} className="md:w-5 md:h-5" />
              </div>
              <span className="text-xs md:text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors uppercase tracking-wide">Buka Modul</span>
            </div>
          </button>

          {/* KAD IKR3023 */}
          <button 
            onClick={() => setActiveModule('IKR3023')}
            className="group text-left bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(16,185,129,0.12)] hover:-translate-y-2 hover:border-emerald-200 transition-all duration-500 relative overflow-hidden flex flex-col h-full"
          >
            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-bl from-emerald-100 to-transparent rounded-bl-full -z-10 transition-transform group-hover:scale-125 duration-700"></div>
            
            <div className="relative z-10 flex-1">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-shadow">
                <Network className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              
              <div className="inline-block px-3 py-1 bg-emerald-50/80 border border-emerald-100 text-emerald-700 text-[10px] font-black rounded-lg mb-3 md:mb-4 tracking-widest uppercase shadow-sm">
                Modul IKR 3023
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-3 md:mb-4 group-hover:text-emerald-700 transition-colors">Network Structured Cabling</h3>
              
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6 md:mb-8 font-medium">
                Kuasai topologi rangkaian, standard pengkabelan, jenis media kabel, fungsi Patch Panel, dan simulasi Rak Server 3D maya.
              </p>
            </div>

            <div className="relative z-10 mt-auto flex items-center gap-3 md:gap-4">
              <div className="bg-slate-900 text-white p-2.5 md:p-3 rounded-xl group-hover:bg-emerald-600 transition-colors shadow-md">
                <ChevronRight size={18} className="md:w-5 md:h-5" />
              </div>
              <span className="text-xs md:text-sm font-bold text-slate-700 group-hover:text-emerald-600 transition-colors uppercase tracking-wide">Buka Modul</span>
            </div>
          </button>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full py-6 md:py-8 bg-transparent text-center relative z-10 border-t border-slate-200/50">
        <p className="text-slate-500 font-bold text-[10px] md:text-xs tracking-widest uppercase px-4">
          Copyright &copy; TKR ADTEC Sandakan 2026
        </p>
      </footer>
    </div>
  );
}