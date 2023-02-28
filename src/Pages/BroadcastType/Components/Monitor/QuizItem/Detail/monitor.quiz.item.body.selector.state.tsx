import { Input, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';
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

const mappingMatchState = [0, 1, 2, 3, 4];

const QuizStateSelector = ({
  matchState,
  handleChange,
  quizInfo,
}: {
  matchState: number;
  handleChange: (event: SelectChangeEvent<number>) => void;
  quizInfo: IQuizInfo;
}) => {
  const { t } = useTranslation();
  return (
    <Select
      displayEmpty
      value={matchState}
      onChange={handleChange}
      input={<Input fullWidth disableUnderline value={matchState} disabled={quizInfo.state !== 1} />}
      renderValue={(selected) => {
        return t(`monitor.body.gameStateList.${selected}`);
      }}
      MenuProps={MenuProps}
      inputProps={{ 'aria-label': 'Without label' }}
      disabled={quizInfo.state !== 1}
    >
      {mappingMatchState.map((state) => {
        return (
          <MenuItem key={state} value={state} disabled={quizInfo.state !== 1}>
            {t(`monitor.body.gameStateList.${state}`)}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default QuizStateSelector;
