import {instance} from './axios';

export const createPaymentUrl = async (data) => (await instance.post('/payment/create_payment_url', {
  ...data
})).data;
