import {instance} from './axios';

export const search = async (data) => (await instance.post('/collection/search', {
  ...data
})).data;

export const getById = async (id) => (await instance.get('/collection/getById/' + id)).data;

export const getByPath = async (id) => (await instance.get('/collection/getByPath/' + id)).data;
