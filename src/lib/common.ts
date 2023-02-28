import dayjs from 'dayjs';
import addZero from './addZero';

export const today = `${dayjs().get('y')}-${addZero(dayjs().get('M') + 1)}-${addZero(dayjs().get('D'))}`;

export function secToMS(sec: number) {
  const mm = addZero(Math.floor(sec / 60));
  const ss = addZero(Math.floor(sec % 60));

  return `${mm}:${ss}`;
}
