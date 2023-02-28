import i18next from 'i18next';
import {
  getAccountGrade,
  getAccountState,
  getBroadcastType,
} from '../../../../Pages/Management/lib/Management.list-set';
import { IAccountPermit } from '../../../../services/ManagementServices';

const newAccountPermitData = (account: IAccountPermit, idx: number) => {
  const useRegister = account.securityLevel ? 'O' : 'X';
  const useQuestion = account.securityLevel ? 'O' : 'X';
  const useGradeManage = account.securityLevel === 1 ? 'O' : 'X';
  const useEditDelete = account.securityLevel === 1;
  const useCheckAccept = false;

  return {
    no: idx + 1,
    idx: account.idx,
    id: account.uid,
    password: account.password,
    email: account.email,
    broadcastType: getBroadcastType(account.accountsType),
    grade: getAccountGrade(account.securityLevel),
    state: getAccountState(account.state),
    note: '-',
    edit: useEditDelete,
    joinDate: account.regdate ? account.regdate.substring(0, 10) : '',
  };
};

export default function makeAccountPermitData(accountList: IAccountPermit[]) {
  function makeDataLevel(depth = 0) {
    const result = accountList.map((account, idx) => {
      return {
        ...newAccountPermitData(account, idx),
      };
    });

    return result;
  }

  return makeDataLevel();
}
