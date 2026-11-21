import React, { useState } from 'react';
import { Check, MessageCircle, Phone } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import {
  buildTelUrl,
  buildWhatsAppUrl,
  ProductCategory,
} from '../data/siteConfig';
import { ResilientImage } from './ResilientImage';

const PRODUCT_FILTERS: Array<'All' | ProductCategory> = [
  'All',
  'UPS Systems',
  'Inverters',
  'Lithium Batteries',
  'Solar Panels',
  'Accessories',
];

export const PowerSolutionsSection: React.FC = () => {
  const { config } = useSiteConfig();
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProductCategory>('All');

  const filteredProducts =
    selectedCategory === 'All'
      ? config.products
      : config.products.filter((p) => p.category === selectedCategory);

  return (
    <section id="power-solutions" className="py-16 lg:py-24 bg-[#F6F8F7] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-slate-200">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-[#0E3A2D] mb-2">
              ILAYSATHYA POWER TECH · Power &amp; Energy Division
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1F3A] [text-wrap:balance]">
              Reliable Power Backup, Lithium Storage &amp; Solar Installations
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Dedicated UPS dealers, inverter servicing, lithium battery systems, and rooftop solar
              engineering serving Byrathi, Hennur, and Bengaluru homes and businesses.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={buildTelUrl(config.primaryPhone)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#0B1F3A] bg-white border border-slate-300 hover:border-[#0B1F3A] rounded-lg transition-colors whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-[#0E3A2D]" aria-hidden="true" />
              <span>Consult Power Team</span>
            </a>
          </div>
        </div>

        {/* 7 Power Services Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.powerServices.map((service, idx) => {
            const isLeadCard = idx === 0;
            return (
              <article
                key={service.id}
                className={`bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between transition-shadow duration-150 hover:shadow-md ${
                  isLeadCard ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div>
                  <div
                    className={`relative overflow-hidden bg-[#0B1F3A] ${
                      isLeadCard ? 'aspect-[16/9] lg:aspect-[21/9]' : 'aspect-[4/3]'
                    }`}
                  >
                    <ResilientImage
                      src={service.image}
                      alt={service.imageAlt}
                      variant="power"
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
                      <span>{service.subtitle}</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#0B1F3A] mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-1.5">
                      {service.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-xs font-medium text-slate-700"
                        >
                          <Check
                            className="w-3.5 h-3.5 text-[#0E3A2D] shrink-0"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <a
                    href={buildWhatsAppUrl(config.whatsappNumber, service.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#0E3A2D] hover:bg-[#145240] rounded-lg transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 text-[#C49334]" aria-hidden="true" />
                    <span>Enquire on WhatsApp</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Product Showcase Subsection */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#0E3A2D] mb-1">
                Power Equipment Catalogue
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1F3A]">
                UPS Systems, Inverters, Lithium Batteries &amp; Solar Panels
              </h3>
            </div>

            {/* Functional Filter Tabs */}
            <div
              role="tablist"
              aria-label="Filter power products by category"
              className="flex flex-wrap items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-lg"
            >
              {PRODUCT_FILTERS.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 min-h-[36px] ${
                      active
                        ? 'bg-[#0B1F3A] text-white'
                        : 'text-slate-600 hover:text-[#0B1F3A] hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] bg-[#0B1F3A] overflow-hidden">
                    <ResilientImage
                      src={product.image}
                      alt={product.imageAlt}
                      variant="power"
                      fallbackTitle={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-2">
                      <span>{product.category}</span>
                      <span className="font-mono tabular-nums font-medium text-[#0E3A2D]">
                        {product.capacityOrSpec}
                      </span>
                    </div>
                    <h4 className="font-display text-lg font-bold text-[#0B1F3A] mb-2">
                      {product.name}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold text-[#9A6F1C] font-mono tabular-nums">
                    {product.priceLabel}
                  </span>
                  <a
                    href={buildWhatsAppUrl(config.whatsappNumber, product.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0B1F3A] hover:bg-[#132C4E] rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#C49334]" aria-hidden="true" />
                    <span>Get Quote</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
