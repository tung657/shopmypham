import { useState } from 'react';
import { useEffect } from 'react';
import HeaderBrand from '../components/brand/HeaderBrand';
import MainBrand from '../components/brand/MainBrand';
import { search as searchBrands } from '../services/brand';
import Subscribe from '../components/home/subscribe/Subscribe';

export default function Brand({ setTitle }) {
  useEffect(() => {
    setTitle('Danh Sách Thương Hiệu | Artemis ');
  }, [setTitle]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [brands, setBrands] = useState();
  const [isGrid, setIsGrid] = useState(false);

  useEffect(() => {
    searchBrands().then((res) => setBrands(res));
  }, []);

  return (
    <>
      <div className='border-t border-gray-300 pt-10 lg:pt-12 xl:pt-14 pb-14 lg:pb-16 xl:pb-20 px-4 md:px-8'>
        <div className='w-full xl:max-w-[1170px] mx-auto'>
          <HeaderBrand setIsGrid={setIsGrid} isGrid={isGrid} />
          <MainBrand brands={brands} isGrid={isGrid} />
        </div>
      </div>
      <div className='mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16'>
        <Subscribe
          classes={
            '!bg-opacity-100 !sm:px-8 !md:px-16 !2xl:px-24 items-center !md:py-14 !xl:px-[4rem] !lg:py-16'
          }
        />
      </div>
    </>
  );
}
