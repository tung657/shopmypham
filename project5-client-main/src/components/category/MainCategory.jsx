import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { calculateDiscount } from '../../utils/constrants/constrants';
import Empty from '../shared/empty/Empty';

export default function Main({ products, optionSearch, setOptionSearch }) {

  const handleLoadMore = () => {
    setOptionSearch({
      ...optionSearch,
      pageSize: optionSearch.pageSize + 5,
    }) 
  }

  return (
    <>
      <div className='pb-16 lg:pb-20'>
        <div
          className={
            'gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 ' +
            (products ? (products.length > 0 ? 'grid' : 'block') : 'grid')
          }
        >
          {products ? (
            products.length > 0 ? (
              products.map((item) => (
                <Link
                  key={item._id}
                  className='group box-border overflow-hidden flex rounded-md cursor-pointer pe-0 pb-2 lg:pb-3 flex-col items-start transition duration-200 ease-in-out transform hover:-translate-y-1 md:hover:-translate-y-1.5 hover:shadow-product  bg-white'
                  role='button'
                  to={'/products/' + item.path}
                  title={item.product_name}
                >
                  <div className='flex mb-3 md:mb-3.5 w-full'>
                    <span className='box-border inline-block overflow-hidden opacity-100 m-0 p-0 relative max-w-full w-full'>
                      <span className='box-border block opacity-100 m-0 p-0 max-w-full'>
                        <img
                          alt=''
                          aria-hidden='true'
                          src={item.thumbnail}
                          className='block max-w-full opacity-100 m-0 p-0 bg-gray-300 object-cover rounded-s-md w-full transition duration-200 ease-in rounded-md group-hover:rounded-b-none'
                        />
                      </span>
                    </span>
                    <div className='absolute top-3.5 md:top-5 3xl:top-7 start-3.5 md:start-5 3xl:start-7 flex flex-col gap-y-1 items-start'></div>
                  </div>
                  {item.discount && (
                    <span className='absolute top-3.5 md:top-5 3xl:top-7 start-3.5 md:start-5 3xl:start-7 bg-heading text-white text-10px md:text-sm leading-5 rounded-md inline-block px-2 xl:px-3 pt-0.5 pb-1'>
                      {item.discount.discount_percent}%{' '}
                    </span>
                  )}
                  <div className='w-full overflow-hidden p-2 md:px-2.5 xl:px-4'>
                    <h2 className='truncate mb-1 text-sm md:text-base font-semibold text-heading'>
                      {item.product_name}
                    </h2>
                    <p className='text-body text-xs lg:text-sm leading-normal xl:leading-relaxed max-w-[250px] truncate'>
                      Thương Hiệu: {item.brand?.brand_name}
                    </p>
                    <div className='font-semibold text-sm mt-1.5 lg:text-lg lg:mt-2.5 first-letter:text-heading'>
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
            ) : (
              <Empty />
            )
          ) : (
            [...Array(5)].map((_, index) => (
              <div key={index} className=''>
                <Skeleton className='min-h-[200px] md:min-h-[400px]' />
              </div>
            ))
          )}
        </div>
        <div className='text-center pt-8 xl:pt-14'>
          {products && products.length > 0 ? (
            <button
              data-variant='slim'
              className='text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none rounded-md  h-11 md:h-12 px-5 bg-heading text-white py-2 transform-none normal-case hover:text-white hover:bg-gray-600 hover:shadow-cart'
              onClick={handleLoadMore}
            >
              Xem Thêm
            </button>
          ) : (
            <Link
              data-variant='slim'
              to={'/'}
              className='text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none rounded-md  h-11 md:h-12 px-5 bg-heading text-white py-2 transform-none normal-case hover:text-white hover:bg-gray-600 hover:shadow-cart'
            >
              Quay Trở Lại
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
