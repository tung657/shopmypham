import { useEffect } from 'react';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateInfo } from '../../services/customer';
import { create as createOrder } from '../../services/order';
import { createPaymentUrl } from '../../services/payment';
import { createIdFromDate } from '../../utils/format/formatDate';
import DialogDelivery from '../deliveryAddress/DialogDelivery';
import DialogListDelivery from '../deliveryAddress/DialogListDelivery';
import AlertInfo from '../shared/Alert/AlertInfo';

import { setSessionStorage } from '../../utils/storage/storage';
import { sendOrder } from '../../services/email';

export default function LeftCheckout({
  user,
  showDialogDelivery,
  setShowDialogDelivery,
  handleUpdateCustomerInfo,
  total,
}) {
  const [showDialogListDelivery, setShowDialogListDelivery] = useState(false);

  const [delivery, setDelivery] = useState();
  const [itemSelected, setItemSelected] = useState();

  const [paymentMethod, setPaymentMethod] = useState(1);
  const [note, setNote] = useState('');

  const [showAlertInfo, setShowAlertInfo] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const d = user.delivery_addresses?.find(
        (item) => item.isAddressDefault === true
      );
      setDelivery(d);
    }
  }, [user]);
  const handlePayment = () => {
    if (!delivery) {
      toast.warning('Bạn cần có địa chỉ giao hàng.');
      return;
    }
    if (!paymentMethod) {
      toast.warning('Bạn cần chọn phương thức thanh toán!');
      return;
    }
    if (!user) {
      toast.warning('Bạn cần đăng nhập để thực hiện thanh toán!');
      return;
    }
    if (!user?.user?.verified) {
      const CustomToastWithLink = () => (
        <div>
          Vì một số lý do, bạn cần{' '}
          <Link
            className='underline text-sky-600'
            to={`/account/${user.path}/account-details`}
          >
            xác thực email
          </Link>{' '}
          để tiếp tục!
        </div>
      );
      toast.info(CustomToastWithLink, {
        autoClose: 8000,
      });
      return;
    }
    if (user.carts.length <= 0)
    {
      toast.warning('Bạn không có sản phẩm nào để thanh toán!');
      return;
    }
    const order = {
      id: createIdFromDate(),
      customer: user._id,
      paid: false,
      delivery_address: delivery,
      note,
      total,
      details: user.carts,
    };
    if (paymentMethod === 1) {
      order.payment_type = 'vnpay';
      createPaymentUrl({
        orderId: order.id,
        vnp_ReturnUrl: window.location.origin + '/payment/payment-return',
        total: total,
        orderDescription: `${user.user.username.toUpperCase()} THANH TOAN HOA DON `,
        orderType: 'fashion',
      })
        .then((res) => {
          setSessionStorage('order', order);
          // createOrder(order)
          //   .then(async (res) => {
          //     user.carts = user.carts.filter((item) => !item.checked);
          //     await updateInfo(user).then(() => navigate('/'));
          //     if (paymentMethod !== 1)
          //       return navigate(
          //         `/payment/payment-return?vnp_TxnRef=${order.id}`
          //       );
          //   })
          //   .catch((err) => toast.error(err.response.data.message));
          window.open(res.vnpUrl, '_blank');
        })
        .catch((err) => toast.error('Có Lỗi Xảy Ra.'));
    } else {
      order.payment_type = 'Thanh toán khi nhận hàng';
      createOrder(order)
        .then(async (res) => {
          user.carts = user.carts.filter((item) => !item.checked);
          await updateInfo(user);
          await sendOrder({ email: user.user.email, orderId: order.id, orderLink: window.location.origin + '/account/orders/' + order.id });
          if (paymentMethod !== 1)
            return navigate(`/payment/payment-return?vnp_TxnRef=${order.id}`);
        })
        .catch((err) => toast.error(err.response.data.message));
    }
  };

  return (
    <>
      <div className='md:w-full lg:w-3/5 flex h-full flex-col -mt-1.5'>
        <div className='flex justify-between items-center mb-6 xl:mb-8'>
          <h2 className='text-lg md:text-xl xl:text-2xl font-bold text-heading'>
            Địa Chỉ Giao Hàng
          </h2>
          <span
            className='text-heading hover:text-gray-600 underline hover:no-underline cursor-pointer'
            onClick={() => setShowDialogListDelivery(true)}
          >
            Xem tất cả
          </span>
        </div>
        <div className='flex justify-between items-start gap-2 mb-6 xl:mb-8'>
          {user ? (
            delivery ? (
              <>
                <div className='flex flex-col gap-1'>
                  <div>
                    {delivery.full_name} - {delivery.phone}
                  </div>
                  <div>
                    {delivery.address_detail}, {delivery.commune.name_with_type}
                    , {delivery.district.name_with_type},{' '}
                    {delivery.province.name_with_type}
                  </div>
                </div>
                <div
                  className='font-semibold whitespace-nowrap cursor-pointer hover:text-violet-500'
                  onClick={() => {
                    setItemSelected(delivery);
                    setShowDialogDelivery(true);
                  }}
                >
                  Thay Đổi
                </div>
              </>
            ) : (
              <div className='text-lg'>Bạn chưa có địa chỉ giao nào.</div>
            )
          ) : (
            <>
              <Skeleton containerClassName='w-full' height={25} count={2} />
              <Skeleton width={80} height={25} />
            </>
          )}
        </div>

        <div className='flex justify-between items-center mb-6 xl:mb-8 border-t'>
          <h2 className='text-lg md:text-xl xl:text-2xl font-bold text-heading'>
            Phương Thức Thanh Toán
          </h2>
        </div>
        <div className='flex flex-col justify-between items-start gap-4 mb-6 xl:mb-8'>
          <div className='flex gap-4 items-center'>
            <input
              id={'vnpay-payment'}
              type='radio'
              name='payment-method'
              className='form-radio w-5 h-5 border border-gray-300 cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-heading checked:hover:bg-heading checked:focus:bg-heading rounded-full'
              defaultChecked={paymentMethod === 1}
              onChange={(e) => setPaymentMethod(1)}
            />
            <label
              htmlFor='vnpay-payment'
              className='font-semibold flex gap-4 items-center cursor-pointer hover:text-gray-900'
            >
              <span>Thanh toán qua VNPAY</span>
              <div>
                <img
                  alt=''
                  src={require('../../assets/images/payment/vnpay.png')}
                  className='object-cover w-[50px] select-none'
                />
              </div>
            </label>
          </div>
          <div className='flex gap-4 items-center'>
            <input
              id={'receiving-payment'}
              type='radio'
              name='payment-method'
              className='form-radio w-5 h-5 border border-gray-300 cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-heading checked:hover:bg-heading checked:focus:bg-heading rounded-full'
              defaultChecked={paymentMethod === 2}
              onChange={(e) => setPaymentMethod(2)}
            />
            <label
              htmlFor='receiving-payment'
              className='font-semibold flex gap-4 items-center cursor-pointer hover:text-gray-900'
            >
              <span>Thanh toán khi nhận hàng</span>
              <div>
                <img
                  alt=''
                  src={require('../../assets/images/payment/receiving.png')}
                  className='object-fit w-[50px] select-none'
                />
              </div>
            </label>
          </div>
          <div className='w-full'>
            <textarea
              className='w-full p-4 outline-none border-2 transition border-gray-500 rounded-md focus:border-heading'
              placeholder='Ghi chú cho Shop'
              value={note}
              rows={3}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </div>
          <div className=''>
            <button
              className='text-white px-8 py-2 bg-heading rounded hover:bg-black/70'
              onClick={() => setShowAlertInfo(true)}
            >
              Tiến Hành Thanh Toán
            </button>
          </div>
        </div>
      </div>

      {showDialogListDelivery && (
        <DialogListDelivery
          showDialog={showDialogListDelivery}
          setShowDialog={setShowDialogListDelivery}
          setShowDialogDelivery={setShowDialogDelivery}
          user={user}
          handleUpdateCustomerInfo={handleUpdateCustomerInfo}
          setItemSelected={setItemSelected}
        />
      )}

      {showDialogDelivery && (
        <DialogDelivery
          showDialog={showDialogDelivery}
          setShowDialog={setShowDialogDelivery}
          user={user}
          handleUpdateCustomerInfo={handleUpdateCustomerInfo}
          itemSelected={itemSelected}
          setItemSelected={setItemSelected}
        />
      )}

      {showAlertInfo && (
        <AlertInfo
          showAlert={showAlertInfo}
          setShowAlert={setShowAlertInfo}
          handleConfirm={handlePayment}
        />
      )}
    </>
  );
}
