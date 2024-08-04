/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";

const FullscreenAd = ({ blockId }) => {
  useEffect(() => {
    window.yaContextCb = window.yaContextCb || [];
    window.yaContextCb.push(() => {
      Ya.Context.AdvManager.render({
        blockId: blockId,
        type: "fullscreen",
        platform: "desktop",
      });
    });

    // Dynamically load the Yandex ads script
    const script = document.createElement("script");
    script.src = "https://yandex.ru/ads/system/context.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [blockId]);

  return null;
};

export default FullscreenAd;
