/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import MoviePage from "./pages/Movies/Movies";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container-big">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MoviePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
