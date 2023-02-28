import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled/macro';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { colors } from '../../Styles/ui';
import { permissionsAtom } from '../../recoil/Auth/userAtom';
import LanguageDropBox from './Components/Header.drop-box.language';
import AuthrityButton from './Components/Header.button.authrity';
import UserInfoButton from './Components/Header.button.user-info';

function HeaderContent() {
  const perManagement = useRecoilValue(permissionsAtom.management);

  return (
    <NavWrapper>
      <LanguageDropBox />
      <Wall />
      {perManagement ? (
        <>
          <AuthrityButton />
          <Wall />
        </>
      ) : (
        <></>
      )}

      <UserInfoButton />
    </NavWrapper>
  );
}

export default HeaderContent;
const NavCss = css`
  width: 100%;
  display: flex;
  align-items: center;
  list-style: none;
`;

const NavWrapper = styled.div`
  width: 100%;
  height: 77px;
  background-color: ${colors.bg_transparency};
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
  justify-content: flex-end;
  ${NavCss}

  .MuiButton-root {
    text-transform: none;
  }
`;

const Wall = styled.div`
  height: 30%;
  width: 1px;
  margin: 0px 12px;
  background-color: white;
`;
