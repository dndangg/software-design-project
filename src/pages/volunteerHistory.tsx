// pages/volunteerHistory.tsx
import React, { useState, useEffect } from "react";
import Link from "next/link";
import jsPDF from "jspdf";

// Define TypeScript interface for volunteer history data
interface VolunteerHistoryItem {
  id: string;
  volunteerName: string;
  participationStatus: string;
  eventName: string;
  eventDescription: string;
  location: string;
  requiredSkills: string[];
  urgency: string;
  eventDate: string;
}

// Define interface for API response
interface ApiResponse {
  success: boolean;
  data: VolunteerHistoryItem[];
  message?: string;
}

const VolunteerHistory: React.FC = () => {
  // State to store volunteer history data
  const [historyData, setHistoryData] = useState<VolunteerHistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch volunteer history data when component mounts
  useEffect(() => {
    const fetchVolunteerHistory = async () => {
      try {
        const response = await fetch('/api/volunteerHistory');
        
        if (!response.ok) {
          console.error('Response not OK:', response.status, response.statusText);
          setError(`HTTP error: ${response.status}`);
          setLoading(false);
          return;
        }
        
        const result: ApiResponse = await response.json();
        console.log('API Response:', result); // Debug: Log the response
        
        if (result.success) {
          setHistoryData(result.data);
        } else {
          setError(result.message || 'Failed to fetch volunteer history');
        }
      } catch (err) {
        console.error('Error fetching volunteer history:', err);
        setError('Error fetching volunteer history: ' + (err instanceof Error ? err.message : String(err)));
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteerHistory();
  }, []);

  // Function to export data as PDF - simplified approach
  const generatePDFReport = () => {
    if (historyData.length === 0) {
      alert("No data available to export");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Volunteer History Report", 20, 20);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);

    let y = 40;
    
    // Add each volunteer history item to the PDF
    historyData.forEach((item, index) => {
      doc.setFontSize(12);
      doc.text(`Volunteer Record ${index + 1}`, 20, y);
      y += 7;
      
      doc.setFontSize(10);
      doc.text(`Volunteer: ${item.volunteerName}`, 20, y);
      y += 7;
      doc.text(`Status: ${item.participationStatus}`, 20, y);
      y += 7;
      doc.text(`Event: ${item.eventName}`, 20, y);
      y += 7;
      doc.text(`Description: ${item.eventDescription}`, 20, y);
      y += 7;
      doc.text(`Location: ${item.location}`, 20, y);
      y += 7;
      
      // Handle skills array
      const skills = Array.isArray(item.requiredSkills) 
        ? item.requiredSkills.join(", ")
        : item.requiredSkills;
      
      doc.text(`Required Skills: ${skills}`, 20, y);
      y += 7;
      doc.text(`Urgency: ${item.urgency}`, 20, y);
      y += 7;
      doc.text(`Date: ${item.eventDate}`, 20, y);
      y += 15;

      // Add a new page if we're running out of space
      if (y > 270 && index < historyData.length - 1) {
        doc.addPage();
        y = 20;
      }
    });
    
    // Save the PDF
    doc.save(`volunteer_history_${new Date().toLocaleDateString().replace(/\//g, '-')}.pdf`);
  };

  // Function to export data as CSV - simplified approach
  const generateCSVReport = () => {
    if (historyData.length === 0) {
      alert("No data available to export");
      return;
    }

    // Define headers
    const headers = [
      "Volunteer Name",
      "Participation Status",
      "Event Name",
      "Event Description",
      "Location",
      "Required Skills",
      "Urgency",
      "Event Date"
    ].join(",");
    
    // Create CSV rows
    const rows = historyData.map(item => [
      `"${item.volunteerName.replace(/"/g, '""')}"`,
      `"${item.participationStatus.replace(/"/g, '""')}"`,
      `"${item.eventName.replace(/"/g, '""')}"`,
      `"${item.eventDescription.replace(/"/g, '""')}"`,
      `"${item.location.replace(/"/g, '""')}"`,
      `"${Array.isArray(item.requiredSkills) ? item.requiredSkills.join(", ").replace(/"/g, '""') : (item.requiredSkills as string).replace(/"/g, '""')}"`,
      `"${item.urgency.replace(/"/g, '""')}"`,
      `"${item.eventDate.replace(/"/g, '""')}"`
    ].join(","));
    
    // Combine headers and rows
    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows.join("\n")}`;
    const encodedUri = encodeURI(csvContent);
    
    // Create and trigger download link
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `volunteer_history_${new Date().toLocaleDateString().replace(/\//g, '-')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            <Link href="/profileManagement" className="hover:text-gray-400">
              Profile
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
        <div className="bg-[#f3e6d5] p-10 rounded-lg shadow-lg w-[80%] text-[#2d2a26]">
          <h1 className="text-center text-3xl font-bold mb-6 text-[#2d2a26]">Volunteer History</h1>
          
          {/* Export Buttons - Generate Real Files When Clicked */}
          <div className="flex justify-end mb-4 space-x-4">
            <button 
              onClick={generatePDFReport}
              className="bg-[#808977] hover:bg-[#6a7361] text-white py-2 px-4 rounded flex items-center"
              disabled={loading || historyData.length === 0}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
              </svg>
              PDF Report
            </button>
            <button 
              onClick={generateCSVReport}
              className="bg-[#808977] hover:bg-[#6a7361] text-white py-2 px-4 rounded flex items-center"
              disabled={loading || historyData.length === 0}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              CSV Report
            </button>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <p>Loading volunteer history...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">
              <p>{error}</p>
            </div>
          ) : (
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
                {historyData.length > 0 ? (
                  historyData.map((item) => (
                    <tr key={item.id} className="bg-[#e8c5b7] border border-black">
                      <td className="border border-black p-2">{item.volunteerName}</td>
                      <td className="border border-black p-2">{item.participationStatus}</td>
                      <td className="border border-black p-2">{item.eventName}</td>
                      <td className="border border-black p-2">{item.eventDescription}</td>
                      <td className="border border-black p-2">{item.location}</td>
                      <td className="border border-black p-2">
                        {Array.isArray(item.requiredSkills) 
                          ? item.requiredSkills.join(", ")
                          : item.requiredSkills}
                      </td>
                      <td className="border border-black p-2">{item.urgency}</td>
                      <td className="border border-black p-2">{item.eventDate}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="border border-black p-2 text-center">
                      No volunteer history found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default VolunteerHistory;
