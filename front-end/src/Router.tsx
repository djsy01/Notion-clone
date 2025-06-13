import { Routes, Route, Navigate } from 'react-router-dom';
import Workspace from './pages/Workspace';
import Profile from './pages/Profile';
import Layout from './components/Layout';

interface RouterProps {
  onLogout: () => void;
}

const Router = ({ onLogout }: RouterProps) => {
  return (
    <Routes>
      <Route element={<Layout onLogout={onLogout} />}>
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/workspace" replace />} />
      </Route>
    </Routes>
  );
};

export default Router;
