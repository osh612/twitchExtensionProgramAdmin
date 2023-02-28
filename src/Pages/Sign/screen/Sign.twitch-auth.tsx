import styled from '@emotion/styled/macro';
import { Button, Input } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { colors, spacing } from '../../../Styles/ui';
import SignCancelButton from '../Components/Sign.button.cancel';
import InputBox from '../Components/Sign.input';
import {
  client,
  stompPublish,
  stompSubscribe,
  stompPublishNoToken,
} from '../../../services/socket/webSocket';
import CheckConfirmationModal from '../Components/Sign.modal.check-confirmation';
import { IStatus } from '../../../services/axios/axios';
import SignUp from './Sign.SignUp';
import { IBroadcastData } from '../../../services/JoinServices';

interface IJoinAuthSuccess extends IStatus {
  broadcast: IBroadcastData;
  join: boolean;
}

const TwitchAuth = () => {
  const { t } = useTranslation();
  const [idCode, setCode] = useState<string>('');

  const [showReq, setShowReq] = useState<boolean>(false);
  const [broadcastData, setBroadcastData] = useState<IBroadcastData>();

  function closeReq() {
    setShowReq(!showReq);
  }

  const onChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCode(value);
  };

  const codeData = {
    code: idCode,
  };

  const onClick = () => {
    stompPublishNoToken('/send/join/auth/request', codeData);

    const subscriptionUrl = `/subscribe/${idCode}/auth/result`;

    stompSubscribe(
      subscriptionUrl,
      (res: { body: string }) => {
        const data: IJoinAuthSuccess = JSON.parse(res.body);
        setBroadcastData(data.broadcast);
        // if(data.join === true){
        // navigate('signUp');
        // }
      },
      { id: 'certification' },
    );

    // setShowReq(!showReq);
  };

  return (
    <Wrapper>
      {broadcastData ? (
        <SignUp broadcastData={broadcastData} />
      ) : (
        <>
          <HeaderBox>
            <span className='kdaMaster'>{t('title')}</span>
            <span className='twitchAuth'>{t('sign.twitchAuth.title')}</span>
          </HeaderBox>
          <BodyBox>
            <InputBox id='code' value={idCode} onChange={onChangeCode} />
            <InputDesc>
              <span className='upStar'>*</span>
              {t('sign.twitchAuth.inputDesc')}
            </InputDesc>
            <ButtonBox>
              <SignCancelButton title='goLogin' />
              <Button
                variant='contained'
                sx={{
                  borderRadius: '10px',
                  marginTop: '20px',
                  padding: '15px 0 14px 0',
                  font: 'normal normal bold 15px/25px Noto Sans CJK KR',
                  marginLeft: '7px',
                }}
                onClick={onClick}
                fullWidth
                disabled={idCode.length === 0}
              >
                {t('common.button.confirm')}
              </Button>
            </ButtonBox>
          </BodyBox>
        </>
      )}
      {/* <CheckConfirmationModal open={showReq} close={() => closeReq}/> */}
    </Wrapper>
  );
};

export default TwitchAuth;

const Wrapper = styled.div`
  width: 408px;
`;

const HeaderBox = styled.div`
  width: 100%;
  height: auto;
  text-align: center;
  color: ${colors.text};
  .kdaMaster {
    font: normal normal bold 20px/25px Poppins;
  }

  .twitchAuth {
    font: normal normal bold 20px/29px Noto Sans CJK KR;
  }
`;

const BodyBox = styled.div`
  width: 100%;
  height: auto;
  background-color: ${colors.num_222};
  border-radius: 8px;
  margin-top: 20px;
  padding: 56px 54px;

  .MuiInput-input {
    font: normal normal normal 15px/25px Noto Sans CJK KR;
    // ${spacing.paddingY(3.25)};
    ${spacing.paddingX(5)};
    ${spacing.marginB(3)};
    color: ${colors.text} !important;
    background-color: ${colors.num_333} !important;
    border-radius: 10px;
    height: 40px;
  }

  .MuiInput-underline,
  .MuiInput-underline:before,
  .MuiInput-underline:hover,
  .MuiInput-underline:hover:before,
  .MuiInput-underline:after {
    border-bottom: none;
  }
`;

const InputDesc = styled.div`
  width: 100%;
  height: auto;
  color: ${colors.num_888};
  font: normal normal normal 15px/21px Noto Sans CJK KR;
  .upStar {
    color: ${colors.main};
  }
`;

const ButtonBox = styled.div`
  display: flex;
`;
