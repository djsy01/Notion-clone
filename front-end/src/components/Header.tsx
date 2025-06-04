// src/components/Header.tsx
import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">Notion</div>
        <div className="workspace-name">My Workspace</div>
      </div>

      <div className="header-center">
        <input
          type="search"
          className="search-input"
          placeholder="검색하거나 명령어 입력..."
        />
      </div>

      <div className="header-right">
        <button className="icon-button" aria-label="알림">
          🔔
        </button>
        <button className="icon-button" aria-label="설정">
          ⚙️
        </button>
        <div className="profile-avatar" title="사용자 프로필">
          U
        </div>
      </div>
    </header>
  );
};

export default Header;
