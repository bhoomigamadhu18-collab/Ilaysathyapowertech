import React, { useState } from 'react';
import { Download, ImagePlus, RotateCcw, Trash2, X } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import {
  ProjectCategory,
  ProjectGalleryItem,
  SiteConfig,
} from '../data/siteConfig';

type ManagerTab = 'business' | 'products' | 'services' | 'gallery';

const PROJECT_CATEGORIES: ProjectCategory[] = [
  'Solar Installations',
  'UPS & Inverters',
  'Battery Products',
  'Construction Projects',
  'Interior & Renovation',
  'Electrical & Plumbing',
];

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read image file'));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export const ContentManagerModal: React.FC = () => {
  const { config, updateConfig, resetConfig, isManagerOpen, setManagerOpen } =
    useSiteConfig();

  const [activeTab, setActiveTab] = useState<ManagerTab>('gallery');
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectLocation, setNewProjectLocation] = useState('Byrathi, Bengaluru');
  const [newProjectCategory, setNewProjectCategory] =
    useState<ProjectCategory>('Solar Installations');
  const [newProjectScope, setNewProjectScope] = useState('');
  const [newProjectImage, setNewProjectImage] = useState('');
  const [uploadFeedback, setUploadFeedback] = useState('');

  if (!isManagerOpen) return null;

  const handleFieldChange = <K extends keyof SiteConfig>(
    key: K,
    value: SiteConfig[K]
  ) => {
    updateConfig({ ...config, [key]: value });
  };

  const handleProductUpdate = (
    id: string,
    field: 'name' | 'capacityOrSpec' | 'priceLabel' | 'description' | 'image',
    value: string
  ) => {
    updateConfig({
      ...config,
      products: config.products.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      ),
    });
  };

  const handlePowerServiceUpdate = (
    id: string,
    field: 'title' | 'description',
    value: string
  ) => {
    updateConfig({
      ...config,
      powerServices: config.powerServices.map((s) =>
        s.id === id ? { ...s, [field]: value } : s
      ),
    });
  };

  const handleConstructionServiceUpdate = (
    id: string,
    field: 'title' | 'description',
    value: string
  ) => {
    updateConfig({
      ...config,
      constructionServices: config.constructionServices.map((s) =>
        s.id === id ? { ...s, [field]: value } : s
      ),
    });
  };

  const handleLocalFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onLoaded: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await readFileAsDataUrl(file);
      onLoaded(dataUrl);
      setUploadFeedback(`Loaded "${file.name}"`);
    } catch {
      setUploadFeedback('Could not read the selected image file.');
    }
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectTitle.trim() || !newProjectImage.trim()) {
      setUploadFeedback('Please enter a project title and upload or paste an image.');
      return;
    }

    const nextItem: ProjectGalleryItem = {
      id: `proj-${Date.now()}`,
      title: newProjectTitle.trim(),
      category: newProjectCategory,
      location: newProjectLocation.trim() || 'Byrathi, Bengaluru',
      scope:
        newProjectScope.trim() ||
        'Completed installation and engineering work by ILAYSATHYA POWER TECH.',
      image: newProjectImage.trim(),
      imageAlt: `${newProjectTitle.trim()} in ${newProjectLocation.trim() || 'Bengaluru'}`,
    };

    updateConfig({
      ...config,
      projects: [nextItem, ...config.projects],
    });

    setNewProjectTitle('');
    setNewProjectScope('');
    setNewProjectImage('');
    setUploadFeedback('Added new project photo to gallery.');
  };

  const handleRemoveProject = (id: string) => {
    updateConfig({
      ...config,
      projects: config.projects.filter((p) => p.id !== id),
    });
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ilaysathya-site-config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site Content and Gallery Manager"
      className="fixed inset-0 z-50 bg-[#0B1F3A]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
    >
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-slate-200 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between gap-4 bg-[#F6F8F7]">
          <div>
            <h2 className="font-display text-lg font-bold text-[#0B1F3A]">
              Owner Content &amp; Gallery Manager
            </h2>
            <p className="text-xs text-slate-600">
              Update contact details, business hours, product pricing, service descriptions, or
              upload actual project photos. Changes save locally right away.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setManagerOpen(false)}
            aria-label="Close content manager"
            className="w-10 h-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:text-[#0B1F3A]"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-5 py-2.5 border-b border-slate-200 flex flex-wrap items-center gap-2 bg-white">
          {(
            [
              ['gallery', 'Project Gallery & Photos'],
              ['business', 'Business & Hours'],
              ['products', 'Products & Prices'],
              ['services', 'Service Descriptions'],
            ] as const
          ).map(([tabId, label]) => (
            <button
              key={tabId}
              type="button"
              onClick={() => setActiveTab(tabId)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === tabId
                  ? 'bg-[#0E3A2D] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <form
                onSubmit={handleAddProject}
                className="p-4 rounded-xl bg-[#F6F8F7] border border-slate-200 space-y-4"
              >
                <h3 className="font-display text-sm font-bold text-[#0B1F3A]">
                  Upload New Project Photo
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0B1F3A] mb-1">
                      Project Title
                    </label>
                    <input
                      type="text"
                      value={newProjectTitle}
                      onChange={(e) => setNewProjectTitle(e.target.value)}
                      placeholder="e.g. 5kW Rooftop Solar Setup"
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0B1F3A] mb-1">
                      Category
                    </label>
                    <select
                      value={newProjectCategory}
                      onChange={(e) =>
                        setNewProjectCategory(e.target.value as ProjectCategory)
                      }
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                    >
                      {PROJECT_CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0B1F3A] mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={newProjectLocation}
                      onChange={(e) => setNewProjectLocation(e.target.value)}
                      placeholder="Byrathi, Bengaluru"
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0B1F3A] mb-1">
                      Scope / Summary
                    </label>
                    <input
                      type="text"
                      value={newProjectScope}
                      onChange={(e) => setNewProjectScope(e.target.value)}
                      placeholder="Brief work summary"
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                  <div>
                    <label className="block text-xs font-semibold text-[#0B1F3A] mb-1">
                      Upload Image File (JPG / PNG / WebP)
                    </label>
                    <label className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-[#0B1F3A] bg-white border border-dashed border-slate-400 rounded-lg cursor-pointer hover:bg-slate-50">
                      <ImagePlus className="w-4 h-4 text-[#0E3A2D]" aria-hidden="true" />
                      <span>Choose Photo File</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => handleLocalFileUpload(e, setNewProjectImage)}
                      />
                    </label>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0B1F3A] mb-1">
                      Or Paste Image URL
                    </label>
                    <input
                      type="text"
                      value={newProjectImage}
                      onChange={(e) => setNewProjectImage(e.target.value)}
                      placeholder="/assets/... or https://..."
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>

                {uploadFeedback && (
                  <p className="text-xs font-medium text-[#0E3A2D]">{uploadFeedback}</p>
                )}

                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#0E3A2D] hover:bg-[#145240] rounded-lg"
                >
                  Add to Project Gallery
                </button>
              </form>

              <div className="space-y-2">
                <h3 className="font-display text-sm font-bold text-[#0B1F3A]">
                  Current Gallery Items ({config.projects.length})
                </h3>
                <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
                  {config.projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-3 bg-white flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={proj.image}
                          alt={proj.imageAlt}
                          className="w-12 h-12 rounded-md object-cover bg-slate-100 shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#0B1F3A] truncate">
                            {proj.title}
                          </p>
                          <p className="text-xs text-slate-500 truncate">
                            {proj.category} · {proj.location}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveProject(proj.id)}
                        aria-label={`Remove ${proj.title}`}
                        className="p-2 text-slate-500 hover:text-red-700 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'business' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0B1F3A] mb-1">
                    Primary Phone
                  </label>
                  <input
                    type="text"
                    value={config.primaryPhone}
                    onChange={(e) => handleFieldChange('primaryPhone', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0B1F3A] mb-1">
                    Secondary Phone
                  </label>
                  <input
                    type="text"
                    value={config.secondaryPhone}
                    onChange={(e) => handleFieldChange('secondaryPhone', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0B1F3A] mb-1">
                    WhatsApp Number (with 91 country code)
                  </label>
                  <input
                    type="text"
                    value={config.whatsappNumber}
                    onChange={(e) => handleFieldChange('whatsappNumber', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0B1F3A] mb-1">
                    Primary Tagline
                  </label>
                  <input
                    type="text"
                    value={config.primaryTagline}
                    onChange={(e) => handleFieldChange('primaryTagline', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1F3A] mb-1">
                  Shop / Office Address
                </label>
                <textarea
                  rows={2}
                  value={config.address}
                  onChange={(e) => handleFieldChange('address', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-[#0B1F3A]">Business Hours</p>
                {config.businessHours.map((row, index) => (
                  <div key={row.days} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={row.days}
                      onChange={(e) => {
                        const next = [...config.businessHours];
                        next[index] = { ...row, days: e.target.value };
                        handleFieldChange('businessHours', next);
                      }}
                      className="px-3 py-2 text-sm border border-slate-300 rounded-lg"
                    />
                    <input
                      type="text"
                      value={row.hours}
                      onChange={(e) => {
                        const next = [...config.businessHours];
                        next[index] = { ...row, hours: e.target.value };
                        handleFieldChange('businessHours', next);
                      }}
                      className="px-3 py-2 text-sm border border-slate-300 rounded-lg"
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-2">
                <p className="text-xs font-semibold text-[#0B1F3A]">
                  Social Media Links (Optional — shown in footer when filled)
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {config.socialLinks.map((soc, index) => (
                    <div key={soc.id}>
                      <label className="block text-xs text-slate-600 mb-1">
                        {soc.platform} URL
                      </label>
                      <input
                        type="url"
                        value={soc.url}
                        placeholder={`https://${soc.platform.toLowerCase()}.com/...`}
                        onChange={(e) => {
                          const next = [...config.socialLinks];
                          next[index] = { ...soc, url: e.target.value };
                          handleFieldChange('socialLinks', next);
                        }}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-4">
              {config.products.map((product) => (
                <div
                  key={product.id}
                  className="p-4 rounded-xl border border-slate-200 bg-[#F6F8F7] space-y-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#0B1F3A] mb-1">
                        Product Name
                      </label>
                      <input
                        type="text"
                        value={product.name}
                        onChange={(e) =>
                          handleProductUpdate(product.id, 'name', e.target.value)
                        }
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0B1F3A] mb-1">
                        Capacity / Spec
                      </label>
                      <input
                        type="text"
                        value={product.capacityOrSpec}
                        onChange={(e) =>
                          handleProductUpdate(
                            product.id,
                            'capacityOrSpec',
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0B1F3A] mb-1">
                        Price / Quote Label
                      </label>
                      <input
                        type="text"
                        value={product.priceLabel}
                        onChange={(e) =>
                          handleProductUpdate(product.id, 'priceLabel', e.target.value)
                        }
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0B1F3A] mb-1">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      value={product.description}
                      onChange={(e) =>
                        handleProductUpdate(product.id, 'description', e.target.value)
                      }
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-sm font-bold text-[#0B1F3A] mb-3">
                  Power Solutions Services
                </h3>
                <div className="space-y-3">
                  {config.powerServices.map((srv) => (
                    <div
                      key={srv.id}
                      className="p-3 rounded-lg border border-slate-200 bg-[#F6F8F7] grid grid-cols-1 sm:grid-cols-3 gap-3"
                    >
                      <input
                        type="text"
                        value={srv.title}
                        onChange={(e) =>
                          handlePowerServiceUpdate(srv.id, 'title', e.target.value)
                        }
                        className="px-3 py-2 text-sm font-semibold bg-white border border-slate-300 rounded-lg"
                      />
                      <input
                        type="text"
                        value={srv.description}
                        onChange={(e) =>
                          handlePowerServiceUpdate(srv.id, 'description', e.target.value)
                        }
                        className="sm:col-span-2 px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-display text-sm font-bold text-[#0B1F3A] mb-3">
                  Construction &amp; Real Estate Services
                </h3>
                <div className="space-y-3">
                  {config.constructionServices.map((srv) => (
                    <div
                      key={srv.id}
                      className="p-3 rounded-lg border border-slate-200 bg-[#F6F8F7] grid grid-cols-1 sm:grid-cols-3 gap-3"
                    >
                      <input
                        type="text"
                        value={srv.title}
                        onChange={(e) =>
                          handleConstructionServiceUpdate(srv.id, 'title', e.target.value)
                        }
                        className="px-3 py-2 text-sm font-semibold bg-white border border-slate-300 rounded-lg"
                      />
                      <input
                        type="text"
                        value={srv.description}
                        onChange={(e) =>
                          handleConstructionServiceUpdate(
                            srv.id,
                            'description',
                            e.target.value
                          )
                        }
                        className="sm:col-span-2 px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 border-t border-slate-200 bg-[#F6F8F7] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportJson}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#0B1F3A] bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Export Config JSON</span>
            </button>
            <button
              type="button"
              onClick={resetConfig}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reset Defaults</span>
            </button>
          </div>
          <button
            type="button"
            onClick={() => setManagerOpen(false)}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#0B1F3A] hover:bg-[#132C4E] rounded-lg"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
