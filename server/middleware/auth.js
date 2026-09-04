const jwt = require('jsonwebtoken');

// Verifies a Bearer JWT on protected admin routes.
// Never trusts anything from the client beyond the signed token payload.
function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Authentication required.' });
  }

  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not set — refusing to verify tokens.');
    return res.status(500).json({ error: 'Server auth misconfigured.' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized.' });
    }
    req.admin = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired session. Please log in again.' });
  }
}

module.exports = { requireAuth };
