import { Button, Icon, SvgIcon, SvgIconProps, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { color } from '@mui/system';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { colors } from '../../Styles/ui';
import { TypeList } from '../Sidebar/Components/Sidebar.TypeBox';
import ConvertGameIcon from './menu.convert.icon.game';
import ConvertMenuIcon from './menu.convert.icon.menu';
import ConvertTypeIcon from './menu.convert.icon.type';

interface SidebarButtonParam {
  text: string;
  type: string;
  onClick?: any;
}

const getIconImg = (type: string, text: string) => {
  switch (type) {
    case 'game':
      return ConvertGameIcon(text);
    case 'menu':
      return ConvertMenuIcon(text);
    case 'type':
      return ConvertTypeIcon(text);
    default:
      return <></>;
  }
};

const SidebarButton = ({ text, type, onClick }: SidebarButtonParam) => {
  const location = useLocation();
  const { t } = useTranslation();
  const param = useParams();
  const active = ((type: string, text: string) => {
    function checkMenuActive(text: string) {
      const { game, type, streamerCode } = param;
      if (text === 'home') {
        if (type === TypeList[0]) {
          return game !== undefined && location.pathname.split('/')[2] === game;
        }
        if (type === TypeList[1]) {
          return streamerCode !== undefined && location.pathname.split('/')[2] === streamerCode;
        }
      }
      if (text === 'accountCode') {
        return location.pathname.split('/')[2] === text;
      }
      if (text === 'codeTraker') {
        return location.pathname.split('/')[1] === text;
      }
      return location.pathname.split('/')[2] === text;
    }
    if (type === 'game') return location.pathname.includes(text);
    if (type === 'menu') return checkMenuActive(text);
    if (type === 'type') return location.pathname.includes(text);
    return false;
  })(type, text);

  return (
    <Button
      sx={{
        backgroundColor: active ? colors.num_333 : colors.bg_transparency,
        paddingLeft: 4,
        color: active ? colors.text : colors.text_none,
      }}
      fullWidth
      startIcon={getIconImg(type, text)}
      onClick={onClick}
    >
      {t(type === 'game' ? `gameList.${text}` : `${type}.${text}`)}
    </Button>
  );
};

export default SidebarButton;
