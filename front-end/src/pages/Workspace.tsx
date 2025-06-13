// src/pages/Workspace.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Workspace.css'; // workspace 관련 CSS 불러오기

interface Workspace {
  id: number;
  name: string;
}

export default function Workspace() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // 워크스페이스 목록 불러오기
  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/workspaces', {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('워크스페이스 응답:', res.data);

        // 응답 구조가 { workspaces: [...] }일 경우를 고려
        if (Array.isArray(res.data)) {
          setWorkspaces(res.data);
        } else if (Array.isArray(res.data.workspaces)) {
          setWorkspaces(res.data.workspaces);
        } else {
          setWorkspaces([]); // fallback
        }
      } catch (err) {
        console.error('워크스페이스 불러오기 실패:', err);
        setWorkspaces([]);
      }
    };

    fetchWorkspaces();
  }, []);

  // 워크스페이스 삭제
  const deleteWorkspace = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/workspaces/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // 목록에서 제거
      setWorkspaces(prev => prev.filter(ws => ws.id !== id));
      if (selectedId === id) setSelectedId(null);
    } catch (err) {
      console.error('삭제 실패:', err);
    }
  };

  return (
    <div>
      <h1>내 워크스페이스</h1>

      <div className="workspace-list">
        {workspaces.length === 0 && <p>워크스페이스가 없습니다.</p>}
        {workspaces.map(ws => (
          <div
            key={ws.id}
            className={`workspace-item ${selectedId === ws.id ? 'active' : ''}`}
            onClick={() => setSelectedId(ws.id)}
          >
            <span>{ws.name}</span>
            <button
              className="workspace-delete-btn"
              onClick={(e) => {
                e.stopPropagation(); // 클릭 이벤트 버블링 방지
                deleteWorkspace(ws.id);
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="workspace-add-btn-group">
        <button
          className="workspace-add-btn"
          onClick={() => alert('워크스페이스 추가 기능은 아직 구현되지 않았습니다.')}
        >
          워크스페이스 추가
        </button>
      </div>
    </div>
  );
}
