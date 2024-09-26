import Image from "next/image";
import React from "react";

const Button = ({ bg, text, textColor, image }) => {
  return (
    <div
      className={`relative h-full w-full flex items-center justify-center ${
        bg ? `bg-${bg}` : "bg-red"
      } ${textColor ? `bg-${textColor}` : "text-white"}`}
    >
      {text}
      {image && (
        <Image
          className="absolute top-[50%] left-10 max-md:top-[50%] max-md:left-[35%] translate-x-[-50%] translate-y-[-50%]"
          src={image}
          alt="img"
        />
      )}
    </div>
  );
};

export default Button;
