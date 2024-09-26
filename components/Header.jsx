"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "@/assets/styles/globals.css";
import { Pagination } from "swiper/modules";
import Button from "./Button";
import axios from "axios";
import api from "@/lib/api";

const Header = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    api
      .get("/banner/")
      .then((response) => {
        setBanners(response.data);
        console.log(response.data, "mobile");
      })

      .catch((error) => {
        console.error("There was an error fetching the banners!", error);
      });
  }, []);

  return (
    <div className="mt-[30px] mb-[70px] !bg-[#FAFAFA] max-md:mt-6 max-md:mb-10">
      <div className="container">
        <Swiper
          pagination={{ clickable: true }} // Make pagination clickable
          modules={[Pagination]}
          className="mySwiper mySwiper1"
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div className="relative rounded-[10px] overflow-hidden max-md:h-[320px]">
                <div className="absolute w-[460px] top-[50px] left-[50px] flex flex-col items-start max-md:top-[20px] max-md:left-[20px] max-md:w-[232px]">
                  <h1 className="text-[38px] font-black text-black text-left max-md:text-xl uppercase">
                    {banner.name}
                  </h1>
                  <p className="text-[17px] text-[#989898] font-medium mb-6 text-left max-md:text-[13px] max-md:mb-[13px]">
                    {banner.short_discription}
                  </p>
                  <div className="h-[70px] w-[220px] cursor-pointer max-md:h-[46px] max-md:w-[143px]">
                    <a href={banner.url} rel="noopener noreferrer">
                      <Button text="Подробнее" />
                    </a>
                  </div>
                </div>
                {/* <img
                  src={banner.image}
                  alt="banner"
                  className="max-md:hidden"
                /> */}
                {window.innerWidth < 768 ? (
                  <img
                    src={banner.image_mobile}
                    alt="banner2"
                    className="hidden max-md:block"
                  />
                ) : (
                  <img
                    src={banner.image}
                    alt="banner"
                    className="max-md:hidden"
                  />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Header;
