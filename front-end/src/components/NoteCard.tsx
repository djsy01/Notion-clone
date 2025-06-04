import React from 'react';
import type { Note } from '../recoil/notesAtom';

interface NoteCardProps {
  note: Note;
  onClick: (id: number) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onClick }) => {
  return (
    <div 
      style={{
        border: '1px solid #ccc',
        padding: '12px',
        marginBottom: '8px',
        borderRadius: '6px',
        cursor: 'pointer',
      }}
      onClick={() => onClick(note.id)}
    >
      <h3>{note.title}</h3>
      <p>{note.content.slice(0, 100)}...</p>
      <small>{new Date(note.createdAt).toLocaleDateString()}</small>
    </div>
  );
};

export default NoteCard;
