"use client";
import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaPhone, FaWhatsapp } from "react-icons/fa";
import { FiPhone, FiPlus } from "react-icons/fi";
import { FaVk } from "react-icons/fa";

const FixedLinks = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[11]">
      <div
        className={`hidden flex-col items-center transition-all ${
          isOpen
            ? "opacity-100 translate-y-0 block"
            : "hidden opacity-0 translate-y-[150px]"
        }`}
      >
        <a
          href="https://vk.com/id840258784"
          className={`bg-white mb-[10px] rounded-full flex items-center h-12 w-12 shadow-lg justify-center transition-transform ${
            isOpen ? "translate-y-0" : "translate-y-[-50px]"
          }`}
        >
          <FaVk className="cursor-pointer text-[#ED0000] text-xl" />
        </a>
        <a
          href="https://wa.me/821046947575"
          className={`bg-white mb-[10px] rounded-full flex items-center justify-center h-12 w-12 shadow-lg transition-transform ${
            isOpen ? "translate-y-0" : "translate-y-[-50px]"
          }`}
        >
          <FaWhatsapp className="cursor-pointer text-[#ED0000] text-xl" />
        </a>
        <a
          href="https://www.instagram.com/li2546?igsh=bmJqNGFiNzVvZXp3&utm_source=qr"
          className={`bg-white mb-[10px] rounded-full flex items-center justify-center h-12 w-12 shadow-lg transition-transform ${
            isOpen ? "translate-y-0" : "translate-y-[-50px]"
          }`}
        >
          <FaInstagram className="cursor-pointer text-[#ED0000] text-xl" />
        </a>
        <a
          href="https://www.facebook.com/irina.li.351?mibextid=LQQJ4d"
          className={`bg-white mb-[10px] rounded-full flex items-center justify-center h-12 w-12 shadow-lg transition-transform ${
            isOpen ? "translate-y-0" : "translate-y-[-50px]"
          }`}
        >
          <FaFacebookF className="cursor-pointer text-[#ED0000] text-xl" />
        </a>
        <a
          href="tel:+821046947575"
          className={`bg-white mb-[10px] rounded-full flex items-center justify-center h-12 w-12 shadow-lg transition-transform ${
            isOpen ? "translate-y-0" : "translate-y-[-50px]"
          }`}
        >
          <FiPhone className="cursor-pointer text-[#ED0000] text-xl" />
        </a>
      </div>
      <button
        onClick={handleButtonClick}
        className={`border-none rounded-full hidden items-center justify-center bg-[#ED0000] text-white h-[80px] w-[80px] transition-transform ${
          isOpen ? "rotate-45" : "rotate-0"
        }`}
      >
        <FiPlus className="text-3xl font-bold" />
      </button>
      <a
        href="tel:+821046947575"
        className={`bg-[#ff0000] mb-[10px] rounded-full flex items-center justify-center h-12 w-12 shadow-lg transition-transform ${
          isOpen ? "translate-y-0" : "translate-y-[-50px]"
        }`}
      >
        <FiPhone className="cursor-pointer text-[#fff] text-xl" />
      </a>
    </div>
  );
};

export default FixedLinks;
