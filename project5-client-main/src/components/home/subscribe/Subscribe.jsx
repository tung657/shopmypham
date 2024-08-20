import { useState } from 'react';
import { toast } from 'react-toastify';
import { sendSubscribe } from '../../../services/email';
import { emailValidator } from '../../../utils/validator/emailValidator';

export default function Subscribe({ classes }) {
  const [email, setEmail] = useState('');
  const [validateMessages, setValidateMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataPost = {
      email,
    };

    const validator = emailValidator(dataPost);
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

      setValidateMessages(arrMessages);
    } else {
      sendSubscribe(dataPost)
        .then((res) => {
          toast.success('Đăng ký bản tin thành công');
          setValidateMessages([]);
        })
        .catch((err) => toast.error('Có lỗi xảy ra khi đăng ký'));
    }
  };

  return (
    <>
      <div
        className={
          'bg-opacity-0 px-5 sm:px-16 py-12 md:py-14 xl:py-16 flex flex-col xl:flex-row justify-center xl:justify-between items-center rounded-lg bg-gray-200 lg:py-16 ' +
          classes
        }
      >
        <div className='lg:-mt-2 xl:-mt-0.5 text-center xl:text-start mb-7 md:mb-8 lg:mb-9 xl:mb-0'>
          <h3 className='text-lg md:text-xl lg:text-2xl 2xl:text-3xl xl:leading-10 font-bold text-heading sm:mb-0 md:mb-2.5 lg:mb-3 xl:mb-3.5'>
            Nhận Thông Tin Từ Chúng Tôi Thông Qua Hộp Thư
          </h3>
          <p className='text-body text-xs md:text-sm leading-6 md:leading-7'>
            Đăng ký bản tin của chúng tôi và nhập cập nhật mới nhất.
          </p>
        </div>
        <form
          className='flex-shrink-0 w-full sm:w-96 md:w-[545px]'
          noValidate=''
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className='flex flex-col sm:flex-row items-center justify-end'>
            <div className='w-full'>
              <input
                id='subscription_email'
                name='subscription_email'
                type='email'
                placeholder='Nhập email của bạn vào đây'
                className='py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12 lg:px-7 lg:h-14 text-center sm:text-start bg-white rounded-md'
                autoComplete='off'
                spellCheck='false'
                aria-invalid='false'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <small className='text-red-500 font-medium'>
                {validateMessages.map((message) =>
                  message.key === 'email' ? message.message : null
                )}
              </small>
            </div>
            <button
              data-variant='flat'
              className='text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none rounded-md  bg-heading text-white px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-gray-600 hover:shadow-cart mt-3 sm:mt-0 w-full sm:w-auto sm:ms-2 md:h-full flex-shrink-0'
              type='submit'
            >
              <span className='lg:py-0.5'>Đăng Ký</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
