import { useState } from 'react';

export default function AlertProduct({ content }) {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <>
      {showAlert && (
        <div className='flex justify-center relative bg-borderBottom transition duration-200 ease-in py-4'>
          <div className='w-full mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16'>
            <div className='relative text-center text-heading text-xs md:text-sm leading-6 md:leading-7 px-8 font-medium capitalize'>
              {content}
              <button
                className='absolute h-full end-0 top-0 flex text-lg md:text-2xl items-center justify-center text-gray-500 opacity-50 focus:outline-none transition-opacity hover:opacity-100'
                aria-label='close'
                onClick={() => setShowAlert(false)}
              >
                <svg
                  stroke='currentColor'
                  fill='currentColor'
                  strokeWidth='0'
                  viewBox='0 0 512 512'
                  className='text-black'
                  height='1em'
                  width='1em'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z'></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
