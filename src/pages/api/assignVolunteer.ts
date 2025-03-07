import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }
  
  const { volunteerId, eventId } = req.body;
  
  // Validate required parameters
  if (!volunteerId || !eventId) {
    return res.status(400).json({
      success: false,
      message: 'Both volunteerId and eventId are required'
    });
  }
  
 
  const randomSuccess = Math.random() > 0.2;
  
  if (randomSuccess) {
    return res.status(200).json({
      success: true,
      message: 'Volunteer successfully assigned to event'
    });
  } else {
    return res.status(500).json({
      success: false,
      message: 'Failed to assign volunteer (simulated error)'
    });
  }
}