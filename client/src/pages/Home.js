import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ImageSlot from '../components/ImageSlot';
import FeaturedProject from '../components/FeaturedProject';
import { ServiceIcons } from '../components/icons';
import { SERVICES, WHY_ME, PROCESS, TECH_STACK } from '../data/content';

const MUTED = (pct) => `color-mix(in srgb,var(--color-text) ${pct}%,transparent)`;

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    axios.get('/api/projects', { params: { featured: true } })
      .then(res => setFeatured(res.data.slice(0, 2)))
      .catch(() => {});
  }, []);

  return (
    <div>
      {/* ── Hero ── */}
      <section className="container" style={{ padding: '96px clamp(20px,5vw,64px) 64px' }}>
        <div className="split-cols" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 56, alignItems: 'center' }}>
          <div>
            <div className="section-kicker">Final-year CS student · COMSATS Lahore</div>
            <h1 style={{ fontSize: 'clamp(38px,5.4vw,58px)', lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 24px' }}>
              I Build Cross-Platform Apps That Actually Ship.
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: MUTED(75), maxWidth: '52ch', margin: '0 0 32px' }}>
              Flutter, Blazor/.NET MAUI and React developer crafting mobile apps, AI-powered
              tools and web platforms — from first sketch to a product real users rely on.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/work" className="btn btn-primary btn-lg">Explore My Work</Link>
              <Link to="/contact" className="btn btn-secondary btn-lg">Start a Project</Link>
            </div>
          </div>
          <div style={{ position: 'relative', height: 380 }}>
            <div style={{ position: 'absolute', right: 0, top: 40, width: '88%', height: 300, background: 'var(--color-surface)', border: '2px solid var(--color-divider)', boxShadow: 'var(--shadow-lg)' }}>
              <div style={{ display: 'flex', gap: 6, padding: '10px 14px', borderBottom: '2px solid var(--color-divider)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-neutral-400)' }} />
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-neutral-400)' }} />
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-accent)' }} />
              </div>
              <ImageSlot label="Product screenshot" style={{ width: '100%', height: 'calc(100% - 33px)' }} />
            </div>
            <div style={{ position: 'absolute', left: 0, bottom: 0, width: '60%', height: 190, background: 'var(--color-bg)', border: '2px solid var(--color-divider)', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ display: 'flex', gap: 6, padding: '8px 12px', borderBottom: '2px solid var(--color-divider)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-neutral-400)' }} />
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-neutral-400)' }} />
              </div>
              <ImageSlot label="App UI" style={{ width: '100%', height: 'calc(100% - 29px)' }} />
            </div>
          </div>
        </div>
      </section>

      <hr className="hr hr-full" />

      {/* ── credibility strip ── */}
      <section className="container" style={{ padding: '28px clamp(20px,5vw,64px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          {['Mobile Development', 'AI & Automation', 'Web Development', 'Freelance Work'].map(t => (
            <span key={t} style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 14, letterSpacing: '0.02em' }}>{t}</span>
          ))}
        </div>
      </section>

      <hr className="hr hr-full" />

      {/* ── selected work ── */}
      <section className="section">
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ margin: '0 0 8px' }}>Selected Work</h2>
          <p style={{ fontSize: 16, color: MUTED(70), margin: 0 }}>Real apps. Real problems solved.</p>
        </div>
        {featured.map((p, i) => <FeaturedProject key={p._id || p.slug} project={p} reverse={i % 2 === 1} />)}
        <div style={{ textAlign: 'center', paddingTop: 32 }}>
          <Link to="/work" className="btn btn-ghost">View All Work →</Link>
        </div>
      </section>

      <hr className="hr hr-full" />

      {/* ── services teaser ── */}
      <section className="section">
        <h2 style={{ margin: '0 0 40px' }}>Services</h2>
        <div className="grid-cols-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, background: 'var(--color-divider)' }}>
          {SERVICES.map(s => {
            const Icon = ServiceIcons[s.icon];
            return (
              <div key={s.title} style={{ background: 'var(--color-bg)', padding: 28 }}>
                <Icon />
                <h4 style={{ fontSize: 17, margin: '16px 0 8px' }}>{s.title}</h4>
                <p style={{ fontSize: 14, lineHeight: 1.5, color: MUTED(72), margin: 0 }}>{s.short}</p>
              </div>
            );
          })}
        </div>
        <div style={{ textAlign: 'center', paddingTop: 32 }}>
          <Link to="/services" className="btn btn-ghost">More on my services →</Link>
        </div>
      </section>

      <hr className="hr hr-full" />

      {/* ── why work with me ── */}
      <section className="section">
        <h2 style={{ margin: '0 0 40px' }}>Why Work With Me</h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {WHY_ME.map((w, i) => (
            <div key={w.title} className="split-cols" style={{
              display: 'grid', gridTemplateColumns: '200px 1fr', gap: 24, padding: '20px 0',
              borderTop: '2px solid var(--color-divider)',
              borderBottom: i === WHY_ME.length - 1 ? '2px solid var(--color-divider)' : 'none'
            }}>
              <h4 style={{ fontSize: 17, margin: 0 }}>{w.title}</h4>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: MUTED(75), margin: 0 }}>{w.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── process ── */}
      <section id="process" className="section">
        <h2 style={{ margin: '0 0 40px' }}>How I Work</h2>
        <div className="grid-cols-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 2, background: 'var(--color-divider)' }}>
          {PROCESS.map(step => (
            <div key={step.n} style={{ background: 'var(--color-bg)', padding: '24px 18px' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--color-accent)', fontSize: 14 }}>{step.n}</span>
              <h4 style={{ fontSize: 16, margin: '12px 0 6px' }}>{step.title}</h4>
              <p style={{ fontSize: 13, lineHeight: 1.5, color: MUTED(70), margin: 0 }}>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="hr hr-full" />

      {/* ── tech stack ── */}
      <section className="section">
        <h2 style={{ margin: '0 0 40px' }}>Technology</h2>
        <div className="grid-cols-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '32px 24px' }}>
          {TECH_STACK.map(group => (
            <div key={group.label}>
              <h6 style={{ margin: '0 0 12px' }}>{group.label}</h6>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {group.items.map(t => <span key={t} className="tag tag-neutral">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="hr hr-full" />

      {/* ── about teaser ── */}
      <section className="section">
        <div className="split-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
          <div>
            <h2 style={{ margin: '0 0 16px' }}>About Me</h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: MUTED(78), margin: '0 0 16px' }}>
              I'm Zainab — a final-year Computer Science student who builds real, functional
              software rather than tech demos. My primary stack is Flutter and Blazor/.NET MAUI
              for mobile, and React for the web.
            </p>
            <Link to="/about" className="btn btn-secondary">More about me →</Link>
          </div>
          <ImageSlot label="Profile photo" gray style={{ width: '100%', aspectRatio: '4/3' }} />
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'var(--color-accent)', color: 'var(--color-bg)', padding: '88px clamp(20px,5vw,64px)' }}>
        <div className="container" style={{ padding: 0 }}>
          <h2 style={{ fontSize: 'clamp(30px,4vw,44px)', color: 'var(--color-bg)', margin: '0 0 16px' }}>Have an idea? Let's build it.</h2>
          <p style={{ fontSize: 17, maxWidth: '56ch', margin: '0 0 32px', opacity: 0.92 }}>
            Tell me what you're trying to build and I'll help turn it into a working product.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-lg" style={{ background: 'var(--color-bg)', color: 'var(--color-accent)' }}>Start a Project</Link>
            <Link to="/contact" className="btn btn-ghost btn-lg" style={{ color: 'var(--color-bg)', border: '1px solid var(--color-bg)' }}>Discuss Your Idea</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
