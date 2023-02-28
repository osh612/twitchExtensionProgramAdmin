import styled from '@emotion/styled/macro';
import { Button, Modal } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import AccountConfirmModalBox from '../../../components/Ui/Modal/AccountConfirmModalBox';
import AccountRejectModalBox from '../../../components/Ui/Modal/AccountRejectModalBox';

const JoinAcceptButton = ({ values, getDataList }: { values: any; getDataList: () => void }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<string>('');
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMode(event.currentTarget.id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    getDataList();
    setMode('');
  };

  const getModalBox = (mode: string) => {
    if (mode === 'confirm') return <AccountConfirmModalBox values={values} CancelHandler={handleClose} />;
    if (mode === 'reject')
      return <AccountRejectModalBox userId={values.id} idx={values.idx} CancelHandler={handleClose} />;
    return <></>;
  };

  return (
    <Wrapper>
      <Button
        variant='contained'
        color='primary'
        id='confirm'
        sx={{
          borderRadius: '10px',
          margin: '0 4px',
        }}
        onClick={handleOpen}
      >
        {t('common.confirm')}
      </Button>
      <Button
        variant='contained'
        color='error'
        id='reject'
        sx={{
          borderRadius: '10px',
          margin: '0 4px',
        }}
        onClick={handleOpen}
      >
        {t('common.reject')}
      </Button>
      <Modal open={open}>{getModalBox(mode)}</Modal>
    </Wrapper>
  );
};

export default JoinAcceptButton;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
