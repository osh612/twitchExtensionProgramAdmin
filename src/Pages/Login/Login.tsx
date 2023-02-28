import styled from '@emotion/styled/macro';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { color, styled as MuiStyled } from '@mui/system';
import { Avatar, Box, Button, Input, Link, Tab, Tabs, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useRecoilState, useSetRecoilState } from 'recoil';
import QueryString from 'qs';
import { twitchTokenAtom, userAtom, userProfileAtom } from '../../recoil/Auth/userAtom';
import AuthServices, {
  IAdminLoginParam,
  IManagerLoginParam,
  ITwitchLoginParam,
} from '../../services/AuthServices';
import { ApiError } from '../../services/axios/axios';
import { colors, spacing } from '../../Styles/ui';
import { client } from '../../services/socket/webSocket';
import { TWITCH_CLIENT_ID } from '../config';
import TwitchServices from '../../services/TwitchServices';
import JoinServices, { IJoinRequestParam } from '../../services/JoinServices';

const LoginContent = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pathname, search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [user, setUser] = useRecoilState(userAtom);
  const setTwitchToken = useSetRecoilState(twitchTokenAtom);
  const [userProfile, setUserProfile] = useRecoilState(userProfileAtom);
  const [openTerm, setOpenTerm] = useState(false); // 약관동의 모달

  const [tab, setTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  // useEffect(() => {
  //   client.connect({}, ()=>{
  //     console.log('Connected')
  //   })
  // }, [client]);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  useEffect(() => {
    if (client) {
      client.activate();
      console.log('연결성공');
    }
  }, [client]);

  const { mutate: adminLogin } = useMutation((data: IAdminLoginParam) => AuthServices.adminLogin(data), {
    onSuccess: (data) => {
      const { idx, accountsType, broadcastId, email, game, securityLevel, token, uid } = data.accounts;

      setUser({
        accountIdx: idx,
        accountsType,
        broadcastId,
        email,
        game,
        idx,
        securityLevel,
        token,
        uid,
        lang: 'ko',
      });
    },
  });
  const { mutate: twitchLogin } = useMutation((data: ITwitchLoginParam) => AuthServices.twitchLogin(data), {
    onSuccess: (data) => {
      const {
        idx,
        accountsType,
        broadcastId,
        broadcastLogin,
        broadcastDisplayName,
        broadcastProfileImageUrl,
        securityLevel,
        token,
        uid,
      } = data.accounts;

      setUser({
        accountIdx: idx,
        accountsType,
        broadcastId,
        email: '',
        game: [],
        idx,
        securityLevel,
        token,
        uid,
        lang: 'ko',
      });
    },
  });

  const { mutate: managerLogin, isLoading } = useMutation(
    (data: IManagerLoginParam) => AuthServices.managerLogin(data),
    {
      onSuccess: (data) => {
        const { idx, accountsType, broadcastId, email, game, securityLevel, token, uid } =
          data.manager.accounts;

        setUser({
          accountIdx: idx,
          accountsType,
          broadcastId,
          email,
          game,
          idx,
          securityLevel,
          token,
          uid,
          lang: 'ko',
        });
      },
    },
  );

  const { mutate: joinRequest } = useMutation((data: IJoinRequestParam) => JoinServices.joinRequest(data), {
    onSuccess: (data) => {
      return navigate('/login');
    },
  });

  const onSubmitAdmin = handleSubmit(({ uid, password }) => {
    console.log('진입');
    if (tab === 0) {
      adminLogin({ uid, password });
    }
  });

  const onSubmitManageLogin = handleSubmit(({ loginCode }) => {
    console.log('진입');
    if (tab === 1) {
      managerLogin({ loginCode });
    }
  });

  const goSignUp = () => {
    navigate('/sign');
  };
  const goSearchPassword = () => {
    navigate('/sign/search-password');
  };

  const queryStringData = QueryString.parse(search, { ignoreQueryPrefix: true });

  // 1. 쿼리스트링 데이터의 code로 access token, refresh token 받아오기
  const { mutate: getTokenMutate, data: tokenData } = useMutation(
    (code: string) =>
      TwitchServices.getTwitchUserByCode({
        client_id: TWITCH_CLIENT_ID,
        client_secret: `${process.env.REACT_APP_TWITCH_SECRET_ID}`,
        code,
        grant_type: 'authorization_code',
        redirect_uri: `${window.location.origin}/login`,
      }),
    {
      onSuccess: (res: any) => {
        //  받아온 토큰정보를 전역에 저장
        setTwitchToken(res);
        // 쿼리스트링을 다 읽은 이후 url 정리하기
        const param = searchParams.get('code');
        if (param) {
          searchParams.delete('code');
          searchParams.delete('scope');
          setSearchParams(searchParams);
        }
      },
    },
  );

  // 2. 1에서 받아온 토큰 정보로 유저 정보 받기
  const { data: userInfo } = useQuery(
    ['userInfo'],
    () => TwitchServices.getTwitchUserByToken(tokenData as object),
    {
      enabled: Boolean(tokenData), // trigger 역할, tokenData가 있을때만 이 usequery가 실행됨!!
      onSuccess: (res: any) => {
        // 받아온 유저정보를 전역에 저장
        setUserProfile(res?.data?.data[0]);

        // loginMutate({ uid: res?.data?.data[0].id });
      },
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    if (queryStringData.code) {
      getTokenMutate(queryStringData.code as string);
    }
  }, [queryStringData.code]);

  useEffect(() => {
    if (userProfile) {
      // adminLogin({ uid: userProfile.login, password: '' });
      twitchLogin({
        broadcasterId: userProfile.id,
        broadcasterLogin: userProfile.login,
        broadcasterDisplayName: userProfile.display_name,
        broadcasterProfileImageUrl: userProfile.profile_image_url,
      });
    }
  }, [userProfile]);

  return (
    <LoginWrapper>
      <CONTENT>
        <SUBJECT>{t('title')}</SUBJECT>
        <LoginBox>
          <Box sx={{ width: '100%' }}>
            <Tabs value={tab} onChange={handleChange} centered>
              <Tab label={t('login.title.id')} />
              <Tab label={t('login.title.code')} />
            </Tabs>
          </Box>

          {tab === 0 ? (
            <>
              <Box sx={{ padding: '72px 127px 81px' }}>
                <Button
                  component={Link}
                  variant='contained'
                  href={`https://id.twitch.tv/oauth2/authorize?client_id=${TWITCH_CLIENT_ID}&redirect_uri=${window.location.origin}/login&response_type=code`}
                  sx={{
                    padding: '14px 62px',
                    backgroundImage: 'linear-gradient(100deg, #af51ff, #01fcb5);',
                    width: '342px',
                    borderRadius: 2,
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    ':hover': {
                      color: colors.text,
                    },
                  }}
                >
                  <Avatar
                    src='/images/icon/ico-twitch.png'
                    alt='twitchIcon'
                    // varint='square'
                    sx={{
                      width: '24px',
                      height: '24px',
                      mr: '8px',
                    }}
                  />
                  <TwitchLabel>Play Free with Twitch</TwitchLabel>
                </Button>
              </Box>
              {/* <FORM onSubmit={onSubmitAdmin} isSelectedTab={tab === 0}>
                <Input
                  disableUnderline
                  fullWidth
                  type='text'
                  // className='id'
                  id='uid'
                  placeholder='ID'
                  autoComplete='off'
                  {...register('uid', {
                    required: 'Required',
                    // validate: (value) => {
                    //   if (!checkEmail(value)) {
                    //     return '이메일 형식이 아닙니다';
                    //   }
                    // },
                  })}
                />
                <Input
                  disableUnderline
                  fullWidth
                  type='password'
                  // className='password'
                  id='password'
                  // name='password'
                  autoComplete='off'
                  placeholder='PASSWORD'
                  {...register('password', {
                    required: 'Required',
                  })}
                />
                <LOADINGBUTTON type='submit' loading={isLoading} variant='contained'>
                  LOGIN
                </LOADINGBUTTON>
              </FORM> */}
            </>
          ) : (
            <></>
          )}
          {tab === 1 ? (
            <FORM onSubmit={onSubmitManageLogin} isSelectedTab={tab === 1}>
              <Input
                disableUnderline
                fullWidth
                type='text'
                // className='id'
                id='loginCode'
                placeholder={t('login.placeholder.loginCode')}
                autoComplete='off'
                {...register('loginCode', {
                  // validate: (value) => {
                  //   if (!checkEmail(value)) {
                  //     return '이메일 형식이 아닙니다';
                  //   }
                  // },
                })}
              />
              <LOADINGBUTTON type='submit' loading={isLoading} variant='contained'>
                LOGIN
              </LOADINGBUTTON>
            </FORM>
          ) : (
            <></>
          )}

          {/* <SingUpBox>
            <SingUpSpan onClick={goSearchPassword}>{t('login.label.resetPassword')}</SingUpSpan>
            <SingUpSpan onClick={goSignUp}>{t('login.label.signUp')}</SingUpSpan>
            <SingUpSpan
              href={`https://id.twitch.tv/oauth2/authorize?client_id=${TWITCH_CLIENT_ID}&redirect_uri=${window.location.href}&response_type=code`}
            >
              {t('login.label.signUp')}
            </SingUpSpan>
          </SingUpBox> */}

          {/* <ERRORTEXT>{(errors.id && errors.id.message) || (errors.total && errors.total.message)}</ERRORTEXT> */}
        </LoginBox>
        <COPYRIGHT>Copyright Team Snowball All Rights Reserved.</COPYRIGHT>
      </CONTENT>
    </LoginWrapper>
  );
};

