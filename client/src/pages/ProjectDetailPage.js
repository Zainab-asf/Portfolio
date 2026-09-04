import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProjectCaseStudy from '../components/ProjectCaseStudy';
import { fetchProjectBySlug } from '../lib/publicProjects';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | ok | notfound

  useEffect(() => {
    setStatus('loading');
    fetchProjectBySlug(slug)
      .then(data => { setProject(data); setStatus('ok'); })
      .catch(() => setStatus('notfound'));
  }, [slug]);

  if (status === 'loading') {
    return <div className="container" style={{ padding: '96px clamp(20px,5vw,64px)' }}>Loading…</div>;
  }

  if (status === 'notfound') {
    return (
      <div className="container" style={{ padding: '96px clamp(20px,5vw,64px)', textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 12px' }}>Project not found</h2>
        <Link to="/work" className="btn btn-secondary">← Back to Work</Link>
      </div>
    );
  }

  return (
    <ProjectCaseStudy
      project={project}
      backSlot={<Link to="/work" className="btn btn-ghost" style={{ paddingLeft: 0, marginBottom: 24 }}>← Back to Work</Link>}
      ctaSlot={
        <section style={{ background: 'var(--color-accent)', color: 'var(--color-bg)', padding: '80px clamp(20px,5vw,64px)', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--color-bg)', fontSize: 'clamp(28px,3.6vw,40px)', margin: '0 0 24px' }}>Have a Similar Project in Mind?</h2>
          <Link to="/contact" className="btn btn-lg" style={{ background: 'var(--color-bg)', color: 'var(--color-accent)' }}>Let's Build It</Link>
        </section>
      }
    />
  );
}
