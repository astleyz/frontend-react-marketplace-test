import { REQUEST_REGISTRATION, REQUEST_LOGIN } from '../types';
import { IRegisterProps, ILoginProps } from '../../interfaces/IAuth';
import { IFormik as IAuthorizeFormik } from '../../components/Auth/Authorization';
import { IFormik as IRegisterFormik } from '../../components/Auth/Registration';

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
