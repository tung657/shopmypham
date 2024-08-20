import { useEffect } from 'react';
import { useState } from 'react';
import Breadcrumb from '../shared/breadcrum/Breadcrum';

const priceFilters = [
  {
    name: 'Tất Cả',
    value: '',
  },
  {
    name: 'Dưới ₫100K',
    value: '<100',
  },
  {
    name: 'Từ ₫100K - ₫500K',
    value: '100-500',
  },
  {
    name: 'Từ ₫500K - ₫2Tr',
    value: '500-2000',
  },
  {
    name: 'Trên ₫2Tr',
    value: '>2000',
  },
];

export default function Filter({
  breadcrumbs,
  categories,
  brands,
  selectedBrand,
  selectedCategory,
  setSelectedBrand,
  setSelectedCategory,
  priceFilter,
  setPriceFilter,
}) {
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    let arr = JSON.parse(JSON.stringify(filters));
    const index = arr.findIndex((item) => item.type === 'category');
    if (index >= 0) arr = arr.filter((item) => item.type !== 'category');
    if (selectedCategory) {
      setFilters([
        ...arr,
        {
          _id: selectedCategory._id,
          name: selectedCategory.category_name,
          type: 'category',
          id: selectedCategory.id,
        },
      ]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  useEffect(() => {
    let arr = JSON.parse(JSON.stringify(filters));
    const index = arr.findIndex((item) => item.type === 'brand');
    if (index >= 0) arr = arr.filter((item) => item.type !== 'brand');
    if (selectedBrand) {
      setFilters([
        ...arr,
        {
          _id: selectedBrand._id,
          name: selectedBrand.brand_name,
          type: 'brand',
          id: selectedBrand.id,
        },
      ]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBrand]);

  const handleRemoveFilter = (item, index) => {
    switch (item.type) {
      case 'category':
        setSelectedCategory();
        break;
      case 'brand':
        setSelectedBrand();
        break;
      case 'price':
        setPriceFilter();
        break;
      default:
        break;
    }

    let arr = JSON.parse(JSON.stringify(filters));
    arr.splice(index, 1);

    setFilters(arr);
  };

  const scrollTo = () => {
    window.scrollTo(0, 80);
  };

  return (
    <>
      <div className='flex-shrink-0 pe-24 hidden lg:block w-96'>
        <div className='sticky top-[50px]'>
          <div className='pb-7'>
            <Breadcrumb breadcrumbs={breadcrumbs} />
          </div>
          <div className='pt-1'>
            <div className='block border-b border-gray-300 pb-7 mb-7'>
              <div className='flex items-center justify-between mb-2.5'>
                <h2 className='font-semibold text-heading text-xl md:text-2xl'>
                  Bộ Lọc
                </h2>
                <button
                  className='flex-shrink text-xs mt-0.5 transition duration-150 ease-in focus:outline-none hover:text-heading capitalize'
                  aria-label='Clear All'
                  onClick={() => setFilters()}
                >
                  Xóa tất cả
                </button>
              </div>
              <div className='flex flex-wrap -m-1.5 pt-2'>
                {filters &&
                  filters?.length > 0 &&
                  filters.map((item, index) => (
                    <div
                      key={index}
                      className='group flex flex-shrink-0 m-1.5 items-center border border-gray-300 bg-borderBottom rounded-lg text-xs px-3.5 py-2.5 capitalize text-heading cursor-pointer transition duration-200 ease-in-out hover:border-heading'
                      onClick={() => handleRemoveFilter(item, index)}
                    >
                      {item.name}
                      <svg
                        stroke='currentColor'
                        fill='currentColor'
                        strokeWidth='0'
                        viewBox='0 0 512 512'
                        className='text-sm text-body ms-2 flex-shrink-0 -me-0.5 mt-0.5 transition duration-200 ease-in-out group-hover:text-heading'
                        height='1em'
                        width='1em'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z'></path>
                      </svg>
                    </div>
                  ))}
              </div>
            </div>
            <div className='block border-b border-gray-300 pb-7 mb-7'>
              <h3 className='text-heading text-base md:text-lg font-semibold mb-7'>
                Danh Mục
              </h3>
              <div className='flex flex-wrap gap-2'>
                {categories &&
                  categories.map((item) => (
                    <div
                      key={item._id}
                      className={
                        'group flex flex-shrink-0 items-center border border-gray-500 rounded-lg text-xs px-3.5 py-2.5 capitalize text-heading cursor-pointer transition duration-200 ease-in-out hover:border-heading ' +
                        (item._id === selectedCategory?._id
                          ? 'border-heading'
                          : '')
                      }
                      onClick={() => {
                        setSelectedCategory(item);
                        scrollTo();
                      }}
                    >
                      <span className='font-semibold'>
                        {item.category_name}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
            <div className='block border-b border-gray-300 pb-7 mb-7'>
              <h3 className='text-heading text-base md:text-lg font-semibold mb-7'>
                Thương Hiệu
              </h3>
              <div className='flex flex-wrap gap-2'>
                {brands &&
                  brands.map((item) => (
                    <div
                      key={item._id}
                      className={
                        'group flex flex-shrink-0 items-center border border-gray-500 rounded-lg text-xs px-3.5 py-2.5 capitalize text-heading cursor-pointer transition duration-200 ease-in-out hover:border-heading ' +
                        (item._id === selectedBrand?._id
                          ? 'border-heading'
                          : '')
                      }
                      onClick={() => {
                        setSelectedBrand(item);
                        scrollTo();
                      }}
                    >
                      <span className='font-semibold'>{item.brand_name}</span>
                    </div>
                  ))}
              </div>
            </div>
            <div className='block border-b border-gray-300 pb-7 mb-7'>
              <h3 className='text-heading text-sm md:text-base font-semibold mb-7'>
                Giá
              </h3>
              <div className='mt-2 flex flex-col space-y-4'>
                {priceFilters &&
                  priceFilters.map((item, index) => (
                    <label
                      key={index}
                      className='group flex items-center text-heading text-sm cursor-pointer'
                    >
                      <input
                        type='radio'
                        className='form-radio w-5 h-5 border border-gray-300 cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-heading checked:hover:bg-heading checked:focus:bg-heading rounded-full'
                        name='price-filter'
                        defaultChecked={item.value === priceFilter}
                        value={item.value}
                        onClick={(e) => {
                          setPriceFilter(e.target.value);
                          scrollTo();
                        }}
                      />
                      <span className='ms-4 -mt-0.5'>{item.name}</span>
                    </label>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
