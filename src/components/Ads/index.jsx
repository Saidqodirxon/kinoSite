/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai"; // React Icons for the close button
import axios from "axios";
import { Link } from "react-router-dom";

const AdsBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [adsData, setAdsData] = useState(null);
  const [closeClicks, setCloseClicks] = useState(0);

  useEffect(() => {
    // Fetch the ad data from the /ads endpoint
    const fetchAdData = async () => {
      try {
        const response = await axios.get("/ads");
        setAdsData(response.data.ads);
      } catch (error) {
        console.error("Failed to fetch ad data:", error);
      }
    };

    fetchAdData();
  }, []);

  const handleClose = () => {
    if (closeClicks === 0) {
      // Open the ad URL in a new tab on the first click
      if (adsData && adsData.url) {
        window.open(adsData.url, "_blank");
      }
      setCloseClicks(1);
    } else {
      // Make the content invisible on the second click but keep the ad visible
      setIsContentVisible(false);
    }
  };

  if (!isVisible || !adsData) return null; // Return null if the ad is not visible or adsData is not available

  return (
    <>
      {isContentVisible && (
        <div
          className={`content-div fixed bottom-0 left-0 w-full p-4  text-white transition-transform transform ${
            isVisible ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <Link to={adsData.url} className="flex justify-center items-center">
            <div>
              <img
                src={adsData.content}
                alt="Advertisement"
                className="md:w-[100vw] md:h-[10rem] sm:w-100 "
              />
            </div>

            <button
              onClick={handleClose}
              className="text-white bg-black p-2 rounded-full mt-[-10%]"
            >
              <AiOutlineClose size={20} className="" />
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default AdsBanner;
