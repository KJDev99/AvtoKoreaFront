import { CgArrowTopRight } from "react-icons/cg";

const NewsCars = ({ image, title, text, date }) => {

  const dateObject = new Date(date);
  
  const formattedDate = dateObject.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="relative rounded-[10px] overflow-hidden">
      <img
        src={image}
        alt="title"
        className="w-full h-[415px] max-md:h-[334px] object-cover"
      />
      <div className="news_shadow absolute left-0 top-0 flex flex-col items-start justify-end h-full p-5">
        <h3 className="text-white text-left font-black text-lg max-md:text-sm ">{title}</h3>
        <p className="text-sm text-white font-medium text-left max-md:text-xs line-clamp-2">{text}</p>
        <div className="flex justify-between mt-3 w-full">
          <button className="border-none outline-none text-white bg-transparent flex items-center text-[13px] font-semibold">
            Подробнее <CgArrowTopRight className="ml-[10px] text-lg mt-1"/>
          </button>
          <p className="text-[13px] text-white font-semibold">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsCars;
