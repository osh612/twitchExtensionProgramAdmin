import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../../Styles/ui';
import ConvertMenuIcon from '../../Ui/menu.convert.icon.menu';

export default function AuthrityButton() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Button
      sx={{
        color: colors.num_ccc,
        width: 113,
      }}
      startIcon={ConvertMenuIcon('authority')}
      onClick={() => {
        navigate('/management');
      }}
    >
      {t('menu.authority')}
    </Button>
  );
}
