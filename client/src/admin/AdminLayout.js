import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const NAV = [
  { to: '/admin', label: 'Dashboard', end: true, icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="8" height="8" /><rect x="13" y="3" width="8" height="8" /><rect x="3" y="13" width="8" height="8" /><rect x="13" y="13" width="8" height="8" /></svg>
    ) },
  { to: '/admin/projects', label: 'Projects', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="16" /><line x1="3" y1="9" x2="21" y2="9" /></svg>
    ) },
  { to: '/admin/projects/new', label: 'Add Project', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
    ) }
];

const TITLES = { '/admin': 'Dashboard', '/admin/projects': 'Projects', '/admin/projects/new': 'Add Project' };

export default function AdminLayout() {
  const { username, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const headerTitle = TITLES[location.pathname] || (location.pathname.endsWith('/edit') ? 'Edit Project' : 'Admin');

  const linkStyle = ({ isActive }) => ({
    display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', fontSize: 14, cursor: 'pointer',
    color: isActive ? 'var(--color-bg)' : 'rgba(255,255,255,0.75)',
    background: isActive ? 'var(--color-accent)' : 'transparent'
  });

  return (
    <div style={{ background: 'var(--color-neutral-100)', minHeight: '100vh', fontFamily: 'var(--font-body)', color: 'var(--color-text)', display: 'flex' }}>

      {sidebarOpen && (
        <div className="adm-hide-mobile" onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'color-mix(in srgb,var(--color-neutral-900) 50%,transparent)', zIndex: 55 }} />
      )}

      <aside className={`adm-sidebar ${sidebarOpen ? 'adm-open' : ''}`} style={{
        width: 240, flex: 'none', background: '#171514', color: 'var(--color-neutral-100)',
        minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '24px 0'
      }}>
        <div style={{ padding: '0 24px 24px', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 17, color: '#fff' }}>Zainab Asif</span>
          <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>Admin CMS</div>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '16px 12px', flex: 1 }}>
          {NAV.map(item => (
            <NavLink key={item.to} to={item.to} end={item.end} style={linkStyle} onClick={() => setSidebarOpen(false)}>
              {item.icon}{item.label}
            </NavLink>
          ))}
        </nav>
        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
          <a href="/" target="_blank" rel="noreferrer" style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 10 }}>
            View Public Site ↗
          </a>
          <button type="button" className="btn btn-ghost" style={{ color: 'rgba(255,255,255,0.75)', paddingLeft: 0 }} onClick={() => { logout(); navigate('/admin/login'); }}>
            Log Out
          </button>
        </div>
      </aside>

      <div style={{ flex: 1, minWidth: 0 }}>
        <header style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 28px', background: 'var(--color-bg)', borderBottom: '2px solid var(--color-divider)', position: 'sticky', top: 0, zIndex: 40 }}>
          <button type="button" className="btn btn-icon adm-show-mobile" style={{ border: '1px solid var(--color-divider)' }} onClick={() => setSidebarOpen(true)} aria-label="Menu">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
          <h4 style={{ margin: 0, fontSize: 16 }}>{headerTitle}</h4>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--color-accent)', color: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
              {(username || 'A')[0].toUpperCase()}
            </span>
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  );
}
