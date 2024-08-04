/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import MoviePage from "./pages/Movies/Movies";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import SeriesPage from "./pages/Series/Series";
import Filters from "./pages/Filters/Filters";
import Search from "./pages/Search/Search";

import NotFound from "./pages/NotFound/NotFound";
import About from "./pages/About";
import NetlifyTestAd from "./components/Ads/yandex/Netlfiy";
import FeedAd from "./components/Ads/yandex/Feed";
import FullscreenAd from "./components/Ads/yandex/Full";

function App() {
  // React.useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     // F12 va Ctrl+Shift+I, Ctrl+Shift+J kabi kombinatsiyalarni bloklash
  //     if (
  //       e.key === "F12" ||
  //       (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J"))
  //     ) {
  //       e.preventDefault();
  //       e.stopPropagation();
  //     }
  //   };

  //   const handleContextMenu = (e) => {
  //     // O'ng tugmani bosish orqali devtoolsni ochish mumkinligini bloklash
  //     e.preventDefault();
  //   };

  //   window.addEventListener("keydown", handleKeyDown);
  //   window.addEventListener("contextmenu", handleContextMenu);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //     window.removeEventListener("contextmenu", handleContextMenu);
  //   };
  // }, []);

  return (
    <Router>
      <div className="container-big">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:id" element={<MoviePage />} />
          <Route path="/series/:id" element={<SeriesPage />} />
          <Route path="/filter" element={<Filters />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
      {/* Yandex Ads start*/}
      <FullscreenAd blockId="R-A-10936886-1" />
      <FeedAd blockId="R-A-10936886-2" />
      <NetlifyTestAd blockId="R-A-10936780-1" />
      {/* Yandex Ads end */}
    </Router>
  );
}

export default App;
