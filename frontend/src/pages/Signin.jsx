import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    console.log("Sign-In Data:", formData);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signin`, formData, {
        headers: { "Content-Type": "application/json" },
        maxBodyLength: Infinity,
      });
      console.log("Sign-In Response:", response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.user.name);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during sign-in:", error);
      alert("Sign-in failed. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  const handleGuestSignIn = async () => {
    setLoader(true);
    try {
      const guestCredentials = { email: "guest@example.com", password: "guest123" };
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signin`, guestCredentials, {
        headers: { "Content-Type": "application/json" },
        maxBodyLength: Infinity,
      });
      console.log("Guest Sign-In Response:", response.data.user);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.user.name);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during guest sign-in:", error);
      alert("Guest sign-in failed. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Sign In
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Sign In
          </button>
        </form>

        {/* Sign In as Guest */}
        <button
          onClick={handleGuestSignIn}
          className="w-full mt-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200"
        >
          Sign in as Guest
        </button>

        {/* Navigation to Sign-Up */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 hover:underline hover:text-blue-600"
          >
            Sign Up
          </Link>
        </p>
        <div className="flex justify-center">
          {loader && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
