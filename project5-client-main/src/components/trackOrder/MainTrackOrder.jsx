import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import Subscribe from '../home/subscribe/Subscribe';

export default function MainTrackOrder({ order }) {
  const [orderId, setOrderId] = useState();

  return (
    <>
      <div className='mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16'>
        <div
          style={{
            backgroundColor: '#FF9A8B',
            backgroundImage:
              'linear-gradient(90deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)',
          }}
        >
          <div className='pb-14 pt-6 w-full md:w-[700px] mx-auto px-4 bg-white'>
            <form
              className='flex-shrink-0 w-full sm:w-96 md:w-[545px] mx-auto py-6'
              noValidate=''
            >
              <h1 className='uppercase text-2xl text-center font-bold pb-6 text-heading'>
                Tìm Kiếm đơn hàng
              </h1>
              <div className='flex flex-col sm:flex-row items-center justify-end'>
                <div className='w-full'>
                  <input
                    id='track-order'
                    name='track-order'
                    type='text'
                    placeholder='Ví dụ: 20221129111813'
                    className='py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12 lg:px-7 lg:h-14 text-center sm:text-start bg-white rounded-md'
                    autoComplete='off'
                    spellCheck='false'
                    aria-invalid='false'
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                  />
                </div>
                <Link
                  data-variant='flat'
                  className='text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none rounded-md  bg-heading text-white px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-gray-600 hover:shadow-cart mt-3 sm:mt-0 w-full sm:w-auto sm:ms-2 md:h-full flex-shrink-0'
                  to={orderId ? '/account/orders/' + orderId : null}
                >
                  <span className='lg:py-0.5'>Tìm Ngay</span>
                </Link>
              </div>
            </form>

            {order ? (
              <>
                <h2 className='lg:text-xl text-lg font-semibold text-center py-8 bg-gray-100 rounded border-b border-slate-300'>
                  <span className='uppercase'>Thông tin đơn hàng</span>{' '}
                  {'#' + order?.id}
                </h2>
                <table className='w-full text-heading font-semibold text-sm lg:text-base'>
                  <thead>
                    <tr>
                      <th className='bg-gray-150 p-4 text-start first:rounded-ts-md w-1/2'>
                        Sản phẩm
                      </th>
                      <th className='bg-gray-150 p-4 text-start last:rounded-te-md w-1/2'>
                        Tổng
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order ? (
                      order.details.map((item) => (
                        <tr className='border-b font-normal border-gray-300 last:border-b-0'>
                          <td className='p-4'>
                            {item.product_name} - {item.color}, {item.size} *{' '}
                            {item.quantity}
                          </td>
                          <td className='p-4'>
                            ₫
                            {(
                              Number(item.product_price) * item.quantity
                            ).toLocaleString('en')}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className='border-b font-normal border-gray-300 last:border-b-0'>
                        <td className='p-4'>
                          <Skeleton height={30} />
                        </td>
                        <td className='p-4'>
                          <Skeleton height={30} />
                        </td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr className='odd:bg-gray-150'>
                      <td className='p-4 italic'>Tổng phụ:</td>
                      <td className='p-4'>
                        ₫
                        {(
                          Number(order?.total) + Number(order?.shipping || 0)
                        ).toLocaleString('en')}
                      </td>
                    </tr>
                    <tr className='odd:bg-gray-150'>
                      <td className='p-4 italic'>Phí giao hàng:</td>
                      <td className='p-4'>
                        {order?.shipping
                          ? '₫' + Number(order?.shipping).toLocaleString('en')
                          : ''}
                      </td>
                    </tr>
                    <tr className='odd:bg-gray-150'>
                      <td className='p-4 italic'>Phương thức thanh toán:</td>
                      <td className='p-4'>{order?.payment_type}</td>
                    </tr>
                    <tr className='odd:bg-gray-150'>
                      <td className='p-4 italic'>Tổng:</td>
                      <td className='p-4'>
                        {'₫' + Number(order?.total).toLocaleString('en')}
                      </td>
                    </tr>
                    <tr className='odd:bg-gray-150'>
                      <td className='p-4 italic'>Ghi chú:</td>
                      <td className='p-4'>{order?.note}</td>
                    </tr>
                  </tfoot>
                </table>
              </>
            ) : (
                <>
                  <div className='min-h-[50vh]'>

                  </div>
                </>
            )}
          </div>
        </div>
        <Subscribe
          classes={
            '!bg-opacity-100 !sm:px-8 !md:px-16 !2xl:px-24 items-center !md:py-14 !xl:px-[4rem] !lg:py-16'
          }
        />
      </div>
    </>
  );
}
