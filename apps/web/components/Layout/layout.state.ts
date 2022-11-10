import { atom } from 'recoil';

export const NavbarChildrenState = atom<JSX.Element[]>({
  key: 'NavbarChildrenState',
  default: [],
});
