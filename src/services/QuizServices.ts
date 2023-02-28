import { AxiosError, AxiosResponse } from 'axios';
import { t } from 'i18next';
import internal from 'stream';
import { toastError, toastLoading, toastSuccess } from '../components/Toastify/ToasitifyContainer';
import { axiosDelete, axiosGet, axiosPatch, axiosPost, axiosPut, IStatus } from './axios/axios';

export interface IAddQuizItemParam {
  quizIdx: number;
  name: string;
}

export interface IAddQuizTypeParam {
  selectnum: number;
  name: string;
}

export interface IAddQuizGroupParam {
  name: string;
  gameName: string;
  quizStateIdx: number;
  accountIdx: number;
  matchIdx: number;
  setnum: number;
}

export interface IAddQuizParam {
  quizGroupIdx: number;
  name: string;
  matchState: number;
  quizTypeIdx: number;
  times: number;
  orders: number;
  state: number;
}

export interface IUpdateQuizParam {
  idx: number;
  name: string;
  tooltip: string;
  matchState: number;
  quizTypeIdx: number;
  times: number;
  orders: number;
  state: number;
  pick: number;
  item: IUpdateQuizItem[];
  type: number;
  fixKill: number;
}
export interface IOrderQuizParam {
  quizGroupIdx: number;
  orderList: number[];
}
export interface IUpdateQuizItemParam {
  idx: number;
  name: string;
  tooltip: string;
  confirm: number;
}
export interface IDeleteQuizTypeParam {
  idx: number;
  fd: boolean;
}

export interface IGetQuizMessageHistoryParam {
  quizGroupIdx: number;
}

interface IUpdateQuizItem {
  name: string;
  idx: number;
  kills: number;
  counts: number;
  width: number;
}
export interface IAddQuizReadParam {
  quizGroupIdx: number;
  item: boolean;
}

interface IAddQuizItemRead {
  quizIdx: number;
}

export interface IAddQuizGroupRead {
  gameName: string;
  quizStateIdx: number;
  matchIdx: number;
}

export interface IAddQuizCommonSuccess extends IStatus {
  returnData: IAddQuizReturnData;
}

export interface ICreateQuizGroupSuccess extends IStatus {
  returnData: {
    quizGroupidx: number;
    quizStateIdx: number;
  };
}

export interface IOrderQuizSuccess extends IStatus {
  returnData: {
    quizList: number[];
  };
}

export interface IDeleteQuizSuccess extends IStatus {
  returnData: {
    deleteCount: number;
  };
}

export interface IAddQuizReadSuccess extends IStatus {
  count: number;
  quizList: IQuizInfo[];
}

export interface IAddQuizItemReadSuccess extends IStatus {
  count: number;
  quizItemList: IQuizItem[];
}

export interface IAddQuizGroupReadSuccess extends IStatus {
  count: number;
  quizGroupList: IQuizGroup[];
}

export interface IGetQuizTypeReadSuccess extends IStatus {
  count: number;
  quizTypeList: IQuizType[];
}

export interface IGetQuizMessageHistorySuccess extends IStatus {
  count: number;
  quizMessageHistoryList: IQuizMessageHistoryList[];
}

export interface IQuizMessageHistoryList {
  message: string;
  regDate: string;
}

interface IQuizType {
  idx: number;
  name: string;
  del: number;
  selectnum: number;
}

export interface IQuizInfo {
  idx: number;
  item: IQuizItem[];
  matchState: number;
  name: string;
  tooltip: string;
  orders: number;
  pick: number;
  quizTypeIdx: number;
  state: number;
  times: number;
  startDate: string;
  type: number;
  fixKill: number;
  allCorrect: number;
}

export interface IQuizItem {
  confirm: number;
  idx: number;
  name: string;
  counts: number;
  kills: number;
  width: number;
}

export interface IQuizGroup {
  idx: number;
  name: string;
  gameName: string;
  matchIdx: number;
  setnum: number;
  state: number;
  del: number;
  regdate: string;
}

export interface IAddQuizReturnData {
  item: Array<object>;
  idx: number;
}

class QuizServices {
  createQuizItem(data: IAddQuizItemParam): Promise<IAddQuizCommonSuccess> {
    return new Promise((resolve, reject) => {
      axiosPut({
        url: `/admin/quiz`,
        data,
      })
        .then((res: AxiosResponse) => {
          toastSuccess(`${t('axios.quiz.success.createQuizItem')}`);
          resolve(res.data);
        })
        .catch((err: AxiosError) => {
          toastError(`${t('axios.quiz.fail.createQuizItem')}`);
          reject(err);
        });
    });
  }

  createQuizType(data: IAddQuizTypeParam): Promise<IAddQuizCommonSuccess> {
    return new Promise((resolve, reject) => {
      axiosPut({
        url: `/admin/quiz/type/create`,
        data,
      })
        .then((res: AxiosResponse) => {
          toastSuccess(`${t('axios.quiz.success.createQuizType')}`);
          resolve(res.data);
        })
        .catch((err: AxiosError) => {
          toastError(`${t('axios.quiz.fail.createQuizType')}`);
          reject(err);
        });
    });
  }

