/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import {
  FaStar,
  FaCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "./index.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

const delay = 5000;

function truncateText(text, wordLimit) {
  const words = text?.split(" ");
  if (words?.length > wordLimit) {
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
        const response = await axios.post("/news?format=json");
        const data = response.data.results.map((item) => ({
          imageDark: item.photo,
          imageLight: item.photo,
          alt: item.name,
          title: truncateText(item.name, 4),
          description: truncateText(item.info, 25),
          age: item.age,
          like: item.like,
          year: item.year,
          type: item.type,
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

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () =>
      setIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      ),
    onSwipedRight: () =>
      setIndex((prevIndex) =>
        prevIndex === 0 ? slides.length - 1 : prevIndex - 1
      ),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // enables swiping with mouse cursor
  });

  return (
    <div className={`slider-wrapper ${darkMode ? "dark" : ""}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="slideshow banner" {...swipeHandlers}>
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
                  {slide.year} <FaCircle className="dot-icon" />
                  {slide.type === "anime"
                    ? "Anime"
                    : slide.type === "movie"
                    ? "Kino"
                    : slide.type === "series"
                    ? "Serial"
                    : slide.type === "cartoon"
                    ? "Multfilm"
                    : slide.type === "cartoon/series"
                    ? "Multfilm"
                    : slide.type === "anime/series"
                    ? "Anime"
                    : ""}
                </span>
                <div className="slide-content">
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

                  <Link
                    to={`/movies/${slides[index]?.title}`}
                    className="watch-button"
                  >
                    Tomosha qilish
                  </Link>
                </div>
              </div>
              <img
                className="slide_img object-cover"
                src={darkMode ? slide.imageDark : slide.imageLight}
                alt={slide.alt}
              />
            </div>
          ))}
        </div>

        {/* Controller buttons for md screens */}
        <div className="hidden md:flex justify-between items-center absolute top-1/2 transform -translate-y-1/2 w-full">
          <button
            className="prev-btn p-4 text-white bg-black bg-opacity-50"
            onClick={() =>
              setIndex((prevIndex) =>
                prevIndex === 0 ? slides.length - 1 : prevIndex - 1
              )
            }
          >
            <FaChevronLeft />
          </button>
          <button
            className="next-btn p-4 text-white bg-black bg-opacity-50"
            onClick={() =>
              setIndex((prevIndex) =>
                prevIndex === slides.length - 1 ? 0 : prevIndex + 1
              )
            }
          >
            <FaChevronRight />
          </button>
        </div>

        <div
          className="slideshowDots"
          style={{
            position: "absolute",
            bottom: "0.5rem",
          }}
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

        <div className="slide-title lg:hidden md:hidden absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-2xl font-bold">
          <Link
            to={`/movies/${slides[index]?.title}`}
            className="playBtn flex justify-center items-center rounded-full animate-pulse bg-red-700 text-white w-[6rem] h-[6rem]"
          >
            <span className="triangle"></span>
          </Link>
          <div className="flex slide-mobile">
            <span className="rating text-xl">
              <FaStar className="star-icon" />
              {slides[index]?.like} <FaCircle className="dot-icon" />
              {slides[index]?.year} <FaCircle className="dot-icon" />
              {slides[index]?.type === "anime"
                ? "Anime"
                : slides[index]?.type === "movie"
                ? "Kino"
                : slides[index]?.type === "series"
                ? "Serial"
                : slides[index]?.type === "cartoon"
                ? "Multfilm"
                : slides[index]?.type === "cartoon/series"
                ? "Multfilm"
                : slides[index]?.type === "anime/series"
                ? "Anime"
                : ""}
            </span>
          </div>
          <h1 className="text-2xl">{truncateText(slides[index]?.title, 3)}</h1>
        </div>
      </div>
    </div>
  );
};

export default Slider;
