"use client";
import React, { useState } from "react";
// import "./YearsSelect.css"; // Import custom styles for the range slider

const YearsSelect = ({ onYearOne, onYearTwo }) => {
  const currentYear = new Date().getFullYear();
  const [startYear, setStartYear] = useState(2012);
  const [endYear, setEndYear] = useState(currentYear);

  const handleStartYearChange = (e) => {
    const value = Math.min(Number(e.target.value), endYear - 1);
    setStartYear(value);
    onYearOne(value);
  };

  const handleEndYearChange = (e) => {
    const value = Math.max(Number(e.target.value), startYear + 1);
    setEndYear(value);
    onYearTwo(value);
  };

  return (
    <div className="years-select-container flex flex-col items-start justify-center max-md:w-full max-md:px-3 max-md:mb-4 w-full mb-8">
      <label className="text-red-500 w-full max-md:text-sm max-md:text-left max-md:w-[140px] max-md:px-[10px]">
        Год выпуска
      </label>
      <div className="flex justify-between w-full text-red-500 mb-2">
        <span className="rounded-sm text-white text-sm font-semibold px-2 py-1 bg-[#C1C1C1]">
          {startYear}
        </span>
        <span className="rounded-sm text-white text-sm font-semibold px-2 py-1 bg-[#ED0000]">
          {endYear}
        </span>
      </div>
      <div className="relative w-full">
        <input
          type="range"
          min="2012"
          max={currentYear}
          value={startYear}
          onChange={handleStartYearChange}
          className="range-input"
        />
        <input
          type="range"
          min="2012"
          max={currentYear}
          value={endYear}
          onChange={handleEndYearChange}
          className="range-input"
          style={{ position: "absolute", left: 0, top: 0 }}
        />
        <div
          className="range-slider-track"
          style={{
            left: `${((startYear - 2012) / (currentYear - 2012)) * 100}%`,
            right: `${100 - ((endYear - 2012) / (currentYear - 2012)) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default YearsSelect;
