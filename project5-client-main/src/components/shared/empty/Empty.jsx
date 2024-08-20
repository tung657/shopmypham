export default function Empty() {
  return (
    <>
      <div className='flex flex-col justify-center items-center w-full'>
        <img
          src={require('../../../assets/images/others/empty_state.svg').default}
          alt='empty'
          className='object-cover'
        />
        <div className='font-semibold'>
          Có Vẻ Không Có Gì Ở Đây!
        </div>
      </div>
    </>
  )
}