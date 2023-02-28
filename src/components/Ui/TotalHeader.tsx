import styled from '@emotion/styled/macro';
import { colors } from '../../Styles/ui';

const TotalHeader = ({ text }: { text: string }) => {
  return <Total>{text}</Total>;
};

export default TotalHeader;

const Total = styled.div`
  font: normal normal normal 15px/21px Noto Sans CJK KR;
  color: ${colors.num_ccc};
`;
