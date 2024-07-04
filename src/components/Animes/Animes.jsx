/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import { FaStar, FaEye } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";

const animes = [
  {
    id: 1,
    title: "Asalarichi",
    releaseYear: 2024,
    rating: 10,
    duration: "180min",
    views: 105,
    image: "/kino_banner_1.png",
  },
  {
    id: 2,
    title: "Godzilla x Kong: The nimadir",
    releaseYear: 2024,
    rating: 10,
    duration: "180min",
    views: 105,
    image: "/kino_banner_2.png",
  },
  {
    id: 3,
    title: "IF",
    releaseYear: 2024,
    rating: 10,
    duration: "180min",
    views: "10K",
    image: "/kino_banner_3.png",
  },
  {
    id: 4,
    title: "Unsung hero",
    releaseYear: 2024,
    rating: 10,
    duration: "180min",
    views: 105,
    image: "/kino_banner_4.png",
  },
  {
    id: 5,
    title: "Winnie-the-Pooh: lo... nimadir",
    releaseYear: 2024,
    rating: 10,
    duration: "180min",
    views: 105,
    image: "/kino_banner_5.png",
  },
  {
    id: 6,
    title: "Asalarichi",
    releaseYear: 2024,
    rating: 10,
    duration: "180min",
    views: 105,
    image: "/kino_banner_1.png",
  },
  {
    id: 7,
    title: "Godzilla x Kong: The nimadir",
    releaseYear: 2024,
    rating: 10,
    duration: "180min",
    views: 105,
    image: "/kino_banner_2.png",
  },
  {
    id: 8,
    title: "IF",
    releaseYear: 2024,
    rating: 10,
    duration: "180min",
    views: "10K",
    image: "/kino_banner_3.png",
  },
  {
    id: 9,
    title: "Unsung hero",
    releaseYear: 2024,
    rating: 10,
    duration: "180min",
    views: 105,
    image: "/kino_banner_4.png",
  },
  {
    id: 10,
    title: "Winnie-the-Pooh: lo... nimadir",
    releaseYear: 2024,
    rating: 10,
    duration: "180min",
    views: 105,
    image: "/kino_banner_5.png",
  },
];

function Animes({ darkMode }) {
  return (
    <div className={`${darkMode ? "bg-black" : "bg-white"}`}>
      <div className={`container mx-auto px-4 pt-36`}>
        <h2
          className={`text-4xl font-bold mb-4 py-4 ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Anime va Multfilmlar
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {animes.map((anime) => (
            <div
              key={anime.id}
              className={`shadow-lg rounded-lg overflow-hidden mx-2 ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
              }`}
            >
              <div className="relative">
                <img
                  src={anime.image}
                  alt={anime.title}
                  className="w-72 h-80 object-cover"
                />
                <div className="absolute top-2 left-2 bg-yellow-500 text-white rounded-full px-2 py-1 text-xs font-bold flex items-center">
                  <FaStar className="mr-1" /> {anime.rating}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{anime.title}</h3>
                <div className="flex justify-between text-sm text-gray-600">
                  <p className="flex justify-center">
                    Yili: {anime.releaseYear} <GoDotFill className="m-[2px]" />
                  </p>
                  <div className="flex items-center">{anime.duration}</div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <FaEye className="mr-1" /> {anime.views}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center py-12">
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
  );
}

export default Animes;
