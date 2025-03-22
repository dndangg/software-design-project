import React, { useState } from "react";
import Link from "next/link";

export default function EventManagement() {
  const [formData, setFormData] = useState({
    eventName: "",
    description: "", 
    location: "",
    city: "",
    state: "",
    zip_code: "",
    requiredSkills: "",
    urgency: "",
    eventDate: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newErrors = {};
    if (!formData.eventName) newErrors.eventName = "Event Name is required";
    if (formData.eventName.length > 100) newErrors.eventName = "Event Name cannot exceed 100 characters";
    if (!formData.description) newErrors.description = "Description is required"; 
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.requiredSkills) newErrors.requiredSkills = "Required skills are needed";
    if (!formData.urgency) newErrors.urgency = "Urgency level is required";
    if (!formData.eventDate) newErrors.eventDate = "Event date is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      console.log("Sending request with data:", formData);
      const response = await fetch("/api/eventMan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "hardcoded-token",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok) {
        alert("Event created successfully!");
        setFormData({
          eventName: "",
          description: "", 
          location: "",
          city: "",
          state: "",
          zip_code: "",
          requiredSkills: "",
          urgency: "",
          eventDate: "",
        });
      } else {
        alert(data.message || "Failed to create event");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("An error occurred while creating the event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#a38175]">
      <nav className="bg-gray-800 text-white px-4 py-3 fixed top-0 left-0 right-0 z-10 shadow-lg">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Link href="/" className="text-xl font-bold">Home</Link>
          <div className="flex items-center space-x-4">
            <Link href="/profileManagement" className="hover:text-gray-400">Profile</Link>
            <Link href="/eventManagement" className="hover:text-gray-400">Event Management</Link>
          </div>
        </div>
      </nav>

      <div className="bg-[#f3e6d5] p-8 rounded-lg shadow-md w-[500px] mt-24">
        <h1 className="text-2xl font-bold text-center mb-4 text-[#2d2a26]">Event Management</h1>
        <form onSubmit={handleSubmit}>
          <label>Event Name *</label>
          <input type="text" name="eventName" value={formData.eventName} onChange={handleChange} maxLength="100" required />
          {errors.eventName && <p className="text-red-500 text-sm">{errors.eventName}</p>}

          <label>Event Description *</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

          <label>Location *</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />
          {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}

          <label>Required Skills *</label>
          <textarea name="requiredSkills" value={formData.requiredSkills} onChange={handleChange} required></textarea>
          {errors.requiredSkills && <p className="text-red-500 text-sm">{errors.requiredSkills}</p>}

          <label>Urgency *</label>
          <select name="urgency" value={formData.urgency} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.urgency && <p className="text-red-500 text-sm">{errors.urgency}</p>}

          <label>Event Date *</label>
          <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} required />
          {errors.eventDate && <p className="text-red-500 text-sm">{errors.eventDate}</p>}

          <button type="submit" disabled={loading} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
            {loading ? "Saving..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
}
