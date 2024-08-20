import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Components
import UserHeader from './UserHeader';
import CartHeader from '../../user/CartHeader';
import MenuMobile from './MenuMobile';
import { logo } from '../../../common/other';

export default function Header({
  setShowDialog,
  setShowSearchForm,
  categories,
  user,
  handleUpdateCustomerInfo,
  storage,
  handleLogout,
}) {
  const location = useLocation();

  const [showCart, setShowCart] = useState(false);
  const [showMenuMobile, setShowMenuMobile] = useState(false);
  const [listUserOptions, setListUserOptions] = useState();

  useEffect(() => {
    if (user) {
      const options = [
        {
          name: 'Thông tin của bạn',
          link: '/account/' + storage.path,
        },
        {
          key: 'logout',
          name: 'Đăng xuất',
          link: '/',
          func: handleLogout,
        },
      ];

      setListUserOptions(options);
    }
  }, [user, storage, handleLogout]);

  return (
    <>
      <header
        id='siteHeader'
        className='w-full h-16 sm:h-20 lg:h-24 relative z-20'
      >
        <div className='innerSticky text-gray-700 body-font fixed bg-white w-full h-16 sm:h-20 lg:h-24 z-20 px-4 md:px-8 lg:px-6 transition duration-200 ease-in-out shadow'>
          <div className='flex items-center justify-center mx-auto max-w-[1920px] h-full w-full relative'>
            <Link className='inline-flex focus:outline-none' to={'/'}>
              <span
                style={{
                  boxSizing: 'borderBox',
                  display: 'inlineBlock',
                  overflow: 'hidden',
                  width: '95px',
                  height: '30px',
                  background: 'none',
                  opacity: '1',
                  border: '0px',
                  margin: '0px',
                  padding: '0px',
                  position: 'relative',
                }}
              >
                <img
                  alt={logo.title}
                  src={require('../../../assets/images/logos/' + logo.nameFile)}
                  style={{
                    position: 'absolute',
                    inset: '0px',
                    boxSizing: 'borderBox',
                    padding: '0px',
                    border: 'none',
                    margin: 'auto',
                    display: 'block',
                    width: '0px',
                    height: '0px',
                    minWidth: '100%',
                    maxWidth: '100%',
                    minHeight: '100%',
                    maxHeight: '100%',
                  }}
                />
              </span>
            </Link>
            <nav className='headerMenu lg:flex w-full relative md:ms-6 xl:ms-10 hidden'>
              <div className='menuItem group cursor-pointer py-7 relative'>
                <Link
                  className={
                    'relative inline-flex items-center px-3 py-2 text-sm font-medium xl:text-base text-heading xl:px-4 group-hover:text-black ' +
                    (location.pathname === '/' ? 'active' : '')
                  }
                  to={'/'}
                >
                  Trang Chủ
                </Link>
              </div>
              <div className='menuItem group cursor-pointer py-7 '>
                <Link
                  className={
                    'relative inline-flex items-center px-3 py-2 text-sm font-medium xl:text-base text-heading xl:px-4 group-hover:text-black ' +
                    (location.pathname.indexOf('/category') >= 0
                      ? 'active'
                      : '')
                  }
                >
                  Danh Mục
                  <span className='opacity-30 text-xs mt-1 xl:mt-0.5 w-4 flex justify-end'>
                    <svg
                      stroke='currentColor'
                      fill='currentColor'
                      strokeWidth='0'
                      viewBox='0 0 448 512'
                      className='transition duration-300 ease-in-out transform group-hover:-rotate-180'
                      height='1em'
                      width='1em'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z'></path>
                    </svg>
                  </span>
                </Link>
                <div className='absolute bg-gray-200 megaMenu shadow-header -start-28 xl:start-0 rounded-md'>
                  <div className='grid grid-cols-5'>
                    {categories ? (
                      categories.map((item) => (
                        <ul
                          key={item._id}
                          className='pt-6 even:bg-gray-150 pb-7 2xl:pb-8 2xl:pt-7'
                        >
                          <li className='mb-1.5'>
                            <Link
                              className='block text-sm py-1.5 text-heading font-semibold px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300'
                              to={'/category/' + item.path}
                            >
                              {item.category_name}
                            </Link>
                          </li>
                          {item.subs ? (
                            item.subs.map((sub) => (
                              <li key={sub._id} className=''>
                                <Link
                                  className='text-body text-sm block py-1.5 px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300'
                                  to={
                                    '/category/' +
                                    item.path +
                                    '?sub=' +
                                    sub.path
                                  }
                                >
                                  {sub.sub_category_name}
                                </Link>
                              </li>
                            ))
                          ) : (
                            <></>
                          )}
                        </ul>
                      ))
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
              <div className='menuItem group cursor-pointer py-7 '>
                <Link
                  className={
                    'relative inline-flex items-center px-3 py-2 text-sm font-medium xl:text-base text-heading xl:px-4 group-hover:text-black ' +
                    (location.pathname === '/products' ? 'active' : '')
                  }
                  to='/products'
                >
                  Tìm Kiếm
                </Link>
              </div>
              <div className='menuItem group cursor-pointer py-7 '>
                <Link
                  className={
                    'relative inline-flex items-center px-3 py-2 text-sm font-medium xl:text-base text-heading xl:px-4 group-hover:text-black ' +
                    (location.pathname === '/brands' ? 'active' : '')
                  }
                  to='/brands'
                >
                  Thương Hiệu
                </Link>
              </div>
              <div className='menuItem group cursor-pointer py-7 relative'>
                <Link
                  className={
                    'relative inline-flex items-center px-3 py-2 text-sm font-medium xl:text-base text-heading xl:px-4 group-hover:text-black ' +
                    (location.pathname.indexOf('/pages') >= 0 ? 'active' : '')
                  }
                >
                  Khác
                  <span className='opacity-30 text-xs mt-1 xl:mt-0.5 w-4 flex justify-end'>
                    <svg
                      stroke='currentColor'
                      fill='currentColor'
                      strokeWidth='0'
                      viewBox='0 0 448 512'
                      className='transition duration-300 ease-in-out transform group-hover:-rotate-180'
                      height='1em'
                      width='1em'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z'></path>
                    </svg>
                  </span>
                </Link>

                <div className='absolute invisible bg-gray-200 opacity-0 group-hover:visible subMenu shadow-header start-0 group-hover:opacity-100 rounded-md'>
                  <ul className='py-5 text-body'>
                    <li className='group relative'>
                      <Link
                        className={
                          'flex items-center py-2 ps-5 xl:ps-7 pe-3 xl:pe-3.5 hover:text-heading hover:bg-gray-300 hover:font-semibold ' +
                          (location.pathname.indexOf('contact-us') >= 0
                            ? ' font-semibold text-red-600'
                            : '')
                        }
                        to='/pages/contact-us'
                      >
                        Liên Hệ
                      </Link>
                    </li>
                    <li className='group relative'>
                      <Link
                        className={
                          'flex items-center py-2 ps-5 xl:ps-7 pe-3 xl:pe-3.5 hover:text-heading hover:bg-gray-300 hover:font-semibold ' +
                          (location.pathname.indexOf('faq') >= 0
                            ? ' font-semibold text-red-600'
                            : '')
                        }
                        to='/pages/faq'
                      >
                        FAQ
                      </Link>
                    </li>
                    <li className='group relative'>
                      <Link
                        className={
                          'flex items-center py-2 ps-5 xl:ps-7 pe-3 xl:pe-3.5 hover:text-heading hover:bg-gray-300 hover:font-semibold ' +
                          (location.pathname.indexOf('privacy') >= 0
                            ? ' font-semibold text-red-600'
                            : '')
                        }
                        to='/pages/privacy'
                      >
                        Chính Sách Bảo Mật
                      </Link>
                    </li>
                    <li className='group relative'>
                      <Link
                        className={
                          'flex items-center py-2 ps-5 xl:ps-7 pe-3 xl:pe-3.5 hover:text-heading hover:bg-gray-300 hover:font-semibold ' +
                          (location.pathname.indexOf('terms') >= 0
                            ? ' font-semibold text-red-600'
                            : '')
                        }
                        to='/pages/terms'
                      >
                        Điều Khoản và Điều Kiện
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <div className='hidden lg:flex justify-end items-center space-s-6 lg:space-s-5 xl:space-s-8 2xl:space-s-10 ms-auto flex-shrink-0'>
              <button
                className='flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none transform'
                aria-label='search-button'
                onClick={() => setShowSearchForm(true)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='17px'
                  height='18px'
                  viewBox='0 0 18.942 20'
                  className='md:w-4 xl:w-5 md:h-4 xl:h-5'
                >
                  <path
                    d='M381.768,385.4l3.583,3.576c.186.186.378.366.552.562a.993.993,0,1,1-1.429,1.375c-1.208-1.186-2.422-2.368-3.585-3.6a1.026,1.026,0,0,0-1.473-.246,8.343,8.343,0,1,1-3.671-15.785,8.369,8.369,0,0,1,6.663,13.262C382.229,384.815,382.025,385.063,381.768,385.4Zm-6.152.579a6.342,6.342,0,1,0-6.306-6.355A6.305,6.305,0,0,0,375.615,385.983Z'
                    transform='translate(-367.297 -371.285)'
                    fill='currentColor'
                    fillRule='evenodd'
                  ></path>
                </svg>
              </button>
              <UserHeader
                setShowDialog={setShowDialog}
                user={user}
                storage={storage}
                listUserOptions={listUserOptions}
              />
              <button
                className='flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none transform'
                aria-label='cart-button'
                title='Giỏ Hàng'
                onClick={() => setShowCart(true)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='18px'
                  height='18px'
                  viewBox='0 0 20 20'
                  className='md:w-4 xl:w-5 md:h-4 xl:h-5'
                >
                  <path
                    d='M5,4H19a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4ZM2,5A3,3,0,0,1,5,2H19a3,3,0,0,1,3,3V19a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3Zm10,7C9.239,12,7,9.314,7,6H9c0,2.566,1.669,4,3,4s3-1.434,3-4h2C17,9.314,14.761,12,12,12Z'
                    transform='translate(-2 -2)'
                    fill='currentColor'
                    fillRule='evenodd'
                  ></path>
                </svg>
                <span className='cart-counter-badge flex items-center justify-center bg-heading text-white absolute -top-2.5 xl:-top-3 -end-2.5 xl:-end-3 rounded-full font-bold'>
                  {user?.carts?.length || 0}
                </span>
              </button>
            </div>
            {/* For Mobile */}
            <button
              className='absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center flex-shrink-0 h-auto focus:outline-none transform lg:hidden'
              onClick={() => setShowMenuMobile(true)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='25'
                height='25'
                fill='currentColor'
                className='bi bi-list'
                viewBox='0 0 16 16'
              >
                <path
                  fillRule='evenodd'
                  d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z'
                />
              </svg>
            </button>
            <div className='flex justify-end items-center space-s-6 lg:space-s-5 xl:space-s-8 2xl:space-s-10 ms-auto flex-shrink-0 absolute right-0 top-1/2 -translate-y-1/2 lg:hidden'>
              <button
                className='flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none transform'
                aria-label='search-button'
                onClick={() => setShowSearchForm(true)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='17px'
                  height='18px'
                  viewBox='0 0 18.942 20'
                  className='md:w-4 xl:w-5 md:h-4 xl:h-5'
                >
                  <path
                    d='M381.768,385.4l3.583,3.576c.186.186.378.366.552.562a.993.993,0,1,1-1.429,1.375c-1.208-1.186-2.422-2.368-3.585-3.6a1.026,1.026,0,0,0-1.473-.246,8.343,8.343,0,1,1-3.671-15.785,8.369,8.369,0,0,1,6.663,13.262C382.229,384.815,382.025,385.063,381.768,385.4Zm-6.152.579a6.342,6.342,0,1,0-6.306-6.355A6.305,6.305,0,0,0,375.615,385.983Z'
                    transform='translate(-367.297 -371.285)'
                    fill='currentColor'
                    fillRule='evenodd'
                  ></path>
                </svg>
              </button>
              <button
                className='flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none transform'
                aria-label='cart-button'
                title='Giỏ Hàng'
                onClick={() => setShowCart(true)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='18px'
                  height='18px'
                  viewBox='0 0 20 20'
                  className='md:w-4 xl:w-5 md:h-4 xl:h-5'
                >
                  <path
                    d='M5,4H19a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4ZM2,5A3,3,0,0,1,5,2H19a3,3,0,0,1,3,3V19a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3Zm10,7C9.239,12,7,9.314,7,6H9c0,2.566,1.669,4,3,4s3-1.434,3-4h2C17,9.314,14.761,12,12,12Z'
                    transform='translate(-2 -2)'
                    fill='currentColor'
                    fillRule='evenodd'
                  ></path>
                </svg>
                <span className='cart-counter-badge flex items-center justify-center bg-heading text-white absolute -top-2.5 xl:-top-3 -end-2.5 xl:-end-3 rounded-full font-bold'>
                  {user?.carts?.length || 0}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <CartHeader
        showCart={showCart}
        setShowCart={setShowCart}
        user={user}
        handleUpdateCustomerInfo={handleUpdateCustomerInfo}
      />
      <MenuMobile
        showMenuMobile={showMenuMobile}
        setShowMenuMobile={setShowMenuMobile}
        user={user}
        listUserOptions={listUserOptions}
        setShowDialogLogin={setShowDialog}
        categories={categories}
      />
    </>
  );
}
