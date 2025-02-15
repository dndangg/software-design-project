import React, { useState } from "react";
import "../styles/registrationForm.css"; // Ensure this file exists

export default function RegistrationForm() {  // 
  const [formData, setFormData] = useState({
    accountType: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registration Successful!");
  };

  return (
    <div className="register-container">
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

          <button type="submit" className="register-button">Register</button>
        </form>

        <p className="register-login-text">
          Already have an account? <a href="/login">Go to login page</a>
        </p>
      </div>
    </div>
  );
}