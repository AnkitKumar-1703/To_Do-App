import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-500 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Title */}
        <div className="text-2xl font-bold">
          <Link to="/">Taskify</Link>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {/* Hamburger Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/dashboard"
            className="text-lg hover:text-gray-200 transition duration-200"
          >
            Dashboard
          </Link>
          <Link
            to="/about"
            className="text-lg hover:text-gray-200 transition duration-200"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-lg hover:text-gray-200 transition duration-200"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-blue-600 text-white shadow-lg z-20 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 focus:outline-none"
        >
          {/* Close Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <nav className="mt-16 space-y-4 px-6">
          <Link
            to="/dashboard"
            className="block text-lg hover:text-gray-200 transition duration-200"
            onClick={toggleMenu}
          >
            Dashboard
          </Link>
          <Link
            to="/about"
            className="block text-lg hover:text-gray-200 transition duration-200"
            onClick={toggleMenu}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="block text-lg hover:text-gray-200 transition duration-200"
            onClick={toggleMenu}
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
