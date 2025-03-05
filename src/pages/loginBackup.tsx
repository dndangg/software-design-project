import React, { useState } from "react";
import Link from "next/link";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#808977] flex items-center justify-center">
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
      
      {/* Login Box */}
      <div className="bg-[#e4dbcf] p-16 rounded-lg shadow-lg w-[95%] max-w-4xl border border-[#554f42]">
        <h1 className="text-center text-3xl font-bold mb-6 text-[#2d2a26] font-serif">
          Welcome to Volunteering!
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col">
          {/* Email Field */}
          <label className="text-[#2d2a26] font-semibold mb-2 text-lg">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-[#554f42] w-full p-4 text-lg rounded-md bg-[#f9f6f1] focus:outline-none focus:ring-2 focus:ring-[#554f42]"
          />

          {/* Password Field */}
          <label className="text-[#2d2a26] font-semibold mt-4 mb-2 text-lg">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-[#554f42] w-full p-4 text-lg rounded-md bg-[#f9f6f1] focus:outline-none focus:ring-2 focus:ring-[#554f42]"
          />

          {/* Login Button */}
          <button
            type="submit"
            className="bg-[#3d3f32] text-white w-full py-4 text-lg rounded-md mt-6 font-semibold shadow-md hover:bg-[#2d2f26] transition"
          >
            Login
          </button>
        </form>

        {/* Sign up Link */}
        <p className="text-center mt-6 text-lg text-[#2d2a26]">
          Don’t have an account?
          <br />
          <Link href="/signup" className="text-[#3d3f32] font-bold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;