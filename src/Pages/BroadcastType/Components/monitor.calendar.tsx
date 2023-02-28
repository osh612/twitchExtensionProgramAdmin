import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { TypeList } from '../../../components/Sidebar/Components/Sidebar.TypeBox';
import MonthTab from '../../../components/Ui/MonthTab';
import TodayButton from '../../../components/Ui/TodayButton';
import YearCalendarButton from '../../../components/Ui/YearCalendarButton';
import { userLanguageAtom } from '../../../recoil/Auth/userAtom';
import ScheduleAtom from '../../../recoil/schedule/scheduleAtom';
import { colors } from '../../../Styles/ui';

const CalendarBox = ({ matchListKeys }: { matchListKeys: string[] }) => {
  const leagueList = useRecoilValue(ScheduleAtom.leagueList);
  const lang = useRecoilValue(userLanguageAtom);
  const param = useParams();
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (param.type === TypeList[0]) {
      if (leagueList.length > 0) {
        // 타이틀 추출
        const selectedLeague = leagueList.filter(
          (league) => league.subTitle.toLowerCase() === param.league,
        )[0];
        setTitle(lang === 'ko' ? selectedLeague.descriptionKr : selectedLeague.description);
      }
    }
    if (param.type === TypeList[1]) {
      setTitle('');
    }
  }, [param.league, leagueList]);

  if (leagueList.length === 0) {
    <div>로딩중</div>;
  }

  return (
    <Wrapper>
      <TopBox>
        <LeftBox>{title}</LeftBox>
        <CenterBox>
          <YearCalendarButton />
        </CenterBox>
        <RightBox>
          <TodayButton matchListKeys={matchListKeys} />
        </RightBox>
      </TopBox>
      <BottomBox>
        <MonthTab />
      </BottomBox>
    </Wrapper>
  );
};

export default CalendarBox;

const CommonCss = css`
  width: 100%;
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  flex-direction: column;
  justify-content: space-between;
  padding: 0px 40px 0 40px;
`;

const TopBox = styled.div`
  ${CommonCss};
  height: auto;
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

const BottomBox = styled.div`
  justify-content: space-evenly;
  // height: 60px;
  ${CommonCss};
  border-top: 1px solid ${colors.num_333};
  border-bottom: 1px solid ${colors.num_333};

  .MuiButton-root {
    border-left: 0px;
    border-right: 0px;
  }
`;
