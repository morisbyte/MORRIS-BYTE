import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Check, 
  X,
  MapPin,
  Calendar,
  DollarSign
} from 'lucide-react';
import { Project } from '../../types';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/common/Modal';

interface AdminProjectsProps {
  projects: Project[];
  onRefresh: () => void;
  navigate: (route: string, params?: { idOrSlug?: string }) => void;
}

export const AdminProjects: React.FC<AdminProjectsProps> = ({
  projects,
  onRefresh,
  navigate
}) => {
  const { success, error } = useToast();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Form fields
  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: 'Commercial',
    status: 'Completed',
    featured: false,
    location: '',
    country: '',
    client: '',
    completionYear: '2026',
    projectValue: '$250M',
    projectSize: '150,000 m²',
    architect: 'Aurelia Collaborative',
    structuralEngineer: 'Aurelia Advanced Engineering',
    description: '',
    challenge: '',
    approach: '',
    results: '',
    sustainabilityFeatures: 'LEED Platinum, Geothermal ground loop, 40% embodied carbon reduction',
    featuredImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?q=80&w=1200&auto=format&fit=crop',
    gallery: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop\nhttps://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop'
  });

  const handleOpenCreate = () => {
    setEditingProject(null);
    setForm({
      title: '',
      slug: '',
      category: 'Commercial',
      status: 'Completed',
      featured: false,
      location: '',
      country: '',
      client: '',
      completionYear: '2026',
      projectValue: '$250M',
      projectSize: '150,000 m²',
      architect: 'Aurelia Collaborative',
      structuralEngineer: 'Aurelia Advanced Engineering',
      description: '',
      challenge: '',
      approach: '',
      results: '',
      sustainabilityFeatures: 'LEED Platinum, Geothermal ground loop, 40% embodied carbon reduction',
      featuredImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?q=80&w=1200&auto=format&fit=crop',
      gallery: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop\nhttps://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setForm({
      title: project.title,
      slug: project.slug,
      category: project.category,
      status: project.status,
      featured: project.featured || false,
      location: project.location,
      country: project.country,
      client: project.client,
      completionYear: project.completionYear,
      projectValue: project.projectValue,
      projectSize: project.projectSize,
      architect: project.architect || '',
      structuralEngineer: project.structuralEngineer || '',
      description: project.description,
      challenge: project.challenge,
      approach: project.approach,
      results: project.results,
      sustainabilityFeatures: project.sustainabilityFeatures.join(', '),
      featuredImage: project.featuredImage,
      gallery: (project.gallery || []).join('\n')
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.location || !form.description) {
      error('Validation Error', 'Please complete title, location, and description.');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...form,
        slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        sustainabilityFeatures: form.sustainabilityFeatures.split(',').map(s => s.trim()).filter(Boolean),
        gallery: form.gallery.split('\n').map(s => s.trim()).filter(Boolean),
        awards: editingProject?.awards || ['Global Engineering Benchmark Award 2026']
      };

      if (editingProject) {
        await api.updateProject(editingProject.id, payload);
        success('Project Updated', `Successfully updated "${payload.title}".`);
      } else {
        await api.createProject(payload);
        success('Project Created', `Successfully added "${payload.title}" to portfolio.`);
      }

      setIsModalOpen(false);
      onRefresh();
    } catch (err: any) {
      error('Save Failed', err.message || 'Could not save project.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteProject(id);
      success('Project Deleted', 'Project has been removed.');
      setDeleteConfirmId(null);
      onRefresh();
    } catch (err: any) {
      error('Delete Failed', err.message || 'Could not delete project.');
    }
  };

  const filtered = projects.filter(p => {
    const matchCat = categoryFilter === 'All' || p.category === categoryFilter;
    const matchSearch = search === '' || 
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#F4F1EA]">
            Projects Registry ({projects.length})
          </h1>
          <p className="text-xs text-[#8B8D89]">
            Add, update, or archive international construction dossiers.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 bg-[#DC2626] hover:bg-[#EF4444] text-[#111315] text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#141618] border border-[#24282D] p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-[#8B8D89] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full bg-[#181A1D] border border-[#2F343B] pl-9 pr-3 py-1.5 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#DC2626]"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#8B8D89]">Category:</span>
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            aria-label="Filter projects by category"
            className="bg-[#181A1D] border border-[#2F343B] px-3 py-1.5 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#DC2626]"
          >
            {['All', 'Commercial', 'Infrastructure', 'Residential', 'Industrial', 'Public & Civic', 'Engineering'].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-[#141618] border border-[#24282D] overflow-x-auto">
        <table className="w-full text-left text-xs text-[#D9D7D0]">
          <thead className="bg-[#181A1D] text-[11px] uppercase font-mono tracking-wider text-[#8B8D89] border-b border-[#24282D]">
            <tr>
              <th className="py-3 px-4">Project</th>
              <th className="py-3 px-4">Sector</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Value</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1D2024]">
            {filtered.map(project => (
              <tr key={project.id} className="hover:bg-[#181A1D]/60 transition-colors">
                <td className="py-3.5 px-4 font-semibold text-[#F4F1EA]">
                  <div className="flex items-center gap-3">
                    <img
                      src={project.featuredImage}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 object-cover border border-[#2F343B]"
                    />
                    <div>
                      <p className="font-bold text-sm text-[#F4F1EA]">{project.title}</p>
                      <p className="text-[10px] text-[#8B8D89] font-mono">{project.client}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 bg-[#181A1D] border border-[#2F343B] text-[10px] text-[#DC2626]">
                    {project.category}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-[#8B8D89]">
                  {project.location}, {project.country}
                </td>
                <td className="py-3.5 px-4 font-mono text-[#DC2626]">
                  {project.projectValue}
                </td>
                <td className="py-3.5 px-4">
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                    project.status === 'Completed' ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-800' : 'text-amber-400 bg-amber-950/40 border border-amber-800'
                  }`}>
                    {project.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => navigate('project-detail', { idOrSlug: project.slug || project.id })}
                      className="p-1.5 hover:bg-[#24282D] text-[#8B8D89] hover:text-[#F4F1EA]"
                      title="View on site"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleOpenEdit(project)}
                      className="p-1.5 hover:bg-[#24282D] text-[#8B8D89] hover:text-[#DC2626]"
                      title="Edit project"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(project.id)}
                      className="p-1.5 hover:bg-rose-950/40 text-[#8B8D89] hover:text-rose-400"
                      title="Delete project"
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

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        title="Confirm Project Deletion"
        maxWidth="md"
      >
        <div className="space-y-4">
          <p className="text-xs text-[#8B8D89]">
            Are you sure you want to delete this project dossier from the live international registry? This action is permanent.
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
              Delete Project
            </button>
          </div>
        </div>
      </Modal>

      {/* Create / Edit Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? `Edit Dossier: ${editingProject.title}` : 'Add New Project to Portfolio'}
        subtitle="Complete architectural and structural metadata."
        maxWidth="2xl"
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Project Name *</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                className="w-full bg-[#141618] border border-[#2F343B] p-2.5 text-[#F4F1EA] focus:border-[#DC2626]"
              />
            </div>
            <div>
              <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Category / Sector</label>
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full bg-[#141618] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
              >
                {['Commercial', 'Infrastructure', 'Residential', 'Industrial', 'Public & Civic', 'Engineering'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Status</label>
              <select
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value })}
                className="w-full bg-[#141618] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
              >
                <option>Completed</option>
                <option>Under Construction</option>
                <option>Planning</option>
              </select>
            </div>
            <div>
              <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">City / Location *</label>
              <input
                type="text"
                required
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
                placeholder="Dubai"
                className="w-full bg-[#141618] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
              />
            </div>
            <div>
              <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Country *</label>
              <input
                type="text"
                required
                value={form.country}
                onChange={e => setForm({ ...form, country: e.target.value })}
                placeholder="United Arab Emirates"
                className="w-full bg-[#141618] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Client</label>
              <input
                type="text"
                value={form.client}
                onChange={e => setForm({ ...form, client: e.target.value })}
                className="w-full bg-[#141618] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
              />
            </div>
            <div>
              <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Project Value</label>
              <input
                type="text"
                value={form.projectValue}
                onChange={e => setForm({ ...form, projectValue: e.target.value })}
                placeholder="$450M"
                className="w-full bg-[#141618] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
              />
            </div>
            <div>
              <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Floor Area / Span</label>
              <input
                type="text"
                value={form.projectSize}
                onChange={e => setForm({ ...form, projectSize: e.target.value })}
                placeholder="210,000 m²"
                className="w-full bg-[#141618] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Cover Image URL</label>
            <input
              type="url"
              required
              value={form.featuredImage}
              onChange={e => setForm({ ...form, featuredImage: e.target.value })}
              className="w-full bg-[#141618] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
            />
          </div>

          <div>
            <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Executive Summary *</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full bg-[#141618] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
            />
          </div>

          <div>
            <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Engineering Challenge</label>
            <textarea
              rows={2}
              value={form.challenge}
              onChange={e => setForm({ ...form, challenge: e.target.value })}
              className="w-full bg-[#141618] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
            />
          </div>

          <div>
            <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Technical Approach</label>
            <textarea
              rows={2}
              value={form.approach}
              onChange={e => setForm({ ...form, approach: e.target.value })}
              className="w-full bg-[#141618] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
            />
          </div>

          <div>
            <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Sustainability Specifications (Comma-separated)</label>
            <input
              type="text"
              value={form.sustainabilityFeatures}
              onChange={e => setForm({ ...form, sustainabilityFeatures: e.target.value })}
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
              {saving ? 'Saving...' : 'Save Dossier'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
