import React, { useState } from "react";
import Link from "next/link";
// import "../styles/registrationForm.css"; // Commented out

export default function RegistrationForm() {  // 
  const [formData, setFormData] = useState({
    accountType: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // POST request to the registration API route
      const response = await fetch("/api/authentication/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Parse JSON response
      const data = await response.json();

      // Check if the response indicates an error
      if (!response.ok) {
        throw new Error(data.error || "Registration failed!");
      }

      // On successful registration, alert success message
      alert(data.message);

      // Optionally, redirect to the login page after registration
      window.location.href = "/login";
    } catch (error) {
      // Display error message
      alert(error.message);
    }
  };

  return (
    <div className="register-container">
                {/* Navigation Bar */}
                <nav className="bg-gray-800 text-white px-4 py-3 fixed top-0 left-0 right-0 z-10 shadow-lg">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {/* Left side: Home */}
          <Link href="/" className="text-xl font-bold">
            Home
          </Link>

          {/* Right side: Login, Sign Out, Registration, Profile Management, Event Management, Volunteer Matching, Volunteer History, and Notification */}
          <div className="flex items-center space-x-4">
            <Link href="/login" className="hover:text-gray-400">
              Login
            </Link>
            {/* <Link href="/signout" className="hover:text-gray-400">
              Sign Out
            </Link> */}
            <Link href="/registration" className="hover:text-gray-400">
              Registration
            </Link>
            <Link href="/profileManagement" className="hover:text-gray-400">
              Profile Management
            </Link>
            <Link href="/eventManagement" className="hover:text-gray-400">
              Event Management
            </Link>
            <Link href="/volunteerMatching" className="hover:text-gray-400">
              Volunteer Matching
            </Link>
            <Link href="/volunteerHistory" className="hover:text-gray-400">
              Volunteer History
            </Link>
            
          </div>
        </div>
      </nav>
      <div className="register-box">
        <h1 className="register-title">New Here? Register Below!</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="accountType">Account Type</label>
          <input
            type="text"
            id="accountType"
            name="accountType"
            placeholder="Enter account type"
            value={formData.accountType}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Username (Email Address)</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="full_name">Full Name</label>
          <input
            type="full_name"
            id="full_name"
            name="full_name"
            placeholder="Enter your full name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />

          <label htmlFor="address">Address</label>
          <input
            type="address"
            id="address"
            name="address"
            placeholder="Enter address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <label htmlFor="city">City</label>
          <input
            type="city"
            id="city"
            name="city"
            placeholder="Enter city"
            value={formData.city}
            onChange={handleChange}
            required
          />

          <label htmlFor="state">State</label>
          <input
            type="stat"
            id="state"
            name="state"
            placeholder="Enter state"
            value={formData.state}
            onChange={handleChange}
            required
          />

          <label htmlFor="zipcode">Zip Code</label>
          <input
            type="zipcode"
            id="zipcode"
            name="zipcode"
            placeholder="Enter Zip Code"
            value={formData.zipcode}
            onChange={handleChange}
            required
          />

          <label htmlFor="skills">Skills</label>
          <input
            type="skills"
            id="skills"
            name="skills"
            placeholder="Enter skills"
            value={formData.skills}
            onChange={handleChange}
            required
          />

          <label htmlFor="preferences">Preferences</label>
          <input
            type="preferences"
            id="preferences"
            name="preferences"
            placeholder="Enter preferences"
            value={formData.preferences}
            onChange={handleChange}
            required
          />

          <label htmlFor="availability">Availability</label>
          <input
            type="availability"
            id="availability"
            name="availability"
            placeholder="Enter availability"
            value={formData.availability}
            onChange={handleChange}
            required
          />
          
          <button type="submit" className="register-button">Register</button>
        </form>

        <p className="register-login-text">
          Already have an account? <Link href="/login">Go to login page</Link>
        </p>
      </div>
    </div>
  );
}