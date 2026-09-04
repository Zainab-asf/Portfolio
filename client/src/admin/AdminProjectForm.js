import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../lib/api';
import ProjectCaseStudy from '../components/ProjectCaseStudy';
import ToastStack, { useToasts } from './Toast';

const CATEGORIES = ['AI', 'Automation', 'Web', 'Mobile', 'Business Tools', 'SaaS'];

const EMPTY = {
  title: '', slug: '', category: 'Web', short: '',
  overview: '', problem: '', solution: '', features: '', value: '',
  tech: [], image: '', gallery: ['', '', '', ''],
  liveUrl: '', githubUrl: '', status: 'draft', featured: false
};

function fromProject(p) {
  return {
    title: p.title || '', slug: p.slug || '', category: p.category || 'Web', short: p.short || '',
    overview: p.overview || '', problem: p.problem || '', solution: p.solution || '',
    features: (p.features || []).join('\n'), value: p.value || '',
    tech: p.tech || [], image: p.image || '',
    gallery: [0, 1, 2, 3].map(i => (p.gallery || [])[i] || ''),
    liveUrl: p.liveUrl || '', githubUrl: p.githubUrl || '',
    status: p.status || 'draft', featured: Boolean(p.featured)
  };
}

export default function AdminProjectForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { toasts, push, dismiss } = useToasts();

  const [form, setForm] = useState(EMPTY);
  const [techInput, setTechInput] = useState('');
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [uploadingSlot, setUploadingSlot] = useState(null); // 'cover' | 0..3 | null

  useEffect(() => {
    if (!isEdit) return;
    api.get(`/api/projects/${id}`)
      .then(res => setForm(fromProject(res.data)))
      .catch(() => push('Failed to load project.', 'error'))
      .finally(() => setLoading(false));
  }, [id, isEdit, push]);

  const set = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const addTech = () => {
    const v = techInput.trim();
    if (!v || form.tech.includes(v)) { setTechInput(''); return; }
    set('tech', [...form.tech, v]);
    setTechInput('');
  };
  const removeTech = (i) => set('tech', form.tech.filter((_, idx) => idx !== i));

  const uploadFile = async (slot, file) => {
    setUploadingSlot(slot);
    try {
      const fd = new FormData();
      fd.append('image', file);
      const res = await api.post('/api/projects/upload/image', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      if (slot === 'cover') set('image', res.data.url);
      else set('gallery', form.gallery.map((g, i) => (i === slot ? res.data.url : g)));
    } catch (err) {
      push(err.response?.data?.error || 'Image upload failed.', 'error');
    } finally {
      setUploadingSlot(null);
    }
  };

  const buildPayload = (status) => ({
    title: form.title.trim(), slug: form.slug.trim(), category: form.category, short: form.short.trim(),
    overview: form.overview.trim(), problem: form.problem.trim(), solution: form.solution.trim(),
    features: form.features.split('\n').map(s => s.trim()).filter(Boolean),
    value: form.value.trim(), tech: form.tech, image: form.image,
    gallery: form.gallery.filter(Boolean),
    liveUrl: form.liveUrl.trim(), githubUrl: form.githubUrl.trim(),
    featured: form.featured, status
  });

  const save = async (status) => {
    if (!form.title.trim() || !form.short.trim()) {
      push('Title and short description are required.', 'error');
      return;
    }
    setSaving(true);
    try {
      const payload = buildPayload(status);
      if (isEdit) await api.put(`/api/projects/${id}`, payload);
      else await api.post('/api/projects', payload);
      push(status === 'published' ? 'Project published.' : 'Draft saved.');
      navigate('/admin/projects');
    } catch (err) {
      push(err.response?.data?.error || 'Failed to save project.', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: 28 }}>Loading…</div>;

  if (previewing) {
    const previewProject = { ...form, features: form.features.split('\n').map(s => s.trim()).filter(Boolean) };
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 28px', background: '#171514', color: '#fff', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>
            Preview Mode — this is how the case study will look publicly
          </span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
            <button type="button" className="btn btn-ghost" style={{ color: '#fff' }} onClick={() => setPreviewing(false)}>← Back to Edit</button>
            <button type="button" className="btn btn-primary" disabled={saving} onClick={() => save('published')}>Publish</button>
          </div>
        </div>
        <ProjectCaseStudy project={previewProject} />
      </div>
    );
  }

  return (
    <div style={{ padding: 28, maxWidth: 920 }}>
      <h3 style={{ margin: '0 0 4px' }}>{isEdit ? 'Edit Project' : 'Add Project'}</h3>
      <p style={{ fontSize: 14, color: 'color-mix(in srgb,var(--color-text) 60%,transparent)', margin: '0 0 28px' }}>
        {isEdit ? 'Update the details below and save your changes.' : 'Fill in the details below to add a new project to the portfolio.'}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

        <section>
          <h6 style={{ color: 'var(--color-accent-700)', margin: '0 0 16px' }}>Basic Information</h6>
          <div className="adm-form-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div className="field"><label>Project Title</label><input className="input" value={form.title} onChange={e => set('title', e.target.value)} /></div>
            <div className="field"><label>Slug (optional — auto-generated if blank)</label><input className="input" value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="my-project-name" /></div>
          </div>
          <div className="adm-form-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="field">
              <label>Category</label>
              <select className="input" value={form.category} onChange={e => set('category', e.target.value)}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="field"><label>Short Description</label><input className="input" value={form.short} onChange={e => set('short', e.target.value)} maxLength={280} /></div>
          </div>
        </section>

        <hr className="hr" style={{ margin: 0 }} />

        <section>
          <h6 style={{ color: 'var(--color-accent-700)', margin: '0 0 16px' }}>Case Study</h6>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="field"><label>Overview</label><textarea className="input" rows={3} value={form.overview} onChange={e => set('overview', e.target.value)} /></div>
            <div className="field"><label>Business Problem</label><textarea className="input" rows={3} value={form.problem} onChange={e => set('problem', e.target.value)} /></div>
            <div className="field"><label>Solution</label><textarea className="input" rows={3} value={form.solution} onChange={e => set('solution', e.target.value)} /></div>
            <div className="field"><label>Key Features (one per line)</label><textarea className="input" rows={4} value={form.features} onChange={e => set('features', e.target.value)} /></div>
            <div className="field"><label>Results / Business Value</label><textarea className="input" rows={3} value={form.value} onChange={e => set('value', e.target.value)} /></div>
          </div>
        </section>

        <hr className="hr" style={{ margin: 0 }} />

        <section>
          <h6 style={{ color: 'var(--color-accent-700)', margin: '0 0 16px' }}>Technology</h6>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
            {form.tech.map((t, i) => (
              <span key={t} className="tag tag-neutral" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {t}
                <span onClick={() => removeTech(i)} style={{ cursor: 'pointer', fontWeight: 800 }}>×</span>
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, maxWidth: 340 }}>
            <input
              className="input" type="text" placeholder="Add a technology…" value={techInput}
              onChange={e => setTechInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTech(); } }}
            />
            <button type="button" className="btn btn-secondary" onClick={addTech}>Add</button>
          </div>
        </section>

        <hr className="hr" style={{ margin: 0 }} />

        <section>
          <h6 style={{ color: 'var(--color-accent-700)', margin: '0 0 16px' }}>Media</h6>
          <div className="field" style={{ marginBottom: 16 }}>
            <label>Cover Image</label>
            <ImageSlotUpload
              src={form.image} width={280} height={170}
              busy={uploadingSlot === 'cover'}
              onPick={(file) => uploadFile('cover', file)}
              onClear={() => set('image', '')}
            />
          </div>
          <div className="field">
            <label>Screenshots / Gallery</label>
            <div className="grid-cols-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, maxWidth: 600 }}>
              {form.gallery.map((src, i) => (
                <ImageSlotUpload
                  key={i} src={src} aspect="4/3" label={`Screenshot ${i + 1}`}
                  busy={uploadingSlot === i}
                  onPick={(file) => uploadFile(i, file)}
                  onClear={() => set('gallery', form.gallery.map((g, idx) => (idx === i ? '' : g)))}
                />
              ))}
            </div>
          </div>
        </section>

        <hr className="hr" style={{ margin: 0 }} />

        <section>
          <h6 style={{ color: 'var(--color-accent-700)', margin: '0 0 16px' }}>Links</h6>
          <div className="adm-form-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="field"><label>Live Website</label><input className="input" placeholder="https://…" value={form.liveUrl} onChange={e => set('liveUrl', e.target.value)} /></div>
            <div className="field"><label>GitHub</label><input className="input" placeholder="https://github.com/…" value={form.githubUrl} onChange={e => set('githubUrl', e.target.value)} /></div>
          </div>
        </section>

        <hr className="hr" style={{ margin: 0 }} />

        <section>
          <h6 style={{ color: 'var(--color-accent-700)', margin: '0 0 16px' }}>Publishing</h6>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <div className="seg">
              <label className="seg-opt"><input type="radio" name="pubstatus" checked={form.status === 'draft'} onChange={() => set('status', 'draft')} />Draft</label>
              <label className="seg-opt"><input type="radio" name="pubstatus" checked={form.status === 'published'} onChange={() => set('status', 'published')} />Published</label>
            </div>
            <label className="radio">
              <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} /><span className="dot" />Featured
            </label>
          </div>
        </section>
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', paddingTop: 36, borderTop: '2px solid var(--color-divider)', marginTop: 32, flexWrap: 'wrap' }}>
        <button type="button" className="btn btn-secondary" disabled={saving} onClick={() => navigate('/admin/projects')}>Cancel</button>
        <button type="button" className="btn btn-secondary" disabled={saving} onClick={() => save('draft')}>Save Draft</button>
        <button type="button" className="btn btn-secondary" disabled={saving} onClick={() => setPreviewing(true)}>Preview</button>
        <button type="button" className="btn btn-primary" disabled={saving} onClick={() => save('published')}>Publish</button>
      </div>

      <ToastStack toasts={toasts} dismiss={dismiss} />
    </div>
  );
}

function ImageSlotUpload({ src, width, height, aspect, label = 'Drop cover image', busy, onPick, onClear }) {
  const ref = useRef(null);
  return (
    <div style={{ position: 'relative', width: width || '100%', height, aspectRatio: aspect }}>
      <input ref={ref} type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml" style={{ display: 'none' }}
        onChange={e => { const f = e.target.files?.[0]; if (f) onPick(f); e.target.value = ''; }} />
      {src ? (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <button type="button" className="btn btn-icon" style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,0.6)', color: '#fff', width: 24, height: 24 }} onClick={onClear} aria-label="Remove">×</button>
        </div>
      ) : (
        <button
          type="button" onClick={() => ref.current?.click()} disabled={busy}
          className="img-slot" style={{ width: '100%', height: '100%', border: '1px dashed var(--color-divider)', cursor: 'pointer' }}
        >
          {busy ? 'Uploading…' : label}
        </button>
      )}
    </div>
  );
}
