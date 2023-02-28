import { AxiosError, AxiosResponse } from 'axios';
import { t } from 'i18next';
import { resolve } from 'path/posix';
import { toastError, toastSuccess } from '../components/Toastify/ToasitifyContainer';
import { axiosGet, axiosPost, axiosPut, IAxiosResponse, IResponseSuccess, IStatus } from './axios/axios';

export interface IMatchReadParam {
  accountIdx: number;
  leagueIdx: number;
  startDate: string;
  endDate: string;
}

export interface IScheduleTeamReadParam {
  teamIdx: number;
  seasonIdx: number;
}

export interface ISchedulePlayerReadParam {
  teamIdx: number;
  playerIdx: number;
}

export interface ICreateSteamerScheduleParam {
  accountIdx: number;
}

export interface IGetSteamerScheduleParam {
  accountIdx: number;
  startDate: string;
  endDate: string;
}

export interface IMatchReadSuccess extends IStatus {
  count: number;
  match: IMatchGameSet;
}
export interface IMatchOneReadSuccess extends IStatus {
  count: number;
  match: IMatchGame;
}

export interface IScheduleTeamReadSuccess extends IStatus {
  count: number;
  teamList: IScheduleTeamInfo[];
}
export interface IScheduleSeasonReadSuccess extends IStatus {
  count: number;
  seasonList: IScheduleSeasonInfo[];
}
export interface ISchedulePlayerReadSuccess extends IStatus {
  count: number;
  playerList: ISchedulePlayerInfo[];
}

export interface IGetSteamerScheduleSuccess extends IStatus {
  count: number;
  streamerSchedule: IStreamerScheduleSet;
}

export interface IGetSteamerScheduleIndiSuccess extends IStatus {
  streamerScheduleIndi: IStreamerSchedule;
}

export interface IStreamerScheduleSet {
  [key: string]: IStreamerSchedule[];
}
export interface IStreamerSchedule {
  idx: number;
  state: number;
  regdate: string;
  groupDate: string;
}

export interface IScheduleSeasonInfo {
  idx: number;
  title: string;
  overviewpage: string;
  startDate: string;
  endDate: string;
}
export interface ISchedulePlayerInfo {
  idx: number;
  region: string;
  playerName: string;
  playerId: string;
}

export interface IScheduleTeamInfo {
  idx: number;
  teamName: string;
  teamFullname: string;
  teamFullname2: string;
  teamLogoUrl: string;
}

export interface IMatchGameSet {
  [key: string]: IMatchGame[];
}

export interface IMatchGame {
  idx: number;
  uniqueId: string;
  matchNo: number;
  matchDate: string;
  matchKrDate: string;
  matchKrDate2: string;
  matchName: string;
  team1Name: string;
  team1Fullname: string;
  team1Fullname2: string;
  team1LogoUrl: string;
  team1Score: number;
  team1TopIdx: string;
  team1JngIdx: string;
  team1MidIdx: string;
  team1AdcIdx: string;
  team1SupIdx: string;
  team2Name: string;
  team2Fullname: string;
  team2Fullname2: string;
  team2LogoUrl: string;
  team2Score: number;
  team2TopIdx: string;
  team2JngIdx: string;
  team2MidIdx: string;
  team2AdcIdx: string;
  team2SupIdx: string;
  winCount: number;
  patch: number;
  uid: string;
  quizState: number;
  vodHighlights: string;
  quizStateIdx: number;
}

export interface ILeagueReadSuccess extends IStatus {
  count: number;
  leagueList: ILeagueList[];
}

export interface ILeagueList {
  idx: number;
  region: string;
  title: string;
  subTitle: string;
  description: string;
  descriptionKr: string;
  logoUrl: string;
  logoUrlW: string;
}

