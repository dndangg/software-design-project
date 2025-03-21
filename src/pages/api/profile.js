// pages/api/profile.js
import { supabase } from "../../lib/supabaseClient";

export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed!" });
    }

    // Extract form data from the request body
    const { fullName, skills, address1, address2, city, state, zip, preferences, date } = req.body;

    // Validate required fields
    if (!fullName || !skills || !address1 || !city || !state || !zip || !date) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    // Query the database for the user with the provided name
    const { profile: existingProfile, error } = await supabase
      .from("userprofile")
      .select("*")
      .eq("full_name", fullName)
      .single();

      // If there is an error retrieving the user profile, return "user not found"
      if (error || !existingProfile) {
        return res.status(404).json({ error: "User not found!" });
    }

    //update the profile
    const { data: updatedProfile, error: updateError } = await supabase
      .from("userprofile")
      .update({
        skills,
        address1,
        address2,
        city,
        state,
        zip,
        preferences,
        date,
      })
      .eq("full_name", fullName)
      .select()
      .single();

      // Handle update errors
      if (updateError) {
        console.error("Error updating profile:", updateError.message);
        return res.status(500).json({ error: "Failed to update profile" });
    }

  //Return success response
  return res.status(200).json({
    message: "Profile updated successfully",
    profile: updatedProfile,
  });
    
    // Simulate saving the updated profile
    //console.log("Updated Profile:", updateProfile);
    //verify that fields get updated and add more logic if not

    // Return success response
   // return res.status(200).json({ message: "Profile updated successfully", profile: updateProfile });
}
