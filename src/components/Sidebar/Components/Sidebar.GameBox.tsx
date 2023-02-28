import styled from '@emotion/styled/macro';
import { Button, SvgIcon } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { permissionsAtom, userAtom, UserType } from '../../../recoil/Auth/userAtom';
import { colors } from '../../../Styles/ui';
import SidebarButton from '../../Ui/SidebarButton';

const GameBox = () => {
  const navigate = useNavigate();
  const useStreamer = useRecoilValue(permissionsAtom.streamer);
  const user: UserType | undefined = useRecoilValue(userAtom);
  const param = useParams();
  const [gameList, setGameList] = useState<string[]>([]);

  function goNavigate(pagePath: string) {
    return navigate(pagePath);
  }

  useEffect(() => {
    if (user?.game) {
      setGameList(user.game.map((data) => data.key));
    }
  }, [user]);

  if (useStreamer || user?.accountsType === 1) {
    return <></>;
  }

  return (
    <GameWrapper>
      <SUBJECT>GAME</SUBJECT>
      {gameList.map((game) => {
        return (
          <Link to={`/${param.type}/${game}`}>
            <SidebarButton text={game} type='game' />
          </Link>
        );
      })}
    </GameWrapper>
  );
};
export default GameBox;

const GameWrapper = styled.div`
  width: 100%;
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
