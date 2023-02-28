import { AxiosError, AxiosResponse } from 'axios';
import { t } from 'i18next';
import { toastError, toastSuccess } from '../components/Toastify/ToasitifyContainer';
import { IGame } from '../recoil/game/gameAtom';
import {
  axiosDelete,
  axiosGet,
  axiosPatch,
  axiosPost,
  axiosPut,
  IResponseSuccess,
  IStatus,
} from './axios/axios';

export interface IManagementUpdateParam extends IManagementCommonParam {
  idx: number;
  password: string;
  securityLevel: number;
  accountsType: number;
  game: IGame[];
}

export interface IManagementCreateParam {
  uid: string;
  password: string;
  securityLevel: number;
  game: IGame[];
}

export interface IManagementCommonParam {
  idx: number;
  uid: string;
}

export interface IManagementReadSuccess extends IStatus {
  count: number;
  managementList: IAccount[];
}

export interface IManagementDetailReadSuccess extends IStatus {
  count: number;
  managementDetail: IAccountDetail;
}

export interface IManagementPermitReadSuccess extends IStatus {
  count: number;
  managementPermitList: IAccountPermit[];
}

export interface IManagementUpdateSuccess extends IStatus {
  update: IUpdate;
}

export interface IManagementDeleteSuccess extends IStatus {
  delete: {
    deleteDataCount: number;
  };
}

export interface IManagementCreateSuccess extends IStatus {
  returnData: {
    idx: number;
    id: string;
    game: string;
    securityLevel: number;
  };
}

export interface IUpdate {
  idx: number;
  id: string;
  game: string;
  securityLevel: number;
}

export interface IAccount {
  idx: number;
  uid: string;
  broadcastId: string;
  password: string;
  email: string;
  accountsType: number;
  securityLevel: number;
  state: number;
}

export interface IAccountDetail extends IAccount {
  channel: string;
  game: IGame[];
}

export interface IAccountPermit extends IAccount {
  regdate: string;
}

class ManagementServices {
  getManagementList(): Promise<IManagementReadSuccess> {
    return new Promise((resolve, reject) => {
      axiosGet({
        url: '/admin/management/read',
      })
        .then((res: AxiosResponse) => {
          resolve(res.data);
        })
        .catch((err: AxiosError) => {
          reject(err);
        });
    });
  }

  getManagementPermitList(): Promise<IManagementPermitReadSuccess> {
    return new Promise((resolve, reject) => {
      axiosGet({
        url: '/admin/management/permit/read',
      })
        .then((res: AxiosResponse) => {
          resolve(res.data);
        })
        .catch((err: AxiosError) => {
          reject(err);
        });
    });
  }

  getManagementDetail({ uid }: { uid: string }): Promise<IManagementDetailReadSuccess> {
    return new Promise((resolve, reject) => {
      axiosGet({
        url: `/admin/management/detail/${uid}`,
      })
        .then((res: AxiosResponse) => {
          resolve(res.data);
        })
        .catch((err: AxiosError) => {
          reject(err);
        });
    });
  }

  createManagement(data: IManagementCreateParam): Promise<IManagementCreateSuccess> {
    return new Promise((resolve, reject) => {
      axiosPut({
        url: '/admin/management/create',
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

  updateManagement(data: IManagementUpdateParam): Promise<IManagementUpdateSuccess> {
    return new Promise((resolve, reject) => {
      axiosPatch({
        url: '/admin/management/update',
        data,
      })
        .then((res: AxiosResponse) => {
          toastSuccess(`${t('axios.management.success.updateManagement')}`);
          resolve(res.data);
        })
        .catch((err: AxiosError) => {
          toastError(`${t('axios.management.fail.updateManagement')}`);
          reject(err);
        });
    });
  }

  deleteManagement(data: IManagementCommonParam): Promise<IManagementDeleteSuccess> {
    return new Promise((resolve, reject) => {
      axiosDelete({
        url: '/admin/management/delete',
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
}

export default new ManagementServices();
