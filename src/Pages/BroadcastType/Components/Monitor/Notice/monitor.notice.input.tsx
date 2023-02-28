import styled from '@emotion/styled/macro';
import { Box, Button, LinearProgress, linearProgressClasses, Modal } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { CustomInput } from '../../../../../components/Ui/CustomInput';
import ConfirmModal2Box from '../../../../../components/Ui/Modal/ConfirmModal2Box';
import { userAtom } from '../../../../../recoil/Auth/userAtom';
import { stompPublish, stompSubscribe } from '../../../../../services/socket/webSocket';
import { colors } from '../../../../../Styles/ui';
import { INoticeSocketHandlerParam, INoticeSocketParam } from '../monitor.notice';
import SendModalBox from './Modal/monitor.notice.modal.send';

const buttonCss = {
  width: 'auto',
  borderRadius: '10px',
  height: 50,
  padding: '13px 26px',
  margin: '0 40px 0 14px',
  whiteSpace: 'nowrap',
};

const NoticeInputBox = ({
  onNoticeSocketHandler,
  isCloseMatch,
}: {
  onNoticeSocketHandler: (data: INoticeSocketHandlerParam) => void;
  isCloseMatch: boolean;
}) => {
  const { t } = useTranslation();
  const [notice, setNotice] = useState<string>('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === 'notice') {
      setNotice(value);
    }
  };

  const onConfirm = () => {
    onNoticeSocketHandler({
      message: notice,
      resend: false,
    });
    handleClose();
  };

  return (
    <>
      <Wrapper>
        <Label>{t('monitor.notice.input.label')}</Label>
        <InputBox>
          <CustomInput
            onChange={onChangeInput}
            name='notice'
            value={notice}
            placeholder={t('monitor.notice.input.placeholder')}
            inputProps={{ maxlength: 50 }}
          />
        </InputBox>
        <Button variant='contained' sx={buttonCss} onClick={handleOpen} disabled={isCloseMatch}>
          {t('monitor.notice.input.submit')}
        </Button>
      </Wrapper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <SendModalBox
          headerType='send'
          contentText={notice}
          CancelHandler={handleClose}
          ConfirmHandler={onConfirm}
        />
      </Modal>
    </>
  );
};

export default NoticeInputBox;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
  width: 100%;
  height: 96px;
  border: 1px solid ${colors.rt_boundary};
  padding: 32px 0px;
  border-radius: 3px;
  margin-bottom: 26.6px;
`;

const Label = styled.label`
  padding: 0 28px 0 40px;
  color: ${colors.text};
  white-space: nowrap;
  font: normal normal bold 16px/24px Noto Sans CJK KR;
`;
const InputBox = styled.div`
  width: 85%;
`;
