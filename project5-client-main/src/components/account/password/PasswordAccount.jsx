import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { changePassword } from '../../../services/auth';
import {
  removeLocalStorage,
  removeSessionStorage,
} from '../../../utils/storage/storage';
import { changePasswordValidator } from '../../../utils/validator/userValidator';
import Loading from '../../shared/loading/Loading';

export default function PasswordAccount({ user }) {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const newPasswordConfirmationRef = useRef();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');

  const [validateMessages, setValidateMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      _id: user?.user?._id,
      oldPassword,
      newPassword,
      newPasswordConfirmation,
    };

    const validator = changePasswordValidator(data);

    const arr = [];
    setValidateMessages(arr);
    if (newPassword !== newPasswordConfirmation) {
      arr.push({
        key: 'newPasswordConfirmation',
        message: 'Mật khẩu mới không trùng nhau.',
      });

      setValidateMessages(arr);
      setIsLoading(false);
    }
    if (validator.error) {
      validator.error.details.forEach((item) =>
        arr.push({ key: item.context.key, message: item.message })
      );

      setValidateMessages(arr);
      setIsLoading(false);
    } else {
      changePassword(data)
        .then((res) => {
          toast.success(res.data.message);
          setIsLoading(false);

          removeLocalStorage('user');
          removeSessionStorage('user');

          toast.info('Đang đăng xuất', {
            autoClose: 500,
          });
          setTimeout(() => {
            navigate('/');
            window.location.reload();
          }, 500);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setIsLoading(false);
        });
    }
  };

  const handleInputChange = (key) => {
    const messages = JSON.parse(JSON.stringify(validateMessages)).filter(
      (item) => item.key !== key
    );

    setValidateMessages(messages);
  };

  return (
    <>
      <div className='md:w-4/6 2xl:w-8/12 mt-4 md:mt-0'>
        <div
          className='w-full flex  h-full lg:w-8/12 flex-col'
          data-projection-id='8'
          style={{ position: 'relative', top: '0px', opacity: 1 }}
        >
          <div className='flex justify-between items-center'>
            <h2 className='text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8'>
              Mật Khẩu
            </h2>
            <span className='text-sky-500 hover:underline cursor-pointer'>
              Quên Mật Khẩu?
            </span>
          </div>
          <form className='w-full mx-auto flex flex-col justify-center '>
            <div className='flex flex-col space-y-3'>
              <div className='mb-4'>
                <label
                  htmlFor='oldPassword'
                  className='block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer capitalize'
                >
                  Mật khẩu hiện tại
                </label>
                <div className='relative'>
                  <input
                    ref={oldPasswordRef}
                    id='oldPassword'
                    name='oldPassword'
                    type='password'
                    className={
                      'py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12 rounded-md ' +
                      (validateMessages.find(
                        (message) => message.key === 'oldPassword'
                      )
                        ? 'border-red-600'
                        : 'border-gray-300')
                    }
                    autoComplete='off'
                    autoCapitalize='off'
                    spellCheck='false'
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    onInput={() => handleInputChange('oldPassword')}
                  />
                  <label
                    htmlFor='oldPassword'
                    className='absolute end-4 top-5 -mt-2 text-gray-500 cursor-pointer'
                    onClick={() => {
                      if (oldPasswordRef) {
                        oldPasswordRef.current.type =
                          oldPasswordRef.current.type === 'text'
                            ? 'password'
                            : 'text';
                      }
                    }}
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

                  <small className='text-red-500 font-medium'>
                    {validateMessages.map((message) =>
                      message.key === 'oldPassword' ? message.message : null
                    )}
                  </small>
                </div>
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='newPassword'
                  className='block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer capitalize'
                >
                  Mật khẩu mới
                </label>
                <div className='relative'>
                  <input
                    ref={newPasswordRef}
                    id='newPassword'
                    name='newPassword'
                    type='password'
                    className={
                      'py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12 rounded-md ' +
                      (validateMessages.find(
                        (message) => message.key === 'newPassword'
                      )
                        ? 'border-red-600'
                        : 'border-gray-300')
                    }
                    autoComplete='off'
                    autoCapitalize='off'
                    spellCheck='false'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    onInput={() => handleInputChange('newPassword')}
                  />
                  <label
                    htmlFor='newPassword'
                    className='absolute end-4 top-5 -mt-2 text-gray-500 cursor-pointer'
                    onClick={() => {
                      if (newPasswordRef) {
                        newPasswordRef.current.type =
                          newPasswordRef.current.type === 'text'
                            ? 'password'
                            : 'text';
                      }
                    }}
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

                  <small className='text-red-500 font-medium'>
                    {validateMessages.map((message) =>
                      message.key === 'newPassword' ? message.message : null
                    )}
                  </small>
                </div>
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='newPasswordConfirmation'
                  className='block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer capitalize'
                >
                  Nhập lại mật khẩu mới
                </label>
                <div className='relative'>
                  <input
                    ref={newPasswordConfirmationRef}
                    id='newPasswordConfirmation'
                    name='newPasswordConfirmation'
                    type='password'
                    className={
                      'py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12 rounded-md ' +
                      (validateMessages.find(
                        (message) => message.key === 'newPasswordConfirmation'
                      )
                        ? 'border-red-600'
                        : 'border-gray-300')
                    }
                    autoComplete='off'
                    autoCapitalize='off'
                    spellCheck='false'
                    value={newPasswordConfirmation}
                    onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                    onInput={() => handleInputChange('newPasswordConfirmation')}
                  />
                  <label
                    htmlFor='newPasswordConfirmation'
                    className='absolute end-4 top-5 -mt-2 text-gray-500 cursor-pointer'
                    onClick={() => {
                      if (newPasswordConfirmationRef) {
                        newPasswordConfirmationRef.current.type =
                          newPasswordConfirmationRef.current.type === 'text'
                            ? 'password'
                            : 'text';
                      }
                    }}
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

                  <small className='text-red-500 font-medium'>
                    {validateMessages.map((message) =>
                      message.key === 'newPasswordConfirmation'
                        ? message.message
                        : null
                    )}
                  </small>
                </div>
              </div>
              <div className='relative'>
                <button
                  data-variant='flat'
                  className={
                    'text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none rounded-md   text-white px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 h-12 mt-3 w-full sm:w-48 whitespace-nowrap capitalize ' +
                    (isLoading
                      ? 'bg-slate-400 cursor-not-allowed'
                      : 'bg-heading first:hover:bg-gray-600 hover:text-white  hover:shadow-cart')
                  }
                  type='submit'
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loading /> Đang Xử Lý
                    </>
                  ) : (
                    <>Thay đổi mật khẩu</>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
