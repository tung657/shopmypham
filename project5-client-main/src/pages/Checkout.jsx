import { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router';
import { toast } from 'react-toastify';
import MainCheckout from '../components/checkout/MainCheckout';
import BannerExplore from '../components/shared/banner/BannerExplore';

export default function Checkout({ setTitle }) {
  useEffect(() => {
    setTitle('Thanh Toán | Artemis');
  }, [setTitle]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user, handleUpdateCustomerInfo } = useOutletContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.carts && user.carts.length === 0)
    {
      navigate('/products');
      toast.info('Chưa có sản phẩm nào. Hãy tiếp tục mua sắm nhé 😊');
    }
  }, [user?.carts, navigate]);

  return (
    <>
      <BannerExplore title={'thanh toán'} />

      <MainCheckout user={user} handleUpdateCustomerInfo={handleUpdateCustomerInfo} />
    </>
  )
}