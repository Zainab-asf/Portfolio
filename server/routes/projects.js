const express = require('express');
const mongoose = require('mongoose');
const Project = require('../models/Project');
const { requireAuth } = require('../middleware/auth');
const { upload, UPLOAD_DIR } = require('../middleware/upload');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Fallback data used only if MongoDB isn't connected, so the public site
// still renders something. Mirrors the shape of a real Project document.
const FALLBACK_PROJECTS = [
  {
    _id: 'fallback-1', slug: 'ai-child-safety-app', title: 'AI-Powered Child Safety App', category: 'AI',
    short: "Real-time AI monitoring that helps parents protect kids online without invading their privacy.",
    overview: 'A cross-platform Blazor and .NET MAUI application that uses machine learning to flag potentially harmful content in real time.',
    problem: "Parents had no reliable way to monitor a child's digital activity across devices without resorting to invasive tools that damaged trust at home.",
    solution: 'Machine learning flags potentially harmful content in real time and alerts parents instantly, without recording or exposing private conversations.',
    features: ['Real-time content classification powered by Azure AI', 'Cross-platform coverage from a single Blazor/.NET MAUI codebase', 'Instant alerts for flagged content', 'Encrypted activity logs stored in SQL Server'],
    value: 'Gives parents visibility into risk without turning the app into a surveillance tool, building trust with parents and kids alike.',
    tech: ['Blazor', '.NET MAUI', 'C#', 'Azure AI', 'SQL Server'],
    image: '', gallery: [], liveUrl: '', githubUrl: 'https://github.com/Zainab-asf',
    status: 'published', featured: true
  },
  {
    _id: 'fallback-2', slug: 'gear-up-garage', title: 'Gear Up Garage', category: 'Business Tools',
    short: 'A booking, inventory and customer management system built for a real automotive workshop.',
    overview: 'A Flutter mobile app backed by Firebase that centralizes appointment scheduling, parts inventory and invoicing.',
    problem: 'The workshop ran bookings, inventory and invoicing across paper logs and spreadsheets, causing missed appointments and untracked parts.',
    solution: 'Centralizes appointment scheduling, parts inventory and invoice generation, with push notifications keeping staff and customers in sync.',
    features: ['Appointment scheduling with conflict detection', 'Live parts inventory tracked in Firestore', 'Automatic invoice generation', 'Push notifications for bookings and status updates'],
    value: 'Replaced manual logs with one system the whole shop runs on, cutting down missed bookings and untracked inventory.',
    tech: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'FCM'],
    image: '', gallery: [], liveUrl: '', githubUrl: 'https://github.com/Zainab-asf',
    status: 'published', featured: true
  },
  {
    _id: 'fallback-3', slug: 'workflow-automation-suite', title: 'Workflow Automation Suite', category: 'Automation',
    short: 'An automation pipeline connecting Gmail, Sheets and Slack that cut manual data entry by 80%.',
    overview: 'A set of automated workflows built in n8n that connect business tools directly through APIs and webhooks.',
    problem: "The client's team spent hours a week manually moving data between Gmail, Google Sheets and Slack.",
    solution: 'Automated workflows built in n8n connect these tools directly through APIs and webhooks, removing the manual handoff entirely.',
    features: ['Automated data sync between Gmail and Google Sheets', 'Slack notifications triggered by workflow events', 'Webhook-based integrations with existing tools', 'No-code workflow maintenance going forward'],
    value: 'Reduced manual data entry by 80%, freeing the team to spend that time on higher-value work.',
    tech: ['n8n', 'JavaScript', 'REST APIs', 'Webhooks', 'Google APIs'],
    image: '', gallery: [], liveUrl: '', githubUrl: 'https://github.com/Zainab-asf',
    status: 'published', featured: false
  },
  {
    _id: 'fallback-4', slug: 'studio-ops-dashboard', title: 'Studio Ops Dashboard', category: 'Web',
    short: 'An internal operations dashboard that centralizes the inquiry pipeline on a full MERN stack.',
    overview: 'A full-stack dashboard built with React, Node.js, Express and MongoDB for tracking inquiries and project status.',
    problem: 'Client inquiries and project status updates were scattered across email with no central record.',
    solution: 'One place to track incoming inquiries and project status, with a responsive React UI and a RESTful Express API.',
    features: ['Centralized inquiry pipeline backed by MongoDB', 'RESTful API built in Express', 'Responsive dashboard UI in React', 'Interface motion via Framer Motion'],
    value: 'Gave the team a single source of truth for inquiries and project status instead of scattered email threads.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Framer Motion'],
    image: '', gallery: [], liveUrl: '', githubUrl: 'https://github.com/Zainab-asf/Portfolio',
    status: 'published', featured: false
  }
];

