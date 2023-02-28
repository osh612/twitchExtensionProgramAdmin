import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { useRecoilValue } from 'recoil';
import { permissionsAtom, userAtom } from '../../../../../recoil/Auth/userAtom';
import { getQuizDuration } from '../../../../../services/dateService/date-time-service';
import { IQuizGroup, IQuizInfo } from '../../../../../services/QuizServices';
import { IMatchGame, IStreamerSchedule } from '../../../../../services/ScheduleServices';
import { stompPublish, stompSubscribe, stompUnSubscribe } from '../../../../../services/socket/webSocket';
import { IDeleteQuizInQuizList, IMutationHandler } from '../../../Game/screens/Game.monitor';
import { moniterUpdateQuizInfo } from '../../lib/monitor.quiz.lib';
import { quizColorMapping } from '../../lib/quizColorMapping';
import { QuizType } from '../../lib/quizType';
import QuizBodyBox from './monitor.quiz.body';
import { IPatchQuizList } from './monitor.quiz.container';
import QuizFooterBox from './monitor.quiz.item.footer';
import QuizHandleBox from './monitor.quiz.item.handle';
import QuizHeaderBox from './monitor.quiz.item.header';

interface IQuizItemParam {
  value: IQuizInfo;
  index: number;
  deleteQuizInQuizList: IDeleteQuizInQuizList;
  patchQuizList: IPatchQuizList;
  matchInfo: IMatchGame | IStreamerSchedule | undefined;
  quizGroupList: IQuizGroup[];
  quizGroupIdx: number;
  tab: number;
  mutationHandler: IMutationHandler;
  lockForQuiz: boolean;
  isCloseMatch: boolean;
  setLoadQuizIdx: React.Dispatch<React.SetStateAction<number | undefined>>;
}

interface IUpdateQuizInfo {
  key: string;
  data: any;
}

let startSubscribe: any = null;

const QuizItemBox = ({
  value,
  index,
  deleteQuizInQuizList,
  patchQuizList,
  matchInfo,
  quizGroupList,
  setLoadQuizIdx,
  quizGroupIdx,
  tab,
  mutationHandler,
  lockForQuiz,
  isCloseMatch,
}: IQuizItemParam) => {
  const user = useRecoilValue(userAtom);
  const [quizInfo, setQuizInfo] = useState(value);
  const timer = useRef(quizInfo.times);
  const timerInterval2 = useRef(setTimeout(() => {}, 1000));
  const [times, setTimes] = useState(quizInfo.times);
  const [socketState, setSocketState] = useState('소켓 상태 알림');

  useEffect(() => {}, [quizInfo.idx]);

  useEffect(() => {
    console.log('socketState', socketState);
  }, [socketState]);

  const updateQuizInfo = ({ key, data }: IUpdateQuizInfo) => {
    moniterUpdateQuizInfo({ key, data, mutationHandler, quizInfo, patchQuizList, index });
  };

  useEffect(() => {
    setQuizInfo(value);
    if (quizInfo.idx !== value.idx) {
      setSocketState('소켓 상태 알림');
    }
  }, [value]);

  useEffect(() => {
    if (quizInfo.state === 2) {
      if (timerInterval2 !== undefined) {
        clearInterval(timerInterval2.current);
      }
      timerInterval2.current = setInterval(() => {
        timer.current = getTime();
        if (timer.current > 0) {
          // console.log('시간이 0보다 큰상황');
          const receivedDate = new Date(quizInfo.startDate);
          const calcDate = new Date(receivedDate.setHours(receivedDate.getHours()));
          const getTimer = getQuizDuration(calcDate, quizInfo.times);
          timer.current = getTimer;
          setTimes(getTimer);
        } else if (timer.current === 0) {
          const stopData = {
            quizGroupIdx,
            quizIdx: quizInfo.idx,
            pick: quizInfo.pick,
            order: quizInfo.orders,
            item: quizInfo.item,
          };
          quizSocketHandler({ type: QuizType.finish, data: stopData });
          clearInterval(timerInterval2.current);
          if (timerInterval2 !== undefined) {
            clearInterval(timerInterval2.current);
          }
        } else {
          alert('타이머가 오류 발생, 관리자에게 문의바랍니다.(1초마다 발생)');
        }
      }, 1000);
      console.log(quizInfo.startDate);
    }
  }, [quizInfo.state]);

  const getTime = () => {
    const receivedDate = new Date(quizInfo.startDate);
    const calcDate = new Date(receivedDate.setHours(receivedDate.getHours()));
    return getQuizDuration(calcDate, quizInfo.times);
  };

  useEffect(() => {
    if (quizInfo.state !== 2) {
      if (timerInterval2 !== undefined) {
        clearInterval(timerInterval2.current);
      }
    }
  });

  const quizSocketHandler = ({ type, data }: { type: string; data: any }) => {
    if (type === QuizType.start) {
      startSubscribe = stompSubscribe(`/subscribe/${user?.broadcastId}/extension/quiz/start`, (res) => {
        setSocketState('문제 출제 Subscribe 동작');
        updateQuizInfo({
          key: 'quizList',
          data: undefined,
        });
      });
      stompPublish('/send/extension/quiz/start', data);
      setSocketState('문제 출제 Publish 동작');
    } else if (type === QuizType.shutdown) {
      const shutdownSubscribe = stompSubscribe(
        `/subscribe/${user?.broadcastId}/extension/quiz/shutdown`,
        (res) => {
          execUpdateQuizInfo();
          setSocketState('긴급 종료 Subscribe 동작');
          shutdownSubscribe.unsubscribe();
        },
      );
      stompPublish('/send/extension/quiz/shutdown', data);
      setSocketState('긴급 종료 Publish 동작');
    } else if (type === QuizType.allCorrect) {
      const url = `/subscribe/${user?.broadcastId}/extension/quiz/all/correct`;
      const quizAllCorrectSubscribe = stompSubscribe(url, (res) => {
        execUpdateQuizInfo();
        setSocketState('전원 정답 Subscribe 동작');
        quizAllCorrectSubscribe.unsubscribe();
      });
      stompPublish('/send/extension/quiz/all/correct', {
        ...data,
        accountType: user?.accountsType,
      });
      setSocketState('전원 정답 Publish 동작');
    } else if (type === QuizType.finish) {
      const quizFinishSubscribe = stompSubscribe(
        `/subscribe/${user?.broadcastId}/extension/quiz/finish`,
        (res) => {
          execUpdateQuizInfo();
          quizFinishSubscribe.unsubscribe();
          setSocketState('카운트/조기 종료 Subscribe 동작');
        },
      );
      stompPublish('/send/extension/quiz/finish', data);
      setSocketState('카운트/조기 종료 Publish 동작');
    } else if (type === QuizType.correct) {
      const quizCorrectSubscribe = stompSubscribe(
        `/subscribe/${user?.broadcastId}/extension/quiz/correct`,
        (res) => {
          const body = JSON.parse(res.body);
          console.log('message', body.status.message);
          updateQuizInfo({
            key: 'quizList',
            data: undefined,
          });
          setSocketState('정답 처리 Subscribe 동작');
          quizCorrectSubscribe.unsubscribe();
        },
      );
      stompPublish('/send/extension/quiz/correct', { ...data });
      setSocketState('정답 처리 Publish 동작');
    }
  };

  const execUpdateQuizInfo = () => {
    stompUnSubscribe(`countSocket`);
    startSubscribe?.unsubscribe();
    if (timerInterval2 !== undefined) {
      clearInterval(timerInterval2.current);
    }
    updateQuizInfo({
      key: 'quizList',
      data: undefined,
    });
  };

  // console.log('quizInfo', quizInfo);

  return (
    <QuizItemli>
      <QuizHandleBox
        isCloseMatch={isCloseMatch}
        quizInfo={quizInfo}
        idx={quizInfo.idx}
        deleteQuizInQuizList={deleteQuizInQuizList}
      />
      <QuizBox outlineColor={quizColorMapping[quizInfo.state]}>
        <QuizHeaderBox
          // index={idx}
          quizInfo={quizInfo}
          updateQuizInfo={updateQuizInfo}
          // quizGroupIdx={quizGroupIdx}
          // quizSocketHandler={quizSocketHandler}
          socketState={socketState}
          times={times}
        />
        <QuizBodyBox
          quizInfo={quizInfo}
          updateQuizInfo={updateQuizInfo}
          quizGroupIdx={quizGroupIdx}
          lockForQuiz={lockForQuiz}
          quizSocketHandler={quizSocketHandler}
          isCloseMatch={isCloseMatch}
        />
        <QuizFooterBox
          quizInfo={quizInfo}
          setLoadQuizIdx={setLoadQuizIdx}
          matchInfo={matchInfo}
          quizGroupIdx={quizGroupIdx}
          tab={tab}
          lockForQuiz={lockForQuiz}
          quizSocketHandler={quizSocketHandler}
          isCloseMatch={isCloseMatch}
        />
      </QuizBox>
    </QuizItemli>
  );
};

