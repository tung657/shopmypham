import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Collapse } from 'react-collapse';
import Zoom from 'react-medium-image-zoom';
import UserForm from '../user/UserForm';
import { toast } from 'react-toastify';
import Review from './Review';
import { calculateDiscount } from '../../utils/constrants/constrants';

// stylesheet

export default function Main({ product, user, handleUpdateCustomerInfo }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [indexColor, setIndexColor] = useState(0);
  const [indexSize, setIndexSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isCollapse, setIsCollapse] = useState(true);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [showLogin, setShowLogin] = useState(false);

  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (product) {
      let total = 0;
      product.variants.forEach((item) => {
        if (item.has_size)
          total += item.list_sizes.reduce(
            (prev, curr) => prev + Number(curr.quantity),
            0
          );
        else total += Number(item.quantityNoSize);
      });

      setTotalQuantity(total);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (user) {
      const userClone = JSON.parse(JSON.stringify(user));
      if (userClone) {
        const carts = JSON.parse(JSON.stringify(userClone.carts || []));

        const c = carts.findIndex((item) => item.product_id === product.id);
        const product_name = product.product_name;
        const color = product.variants[indexColor].color;
        const hex = product.variants[indexColor].hex;
        const size = product.variants[indexColor].has_size
          ? product.variants[indexColor].list_sizes[indexSize].size
          : '';
        let product_price = calculateDiscount(product.variants[indexColor].sell_price, product?.discount?.discount_percent || 0);
        product_price = product_price.replace(/,/g, '');
        const thumbnail = product?.variants[indexColor]?.images[0]

        if (c < 0)
          carts.push({
            product_id: product.id,
            product_name,
            color,
            hex,
            size,
            quantity,
            product_price,
            thumbnail,
            checked: false,
            path: product.path,
          });
        else {
          if (carts[c].color === color && carts[c].size === size)
            carts[c].quantity += quantity;
          else if (carts[c].color !== color)
            carts.push({
              product_id: product.id,
              product_name,
              color,
              hex,
              size,
              quantity,
              product_price,
              thumbnail,
              path: product.path,
            });
          else if (carts[c].size !== size)
            carts.push({
              product_id: product.id,
              product_name,
              color,
              hex,
              size,
              quantity,
              product_price,
              thumbnail,
              path: product.path,
            });
        }
        userClone.carts = carts;
        handleUpdateCustomerInfo(userClone)
          .then((res) => {
            toast.success(`Đã thêm ${product_name} vào giỏ của bạn.`, {
              autoClose: 2000,
              position: 'bottom-right',
              icon: '🚀',
            });
          })
          .catch((err) => {
            toast.error(err.response.data.message, {
              autoClose: 2000,
              position: 'bottom-right',
              icon: '🐔',
            });
          });
      }
    } else {
      toast.info('Bạn cần đăng nhập!');
      setShowLogin(true);
    }
  };

  return (
    <>
      <div className='block lg:grid grid-cols-9 gap-x-10 xl:gap-x-14 pt-7 pb-10 lg:pb-14 2xl:pb-20 items-start'>
        <div className='col-span-5'>
          <div className='mb-4 relative'>
            <Swiper
              className='w-full'
              dir='ltr'
              spaceBetween={20}
              modules={[Navigation, Autoplay]}
              slidesPerView={1}
              breakpoints={{
                // when window width is >= 640px
                768: {
                  slidesPerView: 2,
                },
              }}
              loop
              autoplay={{
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onSwiper={(swiper) => {
                // Delay execution for the refs to be defined
                setTimeout(() => {
                  // Override prevEl & nextEl now that refs are defined
                  if (swiper.params) {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                  }

                  // Re-init navigation
                  if (swiper.navigation) {
                    swiper.navigation.destroy();
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }
                });
              }}
            >
              {product?.variants[indexColor]
                ? product.variants[indexColor].images.map((item, index) => (
                    <SwiperSlide
                      key={index}
                      className='transition duration-150 ease-in hover:opacity-90'
                    >
                      <Zoom>
                        <img
                          src={item}
                          alt={product.product_name}
                          className='object-cover w-full rounded'
                        />
                      </Zoom>
                    </SwiperSlide>
                  ))
                : [...Array(2)].map((_, index) => (
                    <SwiperSlide key={index}>
                      <Skeleton className='min-h-[400px]' />
                    </SwiperSlide>
                  ))}
            </Swiper>
            <div className='flex items-center w-full absolute top-2/4 z-10 -mt-4 md:-mt-5 xl:-mt-7'>
              <button
                className='w-7 h-7 lg:w-8 lg:h-8 text-sm md:text-base lg:text-lg text-black flex items-center justify-center bg-white absolute transition duration-250 hover:bg-gray-900 hover:text-white focus:outline-none transform shadow-navigation -translate-x-1/2 rounded-full xl:w-10 xl:h-10 3xl:w-12 3xl:h-12 3xl:text-2xl start-0'
                aria-label='prev-button'
                ref={prevRef}
              >
                <svg
                  stroke='currentColor'
                  fill='currentColor'
                  strokeWidth='0'
                  viewBox='0 0 512 512'
                  height='1em'
                  width='1em'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z'></path>
                </svg>
              </button>
              <button
                className='w-7 h-7 lg:w-8 lg:h-8 text-sm md:text-base lg:text-lg text-black flex items-center justify-center bg-white absolute transition duration-250 hover:bg-gray-900 hover:text-white focus:outline-none transform shadow-navigation translate-x-1/2 rounded-full xl:w-10 xl:h-10 3xl:w-12 3xl:h-12 3xl:text-2xl end-0'
                aria-label='next-button'
                ref={nextRef}
              >
                <svg
                  stroke='currentColor'
                  fill='currentColor'
                  strokeWidth='0'
                  viewBox='0 0 512 512'
                  height='1em'
                  width='1em'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z'></path>
                </svg>
              </button>
            </div>
          </div>
          <div className='bg-white min-h-[200px] rounded-md'>
            <h2 className='text-heading capitalize text-2xl font-semibold hover:text-black mb-3.5'>
              {product ? (
                'Đánh giá sản phẩm'
              ) : (
                <Skeleton width={400} height={30} />
              )}
            </h2>
            <Review
              product={product}
              user={user}
              rating={rating}
              setRating={setRating}
            />
          </div>
        </div>
        <div className='col-span-4 pt-8 lg:pt-0'>
          <div className='pb-7 mb-7 border-b border-gray-300'>
            <h2 className='text-heading text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-bold hover:text-black mb-3.5'>
              {product?.product_name ?? <Skeleton width={400} height={30} />}
            </h2>
            <p className='text-body text-sm lg:text-base leading-6 lg:leading-8'>
              {product ? <span></span> : <Skeleton count={5} />}
            </p>
            <div className='flex gap-2 items-center mt-5'>
              {product?.discount ? (
                <>
                  <del className='text-sm'>
                    {product?.min_price === product?.max_price
                      ? `₫${product?.min_price}`
                      : `₫${product?.min_price} - ₫${product?.max_price}`}
                  </del>
                  <div className='text-heading font-segoe font-semibold text-lg 3xl:mt-0.5 pe-2 md:pe-0 lg:pe-2 2xl:pe-0 text-red-600'>
                    {product?.min_price === product?.max_price
                      ? `₫${calculateDiscount(
                          product?.min_price,
                          product.discount.discount_percent
                        )}`
                      : `₫${calculateDiscount(
                          product?.min_price,
                          product.discount.discount_percent
                        )} - ₫${calculateDiscount(
                          product?.max_price,
                          product.discount.discount_percent
                        )}`}
                  </div>
                </>
              ) : (
                <div className='text-heading font-segoe font-semibold text-lg 3xl:mt-0.5 pe-2 md:pe-0 lg:pe-2 2xl:pe-0 text-red-600'>
                  {product?.min_price === product?.max_price
                    ? `₫${product?.min_price}`
                    : `₫${product?.min_price} - ₫${product?.max_price}`}
                </div>
              )}
            </div>
          </div>
          <div className='pb-3 border-b border-gray-300'>
            {product && product?.variants[indexColor]?.has_size ? (
              <>
                <div className='mb-4'>
                  <h3 className='text-base md:text-lg text-heading font-semibold mb-2.5 capitalize'>
                    {product && product.variants ? (
                      'Kích Thước'
                    ) : (
                      <Skeleton width={400} height={30} />
                    )}
                  </h3>
                  <ul className='colors flex flex-wrap -me-3'>
                    {product && product.variants ? (
                      product.variants[indexColor].list_sizes.map(
                        (item, index) => (
                          <button
                            key={index}
                            className={
                              'cursor-pointer rounded border border-gray-300 w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 me-2 md:me-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black ' +
                              (indexSize === index ? 'border-black' : '') +
                              (item.quantity <= 0
                                ? ' cursor-not-allowed hover:cursor-not-allowed bg-slate-200'
                                : '')
                            }
                            disabled={item.quantity <= 0}
                            onClick={() => setIndexSize(index)}
                          >
                            {item.size}
                          </button>
                        )
                      )
                    ) : (
                      <>
                        <Skeleton width={400} height={50} />
                      </>
                    )}
                  </ul>
                </div>
                <div className='mb-4'>
                  <h3 className='text-base md:text-lg text-heading font-semibold mb-2.5 capitalize'>
                    {product && product.variants ? (
                      'Màu'
                    ) : (
                      <Skeleton width={400} height={30} />
                    )}
                  </h3>
                  <ul className='colors flex flex-wrap -me-3'>
                    {product && product.variants ? (
                      product.variants.map((item, index) => (
                        <li
                          key={index}
                          className={
                            'cursor-pointer rounded border border-gray-300 w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 me-2 md:me-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black ' +
                            (indexColor === index ? 'border-black' : '')
                          }
                          title={item.color}
                          onClick={() => {
                            setIndexColor(index);
                            setIndexSize(0);
                          }}
                        >
                          <span
                            className='h-full w-full rounded block'
                            style={{ backgroundColor: item.hex }}
                          ></span>
                        </li>
                      ))
                    ) : (
                      <>
                        <Skeleton width={400} height={50} />
                      </>
                    )}
                  </ul>
                </div>
              </>
            ) : (
              <></>
            )}
            <div className='mb-4'>
              <span className='text-black font-semibold'>
                {product && product?.variants[indexColor] ? (
                  <>
                    Tổng:{' '}
                    {/* <span className='text-red-600'>
                      {'₫' + product.variants[indexColor].sell_price || 0}
                    </span>{' '} */}
                    <span className='text-red-600'>
                      {`₫${calculateDiscount(
                        product.variants[indexColor].sell_price,
                        product?.discount?.discount_percent || 0
                      )}`}
                    </span>{' '}
                    x {quantity}
                  </>
                ) : (
                  <></>
                )}
              </span>
            </div>
          </div>

          <div className='flex items-center space-s-4 md:pe-32 lg:pe-12 2xl:pe-32 3xl:pe-48 border-b border-gray-300 py-8'>
            <div className='group flex items-center justify-between rounded-md overflow-hidden flex-shrink-0 border h-11 md:h-12 border-gray-300'>
              <button
                className='flex items-center justify-center flex-shrink-0 h-full transition ease-in-out duration-300 focus:outline-none w-10 md:w-12 text-heading border-e border-gray-300 hover:text-white hover:bg-heading'
                disabled={quantity <= 1}
                onClick={() => setQuantity(quantity - 1)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='12px'
                  height='2px'
                  viewBox='0 0 12 1.5'
                >
                  <rect
                    data-name='Rectangle 970'
                    width='12px'
                    height='2px'
                    fill='currentColor'
                  ></rect>
                </svg>
              </button>
              <span className='font-semibold flex items-center justify-center h-full  transition-colors duration-250 ease-in-out cursor-default flex-shrink-0 text-base text-heading w-12  md:w-20 xl:w-24'>
                {quantity}
              </span>
              {product?.variants[indexColor]?.has_size ? (
                <button
                  className='flex items-center justify-center h-full flex-shrink-0 transition ease-in-out duration-300 focus:outline-none w-10 md:w-12 text-heading border-s border-gray-300 hover:text-white hover:bg-heading'
                  disabled={
                    quantity >=
                    product?.variants[indexColor]?.list_sizes[indexSize]
                      ?.quantity
                  }
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <svg
                    data-name='plus (2)'
                    xmlns='http://www.w3.org/2000/svg'
                    width='12px'
                    height='12px'
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
              ) : (
                <button
                  className='flex items-center justify-center h-full flex-shrink-0 transition ease-in-out duration-300 focus:outline-none w-10 md:w-12 text-heading border-s border-gray-300 hover:text-white hover:bg-heading'
                  disabled={
                    quantity >= product?.variants[indexColor]?.quantityNoSize
                  }
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <svg
                    data-name='plus (2)'
                    xmlns='http://www.w3.org/2000/svg'
                    width='12px'
                    height='12px'
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
              )}
            </div>
            {product?.variants[indexColor]?.has_size ? (
              <span>
                {indexSize >= 0
                  ? product?.variants[indexColor]?.list_sizes[indexSize]
                      ?.quantity + ' sản phẩm có sẵn'
                  : ''}
              </span>
            ) : (
              <span>
                {product?.variants[indexColor]?.quantityNoSize +
                  ' sản phẩm có sẵn'}
              </span>
            )}
          </div>

          <div className='flex items-center space-s-4 md:pe-32 lg:pe-12 2xl:pe-32 3xl:pe-48 border-b border-gray-300 py-8'>
            <button
              data-variant='slim'
              className={
                'text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center placeholder-white focus-visible:outline-none focus:outline-none rounded  h-11 md:h-12 px-5 py-2 transform-none normal-case hover:shadow-cart w-full md:w-6/12 xl:w-full ' +
                (!(indexColor >= 0 && indexSize >= 0 && quantity)
                  ? 'cursor-not-allowed hover:cursor-not-allowed bg-slate-400 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 hover:-translate-y-1 border border-slate-500 text-black')
              }
              disabled={!(indexColor >= 0 && indexSize >= 0 && quantity)}
              onClick={handleAddToCart}
            >
              <span className='py-2 3xl:px-8 flex gap-2 item-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  fill='currentColor'
                  className='bi bi-cart-plus'
                  viewBox='0 0 16 16'
                >
                  <path d='M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z' />
                  <path d='M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z' />
                </svg>
                Thêm Vào Giỏ
              </span>
            </button>
            <button
              data-variant='slim'
              className={
                'text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border border-transparent placeholder-white focus-visible:outline-none focus:outline-none rounded h-11 md:h-12 px-5 bg-heading text-white py-2 transform-none normal-case hover:text-white  hover:shadow-cart whitespace-nowrap bg-slate-500 hover:bg-slate-600 hover:-translate-y-1'
              }
              // onClick={() => console.log('clicked!')}
            >
              <span className='py-2'>Mua Ngay</span>
            </button>
          </div>

          <div className='py-6'>
            <ul className='text-sm space-y-5 pb-1'>
              <li>
                <span className='font-semibold text-heading inline-block pe-2'>
                  Số Lượng:
                </span>
                {totalQuantity}
              </li>
              <li>
                <span className='font-semibold text-heading inline-block pe-2'>
                  Thương Hiệu:
                </span>
                <Link
                  className='transition underline hover:no-underline hover:text-heading'
                  to={'/brands/' + product?.brand?.path}
                >
                  {product?.brand?.brand_name}
                </Link>
              </li>
              <li>
                <span className='font-semibold text-heading inline-block pe-2'>
                  Xuất Xứ:
                </span>
                {product?.origin}
              </li>
              <li>
                <span className='font-semibold text-heading inline-block pe-2'>
                  Danh mục:
                </span>
                <Link
                  className='transition underline hover:no-underline hover:text-heading'
                  to={`/category/${product?.category?.path}${
                    product?.category_sub
                      ? '?sub=' + product?.category_sub?.path
                      : ''
                  }`}
                >
                  {product?.category_sub?.sub_category_name ||
                    product?.category?.category_name}
                </Link>
              </li>
              <li>
                <span className='font-semibold text-heading inline-block pe-2'>
                  Chất Liệu:
                </span>
                {product?.material}
              </li>
            </ul>
          </div>
          <div className=''>
            <header
              className='cursor-pointer flex items-center justify-between transition-colors py-5 md:py-6 border-t border-gray-300'
              onClick={() => setIsCollapse(!isCollapse)}
            >
              <h2 className='text-sm font-semibold leading-relaxed text-heading pe-2 md:text-base lg:text-lg capitalize'>
                Mô Tả sản phẩm
              </h2>
              <div className='flex-shrink-0 relative w-4 h-4 flex justify-center items-center'>
                <div className='w-full h-0.5 bg-heading rounded-sm'></div>
                <div
                  className={
                    'origin-bottom transform w-0.5 h-full bg-heading rounded-sm absolute bottom-0 transition-transform duration-500 ease-in-out ' +
                    (isCollapse ? 'scale-0' : 'scale-100')
                  }
                ></div>
              </div>
            </header>
            <Collapse isOpened={isCollapse}>
              <div className='pb-6 md:pb-7 leading-7 text-sm text-gray-600'>
                <span
                  dangerouslySetInnerHTML={{
                    __html: product?.description,
                  }}
                ></span>
              </div>
            </Collapse>
          </div>
        </div>
      </div>
      <UserForm showDialog={showLogin} setShowDialog={setShowLogin} />
    </>
  );
}
