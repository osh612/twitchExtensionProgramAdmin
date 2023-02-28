import { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { TypeList } from '../../components/Sidebar/Components/Sidebar.TypeBox';
import { userAtom } from '../../recoil/Auth/userAtom';
import gameAtom from '../../recoil/game/gameAtom';

const BroadcastType = () => {
  const user = useRecoilValue(userAtom);
  const param = useParams();
  const navigate = useNavigate();
  const gameList = useRecoilValue(gameAtom.gameList);
  useEffect(() => {
    if (!param.matchId) {
      if (param.type === TypeList[0]) {
        if (!param.game && gameList.length > 0) {
          navigate(gameList[0].key);
        }
      } else if (param.type === TypeList[1]) {
        navigate(`${user?.accountIdx}`);
      }
    }
  }, [param.type, gameList, param.league]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default BroadcastType;
