import { css } from '@emotion/react';
import theme from '../Theme';
import colors from './colors';
import spacing from './spacing';

const scrollbarStyle = {
  hidden: css`
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }

    &::-webkit-scrollbar-corner {
      /* display: none; */
    }
  `,

  scroll_4: css`
    overflow: overlay;

    &::-webkit-scrollbar {
      width: 8px;
      background-color: transparent;
      border-radius: 9999px;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
      border-radius: 9999px;
      ${spacing.marginY(1)}
    }

    &::-webkit-scrollbar-button {
      background-color: transparent;
    }

    &::-webkit-scrollbar-corner {
      background-color: transparent;
      border-radius: 9999px;
    }

    &::-webkit-scrollbar-thumb {
      border-top: 2px solid rgba(0, 0, 0, 0);
      border-bottom: 2px solid rgba(0, 0, 0, 0);
      border-right: 2px solid rgba(0, 0, 0, 0);
      border-left: 2px solid rgba(0, 0, 0, 0);
      background-clip: padding-box;
      border-radius: 9999px;
      background-color: ${colors.main};
    }
  `,

  scroll_8: css`
    overflow: overlay;

    &::-webkit-scrollbar {
      width: 12px;
      background-color: transparent;
      border-radius: 9999px;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
      border-radius: 9999px;
      ${spacing.marginY(1)}
    }

    &::-webkit-scrollbar-button {
      background-color: transparent;
    }

    &::-webkit-scrollbar-corner {
      background-color: transparent;
      border-radius: 9999px;
    }

    &::-webkit-scrollbar-thumb {
      border-top: 2px solid rgba(0, 0, 0, 0);
      border-bottom: 2px solid rgba(0, 0, 0, 0);
      border-right: 2px solid rgba(0, 0, 0, 0);
      border-left: 2px solid rgba(0, 0, 0, 0);
      background-clip: padding-box;
      border-radius: 9999px;
      background-color: ${colors.main};
    }
  `,
};

export default scrollbarStyle;
