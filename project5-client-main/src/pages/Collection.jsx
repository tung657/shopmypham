import { useEffect, useState } from 'react';
import SidebarCollection from '../components/collection/SidebarCollection';
import Main from '../components/product/MainProduct';
import { searchProducts } from '../services/product';
import { getByPath, search as searchCollections } from '../services/collection';
import { useParams } from 'react-router-dom';
import Subscribe from '../components/home/subscribe/Subscribe';
import SidebarMobile from '../components/collection/SidebarMobile';

const initBreadcrumb = [
  {
    name: 'Bộ Sưu Tập',
    link: '/products',
  },
  {
    name: 'Man',
  },
];

export default function Collection({ setTitle }) {
  const [breadcrumbs] = useState(initBreadcrumb);

  const params = useParams();

  const [products, setProducts] = useState();
  const [collections, setCollections] = useState();
  const [selectedCollection, setSelectedCollection] = useState();

  const [sortSelected, setSortSelected] = useState('');
  const [showFilterMobile, setShowFilterMobile] = useState(false);

  const [optionSearch, setOptionSearch] = useState({
    page: 1,
    pageSize: 10,
  });

  useEffect(() => {
    setTitle('Bộ Sưu Tập | Artemis');
  }, [setTitle]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selectedCollection)
    {
      optionSearch.collect = selectedCollection?.id;
      optionSearch.sort = sortSelected?.id;
      searchProducts(optionSearch).then((res) => setProducts(res));
    }
    else
      setProducts([]);
  }, [sortSelected, selectedCollection, optionSearch]);

  useEffect(() => {
    searchCollections().then((res) => setCollections(res));
  }, []);

  useEffect(() => {
    if (params) {
      getByPath(params.slug).then((res) => setSelectedCollection(res));
    }
  }, [params]);

  return (
    <>
      <div className='mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16'>
        <div className='flex pt-8 pb-16 lg:pb-20'>
          <SidebarCollection
            breadcrumbs={breadcrumbs}
            collections={collections}
            setSelectedCollection={setSelectedCollection}
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

      <SidebarMobile
        breadcrumbs={breadcrumbs}
        showFilterMobile={showFilterMobile}
        setShowFilterMobile={setShowFilterMobile}
        products={products}
        collections={collections}
        setSelectedCollection={setSelectedCollection}
      />
    </>
  );
}
