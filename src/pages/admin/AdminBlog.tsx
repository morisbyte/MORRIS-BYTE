import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar, 
  Clock, 
  User
} from 'lucide-react';
import { BlogPost } from '../../types';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/common/Modal';

interface AdminBlogProps {
  blogPosts: BlogPost[];
  onRefresh: () => void;
  navigate: (route: string, params?: { idOrSlug?: string }) => void;
}

export const AdminBlog: React.FC<AdminBlogProps> = ({
  blogPosts,
  onRefresh,
  navigate
}) => {
  const { success, error } = useToast();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: 'Sustainability',
    excerpt: '',
    content: '',
    readTime: '6 min read',
    featured: false,
    featuredImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?q=80&w=1200&auto=format&fit=crop',
    authorName: 'Dr. Elena Rostova',
    authorRole: 'Global Head of Sustainability',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    tags: 'Decarbonization, Concrete, Materials Science'
  });

  const handleOpenCreate = () => {
    setEditingPost(null);
    setForm({
      title: '',
      slug: '',
      category: 'Sustainability',
      excerpt: '',
      content: '## Executive Abstract\n\nDetail the latest structural innovations and testing metrics here.\n\n### Key Findings\n- Substantial embodied carbon savings\n- Rigorous tensile strength verification',
      readTime: '6 min read',
      featured: false,
      featuredImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?q=80&w=1200&auto=format&fit=crop',
      authorName: 'Dr. Elena Rostova',
      authorRole: 'Global Head of Sustainability',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
      tags: 'Decarbonization, Concrete, Materials Science'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setEditingPost(post);
    setForm({
      title: post.title,
      slug: post.slug,
      category: post.category,
      excerpt: post.excerpt,
      content: post.content,
      readTime: post.readTime,
      featured: post.featured || false,
      featuredImage: post.featuredImage,
      authorName: post.author.name,
      authorRole: post.author.role,
      authorAvatar: post.author.avatar,
      tags: post.tags.join(', ')
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.excerpt || !form.content) {
      error('Validation Error', 'Please complete title, excerpt, and content.');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: form.title,
        slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        category: form.category,
        excerpt: form.excerpt,
        content: form.content,
        date: editingPost ? editingPost.date : new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: form.readTime,
        featured: form.featured,
        featuredImage: form.featuredImage,
        author: {
          name: form.authorName,
          role: form.authorRole,
          avatar: form.authorAvatar
        },
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean)
      };

      if (editingPost) {
        await api.updateBlogPost(editingPost.id, payload);
        success('Article Updated', `Updated "${payload.title}".`);
      } else {
        await api.createBlogPost(payload);
        success('Article Published', `Published "${payload.title}".`);
      }

      setIsModalOpen(false);
      onRefresh();
    } catch (err: any) {
      error('Save Failed', err.message || 'Could not save article.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteBlogPost(id);
      success('Article Deleted', 'Article has been removed.');
      setDeleteConfirmId(null);
      onRefresh();
    } catch (err: any) {
      error('Delete Failed', err.message || 'Could not delete article.');
    }
  };

  const filtered = blogPosts.filter(p => {
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchSearch = search === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.author.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#F4F1EA]">
            Executive Insights & Editorial ({blogPosts.length})
          </h1>
          <p className="text-xs text-[#8B8D89]">
            Publish engineering whitepapers, research findings, and technical opinions.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 bg-[#DC2626] hover:bg-[#EF4444] text-[#111315] text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Whitepaper</span>
        </button>
      </div>

      {/* Filter */}
      <div className="bg-[#141618] border border-[#24282D] p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-[#8B8D89] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search articles..."
            className="w-full bg-[#181A1D] border border-[#2F343B] pl-9 pr-3 py-1.5 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#DC2626]"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          aria-label="Filter articles by category"
          className="bg-[#181A1D] border border-[#2F343B] px-3 py-1.5 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#DC2626]"
        >
          {['All', 'Sustainability', 'Technology & AI', 'Infrastructure', 'Architecture', 'Project Management'].map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#141618] border border-[#24282D] overflow-x-auto">
        <table className="w-full text-left text-xs text-[#D9D7D0]">
          <thead className="bg-[#181A1D] text-[11px] uppercase font-mono tracking-wider text-[#8B8D89] border-b border-[#24282D]">
            <tr>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Author</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1D2024]">
            {filtered.map(post => (
              <tr key={post.id} className="hover:bg-[#181A1D]/60 transition-colors">
                <td className="py-3.5 px-4 font-semibold text-[#F4F1EA]">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 object-cover border border-[#2F343B]"
                    />
                    <div>
                      <p className="font-bold text-sm text-[#F4F1EA]">{post.title}</p>
                      <p className="text-[10px] text-[#8B8D89] font-mono">{post.readTime}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 bg-[#181A1D] border border-[#2F343B] text-[10px] text-[#DC2626]">
                    {post.category}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-[#8B8D89]">
                  {post.author.name}
                </td>
                <td className="py-3.5 px-4 text-[#8B8D89] font-mono">
                  {post.date}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => navigate('article-detail', { idOrSlug: post.slug || post.id })}
                      className="p-1.5 hover:bg-[#24282D] text-[#8B8D89] hover:text-[#F4F1EA]"
                      title="View on site"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleOpenEdit(post)}
                      className="p-1.5 hover:bg-[#24282D] text-[#8B8D89] hover:text-[#DC2626]"
                      title="Edit article"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(post.id)}
                      className="p-1.5 hover:bg-rose-950/40 text-[#8B8D89] hover:text-rose-400"
                      title="Delete article"
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

      {/* Delete Confirmation */}
      <Modal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        title="Confirm Article Deletion"
        maxWidth="md"
      >
        <div className="space-y-4">
          <p className="text-xs text-[#8B8D89]">
            Are you sure you want to permanently delete this research publication?
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
              Delete Article
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit / Create Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPost ? `Edit Article: ${editingPost.title}` : 'Publish New Whitepaper'}
        maxWidth="2xl"
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Headline *</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                className="w-full bg-[#141618] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
              />
            </div>
            <div>
              <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Category</label>
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full bg-[#141618] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
              >
                {['Sustainability', 'Technology & AI', 'Infrastructure', 'Architecture', 'Project Management'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Author Name</label>
              <input
                type="text"
                value={form.authorName}
                onChange={e => setForm({ ...form, authorName: e.target.value })}
                className="w-full bg-[#141618] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
              />
            </div>
            <div>
              <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Author Role</label>
              <input
                type="text"
                value={form.authorRole}
                onChange={e => setForm({ ...form, authorRole: e.target.value })}
                className="w-full bg-[#141618] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
              />
            </div>
            <div>
              <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Read Time</label>
              <input
                type="text"
                value={form.readTime}
                onChange={e => setForm({ ...form, readTime: e.target.value })}
                placeholder="6 min read"
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
            <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Abstract / Excerpt *</label>
            <textarea
              required
              rows={2}
              value={form.excerpt}
              onChange={e => setForm({ ...form, excerpt: e.target.value })}
              className="w-full bg-[#141618] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
            />
          </div>

          <div>
            <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Full Article Content (Markdown format) *</label>
            <textarea
              required
              rows={6}
              value={form.content}
              onChange={e => setForm({ ...form, content: e.target.value })}
              className="w-full bg-[#141618] border border-[#2F343B] p-2.5 font-mono text-xs text-[#F4F1EA]"
            />
          </div>

          <div>
            <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Tags (Comma-separated)</label>
            <input
              type="text"
              value={form.tags}
              onChange={e => setForm({ ...form, tags: e.target.value })}
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
              {saving ? 'Saving...' : 'Save Article'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
