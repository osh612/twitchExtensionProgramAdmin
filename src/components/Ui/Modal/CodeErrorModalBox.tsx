import styled from '@emotion/styled/macro';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { colors } from '../../../Styles/ui';
import LineBreak from '../LineBreak';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 488,
  bgcolor: colors.num_222,
  borderRadius: '10px',
  border: `1px solid ${colors.num_444}`,
  p: 10,
};

const buttonCss = {
  width: '100%',
  borderRadius: '10px',
  height: 50,
};

const CodeErrorModalBox = ({ ConfirmHandler }: { ConfirmHandler: () => void }) => {
  const { t } = useTranslation();

  return (
    <Box sx={style}>
      <Header>{t('sign.searchPassword.error.title.code')}</Header>
      <Body>
        <LineBreak text={t('sign.searchPassword.error.desc.code')} />
      </Body>
      <ButtonBox>
        <Button onClick={ConfirmHandler} sx={{ ...buttonCss, marginLeft: '8px' }} variant='contained'>
          {t('common.button.confirm')}
        </Button>
      </ButtonBox>
    </Box>
  );
};

export default CodeErrorModalBox;

const Header = styled.div`
  color: ${colors.text};
  font: normal normal bold 18px/26px Noto Sans CJK KR;
  width: 100%;
  padding: 24px 40px;
  border-bottom: solid 1px ${colors.num_444};
`;

const Body = styled.div`
  color: ${colors.text};
  font: normal normal normal 15px/21px Noto Sans CJK KR;
  width: 100%;
  text-align: center;
  margin-top: 12px;
  margin-bottom: 30px;
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
`;
