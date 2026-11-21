import React from 'react';
import { ExternalLink, Phone, Settings2 } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { buildTelUrl, buildWhatsAppUrl } from '../data/siteConfig';

export const Footer: React.FC = () => {
  const { config, setManagerOpen } = useSiteConfig();

  const configuredSocials = config.socialLinks.filter((s) => s.url.trim().length > 0);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1F3A] text-slate-200 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-white/10">
          {/* Brand Summary */}
          <div className="lg:col-span-4 space-y-3">
            <h2 className="font-display text-lg font-extrabold tracking-tight text-white">
              {config.businessName}
            </h2>
            <p className="text-xs font-medium text-[#E6C47A]">
              {config.primaryTagline} · {config.secondaryTagline}
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Integrated provider of UPS &amp; inverter systems, lithium batteries, rooftop solar
              installations, civil construction, electrical, plumbing, interiors, and real estate
              services in Byrathi, Bengaluru.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold tracking-wider text-white mb-3">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="hover:text-[#E6C47A] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#E6C47A] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#power-solutions" className="hover:text-[#E6C47A] transition-colors">
                  Power Solutions
                </a>
              </li>
              <li>
                <a href="#construction" className="hover:text-[#E6C47A] transition-colors">
                  Construction
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#E6C47A] transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#E6C47A] transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Local Service Areas */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold tracking-wider text-white mb-3">
              Service Areas in Bengaluru
            </h3>
            <ul className="space-y-1.5 text-sm text-slate-300">
              {config.serviceAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>

          {/* Contact & Configurable Socials */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold tracking-wider text-white mb-3">
              Direct Contact
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{config.address}</p>
            <div className="flex flex-col gap-1.5 text-sm font-mono tabular-nums">
              <a
                href={buildTelUrl(config.primaryPhone)}
                className="inline-flex items-center gap-2 text-white hover:text-[#E6C47A] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#E6C47A]" aria-hidden="true" />
                <span>{config.primaryPhone}</span>
              </a>
              <a
                href={buildTelUrl(config.secondaryPhone)}
                className="inline-flex items-center gap-2 text-white hover:text-[#E6C47A] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#E6C47A]" aria-hidden="true" />
                <span>{config.secondaryPhone}</span>
              </a>
            </div>
            <div className="pt-1">
              <a
                href={buildWhatsAppUrl(
                  config.whatsappNumber,
                  `Hello ${config.businessName}, I would like to request information.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#E6C47A] hover:text-white underline underline-offset-4"
              >
                WhatsApp Enquiry (+{config.whatsappNumber})
              </a>
            </div>

            {configuredSocials.length > 0 && (
              <div className="pt-2 flex flex-wrap gap-3">
                {configuredSocials.map((soc) => (
                  <a
                    key={soc.id}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-slate-200 hover:text-[#E6C47A]"
                  >
                    <span>{soc.platform}</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Legal & Owner Content Manager Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {currentYear} {config.businessName}. Byrathi, Bengaluru – 560077. All rights
            reserved.
          </p>

          <button
            type="button"
            onClick={() => setManagerOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-white/15 text-slate-200 hover:text-white hover:border-[#E6C47A] transition-colors"
          >
            <Settings2 className="w-3.5 h-3.5 text-[#E6C47A]" aria-hidden="true" />
            <span>Manage Content &amp; Photos</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
