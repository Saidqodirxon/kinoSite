/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import axios from "axios";
import { toast } from "react-toastify";

const CommentsSection = ({ comments, movieId, darkMode }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentss, setComments] = useState();
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
      // Izohlarni yangilash
      const response = await axios.get(`/movie/${movieId}`);
      setComments(response.data.comments);
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
          className="flex justify-between gap-2 items-center flex-row "
        >
          <input
            type="text"
            id="name"
            placeholder="Ismingizni kiriting..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={`border border-gray-300 rounded-full h-8 p-1.5 w-full ${
              darkMode ? "bg-black" : "bg-white"
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
              darkMode ? "bg-black" : "bg-white"
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
              darkMode ? "bg-black" : "bg-white"
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
        {comments ||
        (commentss && comments.length > 0) ||
        commentss.length > 0 ? (
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
                className="mt-4 p-2 border-b border-gray-300 rounded-md"
                key={index}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gray-400 text-white flex items-center justify-center">
                    {comment.name[0] || ""}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold">{comment.name || ""}</p>
                      <p className="text-gray-500 text-sm">
                        {formattedDate || ""}
                      </p>
                    </div>
                    <p>{comment.comment || ""}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">Izohlar mavjud emas.</p>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
