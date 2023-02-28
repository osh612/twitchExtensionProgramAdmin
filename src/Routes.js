import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import Layout from './Layout';
import { goLogin } from './lib/pagePath';
import Home from './Pages/Home/Home';
import LoginContent from './Pages/Login/Login';
import NotFound404 from './Pages/NotFound/NotFound404';
import { permissionsAtom, userAtom } from './recoil/Auth/userAtom';
import ServerServices from './services/ServerServices';
import GameIndex from './Pages/BroadcastType/Game/screens/Game.index';
import Game from './Pages/BroadcastType/Game/Game';
import ScheduleServices from './services/ScheduleServices';
import ScheduleAtom from './recoil/schedule/scheduleAtom';
import ManagementContent from './Pages/Management/Management';
import ManagementIndex from './Pages/Management/screens/Management.index';
import QuizServices from './services/QuizServices';
import QuizAtom from './recoil/quiz/quizAtom';
import SignComponent from './Pages/Sign/Sign';
import TwitchAuth from './Pages/Sign/screen/Sign.twitch-auth';
import BankContent from './Pages/BroadcastType/Bank/Bank';
import BankIndex from './Pages/BroadcastType/Bank/screens/Bank.index';
import CustomErrorController from './components/Error/CustomErrorController';
import BankAddQuiz from './Pages/BroadcastType/Bank/screens/Bank.add-quiz';
import GameServices from './services/GameServices';
import gameAtom from './recoil/game/gameAtom';
import SignboardComponent from './Pages/BroadcastType/Signboard/Signboard';
import SignboardIndex from './Pages/BroadcastType/Signboard/screens/Signboard.index';
import SignboardMonitor from './Pages/BroadcastType/Signboard/screens/Signboard.monitor';
import GameMonitor from './Pages/BroadcastType/Game/screens/Game.monitor';
import AccountCodeContent from './Pages/AccountCode/AccountCode';
import SearchPassword from './Pages/Sign/screen/Sign.search-password';
import BroadcastType from './Pages/BroadcastType/BoradcastType';
import { TypeList } from './components/Sidebar/Components/Sidebar.TypeBox';
import CodeTraker from './Pages/CodeTraker/CodeTraker';
import CodeTrakerIndex from './Pages/CodeTraker/screens/CodeTraker.index';


const getLeagueManagerRouter = () => {
  return (
    <>
      <Route path="/:type" element={<BroadcastType />}>
        <Route path=":game" element={<Game />}>
          <Route path=":league" element={<GameIndex />} />
          <Route path=':league/:matchId' element={<GameMonitor />} />
        </Route>
        <Route path="/:type/bank" element={<BankContent />}>
          <Route path=":game" element={<BankIndex />} />
          <Route path=":game/quiz" element={<BankAddQuiz />} />
        </Route>
        <Route path="/:type/signboard" element={<SignboardComponent />}>
          <Route path=":game" element={<><Outlet /></>}>
            <Route path=":league" element={<SignboardIndex />} />
            <Route path=":league/:matchId" element={<SignboardMonitor />} />
          </Route>
        </Route>
      </Route >
    </>
  )
}

const getStreamerRouter = () => {
  return (
    <>
      <Route path="/:type" element={<BroadcastType />}>
        <Route path=":streamerCode" element={<Game />}>
          <Route index element={<GameIndex />} />
          <Route path=':matchId' element={<GameMonitor />} />
        </Route>
        <Route path="bank" element={<BankContent />}>
          <Route path=":streamerCode" element={<BankIndex />} />
          <Route path=":streamerCode/quiz" element={<BankAddQuiz />} />
        </Route>
        <Route path="signboard" element={<SignboardComponent />}>
          <Route path=":streamerCode" element={<><Outlet /></>}>
            <Route index element={<SignboardIndex />} />
            <Route path=":matchId" element={<SignboardMonitor />} />
          </Route>
        </Route>
        <Route path="accountCode" element={<AccountCodeContent />} />
      </Route >

    </>
  )
}

function Routor() {
  const management = useRecoilValue(permissionsAtom.management);
  const leagueManager = useRecoilValue(permissionsAtom.leagueManager);
  const streamer = useRecoilValue(permissionsAtom.streamer);
  const codeTraker = useRecoilValue(permissionsAtom.codeTraker);

  const setGameList = useSetRecoilState(gameAtom.gameList)
  document.title = `Decakill`;

  const { mutate: getGameList } = useMutation(() => GameServices.getGameList(), {
    onSuccess: data => {
      setGameList(data.game)
    },
  });

  useEffect(() => {
    getGameList();
  }, [])

  return (
    <Router>
      <CustomErrorController />
      <Routes>
        <Route path='/' element={<PrivateOutlet />}>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            {leagueManager ? getLeagueManagerRouter() : <></>}
            {streamer ? getStreamerRouter() : <></>}
            {
              management ?
                <Route path="/management" element={<ManagementContent />}>
                  <Route index element={<ManagementIndex />} />
                  <Route path="addAccount" element={<ManagementIndex />} />
                  <Route path="history" element={<ManagementIndex />} />
                </Route> : <></>
            }
            {codeTraker ?
              <Route path='codeTraker' element={<CodeTraker />} >
                <Route index element={<CodeTrakerIndex />} />
              </Route> : <></>
            }

          </Route>
        </Route>
        <Route path={goLogin} element={<LoginContent />} />
        <Route path="/sign" element={<SignComponent />}>
          <Route index element={<TwitchAuth />} />
          <Route path="search-password" element={<SearchPassword />} />

          {/* <Route path="signUp" element={<SignUp />} /> */}
        </Route>

        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </Router>
  );
}

