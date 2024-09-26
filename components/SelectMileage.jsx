"use client";
import React, { useState } from "react";

const SelectMileage = ({ onMileageMin, onMileageMax }) => {
  const maxLimit = 450000;
  const [minMileage, setMinMileage] = useState(0);
  const [maxMileage, setMaxMileage] = useState(maxLimit);

  const formatMileage = (value) => {
    return new Intl.NumberFormat("ru-RU").format(value);
  };

  const handleMinMileageChange = (e) => {
    const value = Math.min(Number(e.target.value), maxMileage - 1000); // Ensuring minMileage doesn't exceed maxMileage
    setMinMileage(value);
    onMileageMin(value);
  };

  const handleMaxMileageChange = (e) => {
    const value = Math.max(Number(e.target.value), minMileage + 1000); // Ensuring maxMileage doesn't go below minMileage
    setMaxMileage(value);
    onMileageMax(value);
  };

  return (
    <div className="select-mileage-container flex flex-col items-start justify-center max-md:w-full max-md:px-3 max-md:mb-4 w-full mb-8">
      <label className="text-red-500 w-full max-md:text-sm max-md:text-left max-md:w-1/2  max-md:px-[10px]">
        Пробег
      </label>
      <div className="flex justify-between w-full text-red-500 mb-2">
        <span className="rounded-sm text-white text-sm font-semibold px-2 py-1 bg-[#C1C1C1]">
          {formatMileage(minMileage)}
        </span>
        <span className="rounded-sm text-white text-sm font-semibold px-2 py-1 bg-[#ED0000]">
          {formatMileage(maxMileage)}
        </span>
      </div>
      <div className="relative w-full">
        <input
          type="range"
          min="0"
          max={maxLimit}
          value={minMileage}
          onChange={handleMinMileageChange}
          className="range-input"
        />
        <input
          type="range"
          min="0"
          max={maxLimit}
          value={maxMileage}
          onChange={handleMaxMileageChange}
          className="range-input"
          style={{ position: "absolute", left: 0, top: 0 }}
        />
        <div
          className="range-slider-track"
          style={{
            left: `${(minMileage / maxLimit) * 100}%`,
            right: `${100 - (maxMileage / maxLimit) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default SelectMileage;
