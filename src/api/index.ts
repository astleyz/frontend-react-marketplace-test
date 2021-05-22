import { AxiosResponse } from 'axios';
import { ILoginProps, IRegisterProps, AuthResponse } from '../interfaces/auth';
import { IUserData } from '../store/reducers/user.reducer';
import instance from './axios-interceptors';
import { ILightCourse, IFullCourse, ILesson, EditValues } from '../interfaces/course';

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
    changeFullName: (
      name: Pick<IUserData, 'name'>
    ) => FetchDataType<Pick<IUserData, 'name' | 'img'>>;
    changeAvatar: (data: FormData) => FetchDataType<null>;
  };
  course: {
    addCourseToUser: (link: string) => FetchDataType<null>;
    getAllCourses: () => FetchDataType<ILightCourse[]>;
    getCourse: (id: string) => FetchDataType<IFullCourse>;
    patchCourse: (options: EditValues) => FetchDataType<IFullCourse>;
    removeCourse: (id: string) => FetchDataType<null>;
  };
  lesson: {
    getLesson: (path: string) => FetchDataType<ILesson>;
    sendComment: (path: string, data: string) => FetchDataType<null>;
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
    changeFullName: (name: Pick<IUserData, 'name'>) => instance.put('/user', name),
    changeAvatar: (data: FormData) =>
      instance.patch('/user/avatar', data, { headers: { 'content-type': 'multipart/form-data' } }),
  },
  course: {
    addCourseToUser: (link: string) => instance.post('/courses/create', link),
    getAllCourses: () => instance.get('/courses'),
    getCourse: (id: string) => instance.get(`/courses/${id}`),
    patchCourse: (options: EditValues) => instance.patch(`/courses/${options.id}`, options),
    removeCourse: (id: string) => instance.delete(`/courses/${id}`),
  },
  lesson: {
    getLesson: (path: string) => instance.get(`/courses/${path}`),
    sendComment: (path: string, comment: string) => instance.post(`/courses/${path}`, { comment }),
  },
});
