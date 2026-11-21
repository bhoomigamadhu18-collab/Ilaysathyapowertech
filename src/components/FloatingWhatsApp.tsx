import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { buildWhatsAppUrl } from '../data/siteConfig';

export const FloatingWhatsApp: React.FC = () => {
  const { config } = useSiteConfig();

  const href = buildWhatsAppUrl(
    config.whatsappNumber,
    `Hello ${config.businessName}, I am visiting your website and would like to enquire about your services.`
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with ILAYSATHYA POWER TECH on WhatsApp"
      className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#0E3A2D] hover:bg-[#145240] text-white shadow-lg border border-[#C49334]/50 transition-transform duration-150 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B1F3A]"
    >
      <MessageCircle className="w-5 h-5 text-[#E6C47A] shrink-0" aria-hidden="true" />
      <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">
        WhatsApp Us
      </span>
    </a>
  );
};
