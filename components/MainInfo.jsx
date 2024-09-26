"use client";
import itemImg1 from "@/assets/images/infomenu1.svg";
import itemImg2 from "@/assets/images/infomenu2.svg";
import itemImg3 from "@/assets/images/infomenu3.svg";
import itemImg4 from "@/assets/images/infomenu4.svg";
import InfoMenuItem from "./InfoMenuItem";
import Button from "./Button";
import { useState } from "react";
import Modal from "./Modal";
const MainInfo = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="inner_bg relative w-full  pb-[100px]">
      <img
        src="./innerbgflag.webp"
        alt="Chap tomondagi rasm"
        className="absolute top-[-128px] left-0 z-[-1] max-md:top-[-28px]"
      />
      <img
        src="./innerbg.webp"
        alt="O'ng tomondagi rasm"
        className="absolute top-[50px] right-0 z-[-1] max-md:top-[760px]"
      />
      <div className="container  pt-[230px] ">
        <div className="grid md:grid-cols-4 gap-6 mb-[50px]">
          <InfoMenuItem
            img={itemImg1}
            text="Работаем под ключ"
            title="У нас вы можете приобрести автомобиль напрямую у официального автодилера, без посредников и переводчиков."
          />
          <InfoMenuItem
            img={itemImg2}
            text="Онлайн-чат 24/7"
            title="Мы всегда на связи, чтобы ответить на ваши вопросы и помочь вам с выбором."
            top={true}
          />
          <InfoMenuItem
            img={itemImg3}
            text="Упрощенный выбор авто"
            title="Мы создали этот сайт, чтобы сделать поиск автомобиля по вашим критериям максимально простым и удобным."
          />
          <InfoMenuItem
            img={itemImg4}
            text="Доставка"
            title="Поставка в любой регион РФ, прямая связь без посредников."
            top={true}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-md:text-[13px] max-md:gap-4">
          <p className="text-[#989898]">
            Мы имеем огромный опыт работы с автомобильным рынком Кореи и
            тщательно отбираем автомобили для наших клиентов, учитывая их
            потребности и бюджет. Мы работаем только с надежными поставщиками и
            перевозчиками, чтобы обеспечить безопасность и надежность доставки.
          </p>
          <div className="flex flex-col md:ml-[140px]">
            <p className="text-black mb-6 font-semibold">
              Приобретайте качественный автомобиль по выгодным условиям с нами –
              мы обеспечим успешную и приятную покупку.
            </p>
            <div
              className="w-[200px] h-[70px] max-md:w-[164px] max-md:h-[50px] max-md:m-auto"
              onClick={() => setModalOpen(true)}
            >
              <Button text="Оставить заявку" />
            </div>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainInfo;
