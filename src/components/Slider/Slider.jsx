/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import { FaStar, FaCircle } from "react-icons/fa";
import "./index.scss";

const delay = 2500;

function splitTextIntoLines(text, wordsPerLine) {
  const words = text.split(" ");
  const lines = [];

  for (let i = 0; i < words.length; i += wordsPerLine) {
    lines.push(words.slice(i, i + wordsPerLine).join(" "));
  }

  return lines.join("<br />");
}

const Slider = ({ darkMode, toggleDarkMode }) => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  const slides = [
    {
      imageDark: "/banner_dark_mode.png",
      imageLight: "/banner_light_mode.png",
      alt: "Image 1",
      title: "The Meg",
      description:
        "Film, ilmiy tadqiqotchilarning Marianas chuqurliklarini o’rganish jarayonida hozirgacha mavjud bo’lgan eng yirik dengiz yirtqich hayvon - Megalodon bilan uchrashuvini hikoya qiladi.",
    },
    {
      imageDark: "/banner_dark_mode.png",
      imageLight: "/banner_light_mode.png",
      alt: "Image 2",
      title: "The Meg",
      description:
        "Film, ilmiy tadqiqotchilarning Marianas chuqurliklarini o’rganish jarayonida hozirgacha mavjud bo’lgan eng yirik dengiz yirtqich hayvon - Megalodon bilan uchrashuvini hikoya qiladi.",
    },
    {
      imageDark: "/banner_dark_mode.png",
      imageLight: "/banner_light_mode.png",
      alt: "Image 3",
      title: "The Meg",
      description:
        "Film, ilmiy tadqiqotchilarning Marianas chuqurliklarini o’rganish jarayonida hozirgacha mavjud bo’lgan eng yirik dengiz yirtqich hayvon - Megalodon bilan uchrashuvini hikoya qiladi.",
    },
  ];

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className={`slider-wrapper ${darkMode ? "dark" : ""}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />{" "}
      {/* Navbar component */}
      <div className="slideshow banner">
        <div
          className="slideshowSlider"
          style={{
            transform: `translate3d(${-index * 100}%, 0, 0)`,
            width: "100%",
          }}
        >
          {slides.map((slide, idx) => (
            <div
              className="slide"
              style={{ width: "100%", position: "relative" }}
              key={idx}
            >
              <div className="slide-overlay">
                <span className="years-text">16+</span>
                <span className="rating">
                  <FaStar className="star-icon" />
                  10 <FaCircle className="dot-icon" /> 2018{" "}
                  <FaCircle className="dot-icon" /> 1-qism
                </span>
                <article className="slide-content">
                  <h1
                    className={`font-bold lg:text-5xl sm:text-3xl ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  >
                    {slide.title}
                  </h1>
                  <p
                    className={`lg:text-2xl sm:text-xl slide-desc ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: splitTextIntoLines(slide.description, 10),
                    }}
                  />
                  <button className="watch-button">Tomosha qilish</button>
                </article>
              </div>
              <img
                className="slide_img object-cover"
                src={darkMode ? slide.imageDark : slide.imageLight}
                alt={slide.alt}
              />
            </div>
          ))}
        </div>

        <div
          className="slideshowDots"
          style={{ position: "absolute", bottom: "2rem", left: "40%" }}
        >
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`slideshowDot${index === idx ? " active" : ""}`}
              onClick={() => {
                setIndex(idx);
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
