import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Title */}
        <div className="text-2xl font-bold">
          <Link to="/">To-Do</Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
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
    </nav>
  );
};

export default Navbar;
