import React, { useState } from "react";
import Link from "next/link";

export default function EventManagement() {
  const [eventName, setEventName] = useState("");

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#a38175]">

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
            <Link href="/voMatching" className="hover:text-gray-400">
              Volunteer Matching
            </Link>
            <Link href="/voHistory" className="hover:text-gray-400">
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

      <div className="bg-[#f3e6d5] p-8 rounded-lg shadow-md w-[500px]">
        <h1 className="text-2xl font-bold text-center mb-4 text-[#2d2a26]">Event Management</h1>

        <form>
          {/* Event Name */}
          <label className="block text-sm font-medium mt-4" htmlFor="event-name">
            Event Name (max 100 characters)
          </label>
          <input
            type="text"
            id="event-name"
            name="event-name"
            placeholder="Enter event name"
            maxLength="100"  // Limits to 100 characters
            required  // Makes it required
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="w-full p-2 mt-1 border-2 border-[#4a453f] rounded-md bg-[#f3e6d5] text-gray-700"
          />
          <p className="text-sm text-gray-600 mt-1">{eventName.length}/100 characters</p>
          
          {/* Location */}
          <label className="block text-sm font-medium mt-4" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter location"
            className="w-full p-2 mt-1 border-2 border-[#4a453f] rounded-md bg-[#f3e6d5] text-gray-700"
          />

          {/* Event Description */}
          <label className="block text-sm font-medium mt-4" htmlFor="description">
            Event Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe the event"
            className="w-full p-2 mt-1 border-2 border-[#4a453f] rounded-md bg-[#e8c5b7] text-gray-700 h-16"
          ></textarea>

          {/* Required Skills */}
          <label className="block text-sm font-medium mt-4" htmlFor="skills">
            Required Skills
          </label>
          <textarea
            id="skills"
            name="skills"
            placeholder="List required skills"
            className="w-full p-2 mt-1 border-2 border-[#4a453f] rounded-md bg-[#e8c5b7] text-gray-700 h-16"
          ></textarea>

          {/* Select Urgency */}
          <label className="block text-sm font-medium mt-4" htmlFor="urgency">
            Select Urgency
          </label>
          <select
            id="urgency"
            name="urgency"
            className="w-full p-2 mt-1 border-2 border-[#4a453f] rounded-md bg-[#e8c5b7] text-gray-700"
          >
            <option value="">Select Urgency</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          {/* Event Date */}
          <label className="block text-sm font-medium mt-4" htmlFor="event-date">
            Event Date
          </label>
          <input
            type="date"
            id="event-date"
            name="event-date"
            className="w-full p-2 mt-1 border-2 border-[#4a453f] rounded-md bg-[#f3e6d5] text-gray-700"
          />
        </form>
      </div>
    </div>
  );
}
