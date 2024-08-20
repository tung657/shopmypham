import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import PasswordAccount from '../../components/account/password/PasswordAccount';
import SidebarAccount from '../../components/account/SidebarAccount';
import Subscribe from '../../components/home/subscribe/Subscribe';
import BannerExplore from '../../components/shared/banner/BannerExplore';
import { getByPath as getByPathCustomer } from '../../services/customer';

export default function AccountPasswordPage({ setTitle }) {
  const params = useParams();
  const [user, setUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    setTitle('Đổi Mật Khẩu | Artemis')
  }, [setTitle]);

  useEffect(() => {
    if (params && params?.slug) {
      getByPathCustomer(params.slug)
        .then((res) => setUser(res))
        .catch((err) => {
          // toast.error(err.response.data.message);
          navigate('/');
        });
    }
  }, [params, navigate]);

  return (
    <>
      <BannerExplore
        title={`Thông Tin ${
          user ? user.first_name + ' ' + user.last_name : ''
        }`}
      />

      <div className='mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16'>
        <div className='py-16 lg:py-20 px-0 xl:max-w-screen-xl mx-auto flex md:flex-row w-full'>
          <div className='flex flex-col md:flex-row w-full'>
            <SidebarAccount user={user} />
            <PasswordAccount user={user} />
          </div>
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
