import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

export const getMe = async (token?: string) => {
  if (!token) token = localStorage.getItem('token') || '';
  const res = await axios.get(`${BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
