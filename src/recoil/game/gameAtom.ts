import { atom } from 'recoil';

export interface IGame {
  idx: number;
  key: string;
  league: Ileague[];
}

export interface Ileague {
  idx: number;
  key: string;
}

const gameAtom = {
  gameList: atom<IGame[]>({
    key: 'gameList',
    default: [],
  }),
};

export default gameAtom;
