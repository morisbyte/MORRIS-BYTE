import React from 'react';
import { motion } from 'motion/react';
import { 
  Leaf, 
  Recycle, 
  Zap, 
  Droplet, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  TrendingDown,
  Globe2,
  Trees
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { StatCounter } from '../components/common/StatCounter';

interface SustainabilityPageProps {
  navigate: (route: string) => void;
  openProjectModal: () => void;
}

export const SustainabilityPage: React.FC<SustainabilityPageProps> = ({ navigate, openProjectModal }) => {
  const pillars = [
    {
      icon: TrendingDown,
      title: 'Embodied Carbon Decarbonization',
      description: 'Displacing conventional high-carbon Portland cement with bio-mineralized geopolymers and engineered mass-timber composites, locking atmospheric CO₂ inside our structures.'
    },
    {
      icon: Recycle,
      title: 'Circular Lifecycle & Material Passports',
      description: 'Tagging all major steel beams and precast assemblies with digital RFID material passports to guarantee 100% recyclability upon future building decommissioning.'
    },
    {
      icon: Zap,
      title: 'Net-Zero Operational Microgrids',
      description: 'Designing high-efficiency building envelopes with integrated photovoltaics (BIPV), deep-well geothermal ground loops, and AI-driven predictive HVAC automation.'
    },
    {
      icon: Droplet,
      title: 'Zero-Waste Water Stewardship',
      description: 'Implementing closed-loop greywater filtration systems that supply 100% of landscape irrigation and cooling tower make-up water on our high-density developments.'
    }
  ];

  const standards = [
    { name: 'LEED Platinum & Gold', authority: 'USGBC', badge: 'Certified Core & Shell' },
    { name: 'BREEAM Outstanding', authority: 'BRE Global', badge: 'Infrastructure & Buildings' },
    { name: 'BCA Green Mark Platinum', authority: 'Building & Construction Authority Singapore', badge: 'Super Low Energy (SLE)' },
    { name: 'DGNB German Sustainable Building', authority: 'DGNB eV', badge: 'Platinum Level' },
    { name: 'WELL Building Standard', authority: 'IWBI', badge: 'Human Health & Air Quality' },
    { name: 'Zero Carbon Building (ZCB)', authority: 'Canada Green Building Council', badge: 'Design & Performance' }
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
                Environmental, Social & Governance (ESG)
              </span>
            </div>
            <h1 className="mt-2 text-3xl sm:text-5xl lg:text-6xl font-black font-display text-[#111315] tracking-tight leading-[1.05]">
              Architectural engineering <br />
              <span className="stroke-text-dark">in harmony with planetary limits.</span>
            </h1>
            <p className="mt-6 text-base sm:text-xl text-[#5A5C58] font-normal leading-relaxed">
              Sustainability is not an afterthought at Aurelia Construct Group; it is the mathematical foundation of our structural design, material sourcing, and site logistics.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Key Metrics & Progress Bars */}
      <section className="py-20 sm:py-28 bg-[#F4F1EA] border-b border-[#D9D7D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="p-8 bg-white border border-[#D9D7D0] relative group hover:border-[#111315] transition-colors shadow-sm">
              <span className="text-4xl sm:text-5xl font-black font-display text-[#111315] block">
                42%
              </span>
              <h3 className="text-base font-black font-display text-[#111315] mt-2 mb-1">
                Reduction in Construction Waste
              </h3>
              <p className="text-xs text-[#5A5C58] font-normal leading-relaxed">
                Achieved through off-site precision modular fabrication and closed-loop concrete aggregate recycling.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#D9D7D0] relative group hover:border-[#111315] transition-colors shadow-sm">
              <span className="text-4xl sm:text-5xl font-black font-display text-[#111315] block">
                31%
              </span>
              <h3 className="text-base font-black font-display text-[#111315] mt-2 mb-1">
                Lower Operational Energy Targets
              </h3>
              <p className="text-xs text-[#5A5C58] font-normal leading-relaxed">
                Outperforming ASHRAE 90.1 baselines through aerodynamic passive shading and deep geothermal ground loops.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#D9D7D0] relative group hover:border-[#111315] transition-colors shadow-sm">
              <span className="text-4xl sm:text-5xl font-black font-display text-[#111315] block">
                65%
              </span>
              <h3 className="text-base font-black font-display text-[#111315] mt-2 mb-1">
                Responsible Material Sourcing
              </h3>
              <p className="text-xs text-[#5A5C58] font-normal leading-relaxed">
                100% of timber FSC-certified; recycled steel tonnages exceed 70% across infrastructure portfolios.
              </p>
            </div>
          </div>

          <div className="p-4 bg-white border border-[#D9D7D0] text-center text-xs text-[#5A5C58] font-mono">
            * All figures represent Aurelia Construct Group aggregate corporate ESG demonstration benchmarks across 2024–2026 audits.
          </div>
        </div>
      </section>

      {/* 3. Core ESG Pillars */}
      <section className="py-20 sm:py-28 bg-white border-b border-[#D9D7D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Framework"
            title="Strategic Pillars of Decarbonization"
            subtitle="How we tackle both embodied structural emissions and ongoing operational energy."
            align="left"
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="p-8 sm:p-10 bg-[#F4F1EA] border border-[#D9D7D0] flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-white border border-[#D9D7D0] flex items-center justify-center text-[#111315] mb-6">
                      <Icon className="w-6 h-6 text-[#DC2626]" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black font-display text-[#111315] mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-[#5A5C58] font-normal leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Green Building Certifications Grid */}
      <section className="py-20 sm:py-28 bg-[#F4F1EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Global Verification"
            title="International Green Building Standards"
            subtitle="Our engineers and project managers are certified across all premier international rating bodies."
            align="center"
            className="mb-16"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {standards.map((std, idx) => (
              <div key={idx} className="p-6 bg-white border border-[#D9D7D0] hover:border-[#111315] transition-colors shadow-sm">
                <div className="flex items-center gap-2 text-xs font-mono text-[#DC2626] mb-2 font-bold">
                  <Award className="w-4 h-4" />
                  <span>{std.authority}</span>
                </div>
                <h4 className="text-base font-black font-display text-[#111315]">
                  {std.name}
                </h4>
                <p className="text-xs text-[#5A5C58] mt-1 font-medium">
                  {std.badge}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

