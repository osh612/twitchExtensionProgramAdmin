import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Element, animateScroll as scroll, scroller } from 'react-scroll';
import TotalHeader from '../../../../components/Ui/TotalHeader';
import { IMatchGameSet, IStreamerScheduleSet } from '../../../../services/ScheduleServices';
import { colors, scrollbarStyle } from '../../../../Styles/ui';
import MatchBox from './index.match-box';
import { toastWarning } from '../../../../components/Toastify/ToasitifyContainer';
import { today } from '../../../../lib/common';
import { permissionsAtom } from '../../../../recoil/Auth/userAtom';

export const autoMoveScroll = (date: string, matchListKeys: string[]) => {
  if (matchListKeys.includes(date)) {
    scroller.scrollTo(`match-${date}`, {
      duration: 500,
      delay: 0,
      smooth: 'easeInOutQuart',
      containerId: 'matchListBox',
    });
  } else {
    const selectedDate = matchListKeys.filter((matchDate) => {
      const diff = dayjs(matchDate).diff(dayjs(date), 'd');
      if (diff > 0) {
        return matchDate;
      }
      return false;
    })[0];
    if (selectedDate) {
      scroller.scrollTo(`match-${selectedDate}`, {
        duration: 500,
        delay: 0,
        smooth: 'easeInOutQuart',
        containerId: 'matchListBox',
      });
      toastWarning('오늘 경기가 없어 최근 경기로 이동합니다.');
    } else {
      scroll.scrollToTop({
        duration: 500,
        delay: 0,
        smooth: 'easeInOutQuart',
        containerId: 'matchListBox',
      });
      toastWarning('이번 달은 예정된 경기가 없습니다.');
    }
  }
};

interface IMatchIndexBoxParam {
  matchCount: number;
  matchList?: IMatchGameSet;
  broadcastList?: IStreamerScheduleSet;
}

const MatchIndexBox = ({ matchCount, matchList, broadcastList }: IMatchIndexBoxParam) => {
  const useStreamer = useRecoilValue(permissionsAtom.streamer);
  const useLeagueManager = useRecoilValue(permissionsAtom.leagueManager);
  const param = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    if (useStreamer && broadcastList) {
      autoMoveScroll(today, Object.keys(broadcastList));
    }
    if (useLeagueManager && matchList) {
      autoMoveScroll(today, Object.keys(matchList));
    }
  }, []);

  return (
    <Wrapper>
      <TotalHeader text={t('game.gameCount').replace('@', matchCount.toString())} />
      <MatchList id='matchListBox'>
        {matchList &&
          Object.entries(matchList).map((match, idx) => {
            return (
              <Element name={`match-${match[0]}`} className='element'>
                <MatchBox date={match[0]} match={match[1]} />
              </Element>
            );
          })}
        {broadcastList &&
          Object.entries(broadcastList)
          .map((match, idx) => {
            return (
              <Element name={`match-${match[0]}`} className='element'>
                <MatchBox date={match[0]} broadcast={match[1]} />
              </Element>
            );
          })}
      </MatchList>
    </Wrapper>
  );
};

export default MatchIndexBox;

const Wrapper = styled.div`
  padding: 40px 34px;
`;

const MatchList = styled.div`
  // height: calc(95vh - 400px);
  // ${scrollbarStyle.scroll_8};
`;
