import React from 'react';
import { GithubIcon, LinkedinIcon, MailIcon } from '../components/icons';

export default function Footer() {
  return (
    <footer style={{ borderTop: '2px solid var(--color-divider)', padding: '40px clamp(20px,5vw,64px)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 15 }}>Zainab Asif</span>
        <div style={{ display: 'flex', gap: 16 }}>
          <a href="https://github.com/Zainab-asf" target="_blank" rel="noreferrer" aria-label="GitHub" style={{ color: 'var(--color-text)' }}><GithubIcon /></a>
          <a href="https://linkedin.com/in/zainab-asif" target="_blank" rel="noreferrer" aria-label="LinkedIn" style={{ color: 'var(--color-text)' }}><LinkedinIcon /></a>
          <a href="mailto:zainab.asif.dev@gmail.com" aria-label="Email" style={{ color: 'var(--color-text)' }}><MailIcon /></a>
        </div>
        <span style={{ fontSize: 13, color: 'color-mix(in srgb,var(--color-text) 60%,transparent)' }}>© {new Date().getFullYear()} Zainab Asif</span>
      </div>
    </footer>
  );
}
