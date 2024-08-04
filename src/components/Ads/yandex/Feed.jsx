/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import React, { useEffect } from "react";

const FeedAd = ({ blockId }) => {
  useEffect(() => {
    window.yaContextCb = window.yaContextCb || [];
    window.yaContextCb.push(() => {
      Ya.Context.AdvManager.render({
        blockId: blockId,
        renderTo: "yandex_rtb_" + blockId,
        type: "feed",
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

  return <div id={`yandex_rtb_${blockId}`}></div>;
};

export default FeedAd;
