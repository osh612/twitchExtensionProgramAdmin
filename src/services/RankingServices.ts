import { AxiosError, AxiosResponse } from 'axios';
import { axiosGet, axiosPost, IStatus } from './axios/axios';

interface IRaningDataParam {
  page: number;
  size: number;
}

interface IRankingDataSuccess extends IStatus {
  totalElements: number;
  totalPages: number;
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    paged: boolean;
    unpaged: boolean;
    offset: number;
  };
  first: boolean;
  last: boolean;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  numberOfElements: number;
  size: number;
  content: IRaningContent[];
  empty: boolean;
}

interface IRaningContent {
  idx: number;
  userId: string;
  kills: number;
  deaths: number;
  combokill: number;
  combokillTmp: number;
  multikill: number;
}

interface IElasticSearch {
  idx: number;
  name: string;
  game_name: string;
  match_state: number;
  times: number;
  itemcount: number;
}

class RankingServices {
  getRankingData(data: IRaningDataParam): Promise<IRankingDataSuccess> {
    return new Promise((resolve, reject) => {
      axiosGet({
        url: '/ranking/all',
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

export default new RankingServices();
