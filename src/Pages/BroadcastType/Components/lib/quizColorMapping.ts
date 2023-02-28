import { colors } from '../../../../Styles/ui';

export const quizColorMapping = [
  colors.num_444,
  colors.quiz_wait,
  colors.quiz_playing,
  colors.quiz_progress,
  colors.quiz_result_close,
  colors.quiz_vote_close,
  colors.quiz_result_close_all_collect,
];

export const MonitorButtonCss = [
  {
    // 문제 등록
    // text: t(`game.button.0`),
    borderRadius: '10px',
    backgroundColor: colors.bg_transparency,
    color: colors.text,
    border: `solid 1px ${colors.text}`,
    ':hover': {
      color: colors.main,
    },
  },
  {
    // 세팅 완료
    // text: t(`game.button.1`),
    borderRadius: '10px',
    backgroundColor: colors.bg_transparency,
    color: colors.main,
    border: `solid 1px ${colors.main}`,
    ':hover': {
      color: colors.text,
    },
  },
  {
    // 문제 진행중
    // text: t(`game.button.2`),
    borderRadius: '10px',
    backgroundColor: colors.btn_continue,
    color: colors.main,
    border: `solid 1px ${colors.btn_continue}`,
    ':hover': {
      color: colors.text,
      backgroundColor: colors.btn_continue,
      border: `solid 1px ${colors.btn_continue}`,
    },
  },
  {
    // 결과 확인
    // text: t(`game.button.3`),
    borderRadius: '10px',
    backgroundColor: colors.num_444,
    color: colors.text,
    border: `solid 1px ${colors.num_444}`,
    ':hover': {
      color: colors.text,
      backgroundColor: colors.num_888,
      border: `solid 1px ${colors.num_444}`,
    },
  },
  {
    // 문제 등록 중
    // text: t(`game.button.4`),
    borderRadius: '10px',
    backgroundColor: colors.btn_wating,
    color: colors.text,
    border: `solid 1px ${colors.btn_wating}`,
    ':hover': {
      color: colors.text,
      backgroundColor: colors.btn_wating,
      border: `solid 1px ${colors.btn_wating}`,
    },
  },
];
