import styled from '@emotion/styled/macro';
import { Box, LinearProgress, linearProgressClasses } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { colors } from '../../../../../../Styles/ui';

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 32,
  borderRadius: 3,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: colors.num_333,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 3,
    backgroundColor: colors.progress,
  },
}));

function getArrowIcon(result: boolean) {
  return result ? (
    <ArrowDropUpIcon sx={{ color: colors.progress }} />
  ) : (
    <ArrowDropDownIcon sx={{ color: colors.pg_down }} />
  );
}

function getPercent(result: boolean, num: number) {
  return <RTLabel result={result}>{num}%</RTLabel>;
}

const QuizRealTimeBox = ({ team1Name, team2Name }: { team1Name: string; team2Name: string }) => {
  const { t } = useTranslation();
  const isTeam1Win = true;
  const team1Score = 50;

  return (
    <Wrapper>
      <WinRateLabel>{t('monitor.RealTime.subject')}</WinRateLabel>
      <TimerBox>
        <AccessTimeFilledIcon sx={{ color: colors.num_888, marginRight: '2px' }} />
        14분 기준
      </TimerBox>
      <TeamBox>
        <TeamLabel>{team1Name}</TeamLabel>
        {getArrowIcon(isTeam1Win)}
        {getPercent(isTeam1Win, 8)}
      </TeamBox>
      <ScoreBox>
        <LeftScroe>{team1Score}%</LeftScroe>
        <RightScroe>{100 - team1Score}%</RightScroe>
        <Box sx={{ flexGrow: 1 }}>
          <BorderLinearProgress variant='determinate' value={team1Score} />
        </Box>
      </ScoreBox>
      <TeamBox>
        {getArrowIcon(!isTeam1Win)}
        {getPercent(!isTeam1Win, 8)}
        <TeamLabel>{team2Name}</TeamLabel>
      </TeamBox>
    </Wrapper>
  );
};

export default QuizRealTimeBox;

const Wrapper = styled.div`
  margin-top: 40px;
  width: 100%;
  height: 96px;
  display: flex;
  align-items: center;
  border: 1px solid ${colors.rt_boundary};
  padding: 32px 40px;
  border-radius: 3px;
`;

const WinRateLabel = styled.label`
  color: ${colors.text};
  white-space: nowrap;
  font: normal normal bold 16px/24px Noto Sans CJK KR;
`;

const TimerBox = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.num_888};
  white-space: nowrap;
  margin-left: 14px;
`;

const TeamBox = styled.div`
  color: ${colors.text};
  text-align: center;
  display: flex;
  align-items: center;
  margin: 0 15px;

  .up {
    font: normal normal bold 13px/19px Noto Sans CJK KR;
    color: ${colors.pg_down};
  }

  .down {
    font: normal normal bold 13px/19px Noto Sans CJK KR;
    color: ${colors.progress};
  }
`;
const ScoreBox = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
`;

const RightScroe = styled.div`
  color: ${colors.text};
  position: absolute;
  right: 1%;
  font: normal normal bold 15px/21px Noto Sans CJK KR;
  z-index: 1;
`;
const LeftScroe = styled.div`
  color: ${colors.text};
  position: absolute;
  left: 1%;
  font: normal normal bold 15px/21px Noto Sans CJK KR;
  z-index: 1;
`;

const RTLabel = styled.div<{ result: boolean }>`
  color: ${({ result }) => (result ? colors.progress : colors.pg_down)};
`;
const TeamLabel = styled.div`
  margin: 0px 12px;
`;
