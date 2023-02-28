import {
  IconButton,
  Modal,
  Typography,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Chip,
  MenuItem,
  SelectChangeEvent,
  Theme,
} from '@mui/material';
import { useTheme } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import { useCallback, useState } from 'react';
import styled from '@emotion/styled/macro';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { colors } from '../../../Styles/ui';
import ManagementServices, {
  IManagementCreateParam,
  IManagementCreateSuccess,
  IManagementUpdateParam,
  IManagementUpdateSuccess,
} from '../../../services/ManagementServices';
import { MODAL_STYLE } from '../../../lib/Ui/ModalCss';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  sx: {
    '&& .Mui-selected': {
      backgroundColor: colors.main,
      color: colors.text,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const buttonStyle = {
  width: '100%',
  height: '50px',
  margin: '0px 10px',
  borderRadius: '10px',
};
const AddAccountButton = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { mutate: createManagement, isLoading } = useMutation(
    (data: IManagementCreateParam) => ManagementServices.createManagement(data),
    {
      onSuccess: (data: IManagementCreateSuccess) => {
        handleClose();
      },
    },
  );

  const [uid, setUid] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [gameList, setGameList] = useState<string[]>([]);
  const [grade, setGrade] = useState<number>(0);

  const handleChangeInput = useCallback((e: any) => {
    const { value, name } = e.target;
    if (name === 'uid') {
      setUid(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  }, []);

  const handleChange = (event: SelectChangeEvent<typeof gameList>) => {
    const {
      target: { value },
    } = event;
    setGameList(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleGradeChange = (event: SelectChangeEvent) => {
    setGrade(+event.target.value as number);
  };

  const onConfirm = () => {
    const game: any[] = [];

    // eslint-disable-next-line array-callback-return
    gameList.map((value) => {
      game.push({
        game: value,
      });
    });

    const param: IManagementCreateParam = {
      uid,
      password,
      securityLevel: grade,
      game,
    };
    createManagement(param);
  };

  return (
    <>
      <Button
        variant='outlined'
        sx={{
          color: colors.text,
          borderColor: colors.text,
          ':hover': {
            color: colors.main,
          },
        }}
        onClick={handleOpen}
      >
        {t('management.addAccount')}
      </Button>
      <Modal open={open} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <Box sx={MODAL_STYLE}>
          <Header>{t('management.accountFunc.edit')}</Header>
          <Body>
            <InputBox>
              <AccountLabel>ID</AccountLabel>
              <Input
                defaultValue=''
                type='text'
                name='uid'
                autoComplete='off'
                onChange={handleChangeInput}
                placeholder='ID'
              />
            </InputBox>
            <InputBox>
              <AccountLabel>PASSWORD</AccountLabel>
              <Input
                defaultValue=''
                type='password'
                name='password'
                autoComplete='off'
                onChange={handleChangeInput}
                placeholder='PASSWORD'
              />
            </InputBox>
            <FormControl
              sx={{
                width: '95%',
                color: colors.text,
                ':hover': {
                  borderColor: colors.text,
                },
                margin: '10px 0',
              }}
            >
              <InputLabel sx={{ color: colors.text, borderColor: colors.text }}>GAME</InputLabel>
              <Select
                sx={{
                  borderColor: colors.text,
                  ':hover': {
                    borderColor: colors.text,
                  },
                }}
                labelId='demo-multiple-chip-label'
                id='demo-multiple-chip'
                multiple
                value={gameList}
                onChange={handleChange}
                input={<OutlinedInput sx={{ color: colors.text }} />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, color: colors.text }}>
                    {selected.map((value) => (
                      <SelectedLabel>{value}</SelectedLabel>
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              sx={{
                width: '95%',
                color: colors.text,
                ':hover': {
                  borderColor: colors.text,
                },
                margin: '10px 0',
              }}
            >
              <InputLabel sx={{ color: colors.text, borderColor: colors.text }}>
                {t('management.accountTable.header.grade')}
              </InputLabel>
              <Select
                sx={{
                  borderColor: colors.text,
                  color: colors.text,
                  ':hover': {
                    borderColor: colors.text,
                  },
                }}
                value={grade.toString()}
                label='Grade'
                onChange={handleGradeChange}
                MenuProps={MenuProps}
              >
                <MenuItem value={1}>Supervisor</MenuItem>
                <MenuItem value={2}>Manager</MenuItem>
              </Select>
            </FormControl>
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
          </Body>
        </Box>
      </Modal>
    </>
  );
};

export default AddAccountButton;

const Header = styled.div`
  font: normal normal bold 18px/26px Noto Sans CJK KR;
  border-bottom: solid 1px ${colors.num_444};
  padding: 24px 40px;
  color: ${colors.text};
`;

const Body = styled.div`
  padding: 35px 40px;

  .MuiOutlinedInput-notchedOutline {
    border-color: ${colors.text};
  }

  .MuiInputLabel-shrink {
    background-color: ${colors.num_222};
  }

  .MuiSvgIcon-root {
    color: ${colors.text};
  }

  .MuiSelect-iconOpen {
    color: ${colors.main};
  }
`;

const InputBox = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
  margin: 16px 0;
`;

const AccountLabel = styled.label`
  width: 100px;
  color: ${colors.text};
`;

const Input = styled.input`
  width: 70%;
  height: 100%;
  border-radius: 10px;
  color: ${colors.text};
  padding: 0 16px;
  font: normal normal normal 15px/21px Noto Sans CJK KR;
  background-color: ${colors.num_333};
`;

const SelectedLabel = styled.label`
  color: ${colors.text};
  padding: 0 10px;
`;

const ButtonBox = styled.div`
  padding: 10px 0px;
  display: flex;
`;
