/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { FaFacebook, FaTelegram, FaInstagram, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer({ darkMode }) {
  return (
    <footer
      className={`${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      } py-10`}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Chap tomon logo */}
        <div className="mb-4 md:mb-0">
          <img
            src={darkMode ? "/logo_dark_mode.png" : "/logo_light_mode.png"}
            alt="Logo"
            className="w-32" // Logo o'lchamini moslashtiring
          />
        </div>

        {/* Markaziy linklar */}
        <div className="text-center mb-4 md:mb-0 flex flex-col md:flex-row justify-center gap-8">
          <a href="/about" className="block hover:underline">
            Biz haqimizda
          </a>
          <a href="/about" className="block hover:underline">
            Reklama berish
          </a>
          <a href="mailto:noyobtv@gmail.com" className="block hover:underline">
            noyobtv@gmail.com
          </a>
          <a href="tel:+998999999999" className="block hover:underline">
            +998999999999
          </a>
        </div>

        {/* O'ng tomon ijtimoiy tarmoqlar linklari */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://facebook.com" className="hover:text-blue-500">
            <FaFacebook size="20" />
          </a>
          <a href="https://telegram.org" className="hover:text-blue-400">
            <FaTelegram size="20" />
          </a>
          <a href="https://instagram.com" className="hover:text-pink-500">
            <FaInstagram size="20" />
          </a>
          <a href="https://tiktok.com" className="hover:text-black">
            <FaTiktok size="20" />
          </a>
        </div>
      </div>
      {/* Eng pastida copyright */}
      <div className="text-center mt-8 border-t border-gray-700 pt-4 text-sm">
        © Copyright {new Date().getFullYear()}. Noyob.tv
      </div>
      {/* <div className="text-center pt-2 text-sm">
        Design by <Link to="https://t.me/alCODERSUZ">ALCODERS.UZ</Link>
      </div> */}
    </footer>
  );
}

export default Footer;
