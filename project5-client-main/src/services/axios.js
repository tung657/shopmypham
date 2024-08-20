import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { loginSuccess } from '../utils/redux/authReducer';
import { getLocalStorage, getSessionStorage } from '../utils/storage/storage';
import { refreshToken } from './auth';

const BASE_API_URL = process.env.REACT_APP_API_URL + 'api';
// let BASE_API_URL = 'https://vninspect.asia/api';
const token = getLocalStorage('user')?.token || getSessionStorage('user')?.token;

export const instance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'auth-token': token,
  }
});

export const createInstanceVerifier = (user, dispatch) => {
  const axiosJWT = axios.create({
    baseURL: BASE_API_URL,
  });

  axiosJWT.interceptors.request.use(
    async (config) => {
      const date = new Date();
      const decodedToken = jwt_decode(user?.accessToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshData = {
          ...user,
          accessToken: data.accessToken,
        };
        dispatch(loginSuccess(refreshData));
        config.headers['auth-token'] = data.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  return axiosJWT;
};
