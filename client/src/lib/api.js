import axios from 'axios';

const TOKEN_KEY = 'portfolio_admin_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

const api = axios.create();

// Attach the admin token to every request if we have one.
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// A 401 anywhere means the session is gone — clear it and bounce to login.
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401 && getToken()) {
      clearToken();
      if (!window.location.pathname.startsWith('/admin/login')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(err);
  }
);

export default api;
