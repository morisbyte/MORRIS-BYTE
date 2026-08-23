import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Upload, 
  Send, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  FileText
} from 'lucide-react';
import { SiteSettings } from '../types';
import { INITIAL_SITE_SETTINGS } from '../data/initialData';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';
import { SectionHeading } from '../components/common/SectionHeading';

interface ContactPageProps {
  settings?: SiteSettings | null;
  navigate?: (route: string) => void;
  onInquirySubmitted?: () => void;
  onInquirySuccess?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ 
  settings = INITIAL_SITE_SETTINGS, 
  navigate,
  onInquirySubmitted,
  onInquirySuccess
}) => {
  const currentSettings = settings || INITIAL_SITE_SETTINGS;
  const { success, error } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    projectType: 'Commercial Superstructure',
    estimatedBudget: '$50M - $150M',
    expectedTimeline: '24 - 36 Months',
    description: '',
    attachmentUrl: ''
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.description) {
      error('Required Fields Missing', 'Please fill in your name, corporate email, and project scope.');
      return;
    }

    setLoading(true);
    try {
      let attachmentUrl = '';
      if (selectedFile) {
        // Upload media or create simulated attachment link
        attachmentUrl = `https://storage.aureliaconstruct.com/uploads/${encodeURIComponent(selectedFile.name)}`;
      }

      await api.createInquiry({
        ...formData,
        attachmentUrl
      });

      setSubmitted(true);
      success('Proposal Received', 'Your project brief has been logged with our Global Director of Procurement.');
      if (onInquirySubmitted) onInquirySubmitted();
    } catch (err: any) {
      error('Submission Failed', err.message || 'Unable to submit RFP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full bg-[#F4F1EA] text-[#111315] pt-20 sm:pt-24">
      {/* 1. Hero Header */}
      <section className="relative py-20 sm:py-28 bg-[#F4F1EA] border-b border-[#D9D7D0] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-[#DC2626]" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#DC2626]">
                Project Procurement & Global Inquiries
              </span>
            </div>
            <h1 className="mt-2 text-3xl sm:text-5xl lg:text-6xl font-black font-display text-[#111315] tracking-tight leading-[1.05]">
              Initiate your <br />
              <span className="stroke-text-dark">project dialogue.</span>
            </h1>
            <p className="mt-6 text-base sm:text-xl text-[#5A5C58] font-normal leading-relaxed">
              Submit a preliminary brief, request an EPC proposal, or contact one of our four strategic operational directorates.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main RFP & Contact Form Section */}
      <section className="py-20 sm:py-28 bg-[#F4F1EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: The Comprehensive RFP Builder */}
            <div className="lg:col-span-8 bg-white border border-[#D9D7D0] p-8 sm:p-12 shadow-sm">
              <div className="mb-8">
                <span className="text-xs font-mono text-[#DC2626] uppercase tracking-widest block mb-1 font-bold">
                  Procurement Form // Step 01
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-display text-[#111315]">
                  Start A Project Proposal (RFP)
                </h2>
                <p className="text-xs sm:text-sm text-[#5A5C58] mt-2">
                  All submissions are handled under strict non-disclosure terms by our executive engineering panel.
                </p>
              </div>

              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 bg-[#F4F1EA] border border-[#DC2626] text-[#DC2626] flex items-center justify-center mx-auto rounded-full">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black font-display text-[#111315]">Proposal Brief Confirmed</h3>
                  <p className="text-sm text-[#5A5C58] max-w-md mx-auto">
                    Thank you, {formData.name}. Our commercial estimating team will evaluate your scope specifications and contact you within 24 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        company: '',
                        email: '',
                        phone: '',
                        country: '',
                        projectType: 'Commercial Superstructure',
                        estimatedBudget: '$50M - $150M',
                        expectedTimeline: '24 - 36 Months',
                        description: '',
                        attachmentUrl: ''
                      });
                      setSelectedFile(null);
                    }}
                    className="mt-6 px-6 py-2.5 bg-[#111315] hover:bg-[#DC2626] text-xs font-bold uppercase tracking-widest text-[#F4F1EA] hover:text-[#111315] transition-colors"
                  >
                    Submit Another Brief
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Row 1: Name & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase font-bold text-[#111315] mb-2 tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Lord Anthony Sterling"
                        className="w-full bg-[#F4F1EA] border border-[#D9D7D0] px-4 py-3 text-xs text-[#111315] placeholder-[#8B8D89] focus:outline-none focus:border-[#111315]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-bold text-[#111315] mb-2 tracking-wider">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Sterling Infrastructure Real Estate"
                        className="w-full bg-[#F4F1EA] border border-[#D9D7D0] px-4 py-3 text-xs text-[#111315] placeholder-[#8B8D89] focus:outline-none focus:border-[#111315]"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase font-bold text-[#111315] mb-2 tracking-wider">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="a.sterling@sterling-holdings.com"
                        className="w-full bg-[#F4F1EA] border border-[#D9D7D0] px-4 py-3 text-xs text-[#111315] placeholder-[#8B8D89] focus:outline-none focus:border-[#111315]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-bold text-[#111315] mb-2 tracking-wider">
                        Direct Phone / Mobile
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+44 20 7946 0192"
                        className="w-full bg-[#F4F1EA] border border-[#D9D7D0] px-4 py-3 text-xs text-[#111315] placeholder-[#8B8D89] focus:outline-none focus:border-[#111315]"
                      />
                    </div>
                  </div>

                  {/* Row 3: Country & Project Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase font-bold text-[#111315] mb-2 tracking-wider">
                        Project Country / Jurisdiction
                      </label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={e => setFormData({ ...formData, country: e.target.value })}
                        placeholder="United Kingdom / UAE / Singapore"
                        className="w-full bg-[#F4F1EA] border border-[#D9D7D0] px-4 py-3 text-xs text-[#111315] placeholder-[#8B8D89] focus:outline-none focus:border-[#111315]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-bold text-[#111315] mb-2 tracking-wider">
                        Sector / Discipline
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={e => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full bg-[#F4F1EA] border border-[#D9D7D0] px-4 py-3 text-xs text-[#111315] focus:outline-none focus:border-[#111315]"
                      >
                        <option>Commercial Superstructure</option>
                        <option>Major Civil Infrastructure / Bridge</option>
                        <option>High-Density Luxury Residential</option>
                        <option>Industrial Logistics / Clean Tech</option>
                        <option>Public / Civic Cultural Landmark</option>
                        <option>Advanced Structural Engineering Consultation</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Estimated Budget & Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase font-bold text-[#111315] mb-2 tracking-wider">
                        Target Capital Expenditure (CapEx)
                      </label>
                      <select
                        value={formData.estimatedBudget}
                        onChange={e => setFormData({ ...formData, estimatedBudget: e.target.value })}
                        className="w-full bg-[#F4F1EA] border border-[#D9D7D0] px-4 py-3 text-xs text-[#111315] focus:outline-none focus:border-[#111315]"
                      >
                        <option>$10M - $50M</option>
                        <option>$50M - $150M</option>
                        <option>$150M - $500M</option>
                        <option>$500M+ (Megaproject Tier)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-bold text-[#111315] mb-2 tracking-wider">
                        Expected Delivery Schedule
                      </label>
                      <select
                        value={formData.expectedTimeline}
                        onChange={e => setFormData({ ...formData, expectedTimeline: e.target.value })}
                        className="w-full bg-[#F4F1EA] border border-[#D9D7D0] px-4 py-3 text-xs text-[#111315] focus:outline-none focus:border-[#111315]"
                      >
                        <option>Immediate Planning / 12 Months</option>
                        <option>18 - 24 Months</option>
                        <option>24 - 36 Months</option>
                        <option>36 - 60 Months</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label className="block text-xs uppercase font-bold text-[#111315] mb-2 tracking-wider">
                      Project Specifications & Scope Overview *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Outline target square meterage, architectural requirements, site conditions, LEED/ESG targets, and primary delivery milestones..."
                      className="w-full bg-[#F4F1EA] border border-[#D9D7D0] px-4 py-3 text-xs text-[#111315] placeholder-[#8B8D89] focus:outline-none focus:border-[#111315]"
                    />
                  </div>

                  {/* File Upload Box */}
                  <div>
                    <label className="block text-xs uppercase font-bold text-[#111315] mb-2 tracking-wider">
                      Attach Architectural Brief / BIM / PDF (Optional)
                    </label>
                    <div className="border border-dashed border-[#D9D7D0] p-6 text-center bg-[#F4F1EA] hover:border-[#111315] transition-colors relative cursor-pointer">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <Upload className="w-6 h-6 text-[#8B8D89] mx-auto mb-2" />
                      {selectedFile ? (
                        <p className="text-xs text-[#DC2626] font-bold flex items-center justify-center gap-1">
                          <FileText className="w-3.5 h-3.5" />
                          {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                        </p>
                      ) : (
                        <div>
                          <p className="text-xs text-[#111315] font-bold">Click to upload or drag and drop plans</p>
                          <p className="text-[10px] text-[#5A5C58] mt-1">PDF, DWG, RVT, IFC or ZIP up to 50MB</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[#DC2626] hover:bg-[#EF4444] text-[#111315] text-xs font-bold uppercase tracking-[0.25em] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 shadow-md"
                  >
                    <span>{loading ? 'TRANSMITTING PROPOSAL...' : 'SUBMIT PROJECT BRIEF (RFP)'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Right: Operational Directorates & Contacts */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-8 bg-white border border-[#D9D7D0] shadow-sm">
                <h3 className="text-lg font-black font-display text-[#111315] mb-4">
                  Direct Inquiries
                </h3>
                <div className="space-y-4 text-xs">
                  <div>
                    <span className="text-[#5A5C58] block font-medium">Global Headquarters:</span>
                    <p className="text-[#111315] font-bold mt-0.5">Main GT Road, Cantt Commercial Complex, Kharian, Punjab 50090, Pakistan</p>
                  </div>
                  <div>
                    <span className="text-[#5A5C58] block font-medium">EPC Commercial Proposals & Primary Email:</span>
                    <a href="mailto:morrisbyte0786@gmail.com" className="text-[#DC2626] hover:underline font-bold block mt-0.5">
                      morrisbyte0786@gmail.com
                    </a>
                  </div>
                  <div>
                    <span className="text-[#5A5C58] block font-medium">Executive Direct Helpline & WhatsApp:</span>
                    <a href="tel:03076868004" className="text-[#111315] hover:underline font-mono font-bold block mt-0.5">
                      03076868004 (+92 307 6868004)
                    </a>
                  </div>
                  <div>
                    <span className="text-[#5A5C58] block font-medium">Global Switchboard:</span>
                    <p className="text-[#111315] font-mono font-bold mt-0.5">0307-6868004 / +92 307 6868004</p>
                  </div>
                </div>
              </div>

              {/* Four Hubs Quick Overview */}
              <div className="p-8 bg-white border border-[#D9D7D0] space-y-4 shadow-sm">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#DC2626] font-bold">
                  Regional Operational Directorates
                </h4>
                {(currentSettings?.offices || []).map((off, idx) => (
                  <div key={idx} className="pb-3 border-b border-[#D9D7D0] last:border-none last:pb-0 text-xs">
                    <span className="font-bold text-[#111315] block">{off.city} // {off.role}</span>
                    <span className="text-[#5A5C58] text-[11px] block">{off.address}</span>
                    <span className="text-[#5A5C58] text-[11px] font-mono block mt-0.5 font-medium">{off.phone}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

