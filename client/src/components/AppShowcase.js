import React, { useEffect, useRef, useState } from 'react';
import './AppShowcase.css';

const apps = [
  {
    id: 'kidsafe-parent',
    label: 'KidSafe — Parent Dashboard',
    sublabel: 'Blazor · .NET MAUI · Azure AI',
    screenshot: null,         // → replace with: import img from '../../public/images/kidsafe-parent.png'
    placeholderColor: 'linear-gradient(160deg, #1a0a2e 0%, #2d1257 40%, #0f172a 100%)',
    accentColor: '#8b5cf6',
    ui: 'parent',
  },
  {
    id: 'kidsafe-child',
    label: 'KidSafe — Child View',
    sublabel: 'Real-time Content Filter · Safety Alerts',
    screenshot: null,
    placeholderColor: 'linear-gradient(160deg, #0a1628 0%, #0f2a4a 50%, #060812 100%)',
    accentColor: '#38bdf8',
    ui: 'child',
  },
  {
    id: 'gearup',
    label: 'Gear Up Garage',
    sublabel: 'Flutter · Firebase · FCM',
    screenshot: null,
    placeholderColor: 'linear-gradient(160deg, #1a0f00 0%, #3d1f00 40%, #0f0a00 100%)',
    accentColor: '#fbbf24',
    ui: 'garage',
  },
];

export default function AppShowcase() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="showcase-section" ref={ref}>
      <div className="container">
        <h2 className="section-title">
          <span className="section-number">03b.</span>App Showcase
        </h2>
        <p className="showcase-sub">
          Mobile interfaces built with Flutter &amp; Blazor/.NET MAUI
        </p>
      </div>

      <div className={`phones-stage ${visible ? 'visible' : ''}`}>

        {/* ── Left phone ───────────────────────── */}
        <div className="phone-wrap phone-left">
          <PhoneFrame app={apps[0]} />
          <div className="phone-label">
            <span className="pl-name">{apps[0].label}</span>
            <span className="pl-tech">{apps[0].sublabel}</span>
          </div>
        </div>

        {/* ── Center phone (prominent) ──────────── */}
        <div className="phone-wrap phone-center">
          <PhoneFrame app={apps[1]} large />
          <div className="phone-label">
            <span className="pl-name">{apps[1].label}</span>
            <span className="pl-tech">{apps[1].sublabel}</span>
          </div>
        </div>

        {/* ── Right phone ──────────────────────── */}
        <div className="phone-wrap phone-right">
          <PhoneFrame app={apps[2]} />
          <div className="phone-label">
            <span className="pl-name">{apps[2].label}</span>
            <span className="pl-tech">{apps[2].sublabel}</span>
          </div>
        </div>

      </div>

      {/* How-to note for the developer */}
      <p className="screenshot-hint">
        💡 Add real screenshots: place images in{' '}
        <code>client/public/images/</code> and set the{' '}
        <code>screenshot</code> prop in <code>AppShowcase.js</code>
      </p>
    </section>
  );
}

