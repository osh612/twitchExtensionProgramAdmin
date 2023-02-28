import { css } from '@emotion/react';
import { typoStyle } from '.';
import theme from '../Theme';

const tableStyle = {
  table_head: css`
    display: flex;
    align-items: center;
    background-color: #3a3745;
    margin-bottom: 3px;
    padding: 0 10px;
    ${typoStyle.table_head}
  `,
  table_row: css`
    position: relative;
    display: flex;
    align-items: center;
    font-size: 15px;
    padding: 0 10px;
    ${typoStyle.contents}

    &:not(:last-child):after {
      position: absolute;
      bottom: 0;
      left: 0;
      content: '';
      width: 100%;
      height: 1px;
      background-color: ${theme.colors.border_light};
    }
  `,

  table_row_none_after: css`
    position: relative;
    display: flex;
    align-items: center;
    font-size: 15px;
    padding: 0 10px;
    ${typoStyle.contents}
    margin-bottom: 1px;
  `,

  table_item: css`
    display: flex;
    align-items: center;
    ${typoStyle.table_head}
  `,
};

export default tableStyle;
