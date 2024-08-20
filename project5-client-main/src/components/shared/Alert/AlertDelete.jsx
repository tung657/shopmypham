import { useTransition, animated } from '@react-spring/web';

export default function AlertDelete({ showAlert, setShowAlert, handleDelete }) {
  const transitions = useTransition(showAlert, {
    from: { opacity: 0, scale: 1.2 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 1.1 },
    reverse: showAlert,
    config: { duration: 150 },
  });

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
                setShowAlert(false);
              }}
            >
              <animated.div
                // style={scale}
                style={styles}
                className='relative h-full mx-auto w-full'
              >
                <div className='w-full md:w-auto absolute left-1/2 transform -translate-x-1/2 shadow-xl h-auto max-h-full top-1/2 -translate-y-1/2 rounded-lg'
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className='p-6 rounded-lg bg-white z-[100]'>
                    <div className='flex items-center'>
                      <svg
                        aria-hidden='true'
                        className='w-8 h-8 mr-2 text-red-900'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          fillRule='evenodd'
                          d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                          clipRule='evenodd'
                        ></path>
                      </svg>
                      <span className='sr-only'>Info</span>
                      <h3 className='text-xl font-medium uppercase text-red-900'>
                        Cảnh báo
                      </h3>
                    </div>
                    <div className='mt-4 mb-4 text-lg'>
                      Bạn có thực sự muốn xóa không?
                    </div>
                    <div className='flex'>
                      <button
                        type='button'
                        className='text-white bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded text-sm px-4 py-2 mr-2 text-center inline-flex items-center'
                        onClick={handleDelete}
                      >
                        Xác Nhận
                      </button>
                      <button
                        type='button'
                        className='text-gray-900 bg-transparent border border-gray-900 hover:bg-gray-100 hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded text-sm px-4 py-2 text-center'
                        data-dismiss-target='#alert-additional-content-2'
                        aria-label='Close'
                        onClick={() => setShowAlert(false)}
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
    </>
  );
}
