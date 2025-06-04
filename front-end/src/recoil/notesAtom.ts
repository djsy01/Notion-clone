import { atom } from 'recoil';

export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export const notesState = atom<Note[]>({
  key: 'notesState',
  default: [],
});
