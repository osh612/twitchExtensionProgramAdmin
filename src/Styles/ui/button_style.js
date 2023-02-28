import { css } from '@emotion/react';
import colors from './colors';
import transitionStyle from './transition_styled';

const buttonStyle = {
  color: {
    main: css`
      background-color: ${colors.point};
      ${transitionStyle.background};
      &:disabled {
        background-color: ${colors.default};
      }
      &:not(:disabled):hover {
        background-color: ${colors.point_hover};
      }
    `,
    normal: css`
      color: ${colors.text_hover};
      background-color: ${colors.default};
      ${transitionStyle.background};
      &:disabled {
        background-color: ${colors.default};
      }

      &:not(:disabled):hover,
      &:not(:disabled).is-active {
        color: ${colors.text};
        background-color: ${colors.default_hover};
      }
    `,
    default: css`
      background-color: ${colors.default};
      ${transitionStyle.background};
      &:disabled {
        background-color: ${colors.default};
      }
      &:not(:disabled):hover {
        background-color: ${colors.point};
      }
    `,
  },

  size: {
    /* w-full */
    full: css`
      width: 100%;
    `,
    /* lg : 25px */
    25: css`
      padding: 25px;
    `,
    x_25: css`
      padding-right: 25px;
      padding-left: 25px;
    `,
    y_25: css`
      padding-top: 25px;
      padding-bottom: 25px;
    `,
    /* md : 20px */
    20: css`
      padding: 20px;
    `,
    x_20: css`
      padding-right: 20px;
      padding-left: 20px;
    `,
    y_20: css`
      padding-top: 20px;
      padding-bottom: 20px;
    `,

    /* sm : 10px */
    10: css`
      padding: 10px;
    `,
    x_8: css`
      padding-right: 8px;
      padding-left: 8px;
    `,
    y_8: css`
      padding-top: 8px;
      padding-bottom: 8px;
    `,

    y_16: css`
      padding-top: 16px;
      padding-bottom: 16px;
    `,
  },
};

export default buttonStyle;
