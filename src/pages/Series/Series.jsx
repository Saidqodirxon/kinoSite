/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import CommentsSection from "../../components/Comments/Comments";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SeriesDetail from "../../components/SeriesDetails/SeriesDetail";
import SimilarMovies from "../../components/SimilarMovies/SimilarMovies";

const SeriesData = {
  series: {
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
    // iframeLink: "https://ok.ru/videoembed/7222941911716",
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

const SeriesPage = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const [data, setData] = useState(SeriesData);

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Helmet>
        <title>
          {data.series.title} | Noyob.Tv - Ajoyib Tarjima film, Anime, Multfilm
          va Seriyallar
        </title>
        <meta name="description" content={data.series.description} />
        <meta
          name="keywords"
          content={`${data.series.title}, Film, ${data.series.genre}, ${data.series.director}, ${data.series.actors}, ${data.series.year}, Aksiya, Triller`}
        />
        <meta
          property="og:title"
          content={`${data.series.title} - Ajoyib Film va Seriyalar`}
        />
        <meta property="og:description" content={data.series.description} />
        <meta property="og:image" content={data.series.poster} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Ajoyib Film va Seriyalar" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${data.series.title} - Ajoyib Film va Seriyalar`}
        />
        <meta name="twitter:description" content={data.series.description} />
        <meta name="twitter:image" content={data.series.poster} />
        <meta name="twitter:url" content={window.location.href} />
      </Helmet>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div
        className={`min-h-screen ${
          darkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <div className="container mx-auto p-4">
          <SeriesDetail series={data.series} darkMode={darkMode} />
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

export default SeriesPage;
