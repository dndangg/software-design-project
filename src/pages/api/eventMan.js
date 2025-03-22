import { supabase } from "../../lib/supabaseClient";

export default async function handler(req, res) {
  const authToken = req.headers.authorization;
  if (!authToken || authToken !== "hardcoded-token") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  switch (req.method) {
    case "GET":
      const { data: events, error: fetchError } = await supabase
        .from("eventdetails") 
        .select("*");

      if (fetchError) {
        return res.status(500).json({ message: "Failed to fetch events", error: fetchError.message });
      }

      return res.status(200).json(events);

    case "POST":
      const {
        eventName,
        description,
        location,
        requiredSkills,
        urgency,
        eventDate,
      } = req.body;

      console.log("Received body from frontend:", req.body);

      if (
        !eventName?.trim() ||
        !description?.trim() ||
        !location?.trim() ||
        !requiredSkills?.trim() ||
        !urgency?.trim() ||
        !eventDate?.trim()
      ) {
        return res.status(400).json({ message: "All required fields must be filled" });
      }

      const { data: newEvent, error: insertError } = await supabase
        .from("eventdetails") 
        .insert([
          {
            event_name: eventName,
            description,
            location,
            required_skills: requiredSkills,
            urgency,
            event_date: eventDate,
          },
        ])
        .select()
        .single();

      if (insertError) {
        console.error("Supabase insert error object:", {
          status: insertError.status,
          code: insertError.code,
          message: insertError.message,
          details: insertError.details,
          hint: insertError.hint,
        });

        return res.status(500).json({ message: "Failed to create event", error: insertError.message });
      }

      return res.status(201).json({ message: "Event created successfully", event: newEvent });

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
