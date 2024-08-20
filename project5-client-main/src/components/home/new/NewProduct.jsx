import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { calculateDiscount } from '../../../utils/constrants/constrants';

export default function NewProduct({ newProducts }) {
  return (
    <>
      <div className='mb-9 md:mb-10 xl:mb-12'>
        <div className='flex items-center justify-between -mt-2 pb-0.5 mb-4 md:mb-5 lg:mb-6 2xl:mb-7 3xl:mb-8'>
          <h3 className='text-lg md:text-xl lg:text-2xl 2xl:text-3xl xl:leading-10 font-bold text-heading'>
            {newProducts ? 'Mới Cập Bến' : <Skeleton width={400} height={30} />}
          </h3>
        </div>
        <div className='grid gap-x-3 md:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 bg-white grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5'>
          {newProducts
            ? newProducts.map((item, index) => (
                <Link
                  key={item._id}
                  className='group box-border overflow-hidden flex rounded-md cursor-pointer pe-0 pb-2 lg:pb-3 flex-col items-start transition duration-200 ease-in-out transform hover:-translate-y-1 md:hover:-translate-y-1.5 hover:shadow-product  bg-white'
                  role='button'
                  title={item.product_name}
                  to={'/products/' + item.path}
                >
                  <div className='flex mb-3 md:mb-3.5'>
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
                    <div className='absolute top-3.5 md:top-5 3xl:top-7 start-3.5 md:start-5 3xl:start-7 flex flex-col gap-y-1 items-start'></div>
                  </div>
                  <span className='absolute top-3.5 md:top-5 3xl:top-7 start-3.5 md:start-5 3xl:start-7 bg-red-500 text-white text-10px md:text-sm leading-5 rounded-md inline-block px-2 xl:px-3 pt-1 pb-1'>
                    NEW
                  </span>
                  {item.discount && (
                    <span className='absolute top-3.5 md:top-5 3xl:top-7 end-3.5 md:end-5 3xl:end-7 bg-heading text-white text-10px md:text-sm leading-5 rounded-md inline-block px-2 xl:px-3 pt-1 pb-1'>
                      {item.discount.discount_percent}%{' '}
                    </span>
                  )}

                  <div className='w-full overflow-hidden p-2 md:px-2.5 xl:px-4'>
                    <h2 className='truncate mb-1 text-sm md:text-base font-bold text-heading'>
                      {item.product_name}
                    </h2>
                    <p className='text-body text-xs lg:text-sm leading-normal xl:leading-relaxed max-w-[250px] truncate'>
                      Thương Hiệu: {item.brand?.brand_name}
                    </p>
                    <div
                      className='font-semibold text-sm sm:text-base mt-1.5 lg:text-lg lg:mt-2.5
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
            : [...Array(5)].map((_, index) => (
                <div key={index} className=''>
                  <Skeleton className='min-h-[200px] md:min-h-[300px]' />
                </div>
              ))}
        </div>
      </div>
    </>
  );
}
