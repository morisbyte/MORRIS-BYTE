import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ArrowDown, 
  Building2, 
  Compass, 
  Hammer, 
  Cpu, 
  Factory, 
  Briefcase, 
  Leaf, 
  ShieldCheck, 
  MapPin, 
  Award,
  ChevronRight,
  Sparkles,
  Layers,
  Globe2,
  Play,
  X
} from 'lucide-react';
import { Project, BlogPost, SiteSettings } from '../types';
import { INITIAL_SITE_SETTINGS } from '../data/initialData';
import { SectionHeading } from '../components/common/SectionHeading';
import { StatCounter } from '../components/common/StatCounter';
import { ProjectCard } from '../components/common/ProjectCard';
import { ServiceCard } from '../components/common/ServiceCard';
import { BlogCard } from '../components/common/BlogCard';
import { ShowreelModal } from '../components/common/ShowreelModal';
import { AURELIA_LOGO, AURELIA_TAGLINE } from '../constants/assets';

interface HomePageProps {
  projects?: Project[];
  blogPosts?: BlogPost[];
  settings?: SiteSettings | null;
  navigate: (route: string, params?: { idOrSlug?: string }) => void;
  openProjectModal?: () => void;
  onOpenProjectModal?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  projects = [],
  blogPosts = [],
  settings = INITIAL_SITE_SETTINGS,
  navigate,
  openProjectModal,
  onOpenProjectModal
}) => {
  const currentSettings = settings || INITIAL_SITE_SETTINGS;
  const triggerProjectModal = openProjectModal || onOpenProjectModal || (() => {});
  const [activeProjectFilter, setActiveProjectFilter] = useState<'All' | string>('All');
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  const heroFeaturedProjects = (projects || []).slice(0, 3);
  const currentHeroProject = heroFeaturedProjects[activeHeroSlide] || (projects && projects[0]);

  const filteredProjects = activeProjectFilter === 'All'
    ? (projects || []).slice(0, 6)
    : (projects || []).filter(p => p.category === activeProjectFilter).slice(0, 6);

  const services = [
    {
      number: '01',
      icon: Hammer,
      title: 'Construction',
      description: 'Landmark commercial superstructures, mixed-use corporate headquarters, and high-density residential towers engineered for multi-generational longevity.',
      features: ['High-Rise & Mega Structures', 'Fast-Track EPC Execution', 'High-Performance Facades', 'Deep Foundation Engineering']
    },
    {
      number: '02',
      icon: Compass,
      title: 'Infrastructure',
      description: 'Major transportation arteries, complex marine fjord crossings, deep-water ports, and high-speed rail corridors connecting international economic hubs.',
      features: ['Cable-Stayed & Suspension Bridges', 'Sub-sea & Rock Tunnels', 'Multimodal Transit Hubs', 'Aviation Terminals']
    },
    {
      number: '03',
      icon: Cpu,
      title: 'Engineering',
      description: 'Pioneering structural, geotechnical, and MEP engineering powered by parametric computational algorithms and real-time seismic simulation.',
      features: ['Tuned Mass Dampening Systems', 'Geotechnical Soil Stabilization', 'Finite Element Analysis (FEA)', 'Vibration-Isolated Cleanrooms']
    },
    {
      number: '04',
      icon: Building2,
      title: 'Architecture',
      description: 'Seamless integration between architectural aesthetics and constructability, delivering monumental forms with exquisite tactile human warmth.',
      features: ['Parametric Biophilic Design', 'Mass Timber Structural Systems', 'Solar Aerodynamic Envelopes', 'Interior Acoustic Atriums']
    },
    {
      number: '05',
      icon: Factory,
      title: 'Industrial',
      description: 'Automated gigawatt logistics distribution hubs, clean-hydrogen facilities, and mission-critical advanced semiconductor campuses.',
      features: ['Automated High-Bay Facilities', 'Super-Flat Laser Screed Floors', 'Heavy Industrial Microgrids', 'Cleanroom Laboratory Standards']
    },
    {
      number: '06',
      icon: Briefcase,
      title: 'Project Management',
      description: 'Integrated Project Delivery (IPD) and lean construction coordination enforcing strict zero-incident safety and transparent milestone economics.',
      features: ['4D/5D BIM Schedule Modeling', 'Critical Chain Risk Management', 'Real-Time Telemetry Tracking', 'Global Supply Chain Logistics']
    }
  ];

  return (
    <div className="flex flex-col w-full bg-[#F4F1EA] text-[#111315] select-none relative">
      {/* Subtle Artistic Matrix Pattern Background */}
      <div className="fixed inset-0 opacity-[0.025] pointer-events-none bg-artistic-grid z-0" />

      {/* 1. ARTISTIC FLAIR HERO SECTION */}
      <section className="relative min-h-[calc(100vh-80px)] flex flex-col lg:flex-row border-b border-[#D9D7D0] z-10 pt-20 sm:pt-24 bg-[#F4F1EA]">
        {/* Left Side: Monumental Typography & Architectural Statement */}
        <div className="w-full lg:w-[62%] p-6 sm:p-12 lg:p-20 flex flex-col justify-center relative overflow-hidden">
          {/* Giant Decorative Monogram Watermark */}
          <div className="absolute -top-12 left-6 sm:left-12 text-[240px] sm:text-[340px] font-black font-display text-[#111315]/[0.025] pointer-events-none select-none">
            A
          </div>

          <div className="relative z-10">
            {/* Architectural Sub-Rule with Official Emblem */}
            <div className="flex items-center gap-3.5 mb-6 sm:mb-8">
              <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#DC2626] via-[#F59E0B] to-[#DC2626] shadow-md shrink-0">
                <img
                  src={AURELIA_LOGO}
                  alt="Aurelia Construct Group Official Seal"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="text-[#DC2626] text-xs font-bold tracking-[0.35em] uppercase font-mono block">
                  Global Engineering Excellence
                </span>
                <span className="text-[10px] text-[#5A5C58] font-mono tracking-[0.2em] uppercase block">
                  {AURELIA_TAGLINE}
                </span>
              </div>
            </div>

            {/* Monumental Master Headline with Outline Stroke */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[84px] leading-[0.92] font-black tracking-tight mb-8 sm:mb-10 text-[#111315] font-display">
              BUILDING<br />
              WHAT DEFINES<br />
              <span className="stroke-text-dark">TOMORROW.</span>
            </h1>

            {/* Editorial Lead Paragraph */}
            <p className="text-[#5A5C58] max-w-lg text-base sm:text-lg leading-relaxed mb-10 sm:mb-12 font-normal">
              {currentSettings?.subheadline || 'International construction, engineering, and infrastructure delivered with surgical precision across 18 countries. Shaping the skylines of the future through architectural innovation.'}
            </p>

            {/* Primary Action Row */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-10">
              {/* Showreel Circle Trigger */}
              <button 
                onClick={() => setShowreelOpen(true)}
                className="group cursor-pointer flex items-center gap-3.5 focus:outline-none"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#111315] flex items-center justify-center group-hover:bg-[#111315] transition-all">
                  <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-[#111315] border-b-[5px] border-b-transparent ml-1 group-hover:border-l-[#F4F1EA]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#111315] group-hover:text-[#DC2626] transition-colors">
                  View Showreel
                </span>
              </button>

              <div className="hidden sm:block h-[1px] w-16 bg-[#D9D7D0]" />

              <button
                onClick={() => navigate('projects')}
                className="px-6 sm:px-8 py-3.5 bg-[#111315] hover:bg-[#DC2626] text-[#F4F1EA] hover:text-[#111315] text-xs font-bold uppercase tracking-[0.2em] transition-all"
              >
                Explore Portfolio
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Contrast Charcoal Panel & Active Project Highlight */}
        <div className="w-full lg:w-[38%] bg-[#111315] relative flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#D9D7D0]">
          {/* Featured Project Details */}
          <div className="p-8 sm:p-12 text-[#F4F1EA] flex flex-col justify-end relative flex-1">
            {/* Background Project Preview with Low Opacity Overlay */}
            {currentHeroProject?.featuredImage && (
              <div className="absolute inset-0 z-0 overflow-hidden opacity-25">
                <img
                  src={currentHeroProject.featuredImage}
                  alt={currentHeroProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111315] via-[#111315]/80 to-[#111315]/40" />
              </div>
            )}

            <div className="relative z-10 mb-8 sm:mb-12">
              <div className="text-xs font-bold tracking-[0.3em] uppercase text-[#DC2626] mb-4">
                Featured Project
              </div>
              <h2 className="text-3xl sm:text-4xl font-light font-display tracking-tight mb-2 text-[#F4F1EA]">
                {currentHeroProject?.title || 'Aurelia Tower'}
              </h2>
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#8B8D89]">
                {currentHeroProject?.location || 'Dubai, UAE'} — {currentHeroProject?.category || 'High-Rise Commercial'}
              </div>

              {/* Slide Bars Indicator */}
              <div className="mt-6 flex gap-2">
                {heroFeaturedProjects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveHeroSlide(idx)}
                    className={`h-1.5 transition-all duration-300 ${
                      activeHeroSlide === idx ? 'w-10 bg-[#DC2626]' : 'w-6 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="relative z-10 grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
              <div className="flex flex-col gap-1">
                <span className="text-2xl sm:text-3xl font-black font-display text-[#F4F1EA]">
                  {currentSettings.stats?.projectsDelivered || '240+'}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#8B8D89] font-bold">
                  Projects Delivered
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl sm:text-3xl font-black font-display text-[#F4F1EA]">
                  {currentSettings.stats?.areaDelivered || '4.8M'}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#8B8D89] font-bold">
                  SQ. Meters Built
                </span>
              </div>
            </div>
          </div>

          {/* Warm Bronze Callout Banner */}
          <div 
            onClick={() => navigate('sustainability')}
            className="h-40 sm:h-44 bg-[#DC2626] p-8 sm:p-10 flex flex-col justify-between group cursor-pointer hover:bg-[#EF4444] transition-colors relative z-10 text-[#111315]"
          >
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold uppercase tracking-widest text-[#111315]">
                Annual Sustainability Report
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-light font-display leading-tight text-[#111315]">
              Pathways to <br />
              <strong className="font-black">Net-Zero 2030.</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ARCHITECTURAL 4-COLUMN DISCIPLINE TICKER */}
      <div className="bg-white border-b border-[#D9D7D0] grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#D9D7D0] relative z-10">
        <div 
          onClick={() => navigate('expertise')}
          className="flex items-center px-6 sm:px-10 py-6 gap-4 cursor-pointer group hover:bg-[#F4F1EA]/50 transition-colors"
        >
          <div className="text-2xl sm:text-3xl font-black font-display text-[#DC2626]">01</div>
          <div className="flex flex-col">
            <span className="text-xs uppercase font-bold tracking-widest text-[#111315] group-hover:text-[#DC2626] transition-colors">
              Architecture
            </span>
            <span className="text-[10px] text-[#8B8D89] font-medium">Design Integration</span>
          </div>
        </div>

        <div 
          onClick={() => navigate('expertise')}
          className="flex items-center px-6 sm:px-10 py-6 gap-4 cursor-pointer group hover:bg-[#F4F1EA]/50 transition-colors"
        >
          <div className="text-2xl sm:text-3xl font-black font-display text-[#111315]/40 group-hover:text-[#DC2626] transition-colors">02</div>
          <div className="flex flex-col">
            <span className="text-xs uppercase font-bold tracking-widest text-[#111315] group-hover:text-[#DC2626] transition-colors">
              Infrastructure
            </span>
            <span className="text-[10px] text-[#8B8D89] font-medium">Civic & Utility</span>
          </div>
        </div>

        <div 
          onClick={() => navigate('expertise')}
          className="flex items-center px-6 sm:px-10 py-6 gap-4 cursor-pointer group hover:bg-[#F4F1EA]/50 transition-colors"
        >
          <div className="text-2xl sm:text-3xl font-black font-display text-[#111315]/40 group-hover:text-[#DC2626] transition-colors">03</div>
          <div className="flex flex-col">
            <span className="text-xs uppercase font-bold tracking-widest text-[#111315] group-hover:text-[#DC2626] transition-colors">
              Engineering
            </span>
            <span className="text-[10px] text-[#8B8D89] font-medium">Structural & Technical</span>
          </div>
        </div>

        <div 
          onClick={() => navigate('expertise')}
          className="flex items-center px-6 sm:px-10 py-6 gap-4 cursor-pointer group hover:bg-[#F4F1EA]/50 transition-colors"
        >
          <div className="text-2xl sm:text-3xl font-black font-display text-[#111315]/40 group-hover:text-[#DC2626] transition-colors">04</div>
          <div className="flex flex-col">
            <span className="text-xs uppercase font-bold tracking-widest text-[#111315] group-hover:text-[#DC2626] transition-colors">
              Industrial
            </span>
            <span className="text-[10px] text-[#8B8D89] font-medium">Complex Environments</span>
          </div>
        </div>
      </div>

      {/* 3. TRUST / INTRODUCTION & KEY STATS */}
      <section className="py-20 sm:py-28 bg-[#F4F1EA] border-b border-[#D9D7D0] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <SectionHeading
                eyebrow="Precision Heritage"
                title="From Ambitious Concepts to Enduring Megastructures"
                subtitle="Aurelia Construct Group transforms challenging architectural visions into enduring realities. Spanning Europe, the Middle East, Asia-Pacific, and the Americas, our multidisciplinary teams engineer superstructures that withstand seismic forces, extreme climates, and the test of centuries."
              />

              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-bold text-[#111315]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#DC2626]" />
                  <span>Zero-Harm Safety Protocol</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#DC2626]" />
                  <span>ISO 9001 / 14001 / 45001</span>
                </div>
              </div>
            </div>

            {/* Right: Key Stats Grid */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4 sm:gap-6">
              <StatCounter
                value={currentSettings.stats?.yearsExperience || '25+'}
                label="Years of Excellence"
                sublabel="Delivering megaprojects since 2001"
              />
              <StatCounter
                value={currentSettings.stats?.countriesServed || '18'}
                label="Countries Served"
                sublabel="Global EPC & civil operations"
              />
              <StatCounter
                value={currentSettings.stats?.projectsDelivered || '240+'}
                label="Projects Delivered"
                sublabel="On-time & benchmark budgets"
              />
              <StatCounter
                value={currentSettings.stats?.areaDelivered || '4.8M+ m²'}
                label="Delivered Scale"
                sublabel="Engineered floor & span area"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. EXPERTISE SECTION (6 Disciplines) */}
      <section className="py-24 sm:py-32 bg-white border-b border-[#D9D7D0] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Disciplines"
            title="Comprehensive Engineering & Construction Capability"
            subtitle="From deep-water foundation caissons to mass-timber diagrids, explore our 6 core international capabilities."
            align="left"
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((svc) => (
              <ServiceCard
                key={svc.number}
                number={svc.number}
                icon={svc.icon}
                title={svc.title}
                description={svc.description}
                features={svc.features}
                onExplore={() => navigate('expertise')}
              />
            ))}
          </div>

          <div className="mt-14 text-center">
            <button
              onClick={() => navigate('expertise')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#111315] hover:bg-[#DC2626] text-[#F4F1EA] hover:text-[#111315] text-xs font-bold uppercase tracking-[0.25em] transition-all duration-300"
            >
              <span>VIEW FULL TECHNICAL CAPABILITIES MATRIX</span>
              <ArrowRight className="w-4 h-4 text-[#DC2626]" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. FEATURED PROJECTS SHOWCASE */}
      <section className="py-24 sm:py-32 bg-[#F4F1EA] border-b border-[#D9D7D0] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <SectionHeading
              eyebrow="Selected Portfolio"
              title="Enduring Architectural Landmarks"
              subtitle="Explore high-profile projects delivered across Dubai, Oslo, Singapore, Rotterdam, and Toronto."
            />

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {['All', 'Commercial', 'Infrastructure', 'Residential', 'Industrial', 'Public & Civic'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveProjectFilter(cat)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    activeProjectFilter === cat
                      ? 'bg-[#111315] text-[#F4F1EA]'
                      : 'bg-white text-[#5A5C58] hover:text-[#111315] border border-[#D9D7D0]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                featured={idx === 0}
                onSelect={(slug) => navigate('project-detail', { idOrSlug: slug })}
              />
            ))}
          </div>

          <div className="mt-14 flex items-center justify-between flex-wrap gap-4 pt-8 border-t border-[#D9D7D0]">
            <p className="text-xs text-[#8B8D89] font-medium">
              Displaying selected major commercial, infrastructure and civil engineering achievements.
            </p>
            <button
              onClick={() => navigate('projects')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#111315] hover:text-[#DC2626] transition-colors"
            >
              <span>Explore All {projects.length} Projects</span>
              <ArrowRight className="w-4 h-4 text-[#DC2626]" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. SUSTAINABILITY HIGHLIGHT STRIP */}
      <section className="py-20 bg-[#111315] text-[#F4F1EA] relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#DC2626]">
                <Leaf className="w-4 h-4" />
                <span>Decarbonization Commitment</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-[#F4F1EA]">
                Pioneering Carbon-Negative Superstructures by 2030
              </h3>
              <p className="text-sm text-[#8B8D89] font-normal leading-relaxed">
                Through bio-mineralized geopolymer concretes, engineered mass-timber diagrids, and circular lifecycle material passports, we actively reduce embodied emissions on every square meter built.
              </p>
              <div className="pt-4 flex flex-wrap gap-8 text-xs text-[#F4F1EA]">
                <div>
                  <span className="text-3xl font-black font-display text-[#DC2626] block">42%</span>
                  <span className="text-[#8B8D89] text-[11px] uppercase tracking-wider font-bold">Construction Waste Reduction</span>
                </div>
                <div>
                  <span className="text-3xl font-black font-display text-[#DC2626] block">31%</span>
                  <span className="text-[#8B8D89] text-[11px] uppercase tracking-wider font-bold">Lower Operational Energy</span>
                </div>
                <div>
                  <span className="text-3xl font-black font-display text-[#DC2626] block">65%</span>
                  <span className="text-[#8B8D89] text-[11px] uppercase tracking-wider font-bold">Responsible Sourcing</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center">
              <button
                onClick={() => navigate('sustainability')}
                className="px-8 py-4 bg-[#DC2626] hover:bg-[#EF4444] text-[#111315] text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-2 shadow-xl"
              >
                <span>READ SUSTAINABILITY REPORT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. EXECUTIVE INSIGHTS / EDITORIAL SECTION */}
      <section className="py-24 sm:py-32 bg-white border-b border-[#D9D7D0] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <SectionHeading
              eyebrow="Executive Insights"
              title="Thought Leadership & Technical Research"
              subtitle="Original white papers, architectural commentary, and computational construction analysis from our practice leads."
            />
            <button
              onClick={() => navigate('insights')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#111315] hover:text-[#DC2626] transition-colors"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4 text-[#DC2626]" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogPosts.slice(0, 3).map(post => (
              <BlogCard
                key={post.id}
                post={post}
                onSelect={(slug) => navigate('article-detail', { idOrSlug: slug })}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 8. GLOBAL FOOTPRINT & OFFICES SHOWCASE */}
      <section className="py-20 sm:py-28 bg-[#F4F1EA] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Global Presence"
            title="Strategic Operational Headquarters"
            subtitle="Coordinate with our executive directorate in Kharian (Punjab, Pakistan) and regional hubs across London, Dubai, and Singapore."
            align="center"
            className="mb-16"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(currentSettings.offices || []).map((office, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#D9D7D0] p-6 flex flex-col justify-between hover:border-[#111315] transition-all group shadow-sm"
              >
                <div>
                  <div className="h-36 mb-4 overflow-hidden relative bg-[#111315]">
                    <img
                      src={office.image}
                      alt={office.city}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-[#111315]/20" />
                    <div className="absolute bottom-2 left-2">
                      <span className="px-2.5 py-1 bg-[#111315]/90 text-[10px] uppercase font-bold text-[#DC2626]">
                        {office.city}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-base font-bold font-display text-[#111315] mb-1">
                    {office.role}
                  </h4>
                  <p className="text-xs text-[#5A5C58] font-normal leading-relaxed mb-4">
                    {office.address}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EAE7E0] text-[11px] text-[#8B8D89] font-medium space-y-1">
                  <p><span className="text-[#111315] font-bold">Phone:</span> {office.phone}</p>
                  <p><span className="text-[#111315] font-bold">Hours:</span> {office.hours}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showreel Video Modal */}
      <ShowreelModal
        isOpen={showreelOpen}
        onClose={() => setShowreelOpen(false)}
        onNavigateProjects={() => navigate('projects')}
      />
    </div>
  );
};

