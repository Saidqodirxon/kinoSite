/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import axios from "axios";
import { toast } from "react-toastify";

const CommentsSection = ({ comments, movieId, darkMode, fetchComments }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [commentText, setCommentText] = useState("");
  const commentSectionRef = useRef(null);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const newComment = {
      name,
      email,
      comment: commentText,
      movie_id: movieId,
    };
    console.log("Yangi izoh:", newComment);
    setName("");
    setEmail("");
    setCommentText("");

    try {
      await axios.post(`/comments/create/`, newComment);
      // Re-fetch comments
      fetchComments();
      toast.success("Izoh qo'shildi!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Izohni yuborishda xato:", error);
      toast.error("Izohni yuborishda xato yuz berdi.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  useEffect(() => {
    if (commentSectionRef.current) {
      commentSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments]);

  return (
    <div className="mt-32 p-4" id="izoh">
      <h2 className="text-2xl font-bold" id="izoh">
        Izohlar
      </h2>
      <div className="mt-4 mb-6">
        <form
          onSubmit={handleCommentSubmit}
          className="flex flex-col gap-2 sm:flex-row sm:gap-4 items-center"
        >
          <input
            type="text"
            id="name"
            placeholder="Ismingizni kiriting..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={`border border-gray-300 rounded-full h-10 p-2 w-full ${
              darkMode ? "bg-black text-white" : "bg-white text-black"
            }`}
          />

          <input
            type="email"
            id="email"
            value={email}
            placeholder="Email kiriting..."
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`border border-gray-300 rounded-full h-10 p-2 w-full ${
              darkMode ? "bg-black text-white" : "bg-white text-black"
            }`}
          />

          <textarea
            id="comment"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Izohingizni yozing..."
            required
            rows="1"
            className={`border border-gray-300 rounded-full p-2 w-full ${
              darkMode ? "bg-black text-white" : "bg-white text-black"
            }`}
          />

          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 text-center rounded-full hover:bg-red-700 mt-2 sm:mt-0"
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
        {comments && comments.length > 0 ? (
          comments.map((comment, index) => {
            let formattedDate;
            try {
              formattedDate = format(
                new Date(comment.created_at),
                "dd MMM yyyy"
              );
            } catch (error) {
              console.error("Date formatlashda xato:", error);
              formattedDate = "Noma’lum sana";
            }

            return (
              <div
                className="mt-4 p-2 border-b border-gray-300 dark:border-gray-600 rounded-md"
                key={index}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gray-400 dark:bg-gray-600 text-white flex items-center justify-center">
                    {comment.name[0] || ""}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-black dark:text-white truncate">
                        {comment.name || ""}
                      </p>
                      <p className="text-gray-500 text-sm dark:text-gray-400 truncate">
                        {formattedDate || ""}
                      </p>
                    </div>
                    <p className="text-black dark:text-white break-words">
                      {comment.comment || ""}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            Izohlar mavjud emas.
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
