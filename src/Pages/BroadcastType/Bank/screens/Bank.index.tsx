import styled from '@emotion/styled/macro';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import QuizBankTable from '../../../../components/Ui/ReactTable/QuizBank/QuizBankTableComponent';
import { permissionsAtom } from '../../../../recoil/Auth/userAtom';
import QuizBankServices, { IBank, IBankListDataParam } from '../../../../services/QuizBankServices';
import { colors } from '../../../../Styles/ui';
import DownloadQuizButton from '../Components/Bank.button.download-quiz';
import UploadQuizButton from '../Components/Bank.button.upload-quiz';

const buttonCss = {
  padding: '0 20px',
  height: 50,
  borderRadius: '10px',
};

const BankIndex = () => {
  const { t } = useTranslation();
  const perBank = useRecoilValue(permissionsAtom.bank);
  const param = useParams();
  const navigate = useNavigate();
  const [bank, setBank] = useState<IBank[]>([]);
  const { mutate: getBankListData, isLoading } = useMutation(
    (data: IBankListDataParam) => QuizBankServices.getBankListData(data),
    {
      onSuccess: (data) => {
        setBank(data.bank);
      },
    },
  );

  useEffect(() => {
    // if (param.game) {
    //   getBankListData({
    //     game: param.game,
    //   });
    // }
    getBankListData({
      game: 'league_of_legend',
    });
  }, [param.game]);

  if (isLoading) {
    return <></>;
  }

  return (
    <Wrapper>
      <Headder>{t('bank.title')}</Headder>
      <Body>
        <QuizBankTable bank={bank} />
      </Body>
      <Footer>
        {perBank ? (
          <>
            <Left />
            <Center>
              <Button variant='contained' sx={buttonCss} onClick={() => navigate('quiz')}>
                {t('bank.button.addQuiz')}
              </Button>
            </Center>
            <Right>
              <DownloadQuizButton buttonCss={buttonCss} bank={bank} />
              <UploadQuizButton buttonCss={buttonCss} />
            </Right>
          </>
        ) : (
          <></>
        )}
      </Footer>
    </Wrapper>
  );
};

export default BankIndex;

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
