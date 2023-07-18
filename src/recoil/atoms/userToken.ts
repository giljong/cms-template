import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export interface userTokenTypes {
  accessToken: string | null;
}

export const userTokenState = atom<userTokenTypes>({
  key: 'userTokenState',
  default: {
    accessToken: null,
  },
  effects_UNSTABLE: [persistAtom],
});
