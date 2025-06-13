import { useState, useRef, useEffect } from 'react'
import ProfileModal from './ProfileModal'
import './ProfileMenu.css'

interface ProfileMenuProps {
  user: any
}

export default function ProfileMenu({ user }: ProfileMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const menuRef = useRef(null)

  const handleLogout = () => {
    localStorage.removeItem('token')
    location.href = '/login'
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !(menuRef.current as any).contains(e.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="profile-menu" ref={menuRef}>
      <button className="profile-button" onClick={() => setMenuOpen(!menuOpen)}>
        👤
      </button>

      {menuOpen && (
        <div className="dropdown">
          <div className="dropdown-item" onClick={() => setModalOpen(true)}>
            내 정보
          </div>
          <div className="dropdown-item" onClick={handleLogout}>
            로그아웃
          </div>
        </div>
      )}

      {/* ✅ user가 준비된 경우에만 모달 표시 */}
      {modalOpen && user && (
        <ProfileModal user={user} onClose={() => setModalOpen(false)} />
      )}
    </div>
  )
}
