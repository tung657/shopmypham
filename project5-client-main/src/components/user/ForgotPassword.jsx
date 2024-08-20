import { useTransition, animated } from '@react-spring/web';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sendResetPassword } from '../../services/email';
import { resetPasswordValidator } from '../../utils/validator/userValidator';
// import { toast } from 'react-toastify';
// import { resetPassword } from '../../services/auth';

export default function ForgotPassword({
  showDialog,
  setShowDialog,
}) {
  const transitions = useTransition(showDialog, {
    from: { opacity: 0, scale: 1.2 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 1.1 },
    reverse: showDialog,
    config: { duration: 150 },
  });

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [validateMessages, setValidateMessages] = useState([]);

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const dataPost = {
      email,
      href: window.location.origin + `/account/reset-password?email=${email}`,
    };

    const validator = resetPasswordValidator(dataPost);

    let arrMessages = [];
    setValidateMessages(arrMessages);
    if (validator.error) {
      arrMessages = validator.error.details.reduce(
        (prev, curr) => [
          ...prev,
          {
            key: curr.context.key,
            message: curr.message,
          },
        ],
        []
      );
      setIsLoading(false);
      setValidateMessages(arrMessages);
    } else {
      sendResetPassword(dataPost)
        .then((res) => {
          toast.success(res.data.message, {
            icon: '🚀',
          });
          setTimeout(() => {
            toast.info(
              'Chúng tôi đã gửi một yêu cầu reset mật khẩu tới email: ' +
                dataPost.email +
                ' của bạn.',
              {
                icon: '🦄',
              }
            );
          }, 500);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          if (err.response.status !== 422)
            toast.error(err.response.data.message, {
              icon: '🐔',
            });
          else
            toast.warning(err.response.data.message, {
              icon: '🐔',
            });
        });
    }
  };

  return (
    <>
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
              className='modal-root fixed bg-black bg-opacity-70 inset-0 cursor-pointer p-4 md:p-5 opacity-100 z-[100]'
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
                              Email
                            </label>
                            <input
                              id='email'
                              name='email'
                              type='email'
                              placeholder=''
                              className={
                                'py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 bg-white  focus:outline-none focus:border-heading h-11 md:h-12 rounded-md ' +
                                (validateMessages.find(
                                  (message) => message.key === 'email'
                                )
                                  ? 'border-red-600'
                                  : 'border-gray-300')
                              }
                              autoComplete='off'
                              spellCheck='false'
                              aria-invalid='false'
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <small className='text-red-500 font-medium'>
                              {validateMessages.map((message) =>
                                message.key === 'username'
                                  ? message.message
                                  : null
                              )}
                            </small>
                          </div>
                          <div className='relative'>
                            <button
                              data-variant='flat'
                              className={
                                'text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none rounded-md   text-white px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:shadow-cart h-11 md:h-12 w-full mt-1.5 ' +
                                (isLoading
                                  ? 'bg-gray-500'
                                  : ' hover:bg-gray-600 bg-heading')
                              }
                              type='submit'
                              onClick={handleForgotPassword}
                              disabled={isLoading}
                            >
                              Xác Nhận
                            </button>
                          </div>
                        </div>
                      </form>
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
