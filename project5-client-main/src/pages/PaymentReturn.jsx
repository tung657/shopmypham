import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link, useNavigate, useOutletContext, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import codeResponseVnPay from '../assets/jsons/code_response_vnpay.json';
import { sendOrder } from '../services/email';
import {
  getById,
  create as createOrder,
} from '../services/order';
import { formatDateTime } from '../utils/format/formatDate';
import { getSessionStorage, removeSessionStorage } from '../utils/storage/storage';

// http://localhost:3000/payment/payment-return?vnp_Amount=385200000&vnp_BankCode=NCB&vnp_BankTranNo=VNP13889746&vnp_CardType=ATM&vnp_OrderInfo=MINHDRA1+THANH+TOAN+HOA+DON+20221129111813%2C+NGAY%3A+29-18-2022+11%3A11&vnp_PayDate=20221129111847&vnp_ResponseCode=00&vnp_TmnCode=HG2EMSPD&vnp_TransactionNo=13889746&vnp_TransactionStatus=00&vnp_TxnRef=20221129111813&vnp_SecureHash=8ec8c25bc60f5b33941b269d4790f243cd76c1ad2895d736861c2fc3f2f1c94d8c9d5518d93fca21a57eb81cadaf0bfd493826cbeed8341cfa5e927f892c2c27
export default function PaymentReturn({ setTitle }) {
  useEffect(() => {
    setTitle('Thông Tin Hóa Đơn | Artemis');
  }, [setTitle]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user, handleUpdateCustomerInfo } = useOutletContext();

  const [searchParams] = useSearchParams();
  const [params, setParams] = useState();
  const [order, setOrder] = useState();

  useEffect(() => {
    const arr = {};
    searchParams.forEach((value, key) => {
      arr[key] = value;
    });

    setParams(arr);
  }, [searchParams]);

  const navigate = useNavigate();
  useEffect(() => {
    if (params)
      getById(params.vnp_TxnRef).then((res) => {
        if (res) setOrder(res);
        else setOrder(JSON.parse(JSON.stringify(getSessionStorage('order'))));
      }).catch(err => navigate('/products'));
  }, [params, navigate]);

  useEffect(() => {
    if (order && params && order?.payment_type === 'vnpay') {
      let code = params.vnp_ResponseCode;
      if (order.paid && code === '00')
        toast.info('Đơn hàng đã được thanh toán rồi!');
      else if (!order.paid && code === '00')
      {
        order.paid = true;
        order.card_name = params.vnp_BankCode;
        order.card_type = params.vnp_CardType;
        order.card_info = params.vnp_OrderInfo;
        createOrder(order)
          .then(async (res) => {
            removeSessionStorage('order');
            user.carts = user.carts.filter((item) => !item.checked);
            await handleUpdateCustomerInfo(user);
            await sendOrder({email: user.user.email, orderId: order.id, orderLink: window.location.origin + '/account/orders/' + order.id})
          })
          .catch((err) => toast.error(err.response.data.message));
        // updateOrder(order)
        //   .then((res) => {
        //     toast.success('Cập nhật hóa đơn thành công!');
        //   })
        //   .catch((err) =>
        //     toast.error('Có lỗi xảy ra trong quá trình cập nhật hóa đơn!')
        //   );
      }
      else if (code !== '00') setOrder();
    }
  }, [order, params, user, handleUpdateCustomerInfo]);

  return (
    <>
      <div
        className='mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16 bg-gray-100 py-4'
        style={{
          backgroundColor: '#FF9A8B',
          backgroundImage:
            'linear-gradient(90deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)',
        }}
      >
        <div className='flex justify-center items-start min-h-[50vh]'>
          <div className='max-w-md bg-white border border-gray-200 rounded-lg shadow-md p-4 sm:p-8 min-w-[50vw]'>
            <h1 className='text-xl text-center font-bold'>
              {codeResponseVnPay[params?.vnp_ResponseCode] ||
                'Thông Tin Đơn Hàng'}
            </h1>
            {order && (
              <table>
                <thead></thead>
                <tbody>
                  {/* id */}
                  <tr className='font-semibold'>
                    <td className='p-4'>Mã đơn</td>
                    <td className='p-4'>
                      {order ? (
                        <span>{order.id}</span>
                      ) : (
                        <Skeleton containerClassName='w-full' />
                      )}
                    </td>
                  </tr>
                  {/* username */}
                  <tr>
                    <td className='p-4'>Khách hàng</td>
                    <td className='p-4'>
                      {order ? (
                        <span>{order.customer.path}</span>
                      ) : (
                        <Skeleton containerClassName='w-full' />
                      )}
                    </td>
                  </tr>
                  {/* delivery address */}
                  <tr>
                    <td className='p-4 min-w-[100px]'>Địa chỉ giao hàng</td>
                    <td className='p-4'>
                      {order ? (
                        <div className='flex flex-col gap-1'>
                          <div>
                            {order.delivery_address.full_name} -{' '}
                            {order.delivery_address.phone}
                          </div>
                          <div>
                            {order.delivery_address.address_detail},{' '}
                            {order.delivery_address.commune.name_with_type},{' '}
                            {order.delivery_address.district.name_with_type},{' '}
                            {order.delivery_address.province.name_with_type}
                          </div>
                        </div>
                      ) : (
                        <Skeleton containerClassName='w-full' />
                      )}
                    </td>
                  </tr>
                  {/* payment type */}
                  <tr>
                    <td className='p-4'>Phương thức thanh toán</td>
                    <td className='p-4'>
                      {order ? (
                        <span>{order.payment_type}</span>
                      ) : (
                        <Skeleton containerClassName='w-full' />
                      )}
                    </td>
                  </tr>
                  {/* note */}
                  <tr>
                    <td className='p-4'>Ghi chú</td>
                    <td className='p-4'>
                      {order ? (
                        <span className='w-full whitespace-nowrap text-ellipsis'>
                          {order.customer.note}
                        </span>
                      ) : (
                        <Skeleton containerClassName='w-full' />
                      )}
                    </td>
                  </tr>
                  {/* Total */}
                  <tr className='font-semibold'>
                    <td className='p-4'>Tổng</td>
                    <td className='p-4'>
                      {order ? (
                        <span>₫{Number(order.total).toLocaleString('en')}</span>
                      ) : (
                        <Skeleton containerClassName='w-full' />
                      )}
                    </td>
                  </tr>
                  {/* Date Created */}
                  <tr>
                    <td className='p-4'>Ngày Tạo</td>
                    <td className='p-4'>
                      {order ? (
                        <span>{formatDateTime(order.createdAt)}</span>
                      ) : (
                        <Skeleton containerClassName='w-full' />
                      )}
                    </td>
                  </tr>
                  {/* Info vnpay */}
                  {params && params?.vnp_BankCode && (
                    <>
                      <tr>
                        <td className='p-4'>Ngân Hàng</td>
                        <td className='p-4'>
                          {params ? (
                            <span>{params.vnp_BankCode}</span>
                          ) : (
                            <Skeleton containerClassName='w-full' />
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className='p-4'>Loại Thẻ</td>
                        <td className='p-4'>
                          {params ? (
                            <span>{params.vnp_CardType}</span>
                          ) : (
                            <Skeleton containerClassName='w-full' />
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className='p-4'>Mô Tả</td>
                        <td className='p-4'>
                          {params ? (
                            <span>{params.vnp_OrderInfo}</span>
                          ) : (
                            <Skeleton containerClassName='w-full' />
                          )}
                        </td>
                      </tr>
                    </>
                  )}
                  {/* Details */}
                  <tr>
                    <td className='p-4'>Chi tiết</td>
                    <td className='p-4 flex flex-col gap-2'>
                      {order &&
                        order.details.map((item, index) => (
                          <div key={index}>
                            {item.product_name}, màu {item.color}, {item.size} x{' '}
                            {item.quantity}
                          </div>
                        ))}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}

            <Link
              to='/products'
              className='mt-4 text-center block py-2 px-8 bg-black hover:bg-black/70 text-white rounded'
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
