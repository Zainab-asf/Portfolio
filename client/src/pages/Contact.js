import React, { useState } from 'react';
import axios from 'axios';
import { GithubIcon, LinkedinIcon, MailIcon } from '../components/icons';

const INITIAL = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 10) e.message = 'Message too short';
    return e;
  };

  const handleChange = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors(er => ({ ...er, [field]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('loading');
    try {
      await axios.post('/api/contact', form);
      setStatus('success');
      setForm(INITIAL);
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="container" style={{ padding: '64px clamp(20px,5vw,64px) 96px' }}>
      <div className="split-cols" style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 64 }}>
        <div>
          <h1 style={{ margin: '0 0 16px' }}>Let's Talk</h1>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: 'color-mix(in srgb,var(--color-text) 75%,transparent)', margin: '0 0 32px', maxWidth: '44ch' }}>
            Tell me about your project — or just say hi. My inbox is always open.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <a href="mailto:zainab.asif.dev@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: 'var(--color-text)' }}>
              <MailIcon /> zainab.asif.dev@gmail.com
            </a>
            <a href="https://linkedin.com/in/zainab-asif" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: 'var(--color-text)' }}>
              <LinkedinIcon /> linkedin.com/in/zainab-asif
            </a>
            <a href="https://github.com/Zainab-asf" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: 'var(--color-text)' }}>
              <GithubIcon /> github.com/Zainab-asf
            </a>
          </div>
        </div>

        <div>
          {status === 'success' ? (
            <div style={{ padding: 48, border: '2px solid var(--color-divider)' }}>
              <h3 style={{ margin: '0 0 8px' }}>Thanks — message received.</h3>
              <p style={{ fontSize: 15, color: 'color-mix(in srgb,var(--color-text) 75%,transparent)', margin: 0 }}>
                I'll get back to you shortly.
              </p>
              <button type="button" className="btn btn-secondary" style={{ marginTop: 20 }} onClick={() => setStatus(null)}>
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="form-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div className="field">
                  <label htmlFor="name">Name *</label>
                  <input id="name" className="input" value={form.name} onChange={handleChange('name')} disabled={status === 'loading'} />
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </div>
                <div className="field">
                  <label htmlFor="email">Email *</label>
                  <input id="email" type="email" className="input" value={form.email} onChange={handleChange('email')} disabled={status === 'loading'} />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>
              </div>
              <div className="field">
                <label htmlFor="subject">Subject</label>
                <input id="subject" className="input" value={form.subject} onChange={handleChange('subject')} disabled={status === 'loading'} placeholder="What's this about?" />
              </div>
              <div className="field">
                <label htmlFor="message">Message *</label>
                <textarea id="message" className="input" rows={6} value={form.message} onChange={handleChange('message')} disabled={status === 'loading'} placeholder="Tell me what you're working on…" />
                {errors.message && <span className="field-error">{errors.message}</span>}
              </div>
              <button type="submit" className="btn btn-primary btn-lg" style={{ alignSelf: 'flex-start' }} disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending…' : "Let's Talk"}
              </button>
              {status === 'error' && <p className="field-error">Something went wrong. Please email me directly.</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
