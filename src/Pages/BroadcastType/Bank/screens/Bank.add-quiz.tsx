import styled from '@emotion/styled/macro';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { IQuizInfo } from '../../../../services/QuizServices';
import { colors } from '../../../../Styles/ui';
import { quizColorMapping } from '../../Components/lib/quizColorMapping';

const outsidePerWidth = 5;

const newQuizInfo: IQuizInfo = {
  idx: 0,
  item: [],
  matchState: 0,
  name: '',
  tooltip: '',
  orders: 0,
  pick: 0,
  quizTypeIdx: 0,
  state: 0,
  times: 0,
  startDate: '',
  type: 0,
  fixKill: 0,
  allCorrect: 0,
};

export interface IQuizItem {
  idx: number;
  name: string;
  counts: number;
  kills: number;
  width: number;
}

// 이 페이지는 들어가지 않아서 빼기로 함.

const BankAddQuiz = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const param = useParams();
  const [quizInfo, setQuizInfo] = useState<IQuizInfo>(newQuizInfo);

  // const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value, id } = e.target;
  //   updateQuizInfo2({
  //     key: id,
  //     data: value,
  //     setQuizInfo,
  //     quizInfo,
  //   });
  // };

  // const slotHandler = ({ key, data }: { key: string; data: IQuizItem[] }) => {
  //   updateQuizInfo2({
  //     key,
  //     data,
  //     setQuizInfo,
  //     quizInfo,
  //   });
  // };

  return (
    <Wrapper>
      <Header>
        <HeaderPart num={outsidePerWidth}>
          <GoBackIcon
            src='/Images/icon/ico-arrow-down.svg'
            alt='go-back'
            onClick={() => navigate(`/bank/${param.game}`)}
          />
        </HeaderPart>
        <HeaderMain>{t('bank.title')}</HeaderMain>
        <HeaderPart num={outsidePerWidth} />
      </Header>
      <Body>
        <QuizBox outlineColor={quizColorMapping[0]}>
          {/* <QuizAddHeaderBox headerName={quizInfo.name} onChangeHandler={onChangeHandler} />
          <QuizAddBodyBox quizInfo={quizInfo} onChangeHandler={onChangeHandler} /> */}
        </QuizBox>
      </Body>
    </Wrapper>
  );
};

export default BankAddQuiz;

const Wrapper = styled.div`
  color: ${colors.text};

  .MuiTabs-flexContainer {
    border-bottom: solid 1px ${colors.num_444};
  }

  .MuiTab-root {
    border-radius: 10px 10px 0px 0px;
    border: 1px solid ${colors.num_444};
    border-bottom-color: ${colors.num_222};
    color: ${colors.text};
    margin: 0 3px;
  }

  .MuiTabs-indicator {
    border: 1px solid ${colors.num_222};
    background-color: ${colors.num_222};
  }
`;

const Header = styled.div`
  height: 112px;
  width: 100%;
  display: flex;
  background-color: ${colors.num_222};
  border-radius: 10px 10px 0px 0px;
  border-bottom: solid 1px ${colors.num_555};
`;

const Body = styled.div`
  color: ${colors.text};
  background-color: ${colors.num_222};
  border-radius: 0px 0px 10px 10px;
  padding: 40px;
`;

const HeaderPart = styled.div<{ num: number }>`
  height: 100%;
  width: ${({ num }) => num}%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderMain = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  font: normal normal bold 24px/35px Noto Sans CJK KR;
  color: ${colors.text};
`;

const GoBackIcon = styled.img`
  cursor: pointer;
`;

const QuizBox = styled.div<{ outlineColor: string }>`
  width: 100%;
  border: solid 1px ${({ outlineColor }) => outlineColor};
  border-radius: 10px;
`;
