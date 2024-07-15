/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
  FaAngleDown,
  FaAngleUp,
} from "react-icons/fa";
import "./index.scss";
import { HashLink } from "react-router-hash-link";
import { CiSearch } from "react-icons/ci";
import logoDark from "/logo_dark_mode.png";
import logoLight from "/logo_light_mode.png";
import { FaCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [genres, setGenres] = useState([]);
  const [countries, setCountries] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    axios
      .get("/genres")
      .then((response) => {
        setGenres(response.data.genres);
      })
      .catch((error) => {
        console.error("There was an error fetching the genres!", error);
      });

    axios
      .get("/states")
      .then((response) => {
        setCountries(response.data.states);
      })
      .catch((error) => {
        console.error("There was an error fetching the countries!", error);
      });

    axios
      .get("/years")
      .then((response) => {
        setYears(response.data.years);
      })
      .catch((error) => {
        console.error("There was an error fetching the years!", error);
      });
  }, []);

  const handleAccordionToggle = (section) => {
    if (activeAccordion === section) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(section);
    }
  };

  return (
    <nav className={`navbar ${darkMode || isOpen ? "dark" : ""}`}>
      <div className="container">
        <div className="flex items-center justify-between h-24 ">
          <div className="flex items-center">
            <Link to="/" className="brand">
              <img src={darkMode ? logoDark : logoLight} alt="Brand Logo" />
            </Link>
          </div>
          <div className="menu hidden md:flex">
            <div className=" flex items-baseline space-x-4 menu-item-box">
              <Link to="/" className="menu-item">
                Bosh sahifa
              </Link>
              <HashLink to="/#movies" className="menu-item">
                Kinolar
              </HashLink>
              <HashLink to="/#series" className="menu-item">
                Seriallar
              </HashLink>

              <div className="relative">
                <button
                  onClick={() => handleAccordionToggle("genres")}
                  className="menu-item flex items-center"
                >
                  Janri <FaAngleDown className="ml-1" />
                </button>
                {activeAccordion === "genres" && (
                  <div
                    className={`absolute left-0 mt-2 w-64 rounded-md shadow-lg z-20 md:w-[400px] ${
                      darkMode
                        ? "bg-[rgba(0,0,0,0.2)]"
                        : "bg-[rgba(255,255,255,0.5)]"
                    }`}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-2">
                      {genres.map((genre) => (
                        <Link
                          key={genre}
                          to={`/filter?genre=${genre}`}
                          className={`block px-1 py-1 hover:border-b-2 hover:border-red-700 hover:font-bold ${
                            darkMode
                              ? "text-[rgba(255,255,255,0.5)]"
                              : "text-black"
                          }`}
                          onClick={() => setActiveAccordion(null)}
                        >
                          {genre}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => handleAccordionToggle("countries")}
                  className="menu-item flex items-center"
                >
                  Mamlakat <FaAngleDown className="ml-1" />
                </button>
                {activeAccordion === "countries" && (
                  <div
                    className={`absolute left-0 mt-2 w-64 rounded-md shadow-lg z-20 md:w-[400px] ${
                      darkMode
                        ? "bg-[rgba(0,0,0,0.2)]"
                        : "bg-[rgba(255,255,255,0.5)]"
                    }`}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-2">
                      {countries.map((country) => (
                        <Link
                          key={country}
                          to={`/filter?state=${country}`}
                          className={`block px-1 py-1 hover:border-b-2 hover:border-red-700 hover:font-bold ${
                            darkMode
                              ? "text-[rgba(255,255,255,0.5)]"
                              : "text-black"
                          }`}
                          onClick={() => setActiveAccordion(null)}
                        >
                          {country}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => handleAccordionToggle("years")}
                  className="menu-item flex items-center"
                >
                  Yili <FaAngleDown className="ml-1" />
                </button>
                {activeAccordion === "years" && (
                  <div
                    className={`absolute left-0 mt-2 w-64 rounded-md shadow-lg z-20 md:w-[400px] ${
                      darkMode
                        ? "bg-[rgba(0,0,0,0.2)]"
                        : "bg-[rgba(255,255,255,0.5)]"
                    }`}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-2">
                      {years.map((year) => (
                        <Link
                          key={year}
                          to={`/filter?year=${year}`}
                          className={`block px-1 py-1 hover:border-b-2 hover:border-red-700 hover:font-bold ${
                            darkMode
                              ? "text-[rgba(255,255,255,0.5)]"
                              : "text-black"
                          }`}
                          onClick={() => setActiveAccordion(null)}
                        >
                          {year}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link to={"/search"} className="flex search-box">
                <input type="text" placeholder="Qidiruv" className="" />
                <CiSearch className="text-2xl" />
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
          <div className="flex items-center">
            <div className="menu-toggle flex justify-between gap-3 md:hidden ">
              <button onClick={toggleDarkMode} className="mode-toggle">
                {darkMode ? (
                  <FaCircle className="text-2xl" />
                ) : (
                  <FaCircle className="text-2xl" />
                )}
              </button>
              <Link to={"/search"}>
                <CiSearch className="text-3xl" />
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="toggle-button"
              >
                {isOpen ? (
                  <FaTimes className="text-2xl" />
                ) : (
                  <FaBars className="text-2xl" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className={`mobile-menu md:hidden ${darkMode ? "dark" : ""}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 mobile-menu-boxx">
            <Link to="/" className="mobile-menu-item">
              Bosh sahifa
            </Link>
            <HashLink to="/#movies" className="mobile-menu-item">
              Kinolar
            </HashLink>
            <HashLink to="/#series" className="mobile-menu-item">
              Seriallar
            </HashLink>
            <div className="relative">
              <button
                onClick={() => handleAccordionToggle("genres")}
                className="mobile-menu-item flex items-center"
              >
                Janri <FaAngleDown className="ml-1" />
              </button>
              {activeAccordion === "genres" && (
                <div
                  className={`absolute left-0 mt-2 w-full rounded-md shadow-lg z-20 ${
                    darkMode
                      ? "bg-[rgba(0,0,0,0.72)]"
                      : "bg-[rgba(255,255,255,0.72)]"
                  }`}
                >
                  <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-3 p-2">
                    {genres.map((genre) => (
                      <Link
                        key={genre}
                        to={`/filter?genre=${genre}`}
                        className={`block px-1 py-1 hover:border-b-2 hover:border-red-700 hover:font-bold ${
                          darkMode
                            ? "text-[rgba(255,255,255,0.5)]"
                            : "text-black"
                        }`}
                        onClick={() => setActiveAccordion(null)}
                      >
                        {genre}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => handleAccordionToggle("countries")}
                className="mobile-menu-item flex items-center"
              >
                Mamlakat <FaAngleDown className="ml-1" />
              </button>
              {activeAccordion === "countries" && (
                <div
                  className={`absolute left-0 mt-2 w-full rounded-md shadow-lg z-20 ${
                    darkMode
                      ? "bg-[rgba(0,0,0,0.72)]"
                      : "bg-[rgba(255,255,255,0.72)]"
                  }`}
                >
                  <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-3 p-2">
                    {countries.map((country) => (
                      <Link
                        key={country}
                        to={`/filter?state=${country}`}
                        className={`block px-1 py-1 hover:border-b-2 hover:border-red-700 hover:font-bold ${
                          darkMode
                            ? "text-[rgba(255,255,255,0.5)]"
                            : "text-black"
                        }`}
                        onClick={() => setActiveAccordion(null)}
                      >
                        {country}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => handleAccordionToggle("years")}
                className="mobile-menu-item flex items-center"
              >
                Yili <FaAngleDown className="ml-1" />
              </button>
              {activeAccordion === "years" && (
                <div
                  className={`absolute left-0 mt-2 w-full rounded-md shadow-lg z-20 ${
                    darkMode
                      ? "bg-[rgba(0,0,0,0.72)]"
                      : "bg-[rgba(255,255,255,0.72)]"
                  }`}
                >
                  <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-3 p-2">
                    {years.map((year) => (
                      <Link
                        key={year}
                        to={`/filter?year=${year}`}
                        className={`block px-1 py-1 hover:border-b-2 hover:border-red-700 hover:font-bold ${
                          darkMode
                            ? "text-[rgba(255,255,255,0.5)]"
                            : "text-black"
                        }`}
                        onClick={() => setActiveAccordion(null)}
                      >
                        {year}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
