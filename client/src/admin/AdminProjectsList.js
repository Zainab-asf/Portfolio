import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import ToastStack, { useToasts } from './Toast';

const CATEGORIES = ['AI', 'Automation', 'Web', 'Mobile', 'Business Tools'];

export default function AdminProjectsList() {
  const navigate = useNavigate();
  const { toasts, push, dismiss } = useToasts();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    api.get('/api/projects/admin')
      .then(res => setProjects(res.data))
      .catch(() => push('Failed to load projects.', 'error'))
      .finally(() => setLoading(false));
  }, [push]);

  useEffect(() => { load(); }, [load]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return projects.filter(p =>
      (catFilter === 'All' || p.category === catFilter) &&
      (statusFilter === 'All' || p.status === statusFilter) &&
      (!q || p.title.toLowerCase().includes(q))
    );
  }, [projects, search, catFilter, statusFilter]);

  const toggleStatus = async (p) => {
    const next = p.status === 'published' ? 'draft' : 'published';
    try {
      const res = await api.put(`/api/projects/${p._id}`, { status: next });
      setProjects(prev => prev.map(x => x._id === p._id ? res.data : x));
      push(next === 'published' ? 'Project published.' : 'Project unpublished.');
    } catch (err) {
      push(err.response?.data?.error || 'Failed to update status.', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/projects/${deleteTarget._id}`);
      setProjects(prev => prev.filter(x => x._id !== deleteTarget._id));
      setDeleteTarget(null);
      push('Project deleted.');
    } catch (err) {
      push(err.response?.data?.error || 'Failed to delete project.', 'error');
    }
  };

  const clearFilters = () => { setSearch(''); setCatFilter('All'); setStatusFilter('All'); };

  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', flex: 1 }}>
          <input className="input" style={{ maxWidth: 260 }} type="text" placeholder="Search projects…" value={search} onChange={e => setSearch(e.target.value)} />
          <select className="input" style={{ maxWidth: 170 }} value={catFilter} onChange={e => setCatFilter(e.target.value)}>
            <option value="All">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="input" style={{ maxWidth: 150 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="All">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => navigate('/admin/projects/new')}>Add Project</button>
      </div>

      {loading && <p style={{ color: 'color-mix(in srgb,var(--color-text) 60%,transparent)' }}>Loading…</p>}

      {!loading && filtered.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Project</th><th className="adm-table-col">Category</th><th>Status</th>
                <th className="adm-table-col">Featured</th><th className="adm-table-col">Updated</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p._id}>
                  <td style={{ fontWeight: 600 }}>{p.title}</td>
                  <td className="adm-table-col">{p.category}</td>
                  <td><span className={`tag ${p.status === 'published' ? 'tag-accent' : 'tag-neutral'}`}>{p.status}</span></td>
                  <td className="adm-table-col">
                    {p.featured
                      ? <span className="tag tag-accent">Featured</span>
                      : <span style={{ color: 'color-mix(in srgb,var(--color-text) 40%,transparent)', fontSize: 13 }}>—</span>}
                  </td>
                  <td className="adm-table-col" style={{ color: 'color-mix(in srgb,var(--color-text) 60%,transparent)' }}>
                    {p.updatedAt ? new Date(p.updatedAt).toLocaleDateString() : '—'}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      <button type="button" className="btn btn-ghost" style={{ padding: '4px 8px', fontSize: 12 }} onClick={() => navigate(`/admin/projects/${p._id}/edit`)}>Edit</button>
                      {p.status === 'published' && (
                        <a href={`/work/${p.slug}`} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ padding: '4px 8px', fontSize: 12 }}>Preview</a>
                      )}
                      <button type="button" className="btn btn-ghost" style={{ padding: '4px 8px', fontSize: 12 }} onClick={() => toggleStatus(p)}>
                        {p.status === 'published' ? 'Unpublish' : 'Publish'}
                      </button>
                      <button type="button" className="btn btn-ghost" style={{ padding: '4px 8px', fontSize: 12, color: 'var(--color-accent-700)' }} onClick={() => setDeleteTarget(p)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && filtered.length === 0 && projects.length > 0 && (
        <div style={{ textAlign: 'center', padding: '96px 24px', border: '2px dashed var(--color-divider)' }}>
          <h3 style={{ margin: '0 0 8px' }}>No projects match</h3>
          <p style={{ fontSize: 14, color: 'color-mix(in srgb,var(--color-text) 65%,transparent)', margin: '0 0 20px' }}>Try adjusting your search or filters.</p>
          <button type="button" className="btn btn-secondary" onClick={clearFilters}>Clear Filters</button>
        </div>
      )}

      {!loading && projects.length === 0 && (
        <div style={{ textAlign: 'center', padding: '96px 24px', border: '2px dashed var(--color-divider)' }}>
          <h3 style={{ margin: '0 0 8px' }}>No projects yet</h3>
          <p style={{ fontSize: 14, color: 'color-mix(in srgb,var(--color-text) 65%,transparent)', margin: '0 0 20px' }}>Add your first project to start building your portfolio.</p>
          <button type="button" className="btn btn-primary" onClick={() => navigate('/admin/projects/new')}>Add Project</button>
        </div>
      )}

      {deleteTarget && (
        <ConfirmDeleteModal project={deleteTarget} onCancel={() => setDeleteTarget(null)} onConfirm={handleDelete} />
      )}
      <ToastStack toasts={toasts} dismiss={dismiss} />
    </div>
  );
}
