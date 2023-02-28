import { Button } from '@mui/material';
import dayjs from 'dayjs';
import addZero from '../../lib/addZero';
import { today } from '../../lib/common';
import { autoMoveScroll } from '../../Pages/BroadcastType/Components/Index/index.match-index';

const TodayButton = ({ matchListKeys }: { matchListKeys: string[] }) => {
  const clickHandler = () => {
    autoMoveScroll(today, matchListKeys);
  };

  return (
    <Button variant='outlined' onClick={clickHandler}>
      오늘
    </Button>
  );
};

export default TodayButton;
