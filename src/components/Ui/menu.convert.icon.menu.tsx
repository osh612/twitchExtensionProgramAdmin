import { Icon } from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite';

export default function ConvertMenuIcon(text: string) {
  if (text === 'signboard') {
    return <FavoriteIcon sx={{ width: 24, height: 24 }} />;
  }

  const getIconImg = (text: string) => {
    let svgName = text;
    if (svgName === 'codeTraker') {
      svgName = 'accountCode';
    }
    return <img src={`/Images/menu/ico-${svgName}.svg`} alt='' />;
  };

  return (
    <Icon sx={{ width: 24, height: 24, display: 'flex', alignItems: 'center' }}>{getIconImg(text)}</Icon>
  );

  return <></>;
}