function dbReady() { return mongoose.connection.readyState === 1; }

function slugify(s) {
  return String(s).toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 140) || 'project';
}

async function uniqueSlug(base, excludeId) {
  let slug = slugify(base);
  let n = 2;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const query = { slug };
    if (excludeId) query._id = { $ne: excludeId };
    const exists = await Project.exists(query);
    if (!exists) return slug;
    slug = `${slugify(base)}-${n++}`;
  }
}

// ── validation ──────────────────────────────────────────────────────────
const MAX_LIST = { tech: 20, features: 12, gallery: 8 };
const TEXT_FIELDS = { short: 280, overview: 2000, problem: 2000, solution: 2000, value: 2000 };

function validateProjectInput(body, { partial = false } = {}) {
  const errors = [];
  const clean = {};
  const str = v => (typeof v === 'string' ? v.trim() : v);

  if (!partial || body.title !== undefined) {
    const title = str(body.title);
    if (!title) errors.push('Title is required.');
    else if (title.length > 120) errors.push('Title must be 120 characters or fewer.');
    else clean.title = title;
  }

  if (body.slug !== undefined) {
    const slug = str(body.slug);
    if (slug) clean.slug = slugify(slug);
  }

  if (!partial || body.short !== undefined) {
    const short = str(body.short);
    if (!short) errors.push('Short description is required.');
    else if (short.length > TEXT_FIELDS.short) errors.push(`Short description must be ${TEXT_FIELDS.short} characters or fewer.`);
    else clean.short = short;
  }

  for (const field of ['overview', 'problem', 'solution', 'value']) {
    if (body[field] !== undefined) {
      const v = str(body[field]) || '';
      if (v.length > TEXT_FIELDS[field]) errors.push(`${field} must be ${TEXT_FIELDS[field]} characters or fewer.`);
      else clean[field] = v;
    }
  }

  for (const field of ['tech', 'features', 'gallery']) {
    if (body[field] !== undefined) {
      let list = body[field];
      if (typeof list === 'string') list = list.split(field === 'features' ? '\n' : ',').map(t => t.trim()).filter(Boolean);
      if (!Array.isArray(list)) errors.push(`${field} must be a list.`);
      else if (list.length > MAX_LIST[field]) errors.push(`Too many ${field} (max ${MAX_LIST[field]}).`);
      else clean[field] = list.map(String).map(t => t.trim()).filter(Boolean);
    }
  }

  if (body.image !== undefined) clean.image = str(body.image) || '';

  for (const field of ['liveUrl', 'githubUrl']) {
    if (body[field] !== undefined) {
      const v = str(body[field]) || '';
      if (v && !/^https?:\/\//i.test(v)) errors.push(`${field === 'liveUrl' ? 'Live demo URL' : 'GitHub URL'} must start with http:// or https://`);
      else clean[field] = v;
    }
  }

  if (body.featured !== undefined) clean.featured = body.featured === true || body.featured === 'true';

  if (body.status !== undefined) {
    const status = str(body.status);
    if (!['draft', 'published'].includes(status)) errors.push('Status must be "draft" or "published".');
    else clean.status = status;
  }

  if (body.category !== undefined) {
    const category = str(body.category) || 'Web';
    if (category.length > 40) errors.push('Category must be 40 characters or fewer.');
    else clean.category = category;
  }

  if (body.order !== undefined) {
    const order = Number(body.order);
    clean.order = Number.isFinite(order) ? order : 0;
  }

  return { errors, clean };
}

// ── public routes ───────────────────────────────────────────────────────

// GET /api/projects?category=Web&featured=true — published only
router.get('/', async (req, res) => {
  const { category, featured } = req.query;

  if (!dbReady()) {
    let result = FALLBACK_PROJECTS.filter(p => p.status === 'published');
    if (category) result = result.filter(p => p.category === category);
    if (featured === 'true') result = result.filter(p => p.featured);
    return res.json(result);
  }

  try {
    const query = { status: 'published' };
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;
    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 }).lean();
    res.json(projects);
  } catch (err) {
    console.error('GET /api/projects failed:', err.message);
    res.status(500).json({ error: 'Failed to load projects.' });
  }
});

