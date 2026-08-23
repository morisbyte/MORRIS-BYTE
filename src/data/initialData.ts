import { Project, BlogPost, Job, ContactInquiry, JobApplication, MediaItem, SiteSettings } from '../types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-001',
    title: 'Aurelia Tower',
    slug: 'aurelia-tower-dubai',
    location: 'Downtown District, Dubai',
    country: 'United Arab Emirates',
    category: 'Commercial',
    client: 'Emaar-Aurelia Capital Holdings',
    status: 'Completed',
    completionYear: 2025,
    projectValue: '$840 Million',
    projectSize: '285,000 m²',
    description: 'A 78-story ultra-luxury commercial and mixed-use monolith featuring an aerodynamic double-curved glass facade, dynamic structural dampeners, and Platinum LEED certification.',
    challenge: 'Designing a 360-meter tower that mitigates extreme desert wind shear and thermal loads while delivering column-free cantilevered trading floors and sky gardens every 12 stories.',
    approach: 'Deployed tuned mass liquid dampers, high-performance photovoltaic fritted glass, and ultra-high-strength self-consolidating concrete with 40% fly ash displacement.',
    results: 'Delivered 3 months ahead of schedule with zero lost-time incidents over 12 million man-hours; achieved 38% reduction in HVAC energy consumption.',
    sustainabilityFeatures: [
      'LEED Platinum & WELL Core Certified',
      '4,200 m² Integrated Building Photovoltaics (BIPV)',
      '100% Greywater recycling for irrigation and cooling towers',
      'Intelligent dynamic facade louvers adjusting to sun angle'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop'
    ],
    isFeatured: true,
    published: true,
    architect: 'Aurelia Design Studio + Foster Collaborations',
    structuralEngineer: 'Aurelia Advanced Engineering Group',
    awards: ['CTBUH Global Best Tall Building 2025', 'Middle East Architecture Award - Structural Innovation'],
    createdAt: '2025-01-15T08:00:00Z',
    updatedAt: '2026-02-10T14:30:00Z'
  },
  {
    id: 'proj-002',
    title: 'Northstar Bridge',
    slug: 'northstar-bridge-oslo',
    location: 'Oslo Fjord Crossing, Oslo',
    country: 'Norway',
    category: 'Infrastructure',
    client: 'Statens vegvesen (Norwegian Public Roads Administration)',
    status: 'Completed',
    completionYear: 2024,
    projectValue: '$520 Million',
    projectSize: '2.4 km Span',
    description: 'An iconic cable-stayed suspension bridge spanning the pristine waters of the Oslo Fjord, engineered for 100-year sub-zero Nordic climate endurance with integrated high-speed rail and wildlife corridors.',
    challenge: 'Deep-water geotechnical foundations reaching 68 meters below seabed level subject to arctic currents and strict environmental marine protection mandates.',
    approach: 'Employed pre-cast floating caissons, fiber-optic strain sensor networks embedded within high-tensile steel cables, and low-carbon geopolymer concrete.',
    results: 'Connected two major coastal economic zones, cutting daily transit times by 45 minutes while minimizing ecological footprint through acoustic dampening barriers.',
    sustainabilityFeatures: [
      'Constructed with 70% recycled structural steel',
      'Off-grid kinetic energy capture from traffic vibration and wind',
      'Undersea acoustic shielding protecting arctic marine mammals',
      'BREEAM Infrastructure Outstanding rating'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop'
    ],
    isFeatured: true,
    published: true,
    architect: 'Nordic Infrastructure & Aurelia Group',
    structuralEngineer: 'Aurelia Heavy Civil & Marine Division',
    awards: ['IABSE Outstanding Structure Award', 'European Steel Bridge Excellence Award'],
    createdAt: '2024-06-20T10:00:00Z',
    updatedAt: '2025-11-12T09:15:00Z'
  },
  {
    id: 'proj-003',
    title: 'Meridian Residences',
    slug: 'meridian-residences-singapore',
    location: 'Marina Bay Waterfront, Singapore',
    country: 'Singapore',
    category: 'Residential',
    client: 'Keppel-Aurelia Urban Developments',
    status: 'Completed',
    completionYear: 2025,
    projectValue: '$390 Million',
    projectSize: '142,000 m²',
    description: 'A biophilic high-density luxury residential enclave seamlessly merging lush cascading vertical gardens, cantilevered infinity pools, and passive natural ventilation corridors.',
    challenge: 'Achieving net-zero tropical cooling in a high-humidity equatorial climate while engineering intricate 18-meter cantilevered sky decks.',
    approach: 'Utilized computational fluid dynamics (CFD) to maximize cross-breezes, engineered mass-timber interior frameworks, and integrated 12,000 m² of living vertical green walls.',
    results: 'Awarded BCA Green Mark Platinum Super Low Energy (SLE); reduced ambient indoor temperatures by 4.2°C through biophilic shading.',
    sustainabilityFeatures: [
      'BCA Green Mark Platinum Super Low Energy',
      '200% Green Plot Ratio replacement',
      'Rainwater harvesting covering 100% of residential landscape needs',
      'Smart home micro-climate energy automation in all 320 suites'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop'
    ],
    isFeatured: true,
    published: true,
    architect: 'Aurelia Sustainable Living & Tropical Architects',
    structuralEngineer: 'Aurelia Structural Solutions APAC',
    awards: ['World Architecture Festival - Residential Winner', 'Singapore BCA Green Mark Champion'],
    createdAt: '2025-03-01T11:00:00Z',
    updatedAt: '2026-01-18T16:00:00Z'
  },
  {
    id: 'proj-004',
    title: 'Atlas Industrial Hub',
    slug: 'atlas-industrial-hub-rotterdam',
    location: 'Port of Rotterdam Logistics Sector',
    country: 'Netherlands',
    category: 'Industrial',
    client: 'EuroLogistics Port Authority',
    status: 'Completed',
    completionYear: 2024,
    projectValue: '$460 Million',
    projectSize: '310,000 m²',
    description: 'Europe’s most advanced automated logistics and clean-hydrogen transshipment hub, combining high-bay automated warehouses, rail interconnects, and zero-emission microgrids.',
    challenge: 'Constructing on reclaimed delta land requiring 14,000 driven piles with zero ground settlement tolerance for automated robotic storage systems.',
    approach: 'Precision laser-guided soil stabilization, post-tensioned seamless super-flat industrial floor slabs (FM1 tolerance), and roof-mounted 22MW solar arrays.',
    results: 'Processes over 120,000 freight TEU annually with 100% self-generated renewable electricity and hydrogen refueling capabilities.',
    sustainabilityFeatures: [
      '22 MW Rooftop Solar installation producing surplus grid power',
      'On-site green hydrogen generation & fuel cell backup stations',
      '100% circular recycled aggregate foundation sub-bases',
      'ISO 50001 Energy Management Certified'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop'
    ],
    isFeatured: true,
    published: true,
    architect: 'Aurelia Industrial Engineering & Logistics Group',
    structuralEngineer: 'Aurelia Heavy Systems BV',
    awards: ['European Supply Chain Infrastructure Award 2024'],
    createdAt: '2024-04-10T09:30:00Z',
    updatedAt: '2025-08-22T10:45:00Z'
  },
  {
    id: 'proj-005',
    title: 'Horizon Civic Centre',
    slug: 'horizon-civic-centre-toronto',
    location: 'Civic Core District, Toronto',
    country: 'Canada',
    category: 'Public & Civic',
    client: 'City of Toronto Strategic Infrastructure Agency',
    status: 'Completed',
    completionYear: 2025,
    projectValue: '$310 Million',
    projectSize: '95,000 m²',
    description: 'A transformative civic and cultural assembly hall showcasing mass timber glulam diagrid domes, public concert halls, municipal offices, and a 4-season indoor public atrium.',
    challenge: 'Erecting the largest mass timber civic canopy in North America spanning 60 meters without internal support columns, adhering to strict acoustic standards.',
    approach: 'Engineered cross-laminated timber (CLT) with CNC-machined titanium connection nodes, integrated deep-well geothermal ground loops, and acoustic timber baffles.',
    results: 'Sequestered over 4,500 tonnes of atmospheric carbon in timber structure; serves 2.2 million annual visitors with zero net operational emissions.',
    sustainabilityFeatures: [
      'Net-Zero Carbon Building (CAGBC Certified)',
      '100% FSC-certified Canadian sustainably harvested timber',
      'Deep geothermal loop providing 100% of heating and cooling',
      'Zero-landfill construction waste management'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop'
    ],
    isFeatured: true,
    published: true,
    architect: 'Aurelia Civic Architecture + KPMB Collaborative',
    structuralEngineer: 'Aurelia Timber & Advanced Structural Lab',
    awards: ['Governor General’s Medal in Architecture 2025', 'Canadian Green Building Excellence Award'],
    createdAt: '2025-02-14T08:00:00Z',
    updatedAt: '2026-01-05T12:00:00Z'
  },
  {
    id: 'proj-006',
    title: 'Helios Advanced Tech Campus',
    slug: 'helios-tech-campus-munich',
    location: 'Munich Innovation Corridor',
    country: 'Germany',
    category: 'Engineering',
    client: 'Bavaria High-Tech Consortium',
    status: 'Under Construction',
    completionYear: 2027,
    projectValue: '$670 Million',
    projectSize: '210,000 m²',
    description: 'Next-generation quantum computing research facility and cleanroom laboratories designed to ISO Class 1 vibration-free isolation standards.',
    challenge: 'Mitigating nano-scale ground vibrations from adjacent high-speed rail lines while maintaining precision temperature control to ±0.05°C.',
    approach: 'Constructed isolated floating inertia slabs resting on seismic pneumatic air springs and custom triple-wall magnetic shielding chambers.',
    results: 'Currently tracking 6% under budget with first quantum lab suites scheduled for handover in Q2 2026.',
    sustainabilityFeatures: [
      'Waste heat recovery system warming 8,000 nearby municipal residences',
      'DGNB Platinum Certification target',
      '100% renewable on-site energy microgrid'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200&auto=format&fit=crop'
    ],
    isFeatured: false,
    published: true,
    architect: 'Aurelia High-Tech Laboratories',
    structuralEngineer: 'Aurelia Vibration & Structural Dynamics Group',
    awards: ['DGNB Innovation Pre-Certification 2025'],
    createdAt: '2025-05-10T11:00:00Z',
    updatedAt: '2026-02-01T15:00:00Z'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-001',
    title: 'The Future of Sustainable Construction: Beyond Net-Zero to Carbon-Negative Structures',
    slug: 'future-of-sustainable-construction-carbon-negative',
    category: 'Sustainability',
    author: {
      name: 'Dr. Elena Rostova',
      role: 'Global Head of Sustainability & Materials Science',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop'
    },
    date: 'February 18, 2026',
    readTime: '6 min read',
    excerpt: 'How Aurelia Construct Group is pioneering bio-mineralized geopolymers and engineered mass-timber composites to actively sequester atmospheric carbon in modern superstructures.',
    content: `## The Paradigm Shift in Modern Structural Materials

For decades, the global construction sector treated sustainability as a series of incremental efficiency goals: reduce operational heating losses, install higher-efficiency HVAC units, and minimize job-site water consumption. While critical, these efforts overlooked the elephant in the room: **embodied carbon**.

Embodied carbon—the emissions generated during the extraction, refining, transport, and assembly of building materials—accounts for over 11% of all global greenhouse gas emissions. At Aurelia Construct Group, our 2030 Roadmap transitions all major structural projects from mere "net-zero operational" targets to **actively carbon-sequestering assets**.

### 1. Bio-Mineralized Geopolymer Concretes
Traditional Portland cement production is responsible for approximately 8% of global CO₂ emissions due to the high-temperature calcination of limestone. By partnering with advanced material research institutes in Zurich and Singapore, Aurelia has deployed geopolymer binders synthesized from industrial fly ash, slag, and direct atmospheric CO₂ injection during curing.

The result is a structural concrete formulation that:
- Achieves 80 MPa compressive strength in 14 days
- Reduces embodied carbon by 68% compared to CEM I standards
- Demonstrates superior resistance to chloride penetration in marine infrastructure

### 2. High-Capacity Mass Timber Diagrids
On projects like the Horizon Civic Centre in Toronto, engineered Mass Timber (CLT and Glulam) replaces traditional steel decking. Every cubic meter of timber sequesters roughly 1 ton of CO₂, locking it inside the building envelope for centuries.

### 3. Circular Lifecycle Deconstruction
True sustainability demands end-of-life planning before the first foundation pile is driven. Every beam and joint on our recent commercial developments contains a digital RFID Material Passport, indexing its exact alloy composition, load history, and disassembly protocol for 100% recycling in 2080 and beyond.`,
    featuredImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop',
    tags: ['Sustainability', 'Embodied Carbon', 'Mass Timber', 'Green Concrete', 'ESG'],
    published: true,
    featured: true,
    createdAt: '2026-02-18T09:00:00Z',
    updatedAt: '2026-02-18T09:00:00Z'
  },
  {
    id: 'post-002',
    title: 'How AI and Autonomous Site Robotics Are Transforming Megaproject Delivery',
    slug: 'ai-and-autonomous-robotics-transforming-construction',
    category: 'Technology & AI',
    author: {
      name: 'Marcus Vance',
      role: 'Chief Technology Officer',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop'
    },
    date: 'February 10, 2026',
    readTime: '8 min read',
    excerpt: 'From autonomous quadruped LiDAR scanning to predictive algorithmic supply-chain routing, explore how digital intelligence delivers billion-dollar projects on time.',
    content: `## The Industrialization of the Construction Site

Megaprojects have historically suffered from the "iron triangle" paradox: budget overruns, scheduling delays, and labor bottlenecks. The integration of computer vision, generative structural AI, and autonomous ground robotics is finally closing the loop between the architect’s digital twin and on-site physical reality.

### Real-Time As-Built Discrepancy Detection
Every evening across Aurelia construction sites, autonomous ground rovers equipped with millimeter-accurate LiDAR and 360° photogrammetry map the day's structural progress against the 4D BIM model. 

Any discrepancy—such as a misplaced HVAC sleeve or a 5mm deflection in rebar placement—is automatically flagged to the structural engineering team before concrete is poured. This early detection eliminates costly rework, saving an average of 4.2% on total superstructure expenditures.

### Predictive Materials Logistics
By continuously ingesting global shipping data, weather telemetry, and supplier throughput, our proprietary Aurelia Intelligence Engine predicts material shortages up to 6 weeks in advance, rerouting procurements automatically to maintain unbroken critical paths.`,
    featuredImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1600&auto=format&fit=crop',
    tags: ['AI in Construction', 'Robotics', 'Digital Twins', 'BIM 4D', 'Innovation'],
    published: true,
    featured: false,
    createdAt: '2026-02-10T10:30:00Z',
    updatedAt: '2026-02-10T10:30:00Z'
  },
  {
    id: 'post-003',
    title: 'Building Smarter Cities: The Intersect of Infrastructure, Transit, and Quality of Life',
    slug: 'building-smarter-cities-infrastructure-transit',
    category: 'Infrastructure',
    author: {
      name: 'Soraya Al-Mansoor',
      role: 'Executive Vice President of Civil Infrastructure',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop'
    },
    date: 'January 28, 2026',
    readTime: '5 min read',
    excerpt: 'Modern urban infrastructure is no longer just about asphalt and rebar; it is an intelligent, interconnected nervous system designed for human flourishing.',
    content: `## Beyond Concrete: The Dynamic Urban Matrix

Rapid urbanization in the 21st century requires infrastructure that is adaptive, climate-resilient, and centered around human well-being. Whether bridging fjords in Scandinavia or engineering rapid-transit hubs in Southeast Asia, our approach integrates civil engineering with high-bandwidth IoT and renewable microgrids.

Key pillars of smart urban infrastructure include:
1. **Multimodal Transit Integration**: Connecting high-speed rail, autonomous electric shuttle networks, and active pedestrian greenways into unified mobility hubs.
2. **Climate-Resilient Drainage & Sponge City Concepts**: Transforming roadways and plaza substructures into subterranean flood retention basins capable of absorbing 100-year storm surges.
3. **Decentralized Energy Buffering**: Utilizing bridge foundations and retaining walls as thermal geothermal exchangers to heat and cool adjacent urban quarters without additional grid strain.`,
    featuredImage: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?q=80&w=1600&auto=format&fit=crop',
    tags: ['Smart Cities', 'Urban Planning', 'Infrastructure', 'Transit', 'Mobility'],
    published: true,
    featured: false,
    createdAt: '2026-01-28T14:00:00Z',
    updatedAt: '2026-01-28T14:00:00Z'
  },
  {
    id: 'post-004',
    title: 'The Role of Digital Twins in Infrastructure Asset Longevity',
    slug: 'digital-twins-infrastructure-asset-longevity',
    category: 'Technology & AI',
    author: {
      name: 'Henrik Lindqvist',
      role: 'Director of Computational Engineering',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop'
    },
    date: 'January 15, 2026',
    readTime: '7 min read',
    excerpt: 'How continuous sensor telemetry and cloud-based structural simulations extend the operational lifespan of bridges and skyscrapers by decades.',
    content: `## Transforming Static Structures into Living Systems

When the Northstar Bridge opened in Norway, it wasn't just opened to vehicular traffic; it came alive in the digital cloud. Over 3,800 embedded fiber-optic sensors stream continuous strain, wind harmonic, temperature, and salt-mist corrosion data into a live digital twin replica.

### Preventive Maintenance vs. Reactive Repair
Traditional civil infrastructure relies on periodic manual inspections—often identifying issues only after micro-cracking or spalling becomes visible. Digital twins invert this:
- **Predictive Fatigue Modeling**: Real-time stress calculations predict exact maintenance intervals for cable anchorages 3 years in advance.
- **Dynamic Speed Optimization**: During severe winter gales, bridge traffic speeds are algorithmically modulated to prevent aerodynamic resonance harmonics.
- **LCC (Life Cycle Cost) Reductions**: Over a 50-year operational span, digital twin maintenance reduces capital refurbishment costs by up to 34%.`,
    featuredImage: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=1600&auto=format&fit=crop',
    tags: ['Digital Twins', 'Structural Health Monitoring', 'IoT', 'Asset Management'],
    published: true,
    featured: false,
    createdAt: '2026-01-15T11:20:00Z',
    updatedAt: '2026-01-15T11:20:00Z'
  },
  {
    id: 'post-005',
    title: 'Modern Approaches to Project Management in High-Risk Structural Environments',
    slug: 'modern-project-management-high-risk-structural-environments',
    category: 'Project Management',
    author: {
      name: 'Claire Kensington',
      role: 'Chief Operating Officer',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop'
    },
    date: 'December 20, 2025',
    readTime: '6 min read',
    excerpt: 'Strategic governance, critical chain method, and collaborative lean construction frameworks for managing $500M+ international builds.',
    content: `## The Art of Precision Execution

In megaproject construction, technical engineering accounts for only half the battle. The other half is human orchestration across multidisciplinary teams of architects, general contractors, municipal authorities, and international supply chains.

### The Lean IPD (Integrated Project Delivery) Framework
At Aurelia, we eliminate adversarial contracting models through early stakeholder alignment and shared risk/reward models:
- **Daily Last-Planner Standups**: Subcontractors coordinate physical trade handoffs via synchronized 4D tablets.
- **Zero-Tolerance Safety Protocol**: Empowering every tradesperson with immediate stop-work authority has helped Aurelia achieve a Lost Time Injury Frequency Rate (LTIFR) 82% below global industry benchmarks.
- **Transparent Open-Book Auditing**: Real-time cloud dashboards provide clients with second-by-second expenditure and milestone tracking.`,
    featuredImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop',
    tags: ['Project Management', 'Lean Construction', 'Safety', 'Leadership', 'Execution'],
    published: true,
    featured: false,
    createdAt: '2025-12-20T08:45:00Z',
    updatedAt: '2025-12-20T08:45:00Z'
  },
  {
    id: 'post-006',
    title: 'Architectural Integration: Balancing Structural Heroism with Human Warmth',
    slug: 'architectural-integration-structural-heroism-human-warmth',
    category: 'Architecture',
    author: {
      name: 'Julian Thorne',
      role: 'Principal Architectural Lead',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop'
    },
    date: 'December 05, 2025',
    readTime: '5 min read',
    excerpt: 'Why the next generation of monumental skyscrapers and public spaces must prioritize tactile human experiences over sterile monumentalism.',
    content: `## Bringing the Monument Down to the Human Scale

Great architecture commands the skyline from five miles away, but it touches the human spirit at arm's length. The true hallmark of Aurelia's philosophy is reconciling monumental structural scale with intimate, sensory human comfort.

From acoustic timber ceiling treatments to naturally lit subterranean transit concourses, our design-build methodology treats every square meter as an environment crafted for human connection, focus, and wonder.`,
    featuredImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
    tags: ['Architecture', 'Design Philosophy', 'Human Scale', 'Materials'],
    published: true,
    featured: false,
    createdAt: '2025-12-05T13:10:00Z',
    updatedAt: '2025-12-05T13:10:00Z'
  }
];

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-001',
    title: 'Senior Structural Project Director',
    department: 'Structural Engineering',
    location: 'London / International Projects',
    country: 'United Kingdom',
    type: 'Full-time',
    experienceLevel: 'Director',
    salaryRange: '£140,000 - £180,000 + Performance Bonus',
    description: 'Lead engineering teams on landmark high-rise and complex cable-stayed infrastructure projects across Europe and the Middle East.',
    responsibilities: [
      'Direct structural engineering design and on-site technical compliance for projects exceeding £250M value',
      'Manage client relationships with sovereign wealth funds, corporate developers, and municipal transport authorities',
      'Oversee finite element analysis (FEA), wind tunnel testing, and seismic dampening strategy',
      'Mentor and scale a multidisciplinary team of 35+ structural engineers and BIM leads'
    ],
    requirements: [
      'Chartered Engineer (CEng / MIStructE / PE) with 12+ years experience in major commercial/infrastructure engineering',
      'Proven track record delivering at least two supertall (>250m) or major span bridge projects',
      'Expertise in computational structural engineering software (ETABS, SAP2000, Grasshopper, Revit)',
      'Willingness to travel to international project sites periodically'
    ],
    benefits: [
      'Executive international relocation and housing allowance if applicable',
      'Comprehensive private health, dental, and executive wellness coverage',
      'Annual equity performance bonus & pension scheme',
      'Access to Aurelia Advanced Engineering Innovation Labs research budget'
    ],
    status: 'Open',
    createdAt: '2026-01-10T09:00:00Z'
  },
  {
    id: 'job-002',
    title: 'Lead BIM & Computational Design Manager',
    department: 'Digital Construction (BIM)',
    location: 'Dubai Innovation Hub',
    country: 'United Arab Emirates',
    type: 'Full-time',
    experienceLevel: 'Mid-Senior Level',
    salaryRange: 'AED 38,000 - 48,000 / month (Tax-Free)',
    description: 'Spearhead 4D/5D Building Information Modeling (BIM), algorithmic geometry, and digital twin workflows across Middle East megaprojects.',
    responsibilities: [
      'Develop and enforce company-wide BIM Execution Plans (BEP) in compliance with ISO 19650',
      'Implement real-time clash detection, 4D schedule simulation, and robotic site verification models',
      'Build custom algorithmic scripts in Dynamo/Grasshopper for parametric facade optimization',
      'Coordinate digital data interchange between architectural, MEP, and structural engineering packages'
    ],
    requirements: [
      'Bachelor’s or Master’s in Architecture, Architectural Engineering, or Computer Science in Construction',
      '6+ years of specialized BIM management on tier-1 contractor or consulting projects',
      'Expertise in Autodesk Construction Cloud, Navisworks, Revit, Rhino/Grasshopper, and Python',
      'Strong communication skills with international consultant consortiums'
    ],
    benefits: [
      'Tax-free salary package with annual flight allowances',
      'Premium health coverage for employee and family',
      'Continuous professional education sponsorship for digital engineering certifications'
    ],
    status: 'Open',
    createdAt: '2026-01-15T10:00:00Z'
  },
  {
    id: 'job-003',
    title: 'Principal Sustainability & Decarbonization Specialist',
    department: 'Sustainability & ESG',
    location: 'Oslo / Singapore / Remote Hybrid',
    country: 'Norway',
    type: 'Full-time',
    experienceLevel: 'Principal / Partner',
    salaryRange: '€110,000 - €135,000',
    description: 'Drive embodied carbon calculations, circular economy materials sourcing, and LEED Platinum / BREEAM Outstanding certifications on global builds.',
    responsibilities: [
      'Perform whole-building life cycle assessments (LCA) and embodied carbon audits from schematic phase to handover',
      'Advise design teams on bio-based materials, low-carbon geopolymer cements, and mass timber integration',
      'Lead ESG reporting, climate risk resilience modeling, and EU Taxonomy compliance',
      'Represent Aurelia Construct Group at international sustainability and green building symposiums'
    ],
    requirements: [
      'LEED AP BD+C, BREEAM Assessor, and/or WELL AP accredited',
      '7+ years experience conducting LCAs (using One Click LCA, GaBi, or Athena)',
      'Deep knowledge of passive solar design, CFD micro-climate analysis, and thermal modeling'
    ],
    benefits: [
      'Flexible international hybrid working schedule',
      'Subsidized public transit and electric vehicle charging program',
      'Generous parental leave and educational sabbatical allowances'
    ],
    status: 'Open',
    createdAt: '2026-01-20T08:30:00Z'
  },
  {
    id: 'job-004',
    title: 'Senior MEP Infrastructure Project Manager',
    department: 'Project Management',
    location: 'Toronto / New York',
    country: 'Canada',
    type: 'Full-time',
    experienceLevel: 'Mid-Senior Level',
    salaryRange: '$135,000 - $165,000 CAD',
    description: 'Manage mechanical, electrical, plumbing, and geothermal building systems on complex healthcare, civic, and high-density developments.',
    responsibilities: [
      'Oversee MEP trade contractor procurement, submittals, testing, and commissioning',
      'Coordinate deep-well geothermal systems, high-efficiency central plants, and smart building BMS integration',
      'Ensure rigorous adherence to North American building codes, ASHRAE 90.1, and NFPA standards',
      'Maintain strict schedule controls and budget variance tracking'
    ],
    requirements: [
      'P.Eng or PE license in Mechanical or Electrical Engineering',
      '8+ years of field project management experience on projects >$100M',
      'Proven background in complex central utility plants and mission-critical power systems'
    ],
    benefits: [
      '401(k) / RRSP matching up to 6%',
      'Full health, vision, and disability insurance',
      'Company vehicle / travel stipend and wellness allowance'
    ],
    status: 'Open',
    createdAt: '2026-02-01T11:00:00Z'
  },
  {
    id: 'job-005',
    title: 'Site Operations & Health/Safety Director',
    department: 'Site Operations',
    location: 'Rotterdam / Munich',
    country: 'Netherlands',
    type: 'Full-time',
    experienceLevel: 'Director',
    salaryRange: '€120,000 - €150,000',
    description: 'Ensure world-class safety culture, zero-incident mandates, and logistical excellence on European industrial and civil sites.',
    responsibilities: [
      'Direct HSE (Health, Safety & Environment) strategies for international workforces exceeding 1,500 on-site personnel',
      'Conduct rigorous hazard identification, risk assessments (HIRA), and emergency response protocols',
      'Coordinate heavy equipment logistics, tower crane installations, and deep excavation safety',
      'Liaise with national labor safety inspectorates and client safety auditors'
    ],
    requirements: [
      'NEBOSH Diploma or equivalent international safety credential',
      '10+ years in heavy civil, industrial, or high-rise construction site management',
      'Fluency in English; proficiency in German or Dutch advantageous'
    ],
    benefits: [
      'Company vehicle and premium international site allowances',
      'Comprehensive insurance package and performance profit-share'
    ],
    status: 'Open',
    createdAt: '2026-02-05T09:15:00Z'
  }
];

