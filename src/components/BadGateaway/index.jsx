/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
// src/components/Error502.js
import React from "react";
import "./index.scss"; // Import the custom CSS for the animation

const Error502 = () => {
  return (
    <div className="error-page h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden">
      <header className="top-header w-full absolute top-0 left-0 h-1 bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400"></header>
      <div className="starsec"></div>
      <div className="starthird"></div>
      <div className="starfourth"></div>
      <div className="starfifth"></div>
      <div className="lamp__wrap absolute flex justify-center items-center w-full h-full">
        <div className="lamp">
          <div className="cable"></div>
          <div className="cover"></div>
          <div className="in-cover">
            <div className="bulb"></div>
          </div>
          <div className="light"></div>
        </div>
      </div>
      <section className="error__content flex flex-col items-center justify-center text-white z-10">
        <div className="error__message text-center">
          <h1 className="text-6xl font-bold mb-4">502</h1>
          <h2 className="text-4xl mb-4">Xato</h2>
          <p className="text-xl">Serverdan yaroqsiz javob.</p>
        </div>
        <div className="error__nav mt-8">
          <a
            href="/"
            className="e-nav__link bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Bosh sahifaga o'ting
          </a>
        </div>
      </section>
    </div>
  );
};

export default Error502;
