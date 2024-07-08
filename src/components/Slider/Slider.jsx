/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import { FaStar, FaCircle } from "react-icons/fa";
import "./index.scss";
import axios from "axios";

const delay = 2500;

function truncateText(text, wordLimit) {
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
}

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
  const [slides, setSlides] = useState([]);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/news");
        const data = response.data.results.map((item) => ({
          imageDark: item.photo,
          imageLight: item.photo,
          alt: item.name,
          title: truncateText(item.name, 4),
          description: truncateText(item.info, 25),
          age: item.age,
          like: item.like,
          year: item.year,
        }));
        setSlides(data);
        console.log(data, "DATA");
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchData();
  }, []);

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
  }, [index, slides.length]);

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
                <span className="years-text">{slide.age}+</span>
                <span className="rating">
                  <FaStar className="star-icon" />
                  {slide.like} <FaCircle className="dot-icon" />
                  {slide.year} <FaCircle className="dot-icon" /> 1-qism
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
