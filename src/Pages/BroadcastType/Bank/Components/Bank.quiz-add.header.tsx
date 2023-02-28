import styled from '@emotion/styled';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { colors } from '../../../../Styles/ui';

const QuizAddHeaderBox = ({
  headerName,
  onChangeHandler,
}: {
  headerName: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { t } = useTranslation();

  return (
    <QuizHeader>
      <LeftBox>
        <SpanRoundNo>ID</SpanRoundNo>
        <SpanQuizQuestionInput
          id='headerName'
          maxLength={50}
          placeholder={t('monitor.body.placeHolder.subject')}
          value={headerName}
          onChange={onChangeHandler}
        />
        {/* <QuizQuestionLabel text={quistionLabel} /> */}
      </LeftBox>
      <RightBox>
        {/* <AccessTimeFilledIcon
          sx={{
            color: colors.num_888,
            width: '24px',
            height: '24px',
          }}
        />
        <QuizGrayText>0sec Left</QuizGrayText>
        <PersonIcon
          sx={{
            color: colors.num_888,
            width: '24px',
            height: '24px',
          }}
        />
        <QuizGrayText>54,938 명</QuizGrayText> */}
      </RightBox>
    </QuizHeader>
  );
};

export default QuizAddHeaderBox;

const QuizHeader = styled.div`
  display: flex;
  padding: 23px 40px;
  border-bottom: solid 1px ${colors.num_444};
  justify-content: space-between;
`;

const LeftBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const RightBox = styled.div`
  display: flex;
  align-items: center;
`;

const SpanRoundNo = styled.span`
  text-align: left;
  font: normal normal bold 18px/26px Noto Sans CJK KR;
  color: ${colors.main};
  margin-right: 11px;
`;

const SpanQuizQuestionInput = styled.input`
  text-align: left;
  font: normal normal normal 15px/21px Noto Sans CJK KR;
  color: ${colors.text};
  margin-right: 11px;
  width: 100%;
`;

const QuizGrayText = styled.span`
  margin: 0 7px;
  color: ${colors.num_888};
  white-space: nowrap;
`;
