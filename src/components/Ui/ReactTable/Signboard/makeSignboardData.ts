import i18next from 'i18next';
import { ISignboard } from '../../../../services/SignBoardServices';

// 빠른 수정을 위해 형식을 일치 시킴
const newSignboard = (data: ISignboard): ISignboard => {
  return data;
};

export default function makeSignboardData(dataList: ISignboard[]) {
  const makeDataLevel = (depth = 0) => {
    return dataList.map((data) => {
      return {
        ...newSignboard(data),
      };
    });
  };

  return makeDataLevel();
}
