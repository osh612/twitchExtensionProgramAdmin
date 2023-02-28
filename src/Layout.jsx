import styled from '@emotion/styled';
import { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import SidebarContent from './components/Sidebar/Sidebar';
import MoveTopButton from './components/Ui/MoveTopButton';
import { colors, scrollbarStyle } from './Styles/ui';

const Layout = () => {
  const homeRef = useRef(null);
  const onHomeClick = () => {
    const elem = homeRef.current;
    elem.scroll(0, 0);
  };
  return (
    <CONTAINER>
      <SidebarContent />
      <WRAPPER>
        <Header />
        <CONTENTS ref={homeRef}>
          <Outlet />
          <MoveTopButton onClick={onHomeClick} />
        </CONTENTS>
      </WRAPPER>
    </CONTAINER>
  );
};

const CONTAINER = styled.main`
  display: flex;
  overflow: hidden;
  background-color: ${colors.num_111};
`;

const WRAPPER = styled.article`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh;
  overflow: hidden;
`;

const CONTENTS = styled.section`
  width: 100%;
  height: 100vh;
  ${scrollbarStyle.scroll_4};
`;

export default Layout;
