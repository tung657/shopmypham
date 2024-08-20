import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { calculateDiscount } from '../../../utils/constrants/constrants';

export default function FeaturedProduct({ featuredProducts }) {
  return (
    <>
      <div className='mb-12 md:mb-14 xl:mb-16'>
        <div className='flex items-center justify-between -mt-2 pb-0.5 mb-4 md:mb-5 lg:mb-6 2xl:mb-7 3xl:mb-8'>
          <h3 className='text-lg md:text-xl lg:text-2xl 2xl:text-3xl xl:leading-10 font-bold text-heading'>
            {featuredProducts ? (
              'Sản Phẩm Nổi Bật'
            ) : (
              <Skeleton width={400} height={30} />
            )}
          </h3>
        </div>
        <div className='grid grid-cols-4 grid-rows-2 gap-3 md:gap-5 xl:gap-7'>
          {featuredProducts
            ? featuredProducts.map((item, index) => (
                <Link
                  key={item._id}
                  className={
                    'cursor-pointer group flex flex-col bg-gray-200 rounded-md relative items-center justify-between overflow-hidden ' +
                    (index === 0
                      ? 'row-span-full lg:row-span-2 col-span-full lg:col-span-2'
                      : 'col-span-2 lg:col-span-1')
                  }
                  to={'/products/' + item.path}
                >
                  <div
                    className='flex justify-center items-center p-4 h-full 3xl:min-h-[330px]'
                    title={item.product_name}
                  >
                    <span className='box-border inline-block overflow-hidden opacity-100 m-0 p-0 relative max-w-full'>
                      <span className='box-border block opacity-100 m-0 p-0 max-w-full'>
                        <img
                          alt={item.product_name}
                          aria-hidden='true'
                          src={item.thumbnail}
                          className='block max-w-full opacity-100 m-0 p-0 transition duration-500 ease-in-out transform group-hover:scale-110'
                        />
                      </span>
                    </span>
                  </div>
                  {item.discount && (
                    <span className='absolute top-3.5 md:top-5 3xl:top-7 start-3.5 md:start-5 3xl:start-7 bg-heading text-white text-10px md:text-sm leading-5 rounded-md inline-block px-2 xl:px-3 pt-0.5 pb-1'>
                      {item?.discount?.discount_percent}%{' '}
                    </span>
                  )}
                  <div
                    className='flex flex-col md:flex-row lg:flex-col 2xl:flex-row md:justify-between md:items-center lg:items-start 2xl:items-center w-full px-4 md:px-5 3xl:px-7 pb-4 md:pb-5 3xl:pb-7'
                    title={item.product_name}
                  >
                    <div className='md:pe-2 lg:pe-0 2xl:pe-2 overflow-hidden'>
                      <h2 className='text-heading font-semibold text-sm md:text-base xl:text-lg mb-1 truncate'>
                        {item.product_name}
                      </h2>
                      <p className='text-body text-xs xl:text-sm leading-normal xl:leading-relaxed truncate max-w-[250px]'>
                        Thương Hiệu: {item.brand?.brand_name}
                      </p>
                    </div>
                    <div className='flex-shrink-0 flex flex-row-reverse md:flex-col lg:flex-row-reverse 2xl:flex-col items-center md:items-end lg:items-start 2xl:items-end justify-end md:text-end lg:text-start xl:text-end mt-2 md:-mt-0.5 lg:mt-2 2xl:-mt-0.5'>
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
            : [...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className={
                    'overflow-hidden ' +
                    (index === 0
                      ? 'row-span-full col-span-full lg:row-span-2 lg:col-span-2'
                      : 'col-span-2 lg:col-span-1')
                  }
                >
                  <Skeleton className='mx-auto h-full min-h-[200px] md:min-h-[330px] lg:min-h-[400px]' />
                </div>
              ))}
        </div>
      </div>
    </>
  );
}
