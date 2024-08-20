import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useTransition, animated } from '@react-spring/web';
import Overlay from '../shared/overlay/Overlay';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AlertDelete from '../shared/Alert/AlertDelete';

export default function CartHeader({
  showCart,
  setShowCart,
  user,
  handleUpdateCustomerInfo,
}) {
  const transitions = useTransition(showCart, {
    from: { opacity: 0, x: 400 },
    enter: { opacity: 1, x: 0 },
    leave: { opacity: 0, x: 400 },
    reverse: showCart,
    config: { duration: 300 },
  });

  const [total, setTotal] = useState(0);
  const [showAlertDelete, setShowAlertDelete] = useState(false);
  const [indexSelected, setIndexSelected] = useState();

  useEffect(() => {
    let result = 0;
    if (user?.carts && user?.carts?.length > 0) {
      user.carts.forEach(
        (item) => (item.product_price = item.product_price.replace(',', ''))
      );
      result = user.carts.reduce((prev, curr) => {
        if (curr.checked) return prev + curr.product_price * curr.quantity;
        else return prev;
      }, 0);
    }
    setTotal(result);
  }, [user?.carts]);

  const handleChangeQuantity = (index, action) => {
    if (action) {
      user.carts[index].quantity++;
    } else {
      if (user.carts[index].quantity > 1) user.carts[index].quantity--;
    }
    handleUpdateCustomerInfo(user);
  };

  const handleDeleteItemCart = () => {
    user.carts.splice(indexSelected, 1);
    handleUpdateCustomerInfo(user);
    setShowAlertDelete(false);
  };

  const handleChangeChecked = (item, index) => {
    const itemPost = JSON.parse(JSON.stringify(item));

    user.carts[index] = itemPost;
    handleUpdateCustomerInfo(user);
  };

  return (
    <div>
      <Overlay showOverlay={showCart} setShowOverlay={setShowCart} />
      {transitions(
        (styles, item) =>
          item && (
            <>
              <animated.div
                style={styles}
                className='fixed top-0 right-0 bg-white z-50 flex flex-col w-full sm:w-[420px] h-full justify-between'
              >
                <div>
                  <div className='w-full flex justify-between items-center relative ps-5 md:ps-7 py-0.5 border-b border-gray-100'>
                    <h2 className='font-bold text-xl md:text-2xl m-0 text-heading'>
                      Giỏ Hàng
                    </h2>
                    <button
                      className='flex text-2xl items-center justify-center text-gray-500 px-4 md:px-6 py-6 lg:py-8 focus:outline-none transition-opacity hover:opacity-60'
                      aria-label='close'
                      onClick={() => setShowCart(false)}
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
                  <div className='h-[70vh] shadow'>
                    <OverlayScrollbarsComponent
                      className='h-full'
                      options={{ scrollbars: { autoHide: false } }}
                      defer
                    >
                      {user ? (
                        user.carts && user.carts?.length > 0 ? (
                          user.carts.map((item, index) => (
                            <div key={index} className='w-full px-5 md:px-7'>
                              <div
                                className='w-full h-auto flex justify-start items-center bg-white py-4 md:py-7 border-b border-gray-100 relative last:border-b-0 opacity-100'
                                title={item.product_name}
                              >
                                <input
                                  type='checkbox'
                                  className='form-checkbox w-6 h-6 border border-red-500 rounded cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-heading checked:hover:bg-heading checked:focus:bg-heading me-4'
                                  name='woman'
                                  // defaultValue={item.checked}
                                  defaultChecked={item.checked}
                                  onChange={(e) => {
                                    item.checked = e.target.checked;
                                    handleChangeChecked(item, index);
                                  }}
                                />
                                <div
                                  className='relative flex w-24 md:w-28 h-24 md:h-28 rounded-md overflow-hidden bg-gray-200 flex-shrink-0 cursor-pointer me-4'
                                  onClick={() => {
                                    setIndexSelected(index);
                                    setShowAlertDelete(true);
                                  }}
                                >
                                  <span className='box-border inline-block overflow-hidden opacity-100 m-0 p-0 relative max-w-full'>
                                    <span className='box-border block opacity-100 m-0 p-0 max-w-full'>
                                      <img
                                        alt={item.product_name}
                                        aria-hidden='true'
                                        src={item.thumbnail}
                                        className='block max-w-full opacity-100 m-0 p-0'
                                      />
                                    </span>
                                  </span>
                                  <div
                                    className='absolute top-0 start-0 h-full w-full bg-black bg-opacity-30 md:bg-opacity-0 flex justify-center items-center transition duration-200 ease-in-out md:hover:bg-opacity-30 group'
                                    role='button'
                                  >
                                    <svg
                                      stroke='currentColor'
                                      fill='currentColor'
                                      strokeWidth='0'
                                      viewBox='0 0 512 512'
                                      className='relative text-white text-2xl transform opacity-0 transition duration-300 ease-in-out md:group-hover:scale-100 md:group-hover:opacity-100'
                                      height='24'
                                      width='24'
                                      xmlns='http://www.w3.org/2000/svg'
                                    >
                                      <path d='M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm52.7 283.3L256 278.6l-52.7 52.7c-6.2 6.2-16.4 6.2-22.6 0-3.1-3.1-4.7-7.2-4.7-11.3 0-4.1 1.6-8.2 4.7-11.3l52.7-52.7-52.7-52.7c-3.1-3.1-4.7-7.2-4.7-11.3 0-4.1 1.6-8.2 4.7-11.3 6.2-6.2 16.4-6.2 22.6 0l52.7 52.7 52.7-52.7c6.2-6.2 16.4-6.2 22.6 0 6.2 6.2 6.2 16.4 0 22.6L278.6 256l52.7 52.7c6.2 6.2 6.2 16.4 0 22.6-6.2 6.3-16.4 6.3-22.6 0z'></path>
                                    </svg>
                                  </div>
                                </div>
                                <div className='flex flex-col w-full overflow-hidden'>
                                  <Link
                                    className='truncate text-sm font-semibold text-heading mb-1.5 -mt-1 hover:text-red-500'
                                    to={'/products/' + item.path}
                                    onClick={() => setShowCart(false)}
                                  >
                                    {item.product_name}
                                  </Link>
                                  <span className='text-sm text-gray-400 mb-1.5'>
                                    Phân loại : {item.color + ', ' + item.size}
                                  </span>
                                  <span className='text-sm text-gray-400 mb-1.5'>
                                    Giá : &nbsp; ₫
                                    {Number(item.product_price).toLocaleString(
                                      'en'
                                    )}
                                  </span>

                                  <div className='flex items-end justify-between gap-4'>
                                    <div className='group flex items-center justify-between rounded-md overflow-hidden flex-shrink-0 h-8 md:h-9 shadow-navigation bg-heading'>
                                      <button
                                        className='flex items-center justify-center flex-shrink-0 h-full transition ease-in-out duration-300 focus:outline-none w-8 md:w-9 text-white bg-heading hover:bg-gray-600'
                                        onClick={() =>
                                          handleChangeQuantity(index, false)
                                        }
                                      >
                                        <svg
                                          xmlns='http://www.w3.org/2000/svg'
                                          width='10px'
                                          height='2px'
                                          viewBox='0 0 12 1.5'
                                        >
                                          <rect
                                            data-name='Rectangle 970'
                                            width='10px'
                                            height='2px'
                                            fill='currentColor'
                                          ></rect>
                                        </svg>
                                      </button>
                                      <span className='font-semibold flex items-center justify-center h-full  transition-colors duration-250 ease-in-out cursor-default flex-shrink-0 text-sm text-white w-8 md:w-10 '>
                                        {item.quantity}
                                      </span>
                                      <button
                                        className='flex items-center justify-center h-full flex-shrink-0 transition ease-in-out duration-300 focus:outline-none w-8 md:w-9 text-white bg-heading hover:bg-gray-600'
                                        onClick={() =>
                                          handleChangeQuantity(index, true)
                                        }
                                      >
                                        <svg
                                          data-name='plus (2)'
                                          xmlns='http://www.w3.org/2000/svg'
                                          width='10px'
                                          height='10px'
                                          viewBox='0 0 12 12'
                                        >
                                          <g data-name='Group 5367'>
                                            <path
                                              data-name='Path 17138'
                                              d='M6.749,5.251V0h-1.5V5.251H0v1.5H5.251V12h1.5V6.749H12v-1.5Z'
                                              fill='currentColor'
                                            ></path>
                                          </g>
                                        </svg>
                                      </button>
                                    </div>
                                    <span className='font-semibold text-sm md:text-sm text-heading leading-5 mb-1.5'>
                                      ₫
                                      {(
                                        item.product_price * item.quantity
                                      ).toLocaleString('en')}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className='px-5 md:px-7 py-5 flex flex-col justify-center items-center'>
                            <img
                              className='object-cover'
                              src={
                                require('../../assets/images/others/404.svg')
                                  .default
                              }
                              alt=''
                            />
                            <div className='text-lg font-semibold mt-2'>
                              Không có sản phẩm nào ở đây 😢!
                            </div>
                            <Link
                              to='/products'
                              className='py-2 px-8 bg-red-900 text-white rounded-md mt-2 hover:bg-red-700'
                              onClick={() => setShowCart(false)}
                            >
                              Mua Sắm Thôi
                            </Link>
                          </div>
                        )
                      ) : (
                        <div className='px-5 md:px-7 py-5 flex flex-col justify-center items-center'>
                          <img
                            className='object-cover'
                            src={
                              require('../../assets/images/others/404.svg')
                                .default
                            }
                            alt=''
                          />
                          <div className='text-lg font-semibold mt-2'>
                            Không có sản phẩm nào ở đây 😢!
                          </div>
                          <Link
                            to='/products'
                            className='py-2 px-8 bg-red-900 text-white rounded-md mt-2 hover:bg-red-700'
                            onClick={() => setShowCart(false)}
                          >
                            Mua Sắm Thôi
                          </Link>
                        </div>
                      )}
                    </OverlayScrollbarsComponent>
                  </div>
                </div>
                <div className='flex flex-col px-5 md:px-7 pt-2 pb-5 md:pb-7'>
                  <Link
                    className='w-full px-5 py-3 md:py-4 flex items-center justify-center bg-heading rounded-md text-sm sm:text-base text-white focus:outline-none transition duration-300 hover:bg-gray-600'
                    to='/checkout'
                    onClick={() => setShowCart(false)}
                  >
                    <span className='w-full pe-5 -mt-0.5 py-0.5'>
                      Tiến hành thanh toán
                    </span>
                    <span className='ms-auto flex-shrink-0 -mt-0.5 py-0.5'>
                      <span className='border-s border-white pe-5 py-0.5'></span>
                      ₫{total.toLocaleString('en')}
                    </span>
                  </Link>
                </div>
              </animated.div>
              <AlertDelete
                showAlert={showAlertDelete}
                setShowAlert={setShowAlertDelete}
                handleDelete={handleDeleteItemCart}
              />
            </>
          )
      )}
    </div>
  );
}
