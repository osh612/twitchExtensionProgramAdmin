import { useRecoilValue } from 'recoil';
import { IQuizGroup, IQuizInfo } from '../../../../services/QuizServices';
import { IMatchGame, IStreamerSchedule } from '../../../../services/ScheduleServices';
import { IDeleteQuizInQuizList, IMutationHandler } from '../../Game/screens/Game.monitor';
import QuizContainer from './QuizItem/monitor.quiz.container';
import QuizRealTimeBox from './QuizItem/Detail/monitor.quiz.item.header.real-time';
import MonitorFooter from './monitor.footer';
import { permissionsAtom } from '../../../../recoil/Auth/userAtom';

interface IQuizWrapperParam {
  broadCastInfo?: IStreamerSchedule;
  matchInfo?: IMatchGame;
  quizGroupIdx: number;
  quizList: IQuizInfo[];
  deleteQuizInQuizList: IDeleteQuizInQuizList;
  setQuizList: React.Dispatch<React.SetStateAction<IQuizInfo[]>>;
  setLoadQuizIdx: React.Dispatch<React.SetStateAction<number | undefined>>;
  quizGroupList: IQuizGroup[];
  tab: number;
  mutationHandler: IMutationHandler;
  lockForQuiz: boolean;
  lockForQuizHandler: (useLock: boolean) => void;
  isCloseMatch: boolean;
  allQuizList: IQuizInfo[];
}

const QuizWrapper = ({
  matchInfo,
  broadCastInfo,
  quizGroupIdx,
  quizList,
  deleteQuizInQuizList,
  setQuizList,
  setLoadQuizIdx,
  quizGroupList,
  tab,
  mutationHandler,
  lockForQuiz,
  lockForQuizHandler,
  isCloseMatch,
  allQuizList,
}: IQuizWrapperParam) => {
  const useLeageManager = useRecoilValue(permissionsAtom.leagueManager);
  return (
    <>
      {useLeageManager && matchInfo ? (
        <>
          <QuizRealTimeBox team1Name={matchInfo.team1Name} team2Name={matchInfo.team2Name} />
        </>
      ) : (
        <></>
      )}

      <QuizContainer
        quizGroupIdx={quizGroupIdx}
        quizList={quizList}
        deleteQuizInQuizList={deleteQuizInQuizList}
        setQuizList={setQuizList}
        setLoadQuizIdx={setLoadQuizIdx}
        matchInfo={useLeageManager ? matchInfo : broadCastInfo}
        quizGroupList={quizGroupList}
        tab={tab}
        mutationHandler={mutationHandler}
        lockForQuiz={lockForQuiz}
        lockForQuizHandler={lockForQuizHandler}
        isCloseMatch={isCloseMatch}
      />
    </>
  );
};

export default QuizWrapper;
