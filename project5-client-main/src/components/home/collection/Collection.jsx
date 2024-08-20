import { Link } from 'react-router-dom';

import Skeleton from 'react-loading-skeleton';


export default function Collection({ collections }) {
  return (
    <>
      <div className='mb-12 md:mb-14 xl:mb-16 px-2.5 grid grid-cols-2 sm:grid-cols-9 gap-2 md:gap-2.5 max-w-[1920px] mx-auto'>
        {!collections ? (
          <>
            <div className='col-span-full sm:col-span-5'>
              <Skeleton className='mx-auto !rounded-none min-h-[200px]' />
            </div>
            <div className='col-span-1 sm:col-span-2'>
              <Skeleton className='mx-auto !rounded-none min-h-[200px]' />
            </div>
            <div className='col-span-1 sm:col-span-2'>
              <Skeleton className='mx-auto !rounded-none min-h-[200px]' />
            </div>
            <div className='col-span-1 sm:col-span-2'>
              <Skeleton className='mx-auto !rounded-none min-h-[200px]' />
            </div>
            <div className='col-span-1 sm:col-span-2'>
              <Skeleton className='mx-auto !rounded-none min-h-[200px]' />
            </div>
            <div className='col-span-full sm:col-span-5'>
              <Skeleton className='mx-auto !rounded-none min-h-[200px]' />
            </div>
          </>
        ) : (
          <>
            <div className='mx-auto col-span-full sm:col-span-5'>
              <Link
                className='h-full group flex justify-center relative overflow-hidden'
                to={'/collections/' + (collections && collections[0].path)}
              >
                <span className='box-border inline-block overflow-hidden opacity-100 m-0 p-0 relative max-w-full'>
                  <span className='box-border block opacity-100 m-0 p-0 max-w-full h-full'>
                    <img
                      alt=''
                      aria-hidden='true'
                      src={collections && collections[0].thumbnail}
                      className='block max-w-full opacity-100 m-0 p-0 h-full'
                    />
                  </span>
                  <div className='absolute text-white flex flex-col gap-2 inset-1/2 left-[45%] justify-center w-1/2'>
                    <div className='text-xs md:text-lg font-dancing'>
                      khám phá
                    </div>
                    <div className='uppercase text-lg md:text-2xl lg:text-4xl xl:text-5xl font-bold leading-5'>
                      Bộ sưu tập <br />
                      {collections && collections[0].collect_name}
                    </div>
                    <div className='uppercase sm:mt-2 md:mt-5 lg:mt-9 mt-4 text-xs md:text-sm'>
                      {collections && '#' + collections[0].hashtag}
                    </div>
                  </div>
                </span>

                <div className='absolute top-0 -start-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine'></div>
              </Link>
            </div>
            <div className='mx-auto col-span-1 sm:col-span-2'>
              <Link
                className='h-full group flex justify-center relative overflow-hidden'
                to={'/collections/' + (collections && collections[1].path)}
              >
                <span className='box-border inline-block overflow-hidden opacity-100 m-0 p-0 relative max-w-full'>
                  <span className='box-border block opacity-100 m-0 p-0 max-w-full h-full'>
                    <img
                      alt=''
                      aria-hidden='true'
                      src={collections && collections[1].thumbnail}
                      className='block max-w-full opacity-100 m-0 p-0 h-full'
                    />
                  </span>
                  <div className='absolute bottom-[5%] left-[5%] uppercase py-2 text-transparent bg-white font-bold rounded px-4 text-xs whitespace-nowrap md:text-base'>
                    <span className='text-bg-transparent text-transparent'>
                      {collections && collections[1].collect_name}
                    </span>
                  </div>
                  <div className='absolute top-[5%] right-[5%] uppercase text-white text-xs whitespace-nowrap md:text-sm'>
                    {collections && '#' + collections[1].hashtag}
                  </div>
                  <noscript></noscript>
                </span>
                <div className='absolute top-0 -start-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine'></div>
              </Link>
            </div>
            <div className='mx-auto col-span-1 sm:col-span-2'>
              <Link
                className='h-full group flex justify-center relative overflow-hidden'
                to={'/collections/' + (collections && collections[2].path)}
              >
                <span className='box-border inline-block overflow-hidden opacity-100 m-0 p-0 relative max-w-full'>
                  <span className='box-border block opacity-100 m-0 p-0 max-w-full h-full'>
                    <img
                      alt=''
                      aria-hidden='true'
                      src={collections && collections[2].thumbnail}
                      className='block max-w-full opacity-100 m-0 p-0 h-full'
                    />
                  </span>

                  <div className='absolute text-white flex flex-col top-0 left-0 justify-between h-full w-full p-2 sm:p-4'>
                    <div>
                      <div className='uppercase text-xs md:text-sm'>
                        {collections && '#' + collections[2].hashtag}
                      </div>
                      <div className='uppercase text-lg md:text-2xl lg:text-4xl xl:text-5xl font-bold mt-4'>
                        {collections && collections[2].collect_name}
                      </div>
                    </div>
                    <div className='text-xs md:text-lg font-dancing'>
                      chọn lọc
                    </div>
                  </div>
                  <noscript></noscript>
                </span>
                <div className='absolute top-0 -start-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine'></div>
              </Link>
            </div>
            <div className='mx-auto col-span-1 sm:col-span-2'>
              <Link
                className='h-full group flex justify-center relative overflow-hidden'
                to={'/collections/' + (collections && collections[3].path)}
              >
                <span className='box-border inline-block overflow-hidden opacity-100 m-0 p-0 relative max-w-full'>
                  <span className='box-border block opacity-100 m-0 p-0 max-w-full h-full'>
                    <img
                      alt=''
                      aria-hidden='true'
                      src={collections && collections[3].thumbnail}
                      className='block max-w-full opacity-100 m-0 p-0 h-full'
                    />
                  </span>

                  <div className='absolute text-white flex flex-col top-0 left-0 justify-between h-full w-full p-2 sm:p-4 text-right'>
                    <div>
                      <div className='uppercase text-xs md:text-sm'>
                        {collections && '#' + collections[3].hashtag}
                      </div>
                      <div className='uppercase text-lg md:text-2xl lg:text-4xl xl:text-5xl font-bold mt-4'>
                        {collections && collections[3].collect_name}
                      </div>
                    </div>
                    <div className='text-xs md:text-lg font-dancing'>
                      chọn lọc
                    </div>
                  </div>
                  <noscript></noscript>
                </span>
                <div className='absolute top-0 -start-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine'></div>
              </Link>
            </div>
            <div className='mx-auto col-span-1 sm:col-span-2'>
              <Link
                className='h-full group flex justify-center relative overflow-hidden'
                to={'/collections/' + (collections && collections[4].path)}
              >
                <span className='box-border inline-block overflow-hidden opacity-100 m-0 p-0 relative max-w-full'>
                  <span className='box-border block opacity-100 m-0 p-0 max-w-full h-full'>
                    <img
                      alt=''
                      aria-hidden='true'
                      src={collections && collections[4].thumbnail}
                      className='block max-w-full opacity-100 m-0 p-0 h-full'
                    />
                  </span>

                  <div className='absolute text-white flex flex-col top-0 left-0 justify-center items-center text-center h-full w-full p-2 sm:p-4'>
                    <div>
                      <div className='text-xs md:text-lg font-dancing'>
                        khám phá
                      </div>
                      <div className='uppercase text-lg sm:text-sm md:text-lg lg:text-3xl p-2 rounded font-bold mt-2 text-transparent bg-white'>
                        <span
                          className='text-bg-transparent'
                          style={{
                            background:
                              'url("' +
                              (collections && collections[4].thumbnail) +
                              '") no-repeat center',
                          }}
                        >
                          {collections && collections[4].collect_name}
                        </span>
                      </div>
                    </div>
                    <div className='uppercase text-xs md:text-sm mt-2'>
                      {collections && '#' + collections[4].hashtag}
                    </div>
                  </div>
                  <noscript></noscript>
                </span>
                <div className='absolute top-0 -start-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine'></div>
              </Link>
            </div>
            <div className='mx-auto col-span-full sm:col-span-5'>
              <Link
                className='h-full group flex justify-center relative overflow-hidden'
                to={'/collections/' + (collections && collections[5].path)}
              >
                <span className='box-border inline-block overflow-hidden opacity-100 m-0 p-0 relative max-w-full'>
                  <span className='box-border block opacity-100 m-0 p-0 max-w-full h-full'>
                    <img
                      alt=''
                      aria-hidden='true'
                      src={collections && collections[5].thumbnail}
                      className='block max-w-full opacity-100 m-0 p-0 h-full'
                    />
                  </span>

                  <div className='absolute text-white flex flex-col top-0 left-0 justify-between h-full w-full p-6 sm:p-8'>
                    <div>
                      <div className='text-xs md:text-lg font-dancing'>
                        khám phá
                      </div>
                      <div className='uppercase text-lg md:text-2xl lg:text-4xl xl:text-5xl font-bold mt-2 lg:mt-4'>
                        {collections && collections[5].collect_name}
                      </div>
                    </div>
                    <div className='uppercase text-xs md:text-sm'>
                      {collections && '#' + collections[5].hashtag}
                    </div>
                  </div>

                  <noscript></noscript>
                </span>
                <div className='absolute top-0 -start-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine'></div>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
