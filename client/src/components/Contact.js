import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './Contact.css';

const INITIAL = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm]       = useState(INITIAL);
  const [status, setStatus]   = useState(null);
  const [errors, setErrors]   = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Name is required';
    if (!form.email.trim())   e.email   = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.length < 10) e.message = 'Message too short';
    return e;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('loading');
    try {
      await axios.post('/api/contact', form);
      setStatus('success');
      setForm(INITIAL);
      setTimeout(() => setStatus(null), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus(null), 4000);
    }
  };

  return (
    <section className="section" id="contact" ref={ref}>
      <div className="container">
        <h2 className="section-title">
          <span className="section-number">05.</span>Get In Touch
        </h2>

        <div className={`contact-grid ${visible ? 'visible' : ''}`}>

          {/* Left */}
          <div className="contact-intro">
            <h3>Let's work together</h3>
            <p>
              I'm currently open to new opportunities — full-time roles, internships,
              freelance projects, or just a chat about technology. My inbox is always open.
            </p>
            <p>
              Particularly interested in mobile development roles (Flutter / .NET MAUI)
              and full-stack React positions. Open to exploring other exciting work too.
            </p>

            <div className="contact-links">
              <a href="mailto:zainab.asif.dev@gmail.com" className="c-link">
                <MailIcon /><span>zainab.asif.dev@gmail.com</span>
              </a>
              <a href="https://linkedin.com/in/zainab-asif" target="_blank" rel="noreferrer" className="c-link">
                <LinkedinIcon /><span>linkedin.com/in/zainab-asif</span>
              </a>
              <a href="https://github.com/zainabasif" target="_blank" rel="noreferrer" className="c-link">
                <GitHubIcon /><span>github.com/zainabasif</span>
              </a>
            </div>

            <a href="/resume.html" target="_blank" rel="noreferrer" className="btn btn-outline contact-resume-btn">
              <DownloadIcon /> View Resume
            </a>
          </div>

          {/* Right — form */}
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input type="text" id="name" name="name" value={form.name} onChange={handleChange}
                  placeholder="Your name" className={errors.name ? 'error' : ''} disabled={status === 'loading'} autoComplete="name" />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input type="email" id="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="your@email.com" className={errors.email ? 'error' : ''} disabled={status === 'loading'} autoComplete="email" />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" value={form.subject} onChange={handleChange}
                placeholder="What's this about?" disabled={status === 'loading'} />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea id="message" name="message" value={form.message} onChange={handleChange}
                placeholder="Tell me what you're working on..." rows={6}
                className={errors.message ? 'error' : ''} disabled={status === 'loading'} />
              <div className="char-count">{form.message.length} / 2000</div>
              {errors.message && <span className="field-error">{errors.message}</span>}
            </div>

            <button type="submit" className="btn btn-primary submit-btn" disabled={status === 'loading'}>
              {status === 'loading' ? (<><span className="btn-spinner" /> Sending…</>) : <>Send Message →</>}
            </button>

            {status === 'success' && (
              <div className="form-status success">✓ Message sent! I'll get back to you soon.</div>
            )}
            {status === 'error' && (
              <div className="form-status error">✗ Something went wrong. Please email me directly.</div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

const MailIcon     = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>);
const LinkedinIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>);
const GitHubIcon   = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>);
const DownloadIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>);
