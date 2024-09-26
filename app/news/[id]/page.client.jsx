"use client";
import image from "@/assets/images/kattaimg.png";
import imagewarn from "@/assets/images/warning.svg";
import carmore from "@/assets/images/carmore.svg";
import InfoBlock from "@/components/InfoBlock";
import Image from "next/image";
import { FaAngleRight } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import api from "@/lib/api";

// Define the generateStaticParams function
// export async function generateStaticParams() {
//   // Replace this with your actual data fetching logic
//   const res = await api.get("/news");
//   const news = await res.json();
//   return news.map((item) => ({
//     id: item.id.toString(),
//   }));
// }

const ClientPage = ({ newsData }) => {
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const [cardNewsData1, setCardCarData] = useState(newsData || {});
  const dateObject = new Date(cardNewsData1.create_at);

  const formattedDate = dateObject.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await api.get(`news/${lastSegment}/`);
  //       setCardCarData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="container mb-[100px] max-md:mb-[60px]">
      <div className="flex gap-6 max-md:flex-col">
        <div className="w-4/6 max-md:w-full">
          <p className="text-[#050B20] text-sm mt-9 mb-2 font-medium max-md:text-xs max-md:mt-5">
            Главная/Новости/{cardNewsData1.title}
          </p>
          <h2 className="mb-[15px] text-[#202020] text-[28px] font-black max-md:text-lg max-md:mb-1">
            {cardNewsData1.title}
          </h2>
          <p className="text-[#989898] mb-[22px] text-sm font-medium max-md:text-xs max-md:mb-5">
            {formattedDate}
          </p>
          <img
            src={cardNewsData1.image}
            alt="title"
            className="h-[383px] w-full rounded-[15px] object-cover max-md:h-[267px]"
          />
          <p className="mt-[25px] mb-[30px] text-[#989898] font-medium max-md:my-5 max-md:text-[13px]">
            {cardNewsData1.discription}
          </p>
          <div className="flex flex-col p-[18px]  border border-[#E6E6E6] rounded-[15px]">
            <div className="flex items-center ">
              <Image src={imagewarn} alt="warn" />
              <h4 className="mx-5 text-[#202020] font-bold max-md:text-[16px]">
                Внимание!
              </h4>
            </div>
            <p className="my-[10px] text-[#989898] font-medium max-md:text-[13px]">
              Важно отметить, что акцент на импорт авто из Южной Кореи
              подтверждает и официальная статистика, в числе которых и данные
              южнокорейской таможни. В первой половине 2022 года объемы продаж
              выросли в шесть раз.
            </p>
            <p className="text-[#989898] font-medium max-md:text-[13px]">
              Повышение показателей обусловлено и тем, что южнокорейские
              компании не могут обеспечить производительность заводов,
              соответствующую запросам потребителей, проживающих на территории
              России из-за проблем с логистикой. Поэтому, многие покупают машины
              напрямую из Южной Кореи, выбирая более выгодные условия.
            </p>
          </div>
        </div>
        <div className="w-2/6 mt-[190px] p-5 shadow-lg h-max rounded-[15px] max-md:hidden">
          <h3 className="text-[#202020] font-semibold text-[20px] pr-[100px]">
            Читайте другие статьи в нашем блоге:
          </h3>
          <div className="flex justify-between mt-5 pb-3 border-b border-[#DDDDDD] items-center">
            <p className="text-sm text-[#989898] font-medium pr-[100px]">
              СРАВНЕНИЕ ЯПОНСКИХ И НЕМЕЦКИХ АВТОМОБИЛЕЙ: ЧТО ЛУЧШЕ?
            </p>
            <FaAngleRight className="text-sm text-[#989898]" />
          </div>
          <div className="flex justify-between mt-5 pb-3 border-b border-[#DDDDDD] items-center">
            <p className="text-sm text-[#989898] font-medium pr-[100px]">
              ТОП-5 НАДЕЖНЫХ АВТОМОБИЛЕЙ ДЛЯ СЕМЕЙНОГО ИСПОЛЬЗОВАНИЯ
            </p>
            <FaAngleRight className="text-sm text-[#989898]" />
          </div>
          <div className="flex justify-between mt-5 pb-3 border-b border-[#DDDDDD] items-center">
            <p className="text-sm text-[#989898] font-medium pr-[100px]">
              ТОП-5 НАДЕЖНЫХ АВТОМОБИЛЕЙ ДЛЯ СЕМЕЙНОГО ИСПОЛЬЗОВАНИЯ
            </p>
            <FaAngleRight className="text-sm text-[#989898]" />
          </div>
          <div className="flex mt-[58px] items-center cursor-pointer">
            <h4 className="text-[#202020] text-sm font-semibold">
              Читать больше новостей
            </h4>
            <Image src={carmore} alt="carmore" className="ml-[10px] h-3 w-3" />
          </div>
        </div>
      </div>
      <InfoBlock />
    </div>
  );
};

export default ClientPage;
