import { Link } from 'react-router-dom';

export default function MainBrand({ brands, isGrid }) {
  return (
    <>
      {brands ? (
        <>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5 xl:gap-6'>
            {brands.map((item) => (
              <Link
                key={item._id}
                className={
                  'flex items-center px-5 lg:px-6 rounded-md shadow-vendorCard cursor-pointer relative bg-white transition-all hover:shadow-vendorCardHover ' +
                  (isGrid
                    ? 'pt-10 lg:pt-12 pb-9 lg:pb-11 flex-col text-center'
                    : 'py-5 lg:py-6')
                }
                to={'/brands/' + item.path}
              >
                <span className='text-[10px] xl:text-xs font-semibold text-white uppercase px-2 py-1 xl:py-[5px] rounded bg-[#2B78C6] absolute top-2 end-2'>
                  Mới
                </span>
                <div
                  className={
                    'border border-gray-100 relative flex flex-shrink-0 items-center justify-center bg-gray-300 rounded-full overflow-hidden ' +
                    (isGrid ? 'w-24 h-24 lg:w-28 lg:h-28' : 'w-16 h-16')
                  }
                >
                  <span>
                    <img
                      alt='text-logo'
                      sizes='100vw'
                      srcSet={item.thumbnail}
                      decoding='async'
                      data-nimg='fill'
                    />
                  </span>
                </div>
                <div
                  className={
                    'flex flex-col ' +
                    (isGrid ? 'mb-1 pt-4 md:pt-5 lg:pt-6' : 'ms-4')
                  }
                >
                  <h4
                    title={item.brand_name}
                    className={
                      'text-heading font-semibold text-sm sm:leading-6 leading-7 md:text-base xl:text-lg truncate ' +
                      (isGrid ? '2xl:text-xl mb-1.5' : 'mb-0.5')
                    }
                  >
                    {item.brand_name}
                  </h4>
                  <p
                    className={
                      'text-[13px] leading-5 flex items-start truncate ' +
                      (isGrid ? 'text-sm' : '')
                    }
                  >
                    <span className='inline-block me-1 text-[#6B7280] relative top-[0.15rem]'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        fill='currentColor'
                        className='bi bi-patch-check-fill'
                        viewBox='0 0 16 16'
                      >
                        <path d='M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z' />
                      </svg>
                    </span>
                    <span
                      className='truncate w-[200px]'
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    ></span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
