import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, { username, password });
  return response.data;
};

export const signup = async (username: string, email: string, nickname: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, { username, email, nickname, password });
  return response.data;
};

export const getProfile = async (token?: string) => {
  if (!token) token = localStorage.getItem('token') || '';
  const response = await axios.get(`${BASE_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
