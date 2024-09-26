import React from "react";
import Button from "./Button";
import ImgManCar from "@/assets/images/mancar.png";
import Image from "next/image";
import Link from "next/link";

const InfoBlock = () => {
  return (
    <div className="mt-[200px] md:container shadow-lg rounded-[15px] flex  h-[313px]  max-md:h-[557px]  max-md:mt-[60px] max-md:flex-col bg_full_info">
      <div className="w-1/2 p-8 max-md:w-full max-md:py-5 max-md:px-5">
        <h2 className="text-[#202020] text-[26px] font-montserrat font-bold max-md:text-lg">
          Найдите свой автомобиль из более чем 1&nbsp;000&nbsp;000+ вариантов в
          нашем каталоге
        </h2>
        <p className="mb-6 mt-3 text-[#989898] font-medium max-md:mt-2 max-md:mb-5 max-md:text-[13px]">
          Перейдите в каталог и приступите к поиску автомобиля
        </p>
        <div className="w-[210px] h-[67px] max-md:w-[167px] max-md:h-[57px]">
          <Link
            href="/katalog"
            onClick={() => {
              sessionStorage.clear(); // Clear all items in sessionStorage
            }}
          >
            <Button text="В каталог" />
          </Link>
        </div>
      </div>
      <div className="w-1/2 bg_clip rounded-[15px] relative max-md:w-full max-md:h-full max-md:overflow-hidden">
        <img
          src="/mancar.png"
          alt="car"
          className="absolute bottom-[-21px] right-[-30px] h-[480px] max-md:h-[328px] max-md:bottom-[-13px]"
        />
      </div>
    </div>
  );
};

export default InfoBlock;
