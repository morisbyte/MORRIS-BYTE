import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, User, ArrowRight, ShieldCheck, Key, UserCheck, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { AURELIA_LOGO, AURELIA_TAGLINE } from '../../constants/assets';

interface AdminLoginPageProps {
  navigate?: (route: string) => void;
  onSuccess?: () => void;
  onBackToSite?: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ navigate, onSuccess, onBackToSite }) => {
  const [username, setUsername] = useState('Kainat');
  const [password, setPassword] = useState('Werewolf');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { success, error } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
      success('Authentication Approved', 'Welcome to the Aurelia Construct Executive CMS Portal.');
      if (onSuccess) {
        onSuccess();
      } else if (navigate) {
        navigate('admin');
      }
    } catch (err: any) {
      error('Access Denied', err.message || 'Invalid administrative credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillCredentials = () => {
    setUsername('Kainat');
    setPassword('Werewolf');
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F3F4F6] pt-24 pb-16 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-radial-gradient-hero pointer-events-none opacity-60" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#DC2626]/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-[#13171F] border border-[#262D3B] p-8 sm:p-10 shadow-2xl relative z-10"
      >
        {/* Header Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full p-0.5 bg-gradient-to-tr from-[#DC2626] via-[#F59E0B] to-[#DC2626] mx-auto mb-4 shadow-xl glow-red">
            <img
              src={AURELIA_LOGO}
              alt="Aurelia Construct Group Emblem"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#DC2626]/10 border border-[#DC2626]/30 text-[#EF4444] text-[10px] font-mono uppercase tracking-widest mb-3">
            <Shield className="w-3 h-3" />
            <span>Executive CMS Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight">
            Administrator Login
          </h1>
          <p className="text-xs text-[#9CA3AF] font-mono mt-1">
            Authorized Personnel Access Only • {AURELIA_TAGLINE}
          </p>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs uppercase font-bold text-[#E5E7EB] mb-2 tracking-wider">
              Username / Identifier
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter username (e.g. Kainat)"
                className="w-full bg-[#0A0B0D] border border-[#262D3B] pl-10 pr-4 py-3 text-xs text-white placeholder:text-[#6B7280] focus:outline-none focus:border-[#DC2626] focus:ring-1 focus:ring-[#DC2626] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-[#E5E7EB] mb-2 tracking-wider">
              Password
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-[#0A0B0D] border border-[#262D3B] pl-10 pr-4 py-3 text-xs text-white placeholder:text-[#6B7280] focus:outline-none focus:border-[#DC2626] focus:ring-1 focus:ring-[#DC2626] transition-all"
              />
            </div>
          </div>

          {/* Quick Credential Hint */}
          <div className="p-3 bg-[#0A0B0D] border border-[#262D3B] flex items-center justify-between text-[11px] font-mono">
            <span className="text-[#9CA3AF]">Default Credentials:</span>
            <span className="text-[#EF4444] font-bold">Kainat / Werewolf</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#DC2626] hover:bg-[#EF4444] text-white text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg glow-red cursor-pointer"
          >
            <span>{loading ? 'Verifying Access...' : 'Sign In To CMS Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Helper Button */}
        <div className="mt-6 pt-6 border-t border-[#262D3B] text-center">
          <button
            type="button"
            onClick={fillCredentials}
            className="text-xs text-[#9CA3AF] hover:text-[#EF4444] font-mono flex items-center justify-center gap-1.5 mx-auto transition-colors cursor-pointer"
          >
            <UserCheck className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>Click to Autofill: <strong className="text-white">Kainat / Werewolf</strong></span>
          </button>
        </div>

        <div className="mt-6 text-center space-y-3">
          <div className="text-[11px] font-mono text-[#9CA3AF] border-t border-[#262D3B] pt-4">
            <span>Direct Executive Desk: </span>
            <a href="mailto:morrisbyte0786@gmail.com" className="text-[#DC2626] hover:underline font-bold">
              morrisbyte0786@gmail.com
            </a>
            <span className="block mt-0.5 text-[#D1D5DB]">
              Helpline: <a href="tel:03076868004" className="text-white hover:text-[#DC2626]">03076868004</a> (+92 307 6868004)
            </span>
          </div>

          <button
            onClick={() => {
              if (onBackToSite) onBackToSite();
              else if (navigate) navigate('home');
            }}
            className="text-xs text-[#9CA3AF] hover:text-white font-mono tracking-wider transition-colors cursor-pointer block mx-auto"
          >
            ← Return to Aurelia Construct Site
          </button>
        </div>
      </motion.div>
    </div>
  );
};
