import {instance} from './axios';

export const search = async (data) =>
  (
    await instance.post('/review/search', {
      ...data,
    })
  ).data;

export const getByCustomerAndProduct = async (data) =>
  (
    await instance.post('/review/getByCustomerAndProduct', {
      ...data,
    })
  ).data;

export const checkCustomerReview = async (data) =>
  (
    await instance.post('/review/checkCustomerReview', {
      ...data,
    })
  ).data;

export const getById = async (id) =>
  (await instance.get('/review/getById/' + id)).data;

export const getByCustomer = async (id) =>
  (await instance.get('/review/getByCustomer/' + id)).data;

export const getByProduct = async (data) =>
  (
    await instance.post('/review/getByProduct/', {
      ...data,
    })
  ).data;

export const create = async (data) =>
  (
    await instance.post('/review/create-client', {
      ...data,
    })
  ).data;

export const update = async (data) =>
  (
    await instance.post('/review/update-client', {
      ...data,
    })
  ).data;

export const remove = async (data) =>
  (
    await instance.post('/review/delete-client', {
      ...data,
    })
  ).data;
