import i18next from 'i18next';
import { IQuizMessageHistoryList } from '../../../../../../services/QuizServices';
// import { IBank } from '../../../../services/QuizBankServices';

export interface IQuizNoticeData {
  no: number;
  time: string;
  message: string;
  // state: number;
  resend: boolean;
}

const newQuizNoticeData = (data: IQuizMessageHistoryList, idx: number): IQuizNoticeData => {
  const time = data.regDate;
  return {
    no: idx + 1,
    time, // data.time,
    message: data.message,
    // state: 0, // data.state,
    resend: true, // data.resend,
  };
};

export default function makeQuizNoticeData(quizNoticeData: IQuizMessageHistoryList[]) {
  const makeDataLevel = (depth = 0) => {
    return quizNoticeData.map((data, idx) => {
      return {
        ...newQuizNoticeData(data, idx),
      };
    });
  };

  return makeDataLevel();
}
