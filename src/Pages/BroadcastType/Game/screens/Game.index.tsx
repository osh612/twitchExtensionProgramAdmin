import styled from '@emotion/styled/macro';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { permissionsAtom, userAtom } from '../../../../recoil/Auth/userAtom';
import CalendarAtom from '../../../../recoil/calendar/calendarAtom';
import ScheduleAtom from '../../../../recoil/schedule/scheduleAtom';
import ScheduleServices, {
  IGetSteamerScheduleParam,
  IMatchGameSet,
  IMatchReadParam,
  IStreamerScheduleSet,
} from '../../../../services/ScheduleServices';

import { colors } from '../../../../Styles/ui';
import CalendarBox from '../../Components/monitor.calendar';
import LeagueListBox from '../../Components/Index/index.league-list';
import MatchIndexBox from '../../Components/Index/index.match-index';
import AddStreamerGameButton from '../../Streamer/Component/Index/Streamer.index.add-game-button';

function GameIndex() {
  const param = useParams();
  const user = useRecoilValue(userAtom);
  const useStreamer = useRecoilValue(permissionsAtom.streamer);
  const useLeagueManager = useRecoilValue(permissionsAtom.leagueManager);
  const leagueList = useRecoilValue(ScheduleAtom.leagueList);
  const [count, setCount] = useState(0);
  const [matchList, setMatchList] = useState<IMatchGameSet>({});
  const [streamerScheduleSet, setStreamerScheduleSet] = useState<IStreamerScheduleSet>({});
  const selectedYear = useRecoilValue(CalendarAtom.year);
  const selectedMonth = useRecoilValue(CalendarAtom.month);

  const { mutate: getMatchList } = useMutation(
    (data: IMatchReadParam) => ScheduleServices.getMatchList(data, param.game ?? ''),
    {
      onSuccess: (data) => {
        setCount(data.count);
        setMatchList(data.match);
      },
    },
  );

  const { mutate: getSteamerSchedule } = useMutation(
    (data: IGetSteamerScheduleParam) => ScheduleServices.getSteamerSchedule(data),
    {
      onSuccess: (data) => {
        setCount(data.count ?? 0);
        setStreamerScheduleSet(data.streamerSchedule ?? {});
      },
    },
  );

  dayjs.extend(utc);

  useEffect(() => {
    scheduleHandler();
  }, [selectedYear, selectedMonth, param.league, leagueList, user?.accountIdx]);

  const scheduleHandler = () => {
    const startDate = dayjs
      .utc()
      .set('y', selectedYear)
      .set('M', selectedMonth - 1)
      .startOf('M')
      .format();
    const endDate = dayjs
      .utc()
      .set('y', selectedYear)
      .set('M', selectedMonth - 1)
      .endOf('M')
      .format();

    if (useStreamer) {
      if (user?.accountIdx) {
        getSteamerSchedule({
          startDate,
          endDate,
          accountIdx: user?.accountIdx,
        });
      }
    }
    if (useLeagueManager) {
      const idx = leagueList.filter((data) => data.subTitle.toLowerCase() === param.league)[0]?.idx;
      if (idx && user?.accountIdx) {
        getMatchList({
          leagueIdx: idx,
          startDate,
          endDate,
          accountIdx: user?.accountIdx,
        });
      }
    }
  };

  const getLeagueManagerIndex = () => {
    return (
      <>
        <LeagueListBox />
        <CalendarBox matchListKeys={Object.keys(matchList)} />
        <MatchIndexBox matchCount={count} matchList={matchList} />
      </>
    );
  };

  const getStreamerIndex = () => {
    return (
      <>
        <CalendarBox matchListKeys={Object.keys(streamerScheduleSet)} />
        <MatchIndexBox matchCount={count} broadcastList={streamerScheduleSet} />
        <ButtonWrawwpper>
          <div className='AddButtonWrapper'>
            <AddStreamerGameButton scheduleHandler={scheduleHandler} />
          </div>
        </ButtonWrawwpper>
      </>
    );
  };

  return (
    <Wrapper>
      {useLeagueManager ? getLeagueManagerIndex() : <></>}
      {useStreamer ? getStreamerIndex() : <></>}
    </Wrapper>
  );
}

export default GameIndex;

const Wrapper = styled.div`
  color: ${colors.text};
  background-color: ${colors.num_222};
  border-radius: 10px;
  height: auto;
`;

const ButtonWrawwpper = styled.div`
  height: 100px;
  position: relative;
  left: 0%;

  .AddButtonWrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
