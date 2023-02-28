import { css } from '@emotion/react';
import styled from '@emotion/styled/macro';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import LabelIcon from '../../../../components/Ui/LabelIcon';
import addZero from '../../../../lib/addZero';
import { permissionsAtom, userAtom } from '../../../../recoil/Auth/userAtom';
import { IMatchGame, IStreamerSchedule } from '../../../../services/ScheduleServices';
import { colors } from '../../../../Styles/ui';
import { MonitorButtonCss } from '../lib/quizColorMapping';

const MatchInfoBox = ({ info }: { info: IMatchGame }) => {
  const { t } = useTranslation();
  const navigator = useNavigate();
  const now = dayjs();
  const matchDate = dayjs(info.matchDate);
  const DiffSec = now.diff(matchDate, 's');

  const winCount = info.team1Score > info.team2Score ? info.team1Score : info.team2Score;
  const time = `${addZero(matchDate.get('h'))}:${addZero(matchDate.get('m'))}`;
  const gameClose = +winCount === info.winCount;
  const scoreIdx = gameClose ? 0 : DiffSec > 0 ? 1 : 2; // 0 : 종료, 1 : 경기 중, 2 : 경기 예정
  const buttonVariant = [0, 1, null].includes(info.quizState) ? 'outlined' : 'contained';
  const tbdUrl = info.team1Name.toLowerCase() === 'tbd' ? '/Images/team/ico-tbd.png' : '';

  const scoreLabel = [
    { text: t('game.close'), color: colors.num_444 },
    { text: t('game.live'), color: colors.main },
    { text: t('game.expected'), color: colors.num_111 },
  ];
  const clickHandler = () => {
    navigator(`${info.idx}`);
  };

  return (
    <MatchInfo active={scoreIdx === 1}>
      <LeftBox>
        <MatchTime>{time}</MatchTime>
        <MatchName>{info.matchName}</MatchName>
      </LeftBox>
      <CenterBox>
        <TeamName>{info.team1Fullname}</TeamName>
        <TeamImg
          src={tbdUrl || `/Images/team/ico-team-${info.team1Name.toLowerCase()}.png`}
          alt={info.team1Name}
        />
        <TeamScoreBox>
          <TeamScore>{info.team1Score}</TeamScore>
          <LabelIcon text={scoreLabel[scoreIdx].text} color={scoreLabel[scoreIdx].color} />
          <TeamScore>{info.team2Score}</TeamScore>
        </TeamScoreBox>

        <TeamImg
          src={tbdUrl || `/Images/team/ico-team-${info.team2Name.toLowerCase()}.png`}
          alt={info.team2Name}
        />
        <TeamName>{info.team2Fullname}</TeamName>
      </CenterBox>
      <RightBox>
        <Button
          variant={buttonVariant}
          sx={{
            ...MonitorButtonCss[info.quizState ?? 0],
            width: 111,
            height: 50,
          }}
          onClick={clickHandler}
        >
          {t(`game.button.${info.quizState}`)}
        </Button>
      </RightBox>
    </MatchInfo>
  );
};

const BroadCastInfo = ({ info }: { info: IStreamerSchedule }) => {
  const { t } = useTranslation();
  const navigator = useNavigate();
  const user = useRecoilValue(userAtom);
  const param = useParams();
  const now = dayjs();
  const matchDate = dayjs(info.regdate);
  const DiffSec = now.diff(matchDate, 's');

  const time = `${addZero(matchDate.get('h'))}:${addZero(matchDate.get('m'))}`;
  // const scoreIdx = gameClose ? 0 : DiffSec > 0 ? 1 : 2; // 0 : 종료, 1 : 경기 중, 2 : 경기 예정
  const buttonVariant = [0, 1, null].includes(0) ? 'outlined' : 'contained';
  // const tbdUrl = info.team1Name.toLowerCase() === 'tbd' ? '/Images/team/ico-tbd.png' : '';

  const scoreLabel = [
    { text: t('game.close'), color: colors.num_444 },
    { text: t('game.live'), color: colors.main },
    { text: t('game.expected'), color: colors.num_111 },
  ];
  const clickHandler = () => {
    navigator(`${info.idx}`);
  };

  return (
    <MatchInfo active={false}>
      <LeftBox>
        <MatchTime>{time}</MatchTime>
      </LeftBox>
      <CenterBox>
        <TeamScoreBox />
      </CenterBox>
      <RightBox>
        <Button
          variant={buttonVariant}
          sx={{
            ...MonitorButtonCss[info.state ?? 0],
            width: 111,
            height: 50,
          }}
          onClick={clickHandler}
        >
          {t(`game.button.${info.state ?? 0}`)}
        </Button>
      </RightBox>
    </MatchInfo>
  );
};

const InfoBox = ({
  matchinfo,
  broadCastInfo,
}: {
  matchinfo?: IMatchGame;
  broadCastInfo?: IStreamerSchedule;
}) => {
  const useStreamer = useRecoilValue(permissionsAtom.streamer);

  if (useStreamer && broadCastInfo) {
    return <BroadCastInfo info={broadCastInfo} />;
  }

  if (!useStreamer && matchinfo) {
    return <MatchInfoBox info={matchinfo} />;
  }

  return <></>;
};

export default InfoBox;

const MatchInfo = styled.div<{ active: boolean }>`
  width: 100%;
  height: 82px;
  display: flex;
  padding: 19px 24px;
  background-color: ${({ active }) => (active ? colors.live_active : colors.bg_transparency)};
`;

const CommonCss = css`
  width: 100%;
  display: flex;
  align-items: center;
`;

const RightBox = styled.div`
  justify-content: flex-end;
  ${CommonCss};
`;
const CenterBox = styled.div`
  ${CommonCss};
  justify-content: center;
  padding: 20px 0;
  .MuiSvgIcon-fontSizeMedium {
    font-size: 28px;
    margin-bottom: 7px;
  }
`;
const LeftBox = styled.div`
  justify-content: flex-start;
  font: normal normal bold 18px/21px Noto Sans CJK KR;
  ${CommonCss};
`;

const MatchTime = styled.span`
  width: 50px;
`;
const MatchName = styled.span`
  margin: 0 16px;
  color: ${colors.num_888};
`;

const TeamImg = styled.img`
  width: 52px;
  height: 52px;
`;

const TeamName = styled.span`
  width: 160px;
  text-align: center;
  font: normal normal bold 15px/28px Noto Sans CJK KR;
`;
const TeamScoreBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 20px;
`;
const TeamScore = styled.div`
  margin: 0px 30px;
`;
