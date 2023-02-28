import styled from '@emotion/styled/macro';
import { Button, Modal } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SignboardAcceptModalBox from '../../../Modal/SignboardAcceptModalBox';
import SignboardRejectModalBox from '../../../Modal/SignboardRejectModalBox';

interface ISignboardButtonParam {
  uid: string;
  idx: number;
  content: string;
}

const RejectButton = ({ uid, idx, content }: ISignboardButtonParam) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button
        variant='contained'
        onClick={handleOpen}
        sx={{
          margin: '0 10px',
        }}
      >
        {t('common.reject')}
      </Button>
      <Modal open={open} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <SignboardRejectModalBox userId={uid} idx={idx} content={content} CancelHandler={handleClose} />
      </Modal>
    </>
  );
};

const AcceptButton = ({ uid, idx, content }: ISignboardButtonParam) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button
        variant='contained'
        onClick={handleOpen}
        sx={{
          margin: '0 10px',
        }}
      >
        {t('common.confirm')}
      </Button>
      <Modal open={open} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <SignboardAcceptModalBox userId={uid} idx={idx} content={content} CancelHandler={handleClose} />
      </Modal>
    </>
  );
};

export const SignboardButtonBox = ({ uid, idx, content }: ISignboardButtonParam) => {
  return (
    <Wrapper>
      <RejectButton uid={uid} idx={idx} content={content} />
      <AcceptButton uid={uid} idx={idx} content={content} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
}
`;
