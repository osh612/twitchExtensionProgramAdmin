import styled from '@emotion/styled/macro';
import { Button, SvgIcon } from '@mui/material';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { permissionsAtom, userAtom, UserType } from '../../../recoil/Auth/userAtom';
import gameAtom from '../../../recoil/game/gameAtom';
import ServerServices from '../../../services/ServerServices';
import { colors } from '../../../Styles/ui';
import SidebarButton from '../../Ui/SidebarButton';

export const TypeList = ['e-sport', 'streamer'];

const TypeBox = () => {
  const useStreamer = useRecoilValue(permissionsAtom.streamer);
  const useLeagueManager = useRecoilValue(permissionsAtom.leagueManager);
  const user: UserType | undefined = useRecoilValue(userAtom);
  const gameList = useRecoilValue(gameAtom.gameList);
  const param = useParams();
  const loaction = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (useLeagueManager && loaction.pathname === '/') {
      navigate(TypeList[0]);
    } else if (useStreamer && loaction.pathname === '/') {
      navigate(TypeList[1]);
    }
  }, [param.type, useLeagueManager, useStreamer]);

  if (user?.accountsType === 1) {
    return <></>;
  }

  return (
    <MenuWrapper>
      <SUBJECT>TYPE</SUBJECT>
      {TypeList.map((type: string, idx: number) => {
        return (
          <Link to={`/${type}`}>
            <SidebarButton text={type} type='type' />
          </Link>
        );
      })}
    </MenuWrapper>
  );
};
export default TypeBox;

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
