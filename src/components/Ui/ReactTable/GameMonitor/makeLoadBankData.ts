import i18next from 'i18next';
import { IBank } from '../../../../services/QuizBankServices';

export interface IQuizLoadData {
  no: number;
  status: string;
  quizName: string;
  level: number;
  game: string;
  answer?: number;
  quizLoad: string;
  // broadcastID: string;
}

const newPerson = (data: IBank): IQuizLoadData => {
  return {
    no: data.idx,
    status: i18next.t(`monitor.body.gameStateList.${data.matchState}`),
    quizName: data.name,
    level: data.matchState,
    game: i18next.t(`gameList.${data.gameName}`),
    answer: data.quizTypeIdx,
    quizLoad: 'O',
    // broadcastID: data.broadcastID ?? '',
  };
};

export default function makeLoadBankData(dataList: IBank[]) {
  const makeDataLevel = (depth = 0) => {
    return dataList.map((data) => {
      return {
        ...newPerson(data),
        // subRows: dataList[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
