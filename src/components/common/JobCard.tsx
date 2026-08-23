import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Briefcase, Award, ArrowRight } from 'lucide-react';
import { Job } from '../../types';

interface JobCardProps {
  job: Job;
  onApply: (job: Job) => void;
  onViewDetails?: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onApply, onViewDetails }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="p-6 sm:p-8 bg-white border border-[#D9D7D0] hover:border-[#111315] transition-all duration-300 flex flex-col justify-between group shadow-sm"
    >
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="px-2.5 py-1 bg-[#F4F1EA] text-[11px] font-bold text-[#111315] border border-[#D9D7D0]">
            {job.department}
          </span>
          <span className="text-xs text-[#5A5C58] font-mono font-medium">
            {job.type}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black font-display text-[#111315] group-hover:text-[#DC2626] transition-colors mb-3">
          {job.title}
        </h3>

        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-[#5A5C58] mb-4">
          <div className="flex items-center gap-1.5 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Briefcase className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>{job.experienceLevel}</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Award className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>{job.salaryRange}</span>
          </div>
        </div>

        <p className="text-sm text-[#5A5C58] font-normal leading-relaxed line-clamp-2 mb-6">
          {job.description}
        </p>
      </div>

      <div className="pt-4 border-t border-[#D9D7D0] flex items-center justify-between">
        {onViewDetails && (
          <button
            onClick={() => onViewDetails(job)}
            className="text-xs uppercase tracking-wider font-bold text-[#111315] hover:text-[#DC2626] transition-colors"
          >
            Position Specs
          </button>
        )}
        <button
          onClick={() => onApply(job)}
          className="ml-auto px-5 py-2.5 bg-[#DC2626] hover:bg-[#EF4444] text-[#111315] text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 shadow-sm"
        >
          <span>Apply Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
};

