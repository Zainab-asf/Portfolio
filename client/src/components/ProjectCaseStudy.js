import React from 'react';
import ImageSlot from './ImageSlot';

const MUTED78 = 'color-mix(in srgb,var(--color-text) 78%,transparent)';
const ACC7 = 'var(--color-accent-700)';

function Block({ kicker, text }) {
  if (!text) return null;
  return (
    <section className="container-narrow" style={{ padding: '0 clamp(20px,5vw,64px) 56px' }}>
      <h6 style={{ color: ACC7, margin: '0 0 12px' }}>{kicker}</h6>
      <p style={{ fontSize: 17, lineHeight: 1.7, margin: 0 }}>{text}</p>
    </section>
  );
}

/**
 * Renders a project's full case-study body. Used by the public /work/:slug
 * page and by the admin "Preview" mode, so the two never drift apart.
 */
export default function ProjectCaseStudy({ project, ctaSlot, backSlot }) {
  const gallery = project.gallery && project.gallery.length ? project.gallery : [null, null, null];

  return (
    <div>
      <section className="container" style={{ padding: '64px clamp(20px,5vw,64px) 40px' }}>
        {backSlot}
        <ImageSlot src={project.image} label="Project hero image" style={{ width: '100%', aspectRatio: '16/7', marginBottom: 32 }} />
        <span className="tag tag-outline" style={{ marginBottom: 16 }}>{project.category}</span>
        <h1 style={{ fontSize: 38, margin: '16px 0 12px' }}>{project.title}</h1>
        <p style={{ fontSize: 17, maxWidth: '60ch', color: MUTED78, margin: '0 0 24px' }}>{project.short}</p>
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary">Visit Project</a>
        )}
      </section>

      <hr className="hr hr-full" />

      <section className="container-narrow" style={{ padding: '56px clamp(20px,5vw,64px)' }}>
        <h6 style={{ color: ACC7, margin: '0 0 12px' }}>Overview</h6>
        <p style={{ fontSize: 17, lineHeight: 1.7, margin: 0 }}>{project.overview}</p>
      </section>
      <Block kicker="The Challenge" text={project.problem} />
      <Block kicker="The Solution" text={project.solution} />

      <hr className="hr hr-full" />

      {project.features && project.features.length > 0 && (
        <section className="container-narrow" style={{ padding: '56px clamp(20px,5vw,64px)' }}>
          <h6 style={{ color: ACC7, margin: '0 0 20px' }}>Key Features</h6>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {project.features.map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, padding: '16px 0', borderTop: '2px solid var(--color-divider)' }}>
                <span style={{ width: 8, height: 8, background: 'var(--color-accent)', marginTop: 8, flex: 'none' }} />
                <p style={{ fontSize: 16, lineHeight: 1.6, margin: 0 }}>{f}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {project.tech && project.tech.length > 0 && (
        <section className="container-narrow" style={{ padding: '0 clamp(20px,5vw,64px) 56px' }}>
          <h6 style={{ color: ACC7, margin: '0 0 16px' }}>Technology</h6>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {project.tech.map(t => <span key={t} className="tag tag-neutral" style={{ fontSize: 13, padding: '6px 14px' }}>{t}</span>)}
          </div>
        </section>
      )}

      <hr className="hr hr-full" />

      <section className="container" style={{ padding: '56px clamp(20px,5vw,64px)' }}>
        <h6 style={{ color: ACC7, margin: '0 0 20px' }}>Product Screenshots</h6>
        <div className="grid-cols-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {gallery.slice(0, 3).map((src, i) => (
            <ImageSlot key={i} src={src} label="Screenshot" style={{ width: '100%', aspectRatio: '4/3' }} />
          ))}
        </div>
      </section>

      <hr className="hr hr-full" />
      <Block kicker="Business Value" text={project.value} />

      {ctaSlot}
    </div>
  );
}
