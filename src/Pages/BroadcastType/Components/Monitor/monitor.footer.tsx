import styled from '@emotion/styled';
import { IQuizInfo } from '../../../../services/QuizServices';
import { IMutationHandler } from '../../Game/screens/Game.monitor';
import AddQuizButtonBox from './QuizItem/monitor.quiz.button.add-quiz';
import RefreshQuizListButton from './QuizItem/monitor.quiz.button.refresh-quiz-list';
import SettleQuizButtonBox from './QuizItem/monitor.quiz.button.settle';

interface IMonitorFooter {
  quizGroupIdx: number;
  quizList: IQuizInfo[];
  isCloseMatch: boolean;
  addQuizHandler: (data: any) => void;
  lockForQuiz: boolean;
  mutationHandler: IMutationHandler;
  tab: number;
  onIndiHandler: () => void;
}

const MonitorFooter = ({
  quizGroupIdx,
  quizList,
  isCloseMatch,
  addQuizHandler,
  mutationHandler,
  lockForQuiz,
  tab,
  onIndiHandler,
}: IMonitorFooter) => {
  return (
    <ButtonWrawwpper>
      <div className='RefreshButtonWrapper'>
        <RefreshQuizListButton mutationHandler={mutationHandler} />
      </div>
      <div className='AddButtonWrapper'>
        <AddQuizButtonBox
          quizGroupIdx={quizGroupIdx}
          orders={quizList.length}
          isCloseMatch={isCloseMatch}
          addQuizHandler={addQuizHandler}
        />
      </div>
      <div className='SettleButtonWrapper'>
        <SettleQuizButtonBox
          lockForQuiz={lockForQuiz}
          quizGroupIdx={quizGroupIdx}
          orders={quizList.length}
          isCloseMatch={isCloseMatch}
          tab={tab}
          onIndiHandler={onIndiHandler}
        />
      </div>
    </ButtonWrawwpper>
  );
};

export default MonitorFooter;

const ButtonWrawwpper = styled.div`
  height: 100px;
  position: relative;
  left: 0%;
  .RefreshButtonWrapper {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(0%, -50%);
  }
  .SettleButtonWrapper {
    position: absolute;
    top: 50%;
    right: 0%;
    transform: translate(0%, -50%);
  }
  .AddButtonWrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
