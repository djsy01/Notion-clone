// src/App.tsx
import React, { useState, useEffect } from 'react';
import Router from './Router'; // 로그인 이후 라우터
import AuthRoutes from './AuthRoutes'; // 로그인, 회원가입 라우트만 분리
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <Router onLogout={() => {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }} />
      ) : (
        <AuthRoutes onLogin={() => setIsAuthenticated(true)} />
      )}
    </BrowserRouter>
  );
}

export default App;
