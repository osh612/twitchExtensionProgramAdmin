import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { arrayMove, SortableContainer, SortableElement } from 'react-sortable-hoc';
import QuizServices, { IQuizGroup, IQuizInfo } from '../../../../../services/QuizServices';
import { IMatchGame, IStreamerSchedule } from '../../../../../services/ScheduleServices';
import { scrollbarStyle } from '../../../../../Styles/ui';
import { IDeleteQuizInQuizList, IMutationHandler } from '../../../Game/screens/Game.monitor';
import QuizItemBox from './monitor.quiz.item';

// const SortableContainers = SortableContainer(({ children }) => {
//   return <StableBox>{children}</StableBox>;
// });

interface IQuizContainerParam {
  quizList: IQuizInfo[];
  deleteQuizInQuizList: IDeleteQuizInQuizList;
  quizGroupIdx: number;
  setQuizList: React.Dispatch<React.SetStateAction<IQuizInfo[]>>;
  matchInfo: IMatchGame | IStreamerSchedule | undefined;
  quizGroupList: IQuizGroup[];
  tab: number;
  setLoadQuizIdx: React.Dispatch<React.SetStateAction<number | undefined>>;
  mutationHandler: IMutationHandler;
  lockForQuiz: boolean;
  lockForQuizHandler: (useLock: boolean) => void;
  isCloseMatch: boolean;
}

export type IPatchQuizList = (idx: number, quizInfo: IQuizInfo) => void;

const QuizContainer = ({
  quizList,
  deleteQuizInQuizList,
  quizGroupIdx,
  setQuizList,
  matchInfo,
  quizGroupList,
  tab,
  setLoadQuizIdx,
  mutationHandler,
  lockForQuiz,
  lockForQuizHandler,
  isCloseMatch,
}: IQuizContainerParam) => {
  const [items, setItems] = useState(quizList.map((data) => data.idx));
  // const { mutate: orderQuiz, orderQuizLoading } = useMutation((data) => QuizServices.orderQuiz(data), {
  //   onSuccess: (data) => {
  //     const newQuizList = [];
  //     if (data.returnData) {
  //       data.returnData.quizList.forEach((element) => {
  //         newQuizList.push(quizList.filter((quiz) => quiz.idx === element)[0]);
  //       });
  //     }
  //     setQuizList(newQuizList);
  //   },
  // });

  // const onSortEnd = ({ oldIndex, newIndex }) => {
  //   if (oldIndex !== newIndex) {
  //     const array = arrayMove(items, oldIndex, newIndex);
  //     setItems(array);
  //     orderQuiz({
  //       quizGroupIdx,
  //       orderList: array,
  //     });
  //   }
  // };

  const patchQuizList: IPatchQuizList = (idx: number, quizInfo: IQuizInfo) => {
    const newQuizList = [...quizList];
    newQuizList[idx] = quizInfo;
    setQuizList(newQuizList);
  };

  useEffect(() => {
    if (quizList.length !== 0) {
      setItems(quizList.map((data) => data.idx));
      const useLock = quizList.filter((data) => data.state === 2).length > 0;
      lockForQuizHandler(useLock);
    }
  }, [quizList]);

  return (
    <>
      {quizList.map((value, index) => (
        <QuizItemBox
          value={value}
          index={index}
          deleteQuizInQuizList={deleteQuizInQuizList}
          patchQuizList={patchQuizList}
          setLoadQuizIdx={setLoadQuizIdx}
          matchInfo={matchInfo}
          quizGroupList={quizGroupList}
          quizGroupIdx={quizGroupIdx}
          tab={tab}
          mutationHandler={mutationHandler}
          lockForQuiz={lockForQuiz}
          isCloseMatch={isCloseMatch}
        />
      ))}
    </>
  );
};

export default QuizContainer;

const StableBox = styled.ul`
  height: 100%;
  min-height: 400px;
  max-height: 1000px;
  ${scrollbarStyle.scroll_4};
`;

// <SortableContainers onSortEnd={onSortEnd} useDragHandle>
//       {quizList.map((value, index) => (
//         <QuizItemBox
//           value={value}
//           index={index}
//           deleteQuizInQuizList={deleteQuizInQuizList}
//           patchQuizList={patchQuizList}
//           setLoadQuizIdx={setLoadQuizIdx}
//           matchInfo={matchInfo}
//           quizGroupList={quizGroupList}
//           quizGroupIdx={quizGroupIdx}
//           tab={tab}
//           mutationHandler={mutationHandler}
//           lockForQuiz={lockForQuiz}
//           isCloseMatch={isCloseMatch}
//         />
//       ))}
//     </SortableContainers>
