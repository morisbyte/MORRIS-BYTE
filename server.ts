import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { db } from './server/db.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON Body Parser with 25MB limit for base64 media uploads
  app.use(express.json({ limit: '25mb' }));
  app.use(express.urlencoded({ extended: true, limit: '25mb' }));

  // Request logger for API routes
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith('/api')) {
      console.log(`[API ${req.method}] ${req.path}`);
    }
    next();
  });

  // Auth Middleware
  const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized. Admin authentication token required.' });
    }
    const token = authHeader.split(' ')[1];
    // Verify token format
    if (!token || !token.startsWith('acg_jwt_')) {
      return res.status(401).json({ error: 'Invalid or expired session token.' });
    }
    // Token is valid
    next();
  };

  // ==========================================
  // API ROUTES
  // ==========================================

  // Health check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'Aurelia Construct Group API', timestamp: new Date().toISOString() });
  });

  // 1. Auth endpoints
  app.post('/api/auth/login', (req: Request, res: Response) => {
    const identifier = req.body.username || req.body.email || req.body.identifier || req.body.user;
    const password = req.body.password;
    if (!identifier || !password) {
      return res.status(400).json({ error: 'Username/email and password are required.' });
    }

    const authResult = db.authenticateUser(identifier, password);
    if (!authResult) {
      return res.status(401).json({ error: 'Invalid executive credentials. Please check your username and password.' });
    }

    res.json({
      success: true,
      user: authResult.user,
      token: authResult.token
    });
  });

  app.get('/api/auth/me', requireAuth, (req: Request, res: Response) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.split(' ')[1] || '';
    
    // Extract user ID from token format: acg_jwt_{userId}_{timestamp}_{random}
    const parts = token.split('_');
    const userId = parts.length >= 3 ? parts[2] : 'usr-admin-kainat';
    
    const user = db.getUserById(userId) || db.getUserById('usr-admin-kainat') || db.getUserById('usr-admin-01');
    res.json({ user });
  });

  // 2. Projects Endpoints
  app.get('/api/projects', (req: Request, res: Response) => {
    const includeUnpublished = req.query.all === 'true';
    const projects = db.getProjects(includeUnpublished);
    res.json(projects);
  });

  app.get('/api/projects/:idOrSlug', (req: Request, res: Response) => {
    const project = db.getProjectByIdOrSlug(req.params.idOrSlug);
    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }
    res.json(project);
  });

  app.post('/api/projects', requireAuth, (req: Request, res: Response) => {
    try {
      const { title, location, category, client, status, description, featuredImage } = req.body;
      if (!title || !location || !category) {
        return res.status(400).json({ error: 'Title, location, and category are required.' });
      }

      const slug = req.body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const newProject = db.createProject({
        ...req.body,
        slug,
        title,
        location,
        country: req.body.country || 'International',
        category,
        client: client || 'Private Client',
        status: status || 'Planning',
        completionYear: req.body.completionYear || new Date().getFullYear(),
        projectValue: req.body.projectValue || 'Confidential',
        projectSize: req.body.projectSize || 'N/A',
        description: description || '',
        challenge: req.body.challenge || '',
        approach: req.body.approach || '',
        results: req.body.results || '',
        sustainabilityFeatures: req.body.sustainabilityFeatures || [],
        featuredImage: featuredImage || 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?q=80&w=1600&auto=format&fit=crop',
        gallery: req.body.gallery || [featuredImage],
        isFeatured: Boolean(req.body.isFeatured),
        published: req.body.published !== undefined ? Boolean(req.body.published) : true
      });

      res.status(201).json(newProject);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to create project.' });
    }
  });

  app.put('/api/projects/:id', requireAuth, (req: Request, res: Response) => {
    const updated = db.updateProject(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Project not found.' });
    }
    res.json(updated);
  });

  app.delete('/api/projects/:id', requireAuth, (req: Request, res: Response) => {
    const success = db.deleteProject(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Project not found.' });
    }
    res.json({ success: true, message: 'Project deleted successfully.' });
  });

  // 3. Blog Endpoints
  app.get('/api/blog', (req: Request, res: Response) => {
    const includeUnpublished = req.query.all === 'true';
    const posts = db.getBlogPosts(includeUnpublished);
    res.json(posts);
  });

  app.get('/api/blog/:idOrSlug', (req: Request, res: Response) => {
    const post = db.getBlogPostByIdOrSlug(req.params.idOrSlug);
    if (!post) {
      return res.status(404).json({ error: 'Article not found.' });
    }
    res.json(post);
  });

  app.post('/api/blog', requireAuth, (req: Request, res: Response) => {
    try {
      const { title, category, excerpt, content, featuredImage } = req.body;
      if (!title || !category || !content) {
        return res.status(400).json({ error: 'Title, category, and content are required.' });
      }

      const slug = req.body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const newPost = db.createBlogPost({
        ...req.body,
        title,
        slug,
        category,
        author: req.body.author || {
          name: 'Aurelia Engineering Editorial',
          role: 'Executive Research Group',
          avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop'
        },
        date: req.body.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        readTime: req.body.readTime || '5 min read',
        excerpt: excerpt || content.substring(0, 160) + '...',
        content,
        featuredImage: featuredImage || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop',
        tags: req.body.tags || ['Construction', 'Engineering'],
        published: req.body.published !== undefined ? Boolean(req.body.published) : true,
        featured: Boolean(req.body.featured)
      });

      res.status(201).json(newPost);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to create article.' });
    }
  });

  app.put('/api/blog/:id', requireAuth, (req: Request, res: Response) => {
    const updated = db.updateBlogPost(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Article not found.' });
    }
    res.json(updated);
  });

  app.delete('/api/blog/:id', requireAuth, (req: Request, res: Response) => {
    const success = db.deleteBlogPost(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Article not found.' });
    }
    res.json({ success: true, message: 'Article deleted successfully.' });
  });

  // 4. Careers & Jobs Endpoints
  app.get('/api/careers', (req: Request, res: Response) => {
    const includeClosed = req.query.all === 'true';
    const jobs = db.getJobs(includeClosed);
    res.json(jobs);
  });

  app.get('/api/careers/:id', (req: Request, res: Response) => {
    const job = db.getJobById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job opening not found.' });
    }
    res.json(job);
  });

  app.post('/api/careers', requireAuth, (req: Request, res: Response) => {
    try {
      const { title, department, location, description } = req.body;
      if (!title || !department || !location) {
        return res.status(400).json({ error: 'Title, department, and location are required.' });
      }

      const newJob = db.createJob({
        title,
        department,
        location,
        country: req.body.country || 'Global',
        type: req.body.type || 'Full-time',
        experienceLevel: req.body.experienceLevel || 'Mid-Senior Level',
        salaryRange: req.body.salaryRange || 'Competitive International Package',
        description: description || '',
        responsibilities: req.body.responsibilities || [],
        requirements: req.body.requirements || [],
        benefits: req.body.benefits || [],
        status: req.body.status || 'Open'
      });

      res.status(201).json(newJob);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to create job opening.' });
    }
  });

  app.put('/api/careers/:id', requireAuth, (req: Request, res: Response) => {
    const updated = db.updateJob(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Job not found.' });
    }
    res.json(updated);
  });

  app.delete('/api/careers/:id', requireAuth, (req: Request, res: Response) => {
    const success = db.deleteJob(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Job not found.' });
    }
    res.json({ success: true, message: 'Job deleted successfully.' });
  });

  // 5. Job Applications
  app.get('/api/applications', requireAuth, (_req: Request, res: Response) => {
    const apps = db.getApplications();
    res.json(apps);
  });

  app.post('/api/applications', (req: Request, res: Response) => {
    try {
      const { jobId, jobTitle, candidateName, email, phone, coverLetter } = req.body;
      if (!jobId || !candidateName || !email) {
        return res.status(400).json({ error: 'Candidate name, email, and job ID are required.' });
      }

      const newApp = db.createApplication({
        jobId,
        jobTitle: jobTitle || 'Position Application',
        candidateName,
        email,
        phone: phone || '',
        location: req.body.location || 'Not specified',
        linkedin: req.body.linkedin,
        portfolioUrl: req.body.portfolioUrl,
        experienceYears: req.body.experienceYears || 'N/A',
        coverLetter: coverLetter || '',
        resumeFileName: req.body.resumeFileName || 'Candidate_Resume.pdf',
        resumeData: req.body.resumeData
      });

      res.status(201).json({
        success: true,
        message: 'Your application has been received by the Aurelia Executive Talent Group.',
        application: newApp
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to submit application.' });
    }
  });

  app.patch('/api/applications/:id/status', requireAuth, (req: Request, res: Response) => {
    const { status, notes } = req.body;
    if (!status) {
      return res.status(400).json({ error: 'Status is required.' });
    }
    const updated = db.updateApplicationStatus(req.params.id, status, notes);
    if (!updated) {
      return res.status(404).json({ error: 'Application not found.' });
    }
    res.json(updated);
  });

  app.delete('/api/applications/:id', requireAuth, (req: Request, res: Response) => {
    const success = db.deleteApplication(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Application not found.' });
    }
    res.json({ success: true, message: 'Application deleted.' });
  });

  // 6. Inquiries / Contact RFPs
  app.get('/api/inquiries', requireAuth, (_req: Request, res: Response) => {
    const inquiries = db.getInquiries();
    res.json(inquiries);
  });

  app.post('/api/inquiries', (req: Request, res: Response) => {
    try {
      const { fullName, company, email, projectType, estimatedBudget, projectDescription } = req.body;
      if (!fullName || !company || !email || !projectDescription) {
        return res.status(400).json({ error: 'Full name, company, email, and project description are required.' });
      }

      const newInquiry = db.createInquiry({
        fullName,
        company,
        email,
        phone: req.body.phone || '',
        country: req.body.country || 'International',
        projectType: projectType || 'Commercial Complex',
        estimatedBudget: estimatedBudget || 'Confidential',
        expectedTimeline: req.body.expectedTimeline || 'TBD',
        projectDescription,
        attachments: req.body.attachments || []
      });

      res.status(201).json({
        success: true,
        message: 'Thank you. Your proposal has been routed directly to the Aurelia Global Project Development Directorate.',
        inquiryId: newInquiry.id
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to submit inquiry.' });
    }
  });

  app.patch('/api/inquiries/:id/status', requireAuth, (req: Request, res: Response) => {
    const { status, internalNotes, assignedTo } = req.body;
    if (!status) {
      return res.status(400).json({ error: 'Status is required.' });
    }
    const updated = db.updateInquiryStatus(req.params.id, status, internalNotes, assignedTo);
    if (!updated) {
      return res.status(404).json({ error: 'Inquiry not found.' });
    }
    res.json(updated);
  });

  app.delete('/api/inquiries/:id', requireAuth, (req: Request, res: Response) => {
    const success = db.deleteInquiry(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Inquiry not found.' });
    }
    res.json({ success: true, message: 'Inquiry deleted.' });
  });

  // 7. Media Library
  app.get('/api/media', requireAuth, (_req: Request, res: Response) => {
    const media = db.getMedia();
    res.json(media);
  });

  app.post('/api/media', requireAuth, (req: Request, res: Response) => {
    try {
      const { name, url, category, size, dimensions, type } = req.body;
      if (!name || !url) {
        return res.status(400).json({ error: 'Name and URL are required.' });
      }

      const newMedia = db.addMedia({
        name,
        url,
        category: category || 'Projects',
        size: size || '1.5 MB',
        dimensions: dimensions || '1920 x 1080',
        type: type || 'image/jpeg'
      });

      res.status(201).json(newMedia);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to add media item.' });
    }
  });

  app.delete('/api/media/:id', requireAuth, (req: Request, res: Response) => {
    const success = db.deleteMedia(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Media item not found.' });
    }
    res.json({ success: true, message: 'Media item deleted.' });
  });

  // 8. Site Settings & Dashboard
  app.get('/api/settings', (_req: Request, res: Response) => {
    res.json(db.getSiteSettings());
  });

  app.put('/api/settings', requireAuth, (req: Request, res: Response) => {
    const updated = db.updateSiteSettings(req.body);
    res.json(updated);
  });

  app.get('/api/dashboard/overview', requireAuth, (_req: Request, res: Response) => {
    res.json(db.getDashboardOverview());
  });

  // ==========================================
  // VITE / STATIC SERVING
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Aurelia Construct Group] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
