import { atom } from 'recoil';

export interface UserState {
  username: string;
  token: string;
}

export const userState = atom<UserState | null>({
  key: 'userState',
  default: null,
});
