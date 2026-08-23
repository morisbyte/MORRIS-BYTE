import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  Building2, 
  MapPin, 
  Calendar, 
  ArrowRight,
  SlidersHorizontal,
  Layers,
  Sparkles
} from 'lucide-react';
import { Project } from '../types';
import { ProjectCard } from '../components/common/ProjectCard';
import { SectionHeading } from '../components/common/SectionHeading';

interface ProjectsPageProps {
  projects: Project[];
  navigate: (route: string, params?: { idOrSlug?: string }) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ projects, navigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Commercial', 'Infrastructure', 'Residential', 'Industrial', 'Public & Civic', 'Engineering'];
  const statuses = ['All', 'Completed', 'Under Construction', 'Planning'];

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
      const matchesSearch = searchQuery === '' || 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.client.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesStatus && matchesSearch;
    });
  }, [projects, selectedCategory, selectedStatus, searchQuery]);

  return (
    <div className="flex flex-col w-full bg-[#F4F1EA] text-[#111315] pt-20 sm:pt-24">
      {/* Page Header */}
      <section className="relative py-20 sm:py-28 bg-[#F4F1EA] border-b border-[#D9D7D0] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-[#DC2626]" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#DC2626]">
                Project Portfolio & Landmarks
              </span>
            </div>
            <h1 className="mt-2 text-3xl sm:text-5xl lg:text-6xl font-black font-display text-[#111315] tracking-tight leading-[1.05]">
              Architectural monuments <br />
              <span className="stroke-text-dark">engineered across the globe.</span>
            </h1>
            <p className="mt-6 text-base sm:text-xl text-[#5A5C58] font-normal leading-relaxed">
              Explore our landmark developments across commercial high-rises, marine crossings, mass-timber civic centres, and clean-energy logistics hubs.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-6 bg-[#F4F1EA] border-b border-[#D9D7D0] sticky top-[68px] sm:top-[72px] z-30 backdrop-blur-md bg-opacity-95 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#8B8D89] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search projects by title, client, or city..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D9D7D0] text-xs text-[#111315] placeholder-[#8B8D89] focus:outline-none focus:border-[#111315] transition-colors"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#111315] text-[#F4F1EA]'
                      : 'bg-white text-[#5A5C58] hover:text-[#111315] border border-[#D9D7D0]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Status Select */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#5A5C58] font-mono whitespace-nowrap font-bold">Status:</span>
              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                aria-label="Filter projects by completion status"
                className="bg-white border border-[#D9D7D0] px-3 py-2 text-xs text-[#111315] font-semibold focus:outline-none focus:border-[#111315]"
              >
                {statuses.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 sm:py-24 bg-[#F4F1EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="py-24 text-center bg-white border border-[#D9D7D0] p-8">
              <Building2 className="w-12 h-12 text-[#8B8D89] mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-black font-display text-[#111315]">No Projects Match Your Filter</h3>
              <p className="text-sm text-[#5A5C58] mt-2 max-w-md mx-auto">
                Try adjusting your search criteria or resetting categories to view our full international portfolio.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedStatus('All');
                  setSearchQuery('');
                }}
                className="mt-6 px-6 py-2.5 bg-[#DC2626] text-[#111315] text-xs font-bold uppercase tracking-widest"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={(slug) => navigate('project-detail', { idOrSlug: slug })}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

