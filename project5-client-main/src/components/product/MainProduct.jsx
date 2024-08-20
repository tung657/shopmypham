import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import Empty from '../shared/empty/Empty';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useEffect } from 'react';
import { calculateDiscount } from '../../utils/constrants/constrants';

const listSort = [
  {
    name: 'Tùy Chọn Sắp Xếp',
    value: 'all',
  },
  {
    name: 'Mới Nhất',
    value: 'newest',
  },
  {
    name: 'Tên: A - Z',
    value: 'az',
  },
  {
    name: 'Tên: Z - A',
    value: 'za',
  },
  {
    name: 'Giá: thấp đến cao',
    value: 'priceLowToHigh',
  },
  {
    name: 'Giá: cao đến thấp',
    value: 'priceHighToLow',
  },
];

export default function Main({
  products,
  optionSearch,
  setOptionSearch,
  sortSelected,
  setSortSelected,
  setShowFilterMobile,
}) {
  useEffect(() => {
    setSortSelected(listSort[0]);
  }, [setSortSelected]);

  const handleLoadMore = () => {
    setOptionSearch({
      ...optionSearch,
      pageSize: optionSearch.pageSize + 5,
    }) 
  }

  return (
    <>
      <div className='w-full lg:-ms-9'>
        <div className='flex justify-between items-center mb-7'>
          <h1 className='text-heading text-2xl font-bold hidden lg:inline-flex pb-1'>
            {products ? 'Artemis' : <Skeleton height={30} width={150} />}
          </h1>
          <button
            className='lg:hidden text-heading text-sm px-4 py-2 font-semibold border border-gray-300 rounded-md flex items-center transition duration-200 ease-in-out focus:outline-none hover:bg-gray-200'
            onClick={() => setShowFilterMobile(true)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='18px'
              height='14px'
              viewBox='0 0 18 14'
            >
              <g
                id='Group_36196'
                data-name='Group 36196'
                transform='translate(-925 -1122.489)'
              >
                <path
                  id='Path_22590'
                  data-name='Path 22590'
                  d='M942.581,1295.564H925.419c-.231,0-.419-.336-.419-.75s.187-.75.419-.75h17.163c.231,0,.419.336.419.75S942.813,1295.564,942.581,1295.564Z'
                  transform='translate(0 -169.575)'
                  fill='currentColor'
                ></path>
                <path
                  id='Path_22591'
                  data-name='Path 22591'
                  d='M942.581,1951.5H925.419c-.231,0-.419-.336-.419-.75s.187-.75.419-.75h17.163c.231,0,.419.336.419.75S942.813,1951.5,942.581,1951.5Z'
                  transform='translate(0 -816.512)'
                  fill='currentColor'
                ></path>
                <path
                  id='Path_22593'
                  data-name='Path 22593'
                  d='M1163.713,1122.489a2.5,2.5,0,1,0,1.768.732A2.483,2.483,0,0,0,1163.713,1122.489Z'
                  transform='translate(-233.213)'
                  fill='currentColor'
                ></path>
                <path
                  id='Path_22594'
                  data-name='Path 22594'
                  d='M2344.886,1779.157a2.5,2.5,0,1,0,.731,1.768A2.488,2.488,0,0,0,2344.886,1779.157Z'
                  transform='translate(-1405.617 -646.936)'
                  fill='currentColor'
                ></path>
              </g>
            </svg>
            <span className='ps-2.5'>Bộ Lọc</span>
          </button>
          <div className='flex items-center justify-end'>
            <div className='flex-shrink-0 text-body text-xs md:text-sm leading-4 pe-4 md:me-6 ps-2 hidden lg:block'>
              {products ? (
                <>{products?.length || 0} sản phẩm</>
              ) : (
                <Skeleton height={30} width={100} />
              )}
            </div>
            {sortSelected ? (
              <Listbox value={sortSelected} onChange={setSortSelected}>
                <div className='relative ms-2 lg:ms-0 z-10 min-w-[180px]'>
                  <Listbox.Button className='border border-gray-300 text-heading text-[13px] md:text-sm font-semibold relative w-full py-2 ps-3 pe-10 text-start bg-white rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm cursor-pointer'>
                    <span className='block truncate'>{sortSelected.name}</span>
                    <span className='absolute inset-y-0 end-0 flex items-center pe-2 pointer-events-none'>
                      <svg
                        stroke='currentColor'
                        fill='none'
                        strokeWidth='0'
                        viewBox='0 0 24 24'
                        className='w-5 h-5 text-gray-400'
                        aria-hidden='true'
                        height='1em'
                        width='1em'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M8 9l4-4 4 4m0 6l-4 4-4-4'
                        ></path>
                      </svg>
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave='transition ease-in duration-100'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <Listbox.Options className='absolute w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none text-sm'>
                      {listSort &&
                        listSort.map((item, index) => (
                          <Listbox.Option
                            key={index}
                            className='text-gray-900 cursor-default select-none relative py-2 ps-10 pe-4 group'
                            value={item}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate group-hover:font-semibold ${
                                    selected ? 'font-semibold' : 'font-normal'
                                  }`}
                                >
                                  {item.name}
                                </span>
                                {selected ? (
                                  <span className='absolute inset-y-0 left-0 flex items-center pl-3 '>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      viewBox='0 0 20 20'
                                      fill='currentColor'
                                      aria-hidden='true'
                                      className='h-5 w-5'
                                    >
                                      <path
                                        fillRule='evenodd'
                                        d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
                                        clipRule='evenodd'
                                      ></path>
                                    </svg>
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            ) : (
              <Skeleton height={30} width={150} />
            )}
          </div>
        </div>
        <div
          className={
            'grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ' +
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
                <Skeleton className='min-h-[300px]' />
              </div>
            ))
          )}
        </div>
        <div className='text-center pt-8 xl:pt-14'>
          <button
            data-variant='slim'
            className='text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none rounded-md  h-11 md:h-12 px-5 bg-heading text-white py-2 transform-none normal-case hover:text-white hover:bg-gray-600 hover:shadow-cart'
            onClick={handleLoadMore}
          >
            Xem Thêm
          </button>
        </div>
      </div>
    </>
  );
}
