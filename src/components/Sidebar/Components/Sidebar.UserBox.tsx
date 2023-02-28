import styled from '@emotion/styled/macro';
import { useRecoilValue } from 'recoil';
import { getAccountGrade } from '../../../Pages/Management/lib/Management.list-set';
import { userAtom } from '../../../recoil/Auth/userAtom';
import { colors } from '../../../Styles/ui';

const UserBox = () => {
  const user = useRecoilValue(userAtom);
  return (
    <UserBoxWrapper>
      <ProfileImg src='/Images/no-profile.png' />
      <Position>{getAccountGrade(user?.accountsType ?? 0)}</Position>
      <Email>{user?.email ?? user?.uid}</Email>
    </UserBoxWrapper>
  );
};

export default UserBox;

const UserBoxWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImg = styled.img`
  max-width: 63px;
  max-height: 63px;
`;

const Position = styled.div`
  margin-top: 14px;
  color: ${colors.num_ccc};
  font: normal normal bold 15px/21px Noto Sans CJK KR;
`;

const Email = styled.div`
  margin-top: 3px;
  color: ${colors.num_888};
  font: normal normal normal 13px/19px Noto Sans CJK KR;
`;
