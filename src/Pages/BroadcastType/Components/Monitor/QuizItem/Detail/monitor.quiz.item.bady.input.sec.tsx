import styled from '@emotion/styled';
import { InputBase } from '@mui/material';
import { useEffect, useState } from 'react';
import { IQuizInfo } from '../../../../../../services/QuizServices';
import { colors, spacing } from '../../../../../../Styles/ui';

const SecInputBox = ({
  times,
  updateQuizInfo,
  quizInfo,
}: {
  times: number;
  updateQuizInfo: ({ key, data }: { key: any; data: any }) => void;
  quizInfo: IQuizInfo;
}) => {
  const [time, setTime] = useState<number>(times);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (+value <= 600) {
      updateQuizInfo({
        key: 'times',
        data: value,
      });
    }
  };

  useEffect(() => {
    setTime(times);
  }, [times]);

  return (
    <SecTimeWrapper>
      <InputBase
        fullWidth
        type='text'
        autoComplete='off'
        id=''
        value={time}
        onChange={onChange}
        disabled={quizInfo.state !== 1}
      />
      <SecLabel>Sec</SecLabel>
    </SecTimeWrapper>
  );
};

export default SecInputBox;

export const SecTimeWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  color: ${colors.text} !important;
  background-color: ${colors.num_333} !important;
  border-radius: 10px;

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

export const SecLabel = styled.label`
  color: #929292;
  padding-right: 20px;
  font: normal normal normal 15px/21px Noto Sans CJK KR;
`;
