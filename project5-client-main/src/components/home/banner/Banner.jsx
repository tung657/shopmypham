import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

export default function Banner({ collection }) {
  return (
    <>
      {collection ? (
        <div className='mx-auto mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0'>
          <Link
            className='h-full group flex justify-center relative overflow-hidden'
            to={'/collections/' + collection.path}
          >
            <span className='box-border inline-block overflow-hidden opacity-100 m-0 p-0 relative max-w-full'>
              <span className='box-border block opacity-100 m-0 p-0 max-w-full'>
                <img
                  alt=''
                  aria-hidden='true'
                  src={require('../../../assets/images/banners/banner-3.jpg')}
                  className='block max-w-full opacity-100 m-0 p-0'
                />
              </span>
            </span>
          </Link>
        </div>
      ) : (
        <div className='mx-auto mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0'>
          <Skeleton className='min-h-[150px] md:min-h-[250px] lg:min-h-[350px]' />
        </div>
      )}
    </>
  );
}
