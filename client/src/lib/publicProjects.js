import axios from 'axios';
import { FALLBACK_PROJECTS } from '../data/content';

// Wraps the public /api/projects endpoints with a guarantee: callers always
// get back the shape they expect, even if the API is unreachable or — as
// happens on a frontend-only static deploy with no backend attached —
// returns the SPA's own index.html instead of JSON. Without this guard a
// bad response (a string, not an array) crashes the whole React tree.

export async function fetchProjects(params) {
  try {
    const res = await axios.get('/api/projects', { params });
    if (!Array.isArray(res.data)) throw new Error('Unexpected response shape');
    return res.data;
  } catch {
    let list = FALLBACK_PROJECTS;
    if (params?.category) list = list.filter(p => p.category === params.category);
    if (params?.featured) list = list.filter(p => p.featured);
    return list;
  }
}

export async function fetchProjectBySlug(slug) {
  try {
    const res = await axios.get(`/api/projects/slug/${slug}`);
    if (!res.data || typeof res.data !== 'object' || Array.isArray(res.data)) throw new Error('Unexpected response shape');
    return res.data;
  } catch {
    const fallback = FALLBACK_PROJECTS.find(p => p.slug === slug);
    if (fallback) return fallback;
    throw new Error('Project not found');
  }
}
