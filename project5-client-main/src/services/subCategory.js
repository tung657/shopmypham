import {instance} from './axios';

export const search = async (data) => (await instance.post('/sub-category/search', {
  ...data
})).data;

export const getById = async (id) => (await instance.get('/sub-category/getById/' + id)).data;

export const getByPath = async (id) => (await instance.get('/sub-category/getByPath/' + id)).data;

