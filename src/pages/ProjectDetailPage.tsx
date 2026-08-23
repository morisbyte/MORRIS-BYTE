import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Building2, 
  Calendar, 
  DollarSign, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight,
  Maximize2,
  X,
  Share2
} from 'lucide-react';
import { Project } from '../types';
import { ProjectCard } from '../components/common/ProjectCard';
import { useToast } from '../context/ToastContext';

interface ProjectDetailPageProps {
  slugOrId: string;
  projects: Project[];
  navigate: (route: string, params?: { idOrSlug?: string }) => void;
  openProjectModal: () => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  slugOrId,
  projects,
  navigate,
  openProjectModal
}) => {
  const { success } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const project = projects.find(p => p.slug === slugOrId || p.id === slugOrId) || projects[0];

  const relatedProjects = projects
    .filter(p => p.id !== project?.id && (p.category === project?.category || p.status === project?.status))
    .slice(0, 3);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F4F1EA] pt-32 px-4 text-center">
        <h2 className="text-2xl font-black text-[#111315]">Project Not Found</h2>
        <button
          onClick={() => navigate('projects')}
          className="mt-4 px-6 py-2.5 bg-[#DC2626] text-[#111315] text-xs font-bold uppercase tracking-widest"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    success('Link Copied', 'Project dossier URL copied to clipboard.');
  };

  return (
    <div className="flex flex-col w-full bg-[#F4F1EA] text-[#111315] pt-16 sm:pt-20">
      {/* 1. Full-Width Cinematic Hero Banner */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-end bg-[#111315] overflow-hidden">
        <img
          src={project.featuredImage}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111315] via-[#111315]/60 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
          {/* Back link & Category */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate('projects')}
              className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#DC2626] hover:text-[#EF4444] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Portfolio</span>
            </button>

            <button
              onClick={handleShare}
              className="px-3 py-1.5 bg-[#181A1D]/80 border border-[#2F343B] hover:border-[#DC2626] text-xs text-[#D9D7D0] flex items-center gap-2 backdrop-blur-md transition-colors font-medium"
            >
              <Share2 className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>Share Dossier</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3.5 py-1 bg-[#DC2626] text-[#111315] text-xs font-black uppercase tracking-widest">
              {project.category}
            </span>
            <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md ${
              project.status === 'Completed' ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-700' : 'bg-amber-950/90 text-amber-300 border border-amber-700'
            }`}>
              {project.status}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-[#F4F1EA] tracking-tight max-w-4xl">
            {project.title}
          </h1>

          <div className="flex items-center gap-2 text-sm text-[#D9D7D0] mt-3 font-medium">
            <MapPin className="w-4 h-4 text-[#DC2626]" />
            <span>{project.location}, {project.country}</span>
          </div>
        </div>
      </section>

      {/* 2. Key Vitals Spec Bar */}
      <section className="bg-white border-y border-[#D9D7D0] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-xs">
            <div>
              <span className="text-[#8B8D89] uppercase tracking-wider block font-mono text-[10px] font-bold">Client</span>
              <span className="text-[#111315] font-black text-sm mt-1 block">{project.client}</span>
            </div>
            <div>
              <span className="text-[#8B8D89] uppercase tracking-wider block font-mono text-[10px] font-bold">Completion</span>
              <span className="text-[#111315] font-black text-sm mt-1 block">{project.completionYear}</span>
            </div>
            <div>
              <span className="text-[#8B8D89] uppercase tracking-wider block font-mono text-[10px] font-bold">Project Value</span>
              <span className="text-[#DC2626] font-black text-sm mt-1 block">{project.projectValue}</span>
            </div>
            <div>
              <span className="text-[#8B8D89] uppercase tracking-wider block font-mono text-[10px] font-bold">Scale / Area</span>
              <span className="text-[#111315] font-black text-sm mt-1 block">{project.projectSize}</span>
            </div>
            <div>
              <span className="text-[#8B8D89] uppercase tracking-wider block font-mono text-[10px] font-bold">Architect</span>
              <span className="text-[#111315] font-bold text-xs mt-1 block truncate">{project.architect || 'Aurelia Collaborative'}</span>
            </div>
            <div>
              <span className="text-[#8B8D89] uppercase tracking-wider block font-mono text-[10px] font-bold">Engineering Lead</span>
              <span className="text-[#111315] font-bold text-xs mt-1 block truncate">{project.structuralEngineer || 'Aurelia Advanced Engineering'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Deep Editorial Narrative: Overview, Challenge, Approach, Results */}
      <section className="py-20 sm:py-28 bg-[#F4F1EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Narrative Column */}
            <div className="lg:col-span-8 space-y-12">
              {/* Executive Overview */}
              <div>
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="w-6 h-[2px] bg-[#DC2626]" />
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#DC2626]">
                    Executive Brief
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black font-display text-[#111315] tracking-tight">
                  Project Dossier & Architectural Scope
                </h2>
                <p className="mt-4 text-base sm:text-lg text-[#5A5C58] font-normal leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Challenge */}
              <div className="p-8 bg-white border-l-4 border-[#DC2626] border-y border-r border-[#D9D7D0]">
                <h3 className="text-xl font-black font-display text-[#111315] mb-3">
                  The Engineering Challenge
                </h3>
                <p className="text-sm sm:text-base text-[#5A5C58] font-normal leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              {/* Approach */}
              <div>
                <h3 className="text-xl font-black font-display text-[#111315] mb-3">
                  Our Technical Approach & Methodology
                </h3>
                <p className="text-sm sm:text-base text-[#5A5C58] font-normal leading-relaxed">
                  {project.approach}
                </p>
              </div>

              {/* Results */}
              <div>
                <h3 className="text-xl font-black font-display text-[#111315] mb-3">
                  Measurable Operational Results
                </h3>
                <p className="text-sm sm:text-base text-[#5A5C58] font-normal leading-relaxed">
                  {project.results}
                </p>
              </div>

              {/* Gallery Section */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="pt-8 border-t border-[#D9D7D0]">
                  <h3 className="text-xl font-black font-display text-[#111315] mb-6">
                    Project Visual Gallery & Site Documentation
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.gallery.map((imgUrl, i) => (
                      <div
                        key={i}
                        onClick={() => setSelectedImage(imgUrl)}
                        className="group relative h-64 bg-white border border-[#D9D7D0] overflow-hidden cursor-pointer shadow-sm"
                      >
                        <img
                          src={imgUrl}
                          alt={`${project.title} detail ${i + 1}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-[#111315]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="w-10 h-10 bg-[#111315] text-[#DC2626] flex items-center justify-center border border-[#DC2626]">
                            <Maximize2 className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar: Sustainability & Awards */}
            <div className="lg:col-span-4 space-y-8">
              {/* Sustainability Specifications */}
              <div className="p-8 bg-white border border-[#D9D7D0]">
                <span className="text-xs font-mono text-[#DC2626] uppercase tracking-widest block mb-2 font-bold">
                  ESG & Environmental
                </span>
                <h3 className="text-lg font-black font-display text-[#111315] mb-4">
                  Sustainability Specifications
                </h3>
                <ul className="space-y-3">
                  {project.sustainabilityFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-[#5A5C58] font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Awards if any */}
              {project.awards && project.awards.length > 0 && (
                <div className="p-8 bg-white border border-[#D9D7D0]">
                  <span className="text-xs font-mono text-[#DC2626] uppercase tracking-widest block mb-2 font-bold">
                    Recognition
                  </span>
                  <h3 className="text-lg font-black font-display text-[#111315] mb-4">
                    Industry Accolades
                  </h3>
                  <ul className="space-y-3">
                    {project.awards.map((award, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#5A5C58] font-medium">
                        <Award className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                        <span>{award}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* RFP Consultation Card */}
              <div className="p-8 bg-white border-2 border-[#111315] text-center shadow-lg">
                <h4 className="text-base font-black font-display text-[#111315] mb-2">
                  Commission a Similar Structure
                </h4>
                <p className="text-xs text-[#5A5C58] font-normal leading-relaxed mb-6">
                  Discuss your commercial, infrastructure or civic project feasibility with our global engineering directorate.
                </p>
                <button
                  onClick={openProjectModal}
                  className="w-full py-3.5 bg-[#DC2626] hover:bg-[#EF4444] text-[#111315] text-xs font-bold uppercase tracking-widest transition-all shadow-md"
                >
                  Start Project Proposal
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-20 bg-white border-t border-[#D9D7D0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-black font-display text-[#111315] mb-8">
              Related Developments & Structural Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map(rel => (
                <ProjectCard
                  key={rel.id}
                  project={rel}
                  onSelect={(slug) => navigate('project-detail', { idOrSlug: slug })}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal for Gallery */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111315]/95 backdrop-blur-md">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-[#F4F1EA] p-2 bg-[#181A1D] hover:bg-[#24282D] transition-colors"
              aria-label="Close image preview"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedImage}
              alt="High-resolution visual"
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[85vh] object-contain border border-[#2F343B]"
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

