"use client";
import { CiLocationOn, CiMail } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";
import Image from "next/image";
import logo from "@/assets/images/Logo.svg";
import Button from "./Button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaVk } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import api from "@/lib/api";
const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  useEffect(() => {
    if (!isMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isMenuOpen]);
  useEffect(() => {
    setIsMenuOpen(true);
  }, [pathname]);
  const [modalOpen, setModalOpen] = useState(false);

  const mobileClick = () => {
    setModalOpen(true);
    setIsMenuOpen((prev) => !prev);
  };
  const [inputValue, setInputValue] = useState("");
  const handleSearch = () => {
    // inputValue ni sessionStorage ga saqlash
    sessionStorage.setItem("searchQuery", `avto/?q=${inputValue}`);
    window.dispatchEvent(new Event("searchQueryChange")); // maxsus hodisa chaqiriladi
    setIsMenuOpen(true);
    window.scrollTo({
      top: window.innerHeight * 1.3,
      behavior: "smooth",
    });
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
    <div className="bg-white">
      <div className="container">
        <div className="flex flex-col">
          <div className="flex justify-between max-md:hidden border-b border-border8">
            <div className="flex pb-3 mt-[10px]">
              {" "}
              <p className="text-c989898 flex text-sm items-center font-medium">
                <CiLocationOn className="mr-3 text-lg mt-1" />
                <span
                  className="text-nowrap"
                  ref={textRef}
                  onDoubleClick={handleDoubleClick}
                >
                  경기 수원시 권선구 권선로&nbsp;
                </span>{" "}
                308-5 Южная Корея, г. Сувон
              </p>
              <a
                href="tel:+821046947575"
                className="text-c989898 flex text-sm items-center ml-[50px] font-medium"
              >
                <BsTelephone className="mr-3 text-lg mt-1" /> +82 10-4694-7575
              </a>
              <a
                href="mainto:rina051374@gmail.com"
                className="text-c989898 flex text-sm items-center ml-[50px] font-medium"
              >
                <CiMail className="mr-3 text-lg mt-1" /> rina051374@gmail.com
              </a>
            </div>
            <div className="flex items-center">
              <a
                href="https://vk.com/id840258784"
                className="flex items-center justify-between ml-5"
              >
                <FaVk className="cursor-pointer text-c989898 text-lg" />
              </a>
              <a
                href="https://wa.me/821046947575"
                className="flex items-center justify-between ml-5"
              >
                <FaWhatsapp className="cursor-pointer text-c989898 text-lg" />
              </a>
              <a
                href="https://www.instagram.com/li2546?igsh=bmJqNGFiNzVvZXp3&utm_source=qr"
                className="flex items-center justify-between ml-5 "
              >
                <FaInstagram className="cursor-pointer text-c989898 text-lg" />
              </a>
              <a
                href="https://www.facebook.com/irina.li.351?mibextid=LQQJ4d"
                className="flex items-center justify-between ml-5 "
              >
                <FaFacebookF className="cursor-pointer text-c989898 text-lg" />
              </a>
            </div>
          </div>
          <div className="flex justify-between mt-4 mb-3 items-center ">
            <Link href="/">
              <Image
                src={logo}
                alt="logo"
                className="w-[143px] max-md:w-[112px]"
              />
            </Link>
            <nav className="flex  items-center max-md:hidden grow">
              <div className="relative flex flex-col items-center h-max mx-[18px] nav_list ml-[35px]">
                <Link href="/">Главная</Link>
                <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-[35px] h-[2px] bg-red " />
                {/* {pathname === "/" && (
                )} */}
              </div>
              <div className="relative flex flex-col items-center h-max mx-[18px] nav_list">
                <Link
                  href="/katalog"
                  onClick={() => {
                    sessionStorage.clear(); // Clear all items in sessionStorage
                  }}
                >
                  Каталог
                </Link>
                <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-[35px] h-[2px] bg-red " />
              </div>
              <div className="relative flex flex-col items-center h-max mx-[18px] nav_list">
                <Link href="/about">О нас</Link>
                <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-[35px] h-[2px] bg-red " />
              </div>
              {/* <div className="relative flex flex-col items-center h-max mx-[18px] nav_list">
                <Link href="/news">Новости</Link>
                <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-[35px] h-[2px] bg-red " />
              </div> */}
              <div className="relative flex flex-col items-center h-max mx-[18px] nav_list">
                <Link href="/contacts">Контакты</Link>
                <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-[35px] h-[2px] bg-red " />
              </div>
              {/* <div className="relative flex flex-col items-center h-max mx-[18px] nav_list">
                <Link href="/favorites">Избранные</Link>
                <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-[35px] h-[2px] bg-red " />
              </div> */}
              <div className="bg-bgwhite flex items-center justify-between p-4 ml-3 mr-5 grow">
                <input
                  type="text"
                  className="bg-transparent border-none outline-none text-c989898"
                  placeholder="Поиск по названию"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <FiSearch
                  className="cursor-pointer text-c989898"
                  onClick={handleSearch}
                />
              </div>
            </nav>

            <div
              className="w-[180px] h-[58px] max-md:hidden"
              onClick={() => setModalOpen(true)}
            >
              <Button text="Оставить заявку" />
            </div>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            {isMenuOpen ? (
              <RxHamburgerMenu
                className="text-2xl md:hidden cursor-pointer"
                onClick={() => setIsMenuOpen((prev) => !prev)}
              />
            ) : (
              <IoCloseSharp
                className="text-2xl md:hidden cursor-pointer"
                onClick={() => setIsMenuOpen((prev) => !prev)}
              />
            )}
            {!isMenuOpen && (
              <div className="fixed top-[65px] left-0 w-full h-screen bg-white z-[1001] md:hidden flex flex-col">
                <div className="bg-bgwhite flex items-center justify-between p-4 ml-3 mr-5 mt-5">
                  <input
                    type="text"
                    className="bg-transparent border-none outline-none text-c989898"
                    placeholder="Поиск по названию"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <FiSearch
                    className="cursor-pointer text-c989898"
                    onClick={handleSearch}
                  />
                </div>
                <nav
                  className={`flex flex-col justify-between mx-5 my-3 border-b pb-[10px]  ${
                    pathname == "/" ? "border-red" : "border-[#EBEBEB]"
                  }`}
                >
                  <Link
                    href="/"
                    className={`text-sm font-medium ${
                      pathname == "/" ? "text-red" : "text-[#202020]"
                    }`}
                  >
                    Главная
                  </Link>
                </nav>
                <nav
                  className={`flex flex-col justify-between mx-5 my-3 border-b pb-[10px]  ${
                    pathname == "/katalog/" ? "border-red" : "border-[#EBEBEB]"
                  }`}
                >
                  <Link
                    href="/katalog"
                    onClick={() => {
                      sessionStorage.clear(); // Clear all items in sessionStorage
                    }}
                    className={`text-sm font-medium ${
                      pathname == "/katalog/" ? "text-red" : "text-[#202020]"
                    }`}
                  >
                    Каталог
                  </Link>
                </nav>
                <nav
                  className={`flex flex-col justify-between mx-5 my-3 border-b pb-[10px] md:hidden ${
                    pathname == "/katalog/" ? "border-red" : "border-[#EBEBEB]"
                  }`}
                >
                  <Link href="/about" className={`text-sm font-medium `}>
                    О нас
                  </Link>
                </nav>
                <nav
                  className={`flex flex-col justify-between mx-5 my-3 border-b pb-[10px] max-md:hidden ${
                    pathname == "/news/" ? "border-red" : "border-[#EBEBEB]"
                  }`}
                >
                  <Link
                    href="/news"
                    className={`text-sm font-medium ${
                      pathname == "/news/" ? "text-red" : "text-[#202020]"
                    }`}
                  >
                    Новости
                  </Link>
                </nav>
                <nav
                  className={`flex flex-col justify-between mx-5 my-3 border-b pb-[10px] max-md:hidden ${
                    pathname == "/contacts/" ? "border-red" : "border-[#EBEBEB]"
                  }`}
                >
                  <Link
                    href="/contacts"
                    className={`text-sm font-medium ${
                      pathname == "/contacts/" ? "text-red" : "text-[#202020]"
                    }`}
                  >
                    Контакты
                  </Link>
                </nav>
                <nav
                  className={`flex flex-col justify-between mx-5 my-3 border-b pb-[10px] max-md:hidden ${
                    pathname == "/favorites/"
                      ? "border-red"
                      : "border-[#EBEBEB]"
                  }`}
                >
                  <Link
                    href="/favorites"
                    className={`text-sm font-medium ${
                      pathname == "/favorites/" ? "text-red" : "text-[#202020]"
                    }`}
                  >
                    Избранные
                  </Link>
                </nav>
                <nav className="flex flex-col font-semibold text-[#202020] mx-5">
                  <h3 className="text-lg mb-3 max-md:text-sm max-md:mb-2">
                    Контакты
                  </h3>
                  <div className="flex items-center mb-5 max-md:mb-[15px]">
                    <CiLocationOn className="mr-2" />
                    <span
                      className="text-sm max-md:text-xs"
                      ref={textRef}
                      onDoubleClick={handleDoubleClick}
                    >
                      경기 수원시 권선구 권선로 308-5
                    </span>
                  </div>
                  <div className="flex items-center mb-5 max-md:mb-[15px]">
                    <BsTelephone className="mr-2" />
                    <a
                      href="tel:+821046947575"
                      className="text-sm max-md:text-xs"
                    >
                      +82 10-4694-7575
                    </a>
                  </div>
                  <div className="flex items-center mb-5 max-md:mb-[15px]">
                    <CiMail className="mr-2" />
                    <a
                      href="mailto:rina051374@gmail.com"
                      className="text-sm max-md:text-xs"
                    >
                      rina051374@gmail.com
                    </a>
                  </div>
                  <div className="flex">
                    <a
                      href="https://vk.com/id840258784"
                      className="bg-bgwhite flex items-center justify-between p-3 mr-1"
                    >
                      <FaVk className="cursor-pointer text-c989898 text-xl" />
                    </a>
                    <a
                      href="https://wa.me/821046947575"
                      className="bg-bgwhite flex items-center justify-between p-3 mr-1"
                    >
                      <FaWhatsapp className="cursor-pointer text-c989898 text-xl" />
                    </a>
                    <a
                      href="https://www.instagram.com/li2546?igsh=bmJqNGFiNzVvZXp3&utm_source=qr"
                      className="bg-bgwhite flex items-center justify-between p-3  mr-1"
                    >
                      <FaInstagram className="cursor-pointer text-c989898 text-xl" />
                    </a>
                    <a
                      href="https://www.facebook.com/irina.li.351?mibextid=LQQJ4d"
                      className="bg-bgwhite flex items-center justify-between p-3  mr-1"
                    >
                      <FaFacebookF className="cursor-pointer text-c989898 text-xl" />
                    </a>
                  </div>
                </nav>
                <div
                  className="w-full h-[60px] px-5 mt-5"
                  onClick={mobileClick}
                >
                  <Button text="Оставить заявку" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
