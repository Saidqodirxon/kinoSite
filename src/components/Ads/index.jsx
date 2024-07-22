/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai"; // React Icons yordamida "X" tugmasi uchun ikon

const AdsBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={`fixed bottom-0 left-0 w-full p-4 bg-gray-800 text-white transition-transform transform ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p>Bu reklamadir! Saytimizga xush kelibsiz!</p>
        </div>
        <button onClick={handleClose} className="text-white">
          <AiOutlineClose size={24} />
        </button>
      </div>
    </div>
  );
};

export default AdsBanner;
