import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { common } from '../../../common/common';
import { updateInfo } from '../../../services/customer';
import { verifyAccount } from '../../../services/email';
import { uploadSingle } from '../../../services/file';
import { capitalize } from '../../../utils/format/formatString';
import { customerValidator } from '../../../utils/validator/userValidator';
import Loading from '../../shared/loading/Loading';

const genders = [
  {
    gender: 'Nam',
    id: 0,
  },
  {
    gender: 'Nữ',
    id: 1,
  },
  {
    gender: 'Khác',
    id: 2,
  },
];

let selectedImage;
export default function DetailAccount({ user }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birth] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');

  const [imageURL, setImageURL] = useState('');
  const [validateMessages, setValidateMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setImageURL(user.avatar);
      setGender(user.gender);
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setPhone(user.phone);
      setEmail(user.user?.email);
    } else emptyValues();
  }, [user]);

  const emptyValues = () => {
    setGender('');
    setFirstName('');
    setLastName('');
    setPhone('');
    setEmail('');
  };

  const handleChangeImageURL = (e) => {
    setImageURL(URL.createObjectURL(e.target.files[0]));
    selectedImage = e.target.files[0];
  };

  const handleUploadImage = async (file) => {
    let path = '';
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      await uploadSingle(formData)
        .then((res) => (path = res.data.path))
        .catch((err) => toast.error('Có lỗi xảy ra khi upload!!!'));
    }

    return path;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      ...user,
      first_name: capitalize(firstName),
      last_name: capitalize(lastName),
      email: email,
      birth: birth.trim(),
      phone: phone.trim(),
      gender,
    };

    if (selectedImage)
      await handleUploadImage(selectedImage).then((res) => (data.avatar = res));

    const validator = customerValidator(data);

    const arr = [];
    setValidateMessages(arr);
    if (validator.error) {
      validator.error.details.forEach((item) =>
        arr.push({ key: item.context.key, message: item.message })
      );

      setValidateMessages(arr);
      setIsLoading(false);
    } else {
      updateInfo(data)
        .then((res) => {
          toast.success('Cập nhật thành công!');
          selectedImage = null;
        })
        .catch((err) => toast.error(err.response.data.message));
      setIsLoading(false);
    }
  };

  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (user?.orders) {
      const t = user.orders.reduce((prev, curr) => {
        if (curr.paid) return prev + Number(curr.total);
        else return prev;
      }, 0);

      setTotal(t);
    }
  }, [user]);

  const handleInputChange = (key) => {
    const messages = JSON.parse(JSON.stringify(validateMessages)).filter(
      (item) => item.key !== key
    );

    setValidateMessages(messages);
  };

  const handleVerifyUser = () => {
    setTimeout(() => {
      toast.info(
        'Chúng tôi đã gửi một yêu cầu xác minh tài khoản đến email: ' +
          user?.user?.email +
          ' của bạn.',
        {
          icon: '🦄',
        }
      );
    }, 500);
    verifyAccount({
      email: user?.user?.email,
      href:
        window.location.origin +
        `/account/verify?i=${user.user._id}&name=${user.user.username}`,
    });
  };

  return (
    <>
      <div className='md:w-4/6 2xl:w-8/12 mt-4 md:mt-0'>
        <div
          className='w-full flex flex-col'
          data-projection-id='7'
          style={{ position: 'relative', top: '0px', opacity: 1 }}
        >
          <h2 className='text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8'>
            Thông Tin Tài Khoản
          </h2>
          <form
            className='w-full mx-auto flex flex-col justify-center '
            noValidate=''
          >
            <div className='flex flex-col space-y-4 sm:space-y-5'>
              <div className='flex flex-col sm:flex-row sm:space-s-3 space-y-4 sm:space-y-0'>
                <div className='w-full sm:w-1/2'>
                  <Menu as='div' className='relative'>
                    <Menu.Button>
                      <div
                        className='relative w-[200px] h-[200px] cursor-pointer group outline-none'
                        title='Thay Đổi'
                      >
                        <img
                          src={imageURL}
                          alt={'@' + user?.path}
                          className='w-[200px] h-[200px] rounded-full object-cover shadow group-hover:brightness-90'
                        />
                        <div className='absolute left-0 bottom-0 px-2 py-1 ml-2 mb-2 bg-white border border-black rounded flex gap-1 items-center'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='14'
                            height='14'
                            fill='currentColor'
                            className='bi bi-pencil'
                            viewBox='0 0 16 16'
                          >
                            <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z' />
                          </svg>
                          Sửa
                        </div>
                      </div>
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items className='absolute left-0 py-1 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg border border-slate-200 focus:outline-none w-[160px] dropdown before:!border-b-slate-200 after:!border-b-white'>
                        {/* <Menu.Item disabled> */}
                        <label
                          htmlFor='upload-avatar'
                          className='px-3 py-1 cursor-pointer hover:bg-rose-500 hover:text-white block'
                        >
                          <span className='w-full'>Tải ảnh lên...</span>
                          <input
                            id='upload-avatar'
                            type='file'
                            className='hidden'
                            accept='image/png, image/jpeg'
                            onChange={(e) => {
                              handleChangeImageURL(e);
                            }}
                          />
                        </label>
                        {/* </Menu.Item> */}
                        <Menu.Item>
                          <div
                            className='px-3 py-1 cursor-pointer hover:bg-rose-500 hover:text-white'
                            onClick={() => setImageURL(common.defaultAvatar)}
                          >
                            Ảnh mặc định
                          </div>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div className='w-full sm:w-1/2'>
                  <div className='flex flex-col gap-2'>
                    <div>
                      <span className='font-semibold'>Tên tài khoản:</span>{' '}
                      {user?.user?.username}
                    </div>
                    <div>
                      <span className='font-semibold'>Số đơn hàng:</span>{' '}
                      {user?.orders?.length || 0}
                    </div>
                    <div>
                      <span className='font-semibold'>Tổng chi tiêu:</span> ₫
                      {total.toLocaleString('en')}
                    </div>
                    <div>
                      <span className='font-semibold'>Trạng thái:</span>{' '}
                      <span
                        className={
                          user?.user?.verified
                            ? 'text-emerald-500'
                            : 'text-red-500'
                        }
                      >
                        {user?.user?.verified ? (
                          'Đã xác thực'
                        ) : (
                          <div className=' inline-flex gap-2'>
                            <span>Chưa xác thực</span>
                            <span
                              className='text-sky-500 underline cursor-pointer font-semibold hover:no-underline hover:text-sky-600'
                              onClick={handleVerifyUser}
                            >
                              Xác thực ngay
                            </span>
                          </div>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col sm:flex-row sm:space-s-3 space-y-4 sm:space-y-0'>
                <div className='w-full sm:w-1/2'>
                  <label
                    htmlFor='firstName'
                    className='block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer'
                  >
                    Họ *
                  </label>
                  <input
                    id='firstName'
                    name='firstName'
                    type='text'
                    placeholder=''
                    className={
                      'py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12 rounded-md ' +
                      (validateMessages.find(
                        (message) => message.key === 'first_name'
                      )
                        ? 'border-red-600'
                        : 'border-gray-300')
                    }
                    autoComplete='off'
                    spellCheck='false'
                    aria-invalid='false'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onInput={() => handleInputChange('first_name')}
                  />
                  <small className='text-red-500 font-medium'>
                    {validateMessages.map((message) =>
                      message.key === 'first_name' ? message.message : null
                    )}
                  </small>
                </div>
                <div className='w-full sm:w-1/2'>
                  <label
                    htmlFor='lastName'
                    className='block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer'
                  >
                    Tên *
                  </label>
                  <input
                    id='lastName'
                    name='lastName'
                    type='text'
                    placeholder=''
                    className={
                      'py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12 rounded-md ' +
                      (validateMessages.find(
                        (message) => message.key === 'last_name'
                      )
                        ? 'border-red-600'
                        : 'border-gray-300')
                    }
                    autoComplete='off'
                    spellCheck='false'
                    aria-invalid='false'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    onInput={() => handleInputChange('last_name')}
                  />
                  <small className='text-red-500 font-medium'>
                    {validateMessages.map((message) =>
                      message.key === 'last_name' ? message.message : null
                    )}
                  </small>
                </div>
              </div>
              <div className='flex flex-col sm:flex-row sm:space-s-3 space-y-4 sm:space-y-0'>
                <div className='w-full sm:w-1/2'>
                  <label
                    htmlFor='phoneNumber'
                    className='block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer'
                  >
                    Số Điện Thoại *
                  </label>
                  <input
                    id='phoneNumber'
                    name='phoneNumber'
                    type='tel'
                    placeholder=''
                    className={
                      'py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12 rounded-md ' +
                      (validateMessages.find(
                        (message) => message.key === 'phone'
                      )
                        ? 'border-red-600'
                        : 'border-gray-300')
                    }
                    autoComplete='off'
                    spellCheck='false'
                    aria-invalid='false'
                    value={phone}
                    maxLength={11}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <small className='text-red-500 font-medium'>
                    {validateMessages.map((message) =>
                      message.key === 'phone' ? message.message : null
                    )}
                  </small>
                </div>
                <div className='w-full sm:w-1/2'>
                  <label
                    htmlFor='email'
                    className='block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer'
                  >
                    Email *
                  </label>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    placeholder=''
                    className={
                      'py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12 rounded-md ' +
                      (validateMessages.find(
                        (message) => message.key === 'email'
                      )
                        ? 'border-red-600'
                        : 'border-gray-300')
                    }
                    autoComplete='off'
                    spellCheck='false'
                    aria-invalid='false'
                    defaultValue={email}
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
              <div className='flex flex-col sm:flex-row sm:space-s-3 space-y-4 sm:space-y-0'>
                {/* <div className='w-full sm:w-1/2'>

                </div> */}
                <div className='relative flex flex-col w-full sm:w-1/2'>
                  <span className='mt-2 text-sm text-heading font-semibold block pb-1'>
                    Giới Tính
                  </span>
                  <div className='mt-2 flex items-center space-s-6'>
                    {genders.map((item, index) => (
                      <label
                        key={index}
                        className='group flex items-center text-heading text-sm cursor-pointer'
                      >
                        <input
                          type='radio'
                          className='form-radio w-5 h-5 border border-gray-300 text-heading rounded-full cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-heading'
                          name='gender'
                          value={item.id}
                          checked={item.id === gender}
                          onChange={() => setGender(item.id)}
                        />
                        <span className='ms-2 text-sm text-heading relative'>
                          {item.gender}
                        </span>
                      </label>
                    ))}
                  </div>
                  <small className='text-red-500 font-medium'>
                    {validateMessages.map((message) =>
                      message.key === 'gender' ? message.message : null
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
                    <>Lưu Thay Đổi</>
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
