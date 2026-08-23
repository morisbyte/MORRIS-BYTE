import React, { useState, useEffect, useCallback } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ProjectModal } from './components/common/ProjectModal';
import { JobApplicationModal } from './components/common/JobApplicationModal';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ExpertisePage } from './pages/ExpertisePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { SustainabilityPage } from './pages/SustainabilityPage';
import { InsightsPage } from './pages/InsightsPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { CareersPage } from './pages/CareersPage';
import { JobDetailPage } from './pages/JobDetailPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin CMS Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProjects } from './pages/admin/AdminProjects';
import { AdminBlog } from './pages/admin/AdminBlog';
import { AdminCareers } from './pages/admin/AdminCareers';
import { AdminApplications } from './pages/admin/AdminApplications';
import { AdminInquiries } from './pages/admin/AdminInquiries';
import { AdminMedia } from './pages/admin/AdminMedia';
import { AdminSettings } from './pages/admin/AdminSettings';
import { AdminProfile } from './pages/admin/AdminProfile';

import { Project, BlogPost, Job, JobApplication, Inquiry, MediaItem, SiteSettings } from './types';
import { INITIAL_SITE_SETTINGS } from './data/initialData';
import { api } from './services/api';

function MainApp() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  // Navigation State - checks initial hash or defaults to home
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (hash) {
      return hash.split('/')[0] || 'home';
    }
    return 'home';
  });
  const [routeParams, setRouteParams] = useState<{ idOrSlug?: string }>(() => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (hash) {
      const parts = hash.split('/');
      return parts[1] ? { idOrSlug: parts[1] } : {};
    }
    return {};
  });
  const [adminTab, setAdminTab] = useState<string>('overview');

  // Modal State
  const [isRfpModalOpen, setIsRfpModalOpen] = useState(false);
  const [selectedJobForModal, setSelectedJobForModal] = useState<Job | null>(null);

  // App Data State
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SITE_SETTINGS);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Fetch all CMS data
  const loadData = useCallback(async () => {
    try {
      const [projRes, blogRes, jobsRes, settRes] = await Promise.all([
        api.getProjects(),
        api.getBlogPosts(),
        api.getJobs(),
        api.getSettings()
      ]);
      setProjects(projRes);
      setBlogPosts(blogRes);
      setJobs(jobsRes);
      setSettings(settRes);

      // If authenticated, also load admin-restricted pipelines
      if (isAuthenticated) {
        try {
          const [appsRes, inqRes, medRes] = await Promise.all([
            api.getApplications(),
            api.getInquiries(),
            api.getMedia()
          ]);
          setApplications(appsRes);
          setInquiries(inqRes);
          setMedia(medRes);
        } catch (e) {
          console.warn('Admin sub-collections not yet loaded');
        }
      }
      setDataLoaded(true);
    } catch (err) {
      console.error('Failed to load initial site data:', err);
      setDataLoaded(true);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Route Synchronization with Hash for browser navigation
  const navigate = useCallback((route: string, params: { idOrSlug?: string } = {}) => {
    // Normalize CMS routes
    const targetRoute = ['admin-login', 'cms', 'portal', 'login', 'dashboard', 'executive'].includes(route)
      ? 'admin'
      : route;

    setCurrentRoute(targetRoute);
    setRouteParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let hash = `#/${targetRoute}`;
    if (params.idOrSlug) {
      hash += `/${params.idOrSlug}`;
    }
    if (window.location.hash !== hash) {
      window.history.pushState(null, '', hash);
    }
  }, []);

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash) {
        setCurrentRoute('home');
        setRouteParams({});
        return;
      }

      const parts = hash.split('/');
      let primaryRoute = parts[0];
      const param = parts[1];

      // Normalize CMS/Admin aliases
      if (['admin-login', 'cms', 'portal', 'login', 'dashboard', 'executive'].includes(primaryRoute)) {
        primaryRoute = 'admin';
      }

      if (primaryRoute) {
        setCurrentRoute(primaryRoute);
        if (param) {
          setRouteParams({ idOrSlug: param });
        } else {
          setRouteParams({});
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Handler for career job application
  const handleOpenJobApplication = (job: Job) => {
    setSelectedJobForModal(job);
  };

  const isAdminRoute = [
    'admin',
    'admin-login',
    'cms',
    'portal',
    'login',
    'dashboard',
    'executive'
  ].includes(currentRoute) || currentRoute.startsWith('admin/') || currentRoute.startsWith('cms/');

  // Render Admin View
  if (isAdminRoute) {
    if (authLoading) {
      return (
        <div className="min-h-screen bg-[#0D0E10] flex items-center justify-center text-[#DC2626] font-mono text-xs">
          AUTHENTICATING CORPORATE CREDENTIALS...
        </div>
      );
    }

    if (!isAuthenticated) {
      return (
        <AdminLoginPage
          onSuccess={() => {
            loadData();
            navigate('admin');
          }}
          onBackToSite={() => navigate('home')}
        />
      );
    }

    return (
      <AdminLayout
        currentTab={adminTab}
        onSelectTab={setAdminTab}
        onExitToSite={() => navigate('home')}
        unreadInquiriesCount={inquiries.filter(i => i.status === 'New').length}
        unreadApplicationsCount={applications.filter(a => a.status === 'Pending').length}
      >
        {adminTab === 'overview' && (
          <AdminDashboard
            projects={projects}
            blogPosts={blogPosts}
            jobs={jobs}
            applications={applications}
            inquiries={inquiries}
            media={media}
            onSelectTab={setAdminTab}
            navigate={navigate}
          />
        )}
        {adminTab === 'projects' && (
          <AdminProjects
            projects={projects}
            onRefresh={loadData}
            navigate={navigate}
          />
        )}
        {adminTab === 'blog' && (
          <AdminBlog
            blogPosts={blogPosts}
            onRefresh={loadData}
            navigate={navigate}
          />
        )}
        {adminTab === 'careers' && (
          <AdminCareers
            jobs={jobs}
            onRefresh={loadData}
          />
        )}
        {adminTab === 'applications' && (
          <AdminApplications
            applications={applications}
            onRefresh={loadData}
          />
        )}
        {adminTab === 'inquiries' && (
          <AdminInquiries
            inquiries={inquiries}
            onRefresh={loadData}
          />
        )}
        {adminTab === 'media' && (
          <AdminMedia
            media={media}
            onRefresh={loadData}
          />
        )}
        {adminTab === 'settings' && settings && (
          <AdminSettings
            settings={settings}
            onRefresh={loadData}
          />
        )}
        {adminTab === 'profile' && (
          <AdminProfile />
        )}
      </AdminLayout>
    );
  }

  // Render Public Website
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F1EA] text-[#111315] selection:bg-[#DC2626] selection:text-[#111315]">
      {/* Global Navigation Bar */}
      <Navbar
        currentRoute={currentRoute}
        navigate={navigate}
        onOpenProjectModal={() => setIsRfpModalOpen(true)}
      />

      {/* Main Page Routing */}
      <main className="flex-grow">
        {currentRoute === 'home' && (
          <HomePage
            navigate={navigate}
            projects={projects}
            blogPosts={blogPosts}
            settings={settings}
            onOpenProjectModal={() => setIsRfpModalOpen(true)}
          />
        )}

        {currentRoute === 'about' && (
          <AboutPage
            navigate={navigate}
            settings={settings}
            onOpenProjectModal={() => setIsRfpModalOpen(true)}
          />
        )}

        {currentRoute === 'expertise' && (
          <ExpertisePage
            navigate={navigate}
            onOpenProjectModal={() => setIsRfpModalOpen(true)}
          />
        )}

        {currentRoute === 'projects' && (
          <ProjectsPage
            projects={projects}
            navigate={navigate}
          />
        )}

        {currentRoute === 'project-detail' && (
          <ProjectDetailPage
            idOrSlug={routeParams.idOrSlug}
            navigate={navigate}
            onOpenProjectModal={() => setIsRfpModalOpen(true)}
          />
        )}

        {currentRoute === 'sustainability' && (
          <SustainabilityPage
            navigate={navigate}
            onOpenProjectModal={() => setIsRfpModalOpen(true)}
          />
        )}

        {currentRoute === 'insights' && (
          <InsightsPage
            articles={blogPosts}
            navigate={navigate}
          />
        )}

        {currentRoute === 'article-detail' && (
          <ArticleDetailPage
            idOrSlug={routeParams.idOrSlug}
            navigate={navigate}
          />
        )}

        {currentRoute === 'careers' && (
          <CareersPage
            jobs={jobs}
            navigate={navigate}
            onApply={handleOpenJobApplication}
          />
        )}

        {currentRoute === 'job-detail' && (
          <JobDetailPage
            idOrSlug={routeParams.idOrSlug}
            navigate={navigate}
            onApply={handleOpenJobApplication}
          />
        )}

        {currentRoute === 'contact' && (
          <ContactPage
            settings={settings}
            navigate={navigate}
            onInquirySuccess={loadData}
          />
        )}

        {/* 404 Fallback */}
        {![
          'home', 'about', 'expertise', 'projects', 'project-detail',
          'sustainability', 'insights', 'article-detail', 'careers',
          'job-detail', 'contact'
        ].includes(currentRoute) && (
          <NotFoundPage navigate={navigate} />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        navigate={navigate}
        onOpenProjectModal={() => setIsRfpModalOpen(true)}
      />

      {/* Global Interactive Modals */}
      <ProjectModal
        isOpen={isRfpModalOpen}
        onClose={() => setIsRfpModalOpen(false)}
        onSubmitted={loadData}
      />

      <JobApplicationModal
        job={selectedJobForModal}
        isOpen={!!selectedJobForModal}
        onClose={() => setSelectedJobForModal(null)}
        onSubmitted={loadData}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <MainApp />
      </ToastProvider>
    </AuthProvider>
  );
}
