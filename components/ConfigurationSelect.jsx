import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft } from "react-icons/fa";
import axios from "axios";
import api from "@/lib/api";

const ConfigurationSelect = ({ onConfigurationChange }) => {
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState("Все");
  const [hoveredConfig, setHoveredConfig] = useState(null);
  const [configurations, setConfigurations] = useState([]);
  const configRef = useRef(null);

  useEffect(() => {
    const fetchConfigurations = async () => {
      try {
        const response = await api.get("/avto/type/");
        setConfigurations(response.data);
      } catch (error) {
        console.error("Error fetching configurations:", error);
      }
    };

    fetchConfigurations();
  }, []);

  const toggleConfig = () => {
    setIsConfigOpen(!isConfigOpen);
  };

  const handleClickOutside = (event) => {
    if (configRef.current && !configRef.current.contains(event.target)) {
      setIsConfigOpen(false);
    }
  };

  const handleConfigChange = (event) => {
    const config = event.target.id;
    setSelectedConfig(config);
    setIsConfigOpen(false);
    onConfigurationChange(config);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-md:w-full" ref={configRef}>
      <div
        className={`flex flex-col p-[10px] rounded-[10px] cursor-pointer`}
        onClick={toggleConfig}
      >
        <h2 className="text-lg text-[#050B20] max-md:text-sm">Комплектация</h2>
        <div className="flex justify-between w-full my-2 items-center">
          <p className="text-sm text-[#050B20]">{selectedConfig}</p>
          <FaChevronLeft
            className={`text-sm transition-transform z-10 ${
              isConfigOpen ? "rotate-90" : "-rotate-90"
            }`}
          />
        </div>
      </div>
      {isConfigOpen && (
        <div className="flex flex-col p-[10px] mt-2 rounded-[10px] absolute bg-white shadow-lg w-full left-0 top-[60px] z-[19]">
          <div
            className="relative"
            onMouseEnter={() => setHoveredConfig("Все")}
            onMouseLeave={() => setHoveredConfig(null)}
          >
            <label
              className="flex items-center mb-0 cursor-pointer"
              htmlFor="Все"
            >
              <input
                type="radio"
                id="Все"
                name="configuration"
                className="hidden"
                checked={selectedConfig === "Все"}
                onChange={handleConfigChange}
              />
              <p
                className={`w-full px-4 py-2 rounded-md flex items-center justify-between text-sm max-md:px-2 ${
                  selectedConfig === "Все" || hoveredConfig === "Все"
                    ? "font-medium"
                    : "font-normal"
                }`}
              >
                Все
              </p>
            </label>
          </div>
          {configurations.map((config) => (
            <div
              key={config.id}
              className="relative"
              onMouseEnter={() => setHoveredConfig(config.name)}
              onMouseLeave={() => setHoveredConfig(null)}
            >
              <label
                className="flex items-center mb-0 cursor-pointer"
                htmlFor={config.name}
              >
                <input
                  type="radio"
                  id={config.name}
                  name="configuration"
                  className="hidden"
                  checked={selectedConfig === config.name}
                  onChange={handleConfigChange}
                />
                <p
                  className={`w-full px-4 py-2 rounded-md flex items-center justify-between text-sm max-md:px-2 ${
                    selectedConfig === config.name ||
                    hoveredConfig === config.name
                      ? "font-medium"
                      : "font-normal"
                  }`}
                >
                  {config.name}
                </p>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConfigurationSelect;
