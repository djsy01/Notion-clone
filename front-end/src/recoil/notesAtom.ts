import { atom } from 'recoil';
import { Note } from '../../../shared/types/note';

export const notesState = atom<Note[]>({
  key: 'notesState',
  default: [],
});
