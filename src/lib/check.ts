import { IJoinRequestParam } from '../services/JoinServices';
import { IManagementUpdateParam } from '../services/ManagementServices';

interface ICheckResult {
  result: boolean;
  text: string;
  code: string;
}

const manage = {
  idx: '403-idx',
  uid: '403-uid',
  password: '403-password',
  email: '403-email',
  securityLevel: '403-securityLevel',
  accountsType: '403-accountsType',
  game: '403-game',
};

const success = '200';

export const checkManagementUpdate = (param: IManagementUpdateParam): ICheckResult => {
  const { idx, password, securityLevel, accountsType, game } = param;
  if (!idx) {
    return {
      result: false,
      text: 'None Idx',
      code: manage.idx,
    };
  }

  if (!password) {
    return {
      result: false,
      text: 'None Password',
      code: manage.password,
    };
  }

  if (!securityLevel) {
    return {
      result: false,
      text: 'None SecurityLevel',
      code: manage.securityLevel,
    };
  }

  if (!accountsType) {
    return {
      result: false,
      text: 'None AccountsType',
      code: manage.accountsType,
    };
  }

  if (accountsType === 1 && game.length === 0) {
    return {
      result: false,
      text: 'None Game',
      code: manage.game,
    };
  }

  return {
    result: true,
    text: 'Success',
    code: success,
  };
};

export const checkJoinRequest = (param: IJoinRequestParam): ICheckResult => {
  const { accountsType, email, game, password, uid } = param;
  if (!uid) {
    return {
      result: false,
      text: 'None User Id',
      code: manage.uid,
    };
  }

  if (!password) {
    return {
      result: false,
      text: 'None Password',
      code: manage.password,
    };
  }

  if (!email) {
    return {
      result: false,
      text: 'None Email',
      code: manage.email,
    };
  }

  if (!accountsType) {
    return {
      result: false,
      text: 'None AccountsType',
      code: manage.accountsType,
    };
  }

  if (accountsType === 1 && game.length === 0) {
    return {
      result: false,
      text: 'None Game',
      code: manage.game,
    };
  }

  return {
    result: true,
    text: 'Success',
    code: success,
  };
};
