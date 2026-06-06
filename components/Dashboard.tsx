import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  ShieldCheck, 
  BarChart3,
  LogOut,
  ChevronDown,
  ChevronRight,
  MessageSquare,
  Menu,
  X,
  Layers,
  PlusCircle,
  Hash,
  User as UserIcon,
  Vote
} from 'lucide-react';
import { MOCK_COMMUNITIES, MOCK_PROPOSALS, CURRENT_USER } from '../constants';
import { Proposal, Space, Community, User, UserVote } from '../types';
import ProposalCard from './ProposalCard';
import NewProposalModal from './NewProposalModal';
import NewCommunityModal from './NewCommunityModal';
import UserProfileModal from './UserProfileModal';

interface DashboardProps {
  onWiki: () => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onWiki, onLogout }) => {
  const [user, setUser] = useState<User>(CURRENT_USER);
  const [communities, setCommunities] = useState<Community[]>(MOCK_COMMUNITIES);
  const [proposals, setProposals] = useState<Proposal[]>(MOCK_PROPOSALS);
  const [userVotes, setUserVotes] = useState<UserVote[]>([]); // Nuevo: Estado de participación
  const [selectedSpaceId, setSelectedSpaceId] = useState<string>(MOCK_COMMUNITIES[0].spaces[0].id);
  const [expandedCommunities, setExpandedCommunities] = useState<string[]>([MOCK_COMMUNITIES[0].id]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  
  const [addingSpaceToId, setAddingSpaceToId] = useState<string | null>(null);
  const [newSpaceName, setNewSpaceName] = useState('');

  const allAvailableSpaces = useMemo(() => {
    return communities.flatMap(c => c.spaces);
  }, [communities]);

  const selectedSpace = useMemo(() => {
    for (const community of communities) {
      const space = community.spaces.find(s => s.id === selectedSpaceId);
      if (space) return space;
    }
    return communities[0]?.spaces[0] || { id: 'none', name: 'No seleccionado', icon: '❓', description: 'Selecciona un espacio' };
  }, [selectedSpaceId, communities]);

  const filteredProposals = useMemo(() => 
    proposals.filter(p => p.spaceId === selectedSpaceId), 
  [proposals, selectedSpaceId]);

  const metrics = useMemo(() => ({
    active: filteredProposals.filter(p => p.status === 'Votación').length,
    total: filteredProposals.reduce((acc, curr) => acc + curr.votes.yes + curr.votes.no, 0)
  }), [filteredProposals]);

  const handleRegisterVote = (vote: UserVote) => {
    setUserVotes(prev => [vote, ...prev]);
  };

  const handleAddProposal = (newProposal: Partial<Proposal>) => {
    const fullProposal: Proposal = {
      ...newProposal as Proposal,
      id: `p-${Date.now()}`,
      status: 'Debate',
      votes: { yes: 0, no: 0, abstain: 0 },
      ledgerHash: Math.random().toString(36).substring(2, 6) + '...' + Math.random().toString(36).substring(2, 6),
      createdAt: 'Ahora',
      comments: []
    };
    setProposals([fullProposal, ...proposals]);
  };

  const handleAddCommunity = (newCommunityData: Omit<Community, 'id' | 'spaces'>) => {
    const newCommunity: Community = {
      ...newCommunityData,
      id: `c-${Date.now()}`,
      spaces: [
        {
          id: `s-${Date.now()}`,
          name: 'General',
          description: 'Espacio de discusión general para la comunidad.',
          isPrivate: false,
          memberCount: 1,
          icon: '📢'
        }
      ]
    };
    setCommunities([...communities, newCommunity]);
    setExpandedCommunities([...expandedCommunities, newCommunity.id]);
    setSelectedSpaceId(newCommunity.spaces[0].id);
  };

  const handleCreateSpace = (communityId: string) => {
    if (!newSpaceName.trim()) {
      setAddingSpaceToId(null);
      return;
    }

    const newSpace: Space = {
      id: `s-${Date.now()}`,
      name: newSpaceName,
      description: `Discusiones sobre ${newSpaceName}`,
      isPrivate: false,
      memberCount: 1,
      icon: '💬'
    };

    setCommunities(communities.map(c => {
      if (c.id === communityId) {
        return { ...c, spaces: [...c.spaces, newSpace] };
      }
      return c;
    }));

    setNewSpaceName('');
    setAddingSpaceToId(null);
    setSelectedSpaceId(newSpace.id);
  };

  const toggleCommunity = (id: string) => {
    setExpandedCommunities(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const handleVerifyKyc = () => {
    setUser(prev => ({ ...prev, isVerified: true }));
  };

  const handleUpdateUser = (updatedFields: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updatedFields }));
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-[#083344] selection:text-white flex overflow-hidden">
      {/* App Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-[60] w-72 bg-[#083344] border-r border-[#083344]/20 transform transition-transform duration-300 md:relative md:translate-x-0 flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-[29px] font-black tracking-[-0.07em] lowercase text-white leading-none">
              comuni
            </span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-white">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {/* User Profile Trigger Section */}
          <button 
            onClick={() => setIsProfileModalOpen(true)}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-left group mx-1 relative"
          >
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl overflow-hidden border border-white/10">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
              {user.isVerified && (
                <div className="absolute -right-1 -bottom-1 bg-cyan-500 text-white p-0.5 rounded-lg border-2 border-[#083344]">
                  <ShieldCheck size={10} />
                </div>
              )}
            </div>
            <div className="overflow-hidden">
              <p className="text-[11px] font-black text-white uppercase tracking-tight truncate">{user.name}</p>
              <div className="flex items-center gap-2">
                <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest truncate">{user.residence || 'Sin Ubicación'}</p>
                {userVotes.length > 0 && (
                  <span className="bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded-full text-[7px] font-black">
                    {userVotes.length} VOTOS
                  </span>
                )}
              </div>
            </div>
          </button>

          <div>
            <div className="flex items-center justify-between px-4 mb-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 block">Mis Comunidades</span>
              <button 
                onClick={() => setIsCommunityModalOpen(true)}
                className="text-white/30 hover:text-cyan-400 transition-colors"
                title="Añadir Comunidad"
              >
                <PlusCircle size={14} />
              </button>
            </div>
            
            <div className="space-y-2">
              {communities.map(community => (
                <div key={community.id} className="space-y-1">
                  <button 
                    onClick={() => toggleCommunity(community.id)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{community.icon}</span>
                      <span className="text-xs font-black uppercase tracking-tight text-white/90">{community.name}</span>
                    </div>
                    {expandedCommunities.includes(community.id) ? <ChevronDown size={14} className="text-white/30" /> : <ChevronRight size={14} className="text-white/30" />}
                  </button>
                  
                  {expandedCommunities.includes(community.id) && (
                    <div className="ml-4 pl-4 border-l border-white/10 space-y-1 animate-in slide-in-from-top-2 duration-300">
                      {community.spaces.map(space => (
                        <div key={space.id} className="space-y-1">
                          <button 
                            onClick={() => {
                              setSelectedSpaceId(space.id);
                              if (window.innerWidth < 768) setIsSidebarOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                              selectedSpaceId === space.id 
                              ? 'bg-white text-[#083344] shadow-lg shadow-black/20' 
                              : 'text-white/40 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span>{space.icon}</span>
                              <span>{space.name}</span>
                            </div>
                          </button>
                        </div>
                      ))}
                      
                      {addingSpaceToId === community.id ? (
                        <div className="px-4 py-2 animate-in fade-in duration-200">
                          <input 
                            autoFocus
                            type="text"
                            placeholder="Nombre..."
                            className="w-full bg-white/10 border-b border-cyan-400 text-white text-[10px] py-1 focus:outline-none placeholder:text-white/20"
                            value={newSpaceName}
                            onChange={(e) => setNewSpaceName(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleCreateSpace(community.id);
                              if (e.key === 'Escape') setAddingSpaceToId(null);
                            }}
                            onBlur={() => handleCreateSpace(community.id)}
                          />
                        </div>
                      ) : (
                        <button 
                          onClick={() => setAddingSpaceToId(community.id)}
                          className="w-full flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-cyan-400 transition-colors"
                        >
                          <Plus size={12} />
                          <span>Nuevo Espacio</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-white/10 space-y-4">
          <button 
            onClick={onWiki}
            className="w-full flex items-center gap-3 px-4 py-2 text-white/30 hover:text-white font-black uppercase text-[10px] tracking-[0.3em] transition-colors"
          >
            Wiki
          </button>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-400/50 hover:text-red-400 font-black uppercase text-[10px] tracking-[0.3em] transition-colors"
          >
            <LogOut size={16} /> Salir
          </button>
        </div>
      </aside>

      {/* Main App Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="sticky top-0 z-50 bg-[#083344] border-b border-[#083344]/20 px-6 py-4 flex items-center justify-between md:hidden">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-white">
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-3" onClick={() => setIsProfileModalOpen(true)}>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-[29px] font-black tracking-[-0.07em] lowercase text-white leading-none">
              comuni
            </span>
          </div>
          <div className="w-10"></div>
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-12">
          <div className="max-w-2xl mx-auto">
            <section className="mb-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-4xl mb-4">{selectedSpace.icon}</div>
              <h2 className="text-4xl font-black tracking-tighter mb-2 text-[#083344]">{selectedSpace.name}</h2>
              <p className="text-gray-500 font-medium mb-8">{selectedSpace.description}</p>
              
              <div className="flex items-center justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-gray-400">
                <div className="flex items-center gap-2">
                  <BarChart3 size={14} className="text-[#083344]" />
                  <span>{metrics.total} Votos Emitidos</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-[#083344]" />
                  <span>Democracia Abierta</span>
                </div>
              </div>
            </section>

            <div className="space-y-12">
              {filteredProposals.length > 0 ? (
                filteredProposals.map(proposal => (
                  <ProposalCard 
                    key={proposal.id} 
                    proposal={proposal} 
                    initialUserVote={userVotes.find(v => v.proposalId === proposal.id)}
                    onVote={handleRegisterVote}
                  />
                ))
              ) : (
                <div className="text-center py-24 opacity-20">
                  <Layers size={48} className="mx-auto mb-4" />
                  <p className="font-black uppercase tracking-widest text-xs">No hay propuestas en este espacio</p>
                </div>
              )}
            </div>

            <footer className="mt-32 pb-16 text-center border-t border-gray-50 pt-12">
              <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.4em]">
                comuni.com.ar • {user.residence || 'San Telmo'}
              </p>
            </footer>
          </div>
        </main>
      </div>

      <button 
        onClick={() => setIsProposalModalOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#083344] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform z-50 shadow-[#083344]/30"
      >
        <Plus size={28} />
      </button>

      <NewProposalModal 
        isOpen={isProposalModalOpen} 
        onClose={() => setIsProposalModalOpen(false)} 
        user={user}
        onSubmit={handleAddProposal}
        availableSpaces={allAvailableSpaces}
        defaultSpaceId={selectedSpaceId}
      />

      <NewCommunityModal
        isOpen={isCommunityModalOpen}
        onClose={() => setIsCommunityModalOpen(false)}
        onSubmit={handleAddCommunity}
      />

      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        onVerify={handleVerifyKyc}
        onUpdate={handleUpdateUser}
        userVotes={userVotes}
      />

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#083344]/20 backdrop-blur-sm z-[55] md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;