import styled from '@emotion/styled/macro';
import { colors } from '../../../../../../Styles/ui';

const QuizQuestionLabel = ({ text, marginTop }: { text: string; marginTop?: number }) => {
  return <Wrapper marginTop={marginTop}>{text}</Wrapper>;
};

export default QuizQuestionLabel;

const Wrapper = styled.div<{ marginTop: number | undefined }>`
  padding: 5px 6px 4px;
  ${({ marginTop }) => (marginTop ? `margin-top: ${marginTop}px;` : '')}
  margin-bottom: 1px;
  height: 30px;
  background-color: ${colors.live_active};
  font: normal normal normal 15px/21px Noto Sans CJK KR;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  white-space: nowrap;
  margin-right: 10px;
`;
