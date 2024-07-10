/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { FaEye, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const SimilarMovies = ({ similarMovies, darkMode }) => {
  if (!similarMovies || similarMovies.length === 0) {
    return <div className="mt-8 p-4">No similar movies available.</div>;
  }

  function truncateText(text, wordLimit) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  }

  return (
    <div className="mt-8 p-4">
      <h2 className="text-2xl font-bold">O'xshash kinolar</h2>
      <div className="flex flex-wrap mt-4">
        {similarMovies.map((movie, index) => (
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
            key={index}
            className="w-1/2 md:w-1/4 lg:w-1/5 p-2"
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
  );
};

export default SimilarMovies;
