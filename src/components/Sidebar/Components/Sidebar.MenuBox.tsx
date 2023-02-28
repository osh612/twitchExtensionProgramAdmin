import styled from '@emotion/styled/macro';
import { Button, SvgIcon } from '@mui/material';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLive } from '../../../Pages/config';
import { permissionsAtom, userAtom, UserType } from '../../../recoil/Auth/userAtom';
import ServerServices from '../../../services/ServerServices';
import { colors } from '../../../Styles/ui';
import SidebarButton from '../../Ui/SidebarButton';
import { TypeList } from './Sidebar.TypeBox';

const MenuBox = () => {
  const user: UserType | undefined = useRecoilValue(userAtom);
  const param = useParams();
  const useLeagueManager = useRecoilValue(permissionsAtom.leagueManager);
  const useStreamer = useRecoilValue(permissionsAtom.streamer);
  const useCodeTraker = useRecoilValue(permissionsAtom.codeTraker);
  const [menuList, setMenuList] = useState<string[]>([]);
  const navigate = useNavigate();

  function goNavigate(pagePath: string) {
    return navigate(pagePath);
  }

  const { mutate: getInit } = useMutation(() => ServerServices.getInit(), {
    onSuccess: (data) => {
      // navigate(`/${param.game}/${param.league}`);
    },
  });

  useEffect(() => {
    const newMenuList = ['', 'bank'];
    if (useStreamer) {
      newMenuList.push('accountCode');
    }
    if (user?.game) {
      if (useLeagueManager) {
        newMenuList.push('signboard');
      }
    }
    if (useCodeTraker) {
      newMenuList.push('codeTraker');
    }
    setMenuList(newMenuList);
  }, [user, useStreamer, useLeagueManager]);

  const getLink = (menu: string) => {
    const { type, game, streamerCode } = param;
    if (type === TypeList[0]) {
      if (menu === '') {
        return `/${param.type}/${menu}`;
      }
      if (menu === 'bank') {
        return `/${type}/${menu}/${game}`;
      }
      if (menu === 'signboard') {
        return `/${type}/${menu}/${game}`;
      }
    }
    if (type === TypeList[1]) {
      if (menu === '') {
        return `/${param.type}/${streamerCode}`;
      }
      if (menu === 'bank') {
        return `/${type}/${menu}/${streamerCode}`;
      }
      if (menu === 'signboard') {
        return `/${type}/${menu}/${streamerCode}`;
      }
    }
    if (menu === 'accountCode') {
      return `/${type}/${menu}`;
    }
    if (menu === 'codeTraker') {
      return '/codeTraker';
    }
    return `/${TypeList[0]}`;
  };

  return (
    <MenuWrapper>
      <SUBJECT>MENU</SUBJECT>
      {menuList.map((menu: string, idx: number) => {
        return (
          <Link to={getLink(menu)}>
            <SidebarButton text={menu || 'home'} type='menu' />
          </Link>
        );
      })}
      {isLive ? <></> : <SidebarButton text='refresh' type='menu' onClick={getInit} />}
    </MenuWrapper>
  );
};
export default MenuBox;

const MenuWrapper = styled.div`
  margin-top: 30px;
  .MuiButton-root {
    justify-content: flex-start;
  }
`;

const SUBJECT = styled.div`
  font: normal normal normal 12px/25px Noto Sans CJK KR;
  color: ${colors.text};
  opacity: 0.5;
  margin-bottom: 11px;
`;