export default LoginContent;

const LoginWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: #111111 0% 0% no-repeat padding-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CONTENT = styled.div`
  width: 1216px;
  // height: 290px;
  background-image: url('/Images/bg-login.png');
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  background-color: ${colors.num_222};
  border-radius: 10px;

  .MuiTabs-flexContainer {
    border-bottom: solid 1px ${colors.num_444};
    width: 100%;
  }

  .MuiTab-root {
    // border-radius: 10px 10px 0px 0px;
    border: 1px solid ${colors.num_444};
    border-bottom-color: ${colors.num_222};
    color: ${colors.text};
    width: 50%;
    // margin: 0 3px;
    background-color: ${colors.num_111};
  }

  .MuiTabs-indicator {
    border: 1px solid ${colors.num_222};
    background-color: ${colors.num_222};
  }

  .Mui-selected {
    background-color: ${colors.num_222};
  }
`;

const FORM = styled.form<{ isSelectedTab: boolean }>`
  display: ${({ isSelectedTab }) => (isSelectedTab ? 'flex' : 'none')};
  width: 596px;
  padding: 46px 127px 47px;
  flex-direction: column;
  justify-content: center;

  &::-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset;
    box-shadow: 0 0 0 1000px white inset;
  }

  .MuiInput-input {
    font: normal normal normal 15px/25px Noto Sans CJK KR;
    ${spacing.paddingY(0)};
    height: 50px;
    ${spacing.paddingX(5)};
    ${spacing.marginB(0)};
    color: ${colors.text} !important;
    background-color: ${colors.num_333} !important;
    border-radius: 10px;
  }
