"use client";
import React, { useState } from "react";
// import "./SelectPrice.css"; // Import custom styles for the range slider

const SelectPrice = ({ onPriceMin, onPriceMax }) => {
  const maxLimit = 450000000;
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(maxLimit);

  const formatPrice = (value) => {
    return new Intl.NumberFormat("ru-RU").format(value);
  };

  const handleMinPriceChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 100000); // Ensuring minPrice doesn't exceed maxPrice
    setMinPrice(value);
    onPriceMin(value);
  };

  const handleMaxPriceChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 100000); // Ensuring maxPrice doesn't go below minPrice
    setMaxPrice(value);
    onPriceMax(value);
  };

  return (
    <div className="select-price-container flex flex-col items-start justify-center max-md:w-full max-md:px-3 max-md:mb-4 w-full mb-8">
      <label className="text-red-500 w-full max-md:text-sm max-md:text-left max-md:w-1/2 max-md:px-[10px]">
        Цена
      </label>
      <div className="flex justify-between w-full text-red-500 mb-2">
        <span className="rounded-sm text-white text-sm font-semibold px-2 py-1 bg-[#C1C1C1]">
          {formatPrice(minPrice)}
        </span>
        <span className="rounded-sm text-white text-sm font-semibold px-2 py-1 bg-[#ED0000]">
          {formatPrice(maxPrice)}
        </span>
      </div>
      <div className="relative w-full">
        <input
          type="range"
          min="0"
          max={maxLimit}
          value={minPrice}
          onChange={handleMinPriceChange}
          className="range-input"
        />
        <input
          type="range"
          min="0"
          max={maxLimit}
          value={maxPrice}
          onChange={handleMaxPriceChange}
          className="range-input"
          style={{ position: "absolute", left: 0, top: 0 }}
        />
        <div
          className="range-slider-track"
          style={{
            left: `${(minPrice / maxLimit) * 100}%`,
            right: `${100 - (maxPrice / maxLimit) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default SelectPrice;
