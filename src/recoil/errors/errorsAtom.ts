import { atom } from 'recoil';
import { ApiError } from '../../services/axios/axios';

export interface ICustomErrorParam {
  statusCode: string;
  message: string;
}

export class CustomError {
  statusCode: string;
  message: string;

  constructor(statusCode: string, message = 'SomeThing Wrong') {
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const errorAtom = atom<ApiError | undefined>({
  key: 'error',
  default: undefined,
});

export const customErrAtom = atom<CustomError | undefined>({
  key: 'customErr',
  default: undefined,
});
