"use client";
import { useState, useEffect } from "react";
import FilterMenu from "./FilterMenu";
import SelectCars from "./SelectCars";
import YearsSelect from "./YearsSelect";
import SelectPrice from "./SelectPrice";
import SearchBtn from "@/assets/images/searchbtn.svg";
import Button from "./Button"; // Update with the correct path to your API configuration
import api from "@/lib/api";
import Link from "next/link";
import CardCar from "./CardCar";
import SelectMileage from "./SelectMileage";
import FuelSelect from "./FuelSelect";
import ConfigurationSelect from "./ConfigurationSelect";
import OrderSelect from "./OrderSelect";
import MoneySelect from "./MoneySelect";
import AdditionalSelect from "./AdditionalSelect";
import { IoIosClose } from "react-icons/io";

const Filter = ({ btn }) => {
  const [filter, setFilter] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const [generationId, setGenerationId] = useState(null);
  const [fuelType, setFuelType] = useState(null);
  const [configurationId, setConfigurationId] = useState(null);
  const [additional, setAdditional] = useState(null);
  const [ordering, setOrdering] = useState(null);
  const [yearOne, setyearOne] = useState(null);
  const [yearTwo, setyearTwo] = useState(null);
  const [priceMin, setPriceMin] = useState(null);
  const [priceMax, setPriceMax] = useState(null);
  const [mileageMin, setMileageMin] = useState(null);
  const [mileageMax, setMileageMax] = useState(null);
  const [cardCarData, setCardCarData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [searchValue, setSearchValue] = useState(null);
  // const [seeAllCarsClicked, setSeeAllCarsClicked] = useState(false);
  const [pageSize, setPageSize] = useState(4);

  const [paramValue, setParamValue] = useState(null);
  const [markaName, setmarkaName] = useState(null);
  useEffect(() => {
    const interval = setInterval(() => {
      const adIdType = sessionStorage.getItem("adIdType");
      const markaName = sessionStorage.getItem("markaName");
      setParamValue(adIdType ? adIdType : null);
      setmarkaName(markaName ? markaName : null);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    setSearchQuery(sessionStorage.getItem("searchQuery") || "");
  }, []);
  const fetchSearchResults = async (query) => {
    try {
      const response = await api.get(query);
      const formattedData = response.data.results.map((car) => ({
        goodPrice: car.good_price,
        top: car.avto_xit,
        savedcar: car.savedcar || false,
        image: car.avto_image[0].image,
        name: car.name,
        text: car.short_description,
        speed: car.probeg,
        oil: car.type_fuel.name,
        year: car.year,
        price: car.price_yuan,
        price_d: car.price_dollor,
        price_r: car.price_rubl,
        id: car.id,
      }));
      setCardCarData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const handleSearchQueryChange = () => {
      const newQuery = sessionStorage.getItem("searchQuery") || "";
      setSearchQuery(newQuery);

      if (newQuery) {
        fetchSearchResults(newQuery);
      }
    };

    window.addEventListener("searchQueryChange", handleSearchQueryChange);

    return () => {
      window.removeEventListener("searchQueryChange", handleSearchQueryChange);
    };
  }, []);

  useEffect(() => {
    fetchCars();
  }, [paramValue, markaName]);
  const fetchCars = async () => {
    setLoading(true);
    setError(null);

    let url = "avto";

    if (sessionStorage.getItem("adIdType")) {
      url = `model/avto/${sessionStorage.getItem("adIdType")}/`;
    }
    if (sessionStorage.getItem("markaName")) {
      url = `/avto/?marka_avto=${sessionStorage.getItem("markaName")}`;
    }

    try {
      const response = await api.get(url, {
        params: {
          is_new: filter,
          marka_avto: categoryId,
          model_avto: districtId,
          generation: generationId,
          year_one: yearOne,
          year_two: yearTwo,
          price_yuan_min: priceMin,
          price_yuan_max: priceMax,
          probeg_min: mileageMin,
          probeg_max: mileageMax,
          type_fuel: fuelType != "Все" ? fuelType : "",
          type_avto: configurationId != "Все" ? configurationId : "",
          state_or_drive: additional,
          order: ordering, // Sort by price in descending order
          page: 1,
          page_size: pageSize,
          vin: searchValue,
        },
      });
      const formattedData = response.data.results.map((car) => ({
        goodPrice: car.good_price,
        top: car.avto_xit,
        savedcar: car.savedcar || false,
        image: car.avto_image[0].image,
        name: car.name,
        text: car.short_description,
        speed: car.probeg,
        oil: car.type_fuel.name,
        year: car.year,
        price: car.price_yuan,
        price_d: car.price_dollor,
        price_r: car.price_rubl,
        id: car.id,
      }));
      setCardCarData(formattedData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
    setIsSearchClicked(false); // Reset the search state
  }, [isSearchClicked]);

  const handleFilterChange = (filterValue) => {
    setFilter(filterValue);
  };

  const handleCategoryChange = (categoryId) => {
    setCategoryId(categoryId);
  };

  const handleDistrictChange = (districtId) => {
    setDistrictId(districtId);
  };
  const handleGenerationChange = (generationId) => {
    setGenerationId(generationId);
  };

  const handleYearOne = (yearOne) => {
    setyearOne(yearOne);
  };

  const handleYearTwo = (yearTwo) => {
    setyearTwo(yearTwo);
  };
  const handlepriceMin = (priceMin) => {
    setPriceMin(priceMin);
  };

  const handlepriceMax = (priceMax) => {
    setPriceMax(priceMax);
  };
  const handleMileageMin = (mileageMin) => {
    setMileageMin(mileageMin);
  };
  const handleMileageMax = (mileageMax) => {
    setMileageMax(mileageMax);
  };
  const handleFuelChange = (fuelType) => {
    setFuelType(fuelType);
  };
  const handleConfigurationChange = (configurationId) => {
    setConfigurationId(configurationId);
  };
  const handleAdditionalChange = (additional) => {
    setAdditional(additional);
  };
  const handleOrder = (ordering) => {
    setOrdering(ordering);
  };

  const handleSearchClick = () => {
    setIsSearchClicked(true);
    // setSeeAllCarsClicked(true);
  };

  const handleResetClick = () => {
    location.reload();
  };

  const handleLoadMore = async () => {
    const newPageSize = pageSize + 4;
    setPageSize(newPageSize);
  };

  useEffect(() => {
    fetchCars();
  }, [pageSize]);

  return (
    <>
      <div className="md:container">
        <div className=" grid grid-cols-3 bg-[#FBFBFB] shadow-lg rounded-2xl border mb-[100px] mt-[0px] p-5 max-md:mt-[0px] max-md:mb-[60px] max-md:py-[15px] ">
          <div className=" flex flex-col max-md:col-span-3">
            <FilterMenu onFilterChange={handleFilterChange} />
            <h3 className="mt-8 mb-2 md:mx-10">Поиск по номеру</h3>
            <div className="bg-bgwhite flex items-center justify-between p-4 md:mx-10 rounded-[5px] max-md:w-full w-[360px] ">
              <input
                type="text"
                className="bg-transparent border-none outline-none text-c989898"
                placeholder="Введите номер"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap mt-5 rounded-[5px] justify-between max-md:flex-wrap">
              <div className="flex w-full md:flex-col my-4 max-md:w-full">
                {" "}
                <SelectCars
                  onCategoryChange={handleCategoryChange}
                  onDistrictChange={handleDistrictChange}
                  onGenerationChange={handleGenerationChange}
                />
                <div className="flex flex-col justify-between px-[30px]">
                  {/* <FuelSelect onFuelChange={handleFuelChange} /> */}
                  <ConfigurationSelect
                    onConfigurationChange={handleConfigurationChange}
                  />
                  <AdditionalSelect
                    onAdditionalChange={handleAdditionalChange}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center w-5/5 md:px-[40px] flex-wrap md:flex-grow md:justify-around mb-8 max-md:flex-wrap max-md:w-full">
                <YearsSelect
                  onYearOne={handleYearOne}
                  onYearTwo={handleYearTwo}
                />
                <SelectMileage
                  onMileageMin={handleMileageMin}
                  onMileageMax={handleMileageMax}
                />
                <SelectPrice
                  onPriceMin={handlepriceMin}
                  onPriceMax={handlepriceMax}
                />
                <OrderSelect onOrderChange={handleOrder} />
              </div>
              <div className="flex w-full mx-10 max-md:hidden">
                <div
                  className="h-[63px] w-[216px] cursor-pointer  mr-8 mb-5"
                  onClick={handleSearchClick}
                >
                  <Button image={SearchBtn} text="Пoиск" />
                </div>
                <div
                  className="cursor-pointer flex justify-center mt-5"
                  onClick={handleResetClick}
                >
                  <p>Сбросить</p>
                  <IoIosClose size={28} className="text-[20px] mt-[-2px]" />
                </div>
              </div>
            </div>
            <div
              className="h-[63px] w-[216px] max-md:w-full max-md:h-[53px] max-md:mt-6 cursor-pointer md:hidden"
              onClick={handleSearchClick}
            >
              <Button image={SearchBtn} text="Пoиск" />
            </div>
            <div
              className="cursor-pointer flex justify-start mt-5 md:hidden max-md:text-sm"
              onClick={handleResetClick}
            >
              <p>Сбросить</p>
              <IoIosClose size={28} className="text-[20px] mt-[-2px]" />
            </div>
          </div>
          <div className="col-span-2 max-md:col-span-3 max-md:mt-6">
            <div className="md:container">
              <div className="flex flex-col mb-9 gap-4">
                <div className="flex justify-between items-center max-md:container">
                  <h2 className="font-montserrat text-[28px] font-black max-md:text-xl uppercase">
                    В наличии
                  </h2>
                  <MoneySelect />
                </div>

                <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1 max-md:flex max-md:overflow-x-auto max-md:gap-[10px]  custom-scrollbar mb-4 max-md:p-5">
                  {cardCarData.map((elon, index) => (
                    <Link
                      href={`/katalog/${elon.id}`}
                      key={index}
                      className="max-md:w-full max-md:flex-shrink-0"
                    >
                      <CardCar {...elon} />
                    </Link>
                  ))}
                </div>
                {/* {btn ? (
                  <div className="flex justify-end ">
                    <Link href={"/katalog"}>
                      <button className="border border-red text-red text-sm px-[50px] py-5 font-medium max-md:px-[38px] max-md:text-xs">
                        Все машины
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex justify-end ">
                    <button
                      className="border border-red text-red text-sm px-[50px] py-5 font-medium max-md:px-[38px] max-md:text-xs"
                      onClick={handleLoadMore}
                      disabled={loading}
                    >
                      {loading ? "Загружается..." : "Загрузить больше"}
                    </button>
                  </div>
                )} */}
                <div className="flex justify-end ">
                  <button
                    className="border border-red text-red text-sm px-[50px] py-5 font-medium max-md:px-[38px] max-md:text-xs"
                    onClick={handleLoadMore}
                    disabled={loading}
                  >
                    {loading ? "Загружается..." : "Загрузить больше"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {seeAllCarsClicked && (
        <div className="md:container">
          <div className="flex flex-col mb-9">
            <div className="flex justify-between items-center max-md:container">
              <h2 className="font-montserrat text-[28px] font-black max-md:text-xl uppercase">
                В наличии
              </h2>
              <MoneySelect />
            </div>

            <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1 max-md:flex max-md:overflow-x-auto max-md:gap-[10px]  custom-scrollbar mb-4 max-md:p-5">
              {cardCarData.map((elon, index) => (
                <Link
                  href={`/katalog/${elon.id}`}
                  key={index}
                  className="max-md:w-full max-md:flex-shrink-0"
                >
                  <CardCar {...elon} />
                </Link>
              ))}
            </div>
            {btn && (
              <div className="flex justify-end mt-[30px]">
                <Link href={"/katalog"}>
                  <button className="border border-red text-red text-sm px-[50px] py-5 font-medium max-md:px-[38px] max-md:text-xs">
                    Все машины
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )} */}
    </>
  );
};

export default Filter;
