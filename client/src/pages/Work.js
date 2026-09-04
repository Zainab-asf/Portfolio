import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import ProjectCard from '../components/ProjectCard';

const BASE_CATEGORIES = ['All', 'AI', 'Automation', 'Web', 'Mobile', 'Business Tools'];

export default function Work() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/projects')
      .then(res => setProjects(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const found = [...new Set(projects.map(p => p.category).filter(Boolean))];
    const ordered = BASE_CATEGORIES.filter(c => c === 'All' || found.includes(c));
    const extra = found.filter(c => !BASE_CATEGORIES.includes(c)).sort();
    return [...ordered, ...extra];
  }, [projects]);

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="container" style={{ padding: '64px clamp(20px,5vw,64px) 96px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ margin: '0 0 8px' }}>Selected Work</h1>
        <p style={{ fontSize: 16, color: 'color-mix(in srgb,var(--color-text) 70%,transparent)', margin: 0 }}>
          Real apps. Real problems solved.
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 40 }}>
        {categories.map(cat => (
          <button
            key={cat} type="button" className="tag" onClick={() => setFilter(cat)}
            style={{
              cursor: 'pointer', padding: '6px 14px', fontSize: 12,
              borderColor: filter === cat ? 'var(--color-accent)' : 'var(--color-divider)',
              background: filter === cat ? 'var(--color-accent)' : 'transparent',
              color: filter === cat ? 'var(--color-bg)' : 'var(--color-text)'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && <p style={{ color: 'var(--color-text)', opacity: 0.6 }}>Loading projects…</p>}

      {!loading && filtered.length > 0 && (
        <div className="grid-cols-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, background: 'var(--color-divider)' }}>
          {filtered.map(p => <ProjectCard key={p._id || p.slug} project={p} />)}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '96px 24px', borderTop: '2px solid var(--color-divider)' }}>
          <h3 style={{ margin: '0 0 8px' }}>No projects match this filter</h3>
          <p style={{ fontSize: 15, color: 'color-mix(in srgb,var(--color-text) 70%,transparent)', margin: '0 0 24px' }}>Try a different category.</p>
          <button type="button" className="btn btn-secondary" onClick={() => setFilter('All')}>Show All</button>
        </div>
      )}
    </div>
  );
}
