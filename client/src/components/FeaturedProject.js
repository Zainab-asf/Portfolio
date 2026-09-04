import React from 'react';
import { Link } from 'react-router-dom';
import ImageSlot from './ImageSlot';

/** Full-width alternating row for featured work, matching the reference's "Selected Work" pattern. */
export default function FeaturedProject({ project, reverse }) {
  return (
    <div
      className="featured-row"
      style={{
        display: 'flex', gap: 48, alignItems: 'center', padding: '40px 0',
        borderTop: '2px solid var(--color-divider)',
        flexDirection: reverse ? 'row-reverse' : 'row'
      }}
    >
      <div style={{ flex: 1.1 }}>
        <ImageSlot src={project.image} label="Project screenshot" style={{ width: '100%', aspectRatio: '16/10' }} />
      </div>
      <div style={{ flex: 0.9 }}>
        <span className="tag tag-outline" style={{ marginBottom: 12 }}>{project.category}</span>
        <h3 style={{ fontSize: 26, margin: '12px 0' }}>{project.title}</h3>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: 'color-mix(in srgb,var(--color-text) 75%,transparent)', margin: '0 0 20px', maxWidth: '44ch' }}>
          {project.short}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
          {(project.tech || []).map(t => <span key={t} className="tag tag-neutral">{t}</span>)}
        </div>
        <Link to={`/work/${project.slug}`} className="btn btn-secondary">View Case Study</Link>
      </div>
    </div>
  );
}
