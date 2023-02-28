import {
  IconButton,
  Modal,
  Typography,
  Box,
  Button,
  FormControl,
  Select,
  OutlinedInput,
  Chip,
  MenuItem,
  SelectChangeEvent,
  Theme,
  Input,
} from '@mui/material';
import { useTheme } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled/macro';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import { colors, spacing } from '../../../Styles/ui';
import ManagementServices, {
  IAccountDetail,
  IManagementUpdateParam,
  IManagementUpdateSuccess,
} from '../../../services/ManagementServices';
import {
  broadcastTypeList,
  getAccountGrade,
  getAccountGradeKey,
  getAccountState,
  getAccountStateKey,
  getBroadcastType,
  getBroadcastTypeeKey,
  gradeList,
  stateList,
} from '../lib/Management.list-set';

import gameAtom, { Ileague } from '../../../recoil/game/gameAtom';
import AccountEditModalBox from '../../../components/Ui/Modal/AccountEditModalBox';

const EditAccountButton = ({ uid, getDataList }: { uid: string; getDataList: () => void }) => {
  const [detail, setDetail] = useState<IAccountDetail>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const { mutate: getManagementDetail, isLoading } = useMutation(
    (data: { uid: string }) => ManagementServices.getManagementDetail(data),
    {
      onSuccess: (data) => {
        setDetail(data.managementDetail);
      },
    },
  );

  const handleClose = () => {
    setOpen(false);
    setDetail(undefined);
    getDataList();
  };

  useEffect(() => {
    if (open) {
      getManagementDetail({ uid });
    }
  }, [open]);

  return (
    <>
      <IconButton
        onClick={() => {
          handleOpen();
        }}
      >
        <EditIcon
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
      {detail ? (
        <Modal open={!!detail} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
          <AccountEditModalBox detail={detail} handleClose={handleClose} />
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};

export default EditAccountButton;
