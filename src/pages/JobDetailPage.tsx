import React from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  MapPin, 
  Award, 
  Calendar, 
  ArrowLeft, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Send
} from 'lucide-react';
import { Job } from '../types';

interface JobDetailPageProps {
  jobId: string;
  jobs: Job[];
  navigate: (route: string, params?: { idOrSlug?: string }) => void;
  onApply: (job: Job) => void;
}

export const JobDetailPage: React.FC<JobDetailPageProps> = ({
  jobId,
  jobs,
  navigate,
  onApply
}) => {
  const job = jobs.find(j => j.id === jobId) || jobs[0];

  if (!job) {
    return (
      <div className="min-h-screen bg-[#F4F1EA] pt-32 text-center text-[#111315]">
        <h2 className="text-2xl font-black font-display">Position not found</h2>
        <button onClick={() => navigate('careers')} className="mt-4 text-[#DC2626] font-bold">
          Return to Careers
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-[#F4F1EA] text-[#111315] pt-20 sm:pt-24">
      {/* Header */}
      <section className="py-16 sm:py-24 bg-[#F4F1EA] border-b border-[#D9D7D0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('careers')}
            className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#111315] hover:text-[#DC2626] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Openings</span>
          </button>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-white border border-[#D9D7D0] text-[#111315] text-xs font-bold uppercase tracking-widest">
              {job.department}
            </span>
            <span className="text-xs text-[#5A5C58] font-mono font-medium">
              {job.type}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-display text-[#111315] tracking-tight">
            {job.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[#5A5C58] mt-4 font-medium">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#DC2626]" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-[#DC2626]" />
              <span>{job.experienceLevel}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#DC2626]" />
              <span>{job.salaryRange}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Specs */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {/* Overview */}
            <div>
              <h2 className="text-xl font-black font-display text-[#111315] mb-3">
                Role Overview
              </h2>
              <p className="text-sm sm:text-base text-[#5A5C58] font-normal leading-relaxed">
                {job.description}
              </p>
            </div>

            {/* Responsibilities */}
            <div>
              <h2 className="text-xl font-black font-display text-[#111315] mb-4">
                Core Responsibilities
              </h2>
              <ul className="space-y-2.5">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#111315]">
                    <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div>
              <h2 className="text-xl font-black font-display text-[#111315] mb-4">
                Qualifications & Professional Experience
              </h2>
              <ul className="space-y-2.5">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#111315]">
                    <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div>
              <h2 className="text-xl font-black font-display text-[#111315] mb-4">
                Corporate Benefits & Relocation
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {job.benefits.map((ben, idx) => (
                  <li key={idx} className="p-3.5 bg-[#F4F1EA] border border-[#D9D7D0] text-xs text-[#111315] flex items-center gap-2 font-medium">
                    <span className="w-1.5 h-1.5 bg-[#DC2626] rounded-full" />
                    <span>{ben}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Apply Action CTA */}
            <div className="pt-8 border-t border-[#D9D7D0] flex items-center justify-between">
              <div>
                <p className="text-xs text-[#5A5C58]">Ready to join our engineering directorate?</p>
                <p className="text-sm font-black text-[#111315]">Applications reviewed on a rolling basis.</p>
              </div>
              <button
                onClick={() => onApply(job)}
                className="px-8 py-3.5 bg-[#DC2626] hover:bg-[#EF4444] text-[#111315] text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 shadow-sm"
              >
                <span>Submit Candidate Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

