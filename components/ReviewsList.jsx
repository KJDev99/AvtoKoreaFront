"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Image from "next/image";

const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          "https://api.boom-avto.co/review/sayt/"
        );
        setReviews(response.data.results);
      } catch (err) {
        setError("Не удалось загрузить отзывы. Попробуйте снова позже.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return <p>Загрузка отзывов...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto mb-5">
      <div className="grid gap-6 max-md:grid-cols-1 max-md:flex max-md:overflow-x-auto max-md:gap-[10px]  custom-scrollbar md:pb-2 max-md:mb-[60px] lg:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white p-6 rounded-md max-md:w-full flex-shrink-0"
          >
            <div className="flex">
              <Image src="./personscg.svg" width={64} height={64} />
              <div className="flex flex-col mt-1 ml-5">
                <h3 className="font-bold text-lg text-[#414141]">
                  {review.name}
                </h3>
                <p className="text-xs text-[#8C8C8C]">
                  {moment(review.create_at).format("MMMM YYYY")}
                </p>
              </div>
            </div>

            <p className="mt-3 text-[#414141]">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsList;
