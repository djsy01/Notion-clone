// src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/auth';
import './Login.css';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    try {
      const data = await login(username, password);
      if (data.token) {
        localStorage.setItem('token', data.token);
        alert('로그인 성공!');
        onLogin();               // 로그인 상태 알려주기
        navigate('/workspace');  // 워크스페이스 페이지로 이동
      } else {
        setError('로그인 실패: 토큰이 없습니다.');
      }
    } catch (error) {
      setError('로그인 실패: ' + (error instanceof Error ? error.message : '알 수 없는 오류'));
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>로그인</h2>
        <div className="input-group">
          <label htmlFor="username">아이디</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="login-button">로그인</button>

        <div className="login-footer">
          <Link to="/forgot-username" className="footer-link">아이디를 잃어버렸나요?</Link>
          <Link to="/forgot-password" className="footer-link">비밀번호를 잃어버렸나요?</Link>
        </div>
        <div className="login-register">
          <Link to="/signup" className="register-link signup-link">회원가입</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
