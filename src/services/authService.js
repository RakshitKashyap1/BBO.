import apiClient from '../api/apiClient';

export const login = async (credentials) => {
  const response = await apiClient.post('/auth/login/', credentials);
  if (response.data.access) {
    localStorage.setItem('token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refresh_token');
};

export const register = async (userData) => {
  const response = await apiClient.post('/auth/register/', userData);
  return response.data;
};
