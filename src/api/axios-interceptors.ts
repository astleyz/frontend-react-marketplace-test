import axios from 'axios';

let apiUrl: string = '';
switch (process.env.NODE_ENV) {
  case 'development':
    apiUrl = process.env.REACT_APP_DEV_DOMAIN!;
    break;
  case 'production':
    apiUrl = process.env.REACT_APP_PROD_DOMAIN!;
    break;
}

const instance = axios.create({
  baseURL: `${apiUrl}`,
});


export default instance;
