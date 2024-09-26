"use client";
import { useState, useEffect } from "react";
import image from "@/assets/images/card.png";
import CardCar from "@/components/CardCar";
import InfoBlock from "@/components/InfoBlock";
import Link from "next/link";
import api from "@/lib/api";
import SavedImg from "@/assets/images/savedcar.svg";
import Image from "next/image";

const itemsPerPage = 6;

const SavedCarsPage = () => {
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await api.get("avto/");
      const allCars = response.data.results;

      const formattedData = allCars.map((car) => ({
        goodPrice: car.good_price,
        top: car.avto_xit,
        savedcar: car.savedcar || false,
        image: car.avto_image[0]?.image || image,
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

      const savedCarIds = JSON.parse(
        sessionStorage.getItem("savedCars") || "[]"
      );
      const filtered = formattedData.filter((car) =>
        savedCarIds.includes(car.id)
      );
      setFilteredCars(filtered);
    } catch (error) {
      setError("Failed to fetch data");
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const handleStorageChange = () => {
      fetchData();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleClear = (carId) => {
    // Remove the car ID from sessionStorage
    const savedCarIds = JSON.parse(sessionStorage.getItem("savedCars") || "[]");
    const updatedCarIds = savedCarIds.filter((id) => id !== carId);
    sessionStorage.setItem("savedCars", JSON.stringify(updatedCarIds));
    sessionStorage.setItem(`car-${carId}`, "false");

    // Update the filtered cars state
    setFilteredCars(filteredCars.filter((car) => car.id !== carId));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (filteredCars.length === 0) {
    return (
      <div className="container flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Здесь пока нет машин</p>
      </div>
    );
  }

  return (
    <div className="container">
      <p className="text-[#050B20] text-sm mt-9 mb-2 font-medium max-md:text-xs max-md:mt-5">
        Главная/Избранные
      </p>
      <div className="flex flex-col mb-[100px]">
        <h2 className="text-[28px] text-[#202020] font-black mb-[30px] max-md:text-xl">
          Избранные
        </h2>
        <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
          {filteredCars.map((car) => (
            <div key={car.id} className="relative">
              <Link href={`/katalog/${car.id}`}>
                <CardCar {...car} />
              </Link>
              <Image
                src={SavedImg}
                alt="Save status"
                className="absolute top-9 right-9 !h-[15px] !w-[15px] cursor-pointer z-10"
                onClick={() => handleClear(car.id)}
              />
            </div>
          ))}
        </div>
        <InfoBlock />
      </div>
    </div>
  );
};

export default SavedCarsPage;
