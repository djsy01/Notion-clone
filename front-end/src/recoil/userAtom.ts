import { atom } from 'recoil';
import { UserState } from '../../../shared/types/user';

export const userState = atom<UserState | null>({
  key: 'userState',
  default: null,
});
