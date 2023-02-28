import styled from '@emotion/styled/macro';
import { StopCircle } from '@mui/icons-material';
import { Button, Input, Menu, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userAtom } from '../../../../../recoil/Auth/userAtom';
import PickCountingService from '../../../../../services/PickCountingService';
import { IQuizInfo, IQuizItem } from '../../../../../services/QuizServices';
import { stompPublish, stompSubscribe } from '../../../../../services/socket/webSocket';
import { colors, spacing } from '../../../../../Styles/ui';
import QuizSlotInputBox from './Detail/monitor.quiz.item.bady.input.slot';
import QuizSlotSelector from './Detail/monitor.quiz.item.bady.selector.slot';
import QuizStateSelector from './Detail/monitor.quiz.item.body.selector.state';
import SecInputBox from './Detail/monitor.quiz.item.bady.input.sec';
import QuizStateRadioBox from './Detail/monitor.quiz.item.bady.radio.state';
import QuizFixKillSelector from './Detail/monitor.quiz.item.bady.selector.fix-kill';

const MenuProps = {
  PaperProps: {
    style: {
      // maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      // width: 250,
      backgroundColor: colors.text, // select 메뉴의 컨테이너 색  정할 때  수정.
    },
  },
};

export const mappingMatchState = [0, 1, 2, 3, 4];