// GET /api/projects/admin — ALL projects (draft + published), admin-only
router.get('/admin', requireAuth, async (req, res) => {
  if (!dbReady()) return res.json(FALLBACK_PROJECTS);
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load projects.' });
  }
});

// GET /api/projects/slug/:slug — public, published only
router.get('/slug/:slug', async (req, res) => {
  if (!dbReady()) {
    const project = FALLBACK_PROJECTS.find(p => p.slug === req.params.slug && p.status === 'published');
    if (!project) return res.status(404).json({ error: 'Project not found.' });
    return res.json(project);
  }
  try {
    const project = await Project.findOne({ slug: req.params.slug, status: 'published' }).lean();
    if (!project) return res.status(404).json({ error: 'Project not found.' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load project.' });
  }
});

// GET /api/projects/:id — admin lookup by id (any status), protected
router.get('/:id', requireAuth, async (req, res) => {
  if (!dbReady()) {
    const project = FALLBACK_PROJECTS.find(p => p._id === req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found.' });
    return res.json(project);
  }
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ error: 'Project not found.' });
  try {
    const project = await Project.findById(req.params.id).lean();
    if (!project) return res.status(404).json({ error: 'Project not found.' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load project.' });
  }
});

// ── admin (protected) routes ────────────────────────────────────────────

router.post('/', requireAuth, async (req, res) => {
  const { errors, clean } = validateProjectInput(req.body);
  if (errors.length) return res.status(400).json({ error: errors.join(' ') });
  if (!dbReady()) return res.status(503).json({ error: 'Database not connected. Cannot create projects right now.' });

  try {
    clean.slug = await uniqueSlug(clean.slug || clean.title);
    const project = await Project.create(clean);
    res.status(201).json(project);
  } catch (err) {
    console.error('POST /api/projects failed:', err.message);
    res.status(500).json({ error: 'Failed to create project.' });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  const { errors, clean } = validateProjectInput(req.body, { partial: true });
  if (errors.length) return res.status(400).json({ error: errors.join(' ') });
  if (Object.keys(clean).length === 0) return res.status(400).json({ error: 'No valid fields to update.' });
  if (!dbReady()) return res.status(503).json({ error: 'Database not connected. Cannot update projects right now.' });
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ error: 'Project not found.' });

  try {
    if (clean.slug) clean.slug = await uniqueSlug(clean.slug, req.params.id);
    const project = await Project.findByIdAndUpdate(req.params.id, clean, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ error: 'Project not found.' });
    res.json(project);
  } catch (err) {
    console.error('PUT /api/projects/:id failed:', err.message);
    res.status(500).json({ error: 'Failed to update project.' });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  if (!dbReady()) return res.status(503).json({ error: 'Database not connected. Cannot delete projects right now.' });
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ error: 'Project not found.' });

  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found.' });

    const images = [project.image, ...(project.gallery || [])].filter(u => u && u.startsWith('/uploads/'));
    images.forEach(u => fs.unlink(path.join(UPLOAD_DIR, path.basename(u)), () => {}));

    res.json({ success: true, id: req.params.id });
  } catch (err) {
    console.error('DELETE /api/projects/:id failed:', err.message);
    res.status(500).json({ error: 'Failed to delete project.' });
  }
});

// POST /api/projects/upload/image — admin image upload (reused for cover and each gallery slot)
router.post('/upload/image', requireAuth, (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message || 'Upload failed.' });
    if (!req.file) return res.status(400).json({ error: 'No image file received.' });
    res.status(201).json({ url: `/uploads/${req.file.filename}` });
  });
});

module.exports = router;
