import moment from 'moment';

export const createIdFromDate = () => {
  const date = new Date();

  return moment(date).format('yyyyMMDDHHmmss');
};

export const formatDate = (date) => { 
  const d = new Date(date);

  return moment(d).format('DD-MM-yyyy');
}

export const formatDateTime = (date) => {
  const d = new Date(date);

  return moment(d).format('DD-MM-yyyy HH:mm:ss');
};

export const formatDateTime2 = (date) => {
  const d = new Date(date);
  return moment(d).format('DD-MM-yy HH:mm');
};