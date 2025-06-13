import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { signup } from '../api/auth';
import './Register.css'; // 스타일 파일 추가

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const handleSignup = async (username: string, email: string, nickname: string, password: string) => {
    try {
      await signup(username, email, nickname, password);
      alert('회원가입 성공! 로그인 페이지로 이동합니다.');
      navigate('/login');
    } catch (error) {
      alert('회원가입 실패: ' + (error instanceof Error ? error.message : '알 수 없는 오류'));
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <h2 className="signup-title">회원가입</h2>
        <AuthForm isSignup onSubmit={handleSignup} />
        <div className="signup-footer">
          <span>이미 계정이 있으신가요?</span>
          <Link to="/login" className="signup-link">로그인</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
