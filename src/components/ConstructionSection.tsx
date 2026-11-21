import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import {
  buildWhatsAppUrl,
  ConstructionDivision,
} from '../data/siteConfig';
import { ResilientImage } from './ResilientImage';

const DIVISION_FILTERS: Array<'All Services' | ConstructionDivision> = [
  'All Services',
  'Civil & Turnkey',
  'MEP & Finishes',
  'Property & Maintenance',
];

export const ConstructionSection: React.FC = () => {
  const { config } = useSiteConfig();
  const [selectedDivision, setSelectedDivision] = useState<
    'All Services' | ConstructionDivision
  >('All Services');

  const filteredServices =
    selectedDivision === 'All Services'
      ? config.constructionServices
      : config.constructionServices.filter((s) => s.division === selectedDivision);

  return (
    <section id="construction" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-slate-200">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-[#0E3A2D] mb-2">
              Construction, MEP &amp; Real Estate Division
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1F3A] [text-wrap:balance]">
              Complete Civil Construction, Renovation &amp; Property Solutions
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              From ground-up civil contracting and electrical-plumbing execution to interior
              remodeling and real estate support across Byrathi, Hennur, and North Bengaluru.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter construction services by division"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F6F8F7] border border-slate-200 rounded-lg shrink-0"
          >
            {DIVISION_FILTERS.map((division) => {
              const active = selectedDivision === division;
              return (
                <button
                  key={division}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedDivision(division)}
                  className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 min-h-[36px] ${
                    active
                      ? 'bg-[#0E3A2D] text-white'
                      : 'text-slate-600 hover:text-[#0B1F3A] hover:bg-white'
                  }`}
                >
                  {division}
                </button>
              );
            })}
          </div>
        </div>

        {/* 10 Construction & Real Estate Service Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <article
              key={service.id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between transition-shadow duration-150 hover:shadow-md"
            >
              <div>
                <div className="aspect-[4/3] bg-[#0B1F3A] overflow-hidden">
                  <ResilientImage
                    src={service.image}
                    alt={service.imageAlt}
                    variant="construction"
                    fallbackTitle={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <span className="font-mono tabular-nums font-semibold text-[#9A6F1C]">
                      {service.number}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{service.division}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#0B1F3A] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-slate-100">
                <a
                  href={buildWhatsAppUrl(config.whatsappNumber, service.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#0B1F3A] bg-[#F6F8F7] hover:bg-[#0E3A2D] hover:text-white border border-slate-200 hover:border-[#0E3A2D] rounded-lg transition-colors duration-150 whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 text-[#C49334]" aria-hidden="true" />
                  <span>WhatsApp Enquiry</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
