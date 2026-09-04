const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/login
// Single-admin login. Credentials live only in server/.env — never in the
// frontend bundle or git. ADMIN_PASSWORD_HASH is a bcrypt hash, so the
// plaintext password is never stored anywhere (see server/README or
// `npm run hash-password` to generate one).
router.post('/login', async (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  const { ADMIN_USERNAME, ADMIN_PASSWORD_HASH, JWT_SECRET } = process.env;

  if (!ADMIN_USERNAME || !ADMIN_PASSWORD_HASH || !JWT_SECRET) {
    console.error('Admin auth is not configured — missing ADMIN_USERNAME / ADMIN_PASSWORD_HASH / JWT_SECRET.');
    return res.status(500).json({ error: 'Admin login is not configured on the server.' });
  }

  // Compare username with a constant-time-ish check via bcrypt on the password
  // regardless of username match, so failed logins take a consistent amount
  // of time whether the username was right or wrong.
  const usernameMatches = username === ADMIN_USERNAME;
  const passwordMatches = await bcrypt.compare(password, ADMIN_PASSWORD_HASH).catch(() => false);

  if (!usernameMatches || !passwordMatches) {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }

  const token = jwt.sign({ role: 'admin', username }, JWT_SECRET, { expiresIn: '12h' });
  res.json({ token, expiresIn: '12h' });
});

// GET /api/auth/me — lets the frontend verify a stored token is still valid.
router.get('/me', requireAuth, (req, res) => {
  res.json({ username: req.admin.username, role: req.admin.role });
});

module.exports = router;
