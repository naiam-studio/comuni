import React, { useState } from 'react';
import { X, ShieldCheck, UserCheck, Smartphone, Camera, Loader2, CheckCircle2, ShieldAlert, MapPin, User as UserIcon, Save, Edit2, Vote, ChevronRight, FileCheck, Award } from 'lucide-react';
import { User, UserVote } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onVerify: () => void;
  onUpdate: (updatedUser: Partial<User>) => void;
  userVotes: UserVote[];
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose, user, onVerify, onUpdate, userVotes }) => {
  const [kycStep, setKycStep] = useState<'idle' | 'upload' | 'scanning' | 'success'>('idle');
  const [isEditing, setIsEditing] = useState(false);
  const [view, setView] = useState<'profile' | 'history'>('profile');
  
  // Form States
  const [editName, setEditName] = useState(user.name);
  const [editResidence, setEditResidence] = useState(user.residence || '');
  const [editAvatar, setEditAvatar] = useState(user.avatar);

  if (!isOpen) return null;

  const startKyc = () => setKycStep('upload');

  const handleSimulateScan = () => {
    setKycStep('scanning');
    setTimeout(() => {
      setKycStep('success');
      setTimeout(() => {
        onVerify();
        setKycStep('idle');
      }, 1500);
    }, 3000);
  };

  const handleSave = () => {
    onUpdate({
      name: editName,
      residence: editResidence,
      avatar: editAvatar
    });
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-[#020617]/95 backdrop-blur-xl transition-all">
      <div className="w-full max-w-md bg-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl animate-in fade-in zoom-in-95 duration-300 max-h-[92vh] flex flex-col">
        
        {/* Header con Navegación de Pestañas */}
        <div className="flex items-start justify-between mb-8 flex-shrink-0">
          <div>
            <div className="flex gap-4 mb-4">
              <button 
                onClick={() => setView('profile')}
                className={`text-[9px] font-black uppercase tracking-widest pb-1 border-b-2 transition-all ${view === 'profile' ? 'border-cyan-500 text-[#083344]' : 'border-transparent text-gray-300'}`}
              >
                Perfil
              </button>
              <button 
                onClick={() => setView('history')}
                className={`text-[9px] font-black uppercase tracking-widest pb-1 border-b-2 transition-all ${view === 'history' ? 'border-cyan-500 text-[#083344]' : 'border-transparent text-gray-300'}`}
              >
                Mis Votos ({userVotes.length})
              </button>
            </div>
            <h2 className="text-3xl font-black tracking-tighter text-[#083344] leading-none">
              {view === 'profile' ? 'Mi Ciudadanía' : 'Participación'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
            <X size={24} className="text-[#083344]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-8">
          {view === 'profile' ? (
            kycStep === 'idle' ? (
              <div className="space-y-8">
                {/* Avatar Section */}
                <div className="flex flex-col items-center gap-6">
                  <div className="relative group cursor-pointer" onClick={() => !isEditing && setIsEditing(true)}>
                    <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-gray-50 shadow-inner">
                      <img src={isEditing ? editAvatar : user.avatar} alt={user.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                    </div>
                    {user.isVerified && (
                      <div className="absolute -right-2 -bottom-2 bg-cyan-500 text-white p-2 rounded-2xl border-4 border-white shadow-xl">
                        <ShieldCheck size={20} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem] flex items-center justify-center">
                       <Edit2 size={24} className="text-white" />
                    </div>
                  </div>

                  {isEditing ? (
                    <div className="w-full space-y-5 animate-in slide-in-from-top-2">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Nombre Completo</label>
                        <div className="relative">
                          <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                          <input 
                            type="text" 
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-3 pl-12 pr-4 text-sm font-bold text-[#083344] focus:outline-none focus:border-cyan-200"
                            placeholder="Tu nombre..."
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Lugar de Residencia</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                          <input 
                            type="text" 
                            value={editResidence}
                            onChange={(e) => setEditResidence(e.target.value)}
                            className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-3 pl-12 pr-4 text-sm font-bold text-[#083344] focus:outline-none focus:border-cyan-200"
                            placeholder="Ej: San Telmo, CABA"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button 
                          onClick={handleSave}
                          className="flex-1 bg-cyan-500 text-white py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/10"
                        >
                          <Save size={14} /> Guardar
                        </button>
                        <button 
                          onClick={() => setIsEditing(false)}
                          className="px-6 py-3 border border-gray-100 text-gray-400 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-50"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <h3 className="text-2xl font-black text-[#083344] tracking-tight">{user.name}</h3>
                      <div className="flex items-center justify-center gap-2 mt-1">
                        <MapPin size={12} className="text-cyan-500" />
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{user.residence || 'Ubicación no definida'}</p>
                      </div>
                    </div>
                  )}
                </div>

                {!isEditing && (
                  <>
                    <div className="p-6 bg-gray-50 rounded-[2.5rem] border border-gray-100 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Estatus Democrático</span>
                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${user.isVerified ? 'bg-cyan-100 text-cyan-600' : 'bg-red-50 text-red-400'}`}>
                          {user.isVerified ? 'Verificado' : 'Pendiente'}
                        </span>
                      </div>
                      {!user.isVerified && (
                        <div className="flex gap-3 items-start">
                          <ShieldAlert className="text-red-400 flex-shrink-0" size={18} />
                          <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
                            Tu identidad aún no ha sido vinculada al ledger. Es posible que algunas votaciones restrinjan tu participación.
                          </p>
                        </div>
                      )}
                    </div>

                    {!user.isVerified ? (
                      <button 
                        onClick={startKyc}
                        className="w-full bg-[#083344] text-white py-5 rounded-full font-black uppercase tracking-[0.3em] text-[10px] hover:bg-[#0f4a61] transition-all shadow-xl shadow-[#083344]/20 group"
                      >
                        Vincular Identidad Biométrica
                      </button>
                    ) : (
                      <div className="flex flex-col items-center gap-3 py-4 text-cyan-500">
                        <UserCheck size={32} strokeWidth={2.5} />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Protección ZK Activa</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : kycStep === 'upload' ? (
              <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-300 text-center">
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-cyan-50 text-cyan-500 rounded-[2rem] flex items-center justify-center mx-auto shadow-inner">
                    <Smartphone size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-[#083344] tracking-tighter">Validación de DNI</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium px-4">
                    Prepara tu documento nacional de identidad. Usaremos la cámara para generar una firma única inalterable.
                  </p>
                </div>
                <div className="aspect-[3/2] bg-gray-50 border-4 border-dashed border-gray-100 rounded-[3rem] flex flex-col items-center justify-center gap-3 text-gray-300 group hover:border-cyan-100 transition-colors">
                  <Camera size={48} strokeWidth={1.5} className="group-hover:text-cyan-200" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Encuadra el frente del documento</span>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={handleSimulateScan}
                    className="flex-1 bg-[#083344] text-white py-5 rounded-full font-black uppercase tracking-[0.3em] text-[10px] shadow-lg shadow-[#083344]/10"
                  >
                    Capturar y Firmar
                  </button>
                  <button onClick={() => setKycStep('idle')} className="px-6 border border-gray-100 rounded-full text-gray-400">
                     <X size={18} />
                  </button>
                </div>
              </div>
            ) : kycStep === 'scanning' ? (
              <div className="py-16 space-y-8 flex flex-col items-center text-center animate-in fade-in duration-300">
                <Loader2 size={80} className="text-cyan-500 animate-spin" strokeWidth={1} />
                <h3 className="text-xl font-black text-[#083344] uppercase tracking-tighter">Cómputo Verificable</h3>
              </div>
            ) : (
              <div className="py-16 space-y-8 flex flex-col items-center text-center animate-in zoom-in-90 duration-500">
                <div className="w-24 h-24 bg-cyan-500 text-white rounded-[2.5rem] flex items-center justify-center shadow-2xl">
                  <CheckCircle2 size={48} strokeWidth={2.5} />
                </div>
                <h3 className="text-3xl font-black text-[#083344] tracking-tighter">Vínculo Exitoso</h3>
              </div>
            )
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              {userVotes.length > 0 ? (
                userVotes.map((vote) => (
                  <div key={vote.proposalId} className="bg-gray-50/50 border border-gray-100 rounded-3xl p-5 group hover:bg-white hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">{vote.timestamp}</span>
                      <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                        vote.type === 'yes' ? 'bg-cyan-100 text-cyan-600' : 
                        vote.type === 'no' ? 'bg-red-50 text-red-400' : 'bg-gray-200 text-gray-500'
                      }`}>
                        {vote.type === 'yes' ? 'A Favor' : vote.type === 'no' ? 'En Contra' : 'Abstención'}
                      </div>
                    </div>
                    <h4 className="text-sm font-black text-[#083344] mb-4 line-clamp-2 leading-snug">{vote.proposalTitle}</h4>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100/50">
                      <div className="flex items-center gap-2 text-[9px] font-mono text-gray-400">
                        <Award size={10} /> {vote.voteHash.slice(0, 10)}...
                      </div>
                      <button className="text-[#083344] flex items-center gap-1 text-[9px] font-black uppercase tracking-widest hover:text-cyan-500 transition-colors">
                        Ver Proof <ChevronRight size={10} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 opacity-20 flex flex-col items-center gap-4">
                  <Vote size={48} />
                  <p className="text-[10px] font-black uppercase tracking-widest max-w-[200px] leading-relaxed">
                    Aún no has participado en ninguna votación activa.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;