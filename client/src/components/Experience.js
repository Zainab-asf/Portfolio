import React, { useEffect, useRef, useState } from 'react';
import './Experience.css';

const experiences = [
  {
    id: 1,
    type: 'education',
    title: 'BS Computer Science',
    company: 'COMSATS University, Lahore',
    period: '2022 — 2026',
    gpa: '3.73 / 4.0',
    description: 'Specializing in Software Engineering and Mobile Application Development. Active member of the Software Engineering Society.',
    highlights: [
      'Final Year Project: AI-Powered Child Safety Mobile App',
      'Relevant courses: Mobile Computing, Software Engineering, AI/ML',
      'Consistent Dean\'s List student',
    ],
    current: true,
  },
  {
    id: 2,
    type: 'project',
    title: 'Final Year Project Lead',
    company: 'COMSATS University',
    period: 'Sep 2025 — Present',
    description: 'Designing and building an AI-powered child safety application for Android. Leading a team of 3 developers.',
    highlights: [
      'Architecture: Blazor/.NET MAUI + Azure Cognitive Services',
      'Real-time content classification using ML models',
      'Parental dashboard with usage analytics',
    ],
    current: true,
  },
  {
    id: 3,
    type: 'freelance',
    title: 'Freelance Developer',
    company: 'Self-Employed',
    period: '2024 — Present',
    description: 'Building mobile apps and automation solutions for small businesses. Delivered Flutter apps and n8n workflow automations.',
    highlights: [
      'Built Gear Up Garage management app (Flutter + Firebase)',
      'Designed n8n automation workflows saving clients hours weekly',
      'Maintained 5-star client satisfaction across all projects',
    ],
    current: true,
  },
];

const typeColors = {
  education: '#64ffda',
  project:   '#c792ea',
  freelance: '#ffb347',
};

const typeLabels = {
  education: 'Education',
  project:   'Project',
  freelance: 'Freelance',
};

export default function Experience() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" id="experience" ref={ref}>
      <div className="container">
        <h2 className="section-title">
          <span className="section-number">04.</span>
          Experience
        </h2>

        <div className={`timeline ${visible ? 'visible' : ''}`}>
          <div className="timeline-line" aria-hidden="true" />

          {experiences.map((exp, i) => (
            <div
              key={exp.id}
              className={`timeline-item ${activeId === exp.id ? 'expanded' : ''}`}
              style={{ animationDelay: `${i * 0.15}s` }}
              onClick={() => setActiveId(activeId === exp.id ? null : exp.id)}
            >
              {/* Dot */}
              <div
                className="timeline-dot"
                style={{ '--dot-color': typeColors[exp.type] }}
                aria-hidden="true"
              >
                {exp.current && <div className="timeline-dot-pulse" />}
              </div>

              {/* Card */}
              <div className="timeline-card">
                <div className="timeline-card-header">
                  <div>
                    <span
                      className="timeline-type-badge"
                      style={{ color: typeColors[exp.type], borderColor: `${typeColors[exp.type]}40` }}
                    >
                      {typeLabels[exp.type]}
                    </span>
                    <h3 className="timeline-title">{exp.title}</h3>
                    <p className="timeline-company">
                      {exp.company}
                      {exp.gpa && <span className="timeline-gpa"> · GPA {exp.gpa}</span>}
                    </p>
                  </div>
                  <div className="timeline-right">
                    <span className="timeline-period">{exp.period}</span>
                    {exp.current && <span className="timeline-current">Current</span>}
                    <span className="timeline-expand-icon" aria-hidden="true">
                      {activeId === exp.id ? '−' : '+'}
                    </span>
                  </div>
                </div>

                <p className="timeline-desc">{exp.description}</p>

                <div className="timeline-highlights">
                  <ul>
                    {exp.highlights.map((h, j) => (
                      <li key={j}>
                        <span className="teal">▸</span> {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
