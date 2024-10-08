/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCircle,
  FaEye,
  FaStar,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import Footer from "../../components/Footer/Footer";
import logoDark from "/logo_dark_mode.png";
import logoLight from "/logo_light_mode.png";
import "./index.scss";
import AdsBanner from "../../components/Ads";

function Search() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });

  function truncateText(text, wordLimit) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  }

  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const offset = (currentPage - 1) * 10;
        const response = await axios.get(
          `/search?name=${searchText}&offset=${offset}&limit=10`
        );
        if (response.status === 200) {
          const results = response.data.results;
          setData(results);
          setTotalPages(Math.ceil(response.data.count / 10));
          setError("");
        }
      } catch {
        setData([]);
        setError(`${searchText} bo'yicha natija topilmadi.`);
      }
    };

    fetchData();
  }, [searchText, currentPage]);

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div
        className={`min-h-screen pt-2 pb-20 ${
          darkMode ? "bg-black" : "bg-white"
        }`}
      >
        <div className="container mx-auto px-4">
          <div
            className={`flex items-center justify-between h-24 ${
              darkMode ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            <div className="flex items-center">
              <Link to="/" className="brand">
                <img src={darkMode ? logoDark : logoLight} alt="Brand Logo" />
              </Link>
            </div>
            <div className="menu hidden md:flex">
              <div className="flex items-baseline space-x-4 menu-item-box">
                <div className="flex border border-gray-300 py-3 px-4 rounded-xl w-100">
                  <input
                    type="text"
                    placeholder="Qidiruv"
                    className={`w-[50vw] ${
                      darkMode ? "bg-black text-white" : "text-black bg-white"
                    }`}
                    onChange={handleInputChange}
                    value={searchText}
                  />
                  <CiSearch className="text-2xl" />
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <Link to={"/"}>
                <FaTimes className="text-2xl" />
              </Link>
              <button onClick={toggleDarkMode} className="mode-toggle">
                {darkMode ? (
                  <FaCircle className="text-2xl" />
                ) : (
                  <FaCircle className="text-2xl" />
                )}
              </button>
            </div>
          </div>
          <div className="lg:hidden md:hidden flex justify-between border border-gray-300 py-3 px-4 rounded-xl w-100">
            <input
              type="text"
              placeholder="Qidiruv"
              className={`w-[50vw] ${
                darkMode ? "bg-black text-white" : "text-black bg-white"
              }`}
              onChange={handleInputChange}
              value={searchText}
            />
            <CiSearch
              className={`text-2xl  ${darkMode ? "text-white" : "text-black"}`}
            />
          </div>
          {error ? (
            <h2
              className={`text-2xl font-bold mb-3 ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              {searchText === ""
                ? "Iltimos, qidiruv uchun matn kiriting."
                : error}
            </h2>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
                {data.map((movie) => (
                  <Link
                    to={
                      movie.type === "movie"
                        ? `/movies/${movie.name}`
                        : movie.type === "anime"
                        ? `/series/${movie.name}`
                        : movie.type === "anime/series"
                        ? `/series/${movie.name}`
                        : movie.type === "cartoon"
                        ? `/movies/${movie.name}`
                        : movie.type === "cartoon/series"
                        ? `/series/${movie.name}`
                        : movie.type === "series"
                        ? `/series/${movie.name}`
                        : `/`
                    }
                    key={movie.id}
                    className={`shadow-lg rounded-xl-lg overflow-hidden mx-2 ${
                      darkMode
                        ? "bg-gray-800 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={movie.photo}
                        alt={movie.name}
                        className="w-[100%] h-80 object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-yellow-500 text-white rounded-xl-full px-2 py-1 text-xs font-bold flex items-center">
                        <FaStar className="mr-1" /> {movie.like || 0}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-2">
                        {truncateText(movie.name, 10)}
                      </h3>
                      <div className="flex justify-between text-sm text-gray-600">
                        <p className="flex justify-center">
                          Yili: {movie.year}
                        </p>
                        <div className="flex items-center text-gray-600 text-sm">
                          <FaEye className="mr-1" /> {movie.views}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="flex justify-center mt-4">
                <button
                  className={`px-4 py-2 mx-2 ${
                    darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <FaChevronLeft />
                </button>
                <span
                  className={`px-4 py-2 ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  {currentPage} / {totalPages}
                </span>
                <button
                  className={`px-4 py-2 mx-2 ${
                    darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <FaChevronRight />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer darkMode={darkMode} />
      <AdsBanner />
    </>
  );
}

export default Search;
