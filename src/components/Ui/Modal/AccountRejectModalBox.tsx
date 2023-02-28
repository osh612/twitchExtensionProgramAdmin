import { Box, Button, Input } from '@mui/material';
import { useTheme } from '@mui/styles';
import { useCallback, useState } from 'react';
import styled from '@emotion/styled/macro';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { colors, spacing } from '../../../Styles/ui';
import JoinServices, { IJoinPermitParam } from '../../../services/JoinServices';
import { MODAL_STYLE } from '../../../lib/Ui/ModalCss';

const reasonMaxLength = 255;

const buttonStyle = {
  width: '100%',
  height: '50px',
  margin: '0px 10px',
  borderRadius: '10px',
};

const AccountRejectModalBox = ({
  userId,
  idx,
  CancelHandler,
}: {
  userId: string;
  idx: number;
  CancelHandler: () => void;
}) => {
  const { t } = useTranslation();
  const [uid, setUid] = useState<string>(userId ?? '');
  const [reason, setReason] = useState<string>('');
  // const [channel, setChannel] = useState<string>('');

  const handleChangeInput = useCallback((e: any) => {
    const { value, name } = e.target;
    if (name === 'uid') {
      setUid(value);
    }
    if (name === 'reason') {
      const text = value.length > 255 ? value.substring(0, 255) : value;
      setReason(text);
    }
  }, []);

  const { mutate: joinPermit, isLoading: joinPermitLoading } = useMutation(
    (data: IJoinPermitParam) => JoinServices.joinPermit(data),
    {
      onSuccess: (data) => {
        CancelHandler();
      },
    },
  );

  const onConfirm = () => {
    const param: IJoinPermitParam = {
      idx,
      uid: userId,
      permit: 2,
      rejectCause: reason,
    };
    joinPermit(param);
  };

  return (
    <Box sx={MODAL_STYLE}>
      <Header>{t('management.label.joinReject')}</Header>
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
        <InputMultiLineBox>
          <FixLabel>{t('management.label.rejectReason')}</FixLabel>
          <Input
            multiline
            rows={5}
            disableUnderline
            defaultValue={reason}
            type='text'
            name='reason'
            onChange={handleChangeInput}
            inputProps={{ maxLength: reasonMaxLength }}
            placeholder={t('management.desc.rejectReason')}
            sx={{
              width: '70%',
            }}
          />
        </InputMultiLineBox>
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

export default AccountRejectModalBox;

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
    // ${spacing.paddingY(3.25)};
    // height: 40px !important;
    ${spacing.paddingX(5)};
    color: ${colors.text} !important;
    background-color: ${colors.num_333} !important;
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding-top: 15px;
  }
`;

const InputBox = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
  margin: 16px 0;
`;

const InputMultiLineBox = styled.div`
  display: flex;
  height: auto;
  // align-items: center;
  margin: 16px 0;
`;

const AccountLabel = styled.label`
  width: 100px;
  color: ${colors.text};
`;

const FixLabel = styled.label`
  width: 100px;
  color: ${colors.text};
  padding-top: 25px;
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
