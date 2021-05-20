import axios from 'axios';
import store from '../store/store';
import { setSnackbar } from '../store/actions';
import { api } from './index';
import { setToken } from '../store/actions/auth.action';

let apiUrl: string = '';
switch (process.env.NODE_ENV) {
  case 'development':
    apiUrl = process.env.REACT_APP_DEV_DOMAIN!;
    break;
  case 'production':
    apiUrl = process.env.REACT_APP_PROD_DOMAIN!;
    break;
}

let isTokenRefreshing = false;
const checkIsTokenValid = (token: string): boolean => {
  const expTime = JSON.parse(atob(token.split('.')[1])).exp;
  const timeNow = +Date.now().toString().substr(0, 10);
  return expTime >= timeNow + 10;
};

const instance = axios.create({
  baseURL: `${apiUrl}`,
  withCredentials: true,
});

instance.interceptors.request.use(
  async request => {
    const token = store.getState().auth.token;
    if (token) request.headers['Authorization'] = token;

    if (token && !checkIsTokenValid(token) && !isTokenRefreshing) {
      isTokenRefreshing = true;
      const response = await api.auth.refreshTokens();
      isTokenRefreshing = false;
      request.headers['Authorization'] = response.data.token;
      store.dispatch(setToken(response.data.token));
    }

    return request;
  },
  error => {
    store.dispatch(setSnackbar(true, 'error', error));
  }
);

// instance.interceptors.response.use(
//   res => res,
//   err => {
//     if (err.response.status === 404) {
//       return false;
//     }
//     throw err;
//   }
// );

export default instance;
