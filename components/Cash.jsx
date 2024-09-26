"use client";
import React, { useEffect, useState } from "react";
import CardCar from "./CardCar";
import image from "@/assets/images/card.png";
import Link from "next/link";
import api from "@/lib/api";

const Cash = () => {
  const [cardCarData, setCardCarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get("/avto/");
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

    fetchCars();
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <div className="flex flex-col mb-9">
        {/* <h2 className="font-montserrat text-[28px] font-black max-md:text-xl">
          В наличии
        </h2> */}
        <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1 max-md:flex max-md:overflow-x-auto max-md:gap-[10px]  custom-scrollbar md:pb-2 mb-4">
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

        <div className="flex justify-end ">
          <Link href={"/katalog"}>
            <button className="border border-red text-red text-sm px-[50px] py-5 font-medium max-md:px-[38px] max-md:text-xs">
              Все машины
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cash;
