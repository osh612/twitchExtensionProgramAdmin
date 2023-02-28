import { Button, Modal } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import UploadQuizModalBox from '../../../../components/Ui/Modal/UploadQuizModalBox';

const UploadQuizButton = ({
  buttonCss,
}: {
  buttonCss: { padding: string; height: number; borderRadius: string };
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        color='normal'
        variant='contained'
        sx={{ ...buttonCss, marginRight: '20px' }}
        onClick={handleOpen}
      >
        {t('bank.uploadQuiz.title')}
      </Button>
      <Modal open={open}>
        <UploadQuizModalBox handleClose={handleClose} />
      </Modal>
    </>
  );
};

export default UploadQuizButton;
