import i18next from 'i18next';
import { IBank } from '../../../../services/QuizBankServices';

export interface IQuizBankData {
  no: number;
  status: string;
  quizName: string;
  level: number;
  game: string;
  answer?: number;
  edit: string;
  delete: string;
}

const newQuizBankData = (data: IBank): IQuizBankData => {
  return {
    no: data.idx,
    status: i18next.t(`monitor.body.gameStateList.${data.matchState}`),
    quizName: data.name,
    level: data.idx,
    game: i18next.t(`gameList.${data.gameName}`),
    answer: data.quizTypeIdx,
    edit: 'O',
    delete: 'O',
  };
};

export default function makeQuizBankData(quizBankList: IBank[]) {
  const makeDataLevel = (depth = 0) => {
    return quizBankList.map((data) => {
      return {
        ...newQuizBankData(data),
      };
    });
  };

  return makeDataLevel();
}
