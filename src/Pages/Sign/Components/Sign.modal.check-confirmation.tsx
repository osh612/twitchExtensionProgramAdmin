import { Modal } from '@mui/material';
import React, { useEffect, useCallback, useState, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import AlterModalBox from '../../../components/Ui/Modal/AlterModalBox';

interface props {
  open: boolean;
  close: () => void; // 함수 타입 정의할 때
}

// 번역처리
const CheckConfirmationModal = (props: props): ReactElement => {
  const { open, close } = props;
  const { t } = useTranslation();
  const [opener, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    close()
};

  useEffect(() => {
    if (!open) return;
    handleOpen();
  }, [open]);

  return (
    <Modal
      open={opener}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <AlterModalBox
        headerText={t('sign.twitchAuth.modalTitle')}
        contentText={t('sign.twitchAuth.modalContent')}
        CancelHandler={handleClose}
      />
    </Modal>
  );
};

export default CheckConfirmationModal;
