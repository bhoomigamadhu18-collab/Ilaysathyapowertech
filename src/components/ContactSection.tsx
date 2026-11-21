import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { buildTelUrl, buildWhatsAppUrl } from '../data/siteConfig';

const SERVICE_OPTIONS = [
  'UPS Sales & Services',
  'Inverter Sales & Services',
  'Lithium Battery Solutions',
  'Solar Panel Installation',
  'Battery Sales & Replacement',
  'Electrical Power Solutions',
  'Power Backup Maintenance',
  'Civil Construction Work',
  'Electrical & Plumbing Work',
  'Tiles, Painting & Interior Work',
  'Turnkey Projects / Renovation',
  'Real Estate & Building Maintenance',
];

interface FormErrors {
  name?: string;
  phone?: string;
  service?: string;
  message?: string;
}

export const ContactSection: React.FC = () => {
  const { config } = useSiteConfig();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(SERVICE_OPTIONS[0]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    phone: string;
    service: string;
    message: string;
  } | null>(null);

  const mapQuery = encodeURIComponent(
    'Shop No. 190, Krishna Nagar, Byrathi Bande, Hennur Bagalur Road, Byrathi, Bengaluru 560077'
  );
  const mapEmbedUrl = `https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const mapExternalUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    const trimmedName = name.trim();
    const digits = phone.replace(/\D/g, '');
    const trimmedMsg = message.trim();

    if (trimmedName.length < 2) {
      nextErrors.name = 'Please enter your name (at least 2 characters).';
    }
    if (digits.length < 10 || digits.length > 13) {
      nextErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }
    if (!service) {
      nextErrors.service = 'Please select a service category.';
    }
    if (trimmedMsg.length < 10) {
      nextErrors.message = 'Please include brief details about your requirement (10+ characters).';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmittedData({
      name: name.trim(),
      phone: phone.trim(),
      service,
      message: message.trim(),
    });
    setName('');
    setPhone('');
    setMessage('');
    setErrors({});
  };

  const getWhatsAppFromSubmission = () => {
    if (!submittedData) return '#';
    const text = `New Website Enquiry:\nName: ${submittedData.name}\nPhone: ${submittedData.phone}\nService: ${submittedData.service}\nDetails: ${submittedData.message}`;
    return buildWhatsAppUrl(config.whatsappNumber, text);
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold tracking-wider text-[#0E3A2D] mb-2">
            Contact &amp; Site Enquiry
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1F3A] [text-wrap:balance]">
            Visit Our Byrathi Office or Request a Quote
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Reach us directly by phone, WhatsApp, or the enquiry form below for site surveys,
            UPS/solar pricing, and construction estimates across Bengaluru.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Contact Info + Business Hours + Google Map */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-8 rounded-xl bg-[#F6F8F7] border border-slate-200 space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#0E3A2D] text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#C49334]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0B1F3A] mb-1">Office Address</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{config.address}</p>
                  <a
                    href={mapExternalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-[#0E3A2D] hover:underline"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="pt-5 border-t border-slate-200 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#0B1F3A] text-white flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#C49334]" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-[#0B1F3A] mb-2">
                    Call or WhatsApp Directly
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={buildTelUrl(config.primaryPhone)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold font-mono tabular-nums text-white bg-[#0E3A2D] hover:bg-[#145240] rounded-lg transition-colors"
                    >
                      <Phone className="w-4 h-4 text-[#C49334]" aria-hidden="true" />
                      <span>{config.primaryPhone}</span>
                    </a>
                    <a
                      href={buildTelUrl(config.secondaryPhone)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold font-mono tabular-nums text-[#0B1F3A] bg-white border border-slate-300 hover:border-[#0B1F3A] rounded-lg transition-colors"
                    >
                      <Phone className="w-4 h-4 text-[#0E3A2D]" aria-hidden="true" />
                      <span>{config.secondaryPhone}</span>
                    </a>
                  </div>
                  <div className="mt-3">
                    <a
                      href={buildWhatsAppUrl(
                        config.whatsappNumber,
                        `Hello ${config.businessName}, I would like to connect regarding your services.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E3A2D] hover:text-[#0B1F3A]"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Start WhatsApp Chat (+{config.whatsappNumber})</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="pt-5 border-t border-slate-200 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 text-[#0B1F3A] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#0E3A2D]" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-[#0B1F3A] mb-2">Business Hours</h3>
                  <dl className="space-y-1.5 text-sm">
                    {config.businessHours.map((row) => (
                      <div
                        key={row.days}
                        className="flex flex-col sm:flex-row sm:justify-between gap-1 text-slate-700"
                      >
                        <dt className="font-medium text-[#0B1F3A]">{row.days}</dt>
                        <dd className="text-slate-600 tabular-nums">{row.hours}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 h-64 sm:h-72">
              <iframe
                title="ILAYSATHYA POWER TECH Location Map — Byrathi, Hennur Bagalur Road, Bengaluru"
                src={mapEmbedUrl}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: Contact Enquiry Form */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 shadow-sm">
              <h3 className="font-display text-2xl font-bold text-[#0B1F3A] mb-2">
                Send an Enquiry
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                Tell us what you need and our engineering or construction team will respond
                promptly.
              </p>

              {submittedData ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="p-6 rounded-xl bg-[#F6F8F7] border border-[#0E3A2D]/30 space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-6 h-6 text-[#0E3A2D] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <h4 className="font-display text-lg font-bold text-[#0B1F3A]">
                        Enquiry Ready for {submittedData.name}
                      </h4>
                      <p className="text-sm text-slate-600 mt-1">
                        Thank you for reaching out about{' '}
                        <strong className="text-[#0B1F3A]">{submittedData.service}</strong>. Send
                        this request directly to our WhatsApp desk for the fastest callback, or
                        call us on{' '}
                        <a
                          href={buildTelUrl(config.primaryPhone)}
                          className="font-mono font-semibold text-[#0E3A2D] underline"
                        >
                          {config.primaryPhone}
                        </a>
                        .
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      href={getWhatsAppFromSubmission()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#0E3A2D] hover:bg-[#145240] rounded-lg transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-[#C49334]" aria-hidden="true" />
                      <span>Send via WhatsApp Now</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmittedData(null)}
                      className="px-4 py-3 text-sm font-semibold text-[#0B1F3A] bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                      New Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <label
                      htmlFor="enquiry-name"
                      className="block text-sm font-semibold text-[#0B1F3A] mb-1.5"
                    >
                      Full Name <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="enquiry-name"
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      aria-invalid={Boolean(errors.name)}
                      className="w-full px-4 py-3 text-sm text-[#0B1F3A] bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0E3A2D] focus:ring-2 focus:ring-[#0E3A2D]/20"
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs font-medium text-red-700">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-phone"
                      className="block text-sm font-semibold text-[#0B1F3A] mb-1.5"
                    >
                      Phone / WhatsApp Number <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="enquiry-phone"
                      name="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 98450 00000"
                      aria-invalid={Boolean(errors.phone)}
                      className="w-full px-4 py-3 text-sm text-[#0B1F3A] font-mono bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0E3A2D] focus:ring-2 focus:ring-[#0E3A2D]/20"
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs font-medium text-red-700">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-service"
                      className="block text-sm font-semibold text-[#0B1F3A] mb-1.5"
                    >
                      Service Category <span className="text-red-700">*</span>
                    </label>
                    <select
                      id="enquiry-service"
                      name="service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 text-sm text-[#0B1F3A] bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0E3A2D] focus:ring-2 focus:ring-[#0E3A2D]/20"
                    >
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-message"
                      className="block text-sm font-semibold text-[#0B1F3A] mb-1.5"
                    >
                      Project or Requirement Details <span className="text-red-700">*</span>
                    </label>
                    <textarea
                      id="enquiry-message"
                      name="message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share your location (e.g., Byrathi / Hennur), capacity or site details..."
                      aria-invalid={Boolean(errors.message)}
                      className="w-full px-4 py-3 text-sm text-[#0B1F3A] bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0E3A2D] focus:ring-2 focus:ring-[#0E3A2D]/20 resize-y"
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs font-medium text-red-700">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#0E3A2D] hover:bg-[#145240] rounded-lg transition-colors duration-150 min-h-[46px]"
                  >
                    <Send className="w-4 h-4 text-[#C49334]" aria-hidden="true" />
                    <span>Submit Enquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
