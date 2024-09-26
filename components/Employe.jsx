"use client";
import React, { useEffect, useState } from "react";
import api from "@/lib/api";

export default function Employe() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    api
      .get("/our/employe/")
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="container mb-[100px]">
      <h2 className="font-montserrat text-[28px] font-black mb-[30px] max-md:text-xl max-md:mb-5 uppercase">
        Наши сотрудники
      </h2>
      <div className="gap-3 overflow-x-auto">
        <div className="grid gap-6 max-md:grid-cols-1 max-md:flex max-md:overflow-x-auto max-md:gap-[10px]  custom-scrollbar md:pb-2 max-md:mb-[60px] lg:grid-cols-3">
          {employees.map((emp) => (
            <div
              key={emp.id}
              className="flex flex-col items-start gap-4 max-md:w-full flex-shrink-0"
            >
              <img
                src={emp.image}
                alt={emp.name}
                className="w-max object-fill h-[295px]"
              />
              <div className="text-left text-[16px] font-[500] leading-[19.41px] font-[Gilroy] max-md:text-[13px]">
                {emp.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
