/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import CommentsSection from "../../components/Comments/Comments";
import SimilarMovies from "../../components/SimilarMovies/SimilarMovies";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MovieDetails from "../../components/MovieDetails/MovieDetail";

const movieData = {
  movie: {
    title: "Asalarichi",
    description: "Ushbu bo'limning qisqacha tavsifi...",
    poster: "/kino_banner_1.png",
    genre: "Aksiya, Triller",
    duration: "1 soat 34 daqiqa",
    year: 2024,
    director: "Ismi",
    actors: "Ismlar",
    videoUrl: {
      HD: "https://v.xudoberdi.uz/v2XqPfZD_h.mp4",
      "480px":
        "https://v.xudoberdi.uz/Ajdahon%20to%E2%80%99pi%20z%20%20Dragon%20ball%20z%20720p.mp4",
    },
    iframeLink: "https://ok.ru/videoembed/7222941911716",
    rating: 9.8,
    votes: 12345,
    releaseDate: "12.12.2024",
    country: "Russiya",
  },
  comments: [
    { username: "Doniyor", comment: "Ajoyib film ekan." },
    { username: "Said", comment: "Juda qiziq va ma'lumotli." },
    { username: "Elyos", comment: "Zo'r" },
    { username: "Begzod", comment: "Juda ajoyib" },
    { username: "Aziz", comment: "Ajoyib film ekan." },
    {
      username: "Shahina",
      comment: "Juda qiziq va ma'lumotli.",
      date: "11sentabr 2022",
    },
  ],
  similarMovies: [
    { title: "Atlas", image: "/kino_banner_1.png" },
    { title: "Godzilla vs. Kong", image: "/kino_banner_2.png" },
    { title: "Umarqu hero", image: "/kino_banner_3.png" },
    { title: "Kungfu Panda 4", image: "/kino_banner_4.png" },
    { title: "Shrek 2", image: "/kino_banner_5.png" },
  ],
};

const MoviePage = () => {
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

  // Simulating fetching data from JSON file
  const [data, setData] = useState(movieData);

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div
        className={`min-h-screen ${
          darkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <div className="container mx-auto p-4">
          <MovieDetails movie={data.movie} darkMode={darkMode} />
          <CommentsSection comments={data.comments} darkMode={darkMode} />
          <SimilarMovies
            similarMovies={data.similarMovies}
            darkMode={darkMode}
          />
        </div>
      </div>
      <Footer darkMode={darkMode} />
    </>
  );
};

export default MoviePage;
