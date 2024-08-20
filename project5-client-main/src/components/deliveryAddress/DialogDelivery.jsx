import { useTransition, animated } from '@react-spring/web';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { v4 as uuidv4 } from 'uuid';

// Json
import provinces from '../../assets/jsons/tinh_tp.json';
import jsonDistricts from '../../assets/jsons/quan_huyen.json';
import jsonCommunes from '../../assets/jsons/xa_phuong.json';
import { Fragment } from 'react';
import { useEffect } from 'react';
import { capitalize } from '../../utils/format/formatString';
import { deliveryAddressValidator } from '../../utils/validator/deliveryAddressValidator';
import { toast } from 'react-toastify';

export default function DialogDelivery({
  title,
  showDialog,
  setShowDialog,
  user,
  handleUpdateCustomerInfo,
  itemSelected,
  setItemSelected,
}) {
  const [validateMessages, setValidateMessages] = useState([]);
  const [province, setProvince] = useState({});
  const [district, setDistrict] = useState({});
  const [commune, setCommune] = useState({});
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [filteredProvince, setFilteredProvince] = useState();
  const [filteredDistrict, setFilteredDistrict] = useState();
  const [filteredCommune, setFilteredCommune] = useState();
  const [queryProvince, setQueryProvince] = useState('');
  const [queryDistrict, setQueryDistrict] = useState('');
  const [queryCommune, setQueryCommune] = useState('');

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [isAddressDefault, setIsAddressDefault] = useState(true);

  const transitions = useTransition(showDialog, {
    from: { opacity: 0, scale: 1.2 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 1.1 },
    reverse: showDialog,
    config: { duration: 150 },
  });

  useEffect(() => {
    if (itemSelected) {
      setFullName(itemSelected.full_name);
      setPhone(itemSelected.phone);
      setProvince(itemSelected.province);
      setDistrict(itemSelected.district);
      setCommune(itemSelected.commune);
      setAddressDetail(itemSelected.address_detail);
      setIsAddressDefault(itemSelected.isAddressDefault);
    }
    else
    {
      setFullName('');
      setPhone('');
      setProvince({});
      setDistrict({});
      setCommune({});
      setAddressDetail('');
    }
  }, [itemSelected]);

  // Get districts
  useEffect(() => {
    if (province && province?.name) {
      const result = jsonDistricts.filter(
        (item) => item.parent_code === province.code
      );
      setDistricts(result);
    }
  }, [province]);

  // Get communes
  useEffect(() => {
    if (district && district?.name) {
      const result = jsonCommunes.filter(
        (item) => item.parent_code === district.code
      );
      setCommunes(result);
    }
  }, [district]);

  // filter provinces
  useEffect(() => {
    const filtered =
      queryProvince === ''
        ? provinces
        : provinces.filter((item) => {
            return item.name
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(queryProvince.toLowerCase().replace(/\s+/g, ''));
          });

    setFilteredProvince(filtered);
  }, [queryProvince]);

  // filter districts
  useEffect(() => {
    if (districts && districts?.length > 0) {
      const filtered =
        queryDistrict === ''
          ? districts
          : districts.filter((item) => {
              return item.name
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(queryDistrict.toLowerCase().replace(/\s+/g, ''));
            });

      setFilteredDistrict(filtered);
    }
  }, [queryDistrict, districts]);

  // filter communes
  useEffect(() => {
    if (communes && communes?.length > 0) {
      const filtered =
        queryCommune === ''
          ? communes
          : communes.filter((item) => {
              return item.name
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(queryCommune.toLowerCase().replace(/\s+/g, ''));
            });

      setFilteredCommune(filtered);
    }
  }, [queryCommune, communes]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      full_name: capitalize(fullName),
      phone,
      province: province?.name ? province : undefined,
      district: district?.name ? district : undefined,
      commune: commune?.name ? commune : undefined,
      address_detail: addressDetail,
      isAddressDefault,
    };

    const validator = deliveryAddressValidator(data);

    const arr = [];
    setValidateMessages(arr);
    if (validator.error) {
      validator.error.details.forEach((item) =>
        arr.push({ key: item.context.key, message: item.message })
      );

      setValidateMessages(arr);
      // setIsLoading(false);
    } else {
      const addresses = user.delivery_addresses || [];
      if (isAddressDefault) addresses.forEach(item => item.isAddressDefault = false);
      if (itemSelected)
      {
        const i = addresses.findIndex((item) => item.id === itemSelected.id);
        user.delivery_addresses[i] = { ...user.delivery_addresses[i], ...data };
      } else {
        data.id = uuidv4();
        addresses.push(data);
      }
      user.delivery_addresses = addresses;
      handleUpdateCustomerInfo(user)
        .then((res) => {
          setShowDialog(false);
          toast.success('Thành công!');
          setItemSelected();
        })
        .catch((err) => {
          toast.error(err.response.data.message);
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
              className='modal-root fixed bg-black/40 inset-0 z-50 cursor-pointer p-4 md:p-5 opacity-100'
              // onClick={(e) => {
              //   setShowDialog(false);
              // }}
            >
              <animated.div
                // style={scale}
                style={styles}
                className='relative h-full mx-auto'
              >
                <div
                  className='w-full md:w-auto absolute left-1/2 transform -translate-x-1/2 shadow-xl h-auto max-h-full top-1/2 -translate-y-1/2 rounded-lg'
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className='flex flex-col justify-between p-6 rounded-lg bg-white z-[100] min-h-[64vh]'>
                    <div className='flex items-center justify-between'>
                      <h3 className='text-xl font-medium uppercase text-red-900'>
                        {title ? title : 'Thêm Địa  Chỉ'}
                      </h3>
                    </div>
                    <OverlayScrollbarsComponent
                      className='mt-4 mb-4 px-2 flex-1 max-h-[64vh]'
                      options={{ scrollbars: { autoHide: true } }}
                      defer
                    >
                      <form
                        className='w-full mx-auto flex flex-col justify-center mb-2'
                        noValidate=''
                      >
                        <div className='flex flex-col space-y-4 lg:space-y-5'>
                          <div className='flex flex-col gap-4 lg:flex-row space-y-4 lg:space-y-0'>
                            <div className='w-full lg:w-1/2 '>
                              <label
                                htmlFor='fullName'
                                className='block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer'
                              >
                                Họ và Tên <span className='text-red-500'>*</span>
                              </label>
                              <input
                                id='fullName'
                                name='fullName'
                                type='text'
                                placeholder='Họ và Tên'
                                className={
                                  'py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 bg-white outline-none focus:outline-none focus:border-heading h-11 md:h-12 rounded-md ' +
                                  (validateMessages.find(
                                    (message) => message.key === 'full_name'
                                  )
                                    ? 'border-red-600'
                                    : 'border-gray-300')
                                }
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                autoComplete='off'
                                onInput={() => handleInputChange('full_name')}
                              />
                              <small className='text-red-500 font-medium'>
                                {validateMessages.map((message) =>
                                  message.key === 'full_name'
                                    ? message.message
                                    : null
                                )}
                              </small>
                            </div>
                            <div className='w-full lg:w-1/2 '>
                              <label
                                htmlFor='phone'
                                className='block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer'
                              >
                                Số Điện Thoại <span className='text-red-500'>*</span>
                              </label>
                              <input
                                id='phone'
                                name='phone'
                                type='text'
                                placeholder='Số Điện Thoại'
                                className={
                                  'py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 bg-white focus:outline-none focus:border-heading h-11 md:h-12 rounded-md ' +
                                  (validateMessages.find(
                                    (message) => message.key === 'phone'
                                  )
                                    ? 'border-red-600'
                                    : 'border-gray-300')
                                }
                                autoComplete='off'
                                spellCheck='false'
                                aria-invalid='true'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                onInput={() => handleInputChange('phone')}
                                maxLength={11}
                              />
                              <small className='text-red-500 font-medium'>
                                {validateMessages.map((message) =>
                                  message.key === 'phone'
                                    ? message.message
                                    : null
                                )}
                              </small>
                            </div>
                          </div>
                          <div className='flex flex-col gap-4 lg:flex-row space-y-4 lg:space-y-0'>
                            <div className='w-full lg:w-1/3 '>
                              <label
                                htmlFor='province'
                                className='block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer'
                              >
                                Tỉnh / Thành Phố <span className='text-red-500'>*</span>
                              </label>
                              <Combobox value={province} onChange={setProvince}>
                                <div className='relative w-full cursor-default rounded-lg bg-white text-left sm:text-sm'>
                                  <Combobox.Input
                                    id='province'
                                    className={
                                      'py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 bg-white focus:outline-none focus:border-heading h-11 md:h-12 rounded-md ' +
                                      (validateMessages.find(
                                        (message) => message.key === 'province'
                                      )
                                        ? 'border-red-600'
                                        : 'border-gray-300')
                                    }
                                    placeholder={'Tỉnh / Thành Phố'}
                                    displayValue={(item) => item?.name}
                                    spellCheck={false}
                                    onChange={(event) =>
                                      setQueryProvince(event.target.value)
                                    }
                                  />
                                  <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='16'
                                      height='16'
                                      fill='currentColor'
                                      className='bi bi-caret-down-fill'
                                      viewBox='0 0 16 16'
                                    >
                                      <path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z' />
                                    </svg>
                                  </Combobox.Button>
                                </div>
                                <Transition
                                  as={Fragment}
                                  leave='transition ease-in duration-100'
                                  leaveFrom='opacity-100'
                                  leaveTo='opacity-0'
                                  afterLeave={() => setQueryProvince('')}
                                >
                                  <Combobox.Options className='absolute mt-1 max-h-60 w-full md:w-1/2 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                    {filteredProvince &&
                                    filteredProvince?.length === 0 &&
                                    queryProvince !== '' ? (
                                      <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                                        Không tìm thấy gì.
                                      </div>
                                    ) : (
                                      filteredProvince?.map((item) => (
                                        <Combobox.Option
                                          key={item.code}
                                          className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                              active
                                                ? 'bg-teal-600 text-white'
                                                : 'text-gray-900'
                                            }`
                                          }
                                          value={item}
                                          onClick={() => {
                                            setDistrict({});
                                            setFilteredDistrict([]);
                                            setCommune({});
                                            setFilteredCommune([]);
                                            handleInputChange('province');
                                          }}
                                        >
                                          {({ selected, active }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? 'font-medium'
                                                    : 'font-normal'
                                                }`}
                                              >
                                                {item.name_with_type}
                                              </span>
                                              {selected ? (
                                                <span
                                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                    active
                                                      ? 'text-white'
                                                      : 'text-teal-600'
                                                  }`}
                                                >
                                                  <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    width='16'
                                                    height='16'
                                                    fill='currentColor'
                                                    className='bi bi-check2'
                                                    viewBox='0 0 16 16'
                                                  >
                                                    <path d='M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z' />
                                                  </svg>
                                                </span>
                                              ) : null}
                                            </>
                                          )}
                                        </Combobox.Option>
                                      ))
                                    )}
                                  </Combobox.Options>
                                </Transition>
                              </Combobox>
                              <small className='text-red-500 font-medium'>
                                {validateMessages.map((message) =>
                                  message.key === 'province'
                                    ? message.message
                                    : null
                                )}
                              </small>
                            </div>
                            <div className='w-full lg:w-1/3 '>
                              <label
                                htmlFor='district'
                                className='block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer'
                              >
                                Quận / Huyện <span className='text-red-500'>*</span>
                              </label>
                              <Combobox value={district} onChange={setDistrict}>
                                <div className='relative w-full cursor-default rounded-lg bg-white text-left sm:text-sm'>
                                  <Combobox.Input
                                    id='district'
                                    className={
                                      'py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 bg-white focus:outline-none focus:border-heading h-11 md:h-12 rounded-md ' +
                                      (validateMessages.find(
                                        (message) => message.key === 'district'
                                      )
                                        ? 'border-red-600'
                                        : 'border-gray-300')
                                    }
                                    placeholder={'Quận / Huyện'}
                                    displayValue={(item) => item?.name}
                                    spellCheck={false}
                                    onChange={(event) =>
                                      setQueryDistrict(event.target.value)
                                    }
                                  />
                                  <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='16'
                                      height='16'
                                      fill='currentColor'
                                      className='bi bi-caret-down-fill'
                                      viewBox='0 0 16 16'
                                    >
                                      <path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z' />
                                    </svg>
                                  </Combobox.Button>
                                </div>
                                <Transition
                                  as={Fragment}
                                  leave='transition ease-in duration-100'
                                  leaveFrom='opacity-100'
                                  leaveTo='opacity-0'
                                  afterLeave={() => setQueryDistrict('')}
                                >
                                  <Combobox.Options className='absolute mt-1 max-h-60 w-full md:w-1/2 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                    {filteredDistrict &&
                                    filteredDistrict?.length === 0 &&
                                    queryDistrict !== '' ? (
                                      <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                                        Không tìm thấy gì.
                                      </div>
                                    ) : (
                                      filteredDistrict?.map((item) => (
                                        <Combobox.Option
                                          key={item.code}
                                          className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                              active
                                                ? 'bg-teal-600 text-white'
                                                : 'text-gray-900'
                                            }`
                                          }
                                          onClick={() => {
                                            setCommune({});
                                            setFilteredCommune([]);
                                            handleInputChange('district');
                                          }}
                                          value={item}
                                        >
                                          {({ selected, active }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? 'font-medium'
                                                    : 'font-normal'
                                                }`}
                                              >
                                                {item.name_with_type}
                                              </span>
                                              {selected ? (
                                                <span
                                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                    active
                                                      ? 'text-white'
                                                      : 'text-teal-600'
                                                  }`}
                                                >
                                                  <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    width='16'
                                                    height='16'
                                                    fill='currentColor'
                                                    className='bi bi-check2'
                                                    viewBox='0 0 16 16'
                                                  >
                                                    <path d='M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z' />
                                                  </svg>
                                                </span>
                                              ) : null}
                                            </>
                                          )}
                                        </Combobox.Option>
                                      ))
                                    )}
                                  </Combobox.Options>
                                </Transition>
                              </Combobox>
                              <small className='text-red-500 font-medium'>
                                {validateMessages.map((message) =>
                                  message.key === 'district'
                                    ? message.message
                                    : null
                                )}
                              </small>
                            </div>
                            <div className='w-full lg:w-1/3 '>
                              <label
                                htmlFor='commune'
                                className='block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer'
                              >
                                Xã / Phường <span className='text-red-500'>*</span>
                              </label>
                              <Combobox value={commune} onChange={setCommune}>
                                <div className='relative w-full cursor-default rounded-lg bg-white text-left sm:text-sm'>
                                  <Combobox.Input
                                    id='commune'
                                    className={
                                      'py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 bg-white focus:outline-none focus:border-heading h-11 md:h-12 rounded-md ' +
                                      (validateMessages.find(
                                        (message) => message.key === 'commune'
                                      )
                                        ? 'border-red-600'
                                        : 'border-gray-300')
                                    }
                                    placeholder={'Xã / Phường'}
                                    displayValue={(item) => item?.name}
                                    spellCheck={false}
                                    onChange={(event) =>
                                      setQueryDistrict(event.target.value)
                                    }
                                  />
                                  <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='16'
                                      height='16'
                                      fill='currentColor'
                                      className='bi bi-caret-down-fill'
                                      viewBox='0 0 16 16'
                                    >
                                      <path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z' />
                                    </svg>
                                  </Combobox.Button>
                                </div>
                                <Transition
                                  as={Fragment}
                                  leave='transition ease-in duration-100'
                                  leaveFrom='opacity-100'
                                  leaveTo='opacity-0'
                                  afterLeave={() => setQueryCommune('')}
                                >
                                  <Combobox.Options className='absolute mt-1 max-h-60 w-full md:w-1/2 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                    {filteredCommune &&
                                    filteredCommune?.length === 0 &&
                                    queryCommune !== '' ? (
                                      <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                                        Không tìm thấy gì.
                                      </div>
                                    ) : (
                                      filteredCommune?.map((item) => (
                                        <Combobox.Option
                                          key={item.code}
                                          className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                              active
                                                ? 'bg-teal-600 text-white'
                                                : 'text-gray-900'
                                            }`
                                          }
                                          value={item}
                                          onClick={() =>
                                            handleInputChange('commune')
                                          }
                                        >
                                          {({ selected, active }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? 'font-medium'
                                                    : 'font-normal'
                                                }`}
                                              >
                                                {item.name_with_type}
                                              </span>
                                              {selected ? (
                                                <span
                                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                    active
                                                      ? 'text-white'
                                                      : 'text-teal-600'
                                                  }`}
                                                >
                                                  <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    width='16'
                                                    height='16'
                                                    fill='currentColor'
                                                    className='bi bi-check2'
                                                    viewBox='0 0 16 16'
                                                  >
                                                    <path d='M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z' />
                                                  </svg>
                                                </span>
                                              ) : null}
                                            </>
                                          )}
                                        </Combobox.Option>
                                      ))
                                    )}
                                  </Combobox.Options>
                                </Transition>
                              </Combobox>
                              <small className='text-red-500 font-medium'>
                                {validateMessages.map((message) =>
                                  message.key === 'commune'
                                    ? message.message
                                    : null
                                )}
                              </small>
                            </div>
                          </div>
                          <div className='flex flex-col gap-4 lg:flex-row space-y-4 lg:space-y-0'>
                            <div className='w-full '>
                              <label
                                htmlFor='address_detail'
                                className='block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer'
                              >
                                Địa Chỉ Chi Tiết <span className='text-red-500'>*</span>
                              </label>
                              <input
                                id='address_detail'
                                name='address_detail'
                                type='text'
                                placeholder='Địa Chỉ Chi Tiết'
                                className={
                                  'py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 bg-white outline-none focus:outline-none focus:border-heading h-11 md:h-12 rounded-md ' +
                                  (validateMessages.find(
                                    (message) =>
                                      message.key === 'address_detail'
                                  )
                                    ? 'border-red-600'
                                    : 'border-gray-300')
                                }
                                autoComplete='off'
                                value={addressDetail}
                                onChange={(e) =>
                                  setAddressDetail(e.target.value)
                                }
                                onInput={() =>
                                  handleInputChange('address_detail')
                                }
                              />
                              <small className='text-red-500 font-medium'>
                                {validateMessages.map((message) =>
                                  message.key === 'address_detail'
                                    ? message.message
                                    : null
                                )}
                              </small>
                            </div>
                          </div>
                          <div className='flex items-center flex-shrink-0'>
                            <label className='switch relative inline-block w-10 cursor-pointer -z-10'>
                              <input
                                id='default'
                                type='checkbox'
                                className='opacity-0 w-0 h-0'
                                name='default_me'
                                value={isAddressDefault}
                                checked={isAddressDefault}
                                onChange={() =>
                                  setIsAddressDefault(!isAddressDefault)
                                }
                              />
                              <span className='bg-gray-500 absolute inset-0 transition-all duration-300 ease-in slider round'></span>
                            </label>
                            <label
                              htmlFor='default'
                              className='flex-shrink-0 text-sm text-heading ps-3 cursor-pointer'
                            >
                              Đặt làm mặc định
                            </label>
                          </div>
                        </div>
                      </form>
                    </OverlayScrollbarsComponent>
                    <div className='flex'>
                      <button
                        type='submit'
                        className='text-white bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded text-sm px-4 py-2 mr-2 text-center inline-flex items-center'
                        onClick={handleSubmit}
                      >
                        Xác Nhận
                      </button>
                      <button
                        type='button'
                        className='text-gray-900 bg-transparent border border-gray-900 hover:bg-gray-100 hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded text-sm px-4 py-2 text-center'
                        data-dismiss-target='#alert-additional-content-2'
                        aria-label='Close'
                        onClick={() => setShowDialog(false)}
                      >
                        Trở Lại
                      </button>
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
