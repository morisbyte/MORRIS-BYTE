import { 
  Project, 
  BlogPost, 
  Job, 
  ContactInquiry, 
  Inquiry,
  JobApplication, 
  MediaItem, 
  SiteSettings, 
  AdminUser 
} from '../types';

const API_BASE = '/api';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('acg_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export const api = {
  // Auth
  async login(identifier: string, passwordPlain: string): Promise<{ success: boolean; user: AdminUser; token: string }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        identifier, 
        username: identifier, 
        email: identifier, 
        password: passwordPlain 
      })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Authentication failed' }));
      throw new Error(err.error || 'Authentication failed');
    }
    return res.json();
  },

  async getMe(): Promise<{ user: AdminUser }> {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Session invalid');
    return res.json();
  },

  // Projects
  async getProjects(includeAll = false): Promise<Project[]> {
    const res = await fetch(`${API_BASE}/projects${includeAll ? '?all=true' : ''}`);
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
  },

  async getProject(idOrSlug: string): Promise<Project> {
    const res = await fetch(`${API_BASE}/projects/${idOrSlug}`);
    if (!res.ok) throw new Error('Project not found');
    return res.json();
  },

  async createProject(project: Partial<Project>): Promise<Project> {
    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(project)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to create project' }));
      throw new Error(err.error || 'Failed to create project');
    }
    return res.json();
  },

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to update project' }));
      throw new Error(err.error || 'Failed to update project');
    }
    return res.json();
  },

  async deleteProject(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete project');
  },

  // Blog
  async getBlogPosts(includeAll = false): Promise<BlogPost[]> {
    const res = await fetch(`${API_BASE}/blog${includeAll ? '?all=true' : ''}`);
    if (!res.ok) throw new Error('Failed to fetch blog posts');
    return res.json();
  },

  async getBlogPost(idOrSlug: string): Promise<BlogPost> {
    const res = await fetch(`${API_BASE}/blog/${idOrSlug}`);
    if (!res.ok) throw new Error('Article not found');
    return res.json();
  },

  async createBlogPost(post: Partial<BlogPost>): Promise<BlogPost> {
    const res = await fetch(`${API_BASE}/blog`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(post)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to create article' }));
      throw new Error(err.error || 'Failed to create article');
    }
    return res.json();
  },

  async updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
    const res = await fetch(`${API_BASE}/blog/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to update article' }));
      throw new Error(err.error || 'Failed to update article');
    }
    return res.json();
  },

  async deleteBlogPost(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/blog/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete article');
  },

  // Careers & Jobs
  async getJobs(includeClosed = false): Promise<Job[]> {
    const res = await fetch(`${API_BASE}/careers${includeClosed ? '?all=true' : ''}`);
    if (!res.ok) throw new Error('Failed to fetch jobs');
    return res.json();
  },

  async getJob(id: string): Promise<Job> {
    const res = await fetch(`${API_BASE}/careers/${id}`);
    if (!res.ok) throw new Error('Job opening not found');
    return res.json();
  },

  async createJob(job: Partial<Job>): Promise<Job> {
    const res = await fetch(`${API_BASE}/careers`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(job)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to create job opening' }));
      throw new Error(err.error || 'Failed to create job opening');
    }
    return res.json();
  },

  async updateJob(id: string, updates: Partial<Job>): Promise<Job> {
    const res = await fetch(`${API_BASE}/careers/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to update job' }));
      throw new Error(err.error || 'Failed to update job');
    }
    return res.json();
  },

  async deleteJob(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/careers/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete job');
  },

  // Job Applications
  async getApplications(): Promise<JobApplication[]> {
    const res = await fetch(`${API_BASE}/applications`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch applications');
    const apps = await res.json();
    return apps.map((a: any) => ({
      ...a,
      name: a.name || a.candidateName,
      submittedAt: a.submittedAt || a.createdAt
    }));
  },

  async submitApplication(application: Partial<JobApplication>): Promise<{ success: boolean; message: string; application: JobApplication }> {
    const payload = {
      ...application,
      candidateName: application.candidateName || application.name
    };
    const res = await fetch(`${API_BASE}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to submit application' }));
      throw new Error(err.error || 'Failed to submit application');
    }
    return res.json();
  },

  async createApplication(application: Partial<JobApplication>): Promise<{ success: boolean; message: string; application: JobApplication }> {
    return this.submitApplication(application);
  },

  async updateApplicationStatus(id: string, status: JobApplication['status'], notes?: string): Promise<JobApplication> {
    const res = await fetch(`${API_BASE}/applications/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status, notes })
    });
    if (!res.ok) throw new Error('Failed to update application status');
    return res.json();
  },

  async deleteApplication(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/applications/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete application');
  },

  // Inquiries / Contact RFPs
  async getInquiries(): Promise<Inquiry[]> {
    const res = await fetch(`${API_BASE}/inquiries`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch inquiries');
    const list = await res.json();
    return list.map((i: any) => ({
      ...i,
      name: i.name || i.fullName,
      description: i.description || i.projectDescription,
      submittedAt: i.submittedAt || i.createdAt
    }));
  },

  async submitInquiry(inquiry: Partial<Inquiry>): Promise<{ success: boolean; message: string; inquiryId: string }> {
    const payload = {
      ...inquiry,
      fullName: inquiry.fullName || inquiry.name,
      projectDescription: inquiry.projectDescription || inquiry.description
    };
    const res = await fetch(`${API_BASE}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to submit RFP' }));
      throw new Error(err.error || 'Failed to submit RFP');
    }
    return res.json();
  },

  async createInquiry(inquiry: Partial<Inquiry>): Promise<{ success: boolean; message: string; inquiryId: string }> {
    return this.submitInquiry(inquiry);
  },

  async updateInquiryStatus(id: string, status: Inquiry['status'], internalNotes?: string, assignedTo?: string): Promise<Inquiry> {
    const res = await fetch(`${API_BASE}/inquiries/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status, internalNotes, assignedTo })
    });
    if (!res.ok) throw new Error('Failed to update inquiry status');
    return res.json();
  },

  async deleteInquiry(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/inquiries/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete inquiry');
  },

  // Media
  async getMedia(): Promise<MediaItem[]> {
    const res = await fetch(`${API_BASE}/media`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch media library');
    const items = await res.json();
    return items.map((m: any) => ({
      ...m,
      title: m.title || m.name,
      uploadedAt: m.uploadedAt || m.createdAt
    }));
  },

  async addMedia(mediaItem: Partial<MediaItem>): Promise<MediaItem> {
    const payload = {
      ...mediaItem,
      name: mediaItem.name || mediaItem.title
    };
    const res = await fetch(`${API_BASE}/media`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to add media item');
    return res.json();
  },

  async createMediaItem(mediaItem: Partial<MediaItem>): Promise<MediaItem> {
    return this.addMedia(mediaItem);
  },

  async deleteMedia(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/media/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete media item');
  },

  async deleteMediaItem(id: string): Promise<void> {
    return this.deleteMedia(id);
  },

  // Settings & Dashboard Overview
  async getSiteSettings(): Promise<SiteSettings> {
    const res = await fetch(`${API_BASE}/settings`);
    if (!res.ok) throw new Error('Failed to fetch site settings');
    return res.json();
  },

  async getSettings(): Promise<SiteSettings> {
    return this.getSiteSettings();
  },

  async updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    const res = await fetch(`${API_BASE}/settings`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(settings)
    });
    if (!res.ok) throw new Error('Failed to update site settings');
    return res.json();
  },

  async updateSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    return this.updateSiteSettings(settings);
  },

  async getDashboardOverview(): Promise<any> {
    const res = await fetch(`${API_BASE}/dashboard/overview`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch CMS overview');
    return res.json();
  }
};
