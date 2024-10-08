"use client";
import Image from "next/image";
import logo from "@/assets/images/Logowhite.svg";
import footerTop from "@/assets/images/footerTop.svg";
import { CiLocationOn, CiMail } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaVk } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import api from "@/lib/api";
export default function Footer() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsScrolled(true);
    setTimeout(() => setIsScrolled(false), 500);
  };

  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await api.get("/avto/marka/");
        // Assume the API response contains an array of brand objects
        setBrands(response.data.slice(0, 6)); // Get the first 6 brands
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  const handleClick = (brandName) => {
    sessionStorage.setItem("markaName", brandName);
  };

  const textRef = useRef(null);

  const handleDoubleClick = () => {
    const range = document.createRange();
    const selection = window.getSelection();

    if (textRef.current) {
      range.selectNodeContents(textRef.current);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  return (
    <div className="bg-black ">
      <div className="container relative">
        <div className="grid grid-cols-5 max-md:grid-cols-6 pt-[60px] md:pb-[80px] max-md:pt-5 max-md:mb-[30px]">
          <div className="gird-cols-1 max-md:col-span-6 max-md:mb-[30px]">
            <Link href="/">
              <Image src={logo} alt="logo" className="w-[143px]" />
            </Link>
          </div>
          <div className="grid-cols-1 max-md:col-span-2">
            <nav className="flex flex-col font-semibold text-white ">
              <h3 className="text-lg mb-3 max-md:text-sm max-md:mb-2">
                Компания
              </h3>
              <Link
                className="mb-3 max-md:text-xs max-md:mb-2 font-[500]"
                href="/"
              >
                Главная
              </Link>
              <Link
                className="mb-3 max-md:text-xs max-md:mb-2 font-[500]"
                href="/katalog"
                onClick={() => {
                  sessionStorage.clear(); // Clear all items in sessionStorage
                }}
              >
                Каталог
              </Link>
              <Link
                className="mb-3 max-md:text-xs max-md:mb-2 font-[500]"
                href="/about"
              >
                О нас
              </Link>
              {/* <Link
                className="mb-3 max-md:text-xs max-md:mb-2 font-[500]"
                href="/news"
              >
                Новости
              </Link>
              <Link
                className="mb-3 max-md:text-xs max-md:mb-2"
                href="/contacts"
              >
                Контакты
              </Link>
              <Link
                className="mb-3 max-md:text-xs max-md:mb-2"
                href="/favorites"
              >
                Избранные
              </Link> */}
            </nav>
          </div>
          {/* <div className="grid-cols-1 max-md:col-span-2">
            <nav className="flex flex-col font-semibold text-white">
              <h3 className="text-lg mb-3 max-md:text-sm max-md:mb-2">Марки</h3>
              {brands.map((brand) => (
                <Link
                  key={brand.id}
                  className="mb-3 max-md:text-xs max-md:mb-2 font-[500]"
                  href="/katalog"
                  onClick={() => handleClick(brand.name)}
                >
                  {brand.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="grid-cols-1 max-md:col-span-2">
            <nav className="flex flex-col font-semibold text-white ">
              <h3 className="text-lg mb-3 max-md:text-sm max-md:mb-2">
                Типы авто
              </h3>
              <Link
                className="mb-3 max-md:text-xs max-md:mb-2 font-[500]"
                href="/katalog"
                onClick={() => sessionStorage.setItem("adIdType", 1)}
              >
                Седан
              </Link>
              <Link
                className="mb-3 max-md:text-xs max-md:mb-2 font-[500]"
                href="/katalog"
                onClick={() => sessionStorage.setItem("adIdType", 2)}
              >
                Хэтчбек
              </Link>
              <Link
                className="mb-3 max-md:text-xs max-md:mb-2 font-[500]"
                href="/katalog"
                onClick={() => sessionStorage.setItem("adIdType", 3)}
              >
                Внедорожник
              </Link>
              <Link
                className="mb-3 max-md:text-xs max-md:mb-2 font-[500]"
                href="/katalog"
                onClick={() => sessionStorage.setItem("adIdType", 4)}
              >
                Гибрид
              </Link>
              <Link
                className="mb-3 max-md:text-xs max-md:mb-2 font-[500]"
                href="/katalog"
                onClick={() => sessionStorage.setItem("adIdType", 5)}
              >
                Купе
              </Link>
            </nav>
          </div> */}
          <div className="grid-cols-3 max-md:col-span-4 ">
            <nav className="flex flex-col font-semibold text-white ">
              <h3 className="text-lg mb-3 max-md:text-sm max-md:mb-2">
                Контакты
              </h3>
              <div className="flex max-md:flex-col">
                <div className="flex mb-5 max-md:mb-[15px]">
                  <CiLocationOn className="mr-2 !text-lg font-bold flex-shrink-0 max-md:text-sm" />
                  <p className="flex flex-col text-sm max-md:text-xs ">
                    <span
                      className="text-nowrap"
                      ref={textRef}
                      onDoubleClick={handleDoubleClick}
                    >
                      경기 수원시 권선구 권선로 308-5
                    </span>
                    <span className="text-nowrap">Южная Корея, г. Сувон</span>
                  </p>
                </div>
                <div className="flex items-center mb-5 max-md:mb-[15px] md:mx-5">
                  <BsTelephone className="mr-2 flex-shrink-0" />
                  <a
                    href="tel:+821080393003"
                    className="text-sm max-md:text-xs text-nowrap"
                  >
                    +82 10-8039-3003
                  </a>
                </div>
                <div className="flex items-center mb-5 max-md:mb-[15px]">
                  <CiMail className="mr-2 flex-shrink-0" />
                  <span className="text-sm max-md:text-xs text-nowrap">
                    rina051374@gmail.com
                  </span>
                </div>
              </div>
              <div className="flex">
                <a
                  href="https://vk.com/id840258784"
                  className="bg-[#333333] flex items-center justify-between p-3 mr-1"
                >
                  <FaVk className="cursor-pointer text-c989898 text-xl" />
                </a>
                <a
                  href="https://wa.me/821080393003"
                  className="bg-[#333333] flex items-center justify-between p-3  mr-1"
                >
                  <FaWhatsapp className="cursor-pointer text-c989898 text-xl" />
                </a>
                <a
                  href="https://www.instagram.com/li2546?igsh=bmJqNGFiNzVvZXp3&utm_source=qr"
                  className="bg-[#333333] flex items-center justify-between p-3  mr-1"
                >
                  <FaInstagram className="cursor-pointer text-c989898 text-xl" />
                </a>
                <a
                  href="https://www.facebook.com/irina.li.351?mibextid=LQQJ4d"
                  className="bg-[#333333] flex items-center justify-between p-3  mr-1"
                >
                  <FaFacebookF className="cursor-pointer text-c989898 text-xl" />
                </a>
              </div>
            </nav>
          </div>
        </div>
        <Link href={"/policy"}>
          <p className="text-center pb-[30px] text-xs text-white max-md:text-left font-semibold max-md:text-[10px] max-md:">
            Политика и конфиденциальность
          </p>
        </Link>
        {/* <div
          className="absolute right-0 bottom-[30px] flex flex-col items-end cursor-pointer max-md:right-5"
          onClick={handleScrollToTop}
        >
          <div className="rounded-full h-16 w-16 flex items-center justify-center border border-white">
            <Image src={footerTop} alt="footerTop" />
          </div>
          <p className="mt-5 text-white  text-xs font-semibold">
            Сделано в UserTech
          </p>
        </div> */}
      </div>
    </div>
  );
}