class ScheduleServices {
  getTeamList(data: IScheduleTeamReadParam, game: string): Promise<IScheduleTeamReadSuccess> {
    return new Promise((resolve, reject) => {
      axiosPost({
        url: `/admin/schedule/${game}/team/read`,
        data,
      })
        .then((res: AxiosResponse) => {
          resolve(res.data);
        })
        .catch((err: AxiosError) => {
          reject(err);
        });
    });
  }

  getSeasonList(data: { leagueIdx: number }, game: string): Promise<IScheduleSeasonReadSuccess> {
    return new Promise((resolve, reject) => {
      axiosPost({
        url: `/admin/schedule/${game}/season/read`,
        data,
      })
        .then((res: AxiosResponse) => {
          resolve(res.data);
        })
        .catch((err: AxiosError) => {
          reject(err);
        });
    });
  }

  getPlayerList(data: ISchedulePlayerReadParam, game: string): Promise<ISchedulePlayerReadSuccess> {
    return new Promise((resolve, reject) => {
      axiosPost({
        url: `/admin/schedule/${game}/player/read`,
        data,
      })
        .then((res: AxiosResponse) => {
          resolve(res.data);
        })
        .catch((err: AxiosError) => {
          reject(err);
        });
    });
  }

  getMatchList(data: IMatchReadParam, game: string): Promise<IMatchReadSuccess> {
    return new Promise((resolve, reject) => {
      axiosPost({
        url: `/admin/schedule/${game}/match/read`,
        data,
      })
        .then((res: AxiosResponse) => {
          resolve(res.data);
        })
        .catch((err: AxiosError) => {
          reject(err);
        });
    });
  }

  getMatchListIndi(
    data: { accountIdx: number },
    game: string | undefined,
    match: string | undefined,
  ): Promise<IMatchOneReadSuccess> {
    return new Promise((resolve, reject) => {
      axiosPost({
        url: `/admin/schedule/${game}/match/${match}`,
        data,
      })
        .then((res: AxiosResponse) => {
          resolve(res.data);
        })
        .catch((err: AxiosError) => {
          reject(err);
        });
    });
  }
  getLeagueRead(game: string): Promise<ILeagueReadSuccess> {
    return new Promise((resolve, reject) => {
      axiosGet({
        url: `/admin/schedule/${game}/league/read`,
      })
        .then((res: AxiosResponse<ILeagueReadSuccess>) => {
          resolve(res.data);
        })
        .catch((err: AxiosError) => {
          reject(err);
        });
    });
  }

  createSteamerSchedule(data: ICreateSteamerScheduleParam): Promise<IStatus> {
    return new Promise((resolve, reject) => {
      axiosPut({
        url: `/admin/schedule/streamer/create`,
        data,
      })
        .then((res: AxiosResponse) => {
          toastSuccess(`${t('axios.schedule.success.createSteamerSchedule')}`);
          resolve(res.data);
        })
        .catch((err: AxiosError) => {
          toastError(`${t('axios.schedule.fail.createSteamerSchedule')}`);
          reject(err);
        });
    });
  }

  getSteamerSchedule(data: IGetSteamerScheduleParam): Promise<IGetSteamerScheduleSuccess> {
    return new Promise((resolve, reject) => {
      axiosPost({
        url: `/admin/schedule/streamer/read`,
        data,
      })
        .then((res: AxiosResponse<IGetSteamerScheduleSuccess>) => {
          resolve(res.data);
        })
        .catch((err: AxiosError) => {
          reject(err);
        });
    });
  }

  getSteamerScheduleIndi({
    quizStateIdx,
  }: {
    quizStateIdx: number;
  }): Promise<IGetSteamerScheduleIndiSuccess> {
    return new Promise((resolve, reject) => {
      axiosGet({
        url: `/admin/schedule/streamer/read/${quizStateIdx}`,
      })
        .then((res: AxiosResponse) => {
          resolve(res.data);
        })
        .catch((err: AxiosError) => {
          reject(err);
        });
    });
  }
}

export default new ScheduleServices();
