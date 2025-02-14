import React, { useState } from "react";
import Link from "next/link";

// Define the component
const VolunteerMatching: React.FC = () => {
  // State variables for volunteer name and matched event
  const [volunteerName, setVolunteerName] = useState<string>("");
  const [matchedEvent, setMatchedEvent] = useState<string>("");

  // Handle volunteer matching logic
  const handleMatch = () => {
    if (volunteerName) {
      setMatchedEvent("Blood Drive"); // Example matched event
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-gray-800 text-white px-4 py-3 fixed top-0 left-0 right-0 z-10 shadow-lg">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {/* Left side: Home */}
          <Link href="/" className="text-xl font-bold">
            Home
          </Link>

          {/* Right side: Login, Sign Out, Registration, Profile Management, Event Management, Volunteer Matching, Volunteer History, and Notification */}
          <div className="flex items-center space-x-4">
            <Link href="/login" className="hover:text-gray-400">
              Login
            </Link>
            <Link href="/signout" className="hover:text-gray-400">
              Sign Out
            </Link>
            <Link href="/registration" className="hover:text-gray-400">
              Registration
            </Link>
            <Link href="/profileManagement" className="hover:text-gray-400">
              Profile Management
            </Link>
            <Link href="/eventManagement" className="hover:text-gray-400">
              Event Management
            </Link>
            <Link href="/volunteerMatching" className="hover:text-gray-400">
              Volunteer Matching
            </Link>
            <Link href="/volunteerHistory" className="hover:text-gray-400">
              Volunteer History
            </Link>
            <button className="relative hover:text-gray-400">
              {/* Notification Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.003 2.003 0 0118 14V9a6 6 0 10-12 0v5a2.003 2.003 0 01-1.595 1.595L4 17h5m6 0v1a3 3 0 11-6 0v-1"
                />
              </svg>
              {/* Notification Badge */}
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="fixed inset-0 flex items-center justify-center bg-[#808977]">
        <div className="p-8 bg-[#f3e6d5] shadow-lg rounded-lg w-96 text-center">
          <h2 className="text-2xl font-bold mb-6 text-[#2d2a26]">Volunteer Matching</h2>
          
          {/* Volunteer Name Input */}
          <label className="block text-left mb-2 font-semibold text-[#2d2a26]">Volunteer Name</label>
          <input
            type="text"
            value={volunteerName}
            onChange={(e) => setVolunteerName(e.target.value)}
            className="border w-full p-2 rounded mb-4"
          />

          {/* Matched Event Display */}
          <label className="block text-left mb-2 font-semibold text-[#2d2a26]">Matched Event</label>
          <input
            type="text"
            value={matchedEvent}
            readOnly
            className="border w-full p-2 rounded mb-4"
          />

          {/* Match Button */}
          <button
            onClick={handleMatch}
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
          >
            Match!
          </button>
        </div>
      </div>
    </div>
  );
};

export default VolunteerMatching;
