import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ReissuanceButton = () => {
  const { t } = useTranslation();
  const onClick = () => {
    // load mutation
  };
  return <Button>{t('codeTraker.table.button.reissuance')}</Button>;
};

export default ReissuanceButton;
