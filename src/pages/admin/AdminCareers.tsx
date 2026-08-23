import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  MapPin, 
  Award,
  DollarSign
} from 'lucide-react';
import { Job } from '../../types';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/common/Modal';

interface AdminCareersProps {
  jobs: Job[];
  onRefresh: () => void;
}

export const AdminCareers: React.FC<AdminCareersProps> = ({ jobs, onRefresh }) => {
  const { success, error } = useToast();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: '',
    department: 'Engineering',
    location: 'London, United Kingdom',
    type: 'Full-time / Permanent',
    experienceLevel: 'Senior / Lead (8+ Years)',
    salaryRange: '£95,000 - £125,000 + Executive Bonus',
    description: '',
    responsibilities: 'Lead structural FEA simulations for supertall towers\nCoordinate multidisciplinary site reviews\nMentor junior graduate engineers',
    requirements: 'Chartered Engineer (CEng / MIStructE)\n10+ years high-rise construction experience\nProficiency in ETABS and Grasshopper',
    benefits: 'Executive Healthcare, Global Relocation, Bonus Pool, Pension Contribution'
  });

  const handleOpenCreate = () => {
    setEditingJob(null);
    setForm({
      title: '',
      department: 'Engineering',
      location: 'London, United Kingdom',
      type: 'Full-time / Permanent',
      experienceLevel: 'Senior / Lead (8+ Years)',
      salaryRange: '£95,000 - £125,000 + Executive Bonus',
      description: '',
      responsibilities: 'Lead structural FEA simulations for supertall towers\nCoordinate multidisciplinary site reviews\nMentor junior graduate engineers',
      requirements: 'Chartered Engineer (CEng / MIStructE)\n10+ years high-rise construction experience\nProficiency in ETABS and Grasshopper',
      benefits: 'Executive Healthcare, Global Relocation, Bonus Pool, Pension Contribution'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (job: Job) => {
    setEditingJob(job);
    setForm({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      experienceLevel: job.experienceLevel,
      salaryRange: job.salaryRange,
      description: job.description,
      responsibilities: job.responsibilities.join('\n'),
      requirements: job.requirements.join('\n'),
      benefits: job.benefits.join(', ')
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.location || !form.description) {
      error('Missing Fields', 'Please complete title, location, and description.');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: form.title,
        department: form.department,
        location: form.location,
        type: form.type,
        experienceLevel: form.experienceLevel,
        salaryRange: form.salaryRange,
        description: form.description,
        responsibilities: form.responsibilities.split('\n').map(s => s.trim()).filter(Boolean),
        requirements: form.requirements.split('\n').map(s => s.trim()).filter(Boolean),
        benefits: form.benefits.split(',').map(s => s.trim()).filter(Boolean)
      };

      if (editingJob) {
        await api.updateJob(editingJob.id, payload);
        success('Position Updated', `Updated "${payload.title}".`);
      } else {
        await api.createJob(payload);
        success('Position Created', `Added "${payload.title}" to career portal.`);
      }

      setIsModalOpen(false);
      onRefresh();
    } catch (err: any) {
      error('Save Failed', err.message || 'Could not save job.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteJob(id);
      success('Position Deleted', 'Job opening removed.');
      setDeleteConfirmId(null);
      onRefresh();
    } catch (err: any) {
      error('Delete Failed', err.message || 'Could not delete job.');
    }
  };

  const filtered = jobs.filter(j => 
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.department.toLowerCase().includes(search.toLowerCase()) ||
    j.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#F4F1EA]">
            Open Positions & Recruitment ({jobs.length})
          </h1>
          <p className="text-xs text-[#8B8D89]">
            Manage talent requisitions across all global engineering hubs.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 bg-[#DC2626] hover:bg-[#EF4444] text-[#111315] text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Opening</span>
        </button>
      </div>

      {/* Filter */}
      <div className="bg-[#141618] border border-[#24282D] p-4">
        <div className="relative max-w-sm">
          <Search className="w-4 h-4 text-[#8B8D89] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search roles..."
            className="w-full bg-[#181A1D] border border-[#2F343B] pl-9 pr-3 py-1.5 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#DC2626]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#141618] border border-[#24282D] overflow-x-auto">
        <table className="w-full text-left text-xs text-[#D9D7D0]">
          <thead className="bg-[#181A1D] text-[11px] uppercase font-mono tracking-wider text-[#8B8D89] border-b border-[#24282D]">
            <tr>
              <th className="py-3 px-4">Position</th>
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Salary Range</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1D2024]">
            {filtered.map(job => (
              <tr key={job.id} className="hover:bg-[#181A1D]/60 transition-colors">
                <td className="py-3.5 px-4 font-semibold text-[#F4F1EA]">
                  <p className="font-bold text-sm text-[#F4F1EA]">{job.title}</p>
                  <p className="text-[10px] text-[#8B8D89] font-mono">{job.experienceLevel}</p>
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 bg-[#181A1D] border border-[#2F343B] text-[10px] text-[#DC2626]">
                    {job.department}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-[#8B8D89]">
                  {job.location}
                </td>
                <td className="py-3.5 px-4 text-[#D9D7D0] font-mono">
                  {job.salaryRange}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenEdit(job)}
                      className="p-1.5 hover:bg-[#24282D] text-[#8B8D89] hover:text-[#DC2626]"
                      title="Edit opening"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(job.id)}
                      className="p-1.5 hover:bg-rose-950/40 text-[#8B8D89] hover:text-rose-400"
                      title="Delete opening"
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

      {/* Delete Modal */}
      <Modal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        title="Confirm Position Closure"
        maxWidth="md"
      >
        <div className="space-y-4">
          <p className="text-xs text-[#8B8D89]">
            Are you sure you want to close and remove this job requisition?
          </p>
          <div className="flex justify-end gap-3 pt-4 border-t border-[#24282D]">
            <button
              onClick={() => setDeleteConfirmId(null)}
              className="px-4 py-2 bg-[#181A1D] border border-[#2F343B] text-xs text-[#D9D7D0]"
            >
              Cancel
            </button>
            <button
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
              className="px-4 py-2 bg-rose-700 hover:bg-rose-600 text-xs font-bold text-white uppercase tracking-wider"
            >
              Delete Job
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingJob ? `Edit Position: ${editingJob.title}` : 'Create Job Opening'}
        maxWidth="2xl"
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Job Title *</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                className="w-full bg-[#141618] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
              />
            </div>
            <div>
              <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Department</label>
              <select
                value={form.department}
                onChange={e => setForm({ ...form, department: e.target.value })}
                className="w-full bg-[#141618] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
              >
                {['Engineering', 'Civil Infrastructure', 'Architecture', 'Project Management', 'Sustainability'].map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Location *</label>
              <input
                type="text"
                required
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
                className="w-full bg-[#141618] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
              />
            </div>
            <div>
              <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Contract Type</label>
              <input
                type="text"
                value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value })}
                className="w-full bg-[#141618] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
              />
            </div>
            <div>
              <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Salary Range</label>
              <input
                type="text"
                value={form.salaryRange}
                onChange={e => setForm({ ...form, salaryRange: e.target.value })}
                className="w-full bg-[#141618] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Role Description *</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full bg-[#141618] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
            />
          </div>

          <div>
            <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Key Responsibilities (One per line)</label>
            <textarea
              rows={3}
              value={form.responsibilities}
              onChange={e => setForm({ ...form, responsibilities: e.target.value })}
              className="w-full bg-[#141618] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
            />
          </div>

          <div>
            <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Requirements & Experience (One per line)</label>
            <textarea
              rows={3}
              value={form.requirements}
              onChange={e => setForm({ ...form, requirements: e.target.value })}
              className="w-full bg-[#141618] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
            />
          </div>

          <div className="pt-4 border-t border-[#24282D] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-[#181A1D] border border-[#2F343B] text-xs text-[#D9D7D0]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-[#DC2626] hover:bg-[#EF4444] text-[#111315] text-xs font-bold uppercase tracking-wider disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Requisition'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
