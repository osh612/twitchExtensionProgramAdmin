import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

const NoDataBox = ({ desc }: { desc: string }) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <div>a</div>
      <div>{desc}</div>
    </Wrapper>
  );
};

export default NoDataBox;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 40px;
`;
