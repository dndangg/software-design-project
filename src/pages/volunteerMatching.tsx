// pages/volunteerMatching.tsx
import React, { useState, useEffect } from "react";
import Link from "next/link";

// Define interfaces for our data
interface Volunteer {
  id: string;
  name: string;
  skills?: string[];
  preferences?: string;
}

interface Event {
  id: string;
  name: string;
  description: string;
  skills: string[];
  date: string;
  location: string;
  urgency: string;
  matchScore?: number;
}


const VolunteerMatching: React.FC = () => {
  // State variables
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState<string>("");
  const [volunteerDetails, setVolunteerDetails] = useState<Volunteer | null>(null);
  const [matchedEvents, setMatchedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [expandedEvents, setExpandedEvents] = useState<boolean>(true);
  const [assigningEvent, setAssigningEvent] = useState<string | null>(null);

  
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        
        const response = await fetch('/api/volunteerMatching');
        const data = await response.json();
        
        if (data.success) {
          setVolunteers(data.volunteers);
        } else {
          
          setVolunteers([
            {
              id: "v1",
              name: "Volunteer Name",
              skills: ["deploy", "code"],
              preferences: "night"
            },
            {
              id: "v2",
              name: "Jane Smith",
              skills: ["design", "teaching"],
              preferences: "weekend"
            }
          ]);
        }
      } catch (err) {
        console.error("Error fetching volunteers", err);
        console.log('Using hardcoded data for development');
        
        setVolunteers([
          {
            id: "v1",
            name: "Volunteer Name",
            skills: ["deploy", "code"],
            preferences: "night"
          },
          {
            id: "v2",
            name: "Jane Smith",
            skills: ["design", "teaching"],
            preferences: "weekend"
          }
        ]);
      }
    };
    
    fetchVolunteers();
  }, []);

  // Handle volunteer selection
  const handleVolunteerChange = async (volunteerId: string) => {
    setSelectedVolunteer(volunteerId);
    
    if (!volunteerId) {
      setVolunteerDetails(null);
      setMatchedEvents([]);
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Try to fetch from API
      const response = await fetch('/api/volunteerMatching', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ volunteerId }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setVolunteerDetails(data.volunteer);
        setMatchedEvents(data.matchedEvents);
        
        if (data.matchedEvents.length === 0) {
          setError('No matching events found for this volunteer');
        }
      } else {
        // Use hardcoded data for development
        const volunteer = volunteers.find(v => v.id === volunteerId) || null;
        setVolunteerDetails(volunteer);
        
        // Hardcoded matched events
        if (volunteerId === "v2") {
          setMatchedEvents([
            {
              id: "e3",
              name: "Code Workshop",
              description: "Teaching coding to kids",
              skills: ["code", "teaching"],
              date: "2025-03-22",
              location: "Public Library",
              urgency: "low",
              matchScore: 90
            },
            {
              id: "e1",
              name: "Blood Drive",
              description: "Saving lives",
              skills: ["packing", "assisting"],
              date: "2025-03-15",
              location: "Community Center",
              urgency: "high",
              matchScore: 45
            }
          ]);
        } else {
          setMatchedEvents([
            {
              id: "e1",
              name: "Blood Drive",
              description: "Saving lives",
              skills: ["packing", "assisting"],
              date: "2025-03-15",
              location: "Community Center",
              urgency: "high",
              matchScore: 85
            },
            {
              id: "e2",
              name: "Donation",
              description: "Donate",
              skills: ["packing", "assisting"],
              date: "2025-03-20",
              location: "Downtown",
              urgency: "medium",
              matchScore: 70
            }
          ]);
        }
      }
    } catch (err) {
      console.error("Error fetching volunteers", err);
      console.log('Using hardcoded data for development');
      
      const volunteer = volunteers.find(v => v.id === volunteerId) || null;
      setVolunteerDetails(volunteer);
      
      
      if (volunteerId === "v2") {
        setMatchedEvents([
          {
            id: "e3",
            name: "Code Workshop",
            description: "Teaching coding to kids",
            skills: ["code", "teaching"],
            date: "2025-03-22",
            location: "Public Library",
            urgency: "low",
            matchScore: 90
          },
          {
            id: "e1",
            name: "Blood Drive",
            description: "Saving lives",
            skills: ["packing", "assisting"],
            date: "2025-03-15",
            location: "Community Center",
            urgency: "high",
            matchScore: 45
          }
        ]);
      } else {
        setMatchedEvents([
          {
            id: "e1",
            name: "Blood Drive",
            description: "Saving lives",
            skills: ["packing", "assisting"],
            date: "2025-03-15",
            location: "Community Center",
            urgency: "high",
            matchScore: 85
          },
          {
            id: "e2",
            name: "Donation",
            description: "Donate",
            skills: ["packing", "assisting"],
            date: "2025-03-20",
            location: "Downtown",
            urgency: "medium",
            matchScore: 70
          }
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle assignment of volunteer to event
  const handleAssign = async (eventId: string) => {
    if (!selectedVolunteer || !eventId) {
      setError('Cannot assign: Missing volunteer or event');
      return;
    }
    
    setAssigningEvent(eventId);
    setError(null);
    setSuccess(null);
    
    try {
      const response = await fetch('/api/assignVolunteer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          volunteerId: selectedVolunteer,
          eventId: eventId
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        const eventName = matchedEvents.find(e => e.id === eventId)?.name || 'event';
        setSuccess(`Successfully assigned volunteer to ${eventName}`);
      } else {
        // For development, just show success
        const eventName = matchedEvents.find(e => e.id === eventId)?.name || 'event';
        setSuccess(`Successfully assigned volunteer to ${eventName}`);
      }
    } catch (err) {
      console.error("Error assigning volunteer to event", err);
      console.log('Simulating successful assignment for development');
      // For development, just show success
      const eventName = matchedEvents.find(e => e.id === eventId)?.name || 'event';
      setSuccess(`Successfully assigned volunteer to ${eventName}`);
    } finally {
      setAssigningEvent(null);
    }
  };

  // Toggle the events dropdown
  const toggleEventsDropdown = () => {
    setExpandedEvents(!expandedEvents);
  };

  return (
    <div className="min-h-screen bg-[#e8dccf]">
      {/* Navigation Bar - Matching Login Page Style */}
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
            <Link href="/volunteerMatching" className="text-white font-medium">
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
      
      {/* Header - Adjusted with margin-top to accommodate fixed navbar */}
      <header className="bg-green-100 py-6 border-b border-green-200 mt-14">
        <div className="container mx-auto px-4">
          <h1 className="text-center text-3xl font-bold">Volunteer App</h1>
        </div>
      </header>
      
      {/* Admin Welcome */}
      <div className="container mx-auto px-6 py-6">
        <h2 className="text-xl font-bold">Welcome, admin</h2>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl">
        {/* Event Management Form - Left side */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-bold mb-6 text-center">Event Management Form</h2>
          <div className="space-y-6">
            <div>
              <label className="block mb-2 font-semibold">Event Name</label>
              <input 
                type="text" 
                placeholder="enter event name" 
                className="w-full border rounded-md p-2.5 bg-[#f9f1e8]"
              />
            </div>
            
            <div>
              <label className="block mb-2 font-semibold">Event Description</label>
              <textarea 
                placeholder="enter description" 
                className="w-full border rounded-md p-2.5 h-28 bg-[#f9f1e8]"
              />
            </div>
            
            <div>
              <label className="block mb-2 font-semibold">Location</label>
              <input 
                type="text" 
                placeholder="enter location" 
                className="w-full border rounded-md p-2.5 bg-[#f9f1e8]"
              />
            </div>
            
            <div>
              <label className="block mb-2 font-semibold">Required Skills</label>
              <div className="relative">
                <select className="w-full border rounded-md p-2.5 pr-8 appearance-none bg-[#f9f1e8]">
                  <option value="">Required Skills</option>
                  <option value="coding">Coding</option>
                  <option value="teaching">Teaching</option>
                  <option value="packing">Packing</option>
                  <option value="assisting">Assisting</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block mb-2 font-semibold">Urgency</label>
              <div className="relative">
                <select className="w-full border rounded-md p-2.5 pr-8 appearance-none bg-[#f9f1e8]">
                  <option value="">Select Urgency</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block mb-2 font-semibold">Date</label>
              <input 
                type="date" 
                className="border rounded-md p-2.5 bg-[#f9f1e8]"
              />
            </div>
            
            <div className="pt-2">
              <button className="bg-green-400 text-white px-8 py-2.5 rounded-md hover:bg-green-500 transition-colors font-medium w-full">
                Submit
              </button>
            </div>
          </div>
        </div>
        
        {/* Volunteer Matching Form - Right side */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-bold mb-6 text-center">Volunteer Matching Form</h2>
          
          {/* Error and Success Messages */}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-6 text-sm">
              {success}
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-6 text-sm">
              {error}
            </div>
          )}
          
          {/* Volunteer Selection */}
          <div className="mb-6">
            <div className="relative">
              <select
                value={selectedVolunteer}
                onChange={(e) => handleVolunteerChange(e.target.value)}
                className="w-full border rounded-md p-2.5 pr-8 appearance-none"
                disabled={loading}
              >
                <option value="">Select a Volunteer</option>
                {volunteers.map(volunteer => (
                  <option key={volunteer.id} value={volunteer.id}>
                    {volunteer.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
            
            {loading && (
              <div className="mt-2 text-sm text-gray-600">
                Loading volunteer matches...
              </div>
            )}
          </div>
          
          {/* Selected Volunteer Information */}
          {volunteerDetails && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-pink-500 mb-4 text-center">{volunteerDetails.name}</h3>
              <div className="space-y-2">
                {volunteerDetails.skills && (
                  <p className="text-center"><span className="font-semibold">Skills:</span> {volunteerDetails.skills.join(',')}</p>
                )}
                {volunteerDetails.preferences && (
                  <p className="text-center"><span className="font-semibold">Preferences:</span> {volunteerDetails.preferences}</p>
                )}
              </div>
            </div>
          )}
          
          {/* Matching Events */}
          {volunteerDetails && matchedEvents.length > 0 && (
            <div>
              <div 
                className="p-3 bg-gray-100 flex items-center justify-between rounded-t-md border border-gray-200 cursor-pointer mb-0"
                onClick={toggleEventsDropdown}
              >
                <span className="font-semibold">Events</span>
                <svg 
                  className={`h-5 w-5 transition-transform ${expandedEvents ? 'transform rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              
              {expandedEvents && (
                <div className="border border-t-0 border-gray-200 rounded-b-md shadow-sm divide-y divide-gray-200">
                  {matchedEvents.map((event, index) => (
                    <div 
                      key={event.id} 
                      className={`p-4 ${index === 0 ? 'bg-gray-100' : ''}`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="space-y-2 flex-1">
                          <div className="font-bold text-lg">{event.name}</div>
                          <div>{event.description}</div>
                          <div className="text-sm">
                            <span className="font-semibold">Skills:</span> {event.skills.join(',')}
                          </div>
                          
                          <div className="pt-3">
                            <button
                              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors w-full max-w-xs"
                              onClick={() => handleAssign(event.id)}
                              disabled={assigningEvent === event.id}
                            >
                              {assigningEvent === event.id ? 'Assigning...' : 'Assign Volunteer'}
                            </button>
                          </div>
                        </div>
                        
                        {index === 0 && (
                          <div className="text-green-600 flex-shrink-0 ml-2 text-xl">
                            ✓
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VolunteerMatching;
