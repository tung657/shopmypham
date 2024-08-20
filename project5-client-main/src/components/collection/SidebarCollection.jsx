import Skeleton from 'react-loading-skeleton';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from '../shared/breadcrum/Breadcrum';

export default function SidebarCollection({
  breadcrumbs,
  collections,
  setSelectedCollection,
}) {
  const location = useLocation();

  return (
    <>
      <div className='flex-shrink-0 pe-24 hidden lg:block w-96'>
        <div style={{ position: 'sticky', top: '50px' }}>
          <div className='pb-7'>
            <Breadcrumb breadcrumbs={breadcrumbs} />
          </div>
          <div className='pt-1'>
            <div className='block border-b border-gray-300 pb-5 mb-7'>
              <div className='flex items-center justify-between mb-2.5'>
                <h2 className='font-semibold text-heading text-xl md:text-2xl'>
                  Danh Sách Bộ Sưu Tập
                </h2>
              </div>
            </div>
            <div className='block pb-7'>
              <ul className='mt-2 flex flex-col space-y-5'>
                {collections
                  ? collections.map((item, index) => (
                      <li
                        key={item._id}
                        className='text-sm lg:text-[15px] cursor-pointer'
                      >
                        <Link
                          className={
                            'block transition duration-300 ease-in-out text-heading py-0.5 ' +
                            (location.pathname.indexOf(item.path) >= 0
                              ? 'font-semibold text-red-500'
                              : 'hover:font-semibold ')
                          }
                          to={'/collections/' + item.path}
                          onClick={() => setSelectedCollection(item)}
                        >
                          Bộ Sưu Tập {item.collect_name}
                        </Link>
                      </li>
                    ))
                  : [...Array(5)].map((_, index) => (
                      <Skeleton height={25} key={index} />
                    ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
