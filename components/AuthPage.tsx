import React, { useState } from 'react';
import { X, Chrome, Github, ArrowRight, ShieldCheck } from 'lucide-react';

interface AuthPageProps {
  onLogin: () => void;
  onBack: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onBack}
      />
      
      {/* Clerk Sign-In Card */}
      <div className="relative w-full max-w-[400px] bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden animate-in zoom-in-95 fade-in duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onBack}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[24px] font-black tracking-[-0.07em] lowercase text-[#083344] leading-none">
                comuni
              </span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Inicia sesión en Comuni</h1>
            <p className="text-sm text-gray-500 mt-1">Para continuar a la plataforma</p>
          </div>

          {/* Social Connections */}
          <div className="space-y-3 mb-6">
            <button 
              onClick={onLogin}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium text-gray-700 shadow-sm"
            >
              <Chrome size={18} className="text-gray-500" />
              Continuar con Google
            </button>
            <button 
              onClick={onLogin}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium text-gray-700 shadow-sm"
            >
              <Github size={18} className="text-gray-500" />
              Continuar con GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-white px-3 text-gray-400 font-bold tracking-widest">o</span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 ml-0.5">Dirección de correo electrónico</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-lg py-2.5 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#083344]/5 focus:border-[#083344]/20 transition-all"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-[#083344] text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-[#0f4a61] transition-all shadow-sm flex items-center justify-center gap-2"
            >
              Continuar <ArrowRight size={16} />
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 pt-6 border-t border-gray-50">
            <p className="text-xs text-gray-500">
              ¿No tienes una cuenta? {' '}
              <button className="text-[#083344] font-semibold hover:underline">Regístrate</button>
            </p>
          </div>
        </div>

        {/* Clerk Branding Mockup */}
        <div className="bg-gray-50/50 px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-gray-400">
            <ShieldCheck size={12} />
            <span className="text-[10px] font-medium">Protegido por Comuni ZK</span>
          </div>
          <div className="flex items-center gap-1 opacity-40">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Powered by</span>
            <span className="text-[12px] font-black tracking-tighter text-gray-600">Clerk</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;