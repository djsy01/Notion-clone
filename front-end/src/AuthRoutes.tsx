// src/AuthRoutes.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Register';

interface AuthRoutesProps {
  onLogin: () => void;
}

const AuthRoutes: React.FC<AuthRoutesProps> = ({ onLogin }) => (
  <Routes>
    <Route path="/login" element={<Login onLogin={onLogin} />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

export default AuthRoutes;
