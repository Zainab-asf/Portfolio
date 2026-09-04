const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'], trim: true, maxlength: 120 },
  slug: { type: String, required: true, unique: true, trim: true, lowercase: true, maxlength: 140 },
  category: { type: String, trim: true, default: 'Web', maxlength: 40 },

  // Card / listing copy
  short: { type: String, required: [true, 'Short description is required'], trim: true, maxlength: 280 },

  // Case-study body
  overview: { type: String, trim: true, maxlength: 2000, default: '' },
  problem: { type: String, trim: true, maxlength: 2000, default: '' },
  solution: { type: String, trim: true, maxlength: 2000, default: '' },
  features: { type: [String], default: [], validate: arr => arr.length <= 12 },
  value: { type: String, trim: true, maxlength: 2000, default: '' },

  tech: { type: [String], default: [], validate: arr => arr.length <= 20 },

  // Media
  image: { type: String, default: '' },      // cover
  gallery: { type: [String], default: [], validate: arr => arr.length <= 8 },

  liveUrl: { type: String, trim: true, default: '' },
  githubUrl: { type: String, trim: true, default: '' },

  // Publishing
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, { timestamps: true });

projectSchema.index({ status: 1, order: 1, createdAt: -1 });

module.exports = mongoose.model('Project', projectSchema);
