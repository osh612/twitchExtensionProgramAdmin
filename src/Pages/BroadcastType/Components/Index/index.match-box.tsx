import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import LabelIcon from '../../../../components/Ui/LabelIcon';
import { today } from '../../../../lib/common';
import { IMatchGame, IStreamerSchedule } from '../../../../services/ScheduleServices';
import { colors } from '../../../../Styles/ui';
import InfoBox from './index.match-info';

const MatchBox = ({
  date,
  match,
  broadcast,
}: {
  date: string;
  match?: IMatchGame[];
  broadcast?: IStreamerSchedule[];
}) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <MatchDate>
        {date} {today === date && <LabelIcon text={t('common.today')} />}
      </MatchDate>
      {match?.map((info: IMatchGame) => {
        return <InfoBox matchinfo={info} />;
      })}
      {broadcast?.reverse().map((info: IStreamerSchedule) => {
        return <InfoBox broadCastInfo={info} />;
      })}
    </Wrapper>
  );
};

export default MatchBox;

const Wrapper = styled.div`
  padding-right: 20px;
`;

const MatchDate = styled.div`
  width: 100%;
  height: 60px;
  background-color: ${colors.num_111};
  display: flex;
  align-items: center;
  padding: 19px 24px;
  border-radius: 10px;
  margin: 21px 0 0;
`;
