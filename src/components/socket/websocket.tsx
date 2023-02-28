import { Modal } from '@mui/material';
import React, { useEffect, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { userAtom } from '../../recoil/Auth/userAtom';
import { errorAtom } from '../../recoil/errors/errorsAtom';
import { ApiError } from '../../services/axios/axios';
import AlterModalBox from '../Ui/Modal/AlterModalBox';

// 번역처리
const WebSocket = () => {
  const setUser = useResetRecoilState(userAtom);
  const [error, setError] = useRecoilState(errorAtom);
  const resetError = useResetRecoilState(errorAtom);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    resetError();
    setOpen(false);
  };

  useEffect(() => {
    if (!error) return;
    handleOpen();
  }, [error]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <AlterModalBox
        headerText={t(`axios.title.${error?.status.status_code}`)}
        contentText={t(`axios.desc.${error?.status.status_code}`)}
        CancelHandler={handleClose}
      />
    </Modal>
  );
};

export default WebSocket;
