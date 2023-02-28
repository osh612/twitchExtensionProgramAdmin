import { Button } from '@mui/material';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { IMutationHandler } from '../../../Game/screens/Game.monitor';

const RefreshQuizListButton = ({ mutationHandler }: { mutationHandler: IMutationHandler }) => {
  const { t } = useTranslation();

  const onClick = () => {
    mutationHandler('quizList');
  };

  return (
    <Warpper>
      <Button variant='contained' onClick={onClick}>
        {t('monitor.refresh')}
      </Button>
    </Warpper>
  );
};

export default RefreshQuizListButton;

const Warpper = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
