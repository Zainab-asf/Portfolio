import React from 'react';
import { Link } from 'react-router-dom';
import ImageSlot from '../components/ImageSlot';
import { EXPERIENCE } from '../data/content';

const MUTED = (pct) => `color-mix(in srgb,var(--color-text) ${pct}%,transparent)`;

export default function About() {
  return (
    <div className="container-narrow" style={{ padding: '64px clamp(20px,5vw,64px) 96px' }}>
      <h1 style={{ margin: '0 0 24px' }}>About Me</h1>
      <ImageSlot label="Profile photo" gray style={{ width: '100%', aspectRatio: '16/8', marginBottom: 32 }} />

      <p style={{ fontSize: 17, lineHeight: 1.75, margin: '0 0 20px' }}>
        Hi, I'm Zainab — a final-year Computer Science student at COMSATS University, Lahore
        (Class of 2026, 3.73 GPA). I build cross-platform mobile apps and web experiences with
        Flutter, Blazor/.NET MAUI and React, and I care more about software that works reliably
        than software that only works in the demo.
      </p>
      <p style={{ fontSize: 17, lineHeight: 1.75, margin: '0 0 20px' }}>
        My final-year project explores AI-powered child safety — building protective technology
        with Azure Cognitive Services that gives parents visibility without turning an app into
        surveillance. Outside of that, I take on freelance mobile and automation work, with a
        5-star client record across every project delivered.
      </p>
      <p style={{ fontSize: 17, lineHeight: 1.75, margin: '0 0 40px' }}>
        I'm an obsessive debugger who doesn't stop until something works beautifully — and I'm
        currently open to full-time roles, internships and freelance projects starting June 2026.
      </p>

      <hr className="hr" />

      <div className="split-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, margin: '32px 0 64px' }}>
        <div>
          <h4 style={{ fontSize: 16, margin: '0 0 8px' }}>What I build</h4>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: MUTED(75), margin: 0 }}>
            Mobile apps, AI-powered systems, business automation and the web platforms behind them.
          </p>
        </div>
        <div>
          <h4 style={{ fontSize: 16, margin: '0 0 8px' }}>How I work</h4>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: MUTED(75), margin: 0 }}>
            Discover, plan, design, build, test, launch — with clear communication at every step.
          </p>
        </div>
      </div>

      <h2 style={{ margin: '0 0 24px' }}>Experience</h2>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {EXPERIENCE.map((e, i) => (
          <div key={e.title} style={{
            padding: '24px 0', borderTop: '2px solid var(--color-divider)',
            borderBottom: i === EXPERIENCE.length - 1 ? '2px solid var(--color-divider)' : 'none'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
              <span className="tag tag-outline">{e.type}</span>
              <span style={{ fontSize: 13, color: MUTED(60) }}>{e.period}</span>
            </div>
            <h4 style={{ fontSize: 18, margin: '0 0 4px' }}>{e.title}</h4>
            <p style={{ fontSize: 14, color: MUTED(70), margin: '0 0 10px' }}>{e.org}</p>
            <p style={{ fontSize: 15, lineHeight: 1.6, margin: '0 0 12px' }}>{e.body}</p>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.7, color: MUTED(78) }}>
              {e.highlights.map(h => <li key={h}>{h}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', paddingTop: 56 }}>
        <Link to="/contact" className="btn btn-primary btn-lg">Start a Project</Link>
      </div>
    </div>
  );
}
