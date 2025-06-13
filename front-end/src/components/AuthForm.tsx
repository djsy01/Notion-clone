import React, { useState } from 'react';
import './AuthForm.css';

interface AuthFormProps {
  isSignup?: boolean;
  onSubmit: (username: string, email: string, nickname: string, password: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ isSignup = false, onSubmit }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    if (isSignup) {
      if (!email.trim() || !nickname.trim()) {
        setError('이메일과 닉네임을 입력해주세요.');
        return;
      }
      if (password !== passwordConfirm) {
        setError('비밀번호가 일치하지 않습니다.');
        return;
      }
      onSubmit(username.trim(), email.trim(), nickname.trim(), password);
    } else {
      // 로그인 시 email, nickname은 빈 문자열로 넘김
      onSubmit(username.trim(), '', '', password);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="username">아이디</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          autoComplete="username"
        />
      </div>

      {isSignup && (
        <>
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="nickname">닉네임</label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={e => setNickname(e.target.value)}
              required
            />
          </div>
        </>
      )}

      <div className="form-group">
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          autoComplete={isSignup ? "new-password" : "current-password"}
        />
      </div>

      {isSignup && (
        <div className="form-group">
          <label htmlFor="passwordConfirm">비밀번호 확인</label>
          <input
            id="passwordConfirm"
            type="password"
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      <button type="submit" className="submit-button">
        {isSignup ? '회원가입' : '로그인'}
      </button>
    </form>
  );
};

export default AuthForm;
