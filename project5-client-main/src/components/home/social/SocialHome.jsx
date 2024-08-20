export default function SocialHome() {
  return (
    <>
      <div className="my-8 md:my-12 lg:my-16 xl:my-20 3xl:my-24 pb-5 lg:pb-3.5 2xl:pb-5 pt-3 lg:pt-1.5 2xl:pt-2 3xl:pt-3 text-center">
        <div className="max-w-md mx-auto mb-4 md:mb-5 xl:mb-8 2xl:mb-10 3xl:mb-12">
          <h3 className="text-lg md:text-xl lg:text-2xl 2xl:text-3xl xl:leading-10 font-bold text-heading mb-2 md:mb-3 lg:mb-3.5">
            Trò Chuyện Với Chúng Tôi
          </h3>
          <p className="text-body text-xs md:text-sm leading-6 md:leading-7">
            Bạn đang gặp khó khăn? Có nghi vấn? Cần gợi ý? Chúng tôi luôn sẵn
            sàng giúp đỡ. Gửi tin nhắn tới chúng tôi.
          </p>
        </div>
        <div className="mb-2.5 md:mb-2 xl:mb-2 2xl:mb-4 3xl:mb-6 md:px-20 lg:px-40 xl:px-0">
          <span className="box-border inline-block overflow-hidden opacity-100 m-0 p-0 relative max-w-full">
            <span className="box-border block opacity-100 m-0 p-2 w-[250px] h-[250px] rounded-full bg-slate-200">
              <img
                alt=""
                aria-hidden="true"
                src={require("../../../assets/images/others/chat.jpg")}
                className="block max-w-full h-full object-cover opacity-100 m-0 p-0 rounded-full"
              />
            </span>
          </span>
        </div>
        <a
          data-variant="flat"
          className="text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none rounded-md  bg-heading text-white px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-gray-600 hover:shadow-cart"
          href={"https://facebook.com/callmetung4"}
          target={"_blank"}
          rel="noreferrer"
        >
          Trò chuyện với chúng tôi
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            className="ms-2 text-lg md:text-xl"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="32"
              d="M87.48 380c1.2-4.38-1.43-10.47-3.94-14.86a42.63 42.63 0 00-2.54-3.8 199.81 199.81 0 01-33-110C47.64 139.09 140.72 48 255.82 48 356.2 48 440 117.54 459.57 209.85a199 199 0 014.43 41.64c0 112.41-89.49 204.93-204.59 204.93-18.31 0-43-4.6-56.47-8.37s-26.92-8.77-30.39-10.11a31.14 31.14 0 00-11.13-2.07 30.7 30.7 0 00-12.08 2.43L81.5 462.78a15.92 15.92 0 01-4.66 1.22 9.61 9.61 0 01-9.58-9.74 15.85 15.85 0 01.6-3.29z"
            ></path>
            <circle cx="160" cy="256" r="32"></circle>
            <circle cx="256" cy="256" r="32"></circle>
            <circle cx="352" cy="256" r="32"></circle>
          </svg>
        </a>
      </div>
    </>
  );
}
