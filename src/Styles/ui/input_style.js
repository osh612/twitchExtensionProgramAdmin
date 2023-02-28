import { css } from '@emotion/react';
import { colors, transitionStyle, spacing, borderRadiusStyle } from '.';

const inputStyle = {
  color: {
    default: css`
      color: ${colors.text};
      background-color: ${colors.bg_checkbox};
      outline: 1px solid rgba(89, 66, 186, 0);
      box-shadow: 0 0 1px rgba(89, 66, 186, 0);
      transition: all 0.3s ease-in-out;

      &::placeholder {
        color: ${colors.info};
        ${transitionStyle.opacity}
      }

      &:focus {
        outline: 1px solid rgba(89, 66, 186, 0.8);
        box-shadow: 0 0 1px rgba(89, 66, 186, 0.4);
        &::placeholder {
          opacity: 0;
        }
      }
    `,

    main: css`
      color: ${colors.text};
      background-color: ${colors.bg_select};
      outline: 1px solid rgba(89, 66, 186, 0);
      transition: all 0.3s ease-in-out;

      &::placeholder {
        color: ${colors.info};
        ${transitionStyle.opacity}
      }

      &:focus {
        outline: 1px solid rgba(89, 66, 186, 1);
        box-shadow: 0 0 1px rgba(89, 66, 186, 0.4);
        &::placeholder {
          opacity: 0;
        }
      }
      &:read-only {
        outline: 1px solid rgba(89, 66, 186, 0);
        box-shadow: 0 0 1px rgba(89, 66, 186, 0);
        &::placeholder {
          opacity: 0;
        }
      }
    `,
  },
  // size - 폰트사이즈 기준
  size: {
    13: css`
      width: 100%;
      ${spacing.paddingY(2)};
      ${spacing.paddingX(2)};
      ${borderRadiusStyle[10]}
      font-size: 13px;
    `,
  },
};

export default inputStyle;
