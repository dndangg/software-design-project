import React, { useState, useEffect } from "react";
import Link from "next/link";
import jsPDF from "jspdf"; 

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

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("/api/notifications");
        const data = await response.json();
        setNotifications(data.notifications || []);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };
    fetchNotifications();
  }, []);


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
      const response = await fetch("/api/eventMan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "hardcoded-token",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

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

  
  const generateCSVReport = async () => {
    try {
      const res = await fetch("/api/eventMan", {
        method: "GET",
        headers: { Authorization: "hardcoded-token" },
      });

      const events = await res.json();

      if (!Array.isArray(events)) {
        alert("Failed to generate report");
        return;
      }

      const headers = ["Event Name", "Description", "Location", "Required Skills", "Urgency", "Event Date"];
      const rows = events.map(event => [
        event.event_name,
        event.description,
        event.location,
        event.required_skills,
        event.urgency,
        event.event_date,
      ]);

      const csvContent = `data:text/csv;charset=utf-8,${headers.join(",")}\n${rows.map(row => row.join(",")).join("\n")}`;
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "all_events_report.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("CSV Error:", error);
      alert("CSV generation failed");
    }
  };

  
  const generatePDFReport = async () => {
    try {
      const res = await fetch("/api/eventMan", {
        method: "GET",
        headers: { Authorization: "hardcoded-token" },
      });

      const events = await res.json();

      if (!Array.isArray(events)) {
        alert("Failed to generate report");
        return;
      }

      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text("All Events Report", 20, 20);

      let y = 30;
      events.forEach((event, index) => {
        doc.setFontSize(12);
        doc.text(`Event ${index + 1}`, 20, y);
        y += 7;
        doc.text(`Name: ${event.event_name}`, 20, y);
        y += 7;
        doc.text(`Description: ${event.description}`, 20, y);
        y += 7;
        doc.text(`Location: ${event.location}`, 20, y);
        y += 7;
        doc.text(`Skills: ${event.required_skills}`, 20, y);
        y += 7;
        doc.text(`Urgency: ${event.urgency}`, 20, y);
        y += 7;
        doc.text(`Date: ${event.event_date}`, 20, y);
        y += 10;

        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      });

      doc.save("all_events_report.pdf");
    } catch (error) {
      console.error("PDF Error:", error);
      alert("PDF generation failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#a38175] relative pb-32">
      <nav className="bg-gray-800 text-white px-4 py-3 fixed top-0 left-0 right-0 z-10 shadow-lg">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Link href="/" className="text-xl font-bold">Home</Link>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="hover:text-gray-400">Login</Link>
            <Link href="/signout" className="hover:text-gray-400">Sign Out</Link>
            <Link href="/registration" className="hover:text-gray-400">Registration</Link>
            <Link href="/profileManagement" className="hover:text-gray-400">Profile Management</Link>
            <Link href="/eventManagement" className="hover:text-gray-400">Event Management</Link>
            <Link href="/volunteerMatching" className="hover:text-gray-400">Volunteer Matching</Link>
            <Link href="/volunteerHistory" className="hover:text-gray-400">Volunteer History</Link>
            <div className="relative z-50">
              <button
                className="relative hover:text-gray-400"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.003 2.003 0 0118 14V9a6 6 0 10-12 0v5a2.003 2.003 0 01-1.595 1.595L4 17h5m6 0v1a3 3 0 11-6 0v-1"/>
                </svg>
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                  <ul className="p-2 text-black">
                    {notifications.map((notification) => (
                      <li key={notification.id} className="py-1 border-b last:border-b-0">
                        {notification.message}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-[#f3e6d5] p-8 rounded-lg shadow-md w-[500px] mx-auto mt-32">
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

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              {loading ? "Saving..." : "Create Event"}
            </button>
          </div>
        </form>
      </div>

      {/* Floating Report Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <button
          onClick={generateCSVReport}
          className="bg-green-600 text-white py-2 px-4 rounded-full shadow-lg hover:bg-green-700 transition"
        >
          CSV Report
        </button>
        <button
          onClick={generatePDFReport}
          className="bg-red-600 text-white py-2 px-4 rounded-full shadow-lg hover:bg-red-700 transition"
        >
          PDF Report
        </button>
      </div>
    </div>
  );
}
