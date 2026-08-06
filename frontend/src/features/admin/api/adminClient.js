import axios from 'axios';

const adminClient = axios.create({ baseURL: '/api/admin' });

adminClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('haircare_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default adminClient;
