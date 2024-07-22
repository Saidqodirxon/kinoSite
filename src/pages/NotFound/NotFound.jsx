/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";

function NotFound() {
  return (
    <div className="relative h-screen w-screen bg-gray-900 overflow-hidden flex items-center justify-center">
      <header className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 opacity-50"></header>

      <div className="absolute inset-0 pointer-events-none">
        <div className="starsec"></div>
        <div className="starthird"></div>
        <div className="starfourth"></div>
        <div className="starfifth"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white">
        <div className="lamp__wrap">
          <div className="lamp">
            <div className="cable"></div>
            <div className="cover"></div>
            <div className="in-cover">
              <div className="bulb"></div>
            </div>
            <div className="light"></div>
          </div>
        </div>

        <section className="error mt-8">
          <div className="error__content">
            <div className="error__message message">
              <h1 className="message__title text-4xl font-bold">
                Sahifa topilmadi
              </h1>
              <p className="message__text mt-4">
                Kechirasiz, siz izlagan sahifa bu yerda topilmadi. Siz kuzatgan
                havola buzilgan yoki endi mavjud emas. Iltimos, qayta urinib
                ko'ring yoki bosh sahifamizga qarang.
              </p>
            </div>
            <div className="error__nav e-nav mt-6">
              <a
                href="/"
                className="e-nav__link bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Bosh sahifaga o'ting
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default NotFound;
