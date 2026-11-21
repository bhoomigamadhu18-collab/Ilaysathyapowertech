import React from 'react';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { buildTelUrl, buildWhatsAppUrl } from '../data/siteConfig';
import { ResilientImage } from './ResilientImage';

const DIVISION_BAR = [
  {
    index: '01',
    title: 'UPS, Inverters & Lithium Backup',
    detail: 'Pure sine wave & LiFePO4 storage',
    href: '#power-solutions',
  },
  {
    index: '02',
    title: 'Rooftop Solar Engineering',
    detail: 'On-grid & hybrid PV installations',
    href: '#power-solutions',
  },
  {
    index: '03',
    title: 'Civil & Turnkey Construction',
    detail: 'Structural build to handover',
    href: '#construction',
  },
  {
    index: '04',
    title: 'MEP, Interiors & Real Estate',
    detail: 'Electrical, plumbing & renovation',
    href: '#construction',
  },
];

export const HeroSection: React.FC = () => {
  const { config } = useSiteConfig();

  const whatsappHref = buildWhatsAppUrl(
    config.whatsappNumber,
    `Hello ${config.businessName}, I would like to enquire about your power backup, solar, or construction services.`
  );

  return (
    <section id="home" className="relative bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-14 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Content Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-xs sm:text-sm font-medium tracking-wide text-[#0E3A2D] mb-4 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>{config.primaryTagline}</span>
              <span aria-hidden="true" className="text-[#C49334]">
                ·
              </span>
              <span>{config.secondaryTagline}</span>
              <span aria-hidden="true" className="text-[#C49334]">
                ·
              </span>
              <span className="text-slate-600">Byrathi, Bengaluru</span>
            </p>

            <h1 className="font-display text-[clamp(2.15rem,4vw,3.5rem)] font-extrabold tracking-tight text-[#0B1F3A] leading-[1.1] [text-wrap:balance] mb-5">
              {config.heroHeadline}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
              {config.heroSupportingText}
            </p>

            {/* Clear Conversion CTAs */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
              <a
                href="#power-solutions"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#0E3A2D] hover:bg-[#145240] rounded-lg transition-colors duration-150 whitespace-nowrap min-h-[46px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B1F3A]"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4 text-[#C49334]" aria-hidden="true" />
              </a>

              <a
                href={buildTelUrl(config.primaryPhone)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#0B1F3A] bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors duration-150 whitespace-nowrap min-h-[46px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B1F3A]"
              >
                <Phone className="w-4 h-4 text-[#0E3A2D]" aria-hidden="true" />
                <span>Call Now</span>
                <span className="font-mono tabular-nums text-xs text-slate-600">
                  {config.primaryPhone}
                </span>
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#0B1F3A] bg-[#C49334]/15 hover:bg-[#C49334]/25 border border-[#C49334]/40 rounded-lg transition-colors duration-150 whitespace-nowrap min-h-[46px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E3A2D]"
              >
                <MessageCircle className="w-4 h-4 text-[#0E3A2D]" aria-hidden="true" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-600">
              <span>
                Serving:{' '}
                <strong className="font-semibold text-[#0B1F3A]">
                  Byrathi, Hennur &amp; Bengaluru
                </strong>
              </span>
              <span aria-hidden="true" className="text-slate-300">
                |
              </span>
              <span>
                Direct Line 2:{' '}
                <a
                  href={buildTelUrl(config.secondaryPhone)}
                  className="font-mono tabular-nums font-semibold text-[#0B1F3A] hover:text-[#0E3A2D] underline underline-offset-4 decoration-slate-300"
                >
                  {config.secondaryPhone}
                </a>
              </span>
            </div>
          </div>

          {/* Right Media Column */}
          <div className="lg:col-span-6 flex">
            <div className="relative w-full min-h-[280px] sm:min-h-[360px] lg:h-full rounded-xl overflow-hidden border border-slate-200 bg-[#0B1F3A]">
              <ResilientImage
                src={config.heroImage}
                alt={config.heroImageAlt}
                loading="eager"
                variant="power"
                fallbackTitle="ILAYSATHYA POWER TECH — Solar, UPS & Construction"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/85 via-[#0B1F3A]/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white">
                <p className="text-xs font-medium tracking-wide text-[#E6C47A] mb-1">
                  Integrated Residential &amp; Commercial Engineering
                </p>
                <p className="text-sm sm:text-base font-semibold text-white">
                  Rooftop Solar · Lithium &amp; UPS Backup · Civil Construction &amp; Interiors
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Division Overview Strip */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200 rounded-xl divide-y sm:divide-y-0 sm:divide-x divide-slate-200 bg-[#F6F8F7]">
          {DIVISION_BAR.map((item) => (
            <a
              key={item.index}
              href={item.href}
              className="group p-5 hover:bg-white transition-colors duration-150 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono tabular-nums text-xs font-semibold text-[#9A6F1C]">
                  {item.index}
                </span>
                <ArrowRight
                  className="w-4 h-4 text-slate-400 group-hover:text-[#0E3A2D] group-hover:translate-x-0.5 transition-transform duration-150"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#0B1F3A] group-hover:text-[#0E3A2D] transition-colors">
                  {item.title}
                </h2>
                <p className="text-xs text-slate-600 mt-1">{item.detail}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
