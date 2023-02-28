export default function ConvertGameName(game: string | undefined) {
  if (game === 'league_of_legend') {
    return '리그 오브 레전드';
  }
  if (game === 'valorant') {
    return '발로란트';
  }
  if (game === 'overwatch') {
    return '오버워치';
  }
  if (game === 'wildRift') {
    return '와일드 리프트';
  }
  if (game === 'battleGround') {
    return '배틀그라운드';
  }
  return '';
}
