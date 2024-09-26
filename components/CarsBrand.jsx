"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/lib/api";

const CarsBrand = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await api.get("/avto/marka/");
        setBrands(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <h2 className="font-montserrat text-[28px] font-black mb-[30px] max-md:text-xl max-md:mb-5 uppercase">
        Выберите марку авто
      </h2>
      <div className="grid grid-cols-6 max-md:grid-cols-2 mb-[100px]">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="flex flex-col items-center justify-center hover:shadow-lg py-10 max-md:py-6 border border-[#F1F1F1] cursor-pointer transition-all"
          >
            <img
              src={brand.logo}
              alt="logo"
              className="w-[120px] object-cover"
            />
            <p className="text-center text-[#202020] text-sm font-medium mt-[8px]">
              {brand.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarsBrand;
