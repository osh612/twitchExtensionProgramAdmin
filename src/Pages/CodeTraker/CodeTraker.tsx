import styled from '@emotion/styled/macro';
import { color } from '@mui/system';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { colors } from '../../Styles/ui';

const CodeTraker = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
};

export default CodeTraker;

const Wrapper = styled.div`
  width: 100%;
  // max-width: 1920px;
  min-width: 720px;
  height: auto;
  padding: 0px 40px;
  color: ${colors.text};
`;
