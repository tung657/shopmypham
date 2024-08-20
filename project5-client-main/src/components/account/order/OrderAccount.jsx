import { useEffect } from 'react';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { common } from '../../../common/common';
import { update as updateOrder } from '../../../services/order';
import { formatDate } from '../../../utils/format/formatDate';
import Pagination from '../../shared/Pagination/Pagination';

export default function OrderAccount({ user, setUser }) {
  const [isMobile, setIsMobile] = useState(false);
  const [currentItems, setCurrentItems] = useState();

  useEffect(() => {
    const width = window.innerWidth;
    if (width >= 1024) setIsMobile(false);
    else setIsMobile(true);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    function handleResize(e) {
      if (e.target.innerWidth >= 1024) setIsMobile(false);
      else setIsMobile(true);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getStatusOrder = (statusDelivery) => {
    return common.orderStatuses[statusDelivery];
  };

  const handleUpdateDeliveryStatus = (item, index) => {
    const ask = window.confirm('Bạn có chắc muốn hủy không?');
    if (ask) {
      item.delivery_status = 5;

      updateOrder(item)
        .then((res) => {
          toast.success('Cập nhật thành công');
          const userJ = JSON.parse(JSON.stringify(user));
          user.orders[index] = item;
          setUser();
          setUser(userJ);
        })
        .catch((err) => toast.error('Cập nhật thất bại'));
    }
  };

  return (
    <>
      <div className='md:w-4/6 2xl:w-8/12 mt-4 md:mt-0'>
        <h2 className='text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8 capitalize'>
          Đơn hàng của bạn
        </h2>
        <div
          className='w-full flex flex-col'
          data-projection-id='6'
          style={{ position: 'relative', top: '0px', opacity: 1 }}
        >
          {!isMobile ? (
            <table>
              <thead className='text-sm lg:text-base'>
                <tr>
                  <th className='bg-gray-100 p-4 text-heading font-semibold text-start first:rounded-ts-md'>
                    Order
                  </th>
                  <th className='bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center'>
                    Ngày Tạo
                  </th>
                  <th className='bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center'>
                    Trạng Thái
                  </th>
                  <th className='bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center'>
                    Tổng
                  </th>
                  <th className='bg-gray-100 p-4 text-heading font-semibold text-start lg:text-end last:rounded-te-md'>
                    Tác Vụ
                  </th>
                </tr>
              </thead>
              <tbody className='text-sm lg:text-base'>
                {currentItems ? (
                  currentItems.length > 0 ? (
                    currentItems.map((item) => (
                      <tr
                        key={item._id}
                        className='border-b border-gray-300 last:border-b-0'
                      >
                        <td className='px-4 py-5 text-start'>
                          <Link
                            className='underline hover:no-underline text-body'
                            to={'/account/orders/' + item.id}
                          >
                            #{item.id}
                          </Link>
                        </td>
                        <td className='text-start lg:text-center px-4 py-5 text-heading'>
                          {formatDate(item.createdAt)}
                        </td>
                        <td className='text-start lg:text-center px-4 py-5 text-heading'>
                          <span
                            className='font-semibold px-2 py-1 rounded-full whitespace-nowrap'
                            style={{
                              color: getStatusOrder(item.delivery_status)
                                ?.color,
                              backgroundColor: getStatusOrder(
                                item.delivery_status
                              )?.background,
                            }}
                          >
                            {getStatusOrder(item.delivery_status)?.message}
                          </span>
                        </td>
                        <td className='text-start lg:text-center px-4 py-5 text-heading'>
                          ₫{Number(item.total).toLocaleString('en')} cho{' '}
                          {item.details?.length} sp
                        </td>
                        <td className='text-end px-4 py-5 text-heading flex gap-2'>
                          <a
                            className='text-sm leading-4 bg-heading text-white px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600'
                            href={'/account/orders/' + item.id}
                            target='_blank'
                            rel='noreferrer'
                          >
                            Xem
                          </a>
                          {[1, 2, 3].find(
                            (i) => i === item.delivery_status
                          ) && (
                            <button
                              className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600'
                              onClick={() => handleUpdateDeliveryStatus(item)}
                            >
                              Hủy
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={100}
                        className='py-4 text-center font-semibold text-red-500'
                      >
                        Bạn chưa có đơn hàng nào{' '}
                        <Link
                          className='font-bold text-heading underline'
                          to={'/products'}
                        >
                          tiếp tục mua sắm
                        </Link>
                        .
                      </td>
                    </tr>
                  )
                ) : (
                  <tr className='border-b border-gray-300 last:border-b-0'>
                    <td className='px-4 py-5 text-start'>
                      <Skeleton height={30} />
                    </td>
                    <td className='text-start lg:text-center px-4 py-5 text-heading'>
                      <Skeleton height={30} />
                    </td>
                    <td className='text-start lg:text-center px-4 py-5 text-heading'>
                      <Skeleton height={30} />
                    </td>
                    <td className='text-start lg:text-center px-4 py-5 text-heading'>
                      <Skeleton height={30} />
                    </td>
                    <td className='text-end px-4 py-5 text-heading'>
                      <Skeleton height={30} />
                    </td>
                  </tr>
                )}

                <tr>
                  <td colSpan={1000} className='text-center p-2 font-medium'>
                    <Pagination
                      data={user?.orders}
                      setCurrentItems={setCurrentItems}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div className='w-full space-y-4'>
              {user && user?.orders?.length > 0 ? (
                user.orders.map((item) => (
                  <ul
                    key={item._id}
                    className='text-sm font-semibold text-heading border border-gray-300 rounded-md flex flex-col px-4 pt-5 pb-6 space-y-5'
                  >
                    <li className='flex items-center justify-between'>
                      Order
                      <span className='font-normal'>
                        <Link
                          className='underline hover:no-underline text-body'
                          to={'/account/orders/' + item.id}
                        >
                          #{item.id}
                        </Link>
                      </span>
                    </li>
                    <li className='flex items-center justify-between'>
                      Ngày tạo{' '}
                      <span className='font-normal'>
                        {formatDate(item.createdAt)}
                      </span>
                    </li>
                    <li className='flex items-center justify-between'>
                      Trạng thái
                      <span
                        className='font-normal px-2 py-1 rounded-full whitespace-nowrap'
                        style={{
                          color: getStatusOrder(item.delivery_status)?.color,
                          backgroundColor: getStatusOrder(item.delivery_status)
                            ?.background,
                        }}
                      >
                        {getStatusOrder(item.delivery_status)?.message}
                      </span>
                    </li>
                    <li className='flex items-center justify-between'>
                      Tổng
                      <span className='font-normal'>
                        ₫{Number(item.total).toLocaleString('en')} cho{' '}
                        {item.details?.length} sp
                      </span>
                    </li>
                    <li className='flex items-center justify-between'>
                      Tác vụ
                      <span className='font-normal'>
                        <a
                          className='text-sm leading-4 bg-heading text-white px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600'
                          href={'/account/orders/' + item.id}
                          target='_blank'
                          rel='noreferrer'
                        >
                          Xem
                        </a>
                      </span>
                    </li>
                  </ul>
                ))
              ) : (
                <></>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
