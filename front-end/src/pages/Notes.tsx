import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { notesState } from '../recoil/notesAtom';
import NoteCard from '../components/NoteCard';
import { fetchNotes } from '../api/notes'; // axios 호출 함수

const Notes: React.FC = () => {
  const [notes, setNotes] = useRecoilState(notesState);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const data = await fetchNotes();
        setNotes(data);
      } catch (error) {
        console.error('노트 불러오기 실패:', error);
      }
    };
    getNotes();
  }, [setNotes]);

  const handleNoteClick = (id: number) => {
    // TODO: 노트 상세 페이지로 이동 (React Router 사용 예정)
    console.log('노트 클릭:', id);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>내 노트 목록</h2>
      {notes.length === 0 ? (
        <p>작성된 노트가 없습니다.</p>
      ) : (
        notes.map(note => (
          <NoteCard key={note.id} note={note} onClick={handleNoteClick} />
        ))
      )}
    </div>
  );
};

export default Notes;
