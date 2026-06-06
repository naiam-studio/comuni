import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  UserCheck, 
  MessageSquare, 
  Link as LinkIcon, 
  Vote, 
  CheckCircle, 
  Smartphone,
  BookOpen,
  Lock,
  Zap,
  ChevronRight,
  Menu,
  X,
  Layers,
  Milestone,
  Users,
  Award,
  Cpu,
  Globe,
  Building2,
  Users2,
  Settings2,
  GitBranch,
  UserPlus,
  Fingerprint,
  Plus,
  PlusCircle,
  User as UserIcon
} from 'lucide-react';

interface WikiPageProps {
  onBack: () => void;
}

type SectionId = 'intro' | 'espacios' | 'step-by-step' | 'use-cases' | 'tech' | 'roadmap';

const WikiPage: React.FC<WikiPageProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState<SectionId>('intro');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sections = [
    { id: 'intro', label: 'Qué es Comuni', icon: <BookOpen size={18} /> },
    { id: 'espacios', label: 'Gobernanza y\nEstructura', icon: <GitBranch size={18} /> },
    { id: 'step-by-step', label: 'Manual del\nCiudadano', icon: <Zap size={18} /> },
    { id: 'use-cases', label: 'Casos de Uso', icon: <Users size={18} /> },
    { id: 'tech', label: 'Tecnología ZK', icon: <Lock size={18} /> },
    { id: 'roadmap', label: 'Hoja de Ruta', icon: <Milestone size={18} /> },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'intro':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#083344] mb-4 block">Documentación Oficial</span>
            <h2 className="text-5xl font-black tracking-tighter mb-8 leading-none text-[#083344]">comuni - El sistema operativo de la voluntad colectiva.</h2>
            <div className="space-y-6 text-gray-600 text-lg font-medium leading-relaxed">
              <p>
                comuni.com.ar es la plataforma definitiva para la toma de decisiones en comunidad. Diseñada bajo principios de <span className="text-black font-bold uppercase text-sm tracking-widest border-b-2 border-black">minimalismo funcional</span>, permite a grupos humanos organizarse, debatir y votar con total transparencia.
              </p>
              <p>
                Desde la creación de comunidades autónomas hasta la gestión de espacios temáticos, comuni empodera al ciudadano mediante una identidad digital protegida por criptografía de vanguardia.
              </p>
              <div className="p-8 bg-cyan-50/30 border border-cyan-100 rounded-[2.5rem] mt-12">
                <div className="flex items-center gap-3 mb-4">
                  <Fingerprint className="text-[#083344]" size={24} />
                  <h4 className="text-xl font-black tracking-tight text-[#083344]">Identidad y KYC</h4>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Implementamos un sistema de <span className="font-bold text-black">KYC (Know Your Citizen)</span> basado en pruebas de conocimiento cero (ZK). Esto permite verificar que eres una persona real y residente de una zona sin necesidad de exponer tus datos sensibles en cada votación.
                </p>
              </div>
            </div>
          </div>
        );

      case 'espacios':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#083344] mb-4 block">Estructura de Gobernanza</span>
            <h2 className="text-4xl font-black tracking-tighter mb-8 text-[#083344]">Fundación y Espacios</h2>
            <p className="text-gray-500 mb-12 font-medium text-lg leading-relaxed">
              La arquitectura de comuni permite una personalización total de las reglas de convivencia para cada organización.
            </p>
            
            <div className="space-y-8">
              {/* Fundación de Comunidad */}
              <div className="p-8 bg-[#083344] text-white rounded-[2.5rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Building2 size={120} />
                </div>
                <div className="relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-2 block">La Fundación</span>
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-4">Crear una Comunidad</h3>
                  <p className="text-cyan-100/60 font-medium leading-relaxed mb-6">
                    Al fundar una comunidad, el administrador define los parámetros maestros: requerimiento de KYC verificado para votar y la posibilidad de que los miembros creen sus propios espacios de debate.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                      <h4 className="text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-2 text-cyan-400">
                        <UserPlus size={14} /> Colaboradores
                      </h4>
                      <p className="text-[11px] text-cyan-100/50">Invita a gestores específicos mediante email para co-administrar la comunidad y moderar los debates.</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                      <h4 className="text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-2 text-cyan-400">
                        <Globe size={14} /> Espacios Libres
                      </h4>
                      <p className="text-[11px] text-cyan-100/50">Configura si la comunidad es jerárquica o si cualquier ciudadano verificado puede abrir nuevos hilos de gestión.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Creación de Espacios */}
              <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex gap-6 items-start">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#083344] shadow-sm flex-shrink-0">
                  <PlusCircle size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight mb-2 text-[#083344]">Gestión Dinámica de Espacios</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">
                    Los espacios pueden ser creados instantáneamente desde la barra lateral. Cada espacio segmenta las propuestas para que la conversación sea eficiente y enfocada.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'step-by-step':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#083344] mb-4 block">Manual del Ciudadano</span>
            <h2 className="text-4xl font-black tracking-tighter mb-6 text-[#083344]">Cómo participar</h2>
            <p className="text-gray-500 mb-10 font-medium text-lg">Sigue el flujo de empoderamiento ciudadano:</p>
            
            <div className="relative border-l-2 border-gray-100 ml-4 space-y-10 pb-4">
              {[
                { title: "1. Perfil y Residencia", desc: "Personaliza tu identidad digital. Define tu nombre y zona de residencia.", icon: <UserIcon size={18} /> },
                { title: "2. Validación Biométrica (KYC)", desc: "Escanea tu documento oficial con firma ZK.", icon: <Fingerprint size={18} /> },
                { title: "3. Descubrimiento", desc: "Navega por las comunidades o funda una nueva.", icon: <Globe size={18} /> },
                { title: "4. Apertura de Espacios", desc: "Crea áreas de discusión específicas.", icon: <Plus size={18} /> },
                { title: "5. Propuestas", desc: "Lanza iniciativas con evidencia multimedia.", icon: <MessageSquare size={18} /> },
                { title: "6. Voto Consciente", desc: "Ejerce tu derecho al voto verificado.", icon: <Vote size={18} /> }
              ].map((step, idx) => (
                <div key={idx} className="relative pl-12 group">
                  <div className="absolute -left-[1.35rem] top-0 w-10 h-10 bg-white border-2 border-gray-100 group-hover:border-[#083344] rounded-xl flex items-center justify-center text-gray-400 group-hover:text-[#083344] shadow-sm transition-all duration-300">
                    {step.icon || <Milestone size={18} />}
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-tight mb-1 leading-none group-hover:text-[#083344] transition-colors">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium max-w-xl">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'use-cases':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#083344] mb-4 block">Aplicación Real</span>
            <h2 className="text-4xl font-black tracking-tighter mb-8 text-[#083344]">Casos de Uso</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['Consorcios 2.0', 'Empresas Horizontales', 'Asambleas Barriales', 'Clubes y ONGs'].map((caseName, i) => (
                <div key={i} className="p-8 border border-gray-100 rounded-3xl hover:bg-cyan-50/20 transition-colors">
                  <h4 className="font-black text-lg mb-2 text-[#083344]">{caseName}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">Gestión participativa y democrática con identidad validada inalterable.</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'tech':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#083344] mb-4 block">Seguridad Matemática</span>
            <h2 className="text-4xl font-black tracking-tighter mb-8 text-[#083344]">Tecnología ZK & Gemini</h2>
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-2xl flex items-start gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm"><Lock size={24} className="text-[#083344]" /></div>
                <div>
                  <h4 className="font-black text-sm uppercase tracking-widest mb-1 text-[#083344]">Zero Knowledge KYC</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">Privacidad absoluta certificada matemáticamente.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'roadmap':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#083344] mb-4 block">Evolución Continua</span>
            <h2 className="text-4xl font-black tracking-tighter mb-8 text-[#083344]">Próximos Pasos</h2>
            <div className="space-y-4">
              {[
                { phase: "Fase 1: Identidad", status: "Done", task: "Perfiles, residencias y KYC biométrico." },
                { phase: "Fase 2: Comunidades", status: "Done", task: "Fundación y espacios dinámicos." },
                { phase: "Fase 3: Delegación", status: "WIP", task: "Democracia líquida y voto delegado." }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-6 bg-white border border-gray-100 rounded-3xl">
                  <div>
                    <h4 className="font-black text-lg text-[#083344]">{item.phase}</h4>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{item.task}</p>
                  </div>
                  <span className={`text-[9px] font-black px-3 py-1 rounded-full border ${item.status === 'Done' ? 'bg-[#083344] text-white border-[#083344]' : 'text-gray-400 border-gray-100'}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col md:flex-row">
      {/* Sidebar Navigation - Restaurado a color sólido */}
      <aside className={`
        fixed inset-y-0 left-0 z-[60] w-72 bg-[#083344] border-r border-[#083344]/20 transform transition-transform duration-300 md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full p-8">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center">
              <span className="text-[29px] font-black tracking-[-0.07em] lowercase text-white leading-none">
                comuni
              </span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-white">
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 space-y-3 overflow-y-auto pr-2">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id as SectionId);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all group text-left ${
                  activeSection === section.id 
                  ? 'bg-white text-[#083344] shadow-xl shadow-black/20' 
                  : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className={`flex-shrink-0 ${activeSection === section.id ? 'text-[#083344]' : 'text-white/20 group-hover:text-white'}`}>
                  {section.icon}
                </span>
                <span className="whitespace-pre-line leading-tight">
                  {section.label}
                </span>
                <ChevronRight size={14} className={`ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 ${activeSection === section.id ? 'opacity-100' : ''}`} />
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-8 border-t border-white/10">
            <button 
              onClick={onBack}
              className="w-full flex items-center gap-3 px-4 py-4 text-white/30 hover:text-white font-black uppercase text-[10px] tracking-[0.3em] transition-colors"
            >
              <ArrowLeft size={16} />
              Volver
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="md:hidden flex items-center justify-between p-6 border-b border-gray-50 bg-[#083344] text-white sticky top-0 z-50">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2">
            <Menu size={24} />
          </button>
          <span className="text-[25px] font-black tracking-[-0.07em] lowercase text-white leading-none">
            comuni
          </span>
          <div className="w-10"></div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 md:p-24">
          <div className="max-w-3xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#083344]/20 backdrop-blur-sm z-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

// Simple helper component that was missing
const Search = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);

export default WikiPage;