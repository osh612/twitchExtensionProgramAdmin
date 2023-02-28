import { AxiosError, AxiosResponse } from 'axios';
import { axiosGet, axiosPost, IStatus } from './axios/axios';

export interface IIssueManagerCodeParam {
  accountIdx: number;
  loginType: number;
}

export interface IReadManagerCodeParam {
  accountIdx: number;
}

export interface IIssueManagerCodeSuccess extends IStatus {
  managerCode: IManagerCode;
}

export interface IReadManagerCodeSuccess extends IStatus {
  managerCodeList: IManagerCode[];
}

export interface IManagerCode {
  loginType: number;
  loginCode: string;
  use: number;
}

class ManagerServices {
  issueManagerCode(data: IIssueManagerCodeParam): Promise<IIssueManagerCodeSuccess> {
    return new Promise((resolve, reject) => {
      axiosPost({
        url: '/admin/manager/code/issue',
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

  readManagerCode({ accountIdx }: IReadManagerCodeParam): Promise<IReadManagerCodeSuccess> {
    return new Promise((resolve, reject) => {
      axiosGet({
        url: `/admin/manager/code/read/${accountIdx}`,
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

export default new ManagerServices();
