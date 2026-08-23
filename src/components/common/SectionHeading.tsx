import React from 'react';
import { motion } from 'motion/react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  dark?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className = '',
  dark = false
}) => {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto'
  }[align];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col max-w-3xl ${alignmentClasses} ${className}`}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-6 h-[2px] bg-[#DC2626]" />
            <span className="w-2.5 h-[2px] bg-[#111315]" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DC2626]">
            {eyebrow}
          </span>
          {align === 'center' && (
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-[2px] bg-[#111315]" />
              <span className="w-6 h-[2px] bg-[#DC2626]" />
            </div>
          )}
        </div>
      )}

      <h2
        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] font-display ${
          dark ? 'text-[#F4F1EA]' : 'text-[#111315]'
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-4 text-sm sm:text-base md:text-lg leading-relaxed font-normal ${
            dark ? 'text-[#8B8D89]' : 'text-[#5A5C58]'
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

