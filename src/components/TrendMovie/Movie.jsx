/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaEye } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";

function Movie({ darkMode }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  function truncateText(text, wordLimit) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  }

  useEffect(() => {
    axios
      .get("/movie")
      .then((response) => {
        setMovies(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the movies!", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={`${darkMode ? "bg-black" : "bg-white"}`}>
        <div className={`container mx-auto px-4 pt-36 `}>
          <h2
            className={`text-4xl font-bold mb-4 py-4 ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Trend kinolar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className={`shadow-lg rounded-lg overflow-hidden mx-2 ${
                  darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
                }`}
              >
                <div className="relative">
                  <img
                    src={movie.photo}
                    alt={movie.name}
                    className="w-72 h-80 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-yellow-500 text-white rounded-full px-2 py-1 text-xs font-bold flex items-center">
                    <FaStar className="mr-1" /> {movie.rating || 0}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">
                    {truncateText(movie.name, 6)}
                  </h3>
                  <div className="flex justify-between text-sm text-gray-600">
                    <p className="flex justify-center">Yili: {movie.year}</p>

                    <div className="flex items-center text-gray-600 text-sm">
                      <FaEye className="mr-1" /> {movie.views}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <Link
              className={`btn border-2 rounded-3xl py-2 px-6 text-center ${
                darkMode
                  ? "border-red-600 text-white"
                  : "border-red-700 text-black"
              }`}
            >
              Ko'proq ko'rish
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Movie;
