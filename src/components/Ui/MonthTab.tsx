import { Box, Button, ButtonGroup } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import CalendarAtom from '../../recoil/calendar/calendarAtom';
import { colors } from '../../Styles/ui';

const MonthTab = () => {
  const [month, setMonth] = useRecoilState(CalendarAtom.month);
  const { t } = useTranslation();
  //  console.log(`${t(`reward.eSport`)}`);
  const setSelectedMonth = (month: number) => {
    setMonth(month);
  };

  return (
    <>
      {[...Array(12)].map((_, idx) => {
        return (
          <Button
            sx={{
              height: 60,
              width: '6%',
              color: month === idx + 1 ? colors.main : colors.text,
              borderBottom: `3px solid ${month === idx + 1 ? colors.btn_confirm : colors.bg_transparency}`,
            }}
            onClick={() => setSelectedMonth(idx + 1)}
          >
            {t(`common.calendar.month.${idx + 1}`)}
          </Button>
        );
      })}
    </>
  );
};

export default MonthTab;
