import { colors } from '../../Styles/ui';

export const MODAL_STYLE = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: colors.num_222,
  border: `2px solid ${colors.num_444}`,
  borderRadius: '10px',
};
