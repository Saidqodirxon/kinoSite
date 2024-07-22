/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import { FaEye, FaStar } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import AdsBanner from "../../components/Ads";

function Filters() {
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

  const [genres, setGenres] = useState([]);
  const [countries, setCountries] = useState([]);
  const [years, setYears] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  useEffect(() => {
    axios.get("/genres").then((response) => {
      setGenres(response.data.genres);
    });
    axios.get("/states").then((response) => {
      setCountries(response.data.states);
    });
    axios.get("/years").then((response) => {
      setYears(response.data.years);
    });

    const query = new URLSearchParams(location.search);
    const genre = query.get("genre") || "";
    const state = query.get("state") || "";
    const year = query.get("year") || "";
    const type = query.get("type") || "";

    setSelectedGenre(genre);
    setSelectedCountry(state);
    setSelectedYear(year);
    setSelectedType(type);

    handleFilter(genre, state, year, type);
  }, [location.search]);

  const handleFilter = (
    genre = selectedGenre,
    state = selectedCountry,
    year = selectedYear,
    type = selectedType
  ) => {
    // Filter parameters object
    const params = {
      //   format: "json",
      ...(genre && { genre }),
      ...(state && { state }),
      ...(year && { year }),
      ...(type && { type }),
    };

    axios.get("/filter/movies", { params }).then((response) => {
      setFilterData(response.data.results);
    });

    const queryParams = new URLSearchParams(params);

    navigate({
      pathname: location.pathname,
      search: queryParams.toString(),
    });
  };

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div
        className={`min-h-screen pt-24 pb-20 ${
          darkMode ? "bg-black" : "bg-white"
        }`}
      >
        <div className="container mx-auto px-4 pt-8">
          <h2
            className={`text-2xl font-bold mb-3 ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            {selectedType === "anime"
              ? "Anime "
              : selectedType === "movie"
              ? "Kino "
              : selectedType === "series"
              ? "Serial"
              : selectedType === "cartoon"
              ? "Multfilm "
              : selectedType === "cartoon/series"
              ? "Multfilm "
              : selectedType === "anime/series"
              ? "Anime "
              : ""}
            {selectedGenre} {selectedCountry} {selectedYear}
          </h2>
          <div className="md:flex md:justify-between lg:flex lg:justify-between">
            <div className="mb-4 relative">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className={`block w-full py-3 px-4 border border-gray-300 rounded-xl ${
                  darkMode ? "bg-black text-white" : "text-black bg-white"
                }`}
              >
                <option value="" disabled>
                  Film turini tanlang
                </option>
                <option value="anime">Anime</option>
                <option value="movie">Kino</option>
                <option value="series">Serial</option>
                <option value="cartoon">Multfilm</option>
                <option value="cartoon/series">Multfilm (Series)</option>
                <option value="anime/series">Anime (Series)</option>
              </select>
              <label
                className={`absolute top-0 left-2 transform -translate-y-1/2 pointer-events-none ${
                  darkMode ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                Turi
              </label>
            </div>
            <div className="mb-4 relative">
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className={`block w-full py-3 px-4 border border-gray-300 rounded-xl ${
                  darkMode ? "bg-black text-white" : "text-black bg-white"
                }`}
              >
                <option value="" disabled>
                  Janr tanlang
                </option>
                {genres.map((genre, index) => (
                  <option key={index} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
              <label
                className={`absolute top-0 left-2 transform -translate-y-1/2 pointer-events-none ${
                  darkMode ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                Janri
              </label>
            </div>
            <div className="mb-4 relative">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className={`block w-full py-3 px-4 border border-gray-300 rounded-xl ${
                  darkMode ? "bg-black text-white" : "text-black bg-white"
                }`}
              >
                <option value="" disabled>
                  Mamlakatni tanlang
                </option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <label
                className={`absolute top-0 left-2 transform -translate-y-1/2 pointer-events-none ${
                  darkMode ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                Mamlakat
              </label>
            </div>
            <div className="mb-4 relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className={`block w-full py-3 px-4 border border-gray-300 rounded-xl ${
                  darkMode ? "bg-black text-white" : "text-black bg-white"
                }`}
              >
                <option value="">Yilni tanlang</option>
                {years.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <label
                className={`absolute top-0 left-2 transform -translate-y-1/2 pointer-events-none ${
                  darkMode ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                Yili
              </label>
            </div>

            <button
              onClick={() =>
                handleFilter(
                  selectedGenre,
                  selectedCountry,
                  selectedYear,
                  selectedType
                )
              }
              className="bg-red-600 text-white px-4 py-1 rounded-xl"
            >
              Tatbiq etish
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
            {filterData.map((movie) => (
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
                  darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
                }`}
              >
                <div className="relative">
                  <img
                    src={movie.photo}
                    alt={movie.name}
                    className="w-72 h-80 object-cover"
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
                    <p className="flex justify-center">Yili: {movie.year}</p>
                    <div className="flex items-center text-gray-600 text-sm">
                      <FaEye className="mr-1" /> {movie.views}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer darkMode={darkMode} />
      <AdsBanner />
    </>
  );
}

export default Filters;
