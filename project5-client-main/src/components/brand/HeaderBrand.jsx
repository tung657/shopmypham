export default function HeaderBrand({ isGrid, setIsGrid }) {
  return (
    <>
      <div className='flex items-center justify-between mb-6 xl:mb-8'>
        <h2 className='font-bold text-heading text-lg md:text-xl lg:text-2xl xl:text-3xl'>
          Thương Hiệu
        </h2>
        <div className='flex-shrink-0 flex items-center ms-2'>
          <button
            aria-label='list'
            className={
              'text-2xl relative top-[1px] transition-all text-heading ' +
              (!isGrid ? 'text-red-600' : '')
            }
            onClick={() => setIsGrid(false)}
          >
            <svg
              stroke='currentColor'
              fill='currentColor'
              strokeWidth='0'
              viewBox='0 0 16 16'
              height='1em'
              width='1em'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                filleule='evenodd'
                d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z'
              ></path>
            </svg>
          </button>
          <button
            aria-label='grid'
            className={
              'text-lg transition-all ms-1.5 ' +
              (isGrid ? 'text-red-600' : 'text-body')
            }
            onClick={() => setIsGrid(true)}
          >
            <svg
              stroke='currentColor'
              fill='currentColor'
              strokeWidth='0'
              viewBox='0 0 16 16'
              height='1em'
              width='1em'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z'></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
