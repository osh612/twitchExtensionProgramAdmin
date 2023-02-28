import styled from '@emotion/styled/macro';
import { useTranslation } from 'react-i18next';
import NoDataBox from '../../../../../components/Ui/NoDataBox';
import { ISignboard } from '../../../../../services/SignBoardServices';
import { colors } from '../../../../../Styles/ui';
import { SignboardButtonBox } from './Signboard.monitor.button-box';
import SignboardContentBox from './Signboard.monitor.content';

const RequestListBox = ({ signboardList }: { signboardList: ISignboard[] }) => {
  const { t } = useTranslation();

  const getBorderColor = (state: number) => {
    if (state === 1) {
      return colors.main;
    }
    if (state === 3) {
      return colors.btn_stopping;
    }
    return colors.bg_transparency;
  };
  
  const getRequestList = () => {
    if (signboardList) {
      return signboardList.map(data => {
        return (
          <RequestBox borderColor={getBorderColor(data.state)}>
            <SignboardButtonBox uid={data.login} idx={data.idx} content={data.sign} state={data.state} />
            <SignboardContentBox
              writer={data.login}
              regDate={data.regDate}
              content={data.sign}
              state={data.state}
              idx={data.idx}
            />
          </RequestBox>
        );
      });
    }
    return <NoDataBox desc={t('signboard.desc.noData')} />;
  };
  return (
    <Wrapper>
      <Label>{t('signboard.label.requestList')}</Label>
      {getRequestList()}
    </Wrapper>
  );
};

export default RequestListBox;

const Wrapper = styled.div`
  padding-bottom: 20px;
`;

const Label = styled.div`
  padding: 20px 0px;
  font: normal normal bold 15px/28px Noto Sans CJK KR;
`;

const RequestBox = styled.div<{ borderColor: string }>`
  width: 100%;
  background-color: ${colors.num_111};
  border-radius: 10px;
  margin: 16px 0;
  display: flex;
  border: solid 1px ${({ borderColor }) => borderColor};
`;
