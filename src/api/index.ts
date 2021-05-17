import { AxiosResponse } from 'axios';
import { ILoginProps, IRegisterProps, AuthResponse } from '../interfaces/auth';
import { IUserData } from '../store/reducers/user.reducer';
import instance from './axios-interceptors';

export type FetchDataType<T = any> = Promise<AxiosResponse<T>>;

export type APIFetchDataType = {
  auth: {
    login: (creds: ILoginProps) => FetchDataType<AuthResponse>;
    register: (creds: IRegisterProps) => FetchDataType<AuthResponse>;
    logout: () => FetchDataType<any>;
    refreshTokens: () => FetchDataType<AuthResponse>;
  };
  user: {
    getFullName: () => FetchDataType<Pick<IUserData, 'name' | 'img'>>;
  };
};

export const api: APIFetchDataType = Object.freeze({
  auth: {
    login: (creds: ILoginProps) => instance.post('/auth/login', creds),
    register: (creds: IRegisterProps) => instance.post('/auth/register', creds),
    logout: () => instance.post('/auth/logout'),
    refreshTokens: () => instance.post('/auth/refresh-tokens'),
  },
  user: {
    getFullName: () => instance.get('/user?name=true&img=true'),
  },
});
