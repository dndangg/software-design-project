import type { NextApiRequest, NextApiResponse } from 'next';

// Type definitions
type Volunteer = {
  id: string;
  name: string;
  skills?: string[];
  preferences?: string;
};

type Event = {
  id: string;
  name: string;
  description: string;
  skills: string[];
  date: string;
  location: string;
  urgency: string;
  matchScore?: number;
};

// Hardcoded volunteers data for development
const volunteers: Volunteer[] = [
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
  },
  {
    id: "v3",
    name: "Mike Johnson",
    skills: ["packing", "driving"],
    preferences: "morning"
  }
];

// Hardcoded events data for development
const events: Event[] = [
  {
    id: "e1",
    name: "Blood Drive",
    description: "Saving lives",
    skills: ["packing", "assisting"],
    date: "2025-03-15",
    location: "Community Center",
    urgency: "high"
  },
  {
    id: "e2",
    name: "Donation",
    description: "Donate",
    skills: ["packing", "assisting"],
    date: "2025-03-20",
    location: "Downtown",
    urgency: "medium"
  },
  {
    id: "e3",
    name: "Code Workshop",
    description: "Teaching coding to kids",
    skills: ["code", "teaching"],
    date: "2025-03-22",
    location: "Public Library",
    urgency: "low"
  }
];

/**
 * Simple matching algorithm that assigns scores to events based on volunteer skills
 */
function matchVolunteerToEvents(volunteer: Volunteer): Event[] {
  // Calculate match scores
  const matchedEvents = events.map(event => {
    let score = 0;
    
    // Score based on skill match (highest priority)
    if (volunteer.skills) {
      const matchingSkills = event.skills.filter(skill => 
        volunteer.skills?.includes(skill)
      );
      
      score += (matchingSkills.length / event.skills.length) * 60;
    }
    
    // Score based on preferences 
    if (volunteer.preferences) {
      // Simple preference matching 
      if (
        (volunteer.preferences === "night" && event.date.includes("2025")) ||
        (volunteer.preferences === "weekend" && event.urgency === "low") ||
        (volunteer.preferences === "morning" && event.urgency === "high")
      ) {
        score += 25;
      }
    }
    
    // Remaining points based on urgency
    if (event.urgency === "high") {
      score += 15;
    } else if (event.urgency === "medium") {
      score += 10;
    } else {
      score += 5;
    }
    
    // Return event with calculated match score
    return {
      ...event,
      matchScore: Math.round(score)
    };
  });
  
  // Sort by match score (highest first) and return
  return matchedEvents
    .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET request: return list of volunteers
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      volunteers
    });
  }
  
  // POST request: find matches for a specific volunteer
  if (req.method === 'POST') {
    const { volunteerId } = req.body;
    
    if (!volunteerId) {
      return res.status(400).json({
        success: false,
        message: 'Volunteer ID is required'
      });
    }
    
    // Find volunteer
    const volunteer = volunteers.find(v => v.id === volunteerId);
    
    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer not found'
      });
    }
    
    // Match volunteer to events
    const matchedEvents = matchVolunteerToEvents(volunteer);
    
    return res.status(200).json({
      success: true,
      volunteer,
      matchedEvents
    });
  }
  
  // Invalid method
  return res.status(405).json({
    success: false,
    message: 'Method not allowed'
  });
}