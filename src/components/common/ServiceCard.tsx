import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  onExplore: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  number,
  icon: Icon,
  title,
  description,
  features,
  onExplore
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col justify-between p-7 sm:p-8 bg-white border border-[#D9D7D0] hover:border-[#111315] transition-all duration-300 relative shadow-sm hover:shadow-md"
    >
      {/* Top Number & Icon */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <span className="text-3xl sm:text-4xl font-black font-display text-[#DC2626] group-hover:text-[#111315] transition-colors duration-300">
            {number}
          </span>
          <div className="w-12 h-12 bg-[#F4F1EA] border border-[#D9D7D0] group-hover:bg-[#111315] group-hover:border-[#111315] flex items-center justify-center text-[#111315] group-hover:text-[#DC2626] transition-colors duration-300">
            <Icon className="w-6 h-6" />
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-black font-display text-[#111315] tracking-tight mb-3">
          {title}
        </h3>

        <p className="text-sm text-[#5A5C58] font-normal leading-relaxed mb-6">
          {description}
        </p>

        {/* Feature bullets */}
        <ul className="space-y-2 mb-8 pt-4 border-t border-[#EAE7E0]">
          {features.map((feat, idx) => (
            <li key={idx} className="flex items-center gap-2 text-xs font-medium text-[#2F343B]">
              <span className="w-1.5 h-1.5 bg-[#DC2626]" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Explore Link */}
      <button
        onClick={onExplore}
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#111315] hover:text-[#DC2626] group-hover:translate-x-1 transition-all"
      >
        <span>Explore Discipline</span>
        <ArrowRight className="w-4 h-4 text-[#DC2626]" />
      </button>
    </motion.div>
  );
};

