/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import {
  FaPlay,
  FaPause,
  FaVolumeMute,
  FaVolumeUp,
  FaExpand,
  FaCompress,
} from "react-icons/fa";
import { RiForward10Fill, RiReplay10Fill } from "react-icons/ri";
import { IoShareSocialOutline } from "react-icons/io5";
import { CiSaveDown2 } from "react-icons/ci";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { MdPictureInPicture } from "react-icons/md";
import { HashLink as Link } from "react-router-hash-link";
import axios from "axios";
import { toast } from "react-toastify";

const MovieDetails = ({ movie, data, darkMode }) => {
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [quality, setQuality] = useState("");
  const [isPiP, setIsPiP] = useState(false);
  const [seekInterval, setSeekInterval] = useState(null);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [hasError, setHasError] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        setPlaying((prevPlaying) => !prevPlaying);
      } else if (event.code === "ArrowRight") {
        handleSeekForward();
        setSeekInterval(setInterval(handleSeekForward, 1000));
      } else if (event.code === "ArrowLeft") {
        handleSeekBackward();
        setSeekInterval(setInterval(handleSeekBackward, 1000));
      } else if (event.code === "KeyF") {
        handleFullscreenToggle();
      }
    };

    const handleKeyUp = (event) => {
      if (event.code === "ArrowRight" || event.code === "ArrowLeft") {
        clearInterval(seekInterval);
        setSeekInterval(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [seekInterval]);

  const handlePlayPause = () => {
    setPlaying((prevPlaying) => !prevPlaying);
  };

  const handleSeekForward = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(
        played + 10 / playerRef.current.getDuration(),
        "fraction"
      );
    }
  };

  const handleSeekBackward = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(
        played - 10 / playerRef.current.getDuration(),
        "fraction"
      );
    }
  };

  const handlePlaybackRateChange = (rate) => {
    setPlaybackRate(rate);
  };

  const handleFullscreenToggle = () => {
    if (playerRef.current) {
      if (!document.fullscreenElement) {
        playerRef.current.wrapper.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
      setIsFullscreen((prevFullscreen) => !prevFullscreen);
    }
  };

  const handlePiPToggle = () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
      setIsPiP(false);
    } else if (playerRef.current) {
      playerRef.current
        .getInternalPlayer()
        .requestPictureInPicture()
        .then(() => {
          setIsPiP(true);
        });
    }
  };

  const handleProgress = (state) => {
    setPlayed(state.played);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
    setMuted(e.target.value === "0");
  };

  const handleMuteToggle = () => {
    setMuted((prevMuted) => !prevMuted);
  };

  const handleQualityChange = (format) => {
    const currentTime = playerRef.current.getCurrentTime();
    setQuality(format);
    setTimeout(() => {
      if (playerRef.current) {
        playerRef.current.seekTo(currentTime, "seconds");
      }
    }, 100); // A short delay to ensure the player has switched the source
  };

  const handleOpenInBrowser = () => {
    if (movie.videoUrl && movie.videoUrl[quality]) {
      window.open(movie.videoUrl[quality], "_blank");
    }
  };

  const formatTime = (seconds) => {
    const date = new Date(0);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
  };

  const handleDoubleClick = (event) => {
    const { left, width } = event.target.getBoundingClientRect();
    const clickPosition = event.clientX - left;
    if (clickPosition < width / 2) {
      handleSeekBackward();
    } else {
      handleSeekForward();
    }
  };

  const handleLike = () => {
    if (liked) {
      axios
        .post("/movie/like/", {
          movie_id: movie.id,
          like_action: "unlike",
        })
        .then(() => {
          setLiked(false);
          toast.success("Like bekor qilindi!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        })
        .catch((error) => {
          console.error("Error unliking the movie:", error);
        });
      return;
    }

    axios
      .post("/movie/like/", {
        movie_id: movie.id,
        like_action: "like",
      })
      .then(() => {
        setLiked(true);
        toast.success("Like bosdingiz!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        if (disliked) setDisliked(false);
      })
      .catch((error) => {
        console.error("Error liking the movie:", error);
      });
  };

  const handleDislike = () => {
    if (disliked) {
      axios
        .post("/movie/like/", {
          movie_id: movie.id,
          like_action: "undislike",
        })
        .then(() => {
          setDisliked(false);
          toast.success("Dislike bekor qilindi!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        })
        .catch((error) => {
          console.error("Error undisliking the movie:", error);
        });
      return;
    }

    axios
      .post("/movie/like/", {
        movie_id: movie.id,
        like_action: "dislike",
      })
      .then(() => {
        setDisliked(true);
        toast.success("Dislike bosdingiz!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        if (liked) setLiked(false);
      })
      .catch((error) => {
        console.error("Error disliking the movie:", error);
      });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between mt-32 p-4">
      <div className="flex-col md:flex-row p-4">
        <img
          src={movie.photo || "/big_banner.png"}
          alt="Movie Poster"
          className="w-64 h-auto mb-4 md:mb-0 md:mr-4"
        />
        <div>
          <h1 className="text-3xl font-bold my-2">{movie.name || ""}</h1>
          <p className="mt-2">{movie.description || ""}</p>
          <ul className="mt-4">
            <li>
              <strong>Janr:</strong> {movie.genre || ""}
            </li>
            <li>
              <strong>Chiqqan yili:</strong> {movie.year || ""}
            </li>
            <li>
              <strong>Tili:</strong> {movie.language || ""}
            </li>
            <li>
              <strong>Chiqarilgan davlat:</strong> {movie.state || ""}
            </li>{" "}
            <li>
              <strong>Yosh chegarasi:</strong> {movie.age_limit || ""}
            </li>
            <li>
              <strong>Davomiyligi:</strong> {movie.length || ""}
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-full md:w-2/3 mt-6">
        {movie.f480 || movie.f720 || movie.f1080 ? (
          <>
            {hasError ? (
              <div className="flex flex-col justify-center items-center text-center bg-red-200 p-4 rounded">
                <p className="text-xl font-bold mb-2">
                  Videoni yuklashda xatolik yuz berdi.
                </p>
                <p className="mb-4">
                  Iltimos, internet aloqangizni tekshiring yoki sahifani qayta
                  yuklang.
                </p>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                  onClick={() => setHasError(false)}
                >
                  Qayta yuklash
                </button>
              </div>
            ) : (
              <div
                className="relative w-full"
                onDoubleClick={handleDoubleClick}
              >
                <ReactPlayer
                  ref={playerRef}
                  url={movie.f480}
                  className="react-player w-full h-auto"
                  playing={playing}
                  controls={false}
                  playbackRate={playbackRate}
                  volume={volume}
                  muted={muted}
                  onProgress={handleProgress}
                  onError={() => setHasError(true)}
                  width="100%"
                  height="100%"
                  pip={isPiP}
                />
                <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col justify-center items-center bg-gradient-to-t from-black to-transparent">
                  <div className="flex items-center justify-between w-full mb-4">
                    <button
                      onClick={handlePlayPause}
                      className="bg-black bg-opacity-50 p-2 rounded-full"
                    >
                      {playing ? (
                        <FaPause className="text-white text-xl" />
                      ) : (
                        <FaPlay className="text-white text-xl" />
                      )}
                    </button>
                    <div className="flex items-center">
                      <button
                        onClick={handleSeekBackward}
                        className="bg-black bg-opacity-50 p-2 rounded-full mx-2"
                      >
                        <RiReplay10Fill className="text-white text-xl" />
                      </button>
                      <button
                        onClick={handleSeekForward}
                        className="bg-black bg-opacity-50 p-2 rounded-full mx-2"
                      >
                        <RiForward10Fill className="text-white text-xl" />
                      </button>
                      <button
                        onClick={() => handlePlaybackRateChange(0.5)}
                        className={`bg-black bg-opacity-50 p-2 rounded-full mx-2 ${
                          playbackRate === 0.5 ? "border-2 border-white" : ""
                        }`}
                      >
                        0.5x
                      </button>
                      <button
                        onClick={() => handlePlaybackRateChange(1)}
                        className={`bg-black bg-opacity-50 p-2 rounded-full mx-2 ${
                          playbackRate === 1 ? "border-2 border-white" : ""
                        }`}
                      >
                        1x
                      </button>
                      <button
                        onClick={() => handlePlaybackRateChange(1.5)}
                        className={`bg-black bg-opacity-50 p-2 rounded-full mx-2 ${
                          playbackRate === 1.5 ? "border-2 border-white" : ""
                        }`}
                      >
                        1.5x
                      </button>
                      <button
                        onClick={() => handlePlaybackRateChange(2)}
                        className={`bg-black bg-opacity-50 p-2 rounded-full mx-2 ${
                          playbackRate === 2 ? "border-2 border-white" : ""
                        }`}
                      >
                        2x
                      </button>
                      <button
                        onClick={handleMuteToggle}
                        className="bg-black bg-opacity-50 p-2 rounded-full mx-2"
                      >
                        {muted ? (
                          <FaVolumeMute className="text-white text-xl" />
                        ) : (
                          <FaVolumeUp className="text-white text-xl" />
                        )}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-24 mx-2"
                      />
                      <button
                        onClick={handleFullscreenToggle}
                        className="bg-black bg-opacity-50 p-2 rounded-full mx-2"
                      >
                        {isFullscreen ? (
                          <FaCompress className="text-white text-xl" />
                        ) : (
                          <FaExpand className="text-white text-xl" />
                        )}
                      </button>
                      <button
                        onClick={handlePiPToggle}
                        className="bg-black bg-opacity-50 p-2 rounded-full mx-2"
                      >
                        <MdPictureInPicture className="text-white text-xl" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center w-full mb-4">
                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-500"
                        style={{ width: `${played * 100}%` }}
                      ></div>
                    </div>
                    <div className="ml-4 text-white">
                      {formatTime(playerRef.current?.getCurrentTime() || 0)} /{" "}
                      {formatTime(playerRef.current?.getDuration() || 0)}
                    </div>
                  </div>
                  <div className="flex items-center w-full justify-between mb-4">
                    <button
                      className={`bg-black bg-opacity-50 p-2 rounded-full mx-2 ${
                        liked ? "text-green-500" : "text-white"
                      }`}
                      onClick={handleLike}
                    >
                      <AiOutlineLike className="text-xl" />
                    </button>
                    <button
                      className={`bg-black bg-opacity-50 p-2 rounded-full mx-2 ${
                        disliked ? "text-red-500" : "text-white"
                      }`}
                      onClick={handleDislike}
                    >
                      <AiOutlineDislike className="text-xl" />
                    </button>
                    <Link
                      to="#comments"
                      className="bg-black bg-opacity-50 p-2 rounded-full mx-2"
                    >
                      <FaRegComment className="text-white text-xl" />
                    </Link>
                    <button className="bg-black bg-opacity-50 p-2 rounded-full mx-2">
                      <IoShareSocialOutline className="text-white text-xl" />
                    </button>
                    <button className="bg-black bg-opacity-50 p-2 rounded-full mx-2">
                      <CiSaveDown2 className="text-white text-xl" />
                    </button>
                    <button
                      className="bg-black bg-opacity-50 p-2 rounded-full mx-2"
                      onClick={handleOpenInBrowser}
                    >
                      <MdPictureInPicture className="text-white text-xl" />
                    </button>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleQualityChange("auto")}
                        className={`bg-black bg-opacity-50 p-2 rounded-full mx-2 ${
                          quality === "auto" ? "border-2 border-white" : ""
                        }`}
                      >
                        Auto
                      </button>
                      <button
                        onClick={() => handleQualityChange("1080p")}
                        className={`bg-black bg-opacity-50 p-2 rounded-full mx-2 ${
                          quality === "1080p" ? "border-2 border-white" : ""
                        }`}
                      >
                        1080p
                      </button>
                      <button
                        onClick={() => handleQualityChange("720p")}
                        className={`bg-black bg-opacity-50 p-2 rounded-full mx-2 ${
                          quality === "720p" ? "border-2 border-white" : ""
                        }`}
                      >
                        720p
                      </button>
                      <button
                        onClick={() => handleQualityChange("480p")}
                        className={`bg-black bg-opacity-50 p-2 rounded-full mx-2 ${
                          quality === "480p" ? "border-2 border-white" : ""
                        }`}
                      >
                        480p
                      </button>
                      <button
                        onClick={() => handleQualityChange("360p")}
                        className={`bg-black bg-opacity-50 p-2 rounded-full mx-2 ${
                          quality === "360p" ? "border-2 border-white" : ""
                        }`}
                      >
                        360p
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col justify-center items-center text-center bg-gray-200 p-4 rounded">
            <p className="text-xl font-bold mb-2">Video topilmadi</p>
            <p className="mb-4">
              Iltimos, sahifani qayta yuklang yoki boshqa videoni tanlang.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
