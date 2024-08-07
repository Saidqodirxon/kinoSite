/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

axios.defaults.baseURL = "https://back.noyob.tv";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <ToastContainer theme="colored" />
  </React.StrictMode>
);
