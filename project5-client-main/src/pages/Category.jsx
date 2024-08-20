import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BannerCategory from '../components/category/BannerCategory';
import Main from '../components/category/MainCategory';
import Subscribe from '../components/home/subscribe/Subscribe';
import { getByPath as getByPathCategory } from '../services/category';
import { getByPath as getByPathSubCategory } from '../services/subCategory';
import { searchProducts } from '../services/product';

export default function Category({ setTitle }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const params = useParams();
  const [searchParams] = useSearchParams();

  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [products, setProducts] = useState([]);

  const [optionSearch, setOptionSearch] = useState({
    page: 1,
    pageSize: 10,
  });

  useEffect(() => {
    setTitle(
      (category?.category_name || subCategory?.sub_category_name || '') +
        ' | Artemis'
    );
  }, [setTitle, category, subCategory]);

  const handleSearchProducts = useCallback((options) => {
    return searchProducts(options).then((item) => setProducts(item));
  }, []);

  useEffect(() => {
    if (!searchParams.get('sub'))
      getByPathCategory({
        path: params.slug,
      })
        .then((res) => {
          setSubCategory();
          setCategory(res);
          optionSearch.category = res.id;
          handleSearchProducts(optionSearch);
        })
        .catch((err) => toast.error(err.response.data.message));
    else {
      getByPathSubCategory(searchParams.get('sub'))
        .then((res) => {
          setCategory();
          setSubCategory(res);
          optionSearch.category_sub = res.id;
          handleSearchProducts(optionSearch);
        })
        .catch((err) => toast.error(err.response.data.message));
    }
  }, [params, searchParams, handleSearchProducts, optionSearch]);

  return (
    <>
      <div className='border-t-2 border-borderBottom'>
        <div className='mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16'>
          <BannerCategory
            name={category?.category_name || subCategory?.sub_category_name}
          />

          <Main
            products={products}
            optionSearch={optionSearch}
            setOptionSearch={setOptionSearch}
          />

          <Subscribe
            classes={
              '!bg-opacity-100 !sm:px-8 !md:px-16 !2xl:px-24 items-center !md:py-14 !xl:px-[4rem] !lg:py-16'
            }
          />
        </div>
      </div>
    </>
  );
}
