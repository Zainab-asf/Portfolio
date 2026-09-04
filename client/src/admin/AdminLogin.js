import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function AdminLogin() {
  const { status, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (status === 'authed') {
    const dest = location.state?.from?.pathname || '/admin';
    return <Navigate to={dest} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.username.trim() || !form.password) {
      setError('Enter both a username and password.');
      return;
    }
    setLoading(true);
    try {
      await login(form);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-neutral-100)', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 380, background: 'var(--color-bg)', border: '2px solid var(--color-divider)', padding: '40px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 20 }}>Zainab Asif</div>
          <div className="section-kicker" style={{ marginBottom: 0 }}>Admin</div>
        </div>

        {error && (
          <div style={{ background: 'var(--color-accent-100)', color: 'var(--color-accent-800)', border: '1px solid var(--color-accent-300)', padding: '10px 14px', fontSize: 13, marginBottom: 18 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="field">
            <label htmlFor="username">Username</label>
            <input id="username" className="input" type="text" autoComplete="username" value={form.username}
              onChange={(e) => setForm(f => ({ ...f, username: e.target.value }))} disabled={loading} />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" className="input" type="password" autoComplete="current-password" value={form.password}
              onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))} disabled={loading} />
          </div>
          <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: 4 }} disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <a href="/" style={{ display: 'block', textAlign: 'center', marginTop: 20, fontSize: 13, color: 'color-mix(in srgb,var(--color-text) 55%,transparent)' }}>
          ← Back to portfolio
        </a>
      </div>
    </div>
  );
}