export const INITIAL_INQUIRIES: ContactInquiry[] = [
  {
    id: 'inq-101',
    fullName: 'David Sterling',
    company: 'Sterling Capital Real Estate Development',
    email: 'd.sterling@sterlingcapital.ae',
    phone: '+971 4 883 9200',
    country: 'United Arab Emirates',
    projectType: 'Commercial Complex',
    estimatedBudget: '$250M - $500M',
    expectedTimeline: 'Q1 2027 - Q4 2029',
    projectDescription: 'We are seeking an EPC main contractor for a 52-story mixed-use commercial tower in Dubai Maritime City, targeting LEED Gold with integrated marina facilities.',
    status: 'In Discussion',
    assignedTo: 'Marcus Vance',
    internalNotes: 'Initial NDA executed. Technical scoping meeting scheduled for next Tuesday with structural team.',
    createdAt: '2026-02-14T14:22:00Z'
  },
  {
    id: 'inq-102',
    fullName: 'Astrid Lindholm',
    company: 'Nordic Trans-Fjord Infrastructure Authority',
    email: 'astrid.lindholm@fjordinfra.no',
    phone: '+47 22 99 40 10',
    country: 'Norway',
    projectType: 'Infrastructure & Transport',
    estimatedBudget: '$500M+',
    expectedTimeline: '2027 - 2031',
    projectDescription: 'Pre-qualification tender inquiry for a 3.1km suspension bridge and dual-bore rock tunnel connection in Western Norway with extreme wind shear criteria.',
    status: 'Pending',
    assignedTo: 'Soraya Al-Mansoor',
    internalNotes: 'Awaiting formal RFP release from Ministry of Transport.',
    createdAt: '2026-02-18T10:15:00Z'
  },
  {
    id: 'inq-103',
    fullName: 'Cheong Wei Ming',
    company: 'Marina Waterfront Assets Pte Ltd',
    email: 'wm.cheong@marinawaterfront.sg',
    phone: '+65 6789 1234',
    country: 'Singapore',
    projectType: 'Residential High-Rise',
    estimatedBudget: '$100M - $250M',
    expectedTimeline: 'Q3 2026 - Q2 2029',
    projectDescription: 'Luxury biophilic condominium project comprising three 35-story residential towers with integrated sky bridges and BCA Super Low Energy specifications.',
    status: 'Unread',
    createdAt: '2026-02-21T08:45:00Z'
  },
  {
    id: 'inq-104',
    fullName: 'Klaus Brandstetter',
    company: 'Bavaria Clean Energy Logistics GmbH',
    email: 'k.brandstetter@bavaria-energy.de',
    phone: '+49 89 244 5500',
    country: 'Germany',
    projectType: 'Industrial Facility',
    estimatedBudget: '$100M - $250M',
    expectedTimeline: '2026 - 2028',
    projectDescription: 'Turnkey industrial development for clean hydrogen storage, automated high-bay warehouse, and rail siding connection in Ingolstadt.',
    status: 'Resolved',
    assignedTo: 'Claire Kensington',
    internalNotes: 'Contract awarded and engineering kickoff meeting completed.',
    createdAt: '2026-01-20T16:30:00Z'
  }
];

