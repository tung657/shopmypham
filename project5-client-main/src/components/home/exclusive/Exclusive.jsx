import { Link } from 'react-router-dom';

export default function Exclusive() {
  return (
    <>
      <div className='rounded-md overflow-hidden lg:block mb-12 md:mb-14 xl:mb-16'>
        <div className='flex justify-between'>
          <div className='group w-2/4 flex justify-between items-end relative transition duration-200 ease-in flex-row-reverse bg-gray-150'>
            <div className='exclusiveImage relative z-10 flex transform transition duration-200 ease-in group-hover:scale-105 ms-auto 2xl:pe-24 3xl:pe-40'>
              <span className='box-border inline-block overflow-hidden opacity-100 m-0 p-0 relative max-w-full'>
                <span className='box-border block opacity-100 m-0 p-0 max-w-full'>
                  <img
                    alt=''
                    aria-hidden='true'
                    src={require('../../../assets/images/exclusives/women.png')}
                    className='block max-w-full opacity-100 m-0 p-0'
                  />
                </span>
              </span>
            </div>
            <Link
              className='absolute z-10 bottom-3 sm:bottom-5 inline-block bg-white shadow-product rounded-md text-heading lowercase text-sm xl:text-xl 2xl:text-xl sm:uppercase px-3 sm:px-5 xl:px-6 2xl:px-8 py-2.5 sm:py-4 xl:py-5 2xl:py-7 transform transition duration-300 ease-in-out hover:bg-heading hover:text-white end-3 sm:end-5 xl:end-7 xl:bottom-7 xl:top-auto'
              to='/search?category=women'
            >
              #nữ độc đáo
            </Link>
            <div className='z-0 absolute top-10 xl:top-12 2xl:top-16 3xl:top-24 uppercase text-black opacity-10 text-xl xl:text-2xl 3xl:text-3xl tracking-widest leading-5 end-5 xl:end-7'>
              Năm mới
            </div>
            <div className='exclusiveYear absolute top-16 xl:top-20 2xl:top-24 3xl:top-32 start-0 z-10 text-black font-bold leading-none tracking-widest text-end end-0'>
              20
            </div>
          </div>
          <div className='group w-2/4 flex justify-between items-end relative transition duration-200 ease-in flex-row-reverse bg-linenSecondary'>
            <div className='exclusiveImage relative z-10 flex transform transition duration-200 ease-in group-hover:scale-105 ms-auto 2xl:pe-24 3xl:pe-40'>
              <span className='box-border inline-block overflow-hidden opacity-100 m-0 p-0 relative max-w-full'>
                <span className='box-border block opacity-100 m-0 p-0 max-w-full'>
                  <img
                    alt=''
                    aria-hidden='true'
                    src={require('../../../assets/images/exclusives/men.png')}
                    className='block max-w-full opacity-100 m-0 p-0'
                  />
                </span>
              </span>
            </div>
            <a
              className='absolute z-10 bottom-3 sm:bottom-5 inline-block bg-white shadow-product rounded-md text-heading lowercase text-sm xl:text-xl 2xl:text-xl sm:uppercase px-3 sm:px-5 xl:px-6 2xl:px-8 py-2.5 sm:py-4 xl:py-5 2xl:py-7 transform transition duration-300 ease-in-out hover:bg-heading hover:text-white start-3 sm:start-5 xl:start-7 xl:bottom-7 xl:top-auto'
              href='/search'
            >
              #nam độc đáo
            </a>
            <div className='z-0 absolute top-10 xl:top-12 2xl:top-16 3xl:top-24 uppercase text-black opacity-10 text-xl xl:text-2xl 3xl:text-3xl tracking-widest leading-5 start-5 xl:start-7'>
              độc đáo
            </div>
            <div className='exclusiveYear absolute top-16 xl:top-20 2xl:top-24 3xl:top-32 start-0 z-10 text-black font-bold leading-none tracking-widest text-start pl-4 start-0'>
              22
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
