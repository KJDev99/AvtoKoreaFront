"use client";
import { useEffect, useState } from "react";
import CardCar from "./CardCar";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Link from "next/link";
import api from "@/lib/api";

const itemsPerPage = 6;
const CatalogCars = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [cardCarData, setCardCarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get("/avto/");
        const formattedData = response.data.results.map((car) => ({
          goodPrice: car.goodPrice || false,
          top: car.top || false,
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

  // const totalPages = Math.ceil(cardCarData.length / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const currentCars = cardCarData.slice(startIndex, startIndex + itemsPerPage);

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
  //   if (cardCarData.length <= itemsPerPage) return null;

  //   const pageNumbers = [];
  //   for (let i = 1; i <= totalPages; i++) {
  //     pageNumbers.push(i);
  //   }

  //   return (
  //     <div className="flex justify-center mt-[50px] max-md:my-3 mb-5">
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
    <div className="md:container">
      <div className="flex flex-col mb-9">
        <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
          {cardCarData.map((elon, index) => (
            <Link href={`/katalog/${elon.id}`} key={index}>
              <CardCar {...elon} />
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

export default CatalogCars;
