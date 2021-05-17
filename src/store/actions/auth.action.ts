import { REQUEST_REGISTRATION, REQUEST_LOGIN, SET_TOKEN, CLEAR_TOKEN } from '../types';
import { IRegisterProps, ILoginProps } from '../../interfaces/auth';
import { IFormik as IAuthorizeFormik } from '../../components/Auth/Authorization';
import { IFormik as IRegisterFormik } from '../../components/Auth/Registration';

// Types
export type AuthorizationAction = {
  type: typeof REQUEST_LOGIN;
  data: ILoginProps;
  formik: IAuthorizeFormik;
};

export type RegistrationAction = {
  type: typeof REQUEST_REGISTRATION;
  data: IRegisterProps;
  formik: IRegisterFormik;
};

export type setTokenAction = { type: typeof SET_TOKEN; payload: string };
export type clearTokenAction = { type: typeof CLEAR_TOKEN };

// Actions
export const authorization = (
  data: ILoginProps,
  formik: IAuthorizeFormik
): AuthorizationAction => ({
  type: REQUEST_LOGIN,
  data,
  formik,
});

export const registration = (
  data: IRegisterProps,
  formik: IRegisterFormik
): RegistrationAction => ({
  type: REQUEST_REGISTRATION,
  data,
  formik,
});

export const setToken = (payload: string): setTokenAction => ({ type: SET_TOKEN, payload });
export const clearToken = (): clearTokenAction => ({ type: CLEAR_TOKEN });
