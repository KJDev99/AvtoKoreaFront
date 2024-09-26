"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import CardCar from "./CardCar";
import image from "@/assets/images/card.png";

import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { Navigation } from "swiper/modules";
import Link from "next/link";
import api from "@/lib/api";

const BestDeals = () => {
  const [cardCarData, setCardCarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get("/avot/best/");
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
    <>
      <div className="md:container relative">
        <h2 className="font-montserrat text-[28px] font-black mb-[30px]  max-md:text-xl max-md:mb-5 container uppercase">
          Лучшие предложения
        </h2>

        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          navigation={{
            nextEl: ".swiper-button-next-custom1",
            prevEl: ".swiper-button-prev-custom1",
          }}
          modules={[Navigation]}
          className="mySwiper mb-[170px] max-md:mb-[120px] "
        >
          {cardCarData.map((car, index) => (
            <SwiperSlide key={index} className="max-md:px-5 max-md:pb-5">
              <Link href={`/katalog/${car.id}`}>
                <CardCar {...car} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-button-prev-custom1 absolute right-[80px] transform translate-y-1/2 bottom-[-40px] cursor-pointer z-10 w-[60px] h-10 max-md:w-[49px] max-md:h-8 rounded-[30px] border border-[#E6E6E6] flex justify-center items-center">
          <FaChevronLeft />
        </div>
        <div className="swiper-button-next-custom1 absolute right-0 max-md:right-[20px] transform translate-y-1/2 bottom-[-40px] z-10 cursor-pointer w-[60px] h-10 max-md:w-[49px] max-md:h-8 rounded-[30px] border border-[#E6E6E6] flex justify-center items-center">
          <FaChevronRight />
        </div>
      </div>
      {/* <h2 className="font-montserrat text-[28px] font-black mb-[30px]  max-md:text-xl max-md:mb-5 container uppercase md:hidden">
        Лучшие предложения
      </h2>
      <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1 max-md:flex max-md:overflow-x-auto max-md:gap-[10px]  custom-scrollbar md:pb-2 md:hidden max-md:mb-[60px]">
        {cardCarData.map((car, index) => (
          <Link
            href={`/katalog/${car.id}`}
            key={index}
            className="max-md:w-full max-md:flex-shrink-0"
          >
            <CardCar {...car} />
          </Link>
        ))}
      </div> */}
    </>
  );
};

export default BestDeals;
