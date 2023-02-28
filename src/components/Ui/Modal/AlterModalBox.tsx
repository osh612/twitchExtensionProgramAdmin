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
  p: 10,
};

const buttonCss = {
  width: '100%',
  borderRadius: '10px',
  height: 50,
};

const AlterModalBox = ({
  headerText,
  contentText,
  CancelHandler,
}: {
  headerText: string;
  contentText: string;
  CancelHandler: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <Box sx={style}>
      <Header>{headerText}</Header>
      <Body>{contentText}</Body>
      <ButtonBox>
        <Button
          onClick={CancelHandler}
          sx={{
            ...buttonCss,
            ':hover': {
              color: colors.text,
            },
          }}
          variant='contained'
          color='normal'
        >
          {t('common.button.confirm')}
        </Button>
      </ButtonBox>
    </Box>
  );
};

export default AlterModalBox;

const Header = styled.div`
  color: ${colors.text};
  font: normal normal bold 18px/26px Noto Sans CJK KR;
  width: 100%;
  text-align: center;
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
