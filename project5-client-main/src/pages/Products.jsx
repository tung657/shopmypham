import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import Subscribe from '../components/home/subscribe/Subscribe';
import Filter from '../components/product/Filter';
import FilterMobile from '../components/product/FilterMobile';
import Main from '../components/product/MainProduct';
import AlertProduct from '../components/shared/Alert/AlertProduct';
import { search as searchBrands } from '../services/brand';
import { searchProducts } from '../services/product';

const initBreadcrumb = [
  {
    name: 'Sản phẩm',
  },
];

export default function Products({ setTitle }) {
  const [breadcrumbs] = useState(initBreadcrumb);
  const [products, setProducts] = useState();

  const { categories } = useOutletContext();

  const [brands, setBrands] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedBrand, setSelectedBrand] = useState();
  const [priceFilter, setPriceFilter] = useState('');
  const [sortSelected, setSortSelected] = useState('');
  const [showFilterMobile, setShowFilterMobile] = useState(false);

  const [optionSearch, setOptionSearch] = useState({
    page: 1,
    pageSize: 10,
  });

  useEffect(() => {
    setTitle('Sản Phẩm | Artemis');
  }, [setTitle]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    optionSearch.category = selectedCategory?.id;
    optionSearch.brand = selectedBrand?.id;
    optionSearch.priceFilter = priceFilter;
    optionSearch.sort = sortSelected?.value ?? '';
    searchProducts(optionSearch).then((res) => setProducts(res));
  }, [selectedBrand, selectedCategory, priceFilter, sortSelected, optionSearch]);

  useEffect(() => {
    searchBrands().then((res) => setBrands(res));
  }, []);

  return (
    <>
      <AlertProduct
        content={'Đã có 13 sản phẩm mới với ưu đãi vô cùng hấp dẫn.'}
      />
      <div className='mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16'>
        <div className='flex pt-8 pb-16 lg:pb-20'>
          <Filter
            breadcrumbs={breadcrumbs}
            categories={categories}
            brands={brands}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceFilter={priceFilter}
            setPriceFilter={setPriceFilter}
          />
          <Main
            products={products}
            optionSearch={optionSearch}
            setOptionSearch={setOptionSearch}
            sortSelected={sortSelected}
            setSortSelected={setSortSelected}
            setShowFilterMobile={setShowFilterMobile}
          />
        </div>

        <Subscribe
          classes={
            '!bg-opacity-100 !sm:px-8 !md:px-16 !2xl:px-24 items-center !md:py-14 !xl:px-[4rem] !lg:py-16'
          }
        />
      </div>

      <FilterMobile
        breadcrumbs={breadcrumbs}
        categories={categories}
        brands={brands}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        showFilterMobile={showFilterMobile}
        setShowFilterMobile={setShowFilterMobile}
        products={products}
      />
    </>
  );
}
