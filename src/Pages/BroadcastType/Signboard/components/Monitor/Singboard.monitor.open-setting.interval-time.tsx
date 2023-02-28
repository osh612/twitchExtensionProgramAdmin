import styled from '@emotion/styled/macro';
import { useEffect, useState } from 'react';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { secToMS } from '../../../../../lib/common';
import { colors } from '../../../../../Styles/ui';

const IntervalTime = ({
  time,
  buttonState,
  timeOutFunc,
}: {
  time: number;
  buttonState: string;
  timeOutFunc: () => void;
}) => {
  const [sec, setSec] = useState<number>(Math.floor(time) - Math.floor(new Date().getTime() / 1000));

  useEffect(() => {
    const countdown = setInterval(() => {
      if (sec > 0 && buttonState === 'continue') {
        const sec = Math.floor(time) - Math.floor(new Date().getTime() / 1000);
        setSec(sec);
      } else {
        setSec(0);
        clearInterval(countdown);
        timeOutFunc();
      }
    }, 500);
    return () => clearInterval(countdown);
  }, [sec, buttonState]);

  return (
    <TimerContainer>
      <AccessTimeFilledIcon sx={{ width: 24, height: 24, margin: '0 7px 0 24px', paddingBottom: '1px' }} />
      {secToMS(sec)} Left
    </TimerContainer>
  );
};

export default IntervalTime;

const TimerContainer = styled.label`
  margin-right: 20px;
  font: normal normal normal 15px/21px Noto Sans CJK KR;

  display: flex;
  align-items: center;
`;
