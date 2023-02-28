import styled from '@emotion/styled/macro';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import QuizLoadTable from '../../../../components/Ui/ReactTable/GameMonitor/QuizLoadTableComponent';
import { permissionsAtom, userAtom } from '../../../../recoil/Auth/userAtom';
import QuizBankServices, { IBank, IBankListDataParam } from '../../../../services/QuizBankServices';
import QuizServices, {
  IAddQuizGroupParam,
  IAddQuizGroupRead,
  IAddQuizReadParam,
  ICreateQuizGroupSuccess,
  IQuizGroup,
  IQuizInfo,
} from '../../../../services/QuizServices';
import ScheduleServices, { IMatchGame, IStreamerSchedule } from '../../../../services/ScheduleServices';
import { client } from '../../../../services/socket/webSocket';
import { colors } from '../../../../Styles/ui';
import MonitorHeader from '../../Components/Monitor/monitor.header';
import QuizWrapper from '../../Components/Monitor/monitor.quiz';
import NoticeWrapper from '../../Components/Monitor/monitor.notice';
import {
  createQuizGroupSuccessHandler,
  getQuizListSuccess,
  moniterAddQuiz,
  moniterDeleteQuizInQuizList,
  monitorLoadBankDatehandler,
  monitorLockForQuiz,
} from '../../Components/lib/monitor.quiz.lib';
import MonitorTab from '../../Components/Monitor/monitor.tab';
import ConvertGameName from '../../../../lib/ConvertGameName';
import MonitorFooter from '../../Components/Monitor/monitor.footer';
import CloseItem from '../../Components/Monitor/QuizItem/monitor.quiz.closeItem';
import MoveTopButton from '../../../../components/Ui/MoveTopButton';
// import Stomp from '../../../services/webSocket/webSocket'

export type IDeleteQuizInQuizList = (data: any, idx: number) => void;
export type IMutationHandler = (type: string) => void;

const getMatchTotalCount = (winCount: number) => {
  if (winCount > 0) {
    return 2 * winCount - 1;
  }
  return 0;
};

