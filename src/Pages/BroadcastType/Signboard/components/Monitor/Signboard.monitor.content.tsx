import styled from '@emotion/styled';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { colors } from '../../../../../Styles/ui';
import EmergencyButton from './Signboard.monitor.button.emergency';
import ResumptionButton from './Signboard.monitor.button.resumption';
import DeletContentButton from './Signboard.monitor.button.delete';

interface ISignboardContentBoxParam {
  idx: number;
  writer: string;
  regDate: string;
  content: string;
  state: number;
}

const getSideButton = (state: number, idx: number, content: string) => {
  if (state === 1) {
    return <EmergencyButton idx={idx}/>;
  }
  if (state === 3) {
    return (
      <>
        <ResumptionButton idx={idx} content={content}/>
        <DeletContentButton />
      </>
    );
  }
  return <></>;
};

const SignboardContentBox = ({ idx, writer, regDate, content, state }: ISignboardContentBoxParam) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <WriterBox>
        <InfoBox>
          <Label>{t('common.writer')}</Label>
          <Writer>{writer}</Writer>
          <RegDate>{regDate}</RegDate>
        </InfoBox>
        <SideButtonBox >{getSideButton(state, idx, content)}</SideButtonBox>
      </WriterBox>
      <ContentBox>
        <Label>{t('common.content')}</Label>
        <CustomInput defaultValue={content} type='text' name='content' readOnly />
      </ContentBox>
    </Wrapper>
  );
};

export default SignboardContentBox;

const Wrapper = styled.div`
  width: 100%;
  padding: 25px;
  display: flex;
  flex-direction: column;
`;

const WriterBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 50%;
  justify-content: space-between;
`;

const ContentBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 50%;
  margin-top: 21px;
`;

const Label = styled.label`
  width: 50px;
  margin-right: 10px;
  font: normal normal bold 15px Noto Sans CJK KR;
`;

const Writer = styled.label`
  margin-right: 10px;
  font: normal normal normal 15px Noto Sans CJK KR;
`;

const RegDate = styled.label`
  color: ${colors.num_888};
  font: normal normal normal 15px Noto Sans CJK KR;
`;

const InfoBox = styled.div`
  display: flex;
`;

const CustomInput = styled.input`
  width: 100%;
  // height: 100%;
  border-radius: 10px;
  color: ${colors.text};
  padding: 12px 16px;
  font: normal normal normal 15px/21px Noto Sans CJK KR;
  background-color: ${colors.num_333};
`;

const SideButtonBox = styled.div``;
