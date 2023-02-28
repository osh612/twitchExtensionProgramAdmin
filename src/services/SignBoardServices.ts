import { AxiosError, AxiosResponse } from 'axios';
import { axiosGet, IResponseSuccess, IStatus } from './axios/axios';
import { stompPublish } from './socket/webSocket';

export interface ISignboardListSuccess extends IStatus {
  signboardList: ISignboard[];
}

export interface ISignboard {
  idx: number;
  uid: string;
  login: string;
  sign: string;
  state: number;
  regDate: string;
}

export interface ISignboardStart {
  idx: number;
  sign: string;
}
export interface ISignboardReject {
  idx: number;
  userId: string;
  rejectCause: string;
}
export interface ISignboardShutdown {
  idx: number;
}
export interface ISignboardRestart {
  idx: number;
  sign: string;
}

class SignBoardServices {
  getSignboardList(matchId: string | undefined): Promise<ISignboardListSuccess> {
    return new Promise((resolve, reject) => {
      axiosGet({
        url: `/admin/signboard/${matchId}`,
      })
        .then((res: AxiosResponse) => resolve(res.data))
        .catch((err: AxiosError) => reject(err));
    });
  }

  startSignBoard=(data: ISignboardStart)=>{
    stompPublish('/extension/signboard/start', data);
  }
  rejectSignBoard=(data: ISignboardReject)=>{
    stompPublish('/extension/signboard/reject', data);
  }
  shutdownSignBoard=(data: ISignboardShutdown)=>{
    stompPublish('/extension/signboard/shutdown', data);
  }
  restartSignBoard=(data: ISignboardRestart)=>{
    stompPublish('/extension/signboard/restart', data);
  }
}

export default new SignBoardServices();
