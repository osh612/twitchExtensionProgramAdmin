import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { t } from 'i18next';
import qs from 'qs';
import { toastError, toastSuccess } from '../../components/Toastify/ToasitifyContainer';
import { isLive, LiveAPI, TestAPI } from '../../Pages/config';
// import { API } from '../../Pages/config';

const baseUrl = isLive ? LiveAPI : TestAPI;

const serverError = 'axios.serverError';
const apiError = 'axios.apiError';
const updateSuccess = 'axios.updateSuccess';
const putSuccess = 'axios.putSuccess';
const deleteSuccess = 'axios.deleteSuccess';

function geti18n(text: string): string {
  return t(text);
}

export interface IAxiosResponse<T> extends IStatus {
  message?: string;
  users?: T;
  errorMsg?: string;
}

export interface IResponseSuccess<T> {
  response: T;
  status: string;
  message: string;
}

export interface IStatus {
  status: IStatusItems;
}

export interface IStatusItems {
  auth: string;
  description: string;
  message: string;
  status_code: number;
  errorCode: number;
}

export class ApiError implements IAxiosResponse<undefined> {
  status: IStatusItems;
  message: string;

  constructor(status: IStatusItems, message = 'SomeThing Wrong') {
    this.status = status;
    this.message = message;
  }
}

export const axiosPost = axios.create({
  baseURL: `${baseUrl}`,
  method: 'POST',
  // headers: { 'content-type': 'application/json', accept: 'application/json' },
  timeout: 20000,
});

export const axiosPatch = axios.create({
  baseURL: `${baseUrl}`,
  method: 'PATCH',
  // headers: { 'content-type': 'application/json', accept: 'application/json' },
  timeout: 20000,
});

export const axiosPut = axios.create({
  baseURL: `${baseUrl}`,
  method: 'PUT',
  // headers: { 'content-type': 'application/json', accept: 'application/json' },
  timeout: 20000,
});

export const axiosDelete = axios.create({
  baseURL: `${baseUrl}`,
  method: 'DELETE',
  // headers: { 'content-type': 'application/json', accept: 'application/json' },
  timeout: 20000,
});

export const axiosGet = axios.create({
  baseURL: `${baseUrl}`,
  method: 'GET',
  // paramsSerializer: (params) => {
  //   return qs.stringify(params, { arrayFormat: 'repeat' });
  // },
  timeout: 5000,
});

export const axiosGetNoLogin = axios.create({
  baseURL: `${baseUrl}`,
  method: 'GET',
  // paramsSerializer: (params) => {
  //   return qs.stringify(params, { arrayFormat: 'repeat' });
  // },
  timeout: 5000,
});

export const axiosPostNoLogin = axios.create({
  baseURL: `${baseUrl}`,
  method: 'POST',
  // headers: { 'content-type': 'application/json', accept: 'application/json' },
  timeout: 20000,
});
const handleUseUser = (config: AxiosRequestConfig) => {
  const _config = addUserData(config);
  return _config;
};

const handleUseHeader = (config: AxiosRequestConfig) => {
  const _config = addHeader(config);
  return _config;
};

const addUserData = (config: AxiosRequestConfig) => {
  const user = sessionStorage.getItem('user');

  if (user) {
    const { userId, token } = JSON.parse(user);
    const _config = {
      ...config,
      headers: { Authorization: `Bearer ${token}` },
      // data: { ...config.data, id: userId, token },
    };
    return _config;
  }
  throw new Error('user data is none.');
};

const addHeader = (config: AxiosRequestConfig) => {
  const user = sessionStorage.getItem('user');
  if (user) {
    const { token } = JSON.parse(user);
    const _config = {
      ...config,
      headers: { Authorization: `Bearer ${token}` },
    };
    return _config;
  }
  throw new Error('user data is none.');
};

const handleError = (error: any) => {
  if (error.message === 'Network Error') {
    toastError(error.message);
  }
  return Promise.reject(error);
};

// // 요청 인터셉터
axiosPost.interceptors.request.use(handleUseUser);
axiosGet.interceptors.request.use(handleUseHeader);
axiosPut.interceptors.request.use(handleUseHeader);
axiosDelete.interceptors.request.use(handleUseHeader);
axiosPatch.interceptors.request.use(handleUseHeader);

// 응답 인터셉터

// 공통 Intercept Response
const commonInterceptorResponse = (res: AxiosResponse<IAxiosResponse<string[]>>) => {
  // http 기본응답
  if (res.status > 299 || res.status < 200) {
    console.error('서버에 호출이 들어가지 않았습니다. url을 확인하세요');
    toastError(geti18n(serverError));
  }

  // 서버에서 호출하는 응답 schema
  if (Number(res.data.status.status_code) > 299 || Number(res.data.status.status_code) < 200) {
    const { status, message } = res.data;
    const error = new ApiError(status, message);
    toastError(geti18n(apiError));
    return Promise.reject(error);
  }
  return res;
};

const useToastResponse = (res: AxiosResponse<IAxiosResponse<string[]>>) => {
  const result = commonInterceptorResponse(res);
  const { method } = res.config;
  console.log('method', method);
  switch (method) {
    case 'put':
      toastSuccess(geti18n(putSuccess));
      break;
    case 'delete':
      toastSuccess(geti18n(deleteSuccess));
      break;
    case 'patch':
      toastSuccess(geti18n(updateSuccess));
      break;
    default:
  }
  return result;
};

// 응답 인터셉터
axiosPost.interceptors.response.use(commonInterceptorResponse, handleError);
axiosGet.interceptors.response.use(commonInterceptorResponse, handleError);
axiosPut.interceptors.response.use(commonInterceptorResponse, handleError);
axiosDelete.interceptors.response.use(commonInterceptorResponse, handleError);
axiosPatch.interceptors.response.use(commonInterceptorResponse, handleError);
axiosGetNoLogin.interceptors.response.use(commonInterceptorResponse, handleError);
axiosPostNoLogin.interceptors.response.use(commonInterceptorResponse, handleError);
