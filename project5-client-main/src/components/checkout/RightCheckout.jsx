import { Fragment } from 'react';
import Skeleton from 'react-loading-skeleton';

export default function RightCheckout({ user, total }) {


  return (
    <>
      <div className='md:w-full lg:w-2/5 md:ms-7 lg:ms-10 xl:ms-14 flex flex-col h-full -mt-1.5'>
        <div className='pt-12 md:pt-0 2xl:ps-4'>
          <h2 className='text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8'>
            Đơn Của Bạn
          </h2>
          <div className='flex p-4 rounded-md mt-6 md:mt-7 xl:mt-9 bg-gray-150 text-sm font-semibold text-heading'>
            <span>Sản Phẩm</span>
            <span className='ms-auto flex-shrink-0'>Tổng Phụ</span>
          </div>
          <div>
            {user ? (
              user.carts.map((item, index) => (
                item.checked ? (
                  <div key={index} className='flex py-4 items-center lg:px-3 border-b border-gray-300'>
                    <div className='flex border rounded-md border-gray-300 w-16 h-16 flex-shrink-0'>
                      <img
                        alt=''
                        src={item.thumbnail}
                        width='64'
                        height='64'
                        className='object-cover'
                      />
                    </div>
                    <h6 className='flex flex-col ps-3 text-heading'>
                      <span className='font-semibold mr-2'>{item.product_name}</span>
                      <span className='text-sm'>Phân loại: {item.color}, {item.size}</span>
                      <span className='text-sm'>Số lượng: {item.quantity}</span>
                    </h6>
                    <div className='flex ms-auto text-heading text-sm ps-2 flex-shrink-0'>
                      ₫{(Number(item.product_price) * item.quantity).toLocaleString('en')}
                    </div>
                  </div>
                ) : (<Fragment key={index}></Fragment>)
              ))
            ) : (
              <div className='flex py-4 items-start lg:px-3 gap-2'>
                <Skeleton
                  containerClassName='block flex-shrink-0 w-16 h-16'
                  className='h-16'
                />
                <Skeleton height={25} containerClassName='w-full' />
              </div>
            )}
          </div>
          <div className='flex items-center py-4 lg:py-5 border-b border-gray-300 text-sm lg:px-3 w-full font-semibold text-heading last:border-b-0 last:text-base last:pb-0'>
            Tổng Phụ<span className='ms-auto flex-shrink-0'>₫{total?.toLocaleString('en') || 0}</span>
          </div>
          <div className='flex items-center py-4 lg:py-5 border-b border-gray-300 text-sm lg:px-3 w-full font-semibold text-heading last:border-b-0 last:text-base last:pb-0'>
            Phí Giao Hàng<span className='ms-auto flex-shrink-0'>Miễn Phí</span>
          </div>
          <div className='flex items-center py-4 lg:py-5 border-b border-gray-300 text-sm lg:px-3 w-full font-semibold text-heading last:border-b-0 last:text-base last:pb-0'>
            Tổng<span className='ms-auto flex-shrink-0'>₫{total?.toLocaleString('en') || 0}</span>
          </div>
        </div>
      </div>
    </>
  );
}
