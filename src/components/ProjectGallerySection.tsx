import React, { useState } from 'react';
import { Expand, MapPin, MessageCircle, Plus, X } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import {
  buildWhatsAppUrl,
  ProjectCategory,
  ProjectGalleryItem,
} from '../data/siteConfig';
import { ResilientImage } from './ResilientImage';

const GALLERY_CATEGORIES: Array<'All' | ProjectCategory> = [
  'All',
  'Solar Installations',
  'UPS & Inverters',
  'Battery Products',
  'Construction Projects',
  'Interior & Renovation',
  'Electrical & Plumbing',
];

export const ProjectGallerySection: React.FC = () => {
  const { config, setManagerOpen } = useSiteConfig();
  const [activeCategory, setActiveCategory] = useState<'All' | ProjectCategory>('All');
  const [lightboxItem, setLightboxItem] = useState<ProjectGalleryItem | null>(null);

  const visibleProjects =
    activeCategory === 'All'
      ? config.projects
      : config.projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-16 lg:py-24 bg-[#F6F8F7] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-[#0E3A2D] mb-2">
              Project Gallery &amp; Installations
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1F3A] [text-wrap:balance]">
              Power Systems, Construction &amp; Renovation Showcase
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Explore representative installations across solar rooftops, UPS &amp; battery
              systems, civil structures, interiors, and electrical-plumbing setups. Replace or
              upload actual site photos anytime via the content manager.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setManagerOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#0B1F3A] bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors whitespace-nowrap shrink-0 self-start lg:self-auto"
          >
            <Plus className="w-4 h-4 text-[#0E3A2D]" aria-hidden="true" />
            <span>Upload Project Photos</span>
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter project gallery by category"
          className="mt-6 flex flex-wrap items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-lg w-fit max-w-full"
        >
          {GALLERY_CATEGORIES.map((category) => {
            const active = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 min-h-[36px] ${
                  active
                    ? 'bg-[#0B1F3A] text-white'
                    : 'text-slate-600 hover:text-[#0B1F3A] hover:bg-slate-50'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        {visibleProjects.length === 0 ? (
          <div className="mt-10 p-10 bg-white border border-slate-200 rounded-xl text-center">
            <p className="text-base font-semibold text-[#0B1F3A] mb-2">
              No projects listed under {activeCategory} yet
            </p>
            <p className="text-sm text-slate-600 mb-4">
              Add a photograph for this category using the Project Photo Uploader.
            </p>
            <button
              type="button"
              onClick={() => setManagerOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#0E3A2D] rounded-lg"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span>Add Project Photo</span>
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProjects.map((item) => (
              <article
                key={item.id}
                className="group bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between transition-shadow duration-150 hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => setLightboxItem(item)}
                  aria-label={`Inspect ${item.title}`}
                  className="relative aspect-[4/3] w-full bg-[#0B1F3A] overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E3A2D]"
                >
                  <ResilientImage
                    src={item.image}
                    alt={item.imageAlt}
                    variant={
                      item.category === 'Construction Projects' ||
                      item.category === 'Interior & Renovation'
                        ? 'construction'
                        : 'power'
                    }
                    fallbackTitle={item.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                  />
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-[#0B1F3A]/80 text-white flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                    <Expand className="w-4 h-4" aria-hidden="true" />
                  </div>
                </button>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-1.5">
                      <span className="font-medium text-[#0E3A2D]">{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#9A6F1C]" aria-hidden="true" />
                        <span>{item.location}</span>
                      </span>
                    </div>
                    <h3 className="font-display text-base font-bold text-[#0B1F3A] mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.scope}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.title}
          className="fixed inset-0 z-50 bg-[#0B1F3A]/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="bg-white rounded-xl max-w-3xl w-full overflow-hidden border border-slate-200 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
              <div>
                <p className="text-xs font-medium text-[#0E3A2D]">
                  {lightboxItem.category} · {lightboxItem.location}
                </p>
                <h3 className="font-display text-lg font-bold text-[#0B1F3A]">
                  {lightboxItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                aria-label="Close project preview"
                className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#0B1F3A] hover:bg-slate-50"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="aspect-[16/10] bg-[#0B1F3A]">
              <ResilientImage
                src={lightboxItem.image}
                alt={lightboxItem.imageAlt}
                fallbackTitle={lightboxItem.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-sm text-slate-700">{lightboxItem.scope}</p>
              <a
                href={buildWhatsAppUrl(
                  config.whatsappNumber,
                  `Hello ${config.businessName}, I saw "${lightboxItem.title}" in your project gallery and would like a similar quote.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#0E3A2D] hover:bg-[#145240] rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-4 h-4 text-[#C49334]" aria-hidden="true" />
                <span>Request Similar Quote</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
