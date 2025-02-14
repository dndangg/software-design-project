import React, { useState } from "react";
// Removed import

export default function EventManagement() {
  const [eventName, setEventName] = useState("");

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#a38175]">
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
