import { AxiosResponse } from 'axios';
import { ILoginProps, IRegisterProps } from '../interfaces/IAuth';
import instance from './axios-interceptors';

export type FetchDataType<T = any> = Promise<AxiosResponse<T>>;

export type APIFetchDataType = {
  auth: {
    login: (creds: ILoginProps) => FetchDataType<ILoginProps>;
    register: (creds: IRegisterProps) => FetchDataType<IRegisterProps>;
  };
};

export const api: APIFetchDataType = Object.freeze({
  auth: {
    login: (creds: ILoginProps) => instance.post('/auth/login', creds),
    register: (creds: IRegisterProps) => instance.post('/auth/register', creds),
  };
});
