import { IconButton, Modal, Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCallback, useState } from 'react';
import styled from '@emotion/styled/macro';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { colors } from '../../../Styles/ui';
import ManagementServices, {
  IManagementCommonParam,
  IManagementDeleteSuccess,
} from '../../../services/ManagementServices';
import LineBreak from '../../../components/Ui/LineBreak';
import { MODAL_STYLE } from '../../../lib/Ui/ModalCss';

const buttonStyle = {
  width: '100%',
  height: '50px',
  margin: '0px 10px',
  borderRadius: '10px',
};

const DeleteAccountButton = ({ values, idx }: { values: any; idx: number }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { mutate: deleteManagement, isLoading } = useMutation(
    (data: IManagementCommonParam) => ManagementServices.deleteManagement(data),
    {
      onSuccess: (data: IManagementDeleteSuccess) => {
        handleClose();
      },
    },
  );

  const onConfirm = () => {
    deleteManagement({ uid: values.uid, idx });
  };

  return (
    <>
      <IconButton
        onClick={() => {
          handleOpen();
        }}
      >
        <DeleteIcon
          sx={{
            color: colors.text,
            width: '20px',
            height: '20px',
            ':hover': {
              color: colors.main,
            },
          }}
          fontSize='inherit'
        />
      </IconButton>
      <Modal open={open} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <Box sx={MODAL_STYLE}>
          <Header>{t('common.caution')}</Header>
          <Body>
            <LineBreak text={t('management.deleteAccount.desc').replace('@', values.uid)} />
          </Body>
          <ButtonBox>
            <Button
              onClick={handleClose}
              variant='contained'
              sx={{
                ...buttonStyle,
                backgroundColor: colors.num_444,
                ':hover': {
                  backgroundColor: colors.num_888,
                },
              }}
            >
              {t('common.button.cancel')}
            </Button>
            <Button sx={buttonStyle} variant='contained' onClick={onConfirm}>
              {t('common.button.confirm')}
            </Button>
          </ButtonBox>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteAccountButton;

const Header = styled.div`
  font: normal normal bold 18px/26px Noto Sans CJK KR;
  // border-bottom: solid 1px ${colors.num_444};
  width: 100%;
  padding: 24px;
  text-align: center;
  color: ${colors.text};
`;

const Body = styled.div`
  color: ${colors.text};
  text-align: center;
  font: normal normal normal 15px/21px Noto Sans CJK KR;
`;

const ButtonBox = styled.div`
  padding: 30px;
  display: flex;
`;
