
import React, { useState, useEffect } from 'react';
import { X, Image as ImageIcon, ShieldCheck, MessageSquare, ChevronDown } from 'lucide-react';
import { Proposal, User, Space } from '../types';

interface NewProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (proposal: Partial<Proposal>) => void;
  user: User;
  availableSpaces: Space[];
  defaultSpaceId: string;
}

const NewProposalModal: React.FC<NewProposalModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  user, 
  availableSpaces, 
  defaultSpaceId 
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [spaceId, setSpaceId] = useState(defaultSpaceId);
  
  const [requireVerification, setRequireVerification] = useState(true);
  const [allowAnonymousDebate, setAllowAnonymousDebate] = useState(false);

  useEffect(() => {
    if (isOpen) setSpaceId(defaultSpaceId);
  }, [isOpen, defaultSpaceId]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !spaceId) return;
    
    onSubmit({ 
      title, 
      description, 
      imageUrl: imageUrl || undefined,
      spaceId,
      author: user,
    });
    
    setTitle('');
    setDescription('');
    setImageUrl('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-[#020617]/90 backdrop-blur-lg transition-all duration-500">
      <div className="w-full max-w-2xl bg-white p-6 md:p-12 rounded-[3rem] shadow-2xl max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500 mb-2 block">Iniciativa Comunitaria</span>
            <h2 className="text-4xl font-black tracking-tighter text-[#083344] leading-none">Lanzar Propuesta</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
            <X size={28} className="text-[#083344]" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* Selector de Espacio - Estilo Card Sutil */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              ¿Dónde publicamos esto?
            </label>
            <div className="relative group">
              <select 
                value={spaceId}
                onChange={(e) => setSpaceId(e.target.value)}
                className="w-full appearance-none bg-gray-50/50 border border-gray-100 rounded-2xl py-4 px-6 text-[#083344] font-bold focus:outline-none focus:ring-4 focus:ring-cyan-500/5 transition-all cursor-pointer group-hover:bg-white group-hover:border-cyan-100"
              >
                {availableSpaces.map(space => (
                  <option key={space.id} value={space.id}>{space.icon} &nbsp; {space.name}</option>
                ))}
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#083344]">
                <ChevronDown size={20} />
              </div>
            </div>
          </div>

          {/* Área de Texto Principal - Sin fondos oscuros */}
          <div className="space-y-6">
            <input 
              type="text" 
              placeholder="Un título impactante..."
              className="w-full text-3xl md:text-5xl font-black placeholder:text-gray-200 focus:outline-none bg-transparent border-none text-[#083344] p-0"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
            
            <textarea 
              placeholder="Describe detalladamente tu propuesta. ¿Qué problema resuelve? ¿Cómo se llevará a cabo?..."
              className="w-full min-h-[160px] text-lg text-gray-600 placeholder:text-gray-200 focus:outline-none bg-transparent border-none resize-none p-0 leading-relaxed"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Evidencia Multimedia */}
          <div className="p-6 bg-gray-50/50 rounded-3xl border border-gray-100 space-y-4">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
              <ImageIcon size={14} className="text-cyan-500" /> Adjuntar Evidencia (Link)
            </div>
            <input 
              type="url" 
              placeholder="https://imgur.com/tu-evidencia.jpg"
              className="w-full bg-white border border-gray-100 rounded-xl py-3 px-4 text-xs text-gray-500 focus:outline-none focus:border-cyan-200 transition-colors"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          {/* Toggles de Personalización */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              type="button"
              onClick={() => setRequireVerification(!requireVerification)}
              className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${requireVerification ? 'bg-white border-[#083344] text-[#083344]' : 'bg-gray-50/50 border-gray-100 text-gray-400'}`}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck size={20} className={requireVerification ? 'text-cyan-500' : ''} />
                <span className="text-[10px] font-black uppercase tracking-widest">Verificación</span>
              </div>
              <div className={`w-8 h-4 rounded-full relative transition-colors ${requireVerification ? 'bg-[#083344]' : 'bg-gray-200'}`}>
                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${requireVerification ? 'right-0.5' : 'left-0.5'}`} />
              </div>
            </button>

            <button 
              type="button"
              onClick={() => setAllowAnonymousDebate(!allowAnonymousDebate)}
              className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${allowAnonymousDebate ? 'bg-white border-[#083344] text-[#083344]' : 'bg-gray-50/50 border-gray-100 text-gray-400'}`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare size={20} className={allowAnonymousDebate ? 'text-cyan-500' : ''} />
                <span className="text-[10px] font-black uppercase tracking-widest">Debate Libre</span>
              </div>
              <div className={`w-8 h-4 rounded-full relative transition-colors ${allowAnonymousDebate ? 'bg-[#083344]' : 'bg-gray-200'}`}>
                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${allowAnonymousDebate ? 'right-0.5' : 'left-0.5'}`} />
              </div>
            </button>
          </div>
          
          <button 
            type="submit"
            disabled={!title || !description}
            className="w-full bg-[#083344] text-white py-6 rounded-full font-black uppercase tracking-[0.4em] text-xs hover:bg-[#0f4a61] transition-all disabled:opacity-20 shadow-xl shadow-[#083344]/20 active:scale-95"
          >
            Someter a Votación
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewProposalModal;
