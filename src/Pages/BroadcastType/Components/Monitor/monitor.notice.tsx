import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../../../recoil/Auth/userAtom';
import QuizServices, {
  IGetQuizMessageHistoryParam,
  IQuizMessageHistoryList,
} from '../../../../services/QuizServices';
import { stompPublish, stompSubscribe } from '../../../../services/socket/webSocket';
import NoticeInputBox from './Notice/monitor.notice.input';
import QuizNoticeComponent from './Notice/Table/monitor.notice.content';
import QuizQuestionLabel from './QuizItem/Detail/monitor.quiz.item.header.label.question';

interface INoticeWrapperParam {
  quizGroupIdx: number;
  isCloseMatch: boolean;
}

export interface INoticeSocketHandlerParam {
  message: string;
  resend: boolean;
}
export interface INoticeSocketParam extends INoticeSocketHandlerParam {
  quizGroupIdx: number;
}

const NoticeWrapper = ({ quizGroupIdx, isCloseMatch }: INoticeWrapperParam) => {
  const user = useRecoilValue(userAtom);
  const [noticeList, setNoticeList] = useState<IQuizMessageHistoryList[]>([]);
  const [socketState, setSocketState] = useState('[공지사항 소켓 상태 알림]');

  const { mutate: getQuizMessageHistory, isLoading: createQuizGroupLoading } = useMutation(
    (data: IGetQuizMessageHistoryParam) => QuizServices.getQuizMessageHistory(data),
    {
      onSuccess: (data) => {
        const { quizMessageHistoryList } = data;
        setNoticeList(quizMessageHistoryList);
      },
    },
  );

  const onHandler = () => {
    getQuizMessageHistory({ quizGroupIdx });
  };

  useEffect(() => {
    onHandler();
  }, []);

  const onNoticeSocketHandler = (param: INoticeSocketHandlerParam) => {
    const noticeSocketParam: INoticeSocketParam = {
      quizGroupIdx,
      ...param,
    };
    const noticeSubscribe = stompSubscribe(
      `/subscribe/${user?.broadcastId}/extension/quiz/message`,
      (res) => {
        onHandler();
        setSocketState(`[공지사항 Subscribe]`);
        noticeSubscribe.unsubscribe();
      },
    );
    stompPublish('/send/extension/quiz/message', noticeSocketParam);
    setSocketState(`[공지사항 Publish] message : ${noticeSocketParam.message}`);
  };

  return (
    <>
      <QuizQuestionLabel text={socketState} marginTop={10} />
      <NoticeInputBox onNoticeSocketHandler={onNoticeSocketHandler} isCloseMatch={isCloseMatch} />
      <QuizNoticeComponent
        onNoticeSocketHandler={onNoticeSocketHandler}
        notice={noticeList}
        isCloseMatch={isCloseMatch}
      />
    </>
  );
};

export default NoticeWrapper;
