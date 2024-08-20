import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

import { search as searchCategories } from "../../../services/category";

export default function Footer() {
  const [categories, setCategories] = useState();

  useEffect(() => {
    searchCategories().then((res) => {
      if (res.length > 4) res.length = 4;
      setCategories(res);
    });
  }, []);

  return (
    <>
      <footer
        className="border-b-4 border-heading mt-9 md:mt-11 lg:mt-16 3xl:mt-20 pt-2.5 lg:pt-0 2xl:pt-2"
        style={{ backgroundColor: "#f5f5f5" }}
      >
        <div className="mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-9 xl:gap-5  pb-9 md:pb-14 lg:pb-16 2xl:pb-20 3xl:pb-24 lg:mb-0.5 2xl:mb-0 3xl:-mb-1 xl:grid-cols-6">
            <div className="pb-3 md:pb-0 undefined">
              <h4 className="text-heading text-sm md:text-base xl:text-lg font-semibold mb-5 2xl:mb-6 3xl:mb-7">
                Mạng Xã Hội
              </h4>
              <ul className="text-xs lg:text-sm text-body flex flex-col space-y-3 lg:space-y-3.5">
                <li className="flex items-baseline">
                  <span className="me-3 relative top-0.5 lg:top-1 text-sm lg:text-base">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M349.33 69.33a93.62 93.62 0 0193.34 93.34v186.66a93.62 93.62 0 01-93.34 93.34H162.67a93.62 93.62 0 01-93.34-93.34V162.67a93.62 93.62 0 0193.34-93.34h186.66m0-37.33H162.67C90.8 32 32 90.8 32 162.67v186.66C32 421.2 90.8 480 162.67 480h186.66C421.2 480 480 421.2 480 349.33V162.67C480 90.8 421.2 32 349.33 32z"></path>
                      <path d="M377.33 162.67a28 28 0 1128-28 27.94 27.94 0 01-28 28zM256 181.33A74.67 74.67 0 11181.33 256 74.75 74.75 0 01256 181.33m0-37.33a112 112 0 10112 112 112 112 0 00-112-112z"></path>
                    </svg>
                  </span>
                  <a
                    className="transition-colors duration-200 hover:text-black"
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.instagram.com/betungbietiu/"
                  >
                    Instagram
                  </a>
                </li>
                <li className="flex items-baseline">
                  <span className="me-3 relative top-0.5 lg:top-1 text-sm lg:text-base">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M496 109.5a201.8 201.8 0 01-56.55 15.3 97.51 97.51 0 0043.33-53.6 197.74 197.74 0 01-62.56 23.5A99.14 99.14 0 00348.31 64c-54.42 0-98.46 43.4-98.46 96.9a93.21 93.21 0 002.54 22.1 280.7 280.7 0 01-203-101.3A95.69 95.69 0 0036 130.4c0 33.6 17.53 63.3 44 80.7A97.5 97.5 0 0135.22 199v1.2c0 47 34 86.1 79 95a100.76 100.76 0 01-25.94 3.4 94.38 94.38 0 01-18.51-1.8c12.51 38.5 48.92 66.5 92.05 67.3A199.59 199.59 0 0139.5 405.6a203 203 0 01-23.5-1.4A278.68 278.68 0 00166.74 448c181.36 0 280.44-147.7 280.44-275.8 0-4.2-.11-8.4-.31-12.5A198.48 198.48 0 00496 109.5z"></path>
                    </svg>
                  </span>
                  <a
                    className="transition-colors duration-200 hover:text-black"
                    target="_blank"
                    rel="noreferrer"
                    href="https://twitter.com/TngNguy68207157"
                  >
                    Twitter
                  </a>
                </li>
                <li className="flex items-baseline">
                  <span className="me-3 relative top-0.5 lg:top-1 text-sm lg:text-base">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M480 257.35c0-123.7-100.3-224-224-224s-224 100.3-224 224c0 111.8 81.9 204.47 189 221.29V322.12h-56.89v-64.77H221V208c0-56.13 33.45-87.16 84.61-87.16 24.51 0 50.15 4.38 50.15 4.38v55.13H327.5c-27.81 0-36.51 17.26-36.51 35v42h62.12l-9.92 64.77H291v156.54c107.1-16.81 189-109.48 189-221.31z"
                      ></path>
                    </svg>
                  </span>
                  <a
                    className="transition-colors duration-200 hover:text-black"
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.facebook.com/callmetung4/"
                  >
                    Facebook
                  </a>
                </li>
                <li className="flex items-baseline">
                  <span className="me-3 relative top-0.5 lg:top-1 text-sm lg:text-base">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-discord"
                      viewBox="0 0 16 16"
                    >
                      <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
                    </svg>
                  </span>
                  <a
                    className="transition-colors duration-200 hover:text-black"
                    target="_blank"
                    rel="noreferrer"
                    href="https://discord.com/thanhtung/0576"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div className="pb-3 md:pb-0 undefined">
              <h4 className="text-heading text-sm md:text-base xl:text-lg font-semibold mb-5 2xl:mb-6 3xl:mb-7">
                Liên Hệ
              </h4>
              <ul className="text-xs lg:text-sm text-body flex flex-col space-y-3 lg:space-y-3.5">
                <li className="flex items-baseline">
                  <Link
                    className="transition-colors duration-200 hover:text-black"
                    to="/pages/contact-us"
                  >
                    Liện Hệ Chúng Tôi
                  </Link>
                </li>
                <li className="flex items-baseline">
                  <a
                    className="transition-colors duration-200 hover:text-black"
                    href="mailto:tungkdhy2002@gmail.com"
                  >
                    Email: tungkdhy2002@gmail.com
                  </a>
                </li>
                <li className="flex items-baseline">
                  <a
                    className="transition-colors duration-200 hover:text-black"
                    href="tel:0931527826"
                  >
                    Số điện thoại: +84 931 527 826
                  </a>
                </li>
              </ul>
            </div>
            <div className="pb-3 md:pb-0 undefined">
              <h4 className="text-heading text-sm md:text-base xl:text-lg font-semibold mb-5 2xl:mb-6 3xl:mb-7">
                Giúp Đỡ
              </h4>
              <ul className="text-xs lg:text-sm text-body flex flex-col space-y-3 lg:space-y-3.5">
                <li className="flex items-baseline">
                  <Link
                    className="transition-colors duration-200 hover:text-black"
                    to="/pages/contact-us"
                  >
                    Hỗ Trợ Khách Hàng
                  </Link>
                </li>
                <li className="flex items-baseline">
                  <Link
                    className="transition-colors duration-200 hover:text-black"
                    to="/pages/about-us"
                  >
                    Về Chúng Tôi
                  </Link>
                </li>
              </ul>
            </div>
            <div className="pb-3 md:pb-0 undefined">
              <h4 className="text-heading text-sm md:text-base xl:text-lg font-semibold mb-5 2xl:mb-6 3xl:mb-7">
                Chăm Sóc Khách Hàng
              </h4>
              <ul className="text-xs lg:text-sm text-body flex flex-col space-y-3 lg:space-y-3.5">
                <li className="flex items-baseline">
                  <a
                    className="transition-colors duration-200 hover:text-black"
                    href="/pages/faq"
                  >
                    FAQ &amp; Giúp Đỡ
                  </a>
                </li>
                <li className="flex items-baseline">
                  <a
                    className="transition-colors duration-200 hover:text-black"
                    href="/"
                  >
                    Giao Hàng &amp; Vận Chuyển
                  </a>
                </li>
                <li className="flex items-baseline">
                  <a
                    className="transition-colors duration-200 hover:text-black"
                    href="/"
                  >
                    Hòa Tiền &amp; Đổi Trả
                  </a>
                </li>
              </ul>
            </div>
            <div className="pb-3 md:pb-0 undefined">
              <h4 className="text-heading text-sm md:text-base xl:text-lg font-semibold mb-5 2xl:mb-6 3xl:mb-7">
                Thông Tin Về Chúng Tôi
              </h4>
              <ul className="text-xs lg:text-sm text-body flex flex-col space-y-3 lg:space-y-3.5">
                <li className="flex items-baseline">
                  <Link
                    className="transition-colors duration-200 hover:text-black"
                    to="/pages/privacy"
                  >
                    Chính Sách Bảo Mật
                  </Link>
                </li>
                <li className="flex items-baseline">
                  <Link
                    className="transition-colors duration-200 hover:text-black"
                    to="/pages/terms"
                  >
                    Điều Khoản &amp; Điều Kiện
                  </Link>
                </li>
                <li className="flex items-baseline">
                  <Link
                    className="transition-colors duration-200 hover:text-black"
                    to="/pages/privacy"
                  >
                    Chính Sách Hoàn Trả
                  </Link>
                </li>
                <li className="flex items-baseline">
                  <Link
                    className="transition-colors duration-200 hover:text-black"
                    to="/brands"
                  >
                    Thương Hiệu
                  </Link>
                </li>
              </ul>
            </div>
            <div className="pb-3 md:pb-0 undefined">
              <h4 className="text-heading text-sm md:text-base xl:text-lg font-semibold mb-5 2xl:mb-6 3xl:mb-7">
                Danh Mục Hàng Đầu
              </h4>
              <ul className="text-xs lg:text-sm text-body flex flex-col space-y-3 lg:space-y-3.5">
                {categories
                  ? categories.map((item) => (
                      <li key={item._id} className="flex items-baseline">
                        <Link
                          className="transition-colors duration-200 hover:text-black"
                          to={"/category/" + item.path}
                        >
                          {item.category_name}
                        </Link>
                      </li>
                    ))
                  : [...Array(4)].map((_, index) => (
                      <li key={index}>
                        <Skeleton height={20} />
                      </li>
                    ))}
              </ul>
            </div>
          </div>
        </div>
        <div
          className="border-t border-gray-300 pt-5 pb-16 sm:pb-20 md:pb-5 mb-2 sm:mb-0"
        >
          <div className="flex flex-col-reverse md:flex-row text-center md:justify-between mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16">
            <p className="text-body text-xs lg:text-sm leading-6">
              Copyright © {new Date().getFullYear()}&nbsp;
              <a
                className="font-semibold text-gray-700 transition-colors duration-200 ease-in-out hover:text-body"
                href="https://github.com/tung144/"
              >
                Thanh Tung.
              </a>
            </p>
            <ul className="hidden md:flex flex-wrap justify-center items-center space-s-4 xs:space-s-5 lg:space-s-7 mb-1 md:mb-0 mx-auto md:mx-0">
              <li className="mb-2 md:mb-0 transition hover:opacity-80">
                <a href="/" target="_blank">
                  <img
                    src={
                      require("../../../assets/images/payment/mastercard.svg")
                        .default
                    }
                    alt="Master Card"
                    height="20"
                    width="34"
                  />
                </a>
              </li>
              <li className="mb-2 md:mb-0 transition hover:opacity-80">
                <a href="/" target="_blank">
                  <img
                    src={
                      require("../../../assets/images/payment/visa.svg").default
                    }
                    alt="Visa"
                    height="20"
                    width="50"
                  />
                </a>
              </li>
              <li className="mb-2 md:mb-0 transition hover:opacity-80">
                <a href="/" target="_blank">
                  <img
                    src={
                      require("../../../assets/images/payment/paypal.svg")
                        .default
                    }
                    alt="Paypal"
                    height="20"
                    width="76"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
