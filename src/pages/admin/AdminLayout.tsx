import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Building2, 
  BookOpen, 
  Briefcase, 
  Users, 
  MessageSquareText, 
  Image as ImageIcon, 
  Settings as SettingsIcon, 
  UserCircle, 
  LogOut, 
  Globe2, 
  Menu, 
  X, 
  ChevronRight, 
  ShieldCheck, 
  ArrowUpRight 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AURELIA_LOGO } from '../../constants/assets';

interface AdminLayoutProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onExitToSite: () => void;
  children: React.ReactNode;
  unreadInquiriesCount?: number;
  unreadApplicationsCount?: number;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onSelectTab,
  onExitToSite,
  children,
  unreadInquiriesCount = 0,
  unreadApplicationsCount = 0
}) => {
  const { user, logout } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects Registry', icon: Building2 },
    { id: 'blog', label: 'Editorial & Insights', icon: BookOpen },
    { id: 'careers', label: 'Job Positions', icon: Briefcase },
    { 
      id: 'applications', 
      label: 'Candidate Inflow', 
      icon: Users,
      badge: unreadApplicationsCount > 0 ? unreadApplicationsCount : undefined
    },
    { 
      id: 'inquiries', 
      label: 'Client RFPs & Inquiries', 
      icon: MessageSquareText,
      badge: unreadInquiriesCount > 0 ? unreadInquiriesCount : undefined
    },
    { id: 'media', label: 'Media Library', icon: ImageIcon },
    { id: 'settings', label: 'Site Metrics & Info', icon: SettingsIcon },
    { id: 'profile', label: 'Admin Profile', icon: UserCircle },
  ];

  const handleTabClick = (tabId: string) => {
    onSelectTab(tabId);
    setMobileNavOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F3F4F6] flex flex-col md:flex-row">
      {/* 1. Desktop Persistent Sidebar */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-[#13171F] border-r border-[#262D3B] shrink-0 sticky top-0 h-screen z-30 justify-between">
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-[#262D3B] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#DC2626] via-[#F59E0B] to-[#DC2626] shrink-0 shadow-md">
                <img
                  src={AURELIA_LOGO}
                  alt="Aurelia Construct Group"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="font-display text-sm font-black tracking-widest text-white block">
                  AURELIA
                </span>
                <span className="text-[9px] tracking-[0.25em] uppercase text-[#DC2626] font-mono block font-bold">
                  EXECUTIVE CMS
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-210px)] scrollbar-none">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold tracking-wider transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#1E232F] text-white border-l-2 border-[#DC2626] shadow-sm'
                      : 'text-[#9CA3AF] hover:text-white hover:bg-[#1A1F2B]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#DC2626]' : 'text-[#9CA3AF]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="px-2 py-0.5 bg-[#DC2626] text-white text-[10px] font-bold rounded-full glow-red">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: User Info & Actions */}
        <div className="p-4 border-t border-[#262D3B] bg-[#0A0B0D] space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#13171F] border border-[#DC2626] flex items-center justify-center font-display font-bold text-xs text-[#DC2626] glow-red">
              {user?.name ? user.name[0] : 'K'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{user?.name || 'Kainat'}</p>
              <p className="text-[10px] text-[#9CA3AF] font-mono truncate">{user?.role || 'Super Admin'}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#262D3B]">
            <button
              onClick={onExitToSite}
              className="py-1.5 px-2 bg-[#13171F] hover:bg-[#1E232F] border border-[#262D3B] text-[11px] text-[#D1D5DB] hover:text-white font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <span>Live Site</span>
              <ArrowUpRight className="w-3 h-3 text-[#DC2626]" />
            </button>

            <button
              onClick={logout}
              className="py-1.5 px-2 bg-[#13171F] hover:bg-rose-950/40 border border-[#262D3B] hover:border-rose-700 text-[11px] text-rose-400 font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <LogOut className="w-3 h-3" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* 2. Mobile Header & Drawer */}
      <div className="md:hidden bg-[#13171F] border-b border-[#262D3B] p-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-tr from-[#DC2626] via-[#F59E0B] to-[#DC2626] shrink-0">
            <img
              src={AURELIA_LOGO}
              alt="Aurelia Construct Group"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <span className="font-display text-xs font-black tracking-widest text-white">
              AURELIA CMS
            </span>
            <span className="text-[9px] text-[#DC2626] font-mono block">User: {user?.name || 'Kainat'}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onExitToSite}
            className="p-1.5 bg-[#0A0B0D] border border-[#262D3B] text-[11px] text-[#DC2626] font-bold"
          >
            Live Site
          </button>
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="p-1.5 bg-[#0A0B0D] border border-[#262D3B] text-white"
          >
            {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#13171F] border-b border-[#262D3B] px-4 py-4 space-y-2 z-30"
          >
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center justify-between p-2.5 text-xs font-bold ${
                    isActive ? 'bg-[#1E232F] text-white border-l-2 border-[#DC2626]' : 'text-[#9CA3AF]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="px-2 py-0.5 bg-[#DC2626] text-white text-[10px] font-bold rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
            <div className="pt-3 border-t border-[#262D3B] flex items-center justify-between">
              <span className="text-xs text-[#9CA3AF] font-mono">{user?.email || 'kainat@aureliaconstruct.com'}</span>
              <button
                onClick={logout}
                className="text-xs text-rose-400 font-bold"
              >
                Log Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Main Workspace Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto max-h-screen">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
