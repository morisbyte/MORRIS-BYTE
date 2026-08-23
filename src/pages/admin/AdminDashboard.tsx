import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  BookOpen, 
  Briefcase, 
  Users, 
  MessageSquareText, 
  Image as ImageIcon,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Project, BlogPost, Job, JobApplication, Inquiry, MediaItem } from '../../types';

interface AdminDashboardProps {
  projects: Project[];
  blogPosts: BlogPost[];
  jobs: Job[];
  applications: JobApplication[];
  inquiries: Inquiry[];
  media: MediaItem[];
  onSelectTab: (tab: string) => void;
  navigate: (route: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  projects,
  blogPosts,
  jobs,
  applications,
  inquiries,
  media,
  onSelectTab,
  navigate
}) => {
  const pendingInquiries = inquiries.filter(i => i.status === 'New').length;
  const pendingApps = applications.filter(a => a.status === 'Pending').length;

  const cards = [
    {
      title: 'Projects Portfolio',
      count: projects.length,
      sublabel: `${projects.filter(p => p.status === 'Completed').length} Completed, ${projects.filter(p => p.status === 'Under Construction').length} Active`,
      icon: Building2,
      tab: 'projects'
    },
    {
      title: 'Insights & Research',
      count: blogPosts.length,
      sublabel: 'Published technical whitepapers',
      icon: BookOpen,
      tab: 'blog'
    },
    {
      title: 'Open Positions',
      count: jobs.length,
      sublabel: 'Active job requisitions',
      icon: Briefcase,
      tab: 'careers'
    },
    {
      title: 'Candidate Inflow',
      count: applications.length,
      sublabel: `${pendingApps} pending review`,
      icon: Users,
      tab: 'applications',
      highlight: pendingApps > 0
    },
    {
      title: 'Client Proposals (RFPs)',
      count: inquiries.length,
      sublabel: `${pendingInquiries} new briefs`,
      icon: MessageSquareText,
      tab: 'inquiries',
      highlight: pendingInquiries > 0
    },
    {
      title: 'Media Assets',
      count: media.length,
      sublabel: 'Architectural photography & CAD',
      icon: ImageIcon,
      tab: 'media'
    }
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#DC2626] uppercase tracking-widest block mb-1 font-bold">
            CMS Executive Workspace
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-[#111315]">
            Corporate Control Center
          </h1>
          <p className="text-xs text-[#5A5C58] mt-1 font-medium">
            Real-time management of projects, publications, candidate pipelines, and client RFP briefs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectTab('projects')}
            className="px-4 py-2 bg-[#DC2626] hover:bg-[#EF4444] text-[#111315] text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            + New Project
          </button>
          <button
            onClick={() => onSelectTab('blog')}
            className="px-4 py-2 bg-white hover:bg-[#D9D7D0] border border-[#D9D7D0] text-[#111315] text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            + New Article
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              onClick={() => onSelectTab(card.tab)}
              className={`p-6 bg-white border transition-all cursor-pointer group flex flex-col justify-between shadow-sm ${
                card.highlight
                  ? 'border-[#DC2626] bg-[#FBF9F5]'
                  : 'border-[#D9D7D0] hover:border-[#111315]'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono text-[#5A5C58] uppercase tracking-wider block mb-1 font-bold">
                    {card.title}
                  </span>
                  <span className="text-3xl sm:text-4xl font-black font-display text-[#111315] block">
                    {card.count}
                  </span>
                </div>
                <div className="w-10 h-10 bg-[#F4F1EA] border border-[#D9D7D0] group-hover:border-[#111315] flex items-center justify-center text-[#DC2626] transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#D9D7D0] flex items-center justify-between text-xs">
                <span className="text-[#5A5C58] font-medium">{card.sublabel}</span>
                <span className="text-[#DC2626] font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Manage <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Client RFPs & Candidate Applications Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Inquiries */}
        <div className="bg-white border border-[#D9D7D0] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-black font-display text-[#111315]">
              Recent Project Proposals (RFPs)
            </h3>
            <button
              onClick={() => onSelectTab('inquiries')}
              className="text-xs text-[#DC2626] font-bold hover:underline"
            >
              View All ({inquiries.length})
            </button>
          </div>

          <div className="space-y-3">
            {inquiries.slice(0, 4).map(inq => (
              <div
                key={inq.id}
                onClick={() => onSelectTab('inquiries')}
                className="p-3.5 bg-[#F4F1EA] border border-[#D9D7D0] hover:border-[#111315] flex items-center justify-between cursor-pointer transition-colors"
              >
                <div>
                  <p className="text-xs font-bold text-[#111315]">{inq.name}</p>
                  <p className="text-[11px] text-[#5A5C58] font-medium">{inq.company || inq.email} • {inq.projectType}</p>
                </div>
                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                  inq.status === 'New' ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-white text-[#5A5C58] border border-[#D9D7D0]'
                }`}>
                  {inq.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Candidate Applications */}
        <div className="bg-white border border-[#D9D7D0] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-black font-display text-[#111315]">
              Recent Talent Inflow
            </h3>
            <button
              onClick={() => onSelectTab('applications')}
              className="text-xs text-[#DC2626] font-bold hover:underline"
            >
              View All ({applications.length})
            </button>
          </div>

          <div className="space-y-3">
            {applications.slice(0, 4).map(app => (
              <div
                key={app.id}
                onClick={() => onSelectTab('applications')}
                className="p-3.5 bg-[#F4F1EA] border border-[#D9D7D0] hover:border-[#111315] flex items-center justify-between cursor-pointer transition-colors"
              >
                <div>
                  <p className="text-xs font-bold text-[#111315]">{app.name}</p>
                  <p className="text-[11px] text-[#5A5C58] font-medium">{app.jobTitle} • {app.email}</p>
                </div>
                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                  app.status === 'Pending' ? 'bg-indigo-100 text-indigo-900 border border-indigo-300' : 'bg-white text-[#5A5C58] border border-[#D9D7D0]'
                }`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
