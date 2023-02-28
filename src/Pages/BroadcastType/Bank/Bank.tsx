import styled from '@emotion/styled/macro';
import { color } from '@mui/system';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import ScheduleAtom from '../../../recoil/schedule/scheduleAtom';
import ScheduleServices from '../../../services/ScheduleServices';
import { colors } from '../../../Styles/ui';

const BankContent = () => {
  const { t } = useTranslation();
  const param = useParams();
  const leagueList = useRecoilValue(ScheduleAtom.leagueList);
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
};

export default BankContent;

const Wrapper = styled.div`
  width: 100%;
  // max-width: 1920px;
  min-width: 720px;
  height: auto;
  padding: 0px 40px;
  color: ${colors.text};
`;
