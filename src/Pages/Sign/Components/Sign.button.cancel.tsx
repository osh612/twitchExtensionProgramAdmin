import { Box, Button, Modal } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ConfirmModalBox from '../../../components/Ui/Modal/ConfirmModalBox';
import { colors } from '../../../Styles/ui';

const SignCancelButton = ({ title }: { title: string }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const goLogin = () => {
    navigate('/login');
    handleClose();
  };

  return (
    <>
      <Button
        variant='contained'
        fullWidth
        color='cancel'
        onClick={handleOpen}
        sx={{
          borderRadius: '10px',
          marginTop: '20px',
          padding: '15px 0 14px 0',
          font: 'normal normal bold 15px/25px Noto Sans CJK KR',
          marginRight: '7px',
          color: colors.text,
          ':hover': {
            color: colors.text,
          },
        }}
      >
        {t('common.button.cancel')}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <ConfirmModalBox
          headerText={t(`sign.cancel.title.${title}`)}
          contentText={t('sign.cancel.desc')}
          CancelHandler={handleClose}
          ConfirmHandler={goLogin}
        />
      </Modal>
    </>
  );
};

export default SignCancelButton;
