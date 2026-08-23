import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Menu as MenuIcon, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Globe2, 
  Phone, 
  Lock,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  UserCheck,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AURELIA_LOGO } from '../../constants/assets';

interface NavbarProps {
  currentRoute: string;
  navigate: (route: string, params?: any) => void;
  onOpenProjectModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  navigate,
  onOpenProjectModal
}) => {
  const { isAuthenticated, user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
    }
  };

  const navLinks = [
    { id: 'home', label: 'Overview' },
    { id: 'about', label: 'About' },
    { id: 'expertise', label: 'Expertise' },
    { id: 'projects', label: 'Projects' },
    { id: 'sustainability', label: 'ESG & Carbon' },
    { id: 'insights', label: 'Editorial' },
    { id: 'careers', label: 'Careers' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (route: string) => {
    navigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      {/* Top Corporate Strip */}
      <div className="bg-[#07080A] text-[#9CA3AF] text-[11px] font-mono border-b border-[#1E232F] px-3 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between gap-2 overflow-hidden">
        <div className="flex items-center gap-2 sm:gap-3 truncate min-w-0">
          <span className="flex items-center gap-1.5 text-[#DC2626] font-semibold shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-ping" />
            <span className="text-white font-sans font-bold tracking-wider text-xs">AURELIA CONSTRUCT</span>
          </span>
          <span className="hidden xl:inline-block text-[#374151]">|</span>
          <span className="hidden xl:inline-block text-[#9CA3AF] truncate">
            Tier-1 Global Megastructure Engineering
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 text-[#9CA3AF] text-[10px] xl:text-[11px]">
            <span className="flex items-center gap-1">
              <Globe2 className="w-3 h-3 text-[#DC2626]" />
              <span>Kharian (Punjab, PK)</span>
            </span>
            <span className="text-[#374151]">•</span>
            <a href="mailto:morrisbyte0786@gmail.com" className="text-[#D1D5DB] hover:text-[#DC2626] transition-colors">
              morrisbyte0786@gmail.com
            </a>
            <span className="text-[#374151]">•</span>
            <a href="tel:03076868004" className="text-[#D1D5DB] hover:text-[#DC2626] font-mono">
              03076868004
            </a>
          </div>

          {/* Fullscreen Option */}
          <button
            onClick={toggleFullScreen}
            className="hidden sm:flex items-center gap-1 px-2 py-0.5 bg-[#13171F] hover:bg-[#1E232F] text-[#9CA3AF] hover:text-white border border-[#262D3B] text-[10px] uppercase font-mono tracking-wider transition-all cursor-pointer"
            title="Toggle Fullscreen Mode"
          >
            {isFullscreen ? <Minimize2 className="w-3 h-3 text-[#DC2626]" /> : <Maximize2 className="w-3 h-3 text-[#DC2626]" />}
            <span className="hidden md:inline">{isFullscreen ? 'Exit Full' : 'Fullscreen'}</span>
          </button>

          {/* Direct CMS Portal CTA Button in Top Bar */}
          <button
            onClick={() => handleNavClick('admin')}
            className="flex items-center gap-1.5 px-2.5 py-0.5 bg-[#13171F] hover:bg-[#DC2626] text-[#EF4444] hover:text-white border border-[#DC2626]/40 hover:border-[#DC2626] text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer glow-red whitespace-nowrap"
            title="Access Executive CMS Portal"
          >
            <Lock className="w-3 h-3" />
            <span>{isAuthenticated ? `CMS (${user?.name || 'Kainat'})` : 'CMS Portal'}</span>
          </button>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <nav
        className={`transition-all duration-300 w-full ${
          isScrolled
            ? 'bg-[#0A0B0D]/95 backdrop-blur-md border-b border-[#262D3B] shadow-2xl py-2'
            : 'bg-[#0E1017]/90 backdrop-blur-sm border-b border-[#1E232F] py-2.5 sm:py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Brand Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-none shrink-0"
            >
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full p-0.5 bg-gradient-to-tr from-[#DC2626] via-[#F59E0B] to-[#DC2626] shadow-md group-hover:scale-105 transition-transform duration-300">
                <img
                  src={AURELIA_LOGO}
                  alt="Aurelia Construct Group Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full bg-black"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-black text-base sm:text-xl text-white tracking-wider">
                    AURELIA
                  </span>
                  <span className="text-[9px] sm:text-[10px] bg-[#DC2626]/20 text-[#EF4444] border border-[#DC2626]/40 px-1 py-0.2 sm:px-1.5 sm:py-0.5 font-mono uppercase tracking-widest font-bold">
                    GROUP
                  </span>
                </div>
                <p className="hidden sm:block text-[9px] text-[#9CA3AF] font-mono uppercase tracking-[0.2em] leading-none mt-0.5 truncate">
                  Building Today • Shaping Tomorrow
                </p>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center gap-0.5">
              {navLinks.map(link => {
                const isActive = currentRoute === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`px-2.5 py-1.5 text-[11px] uppercase tracking-wider font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                      isActive 
                        ? 'text-[#DC2626]' 
                        : 'text-[#D1D5DB] hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#DC2626]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Compact Desktop Navigation for Large Laptops (1024-1280px) */}
            <div className="hidden lg:flex xl:hidden items-center gap-0.5">
              {navLinks.slice(0, 5).map(link => {
                const isActive = currentRoute === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`px-2 py-1.5 text-[10px] uppercase tracking-wider font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                      isActive 
                        ? 'text-[#DC2626]' 
                        : 'text-[#D1D5DB] hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1 right-1 h-[2px] bg-[#DC2626]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Action Buttons - Always visible & shrink-0 to prevent being clipped */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              <button
                onClick={() => handleNavClick('admin')}
                className="px-2.5 sm:px-3 py-1.5 sm:py-2 border border-[#262D3B] hover:border-[#DC2626] text-[#D1D5DB] hover:text-white text-xs font-mono tracking-wider transition-all flex items-center gap-1.5 bg-[#13171F] whitespace-nowrap cursor-pointer"
                title="Open Executive CMS"
              >
                <Lock className="w-3.5 h-3.5 text-[#DC2626]" />
                <span className="hidden xs:inline">CMS</span>
              </button>

              <button
                onClick={onOpenProjectModal}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#DC2626] hover:bg-[#EF4444] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 glow-red cursor-pointer whitespace-nowrap shadow-md"
              >
                <span>Request RFP</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>

              {/* Mobile / Tablet Menu Toggle */}
              <div className="flex items-center xl:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-1.5 text-white hover:text-[#DC2626] transition-colors focus:outline-none cursor-pointer"
                  aria-label="Toggle navigation menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <MenuIcon className="w-5 h-5 sm:w-6 sm:h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#0A0B0D] border-b border-[#262D3B] px-4 pt-3 pb-6 space-y-2 mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {navLinks.map(link => {
                const isActive = currentRoute === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`text-left px-3 py-2 text-xs font-bold uppercase tracking-widest flex items-center justify-between cursor-pointer ${
                      isActive 
                        ? 'bg-[#DC2626]/10 text-[#DC2626] border-l-2 border-[#DC2626]' 
                        : 'text-[#D1D5DB] hover:text-white hover:bg-[#13171F]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#4B5563]" />
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[#262D3B] space-y-2">
              <button
                onClick={() => handleNavClick('admin')}
                className="w-full py-2.5 bg-[#13171F] hover:bg-[#1E232F] text-white border border-[#DC2626]/40 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4 text-[#DC2626]" />
                <span>Executive CMS Portal ({user?.name || 'Kainat'})</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenProjectModal();
                }}
                className="w-full py-2.5 bg-[#DC2626] hover:bg-[#EF4444] text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 glow-red cursor-pointer"
              >
                <span>Request RFP & Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
