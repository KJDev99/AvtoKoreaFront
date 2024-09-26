import Image from "next/image";
import React from "react";

const InfoMenuItem = ({ img, title, text, top }) => {
  return (
    <div
      className={`px-6 flex flex-col shadow-lg bg-white h-[306px] max-md:h-[177px] max-md:px-3 rounded-[5px] ${
        top && "md:mt-[100px]"
      }`}
    >
      <Image
        src={img}
        alt="title"
        className="mt-[35px] mb-[15px] max-md:mt-[15px] max-md:mb-[13px] "
      />
      <h3 className="mb-2 text-[22px] text-[#202020] font-bold max-md:text-lg  max-md:mb-2">
        {text}
      </h3>
      <p className="text-[15px] text-[#989898] font-medium max-md:text-xs">
        {title}
      </p>
    </div>
  );
};

export default InfoMenuItem;
