import React, { useEffect, useRef, useState } from 'react';
import './Skills.css';

const skillGroups = [
  {
    category: 'Mobile Development',
    icon: '📱',
    color: '#a78bfa',
    skills: ['Flutter', 'Dart', 'Blazor', '.NET MAUI', 'C#', 'Android'],
  },
  {
    category: 'Web Development',
    icon: '🌐',
    color: '#67e8f9',
    skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Node.js', 'Express'],
  },
  {
    category: 'Databases & Backend',
    icon: '🗄️',
    color: '#fbbf24',
    skills: ['Firebase', 'MongoDB', 'SQL Server', 'MySQL', 'REST APIs'],
  },
  {
    category: 'Tools & Platforms',
    icon: '🛠️',
    color: '#34d399',
    skills: ['Git', 'GitHub', 'n8n', 'VS Code', 'Figma', 'Postman'],
  },
  {
    category: 'Languages',
    icon: '💻',
    color: '#f472b6',
    skills: ['C#', 'Dart', 'JavaScript', 'Java', 'Python', 'C++'],
  },
  {
    category: 'Soft Skills',
    icon: '🤝',
    color: '#fb923c',
    skills: ['Problem Solving', 'Team Collaboration', 'Communication', 'Fast Learner', 'Detail-Oriented'],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" id="skills" ref={ref}>
      <div className="container">
        <h2 className="section-title">
          <span className="section-number">02.</span>Skills &amp; Technologies
        </h2>

        <div className={`skills-grid ${visible ? 'visible' : ''}`}>
          {skillGroups.map((group, i) => (
            <div
              className="skill-card"
              key={group.category}
              style={{ animationDelay: `${i * 0.08}s`, '--accent': group.color }}
            >
              <div className="sc-header">
                <span className="sc-icon" role="img" aria-label={group.category}>
                  {group.icon}
                </span>
                <h3>{group.category}</h3>
              </div>
              <div className="sc-tags">
                {group.skills.map(s => (
                  <span className="sc-tag" key={s}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
