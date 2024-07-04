/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";

const CommentsSection = ({ comments, darkMode }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [commentText, setCommentText] = useState("");
  const commentSectionRef = useRef(null);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      username,
      comment: commentText,
      date: new Date().toISOString(),
    };
    console.log("Yangi izoh:", newComment);
    setUsername("");
    setEmail("");
    setCommentText("");
  };

  useEffect(() => {
    if (commentSectionRef.current) {
      commentSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments]);

  return (
    <div className="mt-8 p-4">
      <h2 className="text-2xl font-bold">Izohlar</h2>
      <div className="mt-4 mb-6">
        <form
          onSubmit={handleCommentSubmit}
          className="flex justify-between gap-2 items-center flex-row space-y-2"
        >
          <input
            type="text"
            id="username"
            placeholder="Ismingizni kiriting..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={`border border-gray-300 rounded-full h-8 p-1.5 w-full ${
              darkMode ? "text-black" : "text-white"
            }`}
          />

          <input
            type="email"
            id="email"
            value={email}
            placeholder="Email kiriting..."
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`border border-gray-300 rounded-full h-8 p-1.5 w-full ${
              darkMode ? "text-black" : "text-white"
            }`}
          />

          <textarea
            id="comment"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Izohingizni yozing..."
            required
            rows="1"
            className={`border border-gray-300 rounded-full p-1.5 w-full ${
              darkMode ? "text-black" : "text-white"
            }`}
          />

          <button
            type="submit"
            className="bg-red-600 text-white px-20 text-center rounded-full hover:bg-red-700"
          >
            Izoh qoldirish
          </button>
        </form>
      </div>
      <div
        className={`mt-4 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 ${
          darkMode ? "scrollbar-thumb-gray-600 scrollbar-track-gray-800" : ""
        }`}
        ref={commentSectionRef}
      >
        {comments.map((comment, index) => {
          let formattedDate;
          try {
            formattedDate = format(new Date(comment.date), "dd MMM yyyy");
          } catch (error) {
            console.error("Date formatlashda xato:", error);
            formattedDate = "Noma’lum sana";
          }
          return (
            <div
              className="mt-4 p-2 border-b border-gray-300 rounded-md"
              key={index}
            >
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-gray-400 text-white flex items-center justify-center">
                  {comment.username[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-bold">{comment.username}</p>
                    <p className="text-gray-500 text-sm">{formattedDate}</p>
                  </div>
                  <p>{comment.comment}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentsSection;
