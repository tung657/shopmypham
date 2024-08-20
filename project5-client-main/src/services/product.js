import {instance} from './axios';

export const search = async (data) => (await instance.post('/product/search', {
  ...data
})).data;

export const searchProducts = async (data) => (await instance.post('/product/searchProducts', {
  ...data
})).data;

export const searchFeaturedProducts = async (data) => (await instance.post('/product/searchFeaturedProducts', {
  ...data
})).data;

export const searchSellingProducts = async (data) => (await instance.post('/product/searchSellingProducts', {
  ...data
})).data;

export const getById = async (id) => (await instance.get('/product/getById/' + id)).data;

export const getByPath = async (id) => (await instance.get('/product/get-single/' + id)).data;


