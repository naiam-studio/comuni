import React from 'react';
import { ArrowRight, Globe, Shield, Zap } from 'lucide-react';

interface LandingPageProps {
  onAccess: () => void;
  onWiki: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onAccess, onWiki }) => {
  return (
    <div className="min-h-screen w-full relative overflow-x-hidden bg-[#020617] flex flex-col font-sans text-white">
      {/* Fondo con imagen y overlays de alta calidad */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071" 
          alt="Colaboración" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#020617] via-[#020617]/90 to-transparent" />
        <div className="absolute inset-0 bg-[#083344]/30 mix-blend-overlay" />
      </div>

      {/* Navegación superior */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-5 md:px-16 bg-[#083344] border-b border-white/5 shadow-2xl">
        <div className="flex items-center">
          <span className="text-[29px] md:text-[36px] font-black tracking-[-0.07em] lowercase text-white leading-none">
            comuni
          </span>
        </div>
        <div className="flex items-center gap-4 md:gap-10">
          <button 
            onClick={onWiki}
            className="text-white text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] hover:text-cyan-300 transition-colors hidden sm:block"
          >
            Cómo funciona
          </button>
          <button 
            onClick={onAccess}
            className="bg-white text-[#083344] px-5 py-2 md:px-7 md:py-2.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] hover:scale-105 transition-all shadow-lg hover:shadow-white/10"
          >
            Acceder
          </button>
        </div>
      </nav>

      {/* Layout Principal */}
      <main className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-[70%_30%] px-6 md:px-16 py-12 md:py-0">
        
        {/* Contenido Izquierda - Alineación izquierda */}
        <div className="flex flex-col justify-center max-w-5xl order-1">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.95] md:leading-[0.9] mb-6 md:mb-8 whitespace-nowrap">
            ¿Decidimos <span className="text-cyan-400">juntos?</span>
          </h1>
          
          <p className="text-white/80 text-base md:text-xl font-medium leading-relaxed mb-8 md:mb-12 max-w-2xl">
            Aplicación que transforma la conversación en Acción. Comuni Impulsa la Democracia Abierta con tecnología de Vanguardia. Invita a tu Comunidad y genera espacios de decisión.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full">
            <button 
              onClick={onAccess}
              className="bg-cyan-500 text-white px-8 md:px-12 py-4 md:py-5 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.3em] flex items-center justify-center gap-3 md:gap-4 hover:bg-cyan-400 transition-all group shadow-2xl shadow-cyan-500/20"
            >
              Comenzar ahora <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onWiki}
              className="border border-white/20 text-white px-8 md:px-12 py-4 md:py-5 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-white/10 transition-colors backdrop-blur-md"
            >
              Documentación
            </button>
          </div>
        </div>

        {/* Columna Derecha: Patrocinadores */}
        <div className="relative flex flex-col justify-end pb-8 lg:pb-24 lg:border-l lg:border-white/5 lg:pl-12 mt-12 lg:mt-0 order-2">
          <div className="flex flex-col gap-8 md:gap-10">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] md:tracking-[0.6em] text-white/60">Patrocinado por:</span>
            
            <div className="flex flex-col gap-10 md:gap-12 items-start">
              <div className="h-14 md:h-20 flex items-center">
                <img 
                  src="https://www.ahpc.ar/assets/images/logos/logo_cordoba_sh.png" 
                  alt="Córdoba SH" 
                  className="h-full w-auto object-contain transition-opacity"
                />
              </div>

              <div className="h-20 md:h-28 flex items-center bg-white/5 px-4 rounded-xl">
                <img 
                  src="https://webs.uab.cat/incasi1/wp-content/uploads/sites/308/2016/05/UNC.png" 
                  alt="UNC" 
                  className="h-full w-auto object-contain transition-opacity"
                />
              </div>

              <div className="h-14 md:h-20 w-48 md:w-64 overflow-hidden flex items-center rounded-lg">
                <img 
                  src="https://www.starknet.io/wp-content/uploads/2024/04/sn_logo_banner.png" 
                  alt="Starknet" 
                  className="h-full w-full object-cover scale-125 origin-center transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-8 border-t border-white/5 px-6 md:px-16 flex flex-wrap justify-between items-center text-white/60 gap-8 bg-black/20 backdrop-blur-sm">
        <div className="flex flex-wrap gap-6 md:gap-12">
          <div className="flex items-center gap-2">
            <Shield size={14} className="text-cyan-400" />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em]">Vota de manera Privada y demuestra que lo hiciste</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe size={14} className="text-cyan-400" />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em]">Registros en Sistema Inalterable</span>
          </div>
        </div>
        <span className="text-[9px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em]">comuni.com.ar © 2026</span>
      </footer>
    </div>
  );
};

export default LandingPage;
