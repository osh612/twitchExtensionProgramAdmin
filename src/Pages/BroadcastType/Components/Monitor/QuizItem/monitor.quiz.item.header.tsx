import styled from '@emotion/styled/macro';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PersonIcon from '@mui/icons-material/Person';
import { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StompSubscription } from '@stomp/stompjs';
import dayjs from 'dayjs';
import { useRecoilValue } from 'recoil';
import { IQuizInfo, IQuizItem } from '../../../../../services/QuizServices';
import { colors } from '../../../../../Styles/ui';
import { quizColorMapping } from '../../lib/quizColorMapping';
import QuizQuestionLabel from './Detail/monitor.quiz.item.header.label.question';
import QuizStatusLabel from './Detail/monitor.quiz.item.bady.label.status';
import { getQuizDuration } from '../../../../../services/dateService/date-time-service';
import { stompPublish, stompSubscribe } from '../../../../../services/socket/webSocket';

import { userAtom } from '../../../../../recoil/Auth/userAtom';
import { QuizType } from '../../lib/quizType';

const QuizHeaderBox = ({
  quizInfo,
  updateQuizInfo,
  times,
  socketState,
}: {
  quizInfo: IQuizInfo;
  updateQuizInfo: ({ key, data }: { key: any; data: any }) => void;
  times: number;
  socketState: string;
}) => {
  const { t } = useTranslation();
  const [quizSubject, setQuizSubject] = useState<string>('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuizSubject(e.target.value);
    updateQuizInfo({ key: 'name', data: e.target.value });
  };

  useEffect(() => {
    setQuizSubject(quizInfo.name);
  }, [quizInfo.name]);

  return (
    <QuizHeader>
      <LeftBox>
        {/* <SpanRoundNo>{`${index + 1}.`}</SpanRoundNo> */}
        <SpanQuizQuestionInput
          maxLength={50}
          placeholder={t('monitor.body.placeHolder.subject')}
          value={quizSubject}
          onChange={onChange}
          disabled={quizInfo.state !== 1}
        />
        <QuizQuestionLabel text={socketState} />
      </LeftBox>
      <RightBox>
        {quizInfo.state === 2 ? (
          <>
            <AccessTimeFilledIcon
              sx={{
                color: colors.num_888,
                width: '24px',
                height: '24px',
              }}
            />
            <QuizGrayText>{times}</QuizGrayText>
            <PersonIcon
              sx={{
                color: colors.num_888,
                width: '24px',
                height: '24px',
              }}
            />
            <QuizGrayText>{quizInfo.pick} 명</QuizGrayText>
          </>
        ) : null}
        <QuizStatusLabel status={quizInfo.state} />
      </RightBox>
    </QuizHeader>
  );
};

export default QuizHeaderBox;

export const QuizHeader = styled.div`
  display: flex;
  padding: 23px 40px;
  border-bottom: solid 1px ${colors.num_444};
  justify-content: space-between;
`;

export const LeftBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const RightBox = styled.div`
  display: flex;
  align-items: center;
`;

const SpanRoundNo = styled.span`
  text-align: left;
  font: normal normal bold 18px/26px Noto Sans CJK KR;
  color: ${colors.main};
  margin-right: 11px;
`;

export const SpanQuizQuestionInput = styled.input`
  text-align: left;
  font: normal normal normal 15px/21px Noto Sans CJK KR;
  color: ${colors.text};
  margin-right: 11px;
  width: 100%;
`;

export const QuizGrayText = styled.span`
  margin: 0 7px;
  color: ${colors.num_888};
  white-space: nowrap;
`;
