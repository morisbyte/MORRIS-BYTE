import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MessageSquareText, 
  Search, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Building2, 
  DollarSign, 
  Mail, 
  Phone,
  ExternalLink
} from 'lucide-react';
import { Inquiry } from '../../types';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/common/Modal';

interface AdminInquiriesProps {
  inquiries: Inquiry[];
  onRefresh: () => void;
}

export const AdminInquiries: React.FC<AdminInquiriesProps> = ({
  inquiries,
  onRefresh
}) => {
  const { success, error } = useToast();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const statuses: Inquiry['status'][] = ['New', 'Under Review', 'Proposal Sent', 'Closed'];

  const handleStatusChange = async (id: string, newStatus: Inquiry['status']) => {
    try {
      await api.updateInquiryStatus(id, newStatus);
      success('Status Updated', `Inquiry status changed to ${newStatus}.`);
      onRefresh();
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry({ ...selectedInquiry, status: newStatus });
      }
    } catch (err: any) {
      error('Update Failed', err.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteInquiry(id);
      success('Record Deleted', 'Inquiry removed.');
      setSelectedInquiry(null);
      onRefresh();
    } catch (err: any) {
      error('Delete Failed', err.message);
    }
  };

  const filtered = inquiries.filter(i => {
    const matchStatus = statusFilter === 'All' || i.status === statusFilter;
    const matchSearch = search === '' ||
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      (i.company && i.company.toLowerCase().includes(search.toLowerCase())) ||
      i.email.toLowerCase().includes(search.toLowerCase()) ||
      i.projectType.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#F4F1EA]">
            Client Proposals & RFPs ({inquiries.length})
          </h1>
          <p className="text-xs text-[#8B8D89]">
            Manage inbound corporate consultation requests and EPC tender proposals.
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
            placeholder="Search proposals..."
            className="w-full bg-[#181A1D] border border-[#2F343B] pl-9 pr-3 py-1.5 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#DC2626]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          aria-label="Filter inquiries by status"
          className="bg-[#181A1D] border border-[#2F343B] px-3 py-1.5 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#DC2626]"
        >
          <option value="All">All Statuses</option>
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
              <th className="py-3 px-4">Client / Organization</th>
              <th className="py-3 px-4">Discipline</th>
              <th className="py-3 px-4">CapEx Target</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1D2024]">
            {filtered.map(inq => (
              <tr key={inq.id} className="hover:bg-[#181A1D]/60 transition-colors">
                <td className="py-3.5 px-4 font-semibold text-[#F4F1EA]">
                  <p className="font-bold text-sm text-[#F4F1EA]">{inq.name}</p>
                  <p className="text-[10px] text-[#8B8D89]">{inq.company || inq.email} • {inq.country || 'Global'}</p>
                </td>
                <td className="py-3.5 px-4 text-[#DC2626]">
                  {inq.projectType}
                </td>
                <td className="py-3.5 px-4 text-[#D9D7D0] font-mono">
                  {inq.estimatedBudget}
                </td>
                <td className="py-3.5 px-4 text-[#8B8D89] font-mono">
                  {inq.submittedAt}
                </td>
                <td className="py-3.5 px-4">
                  <select
                    value={inq.status}
                    onChange={e => handleStatusChange(inq.id, e.target.value as any)}
                    aria-label={`Update proposal status for ${inq.name}`}
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
                      onClick={() => setSelectedInquiry(inq)}
                      className="px-2.5 py-1 bg-[#181A1D] hover:bg-[#24282D] text-[11px] text-[#D9D7D0] border border-[#2F343B]"
                    >
                      Read Brief
                    </button>
                    <button
                      onClick={() => handleDelete(inq.id)}
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

      {/* View Modal */}
      <Modal
        isOpen={!!selectedInquiry}
        onClose={() => setSelectedInquiry(null)}
        title={selectedInquiry ? `Proposal Scope: ${selectedInquiry.projectType}` : ''}
        subtitle={selectedInquiry ? `Client: ${selectedInquiry.name} (${selectedInquiry.company || selectedInquiry.email})` : ''}
        maxWidth="lg"
      >
        {selectedInquiry && (
          <div className="space-y-6 text-xs text-[#D9D7D0]">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-[#141618] p-4 border border-[#24282D]">
              <div>
                <span className="text-[#8B8D89] block">Corporate Email:</span>
                <span className="text-[#F4F1EA] font-semibold">{selectedInquiry.email}</span>
              </div>
              <div>
                <span className="text-[#8B8D89] block">Direct Phone:</span>
                <span className="text-[#F4F1EA] font-semibold">{selectedInquiry.phone || 'N/A'}</span>
              </div>
              <div>
                <span className="text-[#8B8D89] block">Target CapEx:</span>
                <span className="text-[#DC2626] font-bold">{selectedInquiry.estimatedBudget}</span>
              </div>
              <div>
                <span className="text-[#8B8D89] block">Schedule Horizon:</span>
                <span className="text-[#F4F1EA]">{selectedInquiry.expectedTimeline}</span>
              </div>
              <div>
                <span className="text-[#8B8D89] block">Country:</span>
                <span className="text-[#F4F1EA]">{selectedInquiry.country || 'Global'}</span>
              </div>
              <div>
                <span className="text-[#8B8D89] block">Logged At:</span>
                <span className="text-[#8B8D89] font-mono">{selectedInquiry.submittedAt}</span>
              </div>
            </div>

            <div>
              <span className="text-[#8B8D89] uppercase tracking-wider block mb-1">Project Requirements & Scope Description</span>
              <div className="p-4 bg-[#141618] border border-[#24282D] leading-relaxed font-light text-[#D9D7D0] whitespace-pre-line">
                {selectedInquiry.description}
              </div>
            </div>

            {selectedInquiry.attachmentUrl && (
              <div>
                <span className="text-[#8B8D89] uppercase tracking-wider block mb-1">Attached Plan / Document</span>
                <div className="p-3 bg-[#141618] border border-[#24282D] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#DC2626]" />
                    <span className="font-mono text-[#F4F1EA]">{selectedInquiry.attachmentUrl.split('/').pop()}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase">Encrypted Attachment</span>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-[#24282D] flex items-center justify-between">
              <button
                onClick={() => handleDelete(selectedInquiry.id)}
                className="text-rose-400 hover:underline"
              >
                Delete Proposal
              </button>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-5 py-2 bg-[#DC2626] text-[#111315] text-xs font-bold uppercase tracking-wider"
              >
                Close Brief
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
