import styled from '@emotion/styled/macro';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TypeList } from '../../../../components/Sidebar/Components/Sidebar.TypeBox';
import LabelIcon from '../../../../components/Ui/LabelIcon';
import addZero from '../../../../lib/addZero';
import { IMatchGame, IStreamerSchedule } from '../../../../services/ScheduleServices';
import { colors } from '../../../../Styles/ui';

const outsidePerWidth = 5;
const insidePerWidth = 25;

const MatchInfoHeader = ({ info }: { info: IMatchGame }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const param = useParams();
  const isSingboard = useLocation().pathname.includes('signboard');
  const nowMS = dayjs().get('ms');
  const matchDate = dayjs(info.matchDate);
  const winCount = info.team1Score > info.team2Score ? info.team1Score : info.team2Score;
  const time = `${addZero(matchDate.get('h'))}:${addZero(matchDate.get('m'))}`;
  const gameClose = +winCount === info.winCount;
  const scoreIdx = gameClose ? 0 : nowMS > matchDate.get('ms') ? 1 : 2; // 0 : 종료, 1 : 경기 중, 2 : 경기 예정

  const tbdUrl = info.team1Name.toLowerCase() === 'tbd' ? '/Images/league/ico-tbd.png' : '';
  const scoreLabel = [
    { text: t('game.close'), color: colors.num_444 },
    { text: t('game.live'), color: colors.main },
    { text: t('game.expected'), color: colors.num_111 },
  ];

  const goback = () => {
    if (param.type === TypeList[0]) {
      navigate(`/${param.type}/${param.game}/${param.league}`);
    } else if (param.type === TypeList[1]) {
      navigate(`/${param.type}/${param.streamerCode}`);
    }
  };

  return (
    <Header isSingboard={isSingboard}>
      <HeaderPart num={outsidePerWidth}>
        <GoBackIcon src='/Images/icon/ico-arrow-down.svg' alt='go-back' onClick={goback} />
      </HeaderPart>
      <HeaderPart num={insidePerWidth}>
        <MatchTime>{time}</MatchTime>
        <MatchName>{info.matchName}</MatchName>
      </HeaderPart>
      <HeaderMain>
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
      </HeaderMain>
      <HeaderPart num={insidePerWidth} />
      <HeaderPart num={outsidePerWidth} />
    </Header>
  );
};

const StreamerMonitorHeader = ({ info }: { info: IStreamerSchedule }) => {
  const navigate = useNavigate();
  const param = useParams();
  const isSingboard = useLocation().pathname.includes('signboard');
  const matchDate = dayjs(info.regdate);
  const time = `${addZero(matchDate.get('h'))}:${addZero(matchDate.get('m'))}`;

  const goback = () => {
    if (param.type === TypeList[0]) {
      navigate(`/${param.type}/${param.game}/${param.league}`);
    } else if (param.type === TypeList[1]) {
      navigate(`/${param.type}/${param.streamerCode}`);
    }
  };

  return (
    <Header isSingboard={isSingboard}>
      <HeaderPart num={outsidePerWidth}>
        <GoBackIcon src='/Images/icon/ico-arrow-down.svg' alt='go-back' onClick={goback} />
      </HeaderPart>
      <HeaderPart num={insidePerWidth}>
        <MatchTime>{time}</MatchTime>
      </HeaderPart>
      <HeaderMain />
      <HeaderPart num={insidePerWidth} />
      <HeaderPart num={outsidePerWidth} />
    </Header>
  );
};

const MonitorHeader = ({
  matchInfo,
  broadCastInfo,
}: {
  matchInfo?: IMatchGame;
  broadCastInfo?: IStreamerSchedule;
}) => {
  if (matchInfo) {
    return <MatchInfoHeader info={matchInfo} />;
  }
  if (broadCastInfo) {
    return <StreamerMonitorHeader info={broadCastInfo} />;
  }
  return <></>;
};

export default MonitorHeader;

const Header = styled.div<{ isSingboard: boolean }>`
  height: 112px;
  width: 100%;
  display: flex;
  background-color: ${colors.live_active};
  ${({ isSingboard }) => (isSingboard ? '' : 'border-radius: 10px 10px 0px 0px')};
`;

const HeaderPart = styled.div<{ num: number }>`
  height: 100%;
  width: ${({ num }) => num}%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderMain = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GoBackIcon = styled.img`
  cursor: pointer;
`;

const MatchTime = styled.span`
  width: 50px;
`;
const MatchName = styled.span`
  margin: 0 16px;
  color: ${colors.num_888};
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

const TeamImg = styled.img`
  width: 52px;
  height: 52px;
`;

const TabBox = styled.div``;
