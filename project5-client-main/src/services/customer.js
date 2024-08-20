import {instance} from './axios';

export const search = async (data) =>
  (
    await instance.post('/customer/search', {
      ...data,
    })
  ).data;

export const getById = async (id) =>
  (await instance.get('/customer/getById/' + id)).data;

export const getByPath = async (id) =>
  (await instance.get('/customer/getByPath/' + id)).data;

export const getByUserId = async (id) =>
  (await instance.get('/customer/getByUserId/' + id)).data;

export const updateInfo = async (data, token) =>
  (await instance.post('/customer/update-info', data)).data;
