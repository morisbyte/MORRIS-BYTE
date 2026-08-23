import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from '../../types';

interface BlogCardProps {
  post: BlogPost;
  onSelect: (slugOrId: string) => void;
  featured?: boolean;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, onSelect, featured = false }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onSelect(post.slug || post.id)}
      className={`group cursor-pointer flex flex-col bg-white border border-[#D9D7D0] hover:border-[#111315] transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md ${
        featured ? 'lg:col-span-2 lg:flex-row' : ''
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? 'lg:w-1/2 h-64 lg:h-auto' : 'h-56 sm:h-64'} bg-[#111315]`}>
        <img
          src={post.featuredImage}
          alt={post.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111315]/80 via-transparent to-transparent opacity-60" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-[#111315]/90 backdrop-blur-md text-[10px] font-bold tracking-widest uppercase text-[#F4F1EA] border border-[#DC2626]/50">
            {post.category}
          </span>
        </div>
      </div>

      <div className={`p-6 sm:p-7 flex flex-col justify-between bg-white ${featured ? 'lg:w-1/2' : 'flex-1'}`}>
        <div>
          <div className="flex items-center gap-4 text-xs font-semibold text-[#8B8D89] mb-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#DC2626]" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#DC2626]" />
              {post.readTime}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-black font-display text-[#111315] group-hover:text-[#DC2626] transition-colors duration-300 leading-snug">
            {post.title}
          </h3>

          <p className="mt-3 text-xs sm:text-sm text-[#5A5C58] line-clamp-3 leading-relaxed font-normal">
            {post.excerpt}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-[#EAE7E0] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              referrerPolicy="no-referrer"
              className="w-7 h-7 rounded-full object-cover border border-[#D9D7D0]"
            />
            <div className="text-left">
              <p className="text-xs font-bold text-[#111315]">{post.author.name}</p>
              <p className="text-[10px] text-[#8B8D89] font-medium">{post.author.role}</p>
            </div>
          </div>

          <span className="text-xs uppercase font-bold tracking-wider text-[#111315] group-hover:text-[#DC2626] flex items-center gap-1 group-hover:translate-x-1 transition-all">
            Read <ArrowRight className="w-3.5 h-3.5 text-[#DC2626]" />
          </span>
        </div>
      </div>
    </motion.article>
  );
};

