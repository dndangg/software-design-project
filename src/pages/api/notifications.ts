import { NextApiRequest, NextApiResponse } from "next";

// Simulating fetching notifications from a database
const mockNotifications = [
  { id: 1, message: "You've been assigned to an event: Park Cleanup" },
  { id: 2, message: "Reminder: Event tomorrow at 10 am!" },
  { id: 3, message: "Event location updated: River trash pickup" }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json({ notifications: mockNotifications });
  }

  return res.status(405).json({ error: "Method not allowed" });
}