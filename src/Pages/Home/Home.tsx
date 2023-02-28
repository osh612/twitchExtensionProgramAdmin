/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

function Home() {
  return (
    <HomeWrapper>
      {/* 탭 컨텐츠 */}
      <div>
        <Outlet />
      </div>
    </HomeWrapper>
  );
}

export default Home;

const HomeWrapper = styled.div`
  display: flex;
`;

const SButton = styled.button`
  width: 100%;
  height: 30px;
  cursor: pointer;
  background-color: #3f3;
  border-radius: 30px;
  margin: 10px 20px;
`;
