import React, { useEffect, useRef, useState } from 'react';
import './About.css';

const stack = [
  'Flutter', 'Dart', 'Blazor', '.NET MAUI', 'C#',
  'React', 'JavaScript', 'Firebase', 'MongoDB', 'n8n', 'Azure AI',
];

export default function About() {
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
    <section className="section" id="about" ref={ref}>
      <div className="container">
        <h2 className="section-title">
          <span className="section-number">01.</span>About Me
        </h2>

        <div className={`bento ${visible ? 'visible' : ''}`}>

          {/* ── Bio ──────────────────────────────────────────── */}
          <div className="b-card b-bio">
            <p>
              Hi! I'm <strong>Zainab</strong> — a final-year{' '}
              <span className="teal">Computer Science</span> student at COMSATS University,
              Lahore (Class of 2026). I specialize in building beautiful, functional
              cross-platform applications that solve real problems.
            </p>
            <p>
              My primary stack is <span className="violet">Flutter</span> and{' '}
              <span className="violet">Blazor/.NET MAUI</span> for mobile, and{' '}
              <span className="violet">React</span> for the web. My final year project
              explores AI-powered child safety — building smart, protective technology using
              Azure Cognitive Services.
            </p>
            <p>
              I believe the best software is software people don't have to think about.
              An obsessive debugger who doesn't stop until it works <em>beautifully</em>.
            </p>
          </div>

          {/* ── GPA ──────────────────────────────────────────── */}
          <div className="b-card b-stat b-gpa">
            <span className="b-emoji">🎓</span>
            <div className="b-num grad-text">3.73</div>
            <div className="b-lbl">CGPA · Dean's List</div>
          </div>

          {/* ── Projects ─────────────────────────────────────── */}
          <div className="b-card b-stat b-proj">
            <span className="b-emoji">🚀</span>
            <div className="b-num grad-text">10+</div>
            <div className="b-lbl">Projects Built</div>
          </div>

          {/* ── Available ────────────────────────────────────── */}
          <div className="b-card b-avail">
            <div className="avail-ring-wrap">
              <span className="a-dot" />
              <span className="a-ring" />
            </div>
            <div className="a-title">Open to Work</div>
            <div className="a-sub">Available June 2026</div>
          </div>

          {/* ── Stack ────────────────────────────────────────── */}
          <div className="b-card b-stack">
            <div className="b-stack-title">Primary Stack</div>
            <div className="b-pills">
              {stack.map(t => <span key={t} className="b-pill">{t}</span>)}
            </div>
          </div>

          {/* ── Freelance ────────────────────────────────────── */}
          <div className="b-card b-freelance">
            <div className="b-stars">★★★★★</div>
            <div className="b-fl-title">Freelance</div>
            <div className="b-fl-sub">5-star client satisfaction across all delivered projects</div>
          </div>

        </div>
      </div>
    </section>
  );
}
