import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, MapPin, Calendar, Building2 } from 'lucide-react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  onSelect: (slugOrId: string) => void;
  featured?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect, featured = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onSelect(project.slug || project.id)}
      className={`group cursor-pointer flex flex-col bg-white border border-[#D9D7D0] hover:border-[#111315] transition-all duration-300 overflow-hidden relative shadow-sm hover:shadow-md ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden ${featured ? 'h-72 sm:h-96' : 'h-64 sm:h-72'} bg-[#111315]`}>
        <img
          src={project.featuredImage}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111315]/80 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <span className="px-3 py-1 bg-[#111315]/90 backdrop-blur-md text-[10px] font-bold tracking-widest uppercase text-[#F4F1EA] border border-[#DC2626]/50">
            {project.category}
          </span>
          <span className={`px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider backdrop-blur-md ${
            project.status === 'Completed' 
              ? 'bg-emerald-900/90 text-emerald-100 border border-emerald-700/50' 
              : 'bg-[#DC2626]/90 text-[#111315] border border-[#DC2626]'
          }`}>
            {project.status}
          </span>
        </div>

        {/* Hover Action Button */}
        <div className="absolute bottom-4 right-4 w-10 h-10 bg-[#111315] text-[#F4F1EA] group-hover:bg-[#DC2626] group-hover:text-[#111315] flex items-center justify-center translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-xl">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between bg-white">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#8B8D89] mb-2 font-semibold tracking-wide">
            <MapPin className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>{project.location}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black font-display text-[#111315] group-hover:text-[#DC2626] transition-colors duration-300 tracking-tight">
            {project.title}
          </h3>

          <p className="mt-3 text-sm text-[#5A5C58] line-clamp-2 leading-relaxed font-normal">
            {project.description}
          </p>
        </div>

        {/* Metadata Footer */}
        <div className="mt-6 pt-4 border-t border-[#EAE7E0] flex items-center justify-between text-xs font-semibold text-[#8B8D89]">
          <div className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>{project.projectSize}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>{project.completionYear}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

