import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft } from "react-icons/fa";
import axios from "axios";
import api from "@/lib/api";

const FuelSelect = ({ onFuelChange }) => {
  const [isFuelOpen, setIsFuelOpen] = useState(false);
  const [selectedFuel, setSelectedFuel] = useState("Все");
  const [hoveredFuel, setHoveredFuel] = useState(null);
  const [fuels, setFuels] = useState([]);
  const fuelRef = useRef(null);

  useEffect(() => {
    const fetchFuels = async () => {
      try {
        const response = await api.get("/type/fuel/");
        setFuels(response.data);
      } catch (error) {
        console.error("Error fetching fuels:", error);
      }
    };

    fetchFuels();
  }, []);

  const toggleFuel = () => {
    setIsFuelOpen(!isFuelOpen);
  };

  const handleClickOutside = (event) => {
    if (fuelRef.current && !fuelRef.current.contains(event.target)) {
      setIsFuelOpen(false);
    }
  };

  const handleFuelChange = (event) => {
    const fuel = event.target.id;
    setSelectedFuel(fuel);
    setIsFuelOpen(false);
    onFuelChange(fuel);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-md:w-full" ref={fuelRef}>
      <div
        className={`flex flex-col p-[10px] rounded-[10px] cursor-pointer`}
        onClick={toggleFuel}
      >
        <h2 className="text-lg text-[#050B20] max-md:text-sm">Топливо</h2>
        <div className="flex justify-between w-full my-2 items-center">
          <p className="text-sm text-[#050B20]">{selectedFuel}</p>
          <FaChevronLeft
            className={`text-sm transition-transform z-10 ${
              isFuelOpen ? "rotate-90" : "-rotate-90"
            }`}
          />
        </div>
      </div>
      {isFuelOpen && (
        <div className="flex flex-col p-[10px] mt-2 rounded-[10px] absolute bg-white shadow-lg w-full left-0 top-[60px] z-[20]">
          <div
            className="relative"
            onMouseEnter={() => setHoveredFuel("Все")}
            onMouseLeave={() => setHoveredFuel(null)}
          >
            <label
              className="flex items-center mb-0 cursor-pointer"
              htmlFor="Все"
            >
              <input
                type="radio"
                id="Все"
                name="fuel"
                className="hidden"
                checked={selectedFuel === "Все"}
                onChange={handleFuelChange}
              />
              <p
                className={`w-full px-4 py-2 rounded-md flex items-center justify-between text-sm max-md:px-2 ${
                  selectedFuel === "Все" || hoveredFuel === "Все"
                    ? "font-medium"
                    : "font-normal"
                }`}
              >
                Все
              </p>
            </label>
          </div>
          {fuels.map((fuel) => (
            <div
              key={fuel.id}
              className="relative"
              onMouseEnter={() => setHoveredFuel(fuel.name)}
              onMouseLeave={() => setHoveredFuel(null)}
            >
              <label
                className="flex items-center mb-0 cursor-pointer"
                htmlFor={fuel.name}
              >
                <input
                  type="radio"
                  id={fuel.name}
                  name="fuel"
                  className="hidden"
                  checked={selectedFuel === fuel.name}
                  onChange={handleFuelChange}
                />
                <p
                  className={`w-full px-4 py-2 rounded-md flex items-center justify-between text-sm max-md:px-2 ${
                    selectedFuel === fuel.name || hoveredFuel === fuel.name
                      ? "font-medium"
                      : "font-normal"
                  }`}
                >
                  {fuel.name}
                </p>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FuelSelect;
