import { AxiosError, AxiosResponse } from 'axios';
import { axiosGet, axiosGetNoLogin, axiosPatch, axiosPost, IStatus } from './axios/axios';

interface IGetGameListSuccess extends IStatus {
  game: {
    idx: number;
    key: string;
    league: {
      idx: number;
      key: string;
    }[];
  }[];
}

class GameServices {
  // 게임 & 리그 리스트
  getGameList(): Promise<IGetGameListSuccess> {
    return new Promise((resolve, reject) => {
      axiosGetNoLogin({
        url: '/admin/game/list',
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

export default new GameServices();
