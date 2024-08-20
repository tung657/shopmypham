import Subscribe from '../home/subscribe/Subscribe';
import { Link, Element } from 'react-scroll';

const privacies = [
  {
    title: 'Mục đích',
    content: `Artemis cam kết bảo vệ quyền riêng tư của bạn vì chúng tôi cam kết coi trọng con người. Chính sách quyền riêng tư của chúng tôi dưới đây trình bày cách thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn. Nguyên tắc Quyền riêng tư của Quốc gia Demo cũng áp dụng cho chúng tôi. <br /> <br />

    Chính sách quyền riêng tư này mô tả các chính sách và quy trình của chúng tôi về việc thu thập, lưu giữ, sử dụng và tiết lộ thông tin cá nhân của bạn và nên được đọc cùng với Điều khoản và điều kiện của chúng tôi. Bằng cách cung cấp thông tin cá nhân của bạn, bạn đồng ý với việc chúng tôi thu thập, sử dụng và tiết lộ thông tin đó theo Chính sách quyền riêng tư này.`,
  },
  {
    title: 'Dữ liệu Cá nhân là gì?',
    content: `Khi được sử dụng trong Chính sách này, 'thông tin cá nhân' có nghĩa được quy định trong Đạo luật về quyền riêng tư. Nói chung, nó có nghĩa là bất kỳ thông tin hoặc ý kiến ​​nào có thể được sử dụng để nhận dạng bạn.`,
  },
  {
    title: 'Dữ liệu cá nhân được thu thập',
    content: `Dữ liệu Cá nhân được thu thập cho các mục đích sau và sử dụng các dịch vụ sau:
    <br />
    Google Analytics: Cookies; Dữ liệu sử dụng <br />
    Hình thức liên hệ: Địa chỉ email; Họ tên; Số điện thoại <br />
    Danh sách gửi thư hoặc bản tin: địa chỉ email`,
  },
  {
    title: 'Truy cập dữ liệu Cá nhân',
    content: `Bạn có thể yêu cầu quyền truy cập vào thông tin cá nhân của bạn do chúng tôi thu thập và yêu cầu chúng tôi sửa thông tin cá nhân đó. Bạn có thể yêu cầu quyền truy cập hoặc chỉnh sửa bằng cách liên hệ với chúng tôi và chúng tôi thường sẽ trả lời trong vòng 30 ngày. Nếu chúng tôi từ chối cấp cho bạn quyền truy cập hoặc sửa thông tin cá nhân của bạn, chúng tôi sẽ thông báo cho bạn bằng văn bản nêu rõ lý do.`,
  },
  {
    title: 'Khiếu nại',
    content: `Nếu bạn tin rằng quyền riêng tư của mình đã bị vi phạm hoặc bạn có khiếu nại về cách chúng tôi xử lý thông tin cá nhân của bạn, vui lòng liên hệ với chúng tôi bằng văn bản. Chúng tôi sẽ trả lời trong một khoảng thời gian hợp lý (thường là trong vòng 30 ngày).`,
  },
  {
    title: 'Chủ sở hữu và người kiểm soát dữ liệu',
    content: `Le Minh <br />
    Web Developer, <br />
    01 T11 2000 <br />
    Tứ Dân, Khoái Châu, Hưng Yên <br />
    <br />
    Email: minhdra011100@gmail.com`,
  },
];

export default function MainPrivacy() {
  return (
    <>
      <div className='mt-12 lg:mt-14 xl:mt-16 lg:py-1 xl:py-0 border-b border-gray-300 px-4 md:px-10 lg:px-7 xl:px-16 2xl:px-24 3xl:px-32 pb-9 md:pb-14 lg:pb-16 2xl:pb-20 3xl:pb-24'>
        <div className='mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16'>
          <div className='flex flex-col md:flex-row'>
            <nav className='md:w-72 xl:w-3/12 mb-8 md:mb-0'>
              <ol className='sticky md:top-16 lg:top-28 z-10'>
                {privacies &&
                  privacies.map((item, index) => (
                    <li key={index}>
                      <Link
                        activeClass='font-semibold'
                        className={
                          'block cursor-pointer py-3 lg:py-3.5 text-sm lg:text-base text-gray-700 uppercase transition-all '
                        }
                        to={`privacy-${index + 1}-item`}
                        spy={true}
                        smooth={true}
                        duration={500}
                        offset={-100}
                      >
                        {index + 1} {item.title}
                      </Link>
                    </li>
                  ))}
              </ol>
            </nav>
            <div className='md:w-9/12 md:ps-8 pt-0 lg:pt-2'>
              {privacies &&
                privacies.map((item, index) => (
                  <Element
                    key={index}
                    name={`privacy-${index + 1}-item`}
                    className='mb-10'
                  >
                    <h2 className='text-lg md:text-xl lg:text-2xl text-heading font-bold mb-4'>
                      {item.title}
                    </h2>
                    <div className='text-heading text-sm leading-7 lg:text-base lg:leading-loose'>
                      <span
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      ></span>
                    </div>
                  </Element>
                ))}
            </div>
          </div>

          <Subscribe
            classes={
              '!bg-opacity-100 !sm:px-8 !md:px-16 !2xl:px-24 items-center !md:py-14 !xl:px-[4rem] !lg:py-16'
            }
          />
        </div>
      </div>
    </>
  );
}
