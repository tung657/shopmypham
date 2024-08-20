import { useEffect, useState } from 'react';
import Banner from '../components/home/banner/Banner';
import ShopByCategory from '../components/home/category/ShopByCategory';
import Collection from '../components/home/collection/Collection';
import Exclusive from '../components/home/exclusive/Exclusive';
import FeaturedProduct from '../components/home/featured/FeaturedProduct';
import NewProduct from '../components/home/new/NewProduct';
import SellingProduct from '../components/home/selling/SellingProduct';
import SocialHome from '../components/home/social/SocialHome';
import Subscribe from '../components/home/subscribe/Subscribe';
import { search as searchCollection } from '../services/collection';
import {
  searchFeaturedProducts,
  searchSellingProducts,
} from '../services/product';

export default function Home({ setTitle }) {
  useEffect(() => {
    setTitle('God of Hunt | Artemis');
  }, [setTitle]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [collections, setCollections] = useState();
  const [featuredProducts, setFeaturedProducts] = useState();
  const [sellingProducts, setSellingProducts] = useState();

  useEffect(() => {
    searchCollection().then((res) => setCollections(res));
  }, []);

  useEffect(() => {
    searchFeaturedProducts({
      page: 1,
      pageSize: 5,
    }).then((res) => setFeaturedProducts(res));
  }, []);

  useEffect(() => {
    searchSellingProducts({
      page: 1,
      pageSize: 9,
    }).then((res) => setSellingProducts(res));
  }, []);

  return (
    <>
      <Collection collections={collections} />
      <div className='mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16'>
        <ShopByCategory />
        {featuredProducts && featuredProducts?.length > 0 &&
          <FeaturedProduct featuredProducts={featuredProducts} />
        }
        <Banner collection={collections && collections[4]} />
        <SellingProduct sellingProducts={sellingProducts} />
        <Exclusive />
        <NewProduct newProducts={sellingProducts} />
        <SocialHome />
        <Subscribe classes={'xl:px-0'} />
      </div>
    </>
  );
}
