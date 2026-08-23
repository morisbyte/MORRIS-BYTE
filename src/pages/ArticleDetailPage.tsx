import React from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Tag, 
  User, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { BlogPost } from '../types';
import { BlogCard } from '../components/common/BlogCard';
import { useToast } from '../context/ToastContext';

interface ArticleDetailPageProps {
  slugOrId?: string;
  idOrSlug?: string;
  blogPosts?: BlogPost[];
  navigate: (route: string, params?: { idOrSlug?: string }) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  slugOrId,
  idOrSlug,
  blogPosts = [],
  navigate
}) => {
  const { success } = useToast();
  const targetId = slugOrId || idOrSlug || '';
  const post = blogPosts.find(p => p.slug === targetId || p.id === targetId) || blogPosts[0];

  const relatedPosts = blogPosts
    .filter(p => p.id !== post?.id && (p.category === post?.category || p.tags?.some(t => post?.tags?.includes(t))))
    .slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#F4F1EA] pt-32 text-center text-[#111315]">
        <h2 className="text-2xl font-black font-display">Article not found</h2>
        <button onClick={() => navigate('insights')} className="mt-4 text-[#DC2626] font-bold">
          Return to Insights
        </button>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    success('Link Copied', 'Article URL copied to clipboard.');
  };

  return (
    <div className="flex flex-col w-full bg-[#F4F1EA] text-[#111315] pt-20">
      {/* Article Header */}
      <section className="relative py-16 sm:py-24 bg-[#F4F1EA] border-b border-[#D9D7D0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('insights')}
            className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#DC2626] hover:text-[#111315] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Insights</span>
          </button>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-white border border-[#D9D7D0] text-[#111315] text-xs font-bold uppercase tracking-widest shadow-sm">
              {post.category}
            </span>
            <span className="text-xs text-[#5A5C58] font-mono flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#DC2626]" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-display text-[#111315] tracking-tight leading-[1.15]">
            {post.title}
          </h1>

          <p className="mt-6 text-base sm:text-xl text-[#5A5C58] font-normal leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author & Share Bar */}
          <div className="mt-8 pt-6 border-t border-[#D9D7D0] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border border-[#D9D7D0]"
              />
              <div>
                <p className="text-sm font-bold text-[#111315]">{post.author.name}</p>
                <p className="text-xs text-[#5A5C58] font-medium">{post.author.role} • {post.date}</p>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="px-4 py-2 bg-white border border-[#D9D7D0] hover:border-[#111315] text-xs font-bold text-[#111315] flex items-center gap-2 transition-colors shadow-sm"
            >
              <Share2 className="w-4 h-4 text-[#DC2626]" />
              <span>Share Article</span>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Visual */}
      <section className="bg-[#F4F1EA] py-8 sm:py-12 border-b border-[#D9D7D0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-72 sm:h-[450px] bg-[#111315] border border-[#D9D7D0] overflow-hidden shadow-sm">
            <img
              src={post.featuredImage}
              alt={post.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Article Body Content */}
      <section className="py-12 bg-white border-b border-[#D9D7D0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose max-w-none text-[#111315] leading-relaxed text-base sm:text-lg space-y-6">
            {post.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={idx} className="text-2xl sm:text-3xl font-black font-display text-[#111315] pt-6 pb-2 border-b border-[#D9D7D0]">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-xl sm:text-2xl font-black font-display text-[#DC2626] pt-4">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('- ')) {
                const listItems = paragraph.split('\n').map(item => item.replace('- ', ''));
                return (
                  <ul key={idx} className="space-y-2 my-4 pl-4 border-l-2 border-[#DC2626]">
                    {listItems.map((li, i) => (
                      <li key={i} className="text-sm sm:text-base text-[#5A5C58] font-normal">
                        {li}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="text-sm sm:text-base text-[#5A5C58] font-normal leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-[#D9D7D0]">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-[#DC2626]" />
              {post.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-[#F4F1EA] border border-[#D9D7D0] text-xs font-semibold text-[#5A5C58]">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-16 sm:py-24 bg-[#F4F1EA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-black font-display text-[#111315] mb-8">
              Related Research & Perspectives
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(rel => (
                <BlogCard
                  key={rel.id}
                  post={rel}
                  onSelect={(slug) => navigate('article-detail', { idOrSlug: slug })}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
