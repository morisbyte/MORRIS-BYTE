import React from 'react';
import { motion } from 'motion/react';
import { Compass, ArrowRight, Building2 } from 'lucide-react';

interface NotFoundPageProps {
  navigate: (route: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#111315] pt-24 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="max-w-xl mx-auto text-center relative z-10 py-16">
        <div className="w-16 h-16 bg-white border border-[#D9D7D0] flex items-center justify-center text-[#DC2626] mx-auto mb-6 shadow-sm">
          <Compass className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-2 mb-2">
          <span className="w-6 h-[2px] bg-[#DC2626]" />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#DC2626]">
            Error 404 // Coordinate Out of Bounds
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-display text-[#111315] tracking-tight leading-tight">
          EVEN THE BEST PLANS <br />
          <span className="stroke-text-dark">TAKE A DETOUR.</span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-[#5A5C58] font-normal leading-relaxed">
          The architectural blueprint or dossier you are searching for is unavailable or has been relocated within our corporate registry.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => navigate('home')}
            className="px-8 py-3.5 bg-[#DC2626] hover:bg-[#EF4444] text-[#111315] text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 shadow-sm"
          >
            <span>Return to Overview</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigate('projects')}
            className="px-8 py-3.5 bg-white hover:bg-[#111315] hover:text-[#F4F1EA] text-[#111315] border border-[#D9D7D0] text-xs font-bold uppercase tracking-widest transition-all shadow-sm"
          >
            Explore Projects
          </button>
        </div>
      </div>
    </div>
  );
};

