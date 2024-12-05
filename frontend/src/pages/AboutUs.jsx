import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-4xl bg-white rounded-lg shadow-lg p-8">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-blue-500 mb-4 text-center">
          About To-Do
        </h1>
        {/* Description */}
        <p className="text-gray-700 text-lg mb-6 leading-relaxed">
          Welcome to <span className="font-bold text-blue-500">To-Do</span>, your ultimate task management tool. 
          Whether you're a professional balancing work deadlines or a student organizing your studies, 
          To-Do is here to help you stay on top of your responsibilities.
        </p>
        <p className="text-gray-700 text-lg mb-6 leading-relaxed">
          With a simple and intuitive interface, To-Do makes it easy to plan, prioritize, 
          and track your tasks. Create lists, set deadlines, and never forget an important 
          task again. Say goodbye to the stress of forgetting and hello to a productive, organized life.
        </p>
        <p className="text-gray-700 text-lg mb-6 leading-relaxed">
          Our mission is to empower users with tools that simplify their lives and increase their productivity. 
          Whether it's for personal or professional use, To-Do is your companion for achieving more, one task at a time.
        </p>
        {/* Quote */}
        <blockquote className="text-gray-600 italic border-l-4 border-blue-500 pl-4">
          "An organized life is a happy life. Start your journey with To-Do today!"
        </blockquote>
      </div>
    </div>
  );
};

export default About;
