import React from 'react';
import {
  Building2,
  CheckCircle2,
  Headphones,
  Layers,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { buildWhatsAppUrl } from '../data/siteConfig';
import { ResilientImage } from './ResilientImage';

const WHY_CHOOSE_ITEMS = [
  {
    number: '01',
    title: 'Multiple Services Under One Roof',
    description:
      'Coordinate civil construction, electrical wiring, plumbing, interiors, rooftop solar, and UPS backup through a single accountable local team.',
    icon: Layers,
  },
  {
    number: '02',
    title: 'Customer-Focused Approach',
    description:
      'Every project starts with a practical site evaluation and honest guidance tailored to your home layout, load requirements, and budget.',
    icon: Users,
  },
  {
    number: '03',
    title: 'Quality Products & Workmanship',
    description:
      'We supply reliable batteries, inverters, and solar hardware paired with neat, code-conscious electrical, plumbing, and civil execution.',
    icon: ShieldCheck,
  },
  {
    number: '04',
    title: 'Reliable Technical Support',
    description:
      'Accessible local support from our Byrathi office for installation commissioning, preventive maintenance, battery replacement, and troubleshooting.',
    icon: Headphones,
  },
  {
    number: '05',
    title: 'Residential & Commercial Solutions',
    description:
      'Configured for independent villas, apartments, clinics, retail stores, offices, and commercial properties across Hennur and Bengaluru.',
    icon: Building2,
  },
  {
    number: '06',
    title: 'Commitment to Customer Satisfaction',
    description:
      'Transparent communication, tidy work sites, and dedicated follow-through from initial enquiry to final handover.',
    icon: CheckCircle2,
  },
];

export const AboutWhySection: React.FC = () => {
  const { config } = useSiteConfig();

  return (
    <section id="about" className="bg-[#0B1F3A] text-white border-b border-slate-800">
      {/* About Us Split */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-xs font-semibold tracking-wider text-[#E6C47A] mb-3">
              About {config.businessName}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance] mb-5">
              Building Trust Through Quality and Commitment.
            </h2>
            <div className="space-y-4 text-slate-200 text-base leading-relaxed">
              <p>
                {config.businessName} is an integrated engineering and contracting partner based in
                Byrathi, Bengaluru—bringing together power technology, solar energy, electrical
                systems, plumbing, civil construction, renovation, and real estate services under
                one roof.
              </p>
              <p>
                Whether a homeowner needs uninterrupted lithium or UPS power backup, a rooftop
                solar installation on Hennur Bagalur Road, or a complete residential build and
                interior finish, our team eliminates the stress of coordinating separate
                contractors.
              </p>
              <p>
                We focus on clean workmanship, practical engineering, transparent pricing, and
                dependable after-sales service so your power systems and built spaces perform
                smoothly year after year.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <p className="text-xs font-medium text-[#E6C47A]">Power &amp; Solar</p>
                <p className="text-sm font-semibold text-white mt-1">
                  UPS, Inverters, Lithium &amp; PV Systems
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-[#E6C47A]">Civil &amp; MEP</p>
                <p className="text-sm font-semibold text-white mt-1">
                  Construction, Electrical &amp; Plumbing
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-[#E6C47A]">Spaces &amp; Property</p>
                <p className="text-sm font-semibold text-white mt-1">
                  Interiors, Remodeling &amp; Real Estate
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex">
            <div className="relative w-full min-h-[280px] sm:min-h-[340px] lg:h-full rounded-xl overflow-hidden border border-white/15 bg-[#132C4E]">
              <ResilientImage
                src={config.constructionServices[0]?.image || config.heroImage}
                alt="Civil engineering and integrated residential project execution in Bengaluru"
                variant="construction"
                fallbackTitle="ILAYSATHYA POWER TECH — Quality Workmanship"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 p-6">
                <p className="text-xs font-medium text-[#E6C47A] mb-1">
                  {config.primaryTagline}
                </p>
                <p className="text-sm font-semibold text-white">
                  Serving Byrathi, Hennur Bagalur Road, Kothanur, Horamavu &amp; Bengaluru
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Grid */}
        <div className="mt-16 pt-14 border-t border-white/15">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#E6C47A] mb-2">
                Why Choose Us
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Practical Execution &amp; Single-Point Accountability
              </h3>
            </div>
            <a
              href={buildWhatsAppUrl(
                config.whatsappNumber,
                `Hello ${config.businessName}, I would like to schedule a site consultation.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[#E6C47A] hover:text-white underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Schedule a site visit via WhatsApp →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_ITEMS.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.number}
                  className="p-6 rounded-xl bg-[#132C4E]/80 border border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono tabular-nums text-xs font-semibold text-[#E6C47A]">
                        {item.number}
                      </span>
                      <IconComponent
                        className="w-5 h-5 text-[#E6C47A]"
                        aria-hidden="true"
                      />
                    </div>
                    <h4 className="font-display text-lg font-bold text-white mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
