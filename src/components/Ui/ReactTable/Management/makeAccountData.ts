import i18next from 'i18next';
import { IAccount, IAccountPermit } from '../../../../services/ManagementServices';
import {
  getAccountGrade,
  getAccountState,
  getBroadcastType,
} from '../../../../Pages/Management/lib/Management.list-set';
import { getManagementMenuIdx, ManagementMenu } from '../../../../Pages/Management/lib/Management.menu';

const newAccountData = (account: IAccount, idx: number) => {
  const useRegister = account.securityLevel ? 'O' : 'X';
  const useQuestion = account.securityLevel ? 'O' : 'X';
  const useGradeManage = account.securityLevel === 1 ? 'O' : 'X';
  const useEditDelete = account.securityLevel === 1;
  const useCheckAccept = false;

  return {
    no: idx + 1,
    id: account.uid,
    password: account.password,
    email: account.email,
    broadcastType: getBroadcastType(account.accountsType),
    grade: getAccountGrade(account.securityLevel),
    state: getAccountState(account.state),
    note: '-',
    edit: useEditDelete,
  };
};

export default function makeAccountData(accountList: IAccount[]) {
  function makeNewAccountData(depth = 0) {
    const result = accountList.map((account, idx) => {
      return {
        ...newAccountData(account, idx),
      };
    });
    return result;
  }

  return makeNewAccountData();
}
