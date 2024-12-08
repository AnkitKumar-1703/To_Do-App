import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white">
      {/* Hero Section */}
      <div className="text-center px-4">
        {/* Animated Heading */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-down">
          Welcome to Taskify
        </h1>
        {/* Subheading */}
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto animate-fade-in-up">
          Simplify your life, increase productivity, and achieve your goals with
          the power of organization. Start managing your tasks today with
          Taskify!
        </p>

        {/* Buttons */}
        <div className="flex space-x-4 justify-center animate-fade-in-up">
          <Link to="/signin">
            <button className="bg-white text-blue-600 font-bold py-2 px-6 rounded-lg hover:bg-gray-100 shadow-lg transition transform hover:scale-105">
              Sign In
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-blue-700 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-800 shadow-lg transition transform hover:scale-105">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
