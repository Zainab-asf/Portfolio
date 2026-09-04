import React from 'react';
import { Link } from 'react-router-dom';
import { ServiceIcons } from '../components/icons';
import { SERVICES } from '../data/content';

export default function Services() {
  return (
    <div className="container" style={{ padding: '64px clamp(20px,5vw,64px) 96px' }}>
      <h1 style={{ margin: '0 0 12px' }}>Services</h1>
      <p style={{ fontSize: 16, maxWidth: '56ch', color: 'color-mix(in srgb,var(--color-text) 70%,transparent)', margin: '0 0 48px' }}>
        What I build, end to end — from a first sketch to a product running in production.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {SERVICES.map((s, i) => {
          const Icon = ServiceIcons[s.icon];
          return (
            <div key={s.title} style={{
              display: 'grid', gridTemplateColumns: '56px 1fr', gap: 24, padding: '32px 0',
              borderTop: '2px solid var(--color-divider)',
              borderBottom: i === SERVICES.length - 1 ? '2px solid var(--color-divider)' : 'none'
            }}>
              <Icon size={28} />
              <div>
                <h3 style={{ fontSize: 22, margin: '0 0 8px' }}>{s.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.65, maxWidth: '64ch', color: 'color-mix(in srgb,var(--color-text) 78%,transparent)', margin: 0 }}>
                  {s.long}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: 'center', paddingTop: 56 }}>
        <Link to="/contact" className="btn btn-primary btn-lg">Start a Project</Link>
      </div>
    </div>
  );
}
