import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

function Contact() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Book a Meeting</h1>
        <p className="text-gray-600 mb-8">
          Click below to schedule a meeting with me.
        </p>

        <a
          href="https://calendly.com/mutaliboventrepreneur/mutalibov_zuxriddin"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-4 bg-blue-600 text-white p-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300"
        >
          <FaCalendarAlt className="text-2xl" />
          <span>Schedule a Meeting</span>
        </a>
      </div>
    </div>
  );
}

export default Contact;
