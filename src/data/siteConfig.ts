export interface BusinessHoursRow {
  days: string;
  hours: string;
}

export interface SocialLinkItem {
  id: string;
  platform: 'Instagram' | 'Facebook' | 'YouTube' | 'LinkedIn';
  url: string;
}

export interface PowerServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  image: string;
  imageAlt: string;
  whatsappMessage: string;
}

export type ProductCategory =
  | 'UPS Systems'
  | 'Inverters'
  | 'Lithium Batteries'
  | 'Solar Panels'
  | 'Accessories';

export interface ProductItem {
  id: string;
  name: string;
  category: ProductCategory;
  capacityOrSpec: string;
  priceLabel: string;
  description: string;
  image: string;
  imageAlt: string;
  whatsappMessage: string;
}

export type ConstructionDivision =
  | 'Civil & Turnkey'
  | 'MEP & Finishes'
  | 'Property & Maintenance';

export interface ConstructionServiceItem {
  id: string;
  number: string;
  title: string;
  division: ConstructionDivision;
  description: string;
  image: string;
  imageAlt: string;
  whatsappMessage: string;
}

export type ProjectCategory =
  | 'Solar Installations'
  | 'UPS & Inverters'
  | 'Battery Products'
  | 'Construction Projects'
  | 'Interior & Renovation'
  | 'Electrical & Plumbing';

export interface ProjectGalleryItem {
  id: string;
  title: string;
  category: ProjectCategory;
  location: string;
  scope: string;
  image: string;
  imageAlt: string;
}

export interface SiteConfig {
  businessName: string;
  primaryTagline: string;
  secondaryTagline: string;
  heroHeadline: string;
  heroSupportingText: string;
  heroImage: string;
  heroImageAlt: string;
  address: string;
  primaryPhone: string;
  secondaryPhone: string;
  whatsappNumber: string;
  email: string;
  serviceAreas: string[];
  businessHours: BusinessHoursRow[];
  socialLinks: SocialLinkItem[];
  powerServices: PowerServiceItem[];
  products: ProductItem[];
  constructionServices: ConstructionServiceItem[];
  projects: ProjectGalleryItem[];
}

export const IMAGES = {
  heroSolarResidence: '/src/assets/images/hero_solar_residence_1795252827660.jpg',
  powerUpsLithium: '/src/assets/images/power_ups_lithium_system_1795252829695.jpg',
  solarRooftop: '/src/assets/images/solar_rooftop_installation_1795252829066.jpg',
  constructionVilla: '/src/assets/images/construction_civil_villa_1795252829313.jpg',
  interiorRenovation: '/src/assets/images/interior_renovation_living_1795252829713.jpg',
  electricalPlumbing: '/src/assets/images/electrical_plumbing_engineering_1795252830767.jpg',
};

