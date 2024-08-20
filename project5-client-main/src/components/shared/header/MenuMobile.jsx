import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useTransition, animated } from '@react-spring/web';
import Overlay from '../overlay/Overlay';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function MenuMobile({
  showMenuMobile,
  setShowMenuMobile,
  user,
  listUserOptions,
  setShowDialogLogin,
  categories,
}) {
  const location = useLocation();

  const [showCategories, setShowCategories] = useState(false);
  const [showOtherPages, setShowOtherPages] = useState(false);

  useEffect(() => {
    if (location.pathname.indexOf('/category') !== -1) setShowCategories(true);
  }, [location]);

  useEffect(() => {
    if (location.pathname.indexOf('/pages') !== -1) setShowOtherPages(true);
  }, [location]);

  const transitions = useTransition(showMenuMobile, {
    from: { opacity: 0, x: -400 },
    enter: { opacity: 1, x: 0 },
    leave: { opacity: 0, x: -400 },
    reverse: showMenuMobile,
    config: { duration: 300 },
  });

  return (
    <div>
      <Overlay
        showOverlay={showMenuMobile}
        setShowOverlay={setShowMenuMobile}
      />
      {transitions(
        (styles, item) =>
          item && (
            <>
              <animated.div
                style={styles}
                className='fixed top-0 left-0 bg-white z-50 flex flex-col w-full sm:w-[378px] h-full justify-between'
              >
                <div>
                  <div className='w-full flex justify-between items-center relative ps-5 md:ps-7 py-0.5 border-b border-gray-100'>
                    <div className='flex items-center gap-4'>
                      {user ? (
                        <>
                          <button className='w-[45px] h-[45px] bg-gray-100 cursor-pointer rounded-full overflow-hidden border shadow-md transition-all text-heading'>
                            <img alt='' src={user?.avatar} />
                          </button>
                          <h2 className='font-bold text-xl md:text-2xl m-0 text-heading'>
                            {user?.first_name
                              ? user?.first_name
                              : user?.user?.username}{' '}
                            💕
                          </h2>
                        </>
                      ) : (
                        <button
                          className='text-xl text-heading font-semibold'
                          onClick={() => setShowDialogLogin(true)}
                        >
                          Đăng Nhập
                        </button>
                      )}
                    </div>
                    <button
                      className='flex text-2xl items-center justify-center text-gray-500 px-4 md:px-6 py-6 lg:py-8 focus:outline-none transition-opacity hover:opacity-60'
                      aria-label='close'
                      onClick={() => setShowMenuMobile(false)}
                    >
                      <svg
                        stroke='currentColor'
                        fill='currentColor'
                        strokeWidth='0'
                        viewBox='0 0 512 512'
                        className='text-black mt-1 md:mt-0.5'
                        height='1em'
                        width='1em'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z'></path>
                      </svg>
                    </button>
                  </div>
                  <OverlayScrollbarsComponent className='max-h-[80vh]' defer>
                    <div className='p-4'>
                      <div>
                        <Link
                          className={
                            'relative inline-flex items-center px-3 py-2 text-base font-medium  xl:px-4 group-hover:text-black w-full rounded ' +
                            (location.pathname === '/'
                              ? 'bg-gray-100 text-red-600'
                              : 'text-heading')
                          }
                          to={'/'}
                          onClick={() => setShowMenuMobile(false)}
                        >
                          Trang Chủ
                        </Link>
                      </div>
                      <div className='group'>
                        <Link
                          className={
                            'relative inline-flex items-center px-3 py-2 text-base font-medium  xl:px-4 group-hover:text-black w-full rounded ' +
                            (location.pathname.indexOf('/category') >= 0
                              ? 'bg-gray-100 text-red-600'
                              : 'text-heading')
                          }
                          onClick={() => {
                            if (location.pathname.indexOf('/category') < 0)
                              setShowCategories(!showCategories);
                          }}
                        >
                          Danh Mục
                          <span className='opacity-30 text-xs mt-1 xl:mt-0.5 w-4 flex justify-end'>
                            <svg
                              stroke='currentColor'
                              fill='currentColor'
                              strokeWidth='0'
                              viewBox='0 0 448 512'
                              className={
                                'transition duration-300 ease-in-out transform ' +
                                (showCategories ? '-rotate-180' : '')
                              }
                              height='1em'
                              width='1em'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path d='M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z'></path>
                            </svg>
                          </span>
                        </Link>

                        <OverlayScrollbarsComponent
                          className='max-h-[200px]'
                          // options={{ scrollbars: { autoHide: true } }}
                          defer
                        >
                          <div
                            className={
                              'bg-gray-100 rounded ' +
                              (showCategories ? 'block' : 'hidden')
                            }
                          >
                            {categories &&
                              categories.map((item, index) => (
                                <Link
                                  key={index}
                                  className={
                                    'block text-sm py-1.5 font-semibold px-5 xl:px-8 2xl:px-10 hover:text-red-600 hover:bg-gray-300 rounded ' +
                                    (location.pathname.indexOf(
                                      '/category/' + item.path
                                    ) >= 0
                                      ? 'bg-gray-100 text-red-600'
                                      : 'text-heading')
                                  }
                                  to={'/category/' + item.path}
                                  onClick={() => setShowMenuMobile(false)}
                                >
                                  {item.category_name}
                                </Link>
                              ))}
                          </div>
                        </OverlayScrollbarsComponent>
                      </div>
                      <div>
                        <Link
                          className={
                            'relative inline-flex items-center px-3 py-2 text-base font-medium  xl:px-4 group-hover:text-black w-full rounded ' +
                            (location.pathname.indexOf('/products') >= 0
                              ? 'bg-gray-100 text-red-600'
                              : 'text-heading')
                          }
                          to={'/products'}
                          onClick={() => setShowMenuMobile(false)}
                        >
                          Tìm Kiếm
                        </Link>
                      </div>
                      <div>
                        <Link
                          className={
                            'relative inline-flex items-center px-3 py-2 text-base font-medium  xl:px-4 group-hover:text-black w-full rounded ' +
                            (location.pathname === '/pages/stores'
                              ? 'bg-gray-100 text-red-600'
                              : 'text-heading')
                          }
                          to={'/pages/stores'}
                          onClick={() => setShowMenuMobile(false)}
                        >
                          Store
                        </Link>
                      </div>
                      <div className='group'>
                        <Link
                          className={
                            'relative inline-flex items-center px-3 py-2 text-base font-medium  xl:px-4 group-hover:text-black w-full rounded ' +
                            (location.pathname.indexOf('/pages') >= 0
                              ? 'bg-gray-100 text-red-600'
                              : 'text-heading')
                          }
                          onClick={() => setShowOtherPages(!showOtherPages)}
                        >
                          Khác
                          <span className='opacity-30 text-xs mt-1 xl:mt-0.5 w-4 flex justify-end'>
                            <svg
                              stroke='currentColor'
                              fill='currentColor'
                              strokeWidth='0'
                              viewBox='0 0 448 512'
                              className={
                                'transition duration-300 ease-in-out transform ' +
                                (showCategories ? '-rotate-180' : '')
                              }
                              height='1em'
                              width='1em'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path d='M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z'></path>
                            </svg>
                          </span>
                        </Link>

                        <OverlayScrollbarsComponent
                          className='max-h-[200px]'
                          // options={{ scrollbars: { autoHide: true } }}
                          defer
                        >
                          <div
                            className={
                              'bg-gray-100 rounded ' +
                              (showOtherPages ? 'block' : 'hidden')
                            }
                          >
                            <Link
                              className={
                                'block text-sm py-1.5 font-semibold px-5 xl:px-8 2xl:px-10 hover:text-red-600 hover:bg-gray-300 rounded ' +
                                (location.pathname.indexOf(
                                  '/pages/contact-us'
                                ) >= 0
                                  ? 'bg-gray-100 text-red-600'
                                  : 'text-heading')
                              }
                              to={'/pages/contact-us'}
                              onClick={() => setShowMenuMobile(false)}
                            >
                              Liên Hệ
                            </Link>
                            <Link
                              className={
                                'block text-sm py-1.5 font-semibold px-5 xl:px-8 2xl:px-10 hover:text-red-600 hover:bg-gray-300 rounded ' +
                                (location.pathname.indexOf('/pages/faq') >= 0
                                  ? 'bg-gray-100 text-red-600'
                                  : 'text-heading')
                              }
                              to={'/pages/faq'}
                              onClick={() => setShowMenuMobile(false)}
                            >
                              FAQ
                            </Link>
                            <Link
                              className={
                                'block text-sm py-1.5 font-semibold px-5 xl:px-8 2xl:px-10 hover:text-red-600 hover:bg-gray-300 rounded ' +
                                (location.pathname.indexOf('/pages/privacy') >=
                                0
                                  ? 'bg-gray-100 text-red-600'
                                  : 'text-heading')
                              }
                              to={'/pages/privacy'}
                              onClick={() => setShowMenuMobile(false)}
                            >
                              Chính Sách Bảo Mật
                            </Link>
                            <Link
                              className={
                                'block text-sm py-1.5 font-semibold px-5 xl:px-8 2xl:px-10 hover:text-red-600 hover:bg-gray-300 rounded ' +
                                (location.pathname.indexOf('/pages/terms') >= 0
                                  ? 'bg-gray-100 text-red-600'
                                  : 'text-heading')
                              }
                              to={'/pages/terms'}
                              onClick={() => setShowMenuMobile(false)}
                            >
                              Điều Khoản và Điều Kiện
                            </Link>
                          </div>
                        </OverlayScrollbarsComponent>
                      </div>

                      <hr className='my-4 mx-4 bg-gray-500' />

                      <h3 className='py-2 px-4 text-lg font-semibold'>
                        Nguời Dùng
                      </h3>
                      {listUserOptions &&
                        listUserOptions.map((item, index) => (
                          <div key={index}>
                            {item.key === 'logout' ? (
                              <div
                                className={`text-gray-900 group flex w-full items-center rounded-md px-4 py-2 cursor-default ${
                                  index === listUserOptions.length - 1
                                    ? 'border-t border-gray-100 text-red-600'
                                    : ''
                                }`}
                                onClick={item.func ? item.func : () => true}
                              >
                                {item.name}
                              </div>
                            ) : (
                              <Link
                                to={item.link}
                                className={`text-gray-900 group flex w-full items-center rounded-md px-4 py-2 ${
                                  index === listUserOptions.length - 1
                                    ? 'border-t border-gray-100 text-red-600 font-semibold'
                                    : ''
                                }`}
                                onClick={() => setShowMenuMobile(false)}
                              >
                                {item.name}
                              </Link>
                            )}
                          </div>
                        ))}
                    </div>
                  </OverlayScrollbarsComponent>
                </div>
              </animated.div>
            </>
          )
      )}
    </div>
  );
}
