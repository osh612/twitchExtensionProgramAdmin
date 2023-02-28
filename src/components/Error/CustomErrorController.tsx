import { Modal } from '@mui/material';
import React, { useEffect, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { userAtom } from '../../recoil/Auth/userAtom';
import { customErrAtom, errorAtom } from '../../recoil/errors/errorsAtom';
import { ApiError } from '../../services/axios/axios';
import { client, stompSubscribe } from '../../services/socket/webSocket';
import AlterModalBox from '../Ui/Modal/AlterModalBox';

// 번역처리
const CustomErrorController = () => {
  const user = useRecoilValue(userAtom);
  const [error, setError] = useRecoilState(errorAtom);
  const [customErr, setCustomErr] = useRecoilState(customErrAtom);
  const resetError = useResetRecoilState(errorAtom);
  const resetCustomError = useResetRecoilState(customErrAtom);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if (error) {
      resetError();
    }
    if (customErr) {
      resetCustomError();
    }
    setOpen(false);
  };

  useEffect(() => {
    if (user && client.connected) {
      // 테스트 필요
      stompSubscribe(
        `/subscribe/${user?.broadcastId}/admin/error`,
        (res) => {
          console.log(res);
          setCustomErr({
            statusCode: 'socket-error',
            message: 'socket-error',
          });
        },
        { id: 'errorSocket' },
      );
    }
  }, [client]);

  useEffect(() => {
    if (!error && !customErr) return;
    handleOpen();
  }, [error, customErr]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <>
        {error ? (
          <AlterModalBox
            headerText={t(`axios.title.${error?.status.status_code}`)}
            contentText={t(`axios.desc.${error?.status.status_code}`)}
            CancelHandler={handleClose}
          />
        ) : (
          <></>
        )}
        {customErr ? (
          <AlterModalBox
            headerText={t(`customErr.title.${customErr.statusCode}`)}
            contentText={t(`customErr.desc.${customErr.statusCode}`)}
            CancelHandler={handleClose}
          />
        ) : (
          <></>
        )}
      </>
    </Modal>
  );
};

export default CustomErrorController;
