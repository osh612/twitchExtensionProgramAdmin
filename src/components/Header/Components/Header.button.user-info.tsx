import { AccountCircle, Logout } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userAtom ,userProfileAtom } from '../../../recoil/Auth/userAtom';
import { colors } from '../../../Styles/ui';
import ConvertMenuIcon from '../../Ui/menu.convert.icon.menu';

export default function UserInfoButton() {
  const [user, setUser] = useRecoilState(userAtom);
  const [userProfile, setUserProfile] = useRecoilState(userProfileAtom);
  const navigate = useNavigate();

  const onClick = () => {
    // console.log('user', user);
  };
  if (!user) {
    return <></>;
  }

  const logoutHandler = () => {
    setUser(undefined);
    setUserProfile(undefined);
    sessionStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      <Button onClick={onClick} color='secondary' startIcon={<AccountCircle />}>
        {user.uid}
      </Button>
      <IconButton aria-label='logout' onClick={logoutHandler}>
        <Logout color='secondary' />
      </IconButton>
    </>
  );
}
