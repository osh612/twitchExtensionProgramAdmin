import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { toastInfo, toastLoading } from '../../../../../../components/Toastify/ToasitifyContainer';
import QuizServices, { IAddQuizParam, IAddQuizReadParam } from '../../../../../../services/QuizServices';

const AddQuizButtonBox = ({
  quizGroupIdx,
  orders,
  addQuiz,
}: {
  quizGroupIdx: number;
  orders: number;
  addQuiz: (data: any) => void;
}) => {
  const { t } = useTranslation();
  const { mutate: createQuiz } = useMutation((data: IAddQuizParam) => QuizServices.createQuiz(data), {
    onSuccess: (data) => {
      addQuiz(data);
    },
  });

  const onClick = () => {
    createQuiz({
      quizGroupIdx,
      name: '',
      matchState: 0,
      quizTypeIdx: 0,
      times: 0,
      orders: orders + 1,
      state: 0,
    });
  };

  return (
    <Warpper>
      <Button variant='contained' onClick={onClick}>
        {t('monitor.addQuiz')}
      </Button>
    </Warpper>
  );
};

export default AddQuizButtonBox;

const Warpper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
