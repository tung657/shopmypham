import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { toast } from 'react-toastify';
import {
  checkCustomerReview,
  create,
  getByProduct,
  remove,
} from '../../services/review';
import { formatDateTime2 } from '../../utils/format/formatDate';
import { reviewValidator } from '../../utils/validator/reviewValidator';
import AlertDelete from '../shared/Alert/AlertDelete';
import Hr from '../shared/hr/Hr';

// const listTags = [
//   'Chất lượng sản phẩm tuyệt vời',
//   'Giao hàng nhanh',
//   'Giá rẻ vô đối',
//   'Sản phẩm lỗi',
//   'Giá quá đắt',
// ];

export default function Review({ product, user, rating, setRating }) {
  const [totalStar, setTotalStar] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [filterStars, setFilterStars] = useState([]);
  const [selectedFilterStar, setSelectedFilterStar] = useState(0);
  const [allowReview, setAllowReview] = useState(false);
  const [showAlertDelete, setShowAlertDelete] = useState(false);
  const [indexSelectedReview, setIndexSelectedReview] = useState();

  const [comment, setComment] = useState('');
  const [classify, setClassify] = useState('');
  // const [tags, setTags] = useState([]);

  const [validateMessages, setValidateMessages] = useState([]);

  const handleSearch = useCallback(
    (index) => {
      getByProduct({ product: product?.id, rating: index }).then((res) =>
        setReviews(res)
      );
    },
    [product]
  );

  useEffect(() => {
    if (product) handleSearch(selectedFilterStar);
  }, [handleSearch, product, selectedFilterStar]);

  // Set allow comment
  useEffect(() => {
    if (product && user)
      checkCustomerReview({
        product: product?.id,
        customer: user?.id,
        customer_id: user?._id,
      }).then((res) => setAllowReview(res));
  }, [product, user]);

  //
  useEffect(() => {
    if (reviews && reviews?.length > 0) {
      const total = reviews.reduce((prev, curr) => prev + curr.rating, 0);
      setTotalStar(total);
    }
  }, [reviews]);

  // set list filter stars
  useEffect(() => {
    if (reviews) {
      const filArray = [];
      [...Array(5)].forEach((_, index) => {
        const total = reviews.filter(
          (item) => item.rating === index + 1
        ).length;
        filArray.unshift({
          index: index + 1,
          name: `${index + 1} Sao (${total})`,
        });
      });
      filArray.unshift({ index: 0, name: 'Tất Cả' });
      setFilterStars(filArray);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSendReview = (e) => {
    e.preventDefault();

    const data = {
      customer: user.id,
      product: product.id,
      rating,
      classify,
      comment,
    };

    const validator = reviewValidator(data);
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
      create(data)
        .then((res) => {
          toast('Đánh giá thành công', {
            autoClose: 1000,
          });
          setAllowReview(false);
          handleSearch(selectedFilterStar);
          setComment('');
          setClassify('');
          setRating(0);
        })
        .catch((err) => toast(err.response.data.message));
    }
  };

  const handleRemoveReview = () => {
    remove(indexSelectedReview)
      .then((res) => {
        toast.success('Cập nhật thành công!');
        setShowAlertDelete(false);
        handleSearch(selectedFilterStar);
        setAllowReview(true);
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  return (
    <>
      <div className='pb-6 md:pb-7 leading-7 text-sm text-gray-600'>
        <div className='flex flex-col sm:flex-row items-center bg-red-50 py-8 px-8 rounded-md mb-4'>
          <div className='flex flex-col mb-2 sm:mb-0 items-center sm:mr-8 min-w-[150px]'>
            <div className='text-2xl font-bold'>{totalStar} trên 5</div>
            <StarRatings
              name='full-rate'
              rating={totalStar}
              starRatedColor={'rgb(249 115 22)'}
              starHoverColor={'rgb(249 115 22)'}
              // starEmptyColor={'gray'}
              starDimension='20px'
              starSpacing='1px'
            />
          </div>
          <div className='flex flex-wrap justify-center sm:justify-start gap-2 sm:ml-4'>
            {filterStars &&
              filterStars.map((item, index) => (
                <div
                  key={index}
                  className={
                    'min-w-[6.25rem] h-8 px-3 bg-white border rounded-sm text-center cursor-pointer inline-block capitalize font-medium select-none hover:text-red-600 hover:border-red-600 ' +
                    (item.index === selectedFilterStar
                      ? 'text-red-600 border-red-600'
                      : 'border-black ')
                  }
                  onClick={() => {
                    setSelectedFilterStar(item.index);
                    handleSearch(item.index);
                  }}
                >
                  {item.name}
                </div>
              ))}
          </div>
        </div>
        {allowReview && (
          <form
            className='w-full mx-auto flex flex-col justify-center mb-4 bg-slate-100 p-4 rounded-md'
            noValidate=''
          >
            <div className='flex flex-col space-y-3'>
              <label className='block text-gray-600 font-semibold text-base'>
                Tên: Le Minh
              </label>
              <div className='flex items-end gap-4 pb-1.5'>
                <label className='block text-gray-600 font-semibold text-sm'>
                  Đánh giá của bạn <span className='text-red-500'>*</span>:
                </label>
                <StarRatings
                  name='user-rating'
                  rating={rating}
                  changeRating={(rate) => setRating(rate)}
                  starRatedColor={'rgb(249 115 22)'}
                  starHoverColor={'rgb(249 115 22)'}
                  // starEmptyColor={'gray'}
                  starDimension='20px'
                  starSpacing='1px'
                />
                <small className='text-red-500 font-medium'>
                  {validateMessages.map((message) =>
                    message.key === 'rating' ? message.message : null
                  )}
                </small>
              </div>
              <div className='flex items-center gap-4 pb-1.5'>
                <label className='block text-gray-600 font-semibold text-sm'>
                  Phân loại <span className='text-red-500'>*</span>:
                </label>
                <input
                  className='px-4 py-3 flex items-center rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 bg-white border border-gray-300 focus:shadow focus:border-heading placeholder-body'
                  placeholder='Phân loại: Đen, XL'
                  value={classify}
                  onChange={(e) => setClassify(e.target.value)}
                />
                <small className='text-red-500 font-medium'>
                  {validateMessages.map((message) =>
                    message.key === 'classify' ? message.message : null
                  )}
                </small>
              </div>
              {/* <div className='flex items-end gap-4 pb-1.5'>
                <label className='block text-gray-600 font-semibold text-sm'>
                  Nhận xét <span className='text-red-500'>*</span>:
                </label>
                
                <div></div>
              </div> */}
              <div>
                <label
                  htmlFor='message'
                  className='block text-gray-600 font-semibold text-sm leading-none mb-3'
                >
                  Nội dung <span className='text-red-500'>*</span>:
                </label>
                <textarea
                  id='message'
                  name='message'
                  className='px-4 py-3 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 bg-white border border-gray-300 focus:shadow focus:border-heading placeholder-body'
                  autoComplete='off'
                  spellCheck='false'
                  rows='4'
                  placeholder='Nội dung đánh giá'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>

                <small className='text-red-500 font-medium'>
                  {validateMessages.map((message) =>
                    message.key === 'comment' ? message.message : null
                  )}
                </small>
              </div>
              <div className='pt-1 text-right'>
                <button
                  data-variant='flat'
                  className='text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none rounded-md  bg-heading text-white px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-gray-600 hover:shadow-cart h-12 md:mt-1 text-sm lg:text-base w-full sm:w-auto'
                  type='submit'
                  onClick={handleSendReview}
                >
                  Đồng Ý
                </button>
              </div>
            </div>
          </form>
        )}
        <div className='flex flex-col'>
          {reviews ? (
            reviews.length > 0 ? (
              reviews.map((item) => (
                <div key={item._id} className='flex items-start mb-4'>
                  <div className='mr-3'>
                    <img
                      alt=''
                      src={item.customer?.avatar}
                      className='object-cover rounded-full w-[40px] h-[40px]'
                    />
                  </div>
                  <div className='flex-1'>
                    <div>
                      <div className='flex items-center justify-between'>
                        <Link
                          className={
                            'block text-black ' +
                            (user?.id === item?.customer?.id
                              ? 'font-semibold text-red-600'
                              : '')
                          }
                          to={'/account/' + item.customer?.path}
                        >
                          {item.customer?.first_name || item.customer?.path}
                        </Link>
                        {user?.id === item?.customer?.id && (
                          <span
                            className='font-semibold hover:underline cursor-pointer'
                            onClick={() => {
                              setIndexSelectedReview(item);
                              setShowAlertDelete(true);
                            }}
                          >
                            Xóa
                          </span>
                        )}
                      </div>
                      <StarRatings
                        rating={item.rating}
                        starRatedColor={'rgb(249 115 22)'}
                        starHoverColor={'rgb(249 115 22)'}
                        // starEmptyColor={'gray'}
                        starDimension='20px'
                        starSpacing='1px'
                      />
                      <div className='text-slate-400 text-xs mt-2'>
                        <span>{formatDateTime2(item.createdAt)}</span> {' | '}{' '}
                        <span>Phân loại: {item.classify}</span>
                      </div>
                      <div className='mt-2'>{item.comment}</div>
                      {/* <div className='flex gap-2 items-center mt-2'>
                          <div className='border border-slate-500 text-sm rounded-full py-1 px-4 cursor-default text-slate-400'>
                            Chất lượng sản phẩm tuyệt vời
                          </div>
                        </div> */}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>Không có đánh giá nào</>
            )
          ) : (
            <></>
          )}
          <Hr />
        </div>
      </div>
      <AlertDelete
        showAlert={showAlertDelete}
        setShowAlert={setShowAlertDelete}
        handleDelete={handleRemoveReview}
      />
    </>
  );
}
