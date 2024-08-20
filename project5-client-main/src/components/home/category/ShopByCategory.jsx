import { useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { search as searchCategories } from '../../../services/category';


export default function ShopByCategory() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [categories, setCategories] = useState();

  useEffect(() => {
    searchCategories().then((res) => setCategories(res));
  }, []);

  return (
    <>
      <div className='mb-10 md:mb-11 lg:mb-12 xl:mb-14 lg:pb-1 xl:pb-0'>
        <div className='flex items-center justify-between -mt-2 pb-0.5 mb-4 md:mb-5 lg:mb-6 2xl:mb-7 3xl:mb-8'>
          <h3 className='text-lg md:text-xl lg:text-2xl 2xl:text-3xl xl:leading-10 font-bold text-heading'>
            {categories ? (
              'Sản Phẩm Theo Nhãn'
            ) : (
              <Skeleton width={400} height={30} />
            )}
          </h3>
        </div>
        <div className='carouselWrapper relative'>
          <Swiper
            className=''
            dir='ltr'
            spaceBetween={20}
            modules={[Navigation, Autoplay]}
            slidesPerView={1}
            breakpoints={{
              // when window width is >= 320px
              320: {
                slidesPerView: 2,
              },
              // when window width is >= 480px
              480: {
                slidesPerView: 4,
              },
              // when window width is >= 640px
              768: {
                slidesPerView: 5,
              },
              1024: {
                slidesPerView: 6,
              },
            }}
            loop
            autoplay={true}
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
            {categories
              ? categories.map((item, index) => (
                  <SwiperSlide key={item._id} virtualIndex={index}>
                    <Link
                      className='group flex justify-center text-center flex-col'
                      to={'/category/' + item.path}
                    >
                      <div className='relative inline-flex mb-3.5 md:mb-4 lg:mb-5 xl:mb-6 mx-auto rounded-md h-[170px] w-[170px] overflow-hidden'>
                        <div className='flex'>
                          <span className='box-border inline-block overflow-hidden opacity-100 m-0 p-0 relative max-w-full'>
                            <span className='box-border block opacity-100 m-0 p-0 max-w-full h-full'>
                              <img
                                alt={item.category_name}
                                aria-hidden='true'
                                src={item.thumbnail}
                                className='block w-full h-full object-cover opacity-100 m-0 p-0'
                              />
                            </span>
                          </span>
                        </div>
                        <div className='absolute top left bg-black w-full h-full opacity-0 transition-opacity duration-300 group-hover:opacity-30 rounded-md'></div>
                        <div className='absolute top left h-full w-full flex items-center justify-center'>
                          <svg
                            stroke='currentColor'
                            fill='currentColor'
                            strokeWidth='0'
                            viewBox='0 0 512 512'
                            className='text-white text-base sm:text-xl lg:text-2xl xl:text-3xl transform opacity-0 scale-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100'
                            height='1em'
                            width='1em'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path d='M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z'></path>
                          </svg>
                        </div>
                      </div>
                      <h4 className='text-heading text-sm md:text-base xl:text-lg font-semibold capitalize'>
                        {item.category_name}
                      </h4>
                    </Link>
                  </SwiperSlide>
                ))
              : [...Array(7)].map((_, index) => (
                  <SwiperSlide key={index}>
                    <div className='mb-3.5 md:mb-4 lg:mb-5 xl:mb-6'>
                      <Skeleton className='min-h-[150px]' />
                    </div>
                    <h4 className='w-full'>
                      <Skeleton className='' height={25} />
                    </h4>
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
      </div>
    </>
  );
}
