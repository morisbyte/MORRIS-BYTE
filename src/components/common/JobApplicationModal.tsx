import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  MapPin, 
  Upload, 
  FileText, 
  Send, 
  CheckCircle2, 
  X,
  Globe
} from 'lucide-react';
import { Job } from '../../types';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { Modal } from './Modal';

interface JobApplicationModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitted?: () => void;
}

export const JobApplicationModal: React.FC<JobApplicationModalProps> = ({
  job,
  isOpen,
  onClose,
  onSubmitted
}) => {
  const { success, error } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    portfolioUrl: '',
    coverLetter: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!job) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      error('Required Fields Missing', 'Please provide your full name and email.');
      return;
    }

    setLoading(true);
    try {
      const resumeUrl = selectedFile
        ? `https://storage.aureliaconstruct.com/resumes/${encodeURIComponent(selectedFile.name)}`
        : 'https://storage.aureliaconstruct.com/resumes/candidate-cv.pdf';

      await api.createApplication({
        jobId: job.id,
        jobTitle: job.title,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        portfolioUrl: formData.portfolioUrl,
        coverLetter: formData.coverLetter,
        resumeUrl
      });

      setSubmitted(true);
      success('Application Registered', 'Your candidate dossier has been forwarded to executive recruitment.');
      if (onSubmitted) onSubmitted();
    } catch (err: any) {
      error('Submission Failed', err.message || 'Unable to submit application.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      portfolioUrl: '',
      coverLetter: ''
    });
    setSelectedFile(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title={submitted ? 'Application Confirmed' : `Apply: ${job.title}`}
      subtitle={submitted ? undefined : `${job.department} • ${job.location}`}
      maxWidth="lg"
    >
      {submitted ? (
        <div className="py-8 text-center space-y-4 text-xs">
          <div className="w-14 h-14 bg-[#F4F1EA] border border-[#DC2626] text-[#DC2626] flex items-center justify-center mx-auto rounded-full">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h4 className="text-xl font-black font-display text-[#111315]">
            Thank you, {formData.name}
          </h4>
          <p className="text-[#5A5C58] max-w-sm mx-auto leading-relaxed">
            Your application for <strong className="text-[#111315]">{job.title}</strong> has been logged in our talent management system. Our recruitment directorate will review your qualifications and contact you.
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
                placeholder="e.g. Marcus Aurelius"
                className="w-full bg-[#F4F1EA] border border-[#D9D7D0] p-2.5 text-[#111315] focus:outline-none focus:border-[#111315]"
              />
            </div>
            <div>
              <label className="block uppercase font-bold text-[#111315] mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="m.aurelius@engineers.org"
                className="w-full bg-[#F4F1EA] border border-[#D9D7D0] p-2.5 text-[#111315] focus:outline-none focus:border-[#111315]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase font-bold text-[#111315] mb-1">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+44 7700 900077"
                className="w-full bg-[#F4F1EA] border border-[#D9D7D0] p-2.5 text-[#111315] focus:outline-none focus:border-[#111315]"
              />
            </div>
            <div>
              <label className="block uppercase font-bold text-[#111315] mb-1">LinkedIn / Portfolio URL</label>
              <input
                type="url"
                value={formData.portfolioUrl}
                onChange={e => setFormData({ ...formData, portfolioUrl: e.target.value })}
                placeholder="https://linkedin.com/in/..."
                className="w-full bg-[#F4F1EA] border border-[#D9D7D0] p-2.5 text-[#111315] focus:outline-none focus:border-[#111315]"
              />
            </div>
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block uppercase font-bold text-[#111315] mb-1">Upload Curriculum Vitae (PDF/DOCX)</label>
            <div className="border border-dashed border-[#D9D7D0] p-4 text-center bg-[#F4F1EA] hover:border-[#111315] transition-colors relative cursor-pointer">
              <input
                type="file"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <Upload className="w-5 h-5 text-[#8B8D89] mx-auto mb-1" />
              {selectedFile ? (
                <p className="text-xs text-[#DC2626] font-bold flex items-center justify-center gap-1">
                  <FileText className="w-3.5 h-3.5" />
                  {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                </p>
              ) : (
                <div>
                  <p className="text-[#111315] font-bold">Click or drag & drop your CV</p>
                  <p className="text-[10px] text-[#5A5C58]">PDF, DOCX up to 15MB</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block uppercase font-bold text-[#111315] mb-1">Cover Note / Professional Highlights</label>
            <textarea
              rows={3}
              value={formData.coverLetter}
              onChange={e => setFormData({ ...formData, coverLetter: e.target.value })}
              placeholder="Highlight relevant charterships, megaproject experience, or BIM competencies..."
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
              <span>{loading ? 'Transmitting...' : 'Submit Application'}</span>
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
