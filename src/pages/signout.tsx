import React from "react";
import Link from "next/link";

const Signout: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#808977]">
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
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center space-y-6 bg-[#f3e6d5] p-16 rounded-lg shadow-lg w-[95%] max-w-4xl border border-[#554f42]">
        <h1 className="text-center text-3xl font-bold text-[#2d2a26] font-serif">
          You have been signed out! 
        </h1>
        <Link href="/login">
          <button className="px-6 py-3 bg-[#554f42] text-white rounded-lg hover:bg-[#403b32] transition">
            Return to login page
          </button>
      </Link>
      </div>
    </div>
  );
};

export default Signout;