"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft } from "react-icons/fa";
import axios from "axios";
import api from "@/lib/api";

const SelectCars = ({
  onCategoryChange,
  onDistrictChange,
  onGenerationChange,
}) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isDistrictOpen, setIsDistrictOpen] = useState(false);
  const [isGenerationOpen, setIsGenerationOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedGeneration, setSelectedGeneration] = useState("");
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const [hoveredGeneration, setHoveredGeneration] = useState(null);
  const [categories, setCategories] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [generations, setGenerations] = useState([]);
  const categoryRef = useRef(null);
  const districtRef = useRef(null);
  const generationRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/avto/marka/");
        const sortedData = response.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setCategories(sortedData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedCategory) {
        try {
          const category = categories.find(
            (cat) => cat.name === selectedCategory
          );
          if (category) {
            const response = await api.get(`/avto/model/${category.id}/`);
            // setDistricts(response.data);
            const sortedData = response.data.sort((a, b) =>
              a.name.localeCompare(b.name)
            );
            setDistricts(sortedData);
          }
        } catch (error) {
          console.error("Error fetching districts:", error);
        }
      }
    };

    fetchDistricts();
  }, [selectedCategory, categories]);

  useEffect(() => {
    const fetchGenerations = async () => {
      if (selectedDistrict) {
        try {
          const district = districts.find(
            (dis) => dis.name === selectedDistrict
          );
          if (district) {
            const response = await api.get(`/avto/generation/${district.id}/`);
            // setGenerations(response.data);
            const sortedData = response.data.sort((a, b) =>
              a.name.localeCompare(b.name)
            );
            setGenerations(sortedData);
          }
        } catch (error) {
          console.error("Error fetching generations:", error);
        }
      }
    };

    fetchGenerations();
  }, [selectedDistrict, districts]);

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const toggleDistrict = () => {
    setIsDistrictOpen(!isDistrictOpen);
  };

  const toggleGeneration = () => {
    setIsGenerationOpen(!isGenerationOpen);
  };

  const handleClickOutside = (event) => {
    if (categoryRef.current && !categoryRef.current.contains(event.target)) {
      setIsCategoryOpen(false);
    }
    if (districtRef.current && !districtRef.current.contains(event.target)) {
      setIsDistrictOpen(false);
    }
    if (
      generationRef.current &&
      !generationRef.current.contains(event.target)
    ) {
      setIsGenerationOpen(false);
    }
  };

  const handleCategoryChange = (event) => {
    const category = event.target.id;
    setSelectedCategory(category);
    setSelectedDistrict("");
    setSelectedGeneration("");
    setIsCategoryOpen(false);
    setIsDistrictOpen(true);
    const categoryId = categories.find((cat) => cat.name === category)?.name;
    onCategoryChange(categoryId); // Pass category ID to parent
  };

  const handleDistrictChange = (event) => {
    const district = event.target.id;
    setSelectedDistrict(district);
    setSelectedGeneration("");
    setIsDistrictOpen(false);
    setIsGenerationOpen(true);
    const districtId = districts.find((d) => d.name === district)?.name;
    onDistrictChange(districtId); // Pass district ID to parent
  };

  const handleGenerationChange = (event) => {
    const generation = event.target.id;
    setSelectedGeneration(generation);
    setIsGenerationOpen(false);
    const generationId = generations.find((g) => g.name === generation)?.name;
    onGenerationChange(generationId); // Pass generation ID to parent
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Return qismi keltiriladi

  return (
    <div className="flex md:justify-between max-md:justify-around relative px-[30px] max-md:px-0 max-md:w-full flex-col">
      <div className="flex w-full max-md:w-full" ref={categoryRef}>
        <div
          className={`flex flex-col px-[10px]  w-full max-md:w-[120px] rounded-[10px] justify-between cursor-pointer`}
          onClick={toggleCategory}
        >
          <h2 className="text-lg text-[#050B20] max-md:text-sm max-md:capitalize">
            <span className="max-md:hidden">Выберите</span>&nbsp;марку
          </h2>
          <div className="flex justify-between w-full my-2 items-center">
            <p className="text-sm text-[#050B20] line-clamp-1">
              {selectedCategory}
            </p>
            <FaChevronLeft
              className={`text-sm transition-transform z-10 ${
                isCategoryOpen ? "rotate-90" : "-rotate-90"
              }`}
            />
          </div>
        </div>
        {isCategoryOpen && (
          <div className="flex flex-col p-[10px] mt-2 rounded-[10px] absolute bg-white shadow-lg w-[50%]  top-[60px] max-md:w-full !z-[1000]">
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative"
                onMouseEnter={() => setHoveredCategory(category.name)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <label
                  className={`flex items-center mb-0 cursor-pointer`}
                  htmlFor={category.name}
                >
                  <input
                    type="radio"
                    id={category.name}
                    name="category"
                    className="hidden"
                    checked={selectedCategory === category.name}
                    onChange={handleCategoryChange}
                  />
                  <p
                    className={`w-full px-4 py-2 rounded-md flex items-center justify-between text-sm max-md:px-2 ${
                      selectedCategory === category.name ||
                      hoveredCategory === category.name
                        ? "font-medium"
                        : "font-normal"
                    }`}
                  >
                    {category.name}
                  </p>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* District (Model) Select */}
      <div className="flex flex-col md:px-[10px] w-full max-md:w-full rounded-[10px] justify-between cursor-pointer md:mt-5 md:mb-8  max-md:ml-2">
        <div className="flex flex-col w-full" ref={districtRef}>
          <div
            className={`flex flex-col md:h-10 w-full max-md:w-[90px] rounded-[10px] justify-between cursor-pointer`}
            onClick={toggleDistrict}
          >
            <h2 className="text-lg text-[#050B20] max-md:text-sm max-md:capitalize">
              <span className="max-md:hidden">Выберите</span>&nbsp;модель
            </h2>
            {selectedCategory && (
              <div className="flex justify-between w-full my-2 items-center">
                <p className="text-sm text-[#050B20] line-clamp-1">
                  {selectedDistrict}
                </p>
                <FaChevronLeft
                  className={`text-sm transition-transform z-10 ${
                    isDistrictOpen ? "rotate-90" : "-rotate-90"
                  }`}
                />
              </div>
            )}
          </div>
          {isDistrictOpen && (
            <div className="flex flex-col p-[10px] mt-2 rounded-[10px] absolute bg-white shadow-lg w-1/2 top-[140px] max-md:top-[220px] max-md:w-full max-md:left-0 !z-[1001]">
              {districts.map((district) => (
                <div
                  key={district.id}
                  className="relative"
                  onMouseEnter={() => setHoveredDistrict(district.name)}
                  onMouseLeave={() => setHoveredDistrict(null)}
                >
                  <label
                    className={`flex items-center mb-0 cursor-pointer`}
                    htmlFor={district.name}
                  >
                    <input
                      type="radio"
                      id={district.name}
                      name="district"
                      className="hidden"
                      checked={selectedDistrict === district.name}
                      onChange={handleDistrictChange}
                    />
                    <p
                      className={`w-full px-4 py-2 rounded-md flex items-center justify-between text-sm max-md:px-2 ${
                        selectedDistrict === district.name ||
                        hoveredDistrict === district.name
                          ? "font-medium"
                          : "font-normal"
                      }`}
                    >
                      {district.name}
                    </p>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Generation Select */}
      <div className="flex flex-col md:px-[10px] w-full max-md:w-full rounded-[10px] justify-between cursor-pointer md:mb-8  max-md:ml-2 ">
        <div className="flex flex-col w-full" ref={generationRef}>
          <div
            className={`flex flex-col md:h-10 w-full max-md:w-[90px] rounded-[10px] justify-between cursor-pointer`}
            onClick={toggleGeneration}
          >
            <h2 className="text-lg text-[#050B20] max-md:text-sm">Поколение</h2>
            {selectedDistrict && (
              <div className="flex justify-between w-full my-2 items-center">
                <p className="text-sm text-[#050B20] line-clamp-1">
                  {selectedGeneration}
                </p>
                <FaChevronLeft
                  className={`text-sm transition-transform z-10 ${
                    isGenerationOpen ? "rotate-90" : "-rotate-90"
                  }`}
                />
              </div>
            )}
          </div>
          {isGenerationOpen && (
            <div className="flex flex-col p-[10px] mt-2 rounded-[10px] absolute bg-white shadow-lg w-1/2 top-[220px]  max-md:top-[220px] max-md:w-full max-md:left-0 z-[1001]">
              {generations.map((generation) => (
                <div
                  key={generation.id}
                  className="relative"
                  onMouseEnter={() => setHoveredGeneration(generation.name)}
                  onMouseLeave={() => setHoveredGeneration(null)}
                >
                  <label
                    className={`flex items-center mb-0 cursor-pointer`}
                    htmlFor={generation.name}
                  >
                    <input
                      type="radio"
                      id={generation.name}
                      name="generation"
                      className="hidden"
                      checked={selectedGeneration === generation.name}
                      onChange={handleGenerationChange}
                    />
                    <p
                      className={`w-full px-4 py-2 rounded-md flex items-center justify-between text-sm max-md:px-2 ${
                        selectedGeneration === generation.name ||
                        hoveredGeneration === generation.name
                          ? "font-medium"
                          : "font-normal"
                      }`}
                    >
                      {generation.name}
                    </p>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectCars;
