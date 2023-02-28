import { atom } from 'recoil';
import { ILeagueList } from '../../services/ScheduleServices';

interface ScheduleParams {
  leagueList: ILeagueList[];
  selectedStatusText: string;
}

const ScheduleAtom = {
  leagueList: atom<ILeagueList[]>({
    key: 'leagueList',
    default: [],
  }),
};

export const ScheduleResultAtom = atom<ScheduleParams>({
  key: 'GameResult',
  default: undefined,
});

export default ScheduleAtom;
