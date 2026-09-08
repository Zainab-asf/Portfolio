require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const contactRouter = require('./routes/contact');
const projectsRouter = require('./routes/projects');
const authRouter = require('./routes/auth');
const { UPLOAD_DIR } = require('./middleware/upload');

const app = express();
const PORT = process.env.PORT || 5000;

// Trust the platform proxy (Vercel/Render/etc.) so rate-limiting and
// req.ip see the real client IP instead of the proxy's.
app.set('trust proxy', 1);

// Middleware
// CLIENT_ORIGIN (comma-separated) overrides the allowed CORS origins. When the
// API and the built client are served from the same Railway service this isn't
// needed at all — requests are same-origin — but it keeps a split frontend working.
const corsOrigin = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(',').map(s => s.trim())
  : process.env.NODE_ENV === 'production'
    ? ['https://zainabasif.dev', 'https://www.zainabasif.dev']
    : 'http://localhost:3000';
app.use(cors({ origin: corsOrigin }));
app.use(express.json());

// Uploaded project images (UPLOAD_DIR is overridable so it can point at a
// Railway volume that survives redeploys — see middleware/upload.js).
app.use('/uploads', express.static(UPLOAD_DIR));

// Rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { error: 'Too many messages sent. Please try again later.' }
});

// Rate limiting for admin login — slows down credential guessing
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { error: 'Too many login attempts. Please try again later.' },
  skipSuccessfulRequests: true
});

// Routes
app.use('/api/contact', contactLimiter, contactRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/auth/login', loginLimiter);
app.use('/api/auth', authRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Serve the built React client (single-service deploy) ──────────────
// In production the CRA build lives at client/build and is served from the
// same origin as the API, so the client's relative /api calls resolve here.
const CLIENT_BUILD = path.join(__dirname, '..', 'client', 'build');
app.use(express.static(CLIENT_BUILD));

// Any non-API, non-uploads path falls through to the SPA's index.html so
// client-side routes (e.g. /work, /admin/login) work on a hard refresh.
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/') || req.path.startsWith('/uploads/')) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.sendFile(path.join(CLIENT_BUILD, 'index.html'));
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    console.log('ℹ️  Running without database (contact form will use email only)');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} (no DB)`));
  });

module.exports = app;
