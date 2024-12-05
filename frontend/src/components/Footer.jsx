import React from "react";
import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Footer Links */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold">To-Do</h2>
          <p className="text-sm text-gray-400">
            Simplify your tasks, organize your life.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link
            to="/"
            className="text-sm hover:text-gray-400 transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-sm hover:text-gray-400 transition duration-200"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-sm hover:text-gray-400 transition duration-200"
          >
            Contact Us
          </Link>
        </div>

       
        <div className="text-center md:text-right text-sm text-gray-400">
          <p>© {new Date().getFullYear()} To-Do. All rights reserved.</p>
          <div className="flex justify-center md:justify-end space-x-4 mt-2">
            
            <a
              href="https://www.linkedin.com/in/ankit-kumar-39704b227/"
              className="hover:text-gray-200 transition duration-200"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin fa-lg"></i>
            </a>
            <a
              href="https://x.com/Ankit_170301"
              className="hover:text-gray-200 transition duration-200"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter fa-lg"></i>
            </a>
            <a
              href="https://github.com/AnkitKumar-1703"
              className="hover:text-gray-200 transition duration-200"
              aria-label="GitHub"
            >
              <i className="fab fa-github fa-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
