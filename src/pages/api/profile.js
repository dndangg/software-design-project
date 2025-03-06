// pages/api/profile.js
export default function handler(req, res) {
    if (req.method === "POST") {
      // Simulate user authentication
      const authToken = req.headers.authorization;
      if (!authToken || authToken !== "hardcoded-token") {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      // Simulate fetching user profile
      const hardcodedUser = {
        id: 1,
        fullName: "John Doe",
        skills: "coding",
        address1: "123 Main St",
        address2: "",
        city: "Austin",
        state: "TX",
        zip: "78701",
        preferences: "Likes coding events",
        date: "2023-10-15",
      };
  
      // Extract form data from the request body
      const { fullName, skills, address1, address2, city, state, zip, preferences, date } = req.body;
  
      // Validate required fields
      if (!fullName || !skills || !address1 || !city || !state || !zip || !date) {
        return res.status(400).json({ message: "All required fields must be filled" });
      }
  
      // Update the user profile with new data
      const updatedProfile = {
        ...hardcodedUser,
        fullName,
        skills,
        address1,
        address2,
        city,
        state,
        zip,
        preferences,
        date,
      };
  
      // Simulate saving the updated profile
      console.log("Updated Profile:", updatedProfile);
  
      // Return success response
      return res.status(200).json({ message: "Profile updated successfully", profile: updatedProfile });
    } else {
      // Handle other HTTP methods
      return res.status(405).json({ message: "Method not allowed" });
    }
  }