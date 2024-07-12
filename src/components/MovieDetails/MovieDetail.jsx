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
import { HashLink, HashLink as Link } from "react-router-hash-link";
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
  const playerRef = useRef(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // useEffect(() => {
  //   if (movie.videoUrl && Object.keys(movie.videoUrl).length > 0) {
  //     setQuality(Object.keys(movie.videoUrl)[0]);
  //   }
  // }, [movie.videoUrl]);

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
    // If already liked, do nothing
    if (liked) return;

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
        if (disliked) setDisliked(false); // If disliked before, reset dislike
      })
      .catch((error) => {
        console.error("Error liking the movie:", error);
      });
  };

  const handleDislike = () => {
    // If already disliked, do nothing
    if (disliked) return;

    axios
      .post("/movie/like/", {
        movie_id: movie.id,
        like_action: "dislike",
      })
      .then(() => {
        setDisliked(true);
        // react-toastify succes
        toast.success("Dislike bosdingiz!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        if (liked) setLiked(false); // If liked before, reset like
      })
      .catch((error) => {
        console.error("Error disliking the movie:", error);
      });
  };

  return (
    <>
      <div className={`flex flex-col md:flex-row justify-between mt-32 p-4`}>
        <div className="flex-col md:flex-row p-4">
          <img
            src={movie.photo || "/big_banner.png"}
            alt="Movie Poster"
            className="w-100 h-auto mb-4 md:mb-0 md:mr-4"
          />
          <div className="relative">
            <HashLink
              to={`/movies/${data.id}/#videoPlayer`}
              className="flex justify-between text-sm text-center items-center gap-1 bg-[rgba(30,39,78,1)] border-2 rounded-3xl px-36 py-2 mt-2 text-white hover:text-gray-300"
            >
              Tomosha qilish
            </HashLink>
            <div className="relative inline-block text-left">
              <button
                className="flex justify-between text-sm text-center items-center gap-1 bg-[rgba(30,39,78,1)] border-2 rounded-3xl px-36 py-2 mt-2 text-white hover:text-gray-300"
                onClick={toggleDropdown}
              >
                <CiSaveDown2 />
                <p>Yuklab olish</p>
              </button>
              {dropdownVisible && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="py-1">
                    {/* <h2>SSSS</h2> */}
                    {(data.f480 && (
                      <a
                        href={data.f480}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        480p
                      </a>
                    )) ||
                      ""}
                    {data.f720 && (
                      <a
                        href={data.f720}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        720p
                      </a>
                    )}
                    {data.f1080 && (
                      <a
                        href={data.f1080}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        1080p
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="mt-10">
            <h1 className="text-4xl mb-10">Film haqida:</h1>

            <h1 className="text-2xl my-2">
              <strong>Nomi: </strong>
              {movie.name || ""}
            </h1>
            <p className="mt-2">{movie.description || ""}</p>
            <ul className="mt-4">
              <li>
                <strong>Janr:</strong>{" "}
                {movie.genre ? movie.genre.join(", ") : ""}
              </li>
              {/* <li>
              <strong>Davomiyligi:</strong> {movie.duration || "No Duration"}
            </li> */}
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
                <strong>Yosh chegarasi:</strong> {`${movie.age}+` || ""}
              </li>
              <li>
                <strong>Film haqida:</strong> <h2>{movie.info}</h2>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {data.f480 || data.f720 || data.f1080 ? (
        <div
          className="relative max-w-full mx-auto rounded-lg overflow-hidden shadow-lg mt-20"
          id="videoPlayer"
        >
          <div
            className={`relative max-w-full mx-auto mt-4 rounded-lg overflow-hidden shadow-lg  ${
              playing ? "" : "cursor-pointer"
            }`}
            onDoubleClick={handleDoubleClick}
          >
            {!playing && played === 0 && (
              // <div className="absolute inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
              <div className="flex items-center justify-center bg-black bg-opacity-50 inset-0  absolute">
                {" "}
                <img
                  src={"/big_banner.png"}
                  alt="Movie Poster"
                  className="absolute inset-0 w-full h-full object-fill "
                />
                <button
                  onClick={handlePlayPause}
                  className="text-white text-4xl bg-red-600 p-4 rounded-full animate-pulse"
                >
                  <FaPlay />
                </button>
              </div>
              // </div>
            )}
            <ReactPlayer
              ref={playerRef}
              url={
                data.f480
                  ? data.f480
                  : data.f720
                  ? data.f720
                  : data.f1080
                  ? data.f1080
                  : data.f480
              }
              playing={playing}
              volume={volume}
              muted={muted}
              playbackRate={playbackRate}
              onProgress={handleProgress}
              width="100%"
              height="100%"
              controls={false}
              className="video-player"
            />
            {!playing && played !== 0 && (
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
                <button
                  onClick={handlePlayPause}
                  className="text-white text-4xl bg-red-600 p-4 rounded-full"
                >
                  <FaPause />
                </button>
              </div>
            )}
          </div>

          {/* Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-[rgba(15,21,45,1)] bg-opacity-100 flex flex-col justify-between items-center p-2">
            <div className="w-full mb-2">
              <input
                type="range"
                min={0}
                max={1}
                step="any"
                value={played}
                onChange={(e) =>
                  playerRef.current &&
                  playerRef.current.seekTo(parseFloat(e.target.value))
                }
                className="mx-2 w-full h-2 appearance-none bg-gray-600 rounded-full"
                style={{
                  background: `linear-gradient(to right, red ${
                    played * 100
                  }%, white ${played * 100}%, gray ${played * 100}%)`,
                }}
              />
            </div>
            <div className="flex justify-start w-full items-center mb-2">
              <div className="flex space-x-2">
                <button
                  onClick={handleSeekBackward}
                  className="text-white hover:text-gray-300"
                >
                  <RiReplay10Fill />
                </button>
                <button
                  onClick={handlePlayPause}
                  className="text-white hover:text-gray-300"
                >
                  {playing ? <FaPause /> : <FaPlay />}
                </button>
                <button
                  onClick={handleSeekForward}
                  className="text-white hover:text-gray-300"
                >
                  <RiForward10Fill />
                </button>

                <div className="relative flex items-center space-x-2 text-white group">
                  <button
                    onClick={handleMuteToggle}
                    className="hover:text-gray-300"
                  >
                    {muted ? <FaVolumeMute /> : <FaVolumeUp />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step="any"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="absolute left-5 -top opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>

              <div className="flex justify-center mx-52 items-center text-white gap-2">
                <span>
                  {formatTime(
                    playerRef.current
                      ? played * playerRef.current.getDuration()
                      : 0
                  )}
                </span>
                /
                <span>
                  {formatTime(
                    playerRef.current ? playerRef.current.getDuration() : 0
                  )}
                </span>
              </div>

              <div className="flex justify-end w-full gap-2 items-center">
                <select
                  value={quality}
                  onChange={(e) => handleQualityChange(e.target.value)}
                  className="bg-gray-800 text-white rounded-lg p-[0.5px]"
                >
                  {Object.keys({
                    ...(data.f480 && { "480px": data.f480 }),
                    ...(data.f720 && { "720px": data.f720 }),
                    ...(data.f1080 && { "1080px": data.f1080 }),
                  }).map((format) => (
                    <option key={format} value={format}>
                      {format}
                    </option>
                  ))}
                </select>

                <select
                  value={playbackRate}
                  onChange={(e) =>
                    handlePlaybackRateChange(parseFloat(e.target.value))
                  }
                  className="bg-gray-800 text-white rounded-lg p-[0.5px]"
                >
                  {[0.5, 1, 1.5, 2].map((rate) => (
                    <option key={rate} value={rate}>
                      {rate}x
                    </option>
                  ))}
                </select>
                <button
                  onClick={handlePiPToggle}
                  className="text-white hover:text-gray-300"
                >
                  <MdPictureInPicture />
                </button>
                <button
                  onClick={handleFullscreenToggle}
                  className="text-white hover:text-gray-300"
                >
                  {isFullscreen ? <FaCompress /> : <FaExpand />}
                </button>
              </div>
            </div>
            <div className="flex justify-end w-full items-center">
              <div className="flex space-x-2">
                <div className="flex justify-between text-sm gap-2 bg-[rgba(30,39,78,1)] border-2 rounded-3xl px-3 py-1">
                  <button className="text-white hover:text-gray-300 flex justify-between items-center gap-1">
                    {movie.like} <AiOutlineLike onClick={handleLike} />
                  </button>
                  |
                  <button className="text-white hover:text-gray-300 flex justify-between items-center gap-1">
                    <AiOutlineDislike onClick={handleDislike} /> {movie.dislike}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : data.additional_player ? (
        <div className="w-full flex justify-center mt-4">
          <iframe
            src={data.additional_player}
            frameBorder="0"
            allowFullScreen
            width="875px"
            height="575px"
            className=""
            title={movie.title || "No Title"}
          />
        </div>
      ) : (
        <div className="flex mx-auto">
          {" "}
          <h3 className="text-center text-2xl">Kino dublyaj jarayonida...</h3>
        </div>
      )}
    </>
  );
};

export default MovieDetails;
