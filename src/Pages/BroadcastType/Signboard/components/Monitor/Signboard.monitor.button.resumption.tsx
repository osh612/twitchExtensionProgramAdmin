import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import { Button, Modal } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { colors } from '../../../../../Styles/ui';
import ConfirmModalBox from '../../../../../components/Ui/Modal/ConfirmModalBox';
import SignBoardServices from '../../../../../services/SignBoardServices';

interface ISignboardResumptionButtonParam {
  idx: number;
  content: string;
}

const ResumptionButton = ({ idx, content }:ISignboardResumptionButtonParam) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    handleConfirm()
  };
  const handleConfirm = () => {
    const param = {
      idx,
      sign: content,
    }
    SignBoardServices.restartSignBoard(param)
  }

  return (
    <>
      <Button
        startIcon={
          <PlayCircleFilledWhiteOutlinedIcon
            sx={{ width: 24, height: 24, color: colors.num_888, paddingBottom: '2px' }}
          />
        }
        sx={{ p: 0, color: colors.num_888, marginRight: '12px' }}
        onClick={handleOpen}
      >
        {t('signboard.label.resumption')}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <ConfirmModalBox
          headerText={t('signboard.label.resumption')}
          contentText={t('signboard.desc.resumption')}
          CancelHandler={handleClose}
          ConfirmHandler={handleClose}
          ConfirmText={t('signboard.label.resumption')}
        />
      </Modal>
    </>
  );
};

export default ResumptionButton;
