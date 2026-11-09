import {
  HardHat,
  Layers3,
  ShieldCheck,
  Timer,
  Blocks,
  Building2,
  DraftingCompass,
  Sun,
  Umbrella,
  Warehouse,
  Car,
  Paintbrush,
  ScanLine,
  ClipboardCheck,
  CheckCircle2,
  Wrench,
  Cpu,
  Flame,
  Award,
  Compass,
  Ruler
} from 'lucide-react';

export const servicesData = [
  {
    id: '01',
    slug: 'general-construction',
    path: '/services/general-construction',
    title: 'General Construction',
    shortTitle: 'General Construction',
    descriptor: 'End-to-end project execution',
    tagline: 'Disciplined commercial and civil contracting engineered for seamless delivery from groundwork to statutory handover.',
    seoTitle: 'General Construction Company in Dubai, UAE | AJJAYER',
    metaDescription: 'AJJAYER provides comprehensive general construction contracting across Dubai and the UAE, delivering commercial, industrial, and civil infrastructure with precision execution.',
    h1: 'General Construction Services in Dubai & UAE',
    image: '/services/1.png',
    imageAlt: 'General construction reinforced concrete framework and tower crane operations in Dubai UAE',
    imageWidth: 1920,
    imageHeight: 1080,
    technicalRef: 'SECTION GC-01 / REINFORCED CORE',
    drawingType: 'building',

    overview: [
      'AJJAYER operates as a premier main contractor in Dubai and the United Arab Emirates, executing comprehensive civil, commercial, and industrial construction projects. We manage complex structural scopes with direct technical leadership, combining rigorous on-site management with transparent scheduling and cost controls.',
      'From sub-structure piling coordination and high-grade reinforced concrete frames to advanced building envelopes and building services integration, our construction practice adheres strictly to Dubai Municipality (DM), Dubai Civil Defense (DCD), and international FIDIC standards. Every project benefits from our unified project management framework, ensuring tight program adherence and zero tolerance for structural defects.'
    ],

    capabilities: [
      {
        icon: HardHat,
        title: 'Turnkey Civil Contracting',
        description: 'End-to-end site preparation, deep excavation, raft foundations, and high-strength reinforced concrete frame construction.'
      },
      {
        icon: Building2,
        title: 'Commercial Superstructures',
        description: 'Multi-storey commercial developments, institutional campuses, and mixed-use structures built to tight tolerance specifications.'
      },
      {
        icon: Layers3,
        title: 'Building Envelope & Cladding',
        description: 'Coordination of unitized curtain walling, insulated architectural sandwich panels, and weather-resistant facade systems.'
      },
      {
        icon: ShieldCheck,
        title: 'MEP Integration Management',
        description: 'Seamless coordination of mechanical, electrical, and plumbing engineering interfaces to prevent clashes and costly rework.'
      },
      {
        icon: Timer,
        title: 'Fast-Track Program Execution',
        description: 'Critical-path scheduling using advanced project controls to achieve milestone handovers ahead of statutory deadlines.'
      },
      {
        icon: Award,
        title: 'Statutory Permitting & Handover',
        description: 'Expedited Building Completion Certificates (BCC) with Dubai Municipality, DEWA, and Dubai Civil Defense.'
      }
    ],

    deliverySteps: [
      {
        num: '01',
        title: 'Constructability & Statutory Review',
        description: 'Detailed analysis of architectural, civil, and geotechnical drawings to secure DM/DCD authority permits and eliminate site clashes.'
      },
      {
        num: '02',
        title: 'Groundwork & Substructure',
        description: 'Precision excavation, shoring, waterproofing, and structural raft foundation pouring under continuous concrete testing.'
      },
      {
        num: '03',
        title: 'Superstructure Realization',
        description: 'Erection of reinforced concrete columns, post-tensioned slabs, shear walls, and core structures with certified batch testing.'
      },
      {
        num: '04',
        title: 'Envelope & MEP Coordination',
        description: 'Simultaneous envelope enclosure and high-efficiency MEP rough-ins, ensuring watertight spaces for interior trades.'
      },
      {
        num: '05',
        title: 'Commissioning & Authority Handover',
        description: 'Rigorous third-party inspections, authority approvals, DEWA energization, and delivery of final Building Completion Certificates.'
      }
    ],

    projectTypes: [
      {
        name: 'Commercial Corporate Headquarters',
        scope: 'Multi-level corporate offices with high-span lobbies and integrated energy-efficient building envelopes.'
      },
      {
        name: 'Industrial Logistics Campuses',
        scope: 'Heavy-duty industrial platforms combining heavy foundation floors with integrated administrative facilities.'
      },
      {
        name: 'Mixed-Use Residential Developments',
        scope: 'Premium residential buildings engineered for long-term thermal efficiency in UAE climatic conditions.'
      },
      {
        name: 'Institutional & Healthcare Hubs',
        scope: 'Specialized healthcare and educational infrastructure built with strict acoustic and hygienic requirements.'
      }
    ],

    whyChoose: [
      {
        title: 'Self-Performing Capabilities',
        description: 'Direct in-house engineering and structural teams minimize subcontractor dependencies and guarantee program milestones.'
      },
      {
        title: 'UAE Regulatory Mastery',
        description: 'Deep familiarity with Dubai Municipality, Trakhees, and JAFZA regulations speeds up authority approvals and handovers.'
      },
      {
        title: 'Uncompromising HSE Standards',
        description: 'Zero-harm safety policy across all site operations with full compliance with federal UAE labor and environmental laws.'
      },
      {
        title: 'Transparent Project Controls',
        description: 'Real-time BIM reporting, earned-value progress metrics, and clear cost management on every contracted package.'
      }
    ],

    qualitySafety: {
      standards: ['Dubai Municipality Building Code', 'ISO 9001:2015 Quality Management', 'ISO 45001:2018 Occupational Health & Safety', 'FIDIC Red & Yellow Book Compliance'],
      description: 'AJJAYER maintains dedicated on-site QA/QC inspectors conducting daily slump tests, concrete core crushing analyses, rebar tension testing, and waterproofing integrity inspections before each stage is signed off.'
    },

    faqs: [
      {
        q: 'What types of construction contracts does AJJAYER undertake?',
        a: 'We operate under Lump-Sum Turnkey (EPC), Design & Build, FIDIC Red Book remeasurement contracts, and Construction Management models depending on client procurement preferences and project scale.'
      },
      {
        q: 'How does AJJAYER expedite statutory approvals in Dubai and the UAE?',
        a: 'Our in-house licensing and architectural compliance liaisons work directly with Dubai Municipality, Civil Defense, DEWA, and free-zone authorities (Trakhees, DDA, DSO) to secure approvals without bureaucratic delays.'
      },
      {
        q: 'Can AJJAYER manage both structural works and interior fit-out?',
        a: 'Yes. As a full-scope general contractor, we self-perform civil and structural steel works while coordinating turnkey fit-out and finishing, providing clients with a single point of commercial responsibility.'
      },
      {
        q: 'What is AJJAYER\'s approach to quality assurance during concrete pouring?',
        a: 'We mandate third-party certified batching plants, continuous temperature monitoring, on-site cube testing at 7 and 28 days, and ultrasonic pulse velocity tests on critical structural columns.'
      }
    ],

    relatedServices: [
      {
        slug: 'steel-structures-fabrication',
        title: 'Steel Structures & Fabrication',
        anchor: 'Explore our structural steel fabrication and erection solutions →'
      },
      {
        slug: 'warehouses-pre-engineered-buildings',
        title: 'Warehouses & Pre-Engineered Buildings',
        anchor: 'Discover our turnkey PEB and industrial logistics facilities →'
      },
      {
        slug: 'fit-out-finishing',
        title: 'Fit-Out & Finishing',
        anchor: 'Learn more about our architectural interior finishing services →'
      }
    ]
  },

  {
    id: '02',
    slug: 'steel-structures-fabrication',
    path: '/services/steel-structures-fabrication',
    title: 'Steel Structures & Fabrication',
    shortTitle: 'Steel Structures',
    descriptor: 'Engineering • Fabrication • Installation',
    tagline: 'Precision structural steel framing, bespoke metal fabrication, and certified heavy welding engineered for extreme load capacities.',
    seoTitle: 'Steel Structure & Fabrication Company Dubai | AJJAYER',
    metaDescription: 'AJJAYER provides structural steel fabrication, engineering and installation solutions across Dubai and the UAE, delivering precision, quality and reliable project execution.',
    h1: 'Steel Structures & Fabrication in Dubai',
    image: '/services/3.png',
    imageAlt: 'Certified structural steel welder fabricating heavy industrial frame in Dubai workshop',
    imageWidth: 1920,
    imageHeight: 1080,
    technicalRef: 'FRAME CONNECTION S-02 / STRUCTURAL STEEL',
    drawingType: 'structure',

    overview: [
      'AJJAYER is a leading structural steel fabrication and engineering contractor headquartered in Dubai, delivering heavy industrial steel framing, complex architectural trusses, bespoke metalwork, and certified on-site erection throughout the UAE.',
      'Utilizing high-grade steel profiles (S275, S355, ASTM A36, A572) and state-of-the-art CNC cutting, drilling, and robotic plasma profiling, our specialized fabrication facility ensures millimeter-level accuracy. Every joint, weld, and connection is engineered to withstand extreme thermal expansion, high wind loads, and seismic forces common to Arabian Gulf architectural demands.'
    ],

    capabilities: [
      {
        icon: Building2,
        title: 'Heavy Structural Steel Framing',
        description: 'Multi-storey structural steel frameworks, industrial pipe racks, crane runway girders, and clear-span stadium trusses.'
      },
      {
        icon: Blocks,
        title: 'Precision Shop Fabrication',
        description: 'In-house CNC sawing, automatic plate shearing, automated beveling, and beam assembly in our UAE fabrication facility.'
      },
      {
        icon: Flame,
        title: 'Certified Welding (AWS / EN ISO)',
        description: 'Welders certified to AWS D1.1, EN ISO 9606, and ASME standards with 100% NDT inspection protocols.'
      },
      {
        icon: DraftingCompass,
        title: '3D Tekla BIM Detailing',
        description: 'Comprehensive connection design, clash detection, and shop fabrication drawing generation via Tekla Structures.'
      },
      {
        icon: ShieldCheck,
        title: 'Corrosion Protection & Fireproofing',
        description: 'Hot-dip galvanizing to BS EN ISO 1461, multi-coat epoxy systems, and intumescent passive fireproofing coatings.'
      },
      {
        icon: Timer,
        title: 'Safe Crane Erection & Rigging',
        description: 'Licensed heavy crane rigging plans, qualified riggers, and rapid on-site assembly to reduce field schedule.'
      }
    ],

    deliverySteps: [
      {
        num: '01',
        title: '3D BIM Detailing & Connection Engineering',
        description: 'Translating architectural concepts into fully calculated Tekla connection models verified by UAE certified structural engineers.'
      },
      {
        num: '02',
        title: 'Material Sourcing & Mill Certification',
        description: 'Procuring certified steel with complete mill test certificates (MTC 3.1) guaranteeing chemical and tensile compliance.'
      },
      {
        num: '03',
        title: 'CNC Cutting, Fit-Up & Certified Welding',
        description: 'High-precision automated cutting, assembly fit-up, and submerged arc or flux-cored welding under continuous QC supervision.'
      },
      {
        num: '04',
        title: 'Blasting & Protective Coating',
        description: 'SA 2.5 abrasive grit blasting followed by hot-dip galvanizing, industrial marine epoxy primers, or intumescent fireproofing.'
      },
      {
        num: '05',
        title: 'Engineered Rigging & On-Site Erection',
        description: 'Transport to site with police escorts where required, followed by synchronized mobile crane erection and torque bolt inspections.'
      }
    ],

    projectTypes: [
      {
        name: 'Industrial Processing Facilities',
        scope: 'Heavy steel process towers, pipe bridges, and conveyor support structures engineered for harsh industrial duty.'
      },
      {
        name: 'Architectural Canopies & Trusses',
        scope: 'Curvilinear structural steel trusses and feature architectural elements for landmark public infrastructure.'
      },
      {
        name: 'Mezzanines & Plant Platforms',
        scope: 'Heavy-capacity mezzanine floors and industrial equipment platforms for logistics hubs and manufacturing plants.'
      },
      {
        name: 'Aircraft Hangars & Large Spans',
        scope: 'Super-span steel trusses providing uninhibited floor openings exceeding 60 meters without intermediate columns.'
      }
    ],

    whyChoose: [
      {
        title: 'Millimeter Tolerance Control',
        description: 'Advanced CNC fabrication and trial assemblies ensure effortless, clash-free bolting on the construction site.'
      },
      {
        title: 'Rigorous NDT Testing',
        description: 'Ultrasonic (UT), Magnetic Particle (MPI), and Radiographic (RT) testing on all critical moment connections.'
      },
      {
        title: 'Experienced Erection Crews',
        description: 'Certified rigging superintendents and mobile crane teams ensure the highest standards of safety during heavy lifts.'
      },
      {
        title: 'Integrated Supply Chain',
        description: 'Direct relationships with primary steel mills ensure competitive pricing and resilient material lead times.'
      }
    ],

    qualitySafety: {
      standards: ['AISC 360 Specification for Structural Steel', 'AWS D1.1 Structural Welding Code', 'BS EN 1090 Execution of Steel Structures', 'ISO 3834 Quality Requirements for Fusion Welding'],
      description: 'All fabricated elements undergo visual inspection, dimensional verification against approved Tekla models, and non-destructive weld testing documented in a comprehensive Manufacturer Data Report (MDR).'
    },

    faqs: [
      {
        q: 'What steel grades does AJJAYER fabricate?',
        a: 'We routinely fabricate with European standard S275JR/JO/J2 and S355JR/J2, as well as ASTM A36, A572 Grade 50, and stainless steel grades 304/316 for specialized architectural and marine installations.'
      },
      {
        q: 'What surface treatment systems do you provide for UAE coastal environments?',
        a: 'We provide hot-dip galvanizing conforming to BS EN ISO 1461, high-build epoxy zinc-rich priming systems with polyurethane topcoats, and DCD-approved intumescent coatings for up to 120 minutes fire rating.'
      },
      {
        q: 'Can AJJAYER assist with structural connection calculations and approvals?',
        a: 'Yes. Our structural engineering department carries out full connection calculations, FEA analysis, and provides DM/DCD municipality-stamped documentation for statutory approvals.'
      },
      {
        q: 'What is your turnaround time for structural steel fabrication?',
        a: 'Turnaround depends on project tonnage, but with automated CNC lines and multi-shift welding bays, we deliver typical commercial and warehouse packages within 4 to 8 weeks from shop drawing sign-off.'
      }
    ],

    relatedServices: [
      {
        slug: 'warehouses-pre-engineered-buildings',
        title: 'Warehouses & Pre-Engineered Buildings',
        anchor: 'Explore our Pre-Engineered Building (PEB) structural systems →'
      },
      {
        slug: 'general-construction',
        title: 'General Construction',
        anchor: 'View our end-to-end commercial general contracting services →'
      },
      {
        slug: 'tensile-shade-structures',
        title: 'Tensile Shade Structures',
        anchor: 'Inspect our architectural tension membrane canopies →'
      }
    ]
  },

  {
    id: '03',
    slug: 'tensile-shade-structures',
    path: '/services/tensile-shade-structures',
    title: 'Tensile Shade Structures',
    shortTitle: 'Tensile Shade Structures',
    descriptor: 'Engineered architectural shade systems',
    tagline: 'Sculptural architectural membrane canopies, PTFE & PVC tensile fabric structures engineered for extreme UAE weather and solar protection.',
    seoTitle: 'Tensile Shade Structures Dubai, UAE | AJJAYER',
    metaDescription: 'AJJAYER designs and installs engineered architectural tensile shade structures, PTFE and PVC canopies across Dubai and UAE for maximum solar protection and striking form.',
    h1: 'Tensile Shade Structure Solutions',
    image: '/services/pergola.png',
    imageWebp: '/services/tensile-shade-structures-uae.webp',
    imageAlt: 'Modern architectural tensile canopy pergola structure under warm light in Dubai UAE',
    imageWidth: 1448,
    imageHeight: 1086,
    technicalRef: 'CANOPY TENSION ELEVATION T-03 / MEMBRANE DETAIL',
    drawingType: 'tensile',

    overview: [
      'AJJAYER is a specialist contractor for architectural tensile shade structures in Dubai and the UAE, transforming outdoor spaces with lightweight, high-performance membrane architecture. Our tensile solutions merge organic aesthetic elegance with robust structural engineering.',
      'Using premium PTFE-coated fiberglass, PVDF-lacquered PVC membranes, and ETFE foils sourced from leading global manufacturers (such as Serge Ferrari, Mehler, and Saint-Gobain), our canopies reflect up to 85% of solar radiation. Each canopy is modeled through advanced non-linear form-finding software to guarantee tension stability under severe gust winds exceeding 160 km/h.'
    ],

    capabilities: [
      {
        icon: DraftingCompass,
        title: 'Non-Linear Form Finding',
        description: 'Advanced membrane stress analysis and pattern generation using specialized computational tensile engineering software.'
      },
      {
        icon: Sun,
        title: 'Solar & UV Rejection Engineering',
        description: 'High Solar Reflectance Index (SRI) fabrics blocking up to 98% of harmful UV rays while permitting soft diffused natural daylight.'
      },
      {
        icon: ShieldCheck,
        title: 'High-Tensile Cable & Mast Systems',
        description: 'Stainless steel grade 316 rigging cables, CNC-machined toggle connectors, and powder-coated heavy structural steel masts.'
      },
      {
        icon: Umbrella,
        title: 'High-Frequency Membrane Welding',
        description: 'Precision automated high-frequency (HF) welding of fabric seams ensuring 100% waterproof and tear-resistant joints.'
      },
      {
        icon: Building2,
        title: 'Iconic Free-Span Geometry',
        description: 'Conical, hypar (hyperbolic paraboloid), barrel vault, and custom undulating forms for public and commercial plazas.'
      },
      {
        icon: Timer,
        title: 'Rapid Deployment & Maintenance',
        description: 'Engineered installation protocols with minimal ground disturbance and structured annual re-tensioning inspection plans.'
      }
    ],

    deliverySteps: [
      {
        num: '01',
        title: 'Concept & Computational Form-Finding',
        description: 'Interactive 3D geometry exploration to define boundary tension lines, reaction forces, and rainwater run-off trajectories.'
      },
      {
        num: '02',
        title: 'Structural Steel Mast Engineering',
        description: 'Finite element analysis of supporting steel columns and anchor bolts against maximum UAE wind load standards.'
      },
      {
        num: '03',
        title: 'Computer-Controlled Pattern Cutting',
        description: 'Precision CNC plotting and cutting of membrane panels compensated for biaxial fabric stretch characteristics.'
      },
      {
        num: '04',
        title: 'High-Frequency Seam Fusion',
        description: 'Welding membrane rolls in controlled cleanroom conditions to ensure microscopic adhesion and complete impermeability.'
      },
      {
        num: '05',
        title: 'Tensioning & Field Erection',
        description: 'Calibrated hydraulic jacking to achieve engineered pre-stress values across all perimeter cables and corner clamp plates.'
      }
    ],

    projectTypes: [
      {
        name: 'Public Plazas & Waterfront Promenades',
        scope: 'Sculptural tensile shade sails providing expansive cool microclimates for pedestrian walkways and tourist attractions.'
      },
      {
        name: 'Sports Stadiums & Amphitheaters',
        scope: 'Large-scale cantilever membrane covers shielding spectator grandstands with minimal column obstruction.'
      },
      {
        name: 'Commercial Entrance Features',
        scope: 'Striking conical and parabolic architectural canopy entrances for five-star hotels and luxury retail destinations.'
      },
      {
        name: 'Educational Campus Walkways',
        scope: 'Continuous covered pedestrian networks safeguarding students from extreme desert solar exposure between facilities.'
      }
    ],

    whyChoose: [
      {
        title: 'Global Grade Membranes',
        description: 'We partner exclusively with certified Tier-1 European membrane producers with proven 15 to 25 year lifespans.'
      },
      {
        title: 'Calibrated Pre-Stress Control',
        description: 'Hydraulic tensioning guarantees that canopies do not sag, flap, or pool water during winter desert downpours.'
      },
      {
        title: 'Dubai Climate Optimization',
        description: 'Self-cleaning PVDF and TiO2 coatings resist desert sand abrasion and atmospheric pollution without yellowing.'
      },
      {
        title: 'Turnkey Foundation to Mast Rigging',
        description: 'We calculate, pour, fabricate, and erect the entire system with comprehensive municipality structural approvals.'
      }
    ],

    qualitySafety: {
      standards: ['ASCE 55 Tensile Membrane Structures', 'Eurocode 3 & 9 (Steel & Aluminum)', 'ASTM D4851 Tensile Fabric Testing', 'Dubai Municipality Wind Code Compliance'],
      description: 'Every tensile structure undergoes biaxial stretch testing, clamp torque verification, and post-installation tension audits to ensure structural integrity in high-temperature conditions.'
    },

    faqs: [
      {
        q: 'What is the expected lifespan of a tensile shade structure in the UAE?',
        a: 'High-grade PVC/PVDF membranes typically last 15 to 20 years, while premium PTFE fiberglass canopies exceed 30 years under Dubai solar exposure without material degradation.'
      },
      {
        q: 'How do tensile membranes perform during extreme sandstorms and rain in Dubai?',
        a: 'Our canopies are engineered to Dubai wind code requirements (up to 160 km/h) and configured with minimum 12-degree drainage slopes to ensure zero rainwater ponding or sand accumulation.'
      },
      {
        q: 'Can tensile structures be designed to match corporate branding colors?',
        a: 'Yes. PVC membranes are available in a broad range of architectural colors. PTFE membranes are naturally translucent white, delivering up to 18% soft natural daylight transmission with zero glare.'
      },
      {
        q: 'Do tensile structures require building permits in the UAE?',
        a: 'Yes. Tensile canopies over commercial properties, schools, and public areas require Dubai Municipality or Trakhees structural engineering permits, which AJJAYER manages in full.'
      }
    ],

    relatedServices: [
      {
        slug: 'car-parking-shades-pergolas',
        title: 'Car Parking Shades & Pergolas',
        anchor: 'Discover our specialized cantilever car parking shades and pergolas →'
      },
      {
        slug: 'steel-structures-fabrication',
        title: 'Steel Structures & Fabrication',
        anchor: 'Inspect our heavy structural steel engineering and mast fabrication →'
      }
    ]
  },

  {
    id: '04',
    slug: 'car-parking-shades-pergolas',
    path: '/services/car-parking-shades-pergolas',
    title: 'Car Parking Shades & Pergolas',
    shortTitle: 'Car Parking Shades & Pergolas',
    descriptor: 'Functional shade with architectural character',
    tagline: 'Commercial cantilevers, arch shades, and contemporary architectural pergolas engineered for durability across corporate and residential spaces.',
    seoTitle: 'Car Parking Shades & Pergolas Dubai | AJJAYER',
    metaDescription: 'AJJAYER designs, fabricates and installs commercial cantilever car parking shades and modern pergolas across Dubai and the UAE with high UV protection and durable steel.',
    h1: 'Car Parking Shades & Pergolas',
    image: '/services/parking.png',
    imageWebp: '/services/car-parking-shades-dubai.webp',
    imageAlt: 'Commercial cantilever car parking shade canopy installation in Dubai UAE',
    imageWidth: 1536,
    imageHeight: 1024,
    technicalRef: 'CANTILEVER SECTION P-04 / SHADE SYSTEM',
    drawingType: 'pergola',

    overview: [
      'AJJAYER manufactures and installs high-durability car parking shade structures and custom architectural pergolas across Dubai, Abu Dhabi, and the Northern Emirates. Designed to safeguard vehicles and pedestrians from severe Arabian Gulf temperatures and solar damage, our shading systems combine structural longevity with refined modern profiles.',
      'Whether deploying single-cantilever parking bays for corporate headquarters, double-cantilever arch canopies for commercial shopping centers, or aluminum and hardwood pergolas for hospitality terraces, we ensure complete structural compliance with UAE local authority guidelines and high wind-load ratings.'
    ],

    capabilities: [
      {
        icon: Car,
        title: 'Cantilever Car Park Canopies',
        description: 'Single and double-post cantilever designs offering zero-obstruction vehicle maneuvering and maximum bay capacity.'
      },
      {
        icon: Umbrella,
        title: 'Pyramid, Arch & Wave Profiles',
        description: 'Architecturally striking arch, sail, and pyramid shade geometries that enhance commercial and institutional property values.'
      },
      {
        icon: Sun,
        title: '95%+ Solar & UV Heat Deflection',
        description: 'High-density polyethylene (HDPE) knitted mesh and waterproof PVC fabrics engineered to drop cabin temperatures by up to 25°C.'
      },
      {
        icon: Ruler,
        title: 'Custom Architectural Pergolas',
        description: 'Heavy-gauge aluminum, thermowood, and powder-coated steel pergolas with motorized louvers and architectural slats.'
      },
      {
        icon: ShieldCheck,
        title: 'Hot-Dip Galvanized & Powder-Coated Steel',
        description: 'Corrosion-resistant steel framing protected against salt-air marine humidity and sand abrasion.'
      },
      {
        icon: Timer,
        title: 'Modular Turnkey Installation',
        description: 'Pre-fabricated modular components installed rapidly on site with minimal disruption to parking operations.'
      }
    ],

    deliverySteps: [
      {
        num: '01',
        title: 'Site Layout & Bay Optimization',
        description: 'Laser survey and CAD layout design to optimize parking stall dimensions, turning radii, and foundation locations.'
      },
      {
        num: '02',
        title: 'Foundation & Anchor Bolt Pouring',
        description: 'Engineering reinforced concrete pad foundations designed to resist high overturning cantilever moments.'
      },
      {
        num: '03',
        title: 'Structural Steel Post Fabrication',
        description: 'Precision welding of circular and square hollow sections (CHS/SHS) followed by hot-dip galvanizing or epoxy coating.'
      },
      {
        num: '04',
        title: 'Fabric Tailoring & Tensioning',
        description: 'Custom patterning of premium HDPE knitted mesh or waterproof Ferrari PVC fabric with perimeter stainless cables.'
      },
      {
        num: '05',
        title: 'Rapid On-Site Assembly & Handover',
        description: 'Systematic bolting of canopies, torque testing of connections, and final alignment review.'
      }
    ],

    projectTypes: [
      {
        name: 'Corporate & Government Campuses',
        scope: 'Multi-bay cantilever parking shading systems covering hundreds of executive and staff vehicles.'
      },
      {
        name: 'Shopping Malls & Retail Centers',
        scope: 'Durable arch and wave canopies providing reliable visitor shade across vast open-air parking lots.'
      },
      {
        name: 'Residential Communities & Villas',
        scope: 'Contemporary bespoke pergolas and private double-car ports customized to match architectural villa facades.'
      },
      {
        name: 'Hospitality & Rooftop Terraces',
        scope: 'Motorized louvered pergolas and architectural shading structures for outdoor dining and lounge environments.'
      }
    ],

    whyChoose: [
      {
        title: 'Zero Obstruction Designs',
        description: 'Rear-anchored cantilevers eliminate front support posts, preventing accidental vehicle door dings and collision damage.'
      },
      {
        title: 'Heavy Wind Resilience',
        description: 'Engineered and certified to withstand gusting winds up to 140 km/h without fabric tearing or column deflection.'
      },
      {
        title: 'Flame-Retardant Fabrics',
        description: 'Certified to NFPA 701, DIN 4102 B1, and UAE Civil Defense fire resistance standards for commercial parking safety.'
      },
      {
        title: 'Long-Term Warranty',
        description: 'Backing every installation with comprehensive 10-year fabric UV-stability and 15-year structural steel warranties.'
      }
    ],

    qualitySafety: {
      standards: ['BS 5950 Structural Use of Steelwork', 'NFPA 701 Flame Propagation Standards', 'ISO 9001 Fabrication Quality Management', 'Dubai Municipality Parking Regulations'],
      description: 'Anchor bolts are pull-tested on site, steel welds are inspected, and fabric tensions are verified to prevent flutter fatigue during winter wind storms.'
    },

    faqs: [
      {
        q: 'What is the difference between HDPE mesh and PVC fabric for car park shades?',
        a: 'HDPE mesh allows hot air to escape through its knitted pores, reducing vehicle temperatures significantly while blocking 95% of UV rays. PVC is 100% waterproof, protecting vehicles from both solar heat and winter rain.'
      },
      {
        q: 'How long does it take to install a 50-car commercial parking shade project?',
        a: 'Off-site fabrication takes approximately 3 to 4 weeks. Foundation civil works take 1 to 2 weeks, followed by on-site steel and fabric erection in just 5 to 7 days.'
      },
      {
        q: 'Do your pergolas come with integrated lighting and drainage?',
        a: 'Yes. Our architectural pergolas can be engineered with internal gutter channels, hidden wiring conduits, and integrated LED architectural lighting.'
      },
      {
        q: 'Can AJJAYER retrofit shades to existing parking tarmac without destroying the surface?',
        a: 'Yes. We utilize core-drilled mini-piles or isolated concrete pad footings that minimize asphalt demolition and can be reinstated seamlessly.'
      }
    ],

    relatedServices: [
      {
        slug: 'tensile-shade-structures',
        title: 'Tensile Shade Structures',
        anchor: 'Explore our architectural tensile fabric canopies and sails →'
      },
      {
        slug: 'steel-structures-fabrication',
        title: 'Steel Structures & Fabrication',
        anchor: 'View our certified heavy metal and structural steel fabrication →'
      }
    ]
  },

  {
    id: '05',
    slug: 'warehouses-pre-engineered-buildings',
    path: '/services/warehouses-pre-engineered-buildings',
    title: 'Warehouses & Pre-Engineered Buildings',
    shortTitle: 'Warehouses & PEB',
    descriptor: 'Efficient structural building systems',
    tagline: 'Turnkey PEB steel warehouses, industrial logistics hubs, and clear-span storage facilities optimized for maximum volume and durability.',
    seoTitle: 'Warehouse & Pre-Engineered Building Contractor Dubai | AJJAYER',
    metaDescription: 'AJJAYER engineers and builds turnkey pre-engineered steel warehouses and industrial logistics buildings in Dubai and across the UAE, delivering clear-span efficiency.',
    h1: 'Warehouses & Pre-Engineered Buildings',
    image: '/services/5.png',
    imageAlt: 'Interior clear-span portal frame pre-engineered warehouse building under construction in Dubai UAE',
    imageWidth: 1920,
    imageHeight: 1080,
    technicalRef: 'PORTAL FRAME SECTION W-05 / PEB INDUSTRIAL DETAIL',
    drawingType: 'warehouse',

    overview: [
      'AJJAYER is a specialized design-and-build contractor for pre-engineered steel buildings (PEB) and industrial logistics warehouses across Dubai, Abu Dhabi, Sharjah, and major UAE industrial free zones (JAFZA, DAFZA, DIC, KIZAD). We provide end-to-end industrial solutions optimized for speed, volumetric efficiency, and structural economy.',
      'Our PEB systems utilize tapered built-up portal frames, cold-formed Z and C purlins, and high-performance sandwich panel cladding with polyurethane (PIR) or non-combustible rockwool cores. This engineered approach delivers clear spans up to 60 meters without intermediate columns, allowing maximum racking density and seamless forklift logistics.'
    ],

    capabilities: [
      {
        icon: Warehouse,
        title: 'Turnkey PEB Industrial Facilities',
        description: 'Complete design, civil foundations, steel fabrication, sandwich cladding, and MEP fit-out under single-point responsibility.'
      },
      {
        icon: Layers3,
        title: 'Clear-Span Portal Frames (Up to 60m)',
        description: 'Tapered structural steel portal frames designed to optimize steel weight while providing open uninterrupted interior volume.'
      },
      {
        icon: ShieldCheck,
        title: 'DCD-Approved Fire-Rated Cladding',
        description: 'PIR and Rockwool insulated sandwich panels certified to Dubai Civil Defense standards for Class A fire safety ratings.'
      },
      {
        icon: Building2,
        title: 'Heavy Industrial Flooring',
        description: 'Laser-screed, fiber-reinforced concrete slabs with dry-shake hardeners designed for heavy automated warehouse racking loads.'
      },
      {
        icon: Cpu,
        title: 'Overhead Crane Integration',
        description: 'Engineered crane runway girders and corbels supporting electric overhead traveling (EOT) cranes from 5 to 50 tons.'
      },
      {
        icon: Timer,
        title: 'Fast-Track Turnkey Construction',
        description: 'Pre-fabricated off-site structural systems assembled rapidly on site to slash construction schedules by up to 40%.'
      }
    ],

    deliverySteps: [
      {
        num: '01',
        title: 'Architectural & Logistics Planning',
        description: 'Volumetric modeling, dock leveler planning, racking layout coordination, and Trakhees/DM authority approvals.'
      },
      {
        num: '02',
        title: 'Civil Groundwork & Industrial Flooring',
        description: 'Heavy reinforced concrete foundations, grade beams, and high-flatness (FM2/DM2) concrete floor slabs.'
      },
      {
        num: '03',
        title: 'PEB Frame Fabrication & Delivery',
        description: 'Automatic submerged arc welding of tapered built-up sections, shot-blasting, and epoxy primer coating in our UAE factory.'
      },
      {
        num: '04',
        title: 'Erection & Insulated Envelope Enclosure',
        description: 'Fast-track crane erection of portal frames followed by interlocking PIR/Rockwool roof and wall sandwich panel installation.'
      },
      {
        num: '05',
        title: 'DCD Firefighting & BCC Authority Handover',
        description: 'Installation of sprinkler systems, smoke ventilation louvers, DEWA power connection, and final Building Completion Certificate.'
      }
    ],

    projectTypes: [
      {
        name: 'E-Commerce Logistics Hubs',
        scope: 'High-bay distribution centers with automated sorting mezzanines, multiple dock levelers, and expansive clear heights.'
      },
      {
        name: 'Cold Storage & Temperature-Controlled Plants',
        scope: 'Thermal-break PEB envelopes with thick PIR insulation panels maintaining precise temperatures down to -25°C.'
      },
      {
        name: 'Manufacturing & Heavy Assembly Plants',
        scope: 'Industrial factories with integrated 30-ton EOT cranes, heavy equipment plinths, and robust ventilation systems.'
      },
      {
        name: 'Commercial Showrooms & Service Centers',
        scope: 'Combination of front glazed commercial showroom facades with rear high-volume workshop and storage facilities.'
      }
    ],

    whyChoose: [
      {
        title: 'Up to 30% Cost & Weight Savings',
        description: 'Computer-optimized tapered sections place steel only where stress demands it, reducing material tonnage and foundation sizes.'
      },
      {
        title: 'Single-Source Accountability',
        description: 'We manage design, authority permits, civil works, steel fabrication, and MEP commissioning under one commercial contract.'
      },
      {
        title: 'Full Free-Zone Compliance',
        description: 'Decades of experience working in JAFZA, Trakhees, Dubai Industrial City, and DDA jurisdictions ensures frictionless approvals.'
      },
      {
        title: 'Superior Thermal Efficiency',
        description: 'Engineered thermal breaks and PIR panels significantly reduce summer air conditioning energy costs across the building lifecycle.'
      }
    ],

    qualitySafety: {
      standards: ['MBMA (Metal Building Manufacturers Association) Standards', 'AISC 360 & AISI Specifications', 'Dubai Civil Defense Fire & Life Safety Code', 'Trakhees Environmental & Safety Regulations'],
      description: 'All structural welds undergo ultrasonic non-destructive testing, sandwich panels are verified for thermal conductivity and fire ratings, and floor flatness is checked using certified F-min profiling.'
    },

    faqs: [
      {
        q: 'Why choose a Pre-Engineered Building (PEB) over conventional structural steel?',
        a: 'PEB buildings use tapered built-up sections engineered exactly to bending moment diagrams, reducing overall steel weight by 20–30% and cutting on-site assembly time in half compared to conventional steel.'
      },
      {
        q: 'What clear span heights and widths can AJJAYER achieve for industrial warehouses?',
        a: 'We can achieve clear spans up to 60 meters without intermediate columns and clear internal eaves heights exceeding 14 meters to support multi-tier pallet racking systems.'
      },
      {
        q: 'Does AJJAYER handle Dubai Civil Defense (DCD) approval for industrial warehouses?',
        a: 'Yes. We provide complete DCD architectural and MEP engineering, including fire sprinklers, wet risers, fire pumps, smoke extraction fans, and fire-rated exit doors to secure statutory handover.'
      },
      {
        q: 'What floor finishes do you provide for heavy forklift traffic?',
        a: 'We cast laser-screed concrete slabs with dry-shake metallic or corundum mineral hardeners, achieving high abrasion resistance and flat tolerances conforming to ASTM E1155 / TR34 specifications.'
      }
    ],

    relatedServices: [
      {
        slug: 'steel-structures-fabrication',
        title: 'Steel Structures & Fabrication',
        anchor: 'Inspect our specialized structural steel fabrication capabilities →'
      },
      {
        slug: 'general-construction',
        title: 'General Construction',
        anchor: 'Learn about our full turnkey commercial and civil contracting →'
      },
      {
        slug: 'fit-out-finishing',
        title: 'Fit-Out & Finishing',
        anchor: 'Explore our commercial office and industrial interior fit-outs →'
      }
    ]
  },

  {
    id: '06',
    slug: 'fit-out-finishing',
    path: '/services/fit-out-finishing',
    title: 'Fit-Out & Finishing',
    shortTitle: 'Fit-Out & Finishing',
    descriptor: 'Spaces completed with precision',
    tagline: 'Considered materials, coordinated MEP installation, and meticulous architectural finishing for luxury commercial, retail, and corporate interiors.',
    seoTitle: 'Fit-Out & Finishing Contractor Dubai, UAE | AJJAYER',
    metaDescription: 'AJJAYER delivers premium commercial and architectural interior fit-out and finishing services across Dubai and the UAE with high detail precision and turn-key execution.',
    h1: 'Fit-Out & Finishing Services',
    image: '/services/6.png',
    imageAlt: 'High-end commercial architectural interior fit-out with warm pendant lighting and contemporary seating in Dubai',
    imageWidth: 1920,
    imageHeight: 1080,
    technicalRef: 'FINISHING SECTION F-06 / INTERIOR DETAIL',
    drawingType: 'interior',

    overview: [
      'AJJAYER delivers refined architectural interior fit-out and finishing contracting for commercial corporate offices, retail flagships, luxury hospitality, and high-specification industrial headquarters throughout Dubai and the UAE.',
      'We combine detailed architectural joinery, acoustic partition systems, bespoke ceilings, and premium surface finishes with meticulous MEP integration. By controlling our own site teams and coordinating directly with statutory authorities (DM, DCD, Tecom, DDA), we transform shell-and-core units into turnkey, ready-to-occupy spaces completed to perfection.'
    ],

    capabilities: [
      {
        icon: Paintbrush,
        title: 'Turnkey Commercial Fit-Out',
        description: 'Complete transformation of shell-and-core or CAT-A commercial spaces into functional, inspiring environments.'
      },
      {
        icon: Layers3,
        title: 'Architectural Joinery & Woodwork',
        description: 'Custom acoustic wall paneling, bespoke executive reception desks, feature veneer baffles, and cabinetry.'
      },
      {
        icon: ScanLine,
        title: 'Glass Partitions & Ceilings',
        description: 'Acoustic double-glazed demountable partition systems, seamless gypsum ceilings, and floating metal baffle arrays.'
      },
      {
        icon: ShieldCheck,
        title: 'MEP Fit-Out & Smart Automation',
        description: 'Ducted HVAC distribution, architectural lighting control, fire alarm modifications, and certified structured cabling.'
      },
      {
        icon: ClipboardCheck,
        title: 'Finishing Materials & Floorings',
        description: 'Precision installation of Italian porcelain tiles, microcement, engineered hardwoods, terrazzo, and commercial carpet tiles.'
      },
      {
        icon: Timer,
        title: 'Fast-Track Handover Protocols',
        description: 'Dedicated snagging teams conducting microscopic pre-handover audits to ensure flawless delivery on opening day.'
      }
    ],

    deliverySteps: [
      {
        num: '01',
        title: 'Technical Review & Statutory Permitting',
        description: 'Base-build survey, clash coordination, and acquiring Fit-Out Permits from landlord management and local authorities.'
      },
      {
        num: '02',
        title: 'Demolition & MEP First-Fix Infrastructure',
        description: 'Setting out partitions, routing chilled water ducting, installing electrical raceways, and fire sprinkler alterations.'
      },
      {
        num: '03',
        title: 'Partitions, Ceilings & Acoustic Framing',
        description: 'Erecting high-STC acoustic stud partitions, moisture-resistant ceiling frames, and glass partition recessed channels.'
      },
      {
        num: '04',
        title: 'Bespoke Joinery & Surface Finishes',
        description: 'Installing custom millwork, marble wall claddings, wallpaper, micro-cement, and integrated architectural lighting.'
      },
      {
        num: '05',
        title: 'Testing, Commissioning & Handover',
        description: 'Air balancing, electrical test certification, landlord sign-off, DCD completion inspection, and keys turnover.'
      }
    ],

    projectTypes: [
      {
        name: 'Corporate Executive Headquarters',
        scope: 'Premium executive boardrooms, open collaborative work halls, and acoustic phone pods built to international workplace standards.'
      },
      {
        name: 'Luxury Retail & Flagship Boutiques',
        scope: 'Bespoke retail interiors featuring high-end brass accents, custom display fixtures, and precision perimeter lighting.'
      },
      {
        name: 'Hospitality & Fine Dining Venues',
        scope: 'Atmospheric restaurant and cafe interiors coordinating commercial kitchen extraction with luxury dining ambiance.'
      },
      {
        name: 'Industrial Administrative Facilities',
        scope: 'Modern two-storey office fit-outs integrated into pre-engineered warehouse platforms with high acoustic insulation.'
      }
    ],

    whyChoose: [
      {
        title: 'Microscopic Detail Discipline',
        description: 'Every shadow gap, tile alignment, and joinery reveal is scrutinized against millimeter architectural shop drawings.'
      },
      {
        title: 'Turnkey Authority Coordination',
        description: 'We handle landlord NOCs, Dubai Municipality, Civil Defense, and free-zone work permits to keep projects moving.'
      },
      {
        title: 'Acoustic & MEP Excellence',
        description: 'Proper sound isolation and thermal comfort engineering ensure productive, comfortable, and compliant workplaces.'
      },
      {
        title: 'On-Time Opening Guarantee',
        description: 'We understand the commercial cost of delays and maintain 24/7 accelerated site shifts when required to meet opening dates.'
      }
    ],

    qualitySafety: {
      standards: ['Dubai Municipality Fit-Out Regulations', 'DCD Fire and Life Safety Standards', 'LEED & WELL Building Principles', 'ISO 9001:2015 Fit-Out Quality Compliance'],
      description: 'All interior materials are tested for low VOC emissions, fire retardancy class ratings, and acoustic NRC ratings. Full test certificates are provided in the final handover Operations & Maintenance (O&M) manual.'
    },

    faqs: [
      {
        q: 'What is the typical timeline for a commercial office fit-out in Dubai?',
        a: 'A typical 500–1,000 sq.m commercial office fit-out takes 8 to 12 weeks from authority permit issuance, with authority approvals requiring an additional 2 to 3 weeks prior to site mobilization.'
      },
      {
        q: 'Does AJJAYER obtain Dubai Civil Defense (DCD) approvals for fit-out projects?',
        a: 'Yes. We prepare DCD-compliant fire alarm and firefighting layout modifications, submit documentation through the official DCD portal, and coordinate the physical site inspection to obtain the final completion certificate.'
      },
      {
        q: 'Can you work during night hours or weekends in occupied commercial buildings?',
        a: 'Yes. In operational commercial buildings in Business Bay, DIFC, Downtown, and JLT, our teams execute noisy works (drilling, cutting, demolition) during authorized night shifts and weekends to respect building tenant rules.'
      },
      {
        q: 'Do you provide turnkey joinery and loose furniture?',
        a: 'We self-perform all fixed architectural joinery, reception counters, wall paneling, and acoustic ceiling baffles, and can procure or integrate turnkey commercial furniture packages.'
      }
    ],

    relatedServices: [
      {
        slug: 'general-construction',
        title: 'General Construction',
        anchor: 'View our turnkey civil and commercial construction capabilities →'
      },
      {
        slug: 'warehouses-pre-engineered-buildings',
        title: 'Warehouses & Pre-Engineered Buildings',
        anchor: 'Explore our PEB industrial building systems and logistics hub construction →'
      }
    ]
  }
];

export const servicesHubData = {
  seoTitle: 'Comprehensive Construction & Engineering Services Dubai | AJJAYER',
  metaDescription: 'Explore AJJAYER\'s six core construction and structural engineering disciplines in Dubai, UAE — from heavy steel fabrication and PEB warehouses to tensile canopies and turnkey fit-outs.',
  h1: 'Engineering & Construction Services in Dubai & UAE',
  canonical: 'https://ajjayer.ae/services',
  heroEyebrow: 'FROM VISION TO REALITY',
  heroHeading: 'OUR SERVICES',
  heroDescription: 'End-to-end construction, engineering and fabrication solutions designed to bring ambitious ideas to life with precision, quality and lasting value.'
};

export function getServiceBySlug(slug) {
  return servicesData.find(s => s.slug === slug);
}
