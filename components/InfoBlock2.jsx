import React, { useState } from "react";
import Button from "./Button";
// import ImgManCar from "@/assets/images/mancar.png";
import Image from "next/image";
import Modal from "./Modal";

const InfoBlock = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="mt-[100px]  shadow-lg rounded-[15px] flex  h-[288px] max-md:h-[543px] max-md:flex-col">
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <div className="w-1/2 p-8 max-md:w-full max-md:py-5 max-md:px-5 bg-white">
        <h2 className="text-[#202020] text-[26px] font-montserrat font-bold max-md:text-xl uppercase">
          Нужна помощь с выбором?
        </h2>
        <p className="mb-6 mt-3 text-[#989898] font-medium max-md:mt-2 max-md:mb-5 max-md:text-[13px]">
          Оставьте заявку, и наши менеджеры помогут вам подобрать автомобиль под
          ваши потребности и бюджет!
        </p>
        <div
          className="w-[210px] h-[67px] max-md:w-[167px] max-md:h-[57px]"
          onClick={() => setModalOpen(true)}
        >
          <Button text="Оставить заявку" />
        </div>
      </div>
      <div className="w-1/2 bg_clip2 rounded-b-[15px] relative max-md:w-full h-full"></div>
    </div>
  );
};

export default InfoBlock;
