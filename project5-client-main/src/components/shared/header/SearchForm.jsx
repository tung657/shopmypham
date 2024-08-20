import { useEffect, useState } from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import Overlay from '../overlay/Overlay';

import { searchProducts } from '../../../services/product';

import { Link } from 'react-router-dom';

export default function SearchForm({ showSearchForm, setShowSearchForm }) {
  const [keyword, setKeyword] = useState('');

  const [isLoaded, setIsLoaded] = useState(true);

  const [products, setProducts] = useState();

  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    if (keyword) {
      setIsLoaded(false);
      searchProducts({
        product_name: keyword,
      }).then((res) => {
        setIsLoaded(true);
        setProducts(res);
      });
    } else {
      setIsLoaded(true);
      setProducts();
    }
  }, [keyword]);

  return (
    <div>
      <Overlay
        showOverlay={showSearchForm}
        setShowOverlay={setShowSearchForm}
      />
      <div
        className={
          'drawer-search relative hidden top-0 z-30 opacity-0 invisible transition duration-300 ease-in-out left-1/2 px-4 w-full md:w-[730px] lg:w-[930px] ' +
          (showSearchForm ? 'open' : '')
        }
      >
        <div className='w-full flex flex-col justify-center'>
          <div className='flex-shrink-0 mt-3.5 lg:mt-4 w-full'>
            <div className='flex flex-col mx-auto mb-1.5 w-full '>
              <form
                className='relative pe-12 md:pe-14 bg-white overflow-hidden rounded-md w-full'
                noValidate=''
                role='search'
              >
                <label htmlFor='search' className='flex items-center py-0.5'>
                  <span className='flex items-center justify-center flex-shrink-0 w-12 h-full cursor-pointer md:w-14 focus:outline-none'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='17px'
                      height='18px'
                      viewBox='0 0 18.942 20'
                      className='w-4 h-4'
                    >
                      <path
                        d='M381.768,385.4l3.583,3.576c.186.186.378.366.552.562a.993.993,0,1,1-1.429,1.375c-1.208-1.186-2.422-2.368-3.585-3.6a1.026,1.026,0,0,0-1.473-.246,8.343,8.343,0,1,1-3.671-15.785,8.369,8.369,0,0,1,6.663,13.262C382.229,384.815,382.025,385.063,381.768,385.4Zm-6.152.579a6.342,6.342,0,1,0-6.306-6.355A6.305,6.305,0,0,0,375.615,385.983Z'
                        transform='translate(-367.297 -371.285)'
                        fill='text-heading'
                        fillRule='evenodd'
                      ></path>
                    </svg>
                  </span>
                  <input
                    id='search'
                    className='w-full h-12 text-sm placeholder-gray-400 outline-none text-heading lg:h-14 lg:text-base'
                    placeholder='Tìm kiếm...'
                    aria-label='Search'
                    autoComplete='on'
                    name='search'
                    autoFocus
                    value={keyword}
                    onChange={handleSearch}
                  />
                </label>
                <button
                  type='button'
                  className='absolute top-0 flex items-center justify-center w-12 h-full text-2xl text-gray-400 transition duration-200 ease-in-out outline-none md:text-3xl end-0 md:w-14 hover:text-heading focus:outline-none'
                  onClick={() => setKeyword('')}
                >
                  <svg
                    stroke='currentColor'
                    fill='currentColor'
                    strokeWidth='0'
                    viewBox='0 0 512 512'
                    className='w-6 h-6'
                    height='1em'
                    width='1em'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill='none'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='32'
                      d='M368 368L144 144m224 0L144 368'
                    ></path>
                  </svg>
                </button>
              </form>
            </div>

            {isLoaded ? (
              products ? (
                products.length > 0 ? (
                  <div className='bg-white flex flex-col rounded-md overflow-hidden h-full max-h-[64vh] lg:h-[550px]'>
                    <OverlayScrollbarsComponent
                      options={{ scrollbars: { autoHide: true } }}
                      defer
                    >
                      <div className='h-full'>
                        {products.map((item) => (
                          <div
                            key={item._id}
                            className=' p-5 border-b border-gray-150 relative last:border-b-0 transition-all hover:bg-gray-300'
                          >
                            <Link
                              className='group w-full h-auto flex justify-start items-center'
                              to={'/products/' + item.path}
                              onClick={() => setShowSearchForm(false)}
                            >
                              <div className='relative flex w-24 h-24 rounded-md overflow-hidden bg-gray-200 flex-shrink-0 cursor-pointer me-4'>
                                <span className='box-border inline-block overflow-hidden opacity-100 m-0 p-0 relative max-w-full'>
                                  <span className='box-border block opacity-100 m-0 p-0 max-w-full'>
                                    <img
                                      alt=''
                                      aria-hidden='true'
                                      src={item.thumbnail}
                                      className='block max-w-full opacity-100 m-0 p-0'
                                    />
                                  </span>
                                </span>
                              </div>
                              <div className='flex flex-col w-full overflow-hidden'>
                                <h3 className='truncate text-base font-semibold text-heading mb-2'>
                                  {item.product_name}
                                </h3>
                                {item.discount && (
                                  <del className='text-sm'>
                                    {item.min_price === item.max_price
                                      ? `${
                                          (item.min_price *
                                            item.discount.discount_percent) /
                                          100
                                        } VND`
                                      : `${item.min_price} VND - ${item.max_price} VND`}
                                  </del>
                                )}
                                <div className='text-heading font-segoe text-sm 3xl:mt-0.5 pe-2 md:pe-0 lg:pe-2 2xl:pe-0'>
                                  {item.min_price === item.max_price
                                    ? `${item.min_price} VND`
                                    : `${item.min_price} VND - ${item.max_price} VND`}
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </OverlayScrollbarsComponent>
                  </div>
                ) : (
                  <div className='bg-white flex flex-col rounded-md overflow-hidden h-full max-h-[64vh] lg:max-h-[550px]'>
                    <span className='py-4 px-6'>
                      Không tìm thấy sản phẩm nào
                    </span>
                  </div>
                )
              ) : (
                <></>
              )
            ) : (
              <div className='bg-white rounded-md overflow-hidden h-full max-h-[64vh] lg:max-h-[550px] text-center'>
                <div class='lds-ellipsis'>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
