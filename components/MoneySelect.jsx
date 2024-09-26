import React, { useState, useEffect } from "react";
import { TbCurrencyYuan } from "react-icons/tb";
import { BsCurrencyDollar } from "react-icons/bs";
import { MdCurrencyRuble } from "react-icons/md";

export default function MoneySelect() {
  // Get initial currency from sessionStorage or default to "yuan"
  const [selectedCurrency, setSelectedCurrency] = useState("");
  useEffect(() => {
    setSelectedCurrency(sessionStorage.getItem("selectedCurrency") || "yuan");
  }, []);
  useEffect(() => {
    sessionStorage.setItem("selectedCurrency", selectedCurrency);
    window.dispatchEvent(new Event("currencyChange")); // trigger custom event
  }, [selectedCurrency]);

  return (
    <div className="flex gap-4">
      <TbCurrencyYuan
        onClick={() => setSelectedCurrency("yuan")}
        className={`cursor-pointer p-2 rounded-full ${
          selectedCurrency === "yuan"
            ? "bg-red text-white"
            : "bg-gray-200 text-gray-800 font-semibold"
        }`}
        size={32}
      />
      <BsCurrencyDollar
        onClick={() => setSelectedCurrency("dollar")}
        className={`cursor-pointer p-2 rounded-full ${
          selectedCurrency === "dollar"
            ? "bg-red text-white"
            : "bg-gray-200 text-gray-800 font-semibold"
        }`}
        size={32}
      />
      <MdCurrencyRuble
        onClick={() => setSelectedCurrency("ruble")}
        className={`cursor-pointer p-2 rounded-full ${
          selectedCurrency === "ruble"
            ? "bg-red text-white"
            : "bg-gray-200 text-gray-800 font-semibold"
        }`}
        size={32}
      />
    </div>
  );
}
