import styled from '@emotion/styled';
import StopCircle from '@mui/icons-material/StopCircle';
import { Button, Modal } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import ConfirmModalBox from '../../../../../components/Ui/Modal/ConfirmModalBox';
import { permissionsAtom, userAtom } from '../../../../../recoil/Auth/userAtom';
import QuizServices, { IAddQuizParam } from '../../../../../services/QuizServices';
import { stompPublish, stompSubscribe, stompUnSubscribe } from '../../../../../services/socket/webSocket';

const SettleQuizButtonBox = ({
  quizGroupIdx,
  orders,
  tab,
  lockForQuiz,
  isCloseMatch,
  onIndiHandler,
}: {
  quizGroupIdx: number;
  orders: number;
  tab: number;
  lockForQuiz: boolean;
  isCloseMatch: boolean;
  onIndiHandler: () => void;
}) => {
  const user = useRecoilValue(userAtom);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t } = useTranslation();

  const quizSettle = () => {
    const settleData = {
      quizGroupIdx,
      setNum: tab + 1,
    };
    const settleSubscribe = stompSubscribe(`/subscribe/${user?.broadcastId}/extension/quiz/settle`, (res) => {
      onIndiHandler();
      settleSubscribe.unsubscribe();
    });
    stompPublish('/send/extension/quiz/settle', settleData);
    handleClose();
  };

  return (
    <>
      <Warpper>
        <Button variant='contained' onClick={handleOpen} disabled={lockForQuiz || isCloseMatch}>
          {t('monitor.footer.settle.title')}
        </Button>
      </Warpper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <ConfirmModalBox
          headerText={t('monitor.footer.settle.title')}
          contentText={t('monitor.footer.settle.desc')}
          CancelHandler={handleClose}
          ConfirmHandler={() => quizSettle()}
        />
      </Modal>
    </>
  );
};

export default SettleQuizButtonBox;

const Warpper = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
