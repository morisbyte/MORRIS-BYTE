import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserCircle, ShieldCheck, Mail, Key, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const AdminProfile: React.FC = () => {
  const { user } = useAuth();
  const { success } = useToast();

  const [name, setName] = useState(user?.name || 'Kainat (Morris Byte)');
  const [email, setEmail] = useState(user?.email || 'morrisbyte0786@gmail.com');
  const [saved, setSaved] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    success('Profile Updated', 'Your executive account details have been saved.');
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold font-display text-white">
          Administrator Account Profile
        </h1>
        <p className="text-xs text-[#9CA3AF]">
          Manage your credentials, security access tokens, and notification preferences.
        </p>
      </div>

      <div className="p-8 bg-[#13171F] border border-[#262D3B] space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#0A0B0D] border-2 border-[#DC2626] flex items-center justify-center font-display font-bold text-xl text-[#DC2626] glow-red">
            {name ? name[0] : 'K'}
          </div>
          <div>
            <h3 className="text-lg font-bold font-display text-white">{name}</h3>
            <p className="text-xs text-[#9CA3AF] font-mono">{user?.role || 'Super Admin (Tier-1)'}</p>
            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 mt-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Full Tier-1 Executive CMS Access</span>
            </span>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4 text-xs pt-4 border-t border-[#262D3B]">
          <div>
            <label className="block uppercase font-semibold text-[#D1D5DB] mb-1">Display Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-[#0A0B0D] border border-[#262D3B] p-2.5 text-white focus:border-[#DC2626] focus:outline-none"
            />
          </div>

          <div>
            <label className="block uppercase font-semibold text-[#D1D5DB] mb-1">Corporate Email / Username</label>
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-[#0A0B0D] border border-[#262D3B] p-2.5 text-white focus:border-[#DC2626] focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#DC2626] hover:bg-[#EF4444] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 glow-red cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Executive Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