export default Routor;

function PrivateOutlet() {
  const location = useLocation();
  const user = useRecoilValue(userAtom);
  const setLeagueList = useSetRecoilState(ScheduleAtom.leagueList)
  const setQuizTypeList = useSetRecoilState(QuizAtom.quizTypeList)

  const setPerManagement = useSetRecoilState(permissionsAtom.management);
  const setPerBank = useSetRecoilState(permissionsAtom.bank);
  const setPerBankAdd = useSetRecoilState(permissionsAtom.bankAdd);
  const setPerBankEdit = useSetRecoilState(permissionsAtom.bankEdit);
  const setPerBankLoad = useSetRecoilState(permissionsAtom.bankLoad);
  const setPerBankRollback = useSetRecoilState(permissionsAtom.bankRollback);
  const setStreamer = useSetRecoilState(permissionsAtom.streamer);
  const setLeagueManager = useSetRecoilState(permissionsAtom.leagueManager);
  const setCodeTraker = useSetRecoilState(permissionsAtom.codeTraker);

  const resetPerManagement = useResetRecoilState(permissionsAtom.management);
  const resetPerBank = useResetRecoilState(permissionsAtom.bank);
  const resetPerBankAdd = useResetRecoilState(permissionsAtom.bankAdd);
  const resetPerBankEdit = useResetRecoilState(permissionsAtom.bankEdit);
  const resetPerBankLoad = useResetRecoilState(permissionsAtom.bankLoad);
  const resetPerBankRollback = useResetRecoilState(permissionsAtom.bankRollback);
  const resetStreamer = useResetRecoilState(permissionsAtom.streamer);
  const resetLeagueManager = useResetRecoilState(permissionsAtom.leagueManager);
  const resetCodeTraker = useResetRecoilState(permissionsAtom.codeTraker);

  const param = useParams();
  const { mutate: getVersion } = useMutation(
    () => ServerServices.getVersion(), {
    onSuccess: data => {
      console.log("version: ", data);
    },
  });

  const { mutate: getLeagueRead } = useMutation(
    ({ game }) => ScheduleServices.getLeagueRead(game),
    {
      onSuccess: data => {
        setLeagueList(data.leagueList);
      },
    },
  );

  const { mutate: getQuizTypeList } = useMutation(() => QuizServices.getQuizTypeList(), {
    onSuccess: data => {
      setQuizTypeList(data.quizTypeList)
    },
  });

  useEffect(() => {
    if (user) {
      const useStreamer = user.accountsType === 2;
      const useLeagueManager = user.accountsType === 1;
      const onlySupervisor = user.securityLevel === 1;
      const onlyManager = user.securityLevel === 2;
      const allUser = true;

      // Supervisor 전용
      setPerManagement(onlySupervisor)
      setPerBankEdit(onlySupervisor);
      setCodeTraker(onlySupervisor);
      // 스트리머 전용
      setStreamer(useStreamer);
      // 리그매니저 전용
      setLeagueManager(useLeagueManager);
      // 모든 유저
      setPerBank(allUser);
      setPerBankAdd(allUser);
      setPerBankLoad(allUser);
      setPerBankRollback(allUser);
      // 파트너십

    } else {
      resetPerManagement();
      resetPerBank();
      resetPerBankAdd();
      resetPerBankEdit();
      resetPerBankLoad();
      resetPerBankRollback();
      resetStreamer();
      resetLeagueManager();
      resetCodeTraker();
    }
  }, [user])



  useEffect(() => {
    if (typeof param.game === 'string') {
      getLeagueRead({ game: param.game });
    }
  }, [param.game]);

  useEffect(() => {
    if (param.type === TypeList[0]) {
      setStreamer(false)
      setLeagueManager(true)
    } else if (param.type === TypeList[1]) {
      setStreamer(true)
      setLeagueManager(false)
    }

  }, [param.type]);

  useEffect(() => {
    getVersion();
    getQuizTypeList();

  }, [])

  if (user && location.pathname === '/') {
    let gameList = [];
    if (user?.game) {
      if (typeof user.game === 'string') {
        gameList = user.game.split(',');
      } else {
        gameList = user.game.map(data => data.key);
      }
    }
    // if (gameList.length > 0) {
    //   return <Navigate to={`/${gameList[0]}`} />
    // }
  }
  if (location.pathname.includes('/login')) {
    return <Outlet />
  }
  return user ? <Outlet /> : <Navigate to='/login' />;
}
