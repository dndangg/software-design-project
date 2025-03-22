
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from "../../lib/supabaseClient"; //**imported supabase client file located in lib folder

// Define type for volunteer history item
interface VolunteerHistoryItem {
  id: number;
  volunteerName: string;
  participationStatus: string;
  eventName: string;
  eventDescription: string;
  location: string;
  requiredSkills: string[];
  urgency: string;
  eventDate: string;
}

// Define type for API response
interface ApiSuccessResponse {
  success: true;
  data: VolunteerHistoryItem[];
}

interface ApiErrorResponse {
  success: false;
  message: string;
}

type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

// Hard code data for volunteer history
// **delete hardcoded data
const volunteerHistoryData: VolunteerHistoryItem[] = [
  {
    id: 1,
    volunteerName: "Jane Smith",
    participationStatus: "Completed",
    eventName: "Hurricane Relief",
    eventDescription: "Assistance with cleanup and distribution of supplies after Hurricane Maria",
    location: "San Juan, Puerto Rico",
    requiredSkills: ["Medical", "Logistics", "Transportation"],
    urgency: "High",
    eventDate: "2023-05-15"
  },
  {
    id: 2,
    volunteerName: "Jane Smith",
    participationStatus: "In Progress",
    eventName: "Wildfire Evacuation",
    eventDescription: "Help with evacuation procedures and temporary shelter setup",
    location: "Paradise, California",
    requiredSkills: ["Logistics", "First Aid", "Transportation"],
    urgency: "Critical",
    eventDate: "2023-06-22"
  },
  {
    id: 3,
    volunteerName: "Jane Smith",
    participationStatus: "Upcoming",
    eventName: "Flood Recovery",
    eventDescription: "Assistance with cleanup and rebuilding after severe flooding",
    location: "New Orleans, Louisiana",
    requiredSkills: ["Construction", "Logistics"],
    urgency: "Medium",
    eventDate: "2023-08-10"
  },
  {
    id: 4,
    volunteerName: "Jane Smith",
    participationStatus: "Cancelled",
    eventName: "Earthquake Response",
    eventDescription: "Search and rescue operations after 6.5 magnitude earthquake",
    location: "Los Angeles, California",
    requiredSkills: ["Medical", "Rescue", "First Aid"],
    urgency: "Critical",
    eventDate: "2023-09-05"
  }
];

/**
 * API handler for volunteer history
 * 
 * @param req - The Next.js API request
 * @param res - The Next.js API response
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method === 'GET') {
    //**access the volunteer over here, maybe using the name as an identifier? */
    try {
      // Return the volunteer history data
      res.status(200).json({
        success: true,
        data: volunteerHistoryData
      });
    } catch (error) {
      console.error('Error handling volunteer history request:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while fetching volunteer history'
      });
    }
  } else {
    // Method not allowed
    res.setHeader('Allow', ['GET']);
    res.status(405).json({
      success: false,
      message: `Method ${req.method} Not Allowed`
    });
  }
}