import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';

export default function SiteLayout() {
  const { pathname } = useLocation();

  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <div style={{ background: 'var(--color-bg)', color: 'var(--color-text)', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
