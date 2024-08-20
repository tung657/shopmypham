import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPassword } from '../services/auth';

// i is _id, name is username
export default function ResetPassword({ setTitle }) {
  useEffect(() => {
    setTitle('Reset Mật Khẩu | Artemis');
  }, [setTitle]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState();

  useEffect(() => {
    if (searchParams.get('email')) {
      resetPassword({
        email: searchParams.get('email'),
      })
        .then((res) => {
          setNewPassword(res.data.data.newPass);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
  }, [searchParams]);

  return (
    <>
      <div className='mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16 py-4'>
        <div className='flex justify-center items-center min-h-[50vh]'>
          <div className='max-w-md bg-white border border-gray-200 rounded-lg shadow-md min-w-[30vw]'>
            <div className='p-5 text-center'>
              <h1 className='text-2xl font-bold mb-4 uppercase'>
                Your Password
              </h1>
              <h2 className='font-semibold py-6 px-4 bg-gray-100 tracking-wider text-xl'>
                {newPassword ? newPassword : ''}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
