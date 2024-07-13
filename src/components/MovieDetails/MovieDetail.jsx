/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
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
import { HashLink } from "react-router-hash-link";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Player,
  BigPlayButton,
  LoadingSpinner,
  ControlBar,
  VolumeMenuButton,
  PlaybackRateMenuButton,
  ReplayControl,
  ForwardControl,
} from "video-react";
import "video-react/dist/video-react.css"; // import css
import io from "socket.io-client"; // Socket.IO client

const socket = io("http://localhost:5000"); // Socket server URL, o'zgartiring

const MovieDetails = ({ movie, data, darkMode }) => {
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [quality, setQuality] = useState("");
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(movie.like_count || 0); // Initialize like count
  const [dislikeCount, setDislikeCount] = useState(movie.dislike_count || 0); // Initialize dislike count
  const playerRef = useRef(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        setPlaying((prevPlaying) => !prevPlaying);
      } else if (event.code === "ArrowRight") {
        handleSeekForward();
      } else if (event.code === "ArrowLeft") {
        handleSeekBackward();
      } else if (event.code === "KeyF") {
        handleFullscreenToggle();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    // Listen for like and dislike events
    socket.on("like", (updatedMovie) => {
      if (updatedMovie.id === movie.id) {
        setLikeCount(updatedMovie.like_count);
        setDislikeCount(updatedMovie.dislike_count);
      }
    });

    socket.on("dislike", (updatedMovie) => {
      if (updatedMovie.id === movie.id) {
        setLikeCount(updatedMovie.like_count);
        setDislikeCount(updatedMovie.dislike_count);
      }
    });

    return () => {
      socket.off("like");
      socket.off("dislike");
    };
  }, [movie.id]);

  const handlePlayPause = () => {
    setPlaying((prevPlaying) => !prevPlaying);
  };

  const handleSeekForward = () => {
    if (playerRef.current) {
      playerRef.current.seek(
        playerRef.current.getState().player.currentTime + 10
      );
    }
  };

  const handleSeekBackward = () => {
    if (playerRef.current) {
      playerRef.current.seek(
        playerRef.current.getState().player.currentTime - 10
      );
    }
  };

  const handleFullscreenToggle = () => {
    if (playerRef.current) {
      const player = playerRef.current.getState().player;
      if (player.isFullscreen) {
        playerRef.current.toggleFullscreen();
      } else {
        playerRef.current.toggleFullscreen();
      }
    }
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
        socket.emit("like", { movie_id: movie.id }); // Emit like event
      })
      .catch((error) => {
        console.error("Error liking the movie:", error);
      });
  };

  const handleDislike = () => {
    if (disliked) return;

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

        if (liked) setLiked(false); // If liked before, reset like
        socket.emit("dislike", { movie_id: movie.id }); // Emit dislike event
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
                        download={`${data.name}.mp4`}
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
          <div className="mt-10 leading-6">
            <h1 className="text-4xl font-bold my-2">{movie.name || ""}</h1>
            <p className="mt-2">{movie.description || ""}</p>
            <ul className="mt-4">
              <li>
                <strong>Janr:</strong>{" "}
                {movie.genre ? movie.genre.join(", ") : ""}
              </li>
              <li>
                <strong>Chiqqan yili:</strong> {movie.year || ""}
              </li>
              <li>
                <strong>Tili:</strong> {movie.language || ""}
              </li>
              <li>
                <strong>Chiqarilgan davlat:</strong> {movie.state || ""}
              </li>
              <li>
                <strong>Yosh chegarasi:</strong> {`${movie.age}+` || ""}
              </li>
              <li>
                <strong>Film haqida:</strong>{" "}
                <h2 className="leading-7">{movie.info}</h2>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 p-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 ${
                  liked ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={liked}
              >
                <AiOutlineLike className="text-xl" />
                {likeCount}
              </button>
              <button
                onClick={handleDislike}
                className={`flex items-center gap-2 p-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 ${
                  disliked ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={disliked}
              >
                <AiOutlineDislike className="text-xl" />
                {dislikeCount}
              </button>
            </div>
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
            onDoubleClick={handleDoubleClick} // Handle double-click
          >
            <Player
              ref={playerRef}
              playsInline
              poster="/big_banner.png"
              src={data.f1080 || data.f720 || data.f480}
              autoPlay={playing}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              onTimeUpdate={(e) => setPlayed(e.target.currentTime)}
              onWaiting={() => setPlaying(false)}
              onPlaying={() => setPlaying(true)}
            >
              <BigPlayButton position="center" />
              <LoadingSpinner />
              <ControlBar autoHide={true} className="my-class px-2">
                <button
                  onClick={() => {
                    if (document.pictureInPictureElement) {
                      document.exitPictureInPicture();
                    } else {
                      playerRef.current.video.video.requestPictureInPicture();
                    }
                  }}
                  className="icon-control"
                >
                  <MdPictureInPicture className="text-xl" />
                </button>
                <ReplayControl seconds={10} order={1.1} />
                <ForwardControl seconds={10} order={1.2} />
                <VolumeMenuButton vertical />
                <PlaybackRateMenuButton rates={[2, 1.5, 1.25, 1, 0.5]} />
              </ControlBar>
            </Player>
          </div>
        </div>
      ) : (
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold">
            Bu film hozircha mavjud emas
          </h2>
          <p className="mt-4">Iltimos, keyinroq qayta urinib ko‘ring.</p>
        </div>
      )}
    </>
  );
};

export default MovieDetails;
