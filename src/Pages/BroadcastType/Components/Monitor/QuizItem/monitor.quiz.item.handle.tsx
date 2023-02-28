import styled from '@emotion/styled';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { useMutation } from 'react-query';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DragHandle from '../../../../../components/Ui/Sortable/DragHandle';
import QuizServices, { IDeleteQuizSuccess, IQuizInfo } from '../../../../../services/QuizServices';

import { IMatchGame } from '../../../../../services/ScheduleServices';

const iconButtonStyle = {
  color: '#fff',
};

const QuizHandleBox = ({
  quizInfo,
  idx,
  deleteQuizInQuizList,
  isCloseMatch,
}: {
  idx: number;
  deleteQuizInQuizList: (data: any, idx: number) => void;
  quizInfo: IQuizInfo;
  isCloseMatch: boolean;
}) => {
  const { mutate: deleteQuiz, isLoading } = useMutation(
    (data: { idx: number }) => QuizServices.deleteQuiz(data),
    {
      onSuccess: (data: IDeleteQuizSuccess) => {
        deleteQuizInQuizList(data, idx);
      },
    },
  );

  const deleteAlter = () => {
    deleteQuiz({
      idx,
    });
  };

  return (
    <HandleBox>
      {/* <IconButton
        sx={{
          ...iconButtonStyle,
          cursor: 'n-resize',
        }}
        disabled={isCloseMatch}
      >
        <DragHandle />
        <DragIndicatorIcon />
      </IconButton> */}
      <IconButton sx={iconButtonStyle} onClick={deleteAlter} disabled={quizInfo.state !== 1 || isCloseMatch}>
        <DeleteIcon />
      </IconButton>
    </HandleBox>
  );
};

export default QuizHandleBox;

const HandleBox = styled.div`
  display: flex;
  flex-direction: column;
`;
