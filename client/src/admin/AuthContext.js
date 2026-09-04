import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import api, { getToken, setToken, clearToken } from '../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [status, setStatus] = useState('checking'); // 'checking' | 'authed' | 'guest'
  const [username, setUsername] = useState(null);

  const verify = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setStatus('guest');
      return;
    }
    try {
      const res = await api.get('/api/auth/me');
      setUsername(res.data.username);
      setStatus('authed');
    } catch {
      clearToken();
      setStatus('guest');
    }
  }, []);

  useEffect(() => { verify(); }, [verify]);

  const login = async (creds) => {
    const res = await api.post('/api/auth/login', creds);
    setToken(res.data.token);
    await verify();
  };

  const logout = () => {
    clearToken();
    setUsername(null);
    setStatus('guest');
  };

  return (
    <AuthContext.Provider value={{ status, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
