import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

export const submitUser = async (payload) => api.post('/users', payload);
export const getUsers = async () => api.get('/users');
