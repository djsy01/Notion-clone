import { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { getMe } from '../api/user';
import './Layout.css';

interface LayoutProps {
  onLogout: () => void;
}

export default function Layout({ onLogout }: LayoutProps) {
  const [user, setUser] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe();
        console.log('✅ 사용자 정보:', res.data);
        setUser(res.data);
      } catch (err) {
        console.error('❌ 사용자 정보 불러오기 실패:', err);
        onLogout();
      }
    };

    fetchUser();
  }, [onLogout]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <h2 className="sidebar-title">메뉴</h2>
        <nav>
          <Link
            to="/workspace"
            className={location.pathname === '/workspace' ? 'active' : ''}
          >
            홈
          </Link>
          <Link
            to="/profile"
            className={location.pathname === '/profile' ? 'active' : ''}
          >
            내 정보
          </Link>
        </nav>
      </aside>

      <div className="main-content">
        <header className="header">
          <div>협업 플랫폼</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {user && <span>{user.nickname}님</span>}
            <button onClick={handleLogout} className="logout-btn">
              로그아웃
            </button>
          </div>
        </header>

        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
