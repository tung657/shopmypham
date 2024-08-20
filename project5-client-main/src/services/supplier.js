import {instance} from './axios';

export const search = async (data) => (await instance.post('/supplier/search', {
  ...data
})).data;

export const getById = async (id) => (await instance.get('/supplier/getById/' + id)).data;

