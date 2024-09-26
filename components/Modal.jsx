import React, { useState } from "react";
import api from "@/lib/api";

const Modal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    // last_name: "",
    phone: "",
    // email: "",
    // discription: "",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Имя обязательно";
    // if (!formData.last_name) newErrors.last_name = "Фамилия обязательно";
    if (!formData.phone) newErrors.phone = "Телефон обязателен";
    // if (!formData.email) newErrors.email = "Электронная почта обязательна";
    // if (!formData.discription) newErrors.discription = "Сообщение обязательно";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await api.post("contact/", formData);
      setMessage("Заявка отправлена!");
      setFormData({
        name: "",
        // last_name: "",
        phone: "",
        // email: "",
        // discription: "",
      });
      setTimeout(onClose, 2000); // Modalni 2 sekunddan keyin yopish
      setTimeout(() => {
        setMessage("");
      }, 2000); // Modalni 2 sekunddan keyin yopish
    } catch (error) {
      setMessage("Произошла ошибка, пожалуйста, попробуйте еще раз.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          className="modal-close !text-black !bg-transparent"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-[#202020] text-[28px] mt-10 mb-5 font-black">
          Оставьте заявку
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <p className="text-xs text-[#ACACAC] mb-1 font-semibold">Ваше имя</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}

          {/* <input
            type="text"
            name="last_name"
            placeholder="Фамилия"
            value={formData.last_name}
            onChange={handleChange}
          />
          {errors.last_name && (
            <p className="error-message">{errors.last_name}</p>
          )} */}
          <p className="text-xs text-[#ACACAC] mb-1 mt-3 font-semibold">
            Номер телефона
          </p>
          <input
            type="text"
            name="phone"
            placeholder="+8210-____-____"
            value={formData.phone}
            onChange={handleChange}
            minLength={12}
            maxLength={12}
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}

          {/* <input
            type="email"
            name="email"
            placeholder="Электронная почта"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}

          <textarea
            name="discription"
            placeholder="Сообщение"
            value={formData.discription}
            onChange={handleChange}
          ></textarea>
          {errors.discription && (
            <p className="error-message">{errors.discription}</p>
          )} */}

          <button type="submit" className="text-xs h-[70px] mt-8">
            Оставить заявку
          </button>
          <p className="text-[13px] mt-5 mb-[28px] text-center text-[#989898] font-semibold px-5 max-md:text-xs w-[340px] mx-auto">
            Нажимая на кнопку, вы даете согласие на обработку персональных
            данных
          </p>
        </form>
        {message && <p className="modal-message">{message}</p>}
      </div>
    </div>
  );
};

export default Modal;
