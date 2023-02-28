import styled from '@emotion/styled';
import { colors } from '../../Styles/ui';

const LabelIcon = ({ text, color }: { text: string; color?: string }) => {
  return <Icon color={color}>{text}</Icon>;
};

export default LabelIcon;

const Icon = styled.div<{ color: string | undefined }>`
  padding: 5px 15px 4px 15px;
  background-color: ${({ color }) => color || colors.main};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 11px;
  margin: 0 12px;
  white-space: nowrap;
`;
