import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Target, 
  Eye, 
  Award, 
  Users, 
  Globe2, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Building,
  HardHat,
  Cpu
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { StatCounter } from '../components/common/StatCounter';
import { SiteSettings } from '../types';
import { AURELIA_LOGO, AURELIA_TAGLINE, CONSTRUCTION_3D_BG } from '../constants/assets';

interface AboutPageProps {
  settings: SiteSettings;
  navigate: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ settings, navigate }) => {
  const values = [
    {
      title: 'Integrity',
      description: 'Uncompromising corporate governance, transparent open-book procurement, and ethical contractual relationships across all sovereign jurisdictions.'
    },
    {
      title: 'Precision',
      description: 'Millimeter-accurate computational BIM modeling, robotic LiDAR site verification, and unyielding adherence to architectural specifications.'
    },
    {
      title: 'Innovation',
      description: 'Pioneering generative structural algorithms, tuned liquid damping, and advanced material sciences to conquer unprecedented engineering challenges.'
    },
    {
      title: 'Sustainability',
      description: 'Committing to carbon-negative construction methodologies, circular material lifecycle indexing, and LEED Platinum / BREEAM Outstanding standards.'
    },
    {
      title: 'Collaboration',
      description: 'Fostering Integrated Project Delivery (IPD) ecosystems where clients, master architects, municipal authorities, and trade specialists unite seamlessly.'
    },
    {
      title: 'Excellence',
      description: 'Pursuing peerless structural craftsmanship, pristine finishes, and an industry-leading zero-harm occupational safety record.'
    }
  ];

  const leadership = [
    {
      name: 'Claire Kensington',
      role: 'Chief Executive Officer & Managing Director',
      bio: 'Former Executive Director at European Infrastructure Partners with 26 years overseeing multibillion-dollar civil and high-rise developments across the UK, Middle East, and Scandinavia.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'Marcus Vance',
      role: 'Chief Technology & Digital Construction Officer',
      bio: 'Pioneer in 5D computational BIM, autonomous site robotics, and structural digital twin telemetry. Holds advanced degrees from ETH Zurich and MIT.',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'Soraya Al-Mansoor',
      role: 'Executive Vice President, Major Infrastructure',
      bio: 'Directs marine foundations, sub-sea tunnel engineering, and deep-water bridge span projects across Europe and the GCC. Fellow of the Institution of Civil Engineers (FICE).',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'Julian Thorne',
      role: 'Principal Architectural Director',
      bio: 'Leading the bridge between structural heroism and human biophilic comfort. Recipient of multiple RIBA International Awards and CTBUH Design Fellowships.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'Dr. Elena Rostova',
      role: 'Global Head of Sustainability & Materials Science',
      bio: 'Author of seminal papers on bio-mineralized geopolymers and low-carbon cement chemistry. Advisory member to the World Green Building Council.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'Liam O’Connor, CEng',
      role: 'Global Director of Health, Safety & Environment',
      bio: 'Oversees safety standards for 12,000+ tradespeople. Champion of Aurelia’s Zero-Harm culture resulting in an LTIFR 82% below global contractor benchmarks.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop'
    }
  ];

  return (
    <div className="flex flex-col w-full bg-[#F4F1EA] text-[#111315] pt-20 sm:pt-24">
      {/* 1. Page Header Banner */}
      <section className="relative py-20 sm:py-28 bg-[#F4F1EA] border-b border-[#D9D7D0] overflow-hidden">
        {/* Photorealistic 3D Construction Background Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.14]">
          <img
            src={CONSTRUCTION_3D_BG}
            alt="3D Construction Infrastructure Render"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F4F1EA] via-[#F4F1EA]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F4F1EA] via-transparent to-[#F4F1EA]/40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-8 h-[2px] bg-[#DC2626]" />
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#DC2626]">
                  About Aurelia Construct Group
                </span>
              </div>
              <h1 className="mt-2 text-3xl sm:text-5xl lg:text-6xl font-black font-display text-[#111315] tracking-tight leading-[1.05]">
                Engineered for generations. <br />
                <span className="stroke-text-dark">Built with absolute precision.</span>
              </h1>
              <p className="mt-6 text-base sm:text-xl text-[#5A5C58] font-normal leading-relaxed">
                Founded on the belief that monumental infrastructure should elevate human potential and endure centuries, Aurelia Construct Group unites world-class structural engineering with visionary architecture.
              </p>
            </div>

            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full p-1 bg-gradient-to-tr from-[#DC2626] via-[#F59E0B] to-[#DC2626] shadow-xl shrink-0 self-start md:self-center">
              <img
                src={AURELIA_LOGO}
                alt="Aurelia Construct Group Official Seal"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Who We Are & Our Story */}
      <section className="py-20 sm:py-28 bg-white border-b border-[#D9D7D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="w-6 h-[2px] bg-[#DC2626]" />
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#DC2626]">
                  Who We Are
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-display text-[#111315] tracking-tight">
                An international construction powerhouse delivering complex, high-stakes infrastructure.
              </h2>
              <p className="text-sm sm:text-base text-[#5A5C58] font-normal leading-relaxed">
                Operating across 18 countries with global headquarters in Kharian (Punjab, Pakistan) and regional directorates in London, Dubai, and Singapore, Aurelia Construct Group has grown from a specialized engineering practice into one of the world's most trusted tier-1 main contractors.
              </p>
              <p className="text-sm sm:text-base text-[#5A5C58] font-normal leading-relaxed">
                We manage projects from initial geotechnical seismic modeling and parametric concept development through EPC delivery, commissioning, and continuous digital twin lifecycle telemetry.
              </p>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="aspect-[4/3] bg-[#111315] border border-[#D9D7D0] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
                  alt="Architectural Blueprint Review"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white border border-[#111315] p-6 max-w-xs shadow-xl hidden sm:block">
                <p className="text-xs font-mono text-[#DC2626] uppercase tracking-widest font-bold">Global Safety Record</p>
                <p className="text-2xl font-black font-display text-[#111315] mt-1">99.8% Safety Score</p>
                <p className="text-[11px] text-[#5A5C58] mt-1 font-medium">Zero lost-time incidents across 12M+ man-hours in 2025.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="py-20 bg-[#F4F1EA] border-b border-[#D9D7D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {/* Mission */}
            <div className="p-8 sm:p-10 bg-white border border-[#D9D7D0]">
              <div className="w-12 h-12 bg-[#F4F1EA] border border-[#D9D7D0] flex items-center justify-center text-[#111315] mb-6">
                <Target className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-display text-[#111315] mb-4">
                Our Mission
              </h3>
              <p className="text-sm text-[#5A5C58] font-normal leading-relaxed">
                To engineer and construct the world’s most ambitious architectural and civil landmarks through uncompromising precision, sustainable low-carbon material innovations, and collaborative partnerships that enrich global communities.
              </p>
            </div>

            {/* Vision */}
            <div className="p-8 sm:p-10 bg-white border border-[#D9D7D0]">
              <div className="w-12 h-12 bg-[#F4F1EA] border border-[#D9D7D0] flex items-center justify-center text-[#111315] mb-6">
                <Eye className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-display text-[#111315] mb-4">
                Our Vision
              </h3>
              <p className="text-sm text-[#5A5C58] font-normal leading-relaxed">
                To be the undisputed international benchmark for architectural engineering excellence, proving that monumental human ambition and planetary stewardship can seamlessly converge in every structure we raise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values (6 Pillars) */}
      <section className="py-24 sm:py-32 bg-white border-b border-[#D9D7D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Corporate Principles"
            title="The Six Core Values Guiding Aurelia"
            subtitle="These enduring tenets govern every structural calculation, subcontract agreement, and site operation."
            align="center"
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {values.map((v, idx) => (
              <div
                key={idx}
                className="p-8 bg-[#F4F1EA] border border-[#D9D7D0] hover:border-[#111315] transition-colors relative group"
              >
                <span className="text-xs font-mono text-[#DC2626] uppercase tracking-widest block mb-3 font-bold">
                  0{idx + 1} / Principle
                </span>
                <h3 className="text-xl font-black font-display text-[#111315] mb-3">
                  {v.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5A5C58] font-normal leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Executive Leadership Team */}
      <section className="py-24 sm:py-32 bg-[#F4F1EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Executive Directorate"
            title="Leadership Guided by Engineering Pedigree"
            subtitle="Meet the international executives and technical fellows steering Aurelia Construct Group."
            align="left"
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.map((exec, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#D9D7D0] overflow-hidden group hover:border-[#111315] transition-all shadow-sm"
              >
                <div className="h-72 overflow-hidden relative bg-[#111315]">
                  <img
                    src={exec.avatar}
                    alt={exec.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-black font-display text-[#111315]">
                    {exec.name}
                  </h3>
                  <p className="text-xs text-[#DC2626] font-bold tracking-wide mt-0.5 mb-3">
                    {exec.role}
                  </p>
                  <p className="text-xs text-[#5A5C58] font-normal leading-relaxed">
                    {exec.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

