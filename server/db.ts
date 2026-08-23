import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { 
  Project, 
  BlogPost, 
  Job, 
  ContactInquiry, 
  JobApplication, 
  MediaItem, 
  SiteSettings, 
  AdminUser 
} from '../src/types.js';
import { 
  INITIAL_PROJECTS, 
  INITIAL_BLOG_POSTS, 
  INITIAL_JOBS, 
  INITIAL_INQUIRIES, 
  INITIAL_APPLICATIONS, 
  INITIAL_MEDIA, 
  INITIAL_SITE_SETTINGS 
} from './data/seedData.js';

interface DatabaseSchema {
  projects: Project[];
  blogPosts: BlogPost[];
  jobs: Job[];
  inquiries: ContactInquiry[];
  applications: JobApplication[];
  media: MediaItem[];
  siteSettings: SiteSettings;
  users: (AdminUser & { passwordHash: string })[];
}

const DB_FILE = path.join(process.cwd(), 'data', 'db.json');

// Executive Admin users
const KAINAT_PASS_HASH = crypto.createHash('sha256').update('Werewolf').digest('hex');
const DEFAULT_PASS_HASH = crypto.createHash('sha256').update('aurelia2026').digest('hex');

const KAINAT_ADMIN: AdminUser & { passwordHash: string } = {
  id: 'usr-admin-kainat',
  email: 'morrisbyte0786@gmail.com',
  username: 'Kainat',
  name: 'Kainat (Morris Byte)',
  role: 'Super Admin & Executive Director',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
  passwordHash: KAINAT_PASS_HASH
};

const DEFAULT_ADMIN: AdminUser & { passwordHash: string } = {
  id: 'usr-admin-01',
  email: 'admin@aureliaconstruct.com',
  username: 'admin',
  name: 'Marcus Vance',
  role: 'Executive Director',
  avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop',
  passwordHash: DEFAULT_PASS_HASH
};

