import { css } from '@emotion/react';
import { colors } from '.';

export const modalStyle = {
  // 리액트모달에 적용해야 하는 스타일
  reactModal: {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },

    content: {
      position: 'relative',
      inset: 0,
      border: 'none',
      padding: 0,
      minWidth: '380px',
      maxWidth: '500px',
      width: 'fit-content',
      height: 'fit-content',
      overflow: 'visible',
      backgroundColor: colors.bg_box,
      color: colors.text,
      WebkitOverflowScrolling: 'touch',
      outline: 'none',
      borderRadius: '20px',
      boxshadow: '0px 8px 16px 0 rgba(4, 0, 0, 0.4)',
    },
  },

  // 모달 사이즈
  size: {
    500: css`
      max-width: 500px;
    `,
  },
};

export default modalStyle;
