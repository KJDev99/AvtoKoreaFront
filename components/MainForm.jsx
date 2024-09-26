"use client";
import { CiLocationOn, CiMail } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaVk } from "react-icons/fa";
import { useRef, useState } from "react";
import api from "@/lib/api";

const MainForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.post("contact/", { name, phone });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError("Ошибка при отправке формы. Пожалуйста, заполните все поля.");
    } finally {
      setLoading(false);
    }
  };

  const textRef = useRef(null);

  const handleDoubleClick = () => {
    const range = document.createRange();
    const selection = window.getSelection();

    if (textRef.current) {
      range.selectNodeContents(textRef.current);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };
  return (
    <div className="md:container mb-[100px] max-md:mb-[60px]">
      <div className="flex justify-between max-md:flex-col-reverse">
        <div className="w-1/2 max-md:w-full">
          <div className="bg-form1 pl-[60px] pr-[80px] max-md:pl-[40px] max-md:pr-[50px] flex flex-col">
            <h2 className="text-[28px] text-white font-black mt-[44px] text-center mb-8 max-md:text-xl max-md:mt-7 max-md:mb-4 uppercase">
              Оставьте заявку
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <p className="text-xs text-white mb-1 font-semibold">Ваше имя</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-[65px] max-md:h-[55px] w-full border border-white outline-none bg-transparent rounded-[5px] px-5 max-md:px-3 text-white placeholder-white"
                placeholder="Имя"
              />
              <p className="text-xs text-white mb-1 mt-3 font-semibold">
                Номер телефона
              </p>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-[65px] max-md:h-[55px] w-full border border-white outline-none bg-transparent rounded-[5px] px-5 max-md:px-3 text-white placeholder-white"
                placeholder="+8210-____-____"
                minLength={12}
                maxLength={12}
              />
              <button
                type="submit"
                className="bg-white text-red w-full h-[70px] max-md:h-[55px] mt-5 mb-3 max-md:my-[10px] rounded-[5px] border-none outline-none font-semibold max-md:text-xs"
                disabled={loading}
              >
                {loading ? "Отправка..." : "Оставить заявку"}
              </button>
              {success && (
                <p className="text-green-500 text-center">Заявка отправлена!</p>
              )}
              <p className="text-[13px] mb-[50px] max-md:mb-[30px] text-center text-white font-semibold px-5 max-md:text-xs">
                Нажимая на кнопку, вы даете согласие на обработку персональных
                данных
              </p>
            </form>
          </div>
        </div>
        <div className="w-1/2 max-md:w-full ">
          <div className="bg-form2 p-10 mt-10 max-md:p-5 rounded-[10px]">
            <h3 className="text-[28px] font-black mb-5 uppercase max-md:text-lg  max-md:mb-3">
              Контакты
            </h3>
            <div className="flex flex-col font-medium mb-4 max-md:mb-3">
              <p className="text-[#989898] text-sm mb-1 max-md:text-xs">
                Телефон
              </p>
              <a className="text text-[#202020]" href="tel:+821046947575">
                +82 10-4694-7575
              </a>
            </div>
            <div className="flex flex-col font-medium mb-4 max-md:mb-3">
              <p className="text-[#989898] text-sm mb-1 max-md:text-xs">
                Электронная почта
              </p>
              <a
                className="text text-[#202020]"
                href="mailto:rina051374@gmail.com"
              >
                rina051374@gmail.com
              </a>
            </div>
            <div className="flex flex-col font-medium mb-4 max-md:mb-3">
              <p className="text-[#989898] text-sm mb-1 max-md:text-xs">
                Адрес
              </p>
              <a className="text text-[#202020]">
                <span
                  className="text-nowrap"
                  ref={textRef}
                  onDoubleClick={handleDoubleClick}
                >
                  경기 수원시 권선구 권선로
                </span>{" "}
                308-5 Южная Корея, г. Сувон
              </a>
            </div>

            <div className="flex mb-[76px]  max-md:mb-10">
              <a
                href="https://vk.com/id840258784"
                className="bg-[#F6F6F6] flex font-medium justify-between p-4 mr-1"
              >
                <FaVk className="cursor-pointer text-c989898 text-xl" />
              </a>
              <a
                href="https://wa.me/821046947575"
                className="bg-[#F6F6F6] flex font-medium justify-between p-4 mr-1"
              >
                <FaWhatsapp className="cursor-pointer text-c989898 text-xl" />
              </a>
              <a
                href="https://www.instagram.com/li2546?igsh=bmJqNGFiNzVvZXp3&utm_source=qr"
                className="bg-[#F6F6F6] flex font-medium justify-between p-4 mr-1"
              >
                <FaInstagram className="cursor-pointer text-c989898 text-xl" />
              </a>
              <a
                href="https://www.facebook.com/irina.li.351?mibextid=LQQJ4d"
                className="bg-[#F6F6F6] flex font-medium justify-between p-4 mr-1"
              >
                <FaFacebookF className="cursor-pointer text-c989898 text-xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainForm;
