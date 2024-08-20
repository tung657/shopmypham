import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getByIdClient, verify } from '../services/auth';

// i is _id, name is username
export default function Verify({ setTitle }) {
  useEffect(() => {
    setTitle('Xác Thực Tài Khoản | Artemis');
  }, [setTitle]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchParams] = useSearchParams();
  const [id, setId] = useState();
  const [username, setUsername] = useState();
  const [user, setUser] = useState();

  const [messageVerify, setMessageVerify] = useState('');

  useEffect(() => {
    if (searchParams) {
      setId(searchParams.get('i'));
      setUsername(searchParams.get('name'));
    }
  }, [searchParams]);

  useEffect(() => {
    if (id)
      getByIdClient(id)
        .then((res) => setUser(res))
        .catch((err) => {
          toast.error(err.response.data.message);
        });
  }, [id]);

  useEffect(() => {
    if (user) {
      verify(user)
        .then((res) => {
          toast.success(res.data.message);
          setMessageVerify(res.data.message);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setMessageVerify(err.response.data.message);
        });
    }
  }, [user]);

  return (
    <>
      <div className='mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16 bg-gray-100 py-4'>
        <div className='flex justify-center items-center min-h-[50vh]'>
          <div className='max-w-md bg-white border border-gray-200 rounded-lg shadow-md'>
            <div>
              <img
                className='rounded-t-lg'
                src={require('../assets/images/others/welcome.jpg')}
                alt=''
              />
            </div>
            <div className='p-5 text-center'>
              {user ? (
                <>
                  <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>
                    Chào mừng bạn ({username}) đến với Artemis Store
                  </h5>
                  <div className='mb-3 font-normal text-gray-700'>
                    {messageVerify} <br /> Cảm ơn bạn đã tin tưởng Artemis
                    Store.
                  </div>
                </>
              ) : (
                <div className='mb-3 font-normal text-gray-700'>
                  Có gì đó không đúng 😫!
                </div>
              )}
              <Link
                to='/'
                className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300'
              >
                Mua Sắm Thôi Nào
                <svg
                  aria-hidden='true'
                  className='w-4 h-4 ml-2 -mr-1'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
