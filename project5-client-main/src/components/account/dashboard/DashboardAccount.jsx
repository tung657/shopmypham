import { Link } from 'react-router-dom';

export default function DashboardAccount({ user }) {
  return (
    <>
      <div className='md:w-4/6 2xl:w-8/12 mt-4 md:mt-0'>
        <h2 className='text-lg md:text-xl xl:text-2xl font-bold text-heading mb-3 xl:mb-5'>
          Bảng Điều Khiển
        </h2>
        <p className=' text-sm leading-7 md:text-base md:leading-loose lowercase'>
          Từ bảng điều khiển này bạn có thể xem{' '}
          <Link
            className='text-heading underline font-semibold'
            to={`/account/${user?.path}/my-orders`}
          >
            đơn hàng gần nhất
          </Link>
          , quản lý{' '}
          <Link
            className='text-heading underline font-semibold'
            to={`/account/${user?.path}/account-details`}
          >
            thông tin tài khoản
          </Link>{' '}
          của bạn và{' '}
          <Link
            className='text-heading underline font-semibold'
            to={`/account/${user?.path}/change-password`}
          >
            thay đổi mật khẩu
          </Link>
          .
        </p>
      </div>
    </>
  );
}
