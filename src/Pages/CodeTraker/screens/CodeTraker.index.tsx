import styled from '@emotion/styled/macro';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { permissionsAtom } from '../../../recoil/Auth/userAtom';
import { colors } from '../../../Styles/ui';
import CodeTrakerContent from '../Components/CodeTraker.content';
import { ICodeTrakerTableData } from '../Components/CodeTraker.makedata';

const buttonCss = {
  padding: '0 20px',
  height: 50,
  borderRadius: '10px',
};

const CodeTrakerIndex = () => {
  const { t } = useTranslation();
  const codeTraker = useRecoilValue(permissionsAtom.codeTraker);
  const param = useParams();
  const navigate = useNavigate();

  const setCodeTrakerData = (loadCodeTrakerData: ICodeTrakerTableData) => {};

  return (
    <Wrapper>
      <Headder>{t('codeTraker.title')}</Headder>
      <Body>
        <CodeTrakerContent codeTraker={[]} setCodeTrakerData={setCodeTrakerData} />
      </Body>
      {/* <Footer>dd</Footer> */}
    </Wrapper>
  );
};

export default CodeTrakerIndex;

const Wrapper = styled.div`
  color: ${colors.text};
  background-color: ${colors.num_222};
  border-radius: 10px;
  height: auto;
  padding: 40px 0;
`;

const Headder = styled.div`
  font: normal normal bold 24px/35px Noto Sans CJK KR;
  color: ${colors.text};
  padding: 0px 40px 24px 40px;
  width: 100%;
  border-bottom: solid 1px ${colors.num_555};
`;

const Body = styled.div`
  padding: 40px 40px 0px 40px;
`;

const Footer = styled.div`
  display: flex;
`;

const Left = styled.div`
  width: 100%;
`;
const Center = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Right = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
