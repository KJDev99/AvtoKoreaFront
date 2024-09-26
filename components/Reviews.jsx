"use client";
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import LeaveReview from "./LeaveReview";
import ReviewsList from "./ReviewsList";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openComment, setOpenComment] = useState();

  // Axios orqali backenddan malumot olish
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("https://api.boom-avto.co/rivew/");
        setReviews(response.data.results);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  // Rasmlarni to'liq ekranga chiqarish funksiyasi
  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const handleCommentClick = () => {
    setOpenComment((prev) => true);

    const element = document.getElementById("topgo"); // ID orqali elementni olish
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - 200; // 200px tepada to'xtash

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth", // silliq scroll qilish
      });
    }
  };

  return (
    <div className="">
      <div className="container relative">
        <div className="flex max-md:flex-col justify-between md:items-center mb-5 md:h-[69px]">
          <h2 className="font-montserrat text-[28px] font-black  max-md:text-xl uppercase">
            Отзывы о Boom-avto
          </h2>
          <div className="h-[69px] w-[200px] max-md:my-4 max-md:h-[50px]">
            <button
              className="w-full h-full bg-[#ED0000] text-white text-[13px]"
              onClick={handleCommentClick}
            >
              Оставить комментарий
            </button>
          </div>
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          navigation={{
            nextEl: ".swiper-button-next-custom2",
            prevEl: ".swiper-button-prev-custom2",
          }}
          modules={[Navigation]}
          className="mySwiper mb-[100px]"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <img
                src={review.image}
                alt={review.title}
                className="cursor-pointer !h-[296px]"
                onClick={() => openModal(review.image)}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="swiper-button-prev-custom2 absolute right-[80px] transform translate-y-1/2 bottom-[-40px] max-md:w-[49px] max-md:h-8 cursor-pointer z-10 w-[60px] h-10 rounded-[30px] border border-[#E6E6E6] flex justify-center items-center">
          <FaChevronLeft />
        </div>
        <div className="swiper-button-next-custom2 absolute right-0 max-md:right-[20px] max-md:w-[49px] max-md:h-8 transform translate-y-1/2 bottom-[-40px] z-10 cursor-pointer w-[60px] h-10 rounded-[30px] border border-[#E6E6E6] flex justify-center items-center">
          <FaChevronRight />
        </div>

        {/* Modal - to'liq rasmni ochish */}
        {isModalOpen && (
          <div
            className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70 z-50"
            onClick={closeModal}
          >
            <div className="relative h-[90vh]">
              <img
                src={selectedImage}
                alt="Full view"
                className="max-w-full max-h-full"
              />
            </div>
          </div>
        )}
      </div>
      <ReviewsList />
      <LeaveReview acitve={openComment} />
    </div>
  );
};

export default Reviews;
