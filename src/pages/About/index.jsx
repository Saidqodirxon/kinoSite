/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import AdsBanner from "../../components/Ads";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

export default function About() {
  // Retrieve darkMode value from localStorage, default to false if not present
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });

  // Save darkMode value to localStorage
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <>
      <div
        className={`${
          darkMode ? "bg-black text-white" : "bg-white text-black"
        } min-h-screen pt-16`}
      >
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="px-4 py-8 container mx-auto ">
          <h2 className="text-2xl font-bold mb-4">
            Assalomu alaykum Noyob.tv saytiga xush kelibsiz!
          </h2>
          <p className="mb-6">
            Noyob.tv — bu sizning sevimli filmlaringiz va seriallaringizni
            onlayn tomosha qilish imkonini beruvchi platforma. Bizning
            maqsadimiz, foydalanuvchilarimizga eng sifatli va qiziqarli
            kontentni taqdim etishdir. Bizning saytimizda siz dunyoning turli
            burchaklaridan eng yaxshi filmlar va seriallarni topishingiz mumkin.
            Har bir kontent ehtiyotkorlik bilan tanlangan va yuqori sifatda
            taqdim etiladi. Biz faqat eng so'nggi yangiliklarni emas, balki
            klassik filmlarni ham taklif qilamiz. Noyob.tv jamoasi,
            foydalanuvchilarimizning vaqtini qadrli ekanligini yaxshi tushunadi
            va shuning uchun eng qulay va foydalanuvchilarga qulay interfeys
            yaratishga intilamiz. Saytimizdan foydalanish oson va intuitiv
            bo'lib, har qanday yoshdagi foydalanuvchilar uchun mos keladi.
          </p>
          <h2 className="text-xl font-semibold mb-4">Bizning xizmatlarimiz</h2>
          <ul className="list-disc list-inside mb-6">
            <li>
              Filmlar va seriallar: Eng yangi va eng mashhur filmlar va
              seriallarni HD sifatida tomosha qiling.
            </li>
            <li>
              Yangiliklar va sharhlar: Filmlar va seriallar haqidagi
              yangiliklar, sharhlar va tahlillarni o'qing.
            </li>
            <li>
              Foydalanuvchi interfeysi: Oddiy va qulay interfeys orqali
              o'zingizga yoqadigan kontentni tezda toping.
            </li>
            <li>
              Ko'pgina janrlar: Har xil janrlarda filmlar va seriallarni toping
              — komediya, drama, fantastika, aksiyalar va boshqalar.
            </li>
          </ul>
          <p className="mb-6">
            Bizning missiyamiz, o'zingizning qulayligingizdan turib eng yaxshi
            kino tajribasini taqdim etishdir. Noyob.tv bilan sevimli filmlar va
            seriallaringizni toping va hayotning har bir lahzasidan zavqlaning!
            Agar sizda biror savol yoki taklif bo'lsa, biz bilan bog'lanishdan
            tortinmang. Bizning jamoamiz doim sizning xizmatlaringizda!
          </p>
          <img
            src="/big_banner.png"
            alt="Noyob.tv banner"
            className="w-full h-auto"
          />
        </main>
        <Footer darkMode={darkMode} />
        <AdsBanner />
      </div>
    </>
  );
}
