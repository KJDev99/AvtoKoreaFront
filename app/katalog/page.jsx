import CarsBrand from "@/components/CarsBrand";
import CatalogCars from "@/components/CatalogCars";
import Filter from "@/components/Filter";
import React from "react";

const page = () => {
  return (
    <div className="md:container">
      <p className="text-[#050B20] text-sm my-9 font-medium max-md:container">
        Главная/Каталог
      </p>
      <Filter btn={false} />
      {/* <CatalogCars /> */}
      {/* <CarsBrand /> */}
    </div>
  );
};

export default page;
