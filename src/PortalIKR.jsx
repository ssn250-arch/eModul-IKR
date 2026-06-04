import React, { useState, useEffect } from 'react';
import { Box, Cpu, CircuitBoard, Network, Cable, ChevronRight, Sparkles } from 'lucide-react';

// Import logo dari folder lokal anda (pastikan fail logo.png ada dalam folder src)
import logoADTEC from './logo.png';

// Import komponen dari fail modul anda (Pastikan fail dinamakan IKR3013.jsx dan IKR3023.jsx)
import ModuleIKR3013 from './IKR3013'; 
import ModuleIKR3023 from './IKR3023';

export default function PortalIKR() {
  const [activeModule, setActiveModule] = useState(null);

  // Animasi skrol ke atas apabila modul bertukar
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeModule]);

  // Routing Modul
  if (activeModule === 'IKR3013') {
    return <ModuleIKR3013 onBackToPortal={() => setActiveModule(null)} />;
  }
  if (activeModule === 'IKR3023') {
    return <ModuleIKR3023 onBackToPortal={() => setActiveModule(null)} />;
  }

  // Paparan Lalai (Landing Page Portal)
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col selection:bg-blue-200">
      {/* Header Portal */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            
            {/* Gambar Logo Tempatan */}
            <img 
              src={logoADTEC} 
              alt="Logo ADTEC/IKR" 
              className="h-10 md:h-12 w-auto object-contain drop-shadow-sm hover:scale-105 transition-transform"
            />
            
            <h1 className="text-2xl font-black text-slate-800 tracking-tight ml-1">
              Portal <span className="text-indigo-600">IKR</span>
            </h1>
          </div>
          <div className="text-sm font-bold text-slate-500 bg-slate-100 px-4 py-2 rounded-full border border-slate-200 hidden sm:block">
            Pusat E-Pembelajaran
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-10">
        
        {/* Banner Selamat Datang */}
        <div className="bg-gradient-to-br from-indigo-900 via-slate-800 to-indigo-950 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden mb-12 animate-fade-in border border-indigo-800/50">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-20 blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 opacity-20 blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-500/30 rounded-full text-indigo-200 text-xs font-bold mb-6 border border-indigo-400/30 backdrop-blur-sm">
              <Sparkles size={14} /> Selamat Datang ke Sistem Bersepadu
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
              Pilih Modul Pembelajaran Anda
            </h2>
            <p className="text-indigo-100/80 text-base md:text-lg">
              Akses nota interaktif, model AR 3D, perunding AI, dan uji kefahaman anda melalui modul-modul vokasional yang disediakan di bawah.
            </p>
          </div>
        </div>

        {/* Pilihan Modul */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
          
          {/* Kad Modul IKR3013 */}
          <button 
            onClick={() => setActiveModule('IKR3013')}
            className="group text-left bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-100 shadow-lg hover:shadow-2xl hover:border-blue-400 transition-all duration-300 relative overflow-hidden flex flex-col h-full"
          >
            <div className="absolute -top-10 -right-10 text-slate-100 group-hover:text-blue-50 transition-colors pointer-events-none transform group-hover:scale-110 duration-500">
              <Cpu size={200} />
            </div>
            
            <div className="relative z-10 flex-1">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <CircuitBoard size={32} />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors">IKR3013</h3>
              <h4 className="text-lg font-bold text-slate-600 mb-4">Computer Hardware & Software</h4>
              
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Ketahui anatomi dalaman komputer, evolusi komponen fizikal, sistem operasi, dan gunakan Perunding AI untuk spesifikasi PC anda.
              </p>
            </div>

            <div className="relative z-10 mt-auto border-t border-slate-100 pt-4 flex items-center justify-between">
              <span className="text-sm font-bold text-blue-600">Buka Modul</span>
              <div className="bg-blue-50 p-2 rounded-full text-blue-600 group-hover:translate-x-2 transition-transform">
                <ChevronRight size={20} />
              </div>
            </div>
          </button>

          {/* Kad Modul IKR3023 */}
          <button 
            onClick={() => setActiveModule('IKR3023')}
            className="group text-left bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-100 shadow-lg hover:shadow-2xl hover:border-emerald-400 transition-all duration-300 relative overflow-hidden flex flex-col h-full"
          >
            <div className="absolute -top-10 -right-10 text-slate-100 group-hover:text-emerald-50 transition-colors pointer-events-none transform group-hover:scale-110 duration-500">
              <Network size={200} />
            </div>
            
            <div className="relative z-10 flex-1">
              <div className="bg-emerald-100 text-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Cable size={32} />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors">IKR3023</h3>
              <h4 className="text-lg font-bold text-slate-600 mb-4">Network Structured Cabling</h4>
              
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Pelajari topologi rangkaian, standard pengkabelan bangunan, jenis kabel, fungsi Patch Panel, dan simulasi Rak Server.
              </p>
            </div>

            <div className="relative z-10 mt-auto border-t border-slate-100 pt-4 flex items-center justify-between">
              <span className="text-sm font-bold text-emerald-600">Buka Modul</span>
              <div className="bg-emerald-50 p-2 rounded-full text-emerald-600 group-hover:translate-x-2 transition-transform">
                <ChevronRight size={20} />
              </div>
            </div>
          </button>

        </div>
      </main>

      <footer className="w-full py-6 bg-white border-t border-slate-200 text-center shadow-inner mt-auto">
        <p className="text-slate-500 font-semibold text-sm tracking-wide">
          Copyright &copy; TKR ADTEC Sandakan 2026
        </p>
      </footer>
    </div>
  );
}