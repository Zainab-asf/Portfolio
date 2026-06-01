const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }
  if (message.length > 2000) {
    return res.status(400).json({ error: 'Message too long (max 2000 characters).' });
  }

  try {
    // Save to MongoDB (if connected)
    try {
      const contact = new Contact({ name, email, subject, message });
      await contact.save();
    } catch (dbErr) {
      console.warn('DB save skipped:', dbErr.message);
    }

    // Send email notification
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO || process.env.EMAIL_USER,
        replyTo: email,
        subject: `[Portfolio] ${subject || 'New Message'} — from ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px;">
            <h2 style="color: #0a192f;">New Portfolio Message</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #555;"><strong>From:</strong></td><td>${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #555;"><strong>Email:</strong></td><td>${email}</td></tr>
              <tr><td style="padding: 8px 0; color: #555;"><strong>Subject:</strong></td><td>${subject || '—'}</td></tr>
            </table>
            <hr style="margin: 16px 0; border-color: #eee;"/>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
        `
      });
    }

    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
});

module.exports = router;
