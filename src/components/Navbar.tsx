import React, { useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { buildTelUrl } from '../data/siteConfig';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Power Solutions', href: '#power-solutions' },
  { label: 'Construction', href: '#construction' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact Us', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const { config } = useSiteConfig();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Clean single-line Brand Wordmark */}
        <a
          href="#home"
          className="font-display text-base sm:text-lg font-extrabold tracking-tight text-[#0B1F3A] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0E3A2D]"
        >
          {config.businessName}
        </a>

        {/* Zone 2: Single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="py-1 text-slate-700 hover:text-[#0E3A2D] border-b-2 border-transparent hover:border-[#C49334] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0E3A2D]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={buildTelUrl(config.primaryPhone)}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0E3A2D] hover:bg-[#145240] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[40px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B1F3A]"
          >
            <Phone className="w-3.5 h-3.5 text-[#C49334]" aria-hidden="true" />
            <span>Call Now</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-slate-200 text-[#0B1F3A] hover:bg-slate-50 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Mobile Navigation"
          className="lg:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-1 shadow-lg"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
              className="block px-3 py-3 text-base font-medium text-[#0B1F3A] hover:bg-[#F6F8F7] hover:text-[#0E3A2D] rounded-lg transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3 mt-3 border-t border-slate-200 flex flex-col sm:flex-row gap-2">
            <a
              href={buildTelUrl(config.primaryPhone)}
              onClick={handleLinkClick}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-[#0E3A2D] rounded-lg"
            >
              <Phone className="w-4 h-4 text-[#C49334]" aria-hidden="true" />
              <span className="font-mono tabular-nums">{config.primaryPhone}</span>
            </a>
            <a
              href={buildTelUrl(config.secondaryPhone)}
              onClick={handleLinkClick}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[#0B1F3A] border border-slate-300 rounded-lg"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span className="font-mono tabular-nums">{config.secondaryPhone}</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
