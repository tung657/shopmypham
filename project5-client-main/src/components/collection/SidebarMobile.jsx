import { useTransition, animated } from '@react-spring/web';
import Overlay from '../shared/overlay/Overlay';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import Skeleton from 'react-loading-skeleton';
import { Link, useLocation } from 'react-router-dom';

export default function FilterMobile({
  breadcrumbs,
  showFilterMobile,
  setShowFilterMobile,
  products,
  collections,
  setSelectedCollection,
}) {
  const location = useLocation();

  const transitions = useTransition(showFilterMobile, {
    from: { opacity: 0, x: -400 },
    enter: { opacity: 1, x: 0 },
    leave: { opacity: 0, x: -400 },
    reverse: showFilterMobile,
    config: { duration: 300 },
  });

  return (
    <>
      <Overlay
        showOverlay={showFilterMobile}
        setShowOverlay={setShowFilterMobile}
      />
      {transitions(
        (styles, item) =>
          item && (
            <animated.div
              style={styles}
              className='fixed top-0 left-0 bg-white z-50 flex flex-col w-full sm:w-[378px] h-full justify-between'
            >
              <div className='flex flex-col justify-between w-full h-full'>
                <div className='w-full border-b border-gray-100 flex justify-between items-center relative pe-5 md:pe-7 flex-shrink-0 py-0.5'>
                  <button
                    className='flex text-2xl items-center justify-center text-gray-500 px-4 md:px-5 py-6 lg:py-8 focus:outline-none transition-opacity hover:opacity-60'
                    aria-label='close'
                    onClick={() => setShowFilterMobile(false)}
                  >
                    <svg
                      stroke='currentColor'
                      fill='currentColor'
                      strokeWidth='0'
                      viewBox='0 0 512 512'
                      className='text-black'
                      height='1em'
                      width='1em'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='48'
                        d='M244 400L100 256l144-144M120 256h292'
                      ></path>
                    </svg>
                  </button>
                  <h2 className='font-bold text-xl md:text-2xl m-0 text-heading w-full text-center pe-6'>
                    Bộ Sưu Tập
                  </h2>
                </div>
                <OverlayScrollbarsComponent className='flex-1'>
                  <div className='flex flex-col py-7 px-5 md:px-7 text-heading'>
                    <div className='pt-1'>
                      <div className='block border-b border-gray-300 pb-5 mb-7'>
                        <div className='flex items-center justify-between mb-2.5'>
                          <h2 className='font-semibold text-heading text-xl md:text-2xl'>
                            Danh Sách Bộ Sưu Tập
                          </h2>
                        </div>
                      </div>
                      <div className='block pb-7'>
                        <ul className='mt-2 flex flex-col space-y-5'>
                          {collections
                            ? collections.map((item, index) => (
                                <li
                                  key={item._id}
                                  className='text-sm lg:text-[15px] cursor-pointer'
                                >
                                  <Link
                                    className={
                                      'block transition duration-300 ease-in-out text-heading py-0.5 ' +
                                      (location.pathname.indexOf(item.path) >= 0
                                        ? 'font-semibold text-red-500'
                                        : 'hover:font-semibold ')
                                    }
                                    to={'/collections/' + item.path}
                                    onClick={() => {
                                      setSelectedCollection(item);
                                      setShowFilterMobile(false);
                                    }}
                                  >
                                    Bộ Sưu Tập {item.collect_name}
                                  </Link>
                                </li>
                              ))
                            : [...Array(5)].map((_, index) => (
                                <Skeleton height={25} key={index} />
                              ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </OverlayScrollbarsComponent>
                <div className='text-sm md:text-base leading-4 flex items-center justify-center px-7 flex-shrink-0 h-14 bg-heading text-white'>
                  {products ? (
                    <>{products?.length || 0} sản phẩm</>
                  ) : (
                    <Skeleton height={30} width={100} />
                  )}
                </div>
              </div>
            </animated.div>
          )
      )}
    </>
  );
}