class Database {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.loadDatabase();
  }

  private loadDatabase(): DatabaseSchema {
    try {
      const dataDir = path.dirname(DB_FILE);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(fileContent);
        const existingUsers = Array.isArray(parsed.users) ? parsed.users : [];
        const hasKainat = existingUsers.some((u: any) => u.username?.toLowerCase() === 'kainat' || u.name?.toLowerCase() === 'kainat' || u.email?.toLowerCase() === 'kainat@aureliaconstruct.com');
        const users = hasKainat ? existingUsers : [KAINAT_ADMIN, ...existingUsers];

        return {
          projects: parsed.projects || INITIAL_PROJECTS,
          blogPosts: parsed.blogPosts || INITIAL_BLOG_POSTS,
          jobs: parsed.jobs || INITIAL_JOBS,
          inquiries: parsed.inquiries || INITIAL_INQUIRIES,
          applications: parsed.applications || INITIAL_APPLICATIONS,
          media: parsed.media || INITIAL_MEDIA,
          siteSettings: parsed.siteSettings || INITIAL_SITE_SETTINGS,
          users: users.length > 0 ? users : [KAINAT_ADMIN, DEFAULT_ADMIN]
        };
      }
    } catch (err) {
      console.warn('Could not read persistent DB file, initializing with seed data:', err);
    }

    // Default Seed state
    const initial: DatabaseSchema = {
      projects: INITIAL_PROJECTS,
      blogPosts: INITIAL_BLOG_POSTS,
      jobs: INITIAL_JOBS,
      inquiries: INITIAL_INQUIRIES,
      applications: INITIAL_APPLICATIONS,
      media: INITIAL_MEDIA,
      siteSettings: INITIAL_SITE_SETTINGS,
      users: [KAINAT_ADMIN, DEFAULT_ADMIN]
    };

    this.saveDatabase(initial);
    return initial;
  }

  private saveDatabase(dataToSave?: DatabaseSchema): void {
    try {
      const dataDir = path.dirname(DB_FILE);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(dataToSave || this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write database file:', err);
    }
  }

  // --- Auth & Users ---
  public authenticateUser(identifier: string, passwordPlain: string): { user: AdminUser; token: string } | null {
    const cleanId = (identifier || '').trim().toLowerCase();
    const hash = crypto.createHash('sha256').update(passwordPlain).digest('hex');

    const user = this.data.users.find(u => {
      const matchEmail = u.email && u.email.toLowerCase() === cleanId;
      const matchUsername = u.username && u.username.toLowerCase() === cleanId;
      const matchName = u.name && u.name.toLowerCase() === cleanId;
      const isIdentifierMatch = matchEmail || matchUsername || matchName;

      if (!isIdentifierMatch) return false;

      // Check password hash or direct known password match
      const passMatch = u.passwordHash === hash ||
        (cleanId === 'kainat' && passwordPlain === 'Werewolf') ||
        (u.username === 'Kainat' && passwordPlain === 'Werewolf');

      return passMatch;
    });

    if (!user) return null;

    // Generate safe session token
    const token = `acg_jwt_${user.id}_${Date.now()}_${crypto.randomBytes(16).toString('hex')}`;
    const { passwordHash, ...safeUser } = user;
    return { user: safeUser, token };
  }

  public getUserById(id: string): AdminUser | null {
    const user = this.data.users.find(u => u.id === id);
    if (!user) return null;
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }

  // --- Projects ---
  public getProjects(includeUnpublished = false): Project[] {
    if (includeUnpublished) return [...this.data.projects];
    return this.data.projects.filter(p => p.published);
  }

  public getProjectByIdOrSlug(idOrSlug: string): Project | null {
    return this.data.projects.find(p => p.id === idOrSlug || p.slug === idOrSlug) || null;
  }

  public createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project {
    const newProject: Project = {
      ...projectData,
      id: `proj-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.data.projects.unshift(newProject);
    this.saveDatabase();
    return newProject;
  }

  public updateProject(id: string, updates: Partial<Project>): Project | null {
    const index = this.data.projects.findIndex(p => p.id === id);
    if (index === -1) return null;
    this.data.projects[index] = {
      ...this.data.projects[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.saveDatabase();
    return this.data.projects[index];
  }

  public deleteProject(id: string): boolean {
    const initialLen = this.data.projects.length;
    this.data.projects = this.data.projects.filter(p => p.id !== id);
    if (this.data.projects.length !== initialLen) {
      this.saveDatabase();
      return true;
    }
    return false;
  }

  // --- Blog Posts ---
  public getBlogPosts(includeUnpublished = false): BlogPost[] {
    if (includeUnpublished) return [...this.data.blogPosts];
    return this.data.blogPosts.filter(b => b.published);
  }

  public getBlogPostByIdOrSlug(idOrSlug: string): BlogPost | null {
    return this.data.blogPosts.find(b => b.id === idOrSlug || b.slug === idOrSlug) || null;
  }

  public createBlogPost(postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): BlogPost {
    const newPost: BlogPost = {
      ...postData,
      id: `post-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.data.blogPosts.unshift(newPost);
    this.saveDatabase();
    return newPost;
  }

  public updateBlogPost(id: string, updates: Partial<BlogPost>): BlogPost | null {
    const index = this.data.blogPosts.findIndex(b => b.id === id);
    if (index === -1) return null;
    this.data.blogPosts[index] = {
      ...this.data.blogPosts[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.saveDatabase();
    return this.data.blogPosts[index];
  }

  public deleteBlogPost(id: string): boolean {
    const initialLen = this.data.blogPosts.length;
    this.data.blogPosts = this.data.blogPosts.filter(b => b.id !== id);
    if (this.data.blogPosts.length !== initialLen) {
      this.saveDatabase();
      return true;
    }
    return false;
  }

  // --- Careers & Jobs ---
  public getJobs(includeClosed = false): Job[] {
    if (includeClosed) return [...this.data.jobs];
    return this.data.jobs.filter(j => j.status === 'Open');
  }

  public getJobById(id: string): Job | null {
    return this.data.jobs.find(j => j.id === id) || null;
  }

  public createJob(jobData: Omit<Job, 'id' | 'createdAt'>): Job {
    const newJob: Job = {
      ...jobData,
      id: `job-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString()
    };
    this.data.jobs.unshift(newJob);
    this.saveDatabase();
    return newJob;
  }

  public updateJob(id: string, updates: Partial<Job>): Job | null {
    const index = this.data.jobs.findIndex(j => j.id === id);
    if (index === -1) return null;
    this.data.jobs[index] = {
      ...this.data.jobs[index],
      ...updates
    };
    this.saveDatabase();
    return this.data.jobs[index];
  }

  public deleteJob(id: string): boolean {
    const initialLen = this.data.jobs.length;
    this.data.jobs = this.data.jobs.filter(j => j.id !== id);
    if (this.data.jobs.length !== initialLen) {
      this.saveDatabase();
      return true;
    }
    return false;
  }

  // --- Applications ---
  public getApplications(): JobApplication[] {
    return [...this.data.applications];
  }

  public createApplication(appData: Omit<JobApplication, 'id' | 'createdAt' | 'status'>): JobApplication {
    const newApp: JobApplication = {
      ...appData,
      id: `app-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    this.data.applications.unshift(newApp);
    this.saveDatabase();
    return newApp;
  }

  public updateApplicationStatus(id: string, status: JobApplication['status'], notes?: string): JobApplication | null {
    const index = this.data.applications.findIndex(a => a.id === id);
    if (index === -1) return null;
    this.data.applications[index] = {
      ...this.data.applications[index],
      status,
      ...(notes !== undefined ? { notes } : {})
    };
    this.saveDatabase();
    return this.data.applications[index];
  }

  public deleteApplication(id: string): boolean {
    const initialLen = this.data.applications.length;
    this.data.applications = this.data.applications.filter(a => a.id !== id);
    if (this.data.applications.length !== initialLen) {
      this.saveDatabase();
      return true;
    }
    return false;
  }

  // --- Contact Inquiries ---
  public getInquiries(): ContactInquiry[] {
    return [...this.data.inquiries];
  }

  public createInquiry(inquiryData: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>): ContactInquiry {
    const newInquiry: ContactInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      status: 'Unread',
      createdAt: new Date().toISOString()
    };
    this.data.inquiries.unshift(newInquiry);
    this.saveDatabase();
    return newInquiry;
  }

  public updateInquiryStatus(id: string, status: ContactInquiry['status'], internalNotes?: string, assignedTo?: string): ContactInquiry | null {
    const index = this.data.inquiries.findIndex(i => i.id === id);
    if (index === -1) return null;
    this.data.inquiries[index] = {
      ...this.data.inquiries[index],
      status,
      ...(internalNotes !== undefined ? { internalNotes } : {}),
      ...(assignedTo !== undefined ? { assignedTo } : {})
    };
    this.saveDatabase();
    return this.data.inquiries[index];
  }

  public deleteInquiry(id: string): boolean {
    const initialLen = this.data.inquiries.length;
    this.data.inquiries = this.data.inquiries.filter(i => i.id !== id);
    if (this.data.inquiries.length !== initialLen) {
      this.saveDatabase();
      return true;
    }
    return false;
  }

  // --- Media Library ---
  public getMedia(): MediaItem[] {
    return [...this.data.media];
  }

  public addMedia(item: Omit<MediaItem, 'id' | 'createdAt'>): MediaItem {
    const newMedia: MediaItem = {
      ...item,
      id: `med-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString()
    };
    this.data.media.unshift(newMedia);
    this.saveDatabase();
    return newMedia;
  }

  public deleteMedia(id: string): boolean {
    const initialLen = this.data.media.length;
    this.data.media = this.data.media.filter(m => m.id !== id);
    if (this.data.media.length !== initialLen) {
      this.saveDatabase();
      return true;
    }
    return false;
  }

  // --- Site Settings ---
  public getSiteSettings(): SiteSettings {
    return { ...this.data.siteSettings };
  }

  public updateSiteSettings(settings: Partial<SiteSettings>): SiteSettings {
    this.data.siteSettings = {
      ...this.data.siteSettings,
      ...settings,
      stats: {
        ...this.data.siteSettings.stats,
        ...(settings.stats || {})
      }
    };
    this.saveDatabase();
    return this.data.siteSettings;
  }

  // --- CMS Dashboard Aggregates ---
  public getDashboardOverview() {
    const totalProjects = this.data.projects.length;
    const publishedProjects = this.data.projects.filter(p => p.published).length;
    const draftProjects = totalProjects - publishedProjects;
    const totalBlogPosts = this.data.blogPosts.length;
    const publishedBlogPosts = this.data.blogPosts.filter(b => b.published).length;
    const totalJobs = this.data.jobs.length;
    const openJobs = this.data.jobs.filter(j => j.status === 'Open').length;
    const totalApplications = this.data.applications.length;
    const newApplications = this.data.applications.filter(a => a.status === 'New').length;
    const totalInquiries = this.data.inquiries.length;
    const unreadInquiries = this.data.inquiries.filter(i => i.status === 'Unread').length;

    // Category breakdown
    const projectsByCategory = this.data.projects.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Recent activity stream
    const recentActivity = [
      ...this.data.inquiries.slice(0, 4).map(i => ({
        id: i.id,
        type: 'inquiry',
        title: `RFP Received: ${i.company} (${i.projectType})`,
        time: i.createdAt,
        status: i.status
      })),
      ...this.data.applications.slice(0, 4).map(a => ({
        id: a.id,
        type: 'application',
        title: `Application: ${a.candidateName} for ${a.jobTitle}`,
        time: a.createdAt,
        status: a.status
      })),
      ...this.data.projects.slice(0, 3).map(p => ({
        id: p.id,
        type: 'project',
        title: `Project: ${p.title} (${p.status})`,
        time: p.updatedAt || p.createdAt,
        status: p.published ? 'Published' : 'Draft'
      }))
    ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 8);

    return {
      metrics: {
        totalProjects,
        publishedProjects,
        draftProjects,
        totalBlogPosts,
        publishedBlogPosts,
        totalJobs,
        openJobs,
        totalApplications,
        newApplications,
        totalInquiries,
        unreadInquiries,
        totalMedia: this.data.media.length
      },
      projectsByCategory,
      recentActivity,
      siteStats: this.data.siteSettings.stats
    };
  }
}

export const db = new Database();
