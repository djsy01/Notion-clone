// src/Router.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Workspace from './pages/Workspace';
import Profile from './pages/Profile';
import Layout from './components/Layout';

interface RouterProps {
  onLogout: () => void;
}

const Router: React.FC<RouterProps> = ({ onLogout }) => {
  return (
    <>
      <Layout onLogout={onLogout} />
      <Routes>
        <Route path="/workspace" element={<Workspace />} />
        <Route path='/profile' element={<Profile />} />
        {/* 여기에 인증 후 접근 가능한 페이지 추가 */}
        <Route path="*" element={<Navigate to="/workspace" replace />} />
      </Routes>
    </>
  );
};

export default Router;
