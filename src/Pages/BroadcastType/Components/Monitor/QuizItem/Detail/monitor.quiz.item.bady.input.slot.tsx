import styled from '@emotion/styled/macro';
import { StopCircle } from '@mui/icons-material';
import { Box, Button, Input, InputBase } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isVoidExpression } from 'typescript';
import PersonIcon from '@mui/icons-material/Person';
import { userAtom } from '../../../../../../recoil/Auth/userAtom';
import PickCountingService from '../../../../../../services/PickCountingService';
import { IQuizInfo, IQuizItem } from '../../../../../../services/QuizServices';
import {
  client,
  stompPublish,
  stompSubscribe,
  stompUnSubscribe,
} from '../../../../../../services/socket/webSocket';
import { colors, spacing } from '../../../../../../Styles/ui';
import { QuizType } from '../../../lib/quizType';

export const getMax10 = (num: number) => {
  return num > 10 ? 10 : num;
};

const QuizSlotInputBox = ({
  idx,
  quizItem,
  updateQuizInfo,
  quizGroupIdx,
  quizInfo,
  calKill,
  calRate,
  calCount,
  lockForQuiz,
  isCloseMatch,
  quizSocketHandler,
}: {
  quizInfo: IQuizInfo;
  idx: number;
  quizItem: IQuizItem;
  quizGroupIdx: number;
  updateQuizInfo: ({ key, data }: { key: any; data: any }) => void;
  calKill: number[];
  calRate: number[];
  calCount: number[];
  lockForQuiz?: boolean;
  isCloseMatch: boolean;
  quizSocketHandler: ({ type, data }: { type: string; data: any }) => void;
}) => {
  const { t } = useTranslation();
  const user = useRecoilValue(userAtom);
  const [text, setText] = useState<string>(quizItem ? quizItem.name : '');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setText(value);
    updateQuizInfo({ key: `item.${idx - 1}.name`, data: value });
  };

  useEffect(() => {
    if (quizItem) {
      setText(quizItem.name);
    }
  }, [quizItem]);

  useEffect(() => {
    if (quizInfo.state === 5) {
      updateQuizInfo({
        key: 'quizList',
        data: undefined,
      });
    }
  }, [quizInfo.state]);

  const quizCorrect = () => {
    if (!quizItem) {
      console.log(quizInfo);
    }
    const data = {
      quizGroupIdx,
      quizIdx: quizInfo.idx,
      order: quizInfo.orders,
      accountType: user?.accountsType,
      item: {
        idx: quizItem.idx,
        name: quizItem.name,
        counts: 0,
        kills: 0,
        width: 0,
        confirm: 0,
      },
    };
    quizSocketHandler({ type: QuizType.correct, data });
  };

  return (
    <QuizSlotItemWrapper>
      <QuizSlotInputWrapper>
        <CountLabel>{idx}</CountLabel>
        <InputBase
          placeholder=''
          fullWidth
          type='text'
          autoComplete='off'
          id=''
          onChange={onChange}
          value={text}
          disabled={quizInfo.state !== 1}
          sx={{ ':disabled': { color: 'red' } }}
        />
      </QuizSlotInputWrapper>
      <QuizResultConsoleWrapper>
        {quizInfo.state === 4 || quizInfo.state === 2 ? (
          <QuizResultConsole>
            <CountWrap>
              <PersonIcon sx={{ color: colors.num_888, marginRight: '2px' }} />
              {calCount[idx - 1]}명
            </CountWrap>
            <KillWrap>
              <PersonIcon sx={{ color: colors.num_888, marginRight: '2px' }} />
              {getMax10(calKill[idx - 1])}킬
            </KillWrap>
            {/* 투표율: {calRate[idx - 1]} */}
          </QuizResultConsole>
        ) : null}
        {quizInfo.state === 5 ? (
          <QuizResultConsole>
            <CountWrap>
              <PersonIcon sx={{ color: colors.num_888, marginRight: '2px' }} />
              {quizItem.counts}명
            </CountWrap>
            <KillWrap>
              <PersonIcon sx={{ color: colors.num_888, marginRight: '2px' }} />
              {getMax10(quizItem.kills)}킬
            </KillWrap>
            {/* 투표율: {quizItem.width} */}
          </QuizResultConsole>
        ) : null}
        {quizInfo.type !== 2 && (quizInfo.state === 4 || quizInfo.state === 2 || quizInfo.state === 5) ? (
          <CorrectButtonWrap>
            <Button
              variant='contained'
              color='normal'
              size='small'
              disabled={quizInfo.state !== 4 || lockForQuiz || isCloseMatch}
              onClick={quizCorrect}
            >
              {t('monitor.footer.correct')}
            </Button>
          </CorrectButtonWrap>
        ) : null}
      </QuizResultConsoleWrapper>
    </QuizSlotItemWrapper>
  );
};

export default QuizSlotInputBox;

export const QuizSlotItemWrapper = styled.div`
  width: 46%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${colors.text} !important;
  border-radius: 10px;
  margin-left: 20px;
  margin-bottom: 20px;
  height: auto;

  .MuiInputBase-input {
    font: normal normal normal 15px/25px Noto Sans CJK KR;
    height: 40px;
    ${spacing.paddingX(5)};
    color: ${colors.text} !important;
    background-color: ${colors.num_333} !important;
    border-radius: 10px;
  }

  .Mui-disabled {
    -webkit-text-fill-color: ${colors.num_888} !important;
  }
`;

export const CountLabel = styled.label`
  display: flex;
  color: ${colors.text};
  justify-content: center;
  align-items: center;
  // font: normal normal normal 15px/21px Noto Sans CJK KR;
  width: 46px;
  border-right: 2px solid #929292;
`;

export const QuizSlotInputWrapper = styled.label`
  width: 100%;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  background-color: ${colors.num_333} !important;
  margin-bottom: 10px;
`;

export const QuizResultConsole = styled.label`
  width: 100%;
  background-color: #444;
  border-radius: 10px;
  display: flex;
  padding: 3px;
`;
export const CountWrap = styled.label`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

export const KillWrap = styled.label`
  display: flex;
  align-items: center;
`;

export const CorrectButtonWrap = styled.label`
  min-width: 76px;
  margin-left: 10px;
`;

export const QuizResultConsoleWrapper = styled.label`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
