import { AxiosResponse } from 'axios';
import { ILoginProps, IRegisterProps, AuthResponse } from '../interfaces/auth';
import { IUserData } from '../store/reducers/user.reducer';
import instance from './axios-interceptors';
import { ICourse } from '../interfaces/course';

export type FetchDataType<T = any> = Promise<AxiosResponse<T>>;

export type APIFetchDataType = {
  auth: {
    login: (creds: ILoginProps) => FetchDataType<AuthResponse>;
    register: (creds: IRegisterProps) => FetchDataType<AuthResponse>;
    logout: () => FetchDataType<null>;
    refreshTokens: () => FetchDataType<AuthResponse>;
  };
  user: {
    getFullName: () => FetchDataType<Pick<IUserData, 'name' | 'img'>>;
  };
  courses: {
    getAllCourses: () => FetchDataType<ICourse[]>;
    addCourseToUser: (link: string) => FetchDataType<null>;
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
  courses: {
    getAllCourses: () => instance.get('/courses'),
    addCourseToUser: (link: string) => instance.post('/courses/create', link),
  },
});
