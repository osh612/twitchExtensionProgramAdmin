import { IGame, Ileague } from '../../../recoil/game/gameAtom';

interface IList {
  [idx: number]: string;
}

/* 
회원등급  1: Supervisor 2: manager
방송유형  1: E-sport 2: streamer
계정상태  0: 활성 1: 밴
*/

export const gradeList: IList = {
  1: 'Supervisor',
  2: 'Manager',
};

export const broadcastTypeList: IList = {
  1: 'E-Sport',
  2: 'Streamer',
};

export const stateList: IList = {
  0: 'Active',
  1: 'Ban',
};

export const getAccountGrade = (idx: number) => {
  if (typeof idx !== 'number') return '';
  if (Object.keys(gradeList).includes(idx.toString())) {
    return gradeList[idx];
  }
  return '';
};

export const getBroadcastType = (idx: number) => {
  if (typeof idx !== 'number') return '';
  if (Object.keys(broadcastTypeList).includes(idx.toString())) {
    return broadcastTypeList[idx];
  }
  return '';
};

export const getAccountState = (idx: number) => {
  if (typeof idx !== 'number') return '';
  if (Object.keys(stateList).includes(idx.toString())) {
    return stateList[idx];
  }
  return '';
};

export const getAccountGradeKey = (value: string) => {
  if (typeof value !== 'string') return NaN;
  let result = 0;
  Object.keys(gradeList).map((key) => {
    if (gradeList[+key] === value) {
      result = +key;
    }
    return NaN;
  });
  return result;
};

export const getBroadcastTypeeKey = (value: string) => {
  if (typeof value !== 'string') return NaN;
  let result = 0;
  Object.keys(broadcastTypeList).map((key) => {
    if (broadcastTypeList[+key] === value) {
      result = +key;
    }
    return NaN;
  });
  return result;
};

export const getAccountStateKey = (value: string) => {
  if (typeof value !== 'string') return NaN;
  let result = 0;
  Object.keys(stateList).map((key) => {
    if (stateList[+key] === value) {
      result = +key;
    }
    return NaN;
  });
  return result;
};

export const getSelectedGameList = (dataset: IGame[]) => {
  const selectedGamelist: string[] = [];
  dataset.map((data) => selectedGamelist.push(data.key));

  return selectedGamelist;
};

export const getSelectedLeagueList = (dataset: IGame[]) => {
  const selectedLeaguelist: string[] = [];
  dataset.map((game) => game.league.map((league) => selectedLeaguelist.push(`${game.key}/${league.key}`)));

  return selectedLeaguelist;
};
