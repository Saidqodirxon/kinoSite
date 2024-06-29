/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import "./Home.scss";

export default function main() {
  return (
    <>
      <div className="container_l">
        <Navbar />
        <div className="p-4">
          <h1 className="text-2xl font-bold">Hello, World!</h1>
        </div>
      </div>
    </>
  );
}