const QuizBodyBox = ({
  quizInfo,
  updateQuizInfo,
  quizGroupIdx,
  lockForQuiz,
  quizSocketHandler,
  isCloseMatch,
}: {
  quizInfo: IQuizInfo;
  updateQuizInfo: ({ key, data }: { key: any; data: any }) => void;
  quizGroupIdx: number;
  lockForQuiz: boolean;
  quizSocketHandler: ({ type, data }: { type: string; data: any }) => void;
  isCloseMatch: boolean;
}) => {
  const { t } = useTranslation();

  const [slotState, setSlotState] = useState<number>(quizInfo.item.length);
  // const [quizItem, setQuizItem] = useState<IQuizItem>();
  const user = useRecoilValue(userAtom);
  const [calKill, setKill] = useState<number[]>([]);
  const [calRate, setRate] = useState<number[]>([]);
  const [calCount, setCount] = useState<number[]>([]);
  const [quizTooltip, setQuizTooltip] = useState<string>(quizInfo.tooltip);
  const [fixedKill, setFixedKill] = useState<number>(quizInfo.fixKill);
  const [matchState, setMatchState] = useState<number>(mappingMatchState[quizInfo.matchState]);

  useEffect(() => {
    setSlotState(quizInfo.item.length);
    setFixedKill(quizInfo.fixKill);
    setQuizTooltip(quizInfo.tooltip);
    setMatchState(mappingMatchState[quizInfo.matchState]);
  }, [quizInfo]);

  const handleSlotChange = (event: SelectChangeEvent<typeof slotState>) => {
    const {
      target: { value },
    } = event;
    setSlotState(+value);

    let copyItems = [...quizInfo.item];

    if (quizInfo.item.length < value) {
      const emptyQuizInfo: IQuizItem = {
        idx: 0,
        name: '',
        counts: 0,
        kills: 0,
        width: 0,
        confirm: 0,
      };
      const newCount = +value - quizInfo.item.length;
      [...Array(newCount)].map((_, i) => {
        return copyItems.push({ ...emptyQuizInfo });
      });
    } else if (quizInfo.item.length > value) {
      copyItems = copyItems.splice(0, +value);
    }

    if (quizInfo.item.length !== copyItems.length) {
      updateQuizInfo({
        key: 'item',
        data: copyItems,
      });
    }
  };

  const handleFixedKillChange = (event: SelectChangeEvent<typeof fixedKill>) => {
    const {
      target: { value },
    } = event;
    setFixedKill(+value);
    updateQuizInfo({
      key: 'fixKill',
      data: +value,
    });
  };

  const handleMatchChange = (event: SelectChangeEvent<typeof matchState>) => {
    const {
      target: { value },
    } = event;
    setMatchState(+value);
    updateQuizInfo({
      key: 'matchState',
      data: +value,
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuizTooltip(e.target.value);
    updateQuizInfo({ key: 'tooltip', data: e.target.value });
  };

  const getItemCount = () => {
    stompSubscribe(`/subscribe/${user?.broadcastId}/extension/quiz/count`, (res) => {
      // console.log(res);
      const data = JSON.parse(res.body).countQuizData;
      // console.log('타이머 돌고 있는 문제의 order', data.order);
      const picks = data.pick;
      const pickArray: number[] = Object.values(picks);
      const totalData = data.total;
      // updateQuizInfo({
      //   key: 'pick',
      //   data: data.total,
      // });
      if (pickArray.length > 0) {
        const newPickKills = PickCountingService.calcPickKills(pickArray, totalData);
        const newPickRates = PickCountingService.calcPickRates(pickArray, totalData);
        setKill(newPickKills);
        setRate(newPickRates);
        setCount(pickArray);
      }
    });
  };

  useEffect(() => {
    if (quizInfo.state === 2) {
      getItemCount();
    }
  }, [quizInfo.state === 2]);

  return (
    <QuizBody>
      {/* <QuizAddtionalDesc>
        <DescHeader>{t('monitor.body.additionalDesc')}</DescHeader>
        <Input fullWidth type='text' autoComplete='off' id='' />
      </QuizAddtionalDesc> */}
      <QuizMainHeader>
        <TooltipBox>
          <span>{t('monitor.body.additionalDesc')}</span>
          <TooltipLabel>
            <input placeholder={t('monitor.body.tooltip')} onChange={onChange} value={quizTooltip} />
          </TooltipLabel>
        </TooltipBox>
        <QuizStateRadioBox quizInfo={quizInfo} updateQuizInfo={updateQuizInfo} />
      </QuizMainHeader>
      <QuizMainBox>
        <ItemBox>
          <ItemLabel>
            {t('monitor.body.gameState')} <span className='upStar'>*</span>
          </ItemLabel>
          <QuizStateSelector matchState={matchState} handleChange={handleMatchChange} quizInfo={quizInfo} />
        </ItemBox>
        <ItemBox>
          <ItemLabel>
            {t('monitor.body.closeTime')} <span className='upStar'>*</span>
          </ItemLabel>
          <SecInputBox times={quizInfo.times} updateQuizInfo={updateQuizInfo} quizInfo={quizInfo} />
          {/* <Input fullWidth type='text' autoComplete='off' id='' /> */}
        </ItemBox>
        {quizInfo.type === 1 ? null : (
          <>
            <ItemBox>
              <ItemLabel>
                {t('monitor.body.fixedKill')} <span className='upStar'>*</span>
              </ItemLabel>
              <QuizFixKillSelector
                fixedKill={fixedKill}
                handleChange={handleFixedKillChange}
                quizInfo={quizInfo}
              />
            </ItemBox>
          </>
        )}
        <LineBox />
        <ItemBox>
          <ItemLabel>
            {t('monitor.body.answerType')} <span className='upStar'>*</span>
          </ItemLabel>
          <QuizSlotSelector slotState={slotState} handleSlotChange={handleSlotChange} quizInfo={quizInfo} />
          {/* <SlotInputBox slotCount={slotCount} setSlotCount={setSlotCount} /> */}
        </ItemBox>
        <QuizVoteBox>
          {[...Array(slotState)].map((_, idx) => {
            return quizInfo.item[idx] ? (
              <QuizSlotInputBox
                idx={idx + 1}
                quizItem={quizInfo.item[idx]}
                updateQuizInfo={updateQuizInfo}
                quizGroupIdx={quizGroupIdx}
                quizInfo={quizInfo}
                calKill={calKill}
                calRate={calRate}
                calCount={calCount}
                lockForQuiz={lockForQuiz}
                isCloseMatch={isCloseMatch}
                quizSocketHandler={quizSocketHandler}
              />
            ) : (
              <></>
            );
          })}
        </QuizVoteBox>
      </QuizMainBox>
    </QuizBody>
  );
};

export default QuizBodyBox;

export const QuizBody = styled.div`
  padding: 30px 40px;
  position: relative;
`;

export const QuizMainHeader = styled.div`
  width: 100%;
  display: flex;
`;
export const QuizMainBox = styled.div`
  width: 100%;
  display: flex;
`;

export const TooltipBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  span {
    font: normal normal normal 15px/21px Noto Sans CJK KR;
    color: ${colors.num_888};
    margin-bottom: 12px;
  }
`;

export const TooltipLabel = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  background-color: ${colors.num_333};
  border-radius: 10px;
  font: normal normal normal 15px/21px Noto Sans CJK KR;
  margin-bottom: 19px;
  padding: 0px 19px;

  input {
    width: 100%;
    color: #fff;
  }
`;

export const ItemBox = styled.div`
  width: 33%;
  min-width: 150px;
  margin-right: 22px;

  .MuiInput-input,
  .MuiSelect-select {
    font: normal normal normal 15px/25px Noto Sans CJK KR;
    ${spacing.paddingX(5)};
    padding-top: 4px;
    padding-bottom: 5px;
    color: ${colors.text} !important;
    background-color: ${colors.num_333} !important;
    border-radius: 10px;
    height: 40px !important;
    display: flex;
    align-items: center;
  }

  .MuiInput-underline,
  .MuiInput-underline:before,
  .MuiInput-underline:hover,
  .MuiInput-underline:hover:before,
  .MuiInput-underline:after {
    border-bottom: none;
  }

  .Mui-disabled {
    -webkit-text-fill-color: ${colors.num_888} !important;
  }
`;

export const ItemLabel = styled.div`
  width: 100%;
  color: ${colors.num_888};
  font: normal normal normal 15px/21px Noto Sans CJK KR;
  margin-bottom: 12px;
  .upStar {
    color: ${colors.main};
  }
`;

export const LineBox = styled.div`
  width: 1px;
  height: auto;
  background-color: #fff;
  margin: 0px 27px 0px 7px;
`;

export const QuizVoteBox = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-evenly;
  margin-top: 33px;
`;
