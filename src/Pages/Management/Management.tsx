import styled from '@emotion/styled/macro';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import PageTabs from '../../components/Ui/PageTabs';
import { colors } from '../../Styles/ui';
import { getTitle, ManagementMenu } from './lib/Management.menu';

const ManagementContent = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const key = location.pathname.split('/management')[1];

  return (
    <Wrapper>
      <Container>
        <Headder>{t(getTitle(key))}</Headder>
        <Body>
          <PageTabs tabList={ManagementMenu} />
          <Outlet />
        </Body>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  // max-width: 1920px;
  min-width: 720px;
  height: 95%;
  padding: 0px 40px;
  color: ${colors.text};
`;

const Container = styled.div`
  color: ${colors.text};
  background-color: ${colors.num_222};
  border-radius: 10px;
  padding: 40px 0;
`;

const Headder = styled.div`
  font: normal normal bold 24px/35px Noto Sans CJK KR;
  color: ${colors.text};
  padding: 0px 40px 24px 40px;
  width: 100%;
  border-bottom: solid 1px ${colors.num_555};
`;

const Body = styled.div`
  padding: 40px 40px;
`;

export default ManagementContent;
