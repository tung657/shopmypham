import {instance} from './axios';

export const search = async (data) => (await instance.post('/category/search', {
  ...data
})).data;

export const getByPath = async (data) => (await instance.post('/category/getByPath', {
  ...data
})).data;

export const searchMenu = async (data) => (await instance.post('/category/searchMenu', {
  ...data
})).data;

export const getById = async (id) => (await instance.get('/category/getById/' + id)).data;
