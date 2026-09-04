import React from 'react';
import { Link } from 'react-router-dom';
import ImageSlot from './ImageSlot';

export default function ProjectCard({ project }) {
  return (
    <div style={{ background: 'var(--color-bg)', display: 'flex', flexDirection: 'column' }}>
      <ImageSlot src={project.image} label="Cover image" style={{ width: '100%', aspectRatio: '16/10' }} />
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', flex: 1, gap: 10 }}>
        <span className="tag tag-outline" style={{ alignSelf: 'flex-start' }}>{project.category}</span>
        <h4 style={{ fontSize: 18, margin: 0 }}>{project.title}</h4>
        <p style={{ fontSize: 13.5, lineHeight: 1.55, color: 'color-mix(in srgb,var(--color-text) 72%,transparent)', margin: 0, flex: 1 }}>
          {project.short}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {(project.tech || []).slice(0, 3).map(t => <span key={t} className="tag tag-neutral">{t}</span>)}
        </div>
        <Link to={`/work/${project.slug}`} className="btn btn-ghost" style={{ paddingLeft: 0, marginTop: 4, alignSelf: 'flex-start' }}>
          View Case Study →
        </Link>
      </div>
    </div>
  );
}
