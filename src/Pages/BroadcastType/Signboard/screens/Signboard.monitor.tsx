import styled from '@emotion/styled/macro';
import { Tab, Tabs } from '@mui/material';
import { count } from 'console';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import SignboardTable from '../../../../components/Ui/ReactTable/Signboard/SignboardTableComponent';

import ConvertGameName from '../../../../lib/ConvertGameName';
import { userAtom } from '../../../../recoil/Auth/userAtom';
import QuizBankServices, { IBank, IBankListDataParam } from '../../../../services/QuizBankServices';
import QuizServices, {
  IAddQuizCommonSuccess,
  IAddQuizGroupParam,
  IAddQuizGroupRead,
  IAddQuizReadParam,
  ICreateQuizGroupSuccess,
  IQuizGroup,
  IQuizInfo,
  IQuizItem,
} from '../../../../services/QuizServices';
import ScheduleServices, { IMatchGame } from '../../../../services/ScheduleServices';
import SignBoardServices, { ISignboard } from '../../../../services/SignBoardServices';
import { client, stompSubscribe } from '../../../../services/socket/webSocket';
import { colors } from '../../../../Styles/ui';
import MonitorHeader from '../../Components/Monitor/monitor.header';
import OpenSettingBox from '../components/Monitor/Signboard.monitor.open-setting';
import RequestListBox from '../components/Monitor/Signboard.monitor.request-list';

// import Stomp from '../../../services/webSocket/webSocket'

const testDataset = [
  {
    idx: 0,
    uid: 'test',
    login: '트위치 아이디',
    sign: '테스트 메시지 입니다.',
    state: 0,
    regDate: '2022.06.20 10:00:41',
  },
  {
    idx: 1,
    uid: 'test1',
    login: '트위치 아이디',
    sign: '테스트 메시지 입니다.',
    state: 1,
    regDate: '2022.06.20 10:00:41',
  },
  {
    idx: 2,
    uid: 'test2',
    login: '트위치 아이디',
    sign: '테스트 메시지 입니다.',
    state: 2,
    regDate: '2022.06.20 10:00:41',
  },
  {
    idx: 3,
    uid: 'test2',
    login: '트위치 아이디',
    sign: '테스트 메시지 입니다.',
    state: 3,
    regDate: '2022.06.20 10:00:41',
  },
];

function SignboardMonitor() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const param = useParams();
  const user = useRecoilValue(userAtom);
  const [info, setInfo] = useState<IMatchGame>();
  const [signboardList, setSignboardList] = useState<ISignboard[]>([]);

  const { mutate: getMatchListIndi } = useMutation(
    (data: { accountIdx: number }) => ScheduleServices.getMatchListIndi(data, param.game, param.matchId),
    {
      onSuccess: (data) => {
        if (data.match) {
          setInfo(data.match);
        }
      },
    },
  );

  const { mutate: getSignboardList } = useMutation(() => SignBoardServices.getSignboardList(param.matchId), {
    onSuccess: (data) => {
      setSignboardList(data.signboardList);
      // setSignboardList(testDataset);
      // console.log(testDataset);
      // console.log(data);
    },
  });

  useEffect(() => {
    if (client) {
      // client.deactivate();
      client.activate();
    }
  });

  // console.log('user', user);
  useEffect(() => {
    if (user) {
      getMatchListIndi({ accountIdx: user.accountIdx });
    }
  }, []);

  useEffect(() => {
    receiveSignBoardReservation();
    getSignboardList();
  }, []);

  const receiveSignBoardReservation = () => {
    console.log('receiveSignBoardReservation');
    stompSubscribe(
      `/subscribe/${user?.broadcastId}/extension/signboard/reserve`,
      (res) => {
        const data = JSON.parse(res.body);
        console.log('signboardReserved', data);
        getSignboardList();
      },
      {},
    );
  };

  return (
    <Wrapper>
      {info ? (
        <>
          <Header>{t('menu.signboard')}</Header>
          <MonitorHeader matchInfo={info} />
          {/* <CurrentSignboard /> */}
          <Body>
            <OpenSettingBox info={info} />
            {/* <SignboardTable signboardList={signboardList} /> */}
            <RequestListBox signboardList={signboardList} />
          </Body>
        </>
      ) : (
        <></>
      )}
    </Wrapper>
  );
}

export default SignboardMonitor;

const Wrapper = styled.div`
  border-radius: 10px;
  color: ${colors.text};
  background-color: ${colors.num_222};

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

  border-radius: 0 0 10px 10px;
  padding: 0 40px;
`;

const Header = styled.div`
  font: normal normal bold 24px/35px Noto Sans CJK KR;
  color: ${colors.text};
  padding: 30px 40px 25px 40px;
  width: 100%;
  border-bottom: solid 1px ${colors.num_555};
`;
