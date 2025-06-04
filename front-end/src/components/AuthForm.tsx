import React, { useState } from 'react';
import './AuthForm.css'; // 스타일 파일 import

interface AuthFormProps {
  isSignup?: boolean;
  onSubmit: (username: string, password: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ isSignup = false, onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('아이디와 비밀번호를 입력해주세요.');
      return;
    }
    if (isSignup && password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    onSubmit(username, password);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>아이디</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {isSignup && (
        <div className="form-group">
          <label>비밀번호 확인</label>
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
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
