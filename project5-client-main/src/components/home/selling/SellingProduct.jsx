import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { calculateDiscount } from '../../../utils/constrants/constrants';

export default function SellingProduct({ sellingProducts }) {
  return (
    <>
      <div className='mb-12 md:mb-14 xl:mb-16'>
        <div className='flex items-center justify-between -mt-2 pb-0.5 mb-4 md:mb-5 lg:mb-6 2xl:mb-7 3xl:mb-8'>
          <h3 className='text-lg md:text-xl lg:text-2xl 2xl:text-3xl xl:leading-10 font-bold text-heading'>
            {sellingProducts ? (
              'Sản Phẩm Đang Bán'
            ) : (
              <Skeleton width={400} height={30} />
            )}
          </h3>
          <Link
            className='text-xs lg:text-sm xl:text-base text-heading mt-0.5 lg:mt-1 hover:underline'
            to='/products'
          >
            {sellingProducts ? (
              'Xem Tất Cả'
            ) : (
              <Skeleton width={200} height={30} />
            )}
          </Link>
        </div>
        <div className='grid grid-cols-4 gap-3 lg:gap-5 xl:gap-7'>
          <div className='mx-auto hidden 3xl:block'>
            <Link
              className='h-full group flex justify-center relative overflow-hidden'
              to={'/collections/mua-dong'}
            >
              <span className='box-border inline-block overflow-hidden opacity-100 m-0 p-0 relative max-w-full'>
                <span className='box-border block opacity-100 m-0 p-0 max-w-full'>
                  <img
                    alt=''
                    aria-hidden='true'
                    src={require('../../../assets/images/banners/banner-sale-offer.jpg')}
                    className='block max-w-full opacity-100 m-0 p-0 bg-gray-300 object-cover rounded-s-md'
                  />
                </span>
              </span>
              <div className='absolute top-0 -start-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine'></div>
            </Link>
          </div>
          <div className='col-span-full 3xl:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5 xl:gap-7 '>
            {sellingProducts
              ? sellingProducts.map((item) => (
                  <Link
                    key={item._id}
                    className='group box-border overflow-hidden flex rounded-md cursor-pointer items-center border border-gray-100 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-listProduct'
                    role='button'
                    title={item.product_name}
                    to={'/products/' + item.path}
                  >
                    <div className='flex flex-shrink-0 w-32 sm:w-44 md:w-36 lg:w-44'>
                      <span className='box-border inline-block overflow-hidden opacity-100 m-0 p-0 relative max-w-full'>
                        <span className='box-border block opacity-100 m-0 p-0 max-w-full'>
                          <img
                            alt=''
                            aria-hidden='true'
                            src={item.thumbnail}
                            className='bg-gray-300 object-cover rounded-s-md block max-w-full opacity-100 m-0 p-0'
                          />
                        </span>
                      </span>
                      <div className='absolute top-3.5 md:top-5 3xl:top-7 start-3.5 md:start-5 3xl:start-7 flex flex-col gap-y-1 items-start'></div>
                    </div>
                    {item.discount && (
                      <span className='absolute top-3.5 md:top-5 3xl:top-7 end-3.5 md:end-5 3xl:end-7 bg-heading text-white text-10px md:text-sm leading-5 rounded-md inline-block px-2 xl:px-3 pt-1 pb-1'>
                        {item.discount.discount_percent}%{' '}
                      </span>
                    )}
                    <div className='w-full overflow-hidden p-2 px-4 lg:px-5 2xl:px-4'>
                      <h2 className='truncate mb-1 font-semibold text-sm sm:text-base md:mb-1.5 pb-0 text-heading'>
                        {item.product_name}
                      </h2>
                      <p className='text-body text-xs lg:text-sm leading-normal xl:leading-relaxed max-w-[250px] truncate'>
                        Thương Hiệu: {item.brand?.brand_name}
                      </p>
                      <div
                        className='font-semibold text-sm mt-1.5 sm:text-xl md:text-base lg:text-xl md:mt-2.5 2xl:mt-3
              text-heading'
                      >
                        {item?.discount ? (
                        <>
                          <del className='text-xs md:text-sm'>
                            {item?.min_price === item?.max_price
                              ? `₫${item?.min_price}`
                              : `₫${item?.min_price} - ₫${item?.max_price}`}
                          </del>
                          <div className='text-heading font-segoe font-semibold text-sm md:text-lg 3xl:mt-0.5 pe-2 md:pe-0 lg:pe-2 2xl:pe-0 text-red-600'>
                            {item?.min_price === item?.max_price
                              ? `₫${calculateDiscount(
                                  item?.min_price,
                                  item.discount.discount_percent
                                )}`
                              : `₫${calculateDiscount(
                                  item?.min_price,
                                  item.discount.discount_percent
                                )} - ₫${calculateDiscount(
                                  item?.max_price,
                                  item.discount.discount_percent
                                )}`}
                          </div>
                        </>
                      ) : (
                        <div className='text-heading font-segoe font-semibold text-sm md:text-lg 3xl:mt-0.5 pe-2 md:pe-0 lg:pe-2 2xl:pe-0 text-red-600'>
                          {item?.min_price === item?.max_price
                            ? `₫${item?.min_price}`
                            : `₫${item?.min_price} - ₫${item?.max_price}`}
                        </div>
                      )}
                      </div>
                    </div>
                  </Link>
                ))
              : [...Array(3)].map((_, index) => (
                  <div key={index} className=''>
                    <Skeleton className='w-32 sm:w-44 md:w-36 lg:w-44 h-full min-h-[150px]' />
                  </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}
