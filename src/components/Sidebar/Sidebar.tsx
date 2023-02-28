import styled from '@emotion/styled';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { deplayDate, version } from '../../Pages/config';
import { colors } from '../../Styles/ui';
import GameBox from './Components/Sidebar.GameBox';
import MenuBox from './Components/Sidebar.MenuBox';
import TypeBox from './Components/Sidebar.TypeBox';
import UserBox from './Components/Sidebar.UserBox';

const SidebarContent = () => {
  const { t } = useTranslation();
  return (
    <SidebarWrapper>
      <SUBJECT>{t('title')}</SUBJECT>
      <UserBox />
      <TypeBox />
      <GameBox />
      <MenuBox />
      <VersionBox>
        <div>Version: {version}</div>
        <div>Deployed: {deplayDate}</div>
      </VersionBox>
    </SidebarWrapper>
  );
};

export default SidebarContent;

const SidebarWrapper = styled.div`
  width: 270px;
  height: 100vh;
  background-color: ${colors.num_222};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px;
`;

const SUBJECT = styled.div`
  margin-top: 24px;
  color: ${colors.text};
  font: normal normal bold 20px/25px Poppins;
`;

const VersionBox = styled.div`
  height: 100%;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: center;
  color: ${colors.text_none};
`;