function PhoneFrame({ app, large }) {
  return (
    <div className={`phone-frame ${large ? 'phone-large' : ''}`}>

      {/* Side buttons */}
      <div className="btn-power"   aria-hidden="true" />
      <div className="btn-vol-up"  aria-hidden="true" />
      <div className="btn-vol-dn"  aria-hidden="true" />

      {/* Inner bezel */}
      <div className="phone-bezel">

        {/* Dynamic Island */}
        <div className="dynamic-island" aria-hidden="true" />

        {/* Screen */}
        <div
          className="phone-screen"
          style={{
            background: app.screenshot
              ? `url(${app.screenshot}) center/cover no-repeat`
              : app.placeholderColor,
          }}
        >
          {!app.screenshot && <MockUI type={app.ui} accent={app.accentColor} />}
        </div>

        {/* Home indicator */}
        <div className="home-indicator" aria-hidden="true" />
      </div>

      {/* Glow under phone */}
      <div
        className="phone-glow"
        style={{ background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${app.accentColor}33, transparent)` }}
        aria-hidden="true"
      />
    </div>
  );
}

/* Minimal placeholder UI so phones look alive */
function MockUI({ type, accent }) {
  if (type === 'parent') return (
    <div className="mock-ui mock-parent" style={{ '--a': accent }}>
      <div className="mu-status-bar">
        <span>9:41</span><span className="mu-icons">▲▲▲</span>
      </div>
      <div className="mu-header">
        <div className="mu-avatar" />
        <div>
          <div className="mu-line mu-bold" style={{ width: 100 }} />
          <div className="mu-line" style={{ width: 70 }} />
        </div>
        <div className="mu-bell"><BellIcon /></div>
      </div>
      <div className="mu-card mu-card-accent">
        <div className="mu-line mu-bold" style={{ width: 120 }} />
        <div className="mu-line" style={{ width: 90 }} />
        <div className="mu-shield"><ShieldIcon /></div>
      </div>
      <div className="mu-row">
        <div className="mu-mini-card"><div className="mu-mini-icon" /><div className="mu-line" style={{ width: 50, margin:'4px auto 0' }} /></div>
        <div className="mu-mini-card"><div className="mu-mini-icon" /><div className="mu-line" style={{ width: 50, margin:'4px auto 0' }} /></div>
        <div className="mu-mini-card"><div className="mu-mini-icon" /><div className="mu-line" style={{ width: 50, margin:'4px auto 0' }} /></div>
      </div>
      <div className="mu-card">
        {[1,2,3].map(i => (
          <div key={i} className="mu-list-item">
            <div className="mu-dot" />
            <div>
              <div className="mu-line" style={{ width: 100 + i * 10 }} />
              <div className="mu-line mu-dim" style={{ width: 60 }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mu-nav-bar">
        {[0,1,2,3].map(i => <div key={i} className={`mu-nav-item ${i===0?'mu-nav-active':''}`}><div className="mu-nav-icon" /></div>)}
      </div>
    </div>
  );

  if (type === 'child') return (
    <div className="mock-ui mock-child" style={{ '--a': accent }}>
      <div className="mu-status-bar"><span>9:41</span><span className="mu-icons">▲▲▲</span></div>
      <div className="mu-hero-area">
        <div className="mu-big-icon"><SafeIcon /></div>
        <div className="mu-line mu-bold mu-center" style={{ width: 110, margin:'8px auto 4px' }} />
        <div className="mu-badge-safe">SAFE</div>
      </div>
      <div className="mu-card">
        <div className="mu-line mu-bold" style={{ width: 90 }} />
        {[100,140,80].map((w,i) => <div key={i} className="mu-line mu-dim" style={{ width: w, marginTop:6 }} />)}
      </div>
      <div className="mu-card mu-card-alert">
        <div className="mu-row-flat">
          <div className="mu-dot mu-dot-green" />
          <div className="mu-line mu-dim" style={{ width: 130 }} />
        </div>
      </div>
      <div className="mu-nav-bar">
        {[0,1,2,3].map(i => <div key={i} className={`mu-nav-item ${i===1?'mu-nav-active':''}`}><div className="mu-nav-icon" /></div>)}
      </div>
    </div>
  );

  if (type === 'garage') return (
    <div className="mock-ui mock-garage" style={{ '--a': accent }}>
      <div className="mu-status-bar"><span>9:41</span><span className="mu-icons">▲▲▲</span></div>
      <div className="mu-header">
        <div className="mu-line mu-bold" style={{ width: 120 }} />
        <div className="mu-circle-btn"><span>+</span></div>
      </div>
      <div className="mu-card mu-card-amber">
        <div className="mu-line mu-bold" style={{ width: 80 }} />
        <div className="mu-row-flat" style={{ marginTop: 8, gap: 8 }}>
          {[1,2,3].map(i => (
            <div key={i} className="mu-stat-chip">
              <div className="mu-line mu-bold mu-center" style={{ width: 28 }} />
              <div className="mu-line mu-dim mu-center" style={{ width: 36, marginTop:3 }} />
            </div>
          ))}
        </div>
      </div>
      {[1,2,3].map(i => (
        <div key={i} className="mu-list-row">
          <div className="mu-car-icon" />
          <div style={{ flex:1 }}>
            <div className="mu-line" style={{ width: 90 + i*10 }} />
            <div className="mu-line mu-dim" style={{ width: 60 }} />
          </div>
          <div className="mu-badge-status" />
        </div>
      ))}
      <div className="mu-nav-bar">
        {[0,1,2,3].map(i => <div key={i} className={`mu-nav-item ${i===0?'mu-nav-active':''}`}><div className="mu-nav-icon" /></div>)}
      </div>
    </div>
  );

  return null;
}

const BellIcon   = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>);
const ShieldIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>);
const SafeIcon   = () => (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>);
