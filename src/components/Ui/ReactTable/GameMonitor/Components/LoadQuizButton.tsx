import { Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';
import QuizBankServices, { IBank } from '../../../../../services/QuizBankServices';

const LoadQuizButton = ({
  idx,
  setLoadBankData,
}: {
  idx: number;
  setLoadBankData: (loadBankData: IBank) => void;
}) => {
  const { t } = useTranslation();
  const { mutate: getBankData, isLoading } = useMutation(
    (data: { idx: number }) => QuizBankServices.getBankData(data),
    {
      onSuccess: (data) => {
        if (data.bank) {
          setLoadBankData(data.bank);
        }
      },
    },
  );
  const onConfirm = (idx: number) => {
    getBankData({
      idx,
    });
  };

  return (
    <Button
      variant='contained'
      onClick={() => {
        onConfirm(idx);
      }}
      sx={{
        borderRadius: '10px',
        height: '32px',
        font: 'normal normal bold 14px/20px Noto Sans CJK KR',
      }}
    >
      {t('bank.button.quizLoad')}
    </Button>
  );
};

export default LoadQuizButton;
