import axios from 'axios';

const BASE_URL = 'http://localhost:4000'; // 백엔드 주소에 맞게 변경

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, { username, password });
  return response.data;
};

export const signup = async (username: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, { username, password });
  return response.data;
};
