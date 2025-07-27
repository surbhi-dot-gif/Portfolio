import axios from 'axios';

const API_BASE = process.env.REACT_APP_BACKEND_URL + '/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Profile API
export const profileAPI = {
  get: async () => {
    const response = await apiClient.get('/profile');
    return response.data;
  },
  update: async (data) => {
    const response = await apiClient.put('/profile', data);
    return response.data;
  }
};

// Projects API
export const projectsAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await apiClient.get(`/projects${queryString ? `?${queryString}` : ''}`);
    return response.data;
  },
  getById: async (id) => {
    const response = await apiClient.get(`/projects/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await apiClient.post('/projects', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await apiClient.put(`/projects/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await apiClient.delete(`/projects/${id}`);
    return response.data;
  }
};

// Skills API
export const skillsAPI = {
  getAll: async () => {
    const response = await apiClient.get('/skills');
    return response.data;
  },
  create: async (data) => {
    const response = await apiClient.post('/skills', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await apiClient.put(`/skills/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await apiClient.delete(`/skills/${id}`);
    return response.data;
  }
};

// About API
export const aboutAPI = {
  get: async () => {
    const response = await apiClient.get('/about');
    return response.data;
  },
  update: async (data) => {
    const response = await apiClient.put('/about', data);
    return response.data;
  }
};

// Contact API
export const contactAPI = {
  submit: async (data) => {
    const response = await apiClient.post('/contact', data);
    return response.data;
  },
  getAll: async () => {
    const response = await apiClient.get('/contact');
    return response.data;
  },
  updateStatus: async (id, status) => {
    const response = await apiClient.put(`/contact/${id}`, { status });
    return response.data;
  }
};

// Settings API
export const settingsAPI = {
  get: async () => {
    const response = await apiClient.get('/settings');
    return response.data;
  },
  update: async (data) => {
    const response = await apiClient.put('/settings', data);
    return response.data;
  }
};

// Generic API helper for loading states
export const withLoading = async (apiCall, setLoading, setError = null) => {
  setLoading(true);
  if (setError) setError(null);
  
  try {
    const result = await apiCall();
    return result;
  } catch (error) {
    if (setError) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      setError(errorMessage);
    }
    throw error;
  } finally {
    setLoading(false);
  }
};

export default {
  profileAPI,
  projectsAPI,
  skillsAPI,
  aboutAPI,
  contactAPI,
  settingsAPI,
  withLoading,
};