import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { MenuIcon } from '../components/icons';

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/work', label: 'Work' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' }
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const linkStyle = ({ isActive }) => ({ fontSize: 14, cursor: 'pointer', color: isActive ? 'var(--color-accent)' : 'var(--color-text)' });

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50, display: 'flex', alignItems: 'center', gap: 32,
        padding: scrolled ? '10px 24px' : '18px 24px',
        background: scrolled ? 'color-mix(in srgb, var(--color-bg) 96%, transparent)' : 'var(--color-bg)',
        borderBottom: '2px solid var(--color-divider)', backdropFilter: 'blur(6px)', transition: 'padding .18s ease'
      }}>
        <span
          onClick={() => navigate('/')}
          style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 18, letterSpacing: '-0.01em', cursor: 'pointer', marginRight: 'auto' }}
        >
          Zainab Asif
        </span>
        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {LINKS.map(l => <NavLink key={l.to} to={l.to} end={l.end} style={linkStyle}>{l.label}</NavLink>)}
        </div>
        <a href="/resume.html" target="_blank" rel="noreferrer" className="btn btn-primary hide-mobile">Resume ↗</a>
        <button type="button" className="btn btn-icon show-mobile" onClick={() => setOpen(v => !v)} aria-label="Menu" style={{ border: '1px solid var(--color-divider)' }}>
          <MenuIcon />
        </button>
      </nav>

      {open && (
        <div style={{ position: 'fixed', inset: 0, top: 57, zIndex: 49, background: 'var(--color-bg)', display: 'flex', flexDirection: 'column', padding: 24 }}>
          {LINKS.map(l => (
            <NavLink
              key={l.to} to={l.to} end={l.end} onClick={() => setOpen(false)}
              style={{ fontSize: 20, fontFamily: 'var(--font-heading)', fontWeight: 800, padding: '16px 0', borderBottom: '2px solid var(--color-divider)', cursor: 'pointer', color: 'var(--color-text)' }}
            >
              {l.label}
            </NavLink>
          ))}
          <a href="/resume.html" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ marginTop: 24, justifyContent: 'center' }}>
            Resume ↗
          </a>
        </div>
      )}
    </>
  );
}
