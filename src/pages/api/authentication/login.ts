import { NextApiRequest, NextApiResponse } from "next";

 // API route to handle user login authentication; only accepts POST requests and validates user credentials
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Ensure the request method is POST, otherwise return an error
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed!" });
  }

  // Extract email and password from the request
  const { email, password } = req.body;

  // Validate that both email and password are provided; return an error if not
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required!" });
  }

   // Hardcoded user data, to be later replaced with a real database
  const users = [
    { email: "testing@testing.com", password: "testing123" },
    { email: "testing1@testing1.com", password: "testing1234" },
    { email: "volunteer@testing.com", password: "volunteer123" }
  ];

  // Find a user whose email and password match the request data
  const user = users.find((u) => u.email === email && u.password === password);

  // If no user is found, return an error
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials!" });
  }

  // If credentials are valid, return a success response with user data
  res.status(200).json({ message: "Login successful!", user });
}