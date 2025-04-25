// pages/volunteerMatching.tsx
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Define interfaces based on your Supabase tables
interface Volunteer {
  id: string;
  full_name: string;
  skills: string;
  preferences: string;
}

interface Event {
  id: string;
  event_name: string;
  description: string;
  location: string;
  required_skills: string;
  urgency: string;
  event_date: string;
  matchScore?: number;
  assignedTo?: string;
}

// Global state to track event assignments
const assignedEvents: Record<string, string> = {}; // eventId -> volunteerId

const VolunteerMatching: React.FC = () => {
  // Navigation bar and notifications
  
  // State variables
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState<string>("");
  const [volunteerDetails, setVolunteerDetails] = useState<Volunteer | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);

  
  useEffect(() => {
    fetchVolunteers();
    fetchAllEvents();
  }, []);

  // Fetch all volunteers from Supabase
  const fetchVolunteers = async () => {
    try {
      const { data, error } = await supabase
        .from('userprofile')
        .select('id, full_name, skills, preferences');

      if (error) {
        console.error('Error fetching volunteers:', error);
        return;
      }

      if (data) {
        setVolunteers(data);
      }
    } catch (err) {
      console.error('Error in fetchVolunteers:', err);
    }
  };

  // Fetch all events from Supabase
  const fetchAllEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('eventdetails')
        .select('id, event_name, description, location, required_skills, urgency, event_date');

      if (error) {
        console.error('Error fetching events:', error);
        return;
      }

      if (data) {
        // Check for already assigned events in volunteerhistory table
        const { data: historyData, error: historyError } = await supabase
          .from('volunteerhistory')
          .select('user_id, event_id');

        if (!historyError && historyData) {
          // Update global assignedEvents
          historyData.forEach(record => {
            assignedEvents[record.event_id] = record.user_id;
          });
        }

        // Store all events
        setAllEvents(data);
      }
    } catch (err) {
      console.error('Error in fetchAllEvents:', err);
    }
  };

  
  const normalizeText = (text: string | null | undefined): string[] => {
    if (!text) return [];
    return text.toLowerCase().split(/[,;]+/).map(item => item.trim()).filter(item => item.length > 0);
  };

  
  const hasOverlap = (arr1: string[], arr2: string[]): boolean => {
    if (arr1.length === 0 || arr2.length === 0) return false;
    
    for (const item1 of arr1) {
      for (const item2 of arr2) {
        if (item1 === item2 || item1.includes(item2) || item2.includes(item1)) {
          return true;
        }
      }
    }
    
    return false;
  };

  // Handle volunteer selection
  const handleVolunteerChange = async (volunteerId: string) => {
    setSelectedVolunteer(volunteerId);
    setLoading(true);
    
    if (!volunteerId) {
      setVolunteerDetails(null);
      setEvents([]);
      setLoading(false);
      return;
    }
    
    try {
      // Fetch volunteer details
      const { data: volunteerData, error: volunteerError } = await supabase
        .from('userprofile')
        .select('id, full_name, skills, preferences')
        .eq('id', volunteerId)
        .single();
      
      if (volunteerError) {
        console.error('Error fetching volunteer details:', volunteerError);
        setLoading(false);
        return;
      }
      
      if (volunteerData) {
        setVolunteerDetails(volunteerData);
        
        if (allEvents.length === 0) {
          await fetchAllEvents();
        }
        
        // Normalize volunteer skills for matching
        const volunteerSkills = normalizeText(volunteerData.skills);
        
        // Match volunteer to events
        const matchedEvents = allEvents.map(event => {
          let score = 0;
          
          // Normalize event skills
          const eventSkills = normalizeText(event.required_skills);
          
          // Check for event assignment status
          const isAssigned = assignedEvents[event.id] === volunteerId;
          if (isAssigned) {
            // This event is already assigned to this volunteer
            score += 90;
          }
          
          // Special case for coding and hackathon
          if (
            (volunteerSkills.some(skill => ["coding", "code", "programming", "developer"].includes(skill)) && 
            (event.event_name.toLowerCase().includes("hackathon") || 
              event.description.toLowerCase().includes("coding") || 
              event.description.toLowerCase().includes("programming")))
          ) {
            score += 70;
          }
          // General skill match
          else if (hasOverlap(volunteerSkills, eventSkills)) {
            score += 60;
          }
          
          // Add some variety based on volunteer ID
          const volunteerIdSum = volunteerId.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
          const eventIdSum = event.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
          const affinityScore = (volunteerIdSum * eventIdSum) % 20;
          score += affinityScore;
          
          // Urgency factor
          if (event.urgency) {
            const urgency = event.urgency.toLowerCase();
            if (urgency === "extreme" || urgency === "very") {
              score += 15;
            } else if (urgency === "high") {
              score += 12;
            } else if (urgency === "medium") {
              score += 8;
            } else {
              score += 5;
            }
          }
          
          return {
            ...event,
            matchScore: Math.min(score, 100), 
            assignedTo: assignedEvents[event.id]
          };
        });
        
        // Sort by match score (highest first)
        const sortedEvents = matchedEvents.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
        
        setEvents(sortedEvents);
      }
    } catch (err) {
      console.error('Error in handleVolunteerChange:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle assigning volunteer to event
  const handleAssignEvent = async (eventId: string) => {
    if (!selectedVolunteer || !eventId) {
      return;
    }
    
    try {
      // Update the global tracking object
      assignedEvents[eventId] = selectedVolunteer;
      
      // Then insert into volunteerhistory table
      const { error } = await supabase
        .from('volunteerhistory')
        .insert([{ 
          user_id: selectedVolunteer,
          event_id: eventId,
          participation_status: 'assigned'
        }]);
      
      if (error) {
        console.error('Error assigning volunteer:', error);
        return;
      }
      
      
      setEvents(prev => prev.map(event => 
        event.id === eventId 
          ? { ...event, assignedTo: selectedVolunteer }
          : event
      ));
      
    } catch (err) {
      console.error('Error in handleAssignEvent:', err);
    }
  };

  // Toggle events dropdown
  const toggleEvents = () => {
    setExpanded(!expanded);
  };

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<{ id: number; message: string }[]>([]);

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
            <div className="relative z-50">
              <button
                className="relative hover:text-gray-400"
                onClick={() => setShowNotifications(!showNotifications)}
              >
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
                {notifications.length > 0 && ( // checks if there are notifications
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

      {/* Main Content with proper spacing */}
      <div className="flex justify-center py-6">
        <div className="w-full max-w-md bg-[#f6efdf] p-6 rounded-lg shadow-lg">
          <h1 className="text-center text-2xl font-bold text-[#333333] mb-6">Volunteer Matching</h1>
          
          {/* Volunteer Selection Dropdown */}
          <div className="mb-4">
            <select
              value={selectedVolunteer}
              onChange={(e) => handleVolunteerChange(e.target.value)}
              className="w-full p-3 bg-[#f0d4c5] border border-[#d2b6a8] rounded text-center text-gray-800 appearance-none"
              disabled={loading}
            >
              <option value="">Select a Volunteer</option>
              {volunteers.map(volunteer => (
                <option key={volunteer.id} value={volunteer.id}>
                  {volunteer.full_name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Loading indicator */}
          {loading && (
            <div className="text-center py-2 text-gray-600">
              Loading...
            </div>
          )}
          
          {/* Volunteer Details Card */}
          {volunteerDetails && (
            <div className="p-4 mb-4 bg-[#f0d4c5] border border-[#d2b6a8] rounded">
              <h2 className="text-xl font-bold text-[#e86363] mb-1">{volunteerDetails.full_name}</h2>
              <p className="text-gray-800 text-sm mb-1">
                <span className="font-bold">Skills:</span> {volunteerDetails.skills}
              </p>
              {volunteerDetails.preferences && volunteerDetails.preferences !== "EMPTY" && volunteerDetails.preferences !== "N/A" && (
                <p className="text-gray-800 text-sm">
                  <span className="font-bold">Preferences:</span> {volunteerDetails.preferences}
                </p>
              )}
            </div>
          )}
          
          {/* Events Section  */}
          {volunteerDetails && events.length > 0 && (
            <div>
              <div 
                className="p-3 bg-[#f0d4c5] flex items-center justify-between rounded-t border border-[#d2b6a8] cursor-pointer"
                onClick={toggleEvents}
              >
                <span className="font-bold text-gray-800">Events</span>
                <svg 
                  className={`h-5 w-5 text-gray-600 transition-transform ${expanded ? 'transform rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              
              {expanded && (
                <div className="border-x border-b border-[#d2b6a8] rounded-b overflow-hidden max-h-64 overflow-y-auto">
                  {events.map((event, index) => (
                    <div 
                      key={event.id} 
                      className={`p-3 ${index % 2 === 0 ? 'bg-[#f0d4c5]' : 'bg-[#f6efdf]'} relative`}
                    >
                      <div className="font-bold text-gray-800">{event.event_name}</div>
                      <div className="text-sm text-gray-700">{event.description}</div>
                      <div className="text-xs text-gray-600 mt-1">
                        <span className="font-bold">Skills:</span> {event.required_skills}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        <span className="font-bold">Match Score:</span> {event.matchScore}%
                      </div>
                      
                      {/* Assignment status or button */}
                      <div className="mt-2">
                        {event.assignedTo === selectedVolunteer ? (
                          <div className="bg-green-100 border border-green-300 text-green-800 px-2 py-1 rounded text-xs inline-block">
                            Already assigned to you
                          </div>
                        ) : (
                          <button
                            onClick={() => handleAssignEvent(event.id)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                          >
                            Assign to me
                          </button>
                        )}
                      </div>
                      
                      {index === 0 && (
                        <div className="absolute right-3 top-3 text-green-500 text-xl">
                          ✓
                        </div>
                      )}
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
