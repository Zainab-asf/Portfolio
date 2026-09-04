import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/projects/admin')
      .then(res => setProjects(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const stats = {
    total: projects.length,
    published: projects.filter(p => p.status === 'published').length,
    drafts: projects.filter(p => p.status === 'draft').length,
    featured: projects.filter(p => p.featured).length
  };
  const recent = [...projects]
    .sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0))
    .slice(0, 5);

  return (
    <div style={{ padding: 28 }}>
      <div className="adm-stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2, background: 'var(--color-divider)', marginBottom: 28 }}>
        {[
          ['Total Projects', stats.total], ['Published', stats.published],
          ['Drafts', stats.drafts], ['Featured', stats.featured]
        ].map(([label, value]) => (
          <div key={label} style={{ background: 'var(--color-bg)', padding: 22 }}>
            <div style={{ fontSize: 12, color: 'color-mix(in srgb,var(--color-text) 60%,transparent)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>{label}</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 32 }}>{loading ? '—' : value}</div>
          </div>
        ))}
      </div>

      <div className="adm-form-cols" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <h5 style={{ margin: 0 }}>Recent Projects</h5>
            <button type="button" className="btn btn-ghost" style={{ fontSize: 13 }} onClick={() => navigate('/admin/projects')}>View all →</button>
          </div>
          <table className="table">
            <thead><tr><th>Project</th><th>Category</th><th>Status</th><th>Updated</th></tr></thead>
            <tbody>
              {recent.map(p => (
                <tr key={p._id}>
                  <td style={{ fontWeight: 600 }}>{p.title}</td>
                  <td>{p.category}</td>
                  <td><span className={`tag ${p.status === 'published' ? 'tag-accent' : 'tag-neutral'}`}>{p.status}</span></td>
                  <td style={{ color: 'color-mix(in srgb,var(--color-text) 60%,transparent)' }}>
                    {p.updatedAt ? new Date(p.updatedAt).toLocaleDateString() : '—'}
                  </td>
                </tr>
              ))}
              {!loading && recent.length === 0 && (
                <tr><td colSpan={4} style={{ textAlign: 'center', color: 'color-mix(in srgb,var(--color-text) 55%,transparent)' }}>No projects yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div>
          <h5 style={{ margin: '0 0 14px' }}>Quick Actions</h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button type="button" className="btn btn-primary btn-block" onClick={() => navigate('/admin/projects/new')}>Add Project</button>
            <button type="button" className="btn btn-secondary btn-block" onClick={() => navigate('/admin/projects')}>Manage Projects</button>
            <a href="/" target="_blank" rel="noreferrer" className="btn btn-secondary btn-block">View Portfolio</a>
          </div>
        </div>
      </div>
    </div>
  );
}
