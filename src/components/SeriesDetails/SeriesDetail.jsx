/* eslint-disable react/no-unescaped-entities */
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
import { saveAs } from "file-saver";
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
import { format, parseISO } from "date-fns";
import { Collapse } from "react-collapse";
import { Link } from "react-router-dom";

const SeriesDetails = ({ movie, vidData, darkMode }) => {
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [quality, setQuality] = useState("");
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(movie.like || 0);
  const [dislikeCount, setDislikeCount] = useState(movie.dislike || 0);
  const [videoSource, setVideoSource] = useState(
    vidData[0].f1080 || vidData[0].f720 || vidData[0].f480
  );
  const [partSource, setPartSource] = useState(vidData[0].part);
  const [selectedPart, setSelectedPart] = useState(vidData[0]);
  const [additionalPlayer, setAdditionalPlayer] = useState(
    vidData[0].additional_player
  );
  const [movieName, setMovieName] = useState(vidData[0].name);
  const playerRef = useRef(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const seasons = [...new Set(vidData.map((data) => data.season))];

  const useScreenWidth = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return screenWidth;
  };

  const screenWidth = useScreenWidth();
  const isMobile = screenWidth <= 768;

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleQualityChange = (format) => {
    const currentTime = playerRef.current.video.video.currentTime;
    const selectedPart = vidData.find((data) => data.part === partSource);
    const newSource =
      selectedPart[format] ||
      selectedPart.f1080 ||
      selectedPart.f720 ||
      selectedPart.f480;
    setQuality(format);
    setVideoSource(newSource);
    setTimeout(() => {
      if (playerRef.current) {
        playerRef.current.video.video.currentTime = currentTime;
      }
    }, 100);
  };

  const fetchMovieInfo = async () => {
    try {
      const response = await axios.get(`/serie/${movie.id}`);
      const updatedMovie = response.data.info;

      setLikeCount(updatedMovie.like);
      setDislikeCount(updatedMovie.dislike);
    } catch (error) {
      console.error("Error fetching movie info:", error);
    }
  };
  function truncateText(text, wordLimit) {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  }

  const handleLike = () => {
    if (liked) return;

    axios
      .post("/movie/like/", {
        movie_id: movie.id,
        like_action: "like",
      })
      .then((response) => {
        if (response.data.status) {
          setLiked(true);
          setDisliked(false);
          fetchMovieInfo();
          toast.success(response.data.message);
        } else {
          toast.info(response.data.message);
        }
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
      .then((response) => {
        if (response.data.status) {
          setDisliked(true);
          setLiked(false);
          fetchMovieInfo();
          toast.success(response.data.message);
        } else {
          toast.info(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error disliking the movie:", error);
      });
  };

  const handlePartSelect = (data) => {
    setVideoSource(data.f1080 || data.f720 || data.f480);
    setPartSource(data.part);
    setAdditionalPlayer(data.additional_player || "");

    setPlaying(false);
    playerRef.current.load();
  };
  const downloadFile = (url, fileName) => {
    saveAs(url, fileName);
  };

  return (
    <>
      <div className="flex justify-between mt-32 px-[2%]">
        <h1 className="lg:text-4xl md:text-4xl font-bold">
          {movie.name || ""}
        </h1>
        <h2 className="lg:text-3xl md:text-3xl font-bold">
          {movie.created_at
            ? format(parseISO(movie.created_at), "MMMM dd, yyyy")
            : ""}
        </h2>
      </div>
      <div className={`flex flex-col md:flex-row justify-between p-4`}>
        <div className="flex-col md:flex-row p-4">
          <img
            src={movie.photo || "/big_banner.png"}
            alt="Movie Poster"
            // width={5500}
            className="w-[100%] md:min-w-[620px] lg:min-w-[620px] max-w-[1200px] h-auto mb-4 md:mb-0 md:mr-4"
          />
          <div className="relative flex flex-col gap-2 mt-4">
            <HashLink
              to={`/series/${movie.name}#videoPlayer`}
              className="flex justify-center items-center w-full bg-[rgba(30,39,78,1)] border-2 rounded-3xl py-2 text-white hover:text-gray-300 text-sm md:text-base"
            >
              Tomosha qilish
            </HashLink>
            <button
              className="flex justify-center items-center w-full bg-[rgba(30,39,78,1)] border-2 rounded-3xl px-6 py-2 text-white hover:text-gray-300 text-sm md:text-base"
              onClick={toggleDropdown}
            >
              <CiSaveDown2 className="mr-2" />
              <p>Yuklab olish</p>
            </button>
            {dropdownVisible && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1">
                  {selectedPart.f480 && (
                    <button
                      onClick={() =>
                        downloadFile(
                          selectedPart.f480,
                          `${selectedPart.name}_480p.mp4`
                        )
                      }
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      480p
                    </button>
                  )}
                  {selectedPart.f720 && (
                    <button
                      onClick={() =>
                        downloadFile(
                          selectedPart.f720,
                          `${selectedPart.name}_720p.mp4`
                        )
                      }
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      720p
                    </button>
                  )}
                  {selectedPart.f1080 && (
                    <button
                      onClick={() =>
                        downloadFile(
                          selectedPart.f1080,
                          `${selectedPart.name}_1080p.mp4`
                        )
                      }
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      1080p
                    </button>
                  )}
                  {selectedPart.telegram_url && (
                    <a
                      href={selectedPart.telegram_url}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Telegramdan yuklash
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="mt-10 leading-6">
            <p className="mt-2">{movie.description || ""}</p>
            <ul className="mt-4">
              <li>
                <strong className="text-2xl">Film haqida qisqacha:</strong>
                <h2 className="leading-7 mt-4">{movie.info}</h2>
              </li>
              <li className="mt-6">
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
                <strong>Yosh chegarasi:</strong> {movie.age || ""}+
              </li>
              <li>
                <strong>Davlat:</strong>{" "}
                {movie.state ? movie.state.join(", ") : ""}
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
      {videoSource ? (
        <div id="videoPlayer" className="relative mt-8">
          <div
            className="relative max-w-full mx-auto rounded-lg overflow-hidden shadow-lg mt-20"
            id="videoPlayer"
          >
            <div
              className={`relative max-w-full mx-auto mt-4 rounded-lg overflow-hidden shadow-lg`}
            >
              <div className="md:hidden lg:hidden">
                <select
                  value={quality}
                  onChange={(e) => handleQualityChange(e.target.value)}
                  className={`bg-transparent text-white rounded-lg p-[0.5px] lg:ml-2 md:ml-2`}
                  order={2.1}
                >
                  {Object.keys({
                    ...(vidData.find((data) => data.part === partSource)
                      .f480 && {
                      "480p": "f480",
                    }),
                    ...(vidData.find((data) => data.part === partSource)
                      .f720 && {
                      "720p": "f720",
                    }),
                    ...(vidData.find((data) => data.part === partSource)
                      .f1080 && {
                      "1080p": "f1080",
                    }),
                  }).map((format) => (
                    <option
                      key={format}
                      value={format}
                      className="bg-[rgba(30,39,78,1)] "
                    >
                      {format}
                    </option>
                  ))}
                </select>
              </div>
              <Player
                ref={playerRef}
                src={videoSource}
                poster={"/big_banner.png"}
                playsInline
                // autoPlay={playing}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onWaiting={() => setPlaying(false)}
                onEnded={() => setPlaying(false)}
                onTimeUpdate={(e) => setPlayed(e.target.currentTime)}
              >
                <BigPlayButton position="center" />
                <LoadingSpinner />
                <ControlBar
                  autoHide={true}
                  className="my-class md:px-2 lg:px-2"
                >
                  {!isMobile && <ReplayControl seconds={10} order={1.1} />}
                  {!isMobile && <ForwardControl seconds={10} order={1.2} />}
                  {isMobile && <VolumeMenuButton disabled />}
                  <div className="flex items-center">
                    {!isMobile && (
                      <>
                        <button
                          onClick={() => {
                            if (document.pictureInPictureElement) {
                              document.exitPictureInPicture();
                            } else {
                              playerRef.current.video.video.requestPictureInPicture();
                            }
                          }}
                          className="icon-control ml-2"
                        >
                          <MdPictureInPicture className="text-xl" />
                        </button>
                        <select
                          value={quality}
                          onChange={(e) => handleQualityChange(e.target.value)}
                          className="bg-transparent text-white rounded-lg p-[0.5px] lg:ml-2 md:ml-2"
                          order={2.1}
                        >
                          {Object.keys({
                            ...(vidData.find((data) => data.part === partSource)
                              .f480 && {
                              "480p": "f480",
                            }),
                            ...(vidData.find((data) => data.part === partSource)
                              .f720 && {
                              "720p": "f720",
                            }),
                            ...(vidData.find((data) => data.part === partSource)
                              .f1080 && {
                              "1080p": "f1080",
                            }),
                          }).map((format) => (
                            <option
                              key={format}
                              value={format}
                              className="bg-[rgba(30,39,78,1)] "
                            >
                              {format}
                            </option>
                          ))}
                        </select>
                      </>
                    )}
                    {!isMobile && (
                      <select
                        value={quality}
                        onChange={(e) => handleQualityChange(e.target.value)}
                        className="bg-transparent text-white rounded-lg p-[0.5px] lg:ml-2 md:ml-2"
                        order={2.1}
                      >
                        {Object.keys({
                          ...(vidData.f480 && { "480p": vidData.f480 }),
                          ...(vidData.f720 && { "720p": vidData.f720 }),
                          ...(vidData.f1080 && { "1080p": vidData.f1080 }),
                        }).map((format) => (
                          <option key={format} value={format}>
                            {format}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  {!isMobile && (
                    <PlaybackRateMenuButton
                      rates={[2, 1.5, 1.25, 1, 0.5]}
                      order={1.9}
                    />
                  )}
                </ControlBar>
              </Player>
            </div>
          </div>
        </div>
      ) : additionalPlayer ? (
        <div className="w-full flex justify-center mt-4">
          <iframe
            src={vidData?.additional_player}
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
          <h3 className="text-center text-2xl">Serial dublyaj jarayonida...</h3>
        </div>
      )}
      <div className="mt-8 bg-[rgba(15,21,45,1)] p-2">
        {seasons.map((season, seasonIndex) => (
          <div key={seasonIndex} className="mt-4">
            <h2 className="p-3">
              {truncateText(movieName, 4)} {partSource}-qism
            </h2>
            <div
              onClick={() => handleToggle(seasonIndex)}
              className="flex justify-between items-center cursor-pointer bg-gray-700 p-4 rounded-lg text-white hover:bg-gray-600"
            >
              <h2 className="text-xl font-semibold">{`${season}-fasl`}</h2>
              <span
                className={`transform ${
                  openIndex === seasonIndex ? "rotate-180" : "rotate-0"
                } transition-transform duration-200`}
              >
                ▼
              </span>
            </div>
            <Collapse isOpened={openIndex === seasonIndex}>
              <div className="p-4 flex flex-wrap gap-4">
                {vidData
                  .filter((data) => data.season === season)
                  .map((data, episodeIndex) => (
                    <div
                      key={episodeIndex}
                      className={`flex flex-col items-start p-4 cursor-pointer bg-gray-800 rounded-lg ${
                        data.id === videoSource ? "bg-gray-600" : "bg-gray-700"
                      } hover:bg-gray-600`}
                      onClick={() => handlePartSelect(data)}
                    >
                      <div>
                        <p>
                          {truncateText(data.name, 4)} {data.part}-qism
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </Collapse>
          </div>
        ))}
      </div>
    </>
  );
};

export default SeriesDetails;
