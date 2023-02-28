import { IBank } from '../../../../services/QuizBankServices';
import { IAddQuizReadSuccess, IQuizInfo } from '../../../../services/QuizServices';
import { IMutationHandler } from '../../Game/screens/Game.monitor';

interface IAddQuiz {
  data: any;
  quizList: IQuizInfo[];
  allQuizList: IQuizInfo[];
  quizGroupIdx: number;
  callback: (data: IQuizInfo[]) => void;
  // mutationHandler: IMutationHandler;
}

interface ICallbackGetQuizListSuccessParam {
  serverQuizList: IQuizInfo[];
  clientQuizList: IQuizInfo[];
  callback: (data: IQuizInfo[]) => void;
}

interface ILockForQuizHandler {
  useLock: boolean;
  lockForQuiz: boolean;
  setLockForQuiz: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IMoniterDeleteQuizInQuizList {
  quizGroupIdx: number;
  allQuizList: IQuizInfo[];
  idx: number;
  callback: (data: IQuizInfo[]) => void;
}

interface ICreateQuizGroupSuccessHandlerParam {
  quizGroupidx: number;
  callback: () => void;
  setQuizGroupIdx: React.Dispatch<React.SetStateAction<number | undefined>>;
}

interface IMonitorLoadBankDatehandler {
  quizList: IQuizInfo[];
  loadQuizIdx: number | undefined;
  loadBankData: IBank;
  callback: (data: IQuizInfo[]) => void;
}

export const moniterAddQuiz = ({ data, quizList, allQuizList, quizGroupIdx, callback }: IAddQuiz) => {
  if (quizGroupIdx) {
    const curQuizList = allQuizList.filter((quiz) => quiz.state === 5).concat(quizList);
    callback([
      ...curQuizList,
      {
        idx: data.returnData.idx,
        item: [],
        matchState: 1,
        name: '',
        tooltip: '',
        orders: allQuizList.length + 1,
        quizTypeIdx: 0,
        state: 1,
        times: 0,
        pick: 0,
        startDate: '',
        fixKill: 0,
        type: 1,
        allCorrect: 0,
      },
    ]);
    // mutationHandler('quizList');
  }
};

export const monitorLockForQuiz = ({ useLock, lockForQuiz, setLockForQuiz }: ILockForQuizHandler) => {
  if (useLock !== lockForQuiz) {
    setLockForQuiz(useLock);
  }
};

export const moniterDeleteQuizInQuizList = ({
  quizGroupIdx,
  allQuizList,
  idx,
  callback,
}: IMoniterDeleteQuizInQuizList) => {
  if (quizGroupIdx) {
    const result = allQuizList.filter((quiz) => quiz.idx !== idx);
    callback(result);
  }
};

export const getQuizListSuccess = (data: ICallbackGetQuizListSuccessParam) => {
  const { serverQuizList, clientQuizList, callback } = data;
  const newQuizList = [];

  if (clientQuizList.length === 0) {
    callback(serverQuizList);
  } else {
    for (let i = 0; i < serverQuizList.length; i += 1) {
      const clientQuiz = clientQuizList.filter((cQuiz) => cQuiz.idx === serverQuizList[i].idx);
      if (clientQuiz.length > 0 && serverQuizList[i].state === clientQuiz[0].state) {
        newQuizList.push(clientQuiz[0]);
      } else {
        newQuizList.push(serverQuizList[i]);
      }
      // if (clientQuizList.length > i) {
      //   if (serverQuizList[i].state !== clientQuizList[i].state) {
      //     newQuizList.push(serverQuizList[i]);
      //   } else {
      //     newQuizList.push(clientQuizList[i]);
      //   }
      // } else {
      // }
    }
    callback(newQuizList);
  }
};

export const createQuizGroupSuccessHandler = (data: ICreateQuizGroupSuccessHandlerParam) => {
  const { quizGroupidx, callback, setQuizGroupIdx } = data;
  setQuizGroupIdx(quizGroupidx);
  callback();
};

export const monitorLoadBankDatehandler = ({
  quizList,
  loadQuizIdx,
  loadBankData,
  callback,
}: IMonitorLoadBankDatehandler) => {
  const copyQuizList = [...quizList];
  const newQuizList = copyQuizList.map((data) => {
    if (data.idx === loadQuizIdx) {
      const copy = { ...data };
      copy.item = loadBankData.item ?? copy.item;
      copy.name = loadBankData.name ?? copy.name;
      copy.matchState = loadBankData.matchState ?? copy.matchState;
      copy.quizTypeIdx = loadBankData.quizTypeIdx ?? copy.quizTypeIdx;
      copy.times = loadBankData.times ?? copy.times;
      return copy;
    }
    return data;
  });
  callback(newQuizList);
};

export interface IUpdateQuizInfo {
  key: string;
  data: any;
  mutationHandler: IMutationHandler;
  quizInfo: IQuizInfo;
  patchQuizList: (idx: number, quizInfo: IQuizInfo) => void;
  index: number;
}

export const moniterUpdateQuizInfo = ({
  key,
  data,
  mutationHandler,
  quizInfo,
  patchQuizList,
  index,
}: IUpdateQuizInfo) => {
  if (!data && key === 'quizList') {
    // console.log('=== mutationHandler ====');
    mutationHandler(key);
  } else {
    // console.log('=== updateQuizInfo ====');
    const newQuizInfo: any = { ...quizInfo };
    // 얕은 복사를 이용한 객체 속성 변경.
    if (key.includes('.')) {
      const newKey = key.split('.');
      let DeepCopy: any = newQuizInfo;
      console.log(DeepCopy === newQuizInfo);
      newKey.forEach((el, idx) => {
        if (idx === newKey.length - 1) {
          if (Object.keys(DeepCopy).includes(el)) {
            DeepCopy[el] = data;
          }
        } else {
          DeepCopy = DeepCopy[el];
        }
      });
    } else {
      newQuizInfo[key] = data;
    }
    patchQuizList(index, newQuizInfo);
  }
};
