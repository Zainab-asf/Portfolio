import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './Projects.css';

// Fallback data (used if API is offline)
const FALLBACK_PROJECTS = [
  {
    id: 1,
    title: 'AI-Powered Child Safety App',
    description: 'A cross-platform Blazor application that uses AI to monitor and protect children\'s digital activity in real time. Features content filtering, parental controls, and instant safety alerts.',
    tech: ['Blazor', '.NET MAUI', 'C#', 'Azure AI', 'SQL Server'],
    image: null,
    liveUrl: '',
    githubUrl: 'https://github.com/zainabasif',
    featured: true,
    category: 'Mobile',
  },
  {
    id: 2,
    title: 'Gear Up Garage',
    description: 'Full-featured garage management system built in Flutter. Handles appointments, parts inventory, invoicing, and customer management with real-time push notifications.',
    tech: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'FCM'],
    image: null,
    liveUrl: '',
    githubUrl: 'https://github.com/zainabasif',
    featured: true,
    category: 'Mobile',
  },
  {
    id: 3,
    title: 'Workflow Automation Suite',
    description: 'n8n-based automation pipelines integrating Gmail, Google Sheets, Slack, and custom webhooks. Eliminated 80% of manual data entry for a business client.',
    tech: ['n8n', 'JavaScript', 'REST APIs', 'Webhooks'],
    image: null,
    liveUrl: '',
    githubUrl: 'https://github.com/zainabasif',
    featured: false,
    category: 'Automation',
  },
  {
    id: 4,
    title: 'This Portfolio',
    description: 'Full-stack MERN portfolio with React frontend, Express backend, MongoDB contact storage, animated sections, and a working email contact form.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    image: null,
    liveUrl: 'https://zainabasif.dev',
    githubUrl: 'https://github.com/zainabasif/portfolio',
    featured: false,
    category: 'Web',
  },
];

const categories = ['All', 'Mobile', 'Web', 'Automation'];

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const ExternalIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

export default function Projects() {
  const ref = useRef(null);
  const [visible, setVisible]         = useState(false);
  const [projects, setProjects]       = useState(FALLBACK_PROJECTS);
  const [activeFilter, setFilter]     = useState('All');
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    axios.get('/api/projects')
      .then(res => setProjects(res.data))
      .catch(() => {}) // Silent fallback — uses FALLBACK_PROJECTS
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section className="section" id="projects" ref={ref}>
      <div className="container">
        <h2 className="section-title">
          <span className="section-number">03.</span>
          Projects
        </h2>

        {/* Filter buttons */}
        <div className="project-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="projects-loading">
            <div className="loading-spinner" />
          </div>
        ) : (
          <div className={`projects-grid ${visible ? 'visible' : ''}`}>
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  return (
    <div
      className={`project-card ${project.featured ? 'featured' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Project image */}
      <div className="project-image-wrapper">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="project-image"
            loading="lazy"
          />
        ) : (
          <div className="project-image-placeholder">
            <span className="placeholder-folder">📁</span>
            <p>Add screenshot</p>
            <small>project.image = "/images/projects/your-image.png"</small>
          </div>
        )}
        <div className="project-image-overlay">
          <div className="project-links-overlay">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub">
                <GitHubIcon />
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" aria-label="Live Demo">
                <ExternalIcon />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="project-body">
        <div className="project-top-row">
          <span className="project-category">{project.category}</span>
          {project.featured && <span className="project-featured-badge">Featured</span>}
        </div>

        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>

        <div className="project-tech">
          {project.tech.map(t => <span key={t}>{t}</span>)}
        </div>

        <div className="project-actions">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
              <GitHubIcon /> Code
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-filled btn-sm">
              <ExternalIcon /> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
