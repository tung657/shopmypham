import {instance} from './axios';

export const search = async (data) => (await instance.post('/order/search-client', {
  ...data
})).data;

export const getById = async (id) => (await instance.get('/order/get-by-id/' + id)).data;

export const create = async (data) => (await instance.post('/order/create-client', {
  ...data
})).data;

export const update = async (data) => (await instance.post('/order/update-client', {
  ...data
})).data;
