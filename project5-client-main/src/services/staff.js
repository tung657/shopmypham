import {instance} from './axios';

export const search = async (data) => (await instance.post('/staff/search', {
  ...data
})).data;

export const getById = async (id) => (await instance.get('/staff/getById/' + id)).data;

export const getByUserId = async (id) => (await instance.get('/staff/getByUserId/' + id)).data;

export const remove = async (data) => (await instance.post('/staff/delete', {
  ...data
}));

export const update = async (data) => (await instance.post('/staff/update', {
  ...data
}));
