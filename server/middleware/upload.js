const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// UPLOAD_DIR can point at a mounted Railway volume so uploaded images survive
// redeploys; otherwise it falls back to a local folder (fine for dev).
const UPLOAD_DIR = process.env.UPLOAD_DIR
  ? path.resolve(process.env.UPLOAD_DIR)
  : path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const ALLOWED_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/svg+xml']);
const EXT_BY_TYPE = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'image/svg+xml': '.svg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = EXT_BY_TYPE[file.mimetype] || path.extname(file.originalname) || '';
    cb(null, `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`);
  }
});

function fileFilter(req, file, cb) {
  if (!ALLOWED_TYPES.has(file.mimetype)) {
    return cb(new Error('Only PNG, JPEG, WEBP, GIF or SVG images are allowed.'));
  }
  cb(null, true);
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 } // 5MB
});

module.exports = { upload, UPLOAD_DIR };
