import dayjs from 'dayjs';
import { atom } from 'recoil';

interface CalendarParams {
  yearList: number[];
  monthList: number[];
  dayList: number[];
  year: number;
  month: number;
  day: number;
}

const now = dayjs();

const CalendarAtom = {
  year: atom<number>({
    key: 'year',
    default: now.get('y'),
  }),
  month: atom<number>({
    key: 'month',
    default: now.get('M') + 1,
  }),
  day: atom<number>({
    key: 'day',
    default: now.get('D'),
  }),
};

// export const ScheduleResultAtom = atom<CalendarParams>({
//   key: 'CalendarResult',
//   default: undefined,
// });

export default CalendarAtom;
