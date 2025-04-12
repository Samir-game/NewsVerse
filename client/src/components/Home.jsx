import React, { useEffect, useState } from 'react';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [allNews, setAllNews] = useState([]);

  useEffect(() => {
    const getNewsFromDB = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/user/home");
        if (response.status === 200) {
          setAllNews(response.data.news);
        } else {
          toast.error("Something went wrong, try again");
        }
      } catch (error) {
        toast.error("Error at the server");
      }
    };
    getNewsFromDB();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-8">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        Latest News Headlines
      </h2>

      <ul className="w-full max-w-2xl space-y-6">
        {allNews.map((news) => (
          <li
            key={news._id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
            
          >
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {news.newsTitle}
            </h3>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Source:</span> {news.newsSource}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Published:</span>{" "} 
              {new Date(news.newsPublishedAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>

      <ToastContainer />
    </div>
  );
};

export default Home;
