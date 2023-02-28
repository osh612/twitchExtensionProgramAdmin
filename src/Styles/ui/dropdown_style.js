import { css } from '@emotion/react';
import { transitionStyle, typoStyle } from '.';
import colors from './colors';

const dropdownStyle = {
  select_head: css`
    position: relative;
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    background-color: ${colors.bg_select};
    cursor: pointer;
    ${typoStyle.select}
    ${transitionStyle.background}
    &::after {
      content: '';
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      border: 3px solid transparent;
      border-top: 5px solid ${colors.info};
    }
  `,
  select_list: {},
  select_item: css`
    width: 100%;
    ${typoStyle.select}
    padding: 10px;
    background-color: ${colors.bg_select};

    &:hover {
      background-color: ${colors.bg_light};
    }
  `,

  select_opacity: css`
    opacity: 0.3;
  `,
};

export default dropdownStyle;