export const INITIAL_APPLICATIONS: JobApplication[] = [
  {
    id: 'app-501',
    jobId: 'job-001',
    jobTitle: 'Senior Structural Project Director',
    candidateName: 'Jonathan Hayes, CEng',
    email: 'j.hayes.structural@gmail.com',
    phone: '+44 7700 900123',
    location: 'London, UK',
    linkedin: 'https://linkedin.com/in/jonathan-hayes-structural-demo',
    experienceYears: '14 Years',
    coverLetter: 'I have spent the past decade directing superstructure engineering for 200m+ towers across London and Doha. Aurelia’s commitment to sustainable mass-timber hybrid systems aligns perfectly with my engineering ethos.',
    resumeFileName: 'Jonathan_Hayes_CV_2026.pdf',
    status: 'Interview Scheduled',
    notes: 'Exceptional structural FEA portfolio. Second-round technical panel interview with COO set for Thursday.',
    createdAt: '2026-02-12T11:20:00Z'
  },
  {
    id: 'app-502',
    jobId: 'job-002',
    jobTitle: 'Lead BIM & Computational Design Manager',
    candidateName: 'Fatima Al-Zahra',
    email: 'f.alzahra.bim@outlook.com',
    phone: '+971 50 123 4567',
    location: 'Dubai, UAE',
    linkedin: 'https://linkedin.com/in/fatima-alzahra-bim-demo',
    portfolioUrl: 'https://alzahra-computational-design.demo',
    experienceYears: '8 Years',
    coverLetter: 'Leading ISO 19650 implementation on major aviation and commercial projects in the Gulf has been the focus of my career. I am eager to scale Aurelia’s digital twin capabilities.',
    resumeFileName: 'Fatima_AlZahra_Resume.pdf',
    status: 'Under Review',
    createdAt: '2026-02-16T15:40:00Z'
  },
  {
    id: 'app-503',
    jobId: 'job-003',
    jobTitle: 'Principal Sustainability & Decarbonization Specialist',
    candidateName: 'Lukas Meyer',
    email: 'lukas.meyer.sustain@eco-eng.de',
    phone: '+49 171 9988776',
    location: 'Berlin / Oslo',
    linkedin: 'https://linkedin.com/in/lukas-meyer-sustainability-demo',
    experienceYears: '9 Years',
    coverLetter: 'Having led whole-building life cycle assessments for DGNB Platinum certified campuses in Central Europe, I would welcome the opportunity to pioneer carbon-negative construction with Aurelia.',
    resumeFileName: 'Lukas_Meyer_LCA_Resume.pdf',
    status: 'New',
    createdAt: '2026-02-20T17:10:00Z'
  }
];

