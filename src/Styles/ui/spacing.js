import { css } from '@emotion/react';

// 간격 size * 4
const spacing = {
  margin: size => css`
    margin: ${size * 4}px;
  `,
  marginL: size => css`
    margin-left: ${size * 4}px;
  `,
  marginR: size => css`
    margin-right: ${size * 4}px;
  `,
  marginT: size => css`
    margin-top: ${size * 4}px;
  `,
  marginB: size => css`
    margin-bottom: ${size * 4}px;
  `,

  marginX: size => css`
    margin-right: ${size * 4}px;
    margin-left: ${size * 4}px;
  `,
  marginY: size => css`
    margin-top: ${size * 4}px;
    margin-bottom: ${size * 4}px;
  `,
  padding: size => css`
    padding: ${size * 4}px;
  `,
  paddingX: size => css`
    padding-right: ${size * 4}px;
    padding-left: ${size * 4}px;
  `,
  paddingY: size => css`
    padding-top: ${size * 4}px;
    padding-bottom: ${size * 4}px;
  `,
  paddingL: size => css`
    padding-left: ${size * 4}px;
  `,
  paddingR: size => css`
    padding-right: ${size * 4}px;
  `,
  paddingT: size => css`
    padding-top: ${size * 4}px;
  `,
  paddingB: size => css`
    padding-bottom: ${size * 4}px;
  `,
};

export default spacing;
