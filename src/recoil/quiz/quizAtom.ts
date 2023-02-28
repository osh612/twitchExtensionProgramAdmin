import { atom } from 'recoil';

interface QuizType {
  idx: number;
  name: string;
  del: number;
  selectnum: number;
}

interface QuizParam {
  quizTypeList: QuizType[];
}

const QuizAtom = {
  quizTypeList: atom<QuizType[]>({
    key: 'quizTypeList',
    default: [],
  }),
};

// export const ScheduleResultAtom = atom<QuizParam>({
//   key: 'QuizResult',
//   default: undefined,
// });

export default QuizAtom;
