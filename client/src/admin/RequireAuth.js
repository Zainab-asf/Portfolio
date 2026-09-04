import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function RequireAuth({ children }) {
  const { status } = useAuth();
  const location = useLocation();

  if (status === 'checking') {
    return <div className="admin-boot">Checking session…</div>;
  }
  if (status === 'guest') {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  return children;
}
