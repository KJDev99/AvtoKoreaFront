"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import SavedImg from "@/assets/images/savedcar.svg";
import NoSavedImg from "@/assets/images/nosavedcar.svg";
import CarOil from "@/assets/images/caroil.svg";
import CarMore from "@/assets/images/carmore.svg";
import CarSpeed from "@/assets/images/carspeed.svg";
import CarYear from "@/assets/images/caryear.svg";
import { TbCurrencyYuan } from "react-icons/tb";
import { BsCurrencyDollar } from "react-icons/bs";
import { MdCurrencyRuble } from "react-icons/md";

const CardCar = ({
  id,
  goodPrice,
  top,
  savedcar,
  image,
  name,
  text,
  speed,
  oil,
  year,
  price,
  price_d,
  price_r,
}) => {
  const [saved, setSaved] = useState(() => {
    // Retrieve the saved state from local storage
    const savedState = sessionStorage.getItem(`car-${id}`);
    return savedState === "true";
  });

  useEffect(() => {
    // Update the saved state in local storage
    sessionStorage.setItem(`car-${id}`, saved);

    // Update saved cars list
    let savedCars = JSON.parse(sessionStorage.getItem("savedCars") || "[]");
    if (saved) {
      if (!savedCars.includes(id)) {
        savedCars.push(id);
      }
    } else {
      savedCars = savedCars.filter((carId) => carId !== id);
    }
    sessionStorage.setItem("savedCars", JSON.stringify(savedCars));
  }, [saved, id]);

  const handleSaveClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setSaved((prev) => !prev);
  };

  const [selectedCurrency, setSelectedCurrency] = useState(
    sessionStorage.getItem("selectedCurrency") || "yuan"
  );

  useEffect(() => {
    const handleCurrencyChange = () => {
      setSelectedCurrency(sessionStorage.getItem("selectedCurrency") || "yuan");
    };

    window.addEventListener("currencyChange", handleCurrencyChange);

    return () => {
      window.removeEventListener("currencyChange", handleCurrencyChange);
    };
  }, []);

  let displayedPrice;
  let currencyIcon;

  switch (selectedCurrency) {
    case "yuan":
      displayedPrice = price;
      currencyIcon = <TbCurrencyYuan className="inline-block" />;
      break;
    case "dollar":
      displayedPrice = price_d;
      currencyIcon = <BsCurrencyDollar className="inline-block" />;
      break;
    case "ruble":
      displayedPrice = price_r;
      currencyIcon = <MdCurrencyRuble className="inline-block" />;
      break;
    default:
      displayedPrice = price;
      currencyIcon = <TbCurrencyYuan className="inline-block" />;
  }

  return (
    <div className="w-full shadow-lg p-5 flex flex-col rounded-[10px] md:mb-5">
      <div className="relative">
        <img
          src={image}
          alt="Car image"
          className="!h-[214px] object-cover w-full max-md:h-[172px]"
        />
        {top && (
          <div
            className={`absolute top-0 ${
              goodPrice ? "left-0" : "left-[150px] max-md:left-[95px]"
            } rounded-[5px] px-7 py-[10px] bg-[#07D133] text-white text-xs font-semibold max-md:px-3 max-md:py-2 max-md:text-[9px]`}
          >
            Хит!
          </div>
        )}
        {goodPrice && (
          <div className="absolute top-0 left-0 rounded-[5px] px-7 py-[10px] bg-[#405FF2] text-white text-xs font-semibold max-md:px-3 max-md:py-2 max-md:text-[9px]">
            Хорошая цена!
          </div>
        )}
        <Image
          src={saved ? SavedImg : NoSavedImg}
          alt="Save status"
          className="absolute top-4 right-4 !h-[15px] !w-[15px] cursor-pointer z-10"
          onClick={handleSaveClick}
        />
      </div>
      <div className="flex flex-col">
        <h3 className="text-[#202020] text-lg mt-3 mb-1 font-semibold max-md:text-sm text-left h-6 line-clamp-1">
          {name}
        </h3>
        <p className="border-b text-[15px] pb-3 border-[#E6E6E6] font-medium text-[#202020] mb-[10px] max-md:text-xs text-left line-clamp-2 md:h-[50px] max-md:h-[37px] max-md:mb-3">
          {text}
        </p>
        <div className="grid grid-cols-3 gap-[5px] pb-3 border-b border-[#E6E6E6]">
          <div className="flex items-center justify-start max-md:justify-center overflow-hidden border h-[48px] px-3 rounded-[5px] max-md:px-2 max-md:h-[38px]">
            <Image
              src={CarSpeed}
              alt="Speed"
              className="w-[18px] !h-auto mr-[10px] max-md:mr-[3px] max-md:w-[12px]"
            />
            <p className="text-[#202020] font-medium text-sm max-md:text-[10px]">
              {speed}&nbsp;км
            </p>
          </div>
          <div className="flex items-center justify-start max-md:justify-center overflow-hidden border h-[48px] px-3 rounded-[5px] max-md:px-2 max-md:h-[38px]">
            <Image
              src={CarOil}
              alt="Oil"
              className="w-[18px] !h-auto mr-[10px] max-md:mr-[3px] max-md:w-[12px]"
            />
            <p className="text-[#202020] font-medium text-sm max-md:text-[10px]">
              {oil}
            </p>
          </div>
          <div className="flex items-center justify-start max-md:justify-center overflow-hidden border h-[48px] px-3 rounded-[5px] max-md:px-2 max-md:h-[38px]">
            <Image
              src={CarYear}
              alt="Year"
              className="w-[18px] !h-auto mr-[10px] max-md:mr-[3px] max-md:w-[12px]"
            />
            <p className="text-[#202020] font-medium text-sm max-md:text-[10px]">
              {year}&nbsp;год
            </p>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <p className="text-2xl font-bold max-md:text-xl">
            {currencyIcon} {displayedPrice}
          </p>
          <div className="flex items-center">
            <p className="text-sm mr-[10px] font-semibold max-md:text-xs">
              Подробнее
            </p>
            <Image
              src={CarMore}
              alt="More details"
              className="!w-[14px] !h-auto cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCar;
