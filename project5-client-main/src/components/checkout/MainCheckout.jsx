import { useEffect, useState } from 'react';
import Subscribe from '../home/subscribe/Subscribe';
import LeftCheckout from './LeftCheckout';
import RightCheckout from './RightCheckout';

export default function MainCheckout({ user, handleUpdateCustomerInfo }) {
  const [total, setTotal] = useState();
  const [showDialogDelivery, setShowDialogDelivery] = useState(false);

  useEffect(() => {
    let result = 0;
    if (user) {
      if (user.carts && user.carts?.length > 0) {
        user.carts.forEach(
          (item) => (item.product_price = item.product_price.replace(',', ''))
        );
        result = user.carts.reduce((prev, curr) => {
          if (curr.checked) return prev + curr.product_price * curr.quantity;
          else return prev;
        }, 0);
      }
    }
    setTotal(result);
  }, [user]);

  return (
    <>
      <div className='mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16'>
        <div className='py-14 xl:py-20 px-0 2xl:max-w-screen-2xl xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full'>
          <LeftCheckout
            user={user}
            showDialogDelivery={showDialogDelivery}
            setShowDialogDelivery={setShowDialogDelivery}
            handleUpdateCustomerInfo={handleUpdateCustomerInfo}
            total={total}
          />
          <RightCheckout user={user} total={total} />
        </div>
        <Subscribe
          classes={
            '!bg-opacity-100 !sm:px-8 !md:px-16 !2xl:px-24 items-center !md:py-14 !xl:px-[4rem] !lg:py-16'
          }
        />
      </div>
    </>
  );
}
