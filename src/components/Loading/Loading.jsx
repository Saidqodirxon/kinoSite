/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const Loading = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Replace with actual loading logic

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div
        className={`flex items-center justify-center min-h-screen ${
          loading ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          className={`w-52 h-52 rounded-full flex items-center justify-center bg-gray-200 ${
            loading ? "animate-spin" : ""
          }`}
          onClick={() => setLoading(!loading)}
        >
          <h1 className="w-32 h-32 m-[6px] text-3xl">Noyob.Tv</h1>
        </button>
      </div>
      {loading && (
        <h2 className=" w-6 h-6 text-2xl mt-[-20rem] ml-[45%] bg-white">
          Yuklanmoqda...
        </h2>
      )}
    </>
  );
};

export default Loading;
