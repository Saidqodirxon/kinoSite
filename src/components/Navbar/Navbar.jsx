/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import "./index.scss";
import { Link } from "react-router-dom";

const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
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
  "TV Movie",
  "War",
  "War & Politics",
  "Western",
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <nav className={`navbar ${darkMode ? "dark" : ""}`}>
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="brand">
              <img src="/logo.png" alt="Brand Logo" />
            </Link>
          </div>
          <div className="menu hidden md:flex">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="menu-item">
                Bosh sahifa
              </Link>
              <Link to="#" className="menu-item">
                Kinolar
              </Link>
              <Link to="#" className="menu-item">
                Seriallar
              </Link>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="menu-item"
                >
                  Janri
                </button>
                {isDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2">
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
              <Link to="#" className="menu-item">
                Mamlakat
              </Link>
              <Link to="#" className="menu-item">
                Yili
              </Link>
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
              />
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="mode-toggle"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
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
            <Link to="#" className="mobile-menu-item">
              Kinolar
            </Link>
            <Link to="#" className="mobile-menu-item">
              Seriallar
            </Link>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="mobile-menu-item"
              >
                Janri
              </button>
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg z-20">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2">
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
