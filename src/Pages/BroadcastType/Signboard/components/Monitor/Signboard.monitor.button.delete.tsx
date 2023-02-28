import { Button, Modal } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@mui/icons-material/Delete';
import { colors } from '../../../../../Styles/ui';
import ConfirmModalBox from '../../../../../components/Ui/Modal/ConfirmModalBox';

const DeletContentButton = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        startIcon={<DeleteIcon sx={{ width: 24, height: 24, color: colors.num_888, paddingBottom: '2px' }} />}
        sx={{ p: 0, color: colors.num_888 }}
        onClick={handleOpen}
      >
        {t('signboard.label.delete')}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <ConfirmModalBox
          headerText={t('signboard.label.delete')}
          contentText={t('signboard.desc.delete')}
          CancelHandler={handleClose}
          ConfirmHandler={handleClose}
          ConfirmText={t('signboard.label.delete')}
        />
      </Modal>
    </>
  );
};

export default DeletContentButton;
