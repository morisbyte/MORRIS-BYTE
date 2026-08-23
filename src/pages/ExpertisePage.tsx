import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Hammer, 
  Compass, 
  Cpu, 
  Building2, 
  Factory, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight,
  Layers,
  ShieldCheck,
  Zap,
  Globe2,
  Workflow
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';

interface ExpertisePageProps {
  navigate: (route: string) => void;
  openProjectModal: () => void;
}

export const ExpertisePage: React.FC<ExpertisePageProps> = ({ navigate, openProjectModal }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const disciplines = [
    {
      id: 'construction',
      title: 'Construction',
      tagline: 'Precision Superstructures & High-Rise Execution',
      icon: Hammer,
      overview: 'As a tier-1 main contractor, Aurelia Construct Group executes monumental commercial towers, luxury residential enclaves, and public assembly spaces with seamless engineering discipline and strict schedule adherence.',
      capabilities: [
        'Supertall and Mega-High-Rise Engineering (>250m)',
        'Complex Mixed-Use Commercial Complexes',
        'Post-Tensioned and Self-Consolidating Concrete Structures',
        'Advanced Aerodynamic Unitized Double-Curved Facades',
        'Deep Substructure Excavation & Cut-and-Cover Basements'
      ],
      methodology: 'Deploying synchronized 4D BIM logistics, automated climbing formwork systems, and continuous real-time LiDAR discrepancy monitoring to eliminate structural rework.',
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure',
      tagline: 'Civil Arteries, Bridges & Multimodal Transit',
      icon: Compass,
      overview: 'Connecting nations and economic corridors through iconic cable-stayed bridges, deep fjord crossings, high-speed rail networks, and heavy marine port facilities engineered for centuries of operational service.',
      capabilities: [
        'Long-Span Cable-Stayed & Suspension Bridges',
        'Deep-Water Geotechnical & Marine Caisson Foundations',
        'Sub-Sea and Hard-Rock Mechanized Tunneling (TBM)',
        'High-Speed Rail Corridors & Grade Separations',
        'Automated Deep-Water Port Infrastructure & Breakwaters'
      ],
      methodology: 'Engineered with fiber-optic strain sensor networks, cathodic corrosion prevention systems, and hydrodynamic wave dissipation barriers.',
      image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'engineering',
      title: 'Engineering',
      tagline: 'Structural Dynamics, Geotechnics & MEP Systems',
      icon: Cpu,
      overview: 'Our in-house technical engineering practice tackles the most demanding structural, seismic, and thermal physics problems, translating bold architectural visions into rigorous mathematical reality.',
      capabilities: [
        'Non-Linear Seismic Time-History Analysis & Dampeners',
        'Computational Fluid Dynamics (CFD) & Wind Tunnel Modeling',
        'Advanced Geotechnical Finite Element Soil-Structure Interaction',
        'Mission-Critical MEP Central Utility Plants',
        'ISO Class 1 Vibration-Isolated Foundation Slabs'
      ],
      methodology: 'Utilizing non-linear computational algorithms and finite element software to optimize steel rebar tonnages while maintaining peak structural resilience.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'architecture',
      title: 'Architecture',
      tagline: 'Biophilic Integration & Mass Timber Systems',
      icon: Building2,
      overview: 'Reconciling monumental structural scale with intimate human comfort, acoustic warmth, and biophilic integration, from parametric glass roofs to mass timber glulam diagrids.',
      capabilities: [
        'Parametric Computational Geometry & Façade Optimization',
        'Mass Timber (CLT & Glulam) Hybrid Structural Systems',
        'Passive Solar Orientation & Micro-Climate Shading Louvers',
        'Acoustic Concert Hall & Public Concourse Geometry',
        'Spatial Master Planning & Urban Transit Integration'
      ],
      methodology: 'Pairing advanced computational scripts with tactile natural materials to craft sensory human experiences within large-scale public and private envelopes.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'industrial',
      title: 'Industrial',
      tagline: 'High-Tech Logistics, Hydrogen & Clean Tech Facilities',
      icon: Factory,
      overview: 'Designing and building automated gigawatt distribution hubs, clean hydrogen transshipment stations, and vibration-free semiconductor research cleanrooms.',
      capabilities: [
        'Automated High-Bay Warehouse & Robotic Racking Facilities',
        'Super-Flat FM1 Laser Screed Industrial Floor Slabs',
        'Clean Hydrogen Generation & High-Pressure Fuel Cell Terminals',
        'Hazardous Material Containment & Heavy Cleanrooms',
        'On-Site Renewable Microgrids with Multi-Megawatt Battery Storage'
      ],
      methodology: 'Laser-guided soil stabilization combined with post-tensioned seamless floor slabs engineered for 24/7 automated robotic operations.',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'management',
      title: 'Project Management',
      tagline: 'Integrated Project Delivery (IPD) & Lean 5D BIM',
      icon: Briefcase,
      overview: 'Turnkey governance over international megaprojects, aligning multi-national architect consortiums, local municipal authorities, and trade contractors under strict safety and economic milestones.',
      capabilities: [
        'Full Turnkey EPC (Engineering, Procurement, Construction)',
        'Lean Integrated Project Delivery (IPD) Contracting',
        '5D BIM Real-Time Cash Flow & Schedule Telemetry',
        'Predictive Global Supply Chain Logistics Management',
        'Comprehensive Commissioning & Digital Twin Handover'
      ],
      methodology: 'Open-book client auditing dashboards and daily last-planner field coordination empowering all site personnel with immediate stop-work authority.',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop'
    }
  ];

  return (
    <div className="flex flex-col w-full bg-[#F4F1EA] text-[#111315] pt-20 sm:pt-24">
      {/* 1. Hero Banner */}
      <section className="relative py-20 sm:py-28 bg-[#F4F1EA] border-b border-[#D9D7D0] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-[#DC2626]" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#DC2626]">
                Core Disciplines & Technical Mastery
              </span>
            </div>
            <h1 className="mt-2 text-3xl sm:text-5xl lg:text-6xl font-black font-display text-[#111315] tracking-tight leading-[1.05]">
              Engineered capability <br />
              <span className="stroke-text-dark">at global scale.</span>
            </h1>
            <p className="mt-6 text-base sm:text-xl text-[#5A5C58] font-normal leading-relaxed">
              Explore our six specialized practices—spanning monumental high-rise construction, marine infrastructure, computational engineering, and lean project management.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Interactive Discipline Deep Dive */}
      <section className="py-20 sm:py-28 bg-[#F4F1EA] border-b border-[#D9D7D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Discipline Switcher Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-12">
            {disciplines.map((disc, idx) => {
              const Icon = disc.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={disc.id}
                  onClick={() => setActiveTab(idx)}
                  className={`p-4 sm:p-5 flex flex-col items-start justify-between text-left transition-all border ${
                    isActive
                      ? 'bg-[#111315] border-[#111315] text-[#F4F1EA] shadow-xl'
                      : 'bg-white border-[#D9D7D0] text-[#5A5C58] hover:text-[#111315] hover:border-[#111315]'
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-3 ${isActive ? 'text-[#DC2626]' : 'text-[#8B8D89]'}`} />
                  <div>
                    <span className="text-[10px] font-mono text-[#DC2626] block font-bold">0{idx + 1}</span>
                    <span className="text-sm font-black font-display tracking-tight mt-0.5 block">
                      {disc.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Discipline Content Panel */}
          <div className="bg-white border border-[#D9D7D0] p-8 sm:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#DC2626] font-bold">
                    Discipline 0{activeTab + 1} // {disciplines[activeTab].tagline}
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black font-display text-[#111315] tracking-tight mt-2">
                    {disciplines[activeTab].title}
                  </h2>
                </div>

                <p className="text-base text-[#5A5C58] font-normal leading-relaxed">
                  {disciplines[activeTab].overview}
                </p>

                <div className="pt-2">
                  <h4 className="text-xs uppercase font-bold tracking-widest text-[#111315] mb-4">
                    Core Technical Capabilities
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {disciplines[activeTab].capabilities.map((cap, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-[#5A5C58] font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#D9D7D0]">
                  <p className="text-xs text-[#5A5C58] font-normal leading-relaxed">
                    <strong className="text-[#111315] font-bold">Methodology: </strong>
                    {disciplines[activeTab].methodology}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={openProjectModal}
                    className="px-6 py-3.5 bg-[#DC2626] hover:bg-[#EF4444] text-[#111315] text-xs font-bold uppercase tracking-[0.2em] transition-all inline-flex items-center gap-2 shadow-md"
                  >
                    <span>Request Technical RFP</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="h-80 sm:h-96 bg-[#111315] border border-[#D9D7D0] overflow-hidden relative">
                  <img
                    src={disciplines[activeTab].image}
                    alt={disciplines[activeTab].title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111315]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] font-mono text-[#DC2626] uppercase tracking-widest block font-bold">
                      Aurelia Technical Operations
                    </span>
                    <span className="text-sm font-bold text-[#F4F1EA]">
                      {disciplines[activeTab].tagline}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Technology & Innovation Matrix */}
      <section className="py-20 sm:py-28 bg-[#F4F1EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Digital Construction"
            title="The Aurelia Technology Matrix"
            subtitle="How we deploy artificial intelligence, autonomous site rovers, and sensor telemetry to safeguard megaproject timelines."
            align="center"
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white border border-[#D9D7D0] shadow-sm">
              <div className="w-10 h-10 bg-[#F4F1EA] border border-[#D9D7D0] flex items-center justify-center text-[#111315] mb-5">
                <Workflow className="w-5 h-5 text-[#DC2626]" />
              </div>
              <h3 className="text-lg font-black font-display text-[#111315] mb-2">
                5D BIM & Digital Twin Handover
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5C58] font-normal leading-relaxed">
                Every project is born in the digital twin cloud, marrying 3D geometry with real-time schedule sequencing (4D) and continuous cost auditing (5D).
              </p>
            </div>

            <div className="p-8 bg-white border border-[#D9D7D0] shadow-sm">
              <div className="w-10 h-10 bg-[#F4F1EA] border border-[#D9D7D0] flex items-center justify-center text-[#111315] mb-5">
                <Zap className="w-5 h-5 text-[#DC2626]" />
              </div>
              <h3 className="text-lg font-black font-display text-[#111315] mb-2">
                Autonomous Ground Robotics
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5C58] font-normal leading-relaxed">
                Quadruped rovers perform daily millimeter-accurate LiDAR scans, cross-referencing on-site rebar and sleeve placement directly against design models.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#D9D7D0] shadow-sm">
              <div className="w-10 h-10 bg-[#F4F1EA] border border-[#D9D7D0] flex items-center justify-center text-[#111315] mb-5">
                <ShieldCheck className="w-5 h-5 text-[#DC2626]" />
              </div>
              <h3 className="text-lg font-black font-display text-[#111315] mb-2">
                Structural Health Sensor Networks
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5C58] font-normal leading-relaxed">
                Embedded fiber-optic strain gages and ultrasonic sensors stream telemetry for decades post-handover, enabling predictive algorithmic maintenance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

