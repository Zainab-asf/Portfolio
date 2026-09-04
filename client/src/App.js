import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';

import SiteLayout from './layout/SiteLayout';
import Home from './pages/Home';
import Work from './pages/Work';
import ProjectDetailPage from './pages/ProjectDetailPage';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';

import { AuthProvider } from './admin/AuthContext';
import RequireAuth from './admin/RequireAuth';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminProjectsList from './admin/AdminProjectsList';
import AdminProjectForm from './admin/AdminProjectForm';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<ProjectDetailPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjectsList />} />
          <Route path="projects/new" element={<AdminProjectForm />} />
          <Route path="projects/:id/edit" element={<AdminProjectForm />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
