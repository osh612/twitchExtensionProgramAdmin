import styled from '@emotion/styled/macro';
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  ListSubheader,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { checkJoinRequest } from '../../../lib/check';
import getUniqueArr from '../../../lib/getUniqueArr';
import { customErrAtom, errorAtom } from '../../../recoil/errors/errorsAtom';
import gameAtom, { IGame, Ileague } from '../../../recoil/game/gameAtom';
import JoinServices, { IBroadcastData, IJoinRequestParam } from '../../../services/JoinServices';
import { colors, spacing } from '../../../Styles/ui';
import { broadcastTypeList, getBroadcastType } from '../../Management/lib/Management.list-set';
import SignCancelButton from '../Components/Sign.button.cancel';
import InputBox from '../Components/Sign.input';

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
      // backgroundColor: colors.main,
      // color: colors.text,
    },
  },
};

const SignUp = ({ broadcastData }: { broadcastData: IBroadcastData }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const gamelistDataset = useRecoilValue(gameAtom.gameList);
  const setCustomErr = useSetRecoilState(customErrAtom);

  const [uid, setUid] = useState<string>(broadcastData.broadcasterLogin);
  const [password, setPassword] = useState<string>('');
  const [rePassword, setRePassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [gameList, setGameList] = useState<string[]>([]);
  const [leagueList, setLeagueList] = useState<string[]>([]);

  const [broadcastType, setBroadcastType] = useState<number>(0);
  const [alterText, setAlterText] = useState<string>('');

  const { mutate: joinRequest, isLoading } = useMutation(
    (data: IJoinRequestParam) => JoinServices.joinRequest(data),
    {
      onSuccess: (data) => {
        return navigate('/login');
      },
    },
  );

  const onConfirm = () => {
    const Orikeys = leagueList.map((league) => league.split('/')[0]);
    const keys = getUniqueArr(Orikeys);

    const game: IGame[] = keys.map((key) => {
      const result1 = gamelistDataset.filter((data) => data.key === key);
      const valueList = leagueList
        .filter((league) => league.split('/')[0] === key)
        .map((league) => league.split('/')[1]);
      const result2 = result1.map((data) =>
        data.league.filter((league) => valueList.includes(league.key)),
      )[0];
      const result3: IGame = result1
        .filter((data) => data.key === key)
        .map((data) => {
          return {
            idx: data.idx,
            key: data.key,
            league: result2,
          };
        })[0];
      return result3;
    });

    const param: IJoinRequestParam = {
      uid,
      password,
      email,
      accountsType: broadcastType,
      game,
      broadcast: broadcastData,
    };

    const check = checkJoinRequest(param);
    if (check.result) {
      joinRequest(param);
    } else {
      setCustomErr({
        statusCode: check.code,
        message: check.text,
      });
    }
    return '';
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    if (id === 'uid') {
      setUid(value);
    } else if (id === 'password') {
      setPassword(value);
    } else if (id === 're-password') {
      setRePassword(value);
    } else if (id === 'email') {
      setEmail(value);
    }
  };

  useEffect(() => {
    const selectedGameDataset = gamelistDataset.filter((data) => gameList.includes(data.key));
    let leagueDataset: Ileague[] = [];
    selectedGameDataset.map((data) => {
      leagueDataset = leagueDataset.concat(data.league);
      return '';
    });
  }, [gameList]);

  const handleSingleSelectChange = (event: SelectChangeEvent) => {
    const {
      target: { value, name },
    } = event;
    if (name === 'broadcastType') {
      setBroadcastType(+value as number);
    }
  };

  const handleMultiSelectChange = (event: SelectChangeEvent<typeof gameList>) => {
    const {
      target: { value, name },
    } = event;

    if (name === 'gameList') {
      setGameList(typeof value === 'string' ? value.split(',') : value);
    }
    if (name === 'leagueList') {
      setLeagueList(typeof value === 'string' ? value.split(',') : value);
    }
  };

  return (
    <>
      <HeaderBox>
        <span className='kdaMaster'>{t('title')}</span>
        <span className='twitchAuth'>{t('sign.twitchAuth.title')}</span>
      </HeaderBox>
      <BodyBox>
        <InputBox id='uid' value={uid} onChange={onChangeHandler} />
        <InputBox id='password' type='password' value={password} onChange={onChangeHandler} />
        <InputBox id='re-password' type='password' value={rePassword} onChange={onChangeHandler} />
        <InputBox id='email' value={email} onChange={onChangeHandler} />
        <ItemBox>
          <Select
            sx={{
              borderColor: colors.text,
              color: colors.text,
              ':hover': {
                borderColor: colors.text,
              },
            }}
            fullWidth
            value={broadcastType.toString()}
            label='broadcastType'
            name='broadcastType'
            onChange={handleSingleSelectChange}
            MenuProps={MenuProps}
            input={<Input disableUnderline />}
            placeholder='Type'
            renderValue={(selected) => {
              if (selected === '0') {
                return <em style={{ color: `${colors.num_999}` }}>Type</em>;
              }
              return getBroadcastType(+selected);
            }}
          >
            {Object.keys(broadcastTypeList).map((key) => {
              return <MenuItem value={+key}>{broadcastTypeList[+key]}</MenuItem>;
            })}
          </Select>
        </ItemBox>
        {broadcastType === 1 ? (
          <ItemBox>
            <Select
              fullWidth
              multiple
              displayEmpty
              labelId='league-multiple-chip-label'
              id='league-multiple-chip'
              value={leagueList}
              name='leagueList'
              onChange={handleMultiSelectChange}
              MenuProps={MenuProps}
              input={<Input disableUnderline />}
              // inputProps={{ 'aria-label': 'Without label' }}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em style={{ color: `${colors.num_999}` }}>Game</em>;
                }
                return (
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 0.5,
                      color: colors.text,
                    }}
                  >
                    {selected.map((value) => (
                      <SelectedLabel>{value.split('/')[1]}</SelectedLabel>
                    ))}
                  </Box>
                );
              }}
              sx={{
                borderColor: colors.text,
                ':hover': {
                  borderColor: colors.text,
                },
              }}
            >
              {gamelistDataset.map((game) => {
                const leagues = [game.key];
                game.league.map((league) => leagues.push(league.key));
                return leagues.map((league, idx) => {
                  if (idx === 0) {
                    return <ListSubheader>{t(`gameList.${league}`)}</ListSubheader>;
                  }
                  return <MenuItem value={`${leagues[0]}/${league}`}>{league}</MenuItem>;
                });
                // return groupSelector;
              })}
            </Select>
          </ItemBox>
        ) : (
          <></>
        )}
        <AlterDesc>{alterText}</AlterDesc>
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
            onClick={onConfirm}
            fullWidth
          >
            {t('common.button.confirm')}
          </Button>
        </ButtonBox>
      </BodyBox>
    </>
  );
};

export default SignUp;

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

  .MuiInput-input,
  .MuiSelect-select {
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

const AlterDesc = styled.div`
  width: 100%;
  height: auto;
  color: red;
  font: normal normal normal 15px/21px Noto Sans CJK KR;
`;

const ButtonBox = styled.div`
  display: flex;
`;

const SelectedLabel = styled.label`
  color: ${colors.text};
  background-color: ${colors.main};
  border-radius: 6px;
  padding: 0 10px;
  margin: 0 8px 0 0;
`;

const ItemBox = styled.div`
  ${spacing.marginB(3)};
`;
