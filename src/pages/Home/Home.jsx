/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Slider from "../../components/Slider/Slider";
import Movie from "../../components/TrendMovie/Movie";
import Series from "../../components/TrendSeries/Series";
import Cartoons from "../../components/Cartoons/Cartoons";
import Animes from "../../components/Animes/Animes";
import Footer from "../../components/Footer/Footer";
import AdsBanner from "../../components/Ads";

export default function Main() {
  // localStorage'dan darkMode qiymatini olish, agar mavjud bo'lmasa default qiymat false
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });

  // darkMode qiymatini localStorage'da saqlash
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <>
      <Slider darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Movie darkMode={darkMode} />
      <Series darkMode={darkMode} />
      <Animes darkMode={darkMode} />
      <Cartoons darkMode={darkMode} />
      <Footer darkMode={darkMode} />
      <AdsBanner />
    </>
  );
}
