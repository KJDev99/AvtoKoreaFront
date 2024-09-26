import InfoMenuItem from "@/components/InfoMenuItem";
import MainForm from "@/components/MainForm";
import React from "react";
import itemImg1 from "@/assets/images/infomenu1.svg";
import itemImg2 from "@/assets/images/infomenu2.svg";
import itemImg3 from "@/assets/images/infomenu3.svg";
import itemImg4 from "@/assets/images/infomenu4.svg";
import AboutContent from "@/components/AboutContent";

const page = () => {
  return (
    <div className="container">
      <p className="text-[#050B20] text-sm mt-9 mb-2 font-medium max-md:text-xs max-md:mt-5">
        Главная/О нас
      </p>
      <h2 className="text-[28px] text-[#202020] font-black mb-[30px] max-md:text-xl uppercase">
        О нашей компании
      </h2>
      <p className="text-[#989898] font-medium mb-[10px] max-md:text-[13px]">
        Здравствуйте!
      </p>
      <p className="text-[#989898] font-medium mb-[10px] max-md:text-[13px]">
         Добро пожаловать на сайт BOOM-AVTO, где вы можете найти лучшие
        предложения по продаже подержанных автомобилей!
      </p>
      <p className="text-[#989898] font-medium mb-[10px] max-md:text-[13px]">
        С нами Вы всегда будете в курсе всех новинок и событий!
      </p>

      <div className="flex flex-col mt-[35px] max-md:mt-[30px]">
        <h2 className="text-[28px] text-[#202020] font-black mb-[30px] max-md:text-xl uppercase">
          Почему стоит выбрать нас:
        </h2>
        <div className="grid grid-cols-3 gap-6 mb-[100px] max-md:mb-0 max-md:grid-cols-1">
          <InfoMenuItem
            img={itemImg1}
            text="Работаем под ключ"
            title="У нас вы можете приобрести автомобиль напрямую у официального автодилера, без посредников и переводчиков."
          />
          <InfoMenuItem
            img={itemImg2}
            text="Круглосуточный онлайн-чат 24/7"
            title="Мы всегда на связи, чтобы ответить на ваши вопросы и помочь с выбором."
          />
          <InfoMenuItem
            img={itemImg3}
            text="Упрощенный&nbsp;выбор&nbsp;авто"
            title="Мы создали этот сайт, чтобы сделать поиск автомобиля по вашим критериям максимально простым и удобным."
          />
        </div>
      </div>
      <AboutContent />
      <div className="flex flex-col mt-[35px] max-md:mt-[30px]">
        <h2 className="text-[28px] text-[#202020] font-black mb-[30px] max-md:text-xl uppercase">
          Наши преимущества
        </h2>
        <div className="grid grid-cols-3 gap-6 mb-[100px] max-md:mb-0 max-md:grid-cols-1">
          <div
            className={`px-6 flex flex-col shadow-lg bg-white py-[30px] h-[210px] max-md:h-[177px] max-md:px-3 rounded-[5px] `}
          >
            <h3 className="mb-2 text-[22px] text-[#202020] font-bold max-md:text-lg  max-md:mb-2">
              Индивидуальный подход
            </h3>
            <p className="text-[15px] text-[#989898] font-medium max-md:text-xs">
              наша команда профессионалов всегда готова оказать персональную
              консультацию и помощь в подборе и покупке автомобиля, предоставляя
              гарантию и оформляя все необходимые документы.
            </p>
          </div>
          <div
            className={`px-6 flex flex-col shadow-lg bg-white py-[30px] h-[210px] max-md:h-[177px] max-md:px-3 rounded-[5px] `}
          >
            <h3 className="mb-2 text-[22px] text-[#202020] font-bold max-md:text-lg  max-md:mb-2">
              Удобные варианты оплаты
            </h3>
            <p className="text-[15px] text-[#989898] font-medium max-md:text-xs">
              наличный расчёт или автокредитование
            </p>
          </div>
          <div
            className={`px-6 flex flex-col shadow-lg bg-white py-[30px] h-[210px] max-md:h-[177px] max-md:px-3 rounded-[5px] `}
          >
            <p className="text-[15px] text-[#989898] font-medium max-md:text-xs">
              Обращаясь к официальным представителям, вы защищаете себя от таких
              рисков, как завышенная цена и скрытые повреждения автомобиля. Мы
              гарантируем честные сделки и полную прозрачность! С уважением,
              <span className="text-[red]"> BOOM-AVTO !</span>
            </p>
          </div>
        </div>
      </div>
      <MainForm />
    </div>
  );
};

export default page;
