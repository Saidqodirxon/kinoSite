/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommentsSection from "../../components/Comments/Comments";
import SimilarMovies from "../../components/SimilarMovies/SimilarMovies";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MovieDetails from "../../components/MovieDetails/MovieDetail";

const MoviePage = () => {
  const { id } = useParams();
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });

  const [movieData, setMovieData] = useState(null);
  const [comments, setComments] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch movie details from the API
    axios
      .get(`/info/${id}?format=json`)
      .then((response) => {
        setMovieData(response.data.result);

        // Fetch comments for the movie
        // return axios.get(`/comments/${id}?format=json`);
      })
      .then((response) => {
        setComments(response.data.result || []);

        // Fetch similar movies based on genre
        const genreQuery = movieData.genre.join(","); // Convert genre array to comma-separated string
        return axios.get(`/filter/movies/?genre=${genreQuery}&format=json`);
      })
      .then((response) => {
        setSimilarMovies(response.data.results || []);
      })
      .catch((error) => {
        console.error("Failed to fetch data", error);
        setError("Failed to fetch data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, movieData?.genre]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div
        className={`min-h-screen ${
          darkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <div className="container mx-auto p-4">
          <MovieDetails movie={movieData} darkMode={darkMode} />
          <CommentsSection comments={comments} darkMode={darkMode} />
          <SimilarMovies similarMovies={similarMovies} darkMode={darkMode} />
        </div>
      </div>
      <Footer darkMode={darkMode} />
    </>
  );
};

export default MoviePage;
//
