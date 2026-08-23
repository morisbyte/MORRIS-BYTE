import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, Upload, FileText } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { Modal } from './Modal';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitted?: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  onSubmitted
}) => {
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
    description: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.description) {
      error('Missing Fields', 'Please provide your name, corporate email, and project scope.');
      return;
    }

    setLoading(true);
    try {
      const attachmentUrl = selectedFile
        ? `https://storage.aureliaconstruct.com/rfp/${encodeURIComponent(selectedFile.name)}`
        : '';

      await api.createInquiry({
        ...formData,
        attachmentUrl
      });

      setSubmitted(true);
      success('Proposal Received', 'Your brief has been logged with our Global Director of Procurement.');
      if (onSubmitted) onSubmitted();
    } catch (err: any) {
      error('Submission Failed', err.message || 'Unable to submit RFP.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
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
      description: ''
    });
    setSelectedFile(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title={submitted ? 'Proposal Transmitted' : 'Initiate Project Dialogue (RFP)'}
      subtitle={submitted ? undefined : 'Direct tender submission to Aurelia Construct Group Commercial Directorate.'}
      maxWidth="xl"
    >
      {submitted ? (
        <div className="py-8 text-center space-y-4 text-xs">
          <div className="w-14 h-14 bg-[#F4F1EA] border border-[#DC2626] text-[#DC2626] flex items-center justify-center mx-auto rounded-full">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h4 className="text-xl font-black font-display text-[#111315]">
            Proposal Received
          </h4>
          <p className="text-[#5A5C58] max-w-sm mx-auto leading-relaxed">
            Thank you, <strong className="text-[#111315]">{formData.name}</strong>. Our engineering estimation and contracting directorate will review your scope and respond within 24 business hours.
          </p>
          <button
            onClick={handleReset}
            className="mt-6 px-6 py-2.5 bg-[#DC2626] hover:bg-[#EF4444] text-[#111315] font-bold uppercase tracking-widest transition-colors shadow-sm"
          >
            Close Window
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase font-bold text-[#111315] mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Jean-Luc Moreau"
                className="w-full bg-[#F4F1EA] border border-[#D9D7D0] p-2.5 text-[#111315] focus:outline-none focus:border-[#111315]"
              />
            </div>
            <div>
              <label className="block uppercase font-bold text-[#111315] mb-1">Company / Organization</label>
              <input
                type="text"
                value={formData.company}
                onChange={e => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. EuroRail Infrastructure"
                className="w-full bg-[#F4F1EA] border border-[#D9D7D0] p-2.5 text-[#111315] focus:outline-none focus:border-[#111315]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase font-bold text-[#111315] mb-1">Corporate Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="j.moreau@eurorail.eu"
                className="w-full bg-[#F4F1EA] border border-[#D9D7D0] p-2.5 text-[#111315] focus:outline-none focus:border-[#111315]"
              />
            </div>
            <div>
              <label className="block uppercase font-bold text-[#111315] mb-1">Project Country</label>
              <input
                type="text"
                value={formData.country}
                onChange={e => setFormData({ ...formData, country: e.target.value })}
                placeholder="France / Netherlands"
                className="w-full bg-[#F4F1EA] border border-[#D9D7D0] p-2.5 text-[#111315] focus:outline-none focus:border-[#111315]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase font-bold text-[#111315] mb-1">Project Sector</label>
              <select
                value={formData.projectType}
                onChange={e => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full bg-[#F4F1EA] border border-[#D9D7D0] p-2.5 text-[#111315] focus:outline-none focus:border-[#111315]"
              >
                <option>Commercial Superstructure</option>
                <option>Major Civil Infrastructure / Bridge</option>
                <option>High-Density Luxury Residential</option>
                <option>Industrial Logistics / Clean Tech</option>
                <option>Public / Civic Cultural Landmark</option>
                <option>Advanced Structural Engineering</option>
              </select>
            </div>

            <div>
              <label className="block uppercase font-bold text-[#111315] mb-1">Target CapEx Budget</label>
              <select
                value={formData.estimatedBudget}
                onChange={e => setFormData({ ...formData, estimatedBudget: e.target.value })}
                className="w-full bg-[#F4F1EA] border border-[#D9D7D0] p-2.5 text-[#111315] focus:outline-none focus:border-[#111315]"
              >
                <option>$10M - $50M</option>
                <option>$50M - $150M</option>
                <option>$150M - $500M</option>
                <option>$500M+ (Megaproject)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block uppercase font-bold text-[#111315] mb-1">Project Scope & Specifications *</label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Outline target square meters, architectural milestones, site conditions, LEED goals..."
              className="w-full bg-[#F4F1EA] border border-[#D9D7D0] p-2.5 text-[#111315] focus:outline-none focus:border-[#111315]"
            />
          </div>

          <div className="pt-4 border-t border-[#D9D7D0] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 bg-[#F4F1EA] border border-[#D9D7D0] text-xs text-[#111315] font-bold hover:bg-[#D9D7D0] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[#DC2626] hover:bg-[#EF4444] text-[#111315] text-xs font-bold uppercase tracking-wider disabled:opacity-50 flex items-center gap-2 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{loading ? 'Transmitting...' : 'Submit Tender Brief'}</span>
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
