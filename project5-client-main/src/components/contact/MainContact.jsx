import { useState } from 'react';
import { toast } from 'react-toastify';
import { sendContact } from '../../services/email';
import { capitalize } from '../../utils/format/formatString';
import { contactValidator } from '../../utils/validator/contactValidator';
import Subscribe from '../home/subscribe/Subscribe';

export default function MainContact() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [validateMessages, setValidateMessages] = useState([]);

  const setEmptyState = () => {
    setFullName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      fullName: capitalize(fullName),
      email,
      subject,
      message,
    };

    const validator = contactValidator(data);

    const arr = [];
    if (validator.error) {
      validator.error.details.forEach((item) =>
        arr.push({ key: item.context.key, message: item.message })
      );

      setValidateMessages(arr);
    } else {
      sendContact(data)
        .then((res) => {
          toast.success('Gửi thành công');
          setEmptyState();
        })
        .catch((err) => toast.error(err.response.data.message));
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
      <div className='mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16'>
        <div className='my-14 lg:my-16 xl:my-20 px-0 pb-2 lg: xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full'>
          <div className='md:w-full lg:w-2/5 2xl:w-2/6 flex flex-col h-full'>
            <div className='mb-6 lg:border lg:rounded-md border-gray-300 lg:p-7'>
              <h4 className='text-2xl md:text-lg font-bold text-heading pb-7 md:pb-10 lg:pb-6 -mt-1'>
                Tìm chúng tôi tại
              </h4>
              <div className='flex pb-7'>
                <div className='flex flex-shrink-0 justify-center items-center p-1.5 border rounded-md border-gray-300 w-10 h-10'>
                  <svg
                    stroke='currentColor'
                    fill='currentColor'
                    strokeWidth='0'
                    viewBox='0 0 512 512'
                    height='1em'
                    width='1em'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M256 32C167.67 32 96 96.51 96 176c0 128 160 304 160 304s160-176 160-304c0-79.49-71.67-144-160-144zm0 224a64 64 0 1164-64 64.07 64.07 0 01-64 64z'></path>
                  </svg>
                </div>
                <div className='flex flex-col ps-3 2xl:ps-4'>
                  <h5 className='text-sm font-bold text-heading'>Địa Chỉ</h5>
                  <a
                    className='text-sm mt-0 hover:underline'
                    href='https://google.com/maps/place/xóm+Đường,+Tứ+Dân,+Khoái+Châu,+Hung+Yen,+Vietnam/@20.8448402,105.9340596,17z/data=!3m1!4b1!4m5!3m4!1s0x3135b0ef132fe8db:0xa45de50d147e2df8!8m2!3d20.8449923!4d105.9369413'
                    target={'_blank'}
                    rel='noreferrer'
                  >
                    Đội 1, thôn Phương Đườn, xã Tứ Dân, huyện Khoái Châu, tỉnh
                    Hưng Yên
                  </a>
                </div>
              </div>
              <div className='flex pb-7'>
                <div className='flex flex-shrink-0 justify-center items-center p-1.5 border rounded-md border-gray-300 w-10 h-10'>
                  <svg
                    stroke='currentColor'
                    fill='currentColor'
                    strokeWidth='0'
                    viewBox='0 0 512 512'
                    height='1em'
                    width='1em'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M424 80H88a56.06 56.06 0 00-56 56v240a56.06 56.06 0 0056 56h336a56.06 56.06 0 0056-56V136a56.06 56.06 0 00-56-56zm-14.18 92.63l-144 112a16 16 0 01-19.64 0l-144-112a16 16 0 1119.64-25.26L256 251.73l134.18-104.36a16 16 0 0119.64 25.26z'></path>
                  </svg>
                </div>
                <div className='flex flex-col ps-3 2xl:ps-4'>
                  <h5 className='text-sm font-bold text-heading'>Email</h5>
                  <a
                    className='text-sm mt-0 hover:underline'
                    href='mailto:minhdra011100@gmail.com'
                  >
                    minhdra011100@gmail.com
                  </a>
                </div>
              </div>
              <div className='flex pb-7'>
                <div className='flex flex-shrink-0 justify-center items-center p-1.5 border rounded-md border-gray-300 w-10 h-10'>
                  <svg
                    stroke='currentColor'
                    fill='currentColor'
                    strokeWidth='0'
                    viewBox='0 0 512 512'
                    height='1em'
                    width='1em'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M478.94 370.14c-5.22-5.56-23.65-22-57.53-43.75-34.13-21.94-59.3-35.62-66.52-38.81a3.83 3.83 0 00-3.92.49c-11.63 9.07-31.21 25.73-32.26 26.63-6.78 5.81-6.78 5.81-12.33 4-9.76-3.2-40.08-19.3-66.5-45.78s-43.35-57.55-46.55-67.3c-1.83-5.56-1.83-5.56 4-12.34.9-1.05 17.57-20.63 26.64-32.25a3.83 3.83 0 00.49-3.92c-3.19-7.23-16.87-32.39-38.81-66.52-21.78-33.87-38.2-52.3-43.76-57.52a3.9 3.9 0 00-3.89-.87 322.35 322.35 0 00-56 25.45A338 338 0 0033.35 92a3.83 3.83 0 00-1.26 3.74c2.09 9.74 12.08 50.4 43.08 106.72 31.63 57.48 53.55 86.93 100 133.22S252 405.21 309.54 436.84c56.32 31 97 41 106.72 43.07a3.86 3.86 0 003.75-1.26A337.73 337.73 0 00454.35 430a322.7 322.7 0 0025.45-56 3.9 3.9 0 00-.86-3.86z'></path>
                  </svg>
                </div>
                <div className='flex flex-col ps-3 2xl:ps-4'>
                  <h5 className='text-sm font-bold text-heading'>
                    Số Điện Thoại
                  </h5>
                  <a
                    className='text-sm mt-0 hover:underline'
                    href='tel:0964247841'
                  >
                    +84 964 247 841
                  </a>
                </div>
              </div>
              <img
                src='/assets/images/map-image.jpg'
                alt='Map'
                className='rounded-md'
              />
            </div>
          </div>
          <div className='md:w-full lg:w-3/5 2xl:w-4/6 flex h-full md:ms-7 flex-col lg:ps-7'>
            <div className='flex pb-7 md:pb-9 mt-7 md:-mt-1.5'>
              <h4 className='text-2xl 2xl:text-3xl font-bold text-heading'>
                Liên Lạc
              </h4>
            </div>
            <form
              className='w-full mx-auto flex flex-col justify-center '
              noValidate=''
            >
              <div className='flex flex-col space-y-5'>
                <div className='flex flex-col md:flex-row space-y-5 md:space-y-0'>
                  <div className='w-full md:w-1/2 '>
                    <label
                      htmlFor='name'
                      className='block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer'
                    >
                      Tên Của Bạn <span className='text-red-500'>*</span>
                    </label>
                    <input
                      id='name'
                      name='name'
                      type='text'
                      placeholder='Nhập Tên Của Bạn'
                      className={
                        'py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 bg-white focus:outline-none focus:border-heading h-11 md:h-12 rounded-md ' +
                        (validateMessages.find(
                          (message) => message.key === 'fullName'
                        )
                          ? 'border-red-600'
                          : 'border-gray-300')
                      }
                      autoComplete='off'
                      spellCheck='false'
                      aria-invalid='false'
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      onInput={() => handleInputChange('fullName')}
                    />
                    <small className='text-red-500 font-medium'>
                      {validateMessages.map((message) =>
                        message.key === 'fullName' ? message.message : null
                      )}
                    </small>
                  </div>
                  <div className='w-full md:w-1/2 md:ms-2.5 lg:ms-5 mt-2 md:mt-0'>
                    <label
                      htmlFor='email'
                      className='block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer'
                    >
                      Email <span className='text-red-500'>*</span>
                    </label>
                    <input
                      id='email'
                      name='email'
                      type='email'
                      placeholder='Email'
                      className={
                        'py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 bg-white focus:outline-none focus:border-heading h-11 md:h-12 rounded-md ' +
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
                      onInput={() => handleInputChange('email')}
                    />
                    <small className='text-red-500 font-medium'>
                      {validateMessages.map((message) =>
                        message.key === 'email' ? message.message : null
                      )}
                    </small>
                  </div>
                </div>
                <div className='relative'>
                  <label
                    htmlFor='subject'
                    className='block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer'
                  >
                    Chủ Đề <span className='text-red-500'>*</span>
                  </label>
                  <input
                    id='subject'
                    name='subject'
                    type='text'
                    placeholder='Chủ Đề'
                    className={
                      'py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 bg-white focus:outline-none focus:border-heading h-11 md:h-12 rounded-md ' +
                      (validateMessages.find(
                        (message) => message.key === 'subject'
                      )
                        ? 'border-red-600'
                        : 'border-gray-300')
                    }
                    autoComplete='off'
                    spellCheck='false'
                    aria-invalid='false'
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    onInput={() => handleInputChange('subject')}
                  />
                  <small className='text-red-500 font-medium'>
                    {validateMessages.map((message) =>
                      message.key === 'subject' ? message.message : null
                    )}
                  </small>
                </div>
                <div className='relative mb-4'>
                  <label
                    htmlFor='message'
                    className='block text-gray-600 font-semibold text-sm leading-none mb-3'
                  >
                    Tin Nhắn <span className='text-red-500'>*</span>
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    className={
                      'px-4 py-3 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:ring-0 bg-white border border-gray-300 focus:shadow focus:outline-none focus:border-heading placeholder-body ' +
                      (validateMessages.find(
                        (message) => message.key === 'message'
                      )
                        ? 'border-red-600'
                        : 'border-gray-300')
                    }
                    autoComplete='off'
                    spellCheck='false'
                    rows='4'
                    placeholder='Viết tin nhắn của bạn vào đây'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onInput={() => handleInputChange('message')}
                  ></textarea>
                  <small className='text-red-500 font-medium'>
                    {validateMessages.map((message) =>
                      message.key === 'message' ? message.message : null
                    )}
                  </small>
                </div>
                <div className='relative'>
                  <button
                    data-variant='flat'
                    className='text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none rounded-md  bg-heading text-white px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:brightness-75 hover:shadow-cart h-12 lg:h-14 mt-1 text-sm lg:text-base w-full sm:w-auto'
                    type='submit'
                    onClick={handleSubmit}
                  >
                    Gửi Tin
                  </button>
                </div>
              </div>
            </form>
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
