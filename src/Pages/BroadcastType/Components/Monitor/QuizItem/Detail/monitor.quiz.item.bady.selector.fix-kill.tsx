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
  fixedKill,
  handleChange,
  quizInfo,
}: {
  fixedKill: number;
  handleChange: (event: SelectChangeEvent<number>) => void;
  quizInfo: IQuizInfo;
}) => {
  const fixedKillList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { t } = useTranslation();
  return (
    <Select
      fullWidth
      displayEmpty
      value={fixedKill}
      onChange={handleChange}
      input={<Input disableUnderline value={fixedKill} disabled={quizInfo.state !== 1}/>}
      renderValue={selected => {
        return t(`monitor.body.fixKillSlotList.${selected}`);
      }}
      MenuProps={MenuProps}
      inputProps={{ 'aria-label': 'Without label' }}
    >
      <MenuItem key={0} value={0}>
        {t(`monitor.body.fixKillSlotList.0`)}
      </MenuItem>
      {fixedKillList.map(state => {
        return (
          <MenuItem key={state} value={state} disabled={quizInfo.state !== 1}>
            {t(`monitor.body.fixKillSlotList.${state}`)}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default QuizSlotSelector;
