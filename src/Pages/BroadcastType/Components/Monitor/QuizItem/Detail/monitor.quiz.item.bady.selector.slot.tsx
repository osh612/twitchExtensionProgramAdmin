import { Input, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import QuizAtom from '../../../../../../recoil/quiz/quizAtom';
import { IQuizInfo } from '../../../../../../services/QuizServices';
import { colors } from '../../../../../../Styles/ui';

const MenuProps = {
  PaperProps: {
    style: {
      // maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      // width: 250,
      backgroundColor: colors.text, // select 메뉴의 컨테이너 색  정할 때  수정.
    },
  },
};

const QuizSlotSelector = ({
  slotState,
  handleSlotChange,
  quizInfo,
}: {
  slotState: number;
  handleSlotChange: (event: SelectChangeEvent<number>) => void;
  quizInfo: IQuizInfo;
}) => {
  const quizTypeList = useRecoilValue(QuizAtom.quizTypeList);
  const { t } = useTranslation();

  const getGameSlotListText = (selectnum: number) => {
    return selectnum === 0
      ? `${t('monitor.body.gameSlotList.select')}`
      : `${selectnum}${t('monitor.body.gameSlotList.selected')}`;
  };

  return (
    <Select
      fullWidth
      displayEmpty
      value={slotState}
      onChange={handleSlotChange}
      input={<Input disableUnderline value={slotState} disabled={quizInfo.state !== 1} />}
      renderValue={(selected) => {
        return getGameSlotListText(selected);
      }}
      MenuProps={MenuProps}
      inputProps={{ 'aria-label': 'Without label' }}
    >
      <MenuItem key={0} value={0}>
        {t(`monitor.body.gameSlotList.select`)}
      </MenuItem>
      {quizTypeList.map((state) => {
        return (
          <MenuItem key={state.selectnum} value={state.selectnum}>
            {getGameSlotListText(state.selectnum)}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default QuizSlotSelector;
