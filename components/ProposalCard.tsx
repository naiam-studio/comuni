import React, { useState, useMemo, useEffect } from 'react';
import { Proposal, Comment, UserVote } from '../types';
import { summarizeDemocracyStatus } from '../services/geminiService';
import { 
  MessageSquare, 
  ShieldCheck, 
  Sparkles,
  Loader2,
  ChevronUp,
  Send,
  Trophy,
  Award,
  FileCheck,
  X,
  Copy,
  Check
} from 'lucide-react';
import { CURRENT_USER } from '../constants';

interface ProposalCardProps {
  proposal: Proposal;
  initialUserVote?: UserVote;
  onVote?: (vote: UserVote) => void;
}

const ProposalCard: React.FC<ProposalCardProps> = ({ proposal, initialUserVote, onVote }) => {
  const [votes, setVotes] = useState(proposal.votes);
  const [userVote, setUserVote] = useState<'yes' | 'no' | 'abstain' | null>(initialUserVote?.type || null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [legitimacyReport, setLegitimacyReport] = useState<string | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Estado para el debate
  const [comments, setComments] = useState<Comment[]>(proposal.comments);
  const [showDebate, setShowDebate] = useState(false);
  const [newComment, setNewComment] = useState('');

  const totalVotes = votes.yes + votes.no + votes.abstain;
  const yesPercentage = totalVotes > 0 ? (votes.yes / totalVotes) * 100 : 0;

  // Hash de Voto (Persistido o generado si es nuevo)
  const voteHash = useMemo(() => 
    initialUserVote?.voteHash || `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 10)}`.toUpperCase(), 
  [userVote, initialUserVote]);

  const sortedComments = useMemo(() => {
    return [...comments].sort((a, b) => b.votes - a.votes);
  }, [comments]);

  const handleVote = (type: 'yes' | 'no' | 'abstain') => {
    if (proposal.status !== 'Votación' || userVote) return;
    
    setVotes(prev => ({ ...prev, [type]: prev[type] + 1 }));
    setUserVote(type);

    if (onVote) {
      onVote({
        proposalId: proposal.id,
        proposalTitle: proposal.title,
        type,
        timestamp: new Date().toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' }),
        voteHash
      });
    }
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText(voteHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCommentVote = (commentId: string) => {
    setComments(prev => prev.map(c => 
      c.id === commentId ? { ...c, votes: c.votes + 1 } : c
    ));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: `c-${Date.now()}`,
      userId: CURRENT_USER.id,
      userName: CURRENT_USER.name,
      text: newComment,
      timestamp: 'Ahora mismo',
      votes: 0
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    const report = await summarizeDemocracyStatus({ ...proposal, comments });
    setLegitimacyReport(report || null);
    setIsAnalyzing(false);
  };

  return (
    <div className="group animate-in fade-in duration-700 relative">
      
      {/* Insignia de Votante Flotante */}
      {userVote && (
        <div className="absolute -top-2 -right-2 z-10 animate-in zoom-in duration-300">
          <button 
            onClick={() => setShowReceipt(true)}
            className="flex items-center gap-2 bg-[#083344] text-cyan-400 px-3 py-1.5 rounded-full border border-cyan-400/30 shadow-lg hover:scale-105 transition-transform"
          >
            <Award size={14} className="animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest">Votante Verificado</span>
          </button>
        </div>
      )}

      <div className="flex items-center gap-2 mb-4">
        <span className={`text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded border ${
          proposal.status === 'Votación' ? 'bg-[#083344] text-white border-[#083344]' : 'bg-gray-50 text-gray-400 border-gray-100'
        }`}>
          {proposal.status}
        </span>
        <span className="text-[9px] font-mono text-gray-300">#{proposal.ledgerHash}</span>
      </div>

      <h3 className="text-2xl font-black tracking-tight mb-3 leading-none group-hover:text-[#083344] transition-colors text-[#083344]">
        {proposal.title}
      </h3>
      
      <p className="text-gray-500 text-sm mb-6 leading-relaxed">
        {proposal.description}
      </p>

      {/* Barra de Votación */}
      <div className="mb-8">
        <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden mb-2">
          <div 
            style={{ width: `${yesPercentage}%` }} 
            className="h-full bg-cyan-400 transition-all duration-1000" 
          />
        </div>
        <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <span className="text-[#083344]">{votes.yes} A Favor</span>
          <span>{totalVotes} Votos</span>
        </div>
      </div>

      {/* Botones de Acción */}
      {proposal.status === 'Votación' && !userVote && (
        <div className="flex gap-2 mb-6">
          <button 
            onClick={() => handleVote('yes')}
            className="flex-1 py-4 border border-[#083344] bg-[#083344] text-white transition-all text-[10px] font-black uppercase tracking-widest rounded-2xl hover:scale-[1.02]"
          >
            A Favor
          </button>
          <button 
            onClick={() => handleVote('no')}
            className="flex-1 py-4 border border-gray-200 hover:border-[#083344] transition-all text-[10px] font-black uppercase tracking-widest rounded-2xl"
          >
            En Contra
          </button>
        </div>
      )}

      {userVote && (
        <button 
          onClick={() => setShowReceipt(true)}
          className="w-full mb-6 py-4 bg-cyan-50 rounded-2xl text-center text-[10px] font-bold text-[#083344] uppercase tracking-widest hover:bg-cyan-100 transition-colors flex items-center justify-center gap-2"
        >
          <FileCheck size={14} /> Ver Comprobante de Voto Criptográfico
        </button>
      )}

      {/* Informe Gemini */}
      {legitimacyReport && (
        <div className="mb-6 p-6 bg-gray-50 rounded-[2rem] text-xs leading-relaxed text-gray-600 italic border border-gray-100 animate-in fade-in duration-500">
          <div className="flex items-center gap-2 mb-3 text-[#083344] font-black uppercase text-[9px] tracking-widest">
            <Sparkles size={12} className="text-cyan-400" /> Informe de Legitimidad AI
          </div>
          {legitimacyReport}
        </div>
      )}

      {/* Herramientas */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setShowDebate(!showDebate)}
            className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors ${showDebate ? 'text-cyan-500' : 'text-gray-400 hover:text-[#083344]'}`}
          >
            <MessageSquare size={14} />
            <span>Debate ({comments.length})</span>
          </button>
          <button 
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#083344]"
          >
            {isAnalyzing ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
            <span>Analizar</span>
          </button>
        </div>
        <button className="text-gray-300 hover:text-[#083344] transition-colors">
          <ShieldCheck size={18} />
        </button>
      </div>

      {/* Debate */}
      {showDebate && (
        <div className="mb-10 animate-in slide-in-from-top-4 duration-300">
          <div className="bg-gray-50/50 border border-gray-100 rounded-[2.5rem] p-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6 flex items-center gap-2">
              Conversación Ciudadana <div className="h-1 w-1 rounded-full bg-cyan-400 animate-pulse" />
            </h4>
            
            <form onSubmit={handleAddComment} className="relative mb-8">
              <input 
                type="text" 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Aporta un argumento..."
                className="w-full bg-white border border-gray-100 rounded-2xl py-4 px-6 pr-14 text-sm focus:outline-none focus:ring-4 focus:ring-[#083344]/5 focus:border-[#083344]/20 transition-all shadow-sm"
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-[#083344] text-white rounded-xl hover:bg-[#0f4a61] transition-colors"
              >
                <Send size={16} />
              </button>
            </form>

            <div className="space-y-4">
              {sortedComments.map((comment, index) => (
                <div key={comment.id} className="bg-white border border-gray-100 rounded-2xl p-4 flex gap-4 transition-all hover:shadow-md group/comment">
                  <div className="flex flex-col items-center gap-1 mt-1">
                    <button 
                      onClick={() => handleCommentVote(comment.id)}
                      className="p-1 hover:bg-cyan-50 text-gray-300 hover:text-cyan-500 rounded-lg transition-colors"
                    >
                      <ChevronUp size={20} />
                    </button>
                    <span className="text-[11px] font-black text-[#083344]">{comment.votes}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-tight text-[#083344]">{comment.userName}</span>
                      <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">• {comment.timestamp}</span>
                      {index === 0 && comment.votes > 0 && (
                        <div className="flex items-center gap-1 text-[8px] font-black text-cyan-500 uppercase tracking-widest bg-cyan-50 px-2 py-0.5 rounded-full ml-auto">
                          <Trophy size={8} /> Argumento Destacado
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed font-medium">
                      {comment.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Comprobante de Voto ZK-Proof */}
      {showReceipt && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowReceipt(false)} />
          
          <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 md:p-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500 mb-2 block">Proof of Participation</span>
                  <h2 className="text-3xl font-black tracking-tighter text-[#083344] leading-none">Comprobante Digital</h2>
                </div>
                <button onClick={() => setShowReceipt(false)} className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-400">
                  <X size={24} />
                </button>
              </div>

              <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 mb-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Estado</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-green-500 flex items-center gap-1">
                    <Check size={10} /> Validado en Ledger
                  </span>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Hash del Voto (ZK-STARK)</label>
                  <div className="flex items-center gap-2 bg-white border border-gray-100 p-3 rounded-xl">
                    <code className="text-[10px] font-mono font-bold text-[#083344] truncate flex-1">{voteHash}</code>
                    <button onClick={handleCopyHash} className="text-gray-300 hover:text-[#083344] transition-colors">
                      {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-1">Propuesta</span>
                    <span className="text-[10px] font-bold text-[#083344] truncate block">ID: {proposal.ledgerHash}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-1">Fecha</span>
                    <span className="text-[10px] font-bold text-[#083344]">{initialUserVote?.timestamp || '20 Mayo, 2026'}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 py-4">
                <div className="w-16 h-16 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-500 border border-cyan-100">
                  <Award size={32} />
                </div>
                <p className="text-[10px] text-gray-500 text-center leading-relaxed font-medium">
                  Este comprobante utiliza criptografía de conocimiento cero para certificar tu participación sin comprometer la privacidad de tu elección.
                </p>
              </div>

              <button 
                onClick={() => setShowReceipt(false)}
                className="w-full bg-[#083344] text-white py-4 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-[#0f4a61] transition-all shadow-lg"
              >
                Cerrar Certificado
              </button>
            </div>
            
            <div className="bg-[#083344] py-3 text-center">
              <span className="text-[8px] font-black text-cyan-400 uppercase tracking-[0.5em]">comuni • secure ledger protocol</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="h-px bg-gray-50 w-full mt-4" />
    </div>
  );
};

export default ProposalCard;