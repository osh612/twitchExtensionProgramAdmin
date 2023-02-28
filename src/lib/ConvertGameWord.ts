export default function ConvertGameWord(game: string) {
  if (game === '리그 오브 레전드') {
    return 'league_of_legend';
  }
  if (game === '발로란트') {
    return 'valorant';
  }
  if (game === '오버워치') {
    return 'overwatch';
  }
  if (game === '와일드 리프트') {
    return 'wildRift';
  }
  if (game === '배틀그라운드') {
    return 'battleGround';
  }
  return '';
}
