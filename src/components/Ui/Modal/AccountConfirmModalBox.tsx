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
import { useCallback, useState } from 'react';
import styled from '@emotion/styled/macro';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { colors, spacing } from '../../../Styles/ui';
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
} from '../../../Pages/Management/lib/Management.list-set';
import JoinServices, { IJoinPermitParam } from '../../../services/JoinServices';
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

const buttonStyle = {
  width: '100%',
  height: '50px',
  margin: '0px 10px',
  borderRadius: '10px',
};

const AccountConfirmModalBox = ({ values, CancelHandler }: { values: any; CancelHandler: () => void }) => {
  const { t } = useTranslation();
  const [uid, setUid] = useState<string>(values.id ?? '');
  const [idx, setIdx] = useState<number>(values.idx ?? 0);
  // const [channel, setChannel] = useState<string>('');
  const [broadcastType, setBroadcastType] = useState<number>(getBroadcastTypeeKey(values.broadcastType));
  const [grade, setGrade] = useState<number>(getAccountGradeKey(values.grade));
  const [state, setState] = useState<number>(getAccountStateKey(values.state));

  const handleChangeInput = useCallback((e: any) => {
    const { value, name } = e.target;
    if (name === 'uid') {
      setUid(value);
    }
  }, []);

  const handleSingleSelectChange = (event: SelectChangeEvent) => {
    const {
      target: { value, name },
    } = event;

    if (name === 'grade') {
      setGrade(+value as number);
    }
    if (name === 'state') {
      setState(+value as number);
    }
    if (name === 'broadcastType') {
      setBroadcastType(+value as number);
    }
  };

  const { mutate: joinPermit, isLoading: joinPermitLoading } = useMutation(
    (data: IJoinPermitParam) => JoinServices.joinPermit(data),
    {
      onSuccess: (data) => {
        CancelHandler();
        // setAccountCount(data.count);
        // setAccountList(data.joinHistory);
      },
    },
  );

  const onConfirm = () => {
    const param: IJoinPermitParam = {
      idx,
      uid,
      permit: 1,
      rejectCause: '',
    };
    joinPermit(param);
  };

  return (
    <Box sx={MODAL_STYLE}>
      <Header>{t('management.label.joinConfirm')}</Header>
      <Body>
        {/* ID */}
        <InputBox>
          <AccountLabel>ID</AccountLabel>
          <CustomInput
            defaultValue={uid}
            type='text'
            name='uid'
            autoComplete='off'
            onChange={handleChangeInput}
            placeholder='ID'
            readOnly
          />
        </InputBox>
        {/* PASSWORD */}
        {/* <InputBox>
          <AccountLabel>PASSWORD</AccountLabel>
          <CustomInput
            defaultValue={password}
            type='password'
            name='password'
            autoComplete='new-password'
            onChange={handleChangeInput}
            placeholder='PASSWORD'
          />
        </InputBox> */}
        {/* CHANNEL */}
        {/* <InputBox>
      <AccountLabel>CHANNEL</AccountLabel>
      <Input type='text' name='channel' onChange={handleChangeInput} placeholder='CHANNEL' />
    </InputBox>
    <InputBox>
      <AccountLabel>{t('management.label.broadcastType')}</AccountLabel>
      <Input
        type='text'
        name='broadcastType'
        onChange={handleChangeInput}
        placeholder={t('management.label.broadcastType')}
      />
    </InputBox> */}
        {/* CHANNEL */}
        <InputBox>
          <AccountLabel>{t('management.label.broadcastType')}</AccountLabel>
          <FormControl
            sx={{
              width: '70%',
              color: colors.text,
              ':hover': {
                borderColor: colors.text,
              },
              margin: '10px 0',
            }}
          >
            <Select
              sx={{
                borderColor: colors.text,
                color: colors.text,
                ':hover': {
                  borderColor: colors.text,
                },
              }}
              readOnly
              value={getBroadcastType(broadcastType)}
              label='broadcastType'
              name='broadcastType'
              onChange={handleSingleSelectChange}
              MenuProps={MenuProps}
              input={<Input disableUnderline />}
              renderValue={(selected) => {
                return selected;
              }}
            >
              {Object.keys(broadcastTypeList).map((key) => {
                return <MenuItem value={+key}>{broadcastTypeList[+key]}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </InputBox>
        {/* 계정 등급 */}
        <InputBox>
          <AccountLabel>{t('management.accountTable.header.grade')}</AccountLabel>
          <FormControl
            sx={{
              width: '70%',
              color: colors.text,
              ':hover': {
                borderColor: colors.text,
              },
              margin: '10px 0',
            }}
          >
            <Select
              sx={{
                borderColor: colors.text,
                color: colors.text,
                ':hover': {
                  borderColor: colors.text,
                },
              }}
              readOnly
              value={getAccountGrade(grade)}
              label='Grade'
              name='grade'
              onChange={handleSingleSelectChange}
              MenuProps={MenuProps}
              input={<Input disableUnderline />}
              renderValue={(selected) => {
                return selected;
              }}
            >
              {Object.keys(gradeList).map((key) => {
                return <MenuItem value={+key}>{gradeList[+key]}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </InputBox>
        {/* 계정 상태 */}
        <InputBox>
          <AccountLabel>{t('management.label.state')}</AccountLabel>
          <FormControl
            sx={{
              width: '70%',
              color: colors.text,
              ':hover': {
                borderColor: colors.text,
              },
              margin: '10px 0',
            }}
          >
            <Select
              sx={{
                borderColor: colors.text,
                color: colors.text,
                ':hover': {
                  borderColor: colors.text,
                },
              }}
              readOnly
              value={getAccountState(state)}
              label='State'
              name='state'
              onChange={handleSingleSelectChange}
              MenuProps={MenuProps}
              input={<Input disableUnderline />}
              renderValue={(selected) => {
                return selected;
              }}
            >
              {Object.keys(stateList).map((key) => {
                return <MenuItem value={+key}>{stateList[+key]}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </InputBox>

        <ButtonBox>
          <Button
            onClick={CancelHandler}
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
  );
};

export default AccountConfirmModalBox;

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

  .MuiAccountLabel-shrink {
    background-color: ${colors.num_222};
  }

  .MuiSvgIcon-root {
    color: ${colors.text};
  }

  .MuiSelect-iconOpen {
    color: ${colors.main};
  }

  .MuiInput-input {
    font: normal normal normal 15px/25px Noto Sans CJK KR;
    height: 40px !important;
    ${spacing.paddingX(5)};
    color: ${colors.text} !important;
    background-color: ${colors.num_333} !important;
    border-radius: 10px;
    display: flex;
    align-items: center;
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

const CustomInput = styled.input`
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
  background-color: ${colors.main};
  border-radius: 6px;
  padding: 0 10px;
  margin: 0 8px 0 0;
`;

const ButtonBox = styled.div`
  padding: 10px 0px;
  display: flex;
`;
