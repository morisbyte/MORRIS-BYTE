import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Image as ImageIcon, 
  Upload, 
  Trash2, 
  Copy, 
  Check, 
  ExternalLink,
  Search,
  Plus
} from 'lucide-react';
import { MediaItem } from '../../types';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/common/Modal';

interface AdminMediaProps {
  media: MediaItem[];
  onRefresh: () => void;
}

export const AdminMedia: React.FC<AdminMediaProps> = ({ media, onRefresh }) => {
  const { success, error } = useToast();
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: '',
    url: '',
    alt: '',
    category: 'Projects',
    size: '2.4 MB'
  });

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    success('URL Copied', 'Asset URL copied to clipboard.');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.url) {
      error('Missing Fields', 'Please provide a title and valid URL.');
      return;
    }

    setSaving(true);
    try {
      await api.createMediaItem(form);
      success('Asset Registered', `Saved "${form.title}" to media library.`);
      setIsModalOpen(false);
      onRefresh();
    } catch (err: any) {
      error('Upload Failed', err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteMediaItem(id);
      success('Asset Deleted', 'Media asset removed.');
      onRefresh();
    } catch (err: any) {
      error('Delete Failed', err.message);
    }
  };

  const filtered = media.filter(m => 
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#F4F1EA]">
            Media & Asset Library ({media.length})
          </h1>
          <p className="text-xs text-[#8B8D89]">
            Architectural photography, engineering schematics, and corporate publication assets.
          </p>
        </div>

        <button
          onClick={() => {
            setForm({
              title: '',
              url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
              alt: '',
              category: 'Projects',
              size: '1.8 MB'
            });
            setIsModalOpen(true);
          }}
          className="px-4 py-2.5 bg-[#DC2626] hover:bg-[#EF4444] text-[#111315] text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Upload / Register Asset</span>
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
            placeholder="Search assets by title or category..."
            className="w-full bg-[#181A1D] border border-[#2F343B] pl-9 pr-3 py-1.5 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#DC2626]"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(item => (
          <div key={item.id} className="bg-[#141618] border border-[#24282D] overflow-hidden group hover:border-[#DC2626] transition-colors">
            <div className="h-48 bg-[#111315] overflow-hidden relative">
              <img
                src={item.url}
                alt={item.alt || item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#111315]/90 text-[10px] uppercase font-bold text-[#DC2626] border border-[#DC2626]/30">
                {item.category}
              </span>
            </div>

            <div className="p-4 space-y-2">
              <h4 className="text-sm font-bold font-display text-[#F4F1EA] truncate">
                {item.title}
              </h4>
              <p className="text-[10px] text-[#8B8D89] font-mono">
                {item.size || '1.8 MB'} • {item.uploadedAt}
              </p>

              <div className="pt-2 border-t border-[#1E2125] flex items-center justify-between">
                <button
                  onClick={() => handleCopyUrl(item.url, item.id)}
                  className="text-xs text-[#DC2626] hover:text-[#EF4444] flex items-center gap-1 font-semibold"
                >
                  {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === item.id ? 'Copied' : 'Copy URL'}</span>
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1 hover:bg-rose-950/40 text-[#8B8D89] hover:text-rose-400"
                  title="Delete asset"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Asset to Media Registry"
        maxWidth="lg"
      >
        <form onSubmit={handleUpload} className="space-y-4 text-xs">
          <div>
            <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Asset Title *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Aurelia Tower Facade Detail"
              className="w-full bg-[#141618] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
            />
          </div>

          <div>
            <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Asset Image URL *</label>
            <input
              type="url"
              required
              value={form.url}
              onChange={e => setForm({ ...form, url: e.target.value })}
              className="w-full bg-[#141618] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Category</label>
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full bg-[#141618] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
              >
                <option>Projects</option>
                <option>Insights</option>
                <option>Corporate</option>
                <option>Leadership</option>
              </select>
            </div>
            <div>
              <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Estimated Size</label>
              <input
                type="text"
                value={form.size}
                onChange={e => setForm({ ...form, size: e.target.value })}
                placeholder="2.4 MB"
                className="w-full bg-[#141618] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Alt Text (Accessibility)</label>
            <input
              type="text"
              value={form.alt}
              onChange={e => setForm({ ...form, alt: e.target.value })}
              placeholder="Detailed descriptive text"
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
              {saving ? 'Registering...' : 'Register Asset'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
