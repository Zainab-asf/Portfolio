import React, { useState, useEffect } from 'react';
import './Navbar.css';

const navLinks = [
  { name: 'About',      href: '#about',      num: '01.' },
  { name: 'Skills',     href: '#skills',     num: '02.' },
  { name: 'Projects',   href: '#projects',   num: '03.' },
  { name: 'Experience', href: '#experience', num: '04.' },
  { name: 'Contact',    href: '#contact',    num: '05.' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [hidden, setHidden]       = useState(false);
  const [lastY, setLastY]         = useState(0);
  const [progress, setProgress]   = useState(0);
  const [active, setActive]       = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const y   = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (y / max) * 100 : 0);
      setScrolled(y > 50);
      setHidden(y > lastY && y > 300);
      setLastY(y);

      for (let i = navLinks.length - 1; i >= 0; i--) {
        const id = navLinks[i].href.slice(1);
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 130) {
          setActive(navLinks[i].href);
          return;
        }
      }
      setActive('');
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastY]);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="scroll-bar" style={{ width: `${progress}%` }} aria-hidden="true" />

      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${hidden ? 'hidden' : ''}`}>
        <div className="nav-inner">
          <a href="#hero" className="nav-logo" onClick={e => handleNavClick(e, '#hero')}>
            <span className="logo-bracket">&lt;</span>ZA<span className="logo-bracket">/&gt;</span>
          </a>

          <ul className="nav-links">
            {navLinks.map(link => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={e => handleNavClick(e, link.href)}
                  className={active === link.href ? 'active' : ''}
                >
                  <span className="nav-num">{link.num}</span>
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <a href="/resume.html" target="_blank" rel="noreferrer" className="nav-resume-btn">
                Resume ↗
              </a>
            </li>
          </ul>

          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <ul>
          {navLinks.map((link, i) => (
            <li key={link.name} style={{ animationDelay: `${i * 0.07 + 0.1}s` }}>
              <a href={link.href} onClick={e => handleNavClick(e, link.href)}>
                <span className="mob-num">{link.num}</span>
                {link.name}
              </a>
            </li>
          ))}
          <li style={{ animationDelay: '0.45s' }}>
            <a href="/resume.html" target="_blank" rel="noreferrer" className="mob-resume-btn">
              Resume ↗
            </a>
          </li>
        </ul>
      </div>

      {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)} />}
    </>
  );
}
