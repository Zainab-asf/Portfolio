import React from 'react';

export const GithubIcon = (p) => (
  <svg width={p.size || 18} height={p.size || 18} viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

export const LinkedinIcon = (p) => (
  <svg width={p.size || 18} height={p.size || 18} viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export const MailIcon = (p) => (
  <svg width={p.size || 18} height={p.size || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

export const ArrowIcon = (p) => (
  <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
  </svg>
);

export const DownloadIcon = (p) => (
  <svg width={p.size || 15} height={p.size || 15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export const MenuIcon = (p) => (
  <svg width={p.size || 18} height={p.size || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}>
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

// Service-category glyphs (ported 1:1 from the reference)
export const ServiceIcons = {
  web: (p) => (<svg width={p.size || 26} height={p.size || 26} viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.6"><rect x="3" y="4" width="18" height="14" /><line x1="3" y1="9" x2="21" y2="9" /></svg>),
  mobile: (p) => (<svg width={p.size || 26} height={p.size || 26} viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.6"><rect x="7" y="2" width="10" height="20" /><line x1="10" y1="19" x2="14" y2="19" /></svg>),
  ai: (p) => (<svg width={p.size || 26} height={p.size || 26} viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.6"><circle cx="12" cy="12" r="3" /><line x1="12" y1="2" x2="12" y2="7" /><line x1="12" y1="17" x2="12" y2="22" /><line x1="2" y1="12" x2="7" y2="12" /><line x1="17" y1="12" x2="22" y2="12" /></svg>),
  auto: (p) => (<svg width={p.size || 26} height={p.size || 26} viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.6"><path d="M4 6h9l-2-2M20 12h-9l2 2M4 18h9l-2-2" /></svg>),
  saas: (p) => (<svg width={p.size || 26} height={p.size || 26} viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.6"><path d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17l9 5 9-5" /></svg>),
  api: (p) => (<svg width={p.size || 26} height={p.size || 26} viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.6"><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></svg>)
};
