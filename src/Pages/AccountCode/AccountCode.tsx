import styled from '@emotion/styled/macro';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useRecoilValue } from 'recoil';
import { CustomInput } from '../../components/Ui/CustomInput';
import LineBreak from '../../components/Ui/LineBreak';
import { userAtom } from '../../recoil/Auth/userAtom';
import ManagerServices, { IIssueManagerCodeParam } from '../../services/ManagerServices';
import { colors } from '../../Styles/ui';
import { toastError, toastSuccess } from '../../components/Toastify/ToasitifyContainer';

const buttonCss = {
  width: '30%',
  height: '50px',
  margin: '0px 10px',
  borderRadius: '10px',
};

const AccountCodeContent = () => {
  const user = useRecoilValue(userAtom);
  const { t } = useTranslation();
  const [infinityCode, setInfinityCode] = useState<string>('');
  const [oneTimeCode, setoneTimeCode] = useState<string>('');

  useEffect(() => {
    if (user) {
      readManagerCode(user.accountIdx);
    }
  }, [user]);

  const { mutate: readManagerCode, isLoading: readManagerCodeLoading } = useMutation(
    (accountIdx: number) => ManagerServices.readManagerCode({ accountIdx }),
    {
      onSuccess: (data) => {
        const { managerCodeList } = data;
        if (managerCodeList) {
          managerCodeList.forEach((codeInfo) => {
            if (codeInfo.loginType === 1) {
              setInfinityCode(codeInfo.loginCode);
            }
            if (codeInfo.loginType === 2) {
              setoneTimeCode(codeInfo.loginCode);
            }
          });
        }
      },
    },
  );

  const { mutate: issueManagerCode } = useMutation(
    (data: IIssueManagerCodeParam) => ManagerServices.issueManagerCode(data),
    {
      onSuccess: (data) => {
        const { managerCode } = data;
        if (managerCode.loginType === 1) {
          setInfinityCode(managerCode.loginCode);
        }
        if (managerCode.loginType === 2) {
          setoneTimeCode(managerCode.loginCode);
        }
      },
    },
  );

  const issueManagerCodeHandler = (type: number) => {
    if (user) {
      const param: IIssueManagerCodeParam = {
        accountIdx: user.accountIdx,
        loginType: type,
      };
      issueManagerCode(param);
    }
  };

  const CopyCodeHandler = (code: string) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        toastSuccess(t('accountCode.clipboard.success'));
      })
      .catch(() => {
        toastError(t('accountCode.clipboard.success'));
      });
  };

  return (
    <Wrapper>
      <AccountCodeWrapeer>
        <AccountCodeBox>
          <AccountCreateCodeBox>
            <AccountHeader>{t('accountCode.header.title')}</AccountHeader>
          </AccountCreateCodeBox>
          <AccountCreateCodeBox>
            <AccountHeader>{t('accountCode.header.createInfinityAccountCode')}</AccountHeader>
            <AccountCodeBody>
              <CustomInput
                EndMuiIcon={ContentCopyIcon}
                endiconHandler={() => CopyCodeHandler(infinityCode)}
                value={infinityCode}
                readOnly
              />
              <Button variant='contained' sx={buttonCss} onClick={() => issueManagerCodeHandler(1)}>
                {t('accountCode.header.createInfinityAccountCode')}
              </Button>
            </AccountCodeBody>

            <AccountCodeDesc>
              <LineBreak text={t('accountCode.desc.createInfinityAccountCode')} />
            </AccountCodeDesc>
          </AccountCreateCodeBox>
          <AccountCreateCodeBox>
            <AccountHeader>{t('accountCode.header.createOneTimeAccountCode')}</AccountHeader>
            <AccountCodeBody>
              <CustomInput
                EndMuiIcon={ContentCopyIcon}
                endiconHandler={() => CopyCodeHandler(oneTimeCode)}
                value={oneTimeCode}
                readOnly
              />
              <Button variant='contained' sx={buttonCss} onClick={() => issueManagerCodeHandler(2)}>
                {t('accountCode.header.createOneTimeAccountCode')}
              </Button>
            </AccountCodeBody>

            <AccountCodeDesc>
              <LineBreak text={t('accountCode.desc.createOneTimeAccountCode')} />
            </AccountCodeDesc>
          </AccountCreateCodeBox>
        </AccountCodeBox>
      </AccountCodeWrapeer>
    </Wrapper>
  );
};

export default AccountCodeContent;

const Wrapper = styled.div`
  width: 100%;
  // max-width: 1920px;
  min-width: 720px;
  height: auto;
  padding: 0px 40px;
  color: ${colors.text};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AccountCodeWrapeer = styled.div`
  width: 100%;
  height: auto;
  padding: 60px;
  background-color: ${colors.num_222};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 55px 0;
`;

const AccountCodeBox = styled.div`
  width: 700px;
  height: auto;
  border-radius: 10px;
  border: 1px solid ${colors.num_444};
  padding-bottom: 30px;
`;

const AccountHeader = styled.div`
  padding: 24px 0px;
`;

const AccountCreateCodeBox = styled.div`
  padding: 0 40px;
`;

const AccountCodeDesc = styled.div`
  padding: 8px 18px;
  font-family: 'Noto Sans CJK KR', sans-serif;
`;

const AccountCodeBody = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
`;
