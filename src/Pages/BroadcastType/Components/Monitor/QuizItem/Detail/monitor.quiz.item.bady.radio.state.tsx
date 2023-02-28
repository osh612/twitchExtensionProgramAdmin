import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { colors } from '../../../../../../Styles/ui';
import { IQuizInfo } from '../../../../../../services/QuizServices';

const QuizStateRadioCss = {
  color: colors.text,
};

interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked: boolean;
}

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  '.MuiFormControlLabel-label': checked && {
    color: colors.main,
  },
}));

function MyFormControlLabel(props: FormControlLabelProps) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    const { value } = props;
    checked = radioGroup.value === value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

const QuizStateRadioBox = ({
  quizInfo,
  updateQuizInfo,
}: {
  quizInfo: IQuizInfo;
  updateQuizInfo: ({ key, data }: { key: any; data: any }) => void;
}) => {
  const { t } = useTranslation();
  const [quizType, setQuizType] = useState<number>(quizInfo.type);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (quizInfo.state === 1) {
      setQuizType(+e.target.value);
      updateQuizInfo({ key: 'type', data: +e.target.value });
    }
  };

  React.useEffect(() => {
    setQuizType(quizInfo.type);
  }, [quizInfo.type]);

  return (
    <Wrapper>
      <RadioGroup
        row
        aria-labelledby='demo-row-radio-buttons-group-label'
        name='row-radio-buttons-group'
        onChange={handleChange}
        value={quizType}
      >
        <MyFormControlLabel
          value={1}
          control={<Radio sx={QuizStateRadioCss} />}
          label={t('monitor.body.radioGroup.competition')}
        />
        <MyFormControlLabel
          value={2}
          control={<Radio sx={QuizStateRadioCss} />}
          label={t('monitor.body.radioGroup.trivia')}
        />
        <MyFormControlLabel
          value={3}
          control={<Radio sx={QuizStateRadioCss} />}
          label={t('monitor.body.radioGroup.simple')}
        />
      </RadioGroup>
    </Wrapper>
  );
};

export default QuizStateRadioBox;

const Wrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 30px;
  display: flex;
`;
