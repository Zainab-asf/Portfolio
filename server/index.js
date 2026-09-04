require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const contactRouter = require('./routes/contact');
const projectsRouter = require('./routes/projects');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Trust the platform proxy (Vercel/Render/etc.) so rate-limiting and
// req.ip see the real client IP instead of the proxy's.
app.set('trust proxy', 1);

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://zainabasif.dev', 'https://www.zainabasif.dev']
    : 'http://localhost:3000'
}));
app.use(express.json());

// Uploaded project images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