export function buildWhatsAppUrl(whatsappNumber: string, message: string): string {
  const cleanNumber = whatsappNumber.replace(/\D/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

export function buildTelUrl(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  const formatted = digits.length === 10 ? `+91${digits}` : `+${digits}`;
  return `tel:${formatted}`;
}

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  businessName: 'ILAYSATHYA POWER TECH',
  primaryTagline: 'Powering Homes. Building Dreams.',
  secondaryTagline: 'All Works Under One Roof.',
  heroHeadline: 'Complete Power & Construction Solutions Under One Roof.',
  heroSupportingText:
    'From reliable power backup and solar energy to complete construction and renovation services, we deliver quality solutions for your home and business.',
  heroImage: IMAGES.heroSolarResidence,
  heroImageAlt:
    'Modern Bengaluru residence equipped with rooftop solar panels, lithium battery backup, and clean architectural construction',
  address:
    'Shop No. 190, Krishna Nagar, Byrathi Bande, Hennur Bagalur Road, Opposite Unique Astro Crown Layout, Byrathi, Bengaluru – 560077, Karnataka, India.',
  primaryPhone: '9343719475',
  secondaryPhone: '8050000907',
  whatsappNumber: '919343719475',
  email: 'info@ilaysathyapowertech.in',
  serviceAreas: [
    'Byrathi',
    'Hennur Bagalur Road',
    'Kothanur',
    'Horamavu',
    'Banaswadi',
    'Bengaluru North & East',
  ],
  businessHours: [
    { days: 'Monday – Saturday', hours: '9:00 AM – 8:30 PM' },
    { days: 'Sunday', hours: '10:00 AM – 2:00 PM (Site Visits by Appointment)' },
  ],
  socialLinks: [
    { id: 'soc-1', platform: 'Instagram', url: '' },
    { id: 'soc-2', platform: 'Facebook', url: '' },
    { id: 'soc-3', platform: 'YouTube', url: '' },
  ],
  powerServices: [
    {
      id: 'ups-sales-services',
      number: '01',
      title: 'UPS Sales & Services',
      subtitle: 'Home & Commercial Backup',
      description:
        'Supply, installation, and prompt repair of online and line-interactive UPS systems for residences, clinics, offices, and retail shops across Byrathi and Bengaluru.',
      highlights: ['Load assessment & sizing', 'On-site fault diagnostics', 'Residential & commercial units'],
      image: IMAGES.powerUpsLithium,
      imageAlt: 'Residential and commercial UPS power backup unit installation',
      whatsappMessage:
        'Hello ILAYSATHYA POWER TECH, I would like to enquire about UPS Sales & Services.',
    },
    {
      id: 'inverter-sales-services',
      number: '02',
      title: 'Inverter Sales & Services',
      subtitle: 'Pure Sine Wave Systems',
      description:
        'High-efficiency pure sine wave and hybrid inverters engineered for seamless changeover, appliance protection, and dependable daily power backup.',
      highlights: ['Pure sine wave output', 'Safe overload protection', 'Rapid breakdown servicing'],
      image: IMAGES.powerUpsLithium,
      imageAlt: 'Digital pure sine wave inverter installed cleanly on utility wall',
      whatsappMessage:
        'Hello ILAYSATHYA POWER TECH, I would like details on Inverter Sales & Services.',
    },
    {
      id: 'lithium-battery-solutions',
      number: '03',
      title: 'Lithium Battery Solutions',
      subtitle: 'LiFePO4 Energy Storage',
      description:
        'Compact, fast-charging, long-cycle LiFePO4 lithium battery packs tailored for modern apartments, villas, and commercial setups in Bengaluru.',
      highlights: ['Zero water topping', 'Compact wall/rack mount', 'Smart BMS protection'],
      image: IMAGES.powerUpsLithium,
      imageAlt: 'Wall-mounted LiFePO4 lithium battery energy storage system',
      whatsappMessage:
        'Hello ILAYSATHYA POWER TECH, I am interested in Lithium Battery Solutions.',
    },
    {
      id: 'solar-panel-installation',
      number: '04',
      title: 'Solar Panel Installation',
      subtitle: 'On-Grid & Hybrid Rooftop',
      description:
        'Complete rooftop solar engineering from structural mounting and monocrystalline panels to inverter synchronization and clean AC/DC earthing.',
      highlights: ['Site shadow & roof survey', 'Galvanized mounting structure', 'On-grid & hybrid setups'],
      image: IMAGES.solarRooftop,
      imageAlt: 'Elevated rooftop solar panel array installed in Bengaluru',
      whatsappMessage:
        'Hello ILAYSATHYA POWER TECH, I would like a site survey quote for Solar Panel Installation.',
    },
    {
      id: 'battery-sales-replacement',
      number: '05',
      title: 'Battery Sales & Replacement',
      subtitle: 'Tubular & Lithium Upgrades',
      description:
        'Genuine tall tubular and lithium replacement batteries with old-battery exchange assessment, terminal servicing, and voltage load testing.',
      highlights: ['Old battery exchange check', 'Doorstep delivery & setup', 'All major capacities'],
      image: IMAGES.powerUpsLithium,
      imageAlt: 'Battery bank replacement and testing service',
      whatsappMessage:
        'Hello ILAYSATHYA POWER TECH, I need Battery Sales & Replacement support.',
    },
    {
      id: 'electrical-power-solutions',
      number: '06',
      title: 'Electrical Power Solutions',
      subtitle: 'Distribution & Protection',
      description:
        'Main distribution boards, changeover switches, earthing pits, surge arresters, and balanced phase wiring for safe power distribution.',
      highlights: ['MCB & RCCB distribution', 'Dedicated inverter circuits', 'Proper earthing & surge safety'],
      image: IMAGES.electricalPlumbing,
      imageAlt: 'Cleanly wired MCB and RCCB electrical distribution panel',
      whatsappMessage:
        'Hello ILAYSATHYA POWER TECH, I would like to discuss Electrical Power Solutions.',
    },
    {
      id: 'power-backup-maintenance',
      number: '07',
      title: 'Power Backup Maintenance',
      subtitle: 'Preventive Care & Repairs',
      description:
        'Scheduled preventive inspection, distilled water and terminal maintenance, backup runtime testing, and emergency troubleshooting near Hennur & Byrathi.',
      highlights: ['Runtime & health checks', 'Terminal & cable tightening', 'Fast local technician dispatch'],
      image: IMAGES.electricalPlumbing,
      imageAlt: 'Electrical backup testing and maintenance panel',
      whatsappMessage:
        'Hello ILAYSATHYA POWER TECH, I want to book Power Backup Maintenance service.',
    },
  ],
  products: [
    {
      id: 'prod-ups-1',
      name: 'Pure Sine Wave Home & Office UPS',
      category: 'UPS Systems',
      capacityOrSpec: '1100VA – 5kVA · Pure Sine Wave',
      priceLabel: 'Request Latest Price',
      description:
        'Microcontroller-based UPS engineered for sensitive home appliances, computers, medical equipment, and uninterrupted office operations.',
      image: IMAGES.powerUpsLithium,
      imageAlt: 'Pure Sine Wave Home and Office UPS system',
      whatsappMessage:
        'Hello ILAYSATHYA POWER TECH, please share pricing and availability for the Pure Sine Wave Home & Office UPS.',
    },
    {
      id: 'prod-inv-1',
      name: 'Hybrid Solar MPPT Inverter Unit',
      category: 'Inverters',
      capacityOrSpec: '2kW – 10kW · Dual MPPT',
      priceLabel: 'Request Latest Price',
      description:
        'Intelligent hybrid inverter supporting solar PV priority, grid charging, and seamless lithium or tubular battery integration.',
      image: IMAGES.powerUpsLithium,
      imageAlt: 'Hybrid Solar MPPT Inverter Unit mounted on wall',
      whatsappMessage:
        'Hello ILAYSATHYA POWER TECH, please share specifications and pricing for the Hybrid Solar MPPT Inverter Unit.',
    },
    {
      id: 'prod-lit-1',
      name: 'LiFePO4 Wall-Mount Lithium Battery',
      category: 'Lithium Batteries',
      capacityOrSpec: '24V / 48V · 100Ah – 200Ah',
      priceLabel: 'Request Latest Price',
      description:
        'Long-life lithium iron phosphate battery pack with integrated Battery Management System (BMS), fast charging, and zero maintenance.',
      image: IMAGES.powerUpsLithium,
      imageAlt: 'LiFePO4 Wall-Mount Lithium Battery pack',
      whatsappMessage:
        'Hello ILAYSATHYA POWER TECH, I would like a quote for the LiFePO4 Wall-Mount Lithium Battery.',
    },
    {
      id: 'prod-sol-1',
      name: 'Monocrystalline PERC / Bifacial Solar Panels',
      category: 'Solar Panels',
      capacityOrSpec: '540Wp – 580Wp Modules',
      priceLabel: 'Custom kW System Quote',
      description:
        'High-conversion monocrystalline solar modules built for strong rooftop yield under Bengaluru weather conditions.',
      image: IMAGES.solarRooftop,
      imageAlt: 'Monocrystalline rooftop solar photovoltaic panels',
      whatsappMessage:
        'Hello ILAYSATHYA POWER TECH, please share pricing for Monocrystalline Solar Panels and installation.',
    },
    {
      id: 'prod-acc-1',
      name: 'ACDB / DCDB Protection Panels & Battery Trolleys',
      category: 'Accessories',
      capacityOrSpec: 'Surge Arresters · MCBs · Heavy Racks',
      priceLabel: 'Request Accessory Quote',
      description:
        'Pre-wired AC and DC distribution boxes, SPD surge protection devices, copper DC cables, and powder-coated battery enclosures.',
      image: IMAGES.electricalPlumbing,
      imageAlt: 'ACDB DCDB electrical protection panel and switchgear',
      whatsappMessage:
        'Hello ILAYSATHYA POWER TECH, I want to enquire about ACDB/DCDB protection panels and power accessories.',
    },
  ],
  constructionServices: [
    {
      id: 'civil-construction',
      number: '01',
      title: 'Civil Construction Work',
      division: 'Civil & Turnkey',
      description:
        'End-to-end RCC structural framing, foundation, masonry, plastering, and waterproofing for independent houses and commercial buildings.',
      image: IMAGES.constructionVilla,
      imageAlt: 'Residential civil construction structure in Byrathi Bengaluru',
      whatsappMessage:
        'Hello ILAYSATHYA POWER TECH, I would like to discuss Civil Construction Work.',
    },
    {
      id: 'electrical-work',
      number: '02',
      title: 'Electrical Work',
      division: 'MEP & Finishes',
      description:
        'Complete concealed house wiring, DB dressing, three-phase load balancing, lighting layouts, and earthing installations.',
      image: IMAGES.electricalPlumbing,
      imageAlt: 'Residential electrical panel and breaker installation',
      whatsappMessage:
        'Hello ILAYSATHYA POWER TECH, I need an estimate for Electrical Work.',
    },
    {
      id: 'plumbing-work',
      number: '03',
      title: 'Plumbing Work',
      division: 'MEP & Finishes',
      description:
        'CPVC/UPVC water supply piping, concealed bathroom diverters, overhead tank manifolds, drainage lines, and pressure testing.',
      image: IMAGES.electricalPlumbing,
      imageAlt: 'Precision CPVC plumbing manifold installation',
      whatsappMessage:
        'Hello ILAYSATHYA POWER TECH, I would like to enquire about Plumbing Work.',
    },
    {
      id: 'tiles-flooring',
      number: '04',
      title: 'Tiles & Flooring Work',
      division: 'MEP & Finishes',
      description:
        'Precision vitrified tile laying, granite staircases, bathroom wall cladding, epoxy grouting, and level floor screeding.',
      image: IMAGES.interiorRenovation,
      imageAlt: 'Modern large-format vitrified floor tiling in living room',
      whatsappMessage:
        'Hello ILAYSATHYA POWER TECH, I would like a quote for Tiles & Flooring Work.',
    },
    {
      id: 'painting-interior',
      number: '05',
      title: 'Painting & Interior Work',
      division: 'MEP & Finishes',
      description:
        'Interior putty & emulsion finishes, exterior weatherproof coatings, false ceilings, modular woodwork, and lighting integration.',
      image: IMAGES.interiorRenovation,
      imageAlt: 'Finished interior wall painting, cove ceiling, and living room woodwork',
      whatsappMessage:
        'Hello ILAYSATHYA POWER TECH, I am looking for Painting & Interior Work.',
    },
    {
      id: 'demolition-work',
      number: '06',
      title: 'Demolition Work',
      division: 'Civil & Turnkey',
      description:
        'Controlled structural dismantling, old wall removal, site clearing, and debris disposal executed safely around neighboring properties.',
      image: IMAGES.constructionVilla,
      imageAlt: 'Controlled building site clearing and structural preparation',
      whatsappMessage:
        'Hello ILAYSATHYA POWER TECH, I need a site inspection for Demolition Work.',
    },
    {
      id: 'turnkey-projects',
      number: '07',
      title: 'Turnkey Projects',
      division: 'Civil & Turnkey',
      description:
        'Single-point accountability from architectural execution and civil build to solar power, electrical, plumbing, and ready-to-move handover.',
      image: IMAGES.heroSolarResidence,
      imageAlt: 'Completed turnkey modern house with rooftop solar and landscaped entrance',
      whatsappMessage:
        'Hello ILAYSATHYA POWER TECH, I want to discuss a Turnkey Construction Project.',
    },
    {
      id: 'renovation-remodeling',
      number: '08',
      title: 'Renovation & Remodeling',
      division: 'Property & Maintenance',
      description:
        'Kitchen and bathroom upgrades, floor additions, structural alterations, electrical rewiring, and complete home modernizations.',
      image: IMAGES.interiorRenovation,
      imageAlt: 'Renovated contemporary living space with modern flooring and lighting',
      whatsappMessage:
        'Hello ILAYSATHYA POWER TECH, I would like to plan a Renovation & Remodeling project.',
    },
    {
      id: 'real-estate-services',
      number: '09',
      title: 'Real Estate Services',
      division: 'Property & Maintenance',
      description:
        'Local guidance on residential plots, independent homes, site evaluations, and construction-ready properties around Byrathi and Hennur.',
      image: IMAGES.heroSolarResidence,
      imageAlt: 'Modern independent residential property in North Bengaluru',
      whatsappMessage:
        'Hello ILAYSATHYA POWER TECH, I would like to connect regarding Real Estate Services.',
    },
    {
      id: 'building-maintenance',
      number: '10',
      title: 'Building Maintenance',
      division: 'Property & Maintenance',
      description:
        'Ongoing electrical, plumbing, waterproofing, terrace sealing, and power backup upkeep for homes, apartments, and commercial spaces.',
      image: IMAGES.electricalPlumbing,
      imageAlt: 'Building utility maintenance for electrical and plumbing systems',
      whatsappMessage:
        'Hello ILAYSATHYA POWER TECH, I need Building Maintenance services.',
    },
  ],
  projects: [
    {
      id: 'proj-solar-1',
      title: 'Elevated Rooftop Solar Array',
      category: 'Solar Installations',
      location: 'Hennur Bagalur Road, Bengaluru',
      scope: 'Galvanized high-rise terrace structure with DC combiner box and earthing',
      image: IMAGES.solarRooftop,
      imageAlt: 'Elevated rooftop solar panel array in Hennur Bengaluru',
    },
    {
      id: 'proj-ups-1',
      title: 'Hybrid Inverter & Backup Integration',
      category: 'UPS & Inverters',
      location: 'Byrathi, Bengaluru',
      scope: 'Pure sine wave hybrid inverter with dedicated critical-load changeover',
      image: IMAGES.powerUpsLithium,
      imageAlt: 'Hybrid inverter and critical load distribution installation',
    },
    {
      id: 'proj-bat-1',
      title: 'Wall-Mounted LiFePO4 Battery Bank',
      category: 'Battery Products',
      location: 'Kothanur, Bengaluru',
      scope: 'Compact high-cycle lithium iron phosphate storage paired with neat conduit routing',
      image: IMAGES.powerUpsLithium,
      imageAlt: 'LiFePO4 lithium battery bank installed on residential wall',
    },
    {
      id: 'proj-const-1',
      title: 'Multi-Storey Residential Villa Frame',
      category: 'Construction Projects',
      location: 'Byrathi Bande, Bengaluru',
      scope: 'RCC structural columns, brick masonry, and full site civil supervision',
      image: IMAGES.constructionVilla,
      imageAlt: 'Residential villa RCC and brickwork construction site',
    },
    {
      id: 'proj-int-1',
      title: 'Living Area Flooring & Cove Interior',
      category: 'Interior & Renovation',
      location: 'Horamavu, Bengaluru',
      scope: 'Large-format vitrified tiling, false ceiling LED coves, and custom woodwork',
      image: IMAGES.interiorRenovation,
      imageAlt: 'Completed living room interior renovation and flooring work',
    },
    {
      id: 'proj-mep-1',
      title: 'Distribution Board & CPVC Manifold',
      category: 'Electrical & Plumbing',
      location: 'Byrathi, Bengaluru',
      scope: 'Labeled MCB/RCCB electrical panel with surge protection and manifold plumbing',
      image: IMAGES.electricalPlumbing,
      imageAlt: 'Finished residential electrical DB and CPVC plumbing manifold',
    },
  ],
};
