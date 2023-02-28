import { ICustomErrorParam } from '../../../../recoil/errors/errorsAtom';
import { IUpdateQuizParam } from '../../../../services/QuizServices';

export const checkStartQuiz = (data: IUpdateQuizParam): ICustomErrorParam | null => {
  const { fixKill, idx, item, matchState, name, orders, pick, quizTypeIdx, state, times, tooltip, type } =
    data;
  let noItemName = false;

  if (name.length === 0) {
    return {
      statusCode: 'quiz-no-name',
      message: 'quiz-no-name',
    };
  }
  if (matchState === 0) {
    return {
      statusCode: 'quiz-no-matchState',
      message: 'quiz-no-matchState',
    };
  }
  if (times < 15) {
    return {
      statusCode: 'quiz-low-times',
      message: 'quiz-low-times',
    };
  }
  if (item.length === 0) {
    return {
      statusCode: 'quiz-no-item',
      message: 'quiz-no-item',
    };
  }

  item.forEach((element) => {
    if (element.name.length === 0) {
      noItemName = true;
    }
  });
  if (noItemName) {
    return {
      statusCode: 'quiz-item-no-name',
      message: 'quiz-item-no-name',
    };
  }

  if ([2, 3].includes(type)) {
    if (fixKill === 0) {
      return {
        statusCode: 'quiz-need-fix-kill',
        message: 'quiz-need-fix-kill',
      };
    }
  }

  return null;
};
