import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  MapPin, 
  Globe2, 
  Heart, 
  Award, 
  GraduationCap, 
  Compass, 
  ArrowRight, 
  Search, 
  CheckCircle2, 
  Users 
} from 'lucide-react';
import { Job } from '../types';
import { JobCard } from '../components/common/JobCard';
import { SectionHeading } from '../components/common/SectionHeading';

interface CareersPageProps {
  jobs: Job[];
  navigate: (route: string, params?: { idOrSlug?: string }) => void;
  onApply: (job: Job) => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ jobs, navigate, onApply }) => {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const departments = ['All', 'Engineering', 'Civil Infrastructure', 'Architecture', 'Project Management', 'Sustainability'];
  const locations = ['All', 'Kharian, PK', 'London, UK', 'Dubai, UAE', 'Singapore', 'New York, USA', 'Oslo, Norway'];

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesDept = selectedDept === 'All' || job.department === selectedDept;
      const matchesLoc = selectedLocation === 'All' || job.location.includes(selectedLocation.split(',')[0]);
      const matchesSearch = searchQuery === '' ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDept && matchesLoc && matchesSearch;
    });
  }, [jobs, selectedDept, selectedLocation, searchQuery]);

  const perks = [
    {
      icon: Globe2,
      title: 'Global Mobility & Secondments',
      description: 'Opportunities to transfer between our Kharian HQ, London, Dubai, and Singapore engineering hubs on flagship megaprojects.'
    },
    {
      icon: GraduationCap,
      title: 'Advanced Chartership & Research Grants',
      description: '100% corporate sponsorship for ICE, IStructE, RIBA, and PhD research in computational BIM and low-carbon cement.'
    },
    {
      icon: Heart,
      title: 'Executive Healthcare & Wellness',
      description: 'Comprehensive global medical coverage, ergonomic wellness allowances, and on-site psychological support networks.'
    },
    {
      icon: Award,
      title: 'Equity & Performance Discretionary Pool',
      description: 'Industry-leading bonus incentives tied to safety milestones, decarbonization outcomes, and project delivery speed.'
    }
  ];

  return (
    <div className="flex flex-col w-full bg-[#F4F1EA] text-[#111315] pt-20 sm:pt-24">
      {/* 1. Hero Header */}
      <section className="relative py-20 sm:py-28 bg-[#F4F1EA] border-b border-[#D9D7D0] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-[#DC2626]" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#DC2626]">
                Careers at Aurelia Construct Group
              </span>
            </div>
            <h1 className="mt-2 text-3xl sm:text-5xl lg:text-6xl font-black font-display text-[#111315] tracking-tight leading-[1.05]">
              Shape the skylines <br />
              <span className="stroke-text-dark">of the next century.</span>
            </h1>
            <p className="mt-6 text-base sm:text-xl text-[#5A5C58] font-normal leading-relaxed">
              Join a cadre of 12,000+ elite engineers, master architects, computational researchers, and project directors delivering landmark infrastructure across 18 countries.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Perks & Culture */}
      <section className="py-20 sm:py-28 bg-[#F4F1EA] border-b border-[#D9D7D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Aurelia"
            title="The Environment for High-Stakes Mastery"
            subtitle="We invest deeply in our people, providing unparalleled technical autonomy, safety governance, and global opportunities."
            align="center"
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk, idx) => {
              const Icon = perk.icon;
              return (
                <div key={idx} className="p-6 sm:p-8 bg-white border border-[#D9D7D0] hover:border-[#111315] transition-colors flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="w-10 h-10 bg-[#F4F1EA] border border-[#D9D7D0] flex items-center justify-center text-[#111315] mb-5">
                      <Icon className="w-5 h-5 text-[#DC2626]" />
                    </div>
                    <h3 className="text-base font-black font-display text-[#111315] mb-2">
                      {perk.title}
                    </h3>
                    <p className="text-xs text-[#5A5C58] font-normal leading-relaxed">
                      {perk.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Open Positions Showcase */}
      <section className="py-20 sm:py-28 bg-white" id="positions">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Open Roles"
            title="Global Opportunities"
            subtitle="Browse available positions across our structural, digital engineering, and project management directorates."
            align="left"
            className="mb-12"
          />

          {/* Search & Filter Bar */}
          <div className="bg-[#F4F1EA] border border-[#D9D7D0] p-4 sm:p-6 mb-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8B8D89] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by job title or keyword..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D9D7D0] text-xs text-[#111315] placeholder-[#8B8D89] focus:outline-none focus:border-[#111315]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={selectedDept}
                onChange={e => setSelectedDept(e.target.value)}
                aria-label="Filter jobs by department"
                className="bg-white border border-[#D9D7D0] px-3 py-2 text-xs text-[#111315] font-medium focus:outline-none focus:border-[#111315]"
              >
                <option value="All">All Departments</option>
                {departments.filter(d => d !== 'All').map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>

              <select
                value={selectedLocation}
                onChange={e => setSelectedLocation(e.target.value)}
                aria-label="Filter jobs by location"
                className="bg-white border border-[#D9D7D0] px-3 py-2 text-xs text-[#111315] font-medium focus:outline-none focus:border-[#111315]"
              >
                <option value="All">All Locations</option>
                {locations.filter(l => l !== 'All').map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Job Cards Grid */}
          {filteredJobs.length === 0 ? (
            <div className="p-12 text-center bg-[#F4F1EA] border border-[#D9D7D0]">
              <Briefcase className="w-10 h-10 text-[#8B8D89] mx-auto mb-3 opacity-50" />
              <h3 className="text-lg font-black font-display text-[#111315]">No Openings Found</h3>
              <p className="text-xs text-[#5A5C58] mt-1">Try resetting your filters or submit a general speculative application.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map(job => (
                <JobCard
                  key={job.id}
                  job={job}
                  onApply={onApply}
                  onViewDetails={(j) => navigate('job-detail', { idOrSlug: j.id })}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

