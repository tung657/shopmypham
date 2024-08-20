import { useState } from 'react';
import Subscribe from '../home/subscribe/Subscribe';
import { Collapse } from 'react-collapse';

const questions = [
  {
    title: 'Cách liên hệ Dịch Vụ Khách Hàng?',
    content: `Nhóm Trải nghiệm khách hàng của chúng tôi làm việc 7 ngày một
    tuần và chúng tôi cung cấp 2 cách để liên hệ. Email và Trò
    chuyện. Chúng tôi cố gắng trả lời nhanh chóng, vì vậy bạn không
    cần đợi quá lâu để nhận được phản hồi!.`,
  },
  {
    title: 'Tại sao tôi lại cần xác minh email',
    content: `Chúng tôi cần bạn xác minh email bởi vì điều đó giúp chúng tôi biết chính xác tài khoản đó có phải một tài khoản clone hay không.`,
  },
  {
    title: 'Phản hồi website mất thời gian, làm sao để cải thiện?',
    content: `Đầu tiên, vui lòng kiểm tra kết nối internet của bạn. Chúng tôi cũng có một số video hướng dẫn trực tuyến về vấn đề này. Nếu vẫn chưa giải quyết được, vui lòng gửi yêu cầu tới chúng tôi để được hỗ trợ.`,
  },
  {
    title: 'Làm cách nào để tạo một tài khoản?',
    content: `Nếu bạn muốn mở một tài khoản để sử dụng, bạn có thể thực hiện qua điện thoại hoặc máy tính. Mở một tài khoản trực tuyến chỉ mất vài phút.`,
  },
];

export default function MainFaq() {
  const [question1Selected, setQuestion1Selected] = useState(true);
  const [question2Selected, setQuestion2Selected] = useState(false);
  const [question3Selected, setQuestion3Selected] = useState(false);
  const [question4Selected, setQuestion4Selected] = useState(false);

  return (
    <>
      <div className='mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16'>
        <div className='py-16 lg:py-20 px-0 max-w-5xl mx-auto space-y-4'>
          <div className='rounded-md bg-gray-200'>
            <header
              className='cursor-pointer flex items-center justify-between transition-colors py-5 md:py-6 px-6 md:px-8 lg:px-10'
              onClick={() => setQuestion1Selected(!question1Selected)}
            >
              <h2 className='text-base font-semibold leading-relaxed text-heading pe-2 md:text-lg'>
                {questions[0].title}
              </h2>
              <div className='flex-shrink-0 relative w-4 h-4 flex justify-center items-center'>
                <div className='w-full h-0.5 bg-heading rounded-sm'></div>
                <div
                  className={
                    'origin-bottom transform w-0.5 h-full bg-heading rounded-sm absolute bottom-0 transition-transform duration-500 ease-in-out ' +
                    (question1Selected ? 'scale-0' : 'scale-100')
                  }
                ></div>
              </div>
            </header>
            <Collapse isOpened={question1Selected}>
              <div className='pb-6 md:pb-7 leading-7 text-base text-gray-600 pt-5 border-t border-gray-300 px-6 md:px-8 lg:px-10'>
                {questions[0].content}
              </div>
            </Collapse>
          </div>
          <div className='rounded-md bg-gray-200'>
            <header
              className='cursor-pointer flex items-center justify-between transition-colors py-5 md:py-6 px-6 md:px-8 lg:px-10'
              onClick={() => setQuestion2Selected(!question2Selected)}
            >
              <h2 className='text-base font-semibold leading-relaxed text-heading pe-2 md:text-lg'>
                {questions[1].title}
              </h2>
              <div className='flex-shrink-0 relative w-4 h-4 flex justify-center items-center'>
                <div className='w-full h-0.5 bg-heading rounded-sm'></div>
                <div
                  className={
                    'origin-bottom transform w-0.5 h-full bg-heading rounded-sm absolute bottom-0 transition-transform duration-500 ease-in-out ' +
                    (question2Selected ? 'scale-0' : 'scale-100')
                  }
                ></div>
              </div>
            </header>
            <Collapse isOpened={question2Selected}>
              <div className='pb-6 md:pb-7 leading-7 text-base text-gray-600 pt-5 border-t border-gray-300 px-6 md:px-8 lg:px-10'>
                {questions[1].content}
              </div>
            </Collapse>
          </div>
          <div className='rounded-md bg-gray-200'>
            <header
              className='cursor-pointer flex items-center justify-between transition-colors py-5 md:py-6 px-6 md:px-8 lg:px-10'
              onClick={() => setQuestion3Selected(!question3Selected)}
            >
              <h2 className='text-base font-semibold leading-relaxed text-heading pe-2 md:text-lg'>
                {questions[2].title}
              </h2>
              <div className='flex-shrink-0 relative w-4 h-4 flex justify-center items-center'>
                <div className='w-full h-0.5 bg-heading rounded-sm'></div>
                <div
                  className={
                    'origin-bottom transform w-0.5 h-full bg-heading rounded-sm absolute bottom-0 transition-transform duration-500 ease-in-out ' +
                    (question3Selected ? 'scale-0' : 'scale-100')
                  }
                ></div>
              </div>
            </header>
            <Collapse isOpened={question3Selected}>
              <div className='pb-6 md:pb-7 leading-7 text-base text-gray-600 pt-5 border-t border-gray-300 px-6 md:px-8 lg:px-10'>
                {questions[2].content}
              </div>
            </Collapse>
          </div>
          <div className='rounded-md bg-gray-200'>
            <header
              className='cursor-pointer flex items-center justify-between transition-colors py-5 md:py-6 px-6 md:px-8 lg:px-10'
              onClick={() => setQuestion4Selected(!question4Selected)}
            >
              <h2 className='text-base font-semibold leading-relaxed text-heading pe-2 md:text-lg'>
                {questions[3].title}
              </h2>
              <div className='flex-shrink-0 relative w-4 h-4 flex justify-center items-center'>
                <div className='w-full h-0.5 bg-heading rounded-sm'></div>
                <div
                  className={
                    'origin-bottom transform w-0.5 h-full bg-heading rounded-sm absolute bottom-0 transition-transform duration-500 ease-in-out ' +
                    (question4Selected ? 'scale-0' : 'scale-100')
                  }
                ></div>
              </div>
            </header>
            <Collapse isOpened={question4Selected}>
              <div className='pb-6 md:pb-7 leading-7 text-base text-gray-600 pt-5 border-t border-gray-300 px-6 md:px-8 lg:px-10'>
                {questions[3].content}
              </div>
            </Collapse>
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
