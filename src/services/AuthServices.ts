import axios, { AxiosError, AxiosResponse } from 'axios';
import QueryString from 'qs';
import { toastError } from '../components/Toastify/ToasitifyContainer';
import { isLive, LiveAPI, TestAPI } from '../Pages/config';
import { IGameList } from '../recoil/Auth/userAtom';
import { ApiError, axiosGet, axiosPost, IAxiosResponse, IResponseSuccess, IStatus } from './axios/axios';

export interface IAdminLoginParam {
  uid: string;
  password: string;
}
export interface ITwitchLoginParam {
  broadcasterId: string;
  broadcasterLogin: string;
  broadcasterDisplayName: string;
  broadcasterProfileImageUrl: string;
}

export interface IManagerLoginParam {
  loginCode: string;
}
export interface IAdminLoginSuccess extends IStatus {
  accounts: {
    idx: number;
    token: string;
    uid: string;
    broadcastId: string;
    email: string;
    accountsType: number;
    securityLevel: number;
    game: IGameList[];
  };
}

export interface ITwitchLoginSuccess extends IStatus {
  accounts: {
    idx: number;
    token: string;
    uid: string;
    broadcastId: string;
    broadcastLogin: string,
    broadcastDisplayName: string,
    broadcastProfileImageUrl: string,
    accountsType: number;
    securityLevel: number;
    permit: number;
  };
}

export interface IManagerLoginSuccess extends IStatus {
  manager: {
    accounts: {
      idx: number;
      token: string;
      uid: string;
      broadcastId: string;
      email: string;
      accountsType: number;
      securityLevel: number;
      game: IGameList[];
    };
  };
  managerCode: {
    loginType: number;
    loginCode: string;
    use: number;
  };
}

const baseUrl = isLive ? LiveAPI : TestAPI;

const authAxios = axios.create({
  baseURL: `${baseUrl}`,
  method: 'POST',
  timeout: 5000,
});

const handleSuccess = (res: AxiosResponse<IAxiosResponse<undefined>>) => {
  // 호출 기본응답
  if (res.status > 299 || res.status < 200) {
    console.error('서버에 호출이 들어가지 않았습니다. url을 확인하세요');
  }

  // 서버에서 호출하는 응답
  if (Number(res.data.status.status_code) > 299 || Number(res.data.status.status_code) < 200) {
    const { message } = res.data.status;
    const error = new ApiError(res.data.status, message);
    return Promise.reject(error);
  }

  return res;
};

const handleError = (error: AxiosError) => {
  // 네트워크 에러 발생 시.
  if (error.message === 'Network Error') {
    toastError(error.message);
  }

  return Promise.reject(error);
};

// 응답 인터셉터
authAxios.interceptors.response.use(handleSuccess, handleError);

class AuthServices {
  getClientUserByToken = ({ id }: { id: string }) => {
    return new Promise((resolve, reject) => {
      axiosPost({
        url: '/user/login',
        data: { id },
      })
        .then((res: AxiosResponse) => {
          resolve(res);
        })
        .catch((err: AxiosError) => {
          reject(err);
        });
    });
  };

  // 관리자 로그인
  adminLogin(data: IAdminLoginParam): Promise<IAdminLoginSuccess> {
    return new Promise((resolve, reject) => {
      authAxios({
        url: '/admin/login',
        data,
      })
        .then((res: AxiosResponse) => {
          resolve(res.data);
        })
        .catch((err: AxiosError) => reject(err));
    });
  }

  // 매니저 로그인
  managerLogin(data: IManagerLoginParam): Promise<IManagerLoginSuccess> {
    return new Promise((resolve, reject) => {
      authAxios({
        url: '/admin/manager/login',
        data,
      })
        .then((res: AxiosResponse) => {
          resolve(res.data);
        })
        .catch((err: AxiosError) => reject(err));
    });
  }
  twitchLogin(data: ITwitchLoginParam): Promise<ITwitchLoginSuccess> {
    return new Promise((resolve, reject) => {
      authAxios({
        url: '/admin/twitch/login',
        data,
      })
        .then((res: AxiosResponse) => {
          resolve(res.data);
        })
        .catch((err: AxiosError) => reject(err));
    });
  }
}

export default new AuthServices();
