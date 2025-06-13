import axios from 'axios';

const BASE_URL = 'http://localhost:4000'; // 백엔드 주소에 맞게 변경

// 프로필 로그인 API
export const login = async (username: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, { username, password });
  return response.data;
};

// 프로필 회원가입 API
export const signup = async (username: string, email: string, nickname: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, { username, email, nickname, password });
  return response.data;
};

// 프로필 조회 API
export const getProfile = async (token?: string) => {
  if (!token) {
    token = localStorage.getItem('token') || '';
    if (!token) throw new Error('No token found');
  }

  const response = await axios.get(`${BASE_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};