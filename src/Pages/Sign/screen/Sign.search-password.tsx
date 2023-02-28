import styled from '@emotion/styled';
import { Button, Modal } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { CustomInput } from '../../../components/Ui/CustomInput';
import CodeErrorModalBox from '../../../components/Ui/Modal/CodeErrorModalBox';
import { IBroadcastData } from '../../../services/JoinServices';
import { colors, spacing } from '../../../Styles/ui';
import SignCancelButton from '../Components/Sign.button.cancel';

const SearchPassword = ({ broadcastData }: { broadcastData: IBroadcastData }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [extensionCode, setExtensionCode] = useState<string>('');
  const [open, setOpen] = useState(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setExtensionCode(value);
  };

  const onConfirm = () => {
    console.log('extensionCode', extensionCode);
    if (true) {
      handleOpen();
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <HeaderBox>
        <span className='kdaMaster'>{t('title')}</span>
      </HeaderBox>
      <BodyBox>
        <CustomInput
          id='extensionCode'
          value={extensionCode}
          onChange={onChangeHandler}
          placeholder={t('sign.searchPassword.placeholder')}
        />
        <ButtonBox>
          <SignCancelButton title='searchPassword' />
          <Button
            variant='contained'
            sx={{
              borderRadius: '10px',
              marginTop: '20px',
              padding: '15px 0 14px 0',
              font: 'normal normal bold 15px/25px Noto Sans CJK KR',
              marginLeft: '7px',
            }}
            onClick={onConfirm}
            fullWidth
          >
            {t('common.button.confirm')}
          </Button>
        </ButtonBox>
      </BodyBox>
      <Modal open={open}>
        <CodeErrorModalBox ConfirmHandler={handleClose} />
      </Modal>
    </>
  );
};

export default SearchPassword;

const HeaderBox = styled.div`
  width: 100%;
  height: auto;
  text-align: center;
  color: ${colors.text};
  .kdaMaster {
    font-family: 'Poppins Bold', 'Poppins', sans-serif;
    font-weight: Bold;
    color: #ffffff;
    text-align: center;
    font-size: 24px;
  }

  .twitchAuth {
    font: normal normal bold 20px/29px Noto Sans CJK KR;
  }
`;

const BodyBox = styled.div`
  height: auto;
  // background-color: ${colors.num_222};
  border-radius: 8px;
  padding: 21px 54px;

  .MuiInput-input,
  .MuiSelect-select {
    width: 300px;
    font: normal normal normal 15px/25px Noto Sans CJK KR;
    ${spacing.paddingX(5)};
    padding-top: 4px;
    padding-bottom: 5px;
    color: ${colors.text} !important;
    background-color: ${colors.num_333} !important;
    border-radius: 10px;
    height: 40px !important;
    display: flex;
    align-items: center;
  }

  .MuiInput-input {
    font: normal normal normal 15px/25px Noto Sans CJK KR;
    // ${spacing.paddingY(3.25)};
    height: 40px;
    ${spacing.paddingX(5)};
    color: ${colors.text} !important;
    background-color: ${colors.num_333} !important;
    border-radius: 10px;
    display: flex;
    align-items: center;
  }
`;

const ButtonBox = styled.div`
  display: flex;
`;
