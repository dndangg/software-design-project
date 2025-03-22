import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from "../../lib/supabaseClient";

// Define type for volunteer history item
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

/**
 * API handler for volunteer history
 * 
 * @param req - The Next.js API request
 * @param res - The Next.js API response
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method === 'GET') {
    try {
      console.log('Fetching volunteer history...');
      
      // First, get the current authenticated user
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      
      if (authError) {
        console.error('Auth error:', authError);
        return res.status(401).json({
          success: false,
          message: 'Authentication error'
        });
      }
      
      // Basic Supabase connection test - changed to avoid aggregate function
      const { data: testConn, error: testConnError } = await supabase
        .from('volunteerhistory')
        .select('id')
        .limit(1);
        
      if (testConnError) {
        console.error('Database connection test failed:', testConnError);
        return res.status(500).json({
          success: false,
          message: `Database connection error: ${testConnError.message}`
        });
      }
      
      console.log('Database connection test successful');
      
      // Use the user ID if available, otherwise fetch all entries
      let query = supabase.from('volunteerhistory').select('id, event_id, user_id, participation_status');
      
      if (session?.user?.id) {
        console.log('Filtering by user ID:', session.user.id);
        query = query.eq('user_id', session.user.id);
      } else {
        console.log('No user ID available, fetching all entries');
      }
      
      // Execute the query
      const { data: historyData, error: historyError } = await query;

      if (historyError) {
        console.error('Error fetching history data:', historyError);
        return res.status(500).json({
          success: false,
          message: `Error fetching volunteer history: ${historyError.message}`
        });
      }

      console.log('History data fetched:', historyData?.length || 0, 'entries');
      
      // No entries found
      if (!historyData || historyData.length === 0) {
        return res.status(200).json({
          success: true,
          data: []
        });
      }

      // Get event details for all events
      const eventIds = [...new Set(historyData.map(item => item.event_id))];
      console.log('Fetching details for', eventIds.length, 'events');
      
      const { data: eventData, error: eventError } = await supabase
        .from('eventdetails')
        .select('*')
        .in('id', eventIds);

      if (eventError) {
        console.error('Error fetching event data:', eventError);
        return res.status(500).json({
          success: false,
          message: `Error fetching event details: ${eventError.message}`
        });
      }

      console.log('Event data fetched:', eventData?.length || 0, 'events');
      
      // Get user profiles if necessary
      const userIds = [...new Set(historyData.map(item => item.user_id))];
      const { data: userData, error: userError } = await supabase
        .from('userprofile')
        .select('id, preferences')
        .in('id', userIds);
        
      if (userError) {
        console.log('Error fetching user data (non-critical):', userError);
        
      }

      // Combine the data
      const formattedData: VolunteerHistoryItem[] = historyData.map(historyItem => {
        // Find the corresponding event
        const event = eventData?.find(e => e.id === historyItem.event_id);
        
        // Find the corresponding user
        const user = userData?.find(u => u.id === historyItem.user_id);
        
        // Parse skills string into array (assuming skills are comma-separated)
        let skillsArray: string[] = [];
        if (event?.required_skills) {
          try {
            // Try to parse as JSON first (if stored as JSON string)
            skillsArray = JSON.parse(event.required_skills);
          } catch {
            // If not valid JSON, treat as comma-separated string
            skillsArray = typeof event.required_skills === 'string' 
              ? event.required_skills.split(',').map(skill => skill.trim())
              : [String(event.required_skills)];
          }
        }
        
        return {
          id: historyItem.id,
          volunteerName: user?.preferences || "Volunteer", // Use preferences as name for now
          participationStatus: historyItem.participation_status || "",
          eventName: event?.event_name || "Unknown Event",
          eventDescription: event?.description || "",
          location: event?.location || "",
          requiredSkills: skillsArray,
          urgency: event?.urgency || "",
          eventDate: event?.event_date || ""
        };
      });

      console.log('Formatted data prepared with', formattedData.length, 'entries');
      
      // Return the volunteer history data
      return res.status(200).json({
        success: true,
        data: formattedData
      });
    } catch (error) {
      console.error('Unexpected error in volunteer history API:', error);
      return res.status(500).json({
        success: false,
        message: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
  } else {
    // Method not allowed
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({
      success: false,
      message: `Method ${req.method} Not Allowed`
    });
  }
}
