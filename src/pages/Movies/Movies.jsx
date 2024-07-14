/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CommentsSection from "../../components/Comments/Comments";
import SimilarMovies from "../../components/SimilarMovies/SimilarMovies";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MovieDetails from "../../components/MovieDetails/MovieDetail";
import Loading from "../../components/Loading/Loading";
import NotFound from "../NotFound/NotFound";

const MoviePage = () => {
  const { title } = useParams();
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });

  const [movieData, setMovieData] = useState(null);
  const [comments, setComments] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [vidData, setVidData] = useState(null);

  const navigate = useNavigate();

  const fetchComments = async (movieId) => {
    try {
      const response = await axios.get(`/comments/${movieId}`);
      setComments(response.data.comments);
    } catch (error) {
      console.error("Failed to fetch comments", error);
      setError("Failed to fetch comments");
    }
  };

  useEffect(() => {
    const extractTitle = () => {
      const url = window.location.href;
      const moviePath = url.split("/movies/")[1];
      const seriesPath = url.split("/series/")[1];
      const path = moviePath || seriesPath;
      if (path) {
        const [extractedTitle] = path.split("/");
        return extractedTitle ? decodeURIComponent(extractedTitle) : "";
      }
      return "";
    };

    const decodedTitle = extractTitle();

    if (!decodedTitle) {
      setError("Invalid URL");
      setLoading(false);
      return navigate("/notfound");
    }

    console.log(decodedTitle, "Decoded Title");
    axios
      .get(`/search/?name=${decodedTitle}`)
      .then((response) => {
        console.log(response, "res");
        if (response.data.results.length === 0) {
          throw new Error("Movie not found");
        }
        const movieId = response.data.results[0].id; // Assuming the first result is the desired movie
        console.log(movieId, "Movie Id");
        return axios.get(`/movie/${movieId}`);
      })

      .then((response) => {
        setMovieData(response.data.info);
        setVidData(response.data.result);
        console.log(vidData, "VIDDD");
        setComments(response.data.comments);
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
        setError(error.message || "Failed to fetch data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [title]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  if (loading) return <Loading />;
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
          <MovieDetails
            movie={movieData}
            vidData={vidData}
            darkMode={darkMode}
          />
          <CommentsSection
            comments={comments}
            movieId={movieData?.id}
            vidData={vidData}
            darkMode={darkMode}
            fetchComments={() => fetchComments(movieData?.id)}
          />
          <SimilarMovies similarMovies={similarMovies} darkMode={darkMode} />
        </div>
      </div>
      <Footer darkMode={darkMode} />
    </>
  );
};

export default MoviePage;
