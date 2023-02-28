import styled from '@emotion/styled/macro';
import { Button, Modal } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SignboardAcceptModalBox from '../../../../../components/Ui/Modal/SignboardAcceptModalBox';
import SignboardRejectModalBox from '../../../../../components/Ui/Modal/SignboardRejectModalBox';
import { colors } from '../../../../../Styles/ui';

interface ISignboardButtonParam extends IGetSignboardButtonParam {
  state: number;
}

interface IGetSignboardButtonParam {
  uid: string;
  idx: number;
  content: string;
}

const ButtonCss = {
  height: 42,
  padding: '11px 26px',
  borderRadius: '10px',
  color: colors.text,
  whiteSpace: 'nowrap',
  font: 'normal normal bold 14px/20px Noto Sans CJK KR',
};

const RejectButton = ({ uid, idx, content }: IGetSignboardButtonParam) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button
        fullWidth
        variant='outlined'
        onClick={handleOpen}
        color='normal'
        sx={{
          ...ButtonCss,
          margin: '6px 0px',
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

const AcceptButton = ({ uid, idx, content }: IGetSignboardButtonParam) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button
        fullWidth
        variant='outlined'
        color='normal'
        onClick={handleOpen}
        sx={{
          ...ButtonCss,
          margin: '6px 0',
        }}
      >
        {t('signboard.button.post')}
      </Button>
      <Modal open={open} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <SignboardAcceptModalBox userId={uid} idx={idx} content={content} CancelHandler={handleClose} />
      </Modal>
    </>
  );
};

const PostingButton = () => {
  const { t } = useTranslation();

  return (
    <>
      <Button fullWidth variant='contained' sx={ButtonCss}>
        {t('signboard.button.posting')}
      </Button>
    </>
  );
};

const RejectedButton = () => {
  const { t } = useTranslation();
  return (
    <>
      <Button fullWidth color='reject' variant='contained' sx={ButtonCss}>
        {t('common.reject')}
      </Button>
    </>
  );
};

const StoppingButton = () => {
  const { t } = useTranslation();
  return (
    <>
      <Button fullWidth color='stopping' variant='contained' sx={ButtonCss}>
        {t('signboard.button.stopping')}
      </Button>
    </>
  );
};

const getSignboardButton = ({ uid, idx, content, state }: ISignboardButtonParam) => {
  if (state === 0) {
    return (
      <>
        <AcceptButton uid={uid} idx={idx} content={content} />
        <RejectButton uid={uid} idx={idx} content={content} />
      </>
    );
  }
  if (state === 1) {
    return <PostingButton />;
  }
  if (state === 2) {
    return <RejectedButton />;
  }
  if (state === 3) {
    return <StoppingButton />;
  }

  return <></>;
};

export const SignboardButtonBox = ({ content, uid, idx, state = NaN }: ISignboardButtonParam) => {
  return <Wrapper>{getSignboardButton({ uid, idx, content, state })}</Wrapper>;
};

const Wrapper = styled.div`
  min-width: 130px;
  padding: 20px;
  border-right: solid 1px ${colors.wall};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
