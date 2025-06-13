import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import AuthRoutes from './AuthRoutes';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <Router onLogout={handleLogout} />
      ) : (
        <AuthRoutes onLogin={handleLogin} />
      )}
    </BrowserRouter>
  );
}

export default App;
