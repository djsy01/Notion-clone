import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { getMe } from '../api/user'
import Sidebar from './Sidebar'
import ProfileMenu from './ProfileMenu'
import './Layout.css'

export default function Layout() {
  const [user, setUser] = useState<any>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const isWorkspaceRoute = location.pathname.startsWith('/workspace')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getMe()
        console.log('✅ 사용자 정보:', user)
        setUser(user)
      } catch (err) {
        console.error('❌ 사용자 정보 불러오기 실패:', err)
        localStorage.removeItem('token')
        navigate('/login')
      }
    }
    fetchUser()
  }, [])

  return (
    <div className="layout-container">
      <header className="header">
        <div className="logo">📘 협업 플랫폼</div>
        <ProfileMenu user={user} />
      </header>

      <div className="layout-body">
        {isWorkspaceRoute && <Sidebar />}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
