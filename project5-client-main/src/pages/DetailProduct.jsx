import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router';
import Main from '../components/detailProduct/MainDetailProduct';
import Breadcrumb from '../components/shared/breadcrum/Breadcrum';
import Hr from '../components/shared/hr/Hr';
import { getByPath } from '../services/product';

const initBreadcrumb = [
  {
    link: '/products',
    name: 'Sản phẩm',
  },
];

export default function DetailProduct({ setTitle }) {
  const params = useParams();

  const { user, handleUpdateCustomerInfo } = useOutletContext();

  const [breadcrumbs, setBreadcrumbs] = useState();
  const [product, setProduct] = useState();

  useEffect(() => {
    if (params) getByPath(params.slug).then((res) => setProduct(res));
  }, [params]);

  useEffect(() => {
    if (product)
      setBreadcrumbs([
        ...initBreadcrumb,
        {
          name: product.product_name,
        },
      ]);
  }, [product]);

  useEffect(() => {
    if (product) setTitle(product.product_name + ' | Artemis');
  }, [product, setTitle]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hr />
      <div className='mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16'>
        <div className='pt-8'>
          <Breadcrumb breadcrumbs={breadcrumbs} />
        </div>
        <Main product={product} user={user} handleUpdateCustomerInfo={handleUpdateCustomerInfo} />
      </div>
    </>
  );
}
