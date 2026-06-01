import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';

const roles = [
  'Flutter Developer.',
  'Blazor / .NET Developer.',
  'React Developer.',
  'Mobile App Builder.',
  'Problem Solver.',
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting]   = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [mounted, setMounted]     = useState(false);
  const btn1Ref = useRef(null);
  const btn2Ref = useRef(null);

  useEffect(() => { setTimeout(() => setMounted(true), 200); }, []);

  useEffect(() => {
    const current = roles[roleIndex];
    let t;
    if (!deleting && charIndex < current.length) {
      t = setTimeout(() => { setDisplayed(current.slice(0, charIndex + 1)); setCharIndex(c => c + 1); }, 75);
    } else if (!deleting && charIndex === current.length) {
      t = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && charIndex > 0) {
      t = setTimeout(() => { setDisplayed(current.slice(0, charIndex - 1)); setCharIndex(c => c - 1); }, 35);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setRoleIndex(i => (i + 1) % roles.length);
    }
    return () => clearTimeout(t);
  }, [charIndex, deleting, roleIndex]);

  const magnet = (e, ref) => {
    if (!ref.current || window.innerWidth < 768) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.22;
    const y = (e.clientY - r.top - r.height / 2) * 0.22;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };
  const resetMagnet = ref => { if (ref.current) ref.current.style.transform = ''; };

  const scrollTo = id => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="hero" id="hero">
      <div className="hero-blob b1" aria-hidden="true" />
      <div className="hero-blob b2" aria-hidden="true" />
      <div className="hero-blob b3" aria-hidden="true" />
      <div className="hero-grid"   aria-hidden="true" />

      <div className={`hero-content container ${mounted ? 'mounted' : ''}`}>

        <div className="avail-badge">
          <span className="avail-dot" />
          Available for opportunities · June 2026
        </div>

        <p className="hero-hi">Hi, I'm</p>

        <h1 className="hero-name">
          Zainab Asif<span className="hero-period">.</span>
        </h1>

        <h2 className="hero-role">
          I build{' '}
          <span className="hero-typed">
            {displayed}<span className="cursor" aria-hidden="true">|</span>
          </span>
        </h2>

        <p className="hero-desc">
          Final year CS student at{' '}
          <span className="teal">COMSATS University, Lahore</span>{' '}
          (GPA&nbsp;3.73) crafting cross-platform mobile apps and web experiences with{' '}
          <span className="violet">Flutter</span>,{' '}
          <span className="violet">Blazor/.NET&nbsp;MAUI</span>, and{' '}
          <span className="violet">React</span>.
        </p>

        <div className="hero-ctas">
          <button
            ref={btn1Ref}
            className="btn btn-primary"
            onClick={() => scrollTo('#projects')}
            onMouseMove={e => magnet(e, btn1Ref)}
            onMouseLeave={() => resetMagnet(btn1Ref)}
          >
            View My Work <ArrowIcon />
          </button>
          <a
            ref={btn2Ref}
            href="/resume.html"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
            onMouseMove={e => magnet(e, btn2Ref)}
            onMouseLeave={() => resetMagnet(btn2Ref)}
          >
            <DownloadIcon /> Resume
          </a>
        </div>

        <div className="hero-stats">
          <div className="hs-item"><span className="hs-val">3.73</span><span className="hs-key">CGPA</span></div>
          <div className="hs-div" />
          <div className="hs-item"><span className="hs-val">10+</span><span className="hs-key">Projects</span></div>
          <div className="hs-div" />
          <div className="hs-item"><span className="hs-val">5★</span><span className="hs-key">Freelance</span></div>
        </div>
      </div>

      <div className="hero-social">
        <a href="https://github.com/zainabasif" target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon /></a>
        <a href="https://linkedin.com/in/zainab-asif" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a>
        <div className="social-line" />
      </div>

      <div className="hero-email">
        <a href="mailto:zainab.asif.dev@gmail.com">zainab.asif.dev@gmail.com</a>
        <div className="social-line" />
      </div>

      <button className="scroll-cue" onClick={() => scrollTo('#about')} aria-label="Scroll down">
        <div className="scroll-mouse"><div className="scroll-wheel" /></div>
      </button>
    </section>
  );
}

const ArrowIcon    = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>);
const DownloadIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>);
const GithubIcon   = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>);
const LinkedinIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>);
