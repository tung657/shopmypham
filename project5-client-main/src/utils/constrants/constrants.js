export const calculateDiscount = (a='', percent=0) => {
  a = Number((a + '').replace(/,/g, ''));
  return (a - a * percent / 100).toLocaleString('en');
}