`;

const SUBJECT = styled.div`
  margin-top: 42px;
  margin-bottom: 21px;
  width: 100%;
  text-align: center;
  color: ${colors.text};
  font: normal normal bold 24px/25px Poppins;
`;

// const ERRORTEXT = styled.p`
//   ${spacing.paddingY(2)}
//   color: ${colors.badge_red};
//   font-size: 11px;
//   height: 20px;
// `;

const LOADINGBUTTON = MuiStyled(LoadingButton)`
width: 100%;
height: 50px;
font-size: 14px;
border-radius: 10px;
margin-top: 12px;

&.MuiLoadingButton-loading {
  background-color: ${colors.btn_confirm};
}

& .MuiLoadingButton-loadingIndicator {
  color: ${colors.btn_confirm} !important;
}
`;

const SingUpBox = styled.div`
  border-top: solid 1px ${colors.num_444};
  padding: 15px 0;
  margin-top: 12px;
  width: 100%;
  font: normal normal normal 12px/17px Noto Sans CJK KR;
  color: ${colors.num_999};
  text-align: center;
  display: flex;
  justify-content: space-evenly;

  span {
    color: ${colors.main};
    font-weight: bold;
    cursor: pointer;
  }
`;

const COPYRIGHT = styled.div`
  width: 100%;
  text-align: center;
  font: normal normal normal 12px/17px Noto Sans CJK KR;
  color: ${colors.num_999};
  padding-bottom: 20px;
  margin-top: 22px;
`;

const SingUpSpan = styled.a`
  color: #00990f;
  cursor: pointer;
  &:hover {
    color: #00990f;
  }
`;

const TwitchLabel = styled.a`
  font: normal normal bold 15px/24px Noto Sans KR;
  white-space: nowrap;
  }
`;
