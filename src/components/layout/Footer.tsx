import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  Lock, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AURELIA_LOGO, AURELIA_TAGLINE } from '../../constants/assets';

interface FooterProps {
  navigate: (route: string, params?: any) => void;
  onOpenProjectModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  navigate,
  onOpenProjectModal
}) => {
  const { isAuthenticated, user } = useAuth();

  const handleNav = (route: string) => {
    navigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0B0D] text-[#9CA3AF] border-t border-[#1E232F] relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#DC2626]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#DC2626]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Global RFP Action Banner */}
      <div className="border-b border-[#1E232F] bg-[#0E1017]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-[#DC2626] via-[#F59E0B] to-[#DC2626] shrink-0 shadow-lg glow-red">
                <img
                  src={AURELIA_LOGO}
                  alt="Aurelia Construct Group"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#DC2626] uppercase block">
                  Megastructure Project Intake
                </span>
                <h4 className="text-xl sm:text-2xl font-bold font-display text-white">
                  Ready to engineer the next architectural landmark?
                </h4>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenProjectModal}
                className="px-6 py-3 bg-[#DC2626] hover:bg-[#EF4444] text-white text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-2 glow-red cursor-pointer"
              >
                <span>Request Project Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleNav('contact')}
                className="px-6 py-3 border border-[#262D3B] hover:border-[#DC2626] text-white text-xs font-bold uppercase tracking-[0.2em] transition-all bg-[#13171F] cursor-pointer"
              >
                Contact Global Offices
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Credentials */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-[#DC2626] via-[#F59E0B] to-[#DC2626] shrink-0 shadow-md">
                <img
                  src={AURELIA_LOGO}
                  alt="Aurelia Construct Group"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="text-base font-bold tracking-[0.2em] text-white uppercase block leading-none font-display">
                  Aurelia Construct Group
                </span>
                <span className="text-[9px] font-mono tracking-[0.25em] text-[#DC2626] uppercase block mt-1">
                  {AURELIA_TAGLINE}
                </span>
              </div>
            </div>
            <p className="text-xs text-[#9CA3AF] leading-relaxed max-w-sm">
              Delivering high-performance civil engineering, iconic skyscrapers, transportation infrastructure, and net-zero industrial projects worldwide with mathematical precision.
            </p>
            <div className="flex flex-wrap gap-3 pt-2 text-[11px] font-mono text-[#DC2626]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ISO 9001 / 14001 / 45001</span>
              </span>
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                <span>FIDIC & CTBUH Partner</span>
              </span>
            </div>
          </div>

          {/* Col 2: Sectors */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#DC2626]">
              Disciplines
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('projects')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#DC2626]" />
                  <span>Commercial Towers</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('projects')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#DC2626]" />
                  <span>Heavy Civil Infrastructure</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('projects')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#DC2626]" />
                  <span>Industrial & Energy Hubs</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('sustainability')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#DC2626]" />
                  <span>Net-Zero Retrofitting</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation & Insights */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#DC2626]">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#DC2626]" />
                  <span>Corporate Heritage</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('expertise')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#DC2626]" />
                  <span>Engineering R&D</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('insights')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#DC2626]" />
                  <span>Research & Whitepapers</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('careers')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#DC2626]" />
                  <span>Executive Careers</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: CMS Portal & Governance */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#DC2626]">
              CMS & Operations
            </h4>
            <div className="space-y-2 text-xs">
              <button
                onClick={() => handleNav('admin')}
                className="w-full text-left p-2.5 bg-[#13171F] border border-[#262D3B] hover:border-[#DC2626] text-white flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-[#DC2626]" />
                  <div>
                    <span className="font-bold block">CMS Portal</span>
                    <span className="text-[10px] text-[#9CA3AF] font-mono">User: Kainat</span>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#6B7280] group-hover:text-[#DC2626] group-hover:translate-x-0.5 transition-all" />
              </button>

              <p className="text-[11px] text-[#6B7280] leading-normal pt-1">
                Authorized executive dashboard for project listings, career openings, RFP submissions, and editorial publishing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="border-t border-[#1E232F] bg-[#07080A] py-6 text-xs text-[#6B7280]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Aurelia Construct Group S.A. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6 font-mono text-[11px]">
            <span className="hover:text-[#DC2626] cursor-pointer">Security & Compliance</span>
            <span className="hover:text-[#DC2626] cursor-pointer">Privacy Protocol</span>
            <button 
              onClick={() => handleNav('admin')}
              className="text-[#DC2626] hover:underline cursor-pointer flex items-center gap-1 font-bold"
            >
              <Lock className="w-3 h-3" />
              <span>Executive Login (Kainat)</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
