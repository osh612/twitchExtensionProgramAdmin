import styled from '@emotion/styled/macro';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import addZero from '../../../../lib/addZero';
import { userAtom } from '../../../../recoil/Auth/userAtom';
import CalendarAtom from '../../../../recoil/calendar/calendarAtom';
import ScheduleAtom from '../../../../recoil/schedule/scheduleAtom';
import ScheduleServices, { IMatchGameSet, IMatchReadParam } from '../../../../services/ScheduleServices';
import { colors } from '../../../../Styles/ui';
import CalendarBox from '../../Components/monitor.calendar';
import LeagueListBox from '../../Components/Index/index.league-list';
import MatchIndexBox from '../../Components/Index/index.match-index';

function SignboardIndex() {
  const { t } = useTranslation();
  const param = useParams();
  const leagueList = useRecoilValue(ScheduleAtom.leagueList);
  const [matchCount, setMatchCount] = useState(0);
  const [matchList, setMatchList] = useState<IMatchGameSet>({});
  const user = useRecoilValue(userAtom);
  const selectedYear = useRecoilValue(CalendarAtom.year);
  const selectedMonth = useRecoilValue(CalendarAtom.month);

  const { mutate: getMatchList, isLoading } = useMutation(
    (data: IMatchReadParam) => ScheduleServices.getMatchList(data, param.game ?? ''),
    {
      onSuccess: (data) => {
        setMatchCount(data.count);
        setMatchList(data.match);
      },
    },
  );

  useEffect(() => {
    const startDate = dayjs()
      .set('y', selectedYear)
      .set('M', selectedMonth - 1)
      .startOf('M')
      .format();
    const endDate = dayjs()
      .set('y', selectedYear)
      .set('M', selectedMonth - 1)
      .endOf('M')
      .format();

    const idx = leagueList.filter((data) => data.title.toLowerCase() === param.league)[0]?.idx;

    if (idx && user?.accountIdx) {
      getMatchList({
        leagueIdx: idx,
        startDate,
        endDate,
        accountIdx: user?.accountIdx,
      });
    }
  }, [selectedYear, selectedMonth, param.league, leagueList]);

  return (
    <Wrapper>
      <LeagueListBox />
      <CalendarBox matchListKeys={Object.keys(matchList)} />
      <MatchIndexBox matchCount={matchCount} matchList={matchList} />
    </Wrapper>
  );
}

export default SignboardIndex;

const Wrapper = styled.div`
  color: ${colors.text};
  background-color: ${colors.num_222};
  border-radius: 10px;
  height: 95vh;
`;
