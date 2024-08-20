import {instance} from './axios';

export const search = async (data, token) =>
  (
    await instance.post(
      '/user/search',
      {
        ...data,
      },
      {
        headers: {
          'auth-token': token,
        },
      }
    )
  ).data;

export const getById = async (id) => (await instance.get('/user/' + id)).data;

export const getByIdClient = async (id) =>
  (await instance.get('/user/client/get-by-id/' + id)).data;

export const register = async (data) =>
  await instance.post('/user/register', {
    ...data,
  });

export const verify = async (data) =>
  await instance.post('/user/verify', {
    ...data,
  });

export const login = async (data) =>
  await instance.post('/user/login', {
    ...data,
  });

export const refreshToken = async (data) => await instance.post('/user/refresh-token', {...data});

export const changePassword = async (data) =>
  await instance.post('/user/change-password-client', {
    ...data,
  });

export const resetPassword = async (data) =>
  await instance.post('/user/reset-password', {
    ...data,
  });

export const remove = async (data, token) =>
  await instance.post(
    '/user/delete',
    {
      ...data,
    },
    {
      headers: {
        'auth-token': token,
      },
    }
  );

export const update = async (data, token) =>
  await instance.post(
    '/user/update',
    {
      ...data,
    },
    {
      headers: {
        'auth-token': token,
      },
    }
  );
