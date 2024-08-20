import { useTransition, animated } from '@react-spring/web';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import AlertDelete from '../shared/Alert/AlertDelete';

export default function DialogListDelivery({
  showDialog,
  setShowDialog,
  setShowDialogDelivery,
  user,
  setItemSelected,
  handleUpdateCustomerInfo,
}) {
  const [showAlertDelete, setShowAlertDelete] = useState(false);
  const [indexSelected, setIndexSelected] = useState();

  const transitions = useTransition(showDialog, {
    from: { opacity: 0, scale: 1.2 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 1.1 },
    reverse: showDialog,
    config: { duration: 150 },
  });

  const handleDeleteDelivery = () => {
    user.delivery_addresses.splice(indexSelected, 1);
    handleUpdateCustomerInfo(user)
      .then((res) => {
        setShowAlertDelete(false);
        toast.success('Thành công!');
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleChangeDefaultDelivery = () => {
    user.delivery_addresses.forEach((item) => (item.isAddressDefault = false));
    user.delivery_addresses[indexSelected].isAddressDefault = true;
    handleUpdateCustomerInfo(user)
      .then((res) => {
        setShowDialog(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
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
              onClick={(e) => {
                setShowDialog(false);
              }}
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
                  <div className='p-6 rounded-lg bg-white z-[100]'>
                    <div className='flex items-center justify-between gap-8'>
                      <h3 className='text-xl font-medium uppercase text-red-900'>
                        Danh Sách Địa Chỉ
                      </h3>
                      <button
                        className='bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1 rounded'
                        onClick={() => setShowDialogDelivery(true)}
                      >
                        Thêm Mới
                      </button>
                    </div>
                    <OverlayScrollbarsComponent
                      className='mt-4 mb-4'
                      options={{ scrollbars: { autoHide: true } }}
                      defer
                    >
                      <div className='flex flex-col text-sm gap-4 max-h-[64vh] lg:max-h-[350px]'>
                        {user ? (
                          user.delivery_addresses &&
                          user.delivery_addresses?.length > 0 ? (
                            user?.delivery_addresses?.map((item, index) => (
                              <div
                                key={index}
                                className='flex items-center justify-between gap-4'
                              >
                                <div>
                                  <input
                                    id={index}
                                    type='radio'
                                    name='addresses'
                                    className='form-radio w-5 h-5 border border-gray-300 cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-heading checked:hover:bg-heading checked:focus:bg-heading rounded-full'
                                    defaultChecked={item.isAddressDefault}
                                    onChange={(e) => setIndexSelected(index)}
                                  />
                                </div>
                                <label
                                  htmlFor={index}
                                  className='flex flex-col gap-1 flex-1'
                                >
                                  <div className='font-semibold'>
                                    {item.full_name} - {item.phone}
                                  </div>
                                  <div>
                                    {item.address_detail},{' '}
                                    {item.commune.name_with_type},{' '}
                                    {item.district.name_with_type},{' '}
                                    {item.province.name_with_type}
                                  </div>
                                </label>
                                <div className='flex justify-between items-center font-semibold hover:text-violet-500 gap-1'>
                                  <span
                                    className='bg-amber-500 hover:bg-amber-600 p-2 rounded text-white'
                                    onClick={() => {
                                      setShowDialogDelivery(true);
                                      setItemSelected(item);
                                    }}
                                  >
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='18'
                                      height='18'
                                      fill='currentColor'
                                      className='bi bi-pencil'
                                      viewBox='0 0 16 16'
                                    >
                                      <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z' />
                                    </svg>
                                  </span>
                                  <span
                                    className='bg-red-500 hover:bg-red-600 p-2 rounded text-white'
                                    onClick={() => {
                                      setIndexSelected(index);
                                      setShowAlertDelete(true);
                                    }}
                                  >
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='18'
                                      height='18'
                                      fill='currentColor'
                                      className='bi bi-trash'
                                      viewBox='0 0 16 16'
                                    >
                                      <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
                                      <path
                                        fillRule='evenodd'
                                        d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
                                      />
                                    </svg>
                                  </span>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className='text-lg'>
                              Bạn chưa có địa chỉ nào
                            </div>
                          )
                        ) : (
                          <></>
                        )}
                      </div>
                    </OverlayScrollbarsComponent>
                    <div className='flex'>
                      <button
                        type='button'
                        className='text-white bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded text-sm px-4 py-2 mr-2 text-center inline-flex items-center'
                        onClick={handleChangeDefaultDelivery}
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
                        Dừng Lại
                      </button>
                    </div>
                  </div>
                </div>
              </animated.div>
            </animated.div>
          )
      )}

      <AlertDelete
        showAlert={showAlertDelete}
        setShowAlert={setShowAlertDelete}
        handleDelete={handleDeleteDelivery}
      />
    </>
  );
}
