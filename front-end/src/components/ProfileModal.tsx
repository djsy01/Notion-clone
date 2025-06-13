import './ProfileModal.css'

interface Props {
  user: any
  onClose: () => void
}

export default function ProfileModal({ user, onClose }: Props) {
  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <h3>내 정보</h3>
        <p>아이디: {user?.username}</p>
        <p>이름: {user?.nickname}</p>
        <p>이메일: {user?.email}</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  )
}
