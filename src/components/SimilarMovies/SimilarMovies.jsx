/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const SimilarMovies = ({ similarMovies }) => {
  if (!similarMovies || similarMovies.length === 0) {
    return <div className="mt-8 p-4">No similar movies available.</div>;
  }

  return (
    <div className="mt-8 p-4">
      <h2 className="text-2xl font-bold">O'xshash kinolar</h2>
      <div className="flex flex-wrap mt-4">
        {similarMovies.map((movie, index) => (
          <div key={index} className="w-1/2 md:w-1/4 lg:w-1/5 p-2">
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-auto rounded"
            />
            <p className="mt-2 text-center">{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarMovies;
