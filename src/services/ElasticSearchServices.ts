import { AxiosError, AxiosResponse } from 'axios';
import { axiosPost, IStatus } from './axios/axios';

interface ISearchSearchQuizBankReadSuccess extends IStatus {
  search: IElasticSearch[];
}

interface IElasticSearch {
  idx: number;
  name: string;
  game_name: string;
  match_state: number;
  times: number;
  itemcount: number;
}

class ElasticSearchServices {
  elasticSearchQuizBank(data: { name: string }): Promise<ISearchSearchQuizBankReadSuccess> {
    return new Promise((resolve, reject) => {
      axiosPost({
        url: '/admin/search/quiz_bank',
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

export default new ElasticSearchServices();