export const INITIAL_MEDIA: MediaItem[] = [
  {
    id: 'med-001',
    name: 'Aurelia Tower Facade View.jpg',
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?q=80&w=1600&auto=format&fit=crop',
    category: 'Projects',
    size: '3.4 MB',
    dimensions: '3840 x 2160',
    type: 'image/jpeg',
    createdAt: '2025-01-15T08:00:00Z'
  },
  {
    id: 'med-002',
    name: 'Northstar Bridge Fjord Span.jpg',
    url: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=1600&auto=format&fit=crop',
    category: 'Projects',
    size: '4.1 MB',
    dimensions: '4000 x 2667',
    type: 'image/jpeg',
    createdAt: '2024-06-20T10:00:00Z'
  },
  {
    id: 'med-003',
    name: 'Meridian Residences Waterfall Deck.jpg',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
    category: 'Architecture',
    size: '2.8 MB',
    dimensions: '3200 x 2133',
    type: 'image/jpeg',
    createdAt: '2025-03-01T11:00:00Z'
  },
  {
    id: 'med-004',
    name: 'Atlas Industrial Logistics Hub.jpg',
    url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1600&auto=format&fit=crop',
    category: 'Site',
    size: '3.9 MB',
    dimensions: '3600 x 2400',
    type: 'image/jpeg',
    createdAt: '2024-04-10T09:30:00Z'
  },
  {
    id: 'med-005',
    name: 'Engineers Reviewing Blueprints on Site.jpg',
    url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop',
    category: 'Team',
    size: '2.6 MB',
    dimensions: '3000 x 2000',
    type: 'image/jpeg',
    createdAt: '2025-10-12T14:00:00Z'
  },
  {
    id: 'med-006',
    name: 'High-Rise Construction Crane Sunset.jpg',
    url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop',
    category: 'Site',
    size: '3.1 MB',
    dimensions: '3840 x 2560',
    type: 'image/jpeg',
    createdAt: '2025-11-05T16:20:00Z'
  }
];

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  companyName: 'Aurelia Construct Group',
  tagline: 'BUILDING WHAT DEFINES TOMORROW.',
  subheadline: 'International construction, engineering and infrastructure delivered with precision.',
  stats: {
    yearsExperience: '25+',
    countriesServed: '18',
    projectsDelivered: '240+',
    areaDelivered: '4.8M+ m²',
    activeWorkforce: '12,400+',
    safetyScore: '99.8%'
  },
  offices: [
    {
      city: 'Kharian',
      role: 'Global Headquarters & Executive Directorate',
      address: 'Main GT Road, Cantt Commercial Complex, Kharian, Punjab 50090, Pakistan',
      phone: '+92 307 6868004 (03076868004)',
      email: 'morrisbyte0786@gmail.com',
      hours: 'Mon – Fri: 08:30 – 18:00 PKT',
      coordinates: { lat: 32.8139, lng: 73.8647 },
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?q=80&w=800&auto=format&fit=crop'
    },
    {
      city: 'London',
      role: 'European Regional Directorate',
      address: '100 Bishopsgate, Level 38, London EC2N 4AG, United Kingdom',
      phone: '+44 20 7946 0920',
      email: 'london@aureliaconstruct.com',
      hours: 'Mon – Fri: 08:30 – 18:00 GMT',
      coordinates: { lat: 51.5155, lng: -0.0818 },
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop'
    },
    {
      city: 'Dubai',
      role: 'Middle East & Central Asia Hub',
      address: 'DIFC Gate Tower 4, Suite 1400, Dubai, United Arab Emirates',
      phone: '+971 4 362 8800',
      email: 'dubai@aureliaconstruct.com',
      hours: 'Mon – Fri: 08:00 – 17:30 GST',
      coordinates: { lat: 25.2048, lng: 55.2708 },
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop'
    },
    {
      city: 'Singapore',
      role: 'Asia-Pacific Regional Centre',
      address: 'Marina Bay Financial Centre, Tower 2, Singapore 018983',
      phone: '+65 6812 4000',
      email: 'singapore@aureliaconstruct.com',
      hours: 'Mon – Fri: 09:00 – 18:00 SGT',
      coordinates: { lat: 1.2801, lng: 103.854 },
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=800&auto=format&fit=crop'
    }
  ],
  contactEmail: 'morrisbyte0786@gmail.com',
  contactPhone: '+92 307 6868004',
  socials: {
    linkedin: 'https://linkedin.com/company/aurelia-construct-group-demo',
    instagram: 'https://instagram.com/aureliaconstruct.demo',
    twitter: 'https://twitter.com/aureliaconstruct',
    youtube: 'https://youtube.com/@aureliaconstruct'
  }
};
