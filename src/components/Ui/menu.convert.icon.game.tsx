import { Icon } from '@mui/material';

export default function ConvertGameIcon(game: string) {
  const file = game;

  return (
    <Icon sx={{ width: 24, height: 24 }}>
      <img src={`/Images/game/ico-game-${file}.svg`} alt='' />
    </Icon>
  );

  return <></>;
}
