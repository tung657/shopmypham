import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import MainTrackOrder from '../components/trackOrder/MainTrackOrder';
import { getById as getByIdOrder } from '../services/order';

export default function TrackOrder({ setTitle }) {
  const params = useParams();

  const [order, setOrder] = useState();

  useEffect(() => {
    setTitle('Tìm Kiếm Đơn Hàng | Artemis');
  }, [setTitle]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (params) {
      getByIdOrder(params.slug)
        .then((res) => setOrder(res))
        .catch((err) => toast.info('Không tìm thấy!', {
          autoClose: 1000,
          icon: '🐔',
        }));
    }
  }, [params]); 

  console.log(order)

  return (
    <>
      <MainTrackOrder order={order} />
    </>
  );
}
