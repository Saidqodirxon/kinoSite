/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommentsSection from "../../components/Comments/Comments";
import SimilarMovies from "../../components/SimilarMovies/SimilarMovies";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MovieDetails from "../../components/MovieDetails/MovieDetail";
import Loading from "../../components/Loading/Loading";

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
  const [data, setData] = useState("");

  useEffect(() => {
    // Fetch movie details from the API
    axios
      .get(`/movie/${id}`)
      .then((response) => {
        setMovieData(response.data.info);
        setComments(response.data.comments);
        setData(response.data.result);
        // Get all genres from the movie data
        const genres = response.data.info.genre;
        // Fetch similar movies for each genre
        const genreRequests = genres.map((genre) =>
          axios.get(`/filter/movies/?genre=${genre}`)
        );
        console.log(response.data.comments, "COMMENTS");
        return Promise.all(genreRequests);
      })
      .then((responses) => {
        // Collect similar movies from all genre responses
        const allSimilarMovies = responses.flatMap(
          (response) => response.data.results
        );
        // Remove duplicates based on movie ID
        const uniqueMovies = Array.from(
          new Map(allSimilarMovies.map((movie) => [movie.id, movie])).values()
        );
        setSimilarMovies(uniqueMovies);
      })
      .catch((error) => {
        console.error("Failed to fetch data", error);
        setError("Failed to fetch data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  if (loading) return <Loading />;
  // if (error) return <div>{error}</div>;

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div
        className={`min-h-screen ${
          darkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <div className="container mx-auto p-4">
          <MovieDetails movie={movieData} data={data} darkMode={darkMode} />
          <CommentsSection
            comments={comments}
            movieId={data.id}
            darkMode={darkMode}
          />
          <SimilarMovies similarMovies={similarMovies} darkMode={darkMode} />
        </div>
      </div>
      <Footer darkMode={darkMode} />
    </>
  );
};

export default MoviePage;
