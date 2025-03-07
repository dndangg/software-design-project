let events = [
    {
      id: 1,
      event_admin_id: 101,
      event_name: 'College Hackathon',
      event_description: 'A fun little group competition to test your skills',
      location: 'University of Houston',
      city: 'Houston',
      state: 'TX',
      zip_code: '77004',
      required_skills: 'Teamwork, Java, Python, C++',
      urgency: 'High',
      event_date: '2025-03-15'
    },
    {
      id: 2,
      event_admin_id: 102,
      event_name: 'Python Workshop',
      event_description: 'A beginner-friendly coding workshop using Python.',
      location: 'UTD',
      city: 'Dallas',
      state: 'TX',
      zip_code: '75080',
      required_skills: 'Typing, Teamwork',
      urgency: 'Medium',
      event_date: '2025-04-10'
    }
  ];
  
  export default function handler(req, res) {
    const authToken = req.headers.authorization;
    if (!authToken || authToken !== "hardcoded-token") {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    switch (req.method) {
      case 'GET':
        return res.status(200).json(events);
  
      case 'POST':
        const { eventName, eventDescription, location, city, state, zip_code, requiredSkills, urgency, eventDate } = req.body;
  
        if (!eventName || !eventDescription || !location || !requiredSkills || !urgency || !eventDate) {
          return res.status(400).json({ message: 'All required fields must be filled' });
        }
  
        const newEvent = {
          id: events.length + 1,
          event_admin_id: 999, // Default admin ID
          event_name: eventName,
          event_description: eventDescription,
          location,
          city,
          state,
          zip_code,
          required_skills: requiredSkills,
          urgency,
          event_date: eventDate
        };
  
        events.push(newEvent);
        return res.status(201).json({ message: 'Event created successfully', event: newEvent });
  
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
  }
  