"use client";
import React, { useState } from "react";
import axios from "axios";

const LeaveReview = ({ acitve }) => {
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post(
        "https://api.boom-avto.co/review/sayt/",
        {
          name,
          comment: reviewText,
        }
      );

      if (response.status === 201) {
        setSuccessMessage("Ваш отзыв был успешно отправлен!");
        setName("");
        setReviewText("");
      }
    } catch (error) {
      console.error("Error posting review:", error);
      setErrorMessage("Не удалось отправить отзыв, попробуйте еще раз.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSuccessMessage(false);
      }, 3000);
    }
  };

  return (
    <div
      id="topgo"
      className={`container mx-auto px-4 bg-white rounded-[20px] transition-all overflow-hidden relative ${
        acitve ? "py-8 mb-[132px] h-max" : "h-0"
      } `}
    >
      <h2 className="font-montserrat text-[28px] font-black mb-[30px] max-md:text-xl max-md:mb-5 uppercase">
        Оставьте свой отзыв
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Ваше имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="p-3 border border-gray-300 rounded-md focus:outline-none mb-5"
        />

        <textarea
          placeholder="Ваш отзыв"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
          rows="5"
          className="p-3 border border-gray-300 rounded-md focus:outline-none mb-8"
        />

        <div className="h-[69px] w-[200px] max-md:h-[50px] max-md:w-full">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full h-full bg-[#ED0000] text-white transition duration-200 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Отправка..." : "Отправить"}
          </button>
        </div>
      </form>

      {/* Muvaffaqiyatli postdan keyin matn */}
      {successMessage && (
        <p className="max-md:w-full text-center text-red mt-4 absolute left-[50%] translate-x-[-50%] bottom-2 max-md:text-sm">
          Ваш отзыв появится на сайте после проверки
        </p>
      )}
    </div>
  );
};

export default LeaveReview;
