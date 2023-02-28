import styled from '@emotion/styled/macro';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { colors } from '../../../Styles/ui';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 488,
  bgcolor: colors.num_222,
  borderRadius: '10px',
  border: `1px solid ${colors.num_444}`,
};

const buttonCss = {
  width: '100%',
  borderRadius: '10px',
  height: 50,
};

const ConfirmModal2Box = ({
  headerText,
  contentText,
  CancelHandler,
  ConfirmHandler,
}: {
  headerText: string;
  contentText: string;
  CancelHandler: () => void;
  ConfirmHandler: any;
}) => {
  const { t } = useTranslation();
  return (
    <Box sx={style}>
      <Header>{t(headerText)}</Header>
      <Body>{t(contentText)}</Body>
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
          color='cancel'
        >
          {t('common.button.cancel')}
        </Button>
        <Button onClick={ConfirmHandler} sx={{ ...buttonCss, marginLeft: '8px' }} variant='contained'>
          {t('common.button.confirm')}
        </Button>
      </ButtonBox>
    </Box>
  );
};

export default ConfirmModal2Box;

const Header = styled.div`
  color: ${colors.text};
  font: normal normal bold 18px/26px Noto Sans CJK KR;
  width: 100%;
  padding: 24px 40px;
  border-bottom: solid 1px ${colors.num_444};
`;

const Body = styled.div`
  display: flex;
  justify-content: center;
  color: ${colors.text};
  font: normal normal normal 15px/21px Noto Sans CJK KR;
  width: 100%;
  text-align: center;
  padding: 35px 40px 11px;
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  padding: 40px;
`;
