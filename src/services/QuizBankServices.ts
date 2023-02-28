import { AxiosError, AxiosResponse } from 'axios';
import { t } from 'i18next';
import { toastError, toastSuccess } from '../components/Toastify/ToasitifyContainer';
import { axiosPost, axiosPut, IStatus } from './axios/axios';
import { IQuizItem } from './QuizServices';

export interface IBankXlsxDataParam {
  quiz_data: IBankQuizData[];
}

export interface IBankListDataParam {
  game: string;
}

export interface IBankQuizData {
  name?: string;
  gameName?: string;
  matchState?: number;
  quizTypeIdx?: number;
  times?: number;
  item?: string;
  item_1?: string;
  item_2?: string;
  item_3?: string;
  item_4?: string;
  item_5?: string;
  item_6?: string;
  item_7?: string;
  item_8?: string;
  item_9?: string;
}

interface IBankDataSuccess extends IStatus {
  bank: IBank[];
}
interface ILoadBankDataSuccess extends IStatus {
  bank: IBank;
}

export interface IBank {
  del: number;
  idx: number;
  gameName: string;
  item?: IQuizItem[];
  name: string;
  matchState: number;
  quizTypeIdx?: number;
  times: number;
  regdate: string;
}

interface IBankDataItemSuccess extends IStatus {
  item: IBankDataItem[];
}

interface IBankDataItem {
  idx: number;
  quizBankIdx: number;
  name: string;
  del: number;
  regdate: string;
}

class QuizBankServices {
  createBankXlsxData(data: IBankXlsxDataParam): Promise<IStatus> {
    return new Promise((resolve, reject) => {
      axiosPut({
        url: `/admin/quiz/bank/xlsx/upload`,
        data,
      })
        .then((res: AxiosResponse) => {
          toastSuccess(`${t('axios.quizBank.success.createBankXlsxData')}`);
          resolve(res.data);
        })
        .catch((err: AxiosError) => {
          toastError(`${t('axios.quizBank.fail.createBankXlsxData')}`);
          reject(err);
        });
    });
  }

  getBankListData(data: IBankListDataParam): Promise<IBankDataSuccess> {
    return new Promise((resolve, reject) => {
      axiosPost({
        url: `/admin/quiz/bank/read`,
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

  getBankItemData(data: { quizBankIdx: number }): Promise<IBankDataItemSuccess> {
    return new Promise((resolve, reject) => {
      axiosPost({
        url: `/admin/quiz/bank/item/read`,
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

  getBankData(data: { idx: number }): Promise<ILoadBankDataSuccess> {
    return new Promise((resolve, reject) => {
      axiosPost({
        url: `/admin/quiz/bank/read/${data.idx}`,
        data: { item: true },
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

export default new QuizBankServices();