function GameMonitor() {
  const { t } = useTranslation();
  const param = useParams();
  const user = useRecoilValue(userAtom);
  const useStreamer = useRecoilValue(permissionsAtom.streamer);
  const useLeageManager = useRecoilValue(permissionsAtom.leagueManager);
  const [matchInfo, setMatchInfo] = useState<IMatchGame>();
  const [broadCastInfo, setBroadCastInfo] = useState<IStreamerSchedule>();
  const [quizGroupIdx, setQuizGroupIdx] = useState<number>();
  const [quizGroupList, setQuizGroupList] = useState<IQuizGroup[]>([]);
  const [allQuizList, setAllQuizList] = useState<IQuizInfo[]>([]);
  const [quizList, setQuizList] = useState<IQuizInfo[]>([]); // 문제 출제
  // const [voteQuizList, setVoteQuizList] = useState<IQuizInfo[]>([]);
  const [closeQuizList, setCloseQuizList] = useState<IQuizInfo[]>([]); // 결과 마감

  const [tab, setTab] = useState<number>(0);

  const [loadQuizIdx, setLoadQuizIdx] = useState<number>(); // 문제 은행에서 가져온 quiz idx
  const [bank, setBank] = useState<IBank[]>([]); // 문제 은행에 테이블 데이터들
  const [loadBankData, setLoadBankData] = useState<IBank>(); // 문제 은행에서 추출한 문제
  const [lockForQuiz, setLockForQuiz] = useState<boolean>(false); // 퀴즈의 활동 잠금
  const isCloseMatch = matchInfo ? matchInfo.quizState === 3 : broadCastInfo?.state === 3;

  // const winCount = info?.winCount ?? 0;

  const { mutate: getMatchListIndi } = useMutation(
    (data: { accountIdx: number }) => ScheduleServices.getMatchListIndi(data, param.game, param.matchId),
    {
      onSuccess: (data) => {
        if (data.match) {
          setMatchInfo(data.match);
        }
      },
    },
  );

  const { mutate: getSteamerScheduleIndi } = useMutation(
    (data: { quizStateIdx: number }) => ScheduleServices.getSteamerScheduleIndi(data),
    {
      onSuccess: (data) => {
        setBroadCastInfo(data.streamerScheduleIndi);
      },
    },
  );

  const { mutate: getBankListData, isLoading: bankLoading } = useMutation(
    (data: IBankListDataParam) => QuizBankServices.getBankListData(data),
    {
      onSuccess: (data) => {
        setBank(data.bank);
      },
    },
  );

  const { mutate: getQuizList } = useMutation((data: IAddQuizReadParam) => QuizServices.getQuizList(data), {
    onSuccess: (data) => {
      getQuizListSuccess({
        serverQuizList: data.quizList,
        clientQuizList: quizList,
        callback: setQuizListHandler,
      });
    },
  });

  const { mutate: getQuizGroupList } = useMutation(
    (data: IAddQuizGroupRead) => QuizServices.getQuizGroupList(data),
    {
      onSuccess: (data) => {
        if (data.quizGroupList.length > 0) {
          setQuizGroupList(data.quizGroupList);
        } else if (user) {
          if (useStreamer && broadCastInfo && param.matchId) {
            createQuizGroup({
              name: `${user?.displayName}_Game${param.matchId}`,
              gameName: '',
              quizStateIdx: +param.matchId,
              accountIdx: user.accountIdx,
              matchIdx: -1,
              setnum: tab + 1,
            });
          } else if (useLeageManager && matchInfo) {
            createQuizGroup({
              name: matchInfo.uniqueId,
              gameName: ConvertGameName(param.game),
              quizStateIdx: matchInfo.quizStateIdx,
              accountIdx: user.accountIdx,
              matchIdx: matchInfo.idx,
              setnum: tab + 1,
            });
          }
        }
      },
    },
  );

  const { mutate: createQuizGroup, isLoading: createQuizGroupLoading } = useMutation(
    (data: IAddQuizGroupParam) => QuizServices.createQuizGroup(data),
    {
      onSuccess: (data: ICreateQuizGroupSuccess) => {
        const callback = () => {
          if (useLeageManager && matchInfo) {
            getQuizGroupList({
              gameName: ConvertGameName(param.game),
              quizStateIdx: data.returnData.quizStateIdx,
              matchIdx: matchInfo.idx,
            });
          } else if (useStreamer && param.matchId) {
            getQuizGroupList({
              gameName: '',
              quizStateIdx: +param.matchId,
              matchIdx: -1,
            });
          }
        };
        createQuizGroupSuccessHandler({
          quizGroupidx: data.returnData.quizGroupidx,
          callback,
          setQuizGroupIdx,
        });
      },
    },
  );

  const mutationHandler: IMutationHandler = (type: string) => {
    if (type === 'quizList') {
      if (quizGroupIdx) {
        getQuizList({
          quizGroupIdx, // 첫번째 idx 호출
          item: true,
        });
      }
    }
  };

  const onIndiHandler = () => {
    if (useStreamer) {
      onStreamerScheduleIndiHandler();
    }
    if (useLeageManager) {
      onMatchListIndiHandler();
    }
  };

  const onMatchListIndiHandler = () => {
    if (user) {
      getMatchListIndi({ accountIdx: user.accountIdx });
    }
  };

  const onStreamerScheduleIndiHandler = () => {
    if (user && param.matchId) {
      getSteamerScheduleIndi({ quizStateIdx: +param.matchId });
    }
  };

  useEffect(() => {
    if (client) {
      // client.deactivate();
      client.activate();
    }
  });

  useEffect(() => {
    if (useStreamer) {
      onStreamerScheduleIndiHandler();
    } else {
      onMatchListIndiHandler();
    }
  }, []);

  useEffect(() => {
    if (matchInfo) {
      // getQuizTypeList();
      getQuizGroupList({
        gameName: ConvertGameName(param.game),
        quizStateIdx: matchInfo.quizStateIdx,
        matchIdx: matchInfo.idx,
      });
    }
    if (broadCastInfo && param.matchId) {
      getQuizGroupList({
        gameName: '',
        quizStateIdx: +param.matchId,
        matchIdx: -1,
      });
    }
  }, [matchInfo, broadCastInfo]);

  useEffect(() => {
    quizGroupList.forEach((quizGroup, i) => {
      if (quizGroup.setnum === tab + 1) {
        setQuizGroupIdx(quizGroupList[i].idx);
      }
    });
  }, [quizGroupList]);

  useEffect(() => {
    mutationHandler('quizList');
  }, [quizGroupIdx]);

  useEffect(() => {
    // if (param.game) {
    //   getBankListData({
    //     game: param.game,
    //   });
    // }
    getBankListData({
      game: 'league_of_legend',
    });
  }, [loadQuizIdx]);

  useEffect(() => {
    if (loadBankData) {
      const callback = (data: IQuizInfo[]) => {
        setQuizListHandler(data);
        setLoadBankData(undefined);
        setLoadQuizIdx(undefined);
      };
      monitorLoadBankDatehandler({ quizList, loadQuizIdx, loadBankData, callback });
    }
  }, [loadBankData]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const setQuizListHandler = (newQuizList: IQuizInfo[]) => {
    const closeQuiz: IQuizInfo[] = [];
    const playingQuiz: IQuizInfo[] = [];
    // const voteQuiz: IQuizInfo[] = [];
    newQuizList.forEach((quiz) => {
      if (quiz.state === 5) {
        closeQuiz.push(quiz);
        // } else if (quiz.state === 4) {
        //   voteQuiz.push(quiz);
      } else {
        playingQuiz.push(quiz);
      }
    });
    setAllQuizList(newQuizList);
    setQuizList(playingQuiz);
    setCloseQuizList(closeQuiz);
    // setVoteQuizList(voteQuiz);
    // setQuizList(newQuizList);
  };

  const addQuizHandler = (data: any) => {
    if (quizGroupIdx) {
      moniterAddQuiz({ data, quizList, allQuizList, quizGroupIdx, callback: setQuizListHandler });
      // moniterAddQuiz({ data, quizList, quizGroupIdx, mutationHandler });
    }
  };

  const deleteQuizInQuizList: IDeleteQuizInQuizList = (data: any, idx: number) => {
    if (quizGroupIdx) {
      moniterDeleteQuizInQuizList({ quizGroupIdx, allQuizList, idx, callback: setQuizListHandler });
    }
  };

  const lockForQuizHandler = (useLock: boolean) =>
    monitorLockForQuiz({ useLock, lockForQuiz, setLockForQuiz });

  const getComponentOfTab = (tab: number) => {
    if (quizGroupIdx) {
      if (tab === 0) {
        if (loadQuizIdx && !bankLoading) {
          return <QuizLoadTable bank={bank} setLoadBankData={setLoadBankData} />;
        }
      }
      // if (tab === 1) {
      //   return (
      //     <QuizWrapper
      //       quizList={voteQuizList} // 투표 마감 리스트
      //       setQuizList={setVoteQuizList} // 투표 마감 리스트
      //       broadCastInfo={broadCastInfo}
      //       matchInfo={matchInfo}
      //       quizGroupIdx={quizGroupIdx}
      //       deleteQuizInQuizList={deleteQuizInQuizList}
      //       setLoadQuizIdx={setLoadQuizIdx}
      //       quizGroupList={quizGroupList}
      //       tab={tab}
      //       mutationHandler={mutationHandler}
      //       lockForQuiz={lockForQuiz}
      //       lockForQuizHandler={lockForQuizHandler}
      //       isCloseMatch={isCloseMatch}
      //       allQuizList={allQuizList}
      //     />
      //   );
      // }
      if (tab === 1) {
        return (
          <div>
            {closeQuizList.map((closequiz) => (
              <CloseItem quizInfo={closequiz} />
            ))}
          </div>
        );

        // <QuizWrapper
        //   quizList={closeQuizList} // 결과 마감 리스트
        //   setQuizList={setCloseQuizList} // 결과 마감 리스트
        //   broadCastInfo={broadCastInfo}
        //   matchInfo={matchInfo}
        //   quizGroupIdx={quizGroupIdx}
        //   deleteQuizInQuizList={deleteQuizInQuizList}
        //   setLoadQuizIdx={setLoadQuizIdx}
        //   quizGroupList={quizGroupList}
        //   tab={tab}
        //   mutationHandler={mutationHandler}
        //   lockForQuiz={lockForQuiz}
        //   lockForQuizHandler={lockForQuizHandler}
        //   addQuizHandler={addQuizHandler}
        //   isCloseMatch={isCloseMatch}
        //   onIndiHandler={onIndiHandler}
        //   allQuizList={allQuizList}
        // />
      }
      if (tab === 2) {
        return <NoticeWrapper quizGroupIdx={quizGroupIdx} isCloseMatch={isCloseMatch} />;
      }
    }
    return <></>;
  };

  return (
    <Wrapper>
      {(matchInfo || broadCastInfo) && quizGroupIdx ? (
        <>
          <MonitorHeader matchInfo={matchInfo} broadCastInfo={broadCastInfo} />
          <Body>
            <MonitorTab tab={tab} handleTabChange={handleTabChange} />
            <DispalyBox isHide={tab !== 0}>
              <QuizWrapper
                broadCastInfo={broadCastInfo}
                matchInfo={matchInfo}
                quizGroupIdx={quizGroupIdx}
                quizList={quizList}
                deleteQuizInQuizList={deleteQuizInQuizList}
                setQuizList={setQuizList}
                setLoadQuizIdx={setLoadQuizIdx}
                quizGroupList={quizGroupList}
                tab={tab}
                mutationHandler={mutationHandler}
                lockForQuiz={lockForQuiz}
                lockForQuizHandler={lockForQuizHandler}
                isCloseMatch={isCloseMatch}
                allQuizList={allQuizList}
              />
            </DispalyBox>
            {getComponentOfTab(tab)}
            <MonitorFooter
              quizGroupIdx={quizGroupIdx}
              quizList={allQuizList}
              mutationHandler={mutationHandler}
              lockForQuiz={lockForQuiz}
              isCloseMatch={isCloseMatch}
              tab={tab}
              onIndiHandler={onIndiHandler}
              addQuizHandler={addQuizHandler}
            />
          </Body>
        </>
      ) : (
        <></>
      )}
    </Wrapper>
  );
}

export default GameMonitor;

const Wrapper = styled.div`
  position: relative;
  color: ${colors.text};
  border-radius: 10px 10px 0px 0px;

  .MuiTabs-flexContainer {
    border-bottom: solid 1px ${colors.num_444};
  }

  .MuiTab-root {
    border-radius: 10px 10px 0px 0px;
    border: 1px solid ${colors.num_444};
    border-bottom-color: ${colors.num_222};
    color: ${colors.text};
    margin: 0 3px;
  }

  .MuiTabs-indicator {
    border: 1px solid ${colors.num_222};
    background-color: ${colors.num_222};
  }
`;

const Body = styled.div`
  color: ${colors.text};
  background-color: ${colors.num_222};
  border-radius: 0 0 10px 10px;
  padding: 40px;
`;

const DispalyBox = styled.div<{ isHide: boolean }>`
  ${({ isHide }) => (isHide ? 'display: none;' : '')}
`;
