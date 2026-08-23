import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface StatCounterProps {
  value: string;
  label: string;
  sublabel?: string;
  suffix?: string;
  prefix?: string;
  className?: string;
  dark?: boolean;
}

export const StatCounter: React.FC<StatCounterProps> = ({
  value,
  label,
  sublabel,
  prefix = '',
  className = '',
  dark = false
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    // Parse numeric parts if available
    const numericMatch = value.match(/[\d.]+/);
    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }

    const targetNum = parseFloat(numericMatch[0]);
    const nonNumericSuffix = value.replace(numericMatch[0], '');
    const isDecimal = numericMatch[0].includes('.');

    let start = 0;
    const duration = 1800; // ms
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = start + (targetNum - start) * easeOut;

      const formatted = isDecimal ? current.toFixed(1) : Math.floor(current).toString();
      setDisplayValue(`${formatted}${nonNumericSuffix}`);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col p-6 sm:p-8 transition-colors duration-300 relative group overflow-hidden ${
        dark 
          ? 'bg-[#111315] border border-white/10 text-[#F4F1EA]' 
          : 'bg-white border border-[#D9D7D0] hover:border-[#111315] shadow-sm'
      } ${className}`}
    >
      {/* Decorative architectural corner lines */}
      <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
        <div className={`absolute top-0 right-0 w-8 h-[2px] ${dark ? 'bg-[#DC2626]' : 'bg-[#D9D7D0] group-hover:bg-[#DC2626]'} transition-colors`} />
        <div className={`absolute top-0 right-0 h-8 w-[2px] ${dark ? 'bg-[#DC2626]' : 'bg-[#D9D7D0] group-hover:bg-[#DC2626]'} transition-colors`} />
      </div>

      <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight flex items-baseline gap-1">
        {prefix && <span className="text-[#DC2626] text-2xl font-light">{prefix}</span>}
        <span className={`${dark ? 'text-[#F4F1EA]' : 'text-[#111315]'} group-hover:text-[#DC2626] transition-colors duration-300`}>
          {isInView ? displayValue : '0'}
        </span>
      </div>

      <div className={`mt-3 text-xs font-bold tracking-[0.2em] uppercase ${dark ? 'text-[#8B8D89]' : 'text-[#111315]'}`}>
        {label}
      </div>

      {sublabel && (
        <div className={`mt-1 text-xs font-normal leading-relaxed ${dark ? 'text-[#8B8D89]' : 'text-[#5A5C58]'}`}>
          {sublabel}
        </div>
      )}
    </motion.div>
  );
};

