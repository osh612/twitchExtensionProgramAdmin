import { AxiosError, AxiosResponse } from 'axios';
import { axiosGet, axiosPost, IResponseSuccess } from './axios/axios';

export interface VersionResponse {
  version: Version;
}

export interface StatusResponse {
  [key: string]: string;
}

interface Version {
  idx: number;
  version: number;
  regdate: string;
}

class ServerService {
  getVersion(): Promise<IResponseSuccess<VersionResponse>> {
    return new Promise((resolve, reject) => {
      axiosGet({
        url: '/admin/version',
      })
        .then((res: AxiosResponse) => resolve(res.data))
        .catch((err: AxiosError) => reject(err));
    });
  }

  getStatus(): Promise<IResponseSuccess<StatusResponse>> {
    return new Promise((resolve, reject) => {
      axiosGet({
        url: '/admin/status',
      })
        .then((res: AxiosResponse) => resolve(res.data))
        .catch((err: AxiosError) => reject(err));
    });
  }

  getInit(): Promise<IResponseSuccess<StatusResponse>> {
    return new Promise((resolve, reject) => {
      axiosGet({
        url: '/admin/init',
      })
        .then((res: AxiosResponse) => resolve(res.data))
        .catch((err: AxiosError) => reject(err));
    });
  }
}

export default new ServerService();
