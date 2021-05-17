export interface IRegisterProps {
  login: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface ILoginProps {
  email: string;
  password: string;
  rememberme: boolean;
}

export interface AuthResponse {
  token: string;
}
