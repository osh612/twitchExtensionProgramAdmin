import { Button, Modal } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import ConfirmModal2Box from '../../../../../components/Ui/Modal/ConfirmModal2Box';
import { colors } from '../../../../../Styles/ui';
import ConfirmModalBox from '../../../../../components/Ui/Modal/ConfirmModalBox';
import SignBoardServices, { ISignboardShutdown } from '../../../../../services/SignBoardServices';

interface ISignboardEmergencyButtonParam {
  idx: number;
}

const EmergencyButton = ({ idx }: ISignboardEmergencyButtonParam) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    handleConfirm();
  };

  const handleConfirm = () => {
    const param: ISignboardShutdown = {
      idx,
    };
    SignBoardServices.shutdownSignBoard(param);
  };

  return (
    <>
      <Button
        startIcon={
          <StopCircleOutlinedIcon
            sx={{ width: 24, height: 24, color: colors.num_888, paddingBottom: '2px' }}
          />
        }
        sx={{ p: 0, color: colors.num_888 }}
        onClick={handleOpen}
      >
        {t('signboard.label.emergancy')}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <ConfirmModalBox
          headerText={t('signboard.label.emergancy')}
          contentText={t('signboard.desc.emergancy')}
          CancelHandler={handleClose}
          ConfirmHandler={handleClose}
          ConfirmText={t('signboard.label.emergancy')}
        />
      </Modal>
    </>
  );
};

export default EmergencyButton;
