import styled from '@emotion/styled/macro';
import { Button, Input, InputBase } from '@mui/material';
import { type } from 'os';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { regExpNumber } from '../../../../../lib/regExp';
import { IMatchGame } from '../../../../../services/ScheduleServices';
import { stompPublish } from '../../../../../services/socket/webSocket';
import { colors, spacing } from '../../../../../Styles/ui';
import IntervalTime from './Singboard.monitor.open-setting.interval-time';

type IButtonStatusList = 'open' | 'continue' | 'close';

const AcceptSignboard = ({ info }: { info: IMatchGame }) => {
  const { t } = useTranslation();
  const [buttonState, setButtonState] = useState<IButtonStatusList>('open');
  const [leftTime, setLeftTime] = useState<number>(180);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;

    if (id === 'leftTime' && (regExpNumber.test(value) || value === '')) {
      const time = value === '' ? 0 : +value;
      setLeftTime(time);
    }
  };

  const startReserveCheerPool = () => {
    const sendData ={
      leagueMatchIdx: info.idx,
      time: leftTime,
    }
    stompPublish('/send/extension/signboard/reserve/start', sendData)
  };

  const ClickHandler = () => {
    if (buttonState === 'open') {
      setButtonState('continue');
    } else {
      setButtonState('open');
    }
    startReserveCheerPool();
  };

  return (
    <Wrapper>
      <Label>{t('signboard.label.openSetting')}</Label>
      <OpenBox>
        <OpenTimerBox>
          <LeftInputBox>
            <InputBase type='text' id='leftTime' value={leftTime} onChange={onChangeHandler} />
            <LeftLabel>{t('common.time.sec')}</LeftLabel>
          </LeftInputBox>
          <Button
            variant='contained'
            sx={{
              height: '50px',
              padding: '15px 26px',
              borderRadius: '10px',
              font: 'normal normal bold 14px Noto Sans CJK KR',
            }}
            onClick={ClickHandler}
            disabled={buttonState !== 'open'}
          >
            {t(`signboard.button.${buttonState}`)}
          </Button>
          {['continue', 'close'].includes(buttonState) ? (
            <IntervalTime
              time={new Date().getTime() / 1000 + leftTime}
              buttonState={buttonState}
              timeOutFunc={() => {
                setButtonState('close');
              }}
            />
          ) : (
            <></>
          )}
        </OpenTimerBox>
      </OpenBox>
    </Wrapper>
  );
};

export default AcceptSignboard;
const Wrapper = styled.div`
  color: ${colors.text};
  // border-radius: 0 0 10px 10px;
  padding: 30px 0px;
`;

const Label = styled.div`
  padding: 7px 0px;
  font: normal normal bold 15px/28px Noto Sans CJK KR;
`;

const AcceptBox = styled.div`
  display: flex;
`;

const OpenBox = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
`;

const OpenTimerBox = styled.div`
  display: flex;
  align-items: center;

  // padding: 10px 20px;
  // border-radius: 10px;
  // border: 1px solid ${colors.main};

  .MuiInput-input {
    font: normal normal normal 15px/25px Noto Sans CJK KR;
    height: 30px !important;
    ${spacing.paddingX(5)};
    color: ${colors.text} !important;
    background-color: ${colors.num_111} !important;
    border-radius: 10px;
    display: flex;
    align-items: center;
  }
`;

const OpenTimerLabel = styled.label`
  color: ${colors.text_none};
`;

const LeftTime = styled.div``;

const LeftInputBox = styled.div`
  width: 120px;
  display: flex;
  align-items: center;
  color: ${colors.text} !important;
  background-color: ${colors.num_111} !important;
  border-radius: 10px;
  margin-right: 10px;

  .MuiInputBase-input {
    font: normal normal normal 15px/25px Noto Sans CJK KR;
    height: 50px;
    ${spacing.paddingX(5)};
    color: ${colors.num_888} !important;
    background-color: ${colors.num_111} !important;
    border-radius: 10px;
  }
`;

const LeftLabel = styled.label`
  color: ${colors.num_888};
  padding-right: 20px;
  font: normal normal normal 15px/21px Noto Sans CJK KR;
`;
