import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  BookOpen, 
  Calendar, 
  Clock, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { BlogPost } from '../types';
import { BlogCard } from '../components/common/BlogCard';
import { SectionHeading } from '../components/common/SectionHeading';

interface InsightsPageProps {
  blogPosts?: BlogPost[];
  articles?: BlogPost[];
  navigate: (route: string, params?: { idOrSlug?: string }) => void;
}

export const InsightsPage: React.FC<InsightsPageProps> = ({ blogPosts, articles, navigate }) => {
  const posts = blogPosts || articles || [];
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Sustainability', 'Technology & AI', 'Infrastructure', 'Architecture', 'Project Management'];

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch = searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const featuredPost = posts.find(p => p.featured) || posts[0];

  return (
    <div className="flex flex-col w-full bg-[#F4F1EA] text-[#111315] pt-20 sm:pt-24">
      {/* 1. Hero Header */}
      <section className="relative py-20 sm:py-28 bg-[#F4F1EA] border-b border-[#D9D7D0] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-[#DC2626]" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#DC2626]">
                Aurelia Executive Editorial & Research
              </span>
            </div>
            <h1 className="mt-2 text-3xl sm:text-5xl lg:text-6xl font-black font-display text-[#111315] tracking-tight leading-[1.05]">
              Insights into the <br />
              <span className="stroke-text-dark">future of construction.</span>
            </h1>
            <p className="mt-6 text-base sm:text-xl text-[#5A5C58] font-normal leading-relaxed">
              White papers, technical analyses, and thought leadership from our structural engineers, computational architects, and project directors.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Featured Lead Article */}
      {featuredPost && (
        <section className="py-12 sm:py-16 bg-[#F4F1EA] border-b border-[#D9D7D0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
              <span className="text-xs font-mono text-[#DC2626] uppercase tracking-widest font-bold">
                Editor’s Feature Selection
              </span>
            </div>
            <div
              onClick={() => navigate('article-detail', { idOrSlug: featuredPost.slug || featuredPost.id })}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-[#D9D7D0] hover:border-[#111315] transition-all p-6 sm:p-8 cursor-pointer group shadow-sm"
            >
              <div className="lg:col-span-7 h-72 sm:h-96 overflow-hidden relative bg-[#111315]">
                <img
                  src={featuredPost.featuredImage}
                  alt={featuredPost.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#111315] text-[10px] uppercase font-bold text-[#F4F1EA] border border-[#111315]">
                    {featuredPost.category}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-4 text-xs text-[#5A5C58] mb-3">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#DC2626]" /> {featuredPost.date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#DC2626]" /> {featuredPost.readTime}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black font-display text-[#111315] group-hover:text-[#DC2626] transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>

                  <p className="mt-4 text-sm text-[#5A5C58] font-normal leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#D9D7D0] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full object-cover border border-[#D9D7D0]"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#111315]">{featuredPost.author.name}</p>
                      <p className="text-[10px] text-[#5A5C58] font-medium">{featuredPost.author.role}</p>
                    </div>
                  </div>

                  <span className="text-xs uppercase font-bold text-[#111315] group-hover:text-[#DC2626] transition-colors flex items-center gap-1">
                    Read Article <ArrowRight className="w-3.5 h-3.5 text-[#DC2626]" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Category Filter & Search Bar */}
      <section className="py-8 bg-white border-b border-[#D9D7D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#8B8D89] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search engineering insights..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#F4F1EA] border border-[#D9D7D0] text-xs text-[#111315] placeholder-[#8B8D89] focus:outline-none focus:border-[#111315]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#111315] text-[#F4F1EA] border border-[#111315]'
                    : 'bg-[#F4F1EA] text-[#5A5C58] hover:text-[#111315] border border-[#D9D7D0]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Articles Grid */}
      <section className="py-16 sm:py-24 bg-[#F4F1EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <BlogCard
                key={post.id}
                post={post}
                onSelect={(slug) => navigate('article-detail', { idOrSlug: slug })}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

