import {
  Box,
  Button,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  Input,
  ListSubheader,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled/macro';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { colors, spacing } from '../../../Styles/ui';
import gameAtom, { IGame, Ileague } from '../../../recoil/game/gameAtom';
import {
  broadcastTypeList,
  getAccountGrade,
  getAccountState,
  getBroadcastType,
  getSelectedGameList,
  getSelectedLeagueList,
  gradeList,
  stateList,
} from '../../../Pages/Management/lib/Management.list-set';
import ManagementServices, {
  IAccountDetail,
  IManagementUpdateParam,
  IManagementUpdateSuccess,
} from '../../../services/ManagementServices';
import getUniqueArr from '../../../lib/getUniqueArr';
import { customErrAtom } from '../../../recoil/errors/errorsAtom';
import { checkManagementUpdate } from '../../../lib/check';
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
      ':hover': {
        color: colors.black,
      },
    },
  },
};

const buttonStyle = {
  width: '100%',
  height: '50px',
  margin: '0px 10px',
  borderRadius: '10px',
};

const AccountEditModalBox = ({
  detail,
  handleClose,
}: {
  detail: IAccountDetail;
  handleClose: () => void;
}) => {
  const { t } = useTranslation();
  const setCustomErr = useSetRecoilState(customErrAtom);
  const gamelistDataset = useRecoilValue(gameAtom.gameList);
  const [leagueDataset, setLeagueDataset] = useState<Ileague[]>([]);
  const [idx, setIdx] = useState<number>(detail.idx);
  const [uid, setUid] = useState<string>(detail.uid ?? '');
  const [password, setPassword] = useState<string>('');
  // const [channel, setChannel] = useState<string>('');
  const [gameList, setGameList] = useState<string[]>(getSelectedGameList(detail.game));
  const [leagueList, setLeagueList] = useState<string[]>(getSelectedLeagueList(detail.game));
  const [broadcastType, setBroadcastType] = useState<number>(detail.accountsType);
  const [grade, setGrade] = useState<number>(detail.securityLevel);
  const [state, setState] = useState<number>(detail.state);

  const { mutate: updateManagement, isLoading } = useMutation(
    (data: IManagementUpdateParam) => ManagementServices.updateManagement(data),
    {
      onSuccess: (data: IManagementUpdateSuccess) => {
        handleClose();
      },
    },
  );

  useEffect(() => {
    const selectedGameDataset = gamelistDataset.filter((data) => gameList.includes(data.key));
    let leagueDataset: Ileague[] = [];
    selectedGameDataset.map((data) => {
      leagueDataset = leagueDataset.concat(data.league);
      return '';
    });
    setLeagueDataset(leagueDataset);
  }, [gameList]);

  const handleChangeInput = useCallback((e: any) => {
    const { value, name } = e.target;
    if (name === 'uid') {
      setUid(value);
    }
    if (name === 'password') {
      setPassword(value);
    }

    const selectedGameDataset = gamelistDataset.filter((data) => gameList.includes(data.key));
    let leagueDataset: Ileague[] = [];
    selectedGameDataset.map((data) => {
      leagueDataset = leagueDataset.concat(data.league);
      return '';
    });
    setLeagueDataset(leagueDataset);
  }, []);

  const setLeagueDatasetFunc = () => {
    const selectedGameDataset = gamelistDataset.filter((data) => gameList.includes(data.key));
    let leagueDataset: Ileague[] = [];
    selectedGameDataset.map((data) => {
      leagueDataset = leagueDataset.concat(data.league);
      return '';
    });
    setLeagueDataset(leagueDataset);

    const seletedLeague: string[] = [];
    const leagues = leagueDataset.map((data) => data.key);
    leagueList.map((data) => leagues.includes(data) && seletedLeague.push(data));
    setLeagueList(seletedLeague);
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

  const onConfirm = () => {
    const Orikeys = leagueList.map((league) => league.split('/')[0]);
    const keys = getUniqueArr(Orikeys);
    let game: IGame[] = [];
    if (broadcastType === 1) {
      // broadcastType이 E-Sport 일 때만 가능.
      game = keys.map((key) => {
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
    }

    const param: IManagementUpdateParam = {
      idx,
      uid,
      password,
      accountsType: broadcastType,
      securityLevel: grade,
      game,
    };

    const check = checkManagementUpdate(param);
    if (check.result) {
      updateManagement(param);
    } else {
      setCustomErr({
        statusCode: check.code,
        message: check.text,
      });
      console.log(check.text);
    }
  };

  return (
    <Box sx={MODAL_STYLE}>
      <Header>{t('management.accountFunc.edit')}</Header>
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
        <InputBox>
          <AccountLabel>PASSWORD</AccountLabel>
          <CustomInput
            defaultValue={password}
            type='password'
            name='password'
            autoComplete='new-password'
            onChange={handleChangeInput}
            placeholder='PASSWORD'
          />
        </InputBox>
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
        {/* broadcastType */}
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
        {/* 게임 */}
        {broadcastType === 1 ? (
          <InputBox>
            <AccountLabel>{t('common.game')}</AccountLabel>
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
                  if (game.league.length === 0) return <></>;
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
            </FormControl>
          </InputBox>
        ) : (
          <></>
        )}

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
  );
};

export default AccountEditModalBox;

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

  .MuiFormControl-root {
    margin: 0;
  }

  .MuiInput-input {
    font: normal normal normal 15px/25px Noto Sans CJK KR;
    // ${spacing.paddingY(3.25)};
    min-height: 40px !important;
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
  min-height: 50px;
  align-items: center;
  margin: 16px 0;
`;

const AccountLabel = styled.label`
  width: 100px;
  color: ${colors.text};
`;

const CustomInput = styled.input`
  width: 70%;
  min-height: 50px;
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
