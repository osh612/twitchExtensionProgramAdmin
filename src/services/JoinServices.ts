import { AxiosError, AxiosResponse } from 'axios';
import { t } from 'i18next';
import { toastError, toastSuccess } from '../components/Toastify/ToasitifyContainer';
import { IGame } from '../recoil/game/gameAtom';
import { axiosGet, axiosPatch, axiosPost, axiosPostNoLogin, IStatus } from './axios/axios';

export interface IJoinRequestParam {
  uid: string;
  password: string;
  email: string;
  accountsType: number;
  game: IGame[];
  broadcast: IBroadcastData;
}

export interface IBroadcastData {
  broadcasterId: string;
  // broadcasterLanguage: string,
  broadcasterLogin: string;
  broadcasterDisplayName: string;
  broadcasterProfileImageUrl: string;
}

export interface IJoinPermitParam {
  idx: number;
  uid: string;
  permit: 1 | 2; // 1: 승인, 2: 거절
  rejectCause: string;
}

interface IJoinHistorySuccess extends IStatus {
  joinHistory: {
    idx: number;
    accountsId: string;
    broadcastId: string;
    email: string;
    accountsType: number;
    permit: number;
    rejectCause: string;
    regdate: string;
  }[];
}

class JoinServices {
  // 회원가입
  joinRequest(data: IJoinRequestParam): Promise<IStatus> {
    return new Promise((resolve, reject) => {
      axiosPostNoLogin({
        url: '/admin/join',
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
  // 회원가입 허용 & 거부
  joinPermit(data: IJoinPermitParam): Promise<IStatus> {
    return new Promise((resolve, reject) => {
      axiosPatch({
        url: '/admin/join/permit',
        data,
      })
        .then((res: AxiosResponse) => {
          toastSuccess(`${t('axios.join.success.joinPermit')}`);
          resolve(res.data);
        })
        .catch((err: AxiosError) => {
          toastError(`${t('axios.join.fail.joinPermit')}`);
          reject(err);
        });
    });
  }

  // 회원가입 히스토리
  joinHistory(): Promise<IJoinHistorySuccess> {
    return new Promise((resolve, reject) => {
      axiosGet({
        url: '/admin/join/history',
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

export default new JoinServices();
