import styled from '@emotion/styled/macro';
import { color } from '@mui/system';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../../recoil/Auth/userAtom';
import ScheduleAtom from '../../../recoil/schedule/scheduleAtom';
import { colors } from '../../../Styles/ui';

const SignboardComponent = () => {
  const { t } = useTranslation();
  const param = useParams();
  const leagueList = useRecoilValue(ScheduleAtom.leagueList);
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (leagueList.length > 0 && !param.league) {
      navigate(`${user?.game[0].key}/${leagueList[0].title.toLowerCase()}`);
    }
  }, [leagueList, param.league]);

  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
};

export default SignboardComponent;

const Wrapper = styled.div`
  width: 100%;
  // max-width: 1920px;
  min-width: 720px;
  height: auto;
  padding: 0px 40px;
  color: ${colors.text};
`;
