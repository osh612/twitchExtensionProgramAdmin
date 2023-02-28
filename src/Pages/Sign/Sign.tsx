import styled from '@emotion/styled/macro';
import { Outlet } from 'react-router-dom';
import { colors } from '../../Styles/ui';

const SignComponent = () => {
  return (
    <Wrapper>
      <CONTENT>
        <Outlet />
        <COPYRIGHT>Copyright Team Snowball All Rights Reserved.</COPYRIGHT>
      </CONTENT>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background: #111111 0% 0% no-repeat padding-box;
  justify-content: center;
  align-items: center;
`;

export default SignComponent;

const COPYRIGHT = styled.div`
  margin-top: 20px;
  width: 100%;
  text-align: center;
  font: normal normal normal 12px/17px Noto Sans CJK KR;
  color: ${colors.num_999};
`;

const CONTENT = styled.div`
  width: 1216px;
  // height: 290px;
  background-image: url('/Images/bg-login.png');
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
