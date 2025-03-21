import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../lib/supabaseClient";
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Ensure request method is POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed!" });
  }

  // Extract fields from the request
  const { accountType, email, password, full_name, address, city, state, zipcode, skills, preferences, availability } = req.body;
  if (!accountType || !email || !password || !full_name) {
    return res.status(400).json({ error: "Missing required fields!" });
  }

  // Hash password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert into UserCredentials
  const { data: credentials, error: credError } = await supabase
    .from("usercredentials")
    .insert([{ email, password: hashedPassword }])
    .select()
    .single();

  if (credError) return res.status(500).json({ error: credError.message });

  // Use the generated user ID to insert into UserProfile
  const userId = credentials.id;
  const { error: profileError } = await supabase
    .from("userprofile")
    .insert([{
      id: userId,
      full_name,
      address,
      city,
      state,
      zipcode,
      skills,
      preferences,
      availability
    }])
    .select()
    .single();

  if (profileError) return res.status(500).json({ error: profileError.message });

  return res.status(201).json({ message: "Registration successful!", user: { id: userId, email, full_name } });
}