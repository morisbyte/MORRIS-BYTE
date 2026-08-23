import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Search, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Mail, 
  Phone, 
  Globe,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { JobApplication } from '../../types';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/common/Modal';

interface AdminApplicationsProps {
  applications: JobApplication[];
  onRefresh: () => void;
}

export const AdminApplications: React.FC<AdminApplicationsProps> = ({
  applications,
  onRefresh
}) => {
  const { success, error } = useToast();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);

  const statuses: JobApplication['status'][] = ['Pending', 'Under Review', 'Interview Scheduled', 'Offer Extended', 'Rejected'];

  const handleStatusChange = async (id: string, newStatus: JobApplication['status']) => {
    try {
      await api.updateApplicationStatus(id, newStatus);
      success('Status Updated', `Candidate pipeline status changed to ${newStatus}.`);
      onRefresh();
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp({ ...selectedApp, status: newStatus });
      }
    } catch (err: any) {
      error('Update Failed', err.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteApplication(id);
      success('Record Removed', 'Application record deleted.');
      setSelectedApp(null);
      onRefresh();
    } catch (err: any) {
      error('Delete Failed', err.message);
    }
  };

  const filtered = applications.filter(a => {
    const matchStatus = statusFilter === 'All' || a.status === statusFilter;
    const matchSearch = search === '' ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#F4F1EA]">
            Candidate Talent Inflow ({applications.length})
          </h1>
          <p className="text-xs text-[#8B8D89]">
            Review structural engineers, computational architects, and project managers applying to Aurelia.
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-[#141618] border border-[#24282D] p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-[#8B8D89] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search applicants..."
            className="w-full bg-[#181A1D] border border-[#2F343B] pl-9 pr-3 py-1.5 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#DC2626]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          aria-label="Filter applications by status"
          className="bg-[#181A1D] border border-[#2F343B] px-3 py-1.5 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#DC2626]"
        >
          <option value="All">All Application Statuses</option>
          {statuses.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#141618] border border-[#24282D] overflow-x-auto">
        <table className="w-full text-left text-xs text-[#D9D7D0]">
          <thead className="bg-[#181A1D] text-[11px] uppercase font-mono tracking-wider text-[#8B8D89] border-b border-[#24282D]">
            <tr>
              <th className="py-3 px-4">Candidate</th>
              <th className="py-3 px-4">Role Applied</th>
              <th className="py-3 px-4">Submitted</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1D2024]">
            {filtered.map(app => (
              <tr key={app.id} className="hover:bg-[#181A1D]/60 transition-colors">
                <td className="py-3.5 px-4 font-semibold text-[#F4F1EA]">
                  <p className="font-bold text-sm text-[#F4F1EA]">{app.name}</p>
                  <p className="text-[10px] text-[#8B8D89]">{app.email}</p>
                </td>
                <td className="py-3.5 px-4 text-[#DC2626] font-medium">
                  {app.jobTitle}
                </td>
                <td className="py-3.5 px-4 text-[#8B8D89] font-mono">
                  {app.submittedAt}
                </td>
                <td className="py-3.5 px-4">
                  <select
                    value={app.status}
                    onChange={e => handleStatusChange(app.id, e.target.value as any)}
                    aria-label={`Update application status for ${app.name}`}
                    className="bg-[#181A1D] border border-[#2F343B] px-2 py-1 text-[11px] text-[#F4F1EA] focus:border-[#DC2626]"
                  >
                    {statuses.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="px-2.5 py-1 bg-[#181A1D] hover:bg-[#24282D] text-[11px] text-[#D9D7D0] border border-[#2F343B]"
                    >
                      Review Dossier
                    </button>
                    <button
                      onClick={() => handleDelete(app.id)}
                      className="p-1 hover:bg-rose-950/40 text-[#8B8D89] hover:text-rose-400"
                      title="Delete record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Review Dossier Modal */}
      <Modal
        isOpen={!!selectedApp}
        onClose={() => setSelectedApp(null)}
        title={selectedApp ? `Applicant Dossier: ${selectedApp.name}` : ''}
        subtitle={selectedApp ? `Target Position: ${selectedApp.jobTitle}` : ''}
        maxWidth="lg"
      >
        {selectedApp && (
          <div className="space-y-6 text-xs text-[#D9D7D0]">
            <div className="grid grid-cols-2 gap-4 bg-[#141618] p-4 border border-[#24282D]">
              <div>
                <span className="text-[#8B8D89] block">Email Address:</span>
                <span className="text-[#F4F1EA] font-semibold">{selectedApp.email}</span>
              </div>
              <div>
                <span className="text-[#8B8D89] block">Phone:</span>
                <span className="text-[#F4F1EA] font-semibold">{selectedApp.phone || 'Not provided'}</span>
              </div>
              <div>
                <span className="text-[#8B8D89] block">Submission Date:</span>
                <span className="font-mono text-[#8B8D89]">{selectedApp.submittedAt}</span>
              </div>
              <div>
                <span className="text-[#8B8D89] block">Current Stage:</span>
                <span className="text-[#DC2626] font-bold uppercase">{selectedApp.status}</span>
              </div>
            </div>

            {selectedApp.portfolioUrl && (
              <div>
                <span className="text-[#8B8D89] uppercase tracking-wider block mb-1">Portfolio / Profile Link</span>
                <a
                  href={selectedApp.portfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#DC2626] underline flex items-center gap-1.5 font-semibold"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{selectedApp.portfolioUrl}</span>
                </a>
              </div>
            )}

            {selectedApp.resumeUrl && (
              <div>
                <span className="text-[#8B8D89] uppercase tracking-wider block mb-1">Attached Curriculum Vitae</span>
                <div className="p-3 bg-[#141618] border border-[#24282D] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#DC2626]" />
                    <span className="text-[#F4F1EA] font-mono">{selectedApp.resumeUrl.split('/').pop()}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase">Verified Document</span>
                </div>
              </div>
            )}

            {selectedApp.coverLetter && (
              <div>
                <span className="text-[#8B8D89] uppercase tracking-wider block mb-1">Executive Statement / Cover Letter</span>
                <div className="p-4 bg-[#141618] border border-[#24282D] leading-relaxed font-light text-[#D9D7D0] whitespace-pre-line">
                  {selectedApp.coverLetter}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-[#24282D] flex items-center justify-between">
              <button
                onClick={() => handleDelete(selectedApp.id)}
                className="text-rose-400 hover:underline"
              >
                Delete Record
              </button>
              <button
                onClick={() => setSelectedApp(null)}
                className="px-5 py-2 bg-[#DC2626] text-[#111315] text-xs font-bold uppercase tracking-wider"
              >
                Close Dossier
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
