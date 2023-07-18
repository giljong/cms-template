import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export interface pageOptionTypes {
  take: number;
  skip: number;
  total: number;
  current: number;
}

export const pageOptionState = atom<pageOptionTypes>({
  key: 'pageOptionState',
  default: {
    take: 10,
    skip: 0,
    total: 0,
    current: 1,
  },
  effects_UNSTABLE: [persistAtom],
});
