/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { FaMoon, FaSun, FaBars, FaTimes, FaAngleDown } from "react-icons/fa";
import "./index.scss";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import logoDark from "/logo_dark_mode.png";
import logoLight from "/logo_light_mode.png";
import { FaCircle } from "react-icons/fa";

const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Kids",
  "Music",
  "Mystery",
  "News",
  "Reality",
  "Romance",
  "Sci-Fi & Fantasy",
  "Science Fiction",
  "Soap",
  "Talk",
  "Thriller",
  "War & Politics",
  "TV Movie",
  "War",
  "Documentary",
  "Western",
];

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <nav className={`navbar ${darkMode ? "dark" : ""}`}>
      <div className="container">
        <div className="flex items-center justify-between h-24 ">
          <div className="flex items-center">
            <Link to="/" className="brand">
              <img src={darkMode ? logoDark : logoLight} alt="Brand Logo" />
            </Link>
          </div>
          <div className="menu hidden md:flex">
            <div className="ml-10 flex items-baseline space-x-4 menu-item-box">
              <Link to="/" className="menu-item">
                Bosh sahifa
              </Link>
              <Link to="/movies" className="menu-item">
                Kinolar
              </Link>
              <Link to="#" className="menu-item">
                Seriallar
              </Link>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="menu-item flex items-center"
                >
                  Janri <FaAngleDown className="ml-1" />
                </button>
                {isDropdownOpen && (
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
                          to={`/genre/${genre.toLowerCase()}`}
                          className={`block px-1 py-1 hover:border-b-2 hover:border-red-700 hover:font-bold ${
                            darkMode
                              ? "text-[rgba(255,255,255,0.5)]"
                              : "text-black"
                          }`}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          {genre}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Link to="#" className="menu-item">
                Mamlakat
              </Link>
              <Link to="#" className="menu-item">
                Yili
              </Link>
              <div className="flex search-box">
                <input type="text" placeholder="Qidiruv" className="" />
                <CiSearch className="" />
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {/* <button onClick={toggleDarkMode} className="mode-toggle">
              {darkMode ? <FaSun /> : <FaMoon />}
            </button> */}
            <button onClick={toggleDarkMode} className="mode-toggle">
              {darkMode ? <FaCircle /> : <FaCircle />}
            </button>
            <div className="menu-toggle md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="toggle-button"
              >
                {isOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="mobile-menu md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="mobile-menu-item">
              Bosh sahifa
            </Link>
            <Link to="/movies" className="mobile-menu-item">
              Kinolar
            </Link>
            <Link to="#" className="mobile-menu-item">
              Seriallar
            </Link>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="mobile-menu-item flex items-center"
              >
                Janri <FaAngleDown className="ml-1" />
              </button>
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg z-20">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-2">
                    {genres.map((genre) => (
                      <Link
                        key={genre}
                        to={`/genre/${genre.toLowerCase()}`}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {genre}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link to="#" className="mobile-menu-item">
              Mamlakat
            </Link>
            <Link to="#" className="mobile-menu-item">
              Yili
            </Link>
            <input
              type="text"
              placeholder="Search..."
              className="search-input-mobile"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
