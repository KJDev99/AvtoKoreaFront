"use client";
import { useEffect, useState } from "react";
import NewsCars from "@/components/NewsCars";
import React from "react";
import image from "@/assets/images/news.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Link from "next/link";
import api from "@/lib/api";

const itemsPerPage = 6;
const page = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [cardNewsData, setCardNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get("/news/");
        const formattedData = response.data.results.map((car) => ({
          image: car.image,
          title: car.title,
          text: car.discription,
          date: car.create_at,
          id: car.id,
        }));
        setCardNewsData(formattedData);
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

  // const totalPages = Math.ceil(cardNewsData.length / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const currentCars = cardNewsData.slice(startIndex, startIndex + itemsPerPage);

  // const handleNextPage = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage(currentPage + 1);
  //     window.scrollTo(0, 0);
  //   }
  // };

  // const handlePreviousPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //     window.scrollTo(0, 0);
  //   }
  // };

  // const handlePageClick = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  //   window.scrollTo(0, 0);
  // };

  // const renderPagination = () => {
  //   if (cardNewsData.length <= itemsPerPage) return null;

  //   const pageNumbers = [];
  //   for (let i = 1; i <= totalPages; i++) {
  //     pageNumbers.push(i);
  //   }

  //   return (
  //     <div className="flex justify-center md:mt-[50px] mb-5">
  //       <button
  //         onClick={handlePreviousPage}
  //         disabled={currentPage === 1}
  //         className={`h-[40px] bg-[#F9FBFC] rounded-[20px] border border-[#E9E9E9] w-[60px] ml-2 flex justify-center items-center`}
  //       >
  //         <FaChevronLeft />
  //       </button>
  //       {pageNumbers.map((pageNumber) => (
  //         <button
  //           key={pageNumber}
  //           onClick={() => handlePageClick(pageNumber)}
  //           className={`w-10 h-10 font-semibold mx-1 rounded-[20px] border ${
  //             currentPage === pageNumber
  //               ? "border-[#202020] bg-[#202020] text-white"
  //               : "border-[#E9E9E9] bg-[#F9FBFC] text-[#202020]"
  //           }`}
  //         >
  //           {pageNumber}
  //         </button>
  //       ))}
  //       <button
  //         onClick={handleNextPage}
  //         disabled={currentPage === totalPages}
  //         className={`h-[40px] bg-[#F9FBFC] rounded-[20px] border border-[#E9E9E9] w-[60px] ml-2 flex justify-center items-center`}
  //       >
  //         <FaChevronRight />
  //       </button>
  //     </div>
  //   );
  // };

  return (
    <div className="container">
      <p className="text-[#050B20] text-sm mt-9 mb-[9px]  font-medium max-md:text-xs max-md:mt-5">
        Главная/Новости
      </p>
      <h3 className="text-[28px] font-black mb-[30px] uppercase max-md:text-xl">
        Новости
      </h3>
      <div className="flex flex-col mb-9">
        <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
          {cardNewsData.map((elon, index) => (
            <Link key={index} href={`/news/${elon.id}`}>
              <NewsCars {...elon} />
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-[30px]">
          {" "}
          {/* {renderPagination()} */}
        </div>
      </div>
    </div>
  );
};

export default page;
