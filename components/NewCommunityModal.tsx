import React, { useState } from 'react';
import { X, Users, Globe, ShieldCheck, Plus, Trash2, Mail } from 'lucide-react';
import { Community } from '../types';

interface NewCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (community: Omit<Community, 'id' | 'spaces'>) => void;
}

const NewCommunityModal: React.FC<NewCommunityModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('🏛️');
  const [collaboratorEmail, setCollaboratorEmail] = useState('');
  const [collaborators, setCollaborators] = useState<string[]>([]);
  const [allowFreeSpaces, setAllowFreeSpaces] = useState(true);
  const [requireKYC, setRequireKYC] = useState(true);

  if (!isOpen) return null;

  const handleAddCollaborator = (e: React.FormEvent) => {
    e.preventDefault();
    if (collaboratorEmail && !collaborators.includes(collaboratorEmail)) {
      setCollaborators([...collaborators, collaboratorEmail]);
      setCollaboratorEmail('');
    }
  };

  const removeCollaborator = (email: string) => {
    setCollaborators(collaborators.filter(c => c !== email));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    
    onSubmit({
      name,
      icon,
      settings: { allowFreeSpaces, requireKYC },
      collaborators
    });
    
    // Reset fields
    setName('');
    setIcon('🏛️');
    setCollaborators([]);
    onClose();
  };

  const icons = ['🏛️', '🏢', '🌳', '🎓', '🏙️', '🏠', '👥', '💡'];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-[#020617]/90 backdrop-blur-lg transition-all">
      <div className="w-full max-w-2xl bg-white p-6 md:p-12 rounded-[3rem] shadow-2xl max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-300">
        
        <div className="flex items-start justify-between mb-10">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500 mb-2 block">Nueva Fundación</span>
            <h2 className="text-4xl font-black tracking-tighter text-[#083344] leading-none">Fundar Comunidad</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
            <X size={28} className="text-[#083344]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Nombre e Icono */}
          <div className="space-y-6">
            <div className="flex gap-4 items-end">
              <div className="flex-1 space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nombre de la Comunidad</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Consorcio Altos de Palermo"
                  className="w-full text-2xl font-black placeholder:text-gray-100 focus:outline-none bg-transparent border-b border-gray-100 text-[#083344] pb-2 focus:border-[#083344] transition-colors"
                  required
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">Avatar</label>
                <div className="flex gap-2">
                  <select 
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-xl focus:outline-none"
                  >
                    {icons.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Colaboradores */}
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Invitar Colaboradores</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                <input 
                  type="email" 
                  value={collaboratorEmail}
                  onChange={(e) => setCollaboratorEmail(e.target.value)}
                  placeholder="email@ejemplo.com"
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-cyan-200"
                />
              </div>
              <button 
                type="button"
                onClick={handleAddCollaborator}
                className="bg-[#083344] text-white px-6 rounded-xl hover:bg-[#0f4a61] transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {collaborators.map(email => (
                <div key={email} className="bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold text-[#083344]">
                  {email}
                  <button onClick={() => removeCollaborator(email)} className="text-red-400 hover:text-red-600">
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Parámetros de Gobernanza */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              type="button"
              onClick={() => setAllowFreeSpaces(!allowFreeSpaces)}
              className={`flex flex-col p-6 rounded-[2rem] border-2 transition-all text-left space-y-2 ${allowFreeSpaces ? 'bg-cyan-50/20 border-cyan-400 text-[#083344]' : 'bg-gray-50/50 border-gray-100 text-gray-400'}`}
            >
              <Globe size={24} className={allowFreeSpaces ? 'text-cyan-500' : ''} />
              <span className="text-xs font-black uppercase tracking-widest">Espacios Libres</span>
              <p className="text-[10px] opacity-70">Permite a cualquier miembro proponer y crear nuevos espacios temáticos.</p>
            </button>

            <button 
              type="button"
              onClick={() => setRequireKYC(!requireKYC)}
              className={`flex flex-col p-6 rounded-[2rem] border-2 transition-all text-left space-y-2 ${requireKYC ? 'bg-[#083344] border-[#083344] text-white' : 'bg-gray-50/50 border-gray-100 text-gray-400'}`}
            >
              <ShieldCheck size={24} className={requireKYC ? 'text-cyan-400' : ''} />
              <span className="text-xs font-black uppercase tracking-widest">KYC Verificado</span>
              <p className="text-[10px] opacity-70">Exige validación de identidad (Biometría/DNI) para participar en decisiones.</p>
            </button>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#083344] text-white py-6 rounded-full font-black uppercase tracking-[0.4em] text-xs hover:bg-[#0f4a61] transition-all shadow-xl shadow-[#083344]/20 active:scale-95"
          >
            Establecer Comunidad
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewCommunityModal;