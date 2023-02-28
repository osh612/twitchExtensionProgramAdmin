import styled from '@emotion/styled/macro';
import { Input, Menu, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IQuizInfo, IQuizItem } from '../../../../services/QuizServices';
import { colors, spacing } from '../../../../Styles/ui';
import QuizSlotSelector from '../../Components/Monitor/QuizItem/Detail/monitor.quiz.item.bady.selector.slot';
import QuizStateSelector from '../../Components/Monitor/QuizItem/Detail/monitor.quiz.item.body.selector.state';
import SecInputBox from '../../Components/Monitor/QuizItem/Detail/monitor.quiz.item.bady.input.sec';

const MenuProps = {
  PaperProps: {
    style: {
      // maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      // width: 250,
      backgroundColor: colors.text, // select 메뉴의 컨테이너 색  정할 때  수정.
    },
  },
};

const QuizAddBodyBox = ({
  quizInfo,
  onChangeHandler,
}: {
  quizInfo: IQuizInfo;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { t } = useTranslation();
  const mappingMatchState = [0, 1, 2, 3, 4];
  const [slotState, setSlotState] = useState<number>(quizInfo.item.length);
  const handleSlotChange = (event: SelectChangeEvent<typeof slotState>) => {
    const {
      target: { value },
    } = event;
    setSlotState(+value);

    let copyItems = [...quizInfo.item];
    // 내이름은 강민석

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
      // onChangeHandler({
      //   key: 'item',
      //   data: copyItems,
      // });
    }
  };

  const [matchState, setMatchState] = useState<number>(mappingMatchState[quizInfo.matchState]);
  const handleMatchChange = (event: SelectChangeEvent<typeof matchState>) => {
    const {
      target: { value },
    } = event;
    setMatchState(+value);
    // updateQuizInfo({
    //   key: 'matchState',
    //   data: +value,
    // });
  };

  return (
    <QuizBody>
      {/* <QuizAddtionalDesc>
        <DescHeader>{t('monitor.body.additionalDesc')}</DescHeader>
        <Input fullWidth type='text' autoComplete='off' id='' />
      </QuizAddtionalDesc> */}
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
          {/* <SecInputBox times={quizInfo.times} updateQuizInfo={updateQuizInfo} /> */}
          {/* <Input fullWidth type='text' autoComplete='off' id='' /> */}
        </ItemBox>
        <LineBox />
        <ItemBox>
          <ItemLabel>
            {t('monitor.body.answerType')} <span className='upStar'>*</span>
          </ItemLabel>
          <QuizSlotSelector slotState={slotState} handleSlotChange={handleSlotChange} quizInfo={quizInfo} />
          {/* <SlotInputBox slotCount={slotCount} setSlotCount={setSlotCount} /> */}
        </ItemBox>
        <QuizVoteBox>
          {/* {[...Array(slotState)].map((_, idx) => {
            return (
              <QuizSlotInputBox idx={idx + 1} quizItem={quizInfo.item[idx]} updateQuizInfo={updateQuizInfo} />
            );
          })} */}
        </QuizVoteBox>
      </QuizMainBox>
    </QuizBody>
  );
};

export default QuizAddBodyBox;

const QuizBody = styled.div`
  padding: 35px 40px;
`;

// const QuizAddtionalDesc = styled.div`
//   margin-bottom: 30px;
//   .MuiInput-input {
//     font: normal normal normal 15px/25px Noto Sans CJK KR;
//     ${spacing.paddingY(3.25)};
//     ${spacing.paddingX(5)};
//     color: ${colors.text} !important;
//     background-color: ${colors.num_333} !important;
//     border-radius: 10px;
//   }

//   .MuiInput-underline,
//   .MuiInput-underline:before,
//   .MuiInput-underline:hover,
//   .MuiInput-underline:hover:before,
//   .MuiInput-underline:after {
//     border-bottom: none;
//   }
// `;

// const DescHeader = styled.div`
//   width: 100%;
//   font: normal normal normal 15px/21px Noto Sans CJK KR;
//   color: ${colors.num_888};
//   margin-bottom: 12px;
// `;

const QuizMainBox = styled.div`
  width: 100%;
  display: flex;
`;

const ItemBox = styled.div`
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
`;

const ItemLabel = styled.div`
  width: 100%;
  color: ${colors.num_888};
  font: normal normal normal 15px/21px Noto Sans CJK KR;
  margin-bottom: 12px;
  .upStar {
    color: ${colors.main};
  }
`;

const LineBox = styled.div`
  width: 1px;
  height: auto;
  background-color: #fff;
  margin: 0px 27px 0px 7px;
`;

const QuizVoteBox = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-evenly;
`;
