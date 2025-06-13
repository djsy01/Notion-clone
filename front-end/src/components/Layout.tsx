// src/components/Layout.tsx
import React, { useState, useRef, useEffect } from "react";
import Header from "./Header";
import "./Layout.css";

interface Page {
  id: string;
  title: string;
}

interface Workspace {
  id: string;
  name: string;
  type: "personal" | "team";
  pages: Page[];
}

interface LayoutProps {
  onLogout: () => void;
}

const initialWorkspaces: Workspace[] = [];

export default function Layout({ onLogout }: LayoutProps) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>(initialWorkspaces);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string>(
    initialWorkspaces[0]?.id || ""
  );
  const [selectedPageId, setSelectedPageId] = useState<string>(
    initialWorkspaces[0]?.pages[0]?.id || ""
  );
  const [menuVisibleId, setMenuVisibleId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const selectedWorkspace = workspaces.find((ws) => ws.id === selectedWorkspaceId);
  const selectedPage = selectedWorkspace?.pages.find((page) => page.id === selectedPageId);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuVisibleId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addPage = () => {
    if (!selectedWorkspace) return;
    const newPage: Page = {
      id: Date.now().toString(),
      title: "새 페이지",
    };
    const updatedWorkspaces = workspaces.map((ws) =>
      ws.id === selectedWorkspace.id ? { ...ws, pages: [...ws.pages, newPage] } : ws
    );
    setWorkspaces(updatedWorkspaces);
    setSelectedPageId(newPage.id);
  };

  const addWorkspace = (name: string, type: "personal" | "team") => {
    const newWorkspace: Workspace = {
      id: Date.now().toString(),
      name,
      type,
      pages: [{ id: Date.now().toString() + "-1", title: "새 페이지" }],
    };
    setWorkspaces((prev) => [...prev, newWorkspace]);
    setSelectedWorkspaceId(newWorkspace.id);
    setSelectedPageId(newWorkspace.pages[0].id);
  };

  const deleteWorkspace = (id: string) => {
    const filtered = workspaces.filter((ws) => ws.id !== id);
    setWorkspaces(filtered);

    if (filtered.length > 0) {
      setSelectedWorkspaceId(filtered[0].id);
      setSelectedPageId(filtered[0].pages[0]?.id || "");
    } else {
      setSelectedWorkspaceId("");
      setSelectedPageId("");
    }
  };

  const renameWorkspace = (id: string, newName: string) => {
    const updated = workspaces.map((ws) =>
      ws.id === id ? { ...ws, name: newName } : ws
    );
    setWorkspaces(updated);
  };

  return (
    <div className="layout">
      <Header />
      <div style={{ textAlign: "right", padding: "10px" }}>
        <button onClick={onLogout} style={{ cursor: "pointer" }}>
          로그아웃
        </button>
      </div>

      <div className="layout-content">
        <aside className="sidebar">
          <div className="workspace-list">
            {workspaces.length === 0 && (
              <div className="empty-message" style={{ padding: "10px", color: "#666" }}>
                워크스페이스가 없습니다. 아래 버튼으로 추가하세요.
              </div>
            )}
            {workspaces.map((ws) => (
              <div
                key={ws.id}
                className={`workspace-item ${
                  ws.id === selectedWorkspaceId ? "active" : ""
                }`}
                onClick={() => {
                  setSelectedWorkspaceId(ws.id);
                  setSelectedPageId(ws.pages[0]?.id || "");
                }}
              >
                <span>{ws.name}</span>
                <div
                  className="workspace-menu-toggle"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuVisibleId(menuVisibleId === ws.id ? null : ws.id);
                  }}
                  aria-label="워크스페이스 메뉴 열기"
                  style={{ cursor: "pointer", padding: "0 8px" }}
                >
                  ⋯
                </div>

                {menuVisibleId === ws.id && (
                  <div className="workspace-dropdown" ref={menuRef}>
                    <div
                      className="dropdown-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        const newName = prompt("워크스페이스 이름 수정", ws.name);
                        if (newName && newName.trim() !== "") {
                          renameWorkspace(ws.id, newName.trim());
                        }
                        setMenuVisibleId(null);
                      }}
                    >
                      이름 변경
                    </div>
                    <div
                      className="dropdown-item delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (
                          window.confirm(`${ws.name} 워크스페이스를 삭제할까요?`)
                        ) {
                          deleteWorkspace(ws.id);
                        }
                        setMenuVisibleId(null);
                      }}
                    >
                      삭제
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="workspace-add-btn-group" style={{ marginTop: "auto" }}>
            <button
              className="workspace-add-btn"
              onClick={() => addWorkspace("새 개인 워크스페이스", "personal")}
              style={{ marginBottom: 8 }}
            >
              + 개인 워크스페이스 추가
            </button>
            <button
              className="workspace-add-btn"
              onClick={() => addWorkspace("새 팀 워크스페이스", "team")}
            >
              + 팀 워크스페이스 추가
            </button>
          </div>

          <div className="page-list">
            {selectedWorkspace?.pages.map((page) => (
              <div
                key={page.id}
                className={`page-item ${page.id === selectedPageId ? "active" : ""}`}
                onClick={() => setSelectedPageId(page.id)}
              >
                {page.title}
              </div>
            ))}
            {selectedWorkspace && (
              <button className="add-page-btn" onClick={addPage}>
                + 새 페이지
              </button>
            )}
          </div>
        </aside>

        <main className="main-content">
          <h1>{selectedPage?.title || "선택된 페이지가 없습니다"}</h1>
        </main>
      </div>
    </div>
  );
}
