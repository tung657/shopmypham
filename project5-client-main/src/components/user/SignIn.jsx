import { useTransition, animated } from '@react-spring/web';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../../services/auth';
import {
  setLocalStorage,
  setSessionStorage,
} from '../../utils/storage/storage';
import ForgotPassword from './ForgotPassword';

export default function SignIn({ showDialog, setShowDialog, setIsLogin }) {
  const transitions = useTransition(showDialog, {
    from: { opacity: 0, scale: 1.2 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 1.1 },
    reverse: showDialog,
    config: { duration: 150 },
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(false);
  const [user, setUser] = useState();

  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();

    const data = {
      username,
      password,
      type: 'client',
    };
    login(data)
      .then((res) => {
        setUser(res.data.data);
        toast.success(res.data.message, {
          autoClose: 1000,
        });

        if (isRemember)
          setLocalStorage('user', {
            path: res.data.data.username,
            token: res.data.data.accessToken,
          });
        else
          setSessionStorage('user', {
            path: res.data.data.username,
            token: res.data.data.accessToken,
          });
        
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <ForgotPassword showDialog={showForgotPassword} setShowDialog={setShowForgotPassword} />
      {transitions(
        (styles, item) =>
          item && (
            <animated.div
              style={{
                opacity: styles.opacity.to({
                  range: [0.0, 1.0],
                  output: [0, 1],
                }),
              }}
              className='modal-root fixed bg-black bg-opacity-70 inset-0 z-50 cursor-pointer p-4 md:p-5 opacity-100'
            >
              <animated.div
                // style={scale}
                style={styles}
                className='relative h-full mx-auto w-full'
              >
                <div className='w-full md:w-auto absolute left-1/2 transform -translate-x-1/2 shadow-xl h-auto max-h-full top-1/2 -translate-y-1/2 rounded-lg'>
                  <button
                    aria-label='Close panel'
                    className='fixed z-10 inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-white shadow text-gray-600 transition duration-200 focus:outline-none focus:text-gray-800 focus:shadow-md hover:text-gray-800 hover:shadow-md -top-3 md:-top-4 -right-3 rtl:-left-3 md:-right-4 rtl:md:-left-4'
                    onClick={() => setShowDialog(false)}
                  >
                    <svg
                      stroke='currentColor'
                      fill='currentColor'
                      strokeWidth='0'
                      viewBox='0 0 512 512'
                      className='text-xl'
                      height='1em'
                      width='1em'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z'></path>
                    </svg>
                  </button>
                  <div
                    className='overflow-y-auto h-full rounded-lg'
                    // style='max-height: calc(100vh - 120px);'
                  >
                    <div className='overflow-hidden bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300 py-5 px-5 sm:px-8'>
                      <div className='text-center mb-6 pt-2.5'>
                        <div>
                          <Link
                            className='inline-flex focus:outline-none'
                            to='/'
                            onClick={() => setShowDialog(false)}
                          >
                            <span className='box-border inline-block overflow-hidden w-24 h-8 opacity-100 m-0 p-0 relative'>
                              <img
                                alt='ChawkBazar'
                                src={
                                  require('../../assets/images/logos/logo.svg')
                                    .default
                                }
                                className='absolute box-border p-0 m-auto block w-0 h-0 min-w-full max-w-full min-h-full max-h-full'
                              />
                            </span>
                          </Link>
                        </div>
                        <p className='text-sm md:text-base text-body mt-2 mb-8 sm:mb-10'>
                          Chào Mừng Bạn Đến Với <b>Artemis</b>
                        </p>
                      </div>
                      <form
                        className='flex flex-col justify-center'
                        noValidate=''
                      >
                        <div className='flex flex-col space-y-3.5'>
                          <div className='block'>
                            <label
                              htmlFor='email'
                              className='block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer'
                            >
                              Tài Khoản hoặc Email
                            </label>
                            <input
                              id='email'
                              name='email'
                              type='text'
                              placeholder=''
                              className='py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12 rounded-md'
                              autoComplete='off'
                              spellCheck='false'
                              aria-invalid='false'
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                            />
                          </div>
                          <div className='block'>
                            <label
                              htmlFor='password'
                              className='block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer'
                            >
                              Mật Khẩu
                            </label>
                            <div className='relative'>
                              <input
                                id='password'
                                name='password'
                                type='password'
                                className='py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border border-gray-500 text-input text-xs lg:text-sm font-body rounded-md placeholder-gray-600 bg-white focus:outline-none focus:border-heading h-11 md:h-12'
                                autoComplete='off'
                                autoCapitalize='off'
                                spellCheck='false'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <label
                                htmlFor='password'
                                className='absolute end-4 top-5 -mt-2 text-gray-500 cursor-pointer'
                              >
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  stroke='currentColor'
                                  className='w-6 h-6'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                                  ></path>
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                                  ></path>
                                </svg>
                              </label>
                            </div>
                          </div>
                          <div className='flex items-center justify-center'>
                            <div className='flex items-center flex-shrink-0'>
                              <label className='switch relative inline-block w-10 cursor-pointer'>
                                <input
                                  id='remember'
                                  type='checkbox'
                                  className='opacity-0 w-0 h-0'
                                  name='remember_me'
                                  value={isRemember}
                                  checked={isRemember}
                                  onChange={() => setIsRemember(!isRemember)}
                                />
                                <span className='bg-gray-500 absolute inset-0 transition-all duration-300 ease-in slider round'></span>
                              </label>
                              <label
                                htmlFor='remember'
                                className='flex-shrink-0 text-sm text-heading ps-3 cursor-pointer'
                              >
                                Nhớ Mật Khẩu
                              </label>
                            </div>
                            <div className='flex ms-auto'>
                              <button
                                type='button'
                                className='text-end text-sm text-heading ps-3 underline hover:no-underline focus:outline-none'
                                onClick={()=>setShowForgotPassword(true)}
                              >
                                Quên Mật Khẩu?
                              </button>
                            </div>
                          </div>
                          <div className='relative'>
                            <button
                              data-variant='flat'
                              className={
                                'text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none rounded-md   text-white px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:shadow-cart h-11 md:h-12 w-full mt-1.5 ' +
                                (user
                                  ? 'bg-gray-500'
                                  : ' hover:bg-gray-600 bg-heading')
                              }
                              type='submit'
                              onClick={handleSignIn}
                              disabled={user}
                            >
                              Đăng Nhập
                            </button>
                          </div>
                        </div>
                      </form>
                      <div className='flex flex-col items-center justify-center relative text-sm text-heading mt-6 mb-3.5'>
                        <hr className='w-full border-gray-300' />
                        <span className='absolute -top-2.5 px-2 bg-white'>
                          Hoặc
                        </span>
                      </div>
                      <button
                        data-variant='flat'
                        className='text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none rounded-md  bg-heading text-white px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-gray-600 hover:shadow-cart h-11 md:h-12 w-full mt-2.5 bg-facebook hover:bg-facebookHover'
                      >
                        <svg
                          stroke='currentColor'
                          fill='currentColor'
                          strokeWidth='0'
                          version='1.1'
                          viewBox='0 0 16 16'
                          className='text-sm sm:text-base me-1.5'
                          height='1em'
                          width='1em'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path d='M14.5 0h-13c-0.825 0-1.5 0.675-1.5 1.5v13c0 0.825 0.675 1.5 1.5 1.5h6.5v-7h-2v-2h2v-1c0-1.653 1.347-3 3-3h2v2h-2c-0.55 0-1 0.45-1 1v1h3l-0.5 2h-2.5v7h4.5c0.825 0 1.5-0.675 1.5-1.5v-13c0-0.825-0.675-1.5-1.5-1.5z'></path>
                        </svg>
                        Đăng Nhập với Facebook
                      </button>
                      <button
                        data-variant='flat'
                        className='text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none rounded-md  bg-heading text-white px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-gray-600 hover:shadow-cart h-11 md:h-12 w-full mt-2.5 bg-google hover:bg-googleHover'
                      >
                        <svg
                          stroke='currentColor'
                          fill='currentColor'
                          strokeWidth='0'
                          version='1.1'
                          viewBox='0 0 16 16'
                          className='text-sm sm:text-base me-1.5'
                          height='1em'
                          width='1em'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path d='M14.5 0h-13c-0.825 0-1.5 0.675-1.5 1.5v13c0 0.825 0.675 1.5 1.5 1.5h13c0.825 0 1.5-0.675 1.5-1.5v-13c0-0.825-0.675-1.5-1.5-1.5zM8.119 14c-3.316 0-6-2.684-6-6s2.684-6 6-6c1.619 0 2.975 0.591 4.019 1.569l-1.628 1.569c-0.447-0.428-1.225-0.925-2.391-0.925-2.050 0-3.719 1.697-3.719 3.787s1.672 3.787 3.719 3.787c2.375 0 3.266-1.706 3.403-2.588h-3.403v-2.056h5.666c0.050 0.3 0.094 0.6 0.094 0.994 0.003 3.428-2.294 5.863-5.759 5.863z'></path>
                        </svg>
                        Đăng Nhập Với Google
                      </button>
                      <div className='text-sm sm:text-base text-body text-center mt-5 mb-1'>
                        Bạn Chưa Có Tài Khoản?{' '}
                        <button
                          type='button'
                          className='text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none'
                          onClick={() => setIsLogin(false)}
                        >
                          Đăng Ký
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </animated.div>
            </animated.div>
          )
      )}
    </>
  );
}
