import React from "react";
import Link from "next/link";

const VolunteerHistory: React.FC = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-gray-800 text-white px-4 py-3 fixed top-0 left-0 right-0 z-10 shadow-lg">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {/* Left side: Home */}
          <Link href="/" className="text-xl font-bold">
            Home
          </Link>

          {/* Right side: Login, Sign Out, and Notification */}
          <div className="flex items-center space-x-4">
            <Link href="/login" className="hover:text-gray-400">
              Login
            </Link>
            <Link href="/signout" className="hover:text-gray-400">
              Sign Out
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
      <div className="bg-[#899481] flex items-center justify-center min-h-screen pt-20">
        <div className="bg-[#f3e6d5] p-10 rounded-lg shadow-lg w-[80%] text-[#2d2a26]">
          <h1 className="text-center text-3xl font-bold mb-6 text-[#2d2a26]">Volunteer History</h1>
          <table className="w-full border-collapse border border-black">
            <thead>
              <tr className="bg-[#e8c5b7] border border-black">
                <th className="border border-black p-2">Volunteer Name</th>
                <th className="border border-black p-2">Participation Status</th>
                <th className="border border-black p-2">Event Name</th>
                <th className="border border-black p-2">Event Description</th>
                <th className="border border-black p-2">Location</th>
                <th className="border border-black p-2">Required Skills</th>
                <th className="border border-black p-2">Urgency</th>
                <th className="border border-black p-2">Event Date</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(4)].map((_, index) => (
                <tr key={index} className="bg-[#e8c5b7] border border-black">
                  <td className="border border-black p-2"></td>
                  <td className="border border-black p-2"></td>
                  <td className="border border-black p-2"></td>
                  <td className="border border-black p-2"></td>
                  <td className="border border-black p-2"></td>
                  <td className="border border-black p-2"></td>
                  <td className="border border-black p-2"></td>
                  <td className="border border-black p-2"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VolunteerHistory;
