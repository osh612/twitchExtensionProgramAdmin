import styled from '@emotion/styled/macro';
import { color } from '@mui/system';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { permissionsAtom } from '../../../recoil/Auth/userAtom';
import ScheduleAtom from '../../../recoil/schedule/scheduleAtom';
import ScheduleServices from '../../../services/ScheduleServices';
import { colors } from '../../../Styles/ui';

const GameContent = () => {
  const { t } = useTranslation();
  const param = useParams();
  const leagueList = useRecoilValue(ScheduleAtom.leagueList);
  const navigate = useNavigate();
  const useLeagueManager = useRecoilValue(permissionsAtom.leagueManager);

  useEffect(() => {
    if (useLeagueManager) {
      if (leagueList.length > 0 && !param.league) {
        navigate(`/${param.type}/${param.game}/${leagueList[0].title.toLowerCase()}`);
      }
    }
  }, [leagueList, param.league]);

  return (
    <Wrapper>
      <TypeHeader>{param.type?.toUpperCase()}</TypeHeader>
      <Outlet />
    </Wrapper>
  );
};

export default GameContent;

const Wrapper = styled.div`
  width: 100%;
  // max-width: 1920px;
  min-width: 720px;
  height: 100%;
  padding: 0px 40px;
  color: ${colors.text};
`;

const TypeHeader = styled.div`
  font-family: 'Noto Sans CJK KR Bold', 'Noto Sans CJK KR', sans-serif;
  font-weight: 700;
  color: #cccccc;
  font-size: 30px;
  padding: 0 25px 22px;
`;
