import { IconButton, Modal, Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCallback, useState } from 'react';
import styled from '@emotion/styled/macro';
import { useTranslation } from 'react-i18next';

import ConfirmModalBox from '../../../Modal/ConfirmModalBox';
import { IconCss } from '../../../../../lib/Ui/IconCss';

const DeleteQuizButton = ({ selectedUid, idx }: { selectedUid: string; idx: number }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const ConfirmHandler = () => {
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={() => {
          handleOpen();
        }}
      >
        <DeleteIcon sx={IconCss} fontSize='inherit' />
      </IconButton>
      <Modal open={open} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <ConfirmModalBox
          headerText={t('bank.table.delete.title')}
          contentText={t('bank.table.delete.desc')}
          CancelHandler={handleClose}
          ConfirmHandler={ConfirmHandler}
        />
      </Modal>
    </>
  );
};

export default DeleteQuizButton;
