import styled from '@emotion/styled/macro';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SaveIcon from '@mui/icons-material/Save';
import OutputIcon from '@mui/icons-material/Output';
import StopCircle from '@mui/icons-material/StopCircle';
import { Button, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { LoadingButton } from '@mui/lab';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { StompSubscription } from '@stomp/stompjs';
import { colors } from '../../../../../Styles/ui';
import QuizServices, {
  IAddQuizCommonSuccess,
  IQuizGroup,
  IQuizInfo,
  IQuizItem,
  IUpdateQuizParam,
} from '../../../../../services/QuizServices';
import { stompPublish, stompSubscribe, stompUnSubscribe } from '../../../../../services/socket/webSocket';
import { IMatchGame, IStreamerSchedule } from '../../../../../services/ScheduleServices';
import { permissionsAtom, userAtom } from '../../../../../recoil/Auth/userAtom';
import { getQuizDuration } from '../../../../../services/dateService/date-time-service';
import { QuizType } from '../../lib/quizType';
import { checkStartQuiz } from '../../lib/checkQuiz';
import { customErrAtom } from '../../../../../recoil/errors/errorsAtom';

const QuizFooterBox = ({
  quizInfo: beQuizInfo,
  setLoadQuizIdx,
  matchInfo,
  quizGroupIdx,
  tab,
  lockForQuiz,
  quizSocketHandler,
  isCloseMatch,
}: {
  quizInfo: IQuizInfo;
  setLoadQuizIdx: React.Dispatch<React.SetStateAction<number | undefined>>;
  matchInfo: IMatchGame | IStreamerSchedule | undefined;
  quizGroupIdx: number;
  tab: number;
  lockForQuiz: boolean;
  quizSocketHandler: ({ type, data }: { type: string; data: any }) => void;
  isCloseMatch: boolean;
}) => {
  const useStreamer = useRecoilValue(permissionsAtom.streamer);
  const user = useRecoilValue(userAtom);
  const setCustomError = useSetRecoilState(customErrAtom);
  const [quizInfo, setQuizInfo] = useState(beQuizInfo);
  const { t } = useTranslation();
  const perBank = useRecoilValue(permissionsAtom.bank);
  // 퀴즈 임시 저장
  const { mutate: updateQuiz, isLoading: updateQuizLoading } = useMutation(
    (data: IUpdateQuizParam) => QuizServices.updateQuiz(data),
    {
      onSuccess: (data: IAddQuizCommonSuccess) => {
        console.log(data);
      },
    },
  );

  useEffect(() => {
    setQuizInfo(beQuizInfo);
  }, [beQuizInfo]);

  const { mutate: startQuiz, isLoading: startQuizLoading } = useMutation(
    (data: IUpdateQuizParam) => QuizServices.updateQuiz(data),
    {
      onSuccess: (data: IAddQuizCommonSuccess) => {
        const startData = {
          uniqueId: useStreamer ? '' : (matchInfo as IMatchGame).uniqueId,
          setNum: tab + 1,
          quizGroupIdx,
          quizName: quizInfo.name,
          tooltip: quizInfo.tooltip,
          order: quizInfo.orders,
          time: quizInfo.times,
          item: data.returnData.item,
          quizIdx: quizInfo.idx,
          fixKill: quizInfo.fixKill,
          type: quizInfo.type,
        };

        if (quizInfo.type === 1 && quizInfo.fixKill !== 0) {
          startData.fixKill = 0;
        }

        quizSocketHandler({ type: QuizType.start, data: startData });
      },
    },
  );

  const startQuizHandler = (data: IUpdateQuizParam) => {
    const startQuizData = { ...data };
    if (data.type === 1 && data.fixKill !== 0) {
      startQuizData.fixKill = 0;
    }

    const check = checkStartQuiz(startQuizData);
    if (check) {
      setCustomError(check);
    } else {
      startQuiz(startQuizData);
    }
  };

  const quizShutDown = () => {
    const shutDownData = {
      quizIdx: quizInfo.idx,
      order: quizInfo.orders,
    };
    quizSocketHandler({ type: QuizType.shutdown, data: shutDownData });
  };

  function quizStop(quizInfo: IQuizInfo) {
    const stopData = {
      quizGroupIdx,
      quizIdx: quizInfo.idx,
      pick: quizInfo.pick,
      order: quizInfo.orders,
      item: quizInfo.item,
    };
    quizSocketHandler({ type: QuizType.finish, data: stopData });
  }

  const quizAllCorrect = () => {
    const stopData = {
      quizGroupIdx,
      quizIdx: quizInfo.idx,
      pick: quizInfo.pick,
      order: quizInfo.orders,
      item: quizInfo.item,
      accountType: user?.accountsType,
    };
    quizSocketHandler({ type: QuizType.allCorrect, data: stopData });
  };

  return (
    <QuizFooter>
      <LeftBox>
        <Button
          sx={{ color: colors.num_999 }}
          startIcon={<FileUploadIcon sx={{ width: 24, height: 24, color: colors.num_999 }} />}
          onClick={() => setLoadQuizIdx(quizInfo.idx)}
          disabled={isCloseMatch || quizInfo.state !== 1}
        >
          {t('monitor.footer.upload')}
        </Button>
        {perBank ? (
          <Button
            sx={{ color: colors.num_999 }}
            startIcon={<FileDownloadIcon sx={{ width: 24, height: 24, color: colors.num_999 }} />}
            disabled={isCloseMatch || quizInfo.state !== 1}
          >
            {t('monitor.footer.store')}
          </Button>
        ) : (
          <></>
        )}
      </LeftBox>
      <RightBox>
        {quizInfo.state === 1 ? (
          <>
            <LoadingButton
              loading={updateQuizLoading}
              sx={{ color: colors.num_999 }}
              startIcon={<SaveIcon sx={{ width: 24, height: 24, color: colors.num_999 }} />}
              disabled={isCloseMatch}
              onClick={() => {
                updateQuiz(quizInfo);
              }}
            >
              {t('monitor.footer.temporarySave')}
            </LoadingButton>
            <Button
              sx={{ color: colors.main }}
              startIcon={
                <OutputIcon
                  sx={{
                    width: 24,
                    height: 24,
                    color: lockForQuiz || isCloseMatch ? colors.num_999 : colors.main,
                  }}
                />
              }
              onClick={() => startQuizHandler(quizInfo)}
              disabled={lockForQuiz || isCloseMatch}
            >
              {t('monitor.footer.output')}
            </Button>
          </>
        ) : null}
        {quizInfo.state === 2 ? (
          <>
            <Button
              sx={{ color: colors.quiz_result_close }}
              startIcon={<StopCircle sx={{ width: 24, height: 24, color: colors.quiz_result_close }} />}
              onClick={() => quizShutDown()}
              disabled={isCloseMatch}
            >
              {t('monitor.footer.reject')}
            </Button>
            <Button
              sx={{ color: colors.quiz_vote_close }}
              startIcon={<StopCircle sx={{ width: 24, height: 24, color: colors.quiz_vote_close }} />}
              onClick={() => quizStop(quizInfo)}
              disabled={isCloseMatch}
            >
              {t('monitor.footer.stop')}
            </Button>
          </>
        ) : null}
        {quizInfo.state === 4 ? (
          <>
            <Button
              sx={{ color: colors.main }}
              startIcon={
                <StopCircle
                  sx={{
                    width: 24,
                    height: 24,
                    color: lockForQuiz || isCloseMatch ? colors.num_999 : colors.main,
                  }}
                />
              }
              onClick={() => quizAllCorrect()}
              disabled={lockForQuiz || isCloseMatch}
            >
              {t('monitor.footer.allCorrect')}
            </Button>
          </>
        ) : null}

        {/* <Button
          sx={{ color: colors.quiz_result_close }}
          startIcon={<StopCircle sx={{ width: 24, height: 24, color: colors.quiz_result_close }} />}
          onClick={() => quizSettle()}
        >
          {t('monitor.footer.settle')}
        </Button> */}
      </RightBox>
    </QuizFooter>
  );
};

export default QuizFooterBox;

export const QuizFooter = styled.div`
  border-top: solid 1px ${colors.num_444};
  padding: 25px 40px;
  display: flex;

  .MuiLoadingButton-loadingIndicator {
    color: ${colors.num_999};
  }
`;

const LeftBox = styled.div`
  width: 100%;
`;

const RightBox = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;
