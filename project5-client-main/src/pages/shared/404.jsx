import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Page404({ setTitle }) {
  useEffect(() => {
    setTitle('Not Found');
  }, [setTitle]);

  return (
    <>
      <div className='border-t border-b border-gray-300 text-center px-16 py-16 sm:py-20 lg:py-24 xl:py-32 flex items-center justify-center'>
        <div>
          <span className='box-border inline-block overflow-hidden opacity-100 m-0 p-0 relative max-w-full'>
            <span className='box-border block opacity-100 m-0 p-0 max-w-full'>
              <img
                alt=''
                aria-hidden='true'
                src={require('../../assets/images/others/404.svg').default}
                className='block max-w-full opacity-100 m-0 p-0'
              />
            </span>
          </span>
          <h3 className='text-lg md:text-xl lg:text-2xl 2xl:text-3xl xl:leading-10 font-bold text-heading'>
            Có vẻ như bạn bị lạc
          </h3>
          <p className='text-sm md:text-base leading-7 pt-2 md:pt-3.5 pb-7 md:pb-9'>
            Chúng tôi không thể tìm thấy trang này
          </p>
          <Link
            className='text-[13px] md:text-sm lg:text-base leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 bg-heading text-white px-4 md:px-6 py-2.5 lg:py-3 hover:text-white hover:bg-gray-600 hover:shadow-cart rounded-lg'
            to={'/'}
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
              <path d='M416 174.74V48h-80v58.45L256 32 0 272h64v208h144V320h96v160h144V272h64l-96-97.26z'></path>
            </svg>
            <span className='ps-1.5'>Quay Trở Lại</span>
          </Link>
        </div>
      </div>
    </>
  );
}
