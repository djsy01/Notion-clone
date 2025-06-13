// src/components/Sidebar.tsx
import { Link, useLocation } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar() {
  const location = useLocation()

  const pages = [
    { id: '1', name: '첫 번째 페이지' },
    { id: '2', name: '두 번째 페이지' },
  ]

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">워크스페이스</h2>
      
      <nav className="sidebar-nav">
        {pages.map((page) => (
          <Link
            key={page.id}
            to={`/workspace/default/page/${page.id}`}
            className={location.pathname.includes(page.id) ? 'active' : ''}
          >
            {page.name}
          </Link>
        ))}
      </nav>

      <button className="add-page-btn">+ 새 페이지</button>
    </aside>
  )
}