export default QuizItemBox;

// const QuizItem = SortableElement(
//   ({
//     idx,
//     index,
//     quizInfo,
//     updateQuizInfo,
//     deleteQuizInQuizList,
//     setLoadQuizIdx,
//     matchInfo,
//     quizGroupList,
//     quizGroupIdx,
//     tab,
//     lockForQuiz,
//     quizSocketHandler,
//     times,
//     isCloseMatch,
//     socketState,
//   }) => (
//     <QuizItemli>
//       <QuizHandleBox
//         isCloseMatch={isCloseMatch}
//         quizInfo={quizInfo}
//         idx={quizInfo.idx}
//         deleteQuizInQuizList={deleteQuizInQuizList}
//       />
//       <QuizBox outlineColor={quizColorMapping[quizInfo.state]}>
//         <QuizHeaderBox
//           // index={idx}
//           quizInfo={quizInfo}
//           updateQuizInfo={updateQuizInfo}
//           // quizGroupIdx={quizGroupIdx}
//           // quizSocketHandler={quizSocketHandler}
//           socketState={socketState}
//           times={times}
//         />
//         <QuizBodyBox
//           quizInfo={quizInfo}
//           updateQuizInfo={updateQuizInfo}
//           quizGroupIdx={quizGroupIdx}
//           lockForQuiz={lockForQuiz}
//           quizSocketHandler={quizSocketHandler}
//           isCloseMatch={isCloseMatch}
//         />
//         <QuizFooterBox
//           quizInfo={quizInfo}
//           setLoadQuizIdx={setLoadQuizIdx}
//           matchInfo={matchInfo}
//           quizGroupList={quizGroupList}
//           quizGroupIdx={quizGroupIdx}
//           tab={tab}
//           lockForQuiz={lockForQuiz}
//           quizSocketHandler={quizSocketHandler}
//           isCloseMatch={isCloseMatch}
//         />
//       </QuizBox>
//     </QuizItemli>
//   ),
// );

export const QuizItemli = styled.li`
  margin-top: 30px;
  display: flex;
  width: 98%;
`;

export const QuizBox = styled.div<{ outlineColor: string }>`
  width: 100%;
  border: solid 1px ${({ outlineColor }) => outlineColor};
  border-radius: 10px;
`;