  createQuizGroup(data: IAddQuizGroupParam): Promise<ICreateQuizGroupSuccess> {
    return new Promise((resolve, reject) => {
      axiosPut({
        url: `/admin/quiz/group/create`,
        data,
      })
        .then((res: AxiosResponse) => {
          toastSuccess(`${t('axios.quiz.success.createQuizGroup')}`);
          resolve(res.data);
        })
        .catch((err: AxiosError) => {
          toastError(`${t('axios.quiz.fail.createQuizGroup')}`);
          reject(err);
        });
    });
  }

  createQuiz(data: IAddQuizParam): Promise<IAddQuizCommonSuccess> {
    return new Promise((resolve, reject) => {
      axiosPut({
        url: `/admin/quiz/create`,
        data,
      })
        .then((res: AxiosResponse) => {
          toastSuccess(`${t('axios.quiz.success.createQuiz')}`);
          resolve(res.data);
        })
        .catch((err: AxiosError) => {
          toastError(`${t('axios.quiz.fail.createQuiz')}`);
          reject(err);
        });
    });
  }

  getQuizList(data: IAddQuizReadParam): Promise<IAddQuizReadSuccess> {
    return new Promise((resolve, reject) => {
      axiosPost({
        url: `/admin/quiz/read`,
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

  getQuizItemList(data: IAddQuizItemRead): Promise<IAddQuizItemReadSuccess> {
    return new Promise((resolve, reject) => {
      axiosPost({
        url: `/admin/quiz/item/read`,
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

  getQuizGroupList(data: IAddQuizGroupRead): Promise<IAddQuizGroupReadSuccess> {
    return new Promise((resolve, reject) => {
      axiosPost({
        url: `/admin/quiz/group/read`,
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

  updateQuiz(data: IUpdateQuizParam): Promise<IAddQuizCommonSuccess> {
    return new Promise((resolve, reject) => {
      axiosPatch({
        url: `/admin/quiz/update`,
        data,
      })
        .then((res: AxiosResponse) => {
          toastSuccess(`${t('axios.quiz.success.updateQuiz')}`);
          resolve(res.data);
        })
        .catch((err: AxiosError) => {
          toastError(`${t('axios.quiz.fail.updateQuiz')}`);
          reject(err);
        });
    });
  }

  orderQuiz(data: IOrderQuizParam): Promise<IOrderQuizSuccess> {
    return new Promise((resolve, reject) => {
      axiosPatch({
        url: `/admin/quiz/order`,
        data,
      })
        .then((res: AxiosResponse) => {
          toastSuccess(`${t('axios.quiz.success.orderQuiz')}`);
          resolve(res.data);
        })
        .catch((err: AxiosError) => {
          toastError(`${t('axios.quiz.fail.orderQuiz')}`);
          reject(err);
        });
    });
  }

  updateQuizItem(data: IUpdateQuizItemParam): Promise<IAddQuizCommonSuccess> {
    return new Promise((resolve, reject) => {
      axiosPatch({
        url: `/admin/quiz/item/update`,
        data,
      })
        .then((res: AxiosResponse) => {
          toastSuccess(`${t('axios.quiz.success.updateQuizItem')}`);
          resolve(res.data);
        })
        .catch((err: AxiosError) => {
          toastError(`${t('axios.quiz.fail.updateQuizItem')}`);
          reject(err);
        });
    });
  }

  getQuizTypeList(): Promise<IGetQuizTypeReadSuccess> {
    return new Promise((resolve, reject) => {
      axiosGet({
        url: `/admin/quiz/type/read`,
      })
        .then((res: AxiosResponse) => {
          resolve(res.data);
        })
        .catch((err: AxiosError) => {
          reject(err);
        });
    });
  }
  getQuizMessageHistory({
    quizGroupIdx,
  }: IGetQuizMessageHistoryParam): Promise<IGetQuizMessageHistorySuccess> {
    return new Promise((resolve, reject) => {
      axiosGet({
        url: `/admin/quiz/message/history/${quizGroupIdx}`,
      })
        .then((res: AxiosResponse) => {
          resolve(res.data);
        })
        .catch((err: AxiosError) => {
          reject(err);
        });
    });
  }

  deleteQuizType(data: IDeleteQuizTypeParam): Promise<IDeleteQuizSuccess> {
    return new Promise((resolve, reject) => {
      axiosDelete({
        url: `/admin/quiz/type/delete`,
        data,
      })
        .then((res: AxiosResponse) => {
          toastSuccess(`${t('axios.quiz.success.deleteQuizType')}`);
          resolve(res.data);
        })
        .catch((err: AxiosError) => {
          toastError(`${t('axios.quiz.fail.deleteQuizType')}`);
          reject(err);
        });
    });
  }

  deleteQuiz(data: { idx: number }): Promise<IDeleteQuizSuccess> {
    return new Promise((resolve, reject) => {
      axiosDelete({
        url: `/admin/quiz/delete`,
        data,
      })
        .then((res: AxiosResponse) => {
          toastSuccess(`${t('axios.quiz.success.deleteQuiz')}`);
          resolve(res.data);
        })
        .catch((err: AxiosError) => {
          toastError(`${t('axios.quiz.fail.deleteQuiz')}`);
          reject(err);
        });
    });
  }
}

export default new QuizServices();
