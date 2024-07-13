/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeMute,
  FaVolumeUp,
  FaExpand,
  FaCog,
} from "react-icons/fa";
import axios from "axios";
import "./index.scss";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState({ currentTime: 0, duration: 0 });

  useEffect(() => {
    const video = videoRef.current;
    video.volume = volume;

    const handleTimeUpdate = () => {
      setProgress(video.currentTime / video.duration);
      setTime({
        currentTime: video.currentTime,
        duration: video.duration,
      });
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [volume]);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value / 10);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    setVolume(isMuted ? 0.5 : 0);
  };

  const handleProgressChange = (event) => {
    const video = videoRef.current;
    video.currentTime = event.target.value * video.duration;
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="relative w-4/5 overflow-hidden">
        <video
          ref={videoRef}
          className="w-full"
          src="https://corsproxy.io/?https://v.xudoberdi.uz%2Fv2XqPfZD_h.mp4"
          poster="https://noyobtv.netlify.app/public/big_banner.png"
          crossOrigin="anonymous"
          controlsList="nodownload"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-80 flex justify-between items-center p-2">
          <button onClick={handlePlayPause} className="text-white p-2">
            {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
          </button>
          <button onClick={handleMute} className="text-white p-2">
            {isMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
          </button>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={volume * 10}
            onChange={handleVolumeChange}
            className="w-1/5"
          />
          <input
            type="range"
            min="0"
            max="1"
            step="0.001"
            value={progress}
            onChange={handleProgressChange}
            className="w-4/5"
          />
          <span className="text-white">{`${Math.floor(
            time.currentTime / 60
          )}:${Math.floor(time.currentTime % 60)
            .toString()
            .padStart(2, "0")}`}</span>
          <span className="text-white">/</span>
          <span className="text-white">{`${Math.floor(
            time.duration / 60
          )}:${Math.floor(time.duration % 60)
            .toString()
            .padStart(2, "0")}`}</span>
          <button onClick={handleFullscreen} className="text-white p-2">
            <FaExpand size={24} />
          </button>
          <button className="text-white p-2">
            <FaCog size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
