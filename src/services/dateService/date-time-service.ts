import DateTime from './datetime';
import TimerDuration from './timer-duration';

export const getQuizDuration = (startDateTime: string | number | Date, quizDuration: number) => {
  const diffFromNowToStart = DateTime.getDiffFromPastToNow(startDateTime);

  const duration = new TimerDuration(quizDuration);
  duration.minus(diffFromNowToStart);

  const durationString = duration.getValue().toFixed(0);
  return Number(durationString);
};
