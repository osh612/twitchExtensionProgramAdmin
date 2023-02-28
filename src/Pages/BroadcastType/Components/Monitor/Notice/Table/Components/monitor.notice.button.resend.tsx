import { Button, IconButton, Modal } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { INoticeSocketHandlerParam, INoticeSocketParam } from '../../../monitor.notice';
import SendModalBox from '../../Modal/monitor.notice.modal.send';

const ResendButton = ({
  idx,
  selectedUid,
  message,
  onNoticeSocketHandler,
  isCloseMatch,
}: {
  idx: number;
  selectedUid: string;
  message: string;
  onNoticeSocketHandler: (data: INoticeSocketHandlerParam) => void;
  isCloseMatch: boolean;
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onConfirm = () => {
    onNoticeSocketHandler({
      message,
      resend: true,
    });
    handleClose();
  };

  return (
    <>
      <Button
        variant='contained'
        onClick={() => {
          handleOpen();
        }}
        sx={{
          borderRadius: '10px',
          height: '32px',
          font: 'normal normal bold 14px/20px Noto Sans CJK KR',
        }}
        disabled={isCloseMatch}
      >
        {t('monitor.notice.table.resend')}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <SendModalBox
          headerType='resend'
          contentText={message}
          CancelHandler={handleClose}
          ConfirmHandler={onConfirm}
        />
      </Modal>
    </>
  );
};

export default ResendButton;
