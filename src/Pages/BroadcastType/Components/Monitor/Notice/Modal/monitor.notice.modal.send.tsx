import styled from '@emotion/styled/macro';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { colors } from '../../../../../../Styles/ui';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: colors.num_222,
  borderRadius: '10px',
  border: `1px solid ${colors.num_444}`,
  minWidth: '400px',
};

const buttonCss = {
  width: '200px',
  borderRadius: '10px',
  height: 50,
  whiteSpace: 'nowrap',
};

const SendModalBox = ({
  headerType,
  contentText,
  CancelHandler,
  ConfirmHandler,
}: {
  headerType: string;
  contentText: string;
  CancelHandler: () => void;
  ConfirmHandler: () => void;
}) => {
  const { t } = useTranslation();

  const getHeader = () => {
    return t(`monitor.notice.modal.title.${headerType}`);
  };

  return (
    <Box sx={style}>
      <Header>{getHeader()}</Header>
      <Body>
        <Content>{contentText}</Content>
      </Body>
      <ButtonBox>
        <Button
          onClick={CancelHandler}
          sx={{
            ...buttonCss,
            marginRight: '8px',
            ':hover': {
              color: colors.text,
            },
          }}
          variant='contained'
          color='normal'
        >
          {t('common.button.cancel')}
        </Button>
        <Button
          onClick={ConfirmHandler}
          sx={{
            ...buttonCss,
            marginLeft: '8px',
            ':hover': {
              color: colors.text,
            },
          }}
          variant='contained'
          color='primary'
        >
          {t(`monitor.notice.modal.button.${headerType}`)}
        </Button>
      </ButtonBox>
    </Box>
  );
};

export default SendModalBox;

const Header = styled.div`
  font: normal normal bold 18px/26px Noto Sans CJK KR;
  border-bottom: solid 1px ${colors.num_444};
  padding: 24px 40px;
  color: ${colors.text};
`;

const Body = styled.div`
  padding: 30px 40px;
`;

const Content = styled.div`
  width: 100%;
  text-align: center;
  color: ${colors.text};
  background-color: ${colors.num_333};
  border-radius: 10px;
  padding: 26px 25px;
  font: normal normal normal 15px/21px Noto Sans CJK KR;
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  padding: 0 40px 40px 40px;
`;
